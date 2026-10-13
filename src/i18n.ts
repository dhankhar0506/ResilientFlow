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
    nextLesson: "Next lesson",
    lessonsHeading: "Lessons",
    networkingTitle: "Networking",
    networkingSubtitle: "Pick a lesson to start. Every lesson is a short step-by-step visual walkthrough.",
    switchToLight: "Switch to light",
    switchToDark: "Switch to dark",
    openLessons: "Show lessons",
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
      "Concepts ko step by step samjho — visual explanations aur interactive simulations ke saath, sirf definitions nahi.",
    categoriesHeading: "Explore karne ke liye ek topic chuno",
    stepLabel: "Step",
    of: "ka",
    previous: "Peeche",
    restart: "Phir se shuru",
    next: "Agla step",
    nextLesson: "Agla lesson",
    lessonsHeading: "Lessons",
    networkingTitle: "Networking",
    networkingSubtitle: "Shuru karne ke liye ek lesson chuno. Har lesson ek chhota step-by-step visual walkthrough hai.",
    switchToLight: "Light mode lagao",
    switchToDark: "Dark mode lagao",
    openLessons: "Lessons dikhao",
  },
} as const;

export const CATEGORIES = [
  {
    id: "networking",
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
  { id: "subnetting", icon: "✂️", available: true, label: "Subnetting" },
  {
    id: "default-gateway",
    icon: "🚪",
    available: true,
    label: "Default Gateway",
  },
  { id: "dhcp", icon: "📨", available: true, label: "DHCP (automatic IP)" },
  {
    id: "mac-address",
    icon: "🏷️",
    available: true,
    label: "MAC Address Basics",
  },
  { id: "switching", icon: "🔀", available: true, label: "Hub vs Switch" },
  { id: "vlan", icon: "🏢", available: true, label: "VLANs" },
  {
    id: "arp",
    icon: "🔄",
    available: true,
    label: "Address Resolution Protocol (ARP)",
  },
  { id: "osi", icon: "🧱", available: true, label: "OSI & TCP/IP layers" },
  { id: "ports", icon: "🔌", available: true, label: "Ports & Sockets" },
  { id: "tcp", icon: "🤝", available: true, label: "TCP handshake & reliability" },
  { id: "udp", icon: "⚡", available: true, label: "TCP vs UDP" },
  { id: "icmp", icon: "📡", available: true, label: "Ping & Traceroute (ICMP)" },
  {
    id: "routing",
    icon: "🌐",
    available: true,
    label: "Routing in Networks",
  },
  {
    id: "nat",
    icon: "🔀",
    available: true,
    label: "Network Address Translation (NAT)",
  },
  { id: "ipv6", icon: "6️⃣", available: true, label: "IPv6" },
  { id: "dns", icon: "🔎", available: true, label: "DNS lookup" },
  { id: "tls", icon: "🔒", available: true, label: "HTTPS & TLS" },
  { id: "firewall", icon: "🧱", available: true, label: "Firewalls" },
  { id: "lb-cdn", icon: "⚖️", available: true, label: "Proxy, Load Balancer & CDN" },
];

export type NetworkLesson = (typeof NETWORK_LESSONS)[number];

export const MORE_TOPICS = [
  { icon: "💻", label: "Computer Fundamentals" },
  { icon: "⚙️", label: "Operating Systems" },
  { icon: "🧩", label: "Programming & Runtime" },
  { icon: "🕸️", label: "Web & Browser" },
  { icon: "🛠️", label: "Backend & APIs" },
  { icon: "🗄️", label: "Databases" },
  { icon: "☁️", label: "Cloud & DevOps" },
];
