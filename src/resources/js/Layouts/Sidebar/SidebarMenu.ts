import { Dashboard, People, Settings } from "@mui/icons-material";
import { ReactNode } from "react";

export interface SidebarItem {
  label: string;
  icon: ReactNode;
  href: string;
  routeName: string;
}

export const sidebarMenu: SidebarItem[] = [
  /* {
    label: "Dashboard",
    icon: <Dashboard />,
    href: route("dashboard"),
    routeName: "dashboard", // Add route name for active check
  },
  {
    label: "Users",
    icon: <People />,
    href: route("users.index"),
    routeName: "users.index",
  },
  {
    label: "Settings",
    icon: <Settings />,
    href: route("settings"),
    routeName: "settings",
  }, */
];
