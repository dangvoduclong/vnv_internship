import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import Loading from "../../components/common/Loading";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable2 from "../../components/table/DataTable2";
import {
  useCreateAdmin,
  useDeleteAdmin,
  useGetListAdmins,
  useUpdateAdmin,
} from "../../hooks/admin-management/useAdmin";
import useQueryParams from "../../hooks/common/useQueryParams";
import ConfirmModal from "../../components/modal/common/ConfirmModal";
import CreateFormAdmin from "../../components/modal/admin-management";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/common/useAuth";
import { QUERY_DEFAULT } from "../../constants/queryDefault";

interface RowData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  password?: string;
}

const AdminManagement: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<RowData | null>(null);
  const selectedAdminRef = useRef<RowData | null>(null);

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
  } = useQueryParams(QUERY_DEFAULT.ADMIN_DOULA);

  const {
    data: { data: admins = [], metadata } = {},
    loading,
    error,
    act: getAdmins,
  } = useGetListAdmins(false, queryParams);

  const { act: createAdmin, error: createError } = useCreateAdmin(
    false,
    formData ?? {}
  );

  const { act: updateAdmin, error: updateError } = useUpdateAdmin(
    row_id ?? "",
    false,
    formData ?? {}
  );

  const { act: deleteAdmin, error: deleteError } = useDeleteAdmin(
    row_id ?? "",
    false
  );

  const columns = [
    { id: "username", label: "Username", minWidth: 170, maxWidth: 170 },
    { id: "firstName", label: "First Name", minWidth: 170, maxWidth: 170 },
    { id: "lastName", label: "Last Name", minWidth: 170, maxWidth: 170 },
    { id: "email", label: "Email", minWidth: 170, maxWidth: 170 },
    { id: "role", label: "Role", minWidth: 170, maxWidth: 170 },
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
  ];

  useEffect(() => {
    const paramsWithSearch = {
      ...queryParams,
      ...(searchQuery ? { search: searchQuery } : {}),
    };
    getAdmins(paramsWithSearch);
  }, [searchQuery, queryParams]);

  const handleCreateForm = () => {
    selectedAdminRef.current = null;
    setIsOpen(true);
  };

  const handleSubmit = async (data: RowData) => {
    setFormData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (isDeleteAction) {
      await deleteAdmin(selectedAdminRef.current?.id ?? "");
      if (deleteError) {
        toast.error("Error deleting: " + deleteError.message);
        return;
      }
      getAdmins(QUERY_DEFAULT.ADMIN_DOULA);
      toast.success("Deleted successfully");
    } else {
      let isEditMode = selectedAdminRef.current;
      if (formData) {
        if (isEditMode) {
          await updateAdmin(formData.id, formData);
          if (updateError) {
            toast.error("Error updating: " + updateError.message);
            return;
          }
          getAdmins(QUERY_DEFAULT.ADMIN_DOULA);
          isEditMode = null;
          setFormData(null);
          toast.success("Updated successfully");
        } else {
          await createAdmin(formData ?? {});
          if (createError) {
            toast.error("Error creating: " + createError.message);
            return;
          }
          getAdmins(QUERY_DEFAULT.ADMIN_DOULA);
          setFormData(null);
          toast.success("Created successfully");
        }
      }

      setIsConfirmOpen(false);
      setIsOpen(false);
      setFormData(null);
    }
    setIsConfirmOpen(false);
  };

  const actionIcons = [
    {
      icon: <BorderColorRoundedIcon />,
      onClick: (row: RowData) => {
        setRow_id(row.id);
        selectedAdminRef.current = row;
        setSelectedAdmin(row);
        setIsOpen(true);
      },
    },
    {
      icon: <DeleteIcon />,
      onClick: (row: RowData) => {
        if (user?.id !== row.id) {
          setRow_id(row.id);
          selectedAdminRef.current = row;
          setSelectedAdmin(row);
          setIsDeleteAction(true);
          setIsConfirmOpen(true);
        }
      },
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Account / Admin Management"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Admin User"
      />
      <CreateFormAdmin
        outletName={selectedAdmin ? "Update Admin" : "Create Admin"}
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedAdmin(null);
        }}
        onSubmit={handleSubmit}
        initialData={
          selectedAdmin
            ? {
                email: selectedAdmin.email,
                firstName: selectedAdmin.firstName,
                lastName: selectedAdmin.lastName,
                password: selectedAdmin.password,
                status: selectedAdmin.status,
                username: selectedAdmin.username,
              }
            : {
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                status: "",
                username: "",
              }
        }
        isEditMode={!!selectedAdmin}
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
          setSelectedAdmin(null);
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
            data={admins}
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

export default AdminManagement;
