import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import { fetchData } from "../../utils/axiosConfig";
import Loading from "../components/Loading";
import DataTable from "../../components/table/DataTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

interface User {
  id: string;
  fullName: string;
  birthDate: string;
  email: string;
  countryCode: string;
  status: string;
  phoneNumber: string;
  address: Address;
  picture: Picture;
}

interface PictureMetadata {
  thumbnail: {
    uri: string;
    key: string;
  };
  medium: {
    uri: string;
    key: string;
  };
}

interface Picture {
  id: string;
  uri: string;
  type: string;
  metadata: PictureMetadata;
  createdAt: string;
}

interface Address {
  fullAddress: string;
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

const ClientManagement: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    { id: "picture", label: "Avatar", sortable: false },
    { id: "fullName", label: "Full Name", sortable: true },
    { id: "email", label: "Email", sortable: false },
    { id: "phoneNumber", label: "Phone Number", sortable: false },
    { id: "birthDate", label: "Birthday", sortable: false },
    { id: "address", label: "Address", sortable: false },
    { id: "status", label: "Status", sortable: true },
  ];

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response: ApiResponse = await fetchData("/admins/users", {
          page: 1,
          limit: 25,
          embed: "address.fullAddress",
        });
        setUsers(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <Header
        outletName="Account / Client Management"
        onSearch={handleSearch}
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
            data={users.map((user) => ({
              id: user.id,
              picture: (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={user.picture?.uri || "default-avatar-url"}
                    className="w-full h-full object-cover"
                    alt={user.fullName}
                  />
                </div>
              ),
              fullName: user.fullName,
              email: user.email,
              phoneNumber: user.phoneNumber
                ? `${user.countryCode} ${user.phoneNumber}`
                : "",
              birthDate: user.birthDate.split("T")[0],
              address: user.address?.fullAddress,
              status: (
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-1"></span>
                  <span>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>
              ),
            }))}
            columns={columns}
            actionIcons={{
              view: <VisibilityIcon />,
              edit: <BorderColorRoundedIcon />,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
