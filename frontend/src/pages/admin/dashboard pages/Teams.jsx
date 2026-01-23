import React, { useState } from "react";
import AddMember from "../../../components/ui/Card/AddMember";

// PopUp apear when we click on Add team member button
const addTeamMember = () => {
  return <div></div>;
};

function Teams() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-8">
      {/* Heading and add team member button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Team</h1>
          <p className="text-gray-600 text-sm">
            Manage team members and their access levels
          </p>
        </div>

        {/* add team Member */}
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="bg-indigo-600 text-white p-1 px-2 rounded-lg text-center flex gap-3"
          >
            <i className="font-medium">+</i> Add team Member
          </button>

          {/* Add Member PopUp */}
          <div>
            {/* for background blur */}
            <div
              className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm
              transition-opacity duration-300
              ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
              `}
              onClick={() => setOpen(false)}
            />

            <AddMember open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>

      {/* member numbers */}
      <div>
        <div></div>
      </div>

      {/* members */}
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
            <tr className="border-b hover:bg-slate-100">
              <td className=" px-3 py-4 flex gap-2 items-center">
                <span className="bg-red-100 text-red-500 font-bold text-sm h-8 w-8 rounded-full flex items-center justify-center">
                  D
                </span>
                <div className="-space-y-1">
                  <p className="font-medium text-base">Dinesh Khichar</p>
                  <p className="text-[11px] text-gray-600">
                    dinesh.khichar.work@gmail.com
                  </p>
                </div>
              </td>
              <td className="px-3 py-3">
                <span className="border border-red-500 rounded-lg px-2 p-[1px] text-[10px] font-medium text-red-600 bg-red-50">
                  Admin
                </span>
              </td>
              <td className="px-3 py-3 font-medium text-gray-500">
                Human Resources
              </td>
              <td className="px-3 py-3 text-center font-medium text-gray-500">
                0
              </td>
              <td className="px-3 py-3 text-center text-black font-medium">
                6
              </td>
              <td className="px-3 py-3 font-medium text-gray-500">
                Jan 15, 2023
              </td>
              <td className="px-3 py-3 cursor-pointer">•••</td>
            </tr>

            <tr className="hover:bg-slate-100">
              <td className=" px-3 py-3 flex gap-2 items-center">
                <span className="bg-blue-100 text-blue-500 font-bold text-sm h-8 w-8 rounded-full flex items-center justify-center">
                  S
                </span>
                <div className="-space-y-1">
                  <p className="font-medium text-base">Sunny</p>
                  <p className="text-[11px] text-gray-600">
                    sunny.work@gmail.com
                  </p>
                </div>
              </td>
              <td className=" px-3 py-3">
                <span className="border border-blue-500 rounded-lg px-2 p-[1px] text-[10px] font-medium text-blue-600 bg-blue-50">
                  Recruiter
                </span>
              </td>
              <td className=" px-3 py-3 font-medium text-gray-500">
                Talent Acquisition
              </td>
              <td className=" px-3 py-3 text-center font-medium text-gray-500">
                3
              </td>
              <td className=" px-3 py-3 text-center text-black font-medium">
                12
              </td>
              <td className=" px-3 py-3 font-medium text-gray-500">
                Mar 20, 2023
              </td>
              <td className=" px-3 py-3 cursor-pointer">•••</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
