import { Box, Typography } from "@mui/material";

import type { Lang } from "../../../i18n";
import { MAC, SWITCHING_LABELS, SWITCHING_STEPS, type SwNode, type SwPc, type SwStep, type SwToken } from "../data/Switching";
import {
  CardGrid,
  Diagram,
  LessonFrame,
  MiniTable,
  StepTextCard,
  SvgCaption,
  SvgLink,
  SvgNode,
  SvgPacket,
  VisualPanel,
  lerp,
  useDiagramColors,
  useStepper,
  type DiagramColors,
} from "../../../shared/lessonParts";
import { MONO, labelSx, nodeSx } from "../../../shared/lessonKit";

type Labels = (typeof SWITCHING_LABELS)[Lang];

const POS: Record<SwNode, [number, number]> = {
  center: [380, 150],
  A: [115, 70],
  B: [115, 232],
  C: [645, 70],
  D: [645, 232],
};
const PORT: Record<SwPc, number> = { A: 1, B: 2, C: 3, D: 4 };
const PCS: SwPc[] = ["A", "B", "C", "D"];
const TOKEN_IDS = ["a", "b", "c", "d"];

function tokenStyle(kind: SwToken["kind"], c: DiagramColors) {
  switch (kind) {
    case "flood":
      return { color: c.warn, emoji: "📨" };
    case "broadcast":
      return { color: c.warn, emoji: "📢" };
    case "drop":
      return { color: c.muted, emoji: "🗑️" };
    case "crash":
      return { color: c.error, emoji: "💥" };
    default:
      return { color: c.primary, emoji: "📨" };
  }
}

function SwitchDiagram({ step, l }: { step: SwStep; l: Labels }) {
  const c = useDiagramColors();
  const hub = step.mode === "hub";
  const linkHot = (pc: SwPc) => step.tokens.some((t) => t.from === pc || t.to === pc);

  return (
    <Diagram width={760} height={300} label={`${hub ? l.hub : l.switch} · PC A, B, C, D`}>
      {PCS.map((pc) => {
        const tok = step.tokens.find((t) => t.from === pc || t.to === pc);
        const col = tok ? tokenStyle(tok.kind, c).color : undefined;
        const mid = lerp(POS.center, POS[pc], 0.3);
        return (
          <g key={pc}>
            <SvgLink a={POS.center} b={POS[pc]} active={linkHot(pc)} color={tok ? col : undefined} c={c} />
            <circle cx={mid[0]} cy={mid[1]} r={11} fill={c.paper} stroke={c.line} strokeWidth={1.5} />
            <text x={mid[0]} y={mid[1] + 4} textAnchor="middle" fontSize={11} fontWeight={800} fill={c.muted}>
              {PORT[pc]}
            </text>
          </g>
        );
      })}

      <SvgNode
        x={POS.center[0]}
        y={POS.center[1]}
        w={128}
        h={60}
        icon={hub ? "📣" : "🔀"}
        title={hub ? l.hub : l.switch}
        lines={[{ text: hub ? "Layer 1" : "Layer 2 · MAC" }]}
        active
        color={hub ? c.warn : c.primary}
        c={c}
      />

      {PCS.map((pc) => (
        <SvgNode
          key={pc}
          x={POS[pc][0]}
          y={POS[pc][1]}
          w={170}
          h={60}
          icon="💻"
          title={`${l.pc} ${pc}`}
          lines={[{ text: MAC[pc], mono: true }]}
          active={step.activePcs.includes(pc)}
          dim={step.activePcs.length > 0 && !step.activePcs.includes(pc)}
          c={c}
        />
      ))}

      {TOKEN_IDS.map((id) => {
        const t = step.tokens.find((x) => x.id === id);
        const st = tokenStyle(t?.kind, c);
        const at = t ? lerp(POS[t.from], POS[t.to], t.t) : POS.center;
        const label = t ? (t.kind === "drop" ? `✗ ${l.dropped}` : t.label) : undefined;
        return <SvgPacket key={id} at={at} visible={!!t} emoji={st.emoji} color={st.color} label={label} c={c} />;
      })}

      {step.id === "collision" && <SvgCaption x={380} y={210} text="💥 COLLISION" color={c.error} size={14} bold />}
    </Diagram>
  );
}

export default function Switching({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(SWITCHING_STEPS.length);
  const l = SWITCHING_LABELS[lang];
  const step = SWITCHING_STEPS[stepIndex];
  const content = step[lang];

  const visual = (
    <VisualPanel>
      {step.scene === "cards" ? (
        content.cards && <CardGrid cards={content.cards} hot={[1]} />
      ) : (
        <>
          <SwitchDiagram step={step} l={l} />

          {step.frame && (
            <Box>
              <Typography sx={{ ...labelSx, display: "block", mb: 0.8 }}>{l.frame}</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 0.8 }}>
                {(
                  [
                    [l.dst, step.frame.dst],
                    [l.src, step.frame.src],
                  ] as const
                ).map(([k, v]) => (
                  <Box key={k} sx={{ ...nodeSx("divider", "background.paper"), textAlign: "left", px: 1.2 }}>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                      {k}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: MONO, fontWeight: 800 }}>
                      {v}
                    </Typography>
                  </Box>
                ))}
              </Box>
              {content.decision && (
                <Box sx={{ ...nodeSx("primary.main", "action.selected"), textAlign: "left", px: 1.2, mt: 0.8 }}>
                  <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 800 }}>
                    {l.decision}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {content.decision}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {step.mode === "hub" ? (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {l.tableHub}
            </Typography>
          ) : (
            <MiniTable
              title={l.table}
              hint={l.tableHint}
              columns={[l.colMac, l.colPort, l.colDevice, l.colAge]}
              rows={step.table}
              emptyText={l.empty}
              minWidth={480}
              rowTone={(i) => (step.newRows?.includes(i) ? "new" : step.hotRows?.includes(i) ? "active" : "normal")}
            />
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
      total={SWITCHING_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => SWITCHING_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} terminal={step.terminal} />
    </LessonFrame>
  );
}
