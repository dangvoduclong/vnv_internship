import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../pages/components/Loading";
import Sidebar from "../components/sidebar";

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="w-[253px] flex-none">
        <Sidebar />
      </div>
      <div className="flex-grow" style={{ width: `calc(100% - 253px)` }}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
