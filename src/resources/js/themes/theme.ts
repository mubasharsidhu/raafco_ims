import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#9c27b0",
      },
      tertiary: {
        main: "#FF9800",
      },
      ...(mode === "dark"
        ? {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }
        : {
            background: {
              default: "#F8FAFC",
              paper: "#fff",
            },
          }),
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
    },
  });
