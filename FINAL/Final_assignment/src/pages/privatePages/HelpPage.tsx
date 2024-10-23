import React, { useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import Loading from "../components/Loading";
import DataTable from "../../components/table/DataTable";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePagination } from "../../hooks/usePagination";
import useDataFetch from "../../hooks/useDataFetch";

interface HelpDocs {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

const HelpPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const transformData = (helpDocs: HelpDocs[]) =>
    helpDocs.map((helpDoc) => ({
      id: helpDoc.id,
      title: helpDoc.title,
      status: (
        <div className="flex items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full mr-1 ${
              helpDoc.status === "inactive" ? "bg-gray-500" : "bg-green-500"
            }`}
          ></span>
          <span>
            {helpDoc.status.charAt(0).toUpperCase() + helpDoc.status.slice(1)}
          </span>
        </div>
      ),
      createdAt: new Date(helpDoc.createdAt).toLocaleString(),
    }));

  const {
    data: helpDocs,
    loading,
    error,
    totalPages,
    totalCount,
  } = useDataFetch<HelpDocs>(
    "/admins/help-documents",
    page,
    rowsPerPage,
    searchTerm,
    transformData
  );

  const columns = [
    { id: "id", label: "ID", sortable: true },
    { id: "title", label: "Title", sortable: true },
    { id: "status", label: "Status", sortable: true },
    { id: "createdAt", label: "Created Date", sortable: true },
  ];

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Help Documents"
        onSearch={(term) => {
          setSearchTerm(term);
          handleSearch(term);
        }}
        onCreate={handleCreateForm}
        buttonText="Create Help-Documents"
      />
      <div className="flex-grow overflow-auto p-4 bg-slate-50">
        {error ? (
          <div>Error loading data: {error}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <DataTable
            data={helpDocs}
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

export default HelpPage;
