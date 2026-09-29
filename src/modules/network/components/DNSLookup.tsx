import { useMemo, useState } from "react";
import { Box, Button, Chip, LinearProgress, Paper, Stack, Typography } from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { UI, type Lang } from "../../../i18n";
import { DNS_ACTORS, DNS_LABELS, DNS_SITES, DNS_STEPS } from "../data/DNSLookup";

const caption = {
  typography: "caption",
  fontWeight: 800,
  color: "text.secondary",
  textTransform: "uppercase",
  letterSpacing: 0.5,
} as const;

export default function DNSLookup({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [siteId, setSiteId] = useState(DNS_SITES[0].id);

  const t = UI[lang];
  const l = DNS_LABELS[lang];
  const step = DNS_STEPS[stepIndex];
  const last = DNS_STEPS.length - 1;
  const site = DNS_SITES.find((x) => x.id === siteId) ?? DNS_SITES[0];

  // Replace {brand}, {domain}, {ip} ... with the chosen website's values
  const fill = (text: string) =>
    text.replace(/\{(\w+)\}/g, (m, key: string) => {
      const v = (site as unknown as Record<string, string | { en: string; hi: string }>)[key];
      if (v === undefined) return m;
      return typeof v === "string" ? v : v[lang];
    });
  const progress = ((stepIndex + 1) / DNS_STEPS.length) * 100;

  // Which actors have already been used, and what we know so far
  const { visited, known } = useMemo(() => {
    const done = DNS_STEPS.slice(0, stepIndex + 1);
    return {
      visited: new Set(done.map((s) => s.at)),
      known: done.reduce<{ resolver?: string; ip?: string }>((a, s) => ({ ...a, ...s.reveal }), {}),
    };
  }, [stepIndex]);

  const chips: [string, string | undefined][] = [
    [l.domain, site.domain],
    [l.resolver, known.resolver],
    [l.answer, known.ip ? fill(known.ip) : undefined],
  ];

  return (
    <Stack spacing={1.5}>
      {/* Header + progress */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 0.6 }}>
          <Typography sx={{ typography: "body1", fontWeight: 800, color: "primary.main" }}>{l.lessonTitle}</Typography>
          <Typography sx={{ typography: "body2", fontWeight: 700, color: "text.secondary" }}>
            {t.stepLabel} {stepIndex + 1} {t.of} {DNS_STEPS.length}
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 6, borderRadius: 99, bgcolor: "action.hover", "& .MuiLinearProgress-bar": { borderRadius: 99 } }}
        />
      </Box>

      {/* Pick a real website to follow */}
      <Stack direction="row" alignItems="center" gap={0.6} flexWrap="wrap">
        <Typography sx={{ typography: "caption", fontWeight: 800, color: "text.secondary" }}>{l.pickSite}</Typography>
        {DNS_SITES.map((x) => (
          <Chip
            key={x.id}
            size="small"
            clickable
            label={`${x.icon} ${x.domain}`}
            color={x.id === siteId ? "primary" : "default"}
            variant={x.id === siteId ? "filled" : "outlined"}
            onClick={() => setSiteId(x.id)}
            sx={{ fontWeight: 800 }}
          />
        ))}
      </Stack>

      {/* Who is working now + what we know */}
      <Stack direction="row" alignItems="center" gap={0.6} flexWrap="wrap">
        {DNS_ACTORS.map((a, i) => {
          const active = step.at === i;
          return (
            <Chip
              key={a.en}
              size="small"
              label={`${a.icon} ${a[lang]}`}
              color={active ? "primary" : "default"}
              variant={active ? "filled" : "outlined"}
              icon={!active && visited.has(i as 0 | 1 | 2 | 3) ? <CheckCircleRoundedIcon /> : undefined}
              sx={{ fontWeight: 800 }}
            />
          );
        })}
        <Box sx={{ flex: 1 }} />
        {chips.map(([k, v]) =>
          v ? (
            <Chip
              key={k}
              size="small"
              variant="outlined"
              label={`${k}: ${v}`}
              sx={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11 }}
            />
          ) : null
        )}
      </Stack>

      {/* Main card */}
      <Paper
        variant="outlined"
        sx={{ p: { xs: 1.2, sm: 1.6 }, borderRadius: 1.5, borderTop: "4px solid", borderTopColor: "primary.main" }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} sx={{ mb: 0.6 }}>
          <Typography component="h2" sx={{ typography: "h5", fontWeight: 850 }}>
            {fill(step.title[lang])}
          </Typography>
          <Chip size="small" label={step.phase} sx={{ bgcolor: "action.selected", color: "primary.main", fontWeight: 800 }} />
        </Stack>

        <Typography sx={{ typography: "body1", lineHeight: 1.6, fontWeight: 600, mb: 1.4 }}>{fill(step.plain[lang])}</Typography>

        {/* Icon diagram */}
        <Box sx={{ p: 1, mb: 1.2, borderRadius: 1.5, bgcolor: "action.hover" }}>
          <FlowRow items={step.flow.map((f) => fill(f[lang]))} icons={step.icons} />
        </Box>

        {/* Real-life example with the chosen website */}
        <Box sx={{ p: 1.2, mb: 1.2, borderRadius: 1.5, border: "1px solid", borderColor: "primary.main", bgcolor: "action.selected" }}>
          <Typography sx={{ ...caption, color: "primary.main", mb: 0.5 }}>🛒 {fill(l.storyLabel)}</Typography>
          <Typography sx={{ typography: "body1", lineHeight: 1.7 }}>{fill(step.story[lang])}</Typography>
        </Box>

        <Typography sx={{ typography: "body2", fontWeight: 700, mb: 1.2 }}>📌 {fill(step.remember[lang])}</Typography>

        {/* Always visible: how it works (left) + real example message (right) */}
        <Box sx={{ pt: 1.2, borderTop: "1px solid", borderColor: "divider" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" }, gap: 1.5 }}>
            <Box>
              <Typography sx={{ ...caption, mb: 0.6 }}>🔍 {l.detailLabel}</Typography>
              <Typography sx={{ typography: "body2", lineHeight: 1.75, mb: 1.2 }}>{fill(step.detail[lang])}</Typography>

              <Typography sx={{ typography: "body2", color: "text.secondary", lineHeight: 1.6 }}>
                💭 <b>{l.analogyLabel}:</b> {fill(step.analogy[lang])}
              </Typography>
            </Box>

            <Stack spacing={1.2}>
              <Box sx={{ p: 1.2, bgcolor: "#0b0d13", borderRadius: 1 }}>
                <Typography sx={{ ...caption, color: "#8b93a7", mb: 0.6 }}>{l.exampleLabel}</Typography>
                {step.msg.map((line, i) => (
                  <Typography
                    key={i}
                    component="code"
                    sx={{
                      display: "block",
                      color: "#5eead4",
                      fontFamily: "ui-monospace, Menlo, monospace",
                      fontSize: 12.5,
                      lineHeight: 1.7,
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {fill(line)}
                  </Typography>
                ))}
                {site.id !== "example" && (
                  <Typography sx={{ typography: "caption", color: "#8b93a7", mt: 0.8 }}>{l.msgNote}</Typography>
                )}
              </Box>

              <Box>
                <Typography sx={{ ...caption, mb: 0.6 }}>📖 {l.wordsLabel}</Typography>
                <Stack spacing={0.6}>
                  {step.terms.map(([term, meaning]) => (
                    <Box key={term} sx={{ p: 0.9, borderRadius: 1.5, border: "1px dashed", borderColor: "primary.main" }}>
                      <Typography component="span" sx={{ typography: "body2", fontWeight: 850, color: "primary.main" }}>
                        {term}
                      </Typography>
                      <Typography component="span" sx={{ typography: "body2", color: "text.secondary" }}>
                        {" "}
                        · {fill(meaning[lang])}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Paper>

      {stepIndex === last && (
        <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 1.5, borderColor: "success.main", bgcolor: "action.hover" }}>
          <Typography sx={{ typography: "body2", color: "success.main", fontWeight: 800 }}>✓ {l.completed}</Typography>
        </Paper>
      )}

      {/* Navigation */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
        <Button variant="outlined" size="small" disabled={stepIndex === 0} onClick={() => setStepIndex((v) => Math.max(0, v - 1))} sx={{ textTransform: "none", borderRadius: 1.5 }}>
          ← {t.previous}
        </Button>
        <Button variant="text" size="small" color="inherit" startIcon={<ReplayRoundedIcon />} onClick={() => setStepIndex(0)} sx={{ textTransform: "none" }}>
          {t.restart}
        </Button>
        <Button variant="contained" size="small" endIcon={<ArrowForwardRoundedIcon />} disabled={stepIndex === last} onClick={() => setStepIndex((v) => Math.min(last, v + 1))} sx={{ textTransform: "none", borderRadius: 1.5, boxShadow: "none" }}>
          {t.next}
        </Button>
      </Stack>
    </Stack>
  );
}

/** Icon cards joined by arrows: right on desktop, down on mobile. */
function FlowRow({ items, icons }: { items: string[]; icons: string[] }) {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "stretch", gap: 0.5 }}>
      {items.map((text, i) => {
        const [first, ...rest] = text.split("\n");
        return (
          <Box key={i} sx={{ display: "contents" }}>
            <Paper
              variant="outlined"
              sx={{
                flex: "1 1 0",
                minWidth: 0,
                p: 0.9,
                borderRadius: 2,
                borderColor: "primary.main",
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                alignItems: "center",
                justifyContent: { xs: "flex-start", sm: "center" },
                gap: { xs: 1.2, sm: 0.3 },
                textAlign: { xs: "left", sm: "center" },
              }}
            >
              <Typography aria-hidden sx={{ fontSize: 28, lineHeight: 1.2 }}>{icons[i]}</Typography>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ typography: "body2", fontWeight: 800, lineHeight: 1.3, overflowWrap: "anywhere" }}>{first}</Typography>
                {rest.length > 0 && (
                  <Typography sx={{ typography: "caption", color: "text.secondary", lineHeight: 1.3, whiteSpace: "pre-line" }}>
                    {rest.join("\n")}
                  </Typography>
                )}
              </Box>
            </Paper>
            {i < items.length - 1 && (
              <Box sx={{ alignSelf: "center", display: "flex", color: "primary.main", flexShrink: 0 }}>
                <ArrowForwardRoundedIcon sx={{ display: { xs: "none", sm: "block" }, fontSize: 18 }} />
                <ArrowDownwardRoundedIcon sx={{ display: { xs: "block", sm: "none" }, fontSize: 18 }} />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}