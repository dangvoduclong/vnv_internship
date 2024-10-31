import React, { useCallback, useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../components/common/Loading";
import DataTable from "../../components/table/DataTable";
import useDataFetch from "../../hooks/useDataFetch";

interface Category {
  picture: Picture;
  name: string;
  createdAt: string;
  status: string;
}

interface Picture {
  uri: string;
}

const CategoryPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const transformData = useCallback(
    (categories: Category[]) =>
      categories.map((category) => ({
        name: category.name,
        picture: category.picture ? (
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={category.picture.uri}
              className="w-full h-full object-cover"
              alt={category.name}
            />
          </div>
        ) : null,
        status: (
          <div className="flex items-center">
            <span
              className={`w-2.5 h-2.5 rounded-full mr-1 ${
                category.status === "draft" ? "bg-yellow-500" : "bg-green-500"
              }`}
            ></span>
            <span>
              {category.status.charAt(0).toUpperCase() +
                category.status.slice(1)}
            </span>
          </div>
        ),
        createdAt: (() => {
          const date = new Date(category.createdAt);
          const formattedDate = date.toISOString().slice(0, 10);
          const formattedTime =
            String(date.getUTCHours() + 7).padStart(2, "0") +
            ":" +
            String(date.getUTCMinutes()).padStart(2, "0");
          return `${formattedDate} ${formattedTime}`;
        })(),
      })),
    []
  );

  const {
    data: categories,
    loading,
    error,
  } = useDataFetch<Category>({
    endpoint: "/admins/categories",
    page: 1,
    rowsPerPage: 25,
    params: {
      sort: "index",
    },
    searchTerm,
    transformData,
  });

  const columns = [
    { id: "name", label: "Name", sortable: false },
    { id: "picture", label: "Image", sortable: false },
    { id: "status", label: "Status", sortable: false },
    { id: "createdAt", label: "Created Date", sortable: false },
  ];

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Category"
        onSearch={(term) => {
          setSearchTerm(term);
          handleSearch(term);
        }}
        onCreate={handleCreateForm}
        buttonText="Create Category"
      />
      <div className="flex-grow overflow-auto p-4 bg-slate-50">
        {error ? (
          <div>Error loading data: {error}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <DataTable
            data={categories}
            columns={columns}
            actionIcons={{
              edit: <BorderColorRoundedIcon />,
              delete: <DeleteIcon />,
            }}
            pagination={false}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
