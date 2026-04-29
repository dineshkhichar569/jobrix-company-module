import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./styles/App.css";

import LandingPage from "./pages/public/LandingPage";
import CompanyRegister from "./pages/public/CompanyRegister";
import CompanyUserLogin from "./pages/public/CompanyUserLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import IsLoggedInRoute from "./guards/isLoggedInRoute";
import LoggedOutOnlyRoute from "./guards/LoggedOutOnlyRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<LoggedOutOnlyRoute />}>
          <Route path="/login" element={<CompanyUserLogin />} />
          <Route path="/signup" element={<CompanyRegister />} />
        </Route>

        <Route element={<IsLoggedInRoute />}>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
