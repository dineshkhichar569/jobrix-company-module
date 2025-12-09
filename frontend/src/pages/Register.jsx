import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../styles/App.css";
import { Link } from "react-router-dom";

function Register() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [gender, setGender] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile_no: "",
    gender: "",
  });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // To Check Password
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await api.post("/api/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        mobile_no: form.mobile_no,
        gender: form.gender,
      });

      localStorage.setItem("token", res.data.token);
      setSuccess("Registered successfully");
    } catch (error) {
      setError(error.message);
    }

    setError("");
    alert("Your account Registered!");
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-between bg-[#f5f7ff]">
      {/* Image Card */}
      <div className="w-1/2 h-screen flex items-center justify-center bg-red-300">
        IMG Placeholder
      </div>

      {/* Login Card */}
      <div className="w-1/2 h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold mb-10 tracking-wide text-black">
          Register as a Company
        </h1>

        <form
          className="w-full max-w-md flex flex-col gap-4"
          action="submit"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 w-full">
            <label className="text-gray-700 font-medium flex">Full Name</label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none"
              type="text"
              placeholder="Enter Your Full Name"
              name="username"
              value={form.username}
              onChange={onChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-gray-700 font-medium flex">Mobile No.</label>
            <PhoneInput
              value={form.mobile_no}
              onchange={onChange}
              country={"in"}
              enableSearch={true}
              containerClass="phone-input w-full"
              inputStyle={{
                width: "100%",
                height: "48px",
                borderRadius: "14px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
              buttonStyle={{
                border: "none",
                background: "transparent",
                borderRadius: "14px 0 0 14px",
              }}
              dropdownStyle={{
                borderRadius: "10px",
              }}
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-gray-700 font-medium flex">
              Organization Email
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-gray-700 font-medium flex" aria-required>
              Gender
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 py-1 rounded-full border shadow-sm 
          ${gender === "Male" ? "bg-blue-500 text-white" : "bg-white"}`}
                onClick={() => setGender("Male")}
              >
                Male
              </button>
              <button
                type="button"
                className={`flex-1 py-1 rounded-full border shadow-sm 
          ${gender === "Female" ? "bg-blue-500 text-white" : "bg-white"}`}
                onClick={() => setGender("Female")}
              >
                Female
              </button>
              <button
                type="button"
                className={`flex-1 py-1 rounded-full border shadow-sm 
          ${gender === "Other" ? "bg-blue-500 text-white" : "bg-white"}`}
                onClick={() => setGender("Other")}
              >
                Other
              </button>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col gap-1 w-full mt-2">
              <label className="text-gray-700 font-medium">Password</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none"
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>

            <div className="flex flex-col gap-1 w-full mt-2">
              <label className="text-gray-700 font-medium">
                Confirm Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="flex gap-2">
            <input
              className="w-5 h-5 border border-gray-300 cursor-pointer"
              type="checkbox"
              required
            />
            <p className="text-xs font-medium">
              All your information is collected, stored and processed as per our
              data processing guidlines, by signing on hirenext, you agree to
              our{" "}
              <Link to="#" className="text-blue-600">
                privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-blue-600">
                terms of use
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white font-semibold rounded-full text-xl shadow-md mt-4"
          >
            Login
          </button>

          <p className="text-black mt-2 font-medium text-base text-center">
            Already have an account ?
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login
            </Link>
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-red-500 text-sm">{success}</p>}
        </form>
      </div>
    </main>
  );
}

export default Register;
