

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { alpha } from "@mui/material/styles";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

import { FONT_FAMILY, LAYOUT, RADIUS, SIZE } from "../config/design";

export { RADIUS };
export const MONO = FONT_FAMILY.mono;


export const cardSx = {
  p: { xs: 1.5, sm: 2, lg: 2.25 },
  borderRadius: RADIUS.card,
  borderColor: "divider",
  bgcolor: "background.paper",
} as const;

export const accentCardSx = (color = "primary.main") =>
  ({ ...cardSx, borderTop: "3px solid", borderTopColor: color }) as const;

export const insetSx = {
  p: 1.25,
  borderRadius: RADIUS.inner,
  bgcolor: "action.hover",
} as const;

export const nodeSx = (borderColor = "divider", bgcolor = "background.paper") =>
  ({
    p: 1,
    borderRadius: RADIUS.inner,
    border: "1.5px solid",
    borderColor,
    bgcolor,
    textAlign: "center",
  }) as const;

export const labelSx = {
  typography: "caption",
  fontWeight: 700,
  color: "text.secondary",
  textTransform: "uppercase",
  letterSpacing: 0.6,
} as const;

export const monoSx = { fontFamily: MONO, fontWeight: 700 } as const;

export interface NextLessonInfo {
  label: string; 
  buttonLabel: string; 
  go: () => void;
}
export const NextLessonContext = createContext<NextLessonInfo | null>(null);

/* ───────────────────────── Page structure ───────────────────────── */

export function LessonPage({ children }: { children: ReactNode }) {
  return (
    <Stack spacing={LAYOUT.lessonGap} sx={{ width: "100%", mx: "auto" }}>
      {children}
    </Stack>
  );
}


export function LessonBody({ visual, children }: { visual: ReactNode; children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: LAYOUT.bodyGap,
        alignItems: "start",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          [LAYOUT.twoColumnBreakpoint]: LAYOUT.twoColumns,
        },
      }}
    >
      <Box sx={{ minWidth: 0 }}>{visual}</Box>
      <Box sx={{ minWidth: 0 }}>{children}</Box>
    </Box>
  );
}


export function LessonHeader({
  eyebrow,
  title,
  subtitle,
  right,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  right?: ReactNode;
}) {
  return (
    <Stack direction="row" alignItems="flex-end" justifyContent="space-between" gap={2} flexWrap="wrap">
      <Box sx={{ minWidth: 0, flex: "1 1 360px" }}>
        {eyebrow && (
          <Typography variant="subtitle2" sx={{ color: "primary.main", mb: 0.25 }}>
            {eyebrow}
          </Typography>
        )}
        <Typography component="h1" variant="h2" sx={{ mb: 0.4 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {subtitle}
        </Typography>
      </Box>
      {right}
    </Stack>
  );
}

export function LessonStatus({ availableLabel, right }: { availableLabel: string; right?: ReactNode }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
      <Chip
        label={availableLabel}
        size="small"
        sx={{ bgcolor: "success.main", color: "success.contrastText", fontWeight: 800 }}
      />
      {right && (
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 700 }}>
          {right}
        </Typography>
      )}
    </Stack>
  );
}

export function StepBar({
  total,
  index,
  onSelect,
  label,
  colorFor,
}: {
  total: number;
  index: number;
  onSelect: (i: number) => void;
  label: (i: number) => string;
  colorFor?: (i: number) => string;
}) {
  return (
    <Stack direction="row" gap={0.6} sx={{ width: "100%", py: 0.5 }}>
      {Array.from({ length: total }, (_, i) => (
        <Box
          key={i}
          component="button"
          type="button"
          aria-label={label(i)}
          aria-current={i === index ? "step" : undefined}
          onClick={() => onSelect(i)}
          sx={{
            flex: 1,
            height: SIZE.stepBarHeight,
            p: 0,
            border: 0,
            borderRadius: RADIUS.pill,
            cursor: "pointer",
            bgcolor: i <= index ? colorFor?.(i) ?? "primary.main" : "action.hover",
            opacity: i < index ? 0.55 : 1,
            outline: i === index ? "2px solid" : "none",
            outlineColor: "text.primary",
            outlineOffset: 2,
            "&:focus-visible": { outline: "2px solid", outlineColor: "text.primary", outlineOffset: 2 },
            "&:hover": { opacity: i === index ? 1 : 0.8 },
          }}
        />
      ))}
    </Stack>
  );
}

export function Panel({ children }: { children: ReactNode }) {
  return (
    <Paper variant="outlined" sx={cardSx}>
      {children}
    </Paper>
  );
}

export function StepCard({
  stepText,
  badge,
  title,
  children,
  accent,
}: {
  stepText: string;
  badge?: ReactNode;
  title: string;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <Paper variant="outlined" sx={accentCardSx(accent)}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1} sx={{ mb: 0.75 }}>
        <Typography
          variant="caption"
          sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 0.8, textTransform: "uppercase" }}
        >
          {stepText}
        </Typography>
        {badge && (
          <Chip
            label={badge}
            size="small"
            sx={{ bgcolor: "action.selected", color: "primary.main", fontWeight: 800, maxWidth: "65%" }}
          />
        )}
      </Stack>
      <Typography component="h2" variant="h3" sx={{ mb: 0.75 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

export function Callout({
  label,
  tone = "primary",
  children,
}: {
  label: string;
  tone?: "primary" | "secondary" | "info" | "warning" | "success";
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: RADIUS.inner,
        bgcolor: (t) => alpha(t.palette[tone].main, 0.08),
        borderLeft: "3px solid",
        borderLeftColor: `${tone}.main`,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 800, color: `${tone}.main`, mb: 0.25 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
        {children}
      </Typography>
    </Box>
  );
}



const negate = <T extends Record<string, number>>(o: T) =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, -v])) as { [K in keyof T]: number };

export function StepNav({
  index,
  last,
  onPrev,
  onNext,
  onRestart,
  labels,
  inline = false,
}: {
  index: number;
  last: number;
  onPrev: () => void;
  onNext: () => void;
  onRestart: () => void;
  labels: { previous: string; restart: string; next: string };
  inline?: boolean;
}) {
  const nextLesson = useContext(NextLessonContext);
  const isLast = index >= last;
  const showNextLesson = !inline && isLast && nextLesson !== null;


  const handlers = useRef({ index, last, onPrev, onNext });
  handlers.current = { index, last, onPrev, onNext };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      const h = handlers.current;
      if (e.key === "ArrowLeft" && h.index > 0) h.onPrev();
      if (e.key === "ArrowRight" && h.index < h.last) h.onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Box
      sx={
        inline
          ? { width: "100%" }
          : {
            position: "sticky",
            bottom: 0,
            zIndex: 5,
            py: SIZE.navBarPaddingY,
            mx: negate(LAYOUT.pagePaddingX),
            px: LAYOUT.pagePaddingX,
            bgcolor: (t) => alpha(t.palette.background.default, 0.9),
            backdropFilter: "blur(8px)",
            borderTop: "1px solid",
            borderColor: "divider",
          }
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 1,
          width: "100%",
        }}
      >
        <Box sx={{ justifySelf: "start" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            disabled={index === 0}
            onClick={onPrev}
            sx={{ minWidth: SIZE.navButtonMinWidth }}
          >
            {labels.previous}
          </Button>
        </Box>

        <Button color="inherit" startIcon={<ReplayRoundedIcon />} onClick={onRestart}>
          {labels.restart}
        </Button>

        <Box sx={{ justifySelf: "end" }}>
          <Button
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            disabled={isLast && !showNextLesson}
            onClick={showNextLesson ? nextLesson!.go : onNext}
            sx={{ minWidth: SIZE.navButtonMinWidth }}
          >
            {showNextLesson ? nextLesson!.buttonLabel : labels.next}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
