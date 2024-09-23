import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../context/User";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
const Layout = () => {
  const { userData, setUserData } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    setUserData(null);
    navigate("/login");
  };
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Header handleLogout={handleLogout} />

      <div className="flex flex-grow">
        <Sidebar className="w-1/4 bg-gray-200" />
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
