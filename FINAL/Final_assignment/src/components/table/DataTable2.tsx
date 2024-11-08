import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  format?: (value: number) => string;
  render?: (row: Data) => React.ReactNode;
}

interface Data {
  [key: string]: string | number;
}

interface ActionIcon {
  icon: JSX.Element;
  onClick: (row: Data) => void;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column[];
  actionIcons?: ActionIcon[];
  totalCount?: number;
  onChangePage: (newPage: number) => void;
  onChangeLimit: (newLimit: number) => void;
  rowsPerPage: number;
  page: number;
  onRequestSort: (property: string) => void;
}

const DataTable2 = <T extends Data>({
  data,
  columns,
  actionIcons,
  totalCount,
  onChangePage,
  onChangeLimit,
  rowsPerPage,
  page,
  onRequestSort,
}: DataTableProps<T>) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    onChangePage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangeLimit(+event.target.value);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: ["calc(100vh - 145px)", "auto"] }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  <TableSortLabel onClick={() => onRequestSort(column.id)}>
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell
                align="right"
                style={{
                  minWidth: 100,
                  right: 0,
                  background: "white",
                  zIndex: 10,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.render ? column.render(row) : value}
                    </TableCell>
                  );
                })}
                <TableCell
                  align="right"
                  style={{
                    background: "white",
                    position: "sticky",
                    right: 0,
                  }}
                >
                  {actionIcons?.map((action, idx) => (
                    <span
                      key={idx}
                      onClick={() => action.onClick(row)}
                      style={{
                        cursor: "pointer",
                        marginRight: 8,
                        color: "rebeccapurple",
                      }}
                    >
                      {action.icon}
                    </span>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 75]}
        component="div"
        count={totalCount ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable2;
