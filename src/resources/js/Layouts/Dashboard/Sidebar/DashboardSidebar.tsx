import { router } from "@inertiajs/react";
import { Drawer, Box, List, ListItemButton, ListItemText } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ open, onClose }: Readonly<Props>) {
  return (
    <Drawer open={open} onClose={onClose}>
      <Box sx={{ width: 240, mt: 6 }}>
        <List>
          <ListItemButton
            selected={route().current("dashboard")}
            onClick={() => router.visit(route("dashboard"))}
          >
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
