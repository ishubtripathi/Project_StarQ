import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Fixed Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-h-screen md:pl-64">
        <MobileHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="min-h-screen overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}