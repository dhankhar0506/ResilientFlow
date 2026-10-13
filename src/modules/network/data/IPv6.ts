import type { StepText } from "../../../shared/lessonParts";

export type V6Scene = "big" | "address" | "cards" | "lan";
export type V6Form = "full" | "noLeading" | "compressed";
export type V6Node = "router" | "laptop" | "pc";

export interface V6Packet {
  from: V6Node;
  to: V6Node;
  t: number;
  label: string;
  multicast?: boolean;
}

export interface V6Step {
  id: string;
  phase: string;
  scene: V6Scene;
  form?: V6Form;
  /** group indexes to highlight */
  highlight?: number[];
  /** colour first 4 groups as network, last 4 as interface ID */
  split?: boolean;
  /** which address to show in the address scene */
  address?: "doc" | "slaac";
  packets?: V6Packet[];
  laptopAddr?: string[];
  terminal?: string[];
  en: StepText & { cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { cards?: { name: string; text: string; icon?: string }[] };
}

export const V6_ADDR = {
  doc: {
    full: ["2001", "0db8", "0000", "0000", "0000", "ff00", "0042", "8329"],
    noLeading: ["2001", "db8", "0", "0", "0", "ff00", "42", "8329"],
    compressed: "2001:db8::ff00:42:8329",
  },
  slaac: {
    full: ["2001", "0db8", "abcd", "0012", "3c1a", "9f2b", "77d0", "5e14"],
    noLeading: ["2001", "db8", "abcd", "12", "3c1a", "9f2b", "77d0", "5e14"],
    compressed: "2001:db8:abcd:12:3c1a:9f2b:77d0:5e14",
  },
};

export const V6_LABELS = {
  en: {
    lessonTitle: "IPv6",
    heroTitle: "IPv6: the next-generation IP address",
    heroSubtitle:
      "Why IPv6 exists, how to read and shorten its long hex addresses, what /64 means, and how devices configure themselves without DHCP.",
    group: "group",
    bits: "16 bits",
    network: "Network prefix (64 bits)",
    iface: "Interface ID (64 bits)",
    written: "Written as",
    router: "Router",
    laptop: "Laptop",
    pc: "PC",
    v4: "IPv4",
    v6: "IPv6",
  },
  hi: {
    lessonTitle: "IPv6",
    heroTitle: "IPv6: agli generation ka IP address",
    heroSubtitle:
      "IPv6 kyun hai, iske lambe hex addresses kaise padhein aur chhote karein, /64 ka matlab, aur devices bina DHCP ke khud ko kaise configure karte hain.",
    group: "group",
    bits: "16 bits",
    network: "Network prefix (64 bits)",
    iface: "Interface ID (64 bits)",
    written: "Aise likhte hain",
    router: "Router",
    laptop: "Laptop",
    pc: "PC",
    v4: "IPv4",
    v6: "IPv6",
  },
} as const;

export const V6_STEPS: V6Step[] = [
  {
    id: "why",
    phase: "1 · Why IPv6",
    scene: "big",
    en: {
      title: "We ran out of IPv4 addresses",
      summary: "IPv4 has about 4.3 billion addresses. IPv6 has 2¹²⁸ – about 340 undecillion.",
      detail:
        "IPv4 addresses are 32 bits. With billions of phones, laptops, TVs and sensors, the free pool ran out years ago, and NAT became the workaround (remember the NAT lesson). IPv6 makes addresses 128 bits long. That's enough to give every device on Earth its own globally unique public address, many times over. Big Indian mobile networks already carry a large share of their traffic over IPv6.",
      remember: "IPv4 = 32 bits, dotted decimal. IPv6 = 128 bits, hexadecimal with colons.",
    },
    hi: {
      title: "IPv4 addresses khatam ho gaye",
      summary: "IPv4 mein lagbhag 4.3 billion addresses hain. IPv6 mein 2¹²⁸ – lagbhag 340 undecillion.",
      detail:
        "IPv4 address 32 bits ka hota hai. Arabon phones, laptops, TVs aur sensors ke saath free pool saalon pehle khatam ho gaya, aur NAT jugaad bana (NAT lesson yaad karo). IPv6 address 128 bits ka hai. Itna ki dharti ke har device ko apna globally unique public address mil sake, kai baar. Bharat ke bade mobile networks ka kaafi traffic pehle se IPv6 par chalta hai.",
      remember: "IPv4 = 32 bits, dotted decimal. IPv6 = 128 bits, colons ke saath hexadecimal.",
    },
  },
  {
    id: "format",
    phase: "2 · Format",
    scene: "address",
    address: "doc",
    form: "full",
    en: {
      title: "8 groups of 4 hex digits",
      summary: "An IPv6 address is written as 8 groups separated by colons. Each group is 16 bits.",
      detail:
        "Each hex digit is 4 bits (0–9 and a–f), so 4 digits = 16 bits per group, and 8 groups × 16 = 128 bits. Letters can be upper- or lowercase, but lowercase is the standard. The 2001:db8::/32 range you see here is reserved for documentation and examples – like 192.0.2.0/24 in IPv4.",
      points: ["1 hex digit = 4 bits", "1 group = 4 hex digits = 16 bits", "8 groups = 128 bits"],
    },
    hi: {
      title: "4 hex digits ke 8 groups",
      summary: "IPv6 address colon se alag 8 groups mein likha jaata hai. Har group 16 bits ka.",
      detail:
        "Har hex digit 4 bits hai (0–9 aur a–f), toh 4 digits = har group 16 bits, aur 8 groups × 16 = 128 bits. Letters capital ya small ho sakte hain, par small standard hai. Yahan dikh raha 2001:db8::/32 range documentation aur examples ke liye reserved hai – IPv4 ke 192.0.2.0/24 jaisa.",
      points: ["1 hex digit = 4 bits", "1 group = 4 hex digits = 16 bits", "8 groups = 128 bits"],
    },
  },
  {
    id: "rule1",
    phase: "3 · Shorten: rule 1",
    scene: "address",
    address: "doc",
    form: "noLeading",
    highlight: [1, 2, 3, 4, 6],
    en: {
      title: "Rule 1: drop leading zeros in each group",
      summary: "0db8 → db8, 0042 → 42, 0000 → 0. Only zeros at the start of a group may go.",
      detail:
        "Just like you'd write 7 instead of 007, leading zeros inside a group can be removed. A group of all zeros becomes a single 0. Trailing zeros must stay: ff00 is still ff00 (otherwise you couldn't tell ff00 from 00ff).",
      remember: "Leading zeros: remove. Trailing zeros: keep.",
    },
    hi: {
      title: "Rule 1: har group ke shuru ke zeros hatao",
      summary: "0db8 → db8, 0042 → 42, 0000 → 0. Sirf group ke shuru wale zeros hat sakte hain.",
      detail:
        "Jaise 007 ki jagah 7 likhte ho, waise hi group ke andar shuru ke zeros hata sakte ho. Poora zero wala group ek 0 ban jaata hai. Peeche ke zeros rehne chahiye: ff00 ff00 hi rahega (warna ff00 aur 00ff mein fark kaise karoge).",
      remember: "Shuru ke zeros: hatao. Peeche ke zeros: rakho.",
    },
  },
  {
    id: "rule2",
    phase: "4 · Shorten: rule 2",
    scene: "address",
    address: "doc",
    form: "compressed",
    highlight: [2, 3, 4],
    en: {
      title: "Rule 2: replace one run of zero groups with ::",
      summary: "2001:db8:0:0:0:ff00:42:8329 → 2001:db8::ff00:42:8329",
      detail:
        "A continuous run of all-zero groups can be replaced by a double colon ::. The computer knows an address always has 8 groups, so it can work out how many zero groups are hidden. You may use :: only once in an address – twice would be ambiguous. If there are two runs, compress the longer one. That's why the loopback address 0:0:0:0:0:0:0:1 is written simply as ::1.",
      points: ["Only one :: per address", "Compress the longest run of zeros", "::1 = loopback (like 127.0.0.1)", ":: = all zeros (like 0.0.0.0)"],
    },
    hi: {
      title: "Rule 2: zero groups ki ek line ko :: se badlo",
      summary: "2001:db8:0:0:0:ff00:42:8329 → 2001:db8::ff00:42:8329",
      detail:
        "Lagatar all-zero groups ko double colon :: se badal sakte ho. Computer jaanta hai address mein hamesha 8 groups hote hain, toh woh nikaal leta hai kitne zero groups chhupe hain. :: ek address mein sirf ek baar – do baar se confusion hoga. Do runs hon toh lambi wali compress karo. Isliye loopback address 0:0:0:0:0:0:0:1 ko bas ::1 likhte hain.",
      points: ["Ek address mein sirf ek ::", "Sabse lambi zero run compress karo", "::1 = loopback (127.0.0.1 jaisa)", ":: = sab zero (0.0.0.0 jaisa)"],
    },
  },
  {
    id: "prefix",
    phase: "5 · /64",
    scene: "address",
    address: "slaac",
    form: "noLeading",
    split: true,
    en: {
      title: "The first 64 bits are the network, the last 64 the device",
      summary: "IPv6 LANs are almost always /64: 4 groups of network prefix + 4 groups of interface ID.",
      detail:
        "IPv6 uses the same CIDR idea as IPv4. Your ISP might give your home a /56 or /64, and every LAN (subnet) uses a /64. That means 2⁶⁴ addresses in one subnet – you never have to count hosts or worry about running out. In this example 2001:db8:abcd:12::/64 is the network, and 3c1a:9f2b:77d0:5e14 identifies the laptop on it.",
      term: { name: "Interface ID", meaning: "The host part of an IPv6 address – normally the last 64 bits." },
      remember: "LAN in IPv6 = /64. Subnetting is about prefixes, not saving addresses.",
    },
    hi: {
      title: "Pehle 64 bits network, aakhri 64 device",
      summary: "IPv6 LAN lagbhag hamesha /64 hota hai: 4 groups network prefix + 4 groups interface ID.",
      detail:
        "IPv6 bhi IPv4 jaisa CIDR idea use karta hai. ISP ghar ko /56 ya /64 de sakta hai, aur har LAN (subnet) /64 use karta hai. Matlab ek subnet mein 2⁶⁴ addresses – hosts ginne ya khatam hone ki chinta hi nahi. Is example mein 2001:db8:abcd:12::/64 network hai, aur 3c1a:9f2b:77d0:5e14 us par laptop ko pehchanta hai.",
      term: { name: "Interface ID", meaning: "IPv6 address ka host part – aam taur par aakhri 64 bits." },
      remember: "IPv6 mein LAN = /64. Subnetting prefixes ke baare mein hai, addresses bachane ke nahi.",
    },
  },
  {
    id: "types",
    phase: "6 · Address types",
    scene: "cards",
    en: {
      title: "Kinds of IPv6 addresses (and no broadcast!)",
      summary: "You can recognise the type from how the address starts.",
      detail: "A single interface normally has several IPv6 addresses at once – at least a link-local one and usually a global one.",
      cards: [
        { icon: "🌍", name: "Global unicast · 2000::/3", text: "Public, routable on the internet. Starts with 2 or 3, e.g. 2001:db8:…" },
        { icon: "🔗", name: "Link-local · fe80::/10", text: "Every interface creates one automatically. Works only on the local link; never routed." },
        { icon: "🏠", name: "Unique local · fc00::/7", text: "Private addresses (usually fd…), like 10.x or 192.168.x in IPv4." },
        { icon: "🔁", name: "Loopback · ::1", text: "This computer itself, like 127.0.0.1." },
        { icon: "📣", name: "Multicast · ff00::/8", text: "One-to-many. IPv6 has no broadcast – multicast groups (like ff02::1, all nodes) replace it." },
      ],
      remember: "fe80 = local link only. 2xxx/3xxx = global. ff = multicast. No broadcast in IPv6.",
    },
    hi: {
      title: "IPv6 addresses ke prakaar (aur broadcast nahi!)",
      summary: "Address kaise shuru hota hai usse type pehchan sakte ho.",
      detail: "Ek interface par aam taur par ek saath kai IPv6 addresses hote hain – kam se kam ek link-local aur aksar ek global.",
      cards: [
        { icon: "🌍", name: "Global unicast · 2000::/3", text: "Public, internet par routable. 2 ya 3 se shuru, jaise 2001:db8:…" },
        { icon: "🔗", name: "Link-local · fe80::/10", text: "Har interface khud bana leta hai. Sirf local link par chalta hai; route nahi hota." },
        { icon: "🏠", name: "Unique local · fc00::/7", text: "Private addresses (aksar fd…), IPv4 ke 10.x ya 192.168.x jaise." },
        { icon: "🔁", name: "Loopback · ::1", text: "Yahi computer, 127.0.0.1 jaisa." },
        { icon: "📣", name: "Multicast · ff00::/8", text: "Ek-se-kai. IPv6 mein broadcast nahi – multicast groups (jaise ff02::1, all nodes) uski jagah lete hain." },
      ],
      remember: "fe80 = sirf local link. 2xxx/3xxx = global. ff = multicast. IPv6 mein broadcast nahi.",
    },
  },
  {
    id: "slaac",
    phase: "7 · SLAAC",
    scene: "lan",
    packets: [{ from: "router", to: "laptop", t: 0.4, label: "RA: prefix 2001:db8:abcd:12::/64", multicast: true }],
    laptopAddr: ["fe80::3c1a:9f2b:77d0:5e14", "2001:db8:abcd:12:3c1a:9f2b:77d0:5e14"],
    en: {
      title: "SLAAC: the device builds its own address",
      summary: "The router announces the /64 prefix; the laptop adds its own interface ID. No DHCP server needed.",
      detail:
        "When the laptop joins, it first gives itself a link-local fe80:: address. Routers regularly send Router Advertisement (RA) messages to the all-nodes multicast group: “the prefix here is 2001:db8:abcd:12::/64, and I'm your default gateway”. The laptop combines that prefix with an interface ID it generates (usually random, for privacy) and checks no one else uses it. This is Stateless Address Autoconfiguration. DHCPv6 still exists for networks that want central control or need to hand out DNS servers.",
      term: { name: "SLAAC", meaning: "Stateless Address Autoconfiguration – a host creates its IPv6 address from the router's advertised prefix." },
    },
    hi: {
      title: "SLAAC: device apna address khud banata hai",
      summary: "Router /64 prefix announce karta hai; laptop apna interface ID jodta hai. DHCP server ki zarurat nahi.",
      detail:
        "Laptop join hote hi pehle khud ko link-local fe80:: address deta hai. Routers baar-baar all-nodes multicast group ko Router Advertisement (RA) bhejte hain: “yahan ka prefix 2001:db8:abcd:12::/64 hai, aur main tumhara default gateway hoon”. Laptop us prefix mein apna banaya interface ID (aksar privacy ke liye random) jodta hai aur check karta hai ki koi aur use na kar raha ho. Yeh Stateless Address Autoconfiguration hai. Jin networks ko central control ya DNS servers dene hon unke liye DHCPv6 bhi hai.",
      term: { name: "SLAAC", meaning: "Stateless Address Autoconfiguration – host router ke advertised prefix se apna IPv6 address banata hai." },
    },
  },
  {
    id: "ndp",
    phase: "8 · NDP replaces ARP",
    scene: "lan",
    packets: [
      { from: "laptop", to: "pc", t: 0.45, label: "NS: who has …::20? (multicast)", multicast: true },
    ],
    laptopAddr: ["fe80::3c1a:9f2b:77d0:5e14", "2001:db8:abcd:12:3c1a:9f2b:77d0:5e14"],
    en: {
      title: "Neighbor Discovery replaces ARP",
      summary: "To find a neighbour's MAC, IPv6 sends a Neighbor Solicitation to a special multicast group, not a broadcast.",
      detail:
        "IPv6 has no ARP. Instead the Neighbor Discovery Protocol (NDP), built on ICMPv6, does the job: the laptop sends a Neighbor Solicitation “who has 2001:db8:abcd:12::20?” to a solicited-node multicast address that only the target (and very few others) listens to. The PC answers with a Neighbor Advertisement containing its MAC. NDP also carries Router Advertisements and duplicate address detection. Because NDP uses ICMPv6, blocking all ICMPv6 in a firewall breaks IPv6.",
      points: ["Neighbor Solicitation ≈ ARP request", "Neighbor Advertisement ≈ ARP reply", "Router Solicitation / Advertisement = find routers and prefixes"],
      remember: "Never block all ICMPv6 – IPv6 can't work without it.",
    },
    hi: {
      title: "Neighbor Discovery ne ARP ki jagah li",
      summary: "Padosi ka MAC dhoondhne ke liye IPv6 broadcast nahi, special multicast group ko Neighbor Solicitation bhejta hai.",
      detail:
        "IPv6 mein ARP nahi hai. Uski jagah ICMPv6 par bana Neighbor Discovery Protocol (NDP) kaam karta hai: laptop Neighbor Solicitation “2001:db8:abcd:12::20 kiska hai?” ek solicited-node multicast address par bhejta hai jise sirf target (aur bahut kam aur) sunte hain. PC apne MAC ke saath Neighbor Advertisement deta hai. NDP Router Advertisements aur duplicate address detection bhi karta hai. NDP ICMPv6 use karta hai, isliye firewall mein saara ICMPv6 block karne se IPv6 toot jaata hai.",
      points: ["Neighbor Solicitation ≈ ARP request", "Neighbor Advertisement ≈ ARP reply", "Router Solicitation / Advertisement = routers aur prefixes dhoondhna"],
      remember: "Saara ICMPv6 kabhi block mat karo – uske bina IPv6 nahi chalega.",
    },
  },
  {
    id: "transition",
    phase: "9 · Living with IPv4",
    scene: "cards",
    en: {
      title: "Dual stack: IPv4 and IPv6 side by side",
      summary: "Most devices run both. The browser tries IPv6 and IPv4 and uses whichever connects first.",
      detail:
        "The world can't switch overnight, so today most networks are dual stack: each device has an IPv4 address (often behind NAT) and IPv6 addresses. DNS returns both an A record (IPv4) and an AAAA record (IPv6). Browsers race the two (“Happy Eyeballs”) so users never notice.",
      cards: [
        { icon: "🧱", name: "Dual stack", text: "Both protocols on every device and router. The common setup today." },
        { icon: "🔎", name: "DNS AAAA records", text: "“Quad-A” records map a name to an IPv6 address, like A records for IPv4." },
        { icon: "🚫", name: "No NAT needed", text: "Every device can have a global address. Security comes from a firewall, not from NAT." },
        { icon: "🌉", name: "Translation", text: "Some mobile networks are IPv6-only and use NAT64/DNS64 to reach IPv4-only sites." },
      ],
    },
    hi: {
      title: "Dual stack: IPv4 aur IPv6 saath-saath",
      summary: "Zyada tar devices dono chalate hain. Browser IPv6 aur IPv4 dono try karta hai aur jo pehle connect ho woh use karta hai.",
      detail:
        "Duniya raaton-raat switch nahi kar sakti, isliye aaj zyada tar networks dual stack hain: har device ke paas IPv4 address (aksar NAT ke peeche) aur IPv6 addresses hote hain. DNS A record (IPv4) aur AAAA record (IPv6) dono deta hai. Browsers dono ki race lagate hain (“Happy Eyeballs”) taaki user ko pata na chale.",
      cards: [
        { icon: "🧱", name: "Dual stack", text: "Har device aur router par dono protocols. Aaj ka common setup." },
        { icon: "🔎", name: "DNS AAAA records", text: "“Quad-A” records naam ko IPv6 address se jodte hain, IPv4 ke A records jaise." },
        { icon: "🚫", name: "NAT ki zarurat nahi", text: "Har device ka global address ho sakta hai. Security firewall se aati hai, NAT se nahi." },
        { icon: "🌉", name: "Translation", text: "Kuch mobile networks sirf IPv6 hain aur IPv4-only sites ke liye NAT64/DNS64 use karte hain." },
      ],
    },
  },
  {
    id: "see-it",
    phase: "10 · See it",
    scene: "address",
    address: "slaac",
    form: "compressed",
    split: true,
    terminal: [
      "> ipconfig                          # Windows",
      "   IPv6 Address. . . . : 2001:db8:abcd:12:3c1a:9f2b:77d0:5e14",
      "   Link-local IPv6 . . : fe80::3c1a:9f2b:77d0:5e14%12",
      "$ ip -6 addr                        # Linux",
      "$ ping -6 google.com                # or ping6",
      "$ nslookup -type=AAAA google.com",
      "# IPv6 in a URL needs square brackets:",
      "http://[::1]:3000/",
    ],
    en: {
      title: "Find IPv6 on your own machine",
      summary: "Look for “IPv6 Address” (global) and “Link-local” (fe80) in your network settings.",
      detail:
        "Run ipconfig or ip -6 addr and you'll probably see several IPv6 addresses. The %12 after a link-local address is the zone (which interface), needed because every interface has its own fe80 network. When you put an IPv6 address in a URL, wrap it in square brackets so the colons aren't confused with the port: http://[::1]:3000. Visit test-ipv6.com to check whether your connection supports IPv6.",
      remember: "128 bits · hex groups · :: once · /64 per LAN · SLAAC · NDP · no broadcast.",
    },
    hi: {
      title: "Apni machine par IPv6 dhoondho",
      summary: "Network settings mein “IPv6 Address” (global) aur “Link-local” (fe80) dekho.",
      detail:
        "ipconfig ya ip -6 addr chalao, shayad kai IPv6 addresses dikhenge. Link-local address ke baad %12 zone hai (kaunsa interface), kyunki har interface ka apna fe80 network hota hai. URL mein IPv6 address daalo toh square brackets mein rakho taaki colons port se confuse na hon: http://[::1]:3000. test-ipv6.com par jaakar check karo aapka connection IPv6 support karta hai ya nahi.",
      remember: "128 bits · hex groups · :: ek baar · har LAN /64 · SLAAC · NDP · broadcast nahi.",
    },
  },
];
