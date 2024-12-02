import React from 'react'
import { useState } from 'react';
import '../SuperStyles/Sidebar.css'
import { FaTachometerAlt, FaFolderOpen, FaChevronDown, FaUsers, FaStore, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Route, Routes } from 'react-router-dom';
import CategoriesPage from '../categoryAdd/CategoriesPage';

const SuperAdminSideBar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  // Sidebar menu items array
  const menuItems = [
    {
      id: 1,
      label: "Dashboard Overview",
      icon: <FaTachometerAlt className="mr-3 text-xl" />,
      link: "/superadmin",
      dropdown: false,
    },
    {
      id: 2,
      label: "Manage Categories",
      icon: <FaFolderOpen className="mr-3 text-xl" />,
      dropdown: true,
      subMenu: [
        { id: 2.1, label: "Categories", link: "/superadmin/categories" },
        { id: 2.2, label: "Subcategories", link: "/superadmin/subcategories" },
      ],
    },
    {
      id: 3,
      label: "View Users",
      icon: <FaUsers className="mr-3 text-xl" />,
      link: "/users",
      dropdown: false,
    },
    {
      id: 4,
      label: "View Sellers",
      icon: <FaStore className="mr-3 text-xl" />,
      link: "/sellers",
      dropdown: false,
    },
    {
      id: 5,
      label: "Settings",
      icon: <FaCog className="mr-3 text-xl" />,
      link: "/settings",
      dropdown: false,
    },
  ];

  // Toggle dropdown state
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };


  return (
    <div>
      <div className="w-full ">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white flex flex-col shadow-md h-[100vh]">
          {/* Logo Section */}
          <div className="px-4 py-3 flex justify-center items-center bg-gray-200 border-b border-gray-700">
            <a href="/superadmin">
              <img
                src="https://res.cloudinary.com/duxafj5j5/image/upload/v1731158192/category/w5siphjkoo9fprtbda4s.png"
                className="w-[5rem] h-[5rem]"
                alt="Logo"
              />
            </a>
            <h1 className="text-lg mb-0 font-bold text-gray-700 text-center poppins ps-3">
              Super Admin
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <ul className="ps-2">
              {menuItems.map((item) => (
                <li key={item.id} className="relative">
                  {!item.dropdown ? (
                    <a
                      href={item.link}
                      className="flex items-center p-4 hover:bg-gray-700 transition duration-200 no-underline poppins"
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="flex items-center p-4 hover:bg-gray-700 transition duration-200 no-underline poppins w-full text-left"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        <FaChevronDown
                          className={`ml-auto text-sm transition-transform duration-200 ${openDropdown === item.id ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {openDropdown === item.id && (
                        <ul className="bg-gray-600 mt-1 rounded-md shadow-lg poppins">
                          {item.subMenu.map((subItem) => (
                            <li key={subItem.id}>
                              <a
                                href={subItem.link}
                                className="block px-4 py-2 hover:bg-gray-700 transition duration-200 no-underline text-md"
                              >
                                {subItem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Logout Button */}
          <button className="m-4 p-3 flex items-center justify-center bg-red-600 hover:bg-red-500 text-white rounded-md">
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>

    </div>
  )
}

export default SuperAdminSideBar
