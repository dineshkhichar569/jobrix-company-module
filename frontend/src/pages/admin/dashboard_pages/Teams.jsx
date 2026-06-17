import React, { useEffect, useState } from "react";
import AddMemberCard from "../../../components/ui/Card/AddMemberCard";
import { getAllMembers } from "../../../api/index.js";
import { Shield, UserCheck, Users } from "lucide-react";

function Teams() {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await getAllMembers();
      setMembers(res.data);
    };

    fetchMembers();
  }, []);

  //! so that Admin should always on top
  const sortedMember = [...members].sort((a, b) => {
    if (a.role === "admin" && b.role !== "admin") return -1;
    if (a.role !== "admin" && b.role === "admin") return 1;
    return 0;
  });

  //! to count total members, Admins, Recruiters, HR Managers
  const totalAdmin = members.filter((m) => m.role === "admin").length;
  const totalRecruiter = members.filter((m) => m.role === "recruiter").length;
  const totalHr = members.filter((m) => m.role === "hr_manager").length;
  const totalMembers = totalAdmin + totalRecruiter + totalHr;

  return (
    <div className="space-y-8">
      {/* //! Heading and add team member button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Team</h1>
          <p className="text-gray-600 text-sm">
            Manage team members and their access levels
          </p>
        </div>

        {/* //! add team Member */}
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="bg-indigo-600 text-white p-1 px-2 rounded-lg text-center flex gap-3"
          >
            <i className="font-medium">+</i> Add team Member
          </button>

          {/* //! Add Member PopUp */}
          <div>
            {/* //! for background blur */}
            <div
              className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm
              transition-opacity duration-300
              ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
              `}
              onClick={() => setOpen(false)}
            />

            <AddMemberCard open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>

      {/* //! member numbers */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* //! Team Members */}
          <div className="flex items-center gap-4 p-4 border rounded-xl bg-white">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xl font-semibold">{totalMembers}</p>
              <p className="text-sm text-gray-500">Team Members</p>
            </div>
          </div>

          {/* //! Admins */}
          <div className="flex items-center gap-4 p-4 border rounded-xl bg-white">
            <div className="p-2 rounded-lg bg-red-100 text-red-600">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-xl font-semibold">{totalAdmin}</p>
              <p className="text-sm text-gray-500">Admins</p>
            </div>
          </div>

          {/* //! Recruiters */}
          <div className="flex items-center gap-4 p-4 border rounded-xl bg-white">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-xl font-semibold">{totalRecruiter}</p>
              <p className="text-sm text-gray-500">Recruiters</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 border rounded-xl bg-white">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-xl font-semibold">{totalHr}</p>
              <p className="text-sm text-gray-500">HR Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* //! members */}
      <div className="overflow-hidden rounded-xl border-[1px]">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 text-gray-500 border-b">
            <tr>
              <th className="px-3 py-2 text-left">Member</th>
              <th className="px-3 py-2 text-left">Role</th>
              <th className="px-3 py-2 text-left">Department</th>
              <th className="px-3 py-2 text-center">Active Jobs</th>
              <th className="px-3 py-2 text-center">Total Hired</th>
              <th className="px-3 py-2 text-left">Joined</th>
              <th className="px-3 py-2 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {sortedMember.map((member) => (
              <tr key={member._id} className="border-b hover:bg-slate-100">
                <td className=" px-3 py-4 flex gap-2 items-center">
                  <span
                    className={`font-bold text-sm h-8 w-8 rounded-full flex items-center justify-center 
                      ${member.role === "admin" ? "text-red-500 bg-red-100" : "text-blue-500 bg-blue-100"}`}
                  >
                    {member.fullname?.charAt(0).toUpperCase()}
                  </span>
                  <div className="-space-y-1">
                    <p className="font-medium text-base">{member.fullname}</p>
                    <p className="text-[11px] text-gray-600">{member.email}</p>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`border rounded-lg px-2 p-[1px] text-[10px] font-medium
                       ${member.role === "admin" ? "text-red-600 bg-red-50 border-red-500" : "text-blue-600 bg-blue-50 border-blue-500"}`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="px-3 py-3 font-medium text-gray-500">
                  {member.department}
                </td>
                <td className="px-3 py-3 text-center font-medium text-gray-500">
                  0
                </td>
                <td className="px-3 py-3 text-center text-black font-medium">
                  6
                </td>
                <td className="px-3 py-3 font-medium text-gray-500">
                  {new Date(member.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-3 py-3 cursor-pointer">•••</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
