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
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  actionIcons,
  pagination = true,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
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

  const paginatedData = useMemo(
    () =>
      sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedData, page, rowsPerPage]
  );

  const totalPages = useMemo(
    () => Math.ceil(data.length / rowsPerPage),
    [data.length, rowsPerPage]
  );

  const handleChangePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  return (
    <div className="overflow-auto h-screen">
      <div className="overflow-auto shadow-md">
        <div className="overflow-y-auto">
          <table className="min-w-full border-separate border-spacing-0 table-fixed">
            <TableHeader columns={columns} onSort={handleSort} />
            <tbody>
              {paginatedData.map((row, index) => (
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
          rowsPerPage={rowsPerPage}
          dataLength={data.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};

export default DataTable;
