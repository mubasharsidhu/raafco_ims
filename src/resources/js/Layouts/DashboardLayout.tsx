import { useState } from "react";
import { Box } from "@mui/material";
import DashboardTopBar from "./Dashboard/TopBar/DashboardTopBar";
import DashboardSidebar from "./Dashboard/Sidebar/DashboardSidebar";

interface DashboardLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function DashboardLayout({
  title,
  children,
}: Readonly<DashboardLayoutProps>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <DashboardTopBar title={title} onMenuClick={toggleSidebar} />

      <DashboardSidebar open={sidebarOpen} onClose={toggleSidebar} />

      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>{children}</Box>
    </Box>
  );
}
