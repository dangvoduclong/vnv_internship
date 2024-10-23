import React, { useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import DataTable from "../../components/table/DataTable";
import Loading from "../components/Loading";
import { usePagination } from "../../hooks/usePagination";
import useDataFetch from "../../hooks/useDataFetch";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";

interface SearchSetting {
  id: string;
  keyword: string;
  count: string;
  createdAt: string;
}

const SearchSettingPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const transformData = (settings: SearchSetting[]) =>
    settings.map((setting) => ({
      id: setting.id,
      keyword: setting.keyword,
      count: setting.count,
      createdAt: (() => {
        const date = new Date(setting.createdAt);
        const formattedDate = date.toISOString().slice(0, 10);
        const formattedTime =
          String(date.getUTCHours() + 7).padStart(2, "0") +
          ":" +
          String(date.getUTCMinutes()).padStart(2, "0");
        return `${formattedDate} ${formattedTime}`;
      })(),
    }));

  const {
    data: searchSettings,
    loading,
    error,
    totalPages,
    totalCount,
  } = useDataFetch<SearchSetting>(
    "/admins/trending-keywords",
    page,
    rowsPerPage,
    searchTerm,
    transformData
  );

  const columns = [
    { id: "id", label: "ID", sortable: false },
    { id: "keyword", label: "Text", sortable: true },
    { id: "count", label: "Time", sortable: true },
    { id: "createdAt", label: "Created Date", sortable: true },
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
        outletName="Search Settings"
        onSearch={handleSearchTermChange}
        onCreate={handleCreateForm}
        buttonText="Create"
      />
      <div className="flex-grow overflow-auto p-4 bg-slate-50">
        {error ? (
          <div>Error loading data: {error}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <DataTable
            data={searchSettings}
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

export default SearchSettingPage;
