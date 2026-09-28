
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
import LaptopMacRoundedIcon from "@mui/icons-material/LaptopMacRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

import { DEFAULT_GATEWAY_DATA } from "../data/DefaultGateway";

type Props = {
  lang?: "en" | "hi";
};

const DefaultGateway = ({ lang = "en" }: Props) => {
  const content = DEFAULT_GATEWAY_DATA[lang];

  const [stepIndex, setStepIndex] = useState(0);

  const step = content.steps[stepIndex];
  const totalSteps = content.steps.length;
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  const goNext = () => {
    setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const goBack = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1100,
        mx: "auto",
        pb: 1,
      }}
    >
      {/* Header */}
      <Stack spacing={0.75} mb={1.5}>
        <Chip
          label="Networking Lesson"
          color="primary"
          size="small"
          sx={{
            width: "fit-content",
            fontWeight: 600,
            height: 22,
          }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}
        >
          {content.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.5,
            color: "text.secondary",
            maxWidth: 750,
          }}
        >
          {content.subtitle}
        </Typography>
      </Stack>

      {/* Network Flow Diagram */}
      <Card
        variant="outlined"
        sx={{
          mb: 1.5,
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "background.paper",
        }}
      >
        <CardContent sx={{ p: { xs: 1, md: 1.5 } }}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            mb={1.25}
          >
            {lang === "en" ? "Network Flow" : "Network Flow"}
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="center"
            spacing={{ xs: 1, md: 1.5 }}
          >
            {/* Laptop */}
            <Box
              sx={{
                flex: 1,
                width: "100%",
                minHeight: 85,
                p: 1.25,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                textAlign: "center",
                bgcolor: "action.hover",
              }}
            >
              <LaptopMacRoundedIcon
                sx={{
                  fontSize: 25,
                  color: "primary.main",
                  mb: 0.25,
                }}
              />

              <Typography variant="body2" fontWeight={700}>
                {content.diagram.laptop}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                mt={0.2}
                display="block"
              >
                192.168.1.10
              </Typography>
            </Box>

            {/* Arrow */}
            <ArrowForwardRoundedIcon
              sx={{
                color: "primary.main",
                transform: {
                  xs: "rotate(90deg)",
                  md: "none",
                },
                fontSize: 20,
              }}
            />

            {/* Router */}
            <Box
              sx={{
                flex: 1,
                width: "100%",
                minHeight: 85,
                p: 1.25,
                border: 1,
                borderColor: "primary.main",
                borderRadius: 2,
                textAlign: "center",
                bgcolor: "action.selected",
              }}
            >
              <RouterRoundedIcon
                sx={{
                  fontSize: 25,
                  color: "primary.main",
                  mb: 0.25,
                }}
              />

              <Typography
                variant="body2"
                fontWeight={700}
                whiteSpace="pre-line"
              >
                {content.diagram.router}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                mt={0.2}
                display="block"
              >
                192.168.1.1
              </Typography>
            </Box>

            {/* Arrow */}
            <ArrowForwardRoundedIcon
              sx={{
                color: "primary.main",
                transform: {
                  xs: "rotate(90deg)",
                  md: "none",
                },
                fontSize: 20,
              }}
            />

            {/* Outside Network */}
            <Box
              sx={{
                flex: 1,
                width: "100%",
                minHeight: 85,
                p: 1.25,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                textAlign: "center",
                bgcolor: "action.hover",
              }}
            >
              <PublicRoundedIcon
                sx={{
                  fontSize: 25,
                  color: "secondary.main",
                  mb: 0.25,
                }}
              />

              <Typography variant="body2" fontWeight={700}>
                {content.diagram.destination}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                mt={0.2}
                display="block"
              >
                Internet / Remote Network
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Progress */}
      <Box mb={1.25}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={0.5}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
          >
            {lang === "en" ? "Lesson Progress" : "Lesson Progress"}
          </Typography>

          <Typography
            variant="caption"
            color="primary.main"
            fontWeight={700}
          >
            {stepIndex + 1} / {totalSteps}
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 4,
            borderRadius: 99,
            bgcolor: "action.selected",
          }}
        />
      </Box>

      {/* Step Navigation */}
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={0.5}
        mb={1.5}
      >
        {content.steps.map((item, index) => (
          <Chip
            key={item.title}
            label={`${index + 1}. ${item.title}`}
            onClick={() => setStepIndex(index)}
            color={index === stepIndex ? "primary" : "default"}
            variant={index === stepIndex ? "filled" : "outlined"}
            sx={{
              height: "auto",
              py: 0.2,
              maxWidth: "100%",
              "& .MuiChip-label": {
                whiteSpace: "normal",
                py: 0.3,
                px: 1,
                lineHeight: 1.35,
              },
            }}
          />
        ))}
      </Stack>

      {/* Lesson Content */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 2,
          borderTop: 2,
          borderTopColor: "primary.main",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 1.25, md: 1.75 },
          }}
        >
          <Stack spacing={1.5}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              {step.title}
            </Typography>

            {/* Definition */}
            <Box
              sx={{
                p: 1.25,
                borderRadius: 2,
                bgcolor: "action.hover",
                borderLeft: 3,
                borderColor: "primary.main",
              }}
            >
              <Typography
                variant="caption"
                color="primary.main"
                fontWeight={700}
                sx={{ lineHeight: 1.4 }}
              >
                {lang === "en" ? "Simple Definition" : "Easy Definition"}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.5,
                  mt: 0.5,
                }}
              >
                {step.definition}
              </Typography>
            </Box>

            {/* Explanation */}
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                mb={0.5}
              >
                {lang === "en" ? "Explanation" : "Aasaan Explanation"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.5 }}
              >
                {step.explanation}
              </Typography>
            </Box>

            <Divider />

            {/* Example */}
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                mb={0.75}
              >
                {lang === "en" ? "Real-Life Example" : "Real-Life Example"}
              </Typography>

              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.5 }}
                >
                  {step.example}
                </Typography>
              </Box>
            </Box>

            {/* Key Takeaway */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "flex-start",
                p: 1.25,
                borderRadius: 2,
                bgcolor: "action.selected",
              }}
            >
              <LightbulbOutlinedIcon
                color="primary"
                sx={{ fontSize: 18, mt: 0.15 }}
              />

              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  color="primary.main"
                  mb={0.25}
                >
                  {lang === "en" ? "Remember This" : "Yaad Rakho"}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.5,
                    fontWeight: 600,
                  }}
                >
                  {step.takeaway}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Previous / Next */}
      <Stack
        direction="row"
        justifyContent="space-between"
        mt={1.5}
        gap={1}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<ArrowBackRoundedIcon />}
          onClick={goBack}
          disabled={isFirst}
          sx={{
            px: 1.5,
            py: 0.5,
            minWidth: 0,
          }}
        >
          {lang === "en" ? "Previous" : "Previous"}
        </Button>

        <Button
          variant="contained"
          size="small"
          endIcon={<ArrowForwardRoundedIcon />}
          onClick={goNext}
          disabled={isLast}
          sx={{
            px: 1.5,
            py: 0.5,
            minWidth: 0,
          }}
        >
          {lang === "en" ? "Next" : "Next"}
        </Button>
      </Stack>
    </Box>
  );
};

export default DefaultGateway;