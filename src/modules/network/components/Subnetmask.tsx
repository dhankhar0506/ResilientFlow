import { useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { UI, type Lang } from "../../../i18n";
import { SUBNET_LABELS, SUBNET_STEPS, type DeviceRoute } from "../data/SubnetMask";
import {
  LessonBody,
  LessonHeader,
  LessonPage,
  LessonStatus,
  MONO,
  Panel,
  RADIUS,
  StepBar,
  StepCard,
  StepNav,
  labelSx,
  nodeSx,
} from "../../../shared/lessonKit";

const parseIp = (ip: string) => ip.split(".").map(Number);
const toBits = (n: number) => n.toString(2).padStart(8, "0");
const applyMask = (ip: number[], mask: number[]) => ip.map((o, i) => o & mask[i]);
const countOnes = (mask: number[]) => mask.reduce((sum, o) => sum + toBits(o).split("1").length - 1, 0);

const ROUTE_COLOR: Record<DeviceRoute, string> = {
  self: "primary.main",
  direct: "success.main",
  router: "warning.main",
};

function BinaryRow({ label, octets, maskOctets }: { label: string; octets: number[]; maskOctets: number[] }) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Typography variant="body2" sx={{ fontWeight: 800, color: "text.secondary", minWidth: 58 }}>
        {label}
      </Typography>

      <Stack direction="row" alignItems="center" gap={0.6}>
        {octets.map((octet, i) => {
          const mBits = toBits(maskOctets[i]);
          return (
            <Stack direction="row" alignItems="center" key={i} gap={0.6}>
              <Box sx={{ ...nodeSx(), minWidth: 74, py: 0.7, bgcolor: "action.selected" }}>
                <Typography variant="h3" sx={{ fontFamily: MONO }}>
                  {octet}
                </Typography>
                <Typography component="div" variant="caption" sx={{ fontFamily: MONO }}>
                  {toBits(octet)
                    .split("")
                    .map((bit, j) => (
                      <Box key={j} component="span" sx={{ color: mBits[j] === "1" ? "primary.main" : "secondary.main" }}>
                        {bit}
                      </Box>
                    ))}
                </Typography>
              </Box>

              {i < octets.length - 1 && (
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  .
                </Typography>
              )}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default function SubnetMask({ lang }: { lang: Lang }) {
  const [stepIndex, setStepIndex] = useState(0);

  const t = UI[lang];
  const l = SUBNET_LABELS[lang];
  const step = SUBNET_STEPS[stepIndex];
  const content = step[lang];
  const last = SUBNET_STEPS.length - 1;
  const goTo = (i: number) => setStepIndex(Math.min(last, Math.max(0, i)));

  const maskOctets = step.mask ? parseIp(step.mask) : null;
  const maskOnes = maskOctets ? countOnes(maskOctets) : 0;
  const subjectOctets = step.subject ? parseIp(step.subject.ip) : null;
  const resultOctets = subjectOctets && maskOctets ? applyMask(subjectOctets, maskOctets) : null;
  const ownNetworkOctets =
    step.compareOwnIp && maskOctets ? applyMask(parseIp(step.compareOwnIp), maskOctets) : null;
  const sameNetwork =
    resultOctets && ownNetworkOctets ? resultOctets.join(".") === ownNetworkOctets.join(".") : null;

  const routeLabel: Record<DeviceRoute, string> = {
    self: l.routeSelf,
    direct: l.routeDirect,
    router: l.routeRouter,
  };

  return (
    <LessonPage>
      <LessonHeader eyebrow={l.lessonTitle} title={l.heroTitle} subtitle={l.heroSubtitle} />
      <LessonStatus availableLabel={t.available} right={`${t.stepLabel} ${stepIndex + 1} ${t.of} ${SUBNET_STEPS.length}`} />
      <StepBar total={SUBNET_STEPS.length} index={stepIndex} onSelect={goTo} label={(i) => `${t.stepLabel} ${i + 1}`} />

      <LessonBody
        visual={
      <Panel>
        <Typography sx={{ ...labelSx, mb: 1, display: "block" }}>{step.caption}</Typography>

        {/* Devices */}
        {step.devices && (
          <Box sx={{ mb: maskOctets ? 1.6 : 0 }}>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.8 }}>
              {l.devices}
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={0.8}>
              {step.devices.map((device) => {
                const color = device.route ? ROUTE_COLOR[device.route] : "primary.main";
                return (
                  <Box key={`${device.name}-${device.ip}`} sx={{ ...nodeSx(color, "action.selected"), minWidth: 104 }}>
                    <Typography variant="h3" sx={{ lineHeight: 1.2 }}>
                      {device.icon}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      {device.name}
                    </Typography>
                    <Typography variant="caption" sx={{ fontFamily: MONO, color }}>
                      {device.ip}
                    </Typography>
                    {device.route && (
                      <Typography variant="caption" sx={{ fontWeight: 800, color, display: "block" }}>
                        {routeLabel[device.route]}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        )}

        {/* Binary calculation */}
        {maskOctets && (
          <Box sx={{ overflowX: "auto", pb: 0.5 }}>
            <Stack spacing={0.8} sx={{ minWidth: "max-content" }}>
              {resultOctets && subjectOctets && step.subject ? (
                <>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {step.subject.label}
                  </Typography>
                  <BinaryRow label={l.ip} octets={subjectOctets} maskOctets={maskOctets} />
                  <BinaryRow label={l.mask} octets={maskOctets} maskOctets={maskOctets} />
                  <Box sx={{ borderTop: "1.5px dashed", borderColor: "divider", ml: 7.5, pt: 0.4 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
                      AND
                    </Typography>
                  </Box>
                  <BinaryRow label={l.result} octets={resultOctets} maskOctets={maskOctets} />
                </>
              ) : (
                <BinaryRow label={l.mask} octets={maskOctets} maskOctets={maskOctets} />
              )}
            </Stack>
          </Box>
        )}

        {/* Network / host bits */}
        {maskOctets && (
          <Box sx={{ mt: 1.4 }}>
            <Stack direction="row" flexWrap="wrap" gap={0.8} sx={{ mb: 0.8 }}>
              <Chip label={l.networkBits} size="small" sx={{ bgcolor: "action.selected", color: "primary.main", fontWeight: 800 }} />
              <Chip label={l.hostBits} size="small" sx={{ bgcolor: "action.selected", color: "secondary.main", fontWeight: 800 }} />
              <Chip label={`/${maskOnes} · ${maskOnes} ${l.maskBits}`} size="small" sx={{ bgcolor: "action.selected", color: "text.secondary", fontWeight: 800 }} />
            </Stack>
            {resultOctets && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {l.andRule}
              </Typography>
            )}
          </Box>
        )}

        {/* Network comparison */}
        {resultOctets && ownNetworkOctets && sameNetwork !== null && (
          <Box sx={{ mt: 1.4 }}>
            <Stack direction="row" flexWrap="wrap" gap={2} sx={{ mb: 0.8 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {l.ownNetwork}: <strong style={{ fontFamily: MONO }}>{ownNetworkOctets.join(".")}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {l.targetNetwork}: <strong style={{ fontFamily: MONO }}>{resultOctets.join(".")}</strong>
              </Typography>
            </Stack>
            <Chip
              label={sameNetwork ? l.sameNetwork : l.differentNetwork}
              size="small"
              sx={{ bgcolor: sameNetwork ? "success.main" : "warning.main", color: sameNetwork ? "success.contrastText" : "warning.contrastText", fontWeight: 800, borderRadius: `${RADIUS.inner}` }}
            />
          </Box>
        )}
      </Panel>

        }
      >
      <StepCard stepText={`${t.stepLabel} ${stepIndex + 1}`} badge={step.phase} title={content.title}>
        <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
          {content.detail}
        </Typography>
      </StepCard>
      </LessonBody>

      <StepNav
        index={stepIndex}
        last={last}
        onPrev={() => goTo(stepIndex - 1)}
        onNext={() => goTo(stepIndex + 1)}
        onRestart={() => goTo(0)}
        labels={t}
      />
    </LessonPage>
  );
}
