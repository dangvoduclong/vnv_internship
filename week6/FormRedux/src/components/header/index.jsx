import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <header className="bg-teal-400">
        <nav className="flex justify-between w-full  text-white p-4">
          <NavLink to="/">
            <span className="font-semibold text-xl tracking-tight">VINOVA</span>
          </NavLink>
          <div className="md:items-center md:w-auto flex">
            <div className="md:flex hidden">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block  ${
                    isActive ? "text-amber-300 mr-4" : "md:text-white mr-4"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block  ${
                    isActive ? "text-amber-300 mr-4" : "md:text-white mr-4"
                  }`
                }
              >
                Contact
              </NavLink>
            </div>

            <div className="flex text-sm">
              <button
                onClick={handleLogout}
                className="p-2 ml-2 bg-rose-400 text-gray-100 font-semibold leading-none border border-teal-600 rounded hover:border-transparent hover:bg-rose-700"
              >
                Log out
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
