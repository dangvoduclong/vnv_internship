import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import DataTable from "../../components/table/DataTable";
import Loading from "../components/Loading";
import { fetchData } from "../../utils/axiosConfig";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteIcon from "@mui/icons-material/Delete";

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  status: string;
  email: string;
  role: string;
}

interface ApiResponse {
  message: string;
  data: User[];
  metadata: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

const AdminManagement: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const [admins, setAdmins] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    { id: "username", label: "Username", sortable: true },
    { id: "firstName", label: "First Name", sortable: false },
    { id: "lastName", label: "Last Name", sortable: true },
    { id: "email", label: "Email", sortable: false },
    { id: "status", label: "Status", sortable: true },
  ];

  const handleCreateForm = () => {
    console.log("Creating form...");
  };
  useEffect(() => {
    const getAdmins = async () => {
      setLoading(true);
      try {
        const response: ApiResponse = await fetchData("/admins/admins");
        setAdmins(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getAdmins();
  }, []);

  return (
    <div>
      <Header
        outletName="Account / Admin Management"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Admin User"
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
            data={admins.map((admin) => ({
              id: admin.id,
              username: admin.username,
              firstName: admin.firstName,
              lastName: admin.lastName,
              email: admin.email,
              status: (
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-1"></span>
                  <span>
                    {admin.status.charAt(0).toUpperCase() +
                      admin.status.slice(1)}
                  </span>
                </div>
              ),
            }))}
            columns={columns}
            actionIcons={{
              edit: <BorderColorRoundedIcon />,
              delete: <DeleteIcon />,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
