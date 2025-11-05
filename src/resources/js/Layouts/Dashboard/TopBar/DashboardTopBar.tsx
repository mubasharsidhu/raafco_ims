import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggle from "../ThemeToggle";

interface Props {
  title?: string;
  onMenuClick: () => void;
}

export default function DashboardTopBar({
  title,
  onMenuClick,
}: Readonly<Props>) {
  const { auth } = usePage().props as any;
  const user = auth.user;

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) =>
    setMenuAnchor(e.currentTarget);
  const handleCloseMenu = () => setMenuAnchor(null);

  const handleLogout = () => {
    router.post(route("logout"));
    handleCloseMenu();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton onClick={onMenuClick} color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title ?? "Dashboard"}
        </Typography>

        <IconButton onClick={handleOpenMenu} color="inherit">
          <Avatar>{user.name.charAt(0)}</Avatar>
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => router.visit(route("profile.edit"))}>
            Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
}

{
  /* <AppBar position="fixed">
  <Toolbar>
    <IconButton onClick={toggleSidebar} color="inherit" sx={{ mr: 2 }}>
      <MenuIcon />
    </IconButton>

    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      {title ?? "Dashboard"}
    </Typography>

    <IconButton onClick={handleOpenMenu} color="inherit">
      <Avatar>{user.name.charAt(0)}</Avatar>
    </IconButton>

    <Menu
      anchorEl={menuAnchor}
      open={Boolean(menuAnchor)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={() => router.visit(route("profile.edit"))}>
        Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  </Toolbar>
</AppBar>; */
}
