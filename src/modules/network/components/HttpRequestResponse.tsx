
import { useMemo, useState } from "react";
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
  ConnectionReveal,
  HTTP_STEPS,
  HTTP_UI,
  LAYER_RANK,
  NODES,
  type Layer,
} from "../data/HttpRequestResponse";

// Encapsulation layers are kept in this component file.
const LAYERS: {
  key: "app" | "transport" | "network" | "datalink";
  labelKey:
  | "layerData"
  | "layerSegment"
  | "layerPacket"
  | "layerFrame";
}[] = [
    { key: "app", labelKey: "layerData" },
    { key: "transport", labelKey: "layerSegment" },
    { key: "network", labelKey: "layerPacket" },
    { key: "datalink", labelKey: "layerFrame" },
  ];

export default function HttpRequestResponse({
  lang,
}: {
  lang: Lang;
}) {
  const [stepIndex, setStepIndex] = useState(0);

  const t = UI[lang];
  const lesson = HTTP_UI[lang];

  const step = HTTP_STEPS[stepIndex];
  const content = step[lang];

  const progress =
    ((stepIndex + 1) / HTTP_STEPS.length) * 100;

  const known: ConnectionReveal = useMemo(() => {
    return HTTP_STEPS.slice(0, stepIndex + 1).reduce<ConnectionReveal>(
      (acc, s) => ({ ...acc, ...s.reveal }),
      {}
    );
  }, [stepIndex]);

  const unknown = lesson.unknown;

  return (
    <Stack spacing={2.3}>
      {/* Lesson heading */}
      <Box>
        <Typography
          sx={{
            typography: "body2",
            fontWeight: 700,
            color: "primary.main",
            mb: 0.5,
          }}
        >
          {lesson.lessonTitle}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            typography: "body1",
            lineHeight: 1.6,
          }}
        >
          {lesson.lessonSubtitle}
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
          sx={{
            color: "text.secondary",
            typography: "body2",
            fontWeight: 700,
          }}
        >
          {t.stepLabel} {stepIndex + 1} {t.of}{" "}
          {HTTP_STEPS.length}
        </Typography>
      </Stack>

      {/* Progress bar */}
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 0.7 }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              typography: "body2",
            }}
          >
            {lesson.requestJourney}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              typography: "body2",
              fontWeight: 700,
            }}
          >
            {Math.round(progress)}%
          </Typography>
        </Stack>

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
      </Box>

      {/* Connection information */}
      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          borderRadius: 2.5,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography
          sx={{
            typography: "caption",
            fontWeight: 800,
            letterSpacing: 0.6,
            color: "text.secondary",
            mb: 1,
            textTransform: "uppercase",
          }}
        >
          {lesson.connectionInfo}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
            },
            gap: 1,
          }}
        >
          <InfoCell
            label={lesson.domain}
            value={known.domain}
            unknown={unknown}
          />

          <InfoCell
            label={lesson.protocol}
            value={known.protocol}
            unknown={unknown}
          />

          <InfoCell
            label={lesson.source}
            value={
              known.sourceIp
                ? `${known.sourceIp}${known.sourcePort
                  ? ":" + known.sourcePort
                  : ""
                }`
                : undefined
            }
            unknown={unknown}
          />

          <InfoCell
            label={lesson.destination}
            value={
              known.destIp
                ? `${known.destIp}${known.destPort
                  ? ":" + known.destPort
                  : ""
                }`
                : undefined
            }
            unknown={unknown}
          />
        </Box>
      </Paper>

      {/* Browser → Network → Server */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 28px 1fr 28px 1fr",
          },
          alignItems: "center",
          gap: 1,
        }}
      >
        {NODES.map((node, index) => (
          <Box key={index} sx={{ display: "contents" }}>
            <Paper
              variant="outlined"
              sx={{
                textAlign: "center",
                p: 1.5,
                borderRadius: 2.5,
                borderColor:
                  step.node === index
                    ? "primary.main"
                    : "divider",
                bgcolor:
                  step.node === index
                    ? "action.selected"
                    : "background.paper",
                boxShadow:
                  step.node === index
                    ? "0 0 0 3px rgba(124,140,255,.14)"
                    : "none",
              }}
            >
              <Typography
                sx={{
                  typography: "h2",
                  lineHeight: 1.3,
                }}
              >
                {node.icon}
              </Typography>

              <Typography
                sx={{
                  typography: "body1",
                  fontWeight: 800,
                }}
              >
                {node[lang].title}
              </Typography>

              <Typography
                sx={{
                  typography: "caption",
                  color: "text.secondary",
                }}
              >
                {node[lang].sub}
              </Typography>
            </Paper>

            {index < NODES.length - 1 && (
              <ArrowForwardRoundedIcon
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                  justifySelf: "center",
                  color: "text.secondary",
                }}
              />
            )}
          </Box>
        ))}
      </Box>

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
            sx={{
              color: "primary.main",
              typography: "caption",
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
          sx={{
            typography: "h3",
            fontWeight: 850,
            mb: 1,
          }}
        >
          {content.title}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            typography: "body1",
            lineHeight: 1.8,
            mb: step.fields ? 1.8 : 0,
          }}
        >
          {content.detail}
        </Typography>

        {/* HTTP fields */}
        {step.fields && (
          <Box sx={{ mb: 1.8 }}>
            <Typography
              sx={{
                typography: "caption",
                fontWeight: 800,
                letterSpacing: 0.5,
                color: "text.secondary",
                mb: 0.8,
                textTransform: "uppercase",
              }}
            >
              {lesson.headerFields}
            </Typography>

            <Stack spacing={0.6}>
              {step.fields.map((f) => (
                <Stack
                  key={f.label}
                  direction="row"
                  spacing={1.2}
                  sx={{ typography: "body2" }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      minWidth: 128,
                      flexShrink: 0,
                      typography: "body2",
                    }}
                  >
                    {f.label}
                  </Typography>

                  <Typography
                    sx={{
                      color: "text.secondary",
                      typography: "body2",
                    }}
                  >
                    {f.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}

        {/* Encapsulation diagram */}
        <EncapsulationDiagram
          layer={step.layer}
          lang={lang}
        />

        {/* Current packet data */}
        <Box
          sx={{
            mt: 1.8,
            p: 1.5,
            bgcolor: "#0b0d13",
            borderRadius: 2,
          }}
        >
          <Typography
            sx={{
              color: "#8b93a7",
              typography: "caption",
              fontWeight: 850,
              letterSpacing: 0.7,
              mb: 0.7,
              textTransform: "uppercase",
            }}
          >
            {lesson.dataLabel}
          </Typography>

          <Typography
            component="code"
            sx={{
              color: "#5eead4",
              fontFamily: "ui-monospace, Menlo, monospace",
              typography: "body1",
              overflowWrap: "anywhere",
            }}
          >
            {step.packet}
          </Typography>
        </Box>
      </Paper>

      {/* Learning tip */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.2,
          p: 1.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "action.hover",
          borderRadius: 2,
        }}
      >
        <Typography sx={{ typography: "h6" }}>
          💡
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            typography: "body2",
            lineHeight: 1.65,
          }}
        >
          {lesson.tip}
        </Typography>
      </Box>

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
          disabled={stepIndex === HTTP_STEPS.length - 1}
          onClick={() =>
            setStepIndex((v) =>
              Math.min(HTTP_STEPS.length - 1, v + 1)
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

function EncapsulationDiagram({
  layer,
  lang,
}: {
  layer: Layer;
  lang: Lang;
}) {
  const t = HTTP_UI[lang];
  const currentRank = LAYER_RANK[layer];

  return (
    <Box>
      <Typography
        sx={{
          typography: "body2",
          fontWeight: 700,
          color: "text.secondary",
          mb: 1,
        }}
      >
        {t.encapsulationTitle}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(4, 1fr)",
          },
          gap: 0.9,
        }}
      >
        {LAYERS.map((l, i) => {
          const rank = i + 1;

          const state =
            rank < currentRank
              ? "built"
              : rank === currentRank
                ? "active"
                : "pending";

          return (
            <Box
              key={l.key}
              sx={{
                textAlign: "center",
                py: 1.1,
                px: 0.6,
                borderRadius: 2,
                border: "1.5px solid",
                borderStyle:
                  state === "pending" ? "dashed" : "solid",
                borderColor:
                  state === "pending"
                    ? "divider"
                    : "primary.main",
                bgcolor:
                  state === "active"
                    ? "action.selected"
                    : "background.paper",
                opacity: state === "pending" ? 0.45 : 1,
                boxShadow:
                  state === "active"
                    ? "0 0 0 3px rgba(124,140,255,.14)"
                    : "none",
                transition: "opacity .2s, box-shadow .2s",
              }}
            >
              <Typography
                sx={{
                  typography: "body2",
                  fontWeight:
                    state === "pending" ? 500 : 800,
                }}
              >
                {t[l.labelKey]}
              </Typography>

              {state === "built" && (
                <Typography
                  sx={{
                    typography: "caption",
                    color: "primary.main",
                    fontWeight: 700,
                    mt: 0.2,
                  }}
                >
                  ✓
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {layer === "physical" && (
        <Typography
          sx={{
            typography: "caption",
            color: "text.secondary",
            mt: 0.9,
          }}
        >
          → {t.physicalNote}
        </Typography>
      )}
    </Box>
  );
}

function InfoCell({
  label,
  value,
  unknown,
}: {
  label: string;
  value?: string;
  unknown: string;
}) {
  return (
    <Box>
      <Typography
        sx={{
          typography: "caption",
          color: "text.secondary",
          fontWeight: 700,
          mb: 0.2,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          typography: "body2",
          fontWeight: value ? 800 : 500,
          fontStyle: value ? "normal" : "italic",
          color: value ? "text.primary" : "text.secondary",
          fontFamily: value
            ? "ui-monospace, Menlo, monospace"
            : "inherit",
        }}
      >
        {value ?? unknown}
      </Typography>
    </Box>
  );
}