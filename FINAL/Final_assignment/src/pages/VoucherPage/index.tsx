import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Loading from "../../components/common/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import DataTable2 from "../../components/table/DataTable2";
import { useGetListVoucher } from "../../hooks/voucher/useVoucher";

const VoucherPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const {
    data: { data: vouchers = [], metadata } = {},
    loading,
    error,
    act,
  } = useGetListVoucher(true, {
    page: 1,
    limit: 25,
    sort: "status",
    search: isInitialLoad ? undefined : searchTerm,
  });

  const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "code", label: "Code", minWidth: 170 },
    { id: "status", label: "Status", minWidth: 170 },
    { id: "startDate", label: "Start Date", minWidth: 170 },
    { id: "endDate", label: "End Date", minWidth: 170 },
    { id: "numOfUsed", label: "Number of Uses", minWidth: 170 },
  ];

  interface RowData {
    id: string;
    code: string;
    status: number;
    startDate: string;
    endDate: string;
    numOfUsed: string;
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setIsInitialLoad(false);
  };
  useEffect(() => {
    if (!isInitialLoad) {
      act({ page: 1, limit: 25, sort: "status", search: searchTerm });
    }
  }, [searchTerm]);

  const handleView = (row: RowData) => {
    console.log("View voucher with ID:", row.id);
  };

  const handleDelete = (row: RowData) => {
    console.log("Deleting voucher with ID:", row.id);
  };

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  const actionIcons = [
    {
      icon: <VisibilityIcon />,
      onClick: { handleView },
    },
    {
      icon: <DeleteIcon />,
      onClick: { handleDelete },
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Voucher"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Voucher"
      />
      <div className="flex-grow overflow-auto p-4 bg-slate-50">
        {error ? (
          <div>Error loading data: {error.message}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <DataTable2
            data={vouchers}
            columns={columns}
            actionIcons={actionIcons}
            totalCount={metadata?.totalCount}
          />
        )}
      </div>
    </div>
  );
};

export default VoucherPage;
