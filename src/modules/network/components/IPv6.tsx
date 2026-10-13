import { Box, Stack, Typography } from "@mui/material";

import type { Lang } from "../../../i18n";
import { V6_ADDR, V6_LABELS, V6_STEPS, type V6Node, type V6Step } from "../data/IPv6";
import {
  CardGrid,
  Diagram,
  KeyValueList,
  LessonFrame,
  StepTextCard,
  SvgLink,
  SvgNode,
  SvgPacket,
  VisualPanel,
  lerp,
  useDiagramColors,
  useStepper,
} from "../../../shared/lessonParts";
import { MONO, RADIUS, labelSx } from "../../../shared/lessonKit";
import { FONT } from "../../../config/design";

type Labels = (typeof V6_LABELS)[Lang];

/* ---------- bit-length comparison ---------- */

function BitCompare({ l }: { l: Labels }) {
  const c = useDiagramColors();
  const row = (y: number, bits: number, label: string, col: string, note: string) => (
    <g>
      <text x={20} y={y + 15} fontSize={13} fontWeight={800} fill={col}>
        {label}
      </text>
      {Array.from({ length: bits }, (_, i) => (
        <rect key={i} x={90 + i * 5.1} y={y} width={4} height={22} rx={1} fill={col} opacity={0.85} />
      ))}
      <text x={90} y={y + 42} fontSize={12} fontWeight={700} fill={c.muted} fontFamily={MONO}>
        {note}
      </text>
    </g>
  );
  return (
    <Diagram width={760} height={170} label={`${l.v4} 32 bits vs ${l.v6} 128 bits`}>
      {row(18, 32, l.v4, c.warn, "32 bits → 2³² ≈ 4 300 000 000")}
      {row(96, 128, l.v6, c.primary, "128 bits → 2¹²⁸ ≈ 340 000 000 000 000 000 000 000 000 000 000 000 000")}
    </Diagram>
  );
}

/* ---------- address groups ---------- */

function AddressView({ step, l }: { step: V6Step; l: Labels }) {
  const addr = V6_ADDR[step.address ?? "doc"];
  const form = step.form ?? "full";
  const groups = form === "full" ? addr.full : addr.noLeading;
  const compressed = form === "compressed";
  // zero run in the doc address = groups 2,3,4
  const hiddenByCompression = (i: number) => compressed && step.address !== "slaac" && i >= 2 && i <= 4;
  const written = compressed ? addr.compressed : groups.join(":");

  return (
    <Stack spacing={1.4}>
      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", alignItems: "stretch" }}>
        {groups.map((g, i) => {
          const hot = step.highlight?.includes(i);
          const hidden = hiddenByCompression(i);
          const net = step.split && i < 4;
          const iface = step.split && i >= 4;
          return (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  minWidth: 64,
                  px: 0.8,
                  py: 0.7,
                  textAlign: "center",
                  borderRadius: RADIUS.inner,
                  border: "1.5px solid",
                  borderStyle: hidden ? "dashed" : "solid",
                  borderColor: hot ? "warning.main" : net ? "primary.main" : iface ? "secondary.main" : "divider",
                  bgcolor: hot || net || iface ? "action.selected" : "background.paper",
                  opacity: hidden ? 0.35 : 1,
                  transition: "all .35s",
                }}
              >
                <Typography sx={{ fontFamily: MONO, fontWeight: 800, fontSize: FONT.lead, textDecoration: hidden ? "line-through" : "none" }}>
                  {g}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", fontSize: FONT.micro }}>
                  {l.group} {i + 1} · {l.bits}
                </Typography>
              </Box>
              {i < 7 && (
                <Typography sx={{ fontFamily: MONO, fontWeight: 800, color: "text.secondary" }} aria-hidden>
                  :
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {step.split && (
        <Box sx={{ display: "flex", gap: 0.6 }}>
          <Box sx={{ flex: 1, textAlign: "center", py: 0.4, borderRadius: RADIUS.pill, bgcolor: "primary.main", color: "primary.contrastText" }}>
            <Typography variant="caption" sx={{ fontWeight: 800 }}>
              {l.network}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, textAlign: "center", py: 0.4, borderRadius: RADIUS.pill, bgcolor: "secondary.main", color: "secondary.contrastText" }}>
            <Typography variant="caption" sx={{ fontWeight: 800 }}>
              {l.iface}
            </Typography>
          </Box>
        </Box>
      )}

      <Box sx={{ p: 1.2, borderRadius: RADIUS.inner, border: "1.5px solid", borderColor: "primary.main", bgcolor: "action.selected" }}>
        <Typography sx={{ ...labelSx, display: "block", mb: 0.3 }}>{l.written}</Typography>
        <Typography sx={{ fontFamily: MONO, fontWeight: 800, fontSize: { xs: FONT.lead, md: FONT.h3 }, color: "primary.main", overflowWrap: "anywhere" }}>
          {written}
          {step.split ? "/64" : ""}
        </Typography>
      </Box>
    </Stack>
  );
}

/* ---------- LAN (SLAAC / NDP) ---------- */

const POS: Record<V6Node, [number, number]> = { router: [380, 60], laptop: [175, 215], pc: [585, 215] };

function LanView({ step, l }: { step: V6Step; l: Labels }) {
  const c = useDiagramColors();
  const p = step.packets?.[0];
  return (
    <Diagram width={760} height={280} label={`${l.router}, ${l.laptop}, ${l.pc}`}>
      <SvgLink a={POS.router} b={POS.laptop} active={!!p && (p.from === "router" || p.to === "router")} c={c} />
      <SvgLink a={POS.router} b={POS.pc} c={c} />
      <SvgLink a={POS.laptop} b={POS.pc} active={!!p && p.from === "laptop" && p.to === "pc"} dashed c={c} />
      <SvgNode x={POS.router[0]} y={POS.router[1]} w={230} h={64} icon="📡" title={l.router} lines={[{ text: "fe80::1 · prefix …:12::/64", mono: true }]} active c={c} />
      <SvgNode x={POS.laptop[0]} y={POS.laptop[1]} w={230} h={64} icon="💻" title={l.laptop} lines={[{ text: "…:3c1a:9f2b:77d0:5e14", mono: true }]} active c={c} />
      <SvgNode x={POS.pc[0]} y={POS.pc[1]} w={230} h={64} icon="🖥️" title={l.pc} lines={[{ text: "2001:db8:abcd:12::20", mono: true }]} active={!!p && p.to === "pc"} c={c} />
      <SvgPacket at={p ? lerp(POS[p.from], POS[p.to], p.t) : POS.router} visible={!!p} label={p?.label} emoji={p?.multicast ? "📣" : "📨"} color={p?.multicast ? c.warn : c.primary} c={c} />
    </Diagram>
  );
}

export default function IPv6({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(V6_STEPS.length);
  const l = V6_LABELS[lang];
  const step = V6_STEPS[stepIndex];
  const content = step[lang];

  const visual = (
    <VisualPanel>
      {step.scene === "big" && <BitCompare l={l} />}
      {step.scene === "address" && <AddressView step={step} l={l} />}
      {step.scene === "cards" && content.cards && <CardGrid cards={content.cards} />}
      {step.scene === "lan" && (
        <>
          <LanView step={step} l={l} />
          {step.laptopAddr && (
            <KeyValueList
              title={l.laptop}
              items={[
                { k: "Link-local", v: step.laptopAddr[0] },
                { k: "Global (SLAAC)", v: step.laptopAddr[1], hot: step.id === "slaac" },
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
      total={V6_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => V6_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} terminal={step.terminal} />
    </LessonFrame>
  );
}
