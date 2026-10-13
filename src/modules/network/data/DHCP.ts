import type { StepText } from "../../../shared/lessonParts";

export type DhcpNode = "laptop" | "switch" | "server" | "phone";
export type DhcpScene = "diagram" | "cards";

export interface DhcpPacket {
  id: string;
  /** [from, to, t] – drawn t of the way from `from` to `to` */
  at: [DhcpNode, DhcpNode, number];
  label: string;
  broadcast?: boolean;
  /** phone ignores it */
  ignored?: boolean;
}

export interface DhcpFields {
  type: string;
  srcMac: string;
  dstMac: string;
  src: string;
  dst: string;
  inside: string;
}

export interface DhcpConfig {
  ip?: string;
  mask?: string;
  gateway?: string;
  dns?: string;
  lease?: string;
}

export interface DhcpStep {
  id: string;
  phase: string;
  scene: DhcpScene;
  active: DhcpNode[];
  packets: DhcpPacket[];
  fields?: DhcpFields;
  config: DhcpConfig;
  configHot?: boolean;
  /** rows: [ip, mac, device, lease] */
  leases: string[][];
  leaseHot?: number[];
  terminal?: string[];
  en: StepText & { cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { cards?: { name: string; text: string; icon?: string }[] };
}

export const DHCP_LABELS = {
  en: {
    lessonTitle: "DHCP",
    heroTitle: "DHCP: how your device gets an IP address automatically",
    heroSubtitle:
      "Follow the four DORA messages – Discover, Offer, Request, Acknowledge – and watch the laptop's network settings fill in.",
    laptop: "New laptop",
    switch: "Switch",
    server: "Router + DHCP server",
    phone: "Phone",
    lan: "Home LAN · 192.168.1.0/24",
    packet: "Packet at this step",
    type: "DHCP message",
    srcMac: "Source MAC",
    dstMac: "Destination MAC",
    src: "Source IP:port",
    dst: "Destination IP:port",
    inside: "What it says",
    config: "Laptop's network settings",
    ip: "IP address",
    mask: "Subnet mask",
    gateway: "Default gateway",
    dns: "DNS server",
    lease: "Lease",
    leases: "DHCP server's lease table",
    leasesHint: "The server remembers which IP it lent to which MAC address, and until when.",
    colIp: "IP",
    colMac: "MAC",
    colDevice: "Device",
    colLease: "Lease",
    empty: "No leases yet.",
    ignored: "ignored",
  },
  hi: {
    lessonTitle: "DHCP",
    heroTitle: "DHCP: aapke device ko IP address automatically kaise milta hai",
    heroSubtitle:
      "Chaar DORA messages follow karo – Discover, Offer, Request, Acknowledge – aur dekho laptop ki network settings kaise bharti hain.",
    laptop: "Naya laptop",
    switch: "Switch",
    server: "Router + DHCP server",
    phone: "Phone",
    lan: "Home LAN · 192.168.1.0/24",
    packet: "Is step ka packet",
    type: "DHCP message",
    srcMac: "Source MAC",
    dstMac: "Destination MAC",
    src: "Source IP:port",
    dst: "Destination IP:port",
    inside: "Andar kya likha hai",
    config: "Laptop ki network settings",
    ip: "IP address",
    mask: "Subnet mask",
    gateway: "Default gateway",
    dns: "DNS server",
    lease: "Lease",
    leases: "DHCP server ki lease table",
    leasesHint: "Server yaad rakhta hai kaunsa IP kis MAC ko kab tak ke liye diya.",
    colIp: "IP",
    colMac: "MAC",
    colDevice: "Device",
    colLease: "Lease",
    empty: "Abhi koi lease nahi.",
    ignored: "ignore",
  },
} as const;

const LAPTOP_MAC = "a4:5e:60:11:22:33";
const SERVER_MAC = "d8:07:b6:aa:bb:01";
const BCAST_MAC = "ff:ff:ff:ff:ff:ff";
const PHONE_ROW = ["192.168.1.20", "3c:28:6d:44:55:66", "Phone", "18 h left"];
const PRINTER_ROW = ["192.168.1.50", "00:1b:a9:77:88:99", "Printer", "reserved"];
const FULL_CONFIG: DhcpConfig = {
  ip: "192.168.1.23",
  mask: "255.255.255.0",
  gateway: "192.168.1.1",
  dns: "192.168.1.1",
  lease: "24 h",
};

export const DHCP_STEPS: DhcpStep[] = [
  {
    id: "problem",
    phase: "1 · Problem",
    scene: "diagram",
    active: ["laptop"],
    packets: [],
    config: { ip: "0.0.0.0" },
    leases: [PHONE_ROW],
    en: {
      title: "A new laptop joins the Wi-Fi with no IP address",
      summary: "To talk on the network the laptop needs an IP, a mask, a gateway and a DNS server – but it has none.",
      detail:
        "You just typed the Wi-Fi password. The laptop is now physically connected, but its IP address is 0.0.0.0, which means “I don't have one yet”. It doesn't know the network's subnet, the router's address or which DNS server to use. Typing all of this by hand on every phone, laptop and TV would be painful and error-prone. DHCP does it automatically.",
      analogy: "Checking into a hotel: you arrive with luggage but no room. The reception desk gives you a room number, the Wi-Fi password and the breakfast time.",
      term: { name: "DHCP", meaning: "Dynamic Host Configuration Protocol – a server hands out IP settings to devices automatically." },
    },
    hi: {
      title: "Naya laptop Wi-Fi join karta hai, bina IP address ke",
      summary: "Network par baat karne ke liye laptop ko IP, mask, gateway aur DNS server chahiye – par uske paas kuch nahi hai.",
      detail:
        "Aapne abhi Wi-Fi password daala. Laptop physically connected hai, par uska IP 0.0.0.0 hai, matlab “abhi mere paas IP nahi”. Use network ka subnet, router ka address ya DNS server kuch nahi pata. Har phone, laptop, TV par yeh sab haath se type karna mushkil aur galti wala kaam hai. DHCP yeh automatically karta hai.",
      analogy: "Hotel check-in: aap samaan lekar aate ho par room nahi hai. Reception aapko room number, Wi-Fi password aur breakfast ka time deta hai.",
      term: { name: "DHCP", meaning: "Dynamic Host Configuration Protocol – ek server devices ko automatically IP settings deta hai." },
    },
  },
  {
    id: "what",
    phase: "2 · What it gives",
    scene: "cards",
    active: [],
    packets: [],
    config: {},
    leases: [],
    en: {
      title: "What does DHCP give a device?",
      summary: "Four settings plus a time limit, called a lease.",
      detail:
        "The DHCP server (in a home this is built into the Wi-Fi router) owns a pool of addresses, for example 192.168.1.2 – 192.168.1.254. It lends one address to each device, together with the other settings the device needs.",
      cards: [
        { icon: "🔢", name: "IP address", text: "Your device's own address, e.g. 192.168.1.23." },
        { icon: "🎭", name: "Subnet mask", text: "Which addresses are local, e.g. 255.255.255.0." },
        { icon: "🚪", name: "Default gateway", text: "Where to send traffic for other networks – the router." },
        { icon: "🔎", name: "DNS server", text: "Who turns names like google.com into IP addresses." },
        { icon: "⏳", name: "Lease time", text: "How long the device may keep the IP, e.g. 24 hours." },
      ],
      remember: "DHCP does not give you internet. It gives you the settings you need to reach it.",
    },
    hi: {
      title: "DHCP device ko kya deta hai?",
      summary: "Chaar settings aur ek time limit, jise lease kehte hain.",
      detail:
        "DHCP server (ghar mein yeh Wi-Fi router ke andar hi hota hai) ke paas addresses ka ek pool hota hai, jaise 192.168.1.2 – 192.168.1.254. Woh har device ko ek address udhaar deta hai, saath mein baaki zaroori settings bhi.",
      cards: [
        { icon: "🔢", name: "IP address", text: "Device ka apna address, jaise 192.168.1.23." },
        { icon: "🎭", name: "Subnet mask", text: "Kaunse addresses local hain, jaise 255.255.255.0." },
        { icon: "🚪", name: "Default gateway", text: "Dusre networks ka traffic kahan bhejna – router." },
        { icon: "🔎", name: "DNS server", text: "Kaun google.com jaise naam ko IP mein badalta hai." },
        { icon: "⏳", name: "Lease time", text: "Device kitni der IP rakh sakta hai, jaise 24 ghante." },
      ],
      remember: "DHCP internet nahi deta. Woh sirf settings deta hai jinse internet tak pahunch sako.",
    },
  },
  {
    id: "discover",
    phase: "3 · D = Discover",
    scene: "diagram",
    active: ["laptop", "switch", "server", "phone"],
    packets: [
      { id: "a", at: ["switch", "server", 0.5], label: "DISCOVER", broadcast: true },
      { id: "b", at: ["switch", "phone", 0.45], label: "DISCOVER", broadcast: true, ignored: true },
    ],
    fields: {
      type: "DHCPDISCOVER",
      srcMac: LAPTOP_MAC,
      dstMac: BCAST_MAC,
      src: "0.0.0.0:68",
      dst: "255.255.255.255:67",
      inside: "“Is there any DHCP server? I need an IP.”",
    },
    config: { ip: "0.0.0.0" },
    leases: [PHONE_ROW],
    en: {
      title: "Discover: the laptop shouts “Is there a DHCP server?”",
      summary: "The laptop doesn't know who the server is, so it broadcasts to everyone.",
      detail:
        "With no IP of its own and no idea where the server is, the laptop sends a broadcast: source IP 0.0.0.0, destination 255.255.255.255, destination MAC ff:ff:ff:ff:ff:ff. The switch floods it to every port. The phone receives it too, but it is not a DHCP server, so it simply ignores it. DHCP runs over UDP: clients use port 68, servers listen on port 67.",
      points: ["0.0.0.0 = “I have no address yet”", "255.255.255.255 = “everyone on this LAN”", "UDP port 67 = server, 68 = client"],
    },
    hi: {
      title: "Discover: laptop chillata hai “Koi DHCP server hai?”",
      summary: "Laptop ko nahi pata server kaun hai, isliye woh sabko broadcast karta hai.",
      detail:
        "Na apna IP, na server ka pata – isliye laptop broadcast bhejta hai: source IP 0.0.0.0, destination 255.255.255.255, destination MAC ff:ff:ff:ff:ff:ff. Switch ise har port par bhej deta hai. Phone ko bhi milta hai, par woh DHCP server nahi hai, isliye ignore kar deta hai. DHCP UDP par chalta hai: client port 68, server port 67.",
      points: ["0.0.0.0 = “mere paas abhi address nahi”", "255.255.255.255 = “is LAN par sab”", "UDP port 67 = server, 68 = client"],
    },
  },
  {
    id: "offer",
    phase: "4 · O = Offer",
    scene: "diagram",
    active: ["server", "switch", "laptop"],
    packets: [{ id: "a", at: ["switch", "laptop", 0.45], label: "OFFER" }],
    fields: {
      type: "DHCPOFFER",
      srcMac: SERVER_MAC,
      dstMac: `${BCAST_MAC} (or ${LAPTOP_MAC})`,
      src: "192.168.1.1:67",
      dst: "255.255.255.255:68",
      inside: "“You can have 192.168.1.23 for 24 h. Mask /24, gateway & DNS 192.168.1.1.”",
    },
    config: { ip: "0.0.0.0" },
    leases: [PHONE_ROW, ["192.168.1.23", LAPTOP_MAC, "Laptop", "offered"]],
    leaseHot: [1],
    en: {
      title: "Offer: the server proposes an address",
      summary: "The DHCP server picks a free IP from its pool and offers it, with all the other settings.",
      detail:
        "The server sees the laptop's MAC address in the Discover, picks a free address (192.168.1.23) and reserves it for a moment. It replies with an Offer that contains the IP, the subnet mask, the gateway, the DNS server and the lease time. Because the laptop still has no IP, the reply is usually broadcast (or sent straight to the laptop's MAC).",
      remember: "An offer is only a proposal. Nothing is final yet.",
    },
    hi: {
      title: "Offer: server ek address propose karta hai",
      summary: "DHCP server pool se ek free IP chunkar baaki settings ke saath offer karta hai.",
      detail:
        "Server Discover mein laptop ka MAC dekhta hai, ek free address (192.168.1.23) chunta hai aur thodi der ke liye rok leta hai. Woh Offer bhejta hai jismein IP, subnet mask, gateway, DNS server aur lease time hota hai. Laptop ke paas abhi IP nahi hai, isliye reply aksar broadcast hota hai (ya seedha laptop ke MAC par).",
      remember: "Offer sirf ek proposal hai. Abhi kuch final nahi hua.",
    },
  },
  {
    id: "request",
    phase: "5 · R = Request",
    scene: "diagram",
    active: ["laptop", "switch", "server", "phone"],
    packets: [
      { id: "a", at: ["switch", "server", 0.5], label: "REQUEST", broadcast: true },
      { id: "b", at: ["switch", "phone", 0.45], label: "REQUEST", broadcast: true, ignored: true },
    ],
    fields: {
      type: "DHCPREQUEST",
      srcMac: LAPTOP_MAC,
      dstMac: BCAST_MAC,
      src: "0.0.0.0:68",
      dst: "255.255.255.255:67",
      inside: "“I accept 192.168.1.23 from server 192.168.1.1.”",
    },
    config: { ip: "0.0.0.0" },
    leases: [PHONE_ROW, ["192.168.1.23", LAPTOP_MAC, "Laptop", "offered"]],
    leaseHot: [1],
    en: {
      title: "Request: the laptop says “Yes, I'll take it”",
      summary: "The laptop formally asks for the offered IP – again as a broadcast.",
      detail:
        "Why broadcast again? A network can have more than one DHCP server, and several may have sent offers. By broadcasting “I accept 192.168.1.23 from server 192.168.1.1”, every server hears the decision: the chosen one prepares the lease, the others put their offered addresses back in their pools.",
    },
    hi: {
      title: "Request: laptop kehta hai “Haan, yeh le leta hoon”",
      summary: "Laptop offer kiya hua IP officially maangta hai – phir se broadcast mein.",
      detail:
        "Dobara broadcast kyun? Network mein ek se zyada DHCP server ho sakte hain aur kai ne offer bheja ho sakta hai. “Main server 192.168.1.1 ka 192.168.1.23 le raha hoon” broadcast karne se har server ko faisla pata chal jaata hai: chuna gaya server lease tayyar karta hai, baaki apne offered addresses wapas pool mein daal dete hain.",
    },
  },
  {
    id: "ack",
    phase: "6 · A = Acknowledge",
    scene: "diagram",
    active: ["server", "switch", "laptop"],
    packets: [{ id: "a", at: ["switch", "laptop", 0.45], label: "ACK" }],
    fields: {
      type: "DHCPACK",
      srcMac: SERVER_MAC,
      dstMac: `${BCAST_MAC} (or ${LAPTOP_MAC})`,
      src: "192.168.1.1:67",
      dst: "255.255.255.255:68",
      inside: "“Confirmed. 192.168.1.23 is yours for 24 h.”",
    },
    config: FULL_CONFIG,
    configHot: true,
    leases: [PHONE_ROW, ["192.168.1.23", LAPTOP_MAC, "Laptop", "24 h left"]],
    leaseHot: [1],
    en: {
      title: "Acknowledge: the server confirms – the laptop is configured",
      summary: "After the ACK the laptop applies the IP, mask, gateway and DNS and can start using the network.",
      detail:
        "The server records the lease (IP ↔ MAC ↔ expiry time) and sends the ACK. The laptop now configures its interface. Many systems first send a quick ARP check to make sure no other device is already using 192.168.1.23. From this moment the laptop can reach the router, resolve names and browse the internet.",
      remember: "DORA = Discover → Offer → Request → Acknowledge.",
    },
    hi: {
      title: "Acknowledge: server confirm karta hai – laptop configure ho gaya",
      summary: "ACK ke baad laptop IP, mask, gateway aur DNS laga leta hai aur network use kar sakta hai.",
      detail:
        "Server lease note karta hai (IP ↔ MAC ↔ expiry time) aur ACK bhejta hai. Ab laptop apna interface configure karta hai. Kai systems pehle ek chhota ARP check karte hain ki koi aur device 192.168.1.23 use toh nahi kar raha. Is pal se laptop router tak pahunch sakta hai, naam resolve kar sakta hai aur internet chala sakta hai.",
      remember: "DORA = Discover → Offer → Request → Acknowledge.",
    },
  },
  {
    id: "renew",
    phase: "7 · Lease & renewal",
    scene: "diagram",
    active: ["laptop", "switch", "server"],
    packets: [{ id: "a", at: ["switch", "server", 0.5], label: "RENEW" }],
    fields: {
      type: "DHCPREQUEST (renew)",
      srcMac: LAPTOP_MAC,
      dstMac: SERVER_MAC,
      src: "192.168.1.23:68",
      dst: "192.168.1.1:67",
      inside: "“Can I keep 192.168.1.23 a bit longer?”",
    },
    config: { ...FULL_CONFIG, lease: "12 h left → renew" },
    leases: [PHONE_ROW, ["192.168.1.23", LAPTOP_MAC, "Laptop", "renewed: 24 h"]],
    leaseHot: [1],
    en: {
      title: "The lease runs out, so the laptop renews it early",
      summary: "At half the lease time the laptop asks the same server – directly, not by broadcast – to extend it.",
      detail:
        "An IP is only lent, not given forever. With a 24-hour lease the laptop tries to renew after 12 hours (called T1) by sending a unicast Request straight to 192.168.1.1. The server replies with an ACK and the clock restarts. If the server doesn't answer, the laptop tries again later; at 87.5 % (T2) it broadcasts to any DHCP server. If the lease fully expires the laptop must stop using the IP and start DORA again.",
      points: ["T1 = 50 % of lease → renew with the same server (unicast)", "T2 = 87.5 % → rebind with any server (broadcast)", "Expired → stop using the IP, start over"],
      analogy: "Renting a library book: before the due date you ask to extend it. If you forget, you have to return it.",
    },
    hi: {
      title: "Lease khatam hone se pehle laptop renew karta hai",
      summary: "Aadha lease time hone par laptop usi server se – broadcast nahi, seedha – time badhane ko kehta hai.",
      detail:
        "IP sirf udhaar milta hai, hamesha ke liye nahi. 24 ghante ki lease mein laptop 12 ghante baad (T1) seedha 192.168.1.1 ko unicast Request bhejkar renew karta hai. Server ACK deta hai aur ghadi phir se shuru. Server jawab na de toh laptop baad mein phir try karta hai; 87.5 % (T2) par kisi bhi DHCP server ko broadcast karta hai. Lease poori khatam ho jaaye toh laptop ko IP chhodna padta hai aur DORA phir se.",
      points: ["T1 = lease ka 50 % → usi server se renew (unicast)", "T2 = 87.5 % → kisi bhi server se rebind (broadcast)", "Expire → IP use karna band, phir se shuru"],
      analogy: "Library ki kitaab: due date se pehle extend karwa lo. Bhool gaye toh wapas karni padegi.",
    },
  },
  {
    id: "reservation",
    phase: "8 · Reservation",
    scene: "diagram",
    active: ["server"],
    packets: [],
    config: FULL_CONFIG,
    leases: [PHONE_ROW, ["192.168.1.23", LAPTOP_MAC, "Laptop", "24 h left"], PRINTER_ROW],
    leaseHot: [2],
    en: {
      title: "Reservations: the same IP every time",
      summary: "You can tell the DHCP server to always give one MAC address the same IP.",
      detail:
        "Normally a device may get a different IP next week. That is fine for phones, but bad for a printer or a home server that others must find. In the router settings you can add a DHCP reservation: “MAC 00:1b:a9:77:88:99 always gets 192.168.1.50”. The device still uses DHCP, but the answer never changes. The alternative – typing a static IP on the device itself – works too, but you must pick an address outside the DHCP pool to avoid conflicts.",
      term: { name: "DHCP reservation", meaning: "A fixed IP tied to one MAC address inside the DHCP server (also called static lease)." },
      remember: "Two devices with the same IP = IP conflict. Keep static IPs outside the DHCP pool.",
    },
    hi: {
      title: "Reservation: har baar wahi IP",
      summary: "DHCP server ko bol sakte ho ki ek MAC address ko hamesha wahi IP de.",
      detail:
        "Aam taur par agle hafte device ko alag IP mil sakta hai. Phone ke liye theek hai, par printer ya home server ke liye nahi jise dusre dhoondhte hain. Router settings mein DHCP reservation add kar sakte ho: “MAC 00:1b:a9:77:88:99 ko hamesha 192.168.1.50”. Device DHCP hi use karta hai, par jawab kabhi nahi badalta. Doosra tareeka – device par khud static IP likhna – bhi chalta hai, par address DHCP pool ke bahar chuno warna conflict hoga.",
      term: { name: "DHCP reservation", meaning: "DHCP server mein ek MAC address se juda fixed IP (static lease bhi kehte hain)." },
      remember: "Do devices ka same IP = IP conflict. Static IP ko DHCP pool ke bahar rakho.",
    },
  },
  {
    id: "relay",
    phase: "9 · Big networks",
    scene: "cards",
    active: [],
    packets: [],
    config: {},
    leases: [],
    en: {
      title: "Big networks: DHCP relay",
      summary: "Broadcasts don't cross routers, so a relay forwards DHCP messages to a central server.",
      detail:
        "In a college or company there are many subnets but often just one central DHCP server. A Discover broadcast in the Lab subnet would never reach it, because routers do not forward broadcasts. So the router of each subnet acts as a DHCP relay agent: it catches the broadcast and forwards it as a normal unicast packet to the server, adding which subnet it came from. The server then picks an address from the right pool.",
      cards: [
        { icon: "🧪", name: "Lab subnet", text: "Laptop broadcasts DISCOVER." },
        { icon: "📡", name: "Router (relay agent)", text: "Catches it and forwards it as unicast to 10.0.0.5, noting “from 192.168.10.0/24”." },
        { icon: "🗄️", name: "Central DHCP server", text: "Offers an IP from the Lab pool, sent back through the relay." },
      ],
      term: { name: "DHCP relay (ip helper)", meaning: "A router feature that forwards DHCP broadcasts to a DHCP server on another subnet." },
    },
    hi: {
      title: "Bade networks: DHCP relay",
      summary: "Broadcast router cross nahi karte, isliye relay DHCP messages ko central server tak bhejta hai.",
      detail:
        "College ya company mein bahut subnets hote hain par aksar ek hi central DHCP server. Lab subnet ka Discover broadcast wahan tak kabhi nahi pahunchega, kyunki router broadcast forward nahi karte. Isliye har subnet ka router DHCP relay agent banta hai: broadcast pakadta hai aur normal unicast packet bana kar server ko bhejta hai, saath mein likhta hai kis subnet se aaya. Server sahi pool se address deta hai.",
      cards: [
        { icon: "🧪", name: "Lab subnet", text: "Laptop DISCOVER broadcast karta hai." },
        { icon: "📡", name: "Router (relay agent)", text: "Pakad kar 10.0.0.5 ko unicast bhejta hai, likhta hai “192.168.10.0/24 se”." },
        { icon: "🗄️", name: "Central DHCP server", text: "Lab pool se IP offer karta hai, relay ke through wapas." },
      ],
      term: { name: "DHCP relay (ip helper)", meaning: "Router ka feature jo DHCP broadcast ko dusre subnet ke DHCP server tak forward karta hai." },
    },
  },
  {
    id: "see-it",
    phase: "10 · See it",
    scene: "diagram",
    active: ["laptop"],
    packets: [],
    config: FULL_CONFIG,
    leases: [PHONE_ROW, ["192.168.1.23", LAPTOP_MAC, "Laptop", "24 h left"], PRINTER_ROW],
    terminal: [
      "# Windows",
      "> ipconfig /all",
      "   DHCP Enabled. . . . . . . : Yes",
      "   IPv4 Address. . . . . . . : 192.168.1.23(Preferred)",
      "   Lease Obtained. . . . . . : Tuesday 10:00",
      "   DHCP Server . . . . . . . : 192.168.1.1",
      "> ipconfig /release    # give the IP back",
      "> ipconfig /renew      # run DORA again",
      "",
      "# Linux / macOS",
      "$ sudo dhclient -r && sudo dhclient     # Linux",
      "$ ipconfig getpacket en0                 # macOS",
    ],
    en: {
      title: "See DHCP on your own computer",
      summary: "ipconfig /all shows the DHCP server and lease; /release and /renew replay DORA.",
      detail:
        "Open a terminal and look at your own lease. If something is wrong – for example your IP starts with 169.254 – your device asked for DHCP but nobody answered, so it gave itself a temporary link-local address. Running release and renew asks again. In Wireshark, the filter dhcp (or bootp in older versions) shows all four DORA packets.",
      remember: "IP 169.254.x.x = DHCP failed. Check the cable/Wi-Fi or the router.",
    },
    hi: {
      title: "Apne computer par DHCP dekho",
      summary: "ipconfig /all DHCP server aur lease dikhata hai; /release aur /renew DORA dobara chalate hain.",
      detail:
        "Terminal kholo aur apni lease dekho. Agar kuch galat hai – jaise IP 169.254 se shuru ho raha hai – toh device ne DHCP maanga par kisi ne jawab nahi diya, isliye usne khud ko temporary link-local address de diya. Release aur renew chalane se phir se maangta hai. Wireshark mein filter dhcp (purane versions mein bootp) chaaron DORA packets dikhata hai.",
      remember: "IP 169.254.x.x = DHCP fail hua. Cable/Wi-Fi ya router check karo.",
    },
  },
];
