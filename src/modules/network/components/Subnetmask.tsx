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
  SUBNET_LABELS,
  SUBNET_STEPS,
  type DeviceRoute,
} from "../data/SubnetMask";

const MONO = "ui-monospace, Menlo, monospace";

const parseIp = (ip: string) => ip.split(".").map(Number);
const toBits = (n: number) => n.toString(2).padStart(8, "0");
const applyMask = (ip: number[], mask: number[]) =>
  ip.map((o, i) => o & mask[i]);
const countOnes = (mask: number[]) =>
  mask.reduce((sum, o) => sum + toBits(o).split("1").length - 1, 0);

const ROUTE_COLOR: Record<DeviceRoute, string> = {
  self: "primary.main",
  direct: "success.main",
  router: "warning.main",
};

function BinaryRow({
  label,
  octets,
  maskOctets,
}: {
  label: string;
  octets: number[];
  maskOctets: number[];
}) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 800,
          color: "text.secondary",
          minWidth: 58,
        }}
      >
        {label}
      </Typography>

      <Stack direction="row" alignItems="center" gap={0.6}>
        {octets.map((octet, i) => {
          const mBits = toBits(maskOctets[i]);

          return (
            <Stack
              direction="row"
              alignItems="center"
              key={i}
              gap={0.6}
            >
              <Box
                sx={{
                  textAlign: "center",
                  minWidth: 74,
                  py: 0.8,
                  px: 0.8,
                  borderRadius: 2,
                  border: "1.5px solid",
                  borderColor: "divider",
                  bgcolor: "action.selected",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800 }}
                >
                  {octet}
                </Typography>

                <Typography
                  component="div"
                  variant="caption"
                  sx={{
                    fontFamily: MONO,
                    mt: 0.2,
                  }}
                >
                  {toBits(octet)
                    .split("")
                    .map((bit, j) => (
                      <Box
                        key={j}
                        component="span"
                        sx={{
                          color:
                            mBits[j] === "1"
                              ? "primary.main"
                              : "secondary.main",
                        }}
                      >
                        {bit}
                      </Box>
                    ))}
                </Typography>
              </Box>

              {i < octets.length - 1 && (
                <Typography
                  variant="body2"
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
    </Stack>
  );
}

export default function SubnetMask({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);

  const t = UI[lang];
  const l = SUBNET_LABELS[lang];
  const step = SUBNET_STEPS[stepIndex];
  const content = step[lang];

  const progress =
    ((stepIndex + 1) / SUBNET_STEPS.length) * 100;

  const maskOctets = step.mask ? parseIp(step.mask) : null;
  const maskOnes = maskOctets ? countOnes(maskOctets) : 0;

  const subjectOctets = step.subject
    ? parseIp(step.subject.ip)
    : null;

  const resultOctets =
    subjectOctets && maskOctets
      ? applyMask(subjectOctets, maskOctets)
      : null;

  const ownNetworkOctets =
    step.compareOwnIp && maskOctets
      ? applyMask(parseIp(step.compareOwnIp), maskOctets)
      : null;

  const sameNetwork =
    resultOctets && ownNetworkOctets
      ? resultOctets.join(".") === ownNetworkOctets.join(".")
      : null;

  const routeLabel: Record<DeviceRoute, string> = {
    self: l.routeSelf,
    direct: l.routeDirect,
    router: l.routeRouter,
  };

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
          {SUBNET_STEPS.length}
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

      {/* Main Subnet Details */}
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
          {step.caption}
        </Typography>

        {/* Devices */}
        {step.devices && (
          <Box sx={{ mb: maskOctets ? 1.8 : 0 }}>
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
              {step.devices.map((device) => {
                const color = device.route
                  ? ROUTE_COLOR[device.route]
                  : "primary.main";

                return (
                  <Box
                    key={`${device.name}-${device.ip}`}
                    sx={{
                      textAlign: "center",
                      minWidth: 108,
                      py: 0.9,
                      px: 1.1,
                      borderRadius: 2,
                      border: "1.5px solid",
                      borderColor: color,
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
                        fontFamily: MONO,
                        color,
                      }}
                    >
                      {device.ip}
                    </Typography>

                    {device.route && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 800,
                          color,
                          mt: 0.2,
                          display: "block",
                        }}
                      >
                        {routeLabel[device.route]}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        )}

        {/* Binary Calculation */}
        {maskOctets && (
          <Box sx={{ overflowX: "auto", pb: 0.5 }}>
            <Stack
              spacing={0.8}
              sx={{ minWidth: "max-content" }}
            >
              {resultOctets && subjectOctets && step.subject ? (
                <>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                  >
                    {step.subject.label}
                  </Typography>

                  <BinaryRow
                    label={l.ip}
                    octets={subjectOctets}
                    maskOctets={maskOctets}
                  />

                  <BinaryRow
                    label={l.mask}
                    octets={maskOctets}
                    maskOctets={maskOctets}
                  />

                  <Box
                    sx={{
                      borderTop: "1.5px dashed",
                      borderColor: "divider",
                      ml: 7.5,
                      pt: 0.4,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 850,
                        color: "text.secondary",
                      }}
                    >
                      AND
                    </Typography>
                  </Box>

                  <BinaryRow
                    label={l.result}
                    octets={resultOctets}
                    maskOctets={maskOctets}
                  />
                </>
              ) : (
                <BinaryRow
                  label={l.mask}
                  octets={maskOctets}
                  maskOctets={maskOctets}
                />
              )}
            </Stack>
          </Box>
        )}

        {/* Network / Host Bits */}
        {maskOctets && (
          <Box sx={{ mt: 1.4 }}>
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={0.8}
              sx={{ mb: 0.8 }}
            >
              <Chip
                label={l.networkBits}
                size="small"
                sx={{
                  bgcolor: "action.selected",
                  color: "primary.main",
                  typography: "caption",
                  fontWeight: 850,
                }}
              />

              <Chip
                label={l.hostBits}
                size="small"
                sx={{
                  bgcolor: "action.selected",
                  color: "secondary.main",
                  typography: "caption",
                  fontWeight: 850,
                }}
              />

              <Chip
                label={`/${maskOnes} · ${maskOnes} ${l.maskBits}`}
                size="small"
                sx={{
                  bgcolor: "action.selected",
                  color: "text.secondary",
                  typography: "caption",
                  fontWeight: 850,
                }}
              />
            </Stack>

            {resultOctets && (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                {l.andRule}
              </Typography>
            )}
          </Box>
        )}

        {/* Network Comparison */}
        {resultOctets &&
          ownNetworkOctets &&
          sameNetwork !== null && (
            <Box sx={{ mt: 1.6 }}>
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={2}
                sx={{ mb: 0.8 }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  {l.ownNetwork}:{" "}
                  <strong style={{ fontFamily: MONO }}>
                    {ownNetworkOctets.join(".")}
                  </strong>
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  {l.targetNetwork}:{" "}
                  <strong style={{ fontFamily: MONO }}>
                    {resultOctets.join(".")}
                  </strong>
                </Typography>
              </Stack>

              <Chip
                label={
                  sameNetwork
                    ? l.sameNetwork
                    : l.differentNetwork
                }
                size="small"
                sx={{
                  bgcolor: sameNetwork
                    ? "success.main"
                    : "warning.main",
                  color: "#fff",
                  typography: "body2",
                  fontWeight: 850,
                }}
              />
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
          disabled={stepIndex === SUBNET_STEPS.length - 1}
          onClick={() =>
            setStepIndex((v) =>
              Math.min(SUBNET_STEPS.length - 1, v + 1)
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