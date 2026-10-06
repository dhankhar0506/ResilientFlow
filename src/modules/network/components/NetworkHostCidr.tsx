import { useState } from "react";
import { Box, Chip, Slider, Stack, Typography, useTheme } from "@mui/material";
import { UI, type Lang } from "../../../i18n";
import { NETWORK_HOST_LABELS, NETWORK_HOST_STEPS, type NetworkDevice, type NetworkFocus } from "../data/NetworkHostCidr";
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

const TOTAL_BITS = 32;

type Labels = (typeof NETWORK_HOST_LABELS)[Lang];

/* ---------- IPv4 helpers ---------- */

function ipToInt(ip: string) {
  return ip.split(".").reduce((acc, o) => ((acc << 8) | Number(o)) >>> 0, 0);
}
function intToIp(n: number) {
  return [24, 16, 8, 0].map((s) => (n >>> s) & 255).join(".");
}
function maskOf(prefix: number) {
  return prefix === 0 ? 0 : (0xffffffff << (TOTAL_BITS - prefix)) >>> 0;
}
function describe(ip: string, prefix: number) {
  const mask = maskOf(prefix);
  const network = (ipToInt(ip) & mask) >>> 0;
  const broadcast = (network | ~mask) >>> 0;
  const hostBits = TOTAL_BITS - prefix;
  const total = 2 ** hostBits;
  return {
    hostBits,
    total,
    usable: hostBits >= 2 ? total - 2 : null,
    network: intToIp(network),
    broadcast: intToIp(broadcast),
  };
}
const fmt = (n: number) => n.toLocaleString("en-US");

/* ---------- Network diagram (router + devices) ---------- */

function NetworkDiagram({ devices, focus, l }: { devices: NetworkDevice[]; focus: NetworkFocus; l: Labels }) {
  const theme = useTheme();
  const c = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    line: theme.palette.divider,
    text: theme.palette.text.primary,
    muted: theme.palette.text.secondary,
    paper: theme.palette.background.paper,
    tint: theme.palette.action.selected,
  };

  const [router, ...hosts] = devices;
  const xs = [30, 215, 380];
  const linksOn = focus === "links" || focus === "lan";
  const hostsOn = focus === "hosts" || focus === "lan";

  return (
    <Box sx={{ overflowX: "auto" }}>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${l.homeNetwork}: ${devices.map((d) => `${d.name} ${d.ip}`).join(", ")}`}
        style={{ width: "100%", minWidth: 520, height: "auto", display: "block", fontFamily: "inherit" }}
      >
        <rect
          x={10}
          y={10}
          width={520}
          height={232}
          rx={18}
          fill="none"
          stroke={focus === "lan" ? c.primary : c.line}
          strokeWidth={focus === "lan" ? 2.5 : 1.5}
          strokeDasharray="6 5"
        />
        <text x={24} y={32} fontSize={12} fontWeight={700} fill={focus === "lan" ? c.primary : c.muted}>
          {focus === "lan" ? l.lan : l.homeNetwork}
        </text>

        <line x1={345} y1={66} x2={580} y2={66} stroke={c.line} strokeWidth={1.5} strokeDasharray="5 4" />
        <rect
          x={580}
          y={36}
          width={130}
          height={60}
          rx={14}
          fill={c.paper}
          stroke={c.line}
          strokeWidth={1.5}
          strokeDasharray="5 4"
          opacity={0.75}
        />
        <text x={645} y={62} textAnchor="middle" fontSize={13} fontWeight={700} fill={c.muted}>
          🌍 {l.internet}
        </text>
        {focus === "lan" && (
          <text x={645} y={82} textAnchor="middle" fontSize={11} fill={c.muted}>
            {l.notNeeded}
          </text>
        )}

        {hosts.map((_, i) => (
          <line key={i} x1={280} y1={96} x2={xs[i] + 65} y2={156} stroke={linksOn ? c.primary : c.line} strokeWidth={linksOn ? 2.5 : 1.5} />
        ))}

        <rect x={215} y={36} width={130} height={60} rx={14} fill={c.tint} stroke={c.primary} strokeWidth={2} />
        <text x={280} y={56} textAnchor="middle" fontSize={13} fontWeight={800} fill={c.text}>
          {router.icon} {router.name}
        </text>
        <text x={280} y={73} textAnchor="middle" fontSize={13} fontWeight={800} fill={c.primary} fontFamily={MONO}>
          {router.ip}
        </text>
        {hostsOn && (
          <text x={280} y={88} textAnchor="middle" fontSize={11} fontWeight={700} fill={c.secondary}>
            ● {l.hostTag}
          </text>
        )}

        {hosts.map((d, i) => (
          <g key={d.name}>
            <rect
              x={xs[i]}
              y={156}
              width={130}
              height={74}
              rx={14}
              fill={hostsOn ? c.tint : c.paper}
              stroke={hostsOn ? c.secondary : c.primary}
              strokeWidth={hostsOn ? 2.5 : 1.5}
            />
            <text x={xs[i] + 65} y={180} textAnchor="middle" fontSize={13} fontWeight={800} fill={c.text}>
              {d.icon} {d.name}
            </text>
            <text
              x={xs[i] + 65}
              y={200}
              textAnchor="middle"
              fontSize={13}
              fontWeight={800}
              fill={hostsOn ? c.secondary : c.primary}
              fontFamily={MONO}
            >
              {d.ip}
            </text>
            {hostsOn && (
              <text x={xs[i] + 65} y={218} textAnchor="middle" fontSize={11} fontWeight={700} fill={c.secondary}>
                ● {l.hostTag}
              </text>
            )}
          </g>
        ))}
      </svg>
    </Box>
  );
}

/* ---------- Street / houses diagram ---------- */

function AddressDiagram({ l }: { l: Labels }) {
  const houses = [
    { n: ".1", label: "📡" },
    { n: ".2", label: "📱" },
    { n: ".3", label: "📲" },
    { n: ".4", label: "💻" },
  ];
  return (
    <Stack spacing={1.2}>
      <Box sx={{ ...nodeSx("primary.main", "action.selected"), textAlign: "left", p: 1.2 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block" }}>
          {l.street}
        </Typography>
        <Typography variant="h2" sx={{ fontFamily: MONO, color: "primary.main" }}>
          192.168.1.0
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
        {l.house}
      </Typography>

      <Stack direction="row" gap={1} flexWrap="wrap" alignItems="stretch">
        {houses.map((h) => (
          <Box key={h.n} sx={{ ...nodeSx("secondary.main", "action.selected"), minWidth: 78 }}>
            <Typography variant="h3" sx={{ lineHeight: 1.2 }}>
              {h.label}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: MONO, fontWeight: 800 }}>
              192.168.1
              <Box component="span" sx={{ color: "secondary.main" }}>
                {h.n}
              </Box>
            </Typography>
          </Box>
        ))}
        <Box sx={{ display: "flex", alignItems: "center", px: 0.5, color: "text.secondary", fontWeight: 800 }}>…</Box>
      </Stack>
    </Stack>
  );
}

/* ---------- 32-bit bar ---------- */

function BitsBar({ ip, prefix, l }: { ip: string; prefix: number; l: Labels }) {
  const value = ipToInt(ip);
  const octets = ip.split(".");

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Stack direction="row" gap={1} sx={{ minWidth: 460 }}>
        {octets.map((octet, i) => (
          <Box key={i} sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ textAlign: "center", fontWeight: 800, fontFamily: MONO }}>
              {octet}
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "2px", my: 0.4 }}>
              {Array.from({ length: 8 }, (_, j) => {
                const idx = i * 8 + j;
                const isNetwork = idx < prefix;
                const bit = (value >>> (TOTAL_BITS - 1 - idx)) & 1;
                return (
                  <Box
                    key={j}
                    sx={{
                      py: 0.4,
                      textAlign: "center",
                      borderRadius: "4px",
                      typography: "caption",
                      fontFamily: MONO,
                      fontWeight: 800,
                      color: "#fff",
                      bgcolor: isNetwork ? "primary.main" : "secondary.main",
                    }}
                  >
                    {bit}
                  </Box>
                );
              })}
            </Box>

            <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "text.secondary" }}>
              {l.octet} {i + 1} · {i * 8 + 1}–{i * 8 + 8}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" gap={0.8} sx={{ mt: 1 }}>
        <Chip size="small" label={`${l.networkPart}: ${prefix}`} sx={{ bgcolor: "primary.main", color: "primary.contrastText", fontWeight: 800 }} />
        <Chip
          size="small"
          label={`${l.hostPart}: ${TOTAL_BITS - prefix}`}
          sx={{ bgcolor: "secondary.main", color: "secondary.contrastText", fontWeight: 800 }}
        />
      </Stack>
    </Box>
  );
}

/* ---------- Stats ---------- */

function Stats({ ip, prefix, l }: { ip: string; prefix: number; l: Labels }) {
  const d = describe(ip, prefix);
  const items = [
    { label: l.networkBits, value: String(prefix) },
    { label: l.hostBits, value: String(d.hostBits) },
    { label: l.totalAddresses, value: `2^${d.hostBits} = ${fmt(d.total)}` },
    { label: l.usableHosts, value: d.usable === null ? l.notApplicable : fmt(d.usable) },
    { label: l.networkAddress, value: d.network },
    { label: l.broadcastAddress, value: d.broadcast },
  ];
  return (
    <Box sx={{ mt: 1.6, display: "grid", gap: 0.8, gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" } }}>
      {items.map((it) => (
        <Box key={it.label} sx={{ ...nodeSx(), textAlign: "left", p: 0.9 }}>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
            {it.label}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: MONO, fontWeight: 800, wordBreak: "break-word" }}>
            {it.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/* ---------- 256-address grid for /24 ---------- */

function CountGrid({ l }: { l: Labels }) {
  const legend = [
    { label: l.legendNetAddr, color: "warning.main", opacity: 1 },
    { label: l.legendUsable, color: "primary.main", opacity: 0.35 },
    { label: l.legendInUse, color: "secondary.main", opacity: 1 },
    { label: l.legendBroadcast, color: "error.main", opacity: 1 },
  ];

  const cellColor = (i: number) => {
    if (i === 0) return { color: "warning.main", opacity: 1 };
    if (i === 255) return { color: "error.main", opacity: 1 };
    if (i <= 4) return { color: "secondary.main", opacity: 1 };
    return { color: "primary.main", opacity: 0.35 };
  };

  return (
    <Stack spacing={1.2} alignItems="center">
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {l.gridHint}
      </Typography>

      <Box
        role="img"
        aria-label="256 addresses: 1 network address, 254 usable, 1 broadcast"
        sx={{ width: "100%", maxWidth: SIZE.gridMaxWidth, display: "grid", gridTemplateColumns: "repeat(16, 1fr)", gap: "3px" }}
      >
        {Array.from({ length: 256 }, (_, i) => {
          const s = cellColor(i);
          return (
            <Box key={i} title={`192.168.1.${i}`} sx={{ aspectRatio: "1", borderRadius: "3px", bgcolor: s.color, opacity: s.opacity }} />
          );
        })}
      </Box>

      <Stack direction="row" gap={1.4} flexWrap="wrap" justifyContent="center">
        {legend.map((it) => (
          <Stack key={it.label} direction="row" alignItems="center" gap={0.6}>
            <Box sx={{ width: 12, height: 12, borderRadius: "3px", bgcolor: it.color, opacity: it.opacity }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {it.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

/* ---------- Size comparison bars ---------- */

function CompareBars({ active, l }: { active: number; l: Labels }) {
  const rows = [24, 16, 8, 0];
  return (
    <Box sx={{ mt: 1.8 }}>
      <Typography sx={{ ...labelSx, display: "block", mb: 0.8 }}>{l.compareTitle}</Typography>

      <Stack spacing={0.8}>
        {rows.map((p) => {
          const hostBits = TOTAL_BITS - p;
          const isActive = p === active;
          return (
            <Stack key={p} direction="row" alignItems="center" gap={1}>
              <Typography
                variant="body2"
                sx={{ width: 36, fontFamily: MONO, fontWeight: 800, color: isActive ? "primary.main" : "text.secondary" }}
              >
                /{p}
              </Typography>

              <Box sx={{ flex: 1, height: 18, borderRadius: RADIUS.pill, bgcolor: "action.hover", overflow: "hidden" }}>
                <Box
                  sx={{
                    height: "100%",
                    width: `${(hostBits / TOTAL_BITS) * 100}%`,
                    borderRadius: RADIUS.pill,
                    bgcolor: isActive ? "primary.main" : "secondary.main",
                    opacity: isActive ? 1 : 0.5,
                    transition: "width 0.5s ease",
                  }}
                />
              </Box>

              <Typography variant="caption" sx={{ minWidth: 140, fontFamily: MONO, fontWeight: isActive ? 800 : 600 }}>
                {fmt(2 ** hostBits)} {l.addresses}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}

/* ---------- CIDR notation annotation ---------- */

function NotationDiagram({ ip, prefix, l }: { ip: string; prefix: number; l: Labels }) {
  const parts = [
    { big: ip, label: l.notationNetwork, hint: undefined, color: "primary.main" },
    { big: "/", label: l.notationSlash, hint: undefined, color: "text.secondary" },
    { big: String(prefix), label: l.notationPrefix, hint: l.notationPrefixHint, color: "secondary.main" },
  ];
  return (
    <Stack direction="row" gap={1} flexWrap="wrap" alignItems="flex-start" sx={{ mb: 1.6 }}>
      {parts.map((p) => (
        <Box
          key={p.label}
          sx={{
            ...nodeSx(p.color, "action.selected"),
            minWidth: p.big === "/" ? 56 : 140,
            flex: p.big === "/" ? "0 0 auto" : "1 1 140px",
          }}
        >
          <Typography variant="h2" sx={{ fontFamily: MONO, color: p.color }}>
            {p.big}
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, display: "block" }}>
            {p.label}
          </Typography>
          {p.hint && (
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
              {p.hint}
            </Typography>
          )}
        </Box>
      ))}
    </Stack>
  );
}

/* ---------- Main component ---------- */

export default function NetworkHost({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [playPrefix, setPlayPrefix] = useState(24);

  const t = UI[lang];
  const l = NETWORK_HOST_LABELS[lang];
  const step = NETWORK_HOST_STEPS[stepIndex];
  const content = step[lang];
  const last = NETWORK_HOST_STEPS.length - 1;
  const goTo = (i: number) => setStepIndex(Math.min(last, Math.max(0, i)));

  const prefix = step.scene === "playground" ? playPrefix : (step.prefix ?? 24);

  const caption = (
    <Typography sx={{ ...labelSx, display: "block", mb: 1 }}>
      {step.example}/{prefix}
    </Typography>
  );

  return (
    <LessonPage>
      <LessonHeader eyebrow={l.lessonTitle} title={l.heroTitle} subtitle={l.heroSubtitle} />
      <LessonStatus availableLabel={t.available} right={`${t.stepLabel} ${stepIndex + 1} ${t.of} ${NETWORK_HOST_STEPS.length}`} />
      <StepBar
        total={NETWORK_HOST_STEPS.length}
        index={stepIndex}
        onSelect={goTo}
        label={(i) => `${t.stepLabel} ${i + 1}: ${NETWORK_HOST_STEPS[i][lang].title}`}
      />

      <LessonBody
        visual={
          <Panel>
            {step.scene === "network" && step.devices && <NetworkDiagram devices={step.devices} focus={step.focus ?? "links"} l={l} />}

            {step.scene === "address" && <AddressDiagram l={l} />}

            {step.scene === "notation" && (
              <>
                <NotationDiagram ip={step.example} prefix={prefix} l={l} />
                <BitsBar ip={step.example} prefix={prefix} l={l} />
              </>
            )}

            {step.scene === "bits" && (
              <>
                {caption}
                <BitsBar ip={step.example} prefix={prefix} l={l} />
                <Stats ip={step.example} prefix={prefix} l={l} />
              </>
            )}

            {step.scene === "count" && <CountGrid l={l} />}

            {step.scene === "compare" && (
              <>
                {caption}
                <BitsBar ip={step.example} prefix={prefix} l={l} />
                <Stats ip={step.example} prefix={prefix} l={l} />
                <CompareBars active={prefix} l={l} />
              </>
            )}

            {step.scene === "playground" && (
              <>
                <Typography variant="subtitle1" sx={{ mb: 0.3 }}>
                  {l.playgroundTitle}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.2 }}>
                  {l.exampleIp}:{" "}
                  <Box component="span" sx={{ fontFamily: MONO, fontWeight: 800, color: "text.primary" }}>
                    {step.example}/{prefix}
                  </Box>
                </Typography>

                <Stack direction="row" alignItems="center" gap={2} sx={{ px: 1, mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                    {l.prefixLabel}: /{prefix}
                  </Typography>
                  <Slider
                    size="small"
                    value={playPrefix}
                    min={0}
                    max={TOTAL_BITS}
                    step={1}
                    onChange={(_, v) => setPlayPrefix(v as number)}
                    aria-label={l.prefixLabel}
                    valueLabelDisplay="auto"
                  />
                </Stack>

                <Stack direction="row" gap={0.6} flexWrap="wrap" sx={{ mb: 1.4 }}>
                  {[0, 8, 16, 24, 30, 32].map((p) => (
                    <Chip
                      key={p}
                      size="small"
                      label={`/${p}`}
                      clickable
                      onClick={() => setPlayPrefix(p)}
                      color={p === playPrefix ? "primary" : "default"}
                      sx={{ fontFamily: MONO, fontWeight: 800 }}
                    />
                  ))}
                </Stack>

                <BitsBar ip={step.example} prefix={prefix} l={l} />
                <Stats ip={step.example} prefix={prefix} l={l} />
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

          {content.example && (
            <Box sx={{ ...insetSx, mt: 1.4, fontFamily: MONO, typography: "body2", lineHeight: 1.75, overflowX: "auto" }}>
              <Typography
                variant="caption"
                sx={{ display: "block", fontWeight: 800, color: "text.secondary", fontFamily: "inherit", mb: 0.3 }}
              >
                {l.example}
              </Typography>
              {content.example.map((line) => (
                <Box key={line} sx={{ whiteSpace: "pre" }}>
                  {line}
                </Box>
              ))}
            </Box>
          )}

          {content.points && (
            <Box component="ul" sx={{ m: 0, mt: 1.2, pl: 2.4, "& li::marker": { color: "primary.main" } }}>
              {content.points.map((pt) => (
                <Typography key={pt} component="li" variant="body1" sx={{ lineHeight: 1.7 }}>
                  {pt}
                </Typography>
              ))}
            </Box>
          )}

          <Stack spacing={1.2} sx={{ mt: content.analogy || content.term || content.note ? 1.6 : 0 }}>
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

            {content.note && (
              <Callout label={l.goodToKnow} tone="warning">
                {content.note}
              </Callout>
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
