
import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

import { UI, type Lang } from "../../../i18n";
import { IP_LABELS, IP_STEPS } from "../data/IpStructure";

function toBinary(octet: string) {
  return Number(octet).toString(2).padStart(8, "0");
}

export default function IpStructure({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);

  const t = UI[lang];
  const l = IP_LABELS[lang];

  const step = IP_STEPS[stepIndex];
  const content = step[lang];

  const progress = ((stepIndex + 1) / IP_STEPS.length) * 100;
  const octets = step.example.split(".");

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
          {l.lessonTitle}
        </Typography>

        <Typography
          component="h1"
          variant="h1"
          sx={{
            letterSpacing: "-0.6px",
            mb: 0.6,
          }}
        >
          {l.heroTitle}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
          }}
        >
          {l.heroSubtitle}
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
          {t.stepLabel} {stepIndex + 1} {t.of} {IP_STEPS.length}
        </Typography>
      </Stack>

      {/* Overall progress */}
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

      {/* IP address structure */}
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
          {step.example}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          gap={0.6}
        >
          {octets.map((octet, i) => {
            const active = step.highlightOctets.includes(i);

            return (
              <Stack
                direction="row"
                alignItems="center"
                key={i}
                spacing={0.6}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    minWidth: 64,
                    py: 1,
                    px: 1,
                    borderRadius: 2,
                    border: "1.5px solid",
                    borderStyle: active ? "solid" : "dashed",
                    borderColor: active ? "primary.main" : "divider",
                    bgcolor: active
                      ? "action.selected"
                      : "background.paper",
                    opacity: active ? 1 : 0.55,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800 }}
                  >
                    {octet}
                  </Typography>

                  {step.showBinary && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "ui-monospace, Menlo, monospace",
                        color: "primary.main",
                        mt: 0.3,
                      }}
                    >
                      {toBinary(octet)}
                    </Typography>
                  )}

                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      mt: 0.2,
                    }}
                  >
                    {l.octet} {i + 1}
                  </Typography>
                </Box>

                {i < octets.length - 1 && (
                  <Typography
                    variant="h4"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                    }}
                  >
                    .
                  </Typography>
                )}
              </Stack>
            );
          })}
        </Stack>

        {/* Bits progress */}
        <Box sx={{ mt: 1.8 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 0.5 }}
          >
            <Typography
              variant="caption"
              sx={{ color: "text.secondary" }}
            >
              {l.bitsExplained}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 700,
              }}
            >
              {step.bitsSoFar} / 32
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={(step.bitsSoFar / 32) * 100}
            sx={{
              height: 6,
              borderRadius: 99,
              bgcolor: "action.hover",
              "& .MuiLinearProgress-bar": {
                borderRadius: 99,
                bgcolor: "secondary.main",
              },
            }}
          />

          {step.bitsSoFar === 32 && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                mt: 0.6,
              }}
            >
              {l.totalWeight}: <strong>32 bits · 4 bytes</strong>
            </Typography>
          )}
        </Box>
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

          <Chip
            label={step.phase}
            size="small"
            sx={{
              bgcolor: "action.selected",
              color: "primary.main",
              typography: "caption",
              fontWeight: 850,
            }}
          />
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
          }}
        >
          {content.detail}
        </Typography>
      </Paper>

      {/* Navigation */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Button
          variant="outlined"
          size="small"
          disabled={stepIndex === 0}
          onClick={() =>
            setStepIndex((v) => Math.max(0, v - 1))
          }
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          ← {t.previous}
        </Button>

        <Button
          variant="text"
          size="small"
          color="inherit"
          startIcon={<ReplayRoundedIcon />}
          onClick={() => setStepIndex(0)}
          sx={{ textTransform: "none" }}
        >
          {t.restart}
        </Button>

        <Button
          variant="contained"
          size="small"
          endIcon={<ArrowForwardRoundedIcon />}
          disabled={stepIndex === IP_STEPS.length - 1}
          onClick={() =>
            setStepIndex((v) =>
              Math.min(IP_STEPS.length - 1, v + 1)
            )
          }
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
}