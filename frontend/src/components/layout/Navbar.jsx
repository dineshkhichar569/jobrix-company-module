import React from "react";
import { Bell, User2, Search, ChevronDown } from "lucide-react";
import Button from "../ui/Button/Button";

function Navbar() {
  return (

    <>
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/40 border-b mx-auto h-16 flex items-center justify-between px-8">
      {/* left */}
      <div className="flex items-center gap-20">

        <div className="flex flex-col justify-center">
            <span className="text-base font-medium">Jobrix Corporation</span>
            <span className="text-gray-600 text-xs">Enterprise ATS</span>
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
        <div className="font-macondo font-medium text-2xl cursor-pointer">
          ?
        </div>

        {/* notification */}
        <div>
          <Bell className="h-5 w-5 cursor-pointer"></Bell>
        </div>

        {/* profile */}
        <div className="w-auto flex items-center gap-3 p-1 px-2 rounded-lg hover:bg-slate-100 cursor-pointer">
          <div className="border-2 rounded-full p-1 cursor-pointer bg-indigo-100">
            <User2 className="text-indigo-600"></User2>
          </div>

          {/* Admin Name */}  
          <div className="flex flex-col ">
            <span className="font-medium">Dinesh Khichar</span>
            <span className="text-[14px] text-gray-600 leading-tight">Admin</span>
          </div>
          
          <ChevronDown className="h-4 w-4 "></ChevronDown>
        
        </div>
      </div>
    </nav>

    <div className="relative m-10 border-[1px] border-red-400 h-10 rounded w-10 text-xs flex items-center justify-center">
        <div className="absolute left-1/2 -top-[9px] -translate-x-1/2 w-4 h-4 bg-red-200 border-l border-t border-red-400 rotate-45"></div>
        Help
    </div>
    </>
  );
}

export default Navbar;
