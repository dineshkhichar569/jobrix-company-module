import { UserPlus2Icon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { addMember } from "../../../api/index.js";
import { useEffect, useState } from "react";
import { SelectOption } from "./SelectOption.jsx";
import AuthMSG from "../popUpMessages/AuthMSG.jsx";

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

function AddMemberCard({ open, setOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        fullname: name,
        email,
        password,
        role: role.toLocaleLowerCase(),
        department,
      };
      
      console.log(data);
      
      setSuccess(true);
      setError(false);

      if (open) {
        setTimeout(() => {
          setOpen(false);
        }, 300);
      }

      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setDepartment("");

      const res = await addMember(data);
      console.log(res);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      setError(message);
      setSuccess(false);
      console.log(error);

      console.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  ////// so that error disappear after few seconds
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
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
        className={`fixed z-50 w-1/3 left-1/2 -translate-x-1/2 top-32
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

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="addMemberInput"
              placeholder="Enter full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="addMemberInput"
              placeholder="Enter email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center gap-6">
            {/* Role */}
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Role</label>
              <SelectOption
                options={["Admin", "Recruiter", "HR_Manager"]}
                placeholder="Select Role"
                onOptionSelection={setRole}
              />
            </div>

            {/* Account Status */}
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <SelectOption
                options={departments}
                placeholder="Select Department"
                onOptionSelection={setDepartment}
              />
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

      {/* for error popUp */}
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
            popUpDirection="top"
          />
        )}
        {success && (
          <AuthMSG
            placeholder="New team member added successfully!"
            icon="🎉"
            top="24px"
            background="#16a34a"
            color="white"
            textSize="18px"
            px="20px"
            py="12px"
            popUpDirection="to p"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default AddMemberCard;
