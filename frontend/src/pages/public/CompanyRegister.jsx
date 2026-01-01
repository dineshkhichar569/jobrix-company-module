import React, { useState } from "react";
import { Link } from "react-router-dom";
import { companySignup } from "../../api/authApi";

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
        className="cursor-pointer w-full flex justify-between items-center px-4 py-2 rounded-xl border bg-[#eceef4] shadow-sm text-gray-600 hover:shadow-md transition"
        onChange={() => setOpen(!open)} ////// open will be true when button is clicked
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
              onChange={() => {
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

  const [companyName, setCompanyName] = useState("");
  const [domain, setDomain] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleCompanySignup = async (e) => {
    e.preventDefault();

    try {
      const data = {
        companyName: companyName,
        domain: domain,
        industry: industry,
        companySize: companySize,
        location: location,
        adminName: name,
        adminEmail: email,
        adminPhoneNo: mobile,
        adminGender: "",
        adminPassword: password,
      };
      
      const res = await companySignup(data);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <main className="h-full bg-[#eceef4] flex flex-col items-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Get started with Jobrix</h1>
        <p className="text-base text-gray-500">
          Set up your company workspace and start hiring smarter
        </p>
      </div>

      <div className="bg-white m-10 p-8 rounded-2xl shadow-xl  w-[50%]">
        <form
          className="flex flex-col gap-10"
          onSubmit={handleCompanySignup}
        >
          <div className="flex flex-col gap-6">
            <div className="flex justify-start items-center gap-3">
              <img
                className="border-2 border-blue-600 p-5 rounded-full"
                src="#"
                alt=""
              />
              <div>
                <h1 className="font-semibold text-2xl">Company Details</h1>
                <p className="text-gray-500 text-sm">
                  Tell us about your organization
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 pl-14">
              <label className="flex flex-col gap-3">
                <p className="font-medium"> Company Name *</p>
                <input
                  className="bg-[#eceef4] p-2 rounded-lg border border-gray-400"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Joobrix Inc."
                  required
                />
              </label>
              <label className="flex flex-col gap-3">
                <p className="font-medium">Company Domain *</p>
                <input
                  className="bg-[#eceef4] p-2 rounded-lg border border-gray-400"
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
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
                  className="bg-[#eceef4] p-2 rounded-lg border border-gray-400"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="sikar, rajasthan"
                  required
                />
              </label>
            </div>
          </div>

          <hr className="border-[1px]" />

          <div className="flex flex-col gap-6">
            <div className="flex justify-start items-center gap-3">
              <img
                className="border-2 border-blue-600 p-5 rounded-full"
                src="#"
                alt=""
              />
              <div>
                <h1 className="font-semibold text-2xl">Admin Account</h1>
                <p className="text-gray-500 text-sm">
                  Create your admministrator login
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 pl-14">
              <label className="flex flex-col gap-3">
                Full Name *
                <input
                  className="bg-[#eceef4] p-2 rounded-lg border border-gray-400"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </label>
              <label className="flex flex-col gap-3">
                Work Email *
                <input
                  className="bg-[#eceef4] p-2 rounded-lg border border-gray-400"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jhon@jobrix.com"
                  required
                />
              </label>
              <label className="flex flex-col gap-3">
                Phone No. *
                <input
                  className="bg-[#eceef4] p-2 rounded-lg border border-gray-400"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 xxxxxxxxx"
                  required
                />
              </label>
              <label className="flex flex-col gap-3">
                Password *
                <input
                  className="bg-[#eceef4] p-2 rounded-lg border border-gray-400"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                />
              </label>
            </div>
          </div>

          <button type="submit">Create Company & Continue</button>
        </form>
        <p className="text-center">
          By signing up, you agree to our{" "}
          <Link to="" className="text-blue-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="" className="text-blue-600">
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  );
}

export default CompanyRegister;
