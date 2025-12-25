import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../styles/App.css";

import { auth } from "../api/firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Login() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    mobile_no: "",
  });

  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////   States for OTP login   ////////////////////////
  const [isOtpMode, setIsOtpMode] = useState(false);
  // const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const recaptchaVerifierRef = useRef(null);
  const confirmationResultRef = useRef(null);

  /////////////////////  OTP ===>  Setup Firebase reCAPTCHA  ///////////////////////
  useEffect(() => {
    if (!recaptchaVerifierRef.current) {
      console.log("DEBUG auth in Login:", auth);

      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container", // ID of the div in index.html
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
          },
        }
      );

      recaptchaVerifierRef.current.render();
    }
  }, []);

  const handleOtpLoginClick = () => {
    setIsOtpMode(true);
    setError("");
    setSuccess("");
  };
  const handleSendOtp = async () => {
    setError("");
    setSuccess("");

    try {
      const appVerifier = recaptchaVerifierRef.current;
      if (!appVerifier) {
        setError("reCAPTCHA not ready yet. Try again.");
        return;
      }

      const phoneNumber = `+${form.mobile_no.trim()}`;
      console.log("DEBUG phoneNumber:", phoneNumber);

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      confirmationResultRef.current = confirmationResult;
      setOtpSent(true);
      setSuccess("OTP sent. Use your test code if in dev.");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    if (!confirmationResultRef.current) {
      setError("Send OTP first.");
      return;
    }

    try {
      const cred = await confirmationResultRef.current.confirm(otp.trim());
      console.log("Phone login: ", cred.user);

      setSuccess("Logged in with phone number");
      alert("You are logged in with phone!");
      navigate("/settings");
    } catch (err) {
      console.error(err);
      setError("Invalid OTP or verification failed");
    }
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const { password, confirmPassword, ...safeForm } = form;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("DEBUG: submit payload:", safeForm);

    try {
      const payload = {
        email: form.email,
        password: form.password,
        mobile_no: form.mobile_no,
      };

      const res = await api.post("/api/auth/login", payload);

      const token = res.data.token;
      localStorage.setItem("token", res.data.token);

      if (token) {
        console.log("User is Logged in");
      } else {
        console.log("Not Logged in");
      }

      console.log("AXIOS response: ", res.status, res.data);
      setSuccess("Registered successfully");
      setError("");
      alert("You are Logged in!");
      navigate("/settings");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-between bg-[#f5f7ff]">
      {/* Image Card */}
      <div className="w-1/2 h-screen flex items-center justify-center">
        <div className="relative w-[90%] h-[90%] bg-gray-900 rounded-3xl overflow-hidden flex items-center justify-center">
          <div className="absolute -rotate-12 w-[120%] h-40 bg-gradient-to-r from-blue-600 to-purple-600"></div>

          <div className="relative z-10 text-center px-6">
            <h1 className="text-6xl font-black tracking-tight text-white">
              JOBRIX
            </h1>
            <p className="mt-2 text-sm text-white/85 uppercase tracking-wide">
              FAST TRACK JOB MATCHING
            </p>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-1/2 h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold mb-10 tracking-wide text-black">
          Login as a Company
        </h1>

        <form
          className="w-full max-w-md flex flex-col gap-4"
          // action="submit"
          onSubmit={handleSubmit}
        >
          {!isOtpMode && (
            <>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-gray-700 font-medium flex">
                  Email ID
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

              <button
                type="button"
                onClick={handleOtpLoginClick}
                className="w-fit pl-2 text-blue-600 text-sm font-semibold hover:underline"
              >
                Login with OTP
              </button>

              <div className="flex flex-col gap-1 w-full mt-2">
                <label className="text-gray-700 font-medium">
                  Enter your password
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="flex items-center gap-1 mt-1 text-sm pl-1">
                <span>🔐</span>
                <button
                  type="button"
                  className="text-blue-600 font-semibold hover:underline w-fit"
                >
                  Forgot Password ?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white font-semibold rounded-full text-xl shadow-md mt-4"
              >
                Login
              </button>
            </>
          )}

          {isOtpMode && (
            <>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-gray-700 font-medium flex">
                  Mobile No.
                </label>
                <PhoneInput
                  value={form.mobile_no}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, mobile_no: value }))
                  }
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

              {!otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-2 bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white font-semibold rounded-full text-xl shadow-md mt-4"
                >
                  Send OTP
                </button>
              )}

              {otpSent && (
                <>
                  <div className="flex flex-col gap-1 w-full mt-4">
                    <label className="text-gray-700 font-medium">
                      Enter OTP
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit code"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="w-full py-2 bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white font-semibold rounded-full text-xl shadow-md mt-4"
                  >
                    Verify OTP & Login
                  </button>
                </>
              )}
            </>
          )}

          <p className="text-black mt-2 font-medium text-base text-center">
            Don’t have an account ?
            <Link
              to="/"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Sign up
            </Link>
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
        </form>
      </div>
    </main>
  );
}

export default Login;
