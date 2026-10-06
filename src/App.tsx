import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, CssBaseline, Fade, ThemeProvider } from "@mui/material";

import { THEME_NAME, getTheme, isMode, isThemeName, readSetting, writeSetting, type Mode, type ThemeName } from "./theme";
import { LAYOUT, MOTION } from "./config/design";
import { NETWORK_LESSONS, UI, type Lang } from "./i18n";
import { NextLessonContext, type NextLessonInfo } from "./shared/lessonKit";

import TopNav, { type Section } from "./components/TopNav";
import LessonBar from "./components/LessonBar";
import Overview from "./modules/learning/Overview";
import NetworkingHome from "./modules/learning/NetworkingHome";
import { LESSON_COMPONENTS } from "./modules/learning/lessonRegistry";

/** ids that are pages, not lessons */
const OVERVIEW_ID = "overview";
const NETWORKING_HOME_ID = "networking";

const isLang = (v: unknown): v is Lang => v === "en" || v === "hi";
const AVAILABLE_LESSONS = NETWORK_LESSONS.filter((l) => l.available);

export default function App() {
  const [mode, setMode] = useState<Mode>(() => readSetting("mode", isMode, "dark"));
  const [themeName, setThemeName] = useState<ThemeName>(() => readSetting("theme", isThemeName, THEME_NAME));
  const [lang, setLang] = useState<Lang>(() => readSetting("lang", isLang, "en"));
  const [activeId, setActiveId] = useState<string>(OVERVIEW_ID);

  const theme = useMemo(() => getTheme(mode, themeName), [mode, themeName]);

  const handleModeChange = (m: Mode) => {
    setMode(m);
    writeSetting("mode", m);
  };
  const handleThemeChange = (name: ThemeName) => {
    setThemeName(name);
    writeSetting("theme", name);
  };
  const handleLangChange = (l: Lang) => {
    setLang(l);
    writeSetting("lang", l);
  };

  // every new page / lesson starts at the top
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeId]);

  const section: Section = activeId === OVERVIEW_ID ? "overview" : "networking";
  const LessonComponent = LESSON_COMPONENTS[activeId];

  const handleSection = (s: Section) => setActiveId(s === "overview" ? OVERVIEW_ID : NETWORKING_HOME_ID);

  // Dashboard card → open that category (only "networking" exists so far)
  const handleCategory = (id: string) => {
    if (id === NETWORKING_HOME_ID) setActiveId(NETWORKING_HOME_ID);
  };

  // "Next lesson" – used by the Next button on the last step of every lesson
  const nextLesson = useMemo<NextLessonInfo | null>(() => {
    const i = AVAILABLE_LESSONS.findIndex((l) => l.id === activeId);
    const next = i >= 0 ? AVAILABLE_LESSONS[i + 1] : undefined;
    if (!next) return null;
    return { label: next.label, buttonLabel: UI[lang].nextLesson, go: () => setActiveId(next.id) };
  }, [activeId, lang]);

  const renderPage = useCallback(() => {
    if (LessonComponent) return <LessonComponent lang={lang} />;
    if (activeId === NETWORKING_HOME_ID) return <NetworkingHome lang={lang} onSelect={setActiveId} />;
    return <Overview lang={lang} onSelect={handleCategory} />;
  }, [LessonComponent, activeId, lang]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* bgcolor is not set here on purpose: the body gradient from theme.ts should show through */}
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Top bar + lesson strip stay visible while scrolling */}
        <Box sx={{ position: "sticky", top: 0, zIndex: (t) => t.zIndex.appBar }}>
          <TopNav
            section={section}
            onSectionChange={handleSection}
            mode={mode}
            onModeChange={handleModeChange}
            lang={lang}
            onLangChange={handleLangChange}
            themeName={themeName}
            onThemeChange={handleThemeChange}
          />
          {section === "networking" && <LessonBar activeId={activeId} onSelect={setActiveId} />}
        </Box>

        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: LAYOUT.contentMaxWidth,
            mx: "auto",
            px: LAYOUT.pagePaddingX,
            pt: LAYOUT.pagePaddingTop,
            pb: LAYOUT.pagePaddingBottom,
          }}
        >
          <Fade key={activeId} in timeout={MOTION.fade}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
              <NextLessonContext.Provider value={nextLesson}>
                <Suspense
                  fallback={
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
                      <CircularProgress />
                    </Box>
                  }
                >
                  {renderPage()}
                </Suspense>
              </NextLessonContext.Provider>
            </Box>
          </Fade>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
