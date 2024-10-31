import React from "react";
import { IconButton } from "@mui/material";

interface TableRowProps<T> {
  row: T;
  columns: { id: string; label: string }[];
  actionIcons?: {
    view?: React.ReactNode;
    edit?: React.ReactNode;
    delete?: React.ReactNode;
  };
  index: number;
}

const TableRow = <T,>({
  row,
  columns,
  actionIcons,
  index,
}: TableRowProps<T>) => (
  <tr
    className={index % 2 === 0 ? "bg-white h-[49px]" : "bg-gray-200 h-[49px]"}
  >
    {columns.map((column) => (
      <td
        key={column.id as string}
        className="z-10 break-all border border-gray-100 px-4 py-2 max-w-60"
      >
        {row[column.id as keyof T] as React.ReactNode}
      </td>
    ))}
    <td
      className={`sticky right-0 z-20 border border-gray-300 px-4 py-2 ${
        index % 2 === 0 ? "bg-white" : "bg-gray-200"
      }`}
    >
      {actionIcons?.view && (
        <IconButton sx={{ color: "pink" }} title="View">
          {actionIcons.view}
        </IconButton>
      )}
      {actionIcons?.edit && (
        <IconButton sx={{ color: "rosybrown" }} title="Edit">
          {actionIcons.edit}
        </IconButton>
      )}
      {actionIcons?.delete && (
        <IconButton sx={{ color: "gray" }} title="Delete">
          {actionIcons.delete}
        </IconButton>
      )}
    </td>
  </tr>
);

export default TableRow;
