import React, { useState } from "react";
import { Link } from "react-router-dom";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Consulting",
  "Media & Entertainment",
  "Real Estate",
  "Other",
];
const commpanySize = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const SelectOption = ({ options, placeholder, onOptionSelection }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="relative w-64">
      <button
        className="cursor-pointer w-full flex justify-between items-center px-4 py-3 rounded-xl border bg-[#eceef4] shadow-sm text-gray-600 hover:shadow-md transition"
        onClick={() => setOpen(!open)} ////// open will be true when button is clicked
      >
        {selected || placeholder}
        <span className="">▾</span>
      </button>

      {/* ////////   for Drop Down */}

      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-xl bg-white shadow-lg border overflow-hidden">
          {options.map((options) => (
            <div
              key={options}
              onClick={() => {
                setSelected(options);
                setOpen(false);
                onOptionSelection(options);
              }}
              className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 transition"
            >
              {options}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function CompanyRegister() {
  ////////////////  here these industry and companySize will be used to send data to backend
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");

  return (
    <main className="h-screen bg-[#eceef4]">
      <div>
        <h1>Get started with Jobrix</h1>
        <p>Set up your company workspace and start hiring smarter</p>
      </div>

      <div className="bg-white m-10 p-8 rounded-2xl shadow-xl">
        <form className="flex flex-col gap-10" action="submit">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-semibold text-2xl">Company Details</h1>
              <p className="text-gray-500 text-sm">Tell us about your organization</p>
            </div>
            <div className="flex flex-col justify-center gap-6">
              <label className="flex flex-col gap-3">
                <p className="font-medium"> Company Name *</p>
                <input
                  className="bg-[#eceef4] p-3 rounded-xl border border-gray-400"
                  type="text"
                  placeholder="Joobrix Inc."
                  required
                />
              </label>
              <label className="flex flex-col gap-3">
                <p className="font-medium">Company Domain *</p>
                <input
                  className="bg-[#eceef4] p-3 rounded-xl border border-gray-400"
                  type="text"
                  placeholder="jobrix.com"
                  required
                />
              </label>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Industry</p>
                  <SelectOption
                    options={industries}
                    placeholder={"Select Industry"}
                    onOptionSelection={setIndustry}
                  />
                </div>
                <div>
                  <p className="font-medium">Company Size</p>
                  <SelectOption
                    options={commpanySize}
                    placeholder={"Select  Size"}
                    onOptionSelection={setCompanySize}
                  />
                </div>
              </div>
              <label className="flex flex-col gap-3">
                <p className="font-medium">Location</p>
                <input
                  className="bg-[#eceef4] p-3 rounded-xl border border-gray-400"
                  type="text"
                  placeholder="sikar, rajasthan"
                  required
                />
              </label>
            </div>
          </div>

          <hr className="border-[1px]" />

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-semibold text-2xl">Admin Account</h1>
              <p className="text-gray-500 text-sm">Create your admministrator login</p>
            </div>
            <label className="flex flex-col gap-3">
              Full Name *
              <input
                className="bg-[#eceef4] p-3 rounded-xl border border-gray-400"
                type="text"
                placeholder="John Doe"
                required
              />
            </label>
            <label className="flex flex-col gap-3">
              Work Email *
              <input
                className="bg-[#eceef4] p-3 rounded-xl border border-gray-400"
                type="email"
                placeholder="jhon@jobrix.com"
                required
              />
            </label>
            <label className="flex flex-col gap-3">
              Password *
              <input
                className="bg-[#eceef4] p-3 rounded-xl border border-gray-400"
                type="password"
                placeholder="Min. 6 characters"
                required
              />
            </label>
          </div>

          <button>Create Company & Continue</button>
        </form>
        <p>
          By signing up, you agree to our <Link to="">Terms of Service</Link>{" "}
          and <Link to="">Privacy Policy</Link>
        </p>
      </div>
    </main>
  );
}

export default CompanyRegister;
