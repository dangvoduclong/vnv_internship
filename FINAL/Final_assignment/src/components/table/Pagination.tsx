import React from "react";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface PaginationProps {
  page: number;
  totalPages: number;
  rowsPerPage: number;
  dataLength: number;
  onChangePage: (newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  rowsPerPage,
  dataLength,
  onChangePage,
  onChangeRowsPerPage,
}) => (
  <div className="flex items-center justify-between h-14 p-4">
    <span>
      Showing {page * rowsPerPage + 1} to{" "}
      {Math.min((page + 1) * rowsPerPage, dataLength)} of {dataLength} entries
    </span>

    <div className="flex items-center">
      <select
        className="border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer hover:border-green-500 focus:border-green-500 p-2 text-gray-700 bg-white mr-3"
        value={rowsPerPage}
        onChange={onChangeRowsPerPage}
      >
        {[5, 10, 25, 50].map((option) => (
          <option key={option} value={option}>
            {option} per page
          </option>
        ))}
      </select>
      <IconButton
        className={`mr-3 ${page === 0 ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={() => onChangePage(Math.max(page - 1, 0))}
        disabled={page === 0}
      >
        <ArrowBackIosIcon />
      </IconButton>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onChangePage(index)}
          className={`mx-1 px-3 py-1 border rounded ${
            index === page
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <IconButton
        className={`ml-3 ${
          (page + 1) * rowsPerPage >= dataLength
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
        onClick={() => onChangePage(Math.min(page + 1, totalPages - 1))}
        disabled={(page + 1) * rowsPerPage >= dataLength}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  </div>
);

export default Pagination;
