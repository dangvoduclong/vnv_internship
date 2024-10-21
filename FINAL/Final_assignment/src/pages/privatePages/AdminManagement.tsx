import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import DataTable from "../../components/table/DataTable";
import Loading from "../components/Loading";
import { fetchData } from "../../utils/axiosConfig";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
    { id: "username", label: "Username" },
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
    { id: "status", label: "Status" },
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
        <div className="p-4 bg-slate-50">
          <DataTable
            data={admins}
            columns={columns}
            actionIcons={{
              view: <VisibilityIcon />,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
