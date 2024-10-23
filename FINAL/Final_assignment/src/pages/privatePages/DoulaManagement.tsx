import React, { useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import DataTable from "../../components/table/DataTable";
import Loading from "../components/Loading";
import { usePagination } from "../../hooks/usePagination";
import useDataFetch from "../../hooks/useDataFetch";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface User {
  fullName: string;
  birthDate: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

interface Address {
  fullAddress: string;
}

interface Picture {
  uri: string;
}

interface DataItem {
  id: string;
  user: User;
  address: Address;
  picture: Picture;
  status: string;
}

const DoulaManagement: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const transformData = (doulas: DataItem[]) =>
    doulas.map((doula) => ({
      id: doula.id,
      picture: (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={doula.picture?.uri || "default-avatar-url"}
            className="w-full h-full object-cover"
            alt={doula.user.fullName}
          />
        </div>
      ),
      fullName: doula.user.fullName,
      email: doula.user.email,
      phoneNumber: doula.user.phoneNumber
        ? `${doula.user.countryCode} ${doula.user.phoneNumber}`
        : "",
      birthDate: doula.user.birthDate.split("T")[0],
      address: doula.address.fullAddress,
      status: (
        <div className="flex items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              doula.status === "active" ? "bg-green-500" : "bg-red-500"
            } mr-1`}
          ></span>
          <span>
            {doula.status.charAt(0).toUpperCase() + doula.status.slice(1)}
          </span>
        </div>
      ),
    }));

  const {
    data: doulas,
    loading,
    error,
    totalPages,
    totalCount,
  } = useDataFetch<DataItem>(
    "/admins/doulas",
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
        outletName="Account / Doula Management"
        onSearch={handleSearchTermChange}
        onCreate={handleCreateForm}
        buttonText="Create Doula"
      />
      <div className="flex-grow overflow-auto p-4 bg-slate-50">
        {error ? (
          <div>Error loading data: {error}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <DataTable
            data={doulas}
            columns={columns}
            actionIcons={{
              view: <VisibilityIcon />,
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

export default DoulaManagement;
