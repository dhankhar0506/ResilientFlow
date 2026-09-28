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
} from "@mui/material";

import { alpha } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";

import { UI } from "../../../i18n";
import { ARP_LABELS, ARP_STEPS, type Lang } from "../data/ARPLesson";

type ARPLessonProps = {
  lang: Lang;
};

const ARPDiagram: React.FC<{ lang: Lang }> = ({ lang }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const blue = theme.palette.primary.main;
  const teal = theme.palette.secondary.main;

  const cardBg = theme.palette.background.paper;
  const border = theme.palette.divider;
  const textSecondary = theme.palette.text.secondary;

  const isHindi = lang === "hi";

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2.5,
        borderColor: border,
        bgcolor: cardBg,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: "primary.main",
          fontWeight: 700,
          mb: 1.5,
        }}
      >
        {isHindi ? "ARP kaise work karta hai?" : "How ARP Works"}
      </Typography>

      {/* Devices */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        spacing={1}
      >
        {/* PC-A */}
        <Paper
          variant="outlined"
          sx={{
            flex: 1,
            width: "100%",
            minWidth: 0,
            p: 1.5,
            borderRadius: 2.5,
            borderColor: blue,
            bgcolor: cardBg,
            textAlign: "center",
          }}
        >
          <LaptopMacRoundedIcon
            sx={{ color: blue, fontSize: 23, mb: 0.5 }}
          />

          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            PC-A ({isHindi ? "Bhejne wala" : "Sender"})
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: textSecondary, display: "block", mt: 0.5 }}
          >
            IP Address
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            192.168.1.10
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: textSecondary, display: "block", mt: 0.5 }}
          >
            MAC Address
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              overflowWrap: "anywhere",
            }}
          >
            AA:AA:AA:AA:AA:10
          </Typography>
        </Paper>

        {/* Connection */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 0.5,
          }}
        >
          <Typography
            sx={{
              color: "primary.main",
              fontSize: "1rem",
              fontWeight: 800,
              transform: { xs: "rotate(90deg)", sm: "none" },
            }}
          >
            ↔
          </Typography>
        </Box>

        {/* PC-B */}
        <Paper
          variant="outlined"
          sx={{
            flex: 1,
            width: "100%",
            minWidth: 0,
            p: 1.5,
            borderRadius: 2.5,
            borderColor: teal,
            bgcolor: cardBg,
            textAlign: "center",
          }}
        >
          <LaptopMacRoundedIcon
            sx={{ color: teal, fontSize: 23, mb: 0.5 }}
          />

          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            PC-B ({isHindi ? "Receive karne wala" : "Receiver"})
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: textSecondary, display: "block", mt: 0.5 }}
          >
            IP Address
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            192.168.1.20
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: textSecondary, display: "block", mt: 0.5 }}
          >
            MAC Address
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              overflowWrap: "anywhere",
            }}
          >
            BB:BB:BB:BB:BB:20
          </Typography>
        </Paper>
      </Stack>

      {/* LAN and ARP exchange */}
      <Box
        sx={{
          mt: 1.5,
          p: { xs: 1.25, sm: 1.5 },
          borderRadius: 2.5,
          bgcolor: alpha(blue, isDark ? 0.12 : 0.08),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.8}
          sx={{ mb: 1.25 }}
        >
          <LanRoundedIcon
            sx={{ color: "primary.main", fontSize: 18 }}
          />

          <Typography
            variant="body2"
            sx={{ color: "primary.main", fontWeight: 700 }}
          >
            {isHindi ? "Local Network / LAN" : "Local Network / LAN"}
          </Typography>
        </Stack>

        {/* ARP Request */}
        <Paper
          variant="outlined"
          sx={{
            p: 1.25,
            borderRadius: 2.5,
            borderColor: blue,
            bgcolor: cardBg,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "primary.main", fontWeight: 700 }}
          >
            1. {isHindi ? "ARP Request (Broadcast)" : "ARP Request (Broadcast)"}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: textSecondary, mt: 0.5 }}
          >
            {isHindi
              ? "Is IP address ka MAC address kis device ke paas hai?"
              : "Who has this IP address?"}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: "text.secondary",
              mt: 0.5,
              fontWeight: 700,
            }}
          >
            FF:FF:FF:FF:FF:FF
          </Typography>
        </Paper>

        {/* Down arrow */}
        <Typography
          sx={{
            textAlign: "center",
            color: "primary.main",
            py: 0.75,
            fontWeight: 800,
          }}
        >
          ↓
        </Typography>

        {/* ARP Reply */}
        <Paper
          variant="outlined"
          sx={{
            p: 1.25,
            borderRadius: 2.5,
            borderColor: teal,
            bgcolor: cardBg,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: teal, fontWeight: 700 }}
          >
            2. {isHindi ? "ARP Reply (Unicast)" : "ARP Reply (Unicast)"}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: textSecondary, mt: 0.5 }}
          >
            {isHindi
              ? "Yeh mera IP address hai. Mera MAC address yeh hai."
              : "This is my IP. Here is my MAC address."}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: "text.secondary",
              mt: 0.5,
              fontWeight: 700,
            }}
          >
            BB:BB:BB:BB:BB:20
          </Typography>
        </Paper>

        {/* Down arrow */}
        <Typography
          sx={{
            textAlign: "center",
            color: "primary.main",
            py: 0.75,
            fontWeight: 800,
          }}
        >
          ↓
        </Typography>

        {/* Data Frame */}
        <Paper
          variant="outlined"
          sx={{
            p: 1.25,
            borderRadius: 2.5,
            borderColor: blue,
            bgcolor: cardBg,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "primary.main", fontWeight: 700 }}
          >
            3. {isHindi ? "Data Frame" : "Data Frame"}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: textSecondary, mt: 0.5 }}
          >
            {isHindi
              ? "PC-A, PC-B ke MAC address ko destination bana kar Ethernet frame send karta hai."
              : "PC-A sends the frame to PC-B's MAC."}
          </Typography>
        </Paper>
      </Box>
    </Paper>
  );
};

const ARPLesson: React.FC<ARPLessonProps> = ({ lang = "en" }) => {
  const theme = useTheme();
  const [stepIndex, setStepIndex] = useState(0);

  const labels = ARP_LABELS[lang];
  const step = ARP_STEPS[stepIndex];
  const content = step[lang];

  const t = UI[lang];
  const isLast = stepIndex === ARP_STEPS.length - 1;

  const progress = useMemo(
    () => ((stepIndex + 1) / ARP_STEPS.length) * 100,
    [stepIndex]
  );

  const goPrevious = () =>
    setStepIndex((current) => Math.max(0, current - 1));

  const goNext = () =>
    setStepIndex((current) =>
      Math.min(ARP_STEPS.length - 1, current + 1)
    );

  const restart = () => setStepIndex(0);

  return (
    <Stack spacing={2.3}>
      {/* Lesson heading */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            color: "primary.main",
            mb: 0.5,
          }}
        >
          {labels.category}
        </Typography>

        <Typography
          component="h1"
          variant="h1"
          sx={{ letterSpacing: "-0.3px", mb: 0.6 }}
        >
          {labels.lessonTitle}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
          }}
        >
          {labels.description}
        </Typography>
      </Box>

      {/* Availability and step count */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
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

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontWeight: 700,
          }}
        >
          {t.stepLabel} {stepIndex + 1} {t.of} {ARP_STEPS.length}
        </Typography>
      </Stack>

      {/* Progress bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 7,
          borderRadius: 99,
          bgcolor: "action.hover",
          "& .MuiLinearProgress-bar": {
            borderRadius: 99,
            bgcolor: "primary.main",
          },
        }}
      />

      {/* ARP flow diagram */}
      <ARPDiagram lang={lang} />

      {/* Example card */}
      {step.example && (
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 1.6, sm: 2 },
            borderRadius: 2.5,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.6,
              color: "text.secondary",
              mb: 1.2,
              textTransform: "uppercase",
            }}
          >
            {labels.example}
          </Typography>

          <Box
            sx={{
              minHeight: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 2,
              py: 2,
              bgcolor: "action.hover",
              borderRadius: 2.5,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                overflowWrap: "anywhere",
              }}
            >
              {step.example}
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Current step content */}
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          sx={{ mb: 1.3 }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "primary.main",
              fontWeight: 850,
              letterSpacing: 0.8,
              textTransform: "uppercase",
            }}
          >
            {t.stepLabel} {stepIndex + 1}
          </Typography>

          {isLast && (
            <Chip
              icon={<CheckCircleOutlineRoundedIcon />}
              label={labels.recap}
              size="small"
              sx={{
                bgcolor: "action.selected",
                color: "primary.main",
                typography: "caption",
                fontWeight: 850,
              }}
            />
          )}
        </Stack>

        <Typography
          component="h2"
          variant="h3"
          sx={{
            fontWeight: 850,
            mb: 1,
          }}
        >
          {content.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
            whiteSpace: "pre-line",
          }}
        >
          {content.detail}
        </Typography>

        {/* Key point */}
        <Box
          sx={{
            mt: 2.25,
            p: 1.75,
            bgcolor: "action.hover",
            borderLeft: "3px solid",
            borderLeftColor: "primary.main",
            borderRadius: 2.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "primary.main",
              fontWeight: 800,
              mb: 0.75,
            }}
          >
            {labels.keyPoint}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            {content.keyPoint}
          </Typography>
        </Box>
      </Paper>

      {/* Navigation buttons */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        sx={{ flexWrap: "wrap" }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<ArrowBackRoundedIcon />}
          disabled={stepIndex === 0}
          onClick={goPrevious}
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          {t.previous}
        </Button>

        <Button
          variant="text"
          size="small"
          color="inherit"
          startIcon={<RestartAltRoundedIcon />}
          onClick={restart}
          sx={{ textTransform: "none" }}
        >
          {t.restart}
        </Button>

        <Button
          variant="contained"
          size="small"
          endIcon={<ArrowForwardRoundedIcon />}
          disabled={isLast}
          onClick={goNext}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",
          }}
        >
          {t.next}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ARPLesson;