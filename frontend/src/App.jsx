import { Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";

import LandingPage from "./pages/public/LandingPage";
import CompanyRegister from "./pages/public/CompanyRegister";
import CompanyUserLogin from "./pages/public/CompanyUserLogin";

function App() {
  return (
    <>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />

        <Route path="/signup" element={<CompanyRegister />} />
        <Route path="/login" element={<CompanyUserLogin />} />
      </Routes>
    </>
  );
}

export default App;
