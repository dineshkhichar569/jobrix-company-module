import { UserCheck2, UserPlus2Icon } from "lucide-react";
import React from "react";

function AddMember({ open, setOpen }) {
  return (
    <div
      className={`fixed z-50 w-1/3 left-1/2 -translate-x-1/3 top-32
        bg-white border rounded-2xl p-6
        transform transition-all duration-300 ease-out
        ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }
      `}
    >
        {/* For Heading */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
          <UserPlus2Icon className="w-5 h-5 text-indigo-600" />
          Register New Member
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Create a new internal user with assigned role and access.
        </p>
      </div>

      <form className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="addMemberInput"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="addMemberInput"
            placeholder="Enter email address"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Temporary Password
          </label>
          <input
            type="password"
            className="addMemberInput"
            placeholder="Set temporary password"
          />
        </div>

        <div className="flex justify-between items-center gap-6">
          {/* Role */}
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Role</label>
            <select className="addMemberInput">
              <option value="">Select role</option>
              <option>Admin</option>
              <option>Recruiter</option>
              <option>HR Manager</option>
            </select>
          </div>

          {/* Account Status */}
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">
              Account Status
            </label>
            <select className="addMemberInput">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
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
            Create Member
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMember;
