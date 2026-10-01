import type { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { NETWORK_LESSONS, UI, type Lang } from "../i18n";

const MORE_TOPICS = [
  { icon: "💻", label: "Computer Fundamentals" },
  { icon: "⚙️", label: "Operating Systems" },
  { icon: "🧩", label: "Programming & Runtime" },
  { icon: "🕸️", label: "Web & Browser" },
  { icon: "🛠️", label: "Backend & APIs" },
  { icon: "🗄️", label: "Databases" },
  { icon: "☁️", label: "Cloud & DevOps" },
];

export default function Sidebar({
  activeId,
  onSelect,
  lang,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  lang: Lang;
}) {
  const t = UI[lang];

  return (
    <Box
      sx={{
        width: 268,
        flex: "0 0 268px",
        borderRight: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        py: 2.4,
        px: 1.4,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.2} sx={{ px: 1, mb: 2.6 }}>
        {/* <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "9px",
            flex: "0 0 30px",
            background: "linear-gradient(135deg, #7c8cff, #3454d1)",
          }}
        /> */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
          <Box
            component="img"
            src="/resilientflow-icon.svg"
            alt="ResilientFlow logo"
            sx={{ width: 34, height: 34, flexShrink: 0, borderRadius: 1.5 }}
          />

          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 14.5, lineHeight: 1.2 }}>{t.appName}</Typography>
            <Typography sx={{ fontSize: 10, color: "text.secondary", whiteSpace: "nowrap" }}>{t.tagline}</Typography>
          </Box>
        </Box>
      </Stack>

      <SectionLabel>{t.navOverview}</SectionLabel>
      <Row
        icon={<DashboardRoundedIcon sx={{ fontSize: 18 }} />}
        label={t.dashboard}
        active={activeId === "overview"}
        onClick={() => onSelect("overview")}
      />

      <SectionLabel sx={{ mt: 2.2 }}>{t.navNetworking}</SectionLabel>
      {NETWORK_LESSONS.map((item) => (
        <Row
          key={item.id}
          emoji={item.icon}
          label={item.label}
          active={activeId === item.id}
          disabled={!item.available}
          badge={!item.available ? t.comingSoon : undefined}
          onClick={() => item.available && onSelect(item.id)}
        />
      ))}

      <SectionLabel sx={{ mt: 2.2 }}>{t.navMore}</SectionLabel>
      {MORE_TOPICS.map((item) => (
        <Row key={item.label} emoji={item.icon} label={item.label} disabled badge={t.comingSoon} onClick={() => { }} />
      ))}
    </Box>
  );
}

function SectionLabel({ children, sx }: { children: ReactNode; sx?: object }) {
  return (
    <Typography
      sx={{
        fontSize: 10.5,
        fontWeight: 800,
        letterSpacing: 0.9,
        color: "text.secondary",
        px: 1.2,
        mb: 0.8,
        opacity: 0.75,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

function Row({
  icon,
  emoji,
  label,
  active,
  disabled,
  badge,
  onClick,
}: {
  icon?: ReactNode;
  emoji?: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <Box
      onClick={disabled ? undefined : onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.1,
        px: 1.2,
        py: 1,
        mb: 0.35,
        borderRadius: 2,
        cursor: disabled ? "default" : "pointer",
        color: active ? "primary.main" : disabled ? "text.secondary" : "text.primary",
        bgcolor: active ? "action.selected" : "transparent",
        opacity: disabled ? 0.55 : 1,
        transition: "background-color .15s",
        "&:hover": disabled ? {} : { bgcolor: "action.hover" },
      }}
    >
      {icon ?? (
        <Box component="span" sx={{ fontSize: 15, width: 18, textAlign: "center", flex: "0 0 18px" }}>
          {emoji}
        </Box>
      )}
      <Typography sx={{ fontSize: 12.6, fontWeight: active ? 700 : 600, flex: 1, lineHeight: 1.3 }}>{label}</Typography>
      {badge && (
        <Typography
          sx={{
            fontSize: 8.5,
            fontWeight: 700,
            color: "text.secondary",
            bgcolor: "action.hover",
            px: 0.8,
            py: 0.25,
            borderRadius: 999,
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </Typography>
      )}
    </Box>
  );
}
