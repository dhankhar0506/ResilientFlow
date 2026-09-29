

// import React, { useMemo, useState } from "react";
// import {
//   Box,
//   Button,
//   Chip,
//   LinearProgress,
//   Paper,
//   Stack,
//   Typography,
//   useTheme,
//   Divider,
// } from "@mui/material";
// import { alpha } from "@mui/material/styles";
// import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
// import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
// import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
// import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
// import LanRoundedIcon from "@mui/icons-material/LanRounded";
// import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
// import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
// import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
// import { ROUTING_STEPS, ROUTING_LABELS, type Lang, type RouteNode } from "../data/RoutingLesson";

// type RoutingLessonProps = { lang: Lang };

// const getIcon = (kind: RouteNode["kind"]) => {
//   switch (kind) {
//     case "laptop": return <LaptopMacRoundedIcon fontSize="small" />;
//     case "switch": return <LanRoundedIcon fontSize="small" />;
//     case "router": return <RouterRoundedIcon fontSize="small" />;
//     case "internet": return <PublicRoundedIcon fontSize="small" />;
//     case "server": return <DnsRoundedIcon fontSize="small" />;
//     default: return <LanRoundedIcon fontSize="small" />;
//   }
// };

// /* Small section heading (sentence case, readable size) */
// const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "text.secondary", mb: 1, fontSize: "0.85rem" }}>
//     {children}
//   </Typography>
// );

// const NetworkDiagram: React.FC<{ stepIndex: number; lang: Lang }> = ({ stepIndex, lang }) => {
//   const theme = useTheme();
//   const step = ROUTING_STEPS[stepIndex];
//   const t = ROUTING_LABELS[lang];
//   const isDark = theme.palette.mode === "dark";
//   const nodeColor = (kind: RouteNode["kind"]) => {
//     if (kind === "router") return theme.palette.primary.main;
//     if (kind === "switch") return theme.palette.secondary.main;
//     if (kind === "internet") return theme.palette.info.main;
//     if (kind === "network") return theme.palette.warning.main;
//     return theme.palette.success.main;
//   };

//   return (
//     <Paper
//       variant="outlined"
//       sx={{ p: 1.5, borderRadius: 2, borderColor: "divider", bgcolor: alpha(theme.palette.primary.main, isDark ? 0.035 : 0.025) }}
//     >
//       <SectionTitle>{t.diagram}</SectionTitle>
//       <Stack spacing={1}>
//         <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", justifyContent: "center", gap: 0.75 }}>
//           {step.scene.nodes.map((node, index) => (
//             <React.Fragment key={node.id}>
//               <Paper
//                 variant="outlined"
//                 sx={{
//                   flex: "1 1 110px",
//                   minWidth: 100,
//                   maxWidth: 190,
//                   p: 1,
//                   borderRadius: 2,
//                   borderColor: alpha(nodeColor(node.kind), 0.75),
//                   bgcolor: alpha(nodeColor(node.kind), isDark ? 0.14 : 0.07),
//                   textAlign: "center",
//                 }}
//               >
//                 <Box sx={{ color: nodeColor(node.kind), display: "flex", justifyContent: "center", mb: 0.25 }}>
//                   {getIcon(node.kind)}
//                 </Box>
//                 <Typography variant="body2" sx={{ fontWeight: 800, fontSize: "0.85rem", lineHeight: 1.3 }}>
//                   {node.label[lang]}
//                 </Typography>
//                 {node.detail && (
//                   <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25, fontSize: "0.75rem" }}>
//                     {node.detail[lang]}
//                   </Typography>
//                 )}
//               </Paper>
//               {index < step.scene.nodes.length - 1 && (
//                 <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", color: "primary.main", fontWeight: 900, fontSize: "1.1rem" }}>
//                   ⟶
//                 </Box>
//               )}
//             </React.Fragment>
//           ))}
//         </Box>

//         {step.scene.links.length > 0 && (
//           <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 0.5 }}>
//             {step.scene.links.map((link, index) => {
//               const from = step.scene.nodes.find((n) => n.id === link.from)?.label[lang] ?? link.from;
//               const to = step.scene.nodes.find((n) => n.id === link.to)?.label[lang] ?? link.to;
//               return (
//                 <Chip
//                   key={`${link.from}-${link.to}-${index}`}
//                   size="small"
//                   variant={link.active ? "filled" : "outlined"}
//                   color={link.active ? "primary" : "default"}
//                   label={`${from} → ${to}${link.label ? ` · ${link.label[lang]}` : ""}`}
//                   sx={{ maxWidth: "100%", height: "auto", fontSize: "0.75rem", "& .MuiChip-label": { whiteSpace: "normal", py: 0.5 } }}
//                 />
//               );
//             })}
//           </Box>
//         )}

//         {step.scene.packets?.map((item, index) => (
//           <Typography key={index} variant="caption" color="text.secondary" sx={{ textAlign: "center", fontSize: "0.78rem" }}>
//             • {item[lang]}
//           </Typography>
//         ))}
//       </Stack>
//     </Paper>
//   );
// };

// const RoutingLesson: React.FC<RoutingLessonProps> = ({ lang }) => {
//   const theme = useTheme();
//   const isDark = theme.palette.mode === "dark";
//   const isHindi = lang === "hi";
//   const labels = ROUTING_LABELS[lang];
//   const [stepIndex, setStepIndex] = useState(0);

//   // Hooks must run before any early return.
//   const progress = useMemo(() => ((stepIndex + 1) / ROUTING_STEPS.length) * 100, [stepIndex]);

//   const step = ROUTING_STEPS[stepIndex];
//   if (!step) return null;

//   const isLast = stepIndex === ROUTING_STEPS.length - 1;
//   const goTo = (i: number) => setStepIndex(Math.max(0, Math.min(ROUTING_STEPS.length - 1, i)));
//   const restart = () => setStepIndex(0);

//   return (
//     <Box sx={{ width: "100%", maxWidth: 1600, mx: "auto", p: { xs: 1.5, md: 2 }, fontFamily: theme.typography.fontFamily }}>
//       {/* ── Header: title + progress on one row ── */}
//       <Stack
//         direction={{ xs: "column", md: "row" }}
//         spacing={{ xs: 1.5, md: 3 }}
//         alignItems={{ md: "flex-end" }}
//         justifyContent="space-between"
//         sx={{ mb: 1.5 }}
//       >
//         <Box sx={{ minWidth: 0 }}>
//           <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.25 }}>
//             <Typography variant="overline" sx={{ color: "primary.light", fontWeight: 900, letterSpacing: 0.4, lineHeight: 1.6 }}>
//               {isHindi ? "नेटवर्किंग · Routing" : "NETWORKING · ROUTING"}
//             </Typography>
//             <Chip
//               size="small"
//               label={isHindi ? "उपलब्ध" : "Available"}
//               sx={{ height: 20, bgcolor: alpha(theme.palette.success.main, 0.18), color: "success.main", fontWeight: 800 }}
//             />
//           </Stack>
//           <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1.25 }}>
//             {isHindi ? "नेटवर्क में Routing कैसे काम करती है" : "How Routing Works in Networks"}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 820, lineHeight: 1.6 }}>
//             {isHindi
//               ? "समझें कि routers IP packets के लिए रास्ता कैसे चुनते हैं और data एक network से दूसरे network तक कैसे पहुँचता है।"
//               : "Explore how routers choose paths for IP packets and how data travels from one network to another."}
//           </Typography>
//         </Box>

//         <Box sx={{ width: { xs: "100%", md: 280 }, flexShrink: 0 }}>
//           <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
//             <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.78rem" }}>
//               {isHindi ? "पाठ के चरण" : "Lesson steps"}
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.78rem" }}>
//               {Math.round(progress)}% {labels.progress}
//             </Typography>
//           </Stack>
//           <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3 }} />
//         </Box>
//       </Stack>

//       {/* ── Reminder: slim single-line strip ── */}
//       <Paper
//         variant="outlined"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 1,
//           px: 1.5,
//           py: 0.85,
//           mb: 1.5,
//           borderRadius: 2,
//           bgcolor: alpha(theme.palette.info.main, isDark ? 0.09 : 0.06),
//           borderColor: alpha(theme.palette.info.main, 0.25),
//         }}
//       >
//         <InfoOutlinedIcon fontSize="small" sx={{ color: "info.main", flexShrink: 0 }} />
//         <Typography variant="body2" sx={{ lineHeight: 1.55, fontSize: "0.85rem" }}>
//           <Box component="span" sx={{ fontWeight: 900, mr: 0.75 }}>{isHindi ? "याद रखें:" : "Remember:"}</Box>
//           {isHindi
//             ? "Switch आमतौर पर एक LAN के अंदर MAC address से frames forward करता है। Router destination IP और routing table के आधार पर अलग-अलग networks के बीच packets forward करता है।"
//             : "A switch usually forwards frames within a LAN using MAC addresses. A router forwards packets between networks using the destination IP address and its routing table."}
//         </Typography>
//       </Paper>

//       {/* ── Topics row on top, lesson below at full width ── */}
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//         <Box>
//           <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.75 }}>
//             <SectionTitle>{isHindi ? "Routing के विषय" : "Routing topics"}</SectionTitle>
//             <Button
//               size="small"
//               variant="outlined"
//               startIcon={<RestartAltRoundedIcon />}
//               onClick={restart}
//               sx={{ textTransform: "none", fontWeight: 800, mb: 1, py: 0.25 }}
//             >
//               {labels.restart}
//             </Button>
//           </Stack>
//           <Box
//             sx={{
//               display: "grid",
//               gridAutoFlow: { xs: "column", md: "row" },
//               gridAutoColumns: { xs: "minmax(210px, 1fr)", md: "unset" },
//               gridTemplateColumns: { md: `repeat(${ROUTING_STEPS.length}, minmax(0, 1fr))` },
//               gap: 1,
//               overflowX: { xs: "auto", md: "visible" },
//               pb: { xs: 0.5, md: 0 },
//             }}
//           >
//             {ROUTING_STEPS.map((item, index) => {
//               const active = index === stepIndex;
//               return (
//                 <Paper
//                   key={item.id}
//                   variant="outlined"
//                   onClick={() => goTo(index)}
//                   sx={{
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     px: 1.25,
//                     py: 1,
//                     borderRadius: 2,
//                     minWidth: 0,
//                     borderColor: active ? "primary.main" : "divider",
//                     borderBottom: 4,
//                     borderBottomColor: active ? "primary.light" : alpha(theme.palette.primary.main, 0.35),
//                     bgcolor: active ? alpha(theme.palette.primary.main, isDark ? 0.13 : 0.08) : "background.paper",
//                     transition: "background-color .18s ease, border-color .18s ease",
//                     "&:hover": { bgcolor: alpha(theme.palette.primary.main, isDark ? 0.1 : 0.055) },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 26,
//                       height: 26,
//                       borderRadius: "50%",
//                       flexShrink: 0,
//                       display: "grid",
//                       placeItems: "center",
//                       border: 2,
//                       borderColor: active ? "primary.light" : "divider",
//                       bgcolor: alpha(theme.palette.primary.main, 0.12),
//                       color: active ? "primary.light" : "text.secondary",
//                       fontWeight: 900,
//                       fontSize: "0.75rem",
//                     }}
//                   >
//                     {index + 1}
//                   </Box>
//                   <Box sx={{ minWidth: 0, flex: 1 }}>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontWeight: 800,
//                         fontSize: "0.82rem",
//                         lineHeight: 1.3,
//                         display: "-webkit-box",
//                         WebkitLineClamp: 2,
//                         WebkitBoxOrient: "vertical",
//                         overflow: "hidden",
//                       }}
//                     >
//                       {item.title[lang]}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block", fontSize: "0.72rem" }}>
//                       {item.phase[lang]}
//                     </Typography>
//                   </Box>
//                 </Paper>
//               );
//             })}
//           </Box>
//         </Box>

//         {/* Lesson panel */}
//         <Paper
//           variant="outlined"
//           sx={{
//             p: { xs: 1.5, sm: 2 },
//             borderRadius: 2,
//             borderColor: "divider",
//             borderTop: 4,
//             borderTopColor: "primary.light",
//             bgcolor: "background.paper",
//             minWidth: 0,
//           }}
//         >
//           <Stack spacing={1.5}>
//             {/* Title row */}
//             <Stack direction="row" spacing={1.25} alignItems="center">
//               <Box
//                 sx={{
//                   width: 36,
//                   height: 36,
//                   borderRadius: "50%",
//                   display: "grid",
//                   placeItems: "center",
//                   bgcolor: alpha(theme.palette.primary.main, 0.16),
//                   border: 2,
//                   borderColor: "primary.light",
//                   color: "primary.light",
//                   flexShrink: 0,
//                 }}
//               >
//                 <RouteRoundedIcon fontSize="small" />
//               </Box>
//               <Box sx={{ minWidth: 0, flex: 1 }}>
//                 <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.3 }}>{step.title[lang]}</Typography>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.78rem" }}>{step.phase[lang]}</Typography>
//               </Box>
//               <Chip size="small" color="primary" variant="outlined" label={`${stepIndex + 1} / ${ROUTING_STEPS.length}`} />
//             </Stack>

//             <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, maxWidth: 900 }}>
//               {step.summary[lang]}
//             </Typography>

//             {/* Two columns on large screens: visual | explanation */}
//             <Box
//               sx={{
//                 display: "grid",
//                 gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.15fr) minmax(0, 1fr)" },
//                 gap: 2,
//                 alignItems: "start",
//               }}
//             >
//               {/* Left column: diagram + example */}
//               <Stack spacing={1.5} sx={{ minWidth: 0 }}>
//                 <NetworkDiagram stepIndex={stepIndex} lang={lang} />

//                 {step.example && (
//                   <Paper
//                     variant="outlined"
//                     sx={{
//                       p: 1.5,
//                       borderRadius: 2,
//                       bgcolor: alpha(theme.palette.info.main, isDark ? 0.1 : 0.06),
//                       borderColor: alpha(theme.palette.info.main, 0.28),
//                     }}
//                   >
//                     <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "info.main", mb: 0.5, fontSize: "0.85rem" }}>
//                       {labels.example}
//                     </Typography>
//                     <Typography variant="body2" sx={{ lineHeight: 1.7 }}>{step.example[lang]}</Typography>
//                   </Paper>
//                 )}
//               </Stack>

//               {/* Right column: how it works + key points */}
//               <Stack spacing={1.5} sx={{ minWidth: 0 }}>
//                 <Box>
//                   <SectionTitle>{isHindi ? "यह कैसे काम करता है" : "How it works"}</SectionTitle>
//                   <Stack spacing={1}>
//                     {step.explanation.map((item, index) => (
//                       <Stack key={index} direction="row" spacing={1} alignItems="flex-start">
//                         <Box
//                           sx={{
//                             width: 22,
//                             height: 22,
//                             borderRadius: "50%",
//                             flexShrink: 0,
//                             display: "grid",
//                             placeItems: "center",
//                             bgcolor: alpha(theme.palette.primary.main, 0.16),
//                             color: "primary.light",
//                             fontSize: "0.72rem",
//                             fontWeight: 900,
//                             mt: 0.15,
//                           }}
//                         >
//                           {index + 1}
//                         </Box>
//                         <Typography variant="body2" sx={{ lineHeight: 1.65 }}>{item[lang]}</Typography>
//                       </Stack>
//                     ))}
//                   </Stack>
//                 </Box>

//                 <Divider />

//                 <Box>
//                   <SectionTitle>{labels.keyPoints}</SectionTitle>
//                   <Stack spacing={0.75}>
//                     {step.keyPoints.map((item, index) => (
//                       <Stack key={index} direction="row" spacing={1} alignItems="flex-start">
//                         <CheckCircleOutlineRoundedIcon color="success" fontSize="small" sx={{ mt: 0.2 }} />
//                         <Typography variant="body2" sx={{ lineHeight: 1.65 }}>{item[lang]}</Typography>
//                       </Stack>
//                     ))}
//                   </Stack>
//                 </Box>
//               </Stack>
//             </Box>

//             <Divider />

//             {/* Navigation */}
//             <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
//               <Button
//                 variant="outlined"
//                 size="small"
//                 startIcon={<ArrowBackRoundedIcon />}
//                 disabled={stepIndex === 0}
//                 onClick={() => goTo(stepIndex - 1)}
//                 sx={{ textTransform: "none", fontWeight: 800 }}
//               >
//                 {labels.previous}
//               </Button>

//               {isLast && (
//                 <Typography color="success.main" variant="body2" sx={{ fontWeight: 800, textAlign: "center" }}>
//                   {labels.completed}
//                 </Typography>
//               )}

//               <Button
//                 variant="contained"
//                 size="small"
//                 endIcon={isLast ? <CheckCircleOutlineRoundedIcon /> : <ArrowForwardRoundedIcon />}
//                 disabled={isLast}
//                 onClick={() => goTo(stepIndex + 1)}
//                 sx={{ textTransform: "none", fontWeight: 800 }}
//               >
//                 {isLast ? labels.finish : labels.next}
//               </Button>
//             </Stack>
//           </Stack>
//         </Paper>
//       </Box>
//     </Box>
//   );
// };

// export default RoutingLesson;
import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import { ROUTING_STEPS, ROUTING_LABELS, type Lang, type RouteNode } from "../data/RoutingLesson";

type RoutingLessonProps = { lang: Lang };

const getIcon = (kind: RouteNode["kind"]) => {
  switch (kind) {
    case "laptop": return <LaptopMacRoundedIcon fontSize="small" />;
    case "switch": return <LanRoundedIcon fontSize="small" />;
    case "router": return <RouterRoundedIcon fontSize="small" />;
    case "internet": return <PublicRoundedIcon fontSize="small" />;
    case "server": return <DnsRoundedIcon fontSize="small" />;
    default: return <LanRoundedIcon fontSize="small" />;
  }
};

/* Small section heading (sentence case, readable size) */
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "text.secondary", mb: 1, fontSize: "0.85rem" }}>
    {children}
  </Typography>
);

const NetworkDiagram: React.FC<{ stepIndex: number; lang: Lang }> = ({ stepIndex, lang }) => {
  const theme = useTheme();
  const step = ROUTING_STEPS[stepIndex];
  const t = ROUTING_LABELS[lang];
  const isDark = theme.palette.mode === "dark";
  const nodeColor = (kind: RouteNode["kind"]) => {
    if (kind === "router") return theme.palette.primary.main;
    if (kind === "switch") return theme.palette.secondary.main;
    if (kind === "internet") return theme.palette.info.main;
    if (kind === "network") return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return (
    <Paper
      variant="outlined"
      sx={{ p: 1.5, borderRadius: 2, borderColor: "divider", bgcolor: alpha(theme.palette.primary.main, isDark ? 0.035 : 0.025) }}
    >
      <SectionTitle>{t.diagram}</SectionTitle>
      <Stack spacing={1}>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", justifyContent: "center", gap: 0.75 }}>
          {step.scene.nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <Paper
                variant="outlined"
                sx={{
                  flex: "1 1 110px",
                  minWidth: 100,
                  maxWidth: 190,
                  p: 1,
                  borderRadius: 2,
                  borderColor: alpha(nodeColor(node.kind), 0.75),
                  bgcolor: alpha(nodeColor(node.kind), isDark ? 0.14 : 0.07),
                  textAlign: "center",
                }}
              >
                <Box sx={{ color: nodeColor(node.kind), display: "flex", justifyContent: "center", mb: 0.25 }}>
                  {getIcon(node.kind)}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 800, fontSize: "0.85rem", lineHeight: 1.3 }}>
                  {node.label[lang]}
                </Typography>
                {node.detail && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25, fontSize: "0.75rem" }}>
                    {node.detail[lang]}
                  </Typography>
                )}
              </Paper>
              {index < step.scene.nodes.length - 1 && (
                <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", color: "primary.main", fontWeight: 900, fontSize: "1.1rem" }}>
                  ⟶
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>

        {step.scene.links.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 0.5 }}>
            {step.scene.links.map((link, index) => {
              const from = step.scene.nodes.find((n) => n.id === link.from)?.label[lang] ?? link.from;
              const to = step.scene.nodes.find((n) => n.id === link.to)?.label[lang] ?? link.to;
              return (
                <Chip
                  key={`${link.from}-${link.to}-${index}`}
                  size="small"
                  variant={link.active ? "filled" : "outlined"}
                  color={link.active ? "primary" : "default"}
                  label={`${from} → ${to}${link.label ? ` · ${link.label[lang]}` : ""}`}
                  sx={{ maxWidth: "100%", height: "auto", fontSize: "0.75rem", "& .MuiChip-label": { whiteSpace: "normal", py: 0.5 } }}
                />
              );
            })}
          </Box>
        )}

        {step.scene.packets?.map((item, index) => (
          <Typography key={index} variant="caption" color="text.secondary" sx={{ textAlign: "center", fontSize: "0.78rem" }}>
            • {item[lang]}
          </Typography>
        ))}
      </Stack>
    </Paper>
  );
};

const RoutingLesson: React.FC<RoutingLessonProps> = ({ lang }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isHindi = lang === "hi";
  const labels = ROUTING_LABELS[lang];
  const [stepIndex, setStepIndex] = useState(0);

  // Hooks must run before any early return.
  const progress = useMemo(() => ((stepIndex + 1) / ROUTING_STEPS.length) * 100, [stepIndex]);

  const step = ROUTING_STEPS[stepIndex];
  if (!step) return null;

  const isLast = stepIndex === ROUTING_STEPS.length - 1;
  const goTo = (i: number) => setStepIndex(Math.max(0, Math.min(ROUTING_STEPS.length - 1, i)));
  const restart = () => setStepIndex(0);

  return (
    <Box sx={{ width: "100%", maxWidth: 1600, mx: "auto", p: { xs: 1.5, md: 2 }, fontFamily: theme.typography.fontFamily }}>
      {/* ── Header: title + progress on one row ── */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1.5, md: 3 }}
        alignItems={{ md: "flex-end" }}
        justifyContent="space-between"
        sx={{ mb: 1.5 }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.25 }}>
            <Typography variant="overline" sx={{ color: "primary.light", fontWeight: 900, letterSpacing: 0.4, lineHeight: 1.6 }}>
              {isHindi ? "NETWORKING · ROUTING" : "NETWORKING · ROUTING"}
            </Typography>
            <Chip
              size="small"
              label={isHindi ? "Available" : "Available"}
              sx={{ height: 20, bgcolor: alpha(theme.palette.success.main, 0.18), color: "success.main", fontWeight: 800 }}
            />
          </Stack>
          <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1.25 }}>
            {isHindi ? "Network mein Routing kaise kaam karti hai" : "How Routing Works in Networks"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 820, lineHeight: 1.6 }}>
            {isHindi
              ? "Samjho ki routers IP packets ke liye rasta kaise chunte hain aur data ek network se doosre network tak kaise pahunchta hai."
              : "Explore how routers choose paths for IP packets and how data travels from one network to another."}
          </Typography>
        </Box>

        <Box sx={{ width: { xs: "100%", md: 280 }, flexShrink: 0 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.78rem" }}>
              {isHindi ? "Lesson steps" : "Lesson steps"}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.78rem" }}>
              {Math.round(progress)}% {labels.progress}
            </Typography>
          </Stack>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3 }} />
        </Box>
      </Stack>

      {/* ── Reminder: slim single-line strip ── */}
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.85,
          mb: 1.5,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.info.main, isDark ? 0.09 : 0.06),
          borderColor: alpha(theme.palette.info.main, 0.25),
        }}
      >
        <InfoOutlinedIcon fontSize="small" sx={{ color: "info.main", flexShrink: 0 }} />
        <Typography variant="body2" sx={{ lineHeight: 1.55, fontSize: "0.85rem" }}>
          <Box component="span" sx={{ fontWeight: 900, mr: 0.75 }}>{isHindi ? "Yaad rakho:" : "Remember:"}</Box>
          {isHindi
            ? "Switch aam taur par ek LAN ke andar MAC address se frames forward karta hai. Router destination IP aur routing table ke basis par alag-alag networks ke beech packets forward karta hai."
            : "A switch usually forwards frames within a LAN using MAC addresses. A router forwards packets between networks using the destination IP address and its routing table."}
        </Typography>
      </Paper>

      {/* ── Topics row on top, lesson below at full width ── */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.75 }}>
            <SectionTitle>{isHindi ? "Routing topics" : "Routing topics"}</SectionTitle>
            <Button
              size="small"
              variant="outlined"
              startIcon={<RestartAltRoundedIcon />}
              onClick={restart}
              sx={{ textTransform: "none", fontWeight: 800, mb: 1, py: 0.25 }}
            >
              {labels.restart}
            </Button>
          </Stack>
          <Box
            sx={{
              display: "grid",
              gridAutoFlow: { xs: "column", md: "row" },
              gridAutoColumns: { xs: "minmax(210px, 1fr)", md: "unset" },
              gridTemplateColumns: { md: `repeat(${ROUTING_STEPS.length}, minmax(0, 1fr))` },
              gap: 1,
              overflowX: { xs: "auto", md: "visible" },
              pb: { xs: 0.5, md: 0 },
            }}
          >
            {ROUTING_STEPS.map((item, index) => {
              const active = index === stepIndex;
              return (
                <Paper
                  key={item.id}
                  variant="outlined"
                  onClick={() => goTo(index)}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1.25,
                    py: 1,
                    borderRadius: 2,
                    minWidth: 0,
                    borderColor: active ? "primary.main" : "divider",
                    borderBottom: 4,
                    borderBottomColor: active ? "primary.light" : alpha(theme.palette.primary.main, 0.35),
                    bgcolor: active ? alpha(theme.palette.primary.main, isDark ? 0.13 : 0.08) : "background.paper",
                    transition: "background-color .18s ease, border-color .18s ease",
                    "&:hover": { bgcolor: alpha(theme.palette.primary.main, isDark ? 0.1 : 0.055) },
                  }}
                >
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      border: 2,
                      borderColor: active ? "primary.light" : "divider",
                      bgcolor: alpha(theme.palette.primary.main, 0.12),
                      color: active ? "primary.light" : "text.secondary",
                      fontWeight: 900,
                      fontSize: "0.75rem",
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.82rem",
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.title[lang]}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block", fontSize: "0.72rem" }}>
                      {item.phase[lang]}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        </Box>

        {/* Lesson panel */}
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            borderColor: "divider",
            borderTop: 4,
            borderTopColor: "primary.light",
            bgcolor: "background.paper",
            minWidth: 0,
          }}
        >
          <Stack spacing={1.5}>
            {/* Title row */}
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: alpha(theme.palette.primary.main, 0.16),
                  border: 2,
                  borderColor: "primary.light",
                  color: "primary.light",
                  flexShrink: 0,
                }}
              >
                <RouteRoundedIcon fontSize="small" />
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.3 }}>{step.title[lang]}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.78rem" }}>{step.phase[lang]}</Typography>
              </Box>
              <Chip size="small" color="primary" variant="outlined" label={`${stepIndex + 1} / ${ROUTING_STEPS.length}`} />
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, maxWidth: 900 }}>
              {step.summary[lang]}
            </Typography>

            {/* Two columns on large screens: visual | explanation */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.15fr) minmax(0, 1fr)" },
                gap: 2,
                alignItems: "start",
              }}
            >
              {/* Left column: diagram + example */}
              <Stack spacing={1.5} sx={{ minWidth: 0 }}>
                <NetworkDiagram stepIndex={stepIndex} lang={lang} />

                {step.example && (
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.info.main, isDark ? 0.1 : 0.06),
                      borderColor: alpha(theme.palette.info.main, 0.28),
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "info.main", mb: 0.5, fontSize: "0.85rem" }}>
                      {labels.example}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.7, whiteSpace: "pre-line" }}>{step.example[lang]}</Typography>
                  </Paper>
                )}
              </Stack>

              {/* Right column: how it works + key points */}
              <Stack spacing={1.5} sx={{ minWidth: 0 }}>
                <Box>
                  <SectionTitle>{isHindi ? "Yeh kaise kaam karta hai" : "How it works"}</SectionTitle>
                  <Stack spacing={1}>
                    {step.explanation.map((item, index) => (
                      <Stack key={index} direction="row" spacing={1} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            flexShrink: 0,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: alpha(theme.palette.primary.main, 0.16),
                            color: "primary.light",
                            fontSize: "0.72rem",
                            fontWeight: 900,
                            mt: 0.15,
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography variant="body2" sx={{ lineHeight: 1.65 }}>{item[lang]}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <SectionTitle>{labels.keyPoints}</SectionTitle>
                  <Stack spacing={0.75}>
                    {step.keyPoints.map((item, index) => (
                      <Stack key={index} direction="row" spacing={1} alignItems="flex-start">
                        <CheckCircleOutlineRoundedIcon color="success" fontSize="small" sx={{ mt: 0.2 }} />
                        <Typography variant="body2" sx={{ lineHeight: 1.65 }}>{item[lang]}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* Navigation */}
            <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                startIcon={<ArrowBackRoundedIcon />}
                disabled={stepIndex === 0}
                onClick={() => goTo(stepIndex - 1)}
                sx={{ textTransform: "none", fontWeight: 800 }}
              >
                {labels.previous}
              </Button>

              {isLast && (
                <Typography color="success.main" variant="body2" sx={{ fontWeight: 800, textAlign: "center" }}>
                  {labels.completed}
                </Typography>
              )}

              <Button
                variant="contained"
                size="small"
                endIcon={isLast ? <CheckCircleOutlineRoundedIcon /> : <ArrowForwardRoundedIcon />}
                disabled={isLast}
                onClick={() => goTo(stepIndex + 1)}
                sx={{ textTransform: "none", fontWeight: 800 }}
              >
                {isLast ? labels.finish : labels.next}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default RoutingLesson;