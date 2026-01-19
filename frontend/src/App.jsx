import { Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";

import LandingPage from "./pages/public/LandingPage";
import CompanyRegister from "./pages/public/CompanyRegister";
import CompanyUserLogin from "./pages/public/CompanyUserLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Profile_Icon_PopUp from "./components/ui/Card/Profile_Icon_PopUp";

function App() {
  return (
    <>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />

        <Route path="/signup" element={<CompanyRegister />} />
        <Route path="/login" element={<CompanyUserLogin />} />


        <Route path="/dash" element={<AdminDashboard />} />
        <Route path="/popup" element={<Profile_Icon_PopUp />} />
      </Routes>
    </>
  );
}

export default App;
