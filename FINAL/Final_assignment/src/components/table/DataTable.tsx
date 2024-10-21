// src/components/DataTable.tsx
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DataRow {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  status: string;
  email: string;
  role: string;
}
interface DataTableProps {
  data: DataRow[];
  columns: { id: string; label: string }[];
  actionIcons?: {
    view?: React.ReactNode;
    edit?: React.ReactNode;
  };
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  actionIcons,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div className="overflow-auto h-screen">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="sticky top-0 z-20 border border-gray-300 border-b-4 px-4 py-2 min-w-60 h-[59px]"
                >
                  {column.label}
                </th>
              ))}
              <th className="sticky right-0 z-30 top-0 border border-gray-300 border-b-4 px-4 py-2 min-w-60 h-[59px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <tr
                  key={row.id}
                  className={
                    index % 2 === 0
                      ? "bg-white h-[49px]"
                      : "bg-gray-200 h-[49px]"
                  }
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {row[column.id as keyof DataRow]}
                    </td>
                  ))}
                  <td className="sticky right-0 z-10 border border-gray-300 px-4 py-2">
                    {actionIcons?.view && (
                      <IconButton sx={{ color: "blue" }}>
                        {actionIcons.view}
                      </IconButton>
                    )}
                    {actionIcons?.edit && (
                      <IconButton sx={{ color: "green" }}>
                        {actionIcons.edit}
                      </IconButton>
                    )}
                    <IconButton sx={{ color: "red" }}>
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span>
          Showing {page * rowsPerPage + 1} to{" "}
          {Math.min((page + 1) * rowsPerPage, data.length)} of {data.length}{" "}
          entries
        </span>
        <div>
          <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
            {[5, 10, 15, 20, 50].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={(e) => handleChangePage(e, Math.max(page - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            onClick={(e) =>
              handleChangePage(
                e,
                Math.min(page + 1, Math.ceil(data.length / rowsPerPage) - 1)
              )
            }
            disabled={(page + 1) * rowsPerPage >= data.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
