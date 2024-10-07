import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon: Icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 text-blue-600 bg-blue-100 rounded-lg"
            : "flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        }
      >
        <Icon className="mr-3" />
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
