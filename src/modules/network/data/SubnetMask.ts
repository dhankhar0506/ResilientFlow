export type DeviceRoute = "self" | "direct" | "router";

export interface SubnetDevice {
  icon: string;
  name: string;
  ip: string;
  route?: DeviceRoute;
}

export interface SubnetSubject {
  /** Label shown above the AND table, e.g. "Laptop (own IP)" */
  label: string;
  ip: string;
}

export interface SubnetMaskStep {
  id: string;
  phase: string;
  /** Small caption above the visual, e.g. "192.168.1.0/24" */
  caption: string;
  devices?: SubnetDevice[];
  /** Subnet mask in dotted format. null = no mask on screen */
  mask: string | null;
  /** IP on which the mask is applied (bitwise AND). null = don't show the AND table */
  subject: SubnetSubject | null;
  /** Laptop's own IP. If set, the AND result of `subject` is compared with the laptop's own network */
  compareOwnIp?: string;
  en: { title: string; detail: string };
  hi: { title: string; detail: string };
}

export const SUBNET_LABELS = {
  en: {
    lessonTitle: "Subnet Mask",
    heroTitle: "How does a device know an IP is on its own network?",
    heroSubtitle: "See how the subnet mask and a bitwise AND decide: send directly, or go through the router.",
    devices: "Devices",
    routeSelf: "This device",
    routeDirect: "Direct",
    routeRouter: "Via router",
    ip: "IP",
    mask: "Mask",
    result: "AND result",
    networkBits: "Network bits (mask = 1)",
    hostBits: "Host bits (mask = 0)",
    andRule: "AND rule: 1&1 = 1 · 1&0 = 0 · 0&1 = 0 · 0&0 = 0",
    ownNetwork: "Laptop's network",
    targetNetwork: "Target's network",
    sameNetwork: "Same network → send directly, no router needed",
    differentNetwork: "Different network → send via the router",
    maskBits: "mask bits set to 1",
  },
  hi: {
    lessonTitle: "Subnet Mask",
    heroTitle: "Device ko kaise pata chalta hai ki IP uske apne network mein hai?",
    heroSubtitle: "Dekho subnet mask aur bitwise AND kaise decide karte hain: seedha bhejo, ya router se jao.",
    devices: "Devices",
    routeSelf: "Yeh device",
    routeDirect: "Seedha",
    routeRouter: "Router se",
    ip: "IP",
    mask: "Mask",
    result: "AND result",
    networkBits: "Network bits (mask = 1)",
    hostBits: "Host bits (mask = 0)",
    andRule: "AND rule: 1&1 = 1 · 1&0 = 0 · 0&1 = 0 · 0&0 = 0",
    ownNetwork: "Laptop ka network",
    targetNetwork: "Target ka network",
    sameNetwork: "Same network → seedha bhejo, router ki zaroorat nahi",
    differentNetwork: "Alag network → router ke through bhejo",
    maskBits: "mask bits 1 hain",
  },
} as const;

export const SUBNET_STEPS: SubnetMaskStep[] = [
  {
    id: "subnet-recap",
    phase: "Subnet",
    caption: "192.168.1.0/24",
    devices: [
      { icon: "📡", name: "Router", ip: "192.168.1.1" },
      { icon: "📲", name: "Tab", ip: "192.168.1.3" },
      { icon: "💻", name: "Laptop", ip: "192.168.1.4" },
    ],
    mask: null,
    subject: null,
    en: {
      title: "The CIDR range is also called a subnet",
      detail:
        "Last time we saw that the number after the slash tells how many bits of the IP are reserved for the network. With /24, the first three octets stay constant and the same for every device. This notation is also called the subnet — it represents your network. In other words, the subnet tells a device which network it belongs to.",
    },
    hi: {
      title: "CIDR range ko subnet bhi kehte hain",
      detail:
        "Pichhli video mein dekha tha ki slash ke baad ka number batata hai ki IP ke kitne bits network ke liye reserved hain. /24 mein pehle teen octets har device ke liye constant aur same rehte hain. Is notation ko subnet bhi kehte hain — yeh aapke network ko represent karta hai. Yaani subnet device ko batata hai ki woh kaun se network ka part hai.",
    },
  },
  {
    id: "why-subnet",
    phase: "Why it matters",
    caption: "192.168.1.0/24",
    devices: [
      { icon: "💻", name: "Laptop", ip: "192.168.1.4", route: "self" },
      { icon: "📱", name: "Mobile", ip: "192.168.1.5", route: "direct" },
      { icon: "📱", name: "Mobile", ip: "10.0.0.1", route: "router" },
    ],
    mask: null,
    subject: null,
    en: {
      title: "Same network or not?",
      detail:
        "If the mobile is in the same network as the laptop, the laptop can send data straight to it — no internet and no router needed. If the mobile is outside the network (say its IP is 10.0.0.1), the data has to go through the router, and mostly needs the internet too. So before sending, the laptop must know whether the IP it wants to reach is part of its own network. (How exactly the data travels through the router comes in a future video.)",
    },
    hi: {
      title: "Same network hai ya nahi?",
      detail:
        "Agar mobile laptop ke same network mein hai, toh laptop data seedha usko bhej sakta hai — na internet chahiye, na router. Agar mobile network ke bahar hai (maan lo uska IP 10.0.0.1 hai), toh data router ke through jaana padega, aur zyada-tar internet bhi chahiye hoga. Isliye bhejne se pehle laptop ko pata hona chahiye ki jis IP tak pahunchna hai woh uske apne network ka part hai ya nahi. (Router ke through data exactly kaise travel karta hai, woh future video mein.)",
    },
  },
  {
    id: "what-is-mask",
    phase: "Subnet mask",
    caption: "255.255.255.0",
    mask: "255.255.255.0",
    subject: null,
    en: {
      title: "The subnet mask is the tool for this check",
      detail:
        "By default the laptop doesn't know whether the mobile is in its network — it uses a subnet mask to find out. A subnet mask looks like an IP address but isn't used as one; it's only used to decide if the IP you want to reach is part of your own network. In binary, 255 is eight 1s, so 255.255.255.0 is 24 ones followed by 8 zeros — the same information as /24.",
    },
    hi: {
      title: "Yeh check karne ka tool hai subnet mask",
      detail:
        "Laptop ko by default nahi pata hota ki mobile uske network mein hai ya nahi — yeh pata karne ke liye woh subnet mask use karta hai. Subnet mask dikhne mein IP jaisa hota hai, lekin IP ki tarah use nahi hota; woh sirf yeh decide karne ke kaam aata hai ki jis IP tak pahunchna hai woh aapke apne network ka part hai ya nahi. Binary mein 255 matlab aath 1s, toh 255.255.255.0 matlab 24 ones ke baad 8 zeros — wahi information jo /24 deta hai.",
    },
  },
  {
    id: "and-own",
    phase: "AND on own IP",
    caption: "Step 1: find my own network",
    mask: "255.255.255.0",
    subject: { label: "Laptop (own IP)", ip: "192.168.1.4" },
    en: {
      title: "First, the laptop applies the mask to its own IP",
      detail:
        "Computers only understand 1s and 0s, so the laptop works in binary. It takes its own IP and applies the mask using a bitwise AND. Anything ANDed with 1 stays the same; anything ANDed with 0 becomes 0. So the first three octets survive and the last octet becomes 0. The result is 192.168.1.0 — the network IP, the first IP of the subnet.",
    },
    hi: {
      title: "Pehle laptop apne IP pe mask apply karta hai",
      detail:
        "Computers sirf 1 aur 0 samajhte hain, isliye laptop binary mein kaam karta hai. Woh apna IP leta hai aur us pe bitwise AND se mask apply karta hai. Kisi bhi bit ko 1 ke saath AND karo toh woh same rehta hai; 0 ke saath AND karo toh woh 0 ho jaata hai. Toh pehle teen octets bache rehte hain aur last octet 0 ho jaata hai. Result hai 192.168.1.0 — network IP, yaani subnet ka first IP.",
    },
  },
  {
    id: "and-same",
    phase: "Same network",
    caption: "Step 2: check the target IP",
    mask: "255.255.255.0",
    subject: { label: "Mobile (target IP)", ip: "192.168.1.5" },
    compareOwnIp: "192.168.1.4",
    en: {
      title: "Apply the same mask to the mobile's IP",
      detail:
        "The laptop knows the mobile's IP, so it converts it to binary and applies the same mask. The first three octets stay 192.168.1 (mask = 1) and the last octet becomes 0. The result matches the laptop's own network IP, so both devices are in the same network. The laptop can now send the data directly — without a router and even without the internet.",
    },
    hi: {
      title: "Wahi mask mobile ke IP pe lagao",
      detail:
        "Laptop ko mobile ka IP pata hai, toh woh use binary mein convert karke wahi mask apply karta hai. Pehle teen octets 192.168.1 hi rehte hain (mask = 1) aur last octet 0 ho jaata hai. Result laptop ke apne network IP se match karta hai, matlab dono devices same network mein hain. Ab laptop data seedha bhej sakta hai — router ke bina aur internet ke bina bhi.",
    },
  },
  {
    id: "and-diff",
    phase: "Different network",
    caption: "Step 2: check the target IP",
    mask: "255.255.255.0",
    subject: { label: "Mobile (target IP)", ip: "10.0.0.1" },
    compareOwnIp: "192.168.1.4",
    en: {
      title: "What if the mobile is outside the network?",
      detail:
        "Now the mobile's IP is 10.0.0.1. After the same AND with the mask, the result is 10.0.0.0, which is not equal to the laptop's network 192.168.1.0. So the two are not in the same network, and the laptop has to send the data through the router — and mostly needs an internet connection too.",
    },
    hi: {
      title: "Agar mobile network ke bahar ho toh?",
      detail:
        "Ab mobile ka IP 10.0.0.1 hai. Mask ke saath wahi AND karne par result 10.0.0.0 aata hai, jo laptop ke network 192.168.1.0 ke barabar nahi hai. Matlab dono same network mein nahi hain, aur laptop ko data router ke through bhejna padega — aur zyada-tar internet connection bhi chahiye hoga.",
    },
  },
  {
    id: "mask-16",
    phase: "/16 mask",
    caption: "255.255.0.0 → /16",
    mask: "255.255.0.0",
    subject: { label: "Laptop (own IP)", ip: "192.168.1.4" },
    en: {
      title: "You may see 255.255.0.0 in Wi-Fi settings",
      detail:
        "Sometimes your Wi-Fi settings show a subnet mask like 255.255.0.0. That has 16 ones, so the subnet becomes /16: the first two octets are the network and the last two octets (16 bits) are for hosts. Applying it to 192.168.1.4 gives 192.168.0.0 — the same pattern you saw in the last video.",
    },
    hi: {
      title: "Wi-Fi settings mein 255.255.0.0 bhi dikh sakta hai",
      detail:
        "Kabhi-kabhi aapki Wi-Fi settings mein subnet mask 255.255.0.0 jaisa dikhta hai. Isme 16 ones hain, toh subnet /16 ban jaata hai: pehle do octets network hain aur last do octets (16 bits) hosts ke liye. Isse 192.168.1.4 pe apply karne par 192.168.0.0 milta hai — wahi pattern jo pichhli video mein dekha tha.",
    },
  },
  {
    id: "why-it-matters",
    phase: "Real use",
    caption: "Same subnet = fewer hops",
    devices: [
      { icon: "🖥️", name: "Node.js server", ip: "192.168.1.10", route: "self" },
      { icon: "🗄️", name: "Postgres (same subnet)", ip: "192.168.1.20", route: "direct" },
      { icon: "🗄️", name: "Postgres (outside)", ip: "10.0.0.5", route: "router" },
    ],
    mask: null,
    subject: null,
    en: {
      title: "Why developers should care",
      detail:
        "You rarely touch subnets directly, but your machines use them constantly. If your Postgres DB is in the same subnet as your Node.js server, queries go straight to it and the response comes straight back — fewer hops, lower latency. If the DB is outside the network, both the query and the response travel through routers, hop by hop. That's why it's often advisable to keep such services in the same subnet.",
    },
    hi: {
      title: "Developer ko yeh kyun samajhna chahiye",
      detail:
        "Aap subnets ko directly kam hi chhuoge, lekin aapki machines unhe constantly use karti hain. Agar aapka Postgres DB Node.js server ke same subnet mein hai, toh query seedha DB tak jaati hai aur response seedha wapas aata hai — kam hops, kam latency. Agar DB network ke bahar hai, toh query aur response dono routers ke through hop-by-hop travel karte hain. Isliye aise services ko aksar same subnet mein rakhna advisable hota hai.",
    },
  },
];