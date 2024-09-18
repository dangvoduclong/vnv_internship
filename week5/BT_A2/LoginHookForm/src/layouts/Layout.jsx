import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    localStorage.removeItem("data");
    navigate("/signup");
  };
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("data"));
    if (!getData) {
      navigate("/signup");
    }
  }, []);
  return (
    <div>
      <header className="bg-teal-400">
        <nav className="flex justify-between w-full bg-purple-500 text-white p-4">
          <a href="#">
            <span className="font-semibold text-xl tracking-tight">Title</span>
          </a>
          <div className="md:items-center md:w-auto flex">
            <div className="md:flex hidden">
              <Link
                to="/dashboard"
                className="block md:text-white mr-4"
                href="#"
              >
                Home
              </Link>
              <Link to="/about" className="block md:text-white mr-4" href="#">
                About
              </Link>
              <Link to="/contact" className="block md:text-white mr-4" href="#">
                Contact
              </Link>
            </div>
            <div className="flex text-sm">
              <button
                className="p-2 ml-2 bg-teal-500 text-gray-100 font-semibold leading-none border border-teal-600 rounded hover:border-transparent hover:bg-teal-600"
                href="#"
                onClick={handleOnClick}
              >
                Log out
              </button>
            </div>
          </div>
        </nav>
      </header>

      {<Outlet />}
    </div>
  );
};

export default Layout;
