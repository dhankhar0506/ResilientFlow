
import { useMemo, useState } from "react";
import { alpha, useTheme, type Theme } from "@mui/material/styles";
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
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { type Lang } from "../../../i18n";
import {
  HTTP_STEPS,
  HTTP_UI,
  LAYER_RANK,
  NODES,
  type ConnectionReveal,
  type Layer,
} from "../data/HttpRequestResponse";

const LAYER_KEYS = [
  "layerData",
  "layerTls",
  "layerSegment",
  "layerPacket",
  "layerFrame",
] as const;

type LayerKey = (typeof LAYER_KEYS)[number];

export default function HttpRequestResponse({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);
  const lesson = HTTP_UI[lang];
  const step = HTTP_STEPS[stepIndex];
  const last = HTTP_STEPS.length - 1;
  const progress = ((stepIndex + 1) / HTTP_STEPS.length) * 100;

  const go = (index: number) => {
    setStepIndex(Math.min(last, Math.max(0, index)));
  };

  const known = useMemo(
    () =>
      HTTP_STEPS.slice(0, stepIndex + 1).reduce<ConnectionReveal>(
        (acc, item) => ({ ...acc, ...item.reveal }),
        {}
      ),
    [stepIndex]
  );

  const destination = known.destIp
    ? `${known.destIp}${known.destPort ? `:${known.destPort}` : ""}`
    : known.destPort
      ? `:${known.destPort}`
      : undefined;

  const source = known.sourceIp
    ? `${known.sourceIp}${known.sourcePort ? `:${known.sourcePort}` : ""}`
    : known.sourcePort
      ? `:${known.sourcePort}`
      : undefined;

  const facts: [string, string | undefined][] = [
    [lesson.domain, known.domain],
    [lesson.protocol, known.protocol],
    [lesson.source, source],
    [lesson.destination, destination],
    [lesson.status, known.status],
  ];

  const directionLabel =
    step.direction === "request" ? lesson.requestLabel : lesson.responseLabel;

  return (
    <Stack spacing={1.2} sx={{ width: "100%", pb: 0.5 }}>
      {/* Header */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 1.2, md: 1.5 },
          borderRadius: 1,
          color: "text.primary",
          overflow: "hidden",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          gap={1.2}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 34,
                height: 34,
                display: "grid",
                placeItems: "center",
                borderRadius: 1,
                color: "primary.main",
                bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
              }}
            >
              <LanRoundedIcon sx={{ fontSize: 21 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: { xs: 16, md: 18 },
                  fontWeight: 800,
                  lineHeight: 1.25,
                }}
              >
                {lesson.lessonTitle}
              </Typography>
              <Typography
                sx={{ color: "text.secondary", mt: 0.2, fontSize: 11.5 }}
              >
                {lesson.lessonSubtitle}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ minWidth: { sm: 175 }, maxWidth: { sm: 250 } }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.45 }}>
              <Typography
                sx={{ fontSize: 11, color: "text.secondary", fontWeight: 700 }}
              >
                {lesson.stepWord} {stepIndex + 1} / {HTTP_STEPS.length}
              </Typography>
              <Typography
                sx={{ fontSize: 11, fontWeight: 800, color: "text.secondary" }}
              >
                {Math.round(progress)}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 5, borderRadius: 20 }}
            />
          </Box>
        </Stack>
      </Paper>

      {/* Journey + known connection information */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        gap={1.5}
        alignItems="stretch"
      >
        <Paper
          variant="outlined"
          sx={{ flex: "1 1 360px", p: 1, borderRadius: 1 }}
        >
          <Stack direction="row" alignItems="center" gap={0.8} sx={{ mb: 0.7 }}>
            <TravelExploreRoundedIcon
              sx={{ color: "primary.main", fontSize: 17 }}
            />
            <Typography sx={{ fontWeight: 800, fontSize: 12 }}>
              {lesson.requestJourney}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="stretch"
            gap={0.8}
          >
            {NODES.map((node, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    px: 0.9,
                    py: 0.55,
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor:
                      step.node === i ? "primary.main" : "divider",
                    bgcolor:
                      step.node === i
                        ? (t) => alpha(t.palette.primary.main, 0.07)
                        : "background.default",
                    minWidth: 0,
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 11, fontWeight: 800, whiteSpace: "nowrap" }}
                  >
                    {node.icon} {node[lang].title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 9.5,
                      color: "text.secondary",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {node[lang].sub}
                  </Typography>
                </Box>
                {i < NODES.length - 1 && (
                  <ArrowForwardRoundedIcon
                    sx={{
                      fontSize: 17,
                      color: "text.disabled",
                      flexShrink: 0,
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                )}
              </Box>
            ))}
          </Stack>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ flex: "1 1 320px", p: 1, borderRadius: 1 }}
        >
          <Stack direction="row" alignItems="center" gap={0.8} sx={{ mb: 0.7 }}>
            <InfoOutlinedIcon sx={{ color: "primary.main", fontSize: 19 }} />
            <Typography sx={{ fontWeight: 800, fontSize: 12 }}>
              {lesson.known}
            </Typography>
          </Stack>
          <Stack direction="row" gap={0.8} flexWrap="wrap">
            {facts.map(([label, value]) =>
              value ? (
                <Chip
                  key={label}
                  size="small"
                  label={`${label}: ${value}`}
                  sx={{
                    borderRadius: 1,
                    fontWeight: 700,
                    bgcolor: "action.hover",
                    maxWidth: "100%",
                    fontFamily:
                      label === lesson.domain || label === lesson.destination
                        ? "ui-monospace, SFMono-Regular, Menlo, monospace"
                        : "inherit",
                  }}
                />
              ) : null
            )}
          </Stack>
        </Paper>
      </Stack>

      {/* Main lesson canvas */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ p: { xs: 1.2, md: 1.6 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "flex-start" }}
            gap={1.5}
            sx={{ mb: 0.8 }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Stack direction="row" gap={0.7} flexWrap="wrap" sx={{ mb: 1.2 }}>
                <Chip
                  label={`${lesson.stepWord} ${stepIndex + 1}`}
                  size="small"
                  sx={{
                    bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
                    color: "primary.main",
                    fontWeight: 900,
                    letterSpacing: 0.4,
                  }}
                />
                <Chip
                  label={
                    step.direction === "request"
                      ? lesson.legendRequest
                      : lesson.legendResponse
                  }
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 700 }}
                />
              </Stack>

              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 18, md: 22 },
                  fontWeight: 800,
                  lineHeight: 1.25,
                  letterSpacing: -0.25,
                }}
              >
                {step.title[lang]}
              </Typography>
            </Box>

            <Chip
              label={step.phase[lang]}
              size="small"
              variant="outlined"
              sx={{
                alignSelf: { xs: "flex-start", sm: "auto" },
                flexShrink: 0,
                maxWidth: { xs: "100%", sm: "42%" },
                fontWeight: 700,
                borderRadius: 1,
                "& .MuiChip-label": {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
            />
          </Stack>

          <Typography
            sx={{
              fontSize: { xs: 13, md: 14 },
              lineHeight: 1.6,
              color: "text.secondary",
              maxWidth: 1050,
              mb: 1.2,
            }}
          >
            {step.plain[lang]}
          </Typography>

          {/* Why */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 0.8,
              p: 1,
              mb: 1.4,
              borderRadius: 1,
              bgcolor: (t) => alpha(t.palette.info.main, 0.07),
              border: "1px solid",
              borderColor: (t) => alpha(t.palette.info.main, 0.2),
            }}
          >
            <QuestionMarkRoundedIcon
              sx={{ color: "info.main", fontSize: 17, mt: 0.1 }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: 10,
                  color: "info.main",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: 0.7,
                  mb: 0.35,
                }}
              >
                {lesson.why}
              </Typography>
              <Typography sx={{ fontSize: 12, lineHeight: 1.5, fontWeight: 600 }}>
                {step.why[lang]}
              </Typography>
            </Box>
          </Box>

          {/* Process diagram */}
          <Box sx={{ mb: 1.4 }}>
            <Stack direction="row" alignItems="center" gap={0.8} sx={{ mb: 0.7 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: 1,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
                  color: "primary.main",
                }}
              >
                <LayersRoundedIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: 12 }}>
                {lesson.diagramLabel}
              </Typography>
            </Stack>
            <FlowDiagram
              items={step.items.map((item) => item[lang])}
              icons={step.icons}
            />
          </Box>

          {/* Layer progression */}
          <Box
            sx={{
              p: { xs: 0.9, md: 1.1 },
              borderRadius: 1,
              bgcolor: "action.hover",
              mb: 1.3,
            }}
          >
            <LayersProgress
              layer={step.layer}
              mode={step.layerMode}
              lang={lang}
            />
          </Box>

          {/* Remember */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 0.8,
              p: 1,
              borderRadius: 1,
              bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
              border: "1px solid",
              borderColor: (t) => alpha(t.palette.primary.main, 0.18),
            }}
          >
            <LightbulbOutlinedIcon
              sx={{ color: "primary.main", fontSize: 17, mt: 0.1 }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: 10,
                  color: "primary.main",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: 0.7,
                  mb: 0.35,
                }}
              >
                {lesson.keyTakeaway}
              </Typography>
              <Typography sx={{ fontSize: 12.5, lineHeight: 1.5, fontWeight: 700 }}>
                {step.remember[lang]}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Explanation + analogy + terms + packet */}
        <Box
          sx={{
            p: { xs: 1.2, md: 1.6 },
            bgcolor: "action.hover",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0, 1.25fr) minmax(230px, .85fr)",
            },
            gap: 1.5,
          }}
        >
          <Stack gap={1.3}>
            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: "text.secondary",
                  letterSpacing: 0.7,
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                🔎 {lesson.tabDetails}
              </Typography>
              <Typography sx={{ fontSize: 12.5, lineHeight: 1.65 }}>
                {step.detail[lang]}
              </Typography>
            </Box>

            {/* Real-life analogy */}
            <Box
              sx={{
                p: 1,
                borderRadius: 1,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  color: "secondary.main",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: 0.7,
                  mb: 0.45,
                }}
              >
                💭 {lesson.tabAnalogy}
              </Typography>
              <Typography sx={{ fontSize: 11.5, lineHeight: 1.55 }}>
                {step.analogy[lang]}
              </Typography>
            </Box>

            {/* Fields */}
            {step.fields && (
              <Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    color: "text.secondary",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                    mb: 0.7,
                  }}
                >
                  🔬 {lesson.dataLabel}
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "minmax(100px, auto) 1fr",
                    gap: 0.8,
                    alignItems: "start",
                  }}
                >
                  {step.fields.map(([key, value]) => (
                    <Box key={key} sx={{ display: "contents" }}>
                      <Typography sx={{ fontSize: 11.5, fontWeight: 800 }}>
                        {key}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 10.5,
                          color: "text.secondary",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Key words */}
            <Box>
              <Typography
                sx={{
                  fontSize: 10,
                  color: "text.secondary",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: 0.7,
                  mb: 0.7,
                }}
              >
                🧠 {lesson.tabWords}
              </Typography>
              <Stack direction="row" gap={0.7} flexWrap="wrap">
                {step.terms.map(([term, explanation]) => (
                  <Chip
                    key={term}
                    size="small"
                    label={term}
                    title={explanation[lang]}
                    variant="outlined"
                    sx={{ fontWeight: 700 }}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>

          {/* Packet / data inspector */}
          <Paper
            variant="outlined"
            elevation={0}
            sx={{
              p: 1.2,
              borderRadius: 1,
              bgcolor: "background.paper",
              color: "text.primary",
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 0.8,
            }}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={0.8}
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    color: "primary.main",
                    fontWeight: 900,
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                  }}
                >
                  {lesson.dataLabel}
                </Typography>
                <Chip
                  size="small"
                  label={directionLabel}
                  variant="outlined"
                  sx={{ fontSize: 9.5, fontWeight: 700 }}
                />
              </Stack>

              <Box
                component="pre"
                sx={{
                  m: 0,
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 11.5,
                  lineHeight: 1.6,
                  color: "text.primary",
                }}
              >
                {step.packet}
              </Box>
            </Box>

            <Divider />

            <Typography sx={{ fontSize: 10, color: "text.secondary", lineHeight: 1.5 }}>
              {lesson.snapshotNote}
            </Typography>
          </Paper>
        </Box>
      </Paper>

      {/* Navigation */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackRoundedIcon />}
          disabled={stepIndex === 0}
          onClick={() => go(stepIndex - 1)}
          sx={{ px: 1.5 }}
        >
          {lesson.previous}
        </Button>

        <Button
          variant="text"
          color="inherit"
          startIcon={<ReplayRoundedIcon />}
          onClick={() => go(0)}
        >
          {lesson.restart}
        </Button>

        <Button
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
          disabled={stepIndex === last}
          onClick={() => go(stepIndex + 1)}
          sx={{ px: 1.8, boxShadow: "none" }}
        >
          {lesson.next}
        </Button>
      </Stack>
    </Stack>
  );
}

function FlowDiagram({
  items,
  icons,
}: {
  items: string[];
  icons: string[];
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        flexDirection: { xs: "column", sm: "row" },
        gap: 1,
      }}
    >
      {items.map((text, index) => {
        const [heading, ...sub] = text.split("\n");

        return (
          <Box
            key={`${heading}-${index}`}
            sx={{
              display: "flex",
              flex: "1 1 0",
              minWidth: 0,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                flex: 1,
                width: "100%",
                minWidth: 0,
                minHeight: 76,
                p: 1,
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                bgcolor: "background.paper",
                transition: "transform .18s ease, box-shadow .18s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: 3,
                },
              }}
            >
              <Typography aria-hidden sx={{ fontSize: 24, lineHeight: 1.15, mb: 0.4 }}>
                {icons[index]}
              </Typography>
              <Typography
                sx={{ fontSize: 12, fontWeight: 800, lineHeight: 1.35, overflowWrap: "anywhere" }}
              >
                {heading}
              </Typography>
              {sub.length > 0 && (
                <Typography
                  sx={{
                    fontSize: 10.5,
                    color: "text.secondary",
                    lineHeight: 1.5,
                    whiteSpace: "pre-line",
                    mt: 0.35,
                  }}
                >
                  {sub.join("\n")}
                </Typography>
              )}
            </Paper>

            {index < items.length - 1 && (
              <ArrowForwardRoundedIcon
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: 22,
                  flexShrink: 0,
                  display: { xs: "none", sm: "block" },
                }}
              />
            )}
            {index < items.length - 1 && (
              <ArrowForwardRoundedIcon
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: 20,
                  transform: "rotate(90deg)",
                  display: { xs: "block", sm: "none" },
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

const getLayerColor = (theme: Theme, key: LayerKey): string => {
  switch (key) {
    case "layerData":
      return theme.palette.primary.main;
    case "layerTls":
      return theme.palette.secondary.main;
    case "layerSegment":
      return theme.palette.info.main;
    case "layerPacket":
      return theme.palette.warning.main;
    case "layerFrame":
      return theme.palette.success.main;
    default:
      return theme.palette.primary.main;
  }
};

function LayersProgress({
  layer,
  mode,
  lang,
}: {
  layer: Layer;
  mode: "wrap" | "unwrap";
  lang: Lang;
}) {
  const lesson = HTTP_UI[lang];
  const current = LAYER_RANK[layer];
  const theme = useTheme();
  const physical = layer === "physical";

  const statusFor = (rank: number) => {
    if (mode === "wrap") {
      if (rank < current) return "added";
      if (rank === current || (physical && rank === 5)) return "current";
      return "next";
    }

    if (rank > current) return "removed";
    if (rank === current) return "current";
    return "inside";
  };

  const labelFor = (status: string) => {
    if (status === "current") return lesson.layerCurrent;
    if (status === "added") return lesson.layerAdded;
    if (status === "removed") return lesson.layerRemoved;
    if (status === "inside") return lesson.layerInside;
    return lesson.layerNext;
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        gap={1}
        sx={{ mb: 0.7 }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            color: "text.secondary",
          }}
        >
          📦 {lesson.tabLayers}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
          {mode === "wrap" ? lesson.layersHintWrap : lesson.layersHintUnwrap}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(5, minmax(0, 1fr))" },
          gap: 0.8,
        }}
      >
        {LAYER_KEYS.map((key, index) => {
          const rank = index + 1;
          const status = statusFor(rank);
          const active = status === "current";
          const color = getLayerColor(theme, key);

          return (
            <Box
              key={key}
              sx={{
                minWidth: 0,
                px: 0.8,
                py: 0.7,
                borderRadius: 1,
                border: "1px solid",
                borderColor:
                  active || status === "added" || status === "removed"
                    ? alpha(color, active ? 0.8 : 0.35)
                    : "divider",
                bgcolor:
                  active
                    ? alpha(color, 0.12)
                    : status === "added" || status === "removed"
                      ? alpha(color, 0.05)
                      : "background.paper",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {active && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    bgcolor: color,
                  }}
                />
              )}

              <Stack direction="row" alignItems="center" gap={0.7}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor:
                      status === "next"
                        ? "action.disabled"
                        : color,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 10.5,
                    fontWeight: active ? 900 : 700,
                    color: active ? "text.primary" : "text.secondary",
                    lineHeight: 1.35,
                  }}
                >
                  {lesson[key]}
                </Typography>
              </Stack>

              <Typography
                sx={{
                  mt: 0.3,
                  pl: 1.4,
                  fontSize: 9,
                  fontWeight: 800,
                  color: active ? color : "text.disabled",
                }}
              >
                {labelFor(status)}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {physical && (
        <Typography sx={{ fontSize: 10.5, color: "text.secondary", mt: 1 }}>
          {lesson.physicalNote}
        </Typography>
      )}
    </>
  );
}
