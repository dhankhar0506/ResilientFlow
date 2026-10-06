import { useState, type ReactNode } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

import { DEFAULT_GATEWAY_DATA } from "../data/DefaultGateway";
import {
  Callout,
  LessonBody,
  LessonHeader,
  LessonPage,
  Panel,
  StepBar,
  StepCard,
  StepNav,
  insetSx,
  nodeSx,
} from "../../../shared/lessonKit";
import { FONT, SIZE } from "../../../config/design";

type Props = { lang?: "en" | "hi" };

const NAV_LABELS = {
  en: { previous: "Previous", restart: "Restart", next: "Next" },
  hi: { previous: "Previous", restart: "Restart", next: "Next" },
};

const DefaultGateway = ({ lang = "en" }: Props) => {
  const content = DEFAULT_GATEWAY_DATA[lang];
  const [stepIndex, setStepIndex] = useState(0);

  const step = content.steps[stepIndex];
  const total = content.steps.length;
  const last = total - 1;
  const goTo = (i: number) => setStepIndex(Math.min(last, Math.max(0, i)));

  const node = (icon: ReactNode, title: string, sub: string, highlight = false) => (
    <Box
      sx={{
        ...nodeSx(highlight ? "primary.main" : "divider", highlight ? "action.selected" : "action.hover"),
        flex: 1,
        width: "100%",
        minHeight: SIZE.nodeMinHeight,
        p: 1.25,
      }}
    >
      {icon}
      <Typography variant="body2" sx={{ fontWeight: 800, whiteSpace: "pre-line" }}>
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.2 }}>
        {sub}
      </Typography>
    </Box>
  );

  const arrow = <ArrowForwardRoundedIcon sx={{ color: "primary.main", fontSize: FONT.h3, transform: { xs: "rotate(90deg)", md: "none" } }} />;

  return (
    <LessonPage>
      <Box>
        <Chip label="Networking Lesson" color="primary" size="small" sx={{ mb: 0.8, fontWeight: 700 }} />
        <LessonHeader eyebrow="" title={content.title} subtitle={content.subtitle} />
      </Box>

      {/* Progress + clickable steps */}
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.6 }}>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
            Lesson Progress
          </Typography>
          <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 800 }}>
            {stepIndex + 1} / {total}
          </Typography>
        </Stack>
        <StepBar total={total} index={stepIndex} onSelect={goTo} label={(i) => `${i + 1}. ${content.steps[i].title}`} />
      </Box>

      <Stack direction="row" flexWrap="wrap" gap={0.6}>
        {content.steps.map((item, index) => (
          <Chip
            key={item.title}
            size="small"
            label={`${index + 1}. ${item.title}`}
            onClick={() => goTo(index)}
            color={index === stepIndex ? "primary" : "default"}
            variant={index === stepIndex ? "filled" : "outlined"}
            sx={{ height: "auto", maxWidth: "100%", "& .MuiChip-label": { whiteSpace: "normal", py: 0.4 } }}
          />
        ))}
      </Stack>

      <LessonBody
        visual={
          <Panel>
            <Typography variant="subtitle1" sx={{ mb: 1.2 }}>
              Network Flow
            </Typography>
            <Stack direction={{ xs: "column", md: "row" }} alignItems="center" spacing={{ xs: 1, md: 1.5 }}>
              {node(<LaptopMacRoundedIcon sx={{ fontSize: FONT.h2, color: "primary.main" }} />, content.diagram.laptop, "192.168.1.10")}
              {arrow}
              {node(<RouterRoundedIcon sx={{ fontSize: FONT.h2, color: "primary.main" }} />, content.diagram.router, "192.168.1.1", true)}
              {arrow}
              {node(
                <PublicRoundedIcon sx={{ fontSize: FONT.h2, color: "secondary.main" }} />,
                content.diagram.destination,
                "Internet / Remote Network",
              )}
            </Stack>
          </Panel>
        }
      >
        <StepCard stepText={`Step ${stepIndex + 1}`} title={step.title}>
          <Stack spacing={1.4}>
            <Callout label={lang === "en" ? "Simple Definition" : "Easy Definition"}>
              <Box component="span" sx={{ fontWeight: 600 }}>
                {step.definition}
              </Box>
            </Callout>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                {lang === "en" ? "Explanation" : "Aasaan Explanation"}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                {step.explanation}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 0.6 }}>
                Real-Life Example
              </Typography>
              <Box sx={insetSx}>
                <Typography variant="body1" sx={{ lineHeight: 1.65 }}>
                  {step.example}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
              <LightbulbOutlinedIcon color="primary" sx={{ fontSize: FONT.h4, mt: 0.3 }} />
              <Box sx={{ flex: 1 }}>
                <Callout label={lang === "en" ? "Remember This" : "Yaad Rakho"} tone="warning">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {step.takeaway}
                  </Box>
                </Callout>
              </Box>
            </Box>
          </Stack>
        </StepCard>
      </LessonBody>

      <StepNav
        index={stepIndex}
        last={last}
        onPrev={() => goTo(stepIndex - 1)}
        onNext={() => goTo(stepIndex + 1)}
        onRestart={() => goTo(0)}
        labels={NAV_LABELS[lang]}
      />
    </LessonPage>
  );
};

export default DefaultGateway;
