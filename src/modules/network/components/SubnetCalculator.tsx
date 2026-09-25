import { useMemo, useState } from "react";

const toInt = (parts: number[]) => parts.reduce((a, p) => a * 256 + p, 0);
const toIp = (n: number) => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
const bin = (n: number) => (n >>> 0).toString(2).padStart(32, "0");

function calc(input: string) {
  const m = input.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
  if (!m) return null;
  const oct = m.slice(1, 5).map(Number);
  const prefix = Number(m[5]);
  if (oct.some((o) => o > 255) || prefix > 32) return null;
  const ip = toInt(oct);
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const network = (ip & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = 2 ** (32 - prefix);
  const usable = prefix >= 31 ? total : total - 2;
  const first = prefix >= 31 ? network : network + 1;
  const lastHost = prefix >= 31 ? broadcast : broadcast - 1;
  const first8 = oct[0];
  const isPrivate = first8 === 10 || (first8 === 172 && oct[1] >= 16 && oct[1] <= 31) || (first8 === 192 && oct[1] === 168);
  return { ip, prefix, mask, network, broadcast, usable, first, lastHost, wildcard: (~mask) >>> 0, isPrivate };
}

const Bits = ({ n, prefix }: { n: number; prefix: number }) => (
  <span className="mono">
    {bin(n).split("").map((b, i) => (
      <span key={i} className={i < prefix ? "bn" : "bh"} style={{ marginRight: i % 8 === 7 ? 8 : 0 }}>{b}</span>
    ))}
  </span>
);

export default function SubnetCalculator() {
  const [cidr, setCidr] = useState("192.168.1.10/24");
  const r = useMemo(() => calc(cidr), [cidr]);

  return (
    <div>
      <label className="inline">IP / CIDR:
        <input className="inp" value={cidr} onChange={(e) => setCidr(e.target.value)} placeholder="192.168.1.10/24" />
      </label>
      <p className="hint">The <b>/N</b> says how many leading bits identify the <span className="bn">network</span>; the rest are <span className="bh">host</span> bits.</p>
      {!r ? (
        <p className="w-error">Enter something like 192.168.1.10/24</p>
      ) : (
        <>
          <div className="bitrow"><small>IP</small><Bits n={r.ip} prefix={r.prefix} /></div>
          <div className="bitrow"><small>Mask</small><Bits n={r.mask} prefix={r.prefix} /></div>
          <table className="trace calc">
            <tbody>
              <tr><td>Subnet mask</td><td className="mono">{toIp(r.mask)}</td></tr>
              <tr><td>Wildcard mask</td><td className="mono">{toIp(r.wildcard)}</td></tr>
              <tr><td>Network address</td><td className="mono">{toIp(r.network)}</td></tr>
              <tr><td>Broadcast address</td><td className="mono">{toIp(r.broadcast)}</td></tr>
              <tr><td>Usable host range</td><td className="mono">{toIp(r.first)} – {toIp(r.lastHost)}</td></tr>
              <tr><td>Usable hosts</td><td className="mono">{r.usable.toLocaleString()}</td></tr>
              <tr><td>Address type</td><td>{r.isPrivate ? "Private (RFC 1918)" : "Public / other"}</td></tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
