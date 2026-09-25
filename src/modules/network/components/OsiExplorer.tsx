import { useState } from "react";
import { OSI, tcpipGroup } from "../data/osi";

export default function OsiExplorer() {
  const [sel, setSel] = useState(7);
  const [tcpip, setTcpip] = useState(false);
  const layer = OSI.find((l) => l.n === sel)!;

  return (
    <div className="lgrid">
      <div>
        <label className="toggle">
          <input type="checkbox" checked={tcpip} onChange={(e) => setTcpip(e.target.checked)} /> Compare with TCP/IP model
        </label>
        {OSI.map((l) => (
          <button
            key={l.n}
            className={`osi-row ${sel === l.n ? "on" : ""}`}
            style={{ borderLeftColor: l.color, background: sel === l.n ? l.color + "22" : undefined }}
            onClick={() => setSel(l.n)}
          >
            <span className="osi-n" style={{ background: l.color }}>{l.n}</span>
            <span className="osi-name">{l.name}</span>
            <span className="osi-pdu">{l.pdu.split(" ")[0]}</span>
            {tcpip && <span className="tcpip-tag">{tcpipGroup(l.n)}</span>}
          </button>
        ))}
        <p className="hint">Mnemonic (7→1): <b>A</b>ll <b>P</b>eople <b>S</b>eem <b>T</b>o <b>N</b>eed <b>D</b>ata <b>P</b>rocessing</p>
      </div>

      <div className="detail" style={{ borderTopColor: layer.color }}>
        <h2>Layer {layer.n}: {layer.name}</h2>
        <p>{layer.job}</p>
        <dl>
          <dt>Data unit (PDU)</dt><dd>{layer.pdu}</dd>
          <dt>Protocols</dt><dd>{layer.protocols.map((p) => <span key={p} className="pill">{p}</span>)}</dd>
          <dt>Devices</dt><dd>{layer.devices}</dd>
          <dt>Real example</dt><dd>{layer.example}</dd>
          <dt>TCP/IP model</dt><dd>{tcpipGroup(layer.n)} layer</dd>
        </dl>
      </div>
    </div>
  );
}
