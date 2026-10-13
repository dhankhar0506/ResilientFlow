import type { Lang } from "../../../i18n";
import { LB_LABELS, LB_STEPS, type LbNode, type LbPacket, type LbStep } from "../data/LoadBalancer";
import {
  CardGrid,
  Diagram,
  LessonFrame,
  MiniTable,
  StepTextCard,
  SvgLink,
  SvgNode,
  SvgPacket,
  VisualPanel,
  lerp,
  useDiagramColors,
  useStepper,
  type DiagramColors,
} from "../../../shared/lessonParts";

type Labels = (typeof LB_LABELS)[Lang];

const POS: Record<LbNode, [number, number]> = {
  u1: [70, 70],
  u2: [70, 160],
  u3: [70, 250],
  edge: [282, 160],
  lb: [465, 160],
  s1: [668, 70],
  s2: [668, 160],
  s3: [668, 250],
};
const USERS = ["u1", "u2", "u3"] as const;
const SERVERS = ["s1", "s2", "s3"] as const;

function packetColor(kind: LbPacket["kind"], c: DiagramColors) {
  switch (kind) {
    case "hit":
      return c.success;
    case "miss":
      return c.warn;
    case "health":
      return c.error;
    case "fail":
      return c.error;
    default:
      return c.primary;
  }
}

function LbDiagram({ step, l }: { step: LbStep; l: Labels }) {
  const c = useDiagramColors();
  const usesPair = (a: LbNode, b: LbNode) => step.packets.find((p) => (p.from === a && p.to === b) || (p.from === b && p.to === a));

  // where users connect to: edge → lb → (or straight to s1 in the problem step)
  const firstHop: LbNode = step.edge ? "edge" : step.lb ? "lb" : "s1";
  const pos = (n: LbNode): [number, number] => (n === "s1" && !step.lb ? [668, 160] : POS[n]);

  const link = (a: LbNode, b: LbNode) => {
    const p = usesPair(a, b);
    return <SvgLink key={`${a}-${b}`} a={pos(a)} b={pos(b)} active={!!p} color={p ? packetColor(p.kind, c) : undefined} c={c} />;
  };

  return (
    <Diagram width={760} height={300} label={`${l.user}s → ${step.edge ? `${l.edge} → ` : ""}${l.lb} → ${l.server}s`}>
      {step.users.map((u) => link(u, firstHop))}
      {step.edge && step.lb && link("edge", "lb")}
      {step.lb && step.servers.map((s) => link("lb", s))}

      {USERS.map((u, i) =>
        step.users.includes(u) ? (
          <SvgNode key={u} x={POS[u][0]} y={POS[u][1]} w={112} h={52} icon="🧑" title={`${l.user} ${i + 1}`} active c={c} />
        ) : null,
      )}

      {step.edge && (
        <SvgNode
          x={POS.edge[0]}
          y={POS.edge[1]}
          w={160}
          h={70}
          icon="⚡"
          title={l.edge}
          lines={[{ text: step.cache === "stored" ? l.cacheStored : l.cacheEmpty, color: step.cache === "stored" ? c.success : c.muted }]}
          active
          color={c.info}
          c={c}
        />
      )}
      {step.lb && (
        <SvgNode x={POS.lb[0]} y={POS.lb[1]} w={150} h={70} icon="⚖️" title={l.lb} lines={[{ text: "203.0.113.80", mono: true }]} active c={c} />
      )}

      {SERVERS.map((s, i) => {
        if (!step.servers.includes(s)) return null;
        const down = step.down?.includes(s);
        const hot = step.hot?.includes(s);
        const load = step.load?.[s];
        const p = pos(s);
        return (
          <SvgNode
            key={s}
            x={p[0]}
            y={p[1]}
            w={156}
            h={62}
            icon={down ? "💀" : "🖥️"}
            title={`${l.server} ${i + 1}`}
            lines={[
              { text: step.lb ? `10.0.0.1${i + 1}:3000` : "203.0.113.80", mono: true, color: down ? c.error : undefined },
              { text: down ? l.down : load ?? "", color: down ? c.error : load?.includes("🔥") ? c.error : c.success },
            ]}
            active={hot || down}
            dim={down}
            color={down ? c.error : load?.includes("🔥") ? c.error : undefined}
            c={c}
          />
        );
      })}

      {["a", "b", "c"].map((id) => {
        const p = step.packets.find((x) => x.id === id);
        const at = p ? lerp(pos(p.from), pos(p.to), p.t) : POS.lb;
        return (
          <SvgPacket
            key={id}
            at={at}
            visible={!!p}
            label={p?.label}
            color={packetColor(p?.kind, c)}
            emoji={p?.kind === "health" ? "🩺" : p?.kind === "hit" ? "⚡" : p?.kind === "fail" ? "⏳" : "📨"}
            c={c}
          />
        );
      })}
    </Diagram>
  );
}

export default function LoadBalancer({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(LB_STEPS.length);
  const l = LB_LABELS[lang];
  const step = LB_STEPS[stepIndex];
  const content = step[lang];

  const visual = (
    <VisualPanel>
      {step.scene === "cards" ? (
        content.cards && <CardGrid cards={content.cards} />
      ) : (
        <>
          <LbDiagram step={step} l={l} />
          {step.log && (
            <MiniTable
              title={l.log}
              columns={[l.colReq, l.colTo, l.colWhy]}
              rows={step.log}
              minWidth={560}
              template="minmax(130px, 1fr) minmax(110px, 0.8fr) minmax(200px, 2fr)"
              rowTone={(i) => (step.logHot === i ? "active" : "normal")}
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
      total={LB_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => LB_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} terminal={step.terminal} />
    </LessonFrame>
  );
}
