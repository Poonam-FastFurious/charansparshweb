/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, redirectTo }) => {
  const token = localStorage.getItem("accessToken");
  return token ? <Navigate to={redirectTo} /> : element;
};

export default ProtectedRoute;
