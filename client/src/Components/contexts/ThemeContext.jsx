import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
// Create the ThemeContext
const ThemeContext = createContext();

// ThemeContext Provider Component
export const ThemeProvider = ({ children }) => {
  // Retrieve theme from localStorage or default to 'bluesh'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "bluesh");

  useEffect(() => {
    // Save the theme to localStorage whenever it changes
    localStorage.setItem("theme", theme);

    // Apply the theme class to the document's root element (HTML tag)
    document.documentElement.className = theme;
  }, [theme]);

  // Toggle between the three themes
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook for consuming the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
