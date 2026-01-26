import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { companySignup } from "../../api/index.js";
import BackButton from "../../components/ui/Button/BackButton";
import { SelectOption } from "../../components/ui/Card/SelectOption.jsx";
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
const size = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

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
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCompanySignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
        adminGender: gender,
        adminPassword: password,
      };

      const res = await companySignup(data);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      setError(message);

      console.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  ////// so that error disappear after few seconds
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  }, [error]);

  return (
    <>
      <BackButton placeholder="⟵" left="20px" top="20px" />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-[#F6F7FB] flex items-center justify-center px-6 relative"
      >
        <div className=" max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-1 rounded-full w-fit">
              ● Company Setup
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight text-[#0B1220]">
              Create your <br />
              <span className="text-indigo-600">Jobrix workspace</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-md">
              Set up your company hiring system. Everything you need to manage
              candidates, interviews, and offers — in one place.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>✔ Secure</span>
              <span>✔ Internal hiring only</span>
              <span>✔ Enterprise ready</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/*////////////// for background layer */}
            <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl bg-indigo-100" />

            <div className="relative bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleCompanySignup} className="space-y-8">
                <motion.div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0B1220]">
                    Company Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      className="input"
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                    <input
                      className="input"
                      placeholder="Company Domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      required
                    />
                    <SelectOption
                      options={industries}
                      placeholder="Industry"
                      onOptionSelection={setIndustry}
                    />
                    <SelectOption
                      options={size}
                      placeholder="Company Size"
                      onOptionSelection={setCompanySize}
                    />
                    <input
                      className="input md:col-span-2"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </motion.div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0B1220]">
                    Administrator Account
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      className="input"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      className="input"
                      type="email"
                      placeholder="Work Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      className="input"
                      placeholder="Phone Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    {["Male", "Female", "Other"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setGender(option)}
                        className={`flex-1 py-2 rounded-xl border font-medium transition ${
                          gender === option
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-[#F6F7FB] text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-semibold text-white ${
                    loading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {loading
                    ? "Creating Workspace..."
                    : "Create Company & Continue"}
                </motion.button>
              </form>
              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Log In
                </Link>
              </p>

              <p className="text-xs text-center text-gray-400 mt-3">
                By continuing, you agree to Jobrix Terms & Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>

        {/* for error popUp */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ y: 40, x: "-50%" }}
              animate={{ y: 0, x: "-50%" }}
              exit={{ y: 40, x: "-50%" }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              className="fixed bottom-6 left-1/2 bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl text-sm font-medium z-50"
            >
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </>
  );
}

export default CompanyRegister;
