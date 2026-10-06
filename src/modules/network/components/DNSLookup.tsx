import { useMemo, useState } from "react";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { UI, type Lang } from "../../../i18n";
import { DNS_ACTORS, DNS_LABELS, DNS_SITES, DNS_STEPS } from "../data/DNSLookup";
import {
  LessonPage,
  MONO,
  RADIUS,
  StepBar,
  StepCard,
  StepNav,
  insetSx,
  labelSx,
  nodeSx,
  Panel,
} from "../../../shared/lessonKit";
import { FONT } from "../../../config/design";

export default function DNSLookup({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [siteId, setSiteId] = useState(DNS_SITES[0].id);

  const t = UI[lang];
  const l = DNS_LABELS[lang];
  const step = DNS_STEPS[stepIndex];
  const last = DNS_STEPS.length - 1;
  const goTo = (i: number) => setStepIndex(Math.min(last, Math.max(0, i)));
  const site = DNS_SITES.find((x) => x.id === siteId) ?? DNS_SITES[0];

  // Replace {brand}, {domain}, {ip} ... with the chosen website's values
  const fill = (text: string) =>
    text.replace(/\{(\w+)\}/g, (m, key: string) => {
      const v = (site as unknown as Record<string, string | { en: string; hi: string }>)[key];
      if (v === undefined) return m;
      return typeof v === "string" ? v : v[lang];
    });

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
    <LessonPage>
      {/* Header + progress */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 0.8 }}>
          <Typography variant="h3" sx={{ color: "primary.main" }}>
            {l.lessonTitle}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "text.secondary" }}>
            {t.stepLabel} {stepIndex + 1} {t.of} {DNS_STEPS.length}
          </Typography>
        </Stack>
        <StepBar total={DNS_STEPS.length} index={stepIndex} onSelect={goTo} label={(i) => `${t.stepLabel} ${i + 1}`} />
      </Box>

      {/* Pick a website */}
      <Stack direction="row" alignItems="center" gap={0.6} flexWrap="wrap">
        <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
          {l.pickSite}
        </Typography>
        {DNS_SITES.map((x) => (
          <Chip
            key={x.id}
            size="small"
            clickable
            label={`${x.icon} ${x.domain}`}
            color={x.id === siteId ? "primary" : "default"}
            variant={x.id === siteId ? "filled" : "outlined"}
            onClick={() => setSiteId(x.id)}
            sx={{ fontWeight: 700 }}
          />
        ))}
      </Stack>

      {/* Actors + what we know */}
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
              sx={{ fontWeight: 700 }}
            />
          );
        })}
        <Box sx={{ flex: 1 }} />
        {chips.map(([k, v]) =>
          v ? <Chip key={k} size="small" variant="outlined" label={`${k}: ${v}`} sx={{ fontFamily: MONO }} /> : null
        )}
      </Stack>

      {/* Main card */}
      <StepCard stepText={`${t.stepLabel} ${stepIndex + 1}`} badge={step.phase} title={fill(step.title[lang])}>
        <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.6, mb: 1.2 }}>
          {fill(step.plain[lang])}
        </Typography>

        <Box sx={{ ...insetSx, mb: 1.2 }}>
          <FlowRow items={step.flow.map((f) => fill(f[lang]))} icons={step.icons} />
        </Box>

        <Box sx={{ ...insetSx, mb: 1.2, border: "1px solid", borderColor: "primary.main", bgcolor: "action.selected" }}>
          <Typography sx={{ ...labelSx, color: "primary.main", display: "block", mb: 0.5 }}>🛒 {fill(l.storyLabel)}</Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.65 }}>
            {fill(step.story[lang])}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1.2 }}>
          📌 {fill(step.remember[lang])}
        </Typography>

        <Box sx={{ pt: 1.2, borderTop: "1px solid", borderColor: "divider" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" }, gap: 1.5 }}>
            <Box>
              <Typography sx={{ ...labelSx, display: "block", mb: 0.6 }}>🔍 {l.detailLabel}</Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 1.2 }}>
                {fill(step.detail[lang])}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                💭 <b>{l.analogyLabel}:</b> {fill(step.analogy[lang])}
              </Typography>
            </Box>

            <Stack spacing={1.2}>
              <Box sx={{ p: 1.2, bgcolor: "#0b0d13", borderRadius: RADIUS.inner }}>
                <Typography sx={{ ...labelSx, color: "#8b93a7", display: "block", mb: 0.6 }}>{l.exampleLabel}</Typography>
                {step.msg.map((line, i) => (
                  <Typography
                    key={i}
                    component="code"
                    variant="body2"
                    sx={{ display: "block", color: "#5eead4", fontFamily: MONO, lineHeight: 1.65, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
                  >
                    {fill(line)}
                  </Typography>
                ))}
                {site.id !== "example" && (
                  <Typography variant="caption" sx={{ display: "block", color: "#8b93a7", mt: 0.8 }}>
                    {l.msgNote}
                  </Typography>
                )}
              </Box>

              <Box>
                <Typography sx={{ ...labelSx, display: "block", mb: 0.6 }}>📖 {l.wordsLabel}</Typography>
                <Stack spacing={0.6}>
                  {step.terms.map(([term, meaning]) => (
                    <Box key={term} sx={{ ...insetSx, p: 0.9, bgcolor: "transparent", border: "1px dashed", borderColor: "primary.main" }}>
                      <Typography component="span" variant="body2" sx={{ fontWeight: 800, color: "primary.main" }}>
                        {term}
                      </Typography>
                      <Typography component="span" variant="body2" sx={{ color: "text.secondary" }}>
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
      </StepCard>

      {stepIndex === last && (
        <Panel>
          <Typography variant="body2" sx={{ color: "success.main", fontWeight: 800 }}>
            ✓ {l.completed}
          </Typography>
        </Panel>
      )}

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
                ...nodeSx("primary.main"),
                flex: "1 1 0",
                minWidth: 0,
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                alignItems: "center",
                justifyContent: { xs: "flex-start", sm: "center" },
                gap: { xs: 1.2, sm: 0.3 },
                textAlign: { xs: "left", sm: "center" },
              }}
            >
              <Typography aria-hidden variant="h2" sx={{ lineHeight: 1.2 }}>
                {icons[i]}
              </Typography>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.3, overflowWrap: "anywhere" }}>
                  {first}
                </Typography>
                {rest.length > 0 && (
                  <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.3, whiteSpace: "pre-line", display: "block" }}>
                    {rest.join("\n")}
                  </Typography>
                )}
              </Box>
            </Paper>
            {i < items.length - 1 && (
              <Box sx={{ alignSelf: "center", display: "flex", color: "primary.main", flexShrink: 0 }}>
                <ArrowForwardRoundedIcon sx={{ display: { xs: "none", sm: "block" }, fontSize: FONT.h4 }} />
                <ArrowDownwardRoundedIcon sx={{ display: { xs: "block", sm: "none" }, fontSize: FONT.h4 }} />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
