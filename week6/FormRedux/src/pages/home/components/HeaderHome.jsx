import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.svg";
const HeaderHome = () => {
  return (
    <header className="fixed w-full">
      <nav className="bg-orange-300 border-gray-200 py-2.5 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <Link to={"/"} className="flex items-center">
            <img src={logo} className="h-6 mr-3 sm:h-9" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Land
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to={"/loginapi"}
              className="text-white bg-red-500 hover:bg-pink-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-2 mr-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
            >
              Login API
            </Link>
            <Link
              to={"/login"}
              className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 ml-4 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
            >
              Sign up
            </Link>
          </div>
          <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 rounded lg:p-0
            ${
              isActive
                ? "text-white bg-purple-500"
                : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:text-purple-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 rounded lg:p-0
            ${
              isActive
                ? "text-white bg-purple-500"
                : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:text-purple-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pl-3 pr-4 rounded lg:p-0
            ${
              isActive
                ? "text-white bg-purple-500"
                : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:text-purple-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderHome;
