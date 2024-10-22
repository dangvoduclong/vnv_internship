import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchData } from "../../utils/axiosConfig";
import Loading from "../components/Loading";
import DataTable from "../../components/table/DataTable";

interface Category {
  picture: Picture;
  name: string;
  createdAt: string;
  status: string;
}

interface Picture {
  uri: string;
}

interface ApiResponse {
  message: string;
  data: Category[];
  metadata: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}
const CategoryPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    { id: "name", label: "Name", sortable: false },
    { id: "picture", label: "Image", sortable: false },
    { id: "status", label: "Status", sortable: false },
    { id: "createdAt", label: "Created Date", sortable: false },
  ];

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const response: ApiResponse = await fetchData("/admins/categories", {
          page: 1,
          limit: 25,
          sort: "index",
        });
        setCategories(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div>
      <Header
        outletName="Category"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Category"
      />
      {error ? (
        <div>Error loading data: {error}</div>
      ) : loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="p-4 bg-slate-50 ">
          <DataTable
            data={categories.map((category) => ({
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
                      category.status === "draft"
                        ? "bg-yellow-500"
                        : "bg-green-500"
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
            }))}
            columns={columns}
            actionIcons={{
              edit: <BorderColorRoundedIcon />,
              delete: <DeleteIcon />,
            }}
            pagination={false}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
