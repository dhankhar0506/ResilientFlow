import type { StepText } from "../../../shared/lessonParts";

export type FwNode = "customer" | "admin" | "stranger" | "fw" | "web" | "db" | "ssh";
export type FwScene = "diagram" | "cards";

export interface FwPacket {
  from: FwNode;
  to: FwNode;
  /** where the packet is drawn: before the wall, stopped at the wall, or delivered */
  stage: "approach" | "blocked" | "delivered";
  label: string;
  reply?: boolean;
}

export interface FwStep {
  id: string;
  phase: string;
  scene: FwScene;
  packet?: FwPacket;
  /** rule indexes checked without matching (shown muted) */
  checked?: number[];
  /** matching rule index */
  match?: number;
  verdict?: "allow" | "deny" | "state";
  /** show the connection (state) table */
  conns?: string[][];
  connHot?: number;
  terminal?: string[];
  en: StepText & { cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { cards?: { name: string; text: string; icon?: string }[] };
}

/** [#, action, protocol, source, destination, port] */
export const FW_RULES: string[][] = [
  ["1", "ALLOW", "TCP", "any", "10.0.0.10 (web)", "443"],
  ["2", "ALLOW", "TCP", "192.0.2.5 (office)", "10.0.0.30 (ssh)", "22"],
  ["3", "ALLOW", "TCP", "10.0.0.10 (web)", "10.0.0.20 (db)", "5432"],
  ["4", "DENY", "any", "any", "any", "any"],
];

/** last column of the rule table, per language */
export const FW_RULE_NOTES = {
  en: ["HTTPS to the website", "SSH only from the office", "Web app → database", "Default deny – everything else"],
  hi: ["Website ke liye HTTPS", "SSH sirf office se", "Web app → database", "Default deny – baaki sab"],
} as const;

export const FW_LABELS = {
  en: {
    lessonTitle: "Firewalls",
    heroTitle: "Firewalls: deciding which traffic gets in",
    heroSubtitle:
      "Watch packets hit a firewall and get checked against its rules from top to bottom – allowed, denied, or let through because they belong to an existing connection.",
    internet: "Internet (untrusted)",
    inside: "Server network (trusted)",
    firewall: "Firewall",
    customer: "Customer",
    admin: "Office admin",
    stranger: "Unknown host",
    web: "Web server",
    db: "Database",
    ssh: "SSH server",
    rules: "Firewall rules (checked top → bottom, first match wins)",
    colN: "#",
    colAction: "Action",
    colProto: "Proto",
    colSrc: "Source",
    colDst: "Destination",
    colPort: "Port",
    colNote: "Why",
    allowed: "ALLOWED",
    denied: "DENIED",
    state: "existing connection ✓",
    conns: "Connection (state) table",
    connsHint: "A stateful firewall remembers allowed connections so their replies can come back.",
    colConnSrc: "Inside",
    colConnDst: "Outside",
    colConnState: "State",
  },
  hi: {
    lessonTitle: "Firewalls",
    heroTitle: "Firewalls: kaunsa traffic andar aaye, yeh decide karna",
    heroSubtitle:
      "Packets ko firewall se takrate dekho aur upar se neeche rules se check hote dekho – allow, deny, ya existing connection ka hissa hone ki wajah se andar.",
    internet: "Internet (untrusted)",
    inside: "Server network (trusted)",
    firewall: "Firewall",
    customer: "Customer",
    admin: "Office admin",
    stranger: "Anjaan host",
    web: "Web server",
    db: "Database",
    ssh: "SSH server",
    rules: "Firewall rules (upar → neeche check, pehla match jeet-ta hai)",
    colN: "#",
    colAction: "Action",
    colProto: "Proto",
    colSrc: "Source",
    colDst: "Destination",
    colPort: "Port",
    colNote: "Kyun",
    allowed: "ALLOWED",
    denied: "DENIED",
    state: "existing connection ✓",
    conns: "Connection (state) table",
    connsHint: "Stateful firewall allowed connections yaad rakhta hai taaki unke replies wapas aa sakein.",
    colConnSrc: "Andar",
    colConnDst: "Bahar",
    colConnState: "State",
  },
} as const;

const CONN_CUSTOMER = ["10.0.0.10:443", "198.51.100.20:50544", "ESTABLISHED"];

export const FW_STEPS: FwStep[] = [
  {
    id: "what",
    phase: "1 · What it is",
    scene: "diagram",
    en: {
      title: "A firewall is a security guard for network traffic",
      summary: "It sits between networks and checks every packet against a list of rules: allow or block.",
      detail:
        "The company's servers sit on a private network 10.0.0.0/24. Between them and the internet stands a firewall. Every packet that tries to cross is inspected – where it comes from, where it's going, which protocol and port – and compared to the rules. Only traffic the rules explicitly allow gets through. Firewalls can be a dedicated box, software on a router, a feature of the cloud, or a program on your own laptop.",
      analogy: "The security guard at a building gate with a visitor list: name on the list and going to the right floor → enter. Otherwise → no entry.",
      term: { name: "Firewall", meaning: "A device or program that allows or blocks network traffic based on rules." },
    },
    hi: {
      title: "Firewall network traffic ka security guard hai",
      summary: "Yeh networks ke beech baithta hai aur har packet ko rules ki list se check karta hai: allow ya block.",
      detail:
        "Company ke servers private network 10.0.0.0/24 par hain. Unke aur internet ke beech firewall khada hai. Cross karne ki koshish karne wala har packet check hota hai – kahan se aaya, kahan ja raha, kaunsa protocol aur port – aur rules se compare hota hai. Sirf woh traffic jaata hai jise rules clearly allow karein. Firewall alag box, router mein software, cloud ka feature, ya aapke laptop ka program ho sakta hai.",
      analogy: "Building ke gate ka guard jiske paas visitor list hai: list mein naam aur sahi floor par ja rahe ho → andar. Warna → entry nahi.",
      term: { name: "Firewall", meaning: "Device ya program jo rules ke basis par network traffic allow ya block karta hai." },
    },
  },
  {
    id: "rules",
    phase: "2 · Rules",
    scene: "diagram",
    checked: [0, 1, 2, 3],
    en: {
      title: "Each rule: match these fields → do this action",
      summary: "A rule says: if protocol, source, destination and port match, then ALLOW (or DENY).",
      detail:
        "Look at the rule table. Rule 1 lets anyone reach the web server on port 443. Rule 2 allows SSH only from the office's IP. Rule 3 lets the web server talk to the database. Rule 4 is the safety net at the bottom: deny everything else. This “allow only what you need, deny the rest” approach is called default deny and is the standard best practice.",
      points: ["Match fields: protocol, source IP, destination IP, destination port", "Action: ALLOW / DENY (DROP or REJECT)", "Last rule: deny all (default deny)"],
      term: { name: "Default deny", meaning: "Block everything unless a rule explicitly allows it (principle of least privilege)." },
    },
    hi: {
      title: "Har rule: yeh fields match → yeh action",
      summary: "Rule kehta hai: agar protocol, source, destination aur port match karein, toh ALLOW (ya DENY).",
      detail:
        "Rule table dekho. Rule 1 kisi ko bhi web server ke port 443 tak jaane deta hai. Rule 2 SSH sirf office ke IP se allow karta hai. Rule 3 web server ko database se baat karne deta hai. Rule 4 neeche ka safety net hai: baaki sab deny. “Jo chahiye sirf woh allow, baaki deny” ko default deny kehte hain aur yahi best practice hai.",
      points: ["Match fields: protocol, source IP, destination IP, destination port", "Action: ALLOW / DENY (DROP ya REJECT)", "Aakhri rule: sab deny (default deny)"],
      term: { name: "Default deny", meaning: "Sab block, jab tak koi rule clearly allow na kare (least privilege ka siddhant)." },
    },
  },
  {
    id: "allow",
    phase: "3 · Allowed",
    scene: "diagram",
    packet: { from: "customer", to: "web", stage: "delivered", label: "TCP → 10.0.0.10:443" },
    match: 0,
    verdict: "allow",
    conns: [CONN_CUSTOMER],
    connHot: 0,
    en: {
      title: "A customer opens the website → rule 1 → ALLOW",
      summary: "TCP to 10.0.0.10 port 443 matches rule 1, so the packet goes through.",
      detail:
        "A customer at 198.51.100.20 connects to the website. The firewall checks the rules from the top. Rule 1 – TCP, any source, destination web server, port 443 – matches, so the action is ALLOW. It stops checking right there. Being stateful, the firewall also writes this connection in its state table.",
    },
    hi: {
      title: "Customer website kholta hai → rule 1 → ALLOW",
      summary: "10.0.0.10 port 443 par TCP rule 1 se match karta hai, toh packet andar jaata hai.",
      detail:
        "198.51.100.20 wala customer website se connect karta hai. Firewall upar se rules check karta hai. Rule 1 – TCP, koi bhi source, destination web server, port 443 – match karta hai, toh action ALLOW. Wahi checking ruk jaati hai. Stateful hone ki wajah se firewall yeh connection apni state table mein bhi likh leta hai.",
    },
  },
  {
    id: "deny",
    phase: "4 · Denied",
    scene: "diagram",
    packet: { from: "stranger", to: "db", stage: "blocked", label: "TCP → 10.0.0.20:5432" },
    checked: [0, 1, 2],
    match: 3,
    verdict: "deny",
    conns: [CONN_CUSTOMER],
    en: {
      title: "A stranger tries the database → no rule allows it → DENY",
      summary: "Rules 1–3 don't match, so the packet falls through to rule 4: deny.",
      detail:
        "Bots constantly scan the internet for open database ports. A packet from 203.0.113.66 to port 5432 doesn't match rule 1 (wrong port), rule 2 (wrong port/source) or rule 3 (wrong source – only the web server may reach the DB). It reaches the default-deny rule and is blocked. The database is never even contacted. DROP silently discards the packet (the attacker sees a timeout); REJECT sends back an error.",
      remember: "Databases should never be reachable from the internet. Only the app servers that need them.",
    },
    hi: {
      title: "Anjaan host database try karta hai → koi rule allow nahi karta → DENY",
      summary: "Rules 1–3 match nahi karte, toh packet rule 4 tak girta hai: deny.",
      detail:
        "Bots lagatar internet par khule database ports dhoondhte hain. 203.0.113.66 se port 5432 ka packet rule 1 (galat port), rule 2 (galat port/source) ya rule 3 (galat source – sirf web server DB tak ja sakta hai) se match nahi karta. Default-deny rule tak pahunch kar block hota hai. Database se baat bhi nahi hoti. DROP chupchaap packet phenkta hai (attacker ko timeout dikhta hai); REJECT error wapas bhejta hai.",
      remember: "Database kabhi internet se reachable nahi hona chahiye. Sirf un app servers se jinhe zarurat hai.",
    },
  },
  {
    id: "order",
    phase: "5 · First match wins",
    scene: "diagram",
    packet: { from: "admin", to: "ssh", stage: "delivered", label: "TCP → 10.0.0.30:22" },
    checked: [0],
    match: 1,
    verdict: "allow",
    conns: [CONN_CUSTOMER, ["10.0.0.30:22", "192.0.2.5:61022", "ESTABLISHED"]],
    connHot: 1,
    en: {
      title: "Order matters: rules are read top to bottom",
      summary: "The office admin's SSH matches rule 2 before reaching the deny-all at the bottom.",
      detail:
        "The admin at 192.0.2.5 connects to port 22. Rule 1 doesn't match (port 443), rule 2 does → ALLOW. The same packet from any other IP would skip rule 2 and hit rule 4 → DENY. Now imagine someone moved “DENY any” to the top: it would match first and block everything, including customers. That's why specific allow rules go above the general deny rule, and why reviewing rule order is part of every firewall change.",
      remember: "First matching rule wins. Specific rules first, catch-all deny last.",
    },
    hi: {
      title: "Order zaroori hai: rules upar se neeche padhe jaate hain",
      summary: "Office admin ka SSH neeche ke deny-all tak pahunchne se pehle rule 2 se match ho jaata hai.",
      detail:
        "192.0.2.5 wala admin port 22 se connect karta hai. Rule 1 match nahi (port 443), rule 2 match → ALLOW. Yahi packet kisi aur IP se aaye toh rule 2 skip karke rule 4 par → DENY. Ab socho kisi ne “DENY any” ko sabse upar rakh diya: woh pehle match karke sab block kar dega, customers bhi. Isliye specific allow rules general deny se upar hote hain, aur har firewall change mein rule order review hota hai.",
      remember: "Pehla matching rule jeet-ta hai. Specific rules pehle, catch-all deny aakhir mein.",
    },
  },
  {
    id: "stateful",
    phase: "6 · Stateful",
    scene: "diagram",
    packet: { from: "web", to: "customer", stage: "delivered", label: "reply :443 → :50544", reply: true },
    verdict: "state",
    conns: [CONN_CUSTOMER, ["10.0.0.30:22", "192.0.2.5:61022", "ESTABLISHED"]],
    connHot: 0,
    en: {
      title: "Replies come back automatically (stateful firewall)",
      summary: "The web server's reply isn't checked against the rules – it matches an entry in the connection table.",
      detail:
        "No rule allows traffic from the web server to 198.51.100.20:50544, yet the reply passes. A stateful firewall remembers every connection it allowed (source/destination IPs and ports, TCP state) and automatically lets the matching return traffic through. That's why you only write rules for who may start a connection. Older stateless filters needed separate rules for both directions and were much harder to get right.",
      term: { name: "Stateful inspection", meaning: "The firewall tracks connections and allows reply packets that belong to an allowed connection." },
    },
    hi: {
      title: "Replies apne-aap wapas aate hain (stateful firewall)",
      summary: "Web server ka reply rules se check nahi hota – woh connection table ki entry se match karta hai.",
      detail:
        "Koi rule web server se 198.51.100.20:50544 tak traffic allow nahi karta, phir bhi reply jaata hai. Stateful firewall har allowed connection yaad rakhta hai (source/destination IPs aur ports, TCP state) aur matching return traffic apne-aap jaane deta hai. Isliye rules sirf us baat ke likhe jaate hain ki connection kaun shuru kar sakta hai. Purane stateless filters ko dono directions ke alag rules chahiye the, aur unhe sahi likhna kaafi mushkil tha.",
      term: { name: "Stateful inspection", meaning: "Firewall connections track karta hai aur allowed connection ke reply packets jaane deta hai." },
    },
  },
  {
    id: "types",
    phase: "7 · Kinds",
    scene: "cards",
    en: {
      title: "Where you'll find firewalls",
      summary: "From your laptop to the cloud – same idea, different places.",
      detail: "Real systems use several layers at once (defence in depth):",
      cards: [
        { icon: "💻", name: "Host firewall", text: "On each computer: Windows Defender Firewall, macOS firewall, ufw/iptables/nftables on Linux." },
        { icon: "🧱", name: "Network firewall", text: "A box at the network edge. Next-gen firewalls (NGFW) also recognise apps and inspect content." },
        { icon: "☁️", name: "Cloud security groups", text: "AWS security groups, Azure NSGs, GCP firewall rules – stateful rules attached to each VM." },
        { icon: "🕸️", name: "WAF", text: "Web Application Firewall: inspects HTTP itself to block SQL injection, XSS and bad bots (e.g. Cloudflare, AWS WAF)." },
      ],
      remember: "Inbound rules protect you from the internet. Outbound rules stop a compromised machine from calling home.",
    },
    hi: {
      title: "Firewalls kahan milte hain",
      summary: "Laptop se cloud tak – idea same, jagah alag.",
      detail: "Asli systems ek saath kai layers use karte hain (defence in depth):",
      cards: [
        { icon: "💻", name: "Host firewall", text: "Har computer par: Windows Defender Firewall, macOS firewall, Linux par ufw/iptables/nftables." },
        { icon: "🧱", name: "Network firewall", text: "Network edge par box. Next-gen firewalls (NGFW) apps pehchan kar content bhi check karte hain." },
        { icon: "☁️", name: "Cloud security groups", text: "AWS security groups, Azure NSGs, GCP firewall rules – har VM se jude stateful rules." },
        { icon: "🕸️", name: "WAF", text: "Web Application Firewall: HTTP ke andar dekh kar SQL injection, XSS aur bad bots block karta hai (jaise Cloudflare, AWS WAF)." },
      ],
      remember: "Inbound rules internet se bachate hain. Outbound rules hacked machine ko bahar call karne se rokte hain.",
    },
  },
  {
    id: "debug",
    phase: "8 · Developer view",
    scene: "cards",
    en: {
      title: "“It works on my laptop but not from my phone / the internet”",
      summary: "When a connection times out, suspect a firewall before you suspect your code.",
      detail: "Most “my server is unreachable” problems are one of these:",
      cards: [
        { icon: "🪟", name: "Windows Firewall prompt", text: "First run of node/python asks “Allow on private networks?”. If you clicked Cancel, your phone can't reach :3000." },
        { icon: "☁️", name: "Cloud port not opened", text: "New VM, app running on 8080, but the security group allows only 22. Add an inbound rule for the port." },
        { icon: "🏠", name: "Listening on localhost", text: "Not a firewall at all: the app binds 127.0.0.1. Bind 0.0.0.0 (see the Ports lesson)." },
        { icon: "⏳ vs 🚫", name: "Timeout vs refused", text: "Timeout = probably a firewall dropping packets. Refused = reached the host, nothing listening." },
      ],
      remember: "Open only the ports you need, to the sources that need them.",
    },
    hi: {
      title: "“Mere laptop par chalta hai, phone / internet se nahi”",
      summary: "Connection timeout ho toh code se pehle firewall par shak karo.",
      detail: "Zyada tar “mera server reachable nahi” problems inmein se ek hoti hain:",
      cards: [
        { icon: "🪟", name: "Windows Firewall prompt", text: "node/python ke pehle run par “Allow on private networks?” aata hai. Cancel kiya toh phone :3000 tak nahi pahunchega." },
        { icon: "☁️", name: "Cloud port khula nahi", text: "Naya VM, app 8080 par, par security group sirf 22 allow karta hai. Port ke liye inbound rule add karo." },
        { icon: "🏠", name: "localhost par listen", text: "Firewall hai hi nahi: app 127.0.0.1 par bind hai. 0.0.0.0 par bind karo (Ports lesson dekho)." },
        { icon: "⏳ vs 🚫", name: "Timeout vs refused", text: "Timeout = shayad firewall packets drop kar raha. Refused = host tak pahunche, koi listen nahi kar raha." },
      ],
      remember: "Sirf zaroori ports kholo, sirf unke liye jinhe zarurat hai.",
    },
  },
  {
    id: "see-it",
    phase: "9 · See it",
    scene: "diagram",
    checked: [0, 1, 2, 3],
    conns: [CONN_CUSTOMER, ["10.0.0.30:22", "192.0.2.5:61022", "ESTABLISHED"]],
    terminal: [
      "# Linux (ufw = simple front-end for iptables/nftables)",
      "$ sudo ufw default deny incoming",
      "$ sudo ufw allow 443/tcp",
      "$ sudo ufw allow from 192.0.2.5 to any port 22 proto tcp",
      "$ sudo ufw status numbered",
      "",
      "# Windows (PowerShell, as admin)",
      "> New-NetFirewallRule -DisplayName \"Dev 3000\" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow",
      "> Test-NetConnection 10.0.0.10 -Port 443",
    ],
    en: {
      title: "Write the same rules yourself",
      summary: "ufw on Linux and New-NetFirewallRule on Windows express exactly the rule table from this lesson.",
      detail:
        "These commands build this lesson's policy: deny incoming by default, allow HTTPS from anywhere, allow SSH only from the office. Test-NetConnection (Windows) or nc -vz host port (Linux/macOS) quickly tells you whether a TCP port is reachable through all the firewalls in between.",
      remember: "Firewall = ordered rules + default deny + connection tracking.",
    },
    hi: {
      title: "Wahi rules khud likho",
      summary: "Linux par ufw aur Windows par New-NetFirewallRule exactly is lesson ki rule table banate hain.",
      detail:
        "Yeh commands is lesson ki policy banate hain: default mein incoming deny, kahin se bhi HTTPS allow, SSH sirf office se. Test-NetConnection (Windows) ya nc -vz host port (Linux/macOS) jaldi batata hai ki beech ke saare firewalls ke through TCP port reachable hai ya nahi.",
      remember: "Firewall = ordered rules + default deny + connection tracking.",
    },
  },
];
