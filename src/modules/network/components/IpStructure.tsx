import { useState } from "react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { UI, type Lang } from "../../../i18n";
import { IP_LABELS, IP_STEPS } from "../data/IpStructure";
import {
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
  labelSx,
} from "../../../shared/lessonKit";
import { SIZE } from "../../../config/design";

function toBinary(octet: string) {
  return Number(octet).toString(2).padStart(8, "0");
}

export default function IpStructure({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);

  const t = UI[lang];
  const l = IP_LABELS[lang];
  const step = IP_STEPS[stepIndex];
  const content = step[lang];
  const last = IP_STEPS.length - 1;
  const octets = step.example.split(".");

  const goTo = (i: number) => setStepIndex(Math.min(last, Math.max(0, i)));

  return (
    <LessonPage>
      <LessonHeader eyebrow={l.lessonTitle} title={l.heroTitle} subtitle={l.heroSubtitle} />

      <LessonStatus
        availableLabel={t.available}
        right={`${t.stepLabel} ${stepIndex + 1} ${t.of} ${IP_STEPS.length}`}
      />

      <StepBar
        total={IP_STEPS.length}
        index={stepIndex}
        onSelect={goTo}
        label={(i) => `${t.stepLabel} ${i + 1}`}
      />

      <LessonBody
        visual={
      <Panel>
        <Typography sx={{ ...labelSx, mb: 1, display: "block" }}>{step.example}</Typography>

        <Stack direction="row" alignItems="center" flexWrap="wrap" gap={0.6}>
          {octets.map((octet, i) => {
            const active = step.highlightOctets.includes(i);
            return (
              <Stack direction="row" alignItems="center" key={i} spacing={0.6}>
                <Box
                  sx={{
                    textAlign: "center",
                    minWidth: SIZE.octetMinWidth,
                    py: 0.8,
                    px: 0.8,
                    borderRadius: RADIUS.inner,
                    border: "1.5px solid",
                    borderStyle: active ? "solid" : "dashed",
                    borderColor: active ? "primary.main" : "divider",
                    bgcolor: active ? "action.selected" : "background.paper",
                    opacity: active ? 1 : 0.55,
                  }}
                >
                  <Typography variant="h3" sx={{ fontFamily: MONO }}>
                    {octet}
                  </Typography>

                  {step.showBinary && (
                    <Typography variant="caption" sx={{ display: "block", fontFamily: MONO, color: "primary.main" }}>
                      {toBinary(octet)}
                    </Typography>
                  )}

                  <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
                    {l.octet} {i + 1}
                  </Typography>
                </Box>

                {i < octets.length - 1 && (
                  <Typography variant="h3" sx={{ color: "text.secondary" }}>
                    .
                  </Typography>
                )}
              </Stack>
            );
          })}
        </Stack>

        {/* Bits progress */}
        <Box sx={{ mt: 1.6 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {l.bitsExplained}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              {step.bitsSoFar} / 32
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={(step.bitsSoFar / 32) * 100}
            color="secondary"
            sx={{ height: SIZE.progressHeightSmall, borderRadius: RADIUS.pill, bgcolor: "action.hover" }}
          />

          {step.bitsSoFar === 32 && (
            <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.6, display: "block" }}>
              {l.totalWeight}: <strong>32 bits · 4 bytes</strong>
            </Typography>
          )}
        </Box>
      </Panel>
        }
      >

      <StepCard stepText={`${t.stepLabel} ${stepIndex + 1}`} badge={step.phase} title={content.title}>
        <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
          {content.detail}
        </Typography>
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
