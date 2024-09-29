import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import { Suspense } from "react";
import Loading from "../pages/home/components/Loading";

const Layout = () => {
  return (
    <div>
      <Header />

      <div className="flex flex-grow">
        <Sidebar className="w-1/4 bg-gray-200" />
        <div className="flex-grow p-4">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
