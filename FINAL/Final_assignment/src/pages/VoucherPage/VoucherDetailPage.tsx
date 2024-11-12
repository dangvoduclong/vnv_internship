import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetVoucherById } from "../../hooks/voucher/useVoucher";
import Loading from "../../components/common/Loading";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useQueryParams from "../../hooks/common/useQueryParams";
import { useGetDoulaVoucherId } from "../../hooks/doula-management/useDoulaManagement";
import { QUERY_DEFAULT } from "../../constants/queryDefault";

const VoucherDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: voucherID, loading, error } = useGetVoucherById(id ?? "", !!id);

  const { queryParams, handleChangePageIndex, handleChangeLimit } =
    useQueryParams(QUERY_DEFAULT.ADMIN_DOULA);

  const { data: { data: doulaID = [], metadata } = {}, act: getDoulaId } =
    useGetDoulaVoucherId(true, { ...queryParams, f_voucherId: id });

  useEffect(() => {
    getDoulaId(queryParams);
  }, [id]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    handleChangePageIndex(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChangeLimit(+event.target.value);
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const formattedDate = date.toISOString().slice(0, 10);
    const formattedTime =
      String(date.getUTCHours() + 7).padStart(2, "0") +
      ":" +
      String(date.getUTCMinutes()).padStart(2, "0");
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="bg-slate-100">
      <h1 className="text-2xl border-b pb-2 mb-4 p-2">
        Voucher Detail / {voucherID?.data?.id}
      </h1>
      <div className="mb-4 ml-8">
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => window.history.back()}
        >
          <ArrowBackIcon /> BACK
        </IconButton>
      </div>
      <div className="bg-white p-4 border rounded-md">
        <h3 className="text-lg font-bold mb-4">Voucher Information</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Code:</strong> {voucherID?.data?.code}
          </div>
          <div>
            <strong>Start Date:</strong>{" "}
            {voucherID?.data?.startDate
              ? formatDateTime(voucherID?.data?.startDate)
              : "N/A"}
          </div>
          <div>
            <strong>End Date:</strong>{" "}
            {voucherID?.data?.endDate
              ? formatDateTime(voucherID?.data?.endDate)
              : "N/A"}
          </div>
          <div>
            <strong>Number Of Use:</strong> {voucherID?.data?.numOfUsed}/
            {voucherID?.data?.quantityUse}
          </div>
          <div>
            <strong>Type of Coupon:</strong> {voucherID?.data?.type}
          </div>
          <div>
            <strong>Amount:</strong>{" "}
            {voucherID?.data?.amount
              ? `%${parseFloat(voucherID?.data?.amount).toFixed(0)}`
              : "N/A"}
          </div>

          <div>
            <strong>Condition:</strong>{" "}
            {voucherID?.data?.minPayAmount
              ? `$${voucherID?.data?.minPayAmount}`
              : "N/A"}
          </div>
          <div>
            <strong>Max Discount Amount:</strong>{" "}
            {`$${voucherID?.data?.maxDiscountAmount}`}
          </div>
        </div>
        <div>
          <strong>Description:</strong> {voucherID?.data?.description || "-"}
        </div>

        {/* Table for Take by and Date */}
        <TableContainer className="mt-4">
          <Table className="min-w-full border">
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell className="p-2 border-r text-left">
                  Take by
                </TableCell>
                <TableCell className="p-2 text-left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doulaID?.map((record, index) => (
                <TableRow key={index} className="border-t">
                  <TableCell className="p-2 border-r">
                    {record.doulaUser.fullName}
                  </TableCell>
                  <TableCell className="p-2">
                    {
                      new Date(record.createdAt ?? "")
                        .toISOString()
                        .split("T")[0]
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 75]}
          component="div"
          count={
            metadata?.totalCount !== undefined ? Number(metadata.totalCount) : 0
          }
          rowsPerPage={Number(queryParams.limit)}
          page={queryParams.page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default VoucherDetailPage;
