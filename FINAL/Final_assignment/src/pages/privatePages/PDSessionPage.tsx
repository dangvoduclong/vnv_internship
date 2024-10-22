import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchData } from "../../utils/axiosConfig";
import Loading from "../components/Loading";
import DataTable from "../../components/table/DataTable";

interface PDSession {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  category: Category;
  status: string;
}

interface Category {
  id: string;
  name: string;
}

interface ApiResponse {
  message: string;
  data: PDSession[];
  metadata: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

const PDSessionPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const [pdSessions, setPdSessions] = useState<PDSession[]>([]);
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
    const getPDSessions = async () => {
      setLoading(true);
      try {
        const response: ApiResponse = await fetchData("/admins/articles", {
          page: 1,
          limit: 25,
          sort: "index",
          f_type: "pd",
        });
        setPdSessions(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getPDSessions();
  }, []);

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div>
      <Header
        outletName="PD Session"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create PD Session"
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
            data={pdSessions.map((pdSession) => ({
              id: pdSession.id,
              title: pdSession.title,
              author: pdSession.author,
              category: pdSession.category.name,
              createdAt: (() => {
                const date = new Date(pdSession.createdAt);
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
                      pdSession.status === "draft"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></span>
                  <span>
                    {pdSession.status.charAt(0).toUpperCase() +
                      pdSession.status.slice(1)}
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
        </div>
      )}
    </div>
  );
};

export default PDSessionPage;
