import React, { useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import DataTable from "../../components/table/DataTable";
import Loading from "../components/Loading";
import { usePagination } from "../../hooks/usePagination";
import useDataFetch from "../../hooks/useDataFetch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

interface User {
  id: string;
  fullName: string;
  birthDate: string;
  email: string;
  countryCode: string;
  status: string;
  phoneNumber: string;
  address: Address;
  picture: Picture;
}

interface Address {
  fullAddress: string;
}

interface Picture {
  uri: string;
}

const ClientManagement: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const transformData = (users: User[]) =>
    users.map((user) => ({
      id: user.id,
      picture: (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={user.picture?.uri || "default-avatar-url"}
            className="w-full h-full object-cover"
            alt={user.fullName}
          />
        </div>
      ),
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber
        ? `${user.countryCode} ${user.phoneNumber}`
        : "",
      birthDate: user.birthDate.split("T")[0],
      address: user.address?.fullAddress,
      status: (
        <div className="flex items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              user.status === "active" ? "bg-green-500" : "bg-red-500"
            } mr-1`}
          ></span>
          <span>
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </span>
        </div>
      ),
    }));

  const {
    data: users,
    loading,
    error,
    totalPages,
    totalCount,
  } = useDataFetch<User>(
    "/admins/users",
    page,
    rowsPerPage,
    searchTerm,
    transformData
  );

  const columns = [
    { id: "picture", label: "Avatar", sortable: false },
    { id: "fullName", label: "Full Name", sortable: true },
    { id: "email", label: "Email", sortable: false },
    { id: "phoneNumber", label: "Phone Number", sortable: false },
    { id: "birthDate", label: "Birthday", sortable: false },
    { id: "address", label: "Address", sortable: false },
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
        outletName="Account / Client Management"
        onSearch={handleSearchTermChange}
        onCreate={handleCreateForm}
        buttonText="Create Client"
      />
      <div className="flex-grow overflow-auto p-4 bg-slate-50">
        {error ? (
          <div>Error loading data: {error}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <DataTable
            data={users}
            columns={columns}
            actionIcons={{
              view: <VisibilityIcon />,
              edit: <BorderColorRoundedIcon />,
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

export default ClientManagement;
