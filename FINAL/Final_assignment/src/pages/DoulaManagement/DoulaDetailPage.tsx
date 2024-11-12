import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useQueryParams from "../../hooks/common/useQueryParams";
import {
  useGetDoulaById,
  useGetDoulaPackageId,
} from "../../hooks/doula-management/useDoulaManagement";
import { QUERY_DEFAULT } from "../../constants/queryDefault";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Picture {
  uri: string;
}
interface RowData {
  id: string;
  name: string;
  picture: Picture;
  price: string;
  createdAt: string;
  numberOfClients: string;
}
const DoulaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [value, setValue] = useState<string>("1");
  const navigate = useNavigate();

  const { queryParams, handleChangePageIndex, handleChangeLimit } =
    useQueryParams(QUERY_DEFAULT.ADMIN_DOULA);

  const {
    data: doulaByID,
    loading,
    error,
    act: getDoulaById,
  } = useGetDoulaById(id ?? "", !!id);

  useEffect(() => {
    getDoulaById(queryParams);
  }, [id]);

  const {
    data: { data: doulaPackageId = [], metadata } = {},
    act: getDoulaPackageId,
  } = useGetDoulaPackageId(false, { ...queryParams, f_doulaId: id });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === "2") {
      getDoulaPackageId(queryParams);
    }
  }, [value]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const photos = doulaByID?.data?.photos || [];
  const itemData = photos.map((photo) => ({
    img: photo?.media?.uri,
  }));

  const columns = [
    { id: "name", label: "Package Name", minWidth: 170, maxWidth: 170 },
    {
      id: "picture",
      label: "Cover photo",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={row.picture?.uri || "default-avatar-url"}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      id: "price",
      label: "Price",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => (
        <div>
          {row.price
            .replace(/^<p>(.*?)<\/p>$/, "$1")
            .replace(/<br\s*\/?>/g, "")}
        </div>
      ),
    },
    {
      id: "createdAt",
      label: "Created date",
      minWidth: 170,
      maxWidth: 170,
      render: (row: RowData) => <div>{row.createdAt.split("T")[0]}</div>,
    },
    {
      id: "numberOfClients",
      label: "Number of Clients",
      minWidth: 170,
      maxWidth: 170,
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    handleChangePageIndex(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChangeLimit(+event.target.value);
  };

  const actionIcons = [
    {
      icon: <VisibilityIcon />,
      onClick: (row: RowData) => {
        navigate(`/package/${row.id}`);
      },
    },
  ];

  return (
    <div className="bg-slate-100">
      <h1 className="text-2xl border-b pb-2 mb-4 p-2">
        Account / Doula Management / {doulaByID?.data?.user?.fullName}
      </h1>
      <div className="mb-4 ml-8">
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => window.history.back()}
        >
          <ArrowBackIcon /> BACK
        </IconButton>
      </div>
      <div className="bg-white p-4 border rounded-md">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={doulaByID?.data?.picture?.uri || "default-avatar-url"}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <strong>Full name:</strong> {doulaByID?.data?.user?.fullName}
          </div>
          <div>
            <strong>Status:</strong> {doulaByID?.data?.status}
          </div>
          <div>
            <strong>Email:</strong> {doulaByID?.data?.user?.email}
          </div>
          <div>
            <strong>Phone:</strong> {doulaByID?.data?.user?.countryCode}&nbsp;
            {doulaByID?.data?.user?.phoneNumber}
          </div>
          <div>
            <strong>Birthday: </strong>
            {doulaByID?.data?.user?.birthDate.split("T")[0]}
          </div>

          <div>
            <strong>Description:</strong> {doulaByID?.data?.description}
          </div>

          <div>
            <strong>Address:</strong> {doulaByID?.data?.address?.fullAddress}
          </div>
          <div>
            <strong>Business name:</strong> {doulaByID?.data?.businessName}
          </div>
        </div>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Information" value="1" />
                <Tab label="Package" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div className="p-2 mb-6">
                  <strong>Picture of service</strong>
                  <br />
                  <br />
                  <ImageList
                    sx={{ width: 500, height: 400 }}
                    variant="woven"
                    cols={3}
                    gap={8}
                  >
                    {itemData?.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                          src={`${item.img}?w=161&fit=crop&auto=format`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
                <div className="p-2 mb-6">
                  <strong>Services</strong>
                  <br />
                  <br />
                  <div className="inline-block mr-3 p-2 bg-gray-100 rounded-xl">
                    {doulaByID?.data?.categories?.[0]?.name}
                  </div>
                  <div className="inline-block p-2 bg-gray-100 rounded-xl">
                    {doulaByID?.data?.categories?.[1]?.name}
                  </div>
                </div>

                <div className="p-2">
                  <strong>Qualifications</strong>
                  <br />
                  <br />
                  <div className="inline-block p-2 ">
                    {doulaByID?.data?.qualifications
                      ? "No qualification"
                      : doulaByID?.data?.qualifications}
                  </div>
                </div>
              </Box>
            </TabPanel>

            <TabPanel value="2">
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell
                      align="right"
                      style={{
                        minWidth: 100,
                        right: 0,
                        background: "white",
                        position: "sticky",

                        zIndex: 10,
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {doulaPackageId?.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id}>
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 75]}
                component="div"
                count={
                  metadata?.totalCount !== undefined
                    ? Number(metadata.totalCount)
                    : 0
                }
                rowsPerPage={Number(queryParams.limit)}
                page={queryParams.page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default DoulaDetailPage;
