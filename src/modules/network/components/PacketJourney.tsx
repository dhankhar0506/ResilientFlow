import { useEffect, useMemo, useState } from "react";
import { OSI } from "../data/osi";

type Step = { phase: "send" | "wire" | "recv"; layer: number; title: string; text: string };

const toBits = (s: string) =>
  s.slice(0, 4).split("").map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ") + (s.length > 4 ? " …" : "");

export default function PacketJourney() {
  const [msg, setMsg] = useState("Hello");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const steps: Step[] = useMemo(
    () => [
      ...OSI.map((l) => ({ phase: "send" as const, layer: l.n, title: `Host A · Layer ${l.n} (${l.name})`, text: l.encap })),
      {
        phase: "wire" as const, layer: 1, title: "Across the network",
        text: "The signal crosses switches and routers. Each router removes the old Layer-2 frame, reads the Layer-3 IP header to choose the next hop, then builds a NEW frame with new MAC addresses. The IP packet inside stays the same.",
      },
      ...[...OSI].reverse().map((l) => ({ phase: "recv" as const, layer: l.n, title: `Host B · Layer ${l.n} (${l.name})`, text: l.decap })),
    ],
    []
  );
  const last = steps.length - 1;
  const cur = steps[step];

  useEffect(() => {
    if (!playing) return;
    if (step >= last) { setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1800);
    return () => clearTimeout(t);
  }, [playing, step, last]);

  const present = OSI.filter((l) => {
    if (!l.header) return false;
    if (cur.phase === "wire") return true;
    if (cur.phase === "send") return l.n >= cur.layer;
    return cur.layer === 1 ? true : l.n > cur.layer;
  }).sort((a, b) => a.n - b.n);
  const showBits = cur.phase === "wire" || (cur.phase === "send" && cur.layer === 1);
  const hasFrame = present.some((l) => l.n === 2);
  const delivered = cur.phase === "recv" && cur.layer === 7;
  const hostA = cur.phase === "send";
  const hostB = cur.phase === "recv";

  return (
    <div>
      <div className="row" style={{ gap: 12, marginBottom: 12 }}>
        <label className="inline">Message:
          <input className="inp" value={msg} onChange={(e) => setMsg(e.target.value || " ")} maxLength={24} />
        </label>
        <button className="btn ghost sm" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>◀ Back</button>
        <button className="btn primary sm" disabled={step === last} onClick={() => setStep((s) => s + 1)}>Next ▶</button>
        <button className="btn ghost sm" onClick={() => { setStep(0); setPlaying(true); }}>▶ Auto-play</button>
        <button className="btn ghost sm" onClick={() => { setPlaying(false); setStep(0); }}>Reset</button>
      </div>

      <div className="hops">
        <div className={`host ${hostA ? "hot" : ""}`}>💻 Host A<small>Sender</small></div>
        <div className="wire"><div className="hop-line" /><span>{cur.phase === "wire" ? "📡 signal in transit" : ""}</span></div>
        <div className={`host ${cur.phase === "wire" ? "hot" : ""}`}>🔀 Routers<small>L1–L3</small></div>
        <div className="wire"><div className="hop-line" /></div>
        <div className={`host ${hostB ? "hot" : ""}`}>🖥️ Host B<small>Receiver</small></div>
      </div>

      <div className="lgrid" style={{ marginTop: 16 }}>
        <div>
          {OSI.map((l) => (
            <div key={l.n} className={`stack-row ${(cur.phase !== "wire" && cur.layer === l.n) ? "on" : ""}`}
              style={{ borderLeftColor: l.color }}>
              <b>L{l.n}</b> {l.name}
              <small>{l.header ? `+ ${l.header}` : "bits"}</small>
            </div>
          ))}
        </div>
        <div>
          <div className="detail" style={{ borderTopColor: cur.phase === "wire" ? "#64748b" : OSI.find((l) => l.n === cur.layer)!.color }}>
            <small className="hint">Step {step + 1} / {steps.length}</small>
            <h2>{cur.title}</h2>
            <p>{cur.text}</p>
          </div>

          <h4 className="sub">What the packet looks like right now</h4>
          {showBits ? (
            <div className="bits">{toBits(msg)}<small> ← the payload, as bits on the wire</small></div>
          ) : (
            <div className="packet">
              {present.map((l) => (
                <span key={l.n} className="blk" style={{ background: l.color }} title={`Layer ${l.n} header`}>{l.header}</span>
              ))}
              <span className="blk payload">{delivered ? `✅ "${msg}"` : `"${msg}"`}</span>
              {hasFrame && <span className="blk" style={{ background: "#b45309" }} title="Ethernet trailer">FCS</span>}
            </div>
          )}
          <p className="hint">Each colored block is a header added (sender ↓) or removed (receiver ↑) by that layer. This is <b>encapsulation</b> and <b>de-encapsulation</b>.</p>
        </div>
      </div>
    </div>
  );
}
