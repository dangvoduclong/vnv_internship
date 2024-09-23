import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Copyright from "../components/copyright";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-grow">
        <Sidebar className="w-1/4 bg-gray-200" />
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </div>
      <Footer />
      <Copyright />
    </div>
  );
};

export default Layout;
