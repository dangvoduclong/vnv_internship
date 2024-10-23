import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchData } from "../../utils/axiosConfig";
import Loading from "../components/Loading";
import DataTable from "../../components/table/DataTable";

interface Article {
  id: string;
  title: string;
  status: string;
  author: string;
  createdAt: string;
  category: Category;
}

interface Category {
  id: string;
  name: string;
}

interface ApiResponse {
  message: string;
  data: Article[];
  metadata: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}
const ArticlePage: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    { id: "id", label: "ID", sortable: false },
    { id: "title", label: "Title", sortable: false },
    { id: "author", label: "Author", sortable: false },
    { id: "category", label: "Category", sortable: false },
    { id: "createdAt", label: "Created Date", sortable: false },
    { id: "status", label: "Status", sortable: false },
  ];

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const response: ApiResponse = await fetchData("/admins/articles", {
          page: 1,
          limit: 25,
          sort: "index",
          f_type: "article",
        });
        setArticles(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Article"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Article"
      />
      <div className="flex-grow overflow-auto p-4 bg-slate-50 ">
        {error ? (
          <div>Error loading data: {error}</div>
        ) : loading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <DataTable
            data={articles.map((article) => ({
              id: article.id,
              title: article.title,
              author: article.author,
              category: article.category.name,
              createdAt: (() => {
                const date = new Date(article.createdAt);
                const formattedDate = date.toISOString().slice(0, 10);
                const formattedTime =
                  String(date.getUTCHours() + 7).padStart(2, "0") +
                  ":" +
                  String(date.getUTCMinutes()).padStart(2, "0");
                return `${formattedDate} ${formattedTime}`;
              })(),
              status: (
                <div className="flex items-center">
                  <span
                    className={`w-2.5 h-2.5 rounded-full mr-1 ${
                      article.status === "draft"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></span>
                  <span>
                    {article.status.charAt(0).toUpperCase() +
                      article.status.slice(1)}
                  </span>
                </div>
              ),
            }))}
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

export default ArticlePage;
