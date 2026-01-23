import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import Dashboard from "./dashboard pages/Dashboard";
import CreateJob from "./dashboard pages/CreateJob";
import Interviews from "./dashboard pages/Interviews";
import Analytics from "./dashboard pages/Analytics";
import Candidates from "./dashboard pages/Candidates";
import Teams from "./dashboard pages/Teams";
import Settings from "./dashboard pages/Settings";
import AddMember from "../../components/ui/Card/AddMember";

function AdminDashboard() {
  const [isOption, setIsOption] = useState("dashboard");
  return (
    <Layout setIsOption={setIsOption}>
      {isOption == "dashboard" ? <Dashboard /> : ""}
      {isOption == "jobs" ? <CreateJob /> : ""}
      {isOption == "candidates" ? <Candidates /> : ""}
      {isOption == "interviews" ? <Interviews /> : ""}
      {isOption == "analytics" ? <Analytics /> : ""}
      {isOption == "teams" ? <Teams /> : ""}
      {isOption == "settings" ? <AddMember /> : ""}
    </Layout>
  );
}

export default AdminDashboard;
