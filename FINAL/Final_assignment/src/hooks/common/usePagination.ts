import { useState } from "react";

export const usePagination = (initialRowsPerPage: number = 25) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return {
    page,
    rowsPerPage,
    totalPages,
    totalCount,
    setTotalPages,
    setTotalCount,
    handlePageChange,
    handleRowsPerPageChange,
  };
};
