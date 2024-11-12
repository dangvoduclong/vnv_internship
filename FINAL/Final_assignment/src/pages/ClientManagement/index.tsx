import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import DataTable from "../../components/table/DataTable";
import Loading from "../../components/common/Loading";
import { usePagination } from "../../hooks/common/usePagination";
import useDataFetch from "../../hooks/useDataFetch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { render } from "react-dom";
import useQueryParams from "../../hooks/common/useQueryParams";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/modal/common/ConfirmModal";
import DataTable2 from "../../components/table/DataTable2";

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

interface Address {
  fullAddress: string;
}

interface Picture {
  uri: string;
}

const queryDefaults = { page: 1, limit: 25 };

const ClientManagement: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<RowData | null>(null);
  const selectedClientRef = useRef<RowData | null>(null);
  const [row_id, setRow_id] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const {
    searchQuery,
    queryParams,
    handleSearch,
    handleChangePageIndex,
    handleChangeLimit,
    handleRequestSort,
  } = useQueryParams(queryDefaults);

  const {
    data: { data: client = [], metadata } = {},
    loading,
    error,
    act: getClient,
  } = useGetListClientManagement(false, queryParams);

  useEffect(() => {
    const paramsWithSearch = {
      ...queryParams,
      ...(searchQuery ? { search: searchQuery } : {}),
    };
    getClient(paramsWithSearch);
  }, [queryParams, searchQuery]);

  const columns = [
    {
      id: "picture",
      label: "Avatar",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={row.picture?.uri || "default-avatar-url"}
            className="w-full h-full object-cover"
            alt={row.user.fullName}
          />
        </div>
      ),
    },
    { id: "fullName", label: "Full Name", minWidth: 170, maxWidth: 170 },
    { id: "email", label: "Email", minWidth: 170, maxWidth: 170 },
    {
      id: "phoneNumber",
      label: "Phone Number",
      render: (row: RowData) =>
        row.phoneNumber ? `${row.countryCode} ${row.phoneNumber}` : "",
    },
    {
      id: "birthDate",
      label: "Birthday",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => row.birthDate.split("T")[0],
    },
    { id: "address", label: "Address", minWidth: 170, maxWidth: 170 },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => (
        <div className="flex items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full mr-1 ${
              row.status === "inactive" ? "bg-gray-500" : "bg-green-500"
            }`}
          ></span>
          <span>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>
        </div>
      ),
    },
  ];

  const handleSubmit = async (data: RowData) => {
    setFormData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (formData) {
      await updateClient(formData.id, formData);
      setIsConfirmOpen(false);
      getClient(queryDefaults);
      setFormData(null);
      toast.success("Updated successfully");
    }
  };

  const actionIcons = [
    {
      icon: <VisibilityIcon />,
      onClick: (row: RowData) => {
        navigate(`/account/doulas/${row.id}`);
      },
    },
    {
      icon: <BorderColorRoundedIcon />,
      onClick: (row: RowData) => {
        setRow_id(row.id);
        selectedClientRef.current = row;
        console.log(row);
        setIsOpen(true);
      },
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header
        outletName="Account / Client Management"
        onSearch={handleSearch}
      />
      <ConfirmModal
        message="Do you want to perform this action?"
        open={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setRow_id(null);
        }}
        onConfirm={handleConfirm}
      />
      <div className="flex-grow overflow-auto p-4 bg-slate-50">
        {error ? (
          <div>Error loading data: {error.message}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <DataTable2
            data={client}
            columns={columns}
            actionIcons={actionIcons}
            totalCount={
              metadata?.totalCount !== undefined
                ? Number(metadata.totalCount)
                : 0
            }
            onChangePage={handleChangePageIndex}
            onChangeLimit={handleChangeLimit}
            rowsPerPage={Number(queryParams.limit)}
            page={queryParams.page - 1}
            onRequestSort={handleRequestSort}
          />
        )}
      </div>
    </div>
  );
};

export default ClientManagement;
