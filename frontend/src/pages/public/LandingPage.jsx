import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F6F7FB] text-[#0B1220]">
      {/* /////////////////////  navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-white/40 border-b">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-xl">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              J
            </div>
            JOBRIX
          </div>

          <div className="flex items-center gap-6">
            <button className="text-sm font-medium text-gray-600 hover:text-black">
              Product
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-black">
              Security
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-black">
              Careers
            </button>
            <Button variant="ghost">Log in</Button>
            <Button variant="primary" onClick={() => navigate("/signup")}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* //////////////////  page 1 */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-600 opacity-100" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
            </span>{" "}
            Internal Hiring Platform
          </span>

          <h1 className="text-5xl font-extrabold leading-tight">
            The hiring system <br />
            built for <span className="text-indigo-600">real companies</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            Jobrix is an internal recruitment operating system that helps
            companies manage hiring with clarity, control, and structure - from
            job creation to final offer.
          </p>

          <div className="flex gap-4">
            <Button variant="primary" onClick={() => navigate("/signup")}>Start Free Trial</Button>
            <Button variant="ghost">Login to your account</Button>
          </div>
        </div>

        <div className="relative">
          {/*/ ////////////////////// for Background shadow card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute -top-6 -left-6 w-full h-full rounded-3xl bg-indigo-100"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative bg-white rounded-3xl shadow-xl p-8"
          >
            <p className="text-sm font-semibold text-gray-400 mb-6">
              LIVE HIRING PIPELINE
            </p>

            <div className="relative pl-6 space-y-10">
              {/* ///////////////// for Animated vertical line */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute left-1 top-0 w-[2px] bg-indigo-100"
              />

              {[
                "Job Created",
                "Candidate Screening",
                "Interview Rounds",
                "Offer & Onboarding",
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.2,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="relative flex gap-4 items-start"
                >
                  {/* /////////////////// for Animated dot */}
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-4 h-4 rounded-full bg-indigo-600 mt-1"
                  />

                  <div>
                    <p className="font-semibold">{step}</p>
                    <p className="text-sm text-gray-500">
                      Automatically tracked inside Jobrix
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ////////////////////  page 2 */}
      <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Hiring breaks when systems don’t scale
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-16">
            Spreadsheets, emails, and scattered tools slow teams down. Jobrix
            replaces chaos with a single structured hiring workflow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Centralized Control",
                desc: "All jobs, candidates, interviews, and decisions in one system.",
              },
              {
                title: "Process Transparency",
                desc: "Everyone knows where a candidate stands - no confusion.",
              },
              {
                title: "Enterprise Ready",
                desc: "Built for scale, compliance, and internal teams.",
              },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl border bg-[#F9FAFC]">
                <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* //////////////////////  page 3 */}
      <section className="py-28 bg-[#F6F7FB]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-14 text-center">
            Why companies choose Jobrix
          </h2>

          <div className="space-y-10">
            {[
              [
                "Designed for internal HR teams",
                "Not a freelance or job-board tool",
              ],
              ["Clear hiring stages", "No hidden candidate movement"],
              ["Role-based access", "Full control for HR & admins"],
              ["Scalable architecture", "Works from 5 hires to 5000"],
            ].map(([a, b], i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm"
              >
                <span className="font-medium">{a}</span>
                <span className="text-gray-500">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ////////////////////  footbar */}
      <section className="py-32 bg-indigo-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Build a hiring system your company can trust
        </h2>

        <p className="text-indigo-100 max-w-xl mx-auto mb-10">
          Start using Jobrix and bring structure, clarity, and control to your
          hiring process.
        </p>

        <Button variant="secondary">Explore Jobrix</Button>
      </section>
    </div>
  );
}
