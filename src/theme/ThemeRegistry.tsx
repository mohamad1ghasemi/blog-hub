"use client";

import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import { CssBaseline } from "@mui/material";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: "'bNazanin', sans-serif",
    fontSize: 18,
  },
  palette: {
    background: {
      default: "#FFF",
    },
  },
};

const theme = createTheme(themeOptions);

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
