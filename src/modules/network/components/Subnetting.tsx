import { useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";

import type { Lang } from "../../../i18n";
import { SUBNETTING_LABELS, SUBNETTING_STEPS, type StripBlock, type SubnettingStep } from "../data/Subnetting";
import {
  BigIdea,
  CardGrid,
  Diagram,
  KeyValueList,
  LessonFrame,
  MiniTable,
  StepTextCard,
  VisualPanel,
  useDiagramColors,
  useStepper,
  type DiagramColors,
} from "../../../shared/lessonParts";
import { MONO } from "../../../shared/lessonKit";

type Labels = (typeof SUBNETTING_LABELS)[Lang];

/* ---------- math helpers (all inside 192.168.1.0/24) ---------- */

const NET_BITS = "110000001010100000000001".split(""); // 192.168.1
const maskOctet = (prefix: number) => (prefix >= 32 ? 255 : 256 - 2 ** (32 - prefix)) & 255;
const blockSize = (prefix: number) => 2 ** (32 - prefix);
const subnetCount = (prefix: number) => 2 ** (prefix - 24);
const usableHosts = (prefix: number) => Math.max(0, blockSize(prefix) - 2);
const ip = (last: number) => `192.168.1.${last}`;

function equalBlocks(prefix: number): StripBlock[] {
  const size = blockSize(prefix);
  return Array.from({ length: subnetCount(prefix) }, (_, i) => ({ start: i * size, size, label: `.${i * size}/${prefix}` }));
}

/* ---------- 32-bit bar ---------- */

function BitBar({ prefix, pulse, c, l }: { prefix: number; pulse: boolean; c: DiagramColors; l: Labels }) {
  const cell = 19;
  const gap = 12;
  const x0 = 40;
  const xOf = (i: number) => x0 + i * cell + Math.floor(i / 8) * gap;
  const kind = (i: number) => (i < 24 ? "net" : i < prefix ? "sub" : "host");
  const color = { net: c.primary, sub: c.warn, host: c.success };

  const bracket = (from: number, to: number, text: string, col: string, row: number) => {
    if (to <= from) return null;
    const a = xOf(from);
    const b = xOf(to - 1) + cell;
    const y = 96 + row * 26;
    return (
      <g className="lp-fade">
        <path d={`M${a} ${y - 8} V${y} H${b} V${y - 8}`} fill="none" stroke={col} strokeWidth={1.8} />
        <text x={(a + b) / 2} y={y + 15} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={col}>
          {text}
        </text>
      </g>
    );
  };

  return (
    <Diagram width={740} height={160} label={l.bitsTitle}>
      {["192", "168", "1", "0"].map((o, k) => (
        <text key={o + k} x={xOf(k * 8) + 4 * cell} y={20} textAnchor="middle" fontSize={13} fontWeight={800} fill={c.text} fontFamily={MONO}>
          {o}
        </text>
      ))}
      {Array.from({ length: 32 }, (_, i) => {
        const k = kind(i);
        const bit = i < 24 ? NET_BITS[i] : "0";
        return (
          <g key={i} className={k === "sub" && pulse ? "lp-pulse" : undefined}>
            <rect
              className="lp-fade"
              x={xOf(i)}
              y={34}
              width={cell - 3}
              height={34}
              rx={5}
              fill={color[k]}
              opacity={k === "net" ? 0.85 : 0.95}
            />
            <text x={xOf(i) + (cell - 3) / 2} y={56} textAnchor="middle" fontSize={12} fontWeight={800} fill={c.paper} fontFamily={MONO}>
              {bit}
            </text>
          </g>
        );
      })}
      {bracket(0, 24, `${l.network} · 24`, c.primary, 0)}
      {bracket(24, prefix, `${l.subnet} · ${prefix - 24}`, c.warn, 1)}
      {bracket(prefix, 32, `${l.host} · ${32 - prefix}`, c.success, 0)}
    </Diagram>
  );
}

/* ---------- 0–255 strip ---------- */

function Strip({
  blocks,
  highlight,
  probe,
  c,
  l,
}: {
  blocks: StripBlock[];
  highlight?: number;
  probe?: number;
  c: DiagramColors;
  l: Labels;
}) {
  const x0 = 30;
  const w = 680;
  const px = (n: number) => x0 + (n / 256) * w;
  const fills = [c.primary, c.secondary, c.info, c.warn];
  const showLabels = blocks.length <= 8;

  return (
    <Diagram width={740} height={120} label={l.stripTitle}>
      <rect x={x0} y={30} width={w} height={44} rx={8} fill="none" stroke={c.line} strokeDasharray="5 4" />
      {blocks.map((b, i) => {
        const on = highlight === i;
        const bw = Math.max(1, px(b.start + b.size) - px(b.start));
        return (
          <g key={`${b.start}-${b.size}`} className="lp-fade">
            <rect
              x={px(b.start) + 1}
              y={30}
              width={bw - 2}
              height={44}
              rx={blocks.length > 16 ? 1 : 7}
              fill={fills[i % fills.length]}
              opacity={highlight === undefined ? 0.75 : on ? 1 : 0.28}
              stroke={on ? c.text : "none"}
              strokeWidth={on ? 2 : 0}
            />
            {showLabels && bw > 44 && (
              <text x={px(b.start) + bw / 2} y={57} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={c.paper}>
                {b.label}
              </text>
            )}
            {showLabels && (
              <text x={px(b.start)} y={92} textAnchor="middle" fontSize={11} fontWeight={700} fill={c.muted} fontFamily={MONO}>
                {b.start}
              </text>
            )}
          </g>
        );
      })}
      <text x={px(256)} y={92} textAnchor="middle" fontSize={11} fontWeight={700} fill={c.muted} fontFamily={MONO}>
        255
      </text>
      {probe !== undefined && (
        <g className="lp-move" style={{ transform: `translate(${px(probe + 0.5)}px, 0px)` }}>
          <path d="M0 26 L-7 14 H7 Z" fill={c.text} />
          <text y={10} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={c.text} fontFamily={MONO}>
            .{probe}
          </text>
        </g>
      )}
    </Diagram>
  );
}

/* ---------- main ---------- */

const PREFIXES = [24, 25, 26, 27, 28, 29, 30];
const PROBES = [10, 70, 130, 200, 250];

export default function Subnetting({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(SUBNETTING_STEPS.length);
  const [tryPrefix, setTryPrefix] = useState(26);
  const [tryProbe, setTryProbe] = useState(130);

  const c = useDiagramColors();
  const l = SUBNETTING_LABELS[lang];
  const step: SubnettingStep = SUBNETTING_STEPS[stepIndex];
  const content = step[lang];

  const playground = step.scene === "playground";
  const prefix = playground ? tryPrefix : step.prefix;
  const probe = playground ? tryProbe : step.probe;
  const blocks = step.blocks ?? equalBlocks(prefix);
  const size = blockSize(prefix);
  const highlight = probe !== undefined && !step.blocks ? Math.floor(probe / size) : step.highlight;

  const rows = blocks.map((b, i) => [
    `#${i + 1}`,
    ip(b.start),
    b.size > 2 ? ip(b.start + 1) : "—",
    b.size > 2 ? ip(b.start + b.size - 2) : "—",
    ip(b.start + b.size - 1),
  ]);

  const visual = (
    <VisualPanel>
      {step.scene === "problem" ? (
        <>
          <BigIdea icons="🏫 💻 📱 🖨️ 📷 🖥️" big="192.168.1.0/24" caption="250 devices · 1 network" />
          {content.cards && <CardGrid cards={content.cards} />}
        </>
      ) : (
        <>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
              {l.bitsTitle}
            </Typography>
            <BitBar prefix={step.scene === "vlsm" ? 24 : prefix} pulse={!!step.pulseBorrowed} c={c} l={l} />
          </Box>

          <Box>
            <Typography variant="subtitle1">{l.stripTitle}</Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
              {l.stripHint}
            </Typography>
            <Strip blocks={blocks} highlight={highlight} probe={probe} c={c} l={l} />
          </Box>

          {playground && (
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" gap={0.6} flexWrap="wrap">
                <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
                  {l.tryPrefix}
                </Typography>
                {PREFIXES.map((p) => (
                  <Chip
                    key={p}
                    size="small"
                    clickable
                    label={`/${p}`}
                    color={p === tryPrefix ? "primary" : "default"}
                    variant={p === tryPrefix ? "filled" : "outlined"}
                    onClick={() => setTryPrefix(p)}
                    sx={{ fontFamily: MONO, fontWeight: 800 }}
                  />
                ))}
              </Stack>
              <Stack direction="row" alignItems="center" gap={0.6} flexWrap="wrap">
                <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
                  {l.tryIp}
                </Typography>
                {PROBES.map((p) => (
                  <Chip
                    key={p}
                    size="small"
                    clickable
                    label={`.${p}`}
                    color={p === tryProbe ? "primary" : "default"}
                    variant={p === tryProbe ? "filled" : "outlined"}
                    onClick={() => setTryProbe(p)}
                    sx={{ fontFamily: MONO, fontWeight: 800 }}
                  />
                ))}
              </Stack>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {l.probe} {ip(tryProbe)} {l.belongsTo}{" "}
                <Box component="span" sx={{ fontFamily: MONO, color: "primary.main" }}>
                  {ip(Math.floor(tryProbe / size) * size)}/{prefix}
                </Box>
              </Typography>
            </Stack>
          )}

          {step.scene !== "vlsm" && (
            <KeyValueList
              title={l.stats}
              items={[
                { k: l.prefix, v: `/${prefix}` },
                { k: l.mask, v: `255.255.255.${maskOctet(prefix)}`, hot: step.id === "block-size" },
                { k: l.subnets, v: `2^${prefix - 24} = ${subnetCount(prefix)}`, hot: step.id === "formulas" },
                { k: l.hosts, v: `2^${32 - prefix} − 2 = ${usableHosts(prefix)}`, hot: step.id === "formulas" },
                { k: l.block, v: `256 − ${maskOctet(prefix)} = ${size}`, hot: step.id === "block-size" },
              ]}
            />
          )}

          {(step.showRanges || step.scene === "vlsm") &&
            (rows.length <= 8 ? (
              <MiniTable
                title={l.ranges}
                columns={[l.colSubnet, l.colNetwork, l.colFirst, l.colLast, l.colBroadcast]}
                rows={rows}
                minWidth={560}
                rowTone={(i) => (highlight === undefined ? "normal" : i === highlight ? "active" : "muted")}
              />
            ) : (
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {l.tooMany}
              </Typography>
            ))}
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
      total={SUBNETTING_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => SUBNETTING_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} />
    </LessonFrame>
  );
}
