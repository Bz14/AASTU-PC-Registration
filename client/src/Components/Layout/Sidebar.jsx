import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import dashboardIcon from "../../assets/bxs-dashboard.svg";
import studentsIcon from "../../assets/student-person-part-2-svgrepo-com.svg";
import adminsIcon from "../../assets/manager-avatar-svgrepo-com.svg";
import settingsIcon from "../../assets/bxs-cog.svg";
import minimizeIcon from "../../assets/minimize-svgrepo-com.svg";
import maximizeIcon from "../../assets/maximize-svgrepo-com.svg";
const Sidebar = () => {
  const { isCollapsed, toggleCollapse, selectedItem, handleItemSelect } =
    useSidebar();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    handleItemSelect(path || "dashboard");
  }, [location, handleItemSelect]);

  return (
    <div
      className={`sidebar h-[99%] ml-2 mr-2 rounded-lg transition-all duration-300 
      hidden sm:block ${isCollapsed ? "w-20" : "w-48"} flex-none`}
    >
      {/* Sidebar links */}
      <div
        className={`flex items-center p-4  ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        <h2 className={`text-white ${isCollapsed ? "hidden" : "block"}`}>
          Menu
        </h2>
        <div
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full cursor-pointer"
          onClick={toggleCollapse}
        >
          <img
            src={isCollapsed ? maximizeIcon : minimizeIcon}
            className="w-6"
            alt="Collapse Icon"
          />
        </div>
      </div>
      <ul className="p-4 flex flex-col gap-2">
        {["dashboard", "students", "admins", "settings"].map((item) => (
          <li key={item}>
            <Link
              to={`/${item}`}
              className={`flex items-center gap-3 p-2 rounded-lg  ${
                isCollapsed ? "justify-center" : ""
              } ${selectedItem === item ? "bg-[#005F8F]" : ""}`}
              onClick={() => {
                handleItemSelect(item);
              }}
            >
              <img
                src={
                  item === "dashboard"
                    ? dashboardIcon
                    : item === "students"
                    ? studentsIcon
                    : item === "admins"
                    ? adminsIcon
                    : settingsIcon
                }
                alt={`${item} Icon`}
                className="w-8 bg-[#CCFFFF] rounded-lg p-1"
              />
              {!isCollapsed && (
                <span className="">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
