import type { Lang } from "../../../i18n";
import { ICMP_LABELS, ICMP_NODES, ICMP_STEPS, type IcmpNode, type IcmpStep } from "../data/ICMP";
import {
  CardGrid,
  Diagram,
  LessonFrame,
  StepTextCard,
  SvgCaption,
  SvgNode,
  SvgPacket,
  Terminal,
  VisualPanel,
  useDiagramColors,
  useStepper,
} from "../../../shared/lessonParts";

type Labels = (typeof ICMP_LABELS)[Lang];

const ORDER: IcmpNode[] = ["pc", "r1", "r2", "r3", "srv"];
const X: Record<IcmpNode, number> = { pc: 82, r1: 231, r2: 380, r3: 529, srv: 678 };
const NODE_Y = 82;
const LANE_Y = 200;

function Chain({ step, l }: { step: IcmpStep; l: Labels }) {
  const c = useDiagramColors();
  const p = step.packet;
  const color = !p
    ? c.primary
    : p.kind === "exceeded"
      ? c.warn
      : p.kind === "reply"
        ? c.success
        : p.kind === "dropped"
          ? c.error
          : c.primary;
  const at: [number, number] = p ? [X[p.from] + (X[p.to] - X[p.from]) * p.t, LANE_Y] : [X.pc, LANE_Y];
  const goingBack = p ? X[p.to] < X[p.from] : false;

  return (
    <Diagram width={760} height={270} label="You → routers → example.com">
      <line x1={X.pc} y1={LANE_Y} x2={X.srv} y2={LANE_Y} stroke={c.line} strokeWidth={2.5} strokeDasharray="2 6" />
      {ORDER.map((n, i) => {
        const node = ICMP_NODES[n];
        const isRouter = n !== "pc" && n !== "srv";
        const replier = step.replier === n;
        return (
          <g key={n}>
            <line x1={X[n]} y1={NODE_Y + 38} x2={X[n]} y2={LANE_Y} stroke={c.line} strokeWidth={1.5} />
            <circle cx={X[n]} cy={LANE_Y} r={5} fill={c.line} />
            <SvgNode
              x={X[n]}
              y={NODE_Y}
              w={138}
              h={74}
              icon={node.icon}
              title={node.name}
              lines={[{ text: node.ip, mono: true }, { text: isRouter ? `${l.hop} ${i}` : " " }]}
              active={replier || n === "pc"}
              color={replier ? (step.packet?.kind === "exceeded" ? c.warn : c.success) : undefined}
              c={c}
            />
            {step.decremented?.includes(n) && <SvgCaption x={X[n] + 8} y={LANE_Y - 14} anchor="start" text={l.ttlMinus} color={c.warn} bold />}
            {replier && <SvgCaption x={X[n]} y={NODE_Y - 44} text={`↩ ${l.answered}`} color={step.packet?.kind === "exceeded" ? c.warn : c.success} bold />}
          </g>
        );
      })}
      <SvgPacket at={at} visible={!!p} label={p?.label} color={color} emoji={p?.kind === "exceeded" ? "⌛" : p?.kind === "reply" ? "📥" : "📤"} arrow={goingBack ? "←" : "→"} c={c} />
    </Diagram>
  );
}

export default function ICMP({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(ICMP_STEPS.length);
  const l = ICMP_LABELS[lang];
  const step = ICMP_STEPS[stepIndex];
  const content = step[lang];

  const visual = (
    <VisualPanel>
      {step.scene === "cards" ? (
        content.cards && <CardGrid cards={content.cards} />
      ) : (
        <>
          <Chain step={step} l={l} />
          {step.output.length > 0 && <Terminal label={l.output} lines={step.output} />}
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
      total={ICMP_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => ICMP_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} terminal={step.terminal} />
    </LessonFrame>
  );
}
