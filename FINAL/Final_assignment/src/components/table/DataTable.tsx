import React, { useState, useMemo, useCallback } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "./Pagination";

interface DataTableProps {
  data: Record<string, any>[];
  columns: { id: string; label: string; sortable?: boolean }[];
  actionIcons?: {
    view?: React.ReactNode;
    edit?: React.ReactNode;
    delete?: React.ReactNode;
  };
  pagination?: boolean;
  page: number;
  rowsPerPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  actionIcons,
  pagination = true,
  page,
  rowsPerPage,
  totalPages,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
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

    const sorted = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 table-fixed">
            <TableHeader columns={columns} onSort={handleSort} />
            <tbody>
              {sortedData.map((row, index) => (
                <TableRow
                  key={row.id}
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
      {pagination && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
          dataLength={data.length}
          onChangePage={onPageChange}
          onChangeRowsPerPage={onRowsPerPageChange}
        />
      )}
    </div>
  );
};

export default DataTable;
