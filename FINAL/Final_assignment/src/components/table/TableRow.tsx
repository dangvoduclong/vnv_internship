import React from "react";
import { IconButton } from "@mui/material";

interface DataRow {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  status: string;
  email: string;
  role: string;
}

interface TableRowProps {
  row: DataRow;
  columns: { id: string; label: string }[];
  actionIcons?: {
    view?: React.ReactNode;
    edit?: React.ReactNode;
    delete?: React.ReactNode;
  };
  index: number;
}

const TableRow: React.FC<TableRowProps> = ({
  row,
  columns,
  actionIcons,
  index,
}) => (
  <tr
    className={index % 2 === 0 ? "bg-white h-[49px]" : "bg-gray-200 h-[49px]"}
  >
    {columns.map((column) => (
      <td
        key={column.id}
        className="z-10 break-all border border-gray-100 px-4 py-2 max-w-60"
      >
        {row[column.id as keyof DataRow]}
      </td>
    ))}
    <td
      className={`sticky right-0 z-20 border border-gray-300 px-4 py-2 ${
        index % 2 === 0 ? "bg-white" : "bg-gray-200"
      }`}
    >
      {actionIcons?.view && (
        <IconButton sx={{ color: "pink" }}>{actionIcons.view}</IconButton>
      )}
      {actionIcons?.edit && (
        <IconButton sx={{ color: "rosybrown" }}>{actionIcons.edit}</IconButton>
      )}
      {actionIcons?.delete && (
        <IconButton sx={{ color: "gray" }}>{actionIcons.delete}</IconButton>
      )}
    </td>
  </tr>
);

export default TableRow;
