import { useMemo, useState, type ReactElement } from "react";
import { alpha, useTheme, type Theme } from "@mui/material/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { type Lang } from "../../../i18n";
import {
  HTTP_STEPS,
  HTTP_UI,
  LAYER_RANK,
  type ConnectionReveal,
  type Layer,
} from "../data/HttpRequestResponse";
import {
  EASY_UI,
  HTTP_EASY,
  JOURNEY_NODES,
} from "../data/HttpRequestResponse";

const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";

/* rank 5 = outermost wrapper, rank 1 = the HTTP message itself */
const LAYER_BY_RANK = [
  null,
  "layerData",
  "layerTls",
  "layerSegment",
  "layerPacket",
  "layerFrame",
] as const;

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

/* ------------------------------------------------------------------ */
/*  Journey diagram: browser → home router → internet → server         */
/* ------------------------------------------------------------------ */

function JourneyDiagram({
  pos,
  direction,
  lang,
}: {
  pos: number;
  direction: "request" | "response";
  lang: Lang;
}) {
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
  const W = 150;
  const isReq = direction === "request";
  const tokenColor = isReq ? c.primary : c.success;

  return (
    <Box
      sx={{
        overflowX: "auto",
        "@media (prefers-reduced-motion: reduce)": {
          "& .http-token": { transition: "none !important" },
        },
      }}
    >
      <svg
        viewBox="0 0 760 200"
        role="img"
        aria-label={JOURNEY_NODES.map((n) => n[lang].title).join(" → ")}
        style={{ width: "100%", minWidth: 600, height: "auto", display: "block", fontFamily: "inherit" }}
      >
        <defs>
          <marker id="http-arrow-req" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={isReq ? c.primary : c.line} />
          </marker>
          <marker id="http-arrow-res" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={!isReq ? c.success : c.line} />
          </marker>
        </defs>

        {/* Arrows between nodes: top = request, bottom = response */}
        {xs.slice(0, -1).map((x, i) => (
          <g key={i}>
            <line
              x1={x + W + 4} y1={96} x2={xs[i + 1] - 4} y2={96}
              stroke={isReq ? c.primary : c.line} strokeWidth={isReq ? 2.5 : 1.5}
              markerEnd="url(#http-arrow-req)"
            />
            <line
              x1={xs[i + 1] - 4} y1={118} x2={x + W + 4} y2={118}
              stroke={!isReq ? c.success : c.line} strokeWidth={!isReq ? 2.5 : 1.5}
              markerEnd="url(#http-arrow-res)"
            />
          </g>
        ))}

        {/* Nodes */}
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
              <text x={xs[i] + W / 2} y={98} textAnchor="middle" fontSize={22}>
                {node.icon}
              </text>
              <text x={xs[i] + W / 2} y={120} textAnchor="middle" fontSize={14} fontWeight={800} fill={active ? c.text : c.muted}>
                {node[lang].title}
              </text>
              <text x={xs[i] + W / 2} y={138} textAnchor="middle" fontSize={11} fill={c.muted}>
                {node[lang].sub}
              </text>
            </g>
          );
        })}

        {/* Moving data token */}
        <g
          className="http-token"
          style={{
            transform: `translate(${xs[pos] + W / 2}px, 36px)`,
            transition: "transform 0.7s ease",
          }}
        >
          <circle r={19} fill={c.paper} stroke={tokenColor} strokeWidth={2.5} />
          <text textAnchor="middle" dominantBaseline="central" fontSize={18}>
            📨
          </text>
          <text x={isReq ? 30 : -30} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={800} fill={tokenColor}>
            {isReq ? "→" : "←"}
          </text>
        </g>

        {/* Legend */}
        <text x={5} y={186} fontSize={12} fontWeight={700} fill={c.primary}>
          → {ui.legendRequest}
        </text>
        <text x={110} y={186} fontSize={12} fontWeight={700} fill={c.success}>
          ← {ui.legendResponse}
        </text>
        <text x={755} y={186} textAnchor="end" fontSize={11} fill={c.muted}>
          {easyUi.journeyHint}
        </text>
      </svg>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Nested layers: frame ⊃ IP ⊃ TCP ⊃ TLS ⊃ HTTP                       */
/* ------------------------------------------------------------------ */

function NestedLayers({
  layer,
  mode,
  lang,
}: {
  layer: Layer;
  mode: "wrap" | "unwrap";
  lang: Lang;
}) {
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
          p: 1,
          borderRadius: 1.5,
          border: "1.5px solid",
          borderStyle: present ? "solid" : "dashed",
          borderColor: present ? alpha(color, isCurrent ? 1 : 0.55) : "divider",
          bgcolor: present ? alpha(color, isCurrent ? 0.16 : 0.06) : "transparent",
          opacity: present ? 1 : 0.55,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} sx={{ mb: rank > 1 ? 0.8 : 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800 }}>{ui[key]}</Typography>
          <Typography sx={{ fontSize: 11, fontWeight: 800, color: present ? color : "text.disabled" }}>
            {statusText(rank, present)}
          </Typography>
        </Stack>
        {rank > 1 && renderLayer(rank - 1)}
      </Box>
    );
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 15, fontWeight: 800, mb: 0.3 }}>📦 {ui.tabLayers}</Typography>
      <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1.2 }}>
        {mode === "wrap" ? ui.layersHintWrap : ui.layersHintUnwrap}
      </Typography>

      {renderLayer(5)}

      {layer === "none" && (
        <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 1 }}>{easyUi.noLayer}</Typography>
      )}
      {layer === "physical" && (
        <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 1 }}>{ui.physicalNote}</Typography>
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Flow diagram (boxes with arrows)                                   */
/* ------------------------------------------------------------------ */

function FlowDiagram({ items, icons }: { items: string[]; icons: string[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 1,
        gridTemplateColumns: { xs: "1fr", sm: `repeat(${items.length}, minmax(0, 1fr))` },
      }}
    >
      {items.map((text, index) => {
        const [heading, ...sub] = text.split("\n");
        return (
          <Box key={`${heading}-${index}`} sx={{ position: "relative" }}>
            <Box
              sx={{
                height: "100%",
                p: 1.4,
                textAlign: "center",
                borderRadius: 2,
                border: "1.5px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Typography aria-hidden sx={{ fontSize: 26, lineHeight: 1.2, mb: 0.4 }}>
                {icons[index]}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 800, lineHeight: 1.35, overflowWrap: "anywhere" }}>
                {heading}
              </Typography>
              {sub.length > 0 && (
                <Typography sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.5, whiteSpace: "pre-line", mt: 0.3 }}>
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
                  fontSize: 20,
                  bgcolor: "background.paper",
                  borderRadius: "50%",
                  zIndex: 1,
                  right: { xs: "50%", sm: -15 },
                  bottom: { xs: -17, sm: "auto" },
                  top: { xs: "auto", sm: "50%" },
                  transform: { xs: "translateX(50%) rotate(90deg)", sm: "translateY(-50%)" },
                  display: { xs: "block", sm: "block" },
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Main lesson                                                        */
/* ------------------------------------------------------------------ */

export default function HttpRequestResponse({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);
  const ui = HTTP_UI[lang];
  const easyUi = EASY_UI[lang];
  const step = HTTP_STEPS[stepIndex];
  const easy = HTTP_EASY[step.id];
  const last = HTTP_STEPS.length - 1;

  const go = (i: number) => setStepIndex(Math.min(last, Math.max(0, i)));

  const known = useMemo(
    () =>
      HTTP_STEPS.slice(0, stepIndex + 1).reduce<ConnectionReveal>(
        (acc, item) => ({ ...acc, ...item.reveal }),
        {}
      ),
    [stepIndex]
  );

  const join = (ip?: string, port?: string) =>
    ip ? `${ip}${port ? `:${port}` : ""}` : port ? `:${port}` : undefined;

  const facts: [string, string | undefined][] = [
    [ui.domain, known.domain],
    [ui.protocol, known.protocol],
    [ui.source, join(known.sourceIp, known.sourcePort)],
    [ui.destination, join(known.destIp, known.destPort)],
    [ui.status, known.status],
  ];

  const directionLabel = step.direction === "request" ? ui.requestLabel : ui.responseLabel;

  const sectionTitle = (text: string) => (
    <Typography sx={{ fontSize: 15, fontWeight: 800, mb: 0.8 }}>{text}</Typography>
  );

  return (
    <Stack spacing={2.2} sx={{ width: "100%" }}>
      {/* Heading */}
      <Box>
        <Typography variant="subtitle2" sx={{ color: "primary.main", mb: 0.5 }}>
          {ui.lessonTitle}
        </Typography>
        <Typography component="h1" variant="h1" sx={{ letterSpacing: "-0.6px", mb: 0.6 }}>
          {easyUi.heroTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          {ui.lessonSubtitle}
        </Typography>
      </Box>

      {/* Step count */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Stack direction="row" gap={0.8}>
          <Chip
            label={step.direction === "request" ? ui.legendRequest : ui.legendResponse}
            size="small"
            sx={{
              bgcolor: step.direction === "request" ? "primary.main" : "success.main",
              color: "#fff",
              typography: "caption",
              fontWeight: 800,
            }}
          />
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 700 }}>
          {ui.stepWord} {stepIndex + 1} / {HTTP_STEPS.length}
        </Typography>
      </Stack>

      {/* Clickable segmented progress */}
      <Stack direction="row" gap={0.4}>
        {HTTP_STEPS.map((s, i) => (
          <Box
            key={s.id}
            component="button"
            type="button"
            aria-label={`${ui.stepWord} ${i + 1}: ${s.title[lang]}`}
            aria-current={i === stepIndex ? "step" : undefined}
            onClick={() => go(i)}
            sx={{
              flex: 1,
              height: 8,
              p: 0,
              border: 0,
              borderRadius: 99,
              cursor: "pointer",
              bgcolor:
                i <= stepIndex
                  ? s.direction === "request"
                    ? "primary.main"
                    : "success.main"
                  : "action.hover",
              opacity: i < stepIndex ? 0.55 : 1,
              outline: i === stepIndex ? "2px solid" : "none",
              outlineColor: "text.primary",
              outlineOffset: 2,
              "&:focus-visible": { outline: "2px solid", outlineColor: "text.primary", outlineOffset: 2 },
            }}
          />
        ))}
      </Stack>

      {/* Journey diagram + what we know so far */}
      <Paper variant="outlined" sx={{ p: { xs: 1.4, sm: 2 }, borderRadius: 2.5 }}>
        <JourneyDiagram pos={easy?.pos ?? step.node} direction={step.direction} lang={lang} />

        {facts.some(([, v]) => v) && (
          <Box sx={{ mt: 1.4 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 800, mb: 0.7 }}>{ui.known}</Typography>
            <Stack direction="row" gap={0.8} flexWrap="wrap">
              {facts.map(([label, value]) =>
                value ? (
                  <Chip
                    key={label}
                    size="small"
                    label={`${label}: ${value}`}
                    sx={{ fontWeight: 700, bgcolor: "action.hover", fontFamily: mono, maxWidth: "100%" }}
                  />
                ) : null
              )}
            </Stack>
          </Box>
        )}
      </Paper>

      {/* Step card */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 1.7, sm: 2.4 },
          borderRadius: 2.5,
          borderTop: "4px solid",
          borderTopColor: step.direction === "request" ? "primary.main" : "success.main",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} sx={{ mb: 1.2 }}>
          <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 850, letterSpacing: 0.8, textTransform: "uppercase" }}>
            {ui.stepWord} {stepIndex + 1}
          </Typography>
          <Chip
            label={step.phase[lang]}
            size="small"
            sx={{ bgcolor: "action.selected", color: "primary.main", typography: "caption", fontWeight: 850, maxWidth: "65%" }}
          />
        </Stack>

        <Typography component="h2" variant="h3" sx={{ fontWeight: 850, mb: 1 }}>
          {step.title[lang]}
        </Typography>

        {/* Simple words */}
        <Box
          sx={{
            p: 1.5,
            mb: 1.6,
            borderRadius: 2,
            bgcolor: (t) => alpha(t.palette.primary.main, 0.07),
            borderLeft: "4px solid",
            borderLeftColor: "primary.main",
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 800, color: "primary.main", mb: 0.4 }}>
            {easyUi.simpleWords}
          </Typography>
          <Typography sx={{ fontSize: 16, lineHeight: 1.7, fontWeight: 600 }}>
            {easy ? easy.easy[lang] : step.plain[lang]}
          </Typography>
        </Box>

        {/* Why */}
        <Box
          sx={{
            p: 1.3,
            mb: 1.8,
            borderRadius: 2,
            bgcolor: (t) => alpha(t.palette.info.main, 0.08),
            borderLeft: "4px solid",
            borderLeftColor: "info.main",
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 800, color: "info.main", mb: 0.3 }}>{ui.why}</Typography>
          <Typography sx={{ fontSize: 14.5, lineHeight: 1.65 }}>{step.why[lang]}</Typography>
        </Box>

        {/* What happens */}
        {easy && (
          <Box sx={{ mb: 2 }}>
            {sectionTitle(easyUi.whatHappens)}
            <Stack spacing={0.8}>
              {easy.steps.map((s, i) => (
                <Stack key={i} direction="row" gap={1.2} alignItems="flex-start">
                  <Box
                    sx={{
                      minWidth: 26,
                      height: 26,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 13,
                      fontWeight: 800,
                      color: "#fff",
                      bgcolor: step.direction === "request" ? "primary.main" : "success.main",
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Typography sx={{ fontSize: 15, lineHeight: 1.65, pt: 0.1 }}>{s[lang]}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}

        {/* Diagram */}
        <Box sx={{ mb: 2 }}>
          {sectionTitle(ui.diagramLabel)}
          <FlowDiagram items={step.items.map((it) => it[lang])} icons={step.icons} />
        </Box>

        {/* Nested layers */}
        <Box sx={{ mb: 2, p: 1.4, borderRadius: 2, bgcolor: "action.hover" }}>
          <NestedLayers layer={step.layer} mode={step.layerMode} lang={lang} />
        </Box>

        {/* Data snapshot */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} sx={{ mb: 0.8 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 800 }}>{ui.dataLabel}</Typography>
            <Chip size="small" variant="outlined" label={directionLabel} sx={{ fontWeight: 700 }} />
          </Stack>
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 1.4,
              borderRadius: 2,
              bgcolor: "action.hover",
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              fontFamily: mono,
              fontSize: 13,
              lineHeight: 1.7,
            }}
          >
            {step.packet}
          </Box>
          <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 0.6 }}>{ui.snapshotNote}</Typography>
        </Box>

        {/* Look inside */}
        {step.fields && (
          <Box sx={{ mb: 2 }}>
            {sectionTitle("🔬")}
            <Box sx={{ display: "grid", gridTemplateColumns: "minmax(110px, auto) 1fr", gap: 0.8, columnGap: 2 }}>
              {step.fields.map(([key, value]) => (
                <Box key={key} sx={{ display: "contents" }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 800 }}>{key}</Typography>
                  <Typography sx={{ fontSize: 14, color: "text.secondary", overflowWrap: "anywhere" }}>{value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Analogy */}
        <Box
          sx={{
            p: 1.4,
            mb: 1.6,
            borderRadius: 2,
            bgcolor: "action.hover",
            borderLeft: "4px solid",
            borderLeftColor: "secondary.main",
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 800, color: "secondary.main", mb: 0.3 }}>
            💭 {ui.tabAnalogy}
          </Typography>
          <Typography sx={{ fontSize: 14.5, lineHeight: 1.65 }}>{step.analogy[lang]}</Typography>
        </Box>

        {/* Key words */}
        <Box sx={{ mb: 1.6 }}>
          {sectionTitle(`🧠 ${easyUi.keyWords}`)}
          <Stack spacing={0.8}>
            {step.terms.map(([term, meaning]) => (
              <Box key={term} sx={{ p: 1.1, borderRadius: 2, border: "1.5px dashed", borderColor: "divider" }}>
                <Typography sx={{ fontSize: 14, lineHeight: 1.6 }}>
                  <Box component="span" sx={{ fontFamily: mono, fontWeight: 800, color: "primary.main" }}>
                    {term}
                  </Box>
                  {" — "}
                  {meaning[lang]}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Key takeaway */}
        <Box
          sx={{
            p: 1.4,
            mb: 1.6,
            borderRadius: 2,
            bgcolor: (t) => alpha(t.palette.warning.main, 0.1),
            borderLeft: "4px solid",
            borderLeftColor: "warning.main",
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 800, color: "warning.main", mb: 0.3 }}>
            💡 {ui.keyTakeaway}
          </Typography>
          <Typography sx={{ fontSize: 15, lineHeight: 1.6, fontWeight: 700 }}>{step.remember[lang]}</Typography>
        </Box>

        {/* Technical details */}
        <Accordion
          disableGutters
          elevation={0}
          sx={{ border: "1px solid", borderColor: "divider", borderRadius: "8px !important", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Typography sx={{ fontWeight: 800, fontSize: 14.5 }}>🔎 {easyUi.technical}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontSize: 14, lineHeight: 1.75, color: "text.secondary" }}>
              {step.detail[lang]}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* Navigation */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ArrowBackRoundedIcon />}
          disabled={stepIndex === 0}
          onClick={() => go(stepIndex - 1)}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          {ui.previous}
        </Button>

        <Button
          variant="text"
          size="small"
          color="inherit"
          startIcon={<ReplayRoundedIcon />}
          onClick={() => go(0)}
          sx={{ textTransform: "none" }}
        >
          {ui.restart}
        </Button>

        <Button
          variant="contained"
          size="small"
          endIcon={<ArrowForwardRoundedIcon />}
          disabled={stepIndex === last}
          onClick={() => go(stepIndex + 1)}
          sx={{ textTransform: "none", borderRadius: 2, boxShadow: "none" }}
        >
          {ui.next}
        </Button>
      </Stack>
    </Stack>
  );
}