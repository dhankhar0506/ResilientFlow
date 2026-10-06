import { useState } from "react";
import { Box, ButtonBase, Chip, Paper, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import SettingsEthernetRoundedIcon from "@mui/icons-material/SettingsEthernetRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import type { Lang } from "../../../i18n";
import { MAC_EXAMPLE, MAC_LABELS, MAC_STEPS, type MacFlowKind, type MacFlowNode } from "../data/MacAddress";
import {
  Callout,
  LessonHeader,
  LessonPage,
  MONO,
  Panel,
  RADIUS,
  StepNav,
  accentCardSx,
  cardSx,
  insetSx,
  nodeSx,
} from "../../../shared/lessonKit";
import { FONT, SIZE } from "../../../config/design";

const MAC_BYTES = MAC_EXAMPLE.split(":");
const OUI = MAC_BYTES.slice(0, 3).join(":");
const REST = MAC_BYTES.slice(3).join(":");

const toBinary = (hex: string) => parseInt(hex, 16).toString(2).padStart(8, "0");

type Labels = (typeof MAC_LABELS)[Lang];

/* ───────────── Shared pieces ───────────── */

const flowIcon = (kind: MacFlowKind) => {
  switch (kind) {
    case "laptop":
      return <LaptopMacRoundedIcon />;
    case "nic":
      return <SettingsEthernetRoundedIcon />;
    case "network":
      return <LanRoundedIcon />;
    case "router":
      return <RouterRoundedIcon />;
    case "server":
      return <DnsRoundedIcon />;
    case "broadcast":
      return <CampaignRoundedIcon />;
  }
};

/* ───────────── Diagram pieces ───────────── */

function FlowDiagram({ nodes, lang }: { nodes: MacFlowNode[]; lang: Lang }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 1 }} sx={{ alignItems: "center", justifyContent: "center" }}>
      {nodes.map((node, i) => (
        <Stack
          key={i}
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 1 }}
          sx={{ alignItems: "center", flex: 1, width: { xs: "100%", sm: "auto" }, minWidth: 0 }}
        >
          <Box
            sx={{
              ...nodeSx(node.highlight ? "primary.main" : alpha(primary, 0.35), alpha(primary, node.highlight ? 0.14 : 0.07)),
              flex: 1,
              width: "100%",
              minWidth: 0,
              p: 1.25,
            }}
          >
            <Box sx={{ color: "primary.main", display: "flex", justifyContent: "center", mb: 0.4 }}>{flowIcon(node.kind)}</Box>
            <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.35 }}>
              {node.label[lang]}
            </Typography>
            {node.detail && (
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.3, wordBreak: "break-word" }}>
                {node.detail[lang]}
              </Typography>
            )}
          </Box>
          {i < nodes.length - 1 && (
            <ArrowForwardRoundedIcon sx={{ color: "primary.main", flexShrink: 0, transform: { xs: "rotate(90deg)", sm: "none" } }} />
          )}
        </Stack>
      ))}
    </Stack>
  );
}

/** The 6 byte boxes, with optional binary and OUI / interface colouring. */
function ByteRow({ binary, parts }: { binary: boolean; parts: boolean }) {
  return (
    <Stack direction="row" sx={{ alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0.6 }}>
      {MAC_BYTES.map((byte, index) => (
        <Stack key={index} direction="row" sx={{ alignItems: "center", gap: 0.6 }}>
          <Box
            sx={{
              ...nodeSx(parts ? (index < 3 ? "primary.main" : "secondary.main") : "divider", "action.selected"),
              minWidth: 50,
              py: 0.8,
              px: 0.8,
            }}
          >
            <Typography variant="h3" sx={{ fontFamily: MONO, lineHeight: 1.2 }}>
              {byte}
            </Typography>
            {binary && (
              <Typography variant="caption" sx={{ color: "text.secondary", fontFamily: MONO, display: "block" }}>
                {toBinary(byte)}
              </Typography>
            )}
          </Box>
          {index < MAC_BYTES.length - 1 && (
            <Typography variant="h3" sx={{ color: "text.secondary" }}>
              :
            </Typography>
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
});

function SizeTags({ l }: { l: Labels }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "center", flexWrap: "wrap", gap: 0.8, mt: 1.4 }}>
      <Chip label={`6 ${l.bytes}`} size="small" sx={tagSx("primary.main")} />
      <Chip label={`48 ${l.bits}`} size="small" sx={tagSx("secondary.main")} />
    </Stack>
  );
}

function PartsInfo({ l }: { l: Labels }) {
  return (
    <Box sx={{ mt: 1.6, maxWidth: SIZE.centerBlockMaxWidth, mx: "auto" }}>
      <Stack direction="row" sx={{ justifyContent: "center", flexWrap: "wrap", gap: 0.8, mb: 1 }}>
        <Chip label={`${OUI} · ${l.organization}`} size="small" sx={tagSx("primary.main")} />
        <Chip label={`${REST} · ${l.device}`} size="small" sx={tagSx("secondary.main")} />
      </Stack>
      <Stack direction="row" sx={{ height: 8, borderRadius: RADIUS.pill, overflow: "hidden" }}>
        <Box sx={{ flex: 1, bgcolor: "primary.main" }} />
        <Box sx={{ flex: 1, bgcolor: "secondary.main" }} />
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", mt: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          24 {l.bits}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          24 {l.bits}
        </Typography>
      </Stack>
    </Box>
  );
}

/** First byte in binary with the last two bits (U/L and I/G) highlighted. */
function FlagsView({ l }: { l: Labels }) {
  const first = MAC_BYTES[0];
  const bits = toBinary(first).split("");
  return (
    <Box sx={{ maxWidth: SIZE.centerBlockMaxWidth, mx: "auto" }}>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, textAlign: "center" }}>
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
              <Box sx={{ ...nodeSx(isIG ? "primary.main" : isUL ? "secondary.main" : "divider", "action.selected"), py: 0.8, px: 0 }}>
                <Typography variant="h3" sx={{ fontFamily: MONO, lineHeight: 1.2 }}>
                  {bit}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 0.4, minHeight: 18, fontWeight: 800, color: isIG ? "primary.main" : "secondary.main" }}
              >
                {isUL ? l.ulBit : isIG ? l.igBit : ""}
              </Typography>
            </Box>
          );
        })}
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "center", flexWrap: "wrap", gap: 0.8, mt: 1 }}>
        <Chip label={`${l.igBit} = ${bits[7]} → ${l.unicast}`} size="small" sx={tagSx("primary.main")} />
        <Chip label={`${l.ulBit} = ${bits[6]} → ${l.universal}`} size="small" sx={tagSx("secondary.main")} />
      </Stack>
    </Box>
  );
}

function CardVisual({ icon, example }: { icon: string; example: string }) {
  return (
    <Box sx={{ ...nodeSx("primary.main", "action.selected"), maxWidth: SIZE.centerBlockMaxWidth, mx: "auto", py: 2, px: 2 }}>
      <Typography variant="h2" component="div" sx={{ lineHeight: 1.2 }}>
        {icon}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 800, mt: 0.6, wordBreak: "break-word" }}>
        {example}
      </Typography>
    </Box>
  );
}

/* ───────────── Step list (left rail) ───────────── */

function StepList({
  titles,
  index,
  onSelect,
  heading,
}: {
  titles: string[];
  index: number;
  onSelect: (i: number) => void;
  heading: string;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        ...cardSx,
        p: 1,
        position: { lg: "sticky" },
        top: { lg: 12 },
        maxHeight: { lg: "calc(100vh - 110px)" },
        overflowY: { lg: "auto" },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: { xs: "none", lg: "block" },
          px: 1,
          py: 0.5,
          fontWeight: 700,
          color: "text.secondary",
          textTransform: "uppercase",
          letterSpacing: 0.6,
        }}
      >
        {heading}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", lg: "column" },
          gap: 0.4,
          overflowX: { xs: "auto", lg: "visible" },
          pb: { xs: 0.5, lg: 0 },
        }}
      >
        {titles.map((title, i) => {
          const active = i === index;
          const done = i < index;
          return (
            <ButtonBase
              key={i}
              onClick={() => onSelect(i)}
              aria-current={active ? "step" : undefined}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                textAlign: "left",
                px: 0.9,
                py: 0.6,
                flexShrink: 0,
                width: { lg: "100%" },
                borderRadius: RADIUS.inner,
                bgcolor: active ? "action.selected" : "transparent",
                "&:hover": { bgcolor: active ? "action.selected" : "action.hover" },
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  typography: "caption",
                  fontWeight: 800,
                  border: "1.5px solid",
                  borderColor: active || done ? "primary.main" : "divider",
                  bgcolor: active ? "primary.main" : "transparent",
                  color: active ? "primary.contrastText" : done ? "primary.main" : "text.secondary",
                }}
              >
                {done ? <CheckRoundedIcon sx={{ fontSize: FONT.small }} /> : i + 1}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: active ? 800 : 600,
                  color: active ? "text.primary" : "text.secondary",
                  lineHeight: 1.3,
                  whiteSpace: { xs: "nowrap", lg: "normal" },
                }}
              >
                {title}
              </Typography>
            </ButtonBase>
          );
        })}
      </Box>
    </Paper>
  );
}

/* ───────────── Lesson ───────────── */

export default function MacAddress({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);

  const l = MAC_LABELS[lang];
  const step = MAC_STEPS[stepIndex];
  const content = step[lang];
  const total = MAC_STEPS.length;
  const last = total - 1;
  const goTo = (i: number) => setStepIndex(Math.max(0, Math.min(last, i)));

  const diagramTitle = step.visual === "flow" ? l.diagramFlow : step.visual === "card" ? l.diagramOverview : l.diagramMac;

  const renderDiagram = () => {
    switch (step.visual) {
      case "flow":
        return <FlowDiagram nodes={step.flow ?? []} lang={lang} />;
      case "mac":
        return (
          <>
            <ByteRow binary={false} parts={false} />
            <SizeTags l={l} />
          </>
        );
      case "binary":
        return (
          <>
            <ByteRow binary parts={false} />
            <SizeTags l={l} />
          </>
        );
      case "parts":
        return (
          <>
            <ByteRow binary={false} parts />
            <SizeTags l={l} />
            <PartsInfo l={l} />
          </>
        );
      case "flags":
        return <FlagsView l={l} />;
      default:
        return <CardVisual icon={step.icon} example={step.example} />;
    }
  };

  return (
    <LessonPage>
      {/* Header: title on the left, progress on the right */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
        <LessonHeader eyebrow={l.badge} title={l.heroTitle} subtitle={l.heroSubtitle} />
        <Chip
          label={`${l.lessonProgress}: ${stepIndex + 1} / ${total}`}
          size="small"
          sx={{ flexShrink: 0, bgcolor: "action.selected", color: "primary.main", fontWeight: 800 }}
        />
      </Stack>

      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          alignItems: "start",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "250px minmax(0, 1fr)" },
        }}
      >
        {/* Left rail: all steps, always visible */}
        <StepList titles={MAC_STEPS.map((s) => s[lang].title)} index={stepIndex} onSelect={goTo} heading={l.lessonProgress} />

        {/* Right: diagram + lesson text + navigation */}
        <Stack spacing={1.5} sx={{ minWidth: 0 }}>
          <Panel>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {diagramTitle}
            </Typography>
            {renderDiagram()}
          </Panel>

          <Paper variant="outlined" sx={accentCardSx()}>
            <Typography component="h2" variant="h2" sx={{ mb: 1 }}>
              {content.title}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 1.5,
                alignItems: "start",
                gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1.3fr) minmax(0, 1fr)" },
              }}
            >
              {/* Column 1: definition + explanation */}
              <Stack spacing={1.2}>
                <Callout label={l.simpleDefinition}>
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {content.definition}
                  </Box>
                </Callout>

                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    {l.explanation}
                  </Typography>
                  <Stack spacing={0.8}>
                    {content.detail.map((paragraph, i) => (
                      <Typography key={i} variant="body1" sx={{ color: "text.secondary", lineHeight: 1.65 }}>
                        {paragraph}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              </Stack>

              {/* Column 2: example + remember */}
              <Stack spacing={1.2}>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    {l.realLifeExample}
                  </Typography>
                  <Box sx={insetSx}>
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {content.realLife}
                    </Typography>
                  </Box>
                </Box>

                <Callout label={`💡 ${l.rememberThis}`} tone="warning">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {content.keyPoint}
                  </Box>
                </Callout>
              </Stack>
            </Box>
          </Paper>

          <StepNav
            index={stepIndex}
            last={last}
            onPrev={() => goTo(stepIndex - 1)}
            onNext={() => goTo(stepIndex + 1)}
            onRestart={() => goTo(0)}
            labels={l}
          />
        </Stack>
      </Box>
    </LessonPage>
  );
}
