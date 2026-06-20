import React, { useEffect, useState } from "react";
import CreateJobCard from "../../../components/ui/Card/CreateJobCard";
import { SelectOption } from "../../../components/ui/Card/SelectOption";
import AddCandidate from "../../../components/ui/Card/AddCandidate";
import { getAllCandidates } from "../../../api/differentApi's/getAllCandidates.api";
import { getAllJobs } from "../../../api";
import CandidateDetail from "../../../components/ui/Card/CandidateDetails";
import {
  getAvatarColor,
  getAvatarInitials,
  getStatusColor,
} from "../../../components/utils/avatarUtils.js";

function Candidates() {
  const [open, setOpen] = useState(false);

  const [allCandidate, setAllCandidate] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      const res = await getAllCandidates();
      setAllCandidate(res.data);
    };

    const fetchJobs = async () => {
      const res = await getAllJobs();
      setAllJobs(res.data);
    };

    fetchCandidates();
    fetchJobs();
  }, []);

  //! so user can filter the candidates
  const filteredCandidates = allCandidate.filter((candidate) => {
    return (
      (!selectedStatus || candidate.status === selectedStatus) &&
      (!selectedJob || candidate.job === selectedJob) &&
      (!selectedSource || candidate.source === selectedSource)
    );
  });

  const jobTitles = allJobs.map((job) => job.title);
  //! it gives only unique
  const sources = [
    ...new Set(allCandidate.map((candidate) => candidate.source)),
  ];

  return (
    <div className="space-y-8">
      {/* //? Heading and add add candidates button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Candidates</h1>
          <p className="text-gray-600 text-sm">
            Manage your jobs posting and track applicants.
          </p>
        </div>

        {/* //? add a sourced candidate */}
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="bg-indigo-600 text-white p-1 px-2 rounded-lg text-center flex gap-3"
          >
            <i className="font-medium">+</i> Add Candidates
          </button>

          {/* //? Add candidate PopUp */}
          <div>
            {/* for background blur */}
            <div
              className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm
              transition-opacity duration-300
              ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
              `}
              onClick={() => setOpen(false)}
            />

            <AddCandidate open={open} setOpen={setOpen} />
            <CandidateDetail
              open={detailOpen}
              setOpen={setDetailOpen}
              candidate={selectedCandidate}
              onStatusChange={(id, status) =>
                setAllCandidate((prev) =>
                  prev.map((c) => (c._id === id ? { ...c, status } : c)),
                )
              }
            />
          </div>
        </div>
      </div>

      {/* //? for filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-1/4">
          <SelectOption
            placeholder="All status"
            options={[
              "Applied",
              "Screening",
              "Shortlisted",
              "Interview Scheduled",
              "Selected",
              "Rejected",
              "On Hold",
            ]}
            onOptionSelection={(value) =>
              setSelectedStatus(value === "All status" ? "" : value)
            }
          />
        </div>

        <div className="w-1/4">
          <SelectOption
            placeholder="All job"
            options={["All jobs", ...jobTitles]}
            onOptionSelection={(value) =>
              setSelectedJob(value === "All jobs" ? "" : value)
            }
          />
        </div>

        <div className="w-1/4">
          <SelectOption
            placeholder="All source"
            options={["All source", ...sources]}
            onOptionSelection={(value) =>
              setSelectedSource(value === "All source" ? "" : value)
            }
          />
        </div>
      </div>

      {/* //? candidates */}
      <div className="overflow-hidden rounded-xl border-[1px]">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 text-gray-500 border-b">
            <tr>
              <th className="px-3 py-2 text-left">CANDIDATES</th>
              <th className="px-3 py-2 text-left">APPLIED JOB</th>
              <th className="px-3 py-2 text-center">STATUS</th>
              <th className="px-3 py-2 text-center">SOURCE</th>
              <th className="px-3 py-2 text-center">EXP.</th>
            </tr>
          </thead>

          <tbody>
            {filteredCandidates.map((candidate) => (
              <tr
                key={candidate._id}
                onClick={() => {
                  setSelectedCandidate(candidate);
                  setDetailOpen(true);
                }}
                className="border-b hover:bg-slate-100 cursor-pointer"
                >
                <td className=" px-3 py-4 mb-1.5 flex items-center gap-2">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-medium ${getAvatarColor(candidate.fullname)}`}
                  >
                    {getAvatarInitials(candidate.fullname)}
                  </div>
                  <span className="truncate text-[16px] font-medium text-gray-800">
                    {candidate.fullname}
                  </span>
                </td>

                <td className="px-3 py-3 text-left text-black font-medium">
                  {candidate.job}
                </td>

                <td className="px-3 py-3 text-center font-medium text-gray-500">
                  <span
                    className={`rounded-lg px-2 py-[1px] text-[10px] font-medium border ${getStatusColor(
                      candidate.status,
                    )}`}
                  >
                    {candidate.status}
                  </span>
                </td>

                <td className="px-3 py-3 text-center font-medium text-gray-500">
                  {candidate.source}
                </td>
                <td className="px-3 py-3 text-center font-medium text-gray-500">
                  {candidate.experience} years
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Candidates;
