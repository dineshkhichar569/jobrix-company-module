import { LogOutIcon, Settings, Sun, UserCircle2 } from "lucide-react";
import React from "react";

function Profile_Icon_PopUp({ open }) {
  return (
    <div
      className={`absolute top-14 left-0 bg-white w-52 h-auto rounded-lg border-2 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)]
    transition-all duration-300 ease-in-out ${
      open
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-2 pointer-events-none"
    }`}
    >
      {/* profile */}
      <div className="flex gap-3 items-center p-2 rounded-lg hover:bg-slate-100 transition-all duration-100 cursor-pointer mb-1">
        <UserCircle2 className="h-5 w-5" />
        <span className="font-medium text-sm">Your Profile</span>
      </div>

      <hr />

      {/* Account Settings */}
      <div className="flex gap-3 items-center p-2 rounded-lg hover:bg-slate-100 transition-all duration-100 cursor-pointer mt-1">
        <Settings className="h-5 w-5" />
        <span className="text-sm">Account settings</span>
      </div>

      {/* Theme */}
      <div className="flex gap-3 items-center p-2 rounded-lg hover:bg-slate-100 transition-all duration-100 cursor-pointer mb-1">
        <Sun className="h-5 w-5" />
        <span className="text-sm">Theme: Light</span>
      </div>

      <hr />

      {/* Logout */}
      <div className="flex gap-3 items-center p-2 rounded-lg hover:bg-red-100 transition-all duration-100 cursor-pointer text-red-600 mt-1">
        <LogOutIcon className="rotate-180 h-5 w-5" />
        <span className="text-sm">Log out</span>
      </div>
    </div>
  );
}

export default Profile_Icon_PopUp;
