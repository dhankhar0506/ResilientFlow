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
import { MAC_LABELS, MAC_STEPS } from "../data/MacAddress";

const MAC_EXAMPLE = "FA:34:F3:AF:09:00";

const MAC_BYTES = MAC_EXAMPLE.split(":");

function toBinary(hex: string) {
  return parseInt(hex, 16).toString(2).padStart(8, "0");
}

export default function MacAddress({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);

  const t = UI[lang];
  const l = MAC_LABELS[lang];
  const step = MAC_STEPS[stepIndex];
  const content = step[lang];

  const progress = ((stepIndex + 1) / MAC_STEPS.length) * 100;

  const showMac = stepIndex >= 3;
  const showParts = stepIndex >= 5;

  return (
    <Stack spacing={2.3}>
      {/* Header */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
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
            fontWeight: 850,
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

      {/* Status */}
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
          {t.stepLabel} {stepIndex + 1} {t.of} {MAC_STEPS.length}
        </Typography>
      </Stack>

      {/* Progress */}
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

      {/* MAC Address Visualization */}
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
            display: "block",
            textTransform: "uppercase",
          }}
        >
          {l.example}
        </Typography>

        {/* Main MAC */}
        {showMac ? (
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            gap={0.6}
          >
            {MAC_BYTES.map((byte, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                gap={0.6}
              >
                <Box
                  sx={{
                    minWidth: 48,
                    textAlign: "center",
                    py: 1,
                    px: 0.8,
                    borderRadius: 2,
                    border: "1.5px solid",
                    borderColor:
                      showParts && index < 3
                        ? "primary.main"
                        : showParts
                          ? "secondary.main"
                          : "divider",
                    bgcolor: "action.selected",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 850,
                      fontFamily: "ui-monospace, Menlo, monospace",
                    }}
                  >
                    {byte}
                  </Typography>

                  {stepIndex >= 4 && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontFamily: "ui-monospace, Menlo, monospace",
                        mt: 0.3,
                        display: "block",
                      }}
                    >
                      {toBinary(byte)}
                    </Typography>
                  )}
                </Box>

                {index < MAC_BYTES.length - 1 && (
                  <Typography
                    variant="h5"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                    }}
                  >
                    :
                  </Typography>
                )}
              </Stack>
            ))}
          </Stack>
        ) : (
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "action.selected",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              {step.icon}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mt: 0.8,
              }}
            >
              {step.example}
            </Typography>
          </Box>
        )}

        {/* Byte / Bit Count */}
        {showMac && (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={0.8}
            sx={{ mt: 1.6 }}
          >
            <Chip
              label={`6 ${l.bytes}`}
              size="small"
              sx={{
                bgcolor: "action.selected",
                color: "primary.main",
                typography: "caption",
                fontWeight: 850,
              }}
            />

            <Chip
              label={`48 ${l.bits}`}
              size="small"
              sx={{
                bgcolor: "action.selected",
                color: "secondary.main",
                typography: "caption",
                fontWeight: 850,
              }}
            />
          </Stack>
        )}

        {/* OUI / Interface Identifier */}
        {showParts && (
          <Box sx={{ mt: 1.8 }}>
            <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ mb: 1 }}>
              <Chip
                label={`FA:34:F3 · ${l.organization}`}
                size="small"
                sx={{
                  bgcolor: "action.selected",
                  color: "primary.main",
                  typography: "caption",
                  fontWeight: 850,
                }}
              />

              <Chip
                label={`AF:09:00 · ${l.device}`}
                size="small"
                sx={{
                  bgcolor: "action.selected",
                  color: "secondary.main",
                  typography: "caption",
                  fontWeight: 850,
                }}
              />
            </Stack>

            <Stack
              direction="row"
              sx={{
                height: 8,
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <Box sx={{ flex: 1, bgcolor: "primary.main" }} />
              <Box sx={{ flex: 1, bgcolor: "secondary.main" }} />
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 0.6 }}
            >
              <Typography variant="caption" color="text.secondary">
                24 bits
              </Typography>

              <Typography variant="caption" color="text.secondary">
                24 bits
              </Typography>
            </Stack>
          </Box>
        )}
      </Paper>

      {/* Lesson Details */}
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
          variant="h2"
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

        {/* Key Point */}
        <Box
          sx={{
            mt: 1.8,
            p: 1.5,
            borderRadius: 2,
            bgcolor: "action.selected",
            borderLeft: "3px solid",
            borderLeftColor: "primary.main",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "primary.main",
              fontWeight: 850,
              textTransform: "uppercase",
              display: "block",
              mb: 0.6,
            }}
          >
            {l.keyPoint}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.7,
            }}
          >
            {content.keyPoint}
          </Typography>
        </Box>
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
          ← {l.previous}
        </Button>

        <Button
          variant="text"
          size="small"
          color="inherit"
          startIcon={<ReplayRoundedIcon />}
          onClick={() => setStepIndex(0)}
          sx={{ textTransform: "none" }}
        >
          {l.restart}
        </Button>

        <Button
          variant="contained"
          size="small"
          endIcon={<ArrowForwardRoundedIcon />}
          disabled={stepIndex === MAC_STEPS.length - 1}
          onClick={() =>
            setStepIndex((v) =>
              Math.min(MAC_STEPS.length - 1, v + 1)
            )
          }
          sx={{
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",
          }}
        >
          {l.next}
        </Button>
      </Stack>
    </Stack>
  );
}