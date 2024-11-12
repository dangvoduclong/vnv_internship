import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useParams } from "react-router-dom";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Loading from "../../components/common/Loading";
import { useGetPackageById } from "../../hooks/doula-management/useDoulaManagement";

interface Picture {
  uri: string;
}

interface User {
  picture: Picture;
  fullName: string;
  email: string;
  createdAt: string;
  status: string;
}
interface RowData {
  createdAt: string;
  id: string;
  status?: string;
  user: User;
}
const DoulaPackagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: { data: DoulaPackageId } = {},
    loading,
    error,
  } = useGetPackageById(id ?? "", !!id);
  console.log("DoulaPackageId", DoulaPackageId);

  const columns = [
    {
      id: "picture",
      label: "Avatar",
      render: (row: RowData) => (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={row.user.picture?.uri || "default-avatar-url"}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      id: "fullName",
      label: "Full name",
      render: (row: RowData) => <div>{row.user.fullName}</div>,
    },
    {
      id: "email",
      label: "Email",
      render: (row: RowData) => <div>{row.user.email}</div>,
    },
    {
      id: "createdAt",
      label: "Start date",
      render: (row: RowData) => {
        return <div>{row.createdAt.split("T")[0]}</div>;
      },
    },
    {
      id: "status",
      label: "Status",
      render: (row: RowData) => (
        <div className="flex items-center">
          <span
            className={`w-2.5 h-2.5 rounded-full mr-1 ${
              row.user.status === "inactive" ? "bg-gray-500" : "bg-green-500"
            }`}
          ></span>
          <span>
            {row.user.status.charAt(0).toUpperCase() + row.user.status.slice(1)}
          </span>
        </div>
      ),
    },
  ];

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
  return (
    <div className="bg-slate-100">
      <h1 className="text-2xl border-b pb-2 mb-4 p-2">
        Voucher Detail / {DoulaPackageId?.id}
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
        <h3 className="text-lg font-bold mb-4">Package Information</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Cover photo:</strong>
            <div className="w-10 h-10 overflow-hidden">
              <img
                src={DoulaPackageId?.picture?.uri}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <strong>Package Name:</strong> {DoulaPackageId?.name}
          </div>
          <div>
            <strong>Short Description:</strong>{" "}
            {DoulaPackageId?.shortDescription}
          </div>
          <div>
            <strong>Price:</strong>{" "}
            {DoulaPackageId?.price
              ? DoulaPackageId?.price
                  .replace(/^<p>(.*?)<\/p>$/, "$1")
                  .replace(/<br\s*\/?>/g, "")
              : "No price available"}
          </div>
          <div>
            <strong>Created date:</strong>{" "}
            {DoulaPackageId?.createdAt
              ? DoulaPackageId?.createdAt.split("T")[0]
              : "No creation date available"}
          </div>

          <div>
            <strong>What's Included:</strong>{" "}
            {DoulaPackageId?.description
              ? DoulaPackageId?.description
                  .replace(/^<p>(.*?)<\/p>$/, "$1")
                  .replace(/<br\s*\/?>/g, "")
              : "No description available"}
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(DoulaPackageId?.cares) &&
            DoulaPackageId?.cares.length > 0 ? (
              DoulaPackageId?.cares.map((row: RowData) => (
                <TableRow key={row.user.email}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.render
                        ? column.render(row)
                        : row[column.id] ?? "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DoulaPackagePage;
