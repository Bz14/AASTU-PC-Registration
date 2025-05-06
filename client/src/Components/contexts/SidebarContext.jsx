import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const SidebarContext = createContext();

// Create a provider component
export const SidebarProvider = ({ children }) => {
  const [sideBarStatus, setSideBarStatus] = useState("visible");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("dashboard"); // Default selected item

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setSideBarStatus((prevStatus) =>
      prevStatus === "hidden" ? "visible" : "hidden"
    );
  };

  // Function to collapse/expand the sidebar
  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  // Function to set the selected item
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <SidebarContext.Provider
      value={{
        sideBarStatus,
        toggleSidebar,
        isCollapsed,
        toggleCollapse,
        selectedItem,
        handleItemSelect,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Create a custom hook to use the SidebarContext
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
