import type { StepText } from "../../../shared/lessonParts";

export type VlanNode = "S1" | "D1" | "S2" | "D2" | "SW1" | "SW2" | "R";
export type VlanScene = "diagram" | "cards";

export interface VlanToken {
  id: string;
  from: VlanNode;
  to: VlanNode;
  t: number;
  label?: string;
  vlan?: 10 | 20;
  blocked?: boolean;
  /** horizontal nudge so two tokens on one link don't overlap */
  dx?: number;
}

export interface VlanStep {
  id: string;
  phase: string;
  scene: VlanScene;
  /** colour the PCs by VLAN? (false = one flat LAN) */
  vlans: boolean;
  showRouter: boolean;
  tokens: VlanToken[];
  /** show the 802.1Q frame bar; "tagged" highlights the tag */
  frame?: "untagged" | "tagged";
  /** port table rows: [switch port, connected to, mode, vlan] */
  ports?: string[][];
  hotPorts?: number[];
  terminal?: string[];
  en: StepText & { cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { cards?: { name: string; text: string; icon?: string }[] };
}

export const VLAN_LABELS = {
  en: {
    lessonTitle: "VLANs",
    heroTitle: "VLANs: many separate networks on the same switches",
    heroSubtitle:
      "See how a VLAN splits one physical switch into separate broadcast domains, how tags carry VLANs across a trunk, and how traffic moves between VLANs.",
    sales: "Sales",
    dev: "Dev",
    router: "Router",
    flat: "One flat LAN – everyone together",
    vlan10: "VLAN 10 · Sales · 10.10.10.0/24",
    vlan20: "VLAN 20 · Dev · 10.20.20.0/24",
    trunk: "trunk (802.1Q)",
    frame: "Ethernet frame",
    frameHint: "On a trunk link the switch inserts a 4-byte 802.1Q tag that carries the VLAN ID.",
    ports: "Switch port configuration",
    colPort: "Port",
    colTo: "Connected to",
    colMode: "Mode",
    colVlan: "VLAN",
    blocked: "can't cross",
  },
  hi: {
    lessonTitle: "VLANs",
    heroTitle: "VLANs: same switches par kai alag networks",
    heroSubtitle:
      "Dekho VLAN ek physical switch ko alag broadcast domains mein kaise baantta hai, trunk par tags VLAN kaise le jaate hain, aur VLANs ke beech traffic kaise jaata hai.",
    sales: "Sales",
    dev: "Dev",
    router: "Router",
    flat: "Ek flat LAN – sab ek saath",
    vlan10: "VLAN 10 · Sales · 10.10.10.0/24",
    vlan20: "VLAN 20 · Dev · 10.20.20.0/24",
    trunk: "trunk (802.1Q)",
    frame: "Ethernet frame",
    frameHint: "Trunk link par switch 4-byte ka 802.1Q tag daalta hai jismein VLAN ID hoti hai.",
    ports: "Switch port configuration",
    colPort: "Port",
    colTo: "Kisse juda",
    colMode: "Mode",
    colVlan: "VLAN",
    blocked: "cross nahi kar sakta",
  },
} as const;

const PORTS: string[][] = [
  ["SW1 Gi0/1", "Sales PC 1", "access", "10"],
  ["SW1 Gi0/2", "Dev PC 1", "access", "20"],
  ["SW1 Gi0/24", "SW2", "trunk", "10, 20"],
  ["SW2 Gi0/1", "Sales PC 2", "access", "10"],
  ["SW2 Gi0/2", "Dev PC 2", "access", "20"],
];

export const VLAN_STEPS: VlanStep[] = [
  {
    id: "problem",
    phase: "1 · Problem",
    scene: "diagram",
    vlans: false,
    showRouter: false,
    tokens: [
      { id: "a", from: "SW1", to: "D1", t: 0.5, label: "broadcast" },
      { id: "b", from: "SW1", to: "SW2", t: 0.5, label: "broadcast" },
      { id: "c", from: "SW2", to: "S2", t: 0.5, label: "broadcast" },
      { id: "d", from: "SW2", to: "D2", t: 0.5, label: "broadcast" },
    ],
    en: {
      title: "Sales and Dev share one big LAN",
      summary: "Every broadcast from a Sales PC reaches every Dev PC too – and nothing stops Sales from reaching Dev's servers.",
      detail:
        "The office has two switches connected together. Sales and Dev people sit on both floors, so their PCs are mixed across both switches. Without VLANs all four PCs are in one broadcast domain: one ARP or DHCP broadcast reaches everyone. As the office grows this becomes noisy and insecure. Buying separate switches for every team (and re-cabling every time someone changes desk) is expensive.",
      analogy: "One open-plan office where every announcement is heard by every department.",
    },
    hi: {
      title: "Sales aur Dev ek bada LAN share karte hain",
      summary: "Sales PC ka har broadcast har Dev PC tak bhi jaata hai – aur Sales ko Dev ke servers tak pahunchne se kuch nahi rokta.",
      detail:
        "Office mein do switches jude hue hain. Sales aur Dev ke log dono floors par baithte hain, isliye unke PCs dono switches par mixed hain. VLAN ke bina chaaron PCs ek broadcast domain mein hain: ek ARP ya DHCP broadcast sabtak jaata hai. Office badhne par yeh shor aur insecure ho jaata hai. Har team ke liye alag switch kharidna (aur desk badalne par har baar cable badalna) mehenga hai.",
      analogy: "Ek open-plan office jahan har announcement har department sunta hai.",
    },
  },
  {
    id: "idea",
    phase: "2 · The idea",
    scene: "diagram",
    vlans: true,
    showRouter: false,
    tokens: [],
    ports: PORTS,
    hotPorts: [0, 1, 3, 4],
    en: {
      title: "A VLAN is a virtual LAN inside the switch",
      summary: "You tell the switch: these ports are VLAN 10 (Sales), those ports are VLAN 20 (Dev).",
      detail:
        "A VLAN (Virtual LAN) groups switch ports into a separate network, even though they are on the same physical switch. Each VLAN has a number (1–4094) and normally its own IP subnet: Sales 10.10.10.0/24, Dev 10.20.20.0/24. The switch now behaves as if it were several independent switches. Moving someone to another team is just a config change on their port – no new cables.",
      term: { name: "VLAN", meaning: "Virtual LAN – a logical group of switch ports that forms its own broadcast domain." },
      remember: "One VLAN = one broadcast domain = (usually) one IP subnet.",
    },
    hi: {
      title: "VLAN switch ke andar ek virtual LAN hai",
      summary: "Aap switch ko batate ho: yeh ports VLAN 10 (Sales), woh ports VLAN 20 (Dev).",
      detail:
        "VLAN (Virtual LAN) switch ports ko ek alag network mein group karta hai, chahe woh same physical switch par hon. Har VLAN ka number hota hai (1–4094) aur aam taur par apna IP subnet: Sales 10.10.10.0/24, Dev 10.20.20.0/24. Ab switch aise behave karta hai jaise kai alag switches hon. Kisi ko dusri team mein bhejna bas uske port ka config change hai – nayi cable nahi.",
      term: { name: "VLAN", meaning: "Virtual LAN – switch ports ka logical group jo apna broadcast domain banata hai." },
      remember: "Ek VLAN = ek broadcast domain = (aam taur par) ek IP subnet.",
    },
  },
  {
    id: "broadcast",
    phase: "3 · Broadcast stays in",
    scene: "diagram",
    vlans: true,
    showRouter: false,
    tokens: [
      { id: "b", from: "SW1", to: "SW2", t: 0.5, label: "VLAN 10", vlan: 10 },
      { id: "c", from: "SW2", to: "S2", t: 0.5, label: "broadcast", vlan: 10 },
    ],
    en: {
      title: "A Sales broadcast reaches only Sales",
      summary: "Sales PC 1 broadcasts. The switch floods it only to ports in VLAN 10 – the Dev PCs never see it.",
      detail:
        "When a frame enters an access port in VLAN 10, the switch remembers “this frame belongs to VLAN 10”. It will flood it, forward it and learn MAC addresses only inside VLAN 10. Dev PC 1, sitting on the same switch, receives nothing. That is how VLANs cut broadcast noise and isolate teams.",
    },
    hi: {
      title: "Sales ka broadcast sirf Sales tak",
      summary: "Sales PC 1 broadcast karta hai. Switch use sirf VLAN 10 ke ports par flood karta hai – Dev PCs ko dikhta hi nahi.",
      detail:
        "Jab frame VLAN 10 ke access port par aata hai, switch yaad rakhta hai “yeh frame VLAN 10 ka hai”. Woh flood, forward aur MAC learning sirf VLAN 10 ke andar karega. Usi switch par baitha Dev PC 1 ko kuch nahi milta. Aise hi VLAN broadcast shor kam karte hain aur teams ko alag karte hain.",
    },
  },
  {
    id: "trunk",
    phase: "4 · Trunk & tag",
    scene: "diagram",
    vlans: true,
    showRouter: false,
    tokens: [{ id: "b", from: "SW1", to: "SW2", t: 0.5, label: "tag: VLAN 10", vlan: 10 }],
    frame: "tagged",
    en: {
      title: "Between switches: one trunk link, frames get a tag",
      summary: "The link between SW1 and SW2 carries all VLANs. Each frame gets an 802.1Q tag saying which VLAN it belongs to.",
      detail:
        "You don't want one cable per VLAN between switches. So the link between them is a trunk: it carries frames of many VLANs. SW1 inserts a 4-byte 802.1Q tag into each frame it sends on the trunk. The tag contains a 12-bit VLAN ID (that's why the maximum is 4094). SW2 reads the tag, knows the frame is VLAN 10, removes the tag and delivers it only to VLAN 10 ports.",
      points: ["Access port: one VLAN, frames untagged (PCs don't know about VLANs)", "Trunk port: many VLANs, frames tagged", "VLAN ID is 12 bits → 1 to 4094 usable"],
      term: { name: "802.1Q", meaning: "The IEEE standard for VLAN tagging on Ethernet trunk links." },
    },
    hi: {
      title: "Switches ke beech: ek trunk link, frames par tag",
      summary: "SW1 aur SW2 ka link saare VLANs le jaata hai. Har frame par 802.1Q tag lagta hai jo batata hai woh kis VLAN ka hai.",
      detail:
        "Switches ke beech har VLAN ke liye alag cable nahi chahiye. Isliye unke beech ka link trunk hota hai: kai VLANs ke frames le jaata hai. SW1 trunk par bheje har frame mein 4-byte ka 802.1Q tag daalta hai. Tag mein 12-bit VLAN ID hoti hai (isliye maximum 4094). SW2 tag padhta hai, samajhta hai frame VLAN 10 ka hai, tag hatata hai aur sirf VLAN 10 ports par deta hai.",
      points: ["Access port: ek VLAN, frames bina tag (PCs ko VLAN ka pata nahi)", "Trunk port: kai VLANs, frames tagged", "VLAN ID 12 bits → 1 se 4094 usable"],
      term: { name: "802.1Q", meaning: "Ethernet trunk links par VLAN tagging ka IEEE standard." },
    },
  },
  {
    id: "ports",
    phase: "5 · Access vs trunk",
    scene: "diagram",
    vlans: true,
    showRouter: false,
    tokens: [],
    ports: PORTS,
    hotPorts: [2],
    frame: "untagged",
    en: {
      title: "Access ports vs trunk ports",
      summary: "Ports to PCs are access ports (one VLAN, no tag). Ports between switches/routers are trunks (many VLANs, tagged).",
      detail:
        "Look at the port table. Every PC port is an access port in exactly one VLAN – the PC sends normal, untagged frames and has no idea VLANs exist. The SW1–SW2 link is a trunk allowing VLANs 10 and 20. One VLAN on a trunk can be sent untagged; that is called the native VLAN (VLAN 1 by default). Mismatched native VLANs on two ends are a classic misconfiguration.",
      term: { name: "Native VLAN", meaning: "The one VLAN whose frames travel untagged on a trunk (default VLAN 1)." },
    },
    hi: {
      title: "Access ports vs trunk ports",
      summary: "PCs wale ports access ports hain (ek VLAN, tag nahi). Switches/routers ke beech wale trunk hain (kai VLANs, tagged).",
      detail:
        "Port table dekho. Har PC port ek access port hai jo theek ek VLAN mein hai – PC normal untagged frames bhejta hai aur use VLAN ka pata hi nahi. SW1–SW2 link trunk hai jismein VLAN 10 aur 20 allowed hain. Trunk par ek VLAN bina tag ke bhi ja sakta hai; use native VLAN kehte hain (default VLAN 1). Dono ends par alag native VLAN hona ek common galti hai.",
      term: { name: "Native VLAN", meaning: "Woh ek VLAN jiske frames trunk par bina tag jaate hain (default VLAN 1)." },
    },
  },
  {
    id: "isolated",
    phase: "6 · Isolated",
    scene: "diagram",
    vlans: true,
    showRouter: false,
    tokens: [{ id: "a", from: "S1", to: "SW1", t: 0.85, label: "Sales→Dev ✗", vlan: 10, blocked: true }],
    en: {
      title: "Sales PC 1 can't reach Dev PC 1 – even on the same switch",
      summary: "Different VLAN = different network. The switch will never forward a VLAN 10 frame to a VLAN 20 port.",
      detail:
        "Sales PC 1 (10.10.10.11) wants to open a file on Dev PC 1 (10.20.20.11). They're plugged into the same switch, but in different VLANs and different subnets. A switch only forwards frames inside a VLAN, so the traffic has nowhere to go. To cross between VLANs you need a Layer 3 device – a router or a Layer 3 switch.",
      remember: "Switch (Layer 2) = inside a VLAN. Router (Layer 3) = between VLANs.",
    },
    hi: {
      title: "Sales PC 1, Dev PC 1 tak nahi pahunch sakta – same switch par bhi",
      summary: "Alag VLAN = alag network. Switch VLAN 10 ka frame kabhi VLAN 20 port par nahi bhejega.",
      detail:
        "Sales PC 1 (10.10.10.11) Dev PC 1 (10.20.20.11) par file kholna chahta hai. Dono same switch mein plugged hain, par alag VLANs aur alag subnets mein. Switch sirf VLAN ke andar frames bhejta hai, toh traffic ke paas koi raasta nahi. VLANs ke beech jaane ke liye Layer 3 device chahiye – router ya Layer 3 switch.",
      remember: "Switch (Layer 2) = VLAN ke andar. Router (Layer 3) = VLANs ke beech.",
    },
  },
  {
    id: "routing",
    phase: "7 · Inter-VLAN routing",
    scene: "diagram",
    vlans: true,
    showRouter: true,
    tokens: [
      { id: "a", from: "SW1", to: "R", t: 0.5, label: "tag 10 ↑", vlan: 10, dx: -48 },
      { id: "b", from: "R", to: "SW1", t: 0.5, label: "tag 20 ↓", vlan: 20, dx: 48 },
    ],
    ports: [...PORTS, ["SW1 Gi0/23", "Router", "trunk", "10, 20"]],
    hotPorts: [5],
    en: {
      title: "Inter-VLAN routing: “router on a stick”",
      summary: "One trunk to a router. The frame goes up tagged VLAN 10 and comes back down tagged VLAN 20.",
      detail:
        "The router has one physical cable to SW1 configured as a trunk, split into two sub-interfaces: Gi0/0.10 = 10.10.10.1 (gateway of Sales) and Gi0/0.20 = 10.20.20.1 (gateway of Dev). Sales PC 1 sends to its default gateway. The frame travels to the router tagged 10; the router routes it (and can apply firewall rules), then sends it back on the same cable tagged 20. SW1 delivers it to Dev PC 1.",
      points: ["Sales gateway: 10.10.10.1 (sub-interface .10)", "Dev gateway: 10.20.20.1 (sub-interface .20)", "Routing is where you allow or block traffic between teams"],
      term: { name: "Router on a stick", meaning: "Inter-VLAN routing using one trunk link and sub-interfaces on a router." },
    },
    hi: {
      title: "Inter-VLAN routing: “router on a stick”",
      summary: "Router tak ek trunk. Frame VLAN 10 tag ke saath upar jaata hai aur VLAN 20 tag ke saath wapas aata hai.",
      detail:
        "Router ki SW1 tak ek physical cable hai jo trunk hai, aur do sub-interfaces mein bati hai: Gi0/0.10 = 10.10.10.1 (Sales ka gateway) aur Gi0/0.20 = 10.20.20.1 (Dev ka gateway). Sales PC 1 apne default gateway ko bhejta hai. Frame tag 10 ke saath router tak jaata hai; router use route karta hai (aur firewall rules laga sakta hai), phir usi cable par tag 20 ke saath wapas bhejta hai. SW1 use Dev PC 1 tak pahunchata hai.",
      points: ["Sales gateway: 10.10.10.1 (sub-interface .10)", "Dev gateway: 10.20.20.1 (sub-interface .20)", "Teams ke beech traffic allow/block yahin hota hai"],
      term: { name: "Router on a stick", meaning: "Ek trunk link aur router ke sub-interfaces se inter-VLAN routing." },
    },
  },
  {
    id: "benefits",
    phase: "8 · Why VLANs",
    scene: "cards",
    vlans: true,
    showRouter: false,
    tokens: [],
    en: {
      title: "Why every office and college uses VLANs",
      summary: "Smaller broadcast domains, real security boundaries, and flexibility without re-cabling.",
      detail:
        "Bigger networks often use a Layer 3 switch instead of a router-on-a-stick: it does the inter-VLAN routing inside the switch at full speed using SVIs (interface vlan 10, interface vlan 20). Common VLAN plans:",
      cards: [
        { icon: "🧑‍💼", name: "Staff / Students", text: "Separate VLANs so students can't reach staff systems." },
        { icon: "📞", name: "Voice VLAN", text: "IP phones get their own VLAN with priority for call quality." },
        { icon: "📷", name: "CCTV / IoT", text: "Cameras and smart devices isolated from laptops." },
        { icon: "🛜", name: "Guest Wi-Fi", text: "Guests get internet only – no access to internal servers." },
      ],
      remember: "VLANs separate traffic logically; a router or firewall decides what may cross.",
    },
    hi: {
      title: "Har office aur college VLAN kyun use karta hai",
      summary: "Chhote broadcast domains, asli security boundary, aur bina cable badle flexibility.",
      detail:
        "Bade networks mein router-on-a-stick ki jagah aksar Layer 3 switch hota hai: woh SVIs (interface vlan 10, interface vlan 20) se switch ke andar hi full speed par inter-VLAN routing karta hai. Common VLAN plans:",
      cards: [
        { icon: "🧑‍💼", name: "Staff / Students", text: "Alag VLANs taaki students staff systems tak na pahunchein." },
        { icon: "📞", name: "Voice VLAN", text: "IP phones ka apna VLAN, call quality ke liye priority." },
        { icon: "📷", name: "CCTV / IoT", text: "Cameras aur smart devices laptops se alag." },
        { icon: "🛜", name: "Guest Wi-Fi", text: "Guests ko sirf internet – internal servers tak nahi." },
      ],
      remember: "VLAN traffic ko logically alag karte hain; router ya firewall decide karta hai kya cross kar sakta hai.",
    },
  },
  {
    id: "config",
    phase: "9 · Config",
    scene: "diagram",
    vlans: true,
    showRouter: true,
    tokens: [],
    ports: [...PORTS, ["SW1 Gi0/23", "Router", "trunk", "10, 20"]],
    terminal: [
      "SW1(config)# vlan 10",
      "SW1(config-vlan)# name SALES",
      "SW1(config)# vlan 20",
      "SW1(config-vlan)# name DEV",
      "SW1(config)# interface gi0/1",
      "SW1(config-if)# switchport mode access",
      "SW1(config-if)# switchport access vlan 10",
      "SW1(config)# interface gi0/24",
      "SW1(config-if)# switchport mode trunk",
      "SW1(config-if)# switchport trunk allowed vlan 10,20",
      "SW1# show vlan brief",
    ],
    en: {
      title: "What the configuration looks like",
      summary: "Create the VLANs, put PC ports in access mode, and make the switch-to-switch link a trunk.",
      detail:
        "This is Cisco-style syntax, which you will see in most networking courses and exams; other vendors use different words for the same ideas. show vlan brief lists every VLAN and its ports – the first thing to check when “my PC got the wrong IP” (it's probably in the wrong VLAN, so it's talking to the wrong DHCP scope).",
      remember: "Wrong VLAN on a port → wrong subnet → wrong IP / no access. Check the port first.",
    },
    hi: {
      title: "Configuration aisa dikhta hai",
      summary: "VLANs banao, PC ports ko access mode mein daalo, aur switch-to-switch link ko trunk banao.",
      detail:
        "Yeh Cisco-style syntax hai jo zyada tar networking courses aur exams mein dikhega; dusre vendors same ideas ke liye alag words use karte hain. show vlan brief har VLAN aur uske ports dikhata hai – jab “mere PC ko galat IP mila” tab sabse pehle yahi check karo (shayad woh galat VLAN mein hai, isliye galat DHCP scope se baat kar raha hai).",
      remember: "Port par galat VLAN → galat subnet → galat IP / access nahi. Pehle port check karo.",
    },
  },
];
