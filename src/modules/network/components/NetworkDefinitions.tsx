import { useMemo, useState } from "react";
import {
    Box,
    Button,
    Chip,
    Collapse,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { UI, type Lang } from "../../../i18n";
import {
    DEFINITIONS,
    DEFINITIONS_LABELS,
    type DefinitionCategory,
} from "../data/NetworkDefinitions";

type CategoryFilter = "all" | DefinitionCategory;

const CATEGORY_ORDER: DefinitionCategory[] = [
    "basics",
    "addressing",
    "subnetting",
    "routing",
];

export default function NetworkDefinitions({ lang }: { lang: Lang }) {
    const t = UI[lang];
    const l = DEFINITIONS_LABELS[lang];

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<CategoryFilter>("all");
    const [openIds, setOpenIds] = useState<string[]>([]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return DEFINITIONS.filter((item) => {
            if (category !== "all" && item.category !== category) return false;
            if (!q) return true;

            const haystack = [
                item.term,
                item.fullForm ?? "",
                item[lang].definition,
                item[lang].note ?? "",
            ]
                .join(" ")
                .toLowerCase();

            return haystack.includes(q);
        });
    }, [query, category, lang]);

    const toggle = (id: string) => {
        setOpenIds((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const expandable = filtered.filter((item) => item.diagram);

    const allOpen =
        expandable.length > 0 &&
        expandable.every((item) => openIds.includes(item.id));

    const toggleAll = () => {
        if (allOpen) {
            setOpenIds((prev) =>
                prev.filter((id) => !expandable.some((item) => item.id === id))
            );
        } else {
            setOpenIds((prev) =>
                Array.from(
                    new Set([...prev, ...expandable.map((item) => item.id)])
                )
            );
        }
    };

    return (
        <Stack spacing={2.3}>
            {/* Header */}
            <Box>
                <Typography
                    variant="subtitle2"
                    sx={{ color: "primary.main", mb: 0.5 }}
                >
                    {l.lessonTitle}
                </Typography>

                <Typography
                    component="h1"
                    variant="h1"
                    sx={{ letterSpacing: "-0.6px", mb: 0.6 }}
                >
                    {l.heroTitle}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    {l.heroSubtitle}
                </Typography>
            </Box>

            {/* Available terms */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={1}
            >
                <Chip
                    label={t.available}
                    size="small"
                    sx={{
                        bgcolor: "success.main",
                        color: "#fff",
                        fontWeight: 800,
                    }}
                />

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 700 }}
                >
                    {filtered.length} / {DEFINITIONS.length} {l.terms}
                </Typography>
            </Stack>

            {/* Search */}
            <TextField
                size="small"
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={l.searchPlaceholder}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRoundedIcon fontSize="small" />
                        </InputAdornment>
                    ),
                    sx: { borderRadius: 2.5 },
                }}
            />

            {/* Category filters */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={1}
                flexWrap="wrap"
            >
                <Stack direction="row" flexWrap="wrap" gap={0.8}>
                    {(["all", ...CATEGORY_ORDER] as CategoryFilter[]).map((c) => {
                        const active = category === c;

                        return (
                            <Chip
                                key={c}
                                label={c === "all" ? l.all : l.categories[c]}
                                size="small"
                                onClick={() => setCategory(c)}
                                sx={{
                                    fontWeight: 850,
                                    bgcolor: active ? "primary.main" : "action.selected",
                                    color: active ? "#fff" : "primary.main",
                                    "&:hover": {
                                        bgcolor: active ? "primary.main" : "action.hover",
                                    },
                                }}
                            />
                        );
                    })}
                </Stack>

                {expandable.length > 0 && (
                    <Button
                        size="small"
                        color="inherit"
                        onClick={toggleAll}
                        sx={{ textTransform: "none" }}
                    >
                        {allOpen ? l.collapseAll : l.expandAll}
                    </Button>
                )}
            </Stack>

            {/* No results */}
            {filtered.length === 0 && (
                <Paper
                    variant="outlined"
                    sx={{
                        p: 2.2,
                        borderRadius: 2.5,
                        borderColor: "divider",
                        bgcolor: "background.paper",
                    }}
                >
                    <Typography variant="body1" color="text.secondary">
                        {l.noResults}
                    </Typography>
                </Paper>
            )}

            {/* Definition cards */}
            {filtered.map((item) => {
                const content = item[lang];
                const open = openIds.includes(item.id);

                return (
                    <Paper
                        key={item.id}
                        variant="outlined"
                        sx={{
                            p: { xs: 1.7, sm: 2.2 },
                            borderRadius: 2.5,
                            borderColor: "divider",
                            borderTop: "4px solid",
                            borderTopColor: "primary.main",
                            bgcolor: "background.paper",
                        }}
                    >
                        {/* Term and category */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            gap={1}
                            sx={{ mb: 1.1 }}
                        >
                            <Stack
                                direction="row"
                                alignItems="baseline"
                                gap={1}
                                flexWrap="wrap"
                            >
                                <Typography component="h2" variant="h3">
                                    {item.term}
                                </Typography>

                                {item.fullForm && (
                                    <Typography variant="body2" color="text.secondary">
                                        {item.fullForm}
                                    </Typography>
                                )}
                            </Stack>

                            <Chip
                                label={l.categories[item.category]}
                                size="small"
                                sx={{
                                    bgcolor: "action.selected",
                                    color: "primary.main",
                                    fontWeight: 850,
                                }}
                            />
                        </Stack>

                        {/* Definition */}
                        <Typography variant="body1" color="text.secondary">
                            {content.definition}
                        </Typography>

                        {/* Note */}
                        {content.note && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.8 }}
                            >
                                💡 {content.note}
                            </Typography>
                        )}

                        {/* Diagram toggle */}
                        {item.diagram && (
                            <>
                                <Button
                                    size="small"
                                    onClick={() => toggle(item.id)}
                                    endIcon={
                                        <ExpandMoreRoundedIcon
                                            sx={{
                                                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.2s",
                                            }}
                                        />
                                    }
                                    sx={{
                                        textTransform: "none",
                                        mt: 1,
                                        ml: -1,
                                    }}
                                >
                                    {open ? l.hideDetails : l.showDetails}
                                </Button>

                                <Collapse in={open} unmountOnExit>
                                    <Box
                                        component="pre"
                                        sx={{
                                            m: 0,
                                            mt: 0.8,
                                            p: 1.6,
                                            borderRadius: 2,
                                            overflowX: "auto",
                                            bgcolor: "action.hover",
                                            color: "secondary.main",
                                            fontFamily: "ui-monospace, Menlo, monospace",
                                            typography: "caption",
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {item.diagram}
                                    </Box>
                                </Collapse>
                            </>
                        )}
                    </Paper>
                );
            })}
        </Stack>
    );
}