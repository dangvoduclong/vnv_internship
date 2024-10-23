import React, { useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import Loading from "../components/Loading";
import DataTable from "../../components/table/DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { usePagination } from "../../hooks/usePagination";
import useDataFetch from "../../hooks/useDataFetch";

interface Voucher {
  id: string;
  code: string;
  status: string;
  startDate: string;
  endDate: string;
  numOfUsed: number;
  quantityUse: number;
}

const VoucherPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    usePagination();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const transformData = (vouchers: Voucher[]) =>
    vouchers.map((voucher) => ({
      id: voucher.id,
      code: voucher.code,
      status: (
        <div className="flex items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full mr-1 ${
              voucher.status === "expired" ? "bg-red-500" : "bg-green-500"
            }`}
          ></span>
          <span>
            {voucher.status.charAt(0).toUpperCase() + voucher.status.slice(1)}
          </span>
        </div>
      ),
      startDate: new Date(voucher.startDate).toLocaleString(),
      endDate: new Date(voucher.endDate).toLocaleString(),
      numOfUsed: `${voucher.numOfUsed}/${voucher.quantityUse}`,
    }));

  const {
    data: vouchers,
    loading,
    error,
    totalPages,
    totalCount,
  } = useDataFetch<Voucher>(
    "/admins/vouchers",
    page,
    rowsPerPage,
    searchTerm,
    transformData
  );

  const columns = [
    { id: "id", label: "ID", sortable: true },
    { id: "code", label: "Code", sortable: true },
    { id: "status", label: "Status", sortable: true },
    { id: "startDate", label: "Start Date", sortable: true },
    { id: "endDate", label: "End Date", sortable: true },
    { id: "numOfUsed", label: "Number of Uses", sortable: true },
  ];

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Voucher"
        onSearch={(term) => {
          setSearchTerm(term);
          handleSearch(term);
        }}
        onCreate={handleCreateForm}
        buttonText="Create Voucher"
      />
      <div className="flex-grow overflow-auto p-4 bg-slate-50">
        {error ? (
          <div>Error loading data: {error}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <DataTable
            data={vouchers}
            columns={columns}
            actionIcons={{
              view: <VisibilityIcon />,
              delete: <DeleteIcon />,
            }}
            pagination={true}
            page={page - 1}
            rowsPerPage={rowsPerPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default VoucherPage;
