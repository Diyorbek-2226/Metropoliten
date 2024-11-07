// AdminLayout.js
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with Responsive Toggle */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white"
      >
        ☰ Menu
      </button>

      {/* Main Content Area */}
      <div className="flex-1 ml-0 md:ml-64 p-6 pt-20 md:pt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 transition-all">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
