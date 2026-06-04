//! this for so that it blocks /login if user is loggedIn

import { Navigate, Outlet } from "react-router-dom";

function LoggedOutOnlyRoute() {
  const isLoggedIn = localStorage.getItem("token");

  return isLoggedIn ? <Navigate to="/admin/dashboard" replace /> : <Outlet />;
}

export default LoggedOutOnlyRoute;
