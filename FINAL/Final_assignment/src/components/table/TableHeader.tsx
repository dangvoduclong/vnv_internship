import React from "react";
import ImportExportIcon from "@mui/icons-material/ImportExport";

interface TableHeaderProps {
  columns: { id: string; label: string; sortable?: boolean }[];
  onSort?: (columnId: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, onSort }) => (
  <thead className="sticky top-0 z-30 bg-gray-200">
    <tr>
      {columns.map((column) => (
        <th
          key={column.id}
          className={`sticky top-0 z-30 bg-gray-200 border border-gray-300 border-b-4 px-4 py-2 min-w-60 h-[59px] ${
            column.sortable ? "cursor-pointer hover:bg-gray-300" : ""
          }`}
          onClick={() => column.sortable && onSort?.(column.id)}
        >
          {column.label}
          {column.sortable && (
            <span className="ml-2">
              <ImportExportIcon />
            </span>
          )}
        </th>
      ))}
      <th className="sticky right-0 z-40 top-0 bg-gray-200 border border-gray-300 border-b-4 px-4 py-2 min-w-40 h-[59px]">
        Actions
      </th>
    </tr>
  </thead>
);

export default TableHeader;
