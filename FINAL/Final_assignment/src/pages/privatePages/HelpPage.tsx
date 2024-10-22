import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchData } from "../../utils/axiosConfig";
import Loading from "../components/Loading";
import DataTable from "../../components/table/DataTable";

interface HelpDocs {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}
interface ApiResponse {
  message: string;
  data: HelpDocs[];
  metadata: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

const HelpPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();

  const [helpDocs, setHelpDocs] = useState<HelpDocs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    { id: "id", label: "ID", sortable: true },
    { id: "title", label: "Title", sortable: true },
    { id: "status", label: "Status", sortable: true },
    { id: "createdAt", label: "Created Date", sortable: true },
  ];

  useEffect(() => {
    const getHelpDocs = async () => {
      setLoading(true);
      try {
        const response: ApiResponse = await fetchData(
          "/admins/help-documents",
          {
            page: 1,
            limit: 25,
            sort: "-createdAt",
          }
        );
        setHelpDocs(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getHelpDocs();
  }, []);

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div>
      <Header
        outletName="Help Documents"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Help-Documents"
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
            data={helpDocs.map((helpDoc) => ({
              id: helpDoc.id,
              title: helpDoc.title,
              status: (
                <div className="flex items-center">
                  <span
                    className={`w-2.5 h-2.5 rounded-full mr-1 ${
                      helpDoc.status === "inactive"
                        ? "bg-gray-500"
                        : "bg-green-500"
                    }`}
                  ></span>
                  <span>
                    {helpDoc.status.charAt(0).toUpperCase() +
                      helpDoc.status.slice(1)}
                  </span>
                </div>
              ),
              createdAt: (() => {
                const date = new Date(helpDoc.createdAt);
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
            pagination={true}
          />
        </div>
      )}
    </div>
  );
};

export default HelpPage;
