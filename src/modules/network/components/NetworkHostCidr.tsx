import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Slider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { UI, type Lang } from "../../../i18n";
import {
  NETWORK_HOST_LABELS,
  NETWORK_HOST_STEPS,
  type NetworkDevice,
  type NetworkFocus,
} from "../data/NetworkHostCidr";

const TOTAL_BITS = 32;
const mono = "ui-monospace, Menlo, monospace";

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

function NetworkDiagram({
  devices,
  focus,
  l,
}: {
  devices: NetworkDevice[];
  focus: NetworkFocus;
  l: Labels;
}) {
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
        style={{ width: "100%", minWidth: 560, height: "auto", display: "block", fontFamily: "inherit" }}
      >
        {/* LAN zone */}
        <rect
          x={10} y={10} width={520} height={232} rx={18}
          fill="none"
          stroke={focus === "lan" ? c.primary : c.line}
          strokeWidth={focus === "lan" ? 2.5 : 1.5}
          strokeDasharray="6 5"
        />
        <text x={24} y={32} fontSize={12} fontWeight={700} fill={focus === "lan" ? c.primary : c.muted}>
          {focus === "lan" ? l.lan : l.homeNetwork}
        </text>

        {/* Internet (outside the LAN) */}
        <line x1={345} y1={66} x2={580} y2={66} stroke={c.line} strokeWidth={1.5} strokeDasharray="5 4" />
        <rect x={580} y={36} width={130} height={60} rx={14} fill={c.paper} stroke={c.line} strokeWidth={1.5} strokeDasharray="5 4" opacity={0.75} />
        <text x={645} y={62} textAnchor="middle" fontSize={13} fontWeight={700} fill={c.muted}>
          🌍 {l.internet}
        </text>
        {focus === "lan" && (
          <text x={645} y={82} textAnchor="middle" fontSize={11} fill={c.muted}>
            {l.notNeeded}
          </text>
        )}

        {/* Links */}
        {hosts.map((_, i) => (
          <line
            key={i}
            x1={280} y1={96} x2={xs[i] + 65} y2={156}
            stroke={linksOn ? c.primary : c.line}
            strokeWidth={linksOn ? 2.5 : 1.5}
          />
        ))}

        {/* Router */}
        <rect x={215} y={36} width={130} height={60} rx={14} fill={c.tint} stroke={c.primary} strokeWidth={2} />
        <text x={280} y={56} textAnchor="middle" fontSize={13} fontWeight={800} fill={c.text}>
          {router.icon} {router.name}
        </text>
        <text x={280} y={73} textAnchor="middle" fontSize={13} fontWeight={800} fill={c.primary} fontFamily={mono}>
          {router.ip}
        </text>
        {hostsOn && (
          <text x={280} y={88} textAnchor="middle" fontSize={11} fontWeight={700} fill={c.secondary}>
            ● {l.hostTag}
          </text>
        )}

        {/* Hosts */}
        {hosts.map((d, i) => (
          <g key={d.name}>
            <rect
              x={xs[i]} y={156} width={130} height={74} rx={14}
              fill={hostsOn ? c.tint : c.paper}
              stroke={hostsOn ? c.secondary : c.primary}
              strokeWidth={hostsOn ? 2.5 : 1.5}
            />
            <text x={xs[i] + 65} y={180} textAnchor="middle" fontSize={13} fontWeight={800} fill={c.text}>
              {d.icon} {d.name}
            </text>
            <text x={xs[i] + 65} y={200} textAnchor="middle" fontSize={13} fontWeight={800} fill={hostsOn ? c.secondary : c.primary} fontFamily={mono}>
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
    <Stack spacing={1.4}>
      <Box
        sx={{
          p: 1.3,
          borderRadius: 2,
          border: "1.5px solid",
          borderColor: "primary.main",
          bgcolor: "action.selected",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block" }}>
          {l.street}
        </Typography>
        <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: 22, color: "primary.main" }}>
          192.168.1.0
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
        {l.house}
      </Typography>

      <Stack direction="row" gap={1} flexWrap="wrap" alignItems="stretch">
        {houses.map((h) => (
          <Box
            key={h.n}
            sx={{
              minWidth: 78,
              textAlign: "center",
              py: 1,
              px: 1,
              borderRadius: 2,
              border: "1.5px solid",
              borderColor: "secondary.main",
              bgcolor: "action.selected",
            }}
          >
            <Typography sx={{ fontSize: 22, lineHeight: 1.2 }}>{h.label}</Typography>
            <Typography sx={{ fontFamily: mono, fontWeight: 800 }}>
              192.168.1<Box component="span" sx={{ color: "secondary.main" }}>{h.n}</Box>
            </Typography>
          </Box>
        ))}
        <Box sx={{ display: "flex", alignItems: "center", px: 0.5, color: "text.secondary", fontWeight: 800 }}>
          …
        </Box>
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
      <Stack direction="row" gap={1.2} sx={{ minWidth: 520 }}>
        {octets.map((octet, i) => (
          <Box key={i} sx={{ flex: 1 }}>
            <Typography
              variant="body1"
              sx={{ textAlign: "center", fontWeight: 800, fontFamily: mono }}
            >
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
                      py: 0.5,
                      textAlign: "center",
                      borderRadius: 0.8,
                      fontFamily: mono,
                      fontSize: 12,
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

      <Stack direction="row" gap={0.8} sx={{ mt: 1.2 }}>
        <Chip
          size="small"
          label={`${l.networkPart}: ${prefix}`}
          sx={{ bgcolor: "primary.main", color: "#fff", fontWeight: 800, typography: "caption" }}
        />
        <Chip
          size="small"
          label={`${l.hostPart}: ${TOTAL_BITS - prefix}`}
          sx={{ bgcolor: "secondary.main", color: "#fff", fontWeight: 800, typography: "caption" }}
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
    <Box
      sx={{
        mt: 1.8,
        display: "grid",
        gap: 0.8,
        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
      }}
    >
      {items.map((it) => (
        <Box key={it.label} sx={{ p: 1, borderRadius: 2, border: "1.5px solid", borderColor: "divider" }}>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
            {it.label}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: mono, fontWeight: 800, wordBreak: "break-word" }}>
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
        sx={{
          width: "100%",
          maxWidth: 400,
          display: "grid",
          gridTemplateColumns: "repeat(16, 1fr)",
          gap: "3px",
        }}
      >
        {Array.from({ length: 256 }, (_, i) => {
          const s = cellColor(i);
          return (
            <Box
              key={i}
              title={`192.168.1.${i}`}
              sx={{ aspectRatio: "1", borderRadius: 0.6, bgcolor: s.color, opacity: s.opacity }}
            />
          );
        })}
      </Box>

      <Stack direction="row" gap={1.4} flexWrap="wrap" justifyContent="center">
        {legend.map((it) => (
          <Stack key={it.label} direction="row" alignItems="center" gap={0.6}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.6, bgcolor: it.color, opacity: it.opacity }} />
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
    <Box sx={{ mt: 2 }}>
      <Typography variant="caption" sx={{ fontWeight: 800, display: "block", mb: 0.8 }}>
        {l.compareTitle}
      </Typography>

      <Stack spacing={0.8}>
        {rows.map((p) => {
          const hostBits = TOTAL_BITS - p;
          const isActive = p === active;
          return (
            <Stack key={p} direction="row" alignItems="center" gap={1}>
              <Typography
                variant="body2"
                sx={{ width: 36, fontFamily: mono, fontWeight: 800, color: isActive ? "primary.main" : "text.secondary" }}
              >
                /{p}
              </Typography>

              <Box sx={{ flex: 1, height: 22, borderRadius: 99, bgcolor: "action.hover", overflow: "hidden" }}>
                <Box
                  sx={{
                    height: "100%",
                    width: `${(hostBits / TOTAL_BITS) * 100}%`,
                    borderRadius: 99,
                    bgcolor: isActive ? "primary.main" : "secondary.main",
                    opacity: isActive ? 1 : 0.5,
                    transition: "width 0.5s ease",
                  }}
                />
              </Box>

              <Typography
                variant="caption"
                sx={{ minWidth: 150, fontFamily: mono, fontWeight: isActive ? 800 : 600 }}
              >
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
    <Stack direction="row" gap={1} flexWrap="wrap" alignItems="flex-start" sx={{ mb: 2 }}>
      {parts.map((p) => (
        <Box
          key={p.label}
          sx={{
            p: 1.2,
            borderRadius: 2,
            border: "1.5px solid",
            borderColor: p.color,
            bgcolor: "action.selected",
            minWidth: p.big === "/" ? 64 : 150,
            textAlign: "center",
            flex: p.big === "/" ? "0 0 auto" : "1 1 150px",
          }}
        >
          <Typography sx={{ fontFamily: mono, fontWeight: 800, fontSize: 24, color: p.color }}>
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

  const goTo = (i: number) =>
    setStepIndex(Math.min(NETWORK_HOST_STEPS.length - 1, Math.max(0, i)));

  const prefix = step.scene === "playground" ? playPrefix : step.prefix ?? 24;

  return (
    <Stack spacing={2.3}>
      {/* Header */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main", mb: 0.5 }}>
          {l.lessonTitle}
        </Typography>

        <Typography component="h1" variant="h1" sx={{ fontWeight: 850, letterSpacing: "-0.6px", mb: 0.6 }}>
          {l.heroTitle}
        </Typography>

        <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          {l.heroSubtitle}
        </Typography>
      </Box>

      {/* Step status */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Chip
          label={t.available}
          size="small"
          sx={{ bgcolor: "success.main", color: "#fff", typography: "caption", fontWeight: 800 }}
        />
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 700 }}>
          {t.stepLabel} {stepIndex + 1} {t.of} {NETWORK_HOST_STEPS.length}
        </Typography>
      </Stack>

      {/* Clickable segmented progress */}
      <Stack direction="row" gap={0.5}>
        {NETWORK_HOST_STEPS.map((s, i) => (
          <Box
            key={s.id}
            component="button"
            type="button"
            aria-label={`${t.stepLabel} ${i + 1}: ${s[lang].title}`}
            aria-current={i === stepIndex ? "step" : undefined}
            onClick={() => goTo(i)}
            sx={{
              flex: 1,
              height: 8,
              p: 0,
              border: 0,
              borderRadius: 99,
              cursor: "pointer",
              bgcolor: i <= stepIndex ? "primary.main" : "action.hover",
              opacity: i < stepIndex ? 0.55 : 1,
              outline: i === stepIndex ? "2px solid" : "none",
              outlineColor: "primary.main",
              outlineOffset: 2,
              "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
            }}
          />
        ))}
      </Stack>

      {/* Visual area */}
      <Paper
        variant="outlined"
        sx={{ p: { xs: 1.6, sm: 2 }, borderRadius: 2.5, borderColor: "divider", bgcolor: "background.paper" }}
      >
        {step.scene === "network" && step.devices && (
          <NetworkDiagram devices={step.devices} focus={step.focus ?? "links"} l={l} />
        )}

        {step.scene === "address" && <AddressDiagram l={l} />}

        {step.scene === "notation" && (
          <>
            <NotationDiagram ip={step.example} prefix={prefix} l={l} />
            <BitsBar ip={step.example} prefix={prefix} l={l} />
          </>
        )}

        {step.scene === "bits" && (
          <>
            <Typography
              variant="caption"
              sx={{ fontWeight: 800, letterSpacing: 0.6, color: "text.secondary", mb: 1.2, display: "block" }}
            >
              {step.example}/{prefix}
            </Typography>
            <BitsBar ip={step.example} prefix={prefix} l={l} />
            <Stats ip={step.example} prefix={prefix} l={l} />
          </>
        )}

        {step.scene === "count" && <CountGrid l={l} />}

        {step.scene === "compare" && (
          <>
            <Typography
              variant="caption"
              sx={{ fontWeight: 800, letterSpacing: 0.6, color: "text.secondary", mb: 1.2, display: "block" }}
            >
              {step.example}/{prefix}
            </Typography>
            <BitsBar ip={step.example} prefix={prefix} l={l} />
            <Stats ip={step.example} prefix={prefix} l={l} />
            <CompareBars active={prefix} l={l} />
          </>
        )}

        {step.scene === "playground" && (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.4 }}>
              {l.playgroundTitle}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.4 }}>
              {l.exampleIp}:{" "}
              <Box component="span" sx={{ fontFamily: mono, fontWeight: 800, color: "text.primary" }}>
                {step.example}/{prefix}
              </Box>
            </Typography>

            <Stack direction="row" alignItems="center" gap={2} sx={{ px: 1, mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                {l.prefixLabel}: /{prefix}
              </Typography>
              <Slider
                value={playPrefix}
                min={0}
                max={TOTAL_BITS}
                step={1}
                onChange={(_, v) => setPlayPrefix(v as number)}
                aria-label={l.prefixLabel}
                valueLabelDisplay="auto"
              />
            </Stack>

            <Stack direction="row" gap={0.6} flexWrap="wrap" sx={{ mb: 1.6 }}>
              {[0, 8, 16, 24, 30, 32].map((p) => (
                <Chip
                  key={p}
                  size="small"
                  label={`/${p}`}
                  clickable
                  onClick={() => setPlayPrefix(p)}
                  color={p === playPrefix ? "primary" : "default"}
                  sx={{ fontFamily: mono, fontWeight: 800 }}
                />
              ))}
            </Stack>

            <BitsBar ip={step.example} prefix={prefix} l={l} />
            <Stats ip={step.example} prefix={prefix} l={l} />
          </>
        )}
      </Paper>

      {/* Step content */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 1.7, sm: 2.2 },
          borderRadius: 2.5,
          borderColor: "divider",
          borderTop: "4px solid",
          borderTopColor: "primary.main",
          bgcolor: "background.paper",
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} sx={{ mb: 1.3 }}>
          <Typography
            variant="caption"
            sx={{ color: "primary.main", fontWeight: 850, letterSpacing: 0.8, textTransform: "uppercase" }}
          >
            {t.stepLabel} {stepIndex + 1}
          </Typography>

          <Chip
            label={step.phase}
            size="small"
            sx={{ bgcolor: "action.selected", color: "primary.main", typography: "caption", fontWeight: 850 }}
          />
        </Stack>

        <Typography component="h2" variant="h3" sx={{ fontWeight: 850, mb: 0.8 }}>
          {content.title}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.2 }}>
          {content.summary}
        </Typography>

        <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
          {content.detail}
        </Typography>

        {content.example && (
          <Box
            sx={{
              mt: 1.6,
              p: 1.4,
              borderRadius: 2,
              bgcolor: "action.hover",
              fontFamily: mono,
              fontSize: 14,
              lineHeight: 1.8,
              overflowX: "auto",
            }}
          >
            <Typography variant="caption" sx={{ display: "block", fontWeight: 800, color: "text.secondary", fontFamily: "inherit", mb: 0.3 }}>
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
          <Box
            component="ul"
            sx={{ m: 0, mt: 1.4, pl: 2.6, lineHeight: 1.8, "& li::marker": { color: "primary.main" } }}
          >
            {content.points.map((pt) => (
              <li key={pt}>
                <Typography variant="body1" component="span">
                  {pt}
                </Typography>
              </li>
            ))}
          </Box>
        )}

        {content.analogy && (
          <Box
            sx={{
              mt: 1.8,
              p: 1.5,
              borderRadius: 2,
              bgcolor: "action.hover",
              borderLeft: "4px solid",
              borderLeftColor: "secondary.main",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 800, color: "secondary.main", display: "block", mb: 0.3 }}>
              {l.analogy}
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              {content.analogy}
            </Typography>
          </Box>
        )}

        {content.term && (
          <Box sx={{ mt: 1.4, p: 1.3, borderRadius: 2, border: "1.5px dashed", borderColor: "primary.main" }}>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              <strong>
                {l.keyTerm}: {content.term.name}
              </strong>
              {" — "}
              {content.term.meaning}
            </Typography>
          </Box>
        )}

        {content.note && (
          <Box
            sx={{
              mt: 1.4,
              p: 1.3,
              borderRadius: 2,
              bgcolor: "action.hover",
              borderLeft: "4px solid",
              borderLeftColor: "warning.main",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 800, color: "warning.main", display: "block", mb: 0.3 }}>
              {l.goodToKnow}
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              {content.note}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Navigation */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
        <Button
          variant="outlined"
          size="small"
          disabled={stepIndex === 0}
          onClick={() => goTo(stepIndex - 1)}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          ← {t.previous}
        </Button>

        <Button
          variant="text"
          size="small"
          color="inherit"
          startIcon={<ReplayRoundedIcon />}
          onClick={() => goTo(0)}
          sx={{ textTransform: "none" }}
        >
          {t.restart}
        </Button>

        <Button
          variant="contained"
          size="small"
          endIcon={<ArrowForwardRoundedIcon />}
          disabled={stepIndex === NETWORK_HOST_STEPS.length - 1}
          onClick={() => goTo(stepIndex + 1)}
          sx={{ textTransform: "none", borderRadius: 2, boxShadow: "none" }}
        >
          {t.next}
        </Button>
      </Stack>
    </Stack>
  );
}