import { alpha, createTheme, type ThemeOptions } from "@mui/material/styles";

export type Mode = "light" | "dark";
export type ThemeName =
  | "lagoon"
  | "ember"
  | "rose"
  | "forest"
  | "ocean"
  | "graphite";

export const THEME_NAME: ThemeName = "lagoon";

interface ModeColors {
  bg: string;
  paper: string;
  text: string;
  textSecondary: string;
  divider: string;
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: string;
}

interface Preset {
  label: string;
  light: ModeColors;
  dark: ModeColors;
}

const PRESETS: Record<ThemeName, Preset> = {
  lagoon: {
    label: "Lagoon",
    light: {
      bg: "#f0f7f6",
      paper: "#ffffff",
      text: "#173431",
      textSecondary: "#526d68",
      divider: "#d7e7e3",
      primary: {
        main: "#176b65",
        light: "#4caaa0",
        dark: "#10534e",
        contrastText: "#ffffff",
      },
      secondary: "#b85d72",
    },
    dark: {
      bg: "#111c1d",
      paper: "#1a292a",
      text: "#e6f2ef",
      textSecondary: "#a2bbb5",
      divider: "#304342",
      primary: {
        main: "#69c6b9",
        light: "#a0e2d7",
        dark: "#3b9b90",
        contrastText: "#102c29",
      },
      secondary: "#e59aaa",
    },
  },


  ember: {
    label: "Ember",
    light: {
      bg: "#f8f5ef",
      paper: "#ffffff",
      text: "#35291f",
      textSecondary: "#756557",
      divider: "#e8dfd2",
      primary: {
        main: "#a84b20",
        light: "#d9824f",
        dark: "#813916",
        contrastText: "#ffffff",
      },
      secondary: "#3f7896",
    },
    dark: {
      bg: "#201a17",
      paper: "#2b231e",
      text: "#f5ece2",
      textSecondary: "#c0ad9b",
      divider: "#49382d",
      primary: {
        main: "#f0a56c",
        light: "#f8c69b",
        dark: "#ce7b40",
        contrastText: "#382012",
      },
      secondary: "#83bad8",
    },
  },

  rose: {
    label: "Rose",
    light: {
      bg: "#faf3f5",
      paper: "#ffffff",
      text: "#38232b",
      textSecondary: "#795b66",
      divider: "#ead9df",
      primary: {
        main: "#a83e60",
        light: "#d97894",
        dark: "#822d49",
        contrastText: "#ffffff",
      },
      secondary: "#4d7fa3",
    },
    dark: {
      bg: "#21171d",
      paper: "#2d2028",
      text: "#f6eaf0",
      textSecondary: "#c6a8b5",
      divider: "#49303d",
      primary: {
        main: "#e99ab3",
        light: "#f4c0d0",
        dark: "#c76b8b",
        contrastText: "#3c1828",
      },
      secondary: "#91bde0",
    },
  },


  forest: {
    label: "Forest",
    light: {
      bg: "#f2f7f1",
      paper: "#ffffff",
      text: "#203326",
      textSecondary: "#5c735f",
      divider: "#dbe7d9",
      primary: {
        main: "#397448",
        light: "#75a97b",
        dark: "#285837",
        contrastText: "#ffffff",
      },
      secondary: "#a66b26",
    },
    dark: {
      bg: "#151e18",
      paper: "#202c23",
      text: "#e8f1e8",
      textSecondary: "#adc0ad",
      divider: "#344738",
      primary: {
        main: "#8ecb94",
        light: "#b8e2bb",
        dark: "#5b9e67",
        contrastText: "#17351e",
      },
      secondary: "#e5bd70",
    },
  },


  ocean: {
    label: "Ocean",
    light: {
      bg: "#f1f5fb",
      paper: "#ffffff",
      text: "#1c2c45",
      textSecondary: "#5b6e8b",
      divider: "#dce5f1",
      primary: {
        main: "#365fa8",
        light: "#7598d4",
        dark: "#284980",
        contrastText: "#ffffff",
      },
      secondary: "#397e91",
    },
    dark: {
      bg: "#141c2a",
      paper: "#1e293b",
      text: "#eaf0fb",
      textSecondary: "#a7b7d0",
      divider: "#34435c",
      primary: {
        main: "#91b6f4",
        light: "#bed4fc",
        dark: "#6795df",
        contrastText: "#172b4d",
      },
      secondary: "#79c6d4",
    },
  },

  graphite: {
    label: "Graphite",
    light: {
      bg: "#f4f4f5",
      paper: "#ffffff",
      text: "#27272a",
      textSecondary: "#62626b",
      divider: "#e1e1e6",
      primary: {
        main: "#52525b",
        light: "#85858f",
        dark: "#3f3f46",
        contrastText: "#ffffff",
      },
      secondary: "#347d75",
    },
    dark: {
      bg: "#191a1e",
      paper: "#24252b",
      text: "#ededf0",
      textSecondary: "#b0b1bb",
      divider: "#3b3c45",
      primary: {
        main: "#c0c3ce",
        light: "#e1e3ea",
        dark: "#999eae",
        contrastText: "#24252b",
      },
      secondary: "#76c9bb",
    },
  },
};

export const THEME_LIST = (
  Object.keys(PRESETS) as ThemeName[]
).map((id) => ({
  id,
  label: PRESETS[id].label,
}));

export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === "string" && value in PRESETS;
}

export function getSwatch(name: ThemeName, mode: Mode) {
  const c = PRESETS[name][mode];

  return {
    bg: c.bg,
    paper: c.paper,
    primary: c.primary.main,
    secondary: c.secondary,
    text: c.text,
  };
}

const shared: ThemeOptions = {
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',

    fontSize: 11,

    h1: {
      fontSize: "1.1rem", 
      fontWeight: 700,
      lineHeight: 1.3,
    },

    h2: {
      fontSize: "1rem", 
      fontWeight: 700,
      lineHeight: 1.35,
    },

    h3: {
      fontSize: "0.9rem",
      fontWeight: 700,
      lineHeight: 1.4,
    },

    h4: {
      fontSize: "0.85rem", 
      fontWeight: 700,
    },

    h5: {
      fontSize: "0.8rem", 
      fontWeight: 700,
    },

    h6: {
      fontSize: "0.75rem", 
      fontWeight: 700,
    },

    body1: {
      fontSize: "0.75rem", 
      lineHeight: 1.45,
    },

    body2: {
      fontSize: "0.6875rem", 
      lineHeight: 1.45,
    },

    subtitle1: {
      fontSize: "0.75rem",
      fontWeight: 600,
    },

    subtitle2: {
      fontSize: "0.6875rem",
      fontWeight: 600,
    },

    caption: {
      fontSize: "0.625rem", // 10px
      lineHeight: 1.4,
    },

    button: {
      fontSize: "0.6875rem",
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 14,
  },
};
export function getTheme(
  mode: Mode,
  name: ThemeName = THEME_NAME
) {
  const dark = mode === "dark";
  const c = PRESETS[name][mode];
  const { primary } = c;
  const secondary = { main: c.secondary };

  return createTheme({
    ...shared,

    palette: {
      mode,
      primary,
      secondary,

      success: {
        main: dark ? "#81c995" : "#287d45",
      },

      warning: {
        main: dark ? "#edbd70" : "#996116",
      },

      error: {
        main: dark ? "#f18b91" : "#b83242",
      },

      info: {
        main: dark ? "#83bce8" : "#356f9e",
      },

      background: {
        default: c.bg,
        paper: c.paper,
      },

      text: {
        primary: c.text,
        secondary: c.textSecondary,
      },

      divider: c.divider,

      action: {
        selected: alpha(primary.main, dark ? 0.2 : 0.12),
        hover: alpha(primary.main, dark ? 0.12 : 0.07),
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: `
              radial-gradient(
                900px 520px at 88% -10%,
                ${alpha(primary.main, dark ? 0.11 : 0.09)},
                transparent 60%
              ),
              radial-gradient(
                700px 420px at -5% 8%,
                ${alpha(secondary.main, dark ? 0.07 : 0.06)},
                transparent 55%
              )
            `,
            backgroundAttachment: "fixed",
            transition:
              "background-color 0.25s ease, color 0.25s ease",
          },

          "::selection": {
            backgroundColor: alpha(primary.main, 0.3),
          },

          "*::-webkit-scrollbar": {
            width: 10,
            height: 10,
          },

          "*::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(primary.main, 0.35),
            borderRadius: 99,
          },

          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: alpha(primary.main, 0.55),
          },
        },
      },

      MuiCardActionArea: {
        styleOverrides: {
          focusHighlight: {
            opacity: 0,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },

          outlined: {
            boxShadow: dark
              ? "0 8px 24px -16px rgba(0,0,0,0.5)"
              : `0 8px 24px -18px ${alpha(primary.main, 0.35)}`,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontWeight: 650,
          },

          containedPrimary: {
            backgroundImage: `linear-gradient(
              135deg,
              ${primary.main},
              ${primary.dark}
            )`,
            color: primary.contrastText,

            "&:hover": {
              filter: "brightness(1.06)",
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            fontWeight: 600,
          },
        },
      },

      MuiLinearProgress: {
        styleOverrides: {
          bar: {
            backgroundImage: `linear-gradient(
              90deg,
              ${primary.light},
              ${primary.main}
            )`,
          },
        },
      },
    },
  });
}