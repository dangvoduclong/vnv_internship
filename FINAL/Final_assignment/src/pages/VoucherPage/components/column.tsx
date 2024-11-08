const VoucherColumns = [
  { id: "id", label: "ID", minWidth: 170, maxWidth: 170 },
  { id: "code", label: "Code", minWidth: 170, maxWidth: 170 },
  { id: "status", label: "Status", minWidth: 170, maxWidth: 170 },
  { id: "startDate", label: "Start Date", minWidth: 170, maxWidth: 170 },
  { id: "endDate", label: "End Date", minWidth: 170, maxWidth: 170 },
  {
    id: "numOfUsed",
    label: "Number of Uses",
    minWidth: 170,
    maxWidth: 170,
    render: (row: RowData) => (
      <div className="text-red-500">{`${row.numOfUsed}/${row.quantityUse}`}</div>
    ),
  },
];
