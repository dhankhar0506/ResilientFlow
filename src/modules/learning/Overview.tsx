import { Box, Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import { CATEGORIES, UI, type Lang } from "../../i18n";
import { FONT, LAYOUT, RADIUS, SIZE } from "../../config/design";

export default function Overview({ lang, onSelect }: { lang: Lang; onSelect: (id: string) => void }) {
  const t = UI[lang];

  return (
    <Stack spacing={3}>
      <Box>
        <Typography component="h1" sx={{ fontSize: { xs: FONT.h1, sm: FONT.display }, fontWeight: 800, letterSpacing: "-0.8px", lineHeight: 1.18, mb: 1 }}>
          {t.heroTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 760 }}>
          {t.heroSubtitle}
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 1.5 }}>
          {t.categoriesHeading}
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: LAYOUT.dashboardColumns, gap: 1.5 }}>
          {CATEGORIES.map((c) => (
            <Card
              key={c.id}
              variant="outlined"
              sx={{
                borderRadius: RADIUS.card,
                borderColor: c.available ? "primary.main" : "divider",
                bgcolor: "background.paper",
              }}
            >
              <CardActionArea
                disabled={!c.available}
                onClick={() => c.available && onSelect(c.id)}
                sx={{ p: 2, height: "100%", minHeight: SIZE.dashboardCardMinHeight, alignItems: "stretch" }}
              >
                <Stack sx={{ height: "100%" }} spacing={0.8} alignItems="flex-start">
                  <Typography sx={{ fontSize: FONT.h2 }}>{c.icon}</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 750 }}>{c.title[lang]}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", flexGrow: 1 }}>
                    {c.desc[lang]}
                  </Typography>
                  <Chip
                    label={c.available ? t.available : t.comingSoon}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      bgcolor: c.available ? "success.main" : "action.hover",
                      color: c.available ? "success.contrastText" : "text.secondary",
                    }}
                  />
                </Stack>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}
