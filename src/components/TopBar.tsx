

// import { IconButton, Stack, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
// import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
// import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
// import type { Lang } from "../i18n";
// import type { ThemeName } from "../theme";
// import ThemePicker from "../Themepicker";

// export default function TopBar({
//   mode,
//   onModeChange,
//   lang,
//   onLangChange,
//   themeName,
//   onThemeChange,
// }: {
//   mode: "light" | "dark";
//   onModeChange: (m: "light" | "dark") => void;
//   lang: Lang;
//   onLangChange: (l: Lang) => void;
//   themeName: ThemeName;
//   onThemeChange: (name: ThemeName) => void;
// }) {
//   return (
//     <Stack
//       direction="row"
//       justifyContent="flex-end"
//       alignItems="center"
//       spacing={1.2}
//       sx={{ px: { xs: 2, sm: 4, md: 5 }, pt: 2.4, pb: 0 }}
//     >
//       <ToggleButtonGroup
//         size="small"
//         exclusive
//         value={lang}
//         onChange={(_, val) => val && onLangChange(val)}
//         sx={{
//           bgcolor: "background.paper",
//           border: "1px solid",
//           borderColor: "divider",
//           borderRadius: 999,
//           p: 0.3,
//           "& .MuiToggleButton-root": {
//             border: "none",
//             borderRadius: 999,
//             textTransform: "none",
//             fontSize: 11.5,
//             fontWeight: 700,
//             px: 1.5,
//             py: 0.45,
//             color: "text.secondary",
//           },
//           // contrastText: har theme mein selected text readable rahe
//           "& .Mui-selected": { bgcolor: "primary.main", color: "primary.contrastText !important" },
//         }}
//       >
//         <ToggleButton value="en">EN</ToggleButton>
//         <ToggleButton value="hi">Hinglish</ToggleButton>
//       </ToggleButtonGroup>

//       <ThemePicker themeName={themeName} mode={mode} lang={lang} onChange={onThemeChange} />

//       <Tooltip title={mode === "dark" ? "Switch to light" : "Switch to dark"}>
//         <IconButton
//           onClick={() => onModeChange(mode === "dark" ? "light" : "dark")}
//           sx={{ border: "1px solid", borderColor: "divider", bgcolor: "background.paper", borderRadius: 999 }}
//         >
//           {mode === "dark" ? <LightModeRoundedIcon sx={{ fontSize: 18 }} /> : <DarkModeRoundedIcon sx={{ fontSize: 18 }} />}
//         </IconButton>
//       </Tooltip>
//     </Stack>
//   );
// }
import {
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import type { Lang } from "../i18n";
import type { ThemeName } from "../theme";
import ThemePicker from "../ThemePicker";

export default function TopBar({
  mode,
  onModeChange,
  lang,
  onLangChange,
  themeName,
  onThemeChange,
}: {
  mode: "light" | "dark";
  onModeChange: (m: "light" | "dark") => void;
  lang: Lang;
  onLangChange: (l: Lang) => void;
  themeName: ThemeName;
  onThemeChange: (name: ThemeName) => void;
}) {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={1.2}
      sx={{
        px: { xs: 2, sm: 4, md: 5 },
        pt: 2.4,
        pb: 0,

        // Sticky TopBar
        position: "sticky",
        top: 0,
        zIndex: 1100,
        bgcolor: "background.default",
      }}
    >
      <ToggleButtonGroup
        size="small"
        exclusive
        value={lang}
        onChange={(_, val) => val && onLangChange(val)}
        sx={{
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 999,
          p: 0.3,

          "& .MuiToggleButton-root": {
            border: "none",
            borderRadius: 999,
            textTransform: "none",
            fontSize: "button.fontSize",
            fontWeight: 700,
            px: 1.5,
            py: 0.45,
            color: "text.secondary",
          },

          "& .Mui-selected": {
            bgcolor: "primary.main",
            color: "primary.contrastText !important",
          },
        }}
      >
        <ToggleButton value="en">EN</ToggleButton>
        <ToggleButton value="hi">Hinglish</ToggleButton>
      </ToggleButtonGroup>

      <ThemePicker
        themeName={themeName}
        mode={mode}
        lang={lang}
        onChange={onThemeChange}
      />

      <Tooltip
        title={mode === "dark" ? "Switch to light" : "Switch to dark"}
      >
        <IconButton
          onClick={() =>
            onModeChange(mode === "dark" ? "light" : "dark")
          }
          sx={{
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            borderRadius: 999,
          }}
        >
          {mode === "dark" ? (
            <LightModeRoundedIcon sx={{ fontSize: 18 }} />
          ) : (
            <DarkModeRoundedIcon sx={{ fontSize: 18 }} />
          )}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}