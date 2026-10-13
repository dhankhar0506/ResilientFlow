import { Box } from "@mui/material";

import type { Lang } from "../../../i18n";
import {
  CLIENT_APPS,
  CLIENT_IP,
  PORTS_LABELS,
  PORTS_STEPS,
  SERVER_IP,
  SERVER_SVCS,
  type ClientApp,
  type PortsStep,
  type ServerSvc,
} from "../data/Ports";
import {
  BigIdea,
  CardGrid,
  Diagram,
  LessonFrame,
  MiniTable,
  StepTextCard,
  SvgPacket,
  VisualPanel,
  lerp,
  useDiagramColors,
  useStepper,
  type DiagramColors,
} from "../../../shared/lessonParts";
import { MONO } from "../../../shared/lessonKit";

type Labels = (typeof PORTS_LABELS)[Lang];

const CLIENT_ORDER: ClientApp[] = ["tab1", "tab2", "spotify", "term"];
const SERVER_ORDER: ServerSvc[] = ["https", "http", "ssh", "pg"];
const ROW_Y = (i: number) => 92 + i * 52;
const C_EDGE = 262; // right edge of laptop port badges
const S_EDGE = 498; // left edge of server port badges

const cPoint = (a: ClientApp): [number, number] => [C_EDGE, ROW_Y(CLIENT_ORDER.indexOf(a))];
const sPoint = (s: ServerSvc): [number, number] => [S_EDGE, ROW_Y(SERVER_ORDER.indexOf(s))];

function Host({
  x,
  title,
  ip,
  c,
}: {
  x: number;
  title: string;
  ip: string;
  c: DiagramColors;
}) {
  return (
    <g>
      <rect x={x} y={14} width={250} height={272} rx={16} fill={c.paper} stroke={c.line} strokeWidth={1.5} />
      <text x={x + 16} y={38} fontSize={13} fontWeight={800} fill={c.text}>
        {title}
      </text>
      <text x={x + 234} y={38} textAnchor="end" fontSize={12.5} fontWeight={800} fill={c.primary} fontFamily={MONO}>
        {ip}
      </text>
    </g>
  );
}

function PortsDiagram({ step, l }: { step: PortsStep; l: Labels }) {
  const c = useDiagramColors();

  const tokenAt = (): [number, number] | null => {
    if (!step.token) return null;
    if (step.token === "unknown") return [292, 150];
    const [a, s] = step.conns[step.token.conn];
    const from = cPoint(a);
    const to = sPoint(s);
    return step.token.back ? lerp(to, from, step.token.t) : lerp(from, to, step.token.t);
  };
  const at = tokenAt();
  const tokLabel =
    step.token === "unknown"
      ? `${CLIENT_IP} · ${l.which}`
      : step.token
        ? (() => {
            const [a, s] = step.conns[step.token.conn];
            return step.token.back ? `:${SERVER_SVCS[s].port} → :${CLIENT_APPS[a].port}` : `:${CLIENT_APPS[a].port} → :${SERVER_SVCS[s].port}`;
          })()
        : undefined;

  return (
    <Diagram width={760} height={300} label={`${l.laptop} ${CLIENT_IP} ↔ ${l.server} ${SERVER_IP}`}>
      <Host x={20} title={`💻 ${l.laptop}`} ip={CLIENT_IP} c={c} />
      <Host x={490} title={`🗄️ ${l.server}`} ip={SERVER_IP} c={c} />

      {/* connections */}
      {step.conns.map(([a, s], i) => {
        const hot = step.token !== "unknown" && step.token?.conn === i;
        return (
          <line
            key={`${a}-${s}`}
            className="lp-fade"
            x1={cPoint(a)[0]}
            y1={cPoint(a)[1]}
            x2={sPoint(s)[0]}
            y2={sPoint(s)[1]}
            stroke={hot ? c.primary : c.success}
            strokeWidth={hot ? 3 : 2}
            opacity={hot ? 1 : 0.7}
          />
        );
      })}
      {step.refused && (
        <g className="lp-fade">
          <line
            x1={cPoint(step.refused[0])[0]}
            y1={cPoint(step.refused[0])[1]}
            x2={sPoint(step.refused[1])[0] - 14}
            y2={sPoint(step.refused[1])[1]}
            stroke={c.error}
            strokeWidth={2.5}
            strokeDasharray="6 5"
          />
          <text x={380} y={(cPoint(step.refused[0])[1] + sPoint(step.refused[1])[1]) / 2 - 10} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={c.error}>
            ✗ {l.refused}
          </text>
        </g>
      )}

      {/* client apps */}
      {CLIENT_ORDER.map((a, i) => {
        const on = step.clientOn.includes(a);
        const app = CLIENT_APPS[a];
        const y = ROW_Y(i);
        return (
          <g key={a} className="lp-fade" opacity={on ? 1 : 0.35}>
            <rect x={34} y={y - 19} width={160} height={38} rx={10} fill={on ? c.tint : c.paper} stroke={on ? c.primary : c.line} strokeWidth={1.5} />
            <text x={46} y={y + 4} fontSize={12} fontWeight={700} fill={c.text}>
              {app.icon} {app.name}
            </text>
            <rect x={198} y={y - 13} width={C_EDGE - 198} height={26} rx={8} fill={c.paper} stroke={on ? c.primary : c.line} strokeWidth={1.5} />
            <text x={(198 + C_EDGE) / 2} y={y + 4} textAnchor="middle" fontSize={12} fontWeight={800} fill={on ? c.primary : c.muted} fontFamily={MONO}>
              {step.showClientPorts && on ? `:${app.port}` : ":?"}
            </text>
          </g>
        );
      })}

      {/* server services */}
      {SERVER_ORDER.map((s, i) => {
        const svc = SERVER_SVCS[s];
        const on = step.serverOn.includes(s);
        const localOnly = s === "pg";
        const y = ROW_Y(i);
        const open = on && !localOnly;
        return (
          <g key={s} className="lp-fade" opacity={on ? 1 : 0.35}>
            <rect x={S_EDGE} y={y - 13} width={62} height={26} rx={8} fill={c.paper} stroke={open ? c.success : c.line} strokeWidth={1.5} />
            <text x={S_EDGE + 31} y={y + 4} textAnchor="middle" fontSize={12} fontWeight={800} fill={open ? c.success : c.muted} fontFamily={MONO}>
              :{svc.port}
            </text>
            <rect x={566} y={y - 19} width={160} height={38} rx={10} fill={open ? c.tint : c.paper} stroke={open ? c.success : c.line} strokeWidth={1.5} />
            <text x={578} y={y - 1} fontSize={12} fontWeight={700} fill={c.text}>
              {svc.icon} {svc.name}
            </text>
            <text x={578} y={y + 13} fontSize={10.5} fontWeight={800} fill={open ? c.success : c.muted}>
              {step.listening && on ? (localOnly ? `127.0.0.1 only · ${l.closed}` : l.listen) : ""}
            </text>
          </g>
        );
      })}

      <SvgPacket at={at ?? [380, 150]} visible={!!at} label={tokLabel} color={step.token === "unknown" ? c.warn : c.primary} emoji={step.token === "unknown" ? "❓" : "📦"} c={c} />
    </Diagram>
  );
}

export default function Ports({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(PORTS_STEPS.length);
  const l = PORTS_LABELS[lang];
  const step = PORTS_STEPS[stepIndex];
  const content = step[lang];

  const rows = step.conns.map(([a, s]) => [
    "TCP",
    `${CLIENT_IP}:${CLIENT_APPS[a].port}`,
    `${SERVER_IP}:${SERVER_SVCS[s].port}`,
    "ESTABLISHED",
    CLIENT_APPS[a].name,
  ]);

  const visual = (
    <VisualPanel>
      {step.scene === "ranges" && (
        <>
          <BigIdea big={l.rangesTitle} caption={l.rangesCaption} />
          {content.cards && <CardGrid cards={content.cards} />}
        </>
      )}
      {step.scene === "cards" && content.cards && <CardGrid cards={content.cards} />}
      {step.scene === "diagram" && (
        <>
          <PortsDiagram step={step} l={l} />
          <Box>
            <MiniTable
              title={l.table}
              hint={l.tableHint}
              columns={[l.colProto, l.colLocal, l.colRemote, l.colState, l.colApp]}
              rows={rows}
              emptyText={l.empty}
              minWidth={760}
              rowTone={(i) => (step.token !== "unknown" && step.token?.conn === i ? "active" : "normal")}
            />
          </Box>
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
      total={PORTS_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => PORTS_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} terminal={step.terminal} />
    </LessonFrame>
  );
}
