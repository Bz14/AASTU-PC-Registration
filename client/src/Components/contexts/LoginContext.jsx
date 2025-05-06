import { createContext, useState } from "react";
import PropTypes from "prop-types";

const LoginContext = createContext();

export const useLogin = () => {};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const LoginProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = () => {
    // Simulate login logic
    setIsAuthenticated(true);
    setUser({ name: "Super Admin" }); // Replace with actual user data
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <LoginContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
