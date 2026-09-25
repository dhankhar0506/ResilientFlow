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
    lessonTitle: "HTTP Request & Response",
    lessonSubtitle: "Trace a browser request to a server and follow the response back.",
    stepLabel: "Step",
    of: "of",
    requestJourney: "Request journey",
    previous: "Previous",
    restart: "Restart",
    next: "Next step",
    dataLabel: "What's moving right now",
    tip: "This is a simplified model to build intuition. Real browsers and servers cache, reuse connections, and combine some of these steps.",
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
      "Har concept ko step-by-step, visual explanation aur interactive simulation ke saath samjho — sirf definitions nahi.",
    categoriesHeading: "Explore karne ke liye ek topic chuno",
    lessonTitle: "HTTP Request & Response",
    lessonSubtitle: "Browser ke request ko server tak follow karo, aur response wapas aate hue dekho.",
    stepLabel: "Step",
    of: "ka",
    requestJourney: "Request ka safar",
    previous: "Peeche",
    restart: "Phir se shuru",
    next: "Agla step",
    dataLabel: "Abhi kya data move ho raha hai",
    tip: "Yeh ek simplified model hai taaki intuition build ho. Real browsers aur servers kuch steps ko cache, reuse ya combine kar dete hain.",
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
  { id: "http", icon: "🌐", available: true, label: "HTTP Request & Response" },
  { id: "osi", icon: "🧱", available: false, label: "OSI & TCP/IP layers" },
  { id: "packet", icon: "📦", available: false, label: "Packet journey" },
  { id: "arp", icon: "🏷️", available: false, label: "ARP & MAC addresses" },
  { id: "dns", icon: "🔎", available: false, label: "DNS lookup" },
  { id: "tcp", icon: "🤝", available: false, label: "TCP · TLS · HTTP" },
  { id: "subnet", icon: "🧮", available: false, label: "IP & subnetting" },
];

export const NODES = [
  { icon: "💻", en: { title: "Browser", sub: "Your device" }, hi: { title: "Browser", sub: "Aapka device" } },
  {
    icon: "🌐",
    en: { title: "Network", sub: "DNS · TCP · TLS · IP" },
    hi: { title: "Network", sub: "DNS · TCP · TLS · IP" },
  },
  { icon: "🗄️", en: { title: "Server", sub: "Proxy · App" }, hi: { title: "Server", sub: "Proxy · App" } },
];

export const HTTP_STEPS = [
  {
    phase: "Browser",
    node: 0,
    packet: "https://api.example.com/users",
    en: {
      title: "Break down the address",
      detail:
        "The browser splits the web address into pieces: how to connect (https), which site to reach (api.example.com), and what page you want (/users).",
    },
    hi: {
      title: "Address ko todna",
      detail:
        "Browser web address ko parts mein todta hai: connect kaise karna hai (https), kaunsi site chahiye (api.example.com), aur kaunsa page chahiye (/users).",
    },
  },
  {
    phase: "DNS",
    node: 1,
    packet: "api.example.com → 93.184.216.34",
    en: {
      title: "Look up the site's address",
      detail:
        "Website names are for humans, but computers need numbers. The browser looks up the site's IP address, like checking a phone book, either from memory or by asking a DNS server.",
    },
    hi: {
      title: "Site ka address dhoondna",
      detail:
        "Website ke naam insaano ke liye hain, computer ko numbers chahiye. Browser site ka IP address dhoondta hai — jaise phone book check karna, ya to cache se ya DNS server se pooch ke.",
    },
  },
  {
    phase: "TCP",
    node: 1,
    packet: "SYN → SYN-ACK → ACK",
    en: {
      title: "Say hello to the server",
      detail:
        "Before sending anything, your browser and the server open a connection. They do this with a quick three-step handshake, so both sides agree they're ready to talk.",
    },
    hi: {
      title: "Server ko hello bolna",
      detail:
        "Kuch bhi bhejne se pehle, browser aur server connection kholte hain. Yeh ek quick 3-step handshake se hota hai, taaki dono side baat karne ke liye ready ho jaayein.",
    },
  },
  {
    phase: "TLS",
    node: 1,
    packet: "TLS handshake · session keys",
    en: {
      title: "Lock the connection",
      detail:
        "For a secure site, both sides agree on a shared secret so no one in between can read or change what's sent. This is the padlock you see in the address bar.",
    },
    hi: {
      title: "Connection ko lock karna",
      detail:
        "Secure site ke liye, dono side ek shared secret pe agree karte hain taaki beech mein koi data padh ya change na kar sake. Yehi hai address bar wala padlock.",
    },
  },
  {
    phase: "HTTP request",
    node: 0,
    packet: "GET /users HTTP/1.1",
    en: {
      title: "Write the request",
      detail:
        "The browser writes out exactly what it wants: an action like GET, a page like /users, and any extra details the server needs.",
    },
    hi: {
      title: "Request likhna",
      detail:
        "Browser exactly likhta hai ki usse kya chahiye: ek action jaise GET, ek page jaise /users, aur jo bhi extra details server ko chahiye.",
    },
  },
  {
    phase: "TLS record",
    node: 0,
    packet: "Encrypted data 🔒",
    en: {
      title: "Encrypt the request",
      detail:
        "Before it leaves your device, the request is scrambled using the secret keys from earlier, so anyone watching the network only sees noise.",
    },
    hi: {
      title: "Request ko encrypt karna",
      detail:
        "Device se nikalne se pehle, request pehle wali secret keys se scramble ho jaati hai, taaki network pe dekhne wale ko sirf noise dikhe.",
    },
  },
  {
    phase: "TCP segments",
    node: 1,
    packet: "Segment 1, 2, 3…",
    en: {
      title: "Break it into pieces",
      detail:
        "Networks carry data in small chunks. TCP slices the request into ordered pieces and numbers them, so they can be put back together correctly.",
    },
    hi: {
      title: "Chote pieces mein todna",
      detail:
        "Network chhote chunks mein hi data le jaata hai. TCP request ko ordered pieces mein katta hai aur number deta hai, taaki wapas sahi order mein jud sakein.",
    },
  },
  {
    phase: "IP",
    node: 1,
    packet: "From: your IP → To: server IP",
    en: {
      title: "Address each piece",
      detail:
        "Every piece gets a 'from' and 'to' address, like writing a return address and a destination on an envelope, so routers know where it's headed.",
    },
    hi: {
      title: "Har piece ko address dena",
      detail:
        "Har piece ko ek 'from' aur 'to' address milta hai — jaise envelope pe return address aur destination likhna — taaki routers ko pata ho kahan bhejna hai.",
    },
  },
  {
    phase: "Local network",
    node: 1,
    packet: "Device → Router",
    en: {
      title: "Hand it to your router",
      detail:
        "Your device doesn't send straight to the server. It hands each piece to your Wi-Fi or wired router first, which passes it further down the line.",
    },
    hi: {
      title: "Apne router ko dena",
      detail:
        "Aapka device seedha server ko nahi bhejta. Pehle har piece Wi-Fi ya wired router ko diya jaata hai, jo use aage forward karta hai.",
    },
  },
  {
    phase: "Routing",
    node: 1,
    packet: "Router → Router → Server",
    en: {
      title: "Travel across the internet",
      detail:
        "The pieces hop from router to router, through your provider and across the internet, each one choosing the next best step, until they reach the server.",
    },
    hi: {
      title: "Internet ke paar safar",
      detail:
        "Pieces router se router hop karte hain, aapke provider se hote hue internet paar karke — har router agla best step choose karta hai — jab tak server tak na pahunch jaayein.",
    },
  },
  {
    phase: "Server",
    node: 2,
    packet: "Proxy → Application",
    en: {
      title: "Server receives the pieces",
      detail:
        "The server collects all the pieces, puts them back in order, and hands the full request to the right application, sometimes through a traffic-directing proxy.",
    },
    hi: {
      title: "Server ko pieces milna",
      detail:
        "Server saare pieces collect karke unhe wapas sahi order mein jodta hai, aur poori request sahi application ko de deta hai, kabhi kabhi ek proxy ke through.",
    },
  },
  {
    phase: "HTTP response",
    node: 2,
    packet: "200 OK · response data",
    en: {
      title: "Server prepares an answer",
      detail:
        "The application decides what to send back: a status like 200 for success, plus the actual data you asked for, such as a list of users.",
    },
    hi: {
      title: "Server jawaab taiyaar karta hai",
      detail:
        "Application decide karta hai ki kya wapas bhejna hai: ek status jaise 200 for success, aur asal data jo aapne maanga tha, jaise users ki list.",
    },
  },
  {
    phase: "Response",
    node: 0,
    packet: "Server → Network → Browser",
    en: {
      title: "The answer comes home",
      detail: "The response retraces the same path back to your browser, which reads it and shows you the finished page.",
    },
    hi: {
      title: "Jawaab wapas aata hai",
      detail: "Response wahi raasta wapas leke browser tak aata hai, jo use padh ke aapko final page dikha deta hai.",
    },
  },
];
