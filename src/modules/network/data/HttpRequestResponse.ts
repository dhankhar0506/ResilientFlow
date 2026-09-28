export const HTTP_UI = {
    en: {
        lessonTitle: "HTTP Request & Response",
        lessonSubtitle:
            "A React frontend on your laptop calls a Node.js backend on AWS. Follow every layer the request passes through, and watch the response find its way back.",
        requestJourney: "Request journey",
        dataLabel: "What's moving right now",
        tip: "This walkthrough follows one real example end to end. Actual browsers and OSes cache DNS lookups, reuse TCP connections, and optimize some steps for speed.",
        connectionInfo: "What we know so far",
        domain: "Domain",
        protocol: "Protocol",
        source: "Source",
        destination: "Destination",
        unknown: "not known yet",
        headerFields: "What gets attached here",
        encapsulationTitle: "How the data gets wrapped, layer by layer",
        layerData: "Data (HTTP)",
        layerSegment: "Segment (TCP)",
        layerPacket: "Packet (IP)",
        layerFrame: "Frame (MAC)",
        physicalNote: "Now sent as raw bits, over the wire or through the air",
    },
    hi: {
        lessonTitle: "HTTP Request & Response",
        lessonSubtitle:
            "Ek React frontend aapke laptop se AWS par chal rahe Node.js backend ko call karta hai. Request ki har layer ko follow karo aur response ko wapas aate dekho.",
        requestJourney: "Request ka safar",
        dataLabel: "Abhi kya data move ho raha hai",
        tip: "Yeh walkthrough ek real example ko shuru se aakhir tak follow karta hai. Asli browsers aur OS DNS lookups cache karte hain, TCP connections reuse karte hain, aur speed ke liye kuch steps optimize karte hain.",
        connectionInfo: "Abhi tak humein kya pata hai",
        domain: "Domain",
        protocol: "Protocol",
        source: "Source",
        destination: "Destination",
        unknown: "abhi pata nahi",
        headerFields: "Yahan kya attach hota hai",
        encapsulationTitle: "Data layer by layer kaise wrap hota hai",
        layerData: "Data (HTTP)",
        layerSegment: "Segment (TCP)",
        layerPacket: "Packet (IP)",
        layerFrame: "Frame (MAC)",
        physicalNote: "Ab raw bits ke roop mein wire ya air ke through bheja jaata hai",
    },
} as const;

export const NODES = [
    { icon: "💻", en: { title: "Browser", sub: "Your device" }, hi: { title: "Browser", sub: "Aapka device" } },
    {
        icon: "🌐",
        en: { title: "Network", sub: "DNS · TCP · TLS · IP" },
        hi: { title: "Network", sub: "DNS · TCP · TLS · IP" },
    },
    { icon: "🗄️", en: { title: "Server", sub: "Proxy · App" }, hi: { title: "Server", sub: "Proxy · App" } },
];


export type Layer = "app" | "transport" | "network" | "datalink" | "physical" | "none";
export const LAYER_RANK: Record<Layer, number> = {
    none: 0,
    app: 1,
    transport: 2,
    network: 3,
    datalink: 4,
    physical: 4,
};

export interface ConnectionReveal {
    domain?: string;
    protocol?: string;
    sourceIp?: string;
    sourcePort?: string;
    destIp?: string;
    destPort?: string;
}

export interface HttpStep {
    id: string;
    phase: string;
    node: 0 | 1 | 2;
    layer: Layer;
    packet: string;
    fields?: { label: string; value: string }[];
    reveal?: ConnectionReveal;
    en: { title: string; detail: string };
    hi: { title: string; detail: string };
}

export const HTTP_STEPS: HttpStep[] = [
    {
        id: "scenario",
        phase: "Setup",
        node: 0,
        layer: "none",
        packet: "Frontend (client) ↔ Backend (server)",
        reveal: { domain: "api.example.com", protocol: "HTTPS" },
        en: {
            title: "Meet the scenario",
            detail:
                "Picture two machines: a React frontend running on your laptop at http://localhost:3000, and a Node.js backend deployed on an AWS EC2 server, reachable at https://api.example.com over port 443 (HTTPS). They're physically different machines, in different places — to talk to each other, they have to travel across the internet.",
        },
        hi: {
            title: "Scenario samjho",
            detail:
                "Do machines imagine karo: ek React frontend jo aapke laptop pe http://localhost:3000 pe chal raha hai, aur ek Node.js backend jo AWS EC2 server pe deploy hai, https://api.example.com pe port 443 (HTTPS) ke through accessible hai. Yeh dono physically alag-alag machines hain, alag jagah pe — baat karne ke liye inhe internet ke through travel karna padta hai.",
        },
    },
    {
        id: "fetch-call",
        phase: "Application",
        node: 0,
        layer: "app",
        packet: 'fetch("https://api.example.com/profile")',
        en: {
            title: "The app fires a request",
            detail:
                'As a developer you just write one line: fetch("https://api.example.com/profile"). Everything from here — DNS, connections, encryption, chunking, routing — happens automatically underneath this single call, and you never see any of it.',
        },
        hi: {
            title: "App request fire karta hai",
            detail:
                'Developer hote hue aap bas ek line likhte ho: fetch("https://api.example.com/profile"). Yahan se aage — DNS, connections, encryption, chunking, routing — sab kuch is ek call ke neeche automatically hota hai, aur aapko in mein se kuch bhi dikhta nahi.',
        },
    },
    {
        id: "dns",
        phase: "DNS",
        node: 1,
        layer: "none",
        packet: "api.example.com → 100.0.0.1",
        reveal: { destIp: "100.0.0.1" },
        en: {
            title: "Look up the domain's IP",
            detail:
                "A domain name like api.example.com is just a string — you can't route network traffic using a string. So the browser fires a DNS query first: it hands over the hostname, and DNS hands back the actual public IP address sitting behind it, say 100.0.0.1.",
        },
        hi: {
            title: "Domain ka IP dhoondo",
            detail:
                "api.example.com jaisa domain name sirf ek string hai — string use karke network traffic route nahi ho sakta. Isliye browser sabse pehle ek DNS query bhejta hai: hostname deta hai, aur DNS uske peeche ka asal public IP address wapas deta hai, jaise 100.0.0.1.",
        },
    },
    {
        id: "gather-criteria",
        phase: "Connection info",
        node: 0,
        layer: "none",
        packet: "src 127.0.0.1:3000 → dst 100.0.0.1:443",
        reveal: { sourceIp: "127.0.0.1", sourcePort: "3000", destPort: "443" },
        fields: [
            { label: "Source IP", value: "127.0.0.1 (this machine)" },
            { label: "Source port", value: "3000 — where React is running" },
            { label: "Destination IP", value: "100.0.0.1 — from DNS" },
            { label: "Destination port", value: "443 — assumed, because the URL is https" },
        ],
        en: {
            title: "Note down the connection details",
            detail:
                "Before anything else can happen, four numbers matter: the source IP (this machine) and source port (3000, where React is running), plus the destination IP (100.0.0.1, from DNS) and destination port. Since the URL starts with https, the browser assumes port 443 without being told.",
        },
        hi: {
            title: "Connection details note karo",
            detail:
                "Aage badhne se pehle, chaar cheezein important hain: source IP (yeh machine) aur source port (3000, jahan React chal raha hai), plus destination IP (100.0.0.1, DNS se mila) aur destination port. Kyunki URL https se start hota hai, browser bina bataye 443 port assume kar leta hai.",
        },
    },
    {
        id: "build-request",
        phase: "HTTP request",
        node: 0,
        layer: "app",
        packet: "GET /profile HTTP/1.1 · Authorization: Bearer •••",
        fields: [
            { label: "Method", value: "GET" },
            { label: "Path", value: "/profile" },
            { label: "Host", value: "api.example.com" },
            { label: "Authorization", value: "Bearer <token>" },
            { label: "Cookie / custom headers", value: "session id, etc." },
        ],
        en: {
            title: "Write out the HTTP request",
            detail:
                "The browser builds the actual request: the method (GET), the path (/profile), and headers — an Authorization bearer token, cookies, and maybe a few custom headers. At this point the whole thing is still just readable text.",
        },
        hi: {
            title: "HTTP request likho",
            detail:
                "Browser asal request banata hai: method (GET), path (/profile), aur headers — ek Authorization bearer token, cookies, aur kuch custom headers. Is point tak yeh sab abhi bhi sirf readable text hai.",
        },
    },
    {
        id: "tcp-handshake",
        phase: "TCP",
        node: 1,
        layer: "transport",
        packet: "SYN → SYN-ACK → ACK",
        en: {
            title: "Open a TCP connection",
            detail:
                "HTTP rides on top of TCP, and TCP is connection-oriented — before any real data moves, the client and server need a 'pipe' built between them first. This happens through the TCP three-way handshake: SYN, then SYN-ACK, then ACK.",
        },
        hi: {
            title: "TCP connection kholo",
            detail:
                "HTTP TCP ke upar chalta hai, aur TCP connection-oriented hai — koi bhi asal data bhejne se pehle, client aur server ke beech pehle ek 'pipe' banani padti hai. Yeh hota hai TCP three-way handshake se: pehle SYN, phir SYN-ACK, phir ACK.",
        },
    },
    {
        id: "tls-handshake",
        phase: "TLS",
        node: 1,
        layer: "transport",
        packet: "TLS handshake · shared session key",
        en: {
            title: "Secure the connection (TLS)",
            detail:
                "Because the URL is https, one more handshake happens before any data flows: a TLS handshake, where the browser and server agree on a shared encryption key. This is the padlock you see in your address bar.",
        },
        hi: {
            title: "Connection secure karo (TLS)",
            detail:
                "Kyunki URL https hai, data flow hone se pehle ek aur handshake hota hai: TLS handshake, jisme browser aur server ek shared encryption key pe agree karte hain. Yehi hai address bar wala padlock.",
        },
    },
    {
        id: "bytes",
        phase: "Encoding",
        node: 0,
        layer: "app",
        packet: "GET /profile HTTP/1.1 → FE 12 0A 00 A3 …",
        en: {
            title: "Turn text into bytes",
            detail:
                "Networks move data as ones and zeros, not readable text. So the browser runs the HTTP request through a text encoder, converting it into a stream of bytes (often shown in hexadecimal) — ready to be handed off for actual transmission.",
        },
        hi: {
            title: "Text ko bytes mein badlo",
            detail:
                "Network pe data ones aur zeros ke form mein jaata hai, readable text mein nahi. Isliye browser HTTP request ko ek text encoder se guzarta hai, use bytes ki stream mein convert karta hai (aksar hexadecimal mein dikhaya jaata hai) — ab actual transmission ke liye ready.",
        },
    },
    {
        id: "handoff-os",
        phase: "OS",
        node: 0,
        layer: "none",
        packet: 'Browser → OS: "please send this data"',
        en: {
            title: "Browser hands off to the OS",
            detail:
                "The browser's job stops here: understand the request, run DNS, gather IPs and ports. It cannot physically put data onto the network — only the operating system's TCP/IP stack (part of Windows, macOS, or Linux) controls the network interface card and can actually send data.",
        },
        hi: {
            title: "Browser OS ko handoff karta hai",
            detail:
                "Browser ka kaam yahin tak hai: request samajhna, DNS run karna, IPs aur ports collect karna. Yeh physically data network pe nahi bhej sakta — sirf operating system ka TCP/IP stack (Windows, macOS, ya Linux ka part) network interface card ko control karta hai aur asal mein data bhej sakta hai.",
        },
    },
    {
        id: "chunking",
        phase: "Chunking",
        node: 1,
        layer: "transport",
        packet: "20 chunks · e.g. FE12, 00A3 …",
        en: {
            title: "Break the data into chunks",
            detail:
                "Requests — and especially responses, like a 1 GB file — can be far too big to send in one go. So the OS's TCP/IP stack slices the byte stream into smaller chunks. The exact size depends on your MTU (maximum transmission unit) and MSS (maximum segment size).",
        },
        hi: {
            title: "Data ko chunks mein todo",
            detail:
                "Requests — aur khaaskar responses, jaise ek 1GB file — itne bade ho sakte hain ki ek baar mein bheja hi na jaa sake. Isliye OS ka TCP/IP stack byte stream ko chhote chunks mein katta hai. Exact size depend karta hai aapke MTU (maximum transmission unit) aur MSS (maximum segment size) pe.",
        },
    },
    {
        id: "tcp-segment",
        phase: "TCP segment",
        node: 1,
        layer: "transport",
        packet: "Segment: src:3000 → dst:443, seq #1",
        fields: [
            { label: "Source port", value: "3000" },
            { label: "Destination port", value: "443" },
            { label: "Sequence number", value: "1, 2, 3 … (one per chunk)" },
        ],
        en: {
            title: "Build the TCP segment",
            detail:
                "Each chunk is wrapped with a source port (3000 — React) and destination port (443 — Node.js), plus a sequence number. Sequence numbers matter because chunks travel independently and can arrive out of order — TCP uses them to reassemble everything correctly at the other end.",
        },
        hi: {
            title: "TCP segment banao",
            detail:
                "Har chunk ko ek source port (3000 — React) aur destination port (443 — Node.js) ke saath wrap kiya jaata hai, plus ek sequence number. Sequence numbers isliye zaroori hain kyunki chunks independently travel karte hain aur order se bahar bhi pahunch sakte hain — TCP inhe use karke doosre end pe sab kuch sahi order mein jodta hai.",
        },
    },
    {
        id: "ip-packet",
        phase: "IP",
        node: 1,
        layer: "network",
        packet: "IP: src 127.0.0.1 → dst 100.0.0.1",
        fields: [
            { label: "Source IP", value: "127.0.0.1 (example)" },
            { label: "Destination IP", value: "100.0.0.1" },
        ],
        en: {
            title: "Wrap it in an IP packet",
            detail:
                "The TCP segment is now encapsulated inside an IP packet, tagged with a source IP (this machine) and a destination IP (100.0.0.1). This destination IP is what every router along the way will use to decide where to forward the packet next.",
        },
        hi: {
            title: "IP packet mein wrap karo",
            detail:
                "TCP segment ab ek IP packet ke andar encapsulate ho jaata hai, jisme source IP (yeh machine) aur destination IP (100.0.0.1) tag hoti hai. Yehi destination IP hai jise raaste ke har router use karke decide karta hai ki packet aage kahan forward karna hai.",
        },
    },
    {
        id: "routing",
        phase: "Routing",
        node: 1,
        layer: "network",
        packet: "Router → Router → … → EC2's network",
        en: {
            title: "Hop across the internet",
            detail:
                "The packet reaches your home router first. Your router almost certainly doesn't know exactly where 100.0.0.1 lives, so it forwards the packet to another router that might. This repeats, hop by hop, until the packet finally reaches the network the EC2 server lives on.",
        },
        hi: {
            title: "Internet ke across hop karo",
            detail:
                "Packet pehle aapke ghar ke router tak pahunchta hai. Aapke router ko exactly nahi pata hota ki 100.0.0.1 kahan hai, isliye woh packet ko ek aur router ko forward karta hai jise shayad pata ho. Yeh repeat hota hai, hop by hop, jab tak packet aakhir usi network tak nahi pahunch jaata jahan EC2 server hai.",
        },
    },
    {
        id: "mac-arp",
        phase: "MAC · ARP",
        node: 1,
        layer: "datalink",
        packet: "ARP: who has 192.168.1.1? → reply: MAC xx:xx:…",
        fields: [
            { label: "Source MAC", value: "This laptop's network card" },
            { label: "Destination MAC", value: "Default gateway (router), via ARP" },
        ],
        en: {
            title: "Find the local delivery address (ARP)",
            detail:
                "An IP address gets you to the right network — but inside that local network, delivery needs a MAC address (a device's physical hardware address). Since this laptop doesn't know the EC2 server's MAC, it falls back to its default gateway (the router). ARP (Address Resolution Protocol) broadcasts \"who has this IP?\" to every device on the local network — only the device holding that IP replies with its MAC.",
        },
        hi: {
            title: "Local delivery address dhoondo (ARP)",
            detail:
                "IP address aapko sahi network tak le jaata hai — lekin us local network ke andar, delivery ke liye MAC address chahiye (device ka physical hardware address). Kyunki yeh laptop EC2 server ka MAC nahi jaanta, yeh apne default gateway (router) pe fallback karta hai. ARP (Address Resolution Protocol) local network ke har device ko broadcast karta hai \"is IP ka MAC kiske paas hai?\" — sirf woh device jiske paas woh IP hai, apna MAC bata ke reply karta hai.",
        },
    },
    {
        id: "frame",
        phase: "Frame",
        node: 1,
        layer: "datalink",
        packet: "Frame: [MAC][IP][TCP][Data]",
        en: {
            title: "Build the frame",
            detail:
                "The IP packet gets wrapped one more time — with a source MAC and destination MAC — forming a frame. This is the final, fully-addressed unit that's actually ready to leave the machine.",
        },
        hi: {
            title: "Frame banao",
            detail:
                "IP packet ab ek baar aur wrap hota hai — source MAC aur destination MAC ke saath — jisse ek frame banta hai. Yeh final, fully-addressed unit hai jo actual mein machine se nikalne ke liye ready hai.",
        },
    },
    {
        id: "transmit",
        phase: "Physical",
        node: 1,
        layer: "physical",
        packet: "Bits: 1 0 1 1 0 1 0 0 1 …",
        en: {
            title: "Transmit as signals",
            detail:
                "Finally, the network interface card converts the frame into raw bits and transmits it — radio waves over Wi-Fi, electrical signals over Ethernet, or light pulses over fiber optics. Notice: at this point the request still hasn't reached the backend yet — all of this happens before the data physically leaves your device.",
        },
        hi: {
            title: "Signals ke roop mein transmit karo",
            detail:
                "Aakhir mein, network interface card frame ko raw bits mein convert karta hai aur transmit karta hai — Wi-Fi pe radio waves, Ethernet pe electrical signals, ya fiber optics pe light pulses ke roop mein. Notice karo: is point tak, request abhi backend tak pahuncha bhi nahi hai — yeh sab kuch data ke device se physically nikalne se pehle hota hai.",
        },
    },
    {
        id: "server-response",
        phase: "Server & Response",
        node: 2,
        layer: "none",
        packet: "200 OK · { name, email, phone… }",
        en: {
            title: "The server replies (in reverse)",
            detail:
                "Once the frame reaches the EC2 machine, every layer gets unwrapped in reverse: frame → packet → segment → bytes → the original HTTP request. The Node.js app fetches the profile from its database, builds a JSON response, and sends it all the way back through this exact same stack. DNS was only needed once, but chunking, TCP, IP, MAC and ARP all happen again for the response too.",
        },
        hi: {
            title: "Server reply karta hai (reverse mein)",
            detail:
                "Jaise hi frame EC2 machine tak pahunchta hai, har layer reverse mein unwrap hoti hai: frame → packet → segment → bytes → original HTTP request. Node.js app database se profile fetch karta hai, ek JSON response banata hai, aur use bilkul isi stack ke through wapas bhejta hai. DNS sirf ek baar chahiye tha, lekin chunking, TCP, IP, MAC aur ARP response ke liye bhi dubara hote hain.",
        },
    },
];


export const HTTP_Request_Response = {
    heroTitle: "Learn how computers & software actually work",
}