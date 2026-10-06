import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";

import { UI } from "../../../i18n";
import { ARP_LABELS, ARP_STEPS, type Lang } from "../data/ARPLesson";
import {
  Callout,
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
import { FONT, SIZE } from "../../../config/design";

/* ------------------------------------------------------------------ */
/*  Sequence diagram: PC-A  ⇄  messages  ⇄  PC-B                       */
/* ------------------------------------------------------------------ */

function DeviceCard({
  color,
  title,
  ip,
  mac,
  order,
}: {
  color: string;
  title: string;
  ip: string;
  mac: string;
  order: { xs: number; md: number };
}) {
  return (
    <Box
      sx={{
        ...nodeSx(color),
        order,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: 0,
        p: 1.25,
      }}
    >
      <LaptopMacRoundedIcon sx={{ color, fontSize: FONT.h2, alignSelf: "center" }} />
      <Typography variant="body2" sx={{ fontWeight: 800, mt: 0.3 }}>
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.6 }}>
        IP Address
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: MONO }}>
        {ip}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.6 }}>
        MAC Address
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: MONO, overflowWrap: "anywhere" }}>
        {mac}
      </Typography>
    </Box>
  );
}

/** One message: title + text above an arrow that points right (A → B) or left (B → A). */
function Message({
  n,
  color,
  title,
  text,
  extra,
  dir,
}: {
  n: number;
  color: string;
  title: string;
  text: string;
  extra?: string;
  dir: "right" | "left";
}) {
  const head =
    dir === "right"
      ? { right: 0, borderLeft: `10px solid ${color}` }
      : { left: 0, borderRight: `10px solid ${color}` };

  return (
    <Box sx={{ ...insetSx, bgcolor: "background.paper", border: "1px solid", borderColor: "divider", p: 1, textAlign: "center" }}>
      <Stack direction="row" alignItems="center" justifyContent="center" gap={0.8}>
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: color,
            color: "#fff",
            typography: "caption",
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {n}
        </Box>
        <Typography variant="body2" sx={{ color, fontWeight: 800 }}>
          {title}
        </Typography>
      </Stack>

      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.3 }}>
        {text}
      </Typography>
      {extra && (
        <Typography variant="caption" sx={{ display: "block", color: "text.secondary", fontWeight: 700, fontFamily: MONO }}>
          {extra}
        </Typography>
      )}

      {/* arrow */}
      <Box sx={{ position: "relative", height: 14, mt: 0.6 }}>
        <Box sx={{ position: "absolute", top: 6, left: 0, right: 0, height: 2, bgcolor: color }} />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            width: 0,
            height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            ...head,
          }}
        />
      </Box>
    </Box>
  );
}

const ARPDiagram: React.FC<{ lang: Lang }> = ({ lang }) => {
  const theme = useTheme();
  const blue = theme.palette.primary.main;
  const teal = theme.palette.secondary.main;
  const hi = lang === "hi";

  return (
    <Panel>
      <Typography variant="subtitle1" sx={{ color: "primary.main", mb: 1 }}>
        {hi ? "ARP kaise work karta hai?" : "How ARP Works"}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 1.2,
          alignItems: "stretch",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            md: "minmax(150px, 1fr) minmax(0, 2.4fr) minmax(150px, 1fr)",
          },
        }}
      >
        <DeviceCard
          order={{ xs: 1, md: 1 }}
          color={blue}
          title={`PC-A (${hi ? "Bhejne wala" : "Sender"})`}
          ip="192.168.1.10"
          mac="AA:AA:AA:AA:AA:10"
        />

        <DeviceCard
          order={{ xs: 2, md: 3 }}
          color={teal}
          title={`PC-B (${hi ? "Receive karne wala" : "Receiver"})`}
          ip="192.168.1.20"
          mac="BB:BB:BB:BB:BB:20"
        />

        {/* Messages travelling on the LAN */}
        <Box
          sx={{
            order: { xs: 3, md: 2 },
            gridColumn: { xs: "1 / -1", md: "auto" },
            p: 1,
            borderRadius: RADIUS.inner,
            bgcolor: alpha(blue, 0.08),
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.8} sx={{ mb: 0.8 }}>
            <LanRoundedIcon sx={{ color: "primary.main", fontSize: FONT.h4 }} />
            <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 800 }}>
              Local Network / LAN
            </Typography>
          </Stack>

          <Stack spacing={0.8}>
            <Message
              n={1}
              dir="right"
              color={blue}
              title="ARP Request (Broadcast)"
              text={hi ? "Is IP address ka MAC address kis device ke paas hai?" : "Who has this IP address?"}
              extra="FF:FF:FF:FF:FF:FF"
            />
            <Message
              n={2}
              dir="left"
              color={teal}
              title="ARP Reply (Unicast)"
              text={hi ? "Yeh mera IP address hai. Mera MAC address yeh hai." : "This is my IP. Here is my MAC address."}
              extra="BB:BB:BB:BB:BB:20"
            />
            <Message
              n={3}
              dir="right"
              color={blue}
              title="Data Frame"
              text={
                hi
                  ? "PC-A, PC-B ke MAC address ko destination bana kar Ethernet frame send karta hai."
                  : "PC-A sends the frame to PC-B's MAC."
              }
            />
          </Stack>
        </Box>
      </Box>
    </Panel>
  );
};

/* ------------------------------------------------------------------ */
/*  Lesson                                                             */
/* ------------------------------------------------------------------ */

const ARPLesson: React.FC<{ lang: Lang }> = ({ lang = "en" }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const labels = ARP_LABELS[lang];
  const t = UI[lang];
  const step = ARP_STEPS[stepIndex];
  const content = step[lang];
  const last = ARP_STEPS.length - 1;
  const goTo = (i: number) => setStepIndex(Math.min(last, Math.max(0, i)));

  return (
    <LessonPage>
      <LessonHeader eyebrow={labels.category} title={labels.lessonTitle} subtitle={labels.description} />
      <LessonStatus availableLabel={t.available} right={`${t.stepLabel} ${stepIndex + 1} ${t.of} ${ARP_STEPS.length}`} />
      <StepBar total={ARP_STEPS.length} index={stepIndex} onSelect={goTo} label={(i) => `${t.stepLabel} ${i + 1}`} />

      {/* Short, wide diagram on top */}
      <ARPDiagram lang={lang} />

      {/* Explanation (left) + example and key point (right) */}
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          alignItems: "start",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1.5fr) minmax(0, 1fr)" },
        }}
      >
        <StepCard
          stepText={`${t.stepLabel} ${stepIndex + 1}`}
          badge={
            stepIndex === last ? (
              <Stack direction="row" alignItems="center" gap={0.5}>
                <CheckCircleOutlineRoundedIcon sx={{ fontSize: FONT.body }} /> {labels.recap}
              </Stack>
            ) : undefined
          }
          title={content.title}
        >
          <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {content.detail}
          </Typography>
        </StepCard>

        <Stack spacing={1.5}>
          {step.example && (
            <Panel>
              <Typography sx={{ ...labelSx, mb: 0.8, display: "block" }}>{labels.example}</Typography>
              <Box sx={{ ...insetSx, minHeight: SIZE.insetMinHeight, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: 700, overflowWrap: "anywhere" }}>
                  {step.example}
                </Typography>
              </Box>
            </Panel>
          )}

          <Callout label={labels.keyPoint}>{content.keyPoint}</Callout>
        </Stack>
      </Box>

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
};

export default ARPLesson;
