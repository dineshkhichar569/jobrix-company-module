import { motion } from "framer-motion";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsLoggedInRoute = () => {
  const isLoggedIn = localStorage.getItem("token");
  // localStorage.removeItem("token");

  if(!isLoggedIn){
    alert("⚠️ You need to login first");
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ showAuthMessage: true }} />
  );
};

export default IsLoggedInRoute;
