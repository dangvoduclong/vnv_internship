import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../components/common/Loading";
import Sidebar from "../components/sidebar";
import PrivateRoute from "../router/PrivateRoute";

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="w-[253px] flex-none">
        <Sidebar />
      </div>
      <PrivateRoute>
        <div
          className="flex-grow h-screen"
          style={{ width: `calc(100% - 253px)` }}
        >
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </PrivateRoute>
    </div>
  );
};

export default Layout;
