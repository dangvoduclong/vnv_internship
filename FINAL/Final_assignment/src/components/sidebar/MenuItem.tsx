import React from "react";

interface MenuItemProps {
  icon: JSX.Element;
  title: string;
  onClick?: () => void;
  link?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onClick, link }) => (
  <a
    href={link}
    onClick={onClick}
    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
  >
    {icon}
    <span className="flex-1 ms-3 whitespace-nowrap">{title}</span>
  </a>
);

export default MenuItem;
