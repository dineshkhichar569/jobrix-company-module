import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./styles/App.css";

import LandingPage from "./pages/public/LandingPage";
import CompanyRegister from "./pages/public/CompanyRegister";
import CompanyUserLogin from "./pages/public/CompanyUserLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import IsLoggedInRoute from "./guards/isLoggedInRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/signup" element={<CompanyRegister />} />
        <Route path="/login" element={<CompanyUserLogin />} />

        <Route element={<IsLoggedInRoute />}>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
