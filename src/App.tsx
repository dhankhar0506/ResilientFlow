import { useMemo, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { getTheme } from "./theme";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Overview from "./modules/learning/Overview";
import HttpRequestResponse from "./modules/network/components/HttpRequestResponse";
import type { Lang } from "./i18n";

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [lang, setLang] = useState<Lang>("en");
  const [activeId, setActiveId] = useState<string>("overview");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <Sidebar activeId={activeId} onSelect={setActiveId} lang={lang} />
        <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <TopBar mode={mode} onModeChange={setMode} lang={lang} onLangChange={setLang} />
          <Box
            sx={{
              flex: 1,
              px: { xs: 2, sm: 4, md: 5 },
              py: { xs: 3, md: 4 },
              maxWidth: 980,
              width: "100%",
              mx: "auto",
            }}
          >
            {activeId === "http" ? (
              <HttpRequestResponse lang={lang} />
            ) : (
              <Overview lang={lang} onSelect={setActiveId} />
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
