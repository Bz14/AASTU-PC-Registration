import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("username") !== null;

  return isLoggedIn ? children : <Navigate to="/login" />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
