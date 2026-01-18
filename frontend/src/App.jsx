import { Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";

import LandingPage from "./pages/public/LandingPage";
import CompanyRegister from "./pages/public/CompanyRegister";
import CompanyUserLogin from "./pages/public/CompanyUserLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/admin/dashboard pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />

        <Route path="/signup" element={<CompanyRegister />} />
        <Route path="/login" element={<CompanyUserLogin />} />


        <Route path="/dash" element={<AdminDashboard />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;
