import { Outlet } from "react-router-dom";
import Header from "../components/header";

const LayoutApi = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LayoutApi;
