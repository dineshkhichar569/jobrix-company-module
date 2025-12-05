import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <main className="flex min-h-screen w-full items-center justify-between bg-[#f5f7ff]">
      {/* Image Card */}
      <div className="w-1/2 h-screen flex items-center justify-center bg-red-300">
        IMG Placeholder
      </div>

      {/* Login Card */}
      <div className="w-1/2 h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold mb-10 tracking-wide text-black">
          Login as a Company
        </h1>

        <form className="w-full max-w-md flex flex-col gap-4" action="submit">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-gray-700 font-medium flex">Email ID</label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none"
              type="email"
              required
            />
          </div>

          <button
            type="button"
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

          <p className="text-black mt-2 font-medium text-base text-center">
            Don’t have an account ?
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
}

export default Login;
