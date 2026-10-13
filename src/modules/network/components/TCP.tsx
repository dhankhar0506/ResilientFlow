import type { Lang } from "../../../i18n";
import { TCP_LABELS, TCP_STEPS, type TcpMsg, type TcpStep } from "../data/TCP";
import {
  CardGrid,
  Diagram,
  KeyValueList,
  LessonFrame,
  StepTextCard,
  VisualPanel,
  useDiagramColors,
  useStepper,
  type DiagramColors,
} from "../../../shared/lessonParts";
import { MONO } from "../../../shared/lessonKit";

type Labels = (typeof TCP_LABELS)[Lang];

const CX = 150; // client lifeline
const SX = 610; // server lifeline
const TOP = 96;
const GAP = 46;
const H = 400;

function Lifeline({ x, title, state, c }: { x: number; title: string; state: string; c: DiagramColors }) {
  const est = state === "ESTABLISHED";
  return (
    <g>
      <rect x={x - 95} y={12} width={190} height={58} rx={12} fill={c.paper} stroke={c.primary} strokeWidth={2} />
      <text x={x} y={34} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={c.text}>
        {title}
      </text>
      <g className="lp-fade">
        <rect x={x - 62} y={42} width={124} height={20} rx={10} fill={est ? c.success : c.warn} opacity={0.9} />
        <text x={x} y={56} textAnchor="middle" fontSize={11} fontWeight={800} fill={c.paper} fontFamily={MONO}>
          {state}
        </text>
      </g>
      <line x1={x} y1={70} x2={x} y2={H - 10} stroke={c.line} strokeWidth={2} strokeDasharray="4 5" />
    </g>
  );
}

function Message({ m, i, last, c, l }: { m: TcpMsg; i: number; last: boolean; c: DiagramColors; l: Labels }) {
  const y1 = TOP + i * GAP;
  if (m.dir === "band") {
    return (
      <g opacity={0.8}>
        <rect x={CX + 10} y={y1 - 6} width={SX - CX - 20} height={30} rx={8} fill={c.tint} stroke={c.line} />
        <text x={(CX + SX) / 2} y={y1 + 13} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={c.muted}>
          <tspan fontWeight={800} fill={c.success}>
            {m.flags}
          </tspan>
          {"  ·  "}
          {m.info}
        </text>
      </g>
    );
  }
  const fromX = m.dir === "C" ? CX : SX;
  const toX = m.dir === "C" ? SX : CX;
  const y2 = y1 + 26;
  const endX = m.lost ? fromX + (toX - fromX) * 0.6 : toX;
  const endY = m.lost ? y1 + 26 * 0.6 : y2;
  const color = m.lost ? c.error : m.retry ? c.warn : last ? c.primary : c.muted;
  const marker = m.lost ? "" : m.retry ? "url(#tcpArrowWarn)" : last ? "url(#tcpArrowHot)" : "url(#tcpArrow)";
  const midX = (fromX + toX) / 2;

  return (
    <g>
      <line
        key={`${i}-${m.flags}-${m.info}`}
        className={last ? "lp-draw" : undefined}
        x1={fromX}
        y1={y1}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={last ? 2.6 : 1.8}
        markerEnd={marker}
        strokeDasharray={m.lost ? "6 5" : undefined}
      />
      <text x={midX} y={y1 + 3} textAnchor="middle" fontSize={12} fontWeight={800} fill={color}>
        <tspan>{m.flags}</tspan>
        <tspan fontFamily={MONO} fontWeight={600} fill={last ? c.text : c.muted} dx={8}>
          {m.info}
        </tspan>
      </text>
      {m.lost && (
        <text x={endX + (toX > fromX ? 8 : -8)} y={endY + 5} textAnchor={toX > fromX ? "start" : "end"} fontSize={13} fontWeight={800} fill={c.error}>
          ✗ {l.lost}
        </text>
      )}
    </g>
  );
}

function SequenceDiagram({ step, l }: { step: TcpStep; l: Labels }) {
  const c = useDiagramColors();
  const lostIndex = step.msgs.findIndex((m) => m.lost);
  return (
    <Diagram width={760} height={H} label={`${l.client} ↔ ${l.server}`}>
      <defs>
        {(
          [
            ["tcpArrow", c.muted],
            ["tcpArrowHot", c.primary],
            ["tcpArrowWarn", c.warn],
          ] as const
        ).map(([id, col]) => (
          <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill={col} />
          </marker>
        ))}
      </defs>
      <Lifeline x={CX} title={`💻 ${l.client}`} state={step.clientState} c={c} />
      <Lifeline x={SX} title={`🗄️ ${l.server}`} state={step.serverState} c={c} />
      <text x={30} y={TOP + 6} fontSize={11} fontWeight={700} fill={c.muted}>
        {l.time}
      </text>

      {step.msgs.map((m, i) => (
        <Message key={`${step.id}-${i}`} m={m} i={i} last={i === step.msgs.length - 1} c={c} l={l} />
      ))}

      {step.timer && lostIndex >= 0 && (
        <g className="lp-pulse">
          <text x={CX - 18} y={TOP + lostIndex * GAP + 40} textAnchor="end" fontSize={13} fontWeight={800} fill={c.warn}>
            ⏱️ {l.timeout}
          </text>
        </g>
      )}
    </Diagram>
  );
}

export default function TCP({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(TCP_STEPS.length);
  const l = TCP_LABELS[lang];
  const step = TCP_STEPS[stepIndex];
  const content = step[lang];

  const visual = (
    <VisualPanel>
      {step.scene === "cards" ? (
        content.cards && <CardGrid cards={content.cards} />
      ) : (
        <>
          <SequenceDiagram step={step} l={l} />
          {step.segment && (
            <KeyValueList
              title={l.segment}
              items={[
                { k: l.flags, v: step.segment.flags, hot: true },
                { k: l.seq, v: step.segment.seq },
                { k: l.ack, v: step.segment.ack },
                { k: l.len, v: step.segment.len },
                { k: l.meaning, v: step.segment.meaning },
              ]}
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
      total={TCP_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => TCP_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} terminal={step.terminal} />
    </LessonFrame>
  );
}
