import React, { useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link } from "react-router-dom";

interface SubMenuProps {
  items: { title: string; link: string }[];
}

const SubMenu: React.FC<SubMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        onClick={toggle}
      >
        <PeopleAltIcon />
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          Accounts
        </span>
        <svg
          className={`w-3 h-3 mr-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <ul
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {items.map((item, index) => (
          <li key={index}>
            <Link
              to={item.link}
              className="block ml-8 p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SubMenu;
