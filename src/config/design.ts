
export const ROOT_FONT_SIZE = { xs: 15, md: 16, xl: 17 } as const; 

export const FONT = {
  micro: "0.6875rem", 
  caption: "0.75rem", 
  small: "0.8125rem", 
  body: "0.9375rem", 
  lead: "1rem", 
  h6: "1rem",
  h5: "1.0625rem",
  h4: "1.125rem",
  h3: "1.25rem",
  h2: "1.5rem",
  h1: "1.875rem",
  display: "2.25rem", 
  mono: "0.875rem",
} as const;

export const FONT_FAMILY = {
  sans: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

/* ───────────────────────── Radius ───────────────────────── */
export const RADIUS = { card: "26px", inner: "12px", button: "12px", pill: 99 } as const;

/* ───────────────────────── Page layout ───────────────────────── */
export const LAYOUT = {
  headerHeight: 60, 
  lessonBarHeight: 50, 
  contentMaxWidth: 2200, 
  pagePaddingX: { xs: 1.5, sm: 2.5, lg: 4, xl: 6 },
  pagePaddingTop: { xs: 1.5, md: 2.5 },
  pagePaddingBottom: { xs: 2, md: 3 },
  lessonGap: 1.75, 
  bodyGap: 2,
  twoColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
  twoColumnBreakpoint: "lg",
  dashboardColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(4, minmax(0, 1fr))",
  },
  lessonCardColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(3, minmax(0, 1fr))",
    xl: "repeat(4, minmax(0, 1fr))",
  },
} as const;


export const SIZE = {
  logo: 36,
  navTabMinWidth: 120,
  lessonChipHeight: 34,

  icon: { sm: 16, md: 20, lg: 24, xl: 28 },


  stepBarHeight: 7,
  progressHeight: 7,
  progressHeightSmall: 6,
  bitBarHeight: 8,

  chipHeight: 26,

  nodeMinHeight: 84,
  insetMinHeight: 56,
  octetMinWidth: 76,
  labelWidth: 150, //         
  badge: { sm: 22, md: 26, lg: 30, xl: 36 },
  layerRowHeight: 38,
  bitCell: 14,
  gridMaxWidth: 520,
  centerBlockMaxWidth: 760, 
  diagramMinWidth: 560,
  tableMinWidth: 720,

  navButtonMinWidth: 132,
  navBarPaddingY: 1,

  dashboardCardMinHeight: 168,
  themePopoverWidth: 320,
} as const;

/* ───────────────────────── Motion ───────────────────────── */
export const MOTION = { fade: 250, fast: 150 } as const;
