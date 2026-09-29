import { useMemo, useState, type ReactElement } from "react";
import { Box, Button, Chip, LinearProgress, Paper, Stack, Typography } from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

import { UI, type Lang } from "../../../i18n";
import {
  ConnectionReveal,
  HTTP_STEPS,
  HTTP_UI,
  LAYER_RANK,
  NODES,
  type Layer,
} from "../data/HttpRequestResponse";

const caption = {
  typography: "caption",
  fontWeight: 800,
  color: "text.secondary",
  textTransform: "uppercase",
  letterSpacing: 0.5,
} as const;

export default function HttpRequestResponse({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);

  const t = UI[lang];
  const lesson = HTTP_UI[lang];
  const step = HTTP_STEPS[stepIndex];
  const last = HTTP_STEPS.length - 1;
  const progress = ((stepIndex + 1) / HTTP_STEPS.length) * 100;

  const go = (i: number) => {
    setStepIndex(Math.min(last, Math.max(0, i)));
  };

  const known = useMemo(
    () => HTTP_STEPS.slice(0, stepIndex + 1).reduce<ConnectionReveal>((a, s) => ({ ...a, ...s.reveal }), {}),
    [stepIndex]
  );

  // Only show facts we already know: no empty "not known yet" boxes
  const chips: [string, string | undefined][] = [
    [lesson.domain, known.domain],
    [lesson.protocol, known.protocol],
    [lesson.destination, known.destIp ? `${known.destIp}${known.destPort ? ":" + known.destPort : ""}` : known.destPort ? `:${known.destPort}` : undefined],
  ];

  return (
    <Stack spacing={1.5}>
      {/* Header + progress in one compact block */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 0.6 }}>
          <Typography sx={{ typography: "body1", fontWeight: 800, color: "primary.main" }}>
            {lesson.lessonTitle}
          </Typography>
          <Typography sx={{ typography: "body2", fontWeight: 700, color: "text.secondary" }}>
            {t.stepLabel} {stepIndex + 1} {t.of} {HTTP_STEPS.length}
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 6, borderRadius: 99, bgcolor: "action.hover", "& .MuiLinearProgress-bar": { borderRadius: 99 } }}
        />
      </Box>

      {/* Where are we + what do we know */}
      <Stack direction="row" alignItems="center" gap={0.6} flexWrap="wrap">
        {NODES.map((n, i) => (
          <Box key={i} sx={{ display: "contents" }}>
            <Chip
              size="small"
              label={`${n.icon} ${n[lang].title}`}
              variant={step.node === i ? "filled" : "outlined"}
              color={step.node === i ? "primary" : "default"}
              sx={{ fontWeight: 800 }}
            />
            {i < NODES.length - 1 && <ArrowForwardRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />}
          </Box>
        ))}
        <Box sx={{ flex: 1 }} />
        {chips.map(([k, v]) =>
          v ? (
            <Chip
              key={k}
              size="small"
              variant="outlined"
              label={`${k}: ${v}`}
              sx={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11 }}
            />
          ) : null
        )}
      </Stack>

      {/* Main card: everything important visible without scrolling */}
      <Paper
        variant="outlined"
        sx={{ p: { xs: 1.2, sm: 1.6 }, borderRadius: 1.5, borderTop: "4px solid", borderTopColor: "primary.main" }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} sx={{ mb: 0.6 }}>
          <Typography component="h2" sx={{ typography: "h5", fontWeight: 850 }}>
            {step.title[lang]}
          </Typography>
          <Chip size="small" label={step.phase} sx={{ bgcolor: "action.selected", color: "primary.main", fontWeight: 800 }} />
        </Stack>

        <Typography sx={{ typography: "body1", lineHeight: 1.6, fontWeight: 600, mb: 1.4 }}>
          {step.plain[lang]}
        </Typography>

        {/* Wrapping: always visible, right under the summary */}
        <Box sx={{ mb: 1.4 }}>
          <Layers layer={step.layer} lang={lang} />
        </Box>

        {/* Icon diagram */}
        <Box sx={{ p: 1, mb: 1.2, borderRadius: 1.5, bgcolor: "action.hover" }}>
          <FlowRow items={step.items.map((i) => i[lang])} icons={step.icons} />
        </Box>

        {/* One-line takeaway */}
        <Typography sx={{ typography: "body2", fontWeight: 700, mb: 1 }}>📌 {step.remember[lang]}</Typography>

        {/* Details: always visible on every step */}
        <Box sx={{ pt: 1.2, borderTop: "1px solid", borderColor: "divider" }}>
          <Typography sx={{ ...caption, mb: 0.8 }}>🔍 {lesson.tabDetails}</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" }, gap: 1.5 }}>
            <Typography sx={{ typography: "body2", lineHeight: 1.75 }}>{step.detail[lang]}</Typography>

            <Stack spacing={1.2}>
              {step.fields && (
                <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 1.5, rowGap: 0.4 }}>
                  {step.fields.map(([k, v]) => (
                    <Box key={k} sx={{ display: "contents" }}>
                      <Typography sx={{ typography: "body2", fontWeight: 700 }}>{k}</Typography>
                      <Typography sx={{ typography: "body2", color: "text.secondary" }}>{v}</Typography>
                    </Box>
                  ))}
                </Box>
              )}

              <Box sx={{ p: 1.2, bgcolor: "#0b0d13", borderRadius: 1 }}>
                <Typography sx={{ ...caption, color: "#8b93a7", mb: 0.4 }}>{lesson.dataLabel}</Typography>
                <Typography
                  component="code"
                  sx={{ color: "#5eead4", fontFamily: "ui-monospace, Menlo, monospace", typography: "body2", overflowWrap: "anywhere" }}
                >
                  {step.packet}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* Navigation */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
        <Button variant="outlined" size="small" disabled={stepIndex === 0} onClick={() => go(stepIndex - 1)} sx={{ textTransform: "none", borderRadius: 1.5 }}>
          ← {t.previous}
        </Button>
        <Button variant="text" size="small" color="inherit" startIcon={<ReplayRoundedIcon />} onClick={() => go(0)} sx={{ textTransform: "none" }}>
          {t.restart}
        </Button>
        <Button variant="contained" size="small" endIcon={<ArrowForwardRoundedIcon />} disabled={stepIndex === last} onClick={() => go(stepIndex + 1)} sx={{ textTransform: "none", borderRadius: 1.5, boxShadow: "none" }}>
          {t.next}
        </Button>
      </Stack>
    </Stack>
  );
}

/** Icon cards joined by arrows: right on desktop, down on mobile. */
function FlowRow({ items, icons }: { items: string[]; icons: string[] }) {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "stretch", gap: 0.5 }}>
      {items.map((text, i) => {
        const [first, ...rest] = text.split("\n");
        return (
          <Box key={i} sx={{ display: "contents" }}>
            <Paper
              variant="outlined"
              sx={{
                flex: "1 1 0",
                minWidth: 0,
                p: 0.9,
                borderRadius: 2,
                borderColor: "primary.main",
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                alignItems: "center",
                justifyContent: { xs: "flex-start", sm: "center" },
                gap: { xs: 1.2, sm: 0.3 },
                textAlign: { xs: "left", sm: "center" },
              }}
            >
              <Typography aria-hidden sx={{ fontSize: 28, lineHeight: 1.2 }}>{icons[i]}</Typography>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ typography: "body2", fontWeight: 800, lineHeight: 1.3, overflowWrap: "anywhere" }}>{first}</Typography>
                {rest.length > 0 && (
                  <Typography sx={{ typography: "caption", color: "text.secondary", lineHeight: 1.3, whiteSpace: "pre-line" }}>
                    {rest.join("\n")}
                  </Typography>
                )}
              </Box>
            </Paper>
            {i < items.length - 1 && (
              <Box sx={{ alignSelf: "center", display: "flex", color: "primary.main", flexShrink: 0 }}>
                <ArrowForwardRoundedIcon sx={{ display: { xs: "none", sm: "block" }, fontSize: 18 }} />
                <ArrowDownwardRoundedIcon sx={{ display: { xs: "block", sm: "none" }, fontSize: 18 }} />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

/** Boxes inside boxes. Each layer has its own colour and is never faded. */
const LAYERS = [
  { labelKey: "layerFrame", rank: 5, color: "#f59e0b" },
  { labelKey: "layerPacket", rank: 4, color: "#3b82f6" },
  { labelKey: "layerSegment", rank: 3, color: "#10b981" },
  { labelKey: "layerTls", rank: 2, color: "#ec4899" },
  { labelKey: "layerData", rank: 1, color: "#a855f7" },
] as const;

const STATE_TXT = {
  en: { built: "done", active: "now", pending: "next" },
  hi: { built: "ho gaya", active: "abhi", pending: "aage" },
} as const;

function Layers({ layer, lang }: { layer: Layer; lang: Lang }) {
  const t = HTTP_UI[lang];
  const txt = STATE_TXT[lang === "hi" ? "hi" : "en"];
  const current = LAYER_RANK[layer];

  const nest = (i: number): ReactElement => {
    const l = LAYERS[i];
    const state = l.rank < current ? "built" : l.rank === current ? "active" : "pending";
    const on = state !== "pending";
    return (
      <Box
        sx={{
          p: 0.8,
          borderRadius: 2,
          borderWidth: state === "active" ? 3 : 2,
          borderStyle: on ? "solid" : "dashed",
          borderColor: l.color,
          bgcolor: on ? `${l.color}${state === "active" ? "40" : "22"}` : "transparent",
          boxShadow: state === "active" ? `0 0 0 4px ${l.color}33` : "none",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: i < LAYERS.length - 1 ? 0.7 : 0 }}>
          <Typography sx={{ typography: "body2", fontWeight: on ? 850 : 650, color: "text.primary" }}>
            {t[l.labelKey]}
          </Typography>
          <Typography sx={{ typography: "caption", fontWeight: 800, color: l.color }}>
            {state === "built" ? "✓" : state === "active" ? "●" : "○"} {txt[state]}
          </Typography>
        </Stack>
        {i < LAYERS.length - 1 && nest(i + 1)}
      </Box>
    );
  };

  return (
    <Box>
      <Typography sx={{ ...caption, mb: 0.7 }}>📦 {t.tabLayers} · {t.layersHint}</Typography>
      {nest(0)}
      {layer === "physical" && (
        <Typography sx={{ typography: "caption", color: "text.secondary", mt: 0.8 }}>⚡ {t.physicalNote}</Typography>
      )}
    </Box>
  );
}