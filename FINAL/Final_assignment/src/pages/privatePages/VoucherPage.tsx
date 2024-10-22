import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import { fetchData } from "../../utils/axiosConfig";
import Loading from "../components/Loading";
import DataTable from "../../components/table/DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Voucher {
  id: string;
  code: string;
  status: string;
  startDate: string;
  endDate: string;
  numOfUsed: number;
  quantityUse: number;
}

interface ApiResponse {
  message: string;
  data: Voucher[];
  metadata: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

const VoucherPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    { id: "id", label: "ID", sortable: true },
    { id: "code", label: "Code", sortable: true },
    { id: "status", label: "Status", sortable: true },
    { id: "startDate", label: "Start Date", sortable: true },
    { id: "endDate", label: "End Date", sortable: true },
    { id: "numOfUsed", label: "Number of Uses", sortable: true },
  ];

  useEffect(() => {
    const getVouchers = async () => {
      setLoading(true);
      try {
        const response: ApiResponse = await fetchData("/admins/vouchers", {
          page: 1,
          limit: 25,
          sort: "status",
        });
        setVouchers(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getVouchers();
  }, []);

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div>
      <Header
        outletName="Voucher"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Voucher"
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
            data={vouchers.map((voucher) => ({
              id: voucher.id,
              code: voucher.code,
              status: (
                <div className="flex items-center">
                  <span
                    className={`w-2.5 h-2.5 rounded-full mr-1 ${
                      voucher.status === "expired"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  ></span>
                  <span>
                    {voucher.status.charAt(0).toUpperCase() +
                      voucher.status.slice(1)}
                  </span>
                </div>
              ),
              startDate: (() => {
                const date = new Date(voucher.startDate);
                const formattedDate = date.toISOString().slice(0, 10);
                const formattedTime =
                  String(date.getUTCHours() + 7).padStart(2, "0") +
                  ":" +
                  String(date.getUTCMinutes()).padStart(2, "0");
                return `${formattedDate} ${formattedTime}`;
              })(),
              endDate: (() => {
                const date = new Date(voucher.endDate);
                const formattedDate = date.toISOString().slice(0, 10);
                const formattedTime =
                  String(date.getUTCHours() + 7).padStart(2, "0") +
                  ":" +
                  String(date.getUTCMinutes()).padStart(2, "0");
                return `${formattedDate} ${formattedTime}`;
              })(),
              numOfUsed: `${voucher.numOfUsed}/${voucher.quantityUse}`,
            }))}
            columns={columns}
            actionIcons={{
              view: <VisibilityIcon />,
              delete: <DeleteIcon />,
            }}
            pagination={true}
          />
        </div>
      )}
    </div>
  );
};

export default VoucherPage;
