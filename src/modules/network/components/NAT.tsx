import { useState } from "react";
import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";

import { UI, type Lang } from "../../../i18n";
import { NAT_LABELS, NAT_STEPS, type NatStep } from "../data/NAT";
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
  nodeSx,
} from "../../../shared/lessonKit";
import { SIZE } from "../../../config/design";

type Labels = (typeof NAT_LABELS)[Lang];

function isPrivateIp(addr: string) {
  const ip = addr.split(":")[0];
  const [a, b] = ip.split(".").map(Number);
  return a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
}

/* ---------- Diagram ---------- */

function tokenPosition(step: NatStep): [number, number] {
  const p = step.packet;
  if (!p) return [375, 192];
  switch (p.at) {
    case "lan":
      return p.device === "A" ? [223, 124] : [223, 168];
    case "router":
      return [375, 192];
    case "wan":
      return [490, 155];
    case "dns":
      return [625, 192];
  }
}

function NatDiagram({ step, l }: { step: NatStep; l: Labels }) {
  const theme = useTheme();
  const c = {
    primary: theme.palette.primary.main,
    warn: theme.palette.warning.main,
    line: theme.palette.divider,
    text: theme.palette.text.primary,
    muted: theme.palette.text.secondary,
    paper: theme.palette.background.paper,
    tint: theme.palette.action.selected,
  };

  const on = (n: "private" | "router" | "internet") => step.activeNodes.includes(n);
  const deviceOn = (d: "A" | "C") => on("private") && (step.activeDevices.length === 0 || step.activeDevices.includes(d));

  const box = (active: boolean) => ({
    fill: active ? c.tint : c.paper,
    stroke: active ? c.primary : c.line,
    strokeWidth: active ? 2 : 1.5,
    strokeDasharray: active ? undefined : "5 4",
    opacity: active ? 1 : 0.7,
  });

  const [tx, ty] = tokenPosition(step);
  const p = step.packet;
  const tokenColor = p && isPrivateIp(p.src) ? c.warn : c.primary;
  const lanActive = on("private") && on("router");
  const wanActive = on("router") && on("internet");

  const device = (d: "A" | "C", y: number, ip: string) => (
    <g key={d} opacity={deviceOn(d) ? 1 : 0.45}>
      <rect x={24} y={y} width={122} height={62} rx={12} {...box(deviceOn(d))} />
      <text x={36} y={y + 20} fontSize={12} fontWeight={700} fill={c.text}>
        💻 {l.laptop} {d}
      </text>
      <text x={36} y={y + 38} fontSize={13} fontWeight={800} fill={c.warn} fontFamily={MONO}>
        {ip}
      </text>
      <text x={36} y={y + 53} fontSize={11} fill={c.muted}>
        {l.app} :3000
      </text>
    </g>
  );

  return (
    <Box
      sx={{
        overflowX: "auto",
        "@media (prefers-reduced-motion: reduce)": { "& .nat-token": { transition: "none !important" } },
      }}
    >
      <svg
        viewBox="0 0 760 280"
        role="img"
        aria-label={`${l.homeNetwork} → ${l.router} → ${l.internetPublic}`}
        style={{ width: "100%", minWidth: 560, height: "auto", display: "block", fontFamily: "inherit" }}
      >
        {/* Zones */}
        <rect
          x={8}
          y={18}
          width={256}
          height={244}
          rx={18}
          fill="none"
          stroke={on("private") ? c.warn : c.line}
          strokeWidth={1.5}
          strokeDasharray="6 5"
        />
        <text x={22} y={42} fontSize={12} fontWeight={700} fill={c.muted}>
          {l.homeNetwork}
        </text>
        <rect
          x={496}
          y={18}
          width={256}
          height={244}
          rx={18}
          fill="none"
          stroke={on("internet") ? c.primary : c.line}
          strokeWidth={1.5}
          strokeDasharray="6 5"
        />
        <text x={510} y={42} fontSize={12} fontWeight={700} fill={c.muted}>
          🌍 {l.internetPublic}
        </text>

        {/* Links */}
        <g stroke={lanActive ? c.primary : c.line} strokeWidth={lanActive ? 2.5 : 1.5}>
          <line x1={146} y1={93} x2={300} y2={155} />
          <line x1={146} y1={181} x2={300} y2={155} />
        </g>
        <line x1={450} y1={155} x2={530} y2={155} stroke={wanActive ? c.primary : c.line} strokeWidth={wanActive ? 2.5 : 1.5} />

        {/* Devices */}
        {device("A", 62, "10.0.0.1")}
        {device("C", 150, "10.0.0.4")}

        {/* Router */}
        <rect x={300} y={100} width={150} height={110} rx={16} {...box(on("router"))} />
        <text x={375} y={124} textAnchor="middle" fontSize={13} fontWeight={800} fill={c.text}>
          📡 {l.router}
        </text>
        <text x={375} y={143} textAnchor="middle" fontSize={11} fill={c.muted}>
          {l.publicIp}
        </text>
        <text x={375} y={161} textAnchor="middle" fontSize={14} fontWeight={800} fill={c.primary} fontFamily={MONO}>
          2.3.4.5
        </text>

        {/* DNS */}
        <rect x={530} y={100} width={190} height={110} rx={16} {...box(on("internet"))} />
        <text x={625} y={124} textAnchor="middle" fontSize={13} fontWeight={800} fill={c.text}>
          🖥️ {l.dnsName}
        </text>
        <text x={625} y={145} textAnchor="middle" fontSize={14} fontWeight={800} fill={c.primary} fontFamily={MONO}>
          8.8.8.8
        </text>
        <text x={625} y={161} textAnchor="middle" fontSize={11} fill={c.muted}>
          {l.dnsApp} :53
        </text>

        {/* Moving packet */}
        <g
          className="nat-token"
          style={{
            transform: `translate(${tx}px, ${ty}px)`,
            transition: "transform 0.7s ease, opacity 0.3s ease",
            opacity: p ? 1 : 0,
          }}
        >
          <circle r={17} fill={c.paper} stroke={tokenColor} strokeWidth={2.5} />
          <text textAnchor="middle" dominantBaseline="central" fontSize={16}>
            📦
          </text>
          <text y={-26} textAnchor="middle" fontSize={16} fontWeight={800} fill={tokenColor}>
            {p?.direction === "in" ? "←" : "→"}
          </text>
        </g>
      </svg>
    </Box>
  );
}

/* ---------- Packet fields ---------- */

function PacketField({ label, value, rewritten, was, l }: { label: string; value: string; rewritten: boolean; was?: string; l: Labels }) {
  const priv = isPrivateIp(value);
  return (
    <Box
      sx={{
        ...nodeSx(rewritten ? "primary.main" : "divider", rewritten ? "action.selected" : "background.paper"),
        textAlign: "left",
        flex: "1 1 200px",
        px: 1.2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
          {label}
        </Typography>
        <Chip size="small" label={priv ? l.private : l.public} color={priv ? "warning" : "success"} variant="outlined" />
      </Stack>
      <Typography variant="body1" sx={{ fontFamily: MONO, fontWeight: 800 }}>
        {value}
      </Typography>
      {rewritten && (
        <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>
          {l.rewritten}
          {was ? ` · ${l.was} ${was}` : ""}
        </Typography>
      )}
    </Box>
  );
}

/* ---------- Main component ---------- */

export default function Nat({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);

  const t = UI[lang];
  const l = NAT_LABELS[lang];
  const step = NAT_STEPS[stepIndex];
  const content = step[lang];
  const last = NAT_STEPS.length - 1;
  const goTo = (i: number) => setStepIndex(Math.min(last, Math.max(0, i)));

  const tableColumns = [
    { key: "insidePrivate", label: l.insidePrivate },
    { key: "insidePublic", label: l.insidePublic },
    { key: "outsidePublic", label: l.outsidePublic },
  ] as const;

  return (
    <LessonPage>
      <LessonHeader eyebrow={l.lessonTitle} title={l.heroTitle} subtitle={l.heroSubtitle} />
      <LessonStatus availableLabel={t.available} right={`${t.stepLabel} ${stepIndex + 1} ${t.of} ${NAT_STEPS.length}`} />
      <StepBar
        total={NAT_STEPS.length}
        index={stepIndex}
        onSelect={goTo}
        label={(i) => `${t.stepLabel} ${i + 1}: ${NAT_STEPS[i][lang].title}`}
      />

      <LessonBody
        visual={
          <Panel>
            {step.scene === "problem" && (
              <Stack alignItems="center" spacing={0.8} sx={{ py: 2, textAlign: "center" }}>
                <Typography variant="h2" aria-hidden>
                  💻 📱 🖥️ 🖨️ 📺 📷 ⌚
                </Typography>
                <Typography variant="h1" sx={{ fontFamily: MONO, color: "primary.main", wordBreak: "break-word" }}>
                  {l.problemBig}
                </Typography>
                <Typography variant="subtitle1">{l.problemCaption}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: SIZE.centerBlockMaxWidth }}>
                  {l.problemNote}
                </Typography>
              </Stack>
            )}

            {step.scene === "cards" && content.cards && (
              <Box
                sx={{
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: { xs: "1fr", sm: `repeat(${content.cards.length}, 1fr)` },
                }}
              >
                {content.cards.map((card, i) => {
                  const hot = step.id === "types" && i === 2;
                  return (
                    <Box
                      key={card.name}
                      sx={{
                        ...nodeSx(hot ? "primary.main" : "divider", hot ? "action.selected" : "background.paper"),
                        textAlign: "left",
                        p: 1.25,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: step.id === "types" ? undefined : MONO, mb: 0.4 }}>
                        {card.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                        {card.text}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            )}

            {step.scene === "diagram" && (
              <>
                <NatDiagram step={step} l={l} />

                {step.packet && (
                  <Box sx={{ mt: 1.6 }}>
                    <Typography sx={{ ...labelSx, display: "block", mb: 0.8 }}>
                      {step.packet.direction === "out" ? l.requestPacket : l.responsePacket}
                      {" · "}
                      {l.packetHint}
                    </Typography>
                    <Stack direction="row" gap={1} flexWrap="wrap">
                      <PacketField
                        label={l.source}
                        value={step.packet.src}
                        rewritten={step.packet.changed === "src"}
                        was={step.packet.changed === "src" ? step.packet.was : undefined}
                        l={l}
                      />
                      <PacketField
                        label={l.destination}
                        value={step.packet.dst}
                        rewritten={step.packet.changed === "dst"}
                        was={step.packet.changed === "dst" ? step.packet.was : undefined}
                        l={l}
                      />
                    </Stack>
                  </Box>
                )}

                {/* NAT table */}
                <Box sx={{ mt: 1.6 }}>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    {l.natTable}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.8 }}>
                    {l.natTableHint}
                  </Typography>

                  {step.natTable.length === 0 ? (
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {l.emptyTable}
                    </Typography>
                  ) : (
                    <Box sx={{ overflowX: "auto" }}>
                      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(130px, 1fr))", gap: 0.6, minWidth: 420 }}>
                        {tableColumns.map((col) => (
                          <Typography key={col.key} variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                            {col.label}
                          </Typography>
                        ))}

                        {step.natTable.map((row, rowIndex) => {
                          const active = step.highlightRows.includes(rowIndex);
                          const clash = step.clashRows?.includes(rowIndex);
                          return tableColumns.map((col) => (
                            <Box
                              key={`${rowIndex}-${col.key}`}
                              sx={{
                                py: 0.5,
                                px: 1,
                                borderRadius: RADIUS.inner,
                                border: "1.5px solid",
                                borderStyle: active || clash ? "solid" : "dashed",
                                borderColor: clash ? "error.main" : active ? "primary.main" : "divider",
                                bgcolor: active ? "action.selected" : "background.paper",
                                opacity: active || clash ? 1 : 0.7,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: MONO,
                                  fontWeight: 700,
                                  color: clash && col.key === "insidePublic" ? "error.main" : undefined,
                                }}
                              >
                                {row[col.key]}
                              </Typography>
                            </Box>
                          ));
                        })}
                      </Box>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Panel>
        }
      >
        <StepCard stepText={`${t.stepLabel} ${stepIndex + 1}`} badge={step.phase} title={content.title}>
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

          <Stack spacing={1.2} sx={{ mt: content.analogy || content.term ? 1.6 : 0 }}>
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
          </Stack>
        </StepCard>
      </LessonBody>

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
