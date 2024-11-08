import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import Loading from "../../components/common/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import DataTable2 from "../../components/table/DataTable2";
import {
  useCreateVoucher,
  useGetListVoucher,
  useGetVoucherById,
  useUpdateVoucher,
} from "../../hooks/voucher/useVoucher";
import useQueryParams from "../../hooks/common/useQueryParams";
import CreateFormVoucher from "../../components/modal/voucher";

import ConfirmModal from "../../components/modal/common/ConfirmModal";
import toast from "react-hot-toast";
import { RESPONSE_MESSAGE } from "../../constants/global";
import { useNavigate } from "react-router-dom";

interface RowData {
  id: string;
  code: string;
  description: string;
  amount: string;
  type: string;
  minPayAmount: string;
  maxDiscountAmount: string;
  status: string;
  startDate: string;
  endDate: string;
  quantityUse: string;
  numOfUsed: string;
}

const queryDefaults = { page: 1, limit: 25, sort: "status" };

const VoucherPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<RowData | null>(null);
  const selectedVoucherRef = useRef<RowData | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditAction, setIsEditAction] = useState(false);
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
    data: { data: vouchers = [], metadata } = {},
    loading,
    error,
    act: getVoucher,
  } = useGetListVoucher(false, queryParams);

  const { act: createVoucher, error: createError } = useCreateVoucher(false);
  const { act: updateVoucher } = useUpdateVoucher();

  useEffect(() => {
    const paramsWithSearch = {
      ...queryParams,
      ...(searchQuery ? { search: searchQuery } : {}),
    };
    getVoucher(paramsWithSearch);
  }, [queryParams, searchQuery]);

  const columns = [
    { id: "id", label: "ID", minWidth: 170, maxWidth: 170 },
    { id: "code", label: "Code", minWidth: 170, maxWidth: 170 },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => (
        <div className="flex items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full mr-1 ${
              row.status === "inactive"
                ? "bg-gray-500"
                : row.status === "expired"
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          ></span>
          <span>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>
        </div>
      ),
    },
    { id: "startDate", label: "Start Date", minWidth: 170, maxWidth: 170 },
    { id: "endDate", label: "End Date", minWidth: 170, maxWidth: 170 },
    {
      id: "numOfUsed",
      label: "Number of Uses",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => (
        <div className="text-red-500">{`${row.numOfUsed}/${row.quantityUse}`}</div>
      ),
    },
  ];

  const handleCreateForm = () => {
    selectedVoucherRef.current = null;
    setIsOpen(true);
  };

  const handleSubmit = async (data: RowData) => {
    setFormData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (isEditAction) {
      const editActionPayload = {
        id: selectedVoucherRef.current?.id || "",
        status: "inactive",
      };
      await updateVoucher(editActionPayload.id, {
        status: editActionPayload.status,
      })
        .then((res) => {
          if (res && res?.data?.message === RESPONSE_MESSAGE.SUCCESS) {
            getVoucher(queryParams);
            setIsEditAction(false);
            setFormData(null);
            toast.success("Updated successfully");
          }
        })
        .catch((err) => {
          toast.error("Error updating: " + err.message);
          return;
        });
    } else {
      console.log(formData);

      await createVoucher(formData);
      if (createError) {
        toast.error("Error creating: " + createError.message);
        return;
      }
      getVoucher(queryDefaults);
      setFormData(null);
      toast.success("Created successfully");
    }
    setIsConfirmOpen(false);
    setIsOpen(false);
    setFormData(null);
  };

  const actionIcons = [
    {
      icon: <VisibilityIcon />,
      onClick: (row: RowData) => {
        navigate(`/voucher/${row.id}`);
      },
    },
    {
      icon: <DeleteIcon />,
      onClick: (row: RowData) => {
        console.log("Row data", row);
        selectedVoucherRef.current = row;
        setIsEditAction(true);
        setIsConfirmOpen(true);
      },
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
      <CreateFormVoucher
        outletName="Create Voucher"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onSubmit={handleSubmit}
      />
      <ConfirmModal
        message={
          isEditAction
            ? "Are you sure you want to inactive this item?"
            : "Do you want to perform this action?"
        }
        open={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setIsEditAction(false);
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
            data={vouchers || []}
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

export default VoucherPage;
