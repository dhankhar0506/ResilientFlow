
import { useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import SettingsEthernetRoundedIcon from "@mui/icons-material/SettingsEthernetRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import type { Lang } from "../../../i18n";
import {
  MAC_EXAMPLE,
  MAC_LABELS,
  MAC_STEPS,
  type MacFlowKind,
  type MacFlowNode,
} from "../data/MacAddress";

const MONO = "ui-monospace, Menlo, Consolas, monospace";
const MAC_BYTES = MAC_EXAMPLE.split(":");
const OUI = MAC_BYTES.slice(0, 3).join(":");
const REST = MAC_BYTES.slice(3).join(":");
const CARD_RADIUS = "28px";
const INNER_RADIUS = "20px";

const toBinary = (hex: string) => parseInt(hex, 16).toString(2).padStart(8, "0");

type Labels = (typeof MAC_LABELS)[Lang];

/* ───────────── Shared pieces ───────────── */

const flowIcon = (kind: MacFlowKind) => {
  switch (kind) {
    case "laptop": return <LaptopMacRoundedIcon />;
    case "nic": return <SettingsEthernetRoundedIcon />;
    case "network": return <LanRoundedIcon />;
    case "router": return <RouterRoundedIcon />;
    case "server": return <DnsRoundedIcon />;
    case "broadcast": return <CampaignRoundedIcon />;
  }
};

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1.5 }}>
      {children}
    </Typography>
  );
}

/** Tinted box with a colored left edge: used for "Simple Definition". */
function Callout({ label, children }: { label: string; children: ReactNode }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 1.75,
        borderRadius: INNER_RADIUS,
        bgcolor: alpha(theme.palette.primary.main, 0.08),
        borderLeft: "4px solid",
        borderLeftColor: "primary.main",
      }}
    >
      <Typography variant="caption" sx={{ display: "block", fontWeight: 700, color: "primary.main", mb: 0.4 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.65 }}>
        {children}
      </Typography>
    </Box>
  );
}

/* ───────────── Diagram card (top) ───────────── */

function FlowDiagram({ nodes, lang }: { nodes: MacFlowNode[]; lang: Lang }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
     
     
      spacing={{ xs: 1, sm: 1.5 }} sx={{ alignItems: "center", justifyContent: "center" }}>
      {nodes.map((node, i) => (
        <Stack
          key={i}
          direction={{ xs: "column", sm: "row" }}
         
          spacing={{ xs: 1, sm: 1.5 }}
          sx={{ alignItems: "center", flex: 1, width: { xs: "100%", sm: "auto" }, minWidth: 0 }}
        >
          <Paper
            variant="outlined"
            sx={{
              flex: 1,
              width: "100%",
              minWidth: 0,
              px: 2,
              py: node.highlight ? 2.4 : 2,
              borderRadius: CARD_RADIUS,
              textAlign: "center",
              borderColor: node.highlight ? "primary.main" : alpha(primary, 0.35),
              bgcolor: alpha(primary, node.highlight ? 0.14 : 0.07),
            }}
          >
            <Box sx={{ color: "primary.main", display: "flex", justifyContent: "center", mb: 0.5 }}>
              {flowIcon(node.kind)}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.35 }}>
              {node.label[lang]}
            </Typography>
            {node.detail && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 0.4, wordBreak: "break-word" }}
              >
                {node.detail[lang]}
              </Typography>
            )}
          </Paper>
          {i < nodes.length - 1 && (
            <ArrowForwardRoundedIcon
              sx={{ color: "primary.main", flexShrink: 0, transform: { xs: "rotate(90deg)", sm: "none" } }}
            />
          )}
        </Stack>
      ))}
    </Stack>
  );
}

/** The 6 byte boxes, with optional binary and OUI / interface coloring. */
function ByteRow({ binary, parts }: { binary: boolean; parts: boolean }) {
  return (
    <Stack direction="row" sx={{ alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0.6 }}>
      {MAC_BYTES.map((byte, index) => (
        <Stack key={index} direction="row" sx={{ alignItems: "center", gap: 0.6 }}>
          <Box
            sx={{
              minWidth: 52,
              textAlign: "center",
              py: 1,
              px: 0.8,
              borderRadius: "14px",
              border: "1.5px solid",
              borderColor: parts ? (index < 3 ? "primary.main" : "secondary.main") : "divider",
              bgcolor: "action.selected",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 850, fontFamily: MONO, lineHeight: 1.2 }}>
              {byte}
            </Typography>
            {binary && (
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontFamily: MONO, mt: 0.3, display: "block" }}
              >
                {toBinary(byte)}
              </Typography>
            )}
          </Box>
          {index < MAC_BYTES.length - 1 && (
            <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 700 }}>:</Typography>
          )}
        </Stack>
      ))}
    </Stack>
  );
}

const tagSx = (color: "primary.main" | "secondary.main") => ({
  bgcolor: "action.selected",
  color,
  fontWeight: 800,
  fontSize: "0.75rem",
});

function SizeTags({ l }: { l: Labels }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "center", flexWrap: "wrap", gap: 0.8, mt: 1.6 }}>
      <Chip label={`6 ${l.bytes}`} size="small" sx={tagSx("primary.main")} />
      <Chip label={`48 ${l.bits}`} size="small" sx={tagSx("secondary.main")} />
    </Stack>
  );
}

function PartsInfo({ l }: { l: Labels }) {
  return (
    <Box sx={{ mt: 1.8, maxWidth: 520, mx: "auto" }}>
      <Stack direction="row" sx={{ justifyContent: "center", flexWrap: "wrap", gap: 0.8, mb: 1 }}>
        <Chip label={`${OUI} · ${l.organization}`} size="small" sx={tagSx("primary.main")} />
        <Chip label={`${REST} · ${l.device}`} size="small" sx={tagSx("secondary.main")} />
      </Stack>
      <Stack direction="row" sx={{ height: 8, borderRadius: 99, overflow: "hidden" }}>
        <Box sx={{ flex: 1, bgcolor: "primary.main" }} />
        <Box sx={{ flex: 1, bgcolor: "secondary.main" }} />
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", mt: 0.6 }}>
        <Typography variant="caption" color="text.secondary">24 {l.bits}</Typography>
        <Typography variant="caption" color="text.secondary">24 {l.bits}</Typography>
      </Stack>
    </Box>
  );
}

/** First byte in binary with the last two bits (U/L and I/G) highlighted. */
function FlagsView({ l }: { l: Labels }) {
  const first = MAC_BYTES[0];
  const bits = toBinary(first).split("");
  return (
    <Box sx={{ maxWidth: 520, mx: "auto" }}>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.2, textAlign: "center" }}>
        {l.firstByte}:{" "}
        <Box component="span" sx={{ fontFamily: MONO, fontWeight: 800, color: "text.primary" }}>
          {first}
        </Box>
      </Typography>
      <Stack direction="row" sx={{ gap: 0.6 }}>
        {bits.map((bit, i) => {
          const isUL = i === 6;
          const isIG = i === 7;
          return (
            <Box key={i} sx={{ flex: 1, minWidth: 0, textAlign: "center" }}>
              <Box
                sx={{
                  py: 1,
                  borderRadius: "14px",
                  border: "1.5px solid",
                  borderColor: isIG ? "primary.main" : isUL ? "secondary.main" : "divider",
                  bgcolor: "action.selected",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 850, fontFamily: MONO, lineHeight: 1.2 }}>
                  {bit}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 0.5,
                  minHeight: 18,
                  fontWeight: 800,
                  color: isIG ? "primary.main" : "secondary.main",
                }}
              >
                {isUL ? l.ulBit : isIG ? l.igBit : ""}
              </Typography>
            </Box>
          );
        })}
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "center", flexWrap: "wrap", gap: 0.8, mt: 1.2 }}>
        <Chip label={`${l.igBit} = ${bits[7]} → ${l.unicast}`} size="small" sx={tagSx("primary.main")} />
        <Chip label={`${l.ulBit} = ${bits[6]} → ${l.universal}`} size="small" sx={tagSx("secondary.main")} />
      </Stack>
    </Box>
  );
}

function CardVisual({ icon, example }: { icon: string; example: string }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        maxWidth: 520,
        mx: "auto",
        py: 2.2,
        px: 2,
        textAlign: "center",
        borderRadius: CARD_RADIUS,
        border: "1px solid",
        borderColor: "primary.main",
        bgcolor: alpha(theme.palette.primary.main, 0.12),
      }}
    >
      <Typography variant="h4" component="div" sx={{ lineHeight: 1.2 }}>{icon}</Typography>
      <Typography variant="body1" sx={{ fontWeight: 800, mt: 0.8, wordBreak: "break-word" }}>
        {example}
      </Typography>
    </Box>
  );
}

/* ───────────── Lesson ───────────── */

export default function MacAddress({ lang }: { lang: Lang }) {
  const theme = useTheme();
  const [stepIndex, setStepIndex] = useState(0);

  const l = MAC_LABELS[lang];
  const step = MAC_STEPS[stepIndex];
  const content = step[lang];
  const total = MAC_STEPS.length;
  const progress = ((stepIndex + 1) / total) * 100;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === total - 1;

  const goTo = (i: number) => setStepIndex(Math.max(0, Math.min(total - 1, i)));

  const diagramTitle =
    step.visual === "flow" ? l.diagramFlow : step.visual === "card" ? l.diagramOverview : l.diagramMac;

  const renderDiagram = () => {
    switch (step.visual) {
      case "flow":
        return <FlowDiagram nodes={step.flow ?? []} lang={lang} />;
      case "mac":
        return (<><ByteRow binary={false} parts={false} /><SizeTags l={l} /></>);
      case "binary":
        return (<><ByteRow binary parts={false} /><SizeTags l={l} /></>);
      case "parts":
        return (<><ByteRow binary={false} parts /><SizeTags l={l} /><PartsInfo l={l} /></>);
      case "flags":
        return <FlagsView l={l} />;
      default:
        return <CardVisual icon={step.icon} example={step.example} />;
    }
  };

  return (
    <Stack spacing={2}>
      {/* Header */}
      <Box>
        <Chip
          label={l.badge}
          size="small"
          color="primary"
          sx={{ fontWeight: 700, mb: 1.25 }}
        />
        <Typography
          component="h1"
          sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", sm: "1.5rem" }, lineHeight: 1.25, mb: 0.5 }}
        >
          {l.heroTitle}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6, maxWidth: 820 }}>
          {l.heroSubtitle}
        </Typography>
      </Box>

      {/* Diagram card */}
      <Paper variant="outlined" sx={{ p: { xs: 1.75, sm: 2 }, borderRadius: CARD_RADIUS, borderColor: "divider" }}>
        <CardTitle>{diagramTitle}</CardTitle>
        {renderDiagram()}
      </Paper>

      {/* Progress */}
      <Box>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.75 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>
            {l.lessonProgress}
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "primary.main" }}>
            {stepIndex + 1} / {total}
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 4,
            borderRadius: 99,
            bgcolor: alpha(theme.palette.primary.main, 0.18),
            "& .MuiLinearProgress-bar": { borderRadius: 99 },
          }}
        />
      </Box>

      {/* Step tabs */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
        {MAC_STEPS.map((s, i) => {
          const active = i === stepIndex;
          return (
            <Button
              key={s.id}
              size="small"
              variant={active ? "contained" : "outlined"}
              aria-current={active ? "step" : undefined}
              onClick={() => goTo(i)}
              sx={{
                textTransform: "none",
                borderRadius: 99,
                fontWeight: 600,
                fontSize: "0.78rem",
                lineHeight: 1.6,
                minHeight: 0,
                px: 1.25,
                py: 0.3,
                boxShadow: "none",
                ...(active ? {} : { borderColor: "divider", color: "text.primary" }),
              }}
            >
              {i + 1}. {s[lang].title}
            </Button>
          );
        })}
      </Box>

      {/* Lesson content */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderRadius: CARD_RADIUS,
          borderColor: "divider",
          borderTop: "3px solid",
          borderTopColor: "primary.main",
        }}
      >
        <Stack spacing={2}>
          <Typography component="h2" variant="h6" sx={{ fontWeight: 800 }}>
            {content.title}
          </Typography>

          <Callout label={l.simpleDefinition}>{content.definition}</Callout>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.75 }}>
              {l.explanation}
            </Typography>
            <Stack spacing={1}>
              {content.detail.map((paragraph, i) => (
                <Typography key={i} variant="body2" sx={{ color: "text.secondary", lineHeight: 1.75 }}>
                  {paragraph}
                </Typography>
              ))}
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.75 }}>
              {l.realLifeExample}
            </Typography>
            <Box
              sx={{
                p: 1.75,
                borderRadius: INNER_RADIUS,
                bgcolor: alpha(theme.palette.primary.main, 0.06),
              }}
            >
              <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                {content.realLife}
              </Typography>
            </Box>
          </Box>

          {/* Remember this */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.25,
              p: 1.75,
              borderRadius: INNER_RADIUS,
              bgcolor: alpha(theme.palette.primary.main, 0.12),
            }}
          >
            <LightbulbOutlinedIcon sx={{ color: "primary.main", mt: 0.2 }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 800, color: "primary.main", mb: 0.3 }}>
                {l.rememberThis}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.65 }}>
                {content.keyPoint}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>

      {/* Navigation */}
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackRoundedIcon />}
          disabled={isFirst}
          onClick={() => goTo(stepIndex - 1)}
          sx={{ textTransform: "none", borderRadius: 99, fontWeight: 700 }}
        >
          {l.previous}
        </Button>

        {isLast ? (
          <Button
            variant="contained"
            startIcon={<ReplayRoundedIcon />}
            onClick={() => goTo(0)}
            sx={{ textTransform: "none", borderRadius: 99, fontWeight: 700, boxShadow: "none" }}
          >
            {l.restart}
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={() => goTo(stepIndex + 1)}
            sx={{ textTransform: "none", borderRadius: 99, fontWeight: 700, boxShadow: "none" }}
          >
            {l.next}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}