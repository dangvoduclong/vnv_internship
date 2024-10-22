import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fetchData } from "../../utils/axiosConfig";
import Loading from "../components/Loading";
import DataTable from "../../components/table/DataTable";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

interface User {
  fullName: string;
  birthDate: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

interface Address {
  id: string;
  fullAddress: string;
}

interface Picture {
  uri: string;
}

interface DataItem {
  id: string;
  title: string;
  status: string;
  user: User;
  address: Address;
  picture: Picture;
}

interface ApiResponse {
  message: string;
  data: DataItem[];
  metadata: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

const DoulaManagement: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const [doulas, setDoulas] = useState<DataItem[]>([]);
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
    const getDoulas = async () => {
      setLoading(true);
      try {
        const response: ApiResponse = await fetchData("/admins/doulas");
        setDoulas(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getDoulas();
  }, []);

  return (
    <div>
      <Header outletName="Account / Doula Management" onSearch={handleSearch} />
      {error ? (
        <div>Error loading data: {error}</div>
      ) : loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="p-4 bg-slate-50 ">
          <DataTable
            data={doulas.map((doula) => ({
              id: doula.id,
              picture: (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={doula.picture?.uri || "default-avatar-url"}
                    className="w-full h-full object-cover"
                    alt={doula.user.fullName}
                  />
                </div>
              ),
              fullName: doula.user.fullName,
              email: doula.user.email,
              phoneNumber: doula.user.phoneNumber
                ? `${doula.user.countryCode} ${doula.user.phoneNumber}`
                : "",
              birthDate: doula.user.birthDate.split("T")[0],
              address: doula.address.fullAddress,
              status: (
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-1"></span>
                  <span>
                    {doula.status.charAt(0).toUpperCase() +
                      doula.status.slice(1)}
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

export default DoulaManagement;
