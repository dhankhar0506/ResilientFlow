import { Box, Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import { CATEGORIES, UI, type Lang } from "../../i18n";

export default function Overview({ lang, onSelect }: { lang: Lang; onSelect: (id: string) => void }) {
  const t = UI[lang];

  return (
    <Stack spacing={3.2}>
      <Box>
        <Typography
          component="h1"
          sx={{ fontSize: { xs: 26, sm: 33 }, fontWeight: 850, letterSpacing: "-0.8px", lineHeight: 1.18, mb: 1 }}
        >
          {t.heroTitle}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 13.5, lineHeight: 1.65, maxWidth: 620 }}>
          {t.heroSubtitle}
        </Typography>
      </Box>

      <Box>
        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: "text.secondary", mb: 1.4 }}>
          {t.categoriesHeading}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" },
            gap: 1.4,
          }}
        >
          {CATEGORIES.map((c) => (
            <Card
              key={c.id}
              variant="outlined"
              sx={{
                borderRadius: 3,
                borderColor: c.available ? "primary.main" : "divider",
                bgcolor: "background.paper",
              }}
            >
              <CardActionArea
                disabled={!c.available}
                onClick={() => c.available && onSelect("http")}
                sx={{ p: 1.8, height: "100%", minHeight: 168, alignItems: "stretch" }}
              >
                <Stack sx={{ height: "100%" }} spacing={0.8} alignItems="flex-start">
                  <Typography sx={{ fontSize: 23 }}>{c.icon}</Typography>
                  <Typography sx={{ fontWeight: 750, fontSize: 13.5 }}>{c.title[lang]}</Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: 11.5, lineHeight: 1.45, flexGrow: 1 }}>
                    {c.desc[lang]}
                  </Typography>
                  <Chip
                    label={c.available ? t.available : t.comingSoon}
                    size="small"
                    sx={{
                      height: 21,
                      fontSize: 9.5,
                      fontWeight: 800,
                      bgcolor: c.available ? "success.main" : "action.hover",
                      color: c.available ? "#fff" : "text.secondary",
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
