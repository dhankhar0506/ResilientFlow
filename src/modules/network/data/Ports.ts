import type { StepText } from "../../../shared/lessonParts";

export type ClientApp = "tab1" | "tab2" | "spotify" | "term";
export type ServerSvc = "https" | "http" | "ssh" | "pg";
export type PortsScene = "diagram" | "ranges" | "cards";

export interface PortsStep {
  id: string;
  phase: string;
  scene: PortsScene;
  clientOn: ClientApp[];
  serverOn: ServerSvc[];
  /** show LISTEN badges on the server */
  listening?: boolean;
  /** show the actual port numbers on the client side */
  showClientPorts?: boolean;
  conns: [ClientApp, ServerSvc][];
  /** connection index the packet travels on; "unknown" = arrives at the laptop with no port */
  token?: { conn: number; t: number; back?: boolean } | "unknown";
  /** refused connection */
  refused?: [ClientApp, ServerSvc];
  terminal?: string[];
  en: StepText & { cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { cards?: { name: string; text: string; icon?: string }[] };
}

export const CLIENT_IP = "192.168.1.23";
export const SERVER_IP = "203.0.113.10";

export const CLIENT_APPS: Record<ClientApp, { icon: string; name: string; port: number }> = {
  tab1: { icon: "🌐", name: "Chrome tab 1", port: 51000 },
  tab2: { icon: "🌐", name: "Chrome tab 2", port: 51001 },
  spotify: { icon: "🎵", name: "Spotify", port: 52344 },
  term: { icon: "⌨️", name: "Terminal", port: 53010 },
};

export const SERVER_SVCS: Record<ServerSvc, { icon: string; name: string; port: number }> = {
  https: { icon: "🔒", name: "Web (HTTPS)", port: 443 },
  http: { icon: "🌐", name: "Web (HTTP)", port: 80 },
  ssh: { icon: "🖥️", name: "SSH", port: 22 },
  pg: { icon: "🗄️", name: "PostgreSQL", port: 5432 },
};

export const PORTS_LABELS = {
  en: {
    lessonTitle: "Ports & Sockets",
    heroTitle: "Ports & sockets: how data finds the right app",
    heroSubtitle:
      "The IP address gets data to the right computer. The port number gets it to the right program. See listening ports, ephemeral ports, sockets and connections.",
    laptop: "Your laptop",
    server: "Server",
    listen: "LISTEN",
    closed: "closed",
    refused: "refused",
    which: "which app?",
    table: "Connections (like netstat / ss)",
    tableHint: "Every connection is identified by both ends: local IP:port and remote IP:port.",
    colProto: "Proto",
    colLocal: "Local socket",
    colRemote: "Remote socket",
    colState: "State",
    colApp: "App",
    empty: "No connections yet.",
    rangesTitle: "0 – 65 535",
    rangesCaption: "A port is a 16-bit number: 2¹⁶ = 65 536 possible ports",
  },
  hi: {
    lessonTitle: "Ports & Sockets",
    heroTitle: "Ports & sockets: data sahi app tak kaise pahunchta hai",
    heroSubtitle:
      "IP address data ko sahi computer tak le jaata hai. Port number use sahi program tak. Listening ports, ephemeral ports, sockets aur connections dekho.",
    laptop: "Aapka laptop",
    server: "Server",
    listen: "LISTEN",
    closed: "band",
    refused: "refused",
    which: "kaunsa app?",
    table: "Connections (netstat / ss jaisa)",
    tableHint: "Har connection dono ends se pehchana jaata hai: local IP:port aur remote IP:port.",
    colProto: "Proto",
    colLocal: "Local socket",
    colRemote: "Remote socket",
    colState: "State",
    colApp: "App",
    empty: "Abhi koi connection nahi.",
    rangesTitle: "0 – 65 535",
    rangesCaption: "Port ek 16-bit number hai: 2¹⁶ = 65 536 possible ports",
  },
} as const;

const ALL_CLIENT: ClientApp[] = ["tab1", "tab2", "spotify", "term"];

export const PORTS_STEPS: PortsStep[] = [
  {
    id: "problem",
    phase: "1 · Problem",
    scene: "diagram",
    clientOn: ALL_CLIENT,
    serverOn: [],
    conns: [],
    token: "unknown",
    en: {
      title: "Data reached your laptop… but which app wants it?",
      summary: "Your laptop runs many network apps at once. The IP address alone can't say which one a packet is for.",
      detail:
        "You have two Chrome tabs open, Spotify is playing, and a terminal is connected to a server. All of them send and receive data through the same Wi-Fi card with the same IP address 192.168.1.23. When a packet arrives, the operating system needs one more piece of information to hand it to the right program. That piece is the port number, carried in the TCP or UDP header.",
      analogy: "An apartment building: the IP address is the building's street address, the port is the flat number.",
    },
    hi: {
      title: "Data laptop tak aa gaya… par kaunse app ko chahiye?",
      summary: "Laptop par ek saath kai network apps chal rahe hain. Sirf IP address se pata nahi chalta packet kiske liye hai.",
      detail:
        "Do Chrome tabs khule hain, Spotify chal raha hai, aur terminal ek server se juda hai. Sab ek hi Wi-Fi card aur ek hi IP 192.168.1.23 se data bhejte-lete hain. Packet aane par operating system ko sahi program tak dene ke liye ek aur cheez chahiye. Woh hai port number, jo TCP ya UDP header mein hota hai.",
      analogy: "Ek apartment building: IP address building ka address hai, port flat number.",
    },
  },
  {
    id: "ranges",
    phase: "2 · What a port is",
    scene: "ranges",
    clientOn: [],
    serverOn: [],
    conns: [],
    en: {
      title: "A port is just a number from 0 to 65 535",
      summary: "Ports are split into three ranges: well-known, registered, and dynamic (ephemeral).",
      detail:
        "A port is a 16-bit number in the transport header. Both the source and the destination get one. Servers use fixed, well-known numbers so clients know where to knock. Clients use a random temporary number that the operating system picks for each connection.",
      cards: [
        { icon: "⭐", name: "0 – 1023 · Well-known", text: "Standard services: 80 HTTP, 443 HTTPS, 22 SSH, 53 DNS, 25 SMTP. Need admin rights to open on Linux." },
        { icon: "📝", name: "1024 – 49151 · Registered", text: "Common apps and databases: 3306 MySQL, 5432 PostgreSQL, 6379 Redis, 8080 alt-HTTP, 3000 dev servers." },
        { icon: "🎲", name: "49152 – 65535 · Dynamic", text: "Ephemeral ports picked by the OS for the client side of a connection." },
      ],
      term: { name: "Port", meaning: "A 16-bit number in the TCP/UDP header that identifies a program (process) on a host." },
    },
    hi: {
      title: "Port bas 0 se 65 535 tak ka ek number hai",
      summary: "Ports teen ranges mein bate hain: well-known, registered, aur dynamic (ephemeral).",
      detail:
        "Port transport header mein 16-bit number hai. Source aur destination dono ka ek port hota hai. Servers fixed, well-known numbers use karte hain taaki clients ko pata ho kahan dastak dena hai. Clients ek random temporary number use karte hain jo OS har connection ke liye chunta hai.",
      cards: [
        { icon: "⭐", name: "0 – 1023 · Well-known", text: "Standard services: 80 HTTP, 443 HTTPS, 22 SSH, 53 DNS, 25 SMTP. Linux par kholne ke liye admin chahiye." },
        { icon: "📝", name: "1024 – 49151 · Registered", text: "Common apps aur databases: 3306 MySQL, 5432 PostgreSQL, 6379 Redis, 8080 alt-HTTP, 3000 dev servers." },
        { icon: "🎲", name: "49152 – 65535 · Dynamic", text: "Ephemeral ports jo OS connection ke client side ke liye chunta hai." },
      ],
      term: { name: "Port", meaning: "TCP/UDP header ka 16-bit number jo host par ek program (process) ko pehchanta hai." },
    },
  },
  {
    id: "listen",
    phase: "3 · Server listens",
    scene: "diagram",
    clientOn: [],
    serverOn: ["https", "http", "ssh"],
    listening: true,
    conns: [],
    en: {
      title: "A server program “listens” on a fixed port",
      summary: "The web server opens port 443 (and 80); the SSH server opens port 22. They sit and wait for clients.",
      detail:
        "When a server program starts, it asks the operating system: “give me port 443 and send me anything that arrives there” (in code: bind() then listen()). That port is now in the LISTEN state. A port with no program behind it is closed – connections to it get refused. Notice PostgreSQL is installed but is configured to listen only on 127.0.0.1, so from outside it looks closed. That's a good security habit.",
      remember: "A port is “open” only if some program is listening on it.",
    },
    hi: {
      title: "Server program fixed port par “listen” karta hai",
      summary: "Web server port 443 (aur 80) kholta hai; SSH server port 22. Dono clients ka intezaar karte hain.",
      detail:
        "Server program start hote hi OS se kehta hai: “mujhe port 443 do aur wahan jo aaye mujhe bhejo” (code mein: bind() phir listen()). Ab woh port LISTEN state mein hai. Jis port ke peeche koi program nahi woh closed hai – wahan connection refuse hota hai. Dekho PostgreSQL installed hai par sirf 127.0.0.1 par listen karta hai, isliye bahar se closed dikhta hai. Yeh acchi security aadat hai.",
      remember: "Port tabhi “open” hai jab koi program us par listen kar raha ho.",
    },
  },
  {
    id: "ephemeral",
    phase: "4 · Client port",
    scene: "diagram",
    clientOn: ["tab1"],
    serverOn: ["https", "http", "ssh"],
    listening: true,
    showClientPorts: true,
    conns: [["tab1", "https"]],
    token: { conn: 0, t: 0.55 },
    en: {
      title: "The client gets a random (ephemeral) port",
      summary: "Chrome tab 1 connects from 192.168.1.23:51000 to 203.0.113.10:443.",
      detail:
        "When you open https://example.com, Chrome asks the OS for a connection to port 443 on the server. The OS picks a free temporary port for Chrome's side – here 51000 – and writes both into the packet: source port 51000, destination port 443. The server's reply comes back with these swapped, so the laptop's OS knows to hand it to tab 1.",
      points: ["Request: src 192.168.1.23:51000 → dst 203.0.113.10:443", "Reply: src 203.0.113.10:443 → dst 192.168.1.23:51000"],
      term: { name: "Ephemeral port", meaning: "A short-lived port the OS assigns to the client side of a connection, released when it closes." },
    },
    hi: {
      title: "Client ko random (ephemeral) port milta hai",
      summary: "Chrome tab 1, 192.168.1.23:51000 se 203.0.113.10:443 tak connect karta hai.",
      detail:
        "Jab aap https://example.com kholte ho, Chrome OS se server ke port 443 tak connection maangta hai. OS Chrome ki side ke liye ek free temporary port chunta hai – yahan 51000 – aur dono packet mein likhta hai: source port 51000, destination port 443. Server ka reply ulta aata hai, isliye laptop ka OS samajh jaata hai ki tab 1 ko dena hai.",
      points: ["Request: src 192.168.1.23:51000 → dst 203.0.113.10:443", "Reply: src 203.0.113.10:443 → dst 192.168.1.23:51000"],
      term: { name: "Ephemeral port", meaning: "Thodi der ka port jo OS connection ke client side ko deta hai, connection band hote hi free." },
    },
  },
  {
    id: "socket",
    phase: "5 · Socket",
    scene: "diagram",
    clientOn: ["tab1"],
    serverOn: ["https", "http", "ssh"],
    listening: true,
    showClientPorts: true,
    conns: [["tab1", "https"]],
    token: { conn: 0, t: 0.45, back: true },
    en: {
      title: "Socket = IP address + port",
      summary: "192.168.1.23:51000 is a socket. A connection is a pair of sockets.",
      detail:
        "The combination IP:port is called a socket address. It is the full “address of a program on the internet”. A TCP connection is uniquely identified by its two sockets plus the protocol: (TCP, 192.168.1.23, 51000, 203.0.113.10, 443). This group of five values is called the 5-tuple. In code, a socket is also the object your program uses to send and receive – socket(), connect(), send(), recv().",
      term: { name: "5-tuple", meaning: "Protocol + source IP + source port + destination IP + destination port – uniquely identifies a connection." },
      remember: "IP finds the host. Port finds the program. IP:port = socket.",
    },
    hi: {
      title: "Socket = IP address + port",
      summary: "192.168.1.23:51000 ek socket hai. Connection do sockets ka pair hai.",
      detail:
        "IP:port ke combination ko socket address kehte hain. Yeh internet par “ek program ka poora address” hai. TCP connection apne do sockets aur protocol se unique pehchana jaata hai: (TCP, 192.168.1.23, 51000, 203.0.113.10, 443). Paanch values ke is group ko 5-tuple kehte hain. Code mein socket woh object bhi hai jisse program bhejta-leta hai – socket(), connect(), send(), recv().",
      term: { name: "5-tuple", meaning: "Protocol + source IP + source port + destination IP + destination port – connection ko unique pehchanta hai." },
      remember: "IP host dhoondhta hai. Port program dhoondhta hai. IP:port = socket.",
    },
  },
  {
    id: "many",
    phase: "6 · Many connections",
    scene: "diagram",
    clientOn: ALL_CLIENT,
    serverOn: ["https", "http", "ssh"],
    listening: true,
    showClientPorts: true,
    conns: [
      ["tab1", "https"],
      ["tab2", "https"],
      ["term", "ssh"],
    ],
    token: { conn: 1, t: 0.55 },
    en: {
      title: "Two tabs, same server, same port 443 – no confusion",
      summary: "Both tabs talk to 203.0.113.10:443, but from different client ports, so they are different connections.",
      detail:
        "Tab 1 uses port 51000, tab 2 uses 51001. The server sees two different 5-tuples and keeps them apart, and so does your laptop. That's also how one web server on port 443 can serve millions of users: every connection differs in the client's IP and/or port. Meanwhile the terminal's SSH connection goes to port 22 – a completely different program on the same server.",
      points: ["tab 1: …:51000 ↔ …:443", "tab 2: …:51001 ↔ …:443", "terminal: …:53010 ↔ …:22"],
    },
    hi: {
      title: "Do tabs, same server, same port 443 – koi confusion nahi",
      summary: "Dono tabs 203.0.113.10:443 se baat karte hain, par alag client ports se, isliye alag connections hain.",
      detail:
        "Tab 1 port 51000 use karta hai, tab 2 port 51001. Server ko do alag 5-tuples dikhte hain aur woh unhe alag rakhta hai, laptop bhi. Isi tarah port 443 par ek web server laakhon users ko serve karta hai: har connection client ke IP aur/ya port mein alag hota hai. Saath hi terminal ka SSH connection port 22 par jaata hai – same server par bilkul alag program.",
      points: ["tab 1: …:51000 ↔ …:443", "tab 2: …:51001 ↔ …:443", "terminal: …:53010 ↔ …:22"],
    },
  },
  {
    id: "refused",
    phase: "7 · Closed port",
    scene: "diagram",
    clientOn: ["term"],
    serverOn: ["https", "http", "ssh", "pg"],
    listening: true,
    showClientPorts: true,
    conns: [],
    refused: ["term", "pg"],
    terminal: ["$ psql -h 203.0.113.10 -p 5432", "psql: error: connection to server at \"203.0.113.10\", port 5432 failed:", "      Connection refused"],
    en: {
      title: "Nobody listening → “Connection refused”",
      summary: "Trying to reach port 5432 from outside fails, because PostgreSQL listens only on localhost.",
      detail:
        "If nothing listens on the destination port, the server's OS answers a TCP connection attempt with a reset (RST) and your program shows “connection refused”. If instead a firewall silently drops the packet, you see a timeout. These two errors tell you different things: refused = reached the machine but no program on that port; timeout = something in between is blocking or the host is down.",
      points: ["Connection refused → host reachable, port closed", "Timed out → blocked by a firewall, or host down", "Fix: start the service, listen on 0.0.0.0, open the firewall"],
      remember: "Refused ≠ timeout. Refused means the machine answered “no one is here”.",
    },
    hi: {
      title: "Koi listen nahi kar raha → “Connection refused”",
      summary: "Bahar se port 5432 tak pahunchna fail hota hai, kyunki PostgreSQL sirf localhost par listen karta hai.",
      detail:
        "Agar destination port par koi listen nahi kar raha, server ka OS TCP connection attempt ka jawab reset (RST) se deta hai aur program “connection refused” dikhata hai. Agar firewall chupchaap packet drop kar de, toh timeout dikhta hai. Dono errors alag baat batate hain: refused = machine tak pahunche par us port par program nahi; timeout = beech mein kuch block kar raha hai ya host band hai.",
      points: ["Connection refused → host reachable, port band", "Timed out → firewall ne block kiya, ya host down", "Fix: service start karo, 0.0.0.0 par listen karo, firewall kholo"],
      remember: "Refused ≠ timeout. Refused matlab machine ne jawab diya “yahan koi nahi hai”.",
    },
  },
  {
    id: "in-use",
    phase: "8 · Port in use",
    scene: "cards",
    clientOn: [],
    serverOn: [],
    conns: [],
    terminal: [
      "$ npm run dev",
      "Error: listen EADDRINUSE: address already in use :::3000",
      "",
      "# who is using port 3000?",
      "$ lsof -i :3000                       # macOS / Linux",
      "> netstat -ano | findstr :3000        # Windows",
      "$ kill <PID>      or   npm run dev -- --port 3001",
    ],
    en: {
      title: "Developer classic: EADDRINUSE – port already in use",
      summary: "Only one program can listen on a given IP:port at a time.",
      detail:
        "You start your React/Node dev server and get EADDRINUSE :3000. An old copy of the server (or another app) is still listening on 3000. Find it with lsof or netstat, stop it, or run on another port. Also useful to know when developing:",
      cards: [
        { icon: "🏠", name: "127.0.0.1 / localhost", text: "Listen only on loopback: reachable from this computer only." },
        { icon: "🌍", name: "0.0.0.0", text: "Listen on all interfaces: your phone on the same Wi-Fi can open http://192.168.1.23:3000." },
        { icon: "🔢", name: "URL default ports", text: "http:// means :80 and https:// means :443 unless you write another port, e.g. localhost:5173." },
      ],
      remember: "One listener per IP:port. Use localhost for private dev, 0.0.0.0 to test from your phone.",
    },
    hi: {
      title: "Developer classic: EADDRINUSE – port pehle se use mein",
      summary: "Ek IP:port par ek time par sirf ek program listen kar sakta hai.",
      detail:
        "Aap React/Node dev server start karte ho aur EADDRINUSE :3000 aata hai. Server ki purani copy (ya koi aur app) abhi bhi 3000 par listen kar rahi hai. lsof ya netstat se dhoondho, band karo, ya dusre port par chalao. Development mein yeh bhi kaam aata hai:",
      cards: [
        { icon: "🏠", name: "127.0.0.1 / localhost", text: "Sirf loopback par listen: sirf isi computer se khulega." },
        { icon: "🌍", name: "0.0.0.0", text: "Saare interfaces par listen: same Wi-Fi par phone se http://192.168.1.23:3000 khul jaayega." },
        { icon: "🔢", name: "URL default ports", text: "http:// matlab :80 aur https:// matlab :443, jab tak aap dusra port na likho, jaise localhost:5173." },
      ],
      remember: "Ek IP:port par ek listener. Private dev ke liye localhost, phone se test ke liye 0.0.0.0.",
    },
  },
  {
    id: "see-it",
    phase: "9 · See it",
    scene: "diagram",
    clientOn: ALL_CLIENT,
    serverOn: ["https", "http", "ssh"],
    listening: true,
    showClientPorts: true,
    conns: [
      ["tab1", "https"],
      ["tab2", "https"],
      ["spotify", "https"],
      ["term", "ssh"],
    ],
    terminal: [
      "$ ss -tunp            # Linux: TCP/UDP sockets + process",
      "$ netstat -an         # Windows / macOS",
      "Proto Local Address          Foreign Address        State",
      "TCP   192.168.1.23:51000     203.0.113.10:443       ESTABLISHED",
      "TCP   192.168.1.23:51001     203.0.113.10:443       ESTABLISHED",
      "TCP   192.168.1.23:53010     203.0.113.10:22        ESTABLISHED",
      "TCP   0.0.0.0:3000           0.0.0.0:0              LISTENING",
    ],
    en: {
      title: "See your own sockets",
      summary: "netstat / ss list every listening port and every connection with its local and remote socket.",
      detail:
        "Run one of these commands and you'll see exactly the table from this lesson: local IP:port, remote IP:port and state (LISTEN, ESTABLISHED, TIME_WAIT…). Add -p (Linux) or -b / -o (Windows) to see which program owns each socket. This is the fastest way to answer “is my server actually running and on which port?”.",
      remember: "Ports turn “a packet for this computer” into “a packet for this program”.",
    },
    hi: {
      title: "Apne sockets khud dekho",
      summary: "netstat / ss har listening port aur har connection ko local aur remote socket ke saath dikhate hain.",
      detail:
        "Inmein se koi command chalao, aapko isi lesson wali table dikhegi: local IP:port, remote IP:port aur state (LISTEN, ESTABLISHED, TIME_WAIT…). -p (Linux) ya -b / -o (Windows) lagao toh dikhega kaunsa program kaunsa socket use kar raha hai. “Mera server sach mein chal raha hai aur kis port par?” ka sabse tez jawab yahi hai.",
      remember: "Port “is computer ka packet” ko “is program ka packet” banata hai.",
    },
  },
];
