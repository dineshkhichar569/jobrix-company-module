import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import { motion } from "motion/react";

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const isLogIn = localStorage.getItem("token");

  const stages = [
    { n: "128", label: "Applied", w: "100%" },
    { n: "41", label: "Screening", w: "62%" },
    { n: "12", label: "Interview", w: "34%" },
    { n: "3", label: "Offer", w: "14%" },
  ];

  const features = [
    { title: "Centralized control", desc: "Every job, candidate, and interview in one place — not ten browser tabs." },
    { title: "Role-based access", desc: "Admins, HR, and recruiters each see exactly what's theirs." },
    { title: "Visible pipeline", desc: "The whole team sees where every candidate stands, in real time." },
  ];

  return (
    <div className="bg-white text-[#0B1220] antialiased">
      {/* nav */}
      <nav className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5 font-bold tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">J</div>
            JOBRIX
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <button className="text-sm font-medium text-gray-500 hover:text-black">Product</button>
            <button className="text-sm font-medium text-gray-500 hover:text-black">Security</button>
            <button className="text-sm font-medium text-gray-500 hover:text-black">Careers</button>
          </div>
          <div className="flex items-center gap-3">
            {isLogIn ? (
              <Button variant="primary" onClick={() => navigate("/admin/dashboard")}>Go to Dashboard</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>Log in</Button>
                <Button variant="primary" onClick={() => navigate("/signup")}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 to-white">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-300/30 blur-[130px]" />
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" /> Internal Hiring Platform
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="mx-auto mt-6 max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl"
          >
            The hiring system built for <span className="text-indigo-600">real companies</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-5 max-w-xl text-lg text-gray-600"
          >
            From job creation to final offer — your whole team hires in one structured, transparent workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex justify-center gap-4"
          >
            {isLogIn ? (
              <Button variant="primary" onClick={() => navigate("/admin/dashboard")}>Go to Dashboard</Button>
            ) : (
              <>
                <Button variant="primary" onClick={() => navigate("/signup")}>Start Free Trial</Button>
                <Button variant="ghost" onClick={() => navigate("/login")}>See how it works</Button>
              </>
            )}
          </motion.div>
        </div>

        {/* dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="relative mx-auto mt-8 max-w-5xl px-6 pb-24"
        >
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl shadow-indigo-500/10">
            {/* browser bar */}
            <div className="flex items-center gap-2 border-b border-black/5 bg-gray-50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-gray-400 border border-black/5">app.jobrix.com/pipeline</div>
            </div>
            {/* dashboard body */}
            <div className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Hiring Pipeline</p>
                  <p className="text-xs text-gray-400">184 candidates in process</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Live
                </div>
              </div>
              {/* funnel columns */}
              <div className="grid grid-cols-4 gap-3">
                {stages.map((s, i) => (
                  <div key={i} className={`rounded-xl border p-3 ${i === 2 ? "border-indigo-200 bg-indigo-50/50" : "border-black/5 bg-gray-50"}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${i === 2 ? "text-indigo-600" : "text-gray-500"}`}>{s.label}</span>
                      <span className="text-xs font-bold text-gray-700">{s.n}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className={`h-full rounded-full ${i === 2 ? "bg-indigo-600" : "bg-gray-400"}`} style={{ width: s.w }} />
                    </div>
                    <div className="mt-3 space-y-1.5">
                      <div className="rounded-md border border-black/5 bg-white p-1.5 text-[10px] text-gray-600">A. Kumar</div>
                      {i < 2 && <div className="rounded-md border border-black/5 bg-white p-1.5 text-[10px] text-gray-600">P. Sharma</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* features */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">Features</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">Everything hiring needs, in one system</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group h-full rounded-2xl border border-black/5 bg-gray-50/50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">{i + 1}</div>
                  <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                  <p className="text-gray-600">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* stats band */}
      <section className="bg-[#0B1220] py-20 text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 text-center md:grid-cols-4">
          {[["70%", "less admin time"], ["3x", "faster hiring"], ["1", "system for all"], ["5000+", "hires scaled"]].map(([v, l], i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-4xl font-extrabold tracking-tight text-indigo-400">{v}</p>
              <p className="mt-1 text-sm text-gray-400">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-28">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Build a hiring system your company can trust</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">Bring structure, clarity, and control to how your company hires.</p>
          <div className="mt-8 flex justify-center">
            {isLogIn ? (
              <Button variant="primary" onClick={() => navigate("/admin/dashboard")}>Go to Dashboard</Button>
            ) : (
              <Button variant="primary" onClick={() => navigate("/signup")}>Start Free Trial</Button>
            )}
          </div>
        </Reveal>
      </section>

      {/* footer */}
      <footer className="border-t border-black/5 bg-gray-50 py-12 text-center text-gray-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6">
          <div className="flex items-center gap-2.5 font-bold text-[#0B1220]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">J</div>
            JOBRIX
          </div>
          <p className="text-sm">The internal hiring system built for real companies.</p>
          <p className="mt-3 text-xs text-gray-400">© {new Date().getFullYear()} Jobrix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}