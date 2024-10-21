import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  icon: JSX.Element;
  title: string;
  link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, link = "#" }) => (
  <Link
    to={link}
    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
  >
    {icon}
    <span className="flex-1 ms-3 whitespace-nowrap">{title}</span>
  </Link>
);

export default MenuItem;
