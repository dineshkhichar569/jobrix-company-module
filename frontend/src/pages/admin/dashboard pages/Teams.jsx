import React from "react";

function Teams() {
  return (
    <div className="space-y-8">
      {/* Heading and add team member button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Team</h1>
          <p className="text-gray-600 text-sm">Manage team members and their access levels</p>
        </div>

        {/* add team Member */}
        <div>
          <button className="bg-indigo-600 text-white p-1 px-2 rounded-lg text-center flex gap-3">
            <i className="font-medium">+</i> Add team Member
          </button>
        </div>
      </div>

      {/* member numbers */}
      <div>
        <div></div>
      </div>

      {/* members */}
      <div className="overflow-hidden rounded-xl border-[1px]">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 text-gray-500">
            <tr>
              <th className=" px-3 py-2 text-left">Member</th>
              <th className="px-3 py-2 text-left">Role</th>
              <th className="px-3 py-2 text-left">Department</th>
              <th className="px-3 py-2 text-center">Active Jobs</th>
              <th className="px-3 py-2 text-center">Total Hired</th>
              <th className="px-3 py-2 text-left">Joined</th>
              <th className="px-3 py-2 text-left"></th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className=" px-3 py-2 flex gap-2 items-center">
                <span className="bg-red-100 text-red-500 font-bold text-base px-3 p-[6px] rounded-full text-center">
                  D
                </span>
                <div>
                  <p className="font-medium">Dinesh Khichar</p>
                  <p className="text-xs text-gray-600">
                    dinesh.khichar.work@gmail.com
                  </p>
                </div>
              </td>
              <td className=" px-3 py-2">
                <span className="border border-red-500 rounded-lg px-2 p-[1px] text-[10px] font-medium text-red-600 bg-red-50">
                  Admin
                </span>
              </td>
              <td className=" px-3 py-2">HR</td>
              <td className=" px-3 py-2 text-center">0</td>
              <td className=" px-3 py-2 text-center text-black font-medium">
                6
              </td>
              <td className=" px-3 py-2">Jan 15, 2023</td>
              <td className=" px-3 py-2 cursor-pointer">•••</td>
            </tr>

            <tr>
              <td className=" px-3 py-2 flex gap-2 items-center">
                <span className="bg-blue-100 text-blue-500 font-bold text-base px-3 p-[6px] rounded-full text-center">
                  D
                </span>
                <div>
                  <p className="font-medium">Sunny</p>
                  <p className="text-xs text-gray-600">
                    dinesh.khichar.work@gmail.com
                  </p>
                </div>
              </td>
              <td className=" px-3 py-2">
                <span className="border border-blue-500 rounded-lg px-2 p-[1px] text-[10px] font-medium text-blue-600 bg-blue-50">
                  Recruiter
                </span>
              </td>
              <td className=" px-3 py-2">Talent</td>
              <td className=" px-3 py-2 text-center">3</td>
              <td className=" px-3 py-2 text-center text-black font-medium">
                12
              </td>
              <td className=" px-3 py-2">Mar 20, 2023</td>
              <td className=" px-3 py-2 cursor-pointer">•••</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
