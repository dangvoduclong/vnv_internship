import React, { useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../components/common/Loading";
import DataTable from "../../components/table/DataTable";
import useDataFetch from "../../hooks/useDataFetch";

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

const ArticlePage: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const transformData = (articles: Article[]) =>
    articles.map((article) => ({
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
              article.status === "draft" ? "bg-yellow-500" : "bg-green-500"
            }`}
          ></span>
          <span>
            {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
          </span>
        </div>
      ),
    }));

  const {
    data: articles,
    loading,
    error,
  } = useDataFetch<Article>({
    endpoint: "/admins/articles",
    page: 1,
    rowsPerPage: 25,
    params: {
      sort: "index",
      f_type: "article",
    },
    searchTerm,
    transformData,
  });

  const columns = [
    { id: "id", label: "ID", sortable: false },
    { id: "title", label: "Title", sortable: false },
    { id: "author", label: "Author", sortable: false },
    { id: "category", label: "Category", sortable: false },
    { id: "createdAt", label: "Created Date", sortable: false },
    { id: "status", label: "Status", sortable: false },
  ];

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Article"
        onSearch={(term) => {
          setSearchTerm(term);
          handleSearch(term);
        }}
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
            data={articles}
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
