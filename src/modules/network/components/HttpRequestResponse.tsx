import { useMemo, useState, type ReactElement } from "react";
import { alpha, useTheme, type Theme } from "@mui/material/styles";
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { type Lang } from "../../../i18n";
import { HTTP_STEPS, HTTP_UI, LAYER_RANK, type ConnectionReveal, type Layer } from "../data/HttpRequestResponse";
import { EASY_UI, HTTP_EASY, JOURNEY_NODES } from "../data/HttpRequestResponse";
import {
  Callout,
  LessonBody,
  LessonHeader,
  LessonPage,
  MONO,
  Panel,
  RADIUS,
  StepBar,
  StepCard,
  StepNav,
  insetSx,
  nodeSx,
} from "../../../shared/lessonKit";
import { FONT, SIZE } from "../../../config/design";

const LAYER_BY_RANK = [null, "layerData", "layerTls", "layerSegment", "layerPacket", "layerFrame"] as const;
type LayerKey = Exclude<(typeof LAYER_BY_RANK)[number], null>;

function layerColor(theme: Theme, key: LayerKey): string {
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
  }
}



function JourneyDiagram({ pos, direction, lang }: { pos: number; direction: "request" | "response"; lang: Lang }) {
  const theme = useTheme();
  const ui = HTTP_UI[lang];
  const easyUi = EASY_UI[lang];
  const c = {
    primary: theme.palette.primary.main,
    success: theme.palette.success.main,
    line: theme.palette.divider,
    text: theme.palette.text.primary,
    muted: theme.palette.text.secondary,
    paper: theme.palette.background.paper,
    tint: theme.palette.action.selected,
  };

  const xs = [5, 205, 405, 605];
  const W = 130;
  const isReq = direction === "request";
  const tokenColor = isReq ? c.primary : c.success;

  return (
    <Box
      sx={{
        overflowX: "auto",
        "@media (prefers-reduced-motion: reduce)": { "& .http-token": { transition: "none !important" } },
      }}
    >
      <svg
        viewBox="0 0 760 200"
        role="img"
        aria-label={JOURNEY_NODES.map((n) => n[lang].title).join(" → ")}
        style={{ width: "100%", minWidth: SIZE.diagramMinWidth, height: "auto", display: "block", fontFamily: "inherit" }}
      >
        <defs>
          <marker id="http-arrow-req" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={isReq ? c.primary : c.line} />
          </marker>
          <marker id="http-arrow-res" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={!isReq ? c.success : c.line} />
          </marker>
        </defs>

        {xs.slice(0, -1).map((x, i) => (
          <g key={i}>
            <line x1={x + W + 4} y1={96} x2={xs[i + 1] - 4} y2={96} stroke={isReq ? c.primary : c.line} strokeWidth={isReq ? 2.5 : 1.5} markerEnd="url(#http-arrow-req)" />
            <line x1={xs[i + 1] - 4} y1={118} x2={x + W + 4} y2={118} stroke={!isReq ? c.success : c.line} strokeWidth={!isReq ? 2.5 : 1.5} markerEnd="url(#http-arrow-res)" />
          </g>
        ))}

        {JOURNEY_NODES.map((node, i) => {
          const active = i === pos;
          return (
            <g key={i}>
              <rect
                x={xs[i]} y={68} width={W} height={82} rx={14}
                fill={active ? c.tint : c.paper}
                stroke={active ? tokenColor : c.line}
                strokeWidth={active ? 2.5 : 1.5}
                strokeDasharray={active ? undefined : "5 4"}
              />
              <text x={xs[i] + W / 2} y={98} textAnchor="middle" fontSize={22}>{node.icon}</text>
              <text x={xs[i] + W / 2} y={120} textAnchor="middle" fontSize={15} fontWeight={800} fill={active ? c.text : c.muted}>
                {node[lang].title}
              </text>
              <text x={xs[i] + W / 2} y={138} textAnchor="middle" fontSize={12} fill={c.muted}>
                {node[lang].sub}
              </text>
            </g>
          );
        })}

        <g className="http-token" style={{ transform: `translate(${xs[pos] + W / 2}px, 36px)`, transition: "transform 0.7s ease" }}>
          <circle r={19} fill={c.paper} stroke={tokenColor} strokeWidth={2.5} />
          <text textAnchor="middle" dominantBaseline="central" fontSize={18}>📨</text>
          <text x={isReq ? 30 : -30} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={800} fill={tokenColor}>
            {isReq ? "→" : "←"}
          </text>
        </g>

        <text x={5} y={186} fontSize={13} fontWeight={700} fill={c.primary}>→ {ui.legendRequest}</text>
        <text x={115} y={186} fontSize={13} fontWeight={700} fill={c.success}>← {ui.legendResponse}</text>
        <text x={755} y={186} textAnchor="end" fontSize={12} fill={c.muted}>{easyUi.journeyHint}</text>
      </svg>
    </Box>
  );
}



function NestedLayers({ layer, mode, lang }: { layer: Layer; mode: "wrap" | "unwrap"; lang: Lang }) {
  const ui = HTTP_UI[lang];
  const easyUi = EASY_UI[lang];
  const theme = useTheme();
  const current = LAYER_RANK[layer];

  const statusText = (rank: number, present: boolean) => {
    if (present && rank === current) return ui.layerCurrent;
    if (present) return mode === "wrap" ? ui.layerAdded : ui.layerInside;
    return mode === "wrap" ? ui.layerNext : ui.layerRemoved;
  };

  const renderLayer = (rank: number): ReactElement => {
    const key = LAYER_BY_RANK[rank] as LayerKey;
    const color = layerColor(theme, key);
    const present = rank <= current;
    const isCurrent = present && rank === current;

    return (
      <Box
        sx={{
          p: 0.8,
          borderRadius: RADIUS.inner,
          border: "1.5px solid",
          borderStyle: present ? "solid" : "dashed",
          borderColor: present ? alpha(color, isCurrent ? 1 : 0.55) : "divider",
          bgcolor: present ? alpha(color, isCurrent ? 0.16 : 0.06) : "transparent",
          opacity: present ? 1 : 0.55,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} sx={{ mb: rank > 1 ? 0.6 : 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 800 }}>{ui[key]}</Typography>
          <Typography variant="caption" sx={{ fontWeight: 800, color: present ? color : "text.disabled" }}>
            {statusText(rank, present)}
          </Typography>
        </Stack>
        {rank > 1 && renderLayer(rank - 1)}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 0.2 }}>📦 {ui.tabLayers}</Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
        {mode === "wrap" ? ui.layersHintWrap : ui.layersHintUnwrap}
      </Typography>
      {renderLayer(5)}
      {layer === "none" && (
        <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 1 }}>{easyUi.noLayer}</Typography>
      )}
      {layer === "physical" && (
        <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 1 }}>{ui.physicalNote}</Typography>
      )}
    </Box>
  );
}


function FlowDiagram({ items, icons }: { items: string[]; icons: string[] }) {
  return (
    <Box sx={{ display: "grid", gap: 1.2, gridTemplateColumns: { xs: "1fr", sm: `repeat(${items.length}, minmax(0, 1fr))` } }}>
      {items.map((text, index) => {
        const [heading, ...sub] = text.split("\n");
        return (
          <Box key={`${heading}-${index}`} sx={{ position: "relative" }}>
            <Box sx={{ ...nodeSx(), height: "100%", p: 1.1 }}>
              <Typography aria-hidden variant="h2" sx={{ lineHeight: 1.2, mb: 0.3 }}>{icons[index]}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, overflowWrap: "anywhere" }}>{heading}</Typography>
              {sub.length > 0 && (
                <Typography variant="caption" sx={{ display: "block", color: "text.secondary", whiteSpace: "pre-line", mt: 0.2 }}>
                  {sub.join("\n")}
                </Typography>
              )}
            </Box>
            {index < items.length - 1 && (
              <ArrowForwardRoundedIcon
                aria-hidden
                sx={{
                  position: "absolute",
                  color: "primary.main",
                  fontSize: FONT.h4,
                  bgcolor: "background.paper",
                  borderRadius: "50%",
                  zIndex: 1,
                  right: { xs: "50%", sm: -14 },
                  bottom: { xs: -16, sm: "auto" },
                  top: { xs: "auto", sm: "50%" },
                  transform: { xs: "translateX(50%) rotate(90deg)", sm: "translateY(-50%)" },
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}



export default function HttpRequestResponse({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);
  const ui = HTTP_UI[lang];
  const easyUi = EASY_UI[lang];
  const step = HTTP_STEPS[stepIndex];
  const easy = HTTP_EASY[step.id];
  const last = HTTP_STEPS.length - 1;
  const go = (i: number) => setStepIndex(Math.min(last, Math.max(0, i)));

  const dirColor = (d: "request" | "response") => (d === "request" ? "primary.main" : "success.main");

  const known = useMemo(
    () => HTTP_STEPS.slice(0, stepIndex + 1).reduce<ConnectionReveal>((acc, item) => ({ ...acc, ...item.reveal }), {}),
    [stepIndex]
  );

  const join = (ip?: string, port?: string) => (ip ? `${ip}${port ? `:${port}` : ""}` : port ? `:${port}` : undefined);

  const facts: [string, string | undefined][] = [
    [ui.domain, known.domain],
    [ui.protocol, known.protocol],
    [ui.source, join(known.sourceIp, known.sourcePort)],
    [ui.destination, join(known.destIp, known.destPort)],
    [ui.status, known.status],
  ];

  const directionLabel = step.direction === "request" ? ui.requestLabel : ui.responseLabel;

  const sectionTitle = (text: string) => (
    <Typography variant="subtitle1" sx={{ mb: 0.7 }}>{text}</Typography>
  );

  return (
    <LessonPage>
      <LessonHeader eyebrow={ui.lessonTitle} title={easyUi.heroTitle} subtitle={ui.lessonSubtitle} />

      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Chip
          label={step.direction === "request" ? ui.legendRequest : ui.legendResponse}
          size="small"
          sx={{ bgcolor: dirColor(step.direction), color: "#fff", fontWeight: 800 }}
        />
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 700 }}>
          {ui.stepWord} {stepIndex + 1} / {HTTP_STEPS.length}
        </Typography>
      </Stack>

      <StepBar
        total={HTTP_STEPS.length}
        index={stepIndex}
        onSelect={go}
        label={(i) => `${ui.stepWord} ${i + 1}: ${HTTP_STEPS[i].title[lang]}`}
        colorFor={(i) => dirColor(HTTP_STEPS[i].direction)}
      />

      <LessonBody
        visual={
          <Stack spacing={1.5}>
            <Panel>
              <JourneyDiagram pos={easy?.pos ?? step.node} direction={step.direction} lang={lang} />

              {facts.some(([, v]) => v) && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 800, mb: 0.5 }}>{ui.known}</Typography>
                  <Stack direction="row" gap={0.6} flexWrap="wrap">
                    {facts.map(([label, value]) =>
                      value ? (
                        <Chip key={label} size="small" label={`${label}: ${value}`} sx={{ fontWeight: 700, bgcolor: "action.hover", fontFamily: MONO, maxWidth: "100%" }} />
                      ) : null
                    )}
                  </Stack>
                </Box>
              )}
            </Panel>

            <Panel>
              {sectionTitle(ui.diagramLabel)}
              <FlowDiagram items={step.items.map((it) => it[lang])} icons={step.icons} />
            </Panel>

            <Panel>
              <NestedLayers layer={step.layer} mode={step.layerMode} lang={lang} />
            </Panel>

            <Panel>
              <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} sx={{ mb: 0.6 }}>
                <Typography variant="subtitle1">{ui.dataLabel}</Typography>
                <Chip size="small" variant="outlined" label={directionLabel} sx={{ fontWeight: 700 }} />
              </Stack>
              <Box
                component="pre"
                sx={{ ...insetSx, m: 0, whiteSpace: "pre-wrap", overflowWrap: "anywhere", typography: "body2", fontFamily: MONO, lineHeight: 1.55 }}
              >
                {step.packet}
              </Box>
              <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 0.5 }}>{ui.snapshotNote}</Typography>

              {step.fields && (
                <Box sx={{ mt: 1.2, display: "grid", gridTemplateColumns: "minmax(100px, auto) 1fr", gap: 0.5, columnGap: 1.5 }}>
                  {step.fields.map(([key, value]) => (
                    <Box key={key} sx={{ display: "contents" }}>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>{key}</Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", overflowWrap: "anywhere" }}>{value}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Panel>
          </Stack>
        }
      >
        <StepCard stepText={`${ui.stepWord} ${stepIndex + 1}`} badge={step.phase[lang]} title={step.title[lang]} accent={dirColor(step.direction)}>
          <Stack spacing={1.2}>
            <Callout label={easyUi.simpleWords}>{easy ? easy.easy[lang] : step.plain[lang]}</Callout>
            <Callout label={ui.why} tone="info">{step.why[lang]}</Callout>

            {easy && (
              <Box>
                {sectionTitle(easyUi.whatHappens)}
                <Stack spacing={0.6}>
                  {easy.steps.map((s, i) => (
                    <Stack key={i} direction="row" gap={1} alignItems="flex-start">
                      <Box
                        sx={{
                          minWidth: 20,
                          height: 20,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          typography: "caption",
                          fontWeight: 800,
                          color: "#fff",
                          bgcolor: dirColor(step.direction),
                        }}
                      >
                        {i + 1}
                      </Box>
                      <Typography variant="body1" sx={{ lineHeight: 1.55 }}>{s[lang]}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}

            <Callout label={`💭 ${ui.tabAnalogy}`} tone="secondary">{step.analogy[lang]}</Callout>

            <Box>
              {sectionTitle(`🧠 ${easyUi.keyWords}`)}
              <Stack spacing={0.6}>
                {step.terms.map(([term, meaning]) => (
                  <Box key={term} sx={{ ...insetSx, bgcolor: "transparent", border: "1.5px dashed", borderColor: "divider" }}>
                    <Typography variant="body2" sx={{ lineHeight: 1.55 }}>
                      <Box component="span" sx={{ fontFamily: MONO, fontWeight: 800, color: "primary.main" }}>{term}</Box>
                      {" — "}
                      {meaning[lang]}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Callout label={`💡 ${ui.keyTakeaway}`} tone="warning">
              <Box component="span" sx={{ fontWeight: 700 }}>{step.remember[lang]}</Box>
            </Callout>

            <Accordion
              disableGutters
              elevation={0}
              sx={{ border: "1px solid", borderColor: "divider", borderRadius: `${RADIUS.inner} !important`, "&:before": { display: "none" } }}
            >
              <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                <Typography variant="subtitle2">🔎 {easyUi.technical}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ lineHeight: 1.65, color: "text.secondary" }}>{step.detail[lang]}</Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </StepCard>
      </LessonBody>

      <StepNav
        index={stepIndex}
        last={last}
        onPrev={() => go(stepIndex - 1)}
        onNext={() => go(stepIndex + 1)}
        onRestart={() => go(0)}
        labels={ui}
      />
    </LessonPage>
  );
}
