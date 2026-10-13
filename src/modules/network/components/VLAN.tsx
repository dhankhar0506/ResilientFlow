import { Box, Typography } from "@mui/material";

import type { Lang } from "../../../i18n";
import { VLAN_LABELS, VLAN_STEPS, type VlanNode, type VlanStep } from "../data/VLAN";
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
  SvgZone,
  VisualPanel,
  lerp,
  useDiagramColors,
  useStepper,
} from "../../../shared/lessonParts";
import { MONO, RADIUS } from "../../../shared/lessonKit";

type Labels = (typeof VLAN_LABELS)[Lang];

const POS: Record<VlanNode, [number, number]> = {
  R: [280, 46],
  SW1: [280, 185],
  SW2: [490, 185],
  S1: [100, 110],
  D1: [100, 256],
  S2: [660, 110],
  D2: [660, 256],
};
const PC_VLAN: Record<"S1" | "D1" | "S2" | "D2", 10 | 20> = { S1: 10, D1: 20, S2: 10, D2: 20 };

function VlanDiagram({ step, l }: { step: VlanStep; l: Labels }) {
  const c = useDiagramColors();
  const vColor = (v?: 10 | 20) => (v === 10 ? c.info : v === 20 ? c.secondary : c.warn);
  const pcColor = (pc: keyof typeof PC_VLAN) => (step.vlans ? vColor(PC_VLAN[pc]) : undefined);
  const hotLink = (a: VlanNode, b: VlanNode) =>
    step.tokens.find((t) => (t.from === a && t.to === b) || (t.from === b && t.to === a));

  const link = (a: VlanNode, b: VlanNode, base?: string, width?: number) => {
    const tok = hotLink(a, b);
    return <SvgLink a={POS[a]} b={POS[b]} active={!!tok} color={tok ? vColor(tok.vlan) : base} width={width} c={c} />;
  };

  return (
    <Diagram width={760} height={300} label={`${l.sales} / ${l.dev} VLANs`}>
      {!step.vlans && <SvgZone x={10} y={12} w={740} h={280} label={l.flat} color={c.warn} c={c} />}

      {step.showRouter && link("R", "SW1", c.line, 3)}
      {link("SW1", "S1")}
      {link("SW1", "D1")}
      {link("SW2", "S2")}
      {link("SW2", "D2")}
      {link("SW1", "SW2", step.vlans ? c.text : undefined, 4)}
      {step.vlans && <SvgCaption x={385} y={150} text={l.trunk} color={c.muted} bold />}

      {step.showRouter && (
        <SvgNode x={POS.R[0]} y={POS.R[1]} w={210} h={62} icon="📡" title={l.router} lines={[{ text: ".10 = 10.10.10.1 · .20 = 10.20.20.1", mono: false }]} active c={c} />
      )}
      <SvgNode x={POS.SW1[0]} y={POS.SW1[1]} w={110} h={54} icon="🔀" title="SW1" active c={c} />
      <SvgNode x={POS.SW2[0]} y={POS.SW2[1]} w={110} h={54} icon="🔀" title="SW2" active c={c} />

      {(["S1", "D1", "S2", "D2"] as const).map((pc) => (
        <SvgNode
          key={pc}
          x={POS[pc][0]}
          y={POS[pc][1]}
          w={160}
          h={62}
          icon="💻"
          title={`${pc.startsWith("S") ? l.sales : l.dev} PC ${pc[1]}`}
          lines={[
            {
              text: step.vlans ? `VLAN ${PC_VLAN[pc]} · 10.${PC_VLAN[pc]}.${PC_VLAN[pc]}.1${pc[1]}` : `10.0.0.1${pc === "S1" ? 1 : pc === "D1" ? 2 : pc === "S2" ? 3 : 4}`,
              mono: true,
              color: pcColor(pc),
            },
          ]}
          active
          color={pcColor(pc)}
          c={c}
        />
      ))}

      {["a", "b", "c", "d"].map((id) => {
        const t = step.tokens.find((x) => x.id === id);
        const p = t ? lerp(POS[t.from], POS[t.to], t.t) : POS.SW1;
        const at: [number, number] = [p[0] + (t?.dx ?? 0), p[1]];
        return (
          <SvgPacket
            key={id}
            at={at}
            visible={!!t}
            emoji={t?.blocked ? "⛔" : t?.label === "broadcast" ? "📢" : "📨"}
            color={t?.blocked ? c.error : vColor(t?.vlan)}
            label={t?.label}
            c={c}
          />
        );
      })}
    </Diagram>
  );
}

function FrameBar({ tagged, l }: { tagged: boolean; l: Labels }) {
  const parts: { name: string; bytes: string; tag?: boolean }[] = [
    { name: "Dst MAC", bytes: "6" },
    { name: "Src MAC", bytes: "6" },
    ...(tagged ? [{ name: "802.1Q · VLAN 10", bytes: "4", tag: true }] : []),
    { name: "Type", bytes: "2" },
    { name: "Data (IP packet)", bytes: "46–1500" },
    { name: "FCS", bytes: "4" },
  ];
  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 800 }}>
        {l.frame}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.8 }}>
        {l.frameHint}
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5, overflowX: "auto" }}>
        {parts.map((p) => (
          <Box
            key={p.name}
            sx={{
              flex: p.name.startsWith("Data") ? "3 0 120px" : "1 0 72px",
              p: 0.8,
              borderRadius: RADIUS.inner,
              border: "1.5px solid",
              borderColor: p.tag ? "info.main" : "divider",
              bgcolor: p.tag ? "action.selected" : "background.paper",
              textAlign: "center",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 800, display: "block", color: p.tag ? "info.main" : "text.primary" }}>
              {p.name}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: MONO, color: "text.secondary" }}>
              {p.bytes} B
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function VLAN({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(VLAN_STEPS.length);
  const l = VLAN_LABELS[lang];
  const step = VLAN_STEPS[stepIndex];
  const content = step[lang];

  const visual = (
    <VisualPanel>
      {step.scene === "cards" ? (
        content.cards && <CardGrid cards={content.cards} />
      ) : (
        <>
          <VlanDiagram step={step} l={l} />
          {step.vlans && (
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "info.main" }}>
                ■ {l.vlan10}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "secondary.main" }}>
                ■ {l.vlan20}
              </Typography>
            </Box>
          )}
          {step.frame && <FrameBar tagged={step.frame === "tagged"} l={l} />}
          {step.ports && (
            <MiniTable
              title={l.ports}
              columns={[l.colPort, l.colTo, l.colMode, l.colVlan]}
              rows={step.ports}
              minWidth={480}
              rowTone={(i) => (step.hotPorts?.includes(i) ? "active" : "normal")}
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
      total={VLAN_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => VLAN_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} terminal={step.terminal} />
    </LessonFrame>
  );
}
