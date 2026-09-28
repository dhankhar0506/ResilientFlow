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
import {
  NETWORK_HOST_LABELS,
  NETWORK_HOST_STEPS,
} from "../data/NetworkHostCidr";

const TOTAL_BITS = 32;

function toBinary(octet: string) {
  return Number(octet).toString(2).padStart(8, "0");
}

type OctetKind = "network" | "host" | "mixed" | "none";

function getOctetKind(
  index: number,
  prefix: number | null
): OctetKind {
  if (prefix === null) return "none";

  const start = index * 8;
  const end = start + 8;

  if (end <= prefix) return "network";
  if (start >= prefix) return "host";

  return "mixed";
}

const KIND_COLOR: Record<OctetKind, string> = {
  none: "primary.main",
  network: "primary.main",
  host: "secondary.main",
  mixed: "warning.main",
};

export default function NetworkHost({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);

  const t = UI[lang];
  const l = NETWORK_HOST_LABELS[lang];
  const step = NETWORK_HOST_STEPS[stepIndex];
  const content = step[lang];

  const progress =
    ((stepIndex + 1) / NETWORK_HOST_STEPS.length) * 100;

  const octets = step.example.split(".");

  const prefix = step.prefix;
  const hasSplit = prefix !== null;
  const hostBits = hasSplit ? TOTAL_BITS - prefix : 0;
  const maxHosts = hasSplit ? 2 ** hostBits : 0;

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

      {/* Step Status */}
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
          {t.stepLabel} {stepIndex + 1} {t.of}{" "}
          {NETWORK_HOST_STEPS.length}
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

      {/* Network / IP Details */}
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
            display: "block",
          }}
        >
          {hasSplit ? `${step.example}/${prefix}` : step.example}
        </Typography>

        {/* Devices */}
        {step.devices && (
          <Box sx={{ mb: 1.8 }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 0.8,
              }}
            >
              {l.devices}
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={0.8}>
              {step.devices.map((device) => (
                <Box
                  key={device.name}
                  sx={{
                    textAlign: "center",
                    minWidth: 92,
                    py: 0.9,
                    px: 1.1,
                    borderRadius: 2,
                    border: "1.5px solid",
                    borderColor: "primary.main",
                    bgcolor: "action.selected",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ lineHeight: 1.2 }}
                  >
                    {device.icon}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 800 }}
                  >
                    {device.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "ui-monospace, Menlo, monospace",
                      color: "primary.main",
                    }}
                  >
                    {device.ip}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* IP Octets */}
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          gap={0.6}
        >
          {octets.map((octet, i) => {
            const kind = getOctetKind(i, prefix);

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
                    borderColor: KIND_COLOR[kind],
                    bgcolor: "action.selected",
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
                      component="div"
                      variant="caption"
                      sx={{
                        fontFamily: "ui-monospace, Menlo, monospace",
                        mt: 0.3,
                      }}
                    >
                      {toBinary(octet)
                        .split("")
                        .map((bit, j) => {
                          const isNetworkBit = hasSplit
                            ? i * 8 + j < prefix
                            : true;

                          return (
                            <Box
                              key={j}
                              component="span"
                              sx={{
                                color: isNetworkBit
                                  ? "primary.main"
                                  : "secondary.main",
                              }}
                            >
                              {bit}
                            </Box>
                          );
                        })}
                    </Typography>
                  )}

                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      mt: 0.2,
                      display: "block",
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

          {hasSplit && (
            <Typography
              variant="h3"
              sx={{
                fontWeight: 850,
                color: "primary.main",
                ml: 0.4,
              }}
            >
              /{prefix}
            </Typography>
          )}
        </Stack>

        {/* Network / Host Split */}
        {hasSplit && (
          <Box sx={{ mt: 1.8 }}>
            <Stack direction="row" gap={0.8} sx={{ mb: 1 }}>
              <Chip
                label={l.networkPart}
                size="small"
                sx={{
                  bgcolor: "action.selected",
                  color: "primary.main",
                  typography: "caption",
                  fontWeight: 850,
                }}
              />

              <Chip
                label={l.hostPart}
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
              justifyContent="space-between"
              sx={{ mb: 0.5 }}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                {l.bitSplit}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontWeight: 700,
                }}
              >
                {l.networkBits} {prefix} · {l.hostBits} {hostBits}
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={(prefix / TOTAL_BITS) * 100}
              sx={{
                height: 6,
                borderRadius: 99,
                bgcolor: "secondary.main",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 99,
                  bgcolor: "primary.main",
                },
              }}
            />

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mt: 0.6,
              }}
            >
              {l.maxHosts}:{" "}
              <strong>
                2^{hostBits} = {maxHosts.toLocaleString("en-US")}
              </strong>
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Step Content */}
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
          disabled={stepIndex === NETWORK_HOST_STEPS.length - 1}
          onClick={() =>
            setStepIndex((v) =>
              Math.min(NETWORK_HOST_STEPS.length - 1, v + 1)
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