import type { StepText } from "../../../shared/lessonParts";

export type SwPc = "A" | "B" | "C" | "D";
export type SwNode = SwPc | "center";
export type SwScene = "diagram" | "cards";

export interface SwToken {
  id: string;
  /** frame sits t of the way from `from` to `to` */
  from: SwNode;
  to: SwNode;
  t: number;
  label?: string;
  kind?: "unicast" | "flood" | "broadcast" | "drop" | "crash";
}

export interface SwStep {
  id: string;
  phase: string;
  scene: SwScene;
  mode: "hub" | "switch";
  activePcs: SwPc[];
  tokens: SwToken[];
  frame?: { dst: string; src: string; decision: string };
  /** MAC table rows: [mac, port, device, age] */
  table: string[][];
  newRows?: number[];
  hotRows?: number[];
  terminal?: string[];
  en: StepText & { decision?: string; cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { decision?: string; cards?: { name: string; text: string; icon?: string }[] };
}

export const MAC: Record<SwPc, string> = {
  A: "00:1a:2b:3c:4d:0a",
  B: "00:1a:2b:3c:4d:0b",
  C: "00:1a:2b:3c:4d:0c",
  D: "00:1a:2b:3c:4d:0d",
};

export const SWITCHING_LABELS = {
  en: {
    lessonTitle: "Hub vs Switch",
    heroTitle: "How a switch learns where every device is",
    heroSubtitle:
      "Compare a hub that shouts every frame to everyone with a switch that learns MAC addresses and forwards each frame only where it needs to go.",
    hub: "HUB",
    switch: "SWITCH",
    port: "port",
    pc: "PC",
    frame: "Frame at this step",
    dst: "Destination MAC",
    src: "Source MAC",
    decision: "Decision",
    table: "MAC address table",
    tableHint: "The switch's memory: which MAC address lives behind which port.",
    tableHub: "A hub has no table – it can't remember anything.",
    colMac: "MAC address",
    colPort: "Port",
    colDevice: "Device",
    colAge: "Age",
    empty: "Empty – the switch has just been switched on.",
    dropped: "dropped",
  },
  hi: {
    lessonTitle: "Hub vs Switch",
    heroTitle: "Switch kaise seekhta hai ki kaunsa device kahan hai",
    heroSubtitle:
      "Hub har frame sabko chillata hai; switch MAC addresses seekhta hai aur har frame sirf wahin bhejta hai jahan zarurat hai. Dono ko compare karo.",
    hub: "HUB",
    switch: "SWITCH",
    port: "port",
    pc: "PC",
    frame: "Is step ka frame",
    dst: "Destination MAC",
    src: "Source MAC",
    decision: "Faisla",
    table: "MAC address table",
    tableHint: "Switch ki memory: kaunsa MAC address kis port ke peeche hai.",
    tableHub: "Hub ke paas table nahi hoti – woh kuch yaad nahi rakh sakta.",
    colMac: "MAC address",
    colPort: "Port",
    colDevice: "Device",
    colAge: "Age",
    empty: "Khaali – switch abhi on hua hai.",
    dropped: "drop",
  },
} as const;

const ROW_A = [MAC.A, "1", "PC A", "0 s"];
const ROW_B = [MAC.B, "2", "PC B", "0 s"];
const ROW_C = [MAC.C, "3", "PC C", "0 s"];

export const SWITCHING_STEPS: SwStep[] = [
  {
    id: "star",
    phase: "1 · The LAN",
    scene: "diagram",
    mode: "switch",
    activePcs: ["A", "B", "C", "D"],
    tokens: [],
    table: [],
    en: {
      title: "Four PCs, one box in the middle",
      summary: "Devices in a wired LAN all plug into one central box. That box decides who receives each frame.",
      detail:
        "PC A, B, C and D are each connected by a cable to a port of the central device. On the local network devices talk with Ethernet frames addressed by MAC address. The central box can be a hub (old, dumb) or a switch (what you use today – your Wi-Fi router has a small switch inside). Let's see the difference.",
      term: { name: "Frame", meaning: "The unit of data on a local link. Its header carries the destination and source MAC addresses." },
    },
    hi: {
      title: "Chaar PCs, beech mein ek box",
      summary: "Wired LAN mein saare devices ek central box mein plug hote hain. Wahi box decide karta hai har frame kisko milega.",
      detail:
        "PC A, B, C aur D har ek cable se central device ke ek port se jude hain. Local network par devices Ethernet frames se baat karte hain jinpar MAC address hota hai. Central box hub (purana, bewakoof) ya switch (aaj wala – aapke Wi-Fi router ke andar bhi chhota switch hota hai) ho sakta hai. Dekhte hain fark kya hai.",
      term: { name: "Frame", meaning: "Local link par data ki unit. Iske header mein destination aur source MAC address hote hain." },
    },
  },
  {
    id: "hub",
    phase: "2 · Hub",
    scene: "diagram",
    mode: "hub",
    activePcs: ["A", "B", "C", "D"],
    tokens: [
      { id: "b", from: "center", to: "B", t: 0.52, label: "A→B", kind: "flood" },
      { id: "c", from: "center", to: "C", t: 0.52, label: "A→B", kind: "drop" },
      { id: "d", from: "center", to: "D", t: 0.52, label: "A→B", kind: "drop" },
    ],
    frame: { dst: MAC.B, src: MAC.A, decision: "" },
    table: [],
    en: {
      title: "A hub copies every frame to every port",
      summary: "A sends a frame to B. The hub repeats it out of all other ports – B, C and D all get a copy.",
      detail:
        "A hub works at the physical layer: it doesn't read MAC addresses at all, it just repeats electrical signals. B accepts the frame because the destination MAC is its own. C and D also receive it, check the destination MAC, see it isn't theirs and throw it away. It works, but it wastes bandwidth and anyone can quietly capture other people's traffic.",
      decision: "Hub can't read MACs → repeat to every port",
      analogy: "A teacher who reads every private note aloud to the whole class, and lets the right student keep it.",
    },
    hi: {
      title: "Hub har frame har port par copy karta hai",
      summary: "A, B ko frame bhejta hai. Hub use baaki saare ports par repeat karta hai – B, C aur D sabko copy milti hai.",
      detail:
        "Hub physical layer par kaam karta hai: MAC address padhta hi nahi, bas electrical signals repeat karta hai. B frame accept karta hai kyunki destination MAC uska hai. C aur D ko bhi milta hai, woh destination MAC check karte hain, apna nahi hai toh phenk dete hain. Kaam chal jaata hai, par bandwidth waste hoti hai aur koi bhi chupchaap dusron ka traffic capture kar sakta hai.",
      decision: "Hub MAC nahi padh sakta → har port par repeat",
      analogy: "Ek teacher jo har private chit poori class ke saamne zor se padhta hai, phir sahi student ko de deta hai.",
    },
  },
  {
    id: "collision",
    phase: "3 · Hub problems",
    scene: "diagram",
    mode: "hub",
    activePcs: ["A", "D"],
    tokens: [
      { id: "a", from: "A", to: "center", t: 0.75, label: "A→B", kind: "crash" },
      { id: "d", from: "D", to: "center", t: 0.75, label: "D→C", kind: "crash" },
    ],
    table: [],
    en: {
      title: "Two senders at once → collision",
      summary: "All ports of a hub share one medium, so if A and D talk at the same moment their signals smash together.",
      detail:
        "A hub is one shared “wire”. Only one device can send at a time (half duplex). If two send together, the signals collide, both frames are ruined, and both devices must wait a random time and try again (this is CSMA/CD). The more devices you add, the more collisions and the slower everything gets. All hub ports form one collision domain.",
      points: ["Half duplex: send OR receive, not both", "One collision domain for all ports", "Bandwidth shared by everyone"],
      term: { name: "Collision domain", meaning: "A part of the network where two simultaneous transmissions destroy each other." },
    },
    hi: {
      title: "Ek saath do sender → collision",
      summary: "Hub ke saare ports ek hi medium share karte hain, isliye A aur D ek hi pal mein bolein toh signals takra jaate hain.",
      detail:
        "Hub ek shared “taar” hai. Ek time par ek hi device bhej sakta hai (half duplex). Do ek saath bhejein toh signals collide, dono frames kharab, aur dono ko random time ruk kar dobara try karna padta hai (yeh CSMA/CD hai). Jitne zyada devices, utne zyada collisions aur sab slow. Hub ke saare ports ek collision domain hote hain.",
      points: ["Half duplex: bhejo YA receive karo, dono nahi", "Saare ports ka ek collision domain", "Bandwidth sab mein bati hui"],
      term: { name: "Collision domain", meaning: "Network ka woh hissa jahan do ek-saath transmissions ek dusre ko barbaad kar dete hain." },
    },
  },
  {
    id: "learn-a",
    phase: "4 · Switch learns",
    scene: "diagram",
    mode: "switch",
    activePcs: ["A"],
    tokens: [{ id: "a", from: "A", to: "center", t: 0.52, label: "A→B", kind: "unicast" }],
    frame: { dst: MAC.B, src: MAC.A, decision: "" },
    table: [ROW_A],
    newRows: [0],
    en: {
      title: "A switch reads the SOURCE MAC and learns",
      summary: "The frame from A arrives on port 1, so the switch writes “00:…:0a is on port 1” in its MAC table.",
      detail:
        "Now replace the hub with a switch. A switch reads every frame's header. First it looks at the source MAC address and the port the frame came in on, and saves that pair in its MAC address table. It just learned where A lives without anyone configuring anything. This is called MAC learning.",
      decision: "Learn: source 00:…:0a → port 1",
      remember: "A switch LEARNS from the source MAC and FORWARDS using the destination MAC.",
    },
    hi: {
      title: "Switch SOURCE MAC padh kar seekhta hai",
      summary: "A ka frame port 1 par aaya, toh switch MAC table mein likhta hai “00:…:0a port 1 par hai”.",
      detail:
        "Ab hub ki jagah switch lagao. Switch har frame ka header padhta hai. Pehle source MAC aur jis port se frame aaya woh dekhta hai, aur yeh pair MAC address table mein save karta hai. Bina kisi configuration ke usne seekh liya ki A kahan hai. Ise MAC learning kehte hain.",
      decision: "Seekho: source 00:…:0a → port 1",
      remember: "Switch source MAC se SEEKHTA hai aur destination MAC se FORWARD karta hai.",
    },
  },
  {
    id: "flood",
    phase: "5 · Unknown → flood",
    scene: "diagram",
    mode: "switch",
    activePcs: ["A", "B", "C", "D"],
    tokens: [
      { id: "b", from: "center", to: "B", t: 0.52, label: "A→B", kind: "flood" },
      { id: "c", from: "center", to: "C", t: 0.52, label: "A→B", kind: "drop" },
      { id: "d", from: "center", to: "D", t: 0.52, label: "A→B", kind: "drop" },
    ],
    frame: { dst: MAC.B, src: MAC.A, decision: "" },
    table: [ROW_A],
    en: {
      title: "Destination not in the table yet → flood",
      summary: "The switch doesn't know where B is, so this one time it sends the frame out of every port except port 1.",
      detail:
        "Next the switch looks up the destination MAC (B) in its table. It isn't there yet – the switch has never seen a frame from B. So it floods: sends a copy out of every port except the one it came in on. B accepts it; C and D drop it. This looks like a hub, but it only happens for unknown destinations, and only until the switch learns.",
      decision: "Destination 00:…:0b unknown → flood (ports 2, 3, 4)",
      term: { name: "Unknown unicast flooding", meaning: "Sending a frame out of all ports because the destination MAC isn't in the table yet." },
    },
    hi: {
      title: "Destination abhi table mein nahi → flood",
      summary: "Switch ko B ka pata nahi, isliye sirf is baar frame port 1 ko chhod kar har port par bhejta hai.",
      detail:
        "Ab switch destination MAC (B) table mein dhoondhta hai. Abhi nahi hai – switch ne B ka koi frame dekha hi nahi. Isliye flood karta hai: jis port se aaya usko chhod kar har port par copy. B accept karta hai; C aur D drop karte hain. Hub jaisa lagta hai, par yeh sirf unknown destination ke liye hota hai, aur sirf tab tak jab tak switch seekh na le.",
      decision: "Destination 00:…:0b unknown → flood (ports 2, 3, 4)",
      term: { name: "Unknown unicast flooding", meaning: "Frame ko saare ports par bhejna kyunki destination MAC abhi table mein nahi hai." },
    },
  },
  {
    id: "learn-b",
    phase: "6 · Reply",
    scene: "diagram",
    mode: "switch",
    activePcs: ["A", "B"],
    tokens: [{ id: "a", from: "center", to: "A", t: 0.52, label: "B→A", kind: "unicast" }],
    frame: { dst: MAC.A, src: MAC.B, decision: "" },
    table: [ROW_A, ROW_B],
    newRows: [1],
    hotRows: [0],
    en: {
      title: "B replies: learn B, forward only to A",
      summary: "From the reply the switch learns B is on port 2, and since it knows A is on port 1 it sends the frame only there.",
      detail:
        "B answers A. The frame enters on port 2, so the switch learns “00:…:0b is on port 2”. Then it looks up the destination – A – and finds port 1 in the table. It forwards the frame out of port 1 only. C and D see nothing. After just two frames the switch knows exactly where A and B are.",
      decision: "Learn B → port 2 · Destination A known → forward to port 1 only",
    },
    hi: {
      title: "B reply karta hai: B seekho, sirf A ko bhejo",
      summary: "Reply se switch seekhta hai B port 2 par hai, aur A port 1 par pata hai, toh frame sirf wahin bhejta hai.",
      detail:
        "B, A ko jawab deta hai. Frame port 2 par aata hai, toh switch seekhta hai “00:…:0b port 2 par hai”. Phir destination – A – dhoondhta hai aur table mein port 1 milta hai. Frame sirf port 1 par jaata hai. C aur D ko kuch nahi dikhta. Sirf do frames ke baad switch ko A aur B ki exact jagah pata hai.",
      decision: "B seekho → port 2 · Destination A pata hai → sirf port 1",
    },
  },
  {
    id: "forward",
    phase: "7 · Known → forward",
    scene: "diagram",
    mode: "switch",
    activePcs: ["A", "B", "C", "D"],
    tokens: [
      { id: "b", from: "center", to: "B", t: 0.52, label: "A→B", kind: "unicast" },
      { id: "d", from: "center", to: "D", t: 0.52, label: "C→D", kind: "unicast" },
    ],
    frame: { dst: MAC.B, src: MAC.A, decision: "" },
    table: [ROW_A, ROW_B, ROW_C],
    newRows: [2],
    hotRows: [1],
    en: {
      title: "Now every conversation is private – and parallel",
      summary: "A→B goes only to port 2 while C→D happens at the same moment. No copies, no collisions.",
      detail:
        "With a full table the switch forwards each frame out of exactly one port. Even better, a switch has a separate path for every port and every port is full duplex (send and receive together). So A can talk to B while C talks to D at the same time, each at full speed. Every switch port is its own collision domain – collisions basically disappear.",
      decision: "Destination B → port 2 · Destination D → port 4 (in parallel)",
      points: ["Full duplex on every port", "Each port = its own collision domain", "Other PCs don't see your frames"],
    },
    hi: {
      title: "Ab har baat private – aur ek saath",
      summary: "A→B sirf port 2 par jaata hai aur usi pal C→D bhi hota hai. Na copies, na collisions.",
      detail:
        "Bhari table ke saath switch har frame ko sirf ek port par bhejta hai. Aur behtar: switch mein har port ka alag raasta hota hai aur har port full duplex hai (bhejna aur lena ek saath). Isliye A, B se baat kar sakta hai jabki C, D se – ek hi time par, full speed. Har switch port apna collision domain hai – collisions lagbhag khatam.",
      decision: "Destination B → port 2 · Destination D → port 4 (ek saath)",
      points: ["Har port par full duplex", "Har port = apna collision domain", "Dusre PCs aapke frames nahi dekhte"],
    },
  },
  {
    id: "broadcast",
    phase: "8 · Broadcast",
    scene: "diagram",
    mode: "switch",
    activePcs: ["A", "B", "C", "D"],
    tokens: [
      { id: "b", from: "center", to: "B", t: 0.52, label: "ARP", kind: "broadcast" },
      { id: "c", from: "center", to: "C", t: 0.52, label: "ARP", kind: "broadcast" },
      { id: "d", from: "center", to: "D", t: 0.52, label: "ARP", kind: "broadcast" },
    ],
    frame: { dst: "ff:ff:ff:ff:ff:ff", src: MAC.A, decision: "" },
    table: [ROW_A, ROW_B, ROW_C],
    en: {
      title: "Broadcast frames still go everywhere",
      summary: "A frame to ff:ff:ff:ff:ff:ff (like an ARP request) is meant for everyone, so the switch floods it on purpose.",
      detail:
        "Some frames are addressed to the broadcast MAC ff:ff:ff:ff:ff:ff – ARP requests and DHCP Discovers, for example. The switch copies these to every port except the incoming one. So a switch splits collision domains, but all its ports are still one broadcast domain. To split broadcast domains you need a router or VLANs (next lesson).",
      decision: "Destination is broadcast → flood to all other ports",
      term: { name: "Broadcast domain", meaning: "The set of devices that receive each other's broadcasts. A router (or a VLAN) is its border." },
    },
    hi: {
      title: "Broadcast frames ab bhi har jagah jaate hain",
      summary: "ff:ff:ff:ff:ff:ff wala frame (jaise ARP request) sabke liye hai, isliye switch jaan-boojh kar flood karta hai.",
      detail:
        "Kuch frames broadcast MAC ff:ff:ff:ff:ff:ff par hote hain – jaise ARP requests aur DHCP Discover. Switch inhe aane wale port ko chhod kar har port par copy karta hai. Yaani switch collision domains todta hai, par uske saare ports ab bhi ek broadcast domain hain. Broadcast domain todne ke liye router ya VLAN chahiye (agla lesson).",
      decision: "Destination broadcast hai → baaki saare ports par flood",
      term: { name: "Broadcast domain", meaning: "Devices ka group jo ek dusre ke broadcast receive karte hain. Router (ya VLAN) iski boundary hai." },
    },
  },
  {
    id: "aging",
    phase: "9 · Aging",
    scene: "diagram",
    mode: "switch",
    activePcs: [],
    tokens: [],
    table: [
      [MAC.A, "1", "PC A", "12 s"],
      [MAC.B, "2", "PC B", "40 s"],
      [MAC.C, "3", "PC C", "300 s → removed"],
    ],
    hotRows: [2],
    en: {
      title: "Entries expire – the table keeps itself fresh",
      summary: "If a MAC address is silent for about 5 minutes, the switch forgets it.",
      detail:
        "Devices get unplugged, laptops move to another port, Wi-Fi clients leave. So each entry has an age timer that restarts every time a frame from that MAC arrives. If the timer reaches the aging time (300 seconds by default on many switches) the entry is deleted. If C moves to port 4, the next frame from C simply updates the entry to port 4.",
      remember: "No traffic for ~300 s → entry removed. A device moving ports → entry updated immediately.",
    },
    hi: {
      title: "Entries expire hoti hain – table khud fresh rehti hai",
      summary: "Agar koi MAC address lagbhag 5 minute chup rahe, switch use bhool jaata hai.",
      detail:
        "Devices unplug hote hain, laptop dusre port par chale jaate hain, Wi-Fi clients chale jaate hain. Isliye har entry ka age timer hota hai jo us MAC ka har frame aane par restart hota hai. Timer aging time (kai switches par default 300 second) tak pahunch jaaye toh entry delete. Agar C port 4 par chala jaaye, toh C ka agla frame entry ko port 4 kar deta hai.",
      remember: "~300 s koi traffic nahi → entry hatao. Device ne port badla → entry turant update.",
    },
  },
  {
    id: "compare",
    phase: "10 · Compare",
    scene: "cards",
    mode: "switch",
    activePcs: [],
    tokens: [],
    table: [],
    en: {
      title: "Hub vs Switch vs Router",
      summary: "Hub repeats bits, switch forwards frames by MAC inside a LAN, router forwards packets by IP between networks.",
      detail:
        "These three are often confused. Remember which address each one reads and where it works. Your home Wi-Fi “router” is actually a router + switch + Wi-Fi access point + DHCP server in one box.",
      cards: [
        { icon: "📣", name: "Hub · Layer 1", text: "Reads nothing. Repeats signals to all ports. One collision domain. Obsolete." },
        { icon: "🔀", name: "Switch · Layer 2", text: "Reads MAC addresses. Learns a MAC table. Forwards frames inside one LAN. Floods broadcasts." },
        { icon: "📡", name: "Router · Layer 3", text: "Reads IP addresses. Uses a routing table. Connects different networks and stops broadcasts." },
      ],
      remember: "Switch = same network (MAC). Router = different networks (IP).",
    },
    hi: {
      title: "Hub vs Switch vs Router",
      summary: "Hub bits repeat karta hai, switch LAN ke andar MAC se frames bhejta hai, router networks ke beech IP se packets bhejta hai.",
      detail:
        "Teeno mein aksar confusion hota hai. Yaad rakho kaun sa address kaun padhta hai aur kahan kaam karta hai. Aapka ghar ka Wi-Fi “router” asal mein router + switch + Wi-Fi access point + DHCP server ek hi box mein hai.",
      cards: [
        { icon: "📣", name: "Hub · Layer 1", text: "Kuch nahi padhta. Signals saare ports par repeat. Ek collision domain. Ab use nahi hota." },
        { icon: "🔀", name: "Switch · Layer 2", text: "MAC address padhta hai. MAC table seekhta hai. Ek LAN ke andar frames bhejta hai. Broadcast flood karta hai." },
        { icon: "📡", name: "Router · Layer 3", text: "IP address padhta hai. Routing table use karta hai. Alag networks jodta hai aur broadcast rokta hai." },
      ],
      remember: "Switch = same network (MAC). Router = alag networks (IP).",
    },
  },
  {
    id: "see-it",
    phase: "11 · See it",
    scene: "diagram",
    mode: "switch",
    activePcs: ["A", "B", "C"],
    tokens: [],
    table: [ROW_A, ROW_B, ROW_C],
    terminal: [
      "# On a managed (Cisco-style) switch",
      "Switch# show mac address-table",
      "Vlan  Mac Address        Type     Ports",
      "   1  001a.2b3c.4d0a     DYNAMIC  Gi0/1",
      "   1  001a.2b3c.4d0b     DYNAMIC  Gi0/2",
      "   1  001a.2b3c.4d0c     DYNAMIC  Gi0/3",
      "",
      "# On your own PC – the closest thing is the ARP cache",
      "> arp -a",
    ],
    en: {
      title: "See a real MAC table",
      summary: "Managed switches show their table with one command; DYNAMIC means learned automatically.",
      detail:
        "Office and college switches are “managed” and let you log in. show mac address-table lists every learned MAC with its port and VLAN. Cheap home switches are unmanaged – they still learn, they just don't let you look. On your own computer you can't see the switch's table, but arp -a shows the IP → MAC pairs your PC knows.",
      remember: "Switching = learn source MAC, look up destination MAC, forward / flood / filter.",
    },
    hi: {
      title: "Asli MAC table dekho",
      summary: "Managed switches ek command se table dikhate hain; DYNAMIC matlab automatically seekha.",
      detail:
        "Office aur college ke switches “managed” hote hain, unmein login kar sakte ho. show mac address-table har seekhe hue MAC ko uske port aur VLAN ke saath dikhata hai. Saste home switches unmanaged hote hain – seekhte toh hain, bas dikhate nahi. Apne computer par switch ki table nahi dikhegi, par arp -a aapke PC ke IP → MAC pairs dikhata hai.",
      remember: "Switching = source MAC seekho, destination MAC dhoondho, forward / flood / filter karo.",
    },
  },
];
