import { Outlet } from "react-router-dom";
import { useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from '../../../components/admincomponent/sidebar/Sidebar'

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
          <MenuIcon />
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
          marginLeft: "0",
          transition: "all 0.3s ease",
        }}
      >
        <Box
          sx={{
            overflowY: "auto",
            flex: 1,
            p: 2,
          }}
        >
          <Outlet /> {/* Content like AddTeacher renders here */}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
