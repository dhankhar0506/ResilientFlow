import type { Lang } from "../../../i18n";
import { FW_LABELS, FW_RULES, FW_RULE_NOTES, FW_STEPS, type FwNode, type FwStep } from "../data/Firewall";
import {
  CardGrid,
  Diagram,
  LessonFrame,
  MiniTable,
  StepTextCard,
  SvgNode,
  SvgPacket,
  SvgZone,
  VisualPanel,
  lerp,
  useDiagramColors,
  useStepper,
} from "../../../shared/lessonParts";

type Labels = (typeof FW_LABELS)[Lang];

const WALL_X = 380;
const POS: Record<Exclude<FwNode, "fw">, [number, number]> = {
  customer: [110, 72],
  admin: [110, 160],
  stranger: [110, 248],
  web: [650, 72],
  db: [650, 160],
  ssh: [650, 248],
};
const IPS: Record<Exclude<FwNode, "fw">, string> = {
  customer: "198.51.100.20",
  admin: "192.0.2.5",
  stranger: "203.0.113.66",
  web: "10.0.0.10 :443",
  db: "10.0.0.20 :5432",
  ssh: "10.0.0.30 :22",
};
const ICONS: Record<Exclude<FwNode, "fw">, string> = {
  customer: "🧑‍💻",
  admin: "🏢",
  stranger: "👾",
  web: "🌐",
  db: "🗄️",
  ssh: "🖥️",
};

function FwDiagram({ step, l }: { step: FwStep; l: Labels }) {
  const c = useDiagramColors();
  const p = step.packet;
  const from = p && p.from !== "fw" ? POS[p.from] : undefined;
  const to = p && p.to !== "fw" ? POS[p.to] : undefined;

  // point where the straight path crosses the wall
  const cross = from && to ? lerp(from, to, (WALL_X - from[0]) / (to[0] - from[0])) : undefined;
  let at: [number, number] = [WALL_X, 160];
  if (from && to && cross) {
    if (p!.stage === "blocked") at = [WALL_X - 34, cross[1]];
    else if (p!.stage === "approach") at = lerp(from, cross, 0.6);
    else at = lerp(cross, to, 0.4);
  }
  const color = step.verdict === "deny" ? c.error : step.verdict === "state" ? c.info : c.success;
  const verdictText =
    step.verdict === "deny"
      ? `⛔ ${l.denied} · rule ${(step.match ?? 0) + 1}`
      : step.verdict === "allow"
        ? `✅ ${l.allowed} · rule ${(step.match ?? 0) + 1}`
        : step.verdict === "state"
          ? `🔁 ${l.state}`
          : "";

  const nodeOn = (n: FwNode) => !p || p.from === n || p.to === n;

  return (
    <Diagram width={760} height={300} label={`${l.internet} → ${l.firewall} → ${l.inside}`}>
      <SvgZone x={8} y={8} w={296} h={274} label={`🌍 ${l.internet}`} c={c} />
      <SvgZone x={456} y={8} w={296} h={274} label={`🏢 ${l.inside} · 10.0.0.0/24`} color={c.primary} c={c} />

      {/* the path of the current packet */}
      {from && to && cross && (
        <g className="lp-fade">
          <line x1={from[0]} y1={from[1]} x2={cross[0]} y2={cross[1]} stroke={color} strokeWidth={2.6} />
          {p!.stage === "delivered" && <line x1={cross[0]} y1={cross[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth={2.6} />}
          {p!.stage === "blocked" && <line x1={cross[0]} y1={cross[1]} x2={to[0]} y2={to[1]} stroke={c.line} strokeWidth={1.5} strokeDasharray="4 6" />}
        </g>
      )}

      {/* wall */}
      <g>
        <rect x={WALL_X - 22} y={40} width={44} height={240} rx={8} fill={c.paper} stroke={c.warn} strokeWidth={2.2} />
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={WALL_X - 22} y1={64 + i * 22} x2={WALL_X + 22} y2={64 + i * 22} stroke={c.warn} strokeWidth={1} opacity={0.5} />
        ))}
        <text x={WALL_X} y={32} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={c.warn}>
          🧱 {l.firewall}
        </text>
      </g>

      {(Object.keys(POS) as (keyof typeof POS)[]).map((n) => (
        <SvgNode
          key={n}
          x={POS[n][0]}
          y={POS[n][1]}
          w={170}
          h={58}
          icon={ICONS[n]}
          title={l[n]}
          lines={[{ text: IPS[n], mono: true }]}
          active={nodeOn(n)}
          dim={!nodeOn(n)}
          color={p && (p.from === n || p.to === n) ? color : undefined}
          c={c}
        />
      ))}

      {verdictText && (
        <g className="lp-fade">
          <text x={WALL_X} y={296} textAnchor="middle" fontSize={12} fontWeight={800} fill={color}>
            {verdictText}
          </text>
        </g>
      )}

      <SvgPacket
        at={at}
        visible={!!p}
        label={p?.label}
        emoji={p?.stage === "blocked" ? "⛔" : p?.reply ? "↩️" : "📦"}
        color={color}
        arrow={p && to && from && to[0] < from[0] ? "←" : "→"}
        c={c}
      />
    </Diagram>
  );
}

export default function Firewall({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(FW_STEPS.length);
  const l = FW_LABELS[lang];
  const step = FW_STEPS[stepIndex];
  const content = step[lang];

  const rows = FW_RULES.map((r, i) => [...r, FW_RULE_NOTES[lang][i]]);

  const visual = (
    <VisualPanel>
      {step.scene === "cards" ? (
        content.cards && <CardGrid cards={content.cards} />
      ) : (
        <>
          <FwDiagram step={step} l={l} />
          <MiniTable
            title={l.rules}
            columns={[l.colN, l.colAction, l.colProto, l.colSrc, l.colDst, l.colPort, l.colNote]}
            rows={rows}
            minWidth={720}
            template="34px 64px 50px minmax(120px, 1.2fr) minmax(120px, 1.2fr) 62px minmax(150px, 1.5fr)"
            rowTone={(i) =>
              step.match === i
                ? step.verdict === "deny"
                  ? "bad"
                  : "new"
                : step.verdict === "state" || (step.match !== undefined && i > step.match)
                  ? "muted"
                  : "normal"
            }
          />
          {step.conns && (
            <MiniTable
              title={l.conns}
              hint={l.connsHint}
              columns={[l.colConnSrc, l.colConnDst, l.colConnState]}
              rows={step.conns}
              minWidth={460}
              rowTone={(i) => (step.connHot === i ? "active" : "normal")}
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
      total={FW_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => FW_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} terminal={step.terminal} />
    </LessonFrame>
  );
}
