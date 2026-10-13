import { Box, Stack, Typography } from "@mui/material";

import type { Lang } from "../../../i18n";
import { TLS_LABELS, TLS_STEPS, type TlsStep } from "../data/TLS";
import {
  CardGrid,
  Diagram,
  LessonFrame,
  StepTextCard,
  SvgCaption,
  SvgLink,
  SvgNode,
  SvgPacket,
  VisualPanel,
  lerp,
  useDiagramColors,
  useStepper,
} from "../../../shared/lessonParts";
import { MONO, RADIUS, labelSx } from "../../../shared/lessonKit";

type Labels = (typeof TLS_LABELS)[Lang];

const B: [number, number] = [115, 95];
const S: [number, number] = [645, 95];
const SPY: [number, number] = [380, 228];
const TAP: [number, number] = [380, 95];

function TlsDiagram({ step, l }: { step: TlsStep; l: Labels }) {
  const c = useDiagramColors();
  const p = step.packet;
  const lockColor = step.lock === "locked" ? c.success : step.lock === "handshake" ? c.warn : c.error;
  const lockText = step.lock === "locked" ? `🔒 ${l.locked}` : step.lock === "handshake" ? `🤝 ${l.handshake}` : `🔓 ${l.open}`;
  const at = p ? (p.dir === "out" ? lerp(B, S, p.t) : lerp(S, B, p.t)) : TAP;
  const spyReads = !!step.spy?.readable;

  return (
    <Diagram width={760} height={280} label={`${l.browser} ↔ ${l.server}, ${l.spy}`}>
      <SvgLink a={B} b={S} active color={lockColor} width={step.lock === "locked" ? 6 : 2.5} c={c} />
      <line x1={TAP[0]} y1={TAP[1]} x2={SPY[0]} y2={SPY[1] - 32} stroke={spyReads ? c.error : c.line} strokeWidth={1.8} strokeDasharray="4 5" className="lp-fade" />

      <g className="lp-fade">
        <rect x={380 - 78} y={16} width={156} height={24} rx={12} fill={lockColor} />
        <text x={380} y={32} textAnchor="middle" fontSize={12} fontWeight={800} fill={c.paper}>
          {lockText}
        </text>
      </g>

      <SvgNode x={B[0]} y={B[1]} w={170} h={64} icon="💻" title={l.browser} lines={[{ text: step.lock === "open" && step.packet ? "http://bank.example" : "https://bank.example", mono: true, color: step.lock === "open" && step.packet ? c.error : undefined }]} active c={c} />
      <SvgNode x={S[0]} y={S[1]} w={170} h={64} icon="🏦" title={l.server} lines={[{ text: "203.0.113.50:443", mono: true }]} active c={c} />
      <SvgNode
        x={SPY[0]}
        y={SPY[1]}
        w={230}
        h={60}
        icon="🕵️"
        title={l.spy}
        lines={[{ text: spyReads ? `👁 ${l.readable}` : `🤷 ${l.gibberish}`, color: spyReads ? c.error : c.success }]}
        active
        color={spyReads ? c.error : c.line}
        c={c}
      />

      {step.sharedKey && (
        <g className="lp-fade">
          <text x={B[0]} y={B[1] + 58} textAnchor="middle" fontSize={18}>
            🔑
          </text>
          <text x={S[0]} y={S[1] + 58} textAnchor="middle" fontSize={18}>
            🔑
          </text>
          <SvgCaption x={B[0]} y={B[1] + 76} text={l.sameKey} color={c.success} bold />
          <SvgCaption x={S[0]} y={S[1] + 76} text={l.sameKey} color={c.success} bold />
        </g>
      )}

      <SvgPacket
        at={at}
        visible={!!p}
        label={p?.label}
        emoji={p?.encrypted ? "🔒" : "✉️"}
        color={p?.encrypted ? c.success : p && step.lock === "open" ? c.error : c.warn}
        arrow={p?.dir === "in" ? "←" : "→"}
        c={c}
      />
    </Diagram>
  );
}

export default function TLS({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(TLS_STEPS.length);
  const l = TLS_LABELS[lang];
  const step = TLS_STEPS[stepIndex];
  const content = step[lang];

  const visual = (
    <VisualPanel>
      {step.scene === "cards" ? (
        content.cards && <CardGrid cards={content.cards} />
      ) : (
        <>
          <TlsDiagram step={step} l={l} />

          {step.spy && (
            <Box
              sx={{
                p: 1.2,
                borderRadius: RADIUS.inner,
                bgcolor: "#0b0d13",
                border: "2px solid",
                borderColor: step.spy.readable ? "error.main" : "success.main",
                overflowX: "auto",
              }}
            >
              <Typography sx={{ ...labelSx, color: step.spy.readable ? "error.main" : "success.main", display: "block", mb: 0.6 }}>
                🕵️ {l.spySees} · {step.spy.readable ? l.readable : l.gibberish}
              </Typography>
              {step.spy.lines.map((line, i) => (
                <Typography
                  key={i}
                  component="code"
                  variant="body2"
                  sx={{
                    display: "block",
                    fontFamily: MONO,
                    whiteSpace: "pre",
                    lineHeight: 1.6,
                    color: step.spy!.readable ? (line.includes("password") ? "#f87171" : "#e5e7eb") : "#6b7280",
                    fontWeight: line.includes("password") ? 800 : 500,
                  }}
                >
                  {line || " "}
                </Typography>
              ))}
            </Box>
          )}

          {step.certChecks && (
            <Box>
              <Typography sx={{ ...labelSx, display: "block", mb: 0.8 }}>🪪 {l.certTitle}</Typography>
              <Stack spacing={0.6}>
                {l.checks.map(([k, v]) => (
                  <Box
                    key={k}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "130px 1fr" },
                      gap: 0.6,
                      px: 1.1,
                      py: 0.7,
                      borderRadius: RADIUS.inner,
                      border: "1.5px solid",
                      borderColor: "success.main",
                      bgcolor: "action.selected",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      {k}
                    </Typography>
                    <Typography variant="body2">{v}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </>
      )}
    </VisualPanel>
  );

  return (
    <LessonFrame
      lang={lang}
      eyebrow={l.lessonTitle}
      title={l.heroTitle}
      subtitle={l.heroSubtitle}
      stepIndex={stepIndex}
      total={TLS_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => TLS_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} terminal={step.terminal} />
    </LessonFrame>
  );
}
