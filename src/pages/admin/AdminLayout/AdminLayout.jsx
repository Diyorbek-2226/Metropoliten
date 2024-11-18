import { Outlet } from "react-router-dom";
import { useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import Sidebar from '../../../components/admincomponent/sidebar/Sidebar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Burger Menu Icon - Shows when sidebar is closed */}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          left: isSidebarOpen ? "250px" : "16px",
          zIndex: 100,
        }}
      >
        <IconButton onClick={toggleSidebar} color="inherit">
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />} {/* Toggle between MenuIcon and CloseIcon */}
        </IconButton>
      </Box>

      {/* Sidebar */}
      <Box
        sx={{
          width: "250px",
          maxWidth: isSidebarOpen ? "250px" : "0",
          transition: "all 0.3s ease",
          overflow: "hidden",
          backgroundColor: "gray.800",
          color: "white",
          height: "100vh", // Ensures full height of viewport
          position: "absolute",
          zIndex: 20, // Higher z-index to overlay content
          left: isSidebarOpen ? "0" : "-250px",
          display: { xs: "none", sm: "block" }, // Hide sidebar on small screens
        }}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          marginLeft: isSidebarOpen ? "250px" : "0", // Adjust main content margin based on sidebar
          transition: "margin-left 0.3s ease", // Smooth transition for content when sidebar opens/closes
          p: { xs: 1, sm: 2 }, // Padding adjusted for small screens
        }}
      >
        <Box
          sx={{
            overflowY: "auto",
            flex: 1,
          }}
        >
          <Outlet /> {/* Content like AddTeacher renders here */}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
