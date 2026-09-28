// import { useMemo, useState } from 'react';
// import {
//     Accordion,
//     AccordionDetails,
//     AccordionSummary,
//     Alert,
//     Box,
//     Chip,
//     Divider,
//     Paper,
//     Stack,
//     Tab,
//     Tabs,
//     Typography,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { osiLayers, tcpIpLayers, osiTcpIpMapping, whatsappFlow, type NetworkLayer } from '../data/OSI_TCP_IP';

// const layerColors = ['#64748b', '#0f766e', '#2563eb', '#7c3aed', '#c2410c', '#0891b2', '#4f46e5'];

// function LayerStack({ layers, compact = false }: { layers: NetworkLayer[]; compact?: boolean }) {
//     return (
//         <Stack spacing={1}>
//             {[...layers].reverse().map((layer) => (
//                 <Paper
//                     key={`${layer.number}-${layer.name}`}
//                     variant="outlined"
//                     sx={{
//                         p: compact ? 1.2 : 1.8,
//                         borderLeft: `6px solid ${layerColors[layer.number - 1]}`,
//                         bgcolor: 'background.paper',
//                     }}
//                 >
//                     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }}>
//                         <Chip size="small" label={`Layer ${layer.number}`} sx={{ alignSelf: 'flex-start', fontWeight: 700 }} />
//                         <Typography fontWeight={700}>{layer.name}</Typography>
//                         <Box sx={{ flexGrow: 1 }} />
//                         <Typography variant="body2" color="text.secondary">{layer.protocols.join(' · ')}</Typography>
//                     </Stack>
//                     {!compact && <Typography variant="body2" sx={{ mt: 1 }}>{layer.shortDescription}</Typography>}
//                 </Paper>
//             ))}
//         </Stack>
//     );
// }

// function FlowDiagram() {
//     const steps = [
//         ['Application data', 'Message / HTTP request / app protocol'],
//         ['Representation & protection', 'Encoding, serialization, compression, encryption concepts'],
//         ['Transport', 'Ports; TCP segments or UDP datagrams; QUIC runs over UDP'],
//         ['Internet / Network', 'IP packet; source and destination IP; routing'],
//         ['Network access', 'Local frame; MAC addressing on Ethernet/Wi-Fi'],
//         ['Physical medium', 'Bits carried as radio, electrical, or optical signals'],
//     ];
//     return (
//         <Stack alignItems="stretch" spacing={0}>
//             {steps.map(([title, detail], index) => (
//                 <Box key={title}>
//                     <Paper variant="outlined" sx={{ p: 1.5, textAlign: 'center', bgcolor: index % 2 ? 'action.hover' : 'background.paper' }}>
//                         <Typography fontWeight={700}>{title}</Typography>
//                         <Typography variant="body2" color="text.secondary">{detail}</Typography>
//                     </Paper>
//                     {index < steps.length - 1 && (
//                         <Typography aria-hidden textAlign="center" color="text.secondary" sx={{ py: 0.4, fontSize: 22 }}>↓</Typography>
//                     )}
//                 </Box>
//             ))}
//         </Stack>
//     );
// }

// export default function NetworkModelsLesson() {
//     const [tab, setTab] = useState(0);
//     const [expanded, setExpanded] = useState<string | false>('layer-7');
//     const osiByNumber = useMemo(() => [...osiLayers].sort((a, b) => b.number - a.number), []);

//     return (
//         <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 3 } }}>
//             <Stack spacing={3}>
//                 <Box>
//                     <Typography variant="h4" fontWeight={800} gutterBottom>OSI Model & TCP/IP Model</Typography>
//                     <Typography color="text.secondary">
//                         A practical, layer-by-layer guide to how application data is represented, transported, routed, and transmitted across a network.
//                     </Typography>
//                 </Box>

//                 <Alert severity="info">
//                     <strong>Remember:</strong> OSI is a conceptual 7-layer reference model. Real Internet protocols do not always fit neatly into one OSI layer; TLS, QUIC, and application-managed sessions are common examples.
//                 </Alert>

//                 <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto">
//                     <Tab label="OSI 7 Layers" />
//                     <Tab label="Data Flow Diagram" />
//                     <Tab label="WhatsApp Example" />
//                     <Tab label="OSI vs TCP/IP" />
//                 </Tabs>

//                 {tab === 0 && (
//                     <Stack spacing={2}>
//                         <Paper variant="outlined" sx={{ p: 2 }}>
//                             <Typography variant="h6" fontWeight={800}>OSI — Open Systems Interconnection</Typography>
//                             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Read from Layer 7 (closest to the app) down to Layer 1 (closest to the physical medium).</Typography>
//                             <LayerStack layers={osiLayers} />
//                         </Paper>
//                         <Typography variant="h6" fontWeight={800}>Detailed explanation of each layer</Typography>
//                         {osiByNumber.map((layer) => (
//                             <Accordion
//                                 key={layer.number}
//                                 expanded={expanded === `layer-${layer.number}`}
//                                 onChange={(_, isOpen) => setExpanded(isOpen ? `layer-${layer.number}` : false)}
//                             >
//                                 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                                     <Stack direction="row" spacing={1.5} alignItems="center">
//                                         <Chip label={layer.number} size="small" />
//                                         <Typography fontWeight={700}>{layer.name}</Typography>
//                                     </Stack>
//                                 </AccordionSummary>
//                                 <AccordionDetails>
//                                     <Stack spacing={1.5}>
//                                         <Typography>{layer.description}</Typography>
//                                         <Typography variant="subtitle2">Main responsibilities</Typography>
//                                         <Box component="ul" sx={{ m: 0, pl: 3 }}>{layer.responsibilities.map((item) => <li key={item}><Typography variant="body2">{item}</Typography></li>)}</Box>
//                                         <Typography variant="subtitle2">Protocols / examples</Typography>
//                                         <Stack direction="row" flexWrap="wrap" gap={1}>{layer.protocols.map((item) => <Chip key={item} label={item} size="small" variant="outlined" />)}</Stack>
//                                         <Alert severity="info" icon={false}><strong>Key point:</strong> {layer.keyPoint}</Alert>
//                                     </Stack>
//                                 </AccordionDetails>
//                             </Accordion>
//                         ))}
//                     </Stack>
//                 )}

//                 {tab === 1 && (
//                     <Stack spacing={2}>
//                         <Typography variant="h6" fontWeight={800}>How data moves down the stack</Typography>
//                         <Typography color="text.secondary">At the sender, each lower layer adds information needed for delivery (encapsulation). At the receiver, the process is reversed (decapsulation).</Typography>
//                         <FlowDiagram />
//                         <Paper variant="outlined" sx={{ p: 2 }}>
//                             <Typography fontWeight={800} gutterBottom>Example: JavaScript object → bytes</Typography>
//                             <Box component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', bgcolor: 'action.hover', p: 2, borderRadius: 1, overflowX: 'auto' }}>{`JavaScript object\n{ name: "Gourav", age: 25 }\n        ↓ serialize as JSON\n{"name":"Gourav","age":25}\n        ↓ encode text as UTF-8\nBytes: 7B 22 6E 61 6D 65 22 3A ...`}</Box>
//                             <Typography variant="body2" color="text.secondary">Serialization converts a data structure into a transferable representation. UTF-8 encodes text into bytes. JSON is a format, not a transport protocol.</Typography>
//                         </Paper>
//                     </Stack>
//                 )}

//                 {tab === 2 && (
//                     <Stack spacing={2}>
//                         <Typography variant="h6" fontWeight={800}>Real-life example: sending “Hi, kaise ho?” on WhatsApp</Typography>
//                         <Alert severity="warning">This is a conceptual mapping, not a claim that WhatsApp uses every OSI layer as a separate module or always uses one specific transport protocol.</Alert>
//                         {whatsappFlow.map((step) => (
//                             <Paper key={step.number} variant="outlined" sx={{ p: 2 }}>
//                                 <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
//                                     <Chip label={`Step ${step.number}`} size="small" color="primary" />
//                                     <Typography fontWeight={800}>{step.title}</Typography>
//                                 </Stack>
//                                 <Typography>{step.description}</Typography>
//                                 {step.points.length > 0 && <Box component="ul" sx={{ mb: 0, pl: 3 }}>{step.points.map((point) => <li key={point}><Typography variant="body2">{point}</Typography></li>)}</Box>}
//                             </Paper>
//                         ))}
//                         <Paper variant="outlined" sx={{ p: 2 }}>
//                             <Typography fontWeight={800} gutterBottom>At a high level</Typography>
//                             <FlowDiagram />
//                             <Divider sx={{ my: 2 }} />
//                             <Typography variant="body2" color="text.secondary">The message may travel from the phone over Wi-Fi or mobile radio, through the ISP and multiple routers, to service infrastructure. Return traffic follows routing decisions too; the exact path can differ.</Typography>
//                         </Paper>
//                     </Stack>
//                 )}

//                 {tab === 3 && (
//                     <Stack spacing={2}>
//                         <Typography variant="h6" fontWeight={800}>OSI vs TCP/IP model</Typography>
//                         <Paper variant="outlined" sx={{ p: 2 }}>
//                             <Typography variant="subtitle1" fontWeight={700} gutterBottom>Layer mapping</Typography>
//                             {osiTcpIpMapping.map((row) => (
//                                 <Stack key={row.osi} direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }} sx={{ py: 1.2 }}>
//                                     <Box sx={{ flex: 1 }}><Typography fontWeight={600}>{row.osi}</Typography></Box>
//                                     <Typography color="text.secondary">→</Typography>
//                                     <Box sx={{ flex: 1 }}><Typography fontWeight={600}>{row.tcpIp}</Typography></Box>
//                                 </Stack>
//                             ))}
//                         </Paper>
//                         <Typography variant="h6" fontWeight={800}>TCP/IP model — 4 layers</Typography>
//                         <LayerStack layers={tcpIpLayers} />
//                         <Alert severity="info">TCP/IP is the practical protocol suite and model used to describe Internet communication. In the common 4-layer view, OSI Application + Presentation + Session map to TCP/IP Application; OSI Data Link + Physical map to Network Access.</Alert>
//                     </Stack>
//                 )}
//             </Stack>
//         </Box>
//     );
// }

import { useState, type ReactNode } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Chip,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { UI, type Lang } from "../../../i18n";
import {
  ENCAP_STEPS,
  GOLDEN_RULES,
  JOURNEY_DEVICES,
  JSON_EXAMPLE,
  MNEMONICS,
  OSI_LABELS,
  OSI_LAYERS,
  SAMPLE_BITS,
  TCPIP_LAYERS,
  WHATSAPP_STEPS,
} from "../data/OSI_TCP_IP";

const MONO = "ui-monospace, Menlo, monospace";

/** Semi-transparent version of any CSS colour */
const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;



function useLayerColor() {
  const theme = useTheme();
  return (n: number) =>
    `color-mix(in srgb, ${theme.palette.primary.main} ${Math.round(((n - 1) / 6) * 100)}%, ${theme.palette.secondary.main})`;
}

const ORDERED_LAYERS = [...OSI_LAYERS].sort((a, b) => b.number - a.number); // 7 → 1

/* ───────────────────────── Small building blocks ───────────────────────── */

function LayerBadge({ n, size = 26 }: { n: number; size?: number }) {
  const color = useLayerColor()(n);
  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.46,
        fontWeight: 850,
        color: "text.primary",
        border: `2px solid ${color}`,
        bgcolor: tint(color, 22),
      }}
    >
      {n}
    </Box>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 10.5, fontWeight: 850, letterSpacing: 0.6, color: "text.secondary", textTransform: "uppercase", mb: 0.7 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <Box component="ul" sx={{ m: 0, pl: 2.4 }}>
      {items.map((item) => (
        <Typography component="li" key={item} sx={{ fontSize: 13, lineHeight: 1.75, color: "text.secondary" }}>
          {item}
        </Typography>
      ))}
    </Box>
  );
}

function ChipRow({ items }: { items: readonly string[] }) {
  return (
    <Stack direction="row" flexWrap="wrap" gap={0.7}>
      {items.map((item) => (
        <Chip key={item} label={item} size="small" variant="outlined" sx={{ fontSize: 11, fontWeight: 700 }} />
      ))}
    </Stack>
  );
}

const cardSx = { p: { xs: 1.7, sm: 2.2 }, borderRadius: "16px", borderColor: "divider", bgcolor: "background.paper" } as const;

/* ───────────────────────── Tab 1: 7 layers ───────────────────────── */

function LayersTab({ lang }: { lang: Lang }) {
  const l = OSI_LABELS[lang];
  const layerColor = useLayerColor();
  const [selected, setSelected] = useState(7);

  const layer = OSI_LAYERS.find((x) => x.number === selected) ?? OSI_LAYERS[6];
  const content = layer[lang];
  const color = layerColor(layer.number);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 5fr) minmax(0, 7fr)" }, gap: 2, alignItems: "start" }}>
      {/* Left: the stack diagram */}
      <Stack spacing={1}>
        <Typography sx={{ fontSize: 11.5, color: "text.secondary", fontWeight: 700 }}>{l.stackHint}</Typography>
        {ORDERED_LAYERS.map((item) => {
          const c = layerColor(item.number);
          const active = item.number === selected;
          return (
            <ButtonBase
              key={item.number}
              onClick={() => setSelected(item.number)}
              aria-pressed={active}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                width: "100%",
                textAlign: "left",
                p: "10px 12px",
                borderRadius: "12px",
                border: "1.5px solid",
                borderColor: active ? c : "divider",
                borderLeft: `6px solid ${c}`,
                bgcolor: active ? tint(c, 14) : "background.paper",
                transition: "background-color 0.15s, transform 0.15s",
                "&:hover": { transform: "translateX(2px)" },
              }}
            >
              <LayerBadge n={item.number} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 800 }}>{item.name}</Typography>
                <Typography sx={{ fontSize: 11.5, color: "text.secondary" }}>{item[lang].tagline}</Typography>
              </Box>
              <Chip label={item.pdu} size="small" sx={{ fontSize: 10, fontWeight: 800, bgcolor: "action.selected", color: "text.primary" }} />
            </ButtonBase>
          );
        })}
      </Stack>

      {/* Right: layer details */}
      <Paper variant="outlined" sx={{ ...cardSx, borderTop: `4px solid ${color}`, position: { md: "sticky" }, top: { md: 16 } }}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" gap={1.2}>
            <LayerBadge n={layer.number} size={36} />
            <Box>
              <Typography component="h2" sx={{ fontSize: 20, fontWeight: 850, lineHeight: 1.2 }}>
                {l.layerWord} {layer.number} · {layer.name}
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>{content.tagline}</Typography>
            </Box>
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={0.8}>
            <Chip label={`${l.pdu}: ${layer.pdu}`} size="small" sx={{ fontSize: 10.5, fontWeight: 850, bgcolor: "action.selected", color: "primary.main" }} />
            <Chip label={`${l.addressing}: ${layer.addressing}`} size="small" sx={{ fontSize: 10.5, fontWeight: 850, bgcolor: "action.selected", color: "secondary.main" }} />
          </Stack>

          <Section title={l.whatItDoes}>
            <Typography sx={{ fontSize: 13, lineHeight: 1.8, color: "text.secondary" }}>{content.description}</Typography>
          </Section>

          <Section title={l.responsibilities}>
            <Bullets items={content.responsibilities} />
          </Section>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            <Section title={l.protocols}>
              <ChipRow items={layer.protocols} />
            </Section>
            <Section title={l.devices}>
              <ChipRow items={layer.devices} />
            </Section>
          </Box>

          <Section title={l.example}>
            <Box sx={{ p: 1.4, borderRadius: "10px", bgcolor: "action.hover" }}>
              <Typography sx={{ fontSize: 13, lineHeight: 1.75 }}>{content.example}</Typography>
            </Box>
          </Section>

          <Section title={`🚚 ${l.analogy}`}>
            <Typography sx={{ fontSize: 13, lineHeight: 1.75, color: "text.secondary" }}>{content.analogy}</Typography>
          </Section>

          <Alert severity="info" icon={false} sx={{ fontSize: 13, borderRadius: "10px" }}>
            <strong>{l.keyPoint}:</strong> {content.keyPoint}
          </Alert>

          <Box sx={{ p: 1.4, borderRadius: "10px", borderLeft: "4px solid", borderColor: "warning.main", bgcolor: "action.hover" }}>
            <Typography sx={{ fontSize: 10.5, fontWeight: 850, letterSpacing: 0.6, textTransform: "uppercase", color: "warning.main", mb: 0.5 }}>
              ⚠ {l.troubleshooting}
            </Typography>
            <Typography sx={{ fontSize: 13, lineHeight: 1.7, color: "text.secondary" }}>{content.troubleshooting}</Typography>
          </Box>

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Button
              size="small"
              variant="outlined"
              disabled={layer.number === 7}
              startIcon={<KeyboardArrowUpRoundedIcon />}
              onClick={() => setSelected((v) => Math.min(7, v + 1))}
              sx={{ textTransform: "none", borderRadius: "10px" }}
            >
              {l.layerUp}
            </Button>
            <Button
              size="small"
              variant="outlined"
              disabled={layer.number === 1}
              endIcon={<KeyboardArrowDownRoundedIcon />}
              onClick={() => setSelected((v) => Math.max(1, v - 1))}
              sx={{ textTransform: "none", borderRadius: "10px" }}
            >
              {l.layerDown}
            </Button>
          </Stack>

          <Typography sx={{ fontSize: 10.5, color: "text.secondary" }}>{l.asterisk}</Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

/* ───────────────────────── Tab 2: encapsulation ───────────────────────── */

function Block({ layer, label }: { layer: number; label: string }) {
  const color = useLayerColor()(layer);
  return (
    <Box
      sx={{
        px: 1.2,
        py: 1,
        borderRadius: "8px",
        border: `1.5px solid ${color}`,
        bgcolor: tint(color, 20),
        textAlign: "center",
        whiteSpace: "nowrap",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ fontSize: 11.5, fontWeight: 850 }}>{label}</Typography>
      <Typography sx={{ fontSize: 9, color: "text.secondary", fontWeight: 700 }}>L{layer}</Typography>
    </Box>
  );
}

function Wrap({ name, layer, children }: { name: string; layer: number; children: ReactNode }) {
  const color = useLayerColor()(layer);
  return (
    <Box sx={{ position: "relative", border: `2px dashed ${color}`, borderRadius: "12px", p: "22px 10px 10px", bgcolor: tint(color, 6) }}>
      <Chip
        label={name}
        size="small"
        sx={{
          position: "absolute",
          top: -12,
          left: 10,
          height: 22,
          fontSize: 10.5,
          fontWeight: 850,
          bgcolor: "background.paper",
          border: `1.5px solid ${color}`,
          color: "text.primary",
        }}
      />
      <Stack direction="row" gap={0.8} alignItems="stretch">
        {children}
      </Stack>
    </Box>
  );
}

function EncapsulationTab({ lang }: { lang: Lang }) {
  const l = OSI_LABELS[lang];
  const t = UI[lang];
  const layerColor = useLayerColor();
  const [direction, setDirection] = useState<"send" | "receive">("send");
  const [index, setIndex] = useState(0);

  const maxIndex = ENCAP_STEPS.length - 1;
  const level = direction === "send" ? index : maxIndex - index;
  const step = ENCAP_STEPS[level];
  const stepText = step[lang];

  // Build the nested boxes from the inside out
  let diagram: ReactNode = <Block layer={7} label="Application data" />;
  if (level >= 1) {
    diagram = (
      <Wrap name="Segment" layer={4}>
        <Block layer={4} label="TCP header" />
        {diagram}
      </Wrap>
    );
  }
  if (level >= 2) {
    diagram = (
      <Wrap name="Packet" layer={3}>
        <Block layer={3} label="IP header" />
        {diagram}
      </Wrap>
    );
  }
  if (level >= 3) {
    diagram = (
      <Wrap name="Frame" layer={2}>
        <Block layer={2} label="Eth header" />
        {diagram}
        <Block layer={2} label="FCS" />
      </Wrap>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography sx={{ color: "text.secondary", fontSize: 13, lineHeight: 1.7 }}>{l.encapHint}</Typography>

      <Paper variant="outlined" sx={cardSx}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={direction}
              onChange={(_, value) => {
                if (value) {
                  setDirection(value);
                  setIndex(0);
                }
              }}
              sx={{ "& .MuiToggleButton-root": { textTransform: "none", fontSize: 12, fontWeight: 700, px: 1.6 } }}
            >
              <ToggleButton value="send">↓ {l.sender}</ToggleButton>
              <ToggleButton value="receive">↑ {l.receiver}</ToggleButton>
            </ToggleButtonGroup>
            <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "text.secondary" }}>
              {l.stepWord} {index + 1} {t.of} {ENCAP_STEPS.length}
            </Typography>
          </Stack>

          {/* Diagram */}
          <Box sx={{ overflowX: "auto", py: 1.5 }}>
            <Box sx={{ width: "max-content", minWidth: "100%" }}>{diagram}</Box>
          </Box>

          {level === 4 && (
            <Box sx={{ p: 1.4, borderRadius: "10px", border: `1.5px solid ${layerColor(1)}`, bgcolor: tint(layerColor(1), 12) }}>
              <Typography sx={{ fontSize: 10.5, fontWeight: 850, color: "text.secondary", mb: 0.5 }}>{l.bitsOnMedium}</Typography>
              <Typography sx={{ fontFamily: MONO, fontSize: 12, overflowX: "auto", whiteSpace: "nowrap" }}>{SAMPLE_BITS}</Typography>
            </Box>
          )}

          {/* Explanation */}
          <Box sx={{ p: 1.6, borderRadius: "12px", bgcolor: "action.hover" }}>
            <Typography sx={{ fontSize: 15, fontWeight: 850, mb: 0.6 }}>{stepText.title}</Typography>
            <Typography sx={{ fontSize: 13, lineHeight: 1.8, color: "text.secondary" }}>
              {direction === "send" ? stepText.send : stepText.receive}
            </Typography>
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
            <Button variant="outlined" size="small" disabled={index === 0} onClick={() => setIndex((v) => Math.max(0, v - 1))} sx={{ textTransform: "none", borderRadius: "10px" }}>
              ← {t.previous}
            </Button>
            <Button variant="text" size="small" color="inherit" startIcon={<ReplayRoundedIcon />} onClick={() => setIndex(0)} sx={{ textTransform: "none" }}>
              {t.restart}
            </Button>
            <Button
              variant="contained"
              size="small"
              endIcon={<ArrowForwardRoundedIcon />}
              disabled={index === maxIndex}
              onClick={() => setIndex((v) => Math.min(maxIndex, v + 1))}
              sx={{ textTransform: "none", borderRadius: "10px", boxShadow: "none" }}
            >
              {t.next}
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={cardSx}>
        <Typography sx={{ fontSize: 15, fontWeight: 850, mb: 1 }}>{l.jsonTitle}</Typography>
        <Box
          component="pre"
          sx={{ m: 0, p: 1.6, borderRadius: "10px", overflowX: "auto", bgcolor: "action.hover", color: "secondary.main", fontFamily: MONO, fontSize: 12, lineHeight: 1.7 }}
        >
          {JSON_EXAMPLE}
        </Box>
        <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 1, lineHeight: 1.7 }}>{l.jsonNote}</Typography>
      </Paper>
    </Stack>
  );
}

/* ───────────────────────── Tab 3: OSI vs TCP/IP ───────────────────────── */

function MappingTab({ lang }: { lang: Lang }) {
  const l = OSI_LABELS[lang];
  const layerColor = useLayerColor();

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={cardSx}>
        <Box sx={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 32px minmax(0,1fr)", columnGap: 1, mb: 1.2 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 850, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5 }}>{l.osiHeader}</Typography>
          <span />
          <Typography sx={{ fontSize: 11, fontWeight: 850, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5 }}>{l.tcpHeader}</Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) 32px minmax(0,1fr)",
            gridTemplateRows: "repeat(7, minmax(52px, auto))",
            columnGap: 1,
            rowGap: "6px",
          }}
        >
          {ORDERED_LAYERS.map((layer, i) => {
            const c = layerColor(layer.number);
            return (
              <Box
                key={layer.number}
                sx={{
                  gridColumn: 1,
                  gridRow: i + 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.2,
                  borderRadius: "10px",
                  border: `1.5px solid ${c}`,
                  bgcolor: tint(c, 14),
                }}
              >
                <LayerBadge n={layer.number} size={24} />
                <Typography sx={{ fontSize: 13, fontWeight: 800 }}>{layer.name}</Typography>
              </Box>
            );
          })}

          <Box sx={{ gridColumn: 2, gridRow: "1 / span 7", display: "flex", alignItems: "center", justifyContent: "center", color: "text.secondary", fontSize: 20 }}>→</Box>

          {TCPIP_LAYERS.map((layer) => {
            const top = Math.max(...layer.osiLayers);
            const c = layerColor(Math.round(layer.osiLayers.reduce((a, b) => a + b, 0) / layer.osiLayers.length));
            return (
              <Box
                key={layer.id}
                sx={{
                  gridColumn: 3,
                  gridRow: `${8 - top} / span ${layer.osiLayers.length}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  px: 1.4,
                  py: 1,
                  borderRadius: "10px",
                  border: `2px solid ${c}`,
                  bgcolor: tint(c, 22),
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 850 }}>{layer.name}</Typography>
                <Typography sx={{ fontSize: 11, color: "text.secondary", mt: 0.3 }}>{layer.protocols.join(" · ")}</Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>

      <Alert severity="info" sx={{ fontSize: 13, borderRadius: "10px" }}>{l.mappingNote}</Alert>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.5 }}>
        {[...TCPIP_LAYERS].reverse().map((layer) => (
          <Paper key={layer.id} variant="outlined" sx={{ ...cardSx, p: 1.8 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} sx={{ mb: 0.8 }}>
              <Typography sx={{ fontSize: 15, fontWeight: 850 }}>{layer.name}</Typography>
              <Chip
                label={`OSI ${[...layer.osiLayers].sort((a, b) => b - a).join(" + ")}`}
                size="small"
                sx={{ fontSize: 10, fontWeight: 850, bgcolor: "action.selected", color: "primary.main" }}
              />
            </Stack>
            <Typography sx={{ fontSize: 13, lineHeight: 1.75, color: "text.secondary", mb: 1 }}>{layer[lang].description}</Typography>
            <ChipRow items={layer.protocols} />
          </Paper>
        ))}
      </Box>

      <Typography sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.7 }}>💡 {l.whyBoth}</Typography>
    </Stack>
  );
}

/* ───────────────────────── Tab 4: real example ───────────────────────── */

function JourneyDiagram({ lang }: { lang: Lang }) {
  const l = OSI_LABELS[lang];
  const layerColor = useLayerColor();

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `150px repeat(${JOURNEY_DEVICES.length}, minmax(96px, 1fr))`,
          gap: "6px",
          minWidth: 560,
        }}
      >
        <span />
        {JOURNEY_DEVICES.map((device) => (
          <Box key={device.en} sx={{ textAlign: "center", pb: 0.5 }}>
            <Typography sx={{ fontSize: 22, lineHeight: 1.2 }}>{device.icon}</Typography>
            <Typography sx={{ fontSize: 11.5, fontWeight: 800 }}>{device[lang]}</Typography>
            <Typography sx={{ fontSize: 10, color: "text.secondary" }}>
              {l.upTo}
              {lang === "en" ? " " : ""}
              {device.upTo}
            </Typography>
          </Box>
        ))}

        {ORDERED_LAYERS.map((layer) => {
          const c = layerColor(layer.number);
          return (
            <Box key={layer.number} sx={{ display: "contents" }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <LayerBadge n={layer.number} size={22} />
                <Typography sx={{ fontSize: 12, fontWeight: 800 }}>{layer.name}</Typography>
              </Stack>
              {JOURNEY_DEVICES.map((device) => {
                const on = layer.number <= device.upTo;
                return (
                  <Box
                    key={`${layer.number}-${device.en}`}
                    aria-label={on ? `${device.en}: ${l.processes} ${layer.number}` : undefined}
                    sx={{
                      height: 34,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 850,
                      border: on ? `1.5px solid ${c}` : "1.5px dashed",
                      borderColor: on ? c : "divider",
                      bgcolor: on ? tint(c, 26) : "transparent",
                      color: on ? "text.primary" : "text.secondary",
                      opacity: on ? 1 : 0.5,
                    }}
                  >
                    {on ? "●" : ""}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function ExampleTab({ lang }: { lang: Lang }) {
  const l = OSI_LABELS[lang];
  const layerColor = useLayerColor();

  return (
    <Stack spacing={2}>
      <Typography component="h2" sx={{ fontSize: 18, fontWeight: 850 }}>{l.exampleTitle}</Typography>
      <Alert severity="warning" sx={{ fontSize: 13, borderRadius: "10px" }}>{l.exampleWarning}</Alert>

      {WHATSAPP_STEPS.map((step) => {
        const c = layerColor(step.layer);
        const text = step[lang];
        return (
          <Paper key={step.number} variant="outlined" sx={{ ...cardSx, borderLeft: `6px solid ${c}` }}>
            <Stack direction="row" alignItems="center" gap={1.2} sx={{ mb: 1 }}>
              <LayerBadge n={step.layer} size={28} />
              <Box>
                <Typography sx={{ fontSize: 10, fontWeight: 850, letterSpacing: 0.7, color: "text.secondary", textTransform: "uppercase" }}>
                  {UI[lang].stepLabel} {step.number} · {l.layerWord} {step.layer}
                </Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 850 }}>{text.title}</Typography>
              </Box>
            </Stack>
            <Typography sx={{ fontSize: 13, lineHeight: 1.8, color: "text.secondary", mb: 0.8 }}>{text.description}</Typography>
            <Bullets items={text.points} />
          </Paper>
        );
      })}

      <Paper variant="outlined" sx={cardSx}>
        <Typography sx={{ fontSize: 16, fontWeight: 850, mb: 0.6 }}>{l.journeyTitle}</Typography>
        <Typography sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.7, mb: 1.6 }}>{l.journeyIntro}</Typography>
        <JourneyDiagram lang={lang} />
        <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.7, mt: 1.4 }}>{l.journeyNote}</Typography>
      </Paper>
    </Stack>
  );
}

/* ───────────────────────── Tab 5: cheat sheet ───────────────────────── */

function CheatSheetTab({ lang }: { lang: Lang }) {
  const l = OSI_LABELS[lang];
  const layerColor = useLayerColor();

  const headCell = { fontSize: 11, fontWeight: 850, textTransform: "uppercase", letterSpacing: 0.5, color: "text.secondary" } as const;
  const bodyCell = { fontSize: 12.5, verticalAlign: "top" } as const;

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ ...cardSx, p: 0, overflow: "hidden" }}>
        <TableContainer>
          <Table size="small" sx={{ minWidth: 720 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={headCell}>{l.colLayer}</TableCell>
                <TableCell sx={headCell}>{l.colName}</TableCell>
                <TableCell sx={headCell}>{l.colPdu}</TableCell>
                <TableCell sx={headCell}>{l.colAddress}</TableCell>
                <TableCell sx={headCell}>{l.colDevices}</TableCell>
                <TableCell sx={headCell}>{l.colProtocols}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ORDERED_LAYERS.map((layer) => (
                <TableRow key={layer.number} sx={{ borderLeft: `5px solid ${layerColor(layer.number)}` }}>
                  <TableCell sx={bodyCell}>
                    <LayerBadge n={layer.number} size={24} />
                  </TableCell>
                  <TableCell sx={{ ...bodyCell, fontWeight: 800 }}>{layer.name}</TableCell>
                  <TableCell sx={bodyCell}>{layer.pdu}</TableCell>
                  <TableCell sx={bodyCell}>{layer.addressing}</TableCell>
                  <TableCell sx={bodyCell}>{layer.devices.join(", ")}</TableCell>
                  <TableCell sx={bodyCell}>{layer.protocols.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Typography sx={{ fontSize: 10.5, color: "text.secondary" }}>{l.asterisk}</Typography>

      <Paper variant="outlined" sx={cardSx}>
        <Typography sx={{ fontSize: 15, fontWeight: 850, mb: 1.2 }}>🧠 {l.mnemonicTitle}</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5 }}>
          <Box sx={{ p: 1.4, borderRadius: "10px", bgcolor: "action.hover" }}>
            <Typography sx={{ fontSize: 10.5, fontWeight: 850, color: "text.secondary", textTransform: "uppercase", mb: 0.4 }}>{l.mnemonicUp}</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 800 }}>{MNEMONICS.up}</Typography>
          </Box>
          <Box sx={{ p: 1.4, borderRadius: "10px", bgcolor: "action.hover" }}>
            <Typography sx={{ fontSize: 10.5, fontWeight: 850, color: "text.secondary", textTransform: "uppercase", mb: 0.4 }}>{l.mnemonicDown}</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 800 }}>{MNEMONICS.down}</Typography>
          </Box>
        </Box>
      </Paper>

      <Paper variant="outlined" sx={cardSx}>
        <Typography sx={{ fontSize: 15, fontWeight: 850, mb: 1 }}>⭐ {l.rulesTitle}</Typography>
        <Bullets items={GOLDEN_RULES.map((rule) => rule[lang])} />
      </Paper>
    </Stack>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function OsiModel({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const l = OSI_LABELS[lang];
  const [tab, setTab] = useState(0);

  return (
    <Stack spacing={2.3}>
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "primary.main", mb: 0.5 }}>{l.lessonTitle}</Typography>
        <Typography component="h1" sx={{ fontSize: { xs: 22, sm: 27 }, fontWeight: 850, letterSpacing: "-0.6px", mb: 0.6 }}>
          {l.heroTitle}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 13, lineHeight: 1.6 }}>{l.heroSubtitle}</Typography>
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Chip label={t.available} size="small" sx={{ bgcolor: "success.main", color: "#fff", fontSize: 10, fontWeight: 800 }} />
      </Stack>

      <Alert severity="info" sx={{ fontSize: 13, borderRadius: "10px" }}>
        <strong>{lang === "en" ? "Remember" : "Yaad rakho"}:</strong> {l.note}
      </Alert>

      <Tabs
        value={tab}
        onChange={(_, value: number) => setTab(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: "1px solid", borderColor: "divider", "& .MuiTab-root": { textTransform: "none", fontWeight: 800, fontSize: 13.5 } }}
      >
        {l.tabs.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>

      {tab === 0 && <LayersTab lang={lang} />}
      {tab === 1 && <EncapsulationTab lang={lang} />}
      {tab === 2 && <MappingTab lang={lang} />}
      {tab === 3 && <ExampleTab lang={lang} />}
      {tab === 4 && <CheatSheetTab lang={lang} />}
    </Stack>
  );
}