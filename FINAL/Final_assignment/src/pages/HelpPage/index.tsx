import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import Loading from "../../components/common/Loading";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable2 from "../../components/table/DataTable2";
import ConfirmModal from "../../components/modal/common/ConfirmModal";
import CreateFormHelpDocument from "../../components/modal/help-documents";
import {
  useCreateHelpDocuments,
  useDeleteHelpDocuments,
  useGetListHelpDocuments,
  useUpdateHelpDocuments,
} from "../../hooks/help-documents/useHelpDocuments";
import toast from "react-hot-toast";
import useQueryParams from "../../hooks/common/useQueryParams";
import { QUERY_DEFAULT } from "../../constants/queryDefault";

interface RowData {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  content: string;
}

const HelpPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedHelpDocument, setSelectedHelpDocument] =
    useState<RowData | null>(null);
  const selectedHelpDocumentRef = useRef<RowData | null>(null);

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
  } = useQueryParams(QUERY_DEFAULT.HELP_DOC);

  const {
    data: { data: helpDocuments = [], metadata } = {},
    loading,
    error: getError,
    act: getHelpDocument,
  } = useGetListHelpDocuments(false, queryParams);

  const { act: createHelpDocument, error: createError } =
    useCreateHelpDocuments(false, formData ?? {});
  const { act: updateHelpDocument, error: updateError } =
    useUpdateHelpDocuments(row_id ?? "", false, formData ?? {});
  const { act: deleteHelpDocument, error: deleteError } =
    useDeleteHelpDocuments(row_id ?? "", false);

  const columns = [
    { id: "id", label: "ID", minWidth: 170, maxWidth: 170 },
    { id: "title", label: "Title", minWidth: 170, maxWidth: 170 },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => (
        <div className="flex items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full mr-1 ${
              row.status === "inactive" ? "bg-gray-500" : "bg-green-500"
            }`}
          ></span>
          <span>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>
        </div>
      ),
    },
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
    getHelpDocument(paramsWithSearch);
  }, [searchQuery, queryParams]);

  const handleCreateForm = () => {
    selectedHelpDocumentRef.current = null;
    setIsOpen(true);
  };

  const handleSubmit = async (data: RowData) => {
    setFormData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (isDeleteAction) {
      await deleteHelpDocument(selectedHelpDocumentRef.current?.id ?? "");
      if (deleteError) {
        toast.error("Error deleting: " + deleteError.message);
        return;
      }
      getHelpDocument(QUERY_DEFAULT.HELP_DOC);
      toast.success("Deleted successfully");
    } else {
      let isEditMode = selectedHelpDocumentRef.current;
      if (formData) {
        if (isEditMode) {
          await updateHelpDocument(formData.id, formData);
          if (updateError) {
            toast.error("Error updating: " + updateError.message);
            return;
          }
          getHelpDocument(QUERY_DEFAULT.HELP_DOC);
          isEditMode = null;
          setFormData(null);
          toast.success("Updated successfully!");
        } else {
          await createHelpDocument(formData);
          if (createError) {
            toast.error("Error creating: " + createError.message);
            return;
          }
          getHelpDocument(QUERY_DEFAULT.HELP_DOC);
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
        setRow_id(row.id);
        selectedHelpDocumentRef.current = row;
        setSelectedHelpDocument(row);
        setIsOpen(true);
      },
    },
    {
      icon: <DeleteIcon />,
      onClick: (row: RowData) => {
        setRow_id(row.id);
        selectedHelpDocumentRef.current = row;
        setSelectedHelpDocument(row);
        setIsDeleteAction(true);
        setIsConfirmOpen(true);
      },
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Help Documents"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Help-Documents"
      />
      <CreateFormHelpDocument
        outletName={
          selectedHelpDocument ? "Update Help Document" : "Create Help Document"
        }
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedHelpDocument(null);
        }}
        onSubmit={handleSubmit}
        initialData={
          selectedHelpDocument
            ? {
                title: selectedHelpDocument.title,
                status: selectedHelpDocument.status,
                content: selectedHelpDocument.content,
              }
            : { title: "", status: "active", content: "" }
        }
        isEditMode={!!selectedHelpDocument}
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
          setSelectedHelpDocument(null);
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
            data={helpDocuments}
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

export default HelpPage;
