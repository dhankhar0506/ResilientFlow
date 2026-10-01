


import { useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
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
import { UI, type Lang } from "../../../i18n";
import {
  HTTP_STEPS,
  HTTP_UI,
  LAYER_RANK,
  NODES,
  type ConnectionReveal,
  type Layer,
} from "../data/HttpRequestResponse";

const LAYER_COLORS = ["#8B5CF6", "#D946A8", "#0EA5A4", "#3B82F6", "#F59E0B"];

export default function HttpRequestResponse({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);
  const theme = useTheme();
  const accent = theme.palette.primary.main;
  const t = UI[lang];
  const lesson = HTTP_UI[lang];
  const step = HTTP_STEPS[stepIndex];
  const last = HTTP_STEPS.length - 1;
  const progress = ((stepIndex + 1) / HTTP_STEPS.length) * 100;
  const go = (index: number) => setStepIndex(Math.min(last, Math.max(0, index)));

  const known = useMemo(
    () => HTTP_STEPS.slice(0, stepIndex + 1).reduce<ConnectionReveal>((acc, item) => ({ ...acc, ...item.reveal }), {}),
    [stepIndex]
  );

  const facts: [string, string | undefined][] = [
    [lesson.domain, known.domain],
    [lesson.protocol, known.protocol],
    [lesson.destination, known.destIp ? `${known.destIp}${known.destPort ? `:${known.destPort}` : ""}` : known.destPort ? `:${known.destPort}` : undefined],
  ];

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
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} gap={1.2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: 1, color: "primary.main" }}>
              <LanRoundedIcon sx={{ fontSize: 21 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 800, lineHeight: 1.25 }}>{lesson.lessonTitle}</Typography>
              <Typography sx={{ color: "text.secondary", mt: 0.2, fontSize: 11.5 }}>
                {lang === "hi" ? "Browser se server tak data ka safar samjho" : "Follow how data travels from your browser to a server"}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ minWidth: { sm: 175 }, maxWidth: { sm: 230 } }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.45 }}>
              <Typography sx={{ fontSize: 11, color: "text.secondary", fontWeight: 700 }}>{t.stepLabel} {stepIndex + 1} {t.of} {HTTP_STEPS.length}</Typography>
              <Typography sx={{ fontSize: 11, fontWeight: 800, color: "text.secondary" }}>{Math.round(progress)}%</Typography>
            </Stack>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 5, borderRadius: 20 }} />
          </Box>
        </Stack>
      </Paper>

      {/* Journey + revealed connection information */}
      <Stack direction={{ xs: "column", lg: "row" }} gap={1.5} alignItems="stretch">
        <Paper variant="outlined" sx={{ flex: "1 1 360px", p: 1, borderRadius: 1, borderColor: "divider" }}>
          <Stack direction="row" alignItems="center" gap={0.8} sx={{ mb: 0.7 }}>
            <TravelExploreRoundedIcon sx={{ color: accent, fontSize: 17 }} />
            <Typography sx={{ fontWeight: 800, fontSize: 12 }}>{lesson.requestJourney}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.8}>
            {NODES.map((node, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.8, flex: i === 1 ? "1 1 auto" : "0 0 auto", minWidth: 0 }}>
                <Box sx={{ px: 0.9, py: 0.55, borderRadius: 1, border: "1px solid", borderColor: step.node === i ? accent : "divider", bgcolor: step.node === i ? `${accent}12` : "background.default", minWidth: 0 }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 800, whiteSpace: "nowrap" }}>{node.icon} {node[lang].title}</Typography>
                  <Typography sx={{ fontSize: 9.5, color: "text.secondary", whiteSpace: "nowrap" }}>{node[lang].sub}</Typography>
                </Box>
                {i < NODES.length - 1 && <ArrowForwardRoundedIcon sx={{ fontSize: 17, color: "text.disabled", flexShrink: 0 }} />}
              </Box>
            ))}
          </Stack>
        </Paper>
        <Paper variant="outlined" sx={{ flex: "1 1 320px", p: 1, borderRadius: 1, borderColor: "divider" }}>
          <Stack direction="row" alignItems="center" gap={0.8} sx={{ mb: 0.7 }}>
            <InfoOutlinedIcon sx={{ color: accent, fontSize: 19 }} />
            <Typography sx={{ fontWeight: 800, fontSize: 12 }}>{lesson.known}</Typography>
          </Stack>
          <Stack direction="row" gap={0.8} flexWrap="wrap">
            {facts.map(([label, value]) => value && (
              <Chip key={label} size="small" label={`${label}: ${value}`} sx={{ borderRadius: 1, fontWeight: 700, bgcolor: "action.hover", fontFamily: label === lesson.domain || label === lesson.destination ? "ui-monospace, monospace" : "inherit", maxWidth: "100%" }} />
            ))}
          </Stack>
        </Paper>
      </Stack>

      {/* Main lesson canvas */}
      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, overflow: "hidden", bgcolor: "background.paper" }}>
        <Box sx={{ p: { xs: 1.2, md: 1.6 } }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1.5} sx={{ mb: 0.8 }}>
            <Box sx={{ minWidth: 0 }}>
              <Chip label={`${lang === "hi" ? "STEP" : "STEP"} ${stepIndex + 1}`} size="small" sx={{ mb: 1.2, bgcolor: `${accent}15`, color: accent, fontWeight: 900, letterSpacing: 0.4 }} />
              <Typography component="h2" sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 800, lineHeight: 1.25, letterSpacing: -0.25 }}>
                {step.title[lang]}
              </Typography>
            </Box>
            <Chip label={step.phase} size="small" variant="outlined" sx={{ flexShrink: 0, maxWidth: "42%", fontWeight: 700, borderRadius: 1, "& .MuiChip-label": { overflow: "hidden", textOverflow: "ellipsis" } }} />
          </Stack>
          <Typography sx={{ fontSize: { xs: 13, md: 14 }, lineHeight: 1.6, color: "text.secondary", maxWidth: 1050, mb: 1.4 }}>
            {step.plain[lang]}
          </Typography>

          {/* Process diagram */}
          <Box sx={{ mb: 1.4 }}>
            <Stack direction="row" alignItems="center" gap={0.8} sx={{ mb: 0.7 }}>
              <Box sx={{ width: 24, height: 24, borderRadius: 1, display: "grid", placeItems: "center", bgcolor: `${accent}13`, color: accent }}>
                <LayersRoundedIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: 12 }}>{lesson.diagramLabel}</Typography>
            </Stack>
            <FlowDiagram items={step.items.map((item) => item[lang])} icons={step.icons} accent={accent} />
          </Box>

          {/* Layer progression */}
          <Box sx={{ p: { xs: 0.9, md: 1.1 }, borderRadius: 1, bgcolor: "action.hover", mb: 1.3 }}>
            <LayersProgress layer={step.layer} lang={lang} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.8, p: 1, borderRadius: 1, bgcolor: `${accent}0D`, border: "1px solid", borderColor: `${accent}30` }}>
            <Box sx={{ fontSize: 16, lineHeight: 1.3 }}>💡</Box>
            <Box>
              <Typography sx={{ fontSize: 10, color: "primary.main", fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.7, mb: 0.35 }}>{lang === "hi" ? "Yaad rakho" : "Key takeaway"}</Typography>
              <Typography sx={{ fontSize: 12.5, lineHeight: 1.5, fontWeight: 700 }}>{step.remember[lang]}</Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Explanation and packet inspector */}
        <Box sx={{ p: { xs: 1.2, md: 1.6 }, bgcolor: "action.hover", display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.25fr) minmax(230px, .85fr)" }, gap: 1.5 }}>
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 900, color: "text.secondary", letterSpacing: 0.7, textTransform: "uppercase", mb: 1 }}>🔎 {lesson.tabDetails}</Typography>
            <Typography sx={{ fontSize: 12.5, lineHeight: 1.65 }}>{step.detail[lang]}</Typography>
            {step.fields && (
              <Box sx={{ mt: 1.2, display: "grid", gridTemplateColumns: "minmax(100px, auto) 1fr", gap: 0.8, alignItems: "start" }}>
                {step.fields.map(([key, value]) => (
                  <Box key={key} sx={{ display: "contents" }}>
                    <Typography sx={{ fontSize: 11.5, fontWeight: 800 }}>{key}</Typography>
                    <Typography sx={{ fontSize: 10.5, color: "text.secondary", overflowWrap: "anywhere" }}>{value}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Paper variant="outlined" elevation={0} sx={{ p: 1.2, borderRadius: 1, bgcolor: "background.paper", color: "text.primary", alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 0.8, borderColor: "divider" }}>
            <Box>
              <Typography sx={{ fontSize: 10, color: "primary.main", fontWeight: 900, letterSpacing: 0.8, textTransform: "uppercase", mb: 1 }}>{lesson.dataLabel}</Typography>
              <Box component="pre" sx={{ m: 0, whiteSpace: "pre-wrap", overflowWrap: "anywhere", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 11.5, lineHeight: 1.6, color: "text.primary" }}>
                {step.packet}
              </Box>
            </Box>
            <Divider sx={{ borderColor: "divider" }} />
            <Typography sx={{ fontSize: 10, color: "text.secondary", lineHeight: 1.5 }}>
              {lang === "hi" ? "Yeh is step par data ka current snapshot hai." : "A snapshot of the data at this point in the journey."}
            </Typography>
          </Paper>
        </Box>
      </Paper>

      {/* Navigation */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Button variant="outlined" startIcon={<ArrowBackRoundedIcon />} disabled={stepIndex === 0} onClick={() => go(stepIndex - 1)} sx={{ textTransform: "none", borderRadius: 1.5, px: 1.5 }}>
          {t.previous}
        </Button>
        <Button variant="text" color="inherit" startIcon={<ReplayRoundedIcon />} onClick={() => go(0)} sx={{ textTransform: "none", borderRadius: 1 }}>
          {t.restart}
        </Button>
        <Button variant="contained" endIcon={<ArrowForwardRoundedIcon />} disabled={stepIndex === last} onClick={() => go(stepIndex + 1)} sx={{ textTransform: "none", borderRadius: 1.5, px: 1.8, boxShadow: "none", bgcolor: accent, "&:hover": { bgcolor: theme.palette.primary.dark } }}>
          {t.next}
        </Button>
      </Stack>
    </Stack>
  );
}

function FlowDiagram({ items, icons, accent }: { items: string[]; icons: string[]; accent: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "stretch", flexDirection: { xs: "column", sm: "row" }, gap: 1 }}>
      {items.map((text, index) => {
        const [heading, ...sub] = text.split("\n");
        return (
          <Box key={`${heading}-${index}`} sx={{ display: "flex", flex: "1 1 0", minWidth: 0, flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: 1 }}>
            <Paper variant="outlined" sx={{ flex: 1, width: "100%", minWidth: 0, minHeight: 76, p: 1, borderRadius: 1, borderColor: "divider", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", bgcolor: "background.paper", transition: "transform .18s ease, box-shadow .18s ease", "&:hover": { transform: "translateY(-3px)", boxShadow: 3 } }}>
              <Typography aria-hidden sx={{ fontSize: 24, lineHeight: 1.15, mb: 0.4 }}>{icons[index]}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 800, lineHeight: 1.35, overflowWrap: "anywhere" }}>{heading}</Typography>
              {sub.length > 0 && <Typography sx={{ fontSize: 10.5, color: "text.secondary", lineHeight: 1.5, whiteSpace: "pre-line", mt: 0.35 }}>{sub.join("\n")}</Typography>}
            </Paper>
            {index < items.length - 1 && <ArrowForwardRoundedIcon sx={{ color: accent, fontSize: 22, flexShrink: 0, display: { xs: "none", sm: "block" } }} />}
            {index < items.length - 1 && <ArrowForwardRoundedIcon sx={{ color: accent, fontSize: 20, transform: "rotate(90deg)", display: { xs: "block", sm: "none" } }} />}
          </Box>
        );
      })}
    </Box>
  );
}

const LAYERS: { key: keyof typeof HTTP_UI.en; rank: number; color: string }[] = [
  { key: "layerData", rank: 1, color: LAYER_COLORS[0] },
  { key: "layerTls", rank: 2, color: LAYER_COLORS[1] },
  { key: "layerSegment", rank: 3, color: LAYER_COLORS[2] },
  { key: "layerPacket", rank: 4, color: LAYER_COLORS[3] },
  { key: "layerFrame", rank: 5, color: LAYER_COLORS[4] },
];

function LayersProgress({ layer, lang }: { layer: Layer; lang: Lang }) {
  const lesson = HTTP_UI[lang];
  const current = LAYER_RANK[layer];
  const physical = layer === "physical";
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} sx={{ mb: 0.7 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.5, textTransform: "uppercase", color: "text.secondary" }}>📦 {lesson.tabLayers}</Typography>
        <Typography sx={{ fontSize: 11, color: "text.secondary" }}>{lesson.layersHint}</Typography>
      </Stack>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(5, minmax(0, 1fr))" }, gap: 0.8 }}>
        {LAYERS.map((item) => {
          const done = item.rank < current;
          const active = item.rank === current || (physical && item.rank === 5);
          return (
            <Box key={item.key} sx={{ minWidth: 0, px: 0.8, py: 0.7, borderRadius: 1, border: "1px solid", borderColor: active ? item.color : done ? `${item.color}80` : "divider", bgcolor: active ? `${item.color}20` : done ? `${item.color}0C` : "background.paper", position: "relative", overflow: "hidden" }}>
              {active && <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, bgcolor: item.color }} />}
              <Stack direction="row" alignItems="center" gap={0.7}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: active || done ? item.color : "action.disabled", flexShrink: 0 }} />
                <Typography sx={{ fontSize: 10.5, fontWeight: active ? 900 : 700, color: active ? "text.primary" : "text.secondary", lineHeight: 1.35 }}>{lesson[item.key]}</Typography>
              </Stack>
              <Typography sx={{ mt: 0.3, pl: 1.4, fontSize: 9, fontWeight: 800, color: active ? item.color : "text.disabled" }}>
                {active ? (lang === "hi" ? "Abhi" : "Current") : done ? (lang === "hi" ? "Complete" : "Added") : (lang === "hi" ? "Aage" : "Next")}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {physical && <Typography sx={{ fontSize: 10.5, color: "text.secondary", mt: 1 }}>{lesson.physicalNote}</Typography>}
    </>
  );
}
