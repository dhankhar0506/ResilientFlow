import { useMemo, useState } from "react";

const fakeIp = (s: string) => {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return [(h % 200) + 20, (h >> 8) % 256, (h >> 16) % 256, ((h >> 24) % 250) + 2].join(".");
};

type DStep = { icon: string; who: string; q: string; a: string; hit?: boolean };

function build(domain: string): DStep[] | null {
  const labels = domain.trim().toLowerCase().split(".").filter(Boolean);
  if (labels.length < 2 || !labels.every((l) => /^[a-z0-9-]+$/.test(l))) return null;
  const tld = labels[labels.length - 1];
  const apex = labels.slice(-2).join(".");
  const ip = fakeIp(domain);
  return [
    { icon: "🌐", who: "Browser cache", q: `Do I already know ${domain}?`, a: "❌ Miss — nothing cached yet." },
    { icon: "💻", who: "OS cache + hosts file", q: `Is ${domain} in the OS resolver cache or hosts file?`, a: "❌ Miss — ask the configured DNS resolver." },
    { icon: "🧭", who: "Recursive resolver (ISP / 8.8.8.8)", q: `A record for ${domain}?`, a: "❌ Not cached. The resolver will walk the DNS tree for you." },
    { icon: "🌍", who: "Root server (.)", q: `Who handles .${tld}?`, a: `➡️ Referral: ask the .${tld} TLD name servers.` },
    { icon: "🏷️", who: `TLD server (.${tld})`, q: `Who handles ${apex}?`, a: `➡️ Referral: ask ns1.${apex} (authoritative).` },
    { icon: "📖", who: `Authoritative server (ns1.${apex})`, q: `A record for ${domain}?`, a: `✅ ${domain} → ${ip} (TTL 300s)`, hit: true },
    { icon: "🎉", who: "Resolver → Browser", q: "Return the answer and cache it", a: `Resolver caches ${ip} for 300s and replies. The browser can now open a TCP connection to ${ip}:443.`, hit: true },
  ];
}

export default function DnsLookup() {
  const [domain, setDomain] = useState("www.example.com");
  const [n, setN] = useState(0);
  const steps = useMemo(() => build(domain), [domain]);

  return (
    <div>
      <div className="row" style={{ gap: 12, marginBottom: 12 }}>
        <label className="inline">Domain:
          <input className="inp" value={domain} onChange={(e) => { setDomain(e.target.value); setN(0); }} />
        </label>
        <button className="btn primary sm" disabled={!steps || n >= (steps?.length ?? 0)} onClick={() => setN((x) => x + 1)}>Next query ▶</button>
        <button className="btn ghost sm" onClick={() => setN(0)}>Reset</button>
      </div>
      {!steps ? (
        <p className="w-error">Enter a valid domain like www.example.com</p>
      ) : (
        <>
          <p className="hint">DNS turns a human-friendly name into an IP address. It's a hierarchy: <b>Root → TLD → Authoritative</b>.</p>
          <ol className="dns">
            {steps.slice(0, n).map((s, i) => (
              <li key={i} className={s.hit ? "hit" : ""}>
                <span className="dns-ic">{s.icon}</span>
                <div>
                  <b>{s.who}</b>
                  <div className="q">❓ {s.q}</div>
                  <div className="a">{s.a}</div>
                </div>
              </li>
            ))}
          </ol>
          {n === 0 && <p className="hint">Press “Next query” to follow the lookup step by step.</p>}
        </>
      )}
    </div>
  );
}
