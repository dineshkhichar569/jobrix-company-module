import { Navigate, Outlet } from "react-router-dom";

function IsLoggedInRoute() {
  const isLoggedIn = localStorage.getItem("token");

  if(!isLoggedIn) {
    alert("You need to login first.")
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default IsLoggedInRoute;
 