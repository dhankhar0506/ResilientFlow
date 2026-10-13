/**
 * lessonParts.tsx – extra building blocks used by the newer lessons
 * (Subnetting, DHCP, Switching, VLAN, Ports, TCP, UDP, ICMP, IPv6, TLS, Firewall, Proxy/LB/CDN).
 *
 * Everything here is built on top of lessonKit.tsx + config/design.ts so the
 * new lessons look exactly like the older ones:
 *   - useStepper()        → step index + goTo(), shared by every lesson
 *   - LessonFrame         → header, status chip, step bar, two-column body, sticky nav
 *   - StepTextBody        → the right-hand text card (summary, detail, points, analogy, key term, terminal)
 *   - Diagram + Svg*      → small SVG toolkit (zones, nodes, links, moving packet tokens)
 *   - MiniTable / KeyValueList → small tables shown under a diagram (MAC table, lease table, rules…)
 */
import { useState, type ReactNode } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";

import { UI, type Lang } from "../i18n";
import { FONT, SIZE } from "../config/design";
import {
  Callout,
  LessonBody,
  LessonHeader,
  LessonPage,
  LessonStatus,
  MONO,
  Panel,
  RADIUS,
  StepBar,
  StepCard,
  StepNav,
  insetSx,
  labelSx,
} from "./lessonKit";

/* ───────────────────────── Shared content types ───────────────────────── */

/** Text of one step in one language. */
export interface StepText {
  title: string;
  /** one crisp sentence, shown big */
  summary: string;
  /** plain-language explanation */
  detail: string;
  points?: string[];
  analogy?: string;
  term?: { name: string; meaning: string };
  /** optional "remember this" line */
  remember?: string;
}

/** Labels every new lesson needs for the text card. */
export interface CommonLabels {
  analogy: string;
  keyTerm: string;
  remember: string;
  terminal: string;
}

export const COMMON_LABELS: Record<Lang, CommonLabels> = {
  en: { analogy: "Think of it like", keyTerm: "Key term", remember: "Remember this", terminal: "Try it / what you see" },
  hi: { analogy: "Aise samjho", keyTerm: "Key term", remember: "Yaad rakho", terminal: "Khud try karo / aisa dikhega" },
};

/* ───────────────────────── Stepper ───────────────────────── */

export function useStepper(total: number) {
  const [stepIndex, setStepIndex] = useState(0);
  const last = total - 1;
  const goTo = (i: number) => setStepIndex(Math.min(last, Math.max(0, i)));
  return { stepIndex, last, goTo };
}

/* ───────────────────────── Page frame ───────────────────────── */

export function LessonFrame({
  lang,
  eyebrow,
  title,
  subtitle,
  stepIndex,
  total,
  goTo,
  stepTitle,
  visual,
  children,
}: {
  lang: Lang;
  eyebrow: string;
  title: string;
  subtitle: string;
  stepIndex: number;
  total: number;
  goTo: (i: number) => void;
  stepTitle: (i: number) => string;
  visual: ReactNode;
  children: ReactNode;
}) {
  const t = UI[lang];
  const last = total - 1;
  return (
    <LessonPage>
      <LessonHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <LessonStatus availableLabel={t.available} right={`${t.stepLabel} ${stepIndex + 1} ${t.of} ${total}`} />
      <StepBar total={total} index={stepIndex} onSelect={goTo} label={(i) => `${t.stepLabel} ${i + 1}: ${stepTitle(i)}`} />

      <LessonBody visual={visual}>{children}</LessonBody>

      <StepNav
        index={stepIndex}
        last={last}
        onPrev={() => goTo(stepIndex - 1)}
        onNext={() => goTo(stepIndex + 1)}
        onRestart={() => goTo(0)}
        labels={t}
      />
    </LessonPage>
  );
}

/* ───────────────────────── Right-hand text card ───────────────────────── */

export function StepTextCard({
  lang,
  stepIndex,
  phase,
  content,
  terminal,
  extra,
}: {
  lang: Lang;
  stepIndex: number;
  phase?: string;
  content: StepText;
  /** technical lines (commands / output) – not translated */
  terminal?: string[];
  /** anything lesson-specific shown at the end of the card */
  extra?: ReactNode;
}) {
  const t = UI[lang];
  const l = COMMON_LABELS[lang];
  return (
    <StepCard stepText={`${t.stepLabel} ${stepIndex + 1}`} badge={phase} title={content.title}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {content.summary}
      </Typography>

      <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
        {content.detail}
      </Typography>

      {content.points && (
        <Box component="ul" sx={{ m: 0, mt: 1.2, pl: 2.4, "& li::marker": { color: "primary.main" } }}>
          {content.points.map((pt) => (
            <Typography key={pt} component="li" variant="body1" sx={{ lineHeight: 1.7 }}>
              {pt}
            </Typography>
          ))}
        </Box>
      )}

      <Stack spacing={1.2} sx={{ mt: 1.6 }}>
        {terminal && terminal.length > 0 && <Terminal label={l.terminal} lines={terminal} />}

        {content.analogy && (
          <Callout label={l.analogy} tone="secondary">
            {content.analogy}
          </Callout>
        )}

        {content.term && (
          <Box sx={{ ...insetSx, border: "1.5px dashed", borderColor: "primary.main", bgcolor: "transparent" }}>
            <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
              <strong>
                {l.keyTerm}: {content.term.name}
              </strong>
              {" — "}
              {content.term.meaning}
            </Typography>
          </Box>
        )}

        {content.remember && (
          <Callout label={l.remember} tone="warning">
            <Box component="span" sx={{ fontWeight: 600 }}>
              {content.remember}
            </Box>
          </Callout>
        )}

        {extra}
      </Stack>
    </StepCard>
  );
}

/** Dark terminal-style block, same look as the DNS lesson. */
export function Terminal({ label, lines }: { label?: string; lines: string[] }) {
  return (
    <Box sx={{ p: 1.2, bgcolor: "#0b0d13", borderRadius: RADIUS.inner, overflowX: "auto" }}>
      {label && <Typography sx={{ ...labelSx, color: "#8b93a7", display: "block", mb: 0.6 }}>{label}</Typography>}
      {lines.map((line, i) => (
        <Typography
          key={i}
          component="code"
          variant="body2"
          sx={{
            display: "block",
            color: line.startsWith("#") ? "#8b93a7" : line.startsWith("$") || line.startsWith(">") ? "#fbbf24" : "#5eead4",
            fontFamily: MONO,
            lineHeight: 1.65,
            whiteSpace: "pre",
          }}
        >
          {line || " "}
        </Typography>
      ))}
    </Box>
  );
}

/* ───────────────────────── Panels under the diagram ───────────────────────── */

export function VisualPanel({ title, hint, children }: { title?: string; hint?: string; children: ReactNode }) {
  return (
    <Panel>
      {title && (
        <Typography variant="subtitle1" sx={{ mb: hint ? 0.2 : 1 }}>
          {title}
        </Typography>
      )}
      {hint && (
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1 }}>
          {hint}
        </Typography>
      )}
      <Stack spacing={1.6}>{children}</Stack>
    </Panel>
  );
}

export type CellTone = "normal" | "active" | "new" | "bad" | "muted";

/** Simple grid table. rows[i][j] = cell text. */
export function MiniTable({
  title,
  hint,
  columns,
  rows,
  rowTone,
  emptyText,
  minWidth = 420,
  template,
}: {
  title?: string;
  hint?: string;
  columns: string[];
  rows: string[][];
  rowTone?: (i: number) => CellTone;
  emptyText?: string;
  minWidth?: number;
  /** optional CSS grid-template-columns, e.g. "40px 1fr 2fr" */
  template?: string;
}) {
  const toneSx = (tone: CellTone) => {
    switch (tone) {
      case "active":
        return { borderColor: "primary.main", borderStyle: "solid", bgcolor: "action.selected", opacity: 1 };
      case "new":
        return { borderColor: "success.main", borderStyle: "solid", bgcolor: "action.selected", opacity: 1 };
      case "bad":
        return { borderColor: "error.main", borderStyle: "solid", bgcolor: "background.paper", opacity: 1 };
      case "muted":
        return { borderColor: "divider", borderStyle: "dashed", bgcolor: "background.paper", opacity: 0.45 };
      default:
        return { borderColor: "divider", borderStyle: "dashed", bgcolor: "background.paper", opacity: 0.85 };
    }
  };

  return (
    <Box>
      {title && (
        <Typography variant="body2" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
      )}
      {hint && (
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.8 }}>
          {hint}
        </Typography>
      )}
      {rows.length === 0 ? (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {emptyText}
        </Typography>
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: template ?? `repeat(${columns.length}, minmax(90px, 1fr))`,
              gap: 0.6,
              minWidth,
            }}
          >
            {columns.map((c) => (
              <Typography key={c} variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                {c}
              </Typography>
            ))}
            {rows.map((row, i) =>
              row.map((cell, j) => (
                <Box
                  key={`${i}-${j}`}
                  sx={{
                    py: 0.5,
                    px: 1,
                    borderRadius: RADIUS.inner,
                    border: "1.5px solid",
                    transition: "all .3s",
                    ...toneSx(rowTone?.(i) ?? "normal"),
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: MONO,
                      fontWeight: 700,
                      color: rowTone?.(i) === "bad" ? "error.main" : undefined,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {cell}
                  </Typography>
                </Box>
              )),
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

/** Label → value list, values in mono. Empty values show as "—". */
export function KeyValueList({
  title,
  items,
}: {
  title?: string;
  items: { k: string; v?: string; hot?: boolean }[];
}) {
  return (
    <Box>
      {title && <Typography sx={{ ...labelSx, display: "block", mb: 0.8 }}>{title}</Typography>}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 0.6 }}>
        {items.map((it) => (
          <Box
            key={it.k}
            sx={{
              px: 1.1,
              py: 0.6,
              borderRadius: RADIUS.inner,
              border: "1.5px solid",
              borderColor: it.hot ? "primary.main" : "divider",
              borderStyle: it.v ? "solid" : "dashed",
              bgcolor: it.hot ? "action.selected" : "background.paper",
              transition: "all .3s",
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block" }}>
              {it.k}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: MONO, fontWeight: 800, overflowWrap: "anywhere", opacity: it.v ? 1 : 0.5 }}>
              {it.v ?? "—"}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/** Row of small cards (used for "types of …" steps). */
export function CardGrid({ cards, hot }: { cards: { name: string; text: string; icon?: string }[]; hot?: number[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 1,
        gridTemplateColumns: { xs: "1fr", sm: `repeat(${Math.min(cards.length, 2)}, minmax(0, 1fr))`, xl: `repeat(${Math.min(cards.length, 3)}, minmax(0, 1fr))` },
      }}
    >
      {cards.map((c, i) => {
        const on = hot?.includes(i);
        return (
          <Box
            key={c.name}
            sx={{
              p: 1.25,
              borderRadius: RADIUS.inner,
              border: "1.5px solid",
              borderColor: on ? "primary.main" : "divider",
              bgcolor: on ? "action.selected" : "background.paper",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 800, mb: 0.4 }}>
              {c.icon ? `${c.icon} ` : ""}
              {c.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
              {c.text}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

/* ───────────────────────── SVG diagram toolkit ───────────────────────── */

export function useDiagramColors() {
  const theme = useTheme();
  return {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    warn: theme.palette.warning.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
    line: theme.palette.divider,
    text: theme.palette.text.primary,
    muted: theme.palette.text.secondary,
    paper: theme.palette.background.paper,
    tint: theme.palette.action.selected,
  };
}
export type DiagramColors = ReturnType<typeof useDiagramColors>;

/** Wrapper: responsive SVG that scrolls sideways on small phones. */
export function Diagram({
  width = 760,
  height = 300,
  label,
  children,
}: {
  width?: number;
  height?: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        overflowX: "auto",
        "& .lp-move": { transition: "transform 0.7s ease, opacity 0.35s ease" },
        "& .lp-fade": { transition: "opacity 0.35s ease, stroke 0.3s ease, fill 0.3s ease" },
        "@keyframes lpDash": { to: { strokeDashoffset: 0 } },
        "@keyframes lpPulse": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.45 } },
        "& .lp-draw": { strokeDasharray: 600, strokeDashoffset: 600, animation: "lpDash 0.8s ease forwards" },
        "& .lp-pulse": { animation: "lpPulse 1.4s ease-in-out infinite" },
        "@media (prefers-reduced-motion: reduce)": {
          "& .lp-move, & .lp-fade": { transition: "none !important" },
          "& .lp-draw": { animation: "none", strokeDashoffset: 0 },
          "& .lp-pulse": { animation: "none" },
        },
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
        style={{ width: "100%", minWidth: SIZE.diagramMinWidth, height: "auto", display: "block", fontFamily: "inherit" }}
      >
        {children}
      </svg>
    </Box>
  );
}

/** Dashed rounded zone with a caption (e.g. "Home network"). */
export function SvgZone({
  x,
  y,
  w,
  h,
  label,
  color,
  c,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  color?: string;
  c: DiagramColors;
}) {
  return (
    <g className="lp-fade">
      <rect x={x} y={y} width={w} height={h} rx={18} fill="none" stroke={color ?? c.line} strokeWidth={1.5} strokeDasharray="6 5" />
      {label && (
        <text x={x + 14} y={y + 20} fontSize={12} fontWeight={700} fill={color ?? c.muted}>
          {label}
        </text>
      )}
    </g>
  );
}

/** A device box centred on (x, y). */
export function SvgNode({
  x,
  y,
  w = 120,
  h = 64,
  icon,
  title,
  lines = [],
  active = false,
  dim = false,
  color,
  c,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  icon?: string;
  title: string;
  lines?: { text: string; mono?: boolean; color?: string }[];
  active?: boolean;
  dim?: boolean;
  color?: string;
  c: DiagramColors;
}) {
  const stroke = active ? color ?? c.primary : c.line;
  const top = y - h / 2;
  return (
    <g className="lp-fade" opacity={dim ? 0.4 : 1}>
      {/* opaque underlay so links never show through the (semi-transparent) tint */}
      <rect x={x - w / 2} y={top} width={w} height={h} rx={12} fill={c.paper} />
      <rect
        x={x - w / 2}
        y={top}
        width={w}
        height={h}
        rx={12}
        fill={active ? c.tint : c.paper}
        stroke={stroke}
        strokeWidth={active ? 2.2 : 1.5}
        strokeDasharray={active ? undefined : "5 4"}
      />
      <text x={x} y={top + 20} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={c.text}>
        {icon ? `${icon} ` : ""}
        {title}
      </text>
      {lines.map((ln, i) => (
        <text
          key={i}
          x={x}
          y={top + 37 + i * 15}
          textAnchor="middle"
          fontSize={ln.mono ? 12 : 11}
          fontWeight={ln.mono ? 800 : 500}
          fontFamily={ln.mono ? MONO : undefined}
          fill={ln.color ?? (ln.mono ? c.primary : c.muted)}
        >
          {ln.text}
        </text>
      ))}
    </g>
  );
}

/** Straight link between two points. */
export function SvgLink({
  a,
  b,
  active = false,
  color,
  dashed = false,
  width,
  c,
}: {
  a: [number, number];
  b: [number, number];
  active?: boolean;
  color?: string;
  dashed?: boolean;
  width?: number;
  c: DiagramColors;
}) {
  return (
    <line
      className="lp-fade"
      x1={a[0]}
      y1={a[1]}
      x2={b[0]}
      y2={b[1]}
      stroke={active ? color ?? c.primary : color ?? c.line}
      strokeWidth={width ?? (active ? 2.6 : 1.5)}
      strokeDasharray={dashed ? "5 5" : undefined}
      opacity={active || color ? 1 : 0.9}
    />
  );
}

/** Moving packet. Position changes animate (CSS transition on transform). */
export function SvgPacket({
  at,
  label,
  emoji = "📦",
  color,
  visible = true,
  arrow,
  c,
}: {
  at: [number, number];
  label?: string;
  emoji?: string;
  color?: string;
  visible?: boolean;
  arrow?: "←" | "→" | "↑" | "↓";
  c: DiagramColors;
}) {
  const col = color ?? c.primary;
  return (
    <g className="lp-move" style={{ transform: `translate(${at[0]}px, ${at[1]}px)`, opacity: visible ? 1 : 0 }}>
      <circle r={16} fill={c.paper} stroke={col} strokeWidth={2.5} />
      <text textAnchor="middle" dominantBaseline="central" fontSize={15}>
        {emoji}
      </text>
      {arrow && (
        <text y={-24} textAnchor="middle" fontSize={15} fontWeight={800} fill={col}>
          {arrow}
        </text>
      )}
      {label && (
        <g>
          <rect x={-Math.max(26, label.length * 3.6 + 8)} y={20} width={Math.max(52, label.length * 7.2 + 16)} height={18} rx={9} fill={col} />
          <text y={33} textAnchor="middle" fontSize={11} fontWeight={800} fill={c.paper}>
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

/** Point a fraction t of the way from a to b. */
export const lerp = (a: [number, number], b: [number, number], t = 0.5): [number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];

/** Small caption text under/over a diagram element. */
export function SvgCaption({
  x,
  y,
  text,
  color,
  anchor = "middle",
  size = 11,
  bold = false,
  mono = false,
}: {
  x: number;
  y: number;
  text: string;
  color: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
  bold?: boolean;
  mono?: boolean;
}) {
  return (
    <text
      className="lp-fade"
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={bold ? 800 : 600}
      fontFamily={mono ? MONO : undefined}
      fill={color}
    >
      {text}
    </text>
  );
}

/** Big centred "headline" visual used on intro / problem steps. */
export function BigIdea({ icons, big, caption, note }: { icons?: string; big: string; caption?: string; note?: string }) {
  return (
    <Stack alignItems="center" spacing={0.8} sx={{ py: 2, textAlign: "center" }}>
      {icons && (
        <Typography variant="h2" aria-hidden>
          {icons}
        </Typography>
      )}
      <Typography variant="h1" sx={{ fontFamily: MONO, color: "primary.main", wordBreak: "break-word", fontSize: { xs: FONT.h2, md: FONT.h1 } }}>
        {big}
      </Typography>
      {caption && <Typography variant="subtitle1">{caption}</Typography>}
      {note && (
        <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: SIZE.centerBlockMaxWidth }}>
          {note}
        </Typography>
      )}
    </Stack>
  );
}
