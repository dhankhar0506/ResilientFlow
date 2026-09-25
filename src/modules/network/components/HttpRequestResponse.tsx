import { useState } from "react";
import { Box, Button, Chip, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { HTTP_STEPS, NODES, UI, type Lang } from "../../../i18n";

export default function HttpRequestResponse({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);
  const t = UI[lang];
  const step = HTTP_STEPS[stepIndex];
  const content = step[lang];
  const progress = ((stepIndex + 1) / HTTP_STEPS.length) * 100;

  return (
    <Stack spacing={2.3}>
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "primary.main", mb: 0.5 }}>{t.lessonTitle}</Typography>
        <Typography component="h1" sx={{ fontSize: { xs: 22, sm: 27 }, fontWeight: 850, letterSpacing: "-0.6px", mb: 0.6 }}>
          {t.heroTitle}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 13, lineHeight: 1.6 }}>{t.lessonSubtitle}</Typography>
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
        <Chip label={t.available} size="small" sx={{ bgcolor: "success.main", color: "#fff", fontSize: 10, fontWeight: 800 }} />
        <Typography sx={{ color: "text.secondary", fontSize: 11.5, fontWeight: 700 }}>
          {t.stepLabel} {stepIndex + 1} {t.of} {HTTP_STEPS.length}
        </Typography>
      </Stack>

      <Box>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.7 }}>
          <Typography sx={{ color: "text.secondary", fontSize: 11.5 }}>{t.requestJourney}</Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 11.5, fontWeight: 700 }}>{Math.round(progress)}%</Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 7, borderRadius: 99, bgcolor: "action.hover", "& .MuiLinearProgress-bar": { borderRadius: 99, bgcolor: "primary.main" } }}
        />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 28px 1fr 28px 1fr" }, alignItems: "center", gap: 1 }}>
        {NODES.map((node, index) => (
          <Box key={index} sx={{ display: "contents" }}>
            <Paper
              variant="outlined"
              sx={{
                textAlign: "center",
                p: 1.5,
                borderRadius: 2.5,
                borderColor: step.node === index ? "primary.main" : "divider",
                bgcolor: step.node === index ? "action.selected" : "background.paper",
                boxShadow: step.node === index ? "0 0 0 3px rgba(124,140,255,.14)" : "none",
              }}
            >
              <Typography sx={{ fontSize: 22, lineHeight: 1.3 }}>{node.icon}</Typography>
              <Typography sx={{ fontSize: 12.5, fontWeight: 800 }}>{node[lang].title}</Typography>
              <Typography sx={{ fontSize: 10, color: "text.secondary" }}>{node[lang].sub}</Typography>
            </Paper>
            {index < NODES.length - 1 && (
              <ArrowForwardRoundedIcon sx={{ display: { xs: "none", sm: "block" }, justifySelf: "center", color: "text.secondary" }} />
            )}
          </Box>
        ))}
      </Box>

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
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} sx={{ mb: 1.3 }}>
          <Typography sx={{ color: "primary.main", fontSize: 10, fontWeight: 850, letterSpacing: 0.8, textTransform: "uppercase" }}>
            {t.stepLabel} {stepIndex + 1}
          </Typography>
          <Chip label={step.phase} size="small" sx={{ bgcolor: "action.selected", color: "primary.main", fontSize: 9.5, fontWeight: 850 }} />
        </Stack>
        <Typography component="h2" sx={{ fontSize: 20, fontWeight: 850, mb: 1 }}>
          {content.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 13, lineHeight: 1.8 }}>{content.detail}</Typography>
        <Box sx={{ mt: 2, p: 1.5, bgcolor: "#0b0d13", borderRadius: 2 }}>
          <Typography sx={{ color: "#8b93a7", fontSize: 9.5, fontWeight: 850, letterSpacing: 0.7, mb: 0.7, textTransform: "uppercase" }}>
            {t.dataLabel}
          </Typography>
          <Typography component="code" sx={{ color: "#5eead4", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12.5, overflowWrap: "anywhere" }}>
            {step.packet}
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, p: 1.5, border: "1px solid", borderColor: "divider", bgcolor: "action.hover", borderRadius: 2 }}>
        <Typography sx={{ fontSize: 16 }}>💡</Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 11.5, lineHeight: 1.65 }}>{t.tip}</Typography>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
        <Button variant="outlined" size="small" disabled={stepIndex === 0} onClick={() => setStepIndex((v) => Math.max(0, v - 1))} sx={{ textTransform: "none", borderRadius: 2 }}>
          ← {t.previous}
        </Button>
        <Button variant="text" size="small" color="inherit" startIcon={<ReplayRoundedIcon />} onClick={() => setStepIndex(0)} sx={{ textTransform: "none" }}>
          {t.restart}
        </Button>
        <Button
          variant="contained"
          size="small"
          endIcon={<ArrowForwardRoundedIcon />}
          disabled={stepIndex === HTTP_STEPS.length - 1}
          onClick={() => setStepIndex((v) => Math.min(HTTP_STEPS.length - 1, v + 1))}
          sx={{ textTransform: "none", borderRadius: 2, boxShadow: "none" }}
        >
          {t.next}
        </Button>
      </Stack>
    </Stack>
  );
}
