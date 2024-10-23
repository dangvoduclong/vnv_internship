import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    toast.success("Logout successful");
  };

  return (
    <div className={`${className} `}>
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 flex flex-col justify-between"
        aria-label="Sidebar"
      >
        <div>
          <div>
            <a
              href=""
              className="flex items-center ps-2.5 h-14 mb-5 bg-indigo-700 justify-around"
            >
              <span className="self-center font-semibold whitespace-nowrap text-white">
                NurtureWare
              </span>
              <MenuOutlinedIcon className="text-white" />
            </a>
          </div>
          <div className="max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium flex-grow ml-4">
              <li>
                <SubMenu
                  items={[
                    { title: "Admin Management", link: "/account/admins" },
                    { title: "Doula Management", link: "/account/doulas" },
                    { title: "Client Management", link: "/account/client" },
                  ]}
                />
              </li>
              <MenuItem
                icon={<ChatBubbleOutlineIcon />}
                title="Article"
                link="/article"
              />
              <MenuItem
                icon={<LibraryBooksOutlinedIcon />}
                title="PD Session"
                link="/pd-sessions"
              />
              <MenuItem
                icon={<GridViewOutlinedIcon />}
                title="Category"
                link="/categories"
              />
              <MenuItem
                icon={<CardGiftcardOutlinedIcon />}
                title="Voucher"
                link="/voucher"
              />
              <MenuItem
                icon={<FeedOutlinedIcon />}
                title="Help Documents"
                link="/help-documents"
              />
              <MenuItem
                icon={<ZoomInOutlinedIcon />}
                title="Search Settings"
                link="/search-settings"
              />
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 bg-purple-200 dark:bg-gray-700">
          <div className="flex items-center ml-3">
            <img
              src="https://icdn.24h.com.vn/upload/1-2021/images/2021-02-26/image50-1614333620-651-width500height800.jpg"
              alt="User Avatar"
              className="rounded-full h-10 w-10"
            />
            <span className="ms-2 text-gray-900 dark:text-white">
              Super Admin
            </span>
          </div>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="focus:outline-none text-gray-900 dark:text-white mr-2 hover:bg-slate-200 dark:hover:bg-gray-500 p-1 rounded-md"
            >
              •••
            </button>
            {menuOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Change Password
                </a>
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
