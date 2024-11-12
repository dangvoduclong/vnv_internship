import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import Loading from "../../components/common/Loading";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useQueryParams from "../../hooks/common/useQueryParams";
import { useNavigate } from "react-router-dom";
import DataTable2 from "../../components/table/DataTable2";
import CreateFormDoula from "../../components/modal/doula-management";
import {
  useGetListDoulaManagement,
  useUpdateDoulaManagement,
} from "../../hooks/doula-management/useDoulaManagement";
import ConfirmModal from "../../components/modal/common/ConfirmModal";
import toast from "react-hot-toast";
import { QUERY_DEFAULT } from "../../constants/queryDefault";

interface User {
  [key: string]: string | number | undefined;
  fullName: string;
  birthDate: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

interface Address {
  fullAddress: string;
}

interface Picture {
  uri: string;
}

interface RowData {
  id: string;
  user: User;
  address: Address;
  picture: Picture;
  status: string;
}

const DoulaManagement: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<RowData | null>(null);
  const selectedDoulaRef = useRef<RowData | null>(null);
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
  } = useQueryParams(QUERY_DEFAULT.ADMIN_DOULA);

  const {
    data: { data: doula = [], metadata } = {},
    loading,
    error,
    act: getDoula,
  } = useGetListDoulaManagement(false, queryParams);

  const { act: updateDoula } = useUpdateDoulaManagement(
    row_id ?? "",
    false,
    formData ?? {}
  );

  useEffect(() => {
    const paramsWithSearch = {
      ...queryParams,
      ...(searchQuery ? { search: searchQuery } : {}),
    };
    getDoula(paramsWithSearch);
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
    {
      id: "fullName",
      label: "Full Name",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => <div>{row.user.fullName}</div>,
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => <div>{row.user.email}</div>,
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => (
        <div>
          {row.user.phoneNumber
            ? `${row.user.countryCode} ${row.user.phoneNumber}`
            : ""}
        </div>
      ),
    },
    {
      id: "birthDate",
      label: "Birthday",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => <div>{row.user.birthDate.split("T")[0]}</div>,
    },
    {
      id: "address",
      label: "Address",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => (
        <div className="flex items-center">
          <span>{row.address?.fullAddress || ""}</span>
        </div>
      ),
    },
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
      await updateDoula(formData.id, formData);
      setIsConfirmOpen(false);
      getDoula(QUERY_DEFAULT.ADMIN_DOULA);
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
        selectedDoulaRef.current = row;
        console.log(row);
        setIsOpen(true);
      },
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header outletName="Account / Doula Management" onSearch={handleSearch} />
      <CreateFormDoula
        outletName="Update Doula"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        initialData={
          selectedDoulaRef.current
            ? {
                phoneNumber: selectedDoulaRef.current?.user?.phoneNumber,
                status: selectedDoulaRef.current?.status,
              }
            : {
                phoneNumber: "",
                status: "",
              }
        }
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
            data={doula}
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

export default DoulaManagement;
