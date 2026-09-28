// import { useState } from "react";
// import { Box, ButtonBase, IconButton, Popover, Stack, Tooltip, Typography } from "@mui/material";
// import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
// import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
// import { THEME_LIST, getSwatch, type Mode, type ThemeName } from "./theme";
// import type { Lang } from "./i18n";

// interface ThemePickerProps {
//   themeName: ThemeName;
//   mode: Mode;
//   lang: Lang;
//   onChange: (name: ThemeName) => void;
// }

// const TEXT = {
//   en: { title: "Choose a theme", tooltip: "Change theme" },
//   hi: { title: "Theme chuno", tooltip: "Theme badlo" },
// } as const;

// export default function ThemePicker({ themeName, mode, lang, onChange }: ThemePickerProps) {
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
//   const text = TEXT[lang];

//   return (
//     <>
//       <Tooltip title={text.tooltip}>
//         <IconButton
//           aria-label={text.tooltip}
//           onClick={(e) => setAnchorEl(e.currentTarget)}
//           sx={{ border: "1px solid", borderColor: "divider", bgcolor: "background.paper", }}
//         >
//           <PaletteRoundedIcon sx={{ fontSize: 18 }} />
//         </IconButton>
//       </Tooltip>

//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={() => setAnchorEl(null)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//         slotProps={{
//           paper: { sx: { p: 1, mt: 1, borderRadius: 3, width: 300, border: "1px solid", borderColor: "divider" } },
//         }}
//       >
//         <Typography sx={{ fontSize: 13, fontWeight: 800, mb: 1.4 }}>{text.title}</Typography>

//         <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1.2 }}>
//           {THEME_LIST.map(({ id, label }) => {
//             const swatch = getSwatch(id, mode);
//             const selected = id === themeName;
//             return (
//               <ButtonBase
//                 key={id}
//                 onClick={() => {
//                   onChange(id);
//                   setAnchorEl(null);
//                 }}
//                 aria-pressed={selected}
//                 sx={{
//                   display: "block",
//                   textAlign: "left",
//                   borderRadius: 2.5,
//                   overflow: "hidden",
//                   border: "2px solid",
//                   borderColor: selected ? "primary.main" : "divider",
//                   transition: "border-color 0.15s, transform 0.15s",
//                   "&:hover": { transform: "translateY(-2px)" },
//                 }}
//               >
//                 {/* Mini preview of the theme */}
//                 <Box sx={{ bgcolor: swatch.bg, p: 1.1 }}>
//                   <Box sx={{ bgcolor: swatch.paper, borderRadius: 1.5, p: 0.9 }}>
//                     <Box sx={{ height: 5, width: "60%", borderRadius: 99, bgcolor: swatch.text, opacity: 0.7, mb: 0.7 }} />
//                     <Stack direction="row" gap={0.6}>
//                       <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: swatch.primary }} />
//                       <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: swatch.secondary }} />
//                     </Stack>
//                   </Box>
//                 </Box>

//                 <Stack
//                   direction="row"
//                   alignItems="center"
//                   justifyContent="space-between"
//                   sx={{ px: 1.1, py: 0.7, bgcolor: "background.paper" }}
//                 >
//                   <Typography sx={{ fontSize: 12, fontWeight: 800, color: "text.primary" }}>{label}</Typography>
//                   {selected && <CheckRoundedIcon sx={{ fontSize: 16, color: "primary.main" }} />}
//                 </Stack>
//               </ButtonBase>
//             );
//           })}
//         </Box>
//       </Popover>
//     </>
//   );
// }
import { useState } from "react";
import { Box, ButtonBase, IconButton, Popover, Stack, Tooltip, Typography } from "@mui/material";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { THEME_LIST, getSwatch, type Mode, type ThemeName } from "./theme";
import type { Lang } from "./i18n";

interface ThemePickerProps {
  themeName: ThemeName;
  mode: Mode;
  lang: Lang;
  onChange: (name: ThemeName) => void;
}

const TEXT = {
  en: { title: "Choose a theme", tooltip: "Change theme" },
  hi: { title: "Theme chuno", tooltip: "Theme badlo" },
} as const;

export default function ThemePicker({ themeName, mode, lang, onChange }: ThemePickerProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const text = TEXT[lang];

  return (
    <>
      <Tooltip title={text.tooltip}>
        <IconButton
          aria-label={text.tooltip}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ border: "1px solid", borderColor: "divider", bgcolor: "background.paper", borderRadius: 999 }}
        >
          <PaletteRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: { sx: { p: 2, mt: 1, borderRadius: 3, width: 300, border: "1px solid", borderColor: "divider" } },
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 800, mb: 1.4 }}>{text.title}</Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1.2 }}>
          {THEME_LIST.map(({ id, label }) => {
            const swatch = getSwatch(id, mode);
            const selected = id === themeName;
            return (
              <ButtonBase
                key={id}
                onClick={() => {
                  onChange(id);
                  setAnchorEl(null);
                }}
                aria-pressed={selected}
                sx={{
                  display: "block",
                  textAlign: "left",
                  borderRadius: 2.5,
                  overflow: "hidden",
                  border: "2px solid",
                  borderColor: selected ? "primary.main" : "divider",
                  transition: "border-color 0.15s, transform 0.15s",
                  "&:hover": { transform: "translateY(-2px)" },
                }}
              >
                <Box sx={{ bgcolor: swatch.bg, p: 1.1 }}>
                  <Box sx={{ bgcolor: swatch.paper, borderRadius: 1.5, p: 0.9 }}>
                    <Box sx={{ height: 5, width: "60%", borderRadius: 99, bgcolor: swatch.text, opacity: 0.7, mb: 0.7 }} />
                    <Stack direction="row" gap={0.6}>
                      <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: swatch.primary }} />
                      <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: swatch.secondary }} />
                    </Stack>
                  </Box>
                </Box>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ px: 1.1, py: 0.7, bgcolor: "background.paper" }}
                >
                  <Typography sx={{ fontSize: 12, fontWeight: 800, color: "text.primary" }}>{label}</Typography>
                  {selected && <CheckRoundedIcon sx={{ fontSize: 16, color: "primary.main" }} />}
                </Stack>
              </ButtonBase>
            );
          })}
        </Box>
      </Popover>
    </>
  );
}