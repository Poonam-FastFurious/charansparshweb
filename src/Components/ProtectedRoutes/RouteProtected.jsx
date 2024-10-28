/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const RouteProtected = ({ element, redirectTo }) => {
  const token = localStorage.getItem("accessToken");
  return token ? element : <Navigate to={redirectTo} />;
};

export default RouteProtected;
