import { Box, Chip, Stack, Typography } from "@mui/material";

import type { Lang } from "../../../i18n";
import { DHCP_LABELS, DHCP_STEPS, type DhcpNode, type DhcpStep } from "../data/DHCP";
import {
  CardGrid,
  Diagram,
  KeyValueList,
  LessonFrame,
  MiniTable,
  StepTextCard,
  SvgLink,
  SvgNode,
  SvgPacket,
  SvgZone,
  VisualPanel,
  lerp,
  useDiagramColors,
  useStepper,
} from "../../../shared/lessonParts";
import { MONO, labelSx, nodeSx } from "../../../shared/lessonKit";

type Labels = (typeof DHCP_LABELS)[Lang];

const POS: Record<DhcpNode, [number, number]> = {
  laptop: [115, 160],
  switch: [340, 160],
  server: [590, 85],
  phone: [590, 235],
};

function DhcpDiagram({ step, l }: { step: DhcpStep; l: Labels }) {
  const c = useDiagramColors();
  const on = (n: DhcpNode) => step.active.includes(n);
  const linkOn = (a: DhcpNode, b: DhcpNode) => on(a) && on(b) && step.packets.some((p) => p.at.includes(a) && p.at.includes(b));
  const ip = step.config.ip ?? "0.0.0.0";

  return (
    <Diagram width={760} height={300} label={`${l.laptop} → ${l.switch} → ${l.server}`}>
      <SvgZone x={10} y={12} w={740} h={276} label={l.lan} c={c} />

      <SvgLink a={POS.laptop} b={POS.switch} active={linkOn("laptop", "switch") || step.packets.length > 0} c={c} />
      <SvgLink a={POS.switch} b={POS.server} active={linkOn("switch", "server")} c={c} />
      <SvgLink a={POS.switch} b={POS.phone} active={linkOn("switch", "phone")} color={linkOn("switch", "phone") ? c.warn : undefined} c={c} />

      <SvgNode
        x={POS.laptop[0]}
        y={POS.laptop[1]}
        w={150}
        h={78}
        icon="💻"
        title={l.laptop}
        lines={[
          { text: ip, mono: true, color: ip === "0.0.0.0" ? c.warn : c.success },
          { text: "a4:5e:60:11:22:33", mono: false },
        ]}
        active={on("laptop")}
        c={c}
      />
      <SvgNode x={POS.switch[0]} y={POS.switch[1]} w={110} h={56} icon="🔀" title={l.switch} active={on("switch")} c={c} />
      <SvgNode
        x={POS.server[0]}
        y={POS.server[1]}
        w={190}
        h={78}
        icon="📡"
        title={l.server}
        lines={[{ text: "192.168.1.1", mono: true }, { text: "pool .2 – .254 · UDP :67" }]}
        active={on("server")}
        c={c}
      />
      <SvgNode
        x={POS.phone[0]}
        y={POS.phone[1]}
        w={150}
        h={62}
        icon="📱"
        title={l.phone}
        lines={[{ text: "192.168.1.20", mono: true }]}
        active={on("phone")}
        dim={!on("phone")}
        c={c}
      />

      {["a", "b"].map((id) => {
        const p = step.packets.find((x) => x.id === id);
        const at = p ? lerp(POS[p.at[0]], POS[p.at[1]], p.at[2]) : POS.switch;
        return (
          <SvgPacket
            key={id}
            at={at}
            visible={!!p}
            emoji={p?.broadcast ? "📢" : "✉️"}
            label={p ? (p.ignored ? `${p.label} · ${l.ignored}` : p.label) : undefined}
            color={p?.ignored ? c.muted : p?.broadcast ? c.warn : c.primary}
            c={c}
          />
        );
      })}
    </Diagram>
  );
}

export default function DHCP({ lang }: { lang: Lang }) {
  const { stepIndex, goTo } = useStepper(DHCP_STEPS.length);
  const l = DHCP_LABELS[lang];
  const step = DHCP_STEPS[stepIndex];
  const content = step[lang];

  const visual = (
    <VisualPanel>
      {step.scene === "cards" ? (
        <>
          {step.id === "what" && (
            <Stack direction="row" gap={0.8} justifyContent="center" flexWrap="wrap" sx={{ py: 1 }}>
              {["D · Discover", "O · Offer", "R · Request", "A · Ack"].map((s) => (
                <Chip key={s} label={s} color="primary" variant="outlined" sx={{ fontWeight: 800 }} />
              ))}
            </Stack>
          )}
          {content.cards && <CardGrid cards={content.cards} />}
        </>
      ) : (
        <>
          <DhcpDiagram step={step} l={l} />

          {step.fields && (
            <Box>
              <Typography sx={{ ...labelSx, display: "block", mb: 0.8 }}>{l.packet}</Typography>
              <Box sx={{ ...nodeSx("primary.main", "action.selected"), textAlign: "left", p: 1.25 }}>
                <Typography variant="body1" sx={{ fontFamily: MONO, fontWeight: 800, color: "primary.main", mb: 0.6 }}>
                  {step.fields.type}
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 0.6 }}>
                  {(
                    [
                      [l.srcMac, step.fields.srcMac],
                      [l.dstMac, step.fields.dstMac],
                      [l.src, step.fields.src],
                      [l.dst, step.fields.dst],
                    ] as const
                  ).map(([k, v]) => (
                    <Box key={k}>
                      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block" }}>
                        {k}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: MONO, fontWeight: 700, overflowWrap: "anywhere" }}>
                        {v}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Typography variant="body2" sx={{ mt: 0.8 }}>
                  <b>{l.inside}:</b> {step.fields.inside}
                </Typography>
              </Box>
            </Box>
          )}

          <KeyValueList
            title={l.config}
            items={[
              { k: l.ip, v: step.config.ip, hot: step.configHot },
              { k: l.mask, v: step.config.mask, hot: step.configHot },
              { k: l.gateway, v: step.config.gateway, hot: step.configHot },
              { k: l.dns, v: step.config.dns, hot: step.configHot },
              { k: l.lease, v: step.config.lease, hot: step.configHot || step.id === "renew" },
            ]}
          />

          <MiniTable
            title={l.leases}
            hint={l.leasesHint}
            columns={[l.colIp, l.colMac, l.colDevice, l.colLease]}
            rows={step.leases}
            emptyText={l.empty}
            minWidth={520}
            rowTone={(i) => (step.leaseHot?.includes(i) ? "active" : "normal")}
          />
        </>
      )}
    </VisualPanel>
  );

  return (
    <LessonFrame
      lang={lang}
      eyebrow={l.lessonTitle}
      title={l.heroTitle}
      subtitle={l.heroSubtitle}
      stepIndex={stepIndex}
      total={DHCP_STEPS.length}
      goTo={goTo}
      stepTitle={(i) => DHCP_STEPS[i][lang].title}
      visual={visual}
    >
      <StepTextCard lang={lang} stepIndex={stepIndex} phase={step.phase} content={content} terminal={step.terminal} />
    </LessonFrame>
  );
}
