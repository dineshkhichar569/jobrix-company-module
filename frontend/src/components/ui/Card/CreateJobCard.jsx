import { BriefcaseBusiness } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";
import AuthMSG from "../popUpMessages/AuthMSG.jsx";
import { SelectOption } from "./SelectOption.jsx";
import { addJob } from "../../../api/differentApi's/addJob.api.js";
import { updateJob } from "../../../api/differentApi's/updateJob.api.js";

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

//! job present = edit mode || absent = create mode
//! onSaved = parent refreshes the jobs list after save
function CreateJobCard({ open, setOpen, job, onSaved }) {
  const isEdit = Boolean(job);

  const [jobTitle, setJobTitle] = useState("");
  const [jobDepartment, setJobDepartment] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirement, setJobRequirement] = useState("");
  const [jobStatus, setJobStatus] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  //! prefill when editing is opened
  useEffect(() => {
    if (job) {
      setJobTitle(job.title || "");
      setJobDepartment(job.department || "");
      setJobLocation(job.location || "");
      setJobType(job.jobType || "");
      setJobDescription(job.description || "");
      setJobRequirement(
        Array.isArray(job.requirements)
          ? job.requirements.join(", ")
          : job.requirements || "",
      );
      setJobStatus(job.status || "");
    } else {
      //! reset to empty for create mode
      setJobTitle("");
      setJobDepartment("");
      setJobLocation("");
      setJobType("");
      setJobDescription("");
      setJobRequirement("");
      setJobStatus("");
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: jobTitle,
        department: jobDepartment,
        location: jobLocation,
        jobType: jobType,
        description: jobDescription,
        requirements: jobRequirement
          ? jobRequirement.split(",").map((r) => r.trim())
          : [],
        status: jobStatus,
      };

      setError("");

      //! edit vs create
      if (isEdit) {
        await updateJob(job._id, data);
      } else {
        await addJob(data);
      }

      setSuccess(true);
      onSaved?.(); //! refresh the jobs list in parent

      if (open) {
        setTimeout(() => {
          setOpen(false);
        }, 300);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      setError(message);
      setSuccess(false);

      console.error(error.response?.data?.message || "Save failed");
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
            {isEdit ? "Edit Job" : "Create New Job"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {isEdit
              ? "Update the job details below."
              : "Fill job details to publish a new opening."}
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
              placeholder={jobDepartment || "Select Department"}
              onOptionSelection={setJobDepartment}
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Type</label>
            <SelectOption
              options={["Full Time", "Intern", "Contract"]}
              placeholder={jobType || "Select Type"}
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
              placeholder={jobStatus || "Select Status"}
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
              {isEdit ? "Save Changes" : "Create Job"}
            </button>
          </div>
        </form>
      </div>

      {/* //! for error popUp */}
      <AnimatePresence mode="wait">
        {error && (
          <AuthMSG
            message={error}
            type="warning"
            top=""
            bottom="24px"
            popUpDirection="bottom"
          />
        )}
        {success && (
          <AuthMSG
            message={
              isEdit ? "Job updated successfully!" : "Job created successfully!"
            }
            type="success"
            top="24px"
            bottom=""
            popUpDirection="top"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default CreateJobCard;
