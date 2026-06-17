import { SelectOption } from "./SelectOption";

export default function AddCandidate() {
  return (
    <div
      className={`fixed z-50 w-4/5 max-w-5xl h-5/6 left-1/2 -translate-x-1/2 top-16
  bg-white border rounded-2xl p-6
  transform transition-all duration-300 ease-out`}
    >
      {/* //! Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Add Candidate</h2>

        <p className="mt-1 text-sm text-gray-500">
          Fields marked * are required.
        </p>
      </div>

      <form className="space-y-6">
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
                placeholder="e.g. Aman Kumar"
                className="addMemberInput"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Email *</label>

              <input
                type="email"
                placeholder="aman@gmail.com"
                className="addMemberInput"
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
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Location</label>

              <input
                type="text"
                placeholder="Bengaluru, India"
                className="addMemberInput"
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

              <input type="number" placeholder="3" className="addMemberInput" />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Applied For Job *
              </label>

              <SelectOption
                options={[
                  "Frontend Developer",
                  "Backend Developer",
                  "Full Stack Developer",
                ]}
                placeholder="Select Job"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Skills</label>

            <input
              type="text"
              placeholder="React, Node.js, MongoDB..."
              className="addMemberInput"
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
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Source</label>

              <SelectOption
                options={["Website", "LinkedIn", "Referral", "Naukri"]}
                placeholder="Select Source"
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
            />
          </div>
        </div>

        {/* //! Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-3 py-1 border rounded-lg hover:bg-gray-100"
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
  );
}
