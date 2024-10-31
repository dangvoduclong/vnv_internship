import React from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import Loading from "../../components/common/Loading";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable2 from "../../components/table/DataTable2";
import { useGetListAdmins } from "../../hooks/admin-management/useAdmin";

const AdminManagement: React.FC = () => {
  const { handleSearch } = useSearchHandler();

  const {
    data: { data: admins = [], metadata } = {},
    loading,
    error,
  } = useGetListAdmins(true, {
    page: 1,
    limit: 25,
  });

  console.log("data", admins);
  console.log("metadata", metadata);

  const columns = [
    { id: "username", label: "Username", minWidth: 170 },
    { id: "firstName", label: "First Name", minWidth: 170 },
    { id: "lastName", label: "Last Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "status", label: "Status", minWidth: 170 },
  ];

  interface RowData {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
  }

  const actionIcons = [
    {
      icon: <BorderColorRoundedIcon />,
      onClick: (row: RowData) => console.log("Edit", row),
    },
    {
      icon: <DeleteIcon />,
      onClick: (row: RowData) => console.log("View", row.id),
    },
  ];

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Account / Admin Management"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Admin User"
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
          />
        )}
      </div>
    </div>
  );
};

export default AdminManagement;
