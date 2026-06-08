import React, { useState } from "react";
import CreateJobCard from "../../../components/ui/Card/CreateJobCard";

function Candidates() {

  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-8">
      {/* //? Heading and add team job button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Candidates</h1>
          <p className="text-gray-600 text-sm">
            Manage your jobs posting and track applicants.
          </p>
        </div>

        {/* //? add team Member */}
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="bg-indigo-600 text-white p-1 px-2 rounded-lg text-center flex gap-3"
          >
            <i className="font-medium">+</i> Add Candidates
          </button>

          {/* //? Add Member PopUp */}
          <div>
            {/* for background blur */}
            <div
              className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm
              transition-opacity duration-300
              ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
              `}
              onClick={() => setOpen(false)}
            />

            <CreateJobCard open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>

      {/* //? jobs */}
      <div className="overflow-hidden rounded-xl border-[1px]">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 text-gray-500 border-b">
            <tr>
              <th className="px-3 py-2 text-left">CANDIDATES</th>
              <th className="px-3 py-2 text-center">APPLIED JOB</th>
              <th className="px-3 py-2 text-center">STATUS</th>
              <th className="px-3 py-2 text-center">SOURCE</th>
              <th className="px-3 py-2 text-center">EXP.</th>
            </tr>
          </thead>

          <tbody>
            {/* {jobs.map((job) => ( */}
              <tr key={0} className="border-b hover:bg-slate-100 cursor-pointer">

                <td className=" px-3 py-4 flex gap-3 items-center">
                  <p className="font-medium text-base">candidate</p>
                  <p className="text-[11px] text-blue-600">
                    <span className="animate-ping"> ● </span>
                    intern
                  </p>
                </td>

                <td className="px-3 py-3 text-center text-black font-medium">
                  React developer
                </td>

                <td className="px-3 py-3 text-center font-medium text-gray-500">
                  <span
                    // className={`border rounded-lg px-2 p-[1px] text-[10px] font-medium
                    //    ${job.status === "close" ? "text-red-600 bg-red-50 border-red-500" : "text-blue-600 bg-blue-50 border-blue-500"}`}
                  >
                    status
                  </span>
                </td>

                <td className="px-3 py-3 text-center font-medium text-gray-500">
                  source
                </td>
                <td className="px-3 py-3 text-center font-medium text-gray-500">
                  3 years
                </td>

              </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Candidates;
