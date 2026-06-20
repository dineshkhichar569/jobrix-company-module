import React, { useEffect, useRef, useState } from "react";
import { Bell, User2, Search, ChevronDown } from "lucide-react";
import HoverPopUpCard from "../ui/Card/hoverPopUpCard";
import Profile_Icon_PopUp from "../ui/Card/Profile_Icon_PopUp";
import { getLoggedInUser } from "../../api/index.js";
import { AnimatePresence } from "framer-motion";
import AuthMSG from "../ui/popUpMessages/AuthMSG.jsx";

function Navbar({handleLogout}) {
  const [open, setOpen] = useState(false);
  const profileRef = useRef(null);

  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      const res = await getLoggedInUser();
      setLoggedUser(res.data);
    };
    fetchLoggedUser();
  }, []);

  const capitalRole = (role) => {
    return role ? role.charAt(0).toUpperCase() + role.slice(1) : "";
  };


  return (
    <>
      <nav className="sticky top-0 z-30 backdrop-blur bg-white/40 border-b h-16 flex items-center justify-between px-8">
        {/* left */}
        <div className="flex items-center gap-20">
          <div className="flex flex-col justify-center">
            <span className="text-base font-medium">Jobrix Corporation</span>
            <span className="text-gray-600 text-xs">Enterprise ATS </span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              className="peer border-2 border-gray-200 w-80 px-3 pl-8 py-1 rounded-lg outline-indigo-400 focus:border-indigo-500"
              placeholder="Search candidates, jobs..."
            />

            <Search className="absolute left-[6px] top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-indigo-600 transition-colors" />
          </div>
        </div>

        {/* right */}
        <div className="flex items-center justify-center gap-6">
          {/* Help */}
          <div className="cursor-pointer relative inline-block group">
            <span className="font-macondo font-medium text-2xl ">?</span>
            {/* popUp */}
            <div
              className="absolute bottom-full top-0 left-1/2 -translate-x-1/2 mb-2
             opacity-0 translate-y-1 pointer-events-none
             group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
             transition-all duration-300 ease-out"
            >
              <HoverPopUpCard placeholder="Help" />
            </div>
          </div>

          {/* notification */}
          <div className="relative inline-block group">
            <Bell className="h-5 w-5 cursor-pointer"></Bell>
            {/* popUp */}
            <div
              className="absolute bottom-full top-0 left-1/2 -translate-x-1/2 mb-2
             opacity-0 translate-y-1 pointer-events-none
             group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
             transition-all duration-300 ease-out"
            >
              <HoverPopUpCard placeholder="Notification" />
            </div>
          </div>

          {/* profile */}
          <div
            className={`group w-auto flex items-center gap-3 p-1 px-2 rounded-lg ${open ? "bg-slate-200" : "hover:bg-slate-100"} cursor-pointer relative group`}
            onClick={() => setOpen(!open)}
            ref={profileRef}
          >
            <div className="border-2 rounded-full p-1 cursor-pointer bg-indigo-100">
              <User2 className="text-indigo-600"></User2>
            </div>

            {/* Admin Name */}
            <div className="flex flex-col ">
              <span className="font-medium">
                {loggedUser ? loggedUser.fullname : "Loading..."}
              </span>
              <span
                className={`text-[14px] leading-tight ${loggedUser?.role === "admin" ? "text-blue-600" : "text-gray-600"} `}
              >
                {capitalRole(loggedUser?.role)}
              </span>
            </div>

            <ChevronDown className="h-4 w-4"></ChevronDown>
            {/* popUp */}
            <div
              className={`absolute bottom-full top-5 left-1/2 -translate-x-1/2 mb-2 transition-all duration-300 ease-out
                ${
                  open
                    ? "opacity-0 translate-y-1 pointer-events-none"
                    : "opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                }
              `}
            >
              <HoverPopUpCard placeholder="Profile and Account" />
            </div>

            {/* Profile PopUp */}
            <Profile_Icon_PopUp open={open} handleLogout={handleLogout} />
          </div>
        </div>
      </nav>


    </>
  );
}

export default Navbar;
