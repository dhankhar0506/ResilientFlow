import { useEffect, useRef } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { NETWORK_LESSONS } from "../i18n";
import { FONT, LAYOUT, RADIUS, SIZE } from "../config/design";

/** Horizontal strip of lessons – shown under the top bar while "Networking" is open. */
export default function LessonBar({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const lessons = NETWORK_LESSONS.filter((l) => l.available);
  const activeRef = useRef<HTMLButtonElement | null>(null);

  // keep the selected lesson visible inside the strip
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeId]);

  return (
    <Box
      component="nav"
      aria-label="Networking lessons"
      sx={{
        height: LAYOUT.lessonBarHeight,
        px: LAYOUT.pagePaddingX,
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        overflowX: "auto",
        overflowY: "hidden",
        bgcolor: (t) => alpha(t.palette.background.default, 0.94),
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {lessons.map((item, i) => {
        const active = item.id === activeId;
        return (
          <ButtonBase
            key={item.id}
            ref={active ? activeRef : undefined}
            onClick={() => onSelect(item.id)}
            aria-current={active ? "page" : undefined}
            sx={{
              flex: "0 0 auto",
              height: SIZE.lessonChipHeight,
              px: 1.5,
              gap: 0.75,
              borderRadius: RADIUS.pill,
              border: "1px solid",
              borderColor: active ? "primary.main" : "divider",
              bgcolor: active ? "primary.main" : "background.paper",
              color: active ? "primary.contrastText" : "text.primary",
              transition: "background-color .15s, border-color .15s",
              "&:hover": { bgcolor: active ? "primary.dark" : "action.hover" },
            }}
          >
            <Box component="span" sx={{ fontSize: FONT.lead, lineHeight: 1 }}>
              {item.icon}
            </Box>
            <Typography sx={{ fontSize: FONT.small, fontWeight: active ? 800 : 600, whiteSpace: "nowrap" }}>
              {i + 1}. {item.label}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
