import { useMemo, useState } from "react";

type Msg = { from: "C" | "S"; label: string; detail: string; phase: "TCP" | "TLS" | "HTTP" | "CLOSE"; lost?: boolean };

const PHASE_COLOR = { TCP: "#3454d1", TLS: "#6366f1", HTTP: "#16a34a", CLOSE: "#ef4444" } as const;

function build(loss: boolean): Msg[] {
  const synAck: Msg = { from: "S", label: "SYN-ACK  (seq=y, ack=x+1)", phase: "TCP", detail: "Server agrees, sends its own initial sequence number, and acknowledges the client's." };
  return [
    { from: "C", label: "SYN  (seq=x)", phase: "TCP", detail: "Client asks to open a connection and announces its starting sequence number." },
    ...(loss
      ? [
          { ...synAck, label: "SYN-ACK ✖ lost in network", lost: true, detail: "The packet is dropped by a congested router." } as Msg,
          { from: "C", label: "⏱ timeout → retransmit SYN", phase: "TCP", detail: "TCP has no reply, so after a timeout (RTO) it retransmits. This is TCP reliability in action." } as Msg,
        ]
      : []),
    synAck,
    { from: "C", label: "ACK  (ack=y+1)", phase: "TCP", detail: "Handshake complete. Both sides know each other's sequence numbers. The connection is ESTABLISHED." },
    { from: "C", label: "ClientHello", phase: "TLS", detail: "Client lists supported TLS versions, cipher suites and sends a key share." },
    { from: "S", label: "ServerHello + Certificate + Finished", phase: "TLS", detail: "Server picks the cipher, proves its identity with a certificate and finishes its part of the key exchange." },
    { from: "C", label: "Finished  🔒", phase: "TLS", detail: "Client verifies the certificate. From now on everything is encrypted with a shared session key." },
    { from: "C", label: "HTTP  GET /index.html", phase: "HTTP", detail: "The actual request, encrypted inside TLS, carried inside TCP segments." },
    { from: "S", label: "HTTP  200 OK  + HTML", phase: "HTTP", detail: "Server responds with the page. Large responses are split into many TCP segments." },
    { from: "C", label: "FIN", phase: "CLOSE", detail: "Client says it has no more data to send." },
    { from: "S", label: "ACK", phase: "CLOSE", detail: "Server acknowledges the FIN." },
    { from: "S", label: "FIN", phase: "CLOSE", detail: "Server is also done." },
    { from: "C", label: "ACK", phase: "CLOSE", detail: "Connection closed cleanly (4-way close)." },
  ];
}

export default function TcpHandshake() {
  const [loss, setLoss] = useState(false);
  const [n, setN] = useState(0);
  const msgs = useMemo(() => build(loss), [loss]);
  const cur = msgs[Math.min(n, msgs.length) - 1];

  return (
    <div>
      <div className="row" style={{ gap: 12, marginBottom: 12, alignItems: "center" }}>
        <button className="btn primary sm" disabled={n >= msgs.length} onClick={() => setN((x) => x + 1)}>Next packet ▶</button>
        <button className="btn ghost sm" onClick={() => setN(0)}>Reset</button>
        <label className="toggle" style={{ margin: 0 }}>
          <input type="checkbox" checked={loss} onChange={(e) => { setLoss(e.target.checked); setN(0); }} /> Simulate packet loss
        </label>
        <span className="legend">
          {(Object.keys(PHASE_COLOR) as (keyof typeof PHASE_COLOR)[]).map((p) => (
            <span key={p}><i style={{ background: PHASE_COLOR[p] }} />{p}</span>
          ))}
        </span>
      </div>

      <div className="seq">
        <div className="seq-head"><span>💻 Client</span><span>🖥️ Server</span></div>
        {msgs.slice(0, n).map((m, i) => (
          <div key={i} className={`seq-row ${m.from === "C" ? "r" : "l"} ${m.lost ? "lost" : ""}`}>
            <div className="seq-arrow" style={{ color: PHASE_COLOR[m.phase] }}>
              <span className="seq-label" style={{ background: PHASE_COLOR[m.phase] }}>{m.label}</span>
              <div className="seq-line" style={{ borderColor: PHASE_COLOR[m.phase] }} />
            </div>
          </div>
        ))}
      </div>

      {cur ? (
        <div className="detail" style={{ borderTopColor: PHASE_COLOR[cur.phase] }}>
          <small className="hint">{cur.phase} · packet {n} / {msgs.length}</small>
          <p>{cur.detail}</p>
        </div>
      ) : (
        <p className="hint">Press “Next packet” to watch how a browser opens a connection and loads a page: TCP → TLS → HTTP → close.</p>
      )}
    </div>
  );
}
