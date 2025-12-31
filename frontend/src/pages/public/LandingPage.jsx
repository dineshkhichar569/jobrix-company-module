import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#F4F5F8]">
      <nav className="flex h-16 w-full items-center justify-between px-4 border-y-[1px] bg-white/50 backdrop-blur-sm sticky top-0">
        <div className="flex gap-3 items-center font-bold text-2xl">
          <img
            className="border-2 border-blue-600 p-5 rounded-full"
            src="#"
            alt=""
          />
          JOBRIX
        </div>
        <div className="flex gap-6">
          <Button variant="ghost">Sign in</Button>
          <Button variant="primary">Get Started</Button>
        </div>
      </nav>

      {/* /////////////  first ///////////// */}
      <div className="p-10 pt-32 flex flex-col gap-5 justify-center items-center border-2">
        <div className="flex items-center gap-2 border-2 rounded-full text-gray-500 bg-[#fbfbfb] text-sm font-medium justify-center px-3 py-1">
          <p className="w-3 h-3 bg-gradient-to-br from-teal-300 to-teal-800 rounded-full animate-pulse"></p>
          Modern ATS for growing teams
        </div>
        <p className="text-6xl font-bold flex flex-col text-center">
          Hire the best talent with{" "}
          <span className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-400 bg-clip-text text-transparent">
            Jobrix
          </span>
        </p>
        <p className="text-gray-500 text-center font-medium text-lg">
          The internal hiring system built for modern companies. Streamline your
          recruitment process from job posting to offer letter.
        </p>
        <div className="flex items-center gap-6">
          <Button variant="primary">Start Free Trial →</Button>
          <Button variant="ghost">Sign in to your account</Button>
        </div>
      </div>

      <div>
        <div>
          <p className="text-4xl font-bold">Everything you need to hire</p>
          <p className="text-gray-500 text-[18px]">Built for internal recruiting teams who want to move fast</p>
        </div>
        <div>

          <div className="">
            <img src="" alt="" />
            <p></p>
            <p></p>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
