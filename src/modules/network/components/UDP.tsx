import type { Lang } from "../../../i18n";
import { COMPARE_ROWS, UDP_LABELS, UDP_STEPS, type LaneState } from "../data/UDP";
import {
  CardGrid,
  Diagram,
  LessonFrame,
  MiniTable,
  StepTextCard,
  VisualPanel,
  useDiagramColors,
  useStepper,
  type DiagramColors,
} from "../../../shared/lessonParts";
import { MONO } from "../../../shared/lessonKit";

type Labels = (typeof UDP_LABELS)[Lang];

const PATH_X0 = 135;
const PATH_X1 = 470;
const SLOT_X = 505;
const SLOT_W = 44;

function Lane({
  y,
  name,
  lane,
  color,
  lang,
  l,
  c,
}: {
  y: number;
  name: string;
  lane: LaneState;
  color: string;
  lang: Lang;
  l: Labels;
  c: DiagramColors;
}) {
  const mid = y + 62;
  return (
    <g>
      <rect x={8} y={y} width={744} height={150} rx={16} fill="none" stroke={c.line} strokeDasharray="6 5" />
      <rect x={20} y={y + 12} width={56} height={22} rx={11} fill={color} />
      <text x={48} y={y + 27} textAnchor="middle" fontSize={12} fontWeight={800} fill={c.paper}>
        {name}
      </text>

      {/* sender */}
      <rect x={20} y={mid - 22} width={100} height={44} rx={10} fill={c.paper} stroke={color} strokeWidth={1.8} />
      <text x={70} y={mid + 5} textAnchor="middle" fontSize={12} fontWeight={800} fill={c.text}>
        📤 {l.sender}
      </text>

      {/* path */}
      <line x1={PATH_X0} y1={mid} x2={PATH_X1 + 20} y2={mid} stroke={c.line} strokeWidth={2} strokeDasharray="3 6" />

      {lane.handshake && (
        <g className="lp-pulse">
          <text x={(PATH_X0 + PATH_X1) / 2 + 10} y={mid - 8} textAnchor="middle" fontSize={12} fontWeight={800} fill={color} fontFamily={MONO}>
            SYN → ← SYN-ACK → ACK
          </text>
        </g>
      )}

      {lane.inFlight.map((p) => {
        const x = PATH_X0 + p.x * (PATH_X1 - PATH_X0);
        const py = p.lost ? mid + 18 : mid;
        const col = p.lost ? c.error : p.retry ? c.warn : color;
        return (
          <g key={`${p.n}-${p.retry ? "r" : ""}`} className="lp-move" style={{ transform: `translate(${x}px, ${py}px)` }}>
            <rect x={-15} y={-15} width={30} height={30} rx={7} fill={c.paper} stroke={col} strokeWidth={2.2} strokeDasharray={p.lost ? "4 3" : undefined} />
            <text y={5} textAnchor="middle" fontSize={13} fontWeight={800} fill={col} fontFamily={MONO}>
              {p.n}
            </text>
            {p.lost && (
              <text y={32} textAnchor="middle" fontSize={11} fontWeight={800} fill={c.error}>
                ✗ {l.lost}
              </text>
            )}
            {p.retry && (
              <text y={-22} textAnchor="middle" fontSize={11} fontWeight={800} fill={c.warn}>
                ↻ resend
              </text>
            )}
          </g>
        );
      })}

      {/* receiving app */}
      <text x={SLOT_X} y={y + 27} fontSize={11.5} fontWeight={700} fill={c.muted}>
        📥 {l.app}
      </text>
      {lane.delivered.map((v, i) => (
        <g key={i} className="lp-fade">
          <rect
            x={SLOT_X + i * (SLOT_W + 4)}
            y={mid - 20}
            width={SLOT_W}
            height={40}
            rx={8}
            fill={v === null ? c.paper : c.tint}
            stroke={v === null ? c.line : color}
            strokeWidth={1.8}
            strokeDasharray={v === null ? "4 4" : undefined}
          />
          <text x={SLOT_X + i * (SLOT_W + 4) + SLOT_W / 2} y={mid + 6} textAnchor="middle" fontSize={15} fontWeight={800} fill={v === null ? c.muted : c.text} fontFamily={MONO}>
            {v ?? "·"}
          </text>
        </g>
      ))}
      {lane.buffered && lane.buffered.length > 0 && (
        <g>
          <text x={SLOT_X} y={mid + 40} fontSize={11} fontWeight={700} fill={c.warn}>
            ⏸ {l.buffered}: {lane.buffered.join(", ")}
          </text>
        </g>
      )}

      <text x={20} y={y + 138} fontSize={12} fontWeight={600} fill={c.text}>
        {lane.note[lang]}
      </text>
    </g>
  );
}

export default function UDP({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(UDP_STEPS.length);
  const c = useDiagramColors();
  const l = UDP_LABELS[lang];
  const step = UDP_STEPS[stepIndex];
  const content = step[lang];

  const visual = (
    <VisualPanel>
      {step.scene === "cards" && content.cards && <CardGrid cards={content.cards} />}
      {step.scene === "lanes" && step.tcp && step.udp && (
        <Diagram width={760} height={320} label="TCP lane and UDP lane">
          <Lane y={8} name="TCP" lane={step.tcp} color={c.primary} lang={lang} l={l} c={c} />
          <Lane y={166} name="UDP" lane={step.udp} color={c.secondary} lang={lang} l={l} c={c} />
        </Diagram>
      )}
      {step.scene === "table" && (
        <MiniTable
          title={l.compare}
          columns={[l.colFeature, "TCP", "UDP"]}
          rows={COMPARE_ROWS.map((r) => r[lang])}
          minWidth={560}
        />
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
      total={UDP_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => UDP_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} terminal={step.terminal} />
    </LessonFrame>
  );
}
