import React, { useState } from "react";
import { Box, Chip, Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import { ROUTING_STEPS, ROUTING_LABELS, type Lang, type RouteNode } from "../data/RoutingLesson";
import {
  Callout,
  LessonHeader,
  LessonPage,
  LessonStatus,
  Panel,
  RADIUS,
  StepBar,
  StepCard,
  StepNav,
  insetSx,
  labelSx,
  nodeSx,
} from "../../../shared/lessonKit";
import { FONT } from "../../../config/design";

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

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="subtitle1" sx={{ mb: 0.8 }}>
    {children}
  </Typography>
);

const NetworkDiagram: React.FC<{ stepIndex: number; lang: Lang }> = ({ stepIndex, lang }) => {
  const theme = useTheme();
  const step = ROUTING_STEPS[stepIndex];
  const t = ROUTING_LABELS[lang];
  const nodeColor = (kind: RouteNode["kind"]) => {
    if (kind === "router") return theme.palette.primary.main;
    if (kind === "switch") return theme.palette.secondary.main;
    if (kind === "internet") return theme.palette.info.main;
    if (kind === "network") return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return (
    <Panel>
      <SectionTitle>{t.diagram}</SectionTitle>
      <Stack spacing={1}>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", justifyContent: "center", gap: 0.75 }}>
          {step.scene.nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <Box
                sx={{
                  ...nodeSx(alpha(nodeColor(node.kind), 0.75), alpha(nodeColor(node.kind), 0.08)),
                  flex: "1 1 110px",
                  minWidth: 100,
                  maxWidth: 190,
                }}
              >
                <Box sx={{ color: nodeColor(node.kind), display: "flex", justifyContent: "center", mb: 0.25 }}>
                  {getIcon(node.kind)}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.3 }}>
                  {node.label[lang]}
                </Typography>
                {node.detail && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>
                    {node.detail[lang]}
                  </Typography>
                )}
              </Box>
              {index < step.scene.nodes.length - 1 && (
                <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", color: "primary.main", fontWeight: 800 }}>⟶</Box>
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
                  sx={{ maxWidth: "100%", height: "auto", "& .MuiChip-label": { whiteSpace: "normal", py: 0.4 } }}
                />
              );
            })}
          </Box>
        )}

        {step.scene.packets?.map((item, index) => (
          <Typography key={index} variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
            • {item[lang]}
          </Typography>
        ))}
      </Stack>
    </Panel>
  );
};

const NumberDot = ({ n }: { n: number }) => (
  <Box
    sx={{
      width: 22,
      height: 22,
      borderRadius: "50%",
      flexShrink: 0,
      display: "grid",
      placeItems: "center",
      bgcolor: "action.selected",
      color: "primary.main",
      typography: "caption",
      fontWeight: 800,
      mt: 0.15,
    }}
  >
    {n}
  </Box>
);

const RoutingLesson: React.FC<{ lang: Lang }> = ({ lang }) => {
  const isHindi = lang === "hi";
  const labels = ROUTING_LABELS[lang];
  const [stepIndex, setStepIndex] = useState(0);

  const step = ROUTING_STEPS[stepIndex];
  if (!step) return null;

  const last = ROUTING_STEPS.length - 1;
  const isLast = stepIndex === last;
  const goTo = (i: number) => setStepIndex(Math.max(0, Math.min(last, i)));

  return (
    <LessonPage>
      <LessonHeader
        eyebrow="NETWORKING · ROUTING"
        title={isHindi ? "Network mein Routing kaise kaam karti hai" : "How Routing Works in Networks"}
        subtitle={
          isHindi
            ? "Samjho ki routers IP packets ke liye rasta kaise chunte hain aur data ek network se doosre network tak kaise pahunchta hai."
            : "Explore how routers choose paths for IP packets and how data travels from one network to another."
        }
      />

      <LessonStatus availableLabel="Available" right={`${stepIndex + 1} / ${ROUTING_STEPS.length} · ${Math.round(((stepIndex + 1) / ROUTING_STEPS.length) * 100)}% ${labels.progress}`} />

      <StepBar
        total={ROUTING_STEPS.length}
        index={stepIndex}
        onSelect={goTo}
        label={(i) => `${i + 1}. ${ROUTING_STEPS[i].title[lang]}`}
      />

      <Callout label={isHindi ? "Yaad rakho" : "Remember"} tone="info">
        {isHindi
          ? "Switch aam taur par ek LAN ke andar MAC address se frames forward karta hai. Router destination IP aur routing table ke basis par alag-alag networks ke beech packets forward karta hai."
          : "A switch usually forwards frames within a LAN using MAC addresses. A router forwards packets between networks using the destination IP address and its routing table."}
      </Callout>

      {/* Topic picker */}
      <Box>
        <Typography sx={{ ...labelSx, display: "block", mb: 0.8 }}>{isHindi ? "Routing topics" : "Routing topics"}</Typography>
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: { xs: "column", md: "row" },
            gridAutoColumns: { xs: "minmax(190px, 1fr)", md: "unset" },
            gridTemplateColumns: { md: `repeat(${Math.min(ROUTING_STEPS.length, 4)}, minmax(0, 1fr))` },
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
                  px: 1.1,
                  py: 0.9,
                  borderRadius: RADIUS.inner,
                  minWidth: 0,
                  borderColor: active ? "primary.main" : "divider",
                  bgcolor: active ? "action.selected" : "background.paper",
                  transition: "background-color .18s ease, border-color .18s ease",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <NumberDot n={index + 1} />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.title[lang]}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
                    {item.phase[lang]}
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Box>
      </Box>

      <StepCard stepText={`${stepIndex + 1} / ${ROUTING_STEPS.length}`} badge={step.phase[lang]} title={step.title[lang]}>
        <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 1.5 }}>
          {step.summary[lang]}
        </Typography>

        <Stack spacing={1.5}>
          <NetworkDiagram stepIndex={stepIndex} lang={lang} />

          {step.example && (
            <Callout label={labels.example} tone="info">
              <Box component="span" sx={{ whiteSpace: "pre-line" }}>{step.example[lang]}</Box>
            </Callout>
          )}

          <Box>
            <SectionTitle>{isHindi ? "Yeh kaise kaam karta hai" : "How it works"}</SectionTitle>
            <Stack spacing={0.9}>
              {step.explanation.map((item, index) => (
                <Stack key={index} direction="row" spacing={1} alignItems="flex-start">
                  <NumberDot n={index + 1} />
                  <Typography variant="body1" sx={{ lineHeight: 1.65 }}>{item[lang]}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Divider />

          <Box>
            <SectionTitle>{labels.keyPoints}</SectionTitle>
            <Stack spacing={0.7}>
              {step.keyPoints.map((item, index) => (
                <Stack key={index} direction="row" spacing={1} alignItems="flex-start">
                  <CheckCircleOutlineRoundedIcon color="success" sx={{ fontSize: FONT.h4, mt: 0.2 }} />
                  <Typography variant="body1" sx={{ lineHeight: 1.65 }}>{item[lang]}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {isLast && (
            <Box sx={{ ...insetSx, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "success.main", fontWeight: 800 }}>{labels.completed}</Typography>
            </Box>
          )}
        </Stack>
      </StepCard>

      <StepNav
        index={stepIndex}
        last={last}
        onPrev={() => goTo(stepIndex - 1)}
        onNext={() => goTo(stepIndex + 1)}
        onRestart={() => goTo(0)}
        labels={labels}
      />
    </LessonPage>
  );
};

export default RoutingLesson;
