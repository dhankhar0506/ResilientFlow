import { useEffect, useState } from "react";

type Host = { id: string; name: string; icon: string; ip: string; mac: string; port: number; x: number; y: number };

const HOSTS: Host[] = [
  { id: "laptop", name: "Laptop", icon: "💻", ip: "192.168.1.10", mac: "AA:AA:AA:00:00:01", port: 1, x: 100, y: 65 },
  { id: "printer", name: "Printer", icon: "🖨️", ip: "192.168.1.20", mac: "BB:BB:BB:00:00:02", port: 2, x: 460, y: 65 },
  { id: "phone", name: "Phone", icon: "📱", ip: "192.168.1.30", mac: "CC:CC:CC:00:00:03", port: 3, x: 100, y: 295 },
  { id: "router", name: "Router (gateway)", icon: "📡", ip: "192.168.1.1", mac: "DD:DD:DD:00:00:04", port: 4, x: 460, y: 295 },
];
const BCAST = "FF:FF:FF:FF:FF:FF";
const NOBODY = "192.168.1.99";
const SW = { x: 280, y: 180 };

type Frame = { src: string; dst: string; kind: string; info: string };
type ArpSet = { host: string; ip: string; mac: string };
type Step = {
  title: string;
  text: string;
  frame?: Frame;
  from?: number; // ingress port
  out: number[]; // ports the switch sends the frame out of
  ignore: string[]; // host ids that drop the frame
  learn?: { mac: string; port: number };
  arp: ArpSet[];
  end?: "ok" | "fail";
};

type MacTable = Record<string, number>;
type ArpCaches = Record<string, Record<string, string>>;

function makePlan(src: Host, dstIp: string, mac: MacTable, arp: ArpCaches): Step[] {
  const dst = HOSTS.find((h) => h.ip === dstIp);
  const table: MacTable = { ...mac };
  const steps: Step[] = [];
  const others = (p: number) => HOSTS.filter((h) => h.port !== p).map((h) => h.port);
  const cached = arp[src.id]?.[dstIp];

  steps.push({
    title: "1. Does the sender already know the MAC?",
    text: cached
      ? `${src.name} finds ${dstIp} → ${cached} in its ARP cache (a cache HIT), so it skips ARP and builds the frame right away.`
      : `${src.name} wants to reach ${dstIp} on its own subnet. Ethernet delivers frames by MAC address, not IP, and the ARP cache has no entry for ${dstIp} (cache MISS). So it must ask the whole network.`,
    out: [], ignore: [], arp: [],
  });

  if (!cached) {
    const knew = table[src.mac] !== undefined;
    table[src.mac] = src.port;
    steps.push({
      title: "2. ARP Request is broadcast",
      text: `${src.name} sends an ARP request to the broadcast MAC ${BCAST}. The switch reads the SOURCE MAC and ${knew ? "refreshes" : "learns"} that ${src.mac} lives on port ${src.port}. Because the destination is a broadcast, the switch FLOODS the frame out of every other port. Everyone receives it, but only the owner of ${dstIp} answers.`,
      frame: { src: src.mac, dst: BCAST, kind: "ARP Request", info: `Who has ${dstIp}? Tell ${src.ip}` },
      from: src.port,
      out: others(src.port),
      ignore: HOSTS.filter((h) => h.id !== src.id && h.ip !== dstIp).map((h) => h.id),
      learn: { mac: src.mac, port: src.port },
      arp: dst ? [{ host: dst.id, ip: src.ip, mac: src.mac }] : [],
    });
    if (!dst) {
      steps.push({
        title: "3. No reply, so the ping fails",
        text: `Nobody owns ${dstIp}, so nobody answers. After a few retries the OS gives up: "Destination host unreachable". Note the switch still learned the sender's MAC.`,
        out: [], ignore: [], arp: [], end: "fail",
      });
      return steps;
    }
    table[dst.mac] = dst.port;
    steps.push({
      title: "3. ARP Reply is sent directly back",
      text: `${dst.name} owns ${dstIp}, so it replies with its MAC. This reply is UNICAST: it is addressed to ${src.mac}, which the switch already learned, so the frame goes out of port ${src.port} only. The switch also learns ${dst.mac} is on port ${dst.port}. ${src.name} saves the answer in its ARP cache.`,
      frame: { src: dst.mac, dst: src.mac, kind: "ARP Reply", info: `${dstIp} is at ${dst.mac}` },
      from: dst.port,
      out: [src.port],
      ignore: [],
      learn: { mac: dst.mac, port: dst.port },
      arp: [{ host: src.id, ip: dstIp, mac: dst.mac }],
    });
  }
  if (!dst) return steps;

  const known = table[dst.mac] !== undefined;
  const n = steps.length + 1;
  table[src.mac] = src.port;
  steps.push({
    title: `${n}. Real data frame (ping) is sent`,
    text: known
      ? `Now ${src.name} knows the MAC, so it sends the ICMP echo frame to ${dst.mac}. The switch finds that MAC in its table and forwards it out of port ${table[dst.mac]} ONLY. No flooding, which is the whole point of a switch.`
      : `${src.name} sends the frame to ${dst.mac}, but the switch has NO entry for that MAC (unknown unicast). It floods the frame to all other ports. Only ${dst.name}'s NIC accepts it. This is why an empty MAC table makes a switch behave like a hub.`,
    frame: { src: src.mac, dst: dst.mac, kind: "IPv4 · ICMP Echo", info: `${src.ip} → ${dst.ip} (ping)` },
    from: src.port,
    out: known ? [table[dst.mac]] : others(src.port),
    ignore: known ? [] : HOSTS.filter((h) => h.id !== src.id && h.id !== dst.id).map((h) => h.id),
    learn: { mac: src.mac, port: src.port },
    arp: [],
  });
  table[dst.mac] = dst.port;
  steps.push({
    title: `${n + 1}. Echo reply comes back`,
    text: `${dst.name} answers. The switch already knows ${src.mac} is on port ${src.port}, so it forwards the reply there only. Ping succeeded, and from now on both MACs are cached, so later pings skip ARP entirely (until the cache or MAC table times out).`,
    frame: { src: dst.mac, dst: src.mac, kind: "IPv4 · ICMP Echo Reply", info: `${dst.ip} → ${src.ip}` },
    from: dst.port,
    out: [src.port],
    ignore: [],
    learn: { mac: dst.mac, port: dst.port },
    arp: [],
    end: "ok",
  });
  return steps;
}

export default function ArpLesson() {
  const [srcId, setSrcId] = useState("laptop");
  const [dstIp, setDstIp] = useState("192.168.1.1");
  const [macTable, setMacTable] = useState<MacTable>({});
  const [arp, setArp] = useState<ArpCaches>({});
  const [plan, setPlan] = useState<Step[]>([]);
  const [idx, setIdx] = useState(0);
  const [lastLearn, setLastLearn] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const src = HOSTS.find((h) => h.id === srcId)!;
  const inProgress = plan.length > 0 && idx < plan.length;
  const cur = idx > 0 ? plan[idx - 1] : undefined;

  const next = () => {
    const s = plan[idx];
    if (!s) return;
    const learn = s.learn;
    if (learn) {
      setMacTable((t) => ({ ...t, [learn.mac]: learn.port }));
      setLastLearn(learn.mac);
    }
    if (s.arp.length) {
      setArp((a) => {
        const copy: ArpCaches = { ...a };
        for (const e of s.arp) copy[e.host] = { ...(copy[e.host] ?? {}), [e.ip]: e.mac };
        return copy;
      });
    }
    setIdx(idx + 1);
  };

  const send = () => {
    const p = makePlan(src, dstIp, macTable, arp);
    setPlan(p);
    setLastLearn(null);
    setIdx(1); // step 1 has no side effects
  };

  useEffect(() => {
    if (!playing) return;
    if (!inProgress) { setPlaying(false); return; }
    const t = setTimeout(next, 2400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, idx, plan]);

  const resetAll = () => { setMacTable({}); setArp({}); setPlan([]); setIdx(0); setLastLearn(null); setPlaying(false); };
  const hostByMac = (m: string) => HOSTS.find((h) => h.mac === m)?.name ?? "?";
  const srcCache = Object.entries(arp[srcId] ?? {});

  return (
    <div>
      <div className="row" style={{ gap: 12, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <label className="inline">From:
          <select className="inp" style={{ minWidth: 0 }} value={srcId} disabled={inProgress}
            onChange={(e) => { setSrcId(e.target.value); setPlan([]); setIdx(0); if (HOSTS.find((h) => h.id === e.target.value)?.ip === dstIp) setDstIp(NOBODY); }}>
            {HOSTS.map((h) => <option key={h.id} value={h.id}>{h.icon} {h.name} ({h.ip})</option>)}
          </select>
        </label>
        <label className="inline">Ping:
          <select className="inp" style={{ minWidth: 0 }} value={dstIp} disabled={inProgress}
            onChange={(e) => { setDstIp(e.target.value); setPlan([]); setIdx(0); }}>
            {HOSTS.filter((h) => h.id !== srcId).map((h) => <option key={h.id} value={h.ip}>{h.icon} {h.ip}</option>)}
            <option value={NOBODY}>❓ {NOBODY} (nobody)</option>
          </select>
        </label>
        <button className="btn primary sm" disabled={inProgress} onClick={send}>📨 Send ping</button>
        <button className="btn ghost sm" disabled={!inProgress} onClick={next}>Next step ▶</button>
        <button className="btn ghost sm" disabled={!inProgress || playing} onClick={() => setPlaying(true)}>▶ Auto-play</button>
        <button className="btn ghost sm" disabled={inProgress} onClick={() => setArp({})}>Clear ARP cache</button>
        <button className="btn ghost sm" disabled={inProgress} onClick={() => setMacTable({})}>Clear MAC table</button>
        <button className="btn ghost sm" onClick={resetAll}>Reset all</button>
      </div>

      <div className="arp-wrap">
        <div>
          <svg viewBox="0 0 560 360" className="topo">
            {HOSTS.map((h) => {
              const ingress = cur?.from === h.port;
              const egress = cur?.out.includes(h.port);
              const color = ingress ? "#f59e0b" : egress ? "#16a34a" : "#cbd5e1";
              const mx = (h.x + SW.x) / 2;
              const my = (h.y + SW.y) / 2;
              return (
                <g key={h.id}>
                  <line x1={h.x} y1={h.y} x2={SW.x} y2={SW.y} stroke={color} strokeWidth={ingress || egress ? 5 : 3}
                    strokeDasharray={egress && !ingress ? "8 5" : undefined} />
                  <text x={mx} y={my - 6} textAnchor="middle" fontSize="11" fill="#64748b">Port {h.port}</text>
                </g>
              );
            })}
            <rect x={SW.x - 65} y={SW.y - 32} width="130" height="64" rx="12" fill="#0f172a" />
            <text x={SW.x} y={SW.y - 4} textAnchor="middle" fontSize="15" fill="#fff" fontWeight="700">🔀 Switch</text>
            <text x={SW.x} y={SW.y + 16} textAnchor="middle" fontSize="11" fill="#94a3b8">Layer 2</text>
            {HOSTS.map((h) => {
              const isSrc = h.id === srcId;
              const ignores = cur?.ignore.includes(h.id);
              const gets = cur?.out.includes(h.port) && !ignores;
              const stroke = ignores ? "#ef4444" : gets ? "#16a34a" : isSrc ? "#3454d1" : "#cbd5e1";
              return (
                <g key={h.id} opacity={ignores ? 0.75 : 1}>
                  <rect x={h.x - 88} y={h.y - 34} width="176" height="68" rx="12" fill="#fff" stroke={stroke} strokeWidth={ignores || gets || isSrc ? 3 : 2} />
                  <text x={h.x} y={h.y - 12} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">{h.icon} {h.name}</text>
                  <text x={h.x} y={h.y + 4} textAnchor="middle" fontSize="11" fill="#0369a1" fontFamily="monospace">{h.ip}</text>
                  <text x={h.x} y={h.y + 20} textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">{h.mac}</text>
                  {ignores && <text x={h.x} y={h.y + 50} textAnchor="middle" fontSize="11" fill="#dc2626" fontWeight="700">✖ not for me, drops it</text>}
                  {gets && <text x={h.x} y={h.y + 50} textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="700">✔ receives frame</text>}
                  {isSrc && !gets && !ignores && <text x={h.x} y={h.y + 50} textAnchor="middle" fontSize="11" fill="#0369a1" fontWeight="700">sender</text>}
                </g>
              );
            })}
          </svg>

          <div className="detail" style={{ borderTopColor: cur?.end === "fail" ? "#ef4444" : cur?.end === "ok" ? "#16a34a" : "#3454d1" }}>
            {cur ? (
              <>
                <small className="hint">Step {idx} / {plan.length}</small>
                <h2>{cur.title}</h2>
                <p>{cur.text}</p>
                {cur.frame && (
                  <div className="packet" style={{ marginTop: 8 }}>
                    <span className="blk" style={{ background: "#b45309" }}>Dst MAC: {cur.frame.dst === BCAST ? "FF:FF:… (broadcast)" : cur.frame.dst}</span>
                    <span className="blk" style={{ background: "#3454d1" }}>Src MAC: {cur.frame.src}</span>
                    <span className="blk" style={{ background: "#6366f1" }}>{cur.frame.kind}</span>
                    <span className="blk payload">{cur.frame.info}</span>
                  </div>
                )}
              </>
            ) : (
              <p className="hint">Choose who pings whom and press <b>Send ping</b>. Both tables on the right start empty. Watch them fill up. Try the same ping twice, then clear only the ARP cache or only the MAC table and see what changes.</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="sub" style={{ marginTop: 0 }}>🔀 Switch MAC address table</h4>
          <table className="trace">
            <thead><tr><th>MAC</th><th>Port</th><th>Device</th></tr></thead>
            <tbody>
              {Object.entries(macTable).length === 0 && <tr><td colSpan={3} className="hint">empty. The switch knows nothing yet</td></tr>}
              {Object.entries(macTable).map(([m, p]) => (
                <tr key={m} className={m === lastLearn ? "new-row" : ""}>
                  <td className="mono">{m}</td><td>{p}</td><td>{hostByMac(m)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="sub">{src.icon} ARP cache of {src.name}</h4>
          <table className="trace">
            <thead><tr><th>IP</th><th>MAC</th></tr></thead>
            <tbody>
              {srcCache.length === 0 && <tr><td colSpan={2} className="hint">empty</td></tr>}
              {srcCache.map(([ip, m]) => (
                <tr key={ip}><td className="mono">{ip}</td><td className="mono">{m}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="detail" style={{ marginTop: 16, borderTopColor: "#f59e0b" }}>
        <b>Key takeaways</b>
        <ul className="takeaways">
          <li><b>IP is for the destination, MAC is for the next hop.</b> On one LAN, ARP maps IP → MAC.</li>
          <li><b>ARP request = broadcast, ARP reply = unicast.</b></li>
          <li><b>A switch learns from the SOURCE MAC</b> of every frame, and <b>forwards using the DESTINATION MAC</b>. Unknown or broadcast destinations get flooded.</li>
          <li>To reach a host on another network (like the internet), the laptop ARPs for the <b>router's</b> MAC, not the far-away server's.</li>
        </ul>
      </div>
    </div>
  );
}
