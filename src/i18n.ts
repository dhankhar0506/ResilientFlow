export type Lang = "en" | "hi";

export const UI = {
  en: {
    appName: "ResilientFlow",
    tagline: "Visual computer & software learning",
    navOverview: "Overview",
    navNetworking: "Networking",
    navMore: "More topics",
    dashboard: "Dashboard",
    available: "Available",
    comingSoon: "Coming soon",
    heroTitle: "Learn how computers & software actually work",
    heroSubtitle:
      "Explore concepts step by step with visual explanations and interactive simulations — not just definitions.",
    categoriesHeading: "Pick a topic to explore",
    stepLabel: "Step",
    of: "of",
    previous: "Previous",
    restart: "Restart",
    next: "Next step",
  },
  hi: {
    appName: "ResilientFlow",
    tagline: "Computer aur software ko visually samjho",
    navOverview: "Overview",
    navNetworking: "Networking",
    navMore: "Aur topics",
    dashboard: "Dashboard",
    available: "Available hai",
    comingSoon: "Jald aayega",
    heroTitle: "Jaano computer aur software asal mein kaise kaam karte hain",
    heroSubtitle:
      "Ek React frontend aapke laptop se ek Node.js backend ko AWS pe call karta hai. Request jis-jis layer se guzarti hai woh dekho, aur response wapas aate hue follow karo.",
    categoriesHeading: "Explore karne ke liye ek topic chuno",
    stepLabel: "Step",
    of: "ka",
    previous: "Peeche",
    restart: "Phir se shuru",
    next: "Agla step",
  },
} as const;

export const CATEGORIES = [
  {
    id: "http",
    icon: "🌐",
    available: true,
    title: { en: "Networking", hi: "Networking" },
    desc: {
      en: "Understand how devices communicate, route data, and access the internet.",
      hi: "Samjho ki devices kaise baat karte hain, data route karte hain, aur internet access karte hain.",
    },
  },
  {
    id: "computer",
    icon: "💻",
    available: false,
    title: { en: "Computer Fundamentals", hi: "Computer Fundamentals" },
    desc: {
      en: "CPU, memory, binary, storage, processes, and how a computer runs programs.",
      hi: "CPU, memory, binary, storage, processes, aur computer programs kaise chalata hai.",
    },
  },
  {
    id: "os",
    icon: "⚙️",
    available: false,
    title: { en: "Operating Systems", hi: "Operating Systems" },
    desc: {
      en: "Processes, threads, scheduling, memory, filesystems, and Linux.",
      hi: "Processes, threads, scheduling, memory, filesystems, aur Linux.",
    },
  },
  {
    id: "programming",
    icon: "🧩",
    available: false,
    title: { en: "Programming & Runtime", hi: "Programming & Runtime" },
    desc: {
      en: "How code is compiled or interpreted, runtime engines, APIs, and debugging.",
      hi: "Code compile ya interpret kaise hota hai, runtime engines, APIs, aur debugging.",
    },
  },
  {
    id: "web",
    icon: "🕸️",
    available: false,
    title: { en: "Web & Browser", hi: "Web & Browser" },
    desc: {
      en: "Browsers, HTTP, frontend rendering, servers, cookies, and sessions.",
      hi: "Browsers, HTTP, frontend rendering, servers, cookies, aur sessions.",
    },
  },
  {
    id: "backend",
    icon: "🛠️",
    available: false,
    title: { en: "Backend & APIs", hi: "Backend & APIs" },
    desc: {
      en: "Requests, authentication, REST APIs, queues, caching, and WebSockets.",
      hi: "Requests, authentication, REST APIs, queues, caching, aur WebSockets.",
    },
  },
  {
    id: "database",
    icon: "🗄️",
    available: false,
    title: { en: "Databases", hi: "Databases" },
    desc: {
      en: "SQL, NoSQL, indexes, transactions, replication, and query execution.",
      hi: "SQL, NoSQL, indexes, transactions, replication, aur query execution.",
    },
  },
  {
    id: "cloud",
    icon: "☁️",
    available: false,
    title: { en: "Cloud & DevOps", hi: "Cloud & DevOps" },
    desc: {
      en: "Servers, Docker, CI/CD, load balancers, monitoring, and deployment.",
      hi: "Servers, Docker, CI/CD, load balancers, monitoring, aur deployment.",
    },
  },
];


export const NETWORK_LESSONS = [
  { id: "definitions", icon: "📚", available: true, label: "Networking definitions" },
  { id: "http", icon: "🌐", available: true, label: "HTTP Request" },
  { id: "ip-structure", icon: "🔢", available: true, label: "IP address structure" },
  { id: "host-cidr", icon: "🧮", available: true, label: "Network, Host & CIDR" },
  { id: "subnet", icon: "🎭", available: true, label: "Subnet mask" },
  {
    id: "default-gateway",
    icon: "🚪",
    available: true,
    label: "Default Gateway",
  },
  {
    id: "mac-address",
    icon: "🏷️",
    available: true,
    label: "MAC Address Basics",
  },
  {
    id: "arp",
    icon: "🔄",
    available: true,
    label: "Address Resolution Protocol (ARP)",
  },
  { id: "osi", icon: "🧱", available: true, label: "OSI & TCP/IP layers" },
  {
    id: "routing",
    icon: "🌐",
    available: true,
    label: "Routing in Networks",
  },
  { id: "DNSLookup", icon: "🔎", available: true, label: "DNS lookup" },
  { id: "packet", icon: "📦", available: false, label: "Packet journey" },
  { id: "arp", icon: "🏷️", available: false, label: "ARP & MAC addresses" },
  { id: "tcp", icon: "🤝", available: false, label: "TCP · TLS · HTTP" },
  { id: "subnet", icon: "🧮", available: false, label: "IP & subnetting" },
];
