import {
  BarChart3,
  Briefcase,
  Calendar,
  LayoutDashboard,
  Settings,
  UserPlus2,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [isSelected, setIsSelected] = useState("dashboard");

  const navigate = useNavigate();

  return (
    <>
      <aside className="fixed overflow-hidden top-0 h-screen w-1/6 border-r">
        {/* Logo */}
        <div className="h-16 border-b p-3">
          <div className="flex items-center gap-3 font-bold text-xl">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              J
            </div>
            JOBRIX
          </div>
        </div>

        <div className="p-3 flex flex-col gap-2">
          <div
            className={`flex gap-3 items-center p-2 px-3 rounded-lg cursor-pointer transition duration-150 ${
              isSelected === "dashboard"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              setIsSelected("dashboard");
              navigate("/admin/dashboard");
            }}
          >
            <LayoutDashboard />
            <span className="text-base font-semibold">Dashboard</span>
          </div>
          <div
            className={`flex gap-3 items-center p-2 px-3 rounded-lg cursor-pointer transition duration-150 ${
              isSelected === "jobs"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              setIsSelected("jobs");
              navigate("/admin/jobs");
            }}
          >
            <Briefcase />
            <span className="text-base font-semibold">Jobs</span>
          </div>
          <div
            className={`flex gap-3 items-center p-2 px-3 rounded-lg cursor-pointer transition duration-150 ${
              isSelected === "candidates"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              setIsSelected("candidates");
              navigate("/admin/candidates");
            }}
          >
            <Users />
            <span className="text-base font-semibold">Candidates</span>
          </div>
          <div
            className={`flex gap-3 items-center p-2 px-3 rounded-lg cursor-pointer transition duration-150 ${
              isSelected === "interviews"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              setIsSelected("interviews");
              navigate("/admin/interviews");
            }}
          >
            <Calendar />
            <span className="text-base font-semibold">Interviews</span>
          </div>
          <div
            className={`flex gap-3 items-center p-2 px-3 rounded-lg cursor-pointer transition duration-150 ${
              isSelected === "analytics"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              setIsSelected("analytics");
              navigate("/admin/analytics");
            }}
          >
            <BarChart3 />
            <span className="text-base font-semibold">Analytics</span>
          </div>

          <span className="text-gray-600 font-normal p-6">Admin</span>

          <div
            className={`flex gap-3 items-center p-2 px-3 rounded-lg cursor-pointer transition duration-150 ${
              isSelected === "teams"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              setIsSelected("teams");
              navigate("/admin/teams");
            }}
          >
            <UserPlus2 />
            <span className="text-base font-semibold">Team</span>
          </div>

          <div
            className={`flex gap-3 items-center p-2 px-3 rounded-lg cursor-pointer transition duration-150 ${
              isSelected === "settings"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              setIsSelected("settings");
              navigate("/admin/settings");
            }}
          >
            <Settings />
            <span className="text-base font-semibold">Settings</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
