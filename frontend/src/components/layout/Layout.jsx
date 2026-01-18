import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children, setIsOption }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar setIsOption={setIsOption} />

      {/* Navbar + dashboard pages */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* dashboard pages */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
