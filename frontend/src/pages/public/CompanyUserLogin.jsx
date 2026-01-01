import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CompanyUserLogin() {
  const [loading, setLoading] = useState(false);
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#F6F7FB] flex items-center justify-center px-4 sm:px-6"
    >
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 hidden lg:block"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-1 rounded-full w-fit">
            ● Company Login
          </span>

          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight text-[#0B1220]">
            Welcome back to <br />
            <span className="text-indigo-600">Jobrix</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-md">
            Sign in to manage your hiring pipeline, candidates, and interviews —
            all from one secure workspace.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>✔ Secure login</span>
            <span>✔ Company only</span>
            <span>✔ Enterprise ready</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/*//////////////////// for background layer */}
          <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl bg-indigo-100" />

          <div className="relative bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
            <form className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[#0B1220]">
                  Sign in to your account
                </h2>
                <p className="text-sm text-gray-500">
                  Use your company admin credentials
                </p>
              </div>

              <div className="space-y-6">
                <input
                  type="email"
                  placeholder="Work Email"
                  required
                  className="input"
                />

                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="input"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Forgot password?
                </Link>
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
                {loading ? "Signing in..." : "Sign in"}
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                Don’t have a company account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}

export default CompanyUserLogin;
