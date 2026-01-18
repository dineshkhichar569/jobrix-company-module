import {
  BarChart3,
  Briefcase,
  Calendar,
  LayoutDashboard,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ setIsOption }) {
  const [isSelected, setIsSelected] = useState("dashboard");

  return (
    <>
      <aside className="sticky top-0 h-screen w-1/6 border-r">
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
            className={`flex gap-3 items-center hover:bg-slate-100 p-2 px-3 rounded-lg cursor-pointer transition duration-100 ${
              isSelected === "dashboard"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600"
            }`}
            onClick={() => {
              setIsSelected("dashboard");
              setIsOption("dashboard");
            }}
          >
            <LayoutDashboard />
            <span className="text-base font-semibold">Dashboard</span>
          </div>
          <div
            className={`flex gap-3 items-center hover:bg-slate-100 p-2 px-3 rounded-lg cursor-pointer transition duration-100 ${
              isSelected === "jobs"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600"
            }`}
            onClick={() => {
              setIsSelected("jobs");
              setIsOption("jobs");
            }}
          >
            <Briefcase />
            <span className="text-base font-semibold">Jobs</span>
          </div>
          <div
            className={`flex gap-3 items-center hover:bg-slate-100 p-2 px-3 rounded-lg cursor-pointer transition duration-100 ${
              isSelected === "candidates"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600"
            }`}
            onClick={() => {
              setIsSelected("candidates");
              setIsOption("candidates");
            }}
          >
            <Users />
            <span className="text-base font-semibold">Candidates</span>
          </div>
          <div
            className={`flex gap-3 items-center hover:bg-slate-100 p-2 px-3 rounded-lg cursor-pointer transition duration-100 ${
              isSelected === "interviews"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600"
            }`}
            onClick={() => {
              setIsSelected("interviews");
              setIsOption("interviews");
            }}
          >
            <Calendar />
            <span className="text-base font-semibold">Interviews</span>
          </div>
          <div
            className={`flex gap-3 items-center hover:bg-slate-100 p-2 px-3 rounded-lg cursor-pointer transition duration-100 ${
              isSelected === "analytics"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600"
            }`}
            onClick={() => {
              setIsSelected("analytics");
              setIsOption("analytics");
            }}
          >
            <BarChart3 />
            <span className="text-base font-semibold">Analytics</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
