import React, { useState, useMemo, useCallback } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

interface Column {
  id: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column[];
  actionIcons?: {
    view?: React.ReactNode;
    edit?: React.ReactNode;
    delete?: React.ReactNode;
  };
}

const DataTable = <T,>({
  data = [],
  columns,
  actionIcons,
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = useCallback(
    (columnId: string) => {
      if (sortConfig && sortConfig.key === columnId) {
        setSortConfig({
          key: columnId,
          direction: sortConfig.direction === "asc" ? "desc" : "asc",
        });
      } else {
        setSortConfig({ key: columnId, direction: "asc" });
      }
    },
    [sortConfig]
  );

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    const sorted = [...data].sort((a: T, b: T) => {
      if (a[sortConfig.key as keyof T] < b[sortConfig.key as keyof T]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key as keyof T] > b[sortConfig.key as keyof T]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto shadow-md">
        <table className="min-w-full border-separate border-spacing-0 table-fixed">
          <TableHeader columns={columns} onSort={handleSort} />
          <tbody>
            {sortedData.map((row, index) => (
              <TableRow
                row={row}
                columns={columns}
                actionIcons={actionIcons}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
