import { createTheme, type ThemeOptions } from "@mui/material/styles";

const shared: ThemeOptions = {
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCardActionArea: {
      styleOverrides: {
        focusHighlight: { opacity: 0 },
      },
    },
  },
};

export function getTheme(mode: "light" | "dark") {
  if (mode === "light") {
    return createTheme({
      ...shared,
      palette: {
        mode: "light",
        primary: { main: "#3454d1", dark: "#2c46b3", light: "#7c8cff" },
        secondary: { main: "#0f9488" },
        success: { main: "#157347" },
        background: { default: "#f5f6fb", paper: "#ffffff" },
        text: { primary: "#0f172a", secondary: "#64748b" },
        divider: "#e1e5f0",
      },
    });
  }

  return createTheme({
    ...shared,
    palette: {
      mode: "dark",
      primary: { main: "#7c8cff", dark: "#5c6fe0", light: "#a9b4ff" },
      secondary: { main: "#2dd4bf" },
      success: { main: "#34d399" },
      background: { default: "#0a0b0f", paper: "#13151d" },
      text: { primary: "#eef1f6", secondary: "#8b93a7" },
      divider: "#232838",
    },
  });
}
