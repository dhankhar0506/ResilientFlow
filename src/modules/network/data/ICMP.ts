import type { StepText } from "../../../shared/lessonParts";

export type IcmpNode = "pc" | "r1" | "r2" | "r3" | "srv";
export type IcmpScene = "chain" | "cards";

export interface IcmpPacket {
  from: IcmpNode;
  to: IcmpNode;
  t: number;
  kind: "request" | "reply" | "exceeded" | "dropped";
  label: string;
}

export interface IcmpStep {
  id: string;
  phase: string;
  scene: IcmpScene;
  packet?: IcmpPacket;
  /** node that answered in this step */
  replier?: IcmpNode;
  /** routers that already decremented the TTL in this step (shows −1 badge) */
  decremented?: IcmpNode[];
  output: string[];
  /** extra terminal shown in the step card */
  terminal?: string[];
  en: StepText & { cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { cards?: { name: string; text: string; icon?: string }[] };
}

export const ICMP_NODES: Record<IcmpNode, { icon: string; name: string; ip: string }> = {
  pc: { icon: "💻", name: "You", ip: "192.168.1.23" },
  r1: { icon: "📡", name: "Home router", ip: "192.168.1.1" },
  r2: { icon: "🏢", name: "ISP router", ip: "100.64.0.1" },
  r3: { icon: "🌐", name: "Backbone", ip: "203.0.113.1" },
  srv: { icon: "🗄️", name: "example.com", ip: "198.51.100.7" },
};

export const ICMP_LABELS = {
  en: {
    lessonTitle: "Ping & Traceroute (ICMP)",
    heroTitle: "Ping & traceroute: testing the path with ICMP",
    heroSubtitle:
      "See how ping measures a round trip with Echo Request/Reply, and how traceroute uses TTL and “Time Exceeded” messages to reveal every router on the way.",
    output: "Terminal",
    hop: "hop",
    ttlMinus: "TTL −1",
    answered: "answers",
  },
  hi: {
    lessonTitle: "Ping & Traceroute (ICMP)",
    heroTitle: "Ping & traceroute: ICMP se raasta test karna",
    heroSubtitle:
      "Dekho ping Echo Request/Reply se round trip kaise naapta hai, aur traceroute TTL aur “Time Exceeded” messages se raaste ka har router kaise dikhata hai.",
    output: "Terminal",
    hop: "hop",
    ttlMinus: "TTL −1",
    answered: "jawab deta hai",
  },
} as const;

const PING_HEAD = "$ ping -c 4 example.com";
const PING_1 = "PING example.com (198.51.100.7) 56(84) bytes of data.";
const PING_R = (n: number, ms: string) => `64 bytes from 198.51.100.7: icmp_seq=${n} ttl=61 time=${ms} ms`;
const PING_ALL = [
  PING_HEAD,
  PING_1,
  PING_R(1, "24.3"),
  PING_R(2, "23.9"),
  PING_R(3, "25.1"),
  PING_R(4, "24.2"),
  "--- example.com ping statistics ---",
  "4 packets transmitted, 4 received, 0% packet loss",
  "rtt min/avg/max = 23.9/24.4/25.1 ms",
];
const TR_HEAD = ["$ traceroute example.com", "traceroute to example.com (198.51.100.7), 30 hops max"];
const TR_1 = " 1  192.168.1.1     1.2 ms   1.0 ms   1.1 ms";
const TR_2 = " 2  100.64.0.1      8.4 ms   8.1 ms   8.9 ms";
const TR_3 = " 3  203.0.113.1    18.7 ms  18.2 ms  19.0 ms";
const TR_4 = " 4  198.51.100.7   24.1 ms  24.3 ms  23.9 ms";

export const ICMP_STEPS: IcmpStep[] = [
  {
    id: "what",
    phase: "1 · ICMP",
    scene: "cards",
    output: [],
    en: {
      title: "ICMP: the network's messenger",
      summary: "ICMP carries small control and error messages between devices. Ping and traceroute are built on it.",
      detail:
        "IP itself can't report problems. When a router has to drop a packet, or a host is unreachable, it sends back an ICMP (Internet Control Message Protocol) message to the sender. ICMP rides directly inside IP packets – it has no ports, it's not TCP or UDP. Each message has a type:",
      cards: [
        { icon: "📤", name: "Type 8 · Echo Request", text: "“Are you there?” – sent by ping." },
        { icon: "📥", name: "Type 0 · Echo Reply", text: "“Yes, I'm here!” – the answer to ping." },
        { icon: "⌛", name: "Type 11 · Time Exceeded", text: "“Your packet's TTL reached 0, I dropped it.” – used by traceroute." },
        { icon: "🚫", name: "Type 3 · Destination Unreachable", text: "“I can't deliver this” – no route, host down, or port closed." },
      ],
      term: { name: "ICMP", meaning: "Internet Control Message Protocol – carries diagnostic and error messages for IP." },
    },
    hi: {
      title: "ICMP: network ka sandeshwahak",
      summary: "ICMP devices ke beech chhote control aur error messages le jaata hai. Ping aur traceroute isi par bane hain.",
      detail:
        "IP khud problems report nahi kar sakta. Jab router ko packet drop karna pade, ya host tak pahunch na ho, toh woh sender ko ICMP (Internet Control Message Protocol) message wapas bhejta hai. ICMP seedha IP packet ke andar jaata hai – iske ports nahi hote, yeh TCP ya UDP nahi hai. Har message ka type hota hai:",
      cards: [
        { icon: "📤", name: "Type 8 · Echo Request", text: "“Kya tum ho?” – ping bhejta hai." },
        { icon: "📥", name: "Type 0 · Echo Reply", text: "“Haan, main hoon!” – ping ka jawab." },
        { icon: "⌛", name: "Type 11 · Time Exceeded", text: "“Tumhare packet ka TTL 0 ho gaya, maine drop kiya.” – traceroute use karta hai." },
        { icon: "🚫", name: "Type 3 · Destination Unreachable", text: "“Yeh deliver nahi kar sakta” – route nahi, host down, ya port band." },
      ],
      term: { name: "ICMP", meaning: "Internet Control Message Protocol – IP ke liye diagnostic aur error messages le jaata hai." },
    },
  },
  {
    id: "echo-request",
    phase: "2 · Ping: request",
    scene: "chain",
    packet: { from: "r1", to: "r2", t: 0.5, kind: "request", label: "Echo Request · TTL 63" },
    decremented: ["r1"],
    output: [PING_HEAD, PING_1],
    en: {
      title: "ping sends an ICMP Echo Request",
      summary: "Your computer sends a small Echo Request to 198.51.100.7 and starts a stopwatch.",
      detail:
        "ping first resolves example.com with DNS, then builds an IP packet with an ICMP Echo Request inside (56 bytes of data by default) and notes the exact time it was sent. Like every IP packet it has a TTL (Time To Live), usually starting at 64 on Linux/macOS or 128 on Windows. Your home router forwards it and lowers the TTL by 1 → 63.",
      term: { name: "TTL", meaning: "Time To Live – a counter in every IP packet. Each router subtracts 1; at 0 the packet is dropped." },
    },
    hi: {
      title: "ping ICMP Echo Request bhejta hai",
      summary: "Aapka computer 198.51.100.7 ko chhota Echo Request bhejta hai aur stopwatch shuru karta hai.",
      detail:
        "ping pehle DNS se example.com resolve karta hai, phir ICMP Echo Request wala IP packet banata hai (default 56 bytes data) aur bhejne ka exact time note karta hai. Har IP packet ki tarah ismein TTL (Time To Live) hota hai, Linux/macOS par aam taur par 64 aur Windows par 128 se shuru. Home router ise forward karta hai aur TTL 1 kam karta hai → 63.",
      term: { name: "TTL", meaning: "Time To Live – har IP packet mein counter. Har router 1 ghatata hai; 0 par packet drop." },
    },
  },
  {
    id: "echo-arrives",
    phase: "3 · Request arrives",
    scene: "chain",
    packet: { from: "r3", to: "srv", t: 0.55, kind: "request", label: "Echo Request · TTL 61" },
    decremented: ["r1", "r2", "r3"],
    output: [PING_HEAD, PING_1],
    en: {
      title: "Hop by hop to the server",
      summary: "Three routers each forward the packet and reduce the TTL: 64 → 63 → 62 → 61.",
      detail:
        "The ISP router and a backbone router forward the request just like any other packet, each subtracting 1 from the TTL. The packet reaches example.com with TTL 61. The server's operating system (not a web server program – ICMP has no ports) sees an Echo Request addressed to it.",
    },
    hi: {
      title: "Hop by hop server tak",
      summary: "Teen routers packet forward karte hain aur TTL kam karte hain: 64 → 63 → 62 → 61.",
      detail:
        "ISP router aur backbone router request ko kisi bhi packet ki tarah forward karte hain, har ek TTL se 1 ghatata hai. Packet TTL 61 ke saath example.com tak pahunchta hai. Server ka operating system (web server program nahi – ICMP ke ports nahi hote) apne liye Echo Request dekhta hai.",
    },
  },
  {
    id: "echo-reply",
    phase: "4 · Reply & RTT",
    scene: "chain",
    packet: { from: "r1", to: "pc", t: 0.5, kind: "reply", label: "Echo Reply · TTL 61" },
    replier: "srv",
    output: [PING_HEAD, PING_1, PING_R(1, "24.3")],
    en: {
      title: "Echo Reply comes back – round-trip time measured",
      summary: "The server answers with an Echo Reply. ping stops the stopwatch: 24.3 ms.",
      detail:
        "The server copies the data into an Echo Reply and sends it back (with its own new TTL, starting at 64). When it arrives, ping computes now − send time = the round-trip time (RTT). It then sends the next request once per second. Each line shows icmp_seq (which request), the TTL of the reply as it arrived, and the RTT.",
      term: { name: "RTT", meaning: "Round-Trip Time – time from sending a request to receiving its reply." },
    },
    hi: {
      title: "Echo Reply wapas aata hai – round-trip time naapa gaya",
      summary: "Server Echo Reply deta hai. ping stopwatch rokta hai: 24.3 ms.",
      detail:
        "Server data ko Echo Reply mein copy karke wapas bhejta hai (apne naye TTL ke saath, 64 se shuru). Pahunchne par ping calculate karta hai abhi − bhejne ka time = round-trip time (RTT). Phir har second agla request bhejta hai. Har line mein icmp_seq (kaunsa request), pahunche reply ka TTL aur RTT hota hai.",
      term: { name: "RTT", meaning: "Round-Trip Time – request bhejne se reply milne tak ka time." },
    },
  },
  {
    id: "read-ping",
    phase: "5 · Read the output",
    scene: "chain",
    output: PING_ALL,
    en: {
      title: "How to read ping output",
      summary: "Loss % tells you about reliability, time tells you about latency, ttl hints at the number of hops.",
      detail:
        "4 sent, 4 received, 0% loss: the path works. Average 24.4 ms is the latency – under ~30 ms feels instant, over ~150 ms is noticeable in calls and games. Big swings between min and max are called jitter. ttl=61 means the reply started at 64 and passed 3 routers. If you see “Request timed out” or 100% loss, either the host is down, the path is broken, or a firewall blocks ICMP.",
      points: ["0% loss → path OK", "time → latency (lower is better)", "max − min → jitter", "ttl → 64/128/255 minus hops"],
      remember: "ping answers two questions: “Can I reach it?” and “How fast is the round trip?”",
    },
    hi: {
      title: "ping output kaise padhein",
      summary: "Loss % reliability batata hai, time latency batata hai, ttl hops ki ginti ka hint deta hai.",
      detail:
        "4 bheje, 4 mile, 0% loss: raasta theek hai. Average 24.4 ms latency hai – ~30 ms se kam instant lagta hai, ~150 ms se zyada calls aur games mein mehsoos hota hai. Min aur max mein bada fark jitter kehlata hai. ttl=61 matlab reply 64 se shuru hokar 3 routers se guzra. “Request timed out” ya 100% loss dikhe toh host down hai, raasta toota hai, ya firewall ICMP block kar raha hai.",
      points: ["0% loss → raasta OK", "time → latency (kam better)", "max − min → jitter", "ttl → 64/128/255 minus hops"],
      remember: "ping do sawaalon ka jawab deta hai: “Pahunch sakta hoon?” aur “Round trip kitna tez hai?”",
    },
  },
  {
    id: "ttl-zero",
    phase: "6 · TTL reaches 0",
    scene: "chain",
    packet: { from: "r1", to: "pc", t: 0.5, kind: "exceeded", label: "Time Exceeded from 192.168.1.1" },
    replier: "r1",
    decremented: ["r1"],
    output: [...TR_HEAD],
    en: {
      title: "The trick behind traceroute: TTL = 1",
      summary: "Send a packet with TTL 1. The first router lowers it to 0, drops it, and replies “Time Exceeded” – revealing its address.",
      detail:
        "TTL exists so that packets caught in a routing loop don't circle forever. When a router decrements the TTL to 0, it must drop the packet and send an ICMP Time Exceeded message back to the sender. That error message comes from the router's own IP address. traceroute deliberately sends packets with TTL 1, 2, 3 … to make each router on the path reveal itself.",
      remember: "TTL = 0 at a router → packet dropped → ICMP Time Exceeded sent back from that router.",
    },
    hi: {
      title: "Traceroute ki trick: TTL = 1",
      summary: "TTL 1 wala packet bhejo. Pehla router use 0 karta hai, drop karta hai, aur “Time Exceeded” bhejta hai – apna address bata deta hai.",
      detail:
        "TTL isliye hai taaki routing loop mein phanse packets hamesha ghoomte na rahein. Jab router TTL ko 0 karta hai, use packet drop karke sender ko ICMP Time Exceeded message bhejna padta hai. Woh error message router ke apne IP se aata hai. traceroute jaan-boojh kar TTL 1, 2, 3 … wale packets bhejta hai taaki raaste ka har router apni pehchan bata de.",
      remember: "Router par TTL = 0 → packet drop → us router se ICMP Time Exceeded wapas.",
    },
  },
  {
    id: "hop2",
    phase: "7 · TTL = 2",
    scene: "chain",
    packet: { from: "r1", to: "pc", t: 0.5, kind: "exceeded", label: "Time Exceeded from 100.64.0.1" },
    replier: "r2",
    decremented: ["r1", "r2"],
    output: [...TR_HEAD, TR_1, TR_2],
    en: {
      title: "TTL 2 → the second router answers",
      summary: "The home router lowers 2 → 1 and forwards; the ISP router lowers 1 → 0 and replies.",
      detail:
        "Line 1 of the output was the home router (from the TTL 1 probe). Now traceroute sends TTL 2. It passes the first router and dies at the second, so the ISP router at 100.64.0.1 sends Time Exceeded. traceroute prints it as hop 2 together with the round-trip time. By default it sends 3 probes per hop, which is why you see 3 times on each line.",
    },
    hi: {
      title: "TTL 2 → doosra router jawab deta hai",
      summary: "Home router 2 → 1 karke forward karta hai; ISP router 1 → 0 karke reply deta hai.",
      detail:
        "Output ki line 1 home router thi (TTL 1 probe se). Ab traceroute TTL 2 bhejta hai. Woh pehle router ko paar karke doosre par marta hai, toh 100.64.0.1 wala ISP router Time Exceeded bhejta hai. traceroute ise round-trip time ke saath hop 2 print karta hai. Default mein har hop ke 3 probes jaate hain, isliye har line mein 3 times dikhte hain.",
    },
  },
  {
    id: "hop-final",
    phase: "8 · Reach the end",
    scene: "chain",
    packet: { from: "r1", to: "pc", t: 0.5, kind: "reply", label: "reply from 198.51.100.7" },
    replier: "srv",
    decremented: ["r1", "r2", "r3"],
    output: [...TR_HEAD, TR_1, TR_2, TR_3, TR_4],
    en: {
      title: "TTL 3, then TTL 4 reaches the destination",
      summary: "Hop 3 is the backbone router. With TTL 4 the probe finally reaches example.com, and traceroute stops.",
      detail:
        "When the probe reaches the destination itself, the answer is no longer Time Exceeded. With Windows tracert (ICMP echo probes) it's an Echo Reply. Linux/macOS traceroute sends UDP probes to unusual high ports by default, so the destination answers with ICMP Port Unreachable. Either way traceroute knows it has arrived. You now have the full path and the delay to each hop – a jump in time shows where the slow part is.",
      points: ["Windows: tracert → ICMP Echo probes", "Linux/macOS: traceroute → UDP probes (or -I for ICMP)", "Stops when the destination answers"],
    },
    hi: {
      title: "TTL 3, phir TTL 4 destination tak",
      summary: "Hop 3 backbone router hai. TTL 4 ke saath probe aakhir example.com tak pahunchta hai, aur traceroute ruk jaata hai.",
      detail:
        "Jab probe khud destination tak pahunchta hai, jawab Time Exceeded nahi hota. Windows tracert (ICMP echo probes) mein Echo Reply aata hai. Linux/macOS traceroute default mein ajeeb high ports par UDP probes bhejta hai, toh destination ICMP Port Unreachable deta hai. Dono tarah traceroute samajh jaata hai ki pahunch gaya. Ab aapke paas poora raasta aur har hop ka delay hai – time mein achanak jump dikhata hai slow hissa kahan hai.",
      points: ["Windows: tracert → ICMP Echo probes", "Linux/macOS: traceroute → UDP probes (ya ICMP ke liye -I)", "Destination jawab de toh ruk jaata hai"],
    },
  },
  {
    id: "failures",
    phase: "9 · When it fails",
    scene: "cards",
    output: [],
    terminal: [" 5  * * *", " 6  * * *", "Request timed out.", "Destination host unreachable."],
    en: {
      title: "Stars, timeouts and unreachable",
      summary: "No reply doesn't always mean “broken” – many devices simply don't answer ICMP.",
      detail: "Learn to tell these apart before you blame the network:",
      cards: [
        { icon: "⭐", name: "* * * in traceroute", text: "That hop didn't send Time Exceeded (often rate-limited or filtered). If later hops answer, the path is fine." },
        { icon: "⏳", name: "Request timed out", text: "No reply at all. Host down, path broken – or a firewall blocks ICMP (common on servers and cloud VMs)." },
        { icon: "🚫", name: "Destination host unreachable", text: "A router (or your own PC) knows it can't deliver: no route, or no ARP reply on the last network." },
        { icon: "✅", name: "Ping fails but the website opens?", text: "Normal! The site blocks ICMP but allows TCP 443. Test the real port instead (curl, telnet, Test-NetConnection)." },
      ],
      remember: "ping blocked ≠ service down. Always test the actual port too.",
    },
    hi: {
      title: "Stars, timeouts aur unreachable",
      summary: "Reply na aana hamesha “kharab” nahi – kai devices ICMP ka jawab hi nahi dete.",
      detail: "Network ko dosh dene se pehle inme fark samjho:",
      cards: [
        { icon: "⭐", name: "traceroute mein * * *", text: "Us hop ne Time Exceeded nahi bheja (aksar rate-limited ya filtered). Aage ke hops jawab dein toh raasta theek hai." },
        { icon: "⏳", name: "Request timed out", text: "Koi reply nahi. Host down, raasta toota – ya firewall ICMP block kar raha hai (servers aur cloud VMs par common)." },
        { icon: "🚫", name: "Destination host unreachable", text: "Router (ya aapka PC) jaanta hai deliver nahi kar sakta: route nahi, ya last network par ARP reply nahi." },
        { icon: "✅", name: "Ping fail par website khulti hai?", text: "Normal hai! Site ICMP block karti hai par TCP 443 allow. Asli port test karo (curl, telnet, Test-NetConnection)." },
      ],
      remember: "ping block ≠ service down. Asli port bhi test karo.",
    },
  },
  {
    id: "commands",
    phase: "10 · Commands",
    scene: "chain",
    output: [
      "# Windows",
      "> ping example.com            (4 pings, TTL starts at 128)",
      "> ping -t example.com         (until Ctrl+C)",
      "> tracert example.com",
      "> pathping example.com        (trace + loss per hop)",
      "",
      "# Linux / macOS",
      "$ ping -c 4 example.com",
      "$ traceroute example.com      (macOS / Linux)",
      "$ mtr example.com             (live traceroute + ping)",
    ],
    en: {
      title: "Your troubleshooting toolkit",
      summary: "Ping the gateway, then a public IP, then a name – each step narrows down where the problem is.",
      detail:
        "A classic order when “the internet is down”: 1) ping your default gateway (192.168.1.1) – tests your Wi-Fi/LAN. 2) ping a public IP like 1.1.1.1 – tests the ISP path. 3) ping a name like example.com – tests DNS too. The first one that fails tells you which layer to look at. traceroute/mtr then shows where along the path things go wrong.",
      remember: "Gateway → public IP → domain name. The first failure points to the problem.",
    },
    hi: {
      title: "Aapka troubleshooting toolkit",
      summary: "Pehle gateway ping karo, phir public IP, phir naam – har step problem ki jagah chhoti karta hai.",
      detail:
        "“Internet nahi chal raha” par classic order: 1) default gateway (192.168.1.1) ping karo – Wi-Fi/LAN test. 2) 1.1.1.1 jaisa public IP ping karo – ISP path test. 3) example.com jaisa naam ping karo – DNS bhi test. Jo pehla fail ho, wahi batata hai kis layer ko dekhna hai. Phir traceroute/mtr dikhata hai raaste mein kahan gadbad hai.",
      remember: "Gateway → public IP → domain name. Pehla failure problem dikhata hai.",
    },
  },
];
