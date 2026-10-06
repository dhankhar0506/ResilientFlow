import { useState, type ReactNode } from "react";
import {
  Box,
  Button,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import { MORE_TOPICS, UI, type Lang } from "../i18n";
import type { Mode, ThemeName } from "../theme";
import { FONT, LAYOUT, RADIUS, SIZE } from "../config/design";
import ThemePicker from "../ThemePicker";

export type Section = "overview" | "networking";

interface TopNavProps {
  section: Section;
  onSectionChange: (s: Section) => void;
  mode: Mode;
  onModeChange: (m: Mode) => void;
  lang: Lang;
  onLangChange: (l: Lang) => void;
  themeName: ThemeName;
  onThemeChange: (name: ThemeName) => void;
}

const roundBtnSx = {
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
  borderRadius: RADIUS.pill,
} as const;

export default function TopNav({
  section,
  onSectionChange,
  mode,
  onModeChange,
  lang,
  onLangChange,
  themeName,
  onThemeChange,
}: TopNavProps) {
  const t = UI[lang];
  const [moreAnchor, setMoreAnchor] = useState<HTMLElement | null>(null);

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={{ xs: 1, md: 2 }}
      sx={{
        height: LAYOUT.headerHeight,
        px: LAYOUT.pagePaddingX,
        bgcolor: (th) => alpha(th.palette.background.paper, 0.92),
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Brand */}
      <Stack direction="row" alignItems="center" gap={1.25} sx={{ minWidth: 0, flex: "0 0 auto" }}>
        <Box
          component="img"
          src="/resilientflow-icon.svg"
          alt="ResilientFlow logo"
          sx={{ width: SIZE.logo, height: SIZE.logo, flexShrink: 0, borderRadius: 1.5 }}
        />
        <Box sx={{ minWidth: 0, display: { xs: "none", sm: "block" } }}>
          <Typography sx={{ fontWeight: 800, fontSize: FONT.lead, lineHeight: 1.2 }}>{t.appName}</Typography>
          <Typography
            sx={{ fontSize: FONT.micro, color: "text.secondary", whiteSpace: "nowrap", display: { xs: "none", lg: "block" } }}
          >
            {t.tagline}
          </Typography>
        </Box>
      </Stack>

      {/* Sections: Dashboard · Networking · More topics */}
      <Tabs
        value={section}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: LAYOUT.headerHeight,
          "& .MuiTabs-flexContainer": { height: LAYOUT.headerHeight },
          "& .MuiTab-root": {
            minHeight: LAYOUT.headerHeight,
            minWidth: SIZE.navTabMinWidth,
            fontWeight: 700,
            fontSize: FONT.small,
            gap: 0.75,
          },
        }}
      >
        <Tab value="overview" onClick={() => onSectionChange("overview")} icon={<DashboardRoundedIcon sx={{ fontSize: SIZE.icon.md }} />} iconPosition="start" label={t.dashboard} />
        <Tab value="networking" onClick={() => onSectionChange("networking")} icon={<PublicRoundedIcon sx={{ fontSize: SIZE.icon.md }} />} iconPosition="start" label={t.navNetworking} />
      </Tabs>

      <Button
        color="inherit"
        onClick={(e) => setMoreAnchor(e.currentTarget)}
        endIcon={<ExpandMoreRoundedIcon />}
        sx={{ display: { xs: "none", md: "inline-flex" }, color: "text.secondary", flexShrink: 0 }}
      >
        {t.navMore}
      </Button>
      <Menu anchorEl={moreAnchor} open={Boolean(moreAnchor)} onClose={() => setMoreAnchor(null)}>
        {MORE_TOPICS.map((item) => (
          <MenuItem key={item.label} disabled sx={{ gap: 1.25, opacity: "0.7 !important" }}>
            <Box component="span" sx={{ width: SIZE.icon.md, textAlign: "center" }}>
              {item.icon}
            </Box>
            <ListItemText primary={item.label} secondary={t.comingSoon} />
          </MenuItem>
        ))}
      </Menu>

      {/* Controls */}
      <Stack direction="row" alignItems="center" gap={1} sx={{ flex: "0 0 auto" }}>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={lang}
          onChange={(_, val: Lang | null) => val && onLangChange(val)}
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: RADIUS.pill,
            p: 0.3,
            "& .MuiToggleButton-root": {
              border: "none",
              borderRadius: RADIUS.pill,
              typography: "button",
              fontWeight: 700,
              px: 1.5,
              py: 0.45,
              color: "text.secondary",
            },
            "& .Mui-selected": { bgcolor: "primary.main", color: "primary.contrastText !important" },
            "& .Mui-selected:hover": { bgcolor: "primary.dark" },
          }}
        >
          <ToggleButton value="en">EN</ToggleButton>
          <ToggleButton value="hi">Hinglish</ToggleButton>
        </ToggleButtonGroup>

        <ThemePicker themeName={themeName} mode={mode} lang={lang} onChange={onThemeChange} />

        <ModeButton mode={mode} onModeChange={onModeChange} label={mode === "dark" ? t.switchToLight : t.switchToDark}>
          {mode === "dark" ? (
            <LightModeRoundedIcon sx={{ fontSize: SIZE.icon.md }} />
          ) : (
            <DarkModeRoundedIcon sx={{ fontSize: SIZE.icon.md }} />
          )}
        </ModeButton>
      </Stack>
    </Stack>
  );
}

function ModeButton({
  mode,
  onModeChange,
  label,
  children,
}: {
  mode: Mode;
  onModeChange: (m: Mode) => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <Tooltip title={label}>
      <IconButton aria-label={label} onClick={() => onModeChange(mode === "dark" ? "light" : "dark")} sx={roundBtnSx}>
        {children}
      </IconButton>
    </Tooltip>
  );
}
