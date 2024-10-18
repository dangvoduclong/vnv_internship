import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../pages/components/Loading";
import Sidebar from "../components/sidebar";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-row">
      <Sidebar className="w-1/5 " />
      <div className="w-4/5 ">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
