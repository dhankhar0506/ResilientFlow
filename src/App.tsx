import { Suspense, useMemo, useState } from "react";
import { Box, CircularProgress, CssBaseline, Fade, ThemeProvider } from "@mui/material";
import { THEME_NAME, getTheme, isThemeName, type Mode, type ThemeName } from "./theme";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Overview from "./modules/learning/Overview";
import { LESSON_COMPONENTS } from "./modules/learning/lessonRegistry";
import type { Lang } from "./i18n";


const CONTENT_ZOOM = { xs: 1, sm: 1.08, md: 1.15 };

const THEME_STORAGE_KEY = "resflow-theme";
const MODE_STORAGE_KEY = "resflow-mode";

function readStored<T>(key: string, isValid: (v: unknown) => v is T, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return isValid(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function writeStored(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {

  }
}

const isMode = (v: unknown): v is Mode => v === "light" || v === "dark";

const App = () => {
  const [mode, setMode] = useState<Mode>(() => readStored(MODE_STORAGE_KEY, isMode, "dark"));
  const [themeName, setThemeName] = useState<ThemeName>(() => readStored(THEME_STORAGE_KEY, isThemeName, THEME_NAME));
  const [lang, setLang] = useState<Lang>("en");
  const [activeId, setActiveId] = useState<string>("overview");
  const theme = useMemo(() => getTheme(mode, themeName), [mode, themeName]);

  const handleModeChange = (m: Mode) => {
    setMode(m);
    writeStored(MODE_STORAGE_KEY, m);
  };

  const handleThemeChange = (name: ThemeName) => {
    setThemeName(name);
    writeStored(THEME_STORAGE_KEY, name);
  };

  // Sidebar ka id == registry ka key hona chahiye, warna Overview dikhega
  const LessonComponent = LESSON_COMPONENTS[activeId];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* bgcolor yahan nahi diya: body ka gradient background dikhna chahiye */}
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar activeId={activeId} onSelect={setActiveId} lang={lang} />

        <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <TopBar
            mode={mode}
            onModeChange={handleModeChange}
            lang={lang}
            onLangChange={setLang}
            themeName={themeName}
            onThemeChange={handleThemeChange}
          />

          <Box
            sx={{
              flex: 1,
              px: { xs: 2, sm: 4, md: 6 },
              py: { xs: 3, md: 5 },
              maxWidth: 1240,
              width: "100%",
              mx: "auto",
            }}
          >
          
            <Fade key={activeId} in timeout={400}>
              <Box sx={{ zoom: CONTENT_ZOOM }}>
                {LessonComponent ? (
                  <Suspense
                    fallback={
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
                        <CircularProgress />
                      </Box>
                    }
                  >
                    <LessonComponent lang={lang} />
                  </Suspense>
                ) : (
                  <Overview lang={lang} onSelect={setActiveId} />
                )}
              </Box>
            </Fade>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;