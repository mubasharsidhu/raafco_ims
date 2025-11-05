import React, { createContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { getTheme } from "../themes/theme";

interface Props {
  children: React.ReactNode;
}

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export default function ColorModeProvider({ children }: Readonly<Props>) {
  const doesSystemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState<"light" | "dark">(
    () =>
      (localStorage.getItem("theme-mode") as "light" | "dark") ||
      (doesSystemPrefersDark ? "dark" : "light")
  );

  useEffect(() => {
    if (!localStorage.getItem("theme-mode")) {
      setMode(doesSystemPrefersDark ? "dark" : "light");
    }
  }, [doesSystemPrefersDark]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light";
          localStorage.setItem("theme-mode", newMode);
          return newMode;
        }),
    }),
    []
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
