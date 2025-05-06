import { createContext, useState } from "react";
import PropTypes from "prop-types";

const MobileMenuContext = createContext();

export const useMobileMenu = () => {};

MobileMenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const MobileMenuProvider = ({ children }) => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuVisible((prev) => !prev); // Use functional update for clarity
  };

  return (
    <MobileMenuContext.Provider
      value={{ isMobileMenuVisible, toggleMobileMenu }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};
