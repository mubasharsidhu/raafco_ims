import React from "react";
import { Box, Container } from "@mui/material";

interface Props {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | false;
}

export default function AppLayout({
  children,
  maxWidth = "sm",
}: Readonly<Props>) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) => theme.palette.background.default,
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
}
