import React, { useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import DataTable from "../../components/table/DataTable";
import Loading from "../components/Loading";
import { usePagination } from "../../hooks/usePagination";
import useDataFetch from "../../hooks/useDataFetch";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  status: string;
  email: string;
  role: string;
}

const AdminManagement: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const transformData = (admins: User[]) =>
    admins.map((admin) => ({
      id: admin.id,
      username: admin.username,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      status: (
        <div className="flex items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              admin.status === "active" ? "bg-green-500" : "bg-red-500"
            } mr-1`}
          ></span>
          <span>
            {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
          </span>
        </div>
      ),
    }));

  const {
    data: admins,
    loading,
    error,
    totalPages,
    totalCount,
  } = useDataFetch<User>(
    "/admins/admins",
    page,
    rowsPerPage,
    searchTerm,
    transformData
  );

  const columns = [
    { id: "username", label: "Username", sortable: true },
    { id: "firstName", label: "First Name", sortable: false },
    { id: "lastName", label: "Last Name", sortable: true },
    { id: "email", label: "Email", sortable: false },
    { id: "status", label: "Status", sortable: true },
  ];

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Account / Admin Management"
        onSearch={handleSearchTermChange}
        onCreate={handleCreateForm}
        buttonText="Create Admin User"
      />
      <div className="flex-grow overflow-auto p-4 bg-slate-50">
        {error ? (
          <div>Error loading data: {error}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <DataTable
            data={admins}
            columns={columns}
            actionIcons={{
              edit: <BorderColorRoundedIcon />,
              delete: <DeleteIcon />,
            }}
            pagination={true}
            page={page - 1}
            rowsPerPage={rowsPerPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default AdminManagement;
