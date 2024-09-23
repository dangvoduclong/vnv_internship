import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-xl p-4">
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-2 text-blue-600 bg-blue-100 rounded-lg"
                : "flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            }
          >
            <i className="fas fa-home mr-3"></i> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/personalInformation"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-2 text-blue-600 bg-blue-100 rounded-lg"
                : "flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            }
          >
            <i className="fas fa-user mr-3"></i>Personal Information
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/form"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-2 text-blue-600 bg-blue-100 rounded-lg"
                : "flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            }
          >
            <i className="fas fa-edit mr-3"></i> Form
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
