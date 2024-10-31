import React from "react";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChangePage: (newPage: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onChangePage,
  rowsPerPage,
  onChangeRowsPerPage,
}) => (
  <div className="flex items-center justify-between h-14 p-4 bottom-0 w-full">
    <div>
      <select value={rowsPerPage} onChange={onChangeRowsPerPage}>
        {[5, 10, 25].map((option) => (
          <option key={option} value={option}>
            {option} per page
          </option>
        ))}
      </select>
    </div>
    <div>
      <IconButton onClick={() => onChangePage(page - 1)} disabled={page <= 0}>
        <ArrowBackIosIcon />
      </IconButton>
      <span>{`Page ${page + 1} of ${totalPages}`}</span>
      <IconButton
        onClick={() => onChangePage(page + 1)}
        disabled={page + 1 >= totalPages}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  </div>
);

export default Pagination;
