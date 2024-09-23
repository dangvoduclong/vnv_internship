import { NavLink } from "react-router-dom";

const Header = ({ handleLogout }) => {
  return (
    <div>
      <header className="bg-teal-400">
        <nav className="flex justify-between w-full bg-purple-500 text-white p-4">
          <a href="#">
            <span className="font-semibold text-xl tracking-tight">VINOVA</span>
          </a>
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
                className="p-2 ml-2 bg-teal-500 text-gray-100 font-semibold leading-none border border-teal-600 rounded hover:border-transparent hover:bg-teal-600"
                href="#"
                onClick={handleLogout}
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
