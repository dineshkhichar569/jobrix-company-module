import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import Dashboard from "./dashboard_pages/Dashboard";
import CreateJob from "./dashboard_pages/CreateJob";
import Interviews from "./dashboard_pages/Interviews";
import Candidates from "./dashboard_pages/Candidates";
import Teams from "./dashboard_pages/Teams";
import Settings from "./dashboard_pages/Settings";
import Pipeline from "./dashboard_pages/Pipeline";


function AdminDashboard() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs" element={<CreateJob />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="pipeline" element={<Pipeline />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="teams" element={<Teams />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AdminDashboard;
