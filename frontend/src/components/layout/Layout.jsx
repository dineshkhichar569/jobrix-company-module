import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AuthMSG from "../ui/popUpMessages/AuthMSG";
import ConfirmPopup from "../ui/popUpMessages/ConfirmPopUp";

function Layout() {
  const [pop, setPop] = useState(false);
  const [onCancel, setOnCancel] = useState(false);
  const [onLogout, setOnLogout] = useState(false);
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("collapsed") === "true",
  );

  useEffect(() => {
    localStorage.setItem("collapsed", collapsed);
  }, [collapsed]);

  ///////////////   to Handle error message popup at the time of logOut
  const handleLogout = () => {
    setPop(true);
  };

  // ////////  to confirm longout or cancel it
  const confirmLogout = () => {
    localStorage.removeItem("token");
    setPop(false);
    setOnLogout(true);

    setTimeout(() => {
      setOnLogout(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        handleLogout={handleLogout}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Navbar + dashboard pages */}
      <div
        className={`transition-all duration-700 ease-in-out ${collapsed ? "ml-[5%]" : "ml-[16.666%]"} flex-1 flex flex-col`}
      >
        <Navbar handleLogout={handleLogout} />

        {/* dashboard pages */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>

      <AnimatePresence mode="wait">
        {pop && (
          <div className="fixed inset-0 z-50 h-screen w-screen backdrop-blur-sm bg-slate-950/40">
            <ConfirmPopup
              placeholder="Do you want to logOut"
              icon="🔴"
              top="24px"
              background="#16223d"
              color="white"
              textSize="16px"
              px="15px"
              py="8px"
              popUpDirection="top"
              setPop={setPop}
              confirmLogout={confirmLogout}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {onLogout && (
          <div className="fixed z-50 h-screen w-screen backdrop-blur-sm">
            <AuthMSG
              placeholder="Logging out securely…"
              icon="🔒"
              top="24px"
              background="#16223d"
              color="white"
              textSize="16px"
              px="15px"
              py="8px"
              popUpDirection="top"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Layout;
