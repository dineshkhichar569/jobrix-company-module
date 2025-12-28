import { Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/public/LandingPage";

function App() {
  return (
    <>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
