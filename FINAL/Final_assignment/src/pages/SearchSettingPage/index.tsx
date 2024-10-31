import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState, useRef } from "react";
import Loading from "../../components/common/Loading";
import Header from "../../components/header";
import {
  useCreateSearchSettings,
  useGetListSearchSettings,
  useUpdateSearchSettings,
  useDeleteSearchSettings,
} from "../../hooks/search-settings/useSearchSettings";

import DataTable2 from "../../components/table/DataTable2";
import CreateFormSearchSetting from "../../components/modal/search-settings";
import ConfirmModal from "../../components/modal/common/ConfirmModal";
import toast from "react-hot-toast";

const SearchSettingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedSearchSetting, setSelectedSearchSetting] =
    useState<RowData | null>(null);
  const selectedSearchSettingRef = useRef<RowData | null>(null);

  const [formData, setFormData] = useState<RowData | null>(null);
  const [row_id, setRow_id] = useState<string | null>(null);
  const [isDeleteAction, setIsDeleteAction] = useState(false);

  const {
    data: { data: searchSettings = [], metadata } = {},
    loading,
    error,
    act: getSearchSetting,
  } = useGetListSearchSettings(true, {
    page: 1,
    limit: 25,
    sort: "-createdAt",
    search: isInitialLoad ? undefined : searchTerm,
  });

  const { act: createSearchSetting } = useCreateSearchSettings(
    false,
    formData ?? {}
  );

  const { act: updateSearchSetting } = useUpdateSearchSettings(
    row_id ?? "",
    false,
    formData ?? {}
  );

  const { act: deleteSearchSetting } = useDeleteSearchSettings(
    row_id ?? "",
    false
  );

  const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "keyword", label: "Text", minWidth: 170 },
    { id: "count", label: "Time", minWidth: 170 },
    { id: "createdAt", label: "Created Date", minWidth: 170 },
  ];
  interface RowData {
    id: string;
    keyword: string;
    count: number;
    createdAt: string;
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setIsInitialLoad(false);
  };

  useEffect(() => {
    if (!isInitialLoad) {
      getSearchSetting({
        page: 1,
        limit: 25,
        sort: "status",
        search: searchTerm,
      });
    }
  }, [searchTerm]);

  const handleCreateForm = () => {
    console.log("Creating form...");
    setIsOpen(true);
  };

  const handleSubmit = async (data: RowData) => {
    console.log("Form data:", data);
    setFormData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (isDeleteAction) {
      await deleteSearchSetting(selectedSearchSettingRef.current?.id ?? "");
      getSearchSetting({ page: 1, limit: 25, sort: "status" });
      toast.success("Deleted successfully");
    } else {
      const isEditMode = selectedSearchSettingRef.current;
      console.log("isEditMode:", isEditMode);
      if (formData) {
        if (isEditMode) {
          console.log("Updating:", formData);
          await updateSearchSetting(formData.id, formData);
          getSearchSetting({ page: 1, limit: 25, sort: "status" });
          toast.success("Updated successfully!");
        } else {
          console.log("Creating:", formData);
          await createSearchSetting(formData);
          getSearchSetting({ page: 1, limit: 25, sort: "status" });
          toast.success("Created successfully!");
        }

        setIsConfirmOpen(false);
        setIsOpen(false);
        setFormData(null);
      }
    }
    setIsConfirmOpen(false);
  };

  const actionIcons = [
    {
      icon: <BorderColorRoundedIcon />,
      onClick: (row: RowData) => {
        console.log("Row data", row);
        setRow_id(row.id);
        selectedSearchSettingRef.current = row;
        setSelectedSearchSetting(row);
        setIsOpen(true);
      },
    },
    {
      icon: <DeleteIcon />,
      onClick: (row: RowData) => {
        console.log("Row data", row);
        setRow_id(row.id);
        selectedSearchSettingRef.current = row;
        setSelectedSearchSetting(row);
        setIsDeleteAction(true);
        setIsConfirmOpen(true);
      },
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Search Settings"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create"
      />
      <CreateFormSearchSetting
        outletName={selectedSearchSetting ? "Update Keyword" : "Create Keyword"}
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedSearchSetting(null);
        }}
        onSubmit={handleSubmit}
        initialData={
          selectedSearchSetting
            ? {
                keyword: selectedSearchSetting.keyword,
                count: selectedSearchSetting.count,
                isSuggestion: true,
              }
            : { keyword: "", count: 1, isSuggestion: true }
        }
        isEditMode={!!selectedSearchSetting}
      />
      <ConfirmModal
        message={
          isDeleteAction
            ? "Are you sure you want to delete this item?"
            : "Do you want to perform this action?"
        }
        open={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setIsDeleteAction(false);
          setRow_id(null);
          setSelectedSearchSetting(null);
        }}
        onConfirm={handleConfirm}
      />

      <div className="flex-grow overflow-auto p-4 bg-slate-50">
        {error ? (
          <div>Error loading data: {error.message}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <DataTable2
            data={searchSettings}
            columns={columns}
            actionIcons={actionIcons}
            totalCount={metadata?.totalCount}
          />
        )}
      </div>
    </div>
  );
};

export default SearchSettingPage;
