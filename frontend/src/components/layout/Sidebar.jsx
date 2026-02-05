import {
  BarChart3,
  Briefcase,
  Calendar,
  LayoutDashboard,
  LogOut,
  PanelRightClose,
  Settings,
  UserPlus2,
  Users,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar({ handleLogout, collapsed, setCollapsed }) {
  const location = useLocation();
  const isSelected = location.pathname.split("/").pop();

  const navigate = useNavigate();

  return (
    <>
      <aside
        className={`fixed overflow-hidden top-0 h-screen border-r transition-all duration-700 ease-in-out ${collapsed ? "w-[5%]" : "w-1/6"} `}
      >
        <div
          className="absolute right-0 top-5 cursor-pointer"
          onClick={(e) => {
            setCollapsed(!collapsed);
          }}
        >
          <PanelRightClose />
        </div>
        {/* Logo */}
        <div className="h-16 border-b p-3">
          <div className="flex items-center gap-3 font-bold text-xl">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              J
            </div>
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${collapsed ? "max-w-0 ml-0" : "max-w-[200px] ml-3"} `}
            >
              <span
                className={`block whitespace-nowrap transition-opacity duration-700 ${collapsed ? "opacity-0" : "opacity-100"}`}
              >
                JOBRIX
              </span>
            </div>
                    </div>
        </div>

        <div className="p-3 flex flex-col gap-2">
          <div
            className={`flex items-center p-2 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              isSelected === "dashboard"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/dashboard");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <LayoutDashboard />
            </div>
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${collapsed ? "max-w-0 ml-0" : "max-w-[200px] ml-3"} `}
            >
              <span
                className={`block text-base font-semibold whitespace-nowrap transition-opacity duration-700 ${collapsed ? "opacity-0" : "opacity-100"}`}
              >
                Dashboard
              </span>
            </div>
          </div>

          <div
            className={`flex items-center p-2 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              isSelected === "jobs"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/jobs");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Briefcase />
            </div>
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${collapsed ? "max-w-0 ml-0" : "max-w-[200px] ml-3"} `}
            >
              <span
                className={`block text-base font-semibold whitespace-nowrap transition-opacity duration-700 ${collapsed ? "opacity-0" : "opacity-100"}`}
              >
                Jobs
              </span>
            </div>
          </div>

          <div
            className={`flex items-center p-2 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              isSelected === "candidates"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/candidates");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Users />
            </div>
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${collapsed ? "max-w-0 ml-0" : "max-w-[200px] ml-3"} `}
            >
              <span
                className={`block text-base font-semibold whitespace-nowrap transition-opacity duration-700 ${collapsed ? "opacity-0" : "opacity-100"}`}
              >
                Candidates
              </span>
            </div>
          </div>

          <div
            className={`flex items-center p-2 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              isSelected === "interviews"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/interviews");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Calendar />
            </div>
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${collapsed ? "max-w-0 ml-0" : "max-w-[200px] ml-3"} `}
            >
              <span
                className={`block text-base font-semibold whitespace-nowrap transition-opacity duration-700 ${collapsed ? "opacity-0" : "opacity-100"}`}
              >
                Interviews
              </span>
            </div>
          </div>

          <div
            className={`flex items-center p-2 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${isSelected === "analytics" ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100" : "text-gray-600 hover:bg-slate-100"} `}
            onClick={() => navigate("/admin/analytics")}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <BarChart3 />
            </div>
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${collapsed ? "max-w-0 ml-0" : "max-w-[200px] ml-3"} `}
            >
              <span
                className={`block text-base font-semibold whitespace-nowrap transition-opacity duration-700 ${collapsed ? "opacity-0" : "opacity-100"}`}
              >
                Analytics
              </span>
            </div>
          </div>

          <span
            className={`text-gray-600 font-normal p-6 transition-all duration-300 ease-in-out ${collapsed ? "px-1" : "px-6"}`}
          >
            Admin
          </span>

          <div
            className={`flex items-center p-2 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              isSelected === "teams"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/teams");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <UserPlus2 />
            </div>
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${collapsed ? "max-w-0 ml-0" : "max-w-[200px] ml-3"} `}
            >
              <span
                className={`block text-base font-semibold whitespace-nowrap transition-opacity duration-700 ${collapsed ? "opacity-0" : "opacity-100"}`}
              >
                Team
              </span>
            </div>
          </div>

          <div
            className={`flex items-center p-2 px-3 rounded-lg cursor-pointer transition duration-150 ${
              isSelected === "settings"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/settings");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Settings />
            </div>
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${collapsed ? "max-w-0 ml-0" : "max-w-[200px] ml-3"} `}
            >
              <span
                className={`block text-base font-semibold whitespace-nowrap transition-opacity duration-700 ${collapsed ? "opacity-0" : "opacity-100"}`}
              >
                Settings
              </span>
            </div>
          </div>

          <div
            className={`flex absolute bottom-4 left-3 right-3 items-center p-2 px-3 rounded-lg cursor-pointer transition-colors duration-200 text-red-600 hover:bg-red-100`}
            onClick={handleLogout}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <LogOut className="rotate-180" />
            </div>
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${collapsed ? "max-w-0 ml-0" : "max-w-[200px] ml-3"} `}
            >
              <span
                className={`block text-base font-semibold whitespace-nowrap transition-opacity duration-700 ${collapsed ? "opacity-0" : "opacity-100"}`}
              >
                Log Out
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
