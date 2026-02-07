import {
  BarChart3,
  Briefcase,
  Calendar,
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  Settings,
  User2,
  UserPlus2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../api";

function Sidebar({ handleLogout, collapsed, setCollapsed }) {
  const location = useLocation();
  const isSelected = location.pathname.split("/").pop();
  const [loggedUser, setLoggedUser] = useState(null);

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

  const navigate = useNavigate();

  return (
    <>
      <aside
        className={`fixed z-40 overflow-hidden top-0 h-screen border-r transition-all duration-700 ease-in-out ${collapsed ? "w-[5%]" : "w-1/6"} `}
      >
        <div
          className={`fixed top-4 z-50 cursor-pointer text-center transition-all duration-700 ease-in-out 
            ${
              collapsed
                ? "p-1 rotate-180 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-full translate-x-[calc(5vw-1rem)]"
                : "p-2 rotate-0 hover:bg-slate-200 rounded-lg translate-x-[calc(14vw-0.75rem)]"
            }`}
          onClick={(e) => {
            setCollapsed(!collapsed);
          }}
        >
          <ChevronLeft className={`h-5 w-5 text-slate-500`} />
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
            className={`group flex items-center p-3 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              isSelected === "dashboard"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/dashboard");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-125">
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
            className={`group flex items-center p-3 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              isSelected === "jobs"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/jobs");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-125">
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
            className={`group flex items-center p-3 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              isSelected === "candidates"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/candidates");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-125">
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
            className={`group flex items-center p-3 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              isSelected === "interviews"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/interviews");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-125">
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
            className={`group flex items-center p-3 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${isSelected === "analytics" ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100" : "text-gray-600 hover:bg-slate-100"} `}
            onClick={() => navigate("/admin/analytics")}
          >
            <div className="w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-125">
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
            className={`group flex items-center p-3 px-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              isSelected === "teams"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/teams");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-125">
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
            className={`group flex items-center p-3 px-3 rounded-lg cursor-pointer transition duration-150 ${
              isSelected === "settings"
                ? "text-indigo-500 bg-indigo-100 hover:bg-indigo-100 "
                : "text-gray-600 hover:bg-slate-100"
            }`}
            onClick={() => {
              navigate("/admin/settings");
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-125">
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

          {/* profile */}
          <div
            className={`group w-auto absolute bottom-20 left-3 right-3 flex items-center gap-3 rounded-xl border border-indigo-400 bg-indigo-100 cursor-pointer transition-all duration-500 ease-out shadow-[0_15px_35px_rgba(79,70,229,0.25)] hover:shadow-[0_30px_60px_rgba(79,70,229,0.45)] hover:bg-indigo-400 ${collapsed ? "px-2 p-1" : "px-3 p-2"}`}
            style={{ perspective: "1000px" }}
          >
            {/* 3D inner card */}
            <div
              className={`flex items-center gap-3 transition-transform duration-500 ease-out group-hover:rotate-x-6 group-hover:-rotate-y-6 ${collapsed ? "" : ""}`}
            >
              <div
                className={`flex items-center justify-center border-2 border-indigo-300 rounded-full p-1 bg-indigo-700 shadow-lg transition-transform duration-500 group-hover:translate-z-10 group-hover:scale-110`}
              >
                <User2 className="text-white" />
              </div>

              {/* Admin Name */}
              <div
                className={`flex flex-col whitespace-nowrap transition-opacity duration-700 ${collapsed ? "opacity-0" : "opacity-100"}`}
              >
                <span
                  className={`font-semibold text-gray-900 group-hover:text-white transition-colors`}
                >
                  {loggedUser ? loggedUser.fullname : "Loading..."}
                </span>

                <span
                  className={`text-[14px] leading-tight transition-colors ${
                    loggedUser?.role === "admin"
                      ? "text-blue-600 group-hover:text-blue-200"
                      : "text-gray-600 group-hover:text-gray-200"
                  }`}
                >
                  {capitalRole(loggedUser?.role)}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`group flex absolute bottom-4 left-3 right-3 items-center p-3 px-3 rounded-lg cursor-pointer transition-colors duration-200 text-red-600 hover:bg-red-100`}
            onClick={handleLogout}
          >
            <div className="w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-125">
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
