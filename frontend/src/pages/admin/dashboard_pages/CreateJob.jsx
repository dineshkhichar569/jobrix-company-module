import { MapPin, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../../api/index.js";
import CreateJobCard from "../../../components/ui/Card/CreateJobCard.jsx";

function CreateJob() {
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await getAllJobs();
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="space-y-8">
      {/* //? Heading and add team job button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Jobs</h1>
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
            <i className="font-medium">+</i> Create Job
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
              <th className="px-3 py-2 text-left">JOB TITLE</th>
              <th className="px-3 py-2 text-left">DEPARTMENT</th>
              <th className="px-3 py-2 text-left">LOCATION</th>
              <th className="px-3 py-2 text-center">STATUS</th>
              <th className="px-3 py-2 text-center">RECRUITER</th>
              <th className="px-3 py-2 text-left">APPLICANTS</th>
              <th className="px-3 py-2 text-left">CREATED</th>
              <th className="px-3 py-2 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-b hover:bg-slate-100">
                <td className=" px-3 py-4 flex gap-3 items-center">
                  <p className="font-medium text-base">{job.title}</p>
                  <p className="text-[11px] text-blue-600">
                    <span className="animate-ping"> ● </span>
                    {job.jobType}
                  </p>
                </td>
                <td className="px-3 py-3 font-medium text-gray-500">
                  {job.department}
                </td>
                <td className="px-3 py-3 font-medium text-gray-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-indigo-500 animate-bounce" />{" "}
                  {job.location}
                </td>
                <td className="px-3 py-3 text-center font-medium text-gray-500">
                  <span
                    className={`border rounded-lg px-2 p-[1px] text-[10px] font-medium
                       ${job.status === "close" ? "text-red-600 bg-red-50 border-red-500" : "text-blue-600 bg-blue-50 border-blue-500"}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-center text-black font-medium">
                  Recruiter
                </td>
                <td className="px-3 py-3 text-center text-black font-medium flex items-center gap-3">
                  <Users2 className="w-4 h-4 text-gray-500" /> 45
                </td>
                <td className="px-3 py-3 font-medium text-gray-500">
                  {new Date(job.createdAt).toLocaleDateString("en-IN", {
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

export default CreateJob;
