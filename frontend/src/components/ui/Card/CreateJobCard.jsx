import { BriefcaseBusiness } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useState } from "react";
import AuthMSG from "../popUpMessages/AuthMSG.jsx";
import { SelectOption } from "./SelectOption.jsx";
import { addJob } from "../../../api/differentApi's/addJob.api.js";

const departments = [
  "Human Resources",
  "Engineering",
  "Product Management",
  "Design",
  "Sales",
  "Marketing",
  "Customer Support",
  "Operations",
  "Finance",
  "Legal",
  "Administration",
  "IT & Infrastructure",
  "Quality Assurance",
  "Business Development",
  "Data & Analytics",
  "Research & Development",
  "Supply Chain",
  "Procurement",
  "Training & Development",
  "Other",
];

function CreateJobCard({ open, setOpen }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDepartment, setJobDepartment] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirement, setJobRequirement] = useState("");
  const [jobStatus, setJobStatus] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        jobTitle,
        jobDepartment,
        jobLocation,
        jobType,
        jobDescription,
        jobRequirement,
        jobStatus,
      };

      setError("");
      setSuccess(true);

      if (open) {
        setTimeout(() => {
          setOpen(false);
        }, 300);
      }

      setJobTitle("");
      setJobDepartment("");
      setJobLocation("");
      setJobType("");
      setJobDescription("");
      setJobRequirement("");
      setJobStatus("");

      const res = await addJob(data);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      setError(message);
      setSuccess(false);

      console.error(error.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }

    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [error, success]);

  return (
    <>
      <div
        className={`fixed z-50 w-[70vw] max-w-5xl left-1/2 -translate-x-1/2 top-32
      bg-white border rounded-2xl p-6
      transform transition-all duration-300 ease-out
      ${
        open
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
      }`}
      >
        {/* Heading */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
            <BriefcaseBusiness className="w-5 h-5 text-indigo-600" />
            Create New Job
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Fill job details to publish a new opening.
          </p>
        </div>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Job Title */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              className="addMemberInput"
              placeholder="e.g. Frontend Developer"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <SelectOption
              options={departments}
              placeholder="Select Department"
              onOptionSelection={setJobDepartment}
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Type</label>
            <SelectOption
              options={["Full Time", "Intern", "Contract"]}
              placeholder="Select Type"
              onOptionSelection={setJobType}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="addMemberInput"
              placeholder="Remote / Jaipur"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
            />
          </div>

          {/* Job Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Status</label>
            <SelectOption
              options={["Open", "Closed", "Draft"]}
              placeholder="Select Status"
              onOptionSelection={setJobStatus}
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Job Description
            </label>
            <textarea
              className="addMemberInput resize-y max-h-48"
              rows={2}
              placeholder="Role & responsibilities"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* Job Requirements */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Job Requirements
            </label>
            <textarea
              className="addMemberInput resize-y max-h-48"
              rows={2}
              placeholder="Skills & experience"
              value={jobRequirement}
              onChange={(e) => setJobRequirement(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 pt-3">
            <button
              type="button"
              className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(!open)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>

      {/* Popups stay SAME */}
      <AnimatePresence mode="wait">
        {error && (
          <AuthMSG
            placeholder={error}
            icon="⚠️"
            bottom="24px"
            background="#dc2626"
            color="white"
            textSize="16px"
            px="15px"
            py="8px"
            popUpDirection="bottom"
          />
        )}

        {success && (
          <AuthMSG
            placeholder="Job created successfully!"
            icon="🎉"
            top="24px"
            background="#16a34a"
            color="white"
            textSize="18px"
            px="20px"
            py="12px"
            popUpDirection="top"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default CreateJobCard;
