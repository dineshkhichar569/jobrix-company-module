import { useEffect, useState } from "react";
import { SelectOption } from "./SelectOption";
import { addCandidate } from "../../../api/index.js";
import { getAllJobs } from "../../../api/index.js";
import { AnimatePresence } from "framer-motion";
import AuthMSG from "../popUpMessages/AuthMSG";

export default function AddCandidate({ open, setOpen }) {
  const [candidate_Name, setCandidate_Name] = useState("");
  const [candidate_Email, setCandidate_Email] = useState("");
  const [candidate_PhoneNo, setCandidate_PhoneNo] = useState("");
  const [candidate_Location, setCandidate_Location] = useState("");
  const [candidate_Experience, setCandidate_Experience] = useState("");
  const [candidate_Job, setCandidate_Job] = useState("");
  const [candidate_Skills, setCandidate_Skills] = useState("");
  const [candidate_Status, setCandidate_Status] = useState("");
  const [candidate_Source, setCandidate_Source] = useState("");
  // const [candidate_Resume, setCandidate_Resume] = useState("");
  const [candidate_Notes, setCandidate_Notes] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const res = await getAllJobs();
      setJobs(res.data);
    }
    fetchJobs();
  }, []);
  const jobTitles = jobs.map(job => job.title);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        candidate_Name,
        candidate_Email,
        candidate_PhoneNo,
        candidate_Location,
        candidate_Experience,
        candidate_Job,
        candidate_Skills,
        candidate_Status,
        candidate_Source,
        // candidate_Resume,
        candidate_Notes,
      };

      setError("");
      setSuccess(true);

      if (open) {
        setTimeout(() => {
          setOpen(false);
        }, 300);
      }

      setCandidate_Name("");
      setCandidate_Email("");
      setCandidate_PhoneNo("");
      setCandidate_Location("");
      setCandidate_Experience("");
      setCandidate_Job("");
      setCandidate_Skills("");
      setCandidate_Status("");
      setCandidate_Source("");
      // setCandidate_Resume("");
      setCandidate_Notes("");

      await addCandidate(data);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      setError(message);
      setSuccess(false);

      console.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <div
        className={`fixed z-50 w-4/5 max-w-5xl h-5/6 overflow-y-auto custom-scrollbar left-1/2 -translate-x-1/2 top-16 bg-white border rounded-2xl p-6
          transform transition-all duration-300 ease-out ${
            open
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
      >
        {/* //! Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Add Candidate</h2>

          <p className="mt-1 text-sm text-gray-500">
            Fields marked * are required.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* //! Personal Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Personal Information
            </h3>

            <div className="flex gap-6">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Full Name *
                </label>

                <input
                  type="text"
                  className="addMemberInput"
                  placeholder="e.g. Aman Kumar"
                  required
                  value={candidate_Name}
                  onChange={(e) => setCandidate_Name(e.target.value)}
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>

                <input
                  type="email"
                  placeholder="aman@gmail.com"
                  className="addMemberInput"
                  required
                  value={candidate_Email}
                  onChange={(e) => setCandidate_Email(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Phone</label>

                <input
                  type="text"
                  placeholder="+91 9876543210"
                  className="addMemberInput"
                  value={candidate_PhoneNo}
                  onChange={(e) => setCandidate_PhoneNo(e.target.value)}
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>

                <input
                  type="text"
                  placeholder="Bengaluru, India"
                  className="addMemberInput"
                  value={candidate_Location}
                  onChange={(e) => setCandidate_Location(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* //! Professional Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Professional Information
            </h3>

            <div className="flex gap-6">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Experience (Years)
                </label>

                <input
                  type="number"
                  placeholder="3"
                  className="addMemberInput"
                  value={candidate_Experience}
                  onChange={(e) => setCandidate_Experience(e.target.value)}
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">
                  Applied For Job *
                </label>

                <SelectOption
                  options={jobTitles}
                  placeholder="Select Job"
                  onOptionSelection={setCandidate_Job}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Skills</label>

              <input
                type="text"
                placeholder="React, Node.js, MongoDB..."
                className="addMemberInput"
                value={candidate_Skills}
                onChange={(e) => setCandidate_Skills(e.target.value)}
              />
            </div>
          </div>

          {/* //! Application Details */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Application Details
            </h3>

            <div className="flex gap-6">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Status</label>

                <SelectOption
                  options={[
                    "Applied",
                    "Screening",
                    "Interview",
                    "Offer",
                    "Rejected",
                  ]}
                  placeholder="Select Status"
                  onOptionSelection={setCandidate_Status}
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Source</label>

                <SelectOption
                  options={["Website", "LinkedIn", "Referral", "Naukri"]}
                  placeholder="Select Source"
                  onOptionSelection={setCandidate_Source}
                />
              </div>
            </div>

            {/* //! Resume */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Resume</label>

              <div className="border border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
                Upload PDF or Paste Resume URL
              </div>
            </div>

            {/* //! Notes */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Notes</label>

              <textarea
                rows={4}
                placeholder="Internal notes about this candidate..."
                className="addMemberInput resize-none"
                value={candidate_Notes}
                onChange={(e) => setCandidate_Notes(e.target.value)}
              />
            </div>
          </div>

          {/* //! Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-3 py-1 border rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(!open)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Candidate
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
            placeholder="Candidate added Successfully"
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
