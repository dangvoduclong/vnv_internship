import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
            <div className="flex items-center ml-4">
              <Tooltip title={userData?.email}>
                <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userData?.firstname}
                    src={userData?.avatar || ""}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleCloseMenu}>
                  <div>
                    <Link to="/information">
                      <strong>{`${userData?.firstName} ${userData?.lastName}`}</strong>
                      <p className="text-sm">{userData?.email}</p>
                    </Link>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
