import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Shield,
  Briefcase,
  UserCheck,
  X,
} from "lucide-react";
import { SelectOption } from "./SelectOption.jsx";

const ROLES = ["admin", "hr", "recruiter"];

//! role badge colors
function getRoleColor(role) {
  if (role === "admin") return "bg-rose-50 text-rose-600 border-rose-200";
  if (role === "hr") return "bg-amber-50 text-amber-600 border-amber-200";
  return "bg-sky-50 text-sky-600 border-sky-200";
}

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TeamMemberDetail({
  open,
  setOpen,
  member,
  onRoleChange,
  onDeactivate,
}) {
  if (!member) return null;

  const handleRole = async (newRole) => {
    onRoleChange?.(member._id, newRole);
  };

  return (
    <>
      {/* //! backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* //! right floating rounded card */}
      <div
        className={`fixed right-4 top-4 bottom-4 z-50 w-[380px] max-w-[90%] bg-white rounded-2xl shadow-2xl
        transition-all duration-300 ease-out overflow-y-auto
        ${open ? "translate-x-0 opacity-100" : "translate-x-[calc(100%+1rem)] opacity-0"}`}
      >
        {/* //! header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-sm font-medium text-gray-400">Team member</span>
          <button onClick={() => setOpen(false)}>
            <X className="text-gray-400" />
          </button>
        </div>

        {/* //! emerald identity banner */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 px-5 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-semibold text-white shadow-lg shadow-emerald-500/25">
              {initials(member.fullname)}
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {member.fullname}
              </div>
              <span
                className={`mt-1 inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getRoleColor(
                  member.role,
                )}`}
              >
                {member.role}
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 py-5">
          {/* //! stats strip */}
          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                <Briefcase size={12} /> Active Jobs
              </div>
              <div className="mt-1 text-xl font-bold text-gray-900">
                {member.activeJobs ?? 0}
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                <UserCheck size={12} /> Total Hired
              </div>
              <div className="mt-1 text-xl font-bold text-gray-900">
                {member.totalHired ?? 0}
              </div>
            </div>
          </div>

          {/* //! role dropdown */}
          <div className="mb-5">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
              <Shield size={12} /> Access Level
            </div>
            <SelectOption
              placeholder={member.role}
              options={ROLES}
              onOptionSelection={handleRole}
            />
          </div>

          {/* //! contact */}
          <div className="mb-5">
            <div className="mb-2.5 text-[11px] font-medium text-gray-400">
              Contact
            </div>
            <div className="flex flex-col gap-2.5 text-sm text-gray-700">
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-500">
                  <Mail size={16} />
                </span>
                {member.email || "—"}
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-500">
                  <Phone size={16} />
                </span>
                {member.phoneNo || "—"}
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-500">
                  <Building2 size={16} />
                </span>
                {member.department || "—"}
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-500">
                  <Calendar size={16} />
                </span>
                Joined {formatDate(member.createdAt)}
              </div>
            </div>
          </div>

          {/* //! assigned jobs */}
          {member.assignedJobs?.length > 0 && (
            <div className="mb-5">
              <div className="mb-2.5 text-[11px] font-medium text-gray-400">
                Assigned Jobs
              </div>
              <div className="flex flex-wrap gap-1">
                {member.assignedJobs.map((job, i) => (
                  <span
                    key={i}
                    className="rounded-xl bg-emerald-50 px-3 py-1 text-xs text-emerald-700"
                  >
                    {typeof job === "string" ? job : job.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* //! deactivate */}
          <button
            onClick={() => onDeactivate?.(member._id)}
            className="w-full rounded-lg border border-red-200 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Deactivate member
          </button>
        </div>
      </div>
    </>
  );
}
