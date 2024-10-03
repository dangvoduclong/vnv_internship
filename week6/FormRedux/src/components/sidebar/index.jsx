import { NavLink } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const userData = useSelector((state) => state.user.userData);
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
            <FolderIcon className="mr-3"></FolderIcon> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/information"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-2 text-blue-600 bg-blue-100 rounded-lg"
                : "flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            }
          >
            <PermIdentityIcon className="mr-3"></PermIdentityIcon>Profile
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/addphone"
            className={({ isActive }) =>
              isActive
                ? "flex items-center p-2 text-blue-600 bg-blue-100 rounded-lg"
                : "flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            }
          >
            <AddIcCallIcon className="mr-3"></AddIcCallIcon>Add form
          </NavLink>
        </li>
        {userData?.roles?.includes("admin") && (
          <li>
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 text-blue-600 bg-blue-100 rounded-lg"
                  : "flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              }
            >
              <Settings className="mr-3"></Settings> Setting
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
