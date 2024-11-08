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
import useQueryParams from "../../hooks/common/useQueryParams";

interface RowData {
  id: string;
  keyword: string;
  count: number;
  createdAt: string;
}

const queryDefaults = { page: 1, limit: 25, sort: "-createdAt" };

const SearchSettingPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedSearchSetting, setSelectedSearchSetting] =
    useState<RowData | null>(null);
  const selectedSearchSettingRef = useRef<RowData | null>(null);
  const [formData, setFormData] = useState<RowData | null>(null);
  const [row_id, setRow_id] = useState<string | null>(null);
  const [isDeleteAction, setIsDeleteAction] = useState(false);

  const {
    searchQuery,
    queryParams,
    handleSearch,
    handleChangePageIndex,
    handleChangeLimit,
    handleRequestSort,
  } = useQueryParams(queryDefaults);

  const {
    data: { data: searchSettings = [], metadata } = {},
    loading,
    error: getError,
    act: getSearchSetting,
  } = useGetListSearchSettings(false, queryParams);

  const { act: createSearchSetting, error: createError } =
    useCreateSearchSettings(false, formData ?? {});

  const { act: updateSearchSetting, error: updateError } =
    useUpdateSearchSettings(row_id ?? "", false, formData ?? {});

  const { act: deleteSearchSetting, error: deleteError } =
    useDeleteSearchSettings(row_id ?? "", false);

  const columns = [
    { id: "id", label: "ID", minWidth: 170, maxWidth: 170 },
    { id: "keyword", label: "Text", minWidth: 170, maxWidth: 170 },
    { id: "count", label: "Time", minWidth: 170, maxWidth: 170 },
    {
      id: "createdAt",
      label: "Created Date",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => {
        const date = new Date(row.createdAt);
        const formattedDate = date.toISOString().slice(0, 10);
        const formattedTime =
          String(date.getUTCHours() + 7).padStart(2, "0") +
          ":" +
          String(date.getUTCMinutes()).padStart(2, "0");
        return `${formattedDate} ${formattedTime}`;
      },
    },
  ];

  useEffect(() => {
    const paramsWithSearch = {
      ...queryParams,
      ...(searchQuery ? { search: searchQuery } : {}),
    };
    getSearchSetting(paramsWithSearch);
  }, [searchQuery, queryParams]);

  const handleCreateForm = () => {
    console.log("Creating form...");
    console.log("selectedSearchSetting:", selectedSearchSettingRef);
    selectedSearchSettingRef.current = null;
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
      if (deleteError) {
        toast.error("Error deleting: " + deleteError.message);
        return;
      }
      getSearchSetting({ page: 1, limit: 25, sort: "status" });
      toast.success("Deleted successfully");
    } else {
      let isEditMode = selectedSearchSettingRef.current;
      console.log("isEditMode:", isEditMode);
      if (formData) {
        if (isEditMode) {
          console.log("Updating:", formData);
          await updateSearchSetting(formData.id, formData);
          if (updateError) {
            toast.error("Error updating: " + updateError.message);
            return;
          }
          getSearchSetting({ page: 1, limit: 25, sort: "status" });
          isEditMode = null;
          setFormData(null);
          toast.success("Updated successfully!");
        } else {
          console.log("Creating:", formData);
          await createSearchSetting(formData);
          if (createError) {
            toast.error("Error creating: " + createError.message);
            return;
          }
          getSearchSetting({ page: 1, limit: 25, sort: "status" });
          setFormData(null);
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
        {getError ? (
          <div>Error loading data: {getError.message}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <DataTable2
            data={searchSettings}
            columns={columns}
            actionIcons={actionIcons}
            totalCount={metadata?.totalCount}
            onChangePage={handleChangePageIndex}
            onChangeLimit={handleChangeLimit}
            rowsPerPage={Number(queryParams.limit)}
            page={queryParams.page - 1}
            onRequestSort={handleRequestSort}
          />
        )}
      </div>
    </div>
  );
};

export default SearchSettingPage;
