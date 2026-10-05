// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Chip,
//   LinearProgress,
//   Paper,
//   Stack,
//   Typography,
// } from "@mui/material";

// import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
// import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

// import { UI, type Lang } from "../../../i18n";
// import { NAT_LABELS, NAT_STEPS, type NatNode } from "../data/NAT";

// const mono = "ui-monospace, Menlo, monospace";

// export default function Nat({ lang }: { lang: Lang }) {
//   const [stepIndex, setStepIndex] = useState(0);

//   const t = UI[lang];
//   const l = NAT_LABELS[lang];

//   const step = NAT_STEPS[stepIndex];
//   const content = step[lang];

//   const progress = ((stepIndex + 1) / NAT_STEPS.length) * 100;

//   const nodes: { key: NatNode; label: string }[] = [
//     { key: "private", label: l.privateNetwork },
//     { key: "router", label: l.router },
//     { key: "internet", label: l.internet },
//   ];

//   const packetFields = step.packet
//     ? [
//         { label: l.source, value: step.packet.src },
//         { label: l.destination, value: step.packet.dst },
//       ]
//     : [];

//   const tableColumns = [
//     { key: "insidePrivate", label: l.insidePrivate },
//     { key: "insidePublic", label: l.insidePublic },
//     { key: "outsidePublic", label: l.outsidePublic },
//   ] as const;

//   return (
//     <Stack spacing={2.3}>
//       {/* Lesson heading */}
//       <Box>
//         <Typography
//           variant="subtitle2"
//           sx={{
//             color: "primary.main",
//             mb: 0.5,
//           }}
//         >
//           {l.lessonTitle}
//         </Typography>

//         <Typography
//           component="h1"
//           variant="h1"
//           sx={{
//             letterSpacing: "-0.6px",
//             mb: 0.6,
//           }}
//         >
//           {l.heroTitle}
//         </Typography>

//         <Typography
//           variant="body1"
//           sx={{
//             color: "text.secondary",
//             lineHeight: 1.6,
//           }}
//         >
//           {l.heroSubtitle}
//         </Typography>
//       </Box>

//       {/* Availability and step count */}
//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//         gap={1}
//       >
//         <Chip
//           label={t.available}
//           size="small"
//           sx={{
//             bgcolor: "success.main",
//             color: "#fff",
//             typography: "caption",
//             fontWeight: 800,
//           }}
//         />

//         <Typography
//           variant="body2"
//           sx={{
//             color: "text.secondary",
//             fontWeight: 700,
//           }}
//         >
//           {t.stepLabel} {stepIndex + 1} {t.of} {NAT_STEPS.length}
//         </Typography>
//       </Stack>

//       {/* Overall progress */}
//       <LinearProgress
//         variant="determinate"
//         value={progress}
//         sx={{
//           height: 7,
//           borderRadius: 99,
//           bgcolor: "action.hover",
//           "& .MuiLinearProgress-bar": {
//             borderRadius: 99,
//             bgcolor: "primary.main",
//           },
//         }}
//       />

//       {/* Network path and current packet */}
//       <Paper
//         variant="outlined"
//         sx={{
//           p: { xs: 1.6, sm: 2 },
//           borderRadius: 2.5,
//           borderColor: "divider",
//           bgcolor: "background.paper",
//         }}
//       >
//         <Stack
//           direction="row"
//           alignItems="center"
//           flexWrap="wrap"
//           gap={0.6}
//         >
//           {nodes.map((node, i) => {
//             const active = step.activeNodes.includes(node.key);

//             return (
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 key={node.key}
//                 spacing={0.6}
//               >
//                 <Box
//                   sx={{
//                     textAlign: "center",
//                     minWidth: 96,
//                     py: 1,
//                     px: 1,
//                     borderRadius: 2,
//                     border: "1.5px solid",
//                     borderStyle: active ? "solid" : "dashed",
//                     borderColor: active ? "primary.main" : "divider",
//                     bgcolor: active
//                       ? "action.selected"
//                       : "background.paper",
//                     opacity: active ? 1 : 0.55,
//                   }}
//                 >
//                   <Typography
//                     variant="body2"
//                     sx={{ fontWeight: 800 }}
//                   >
//                     {node.label}
//                   </Typography>
//                 </Box>

//                 {i < nodes.length - 1 && (
//                   <Typography
//                     variant="h4"
//                     sx={{
//                       color: "text.secondary",
//                       fontWeight: 700,
//                     }}
//                   >
//                     ↔
//                   </Typography>
//                 )}
//               </Stack>
//             );
//           })}
//         </Stack>

//         {/* Current packet */}
//         {step.packet && (
//           <Box sx={{ mt: 1.8 }}>
//             <Typography
//               variant="caption"
//               sx={{
//                 fontWeight: 800,
//                 letterSpacing: 0.6,
//                 color: "text.secondary",
//                 display: "block",
//                 mb: 0.8,
//                 textTransform: "uppercase",
//               }}
//             >
//               {step.packet.direction === "out"
//                 ? l.requestPacket
//                 : l.responsePacket}
//             </Typography>

//             <Stack direction="row" gap={1} flexWrap="wrap">
//               {packetFields.map((field) => (
//                 <Box
//                   key={field.label}
//                   sx={{
//                     flex: "1 1 140px",
//                     py: 1,
//                     px: 1.2,
//                     borderRadius: 2,
//                     border: "1.5px solid",
//                     borderColor: "primary.main",
//                     bgcolor: "action.selected",
//                   }}
//                 >
//                   <Typography
//                     variant="caption"
//                     sx={{ color: "text.secondary", display: "block" }}
//                   >
//                     {field.label}
//                   </Typography>

//                   <Typography
//                     variant="body1"
//                     sx={{ fontFamily: mono, fontWeight: 800 }}
//                   >
//                     {field.value}
//                   </Typography>
//                 </Box>
//               ))}
//             </Stack>
//           </Box>
//         )}

//         {/* NAT table */}
//         <Box sx={{ mt: 1.8 }}>
//           <Typography
//             variant="caption"
//             sx={{
//               color: "text.secondary",
//               fontWeight: 700,
//               display: "block",
//               mb: 0.6,
//             }}
//           >
//             {l.natTable}
//           </Typography>

//           {step.natTable.length === 0 ? (
//             <Typography
//               variant="caption"
//               sx={{ color: "text.secondary" }}
//             >
//               {l.emptyTable}
//             </Typography>
//           ) : (
//             <Box sx={{ overflowX: "auto" }}>
//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(3, minmax(120px, 1fr))",
//                   gap: 0.6,
//                   minWidth: 380,
//                 }}
//               >
//                 {tableColumns.map((col) => (
//                   <Typography
//                     key={col.key}
//                     variant="caption"
//                     sx={{ color: "text.secondary", fontWeight: 700 }}
//                   >
//                     {col.label}
//                   </Typography>
//                 ))}

//                 {step.natTable.map((row:any, rowIndex:any) => {
//                   const active = step.highlightRows.includes(rowIndex);

//                   return tableColumns.map((col) => (
//                     <Box
//                       key={`${rowIndex}-${col.key}`}
//                       sx={{
//                         py: 0.6,
//                         px: 1,
//                         borderRadius: 1.5,
//                         border: "1.5px solid",
//                         borderStyle: active ? "solid" : "dashed",
//                         borderColor: active ? "primary.main" : "divider",
//                         bgcolor: active
//                           ? "action.selected"
//                           : "background.paper",
//                         opacity: active ? 1 : 0.7,
//                       }}
//                     >
//                       <Typography
//                         variant="body2"
//                         sx={{ fontFamily: mono, fontWeight: 700 }}
//                       >
//                         {row[col.key]}
//                       </Typography>
//                     </Box>
//                   ));
//                 })}
//               </Box>
//             </Box>
//           )}
//         </Box>
//       </Paper>

//       {/* Current step details */}
//       <Paper
//         variant="outlined"
//         sx={{
//           p: { xs: 1.7, sm: 2.2 },
//           borderRadius: 2.5,
//           borderColor: "divider",
//           borderTop: "4px solid",
//           borderTopColor: "primary.main",
//           bgcolor: "background.paper",
//         }}
//       >
//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//           gap={1}
//           sx={{ mb: 1.3 }}
//         >
//           <Typography
//             variant="caption"
//             sx={{
//               color: "primary.main",
//               fontWeight: 850,
//               letterSpacing: 0.8,
//               textTransform: "uppercase",
//             }}
//           >
//             {t.stepLabel} {stepIndex + 1}
//           </Typography>

//           <Chip
//             label={step.phase}
//             size="small"
//             sx={{
//               bgcolor: "action.selected",
//               color: "primary.main",
//               typography: "caption",
//               fontWeight: 850,
//             }}
//           />
//         </Stack>

//         <Typography
//           component="h2"
//           variant="h3"
//           sx={{
//             fontWeight: 850,
//             mb: 1,
//           }}
//         >
//           {content.title}
//         </Typography>

//         <Typography
//           variant="body1"
//           sx={{
//             color: "text.secondary",
//             lineHeight: 1.8,
//           }}
//         >
//           {content.detail}
//         </Typography>
//       </Paper>

//       {/* Navigation */}
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         gap={1}
//       >
//         <Button
//           variant="outlined"
//           size="small"
//           disabled={stepIndex === 0}
//           onClick={() =>
//             setStepIndex((v) => Math.max(0, v - 1))
//           }
//           sx={{
//             textTransform: "none",
//             borderRadius: 2,
//           }}
//         >
//           ← {t.previous}
//         </Button>

//         <Button
//           variant="text"
//           size="small"
//           color="inherit"
//           startIcon={<ReplayRoundedIcon />}
//           onClick={() => setStepIndex(0)}
//           sx={{ textTransform: "none" }}
//         >
//           {t.restart}
//         </Button>

//         <Button
//           variant="contained"
//           size="small"
//           endIcon={<ArrowForwardRoundedIcon />}
//           disabled={stepIndex === NAT_STEPS.length - 1}
//           onClick={() =>
//             setStepIndex((v) =>
//               Math.min(NAT_STEPS.length - 1, v + 1)
//             )
//           }
//           sx={{
//             textTransform: "none",
//             borderRadius: 2,
//             boxShadow: "none",
//           }}
//         >
//           {t.next}
//         </Button>
//       </Stack>
//     </Stack>
//   );
// }
import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

import { UI, type Lang } from "../../../i18n";
import { NAT_LABELS, NAT_STEPS, type NatStep } from "../data/NAT";

const mono = "ui-monospace, Menlo, monospace";

type Labels = (typeof NAT_LABELS)[Lang];

function isPrivateIp(addr: string) {
  const ip = addr.split(":")[0];
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 10 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
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

  const on = (n: "private" | "router" | "internet") =>
    step.activeNodes.includes(n);
  const deviceOn = (d: "A" | "C") =>
    on("private") &&
    (step.activeDevices.length === 0 || step.activeDevices.includes(d));

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
      <text x={36} y={y + 38} fontSize={13} fontWeight={800} fill={c.warn} fontFamily={mono}>
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
        "@media (prefers-reduced-motion: reduce)": {
          "& .nat-token": { transition: "none !important" },
        },
      }}
    >
      <svg
        viewBox="0 0 760 280"
        role="img"
        aria-label={`${l.homeNetwork} → ${l.router} → ${l.internetPublic}`}
        style={{ width: "100%", minWidth: 600, height: "auto", display: "block", fontFamily: "inherit" }}
      >
        <defs>
          <marker id="nat-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill={c.muted} />
          </marker>
        </defs>

        {/* Zones */}
        <rect x={8} y={18} width={256} height={244} rx={18} fill="none" stroke={on("private") ? c.warn : c.line} strokeWidth={1.5} strokeDasharray="6 5" />
        <text x={22} y={42} fontSize={12} fontWeight={700} fill={c.muted}>
          {l.homeNetwork}
        </text>
        <rect x={496} y={18} width={256} height={244} rx={18} fill="none" stroke={on("internet") ? c.primary : c.line} strokeWidth={1.5} strokeDasharray="6 5" />
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
        <text x={375} y={161} textAnchor="middle" fontSize={14} fontWeight={800} fill={c.primary} fontFamily={mono}>
          2.3.4.5
        </text>

        {/* DNS */}
        <rect x={530} y={100} width={190} height={110} rx={16} {...box(on("internet"))} />
        <text x={625} y={124} textAnchor="middle" fontSize={13} fontWeight={800} fill={c.text}>
          🖥️ {l.dnsName}
        </text>
        <text x={625} y={145} textAnchor="middle" fontSize={14} fontWeight={800} fill={c.primary} fontFamily={mono}>
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

function PacketField({
  label,
  value,
  rewritten,
  was,
  l,
}: {
  label: string;
  value: string;
  rewritten: boolean;
  was?: string;
  l: Labels;
}) {
  const priv = isPrivateIp(value);
  return (
    <Box
      sx={{
        flex: "1 1 200px",
        py: 1,
        px: 1.3,
        borderRadius: 2,
        border: "1.5px solid",
        borderColor: rewritten ? "primary.main" : "divider",
        bgcolor: rewritten ? "action.selected" : "background.paper",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
          {label}
        </Typography>
        <Chip
          size="small"
          label={priv ? l.private : l.public}
          color={priv ? "warning" : "success"}
          variant="outlined"
          sx={{ height: 20, fontSize: 11, fontWeight: 700 }}
        />
      </Stack>
      <Typography variant="body1" sx={{ fontFamily: mono, fontWeight: 800 }}>
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

  const tableColumns = [
    { key: "insidePrivate", label: l.insidePrivate },
    { key: "insidePublic", label: l.insidePublic },
    { key: "outsidePublic", label: l.outsidePublic },
  ] as const;

  const goTo = (i: number) =>
    setStepIndex(Math.min(NAT_STEPS.length - 1, Math.max(0, i)));

  return (
    <Stack spacing={2.3}>
      {/* Lesson heading */}
      <Box>
        <Typography variant="subtitle2" sx={{ color: "primary.main", mb: 0.5 }}>
          {l.lessonTitle}
        </Typography>

        <Typography
          component="h1"
          variant="h1"
          sx={{ letterSpacing: "-0.6px", mb: 0.6 }}
        >
          {l.heroTitle}
        </Typography>

        <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          {l.heroSubtitle}
        </Typography>
      </Box>

      {/* Availability and step count */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Chip
          label={t.available}
          size="small"
          sx={{
            bgcolor: "success.main",
            color: "#fff",
            typography: "caption",
            fontWeight: 800,
          }}
        />

        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 700 }}>
          {t.stepLabel} {stepIndex + 1} {t.of} {NAT_STEPS.length}
        </Typography>
      </Stack>

      {/* Clickable segmented progress */}
      <Stack direction="row" gap={0.5}>
        {NAT_STEPS.map((s, i) => (
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
              opacity: i === stepIndex ? 1 : i < stepIndex ? 0.55 : 1,
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
        sx={{
          p: { xs: 1.6, sm: 2 },
          borderRadius: 2.5,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        {step.scene === "problem" && (
          <Stack alignItems="center" spacing={1} sx={{ py: 3, textAlign: "center" }}>
            <Typography sx={{ fontSize: 28 }} aria-hidden>
              💻 📱 🖥️ 🖨️ 📺 📷 ⌚
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontFamily: mono, fontWeight: 800, color: "primary.main", wordBreak: "break-word" }}
            >
              {l.problemBig}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {l.problemCaption}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 480 }}>
              {l.problemNote}
            </Typography>
          </Stack>
        )}

        {step.scene === "cards" && content.cards && (
          <Box
            sx={{
              display: "grid",
              gap: 1.2,
              gridTemplateColumns: { xs: "1fr", sm: `repeat(${content.cards.length}, 1fr)` },
            }}
          >
            {content.cards.map((card, i) => (
              <Box
                key={card.name}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  border: "1.5px solid",
                  borderColor: step.id === "types" && i === 2 ? "primary.main" : "divider",
                  bgcolor: step.id === "types" && i === 2 ? "action.selected" : "background.paper",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 800, fontFamily: step.id === "types" ? undefined : mono, mb: 0.5 }}
                >
                  {card.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                  {card.text}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {step.scene === "diagram" && (
          <>
            <NatDiagram step={step} l={l} />

            {/* Current packet */}
            {step.packet && (
              <Box sx={{ mt: 1.8 }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 800, color: "text.secondary", display: "block", mb: 0.8 }}
                >
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
            <Box sx={{ mt: 1.8 }}>
              <Typography variant="caption" sx={{ color: "text.primary", fontWeight: 800, display: "block" }}>
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
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, minmax(130px, 1fr))",
                      gap: 0.6,
                      minWidth: 420,
                    }}
                  >
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
                            py: 0.6,
                            px: 1,
                            borderRadius: 1.5,
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
                              fontFamily: mono,
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
      </Paper>

      {/* Current step details */}
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

        {content.points && (
          <Box
            component="ul"
            sx={{ m: 0, mt: 1.4, pl: 2.6, color: "text.secondary", lineHeight: 1.8, "& li::marker": { color: "primary.main" } }}
          >
            {content.points.map((pt) => (
              <li key={pt}>
                <Typography variant="body1" component="span" sx={{ color: "text.primary" }}>
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
          <Box
            sx={{
              mt: 1.4,
              p: 1.3,
              borderRadius: 2,
              border: "1.5px dashed",
              borderColor: "primary.main",
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              <strong>
                {l.keyTerm}: {content.term.name}
              </strong>
              {" — "}
              {content.term.meaning}
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
          disabled={stepIndex === NAT_STEPS.length - 1}
          onClick={() => goTo(stepIndex + 1)}
          sx={{ textTransform: "none", borderRadius: 2, boxShadow: "none" }}
        >
          {t.next}
        </Button>
      </Stack>
    </Stack>
  );
}