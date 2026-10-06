import { Box, ButtonBase, Chip, Stack, Typography } from "@mui/material";

import { NETWORK_LESSONS, UI, type Lang } from "../../i18n";
import { FONT, LAYOUT, RADIUS, SIZE } from "../../config/design";


export default function NetworkingHome({ lang, onSelect }: { lang: Lang; onSelect: (id: string) => void }) {
  const t = UI[lang];

  return (
    <Stack spacing={LAYOUT.lessonGap}>
      <Box>
        <Typography component="h1" variant="h1" sx={{ mb: 0.4 }}>
          {t.networkingTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t.networkingSubtitle}
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: LAYOUT.lessonCardColumns, gap: 1.5 }}>
        {NETWORK_LESSONS.map((item, i) => (
          <ButtonBase
            key={item.id}
            disabled={!item.available}
            onClick={() => onSelect(item.id)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1.5,
              p: 1.75,
              textAlign: "left",
              borderRadius: RADIUS.card,
              border: "1px solid",
              borderColor: item.available ? "primary.main" : "divider",
              bgcolor: "background.paper",
              opacity: item.available ? 1 : 0.6,
              transition: "transform .15s, box-shadow .15s",
              "&:hover": item.available ? { transform: "translateY(-2px)", bgcolor: "action.hover" } : {},
            }}
          >
            <Box sx={{ fontSize: FONT.h2, width: SIZE.icon.xl, textAlign: "center", flexShrink: 0 }}>{item.icon}</Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography sx={{ fontSize: FONT.lead, fontWeight: 750, lineHeight: 1.3 }}>{item.label}</Typography>
              <Typography variant="caption" color="text.secondary">
                {item.available ? `${t.lessonsHeading} ${i + 1}` : t.comingSoon}
              </Typography>
            </Box>
            {!item.available && <Chip size="small" label={t.comingSoon} />}
          </ButtonBase>
        ))}
      </Box>
    </Stack>
  );
}
