// export type NetworkLayer = {
//     number: number;
//     name: string;
//     shortDescription: string;
//     description: string;
//     responsibilities: string[];
//     protocols: string[];
//     keyPoint: string;
// };

// export const osiLayers: NetworkLayer[] = [
//     { number: 1, name: 'Physical', shortDescription: 'Signals and media', description: 'Physical layer transmits raw bits over a physical medium. It describes signal characteristics, connectors, radio transmission, optical signaling, and bit timing.', responsibilities: ['Carry bits as electrical, radio, or optical signals.', 'Define physical media, connectors, frequencies, and signaling.', 'Represent a bit stream on a medium; it does not interpret IP addresses or application messages.'], protocols: ['Copper Ethernet PHY', 'Wi-Fi radio PHY', 'Fiber optics', 'Radio signals'], keyPoint: 'Bits are transmitted as physical signals: copper uses electrical signals, Wi-Fi uses radio, and fiber uses light.' },
//     { number: 2, name: 'Data Link', shortDescription: 'Frames and local-link delivery', description: 'The data-link layer moves frames across one local link or network segment. Ethernet and Wi-Fi use link-layer addressing and frame-level error detection.', responsibilities: ['Encapsulate network-layer packets into frames.', 'Use link-layer addresses such as MAC addresses on Ethernet/Wi-Fi.', 'Detect frame corruption with mechanisms such as FCS; switching and access-point forwarding operate at this level.'], protocols: ['Ethernet', 'Wi-Fi (802.11)', 'MAC', 'ARP (IPv4 neighbor resolution, often associated here)'], keyPoint: 'MAC addresses are for local-link delivery, not end-to-end Internet routing; link-layer addressing can change from hop to hop.' },
//     { number: 3, name: 'Network', shortDescription: 'IP addressing and routing', description: 'The network layer provides logical addressing and moves packets between networks. Routers inspect destination IP prefixes and choose a next hop using routing information.', responsibilities: ['Carry source and destination IP addresses.', 'Forward IP packets across networks.', 'Use routing and subnet/prefix information to determine where packets should go.'], protocols: ['IPv4', 'IPv6', 'ICMP'], keyPoint: 'IP identifies the logical source and destination; routers forward packets toward the destination using routing tables.' },
//     { number: 4, name: 'Transport', shortDescription: 'Process-to-process delivery', description: 'The transport layer supports communication between application processes. Ports help identify endpoints on a host. Different transport protocols provide different delivery properties.', responsibilities: ['Use port numbers to identify application endpoints.', 'TCP provides ordered, reliable byte-stream delivery with acknowledgments and retransmission.', 'UDP provides datagrams without TCP-style delivery guarantees; QUIC is implemented over UDP and adds transport features.'], protocols: ['TCP', 'UDP', 'QUIC*'], keyPoint: 'TCP segments application data and handles reliability and ordering; UDP does not provide those guarantees. QUIC operates over UDP.' },
//     { number: 5, name: 'Session', shortDescription: 'Logical dialog/session concepts', description: 'The session layer is a conceptual layer for establishing, managing, synchronizing, and ending dialogs between applications. In modern systems, these responsibilities are often implemented by application protocols or libraries.', responsibilities: ['Manage logical dialog/session state.', 'Coordinate synchronization or checkpoints in systems that use them.', 'Do not confuse application sessions with TCP connection validity.'], protocols: ['Session management concepts', 'RPC concepts*'], keyPoint: 'Do not assume a distinct Session-layer service exists in every modern network stack; applications often manage session state themselves.' },
//     { number: 6, name: 'Presentation', shortDescription: 'Data representation', description: 'The presentation layer is a conceptual place for data representation and transformation so systems can interpret information consistently.', responsibilities: ['Represent text with character encodings such as UTF-8.', 'Serialize structured data, for example JSON.', 'Apply compression or encryption/decryption concepts where appropriate.'], protocols: ['UTF-8', 'JSON (format)', 'Compression formats', 'TLS*'], keyPoint: 'TLS is often associated conceptually with presentation/security functions, but it is not a clean, separate OSI Layer-6 implementation.' },
//     { number: 7, name: 'Application', shortDescription: 'Network services for applications', description: 'The application layer provides network services and protocol semantics used by software such as browsers, mail clients, and remote administration tools.', responsibilities: ['Define application requests, responses, commands, and message semantics.', 'Use protocol-specific fields such as HTTP methods, headers, paths, and bodies.', 'Use services such as DNS to resolve names and protocols such as SMTP to send mail.'], protocols: ['HTTP', 'DNS', 'SMTP', 'FTP', 'SSH'], keyPoint: 'A browser may create an HTTP request, but not every app message is HTTP; applications can use their own protocols.' },
// ];

// export const tcpIpLayers: NetworkLayer[] = [
//     { number: 1, name: 'Network Access', shortDescription: 'Local-link delivery and media', description: 'Combines link and physical functions for delivery on the local network.', responsibilities: ['Frame data for the local link.', 'Transmit bits through the selected medium.'], protocols: ['Ethernet', 'Wi-Fi'], keyPoint: 'This layer combines OSI Data Link and Physical in the common four-layer TCP/IP model.' },
//     { number: 2, name: 'Internet', shortDescription: 'IP addressing and routing', description: 'Provides logical addressing and packet forwarding between networks.', responsibilities: ['Address packets with IP.', 'Route packets through interconnected networks.'], protocols: ['IP', 'ICMP'], keyPoint: 'Routers use IP destinations and routing tables to forward packets.' },
//     { number: 3, name: 'Transport', shortDescription: 'Process-to-process communication', description: 'Carries data between application endpoints on hosts.', responsibilities: ['Use port numbers.', 'Provide TCP or UDP transport; QUIC runs over UDP.'], protocols: ['TCP', 'UDP', 'QUIC*'], keyPoint: 'Transport behavior depends on the protocol selected by the application.' },
//     { number: 4, name: 'Application', shortDescription: 'Application protocols and data', description: 'Includes application-level protocols and, in this model, presentation/session responsibilities as well.', responsibilities: ['Define application message formats and operations.', 'Handle data representation and session behavior as needed.'], protocols: ['HTTP', 'DNS', 'SSH', 'SMTP'], keyPoint: 'The TCP/IP Application layer combines the top three OSI layers in a common mapping.' },
// ];

// export const osiTcpIpMapping = [
//     { osi: 'OSI 7 — Application', tcpIp: 'TCP/IP Application' },
//     { osi: 'OSI 6 — Presentation', tcpIp: 'TCP/IP Application' },
//     { osi: 'OSI 5 — Session', tcpIp: 'TCP/IP Application' },
//     { osi: 'OSI 4 — Transport', tcpIp: 'TCP/IP Transport' },
//     { osi: 'OSI 3 — Network', tcpIp: 'TCP/IP Internet' },
//     { osi: 'OSI 2 — Data Link', tcpIp: 'TCP/IP Network Access' },
//     { osi: 'OSI 1 — Physical', tcpIp: 'TCP/IP Network Access' },
// ];

// export const whatsappFlow = [
//     { number: 1, title: 'Application — create and send the message', description: 'You type “Hi, kaise ho?” and tap Send. WhatsApp uses its own application-level services and protocols to prepare and deliver the message.', points: ['The message is application data.', 'Do not assume every WhatsApp message is an HTTP request just because HTTP/HTTPS are application-layer examples.'] },
//     { number: 2, title: 'Presentation concepts — represent and protect data', description: 'Data can be serialized and encoded in a format understood by the app. WhatsApp’s end-to-end encryption protects message content between participants.', points: ['Encoding and serialization are data-representation tasks.', 'End-to-end encryption is an application-level security feature; TLS may separately protect a transport channel.', 'TLS is not strictly a standalone OSI Layer-6 implementation.'] },
//     { number: 3, title: 'Session concepts — maintain communication state', description: 'The application may manage account/session state, delivery state, and reconnect behavior. These are not necessarily handled by a distinct OSI Session-layer module.', points: ['Session and reconnection logic is commonly application/protocol-level behavior.', 'A session is not simply “checking whether TCP is valid.”'] },
//     { number: 4, title: 'Transport — carry data between endpoints', description: 'A transport protocol carries data between application endpoints. The protocol determines delivery behavior.', points: ['TCP uses ports and provides ordered, reliable delivery with acknowledgments and retransmissions.', 'UDP is datagram-based; QUIC runs over UDP.', 'Do not describe WhatsApp as universally TCP-only.'] },
//     { number: 5, title: 'Network — IP addressing and routing', description: 'IP packets carry source and destination IP addresses. Routers forward packets toward the destination network using routing information.', points: ['A simplified path may be phone → Wi-Fi router or mobile network → ISP → Internet → service infrastructure.', 'The actual path can vary, and the router chooses a next hop rather than the entire end-to-end route.'] },
//     { number: 6, title: 'Data Link — local-link frame delivery', description: 'The IP packet is carried inside a local-link frame such as a Wi-Fi or Ethernet frame.', points: ['MAC addresses are used on the local link.', 'The phone sends a frame to its immediate link-layer next hop, such as a Wi-Fi access point.', 'Layer-2 addressing can change at each routed hop.'] },
//     { number: 7, title: 'Physical — transmit signals', description: 'Bits are carried over the medium as physical signals.', points: ['Wi-Fi and 4G/5G use radio signals.', 'Copper Ethernet uses electrical signals.', 'Fiber uses optical signals.'] },
// ];

/* ───────────────────────── Types ───────────────────────── */

export interface OsiLayer {
  number: number;
  name: string;
  /** Protocol Data Unit name at this layer */
  pdu: string;
  /** What identifies an endpoint at this layer */
  addressing: string;
  devices: string[];
  protocols: string[];
  en: LayerText;
  hi: LayerText;
}

interface LayerText {
  tagline: string;
  description: string;
  responsibilities: string[];
  example: string;
  analogy: string;
  keyPoint: string;
  troubleshooting: string;
}

export interface TcpIpLayer {
  id: string;
  name: string;
  /** OSI layers this TCP/IP layer covers */
  osiLayers: number[];
  protocols: string[];
  en: { description: string };
  hi: { description: string };
}

export interface EncapStep {
  level: number; // 0..4
  en: { title: string; send: string; receive: string };
  hi: { title: string; send: string; receive: string };
}

export interface FlowStep {
  number: number;
  layer: number;
  en: { title: string; description: string; points: string[] };
  hi: { title: string; description: string; points: string[] };
}

export interface JourneyDevice {
  icon: string;
  /** Highest OSI layer this device looks at while forwarding */
  upTo: number;
  en: string;
  hi: string;
}

/* ───────────────────────── Labels ───────────────────────── */

export const OSI_LABELS = {
  en: {
    lessonTitle: "OSI & TCP/IP Models",
    heroTitle: "How data travels: the OSI and TCP/IP layers",
    heroSubtitle:
      "A layer-by-layer guide to how application data is represented, transported, routed and finally sent as signals across a network.",
    note: "OSI is a conceptual 7-layer reference model. Real Internet protocols do not always fit neatly into one OSI layer — TLS, QUIC and application-managed sessions are common examples.",
    tabs: ["7 Layers", "Encapsulation", "OSI vs TCP/IP", "Real example", "Cheat sheet"],

    layerWord: "Layer",
    stackHint: "Sender: data moves down ↓  ·  Receiver: data moves up ↑",
    pdu: "Data unit",
    addressing: "Addressing",
    whatItDoes: "What it does",
    responsibilities: "Main responsibilities",
    protocols: "Protocols / examples",
    devices: "Devices",
    example: "Example",
    analogy: "Analogy",
    keyPoint: "Key point",
    troubleshooting: "When it breaks",
    layerUp: "Layer above",
    layerDown: "Layer below",
    asterisk: "* does not fit cleanly into a single layer, or depends on the implementation.",

    sender: "Sender (encapsulation)",
    receiver: "Receiver (decapsulation)",
    stepWord: "Step",
    bitsOnMedium: "Bits on the medium (Layer 1)",
    jsonTitle: "Example: JavaScript object → bytes",
    jsonNote:
      "Serialization turns a data structure into a transferable representation. UTF-8 encodes text as bytes. JSON is a format, not a transport protocol.",
    encapHint: "Each lower layer wraps the data from above with the information it needs. The receiver unwraps in reverse order.",

    osiHeader: "OSI model · 7 layers",
    tcpHeader: "TCP/IP model · 4 layers",
    mappingNote:
      "TCP/IP is the practical protocol suite used to describe Internet communication. In the common 4-layer view, OSI Application + Presentation + Session map to TCP/IP Application, and OSI Data Link + Physical map to Network Access.",
    whyBoth: "OSI is mostly used to teach and to talk about problems ('a Layer 2 issue'). TCP/IP is what the Internet actually runs.",

    exampleTitle: "Real-life example: sending “Hi, kaise ho?” on WhatsApp",
    exampleWarning:
      "This is a conceptual mapping. It does not claim that WhatsApp implements each OSI layer as a separate module, or that it always uses one specific transport protocol.",
    journeyTitle: "Which device looks at which layer?",
    journeyIntro:
      "On its way, the message passes through devices. Each one only opens the message as far as its job needs — the data itself is never rebuilt in the middle.",
    journeyNote:
      "Modern firewalls, load balancers and proxies can look deeper (Layer 4–7), but a plain switch works at Layer 2 and a plain router at Layer 3.",
    processes: "looks at this layer",
    upTo: "up to L",

    cheatTitle: "Cheat sheet",
    colLayer: "Layer",
    colName: "Name",
    colPdu: "Data unit",
    colAddress: "Addressing",
    colDevices: "Devices",
    colProtocols: "Protocols",
    mnemonicTitle: "Memory tricks",
    mnemonicUp: "Layer 1 → 7",
    mnemonicDown: "Layer 7 → 1",
    rulesTitle: "Golden rules",
  },
  hi: {
    lessonTitle: "OSI & TCP/IP Models",
    heroTitle: "Data kaise travel karta hai: OSI aur TCP/IP layers",
    heroSubtitle:
      "Layer-by-layer guide: application ka data kaise represent hota hai, transport hota hai, route hota hai aur aakhir mein signals ban ke network par jaata hai.",
    note: "OSI ek conceptual 7-layer reference model hai. Real Internet protocols hamesha kisi ek OSI layer mein fit nahi hote — TLS, QUIC aur application-managed sessions iske common examples hain.",
    tabs: ["7 Layers", "Encapsulation", "OSI vs TCP/IP", "Real example", "Cheat sheet"],

    layerWord: "Layer",
    stackHint: "Sender: data neeche jaata hai ↓  ·  Receiver: data upar aata hai ↑",
    pdu: "Data unit",
    addressing: "Addressing",
    whatItDoes: "Yeh kya karta hai",
    responsibilities: "Main responsibilities",
    protocols: "Protocols / examples",
    devices: "Devices",
    example: "Example",
    analogy: "Analogy",
    keyPoint: "Key point",
    troubleshooting: "Kab problem aati hai",
    layerUp: "Upar wali layer",
    layerDown: "Neeche wali layer",
    asterisk: "* kisi ek layer mein cleanly fit nahi hota, ya implementation pe depend karta hai.",

    sender: "Sender (encapsulation)",
    receiver: "Receiver (decapsulation)",
    stepWord: "Step",
    bitsOnMedium: "Medium par bits (Layer 1)",
    jsonTitle: "Example: JavaScript object → bytes",
    jsonNote:
      "Serialization data structure ko transfer hone layak representation mein badalta hai. UTF-8 text ko bytes mein encode karta hai. JSON ek format hai, transport protocol nahi.",
    encapHint:
      "Har neeche wali layer upar se aaye data ko apni zaroori information ke saath wrap kar deti hai. Receiver ulte order mein unwrap karta hai.",

    osiHeader: "OSI model · 7 layers",
    tcpHeader: "TCP/IP model · 4 layers",
    mappingNote:
      "TCP/IP practical protocol suite hai jisse Internet communication describe hota hai. Common 4-layer view mein OSI ki Application + Presentation + Session, TCP/IP ki Application mein map hoti hain, aur OSI ki Data Link + Physical, Network Access mein.",
    whyBoth: "OSI zyada-tar padhaane aur problems batane ke kaam aata hai ('yeh Layer 2 ka issue hai'). Internet asal mein TCP/IP par chalta hai.",

    exampleTitle: "Real-life example: WhatsApp par “Hi, kaise ho?” bhejna",
    exampleWarning:
      "Yeh ek conceptual mapping hai. Iska matlab yeh nahi ki WhatsApp har OSI layer ko alag module ki tarah implement karta hai, ya hamesha ek hi transport protocol use karta hai.",
    journeyTitle: "Kaun sa device kaun si layer dekhta hai?",
    journeyIntro:
      "Raste mein message kai devices se guzarta hai. Har device message ko utna hi kholta hai jitna uske kaam ke liye chahiye — beech mein data dobara build nahi hota.",
    journeyNote:
      "Modern firewalls, load balancers aur proxies zyada deep (Layer 4–7) dekh sakte hain, lekin ek plain switch Layer 2 par aur plain router Layer 3 par kaam karta hai.",
    processes: "is layer ko dekhta hai",
    upTo: "L",

    cheatTitle: "Cheat sheet",
    colLayer: "Layer",
    colName: "Name",
    colPdu: "Data unit",
    colAddress: "Addressing",
    colDevices: "Devices",
    colProtocols: "Protocols",
    mnemonicTitle: "Yaad rakhne ke tricks",
    mnemonicUp: "Layer 1 → 7",
    mnemonicDown: "Layer 7 → 1",
    rulesTitle: "Golden rules",
  },
} as const;

/* ───────────────────────── OSI layers ───────────────────────── */

export const OSI_LAYERS: OsiLayer[] = [
  {
    number: 1,
    name: "Physical",
    pdu: "Bits",
    addressing: "—",
    devices: ["Cables", "Hubs / repeaters", "Radio & optical transceivers"],
    protocols: ["Ethernet PHY", "Wi-Fi radio (PHY)", "Fibre optics", "Radio signals"],
    en: {
      tagline: "Bits on the wire (or in the air)",
      description:
        "The Physical layer transmits raw bits over a physical medium. It describes signal characteristics, connectors, radio transmission, optical signalling and bit timing. It knows nothing about IP addresses or messages — only 0s and 1s.",
      responsibilities: [
        "Carry bits as electrical, radio or optical signals.",
        "Define physical media, connectors, frequencies and signalling.",
        "Move a bit stream over the medium — it does not interpret addresses or application messages.",
      ],
      example:
        "Your laptop's Wi-Fi card turns bits into radio waves. On Ethernet the same bits travel as voltage changes in a copper cable, and on fibre as pulses of light.",
      analogy: "The road and the trucks: they only move things and don't care what is inside.",
      keyPoint:
        "Bits are transmitted as physical signals: copper uses electrical signals, Wi-Fi uses radio and fibre uses light.",
      troubleshooting: "Cable unplugged or damaged, no link light on the port, weak Wi-Fi signal, radio interference.",
    },
    hi: {
      tagline: "Wire (ya hawa) par bits",
      description:
        "Physical layer raw bits ko physical medium par transmit karti hai. Yeh signal characteristics, connectors, radio transmission, optical signalling aur bit timing describe karti hai. Ise IP addresses ya messages ka kuch pata nahi — sirf 0 aur 1.",
      responsibilities: [
        "Bits ko electrical, radio ya optical signals ki tarah carry karna.",
        "Physical media, connectors, frequencies aur signalling define karna.",
        "Medium par bit stream ko move karna — addresses ya application messages ko interpret nahi karti.",
      ],
      example:
        "Aapke laptop ka Wi-Fi card bits ko radio waves mein badalta hai. Ethernet mein wahi bits copper cable mein voltage changes ki tarah aur fibre mein light pulses ki tarah travel karte hain.",
      analogy: "Sadak aur trucks: woh sirf cheezein le jaate hain, andar kya hai isse unhe matlab nahi.",
      keyPoint:
        "Bits physical signals ke roop mein transmit hote hain: copper mein electrical signals, Wi-Fi mein radio aur fibre mein light.",
      troubleshooting: "Cable nikal gayi ya kharab hai, port par link light nahi, Wi-Fi signal weak, radio interference.",
    },
  },
  {
    number: 2,
    name: "Data Link",
    pdu: "Frame",
    addressing: "MAC address",
    devices: ["Switches", "Wi-Fi access points", "NICs (network cards)"],
    protocols: ["Ethernet", "Wi-Fi (802.11)", "MAC", "ARP*"],
    en: {
      tagline: "Frames and local-link delivery",
      description:
        "The Data Link layer moves frames across a single local link or network segment. Ethernet and Wi-Fi use link-layer (MAC) addressing and frame-level error detection. It only cares about the next device on the same link.",
      responsibilities: [
        "Encapsulate network-layer packets into frames.",
        "Use link-layer addresses such as MAC addresses on Ethernet/Wi-Fi.",
        "Detect frame corruption (for example with an FCS); switching and access-point forwarding happen at this level.",
      ],
      example:
        "Your laptop (192.168.1.4) wants to reach the internet. It wraps the IP packet in a frame addressed to the router's MAC address — the next hop — not to the final server.",
      analogy: "The delivery person who hands a parcel from one house to the next house on the street.",
      keyPoint:
        "MAC addresses are for local-link delivery, not end-to-end Internet routing. Link-layer addressing can change at every hop.",
      troubleshooting: "Wi-Fi connected but no traffic, switch port down, duplicate MAC, wrong VLAN, stale ARP entries.",
    },
    hi: {
      tagline: "Frames aur local-link delivery",
      description:
        "Data Link layer frames ko ek single local link ya network segment ke upar move karti hai. Ethernet aur Wi-Fi link-layer (MAC) addressing aur frame-level error detection use karte hain. Ise sirf usi link ke agle device se matlab hota hai.",
      responsibilities: [
        "Network-layer packets ko frames mein encapsulate karna.",
        "Ethernet/Wi-Fi par MAC addresses jaise link-layer addresses use karna.",
        "Frame corruption detect karna (jaise FCS se); switching aur access-point forwarding isi level par hoti hai.",
      ],
      example:
        "Aapka laptop (192.168.1.4) internet tak pahunchna chahta hai. Woh IP packet ko ek frame mein wrap karta hai jiska address router ka MAC address hota hai — next hop — final server nahi.",
      analogy: "Delivery wala jo parcel ek ghar se agle ghar tak pahunchata hai, gali mein.",
      keyPoint:
        "MAC addresses local-link delivery ke liye hain, end-to-end Internet routing ke liye nahi. Link-layer addressing har hop par badal sakti hai.",
      troubleshooting: "Wi-Fi connected hai par traffic nahi, switch port down, duplicate MAC, galat VLAN, purani ARP entries.",
    },
  },
  {
    number: 3,
    name: "Network",
    pdu: "Packet",
    addressing: "IP address",
    devices: ["Routers", "Layer 3 switches"],
    protocols: ["IPv4", "IPv6", "ICMP"],
    en: {
      tagline: "IP addressing and routing",
      description:
        "The Network layer provides logical addressing and moves packets between different networks. Routers look at the destination IP, match it against routing information (prefixes / subnets) and pick a next hop.",
      responsibilities: [
        "Carry source and destination IP addresses.",
        "Forward IP packets across networks.",
        "Use routing and subnet/prefix information to decide where packets should go (subnet mask and default gateway live here).",
      ],
      example:
        "Your laptop applies its subnet mask to the destination IP. If the target is outside 192.168.1.0/24, the packet goes to the default gateway (the router), which forwards it toward the destination.",
      analogy: "The postal address and the sorting offices that decide which city or region a letter goes to next.",
      keyPoint:
        "IP identifies the logical source and destination. Routers forward packets toward the destination using routing tables — each router chooses only the next hop, not the whole path.",
      troubleshooting: "Wrong IP or subnet mask, wrong default gateway, no route to the network, ping / traceroute failing.",
    },
    hi: {
      tagline: "IP addressing aur routing",
      description:
        "Network layer logical addressing deti hai aur packets ko alag-alag networks ke beech move karti hai. Routers destination IP dekhte hain, use routing information (prefixes / subnets) se match karte hain aur next hop chunte hain.",
      responsibilities: [
        "Source aur destination IP addresses carry karna.",
        "IP packets ko networks ke across forward karna.",
        "Routing aur subnet/prefix information se decide karna ki packet kahan jaana chahiye (subnet mask aur default gateway yahin aate hain).",
      ],
      example:
        "Aapka laptop destination IP par subnet mask apply karta hai. Agar target 192.168.1.0/24 ke bahar hai, toh packet default gateway (router) ko jaata hai, jo use destination ki taraf forward karta hai.",
      analogy: "Postal address aur sorting offices jo decide karte hain ki chitthi agle kis sheher ya region jayegi.",
      keyPoint:
        "IP logical source aur destination ko identify karta hai. Routers routing tables se packet ko destination ki taraf forward karte hain — har router sirf next hop chunta hai, poora path nahi.",
      troubleshooting: "Galat IP ya subnet mask, galat default gateway, network tak route nahi, ping / traceroute fail.",
    },
  },
  {
    number: 4,
    name: "Transport",
    pdu: "Segment / Datagram",
    addressing: "Port number",
    devices: ["Hosts (OS network stack)", "Port-based firewalls", "Layer 4 load balancers"],
    protocols: ["TCP", "UDP", "QUIC*"],
    en: {
      tagline: "Process-to-process delivery",
      description:
        "The Transport layer supports communication between application processes. Port numbers identify endpoints on a host, and different transport protocols give different delivery properties.",
      responsibilities: [
        "Use port numbers to identify application endpoints.",
        "TCP provides ordered, reliable byte-stream delivery with acknowledgments and retransmission.",
        "UDP provides datagrams without TCP-style guarantees; QUIC is built over UDP and adds its own transport features.",
      ],
      example:
        "Your browser opens a connection from a random source port (say 51724) to port 443 on the server. TCP first does a 3-way handshake (SYN → SYN-ACK → ACK) and then sends numbered segments.",
      analogy: "Registered post with tracking, plus the flat number: the IP gets it to the building, the port gets it to the right flat.",
      keyPoint:
        "TCP segments application data and handles reliability and ordering; UDP does not provide those guarantees. QUIC operates over UDP.",
      troubleshooting: "Connection refused (port closed), timeout (blocked by firewall), too many retransmissions, wrong port in the URL.",
    },
    hi: {
      tagline: "Process-to-process delivery",
      description:
        "Transport layer application processes ke beech communication support karti hai. Port numbers host par endpoints ko identify karte hain, aur alag transport protocols alag delivery properties dete hain.",
      responsibilities: [
        "Application endpoints ko identify karne ke liye port numbers use karna.",
        "TCP acknowledgments aur retransmission ke saath ordered, reliable byte-stream delivery deta hai.",
        "UDP TCP jaisi guarantees ke bina datagrams deta hai; QUIC UDP ke upar bana hai aur apne transport features add karta hai.",
      ],
      example:
        "Aapka browser ek random source port (maan lo 51724) se server ke port 443 tak connection kholta hai. TCP pehle 3-way handshake karta hai (SYN → SYN-ACK → ACK) aur phir numbered segments bhejta hai.",
      analogy: "Tracking wali registered post plus flat number: IP building tak pahunchata hai, port sahi flat tak.",
      keyPoint:
        "TCP application data ko segments mein todta hai aur reliability aur ordering sambhalta hai; UDP yeh guarantees nahi deta. QUIC UDP ke upar chalta hai.",
      troubleshooting: "Connection refused (port band), timeout (firewall ne block kiya), bahut retransmissions, URL mein galat port.",
    },
  },
  {
    number: 5,
    name: "Session",
    pdu: "Data",
    addressing: "—",
    devices: ["Hosts (application / session logic)"],
    protocols: ["Session concepts", "RPC concepts*", "Cookies / tokens (app-managed)*"],
    en: {
      tagline: "Logical dialog / session concepts",
      description:
        "The Session layer is a conceptual layer for establishing, managing, synchronising and ending dialogs between applications. In modern systems these responsibilities are usually implemented by application protocols or libraries.",
      responsibilities: [
        "Manage logical dialog / session state.",
        "Coordinate synchronisation or checkpoints in systems that use them.",
        "Do not confuse an application session with TCP connection validity.",
      ],
      example:
        "You stay logged in to a website: a session cookie or token identifies you on every request, even though many separate TCP connections may be opened and closed underneath.",
      analogy: "A phone call: start (dial), keep talking (hold), end (hang up) — while the phone line underneath is a separate thing.",
      keyPoint:
        "Do not assume a distinct Session-layer service exists in every modern network stack; applications often manage session state themselves.",
      troubleshooting: "Session expired, unexpectedly logged out, reconnect loops, lost app state after a network change.",
    },
    hi: {
      tagline: "Logical dialog / session concepts",
      description:
        "Session layer ek conceptual layer hai jo applications ke beech dialogs establish, manage, synchronise aur end karne ke liye hai. Modern systems mein yeh responsibilities aksar application protocols ya libraries implement karti hain.",
      responsibilities: [
        "Logical dialog / session state manage karna.",
        "Jahan zaroorat ho wahan synchronisation ya checkpoints coordinate karna.",
        "Application session ko TCP connection ki validity se confuse na karo.",
      ],
      example:
        "Aap kisi website par logged in rehte ho: session cookie ya token har request par aapko identify karta hai, chahe neeche kai alag TCP connections khulte aur band hote rahein.",
      analogy: "Phone call: shuru (dial), baat-cheet (hold), khatam (hang up) — jabki neeche phone line alag cheez hai.",
      keyPoint:
        "Yeh maan ke mat chalo ki har modern network stack mein alag Session-layer service hoti hai; applications aksar session state khud manage karti hain.",
      troubleshooting: "Session expire, achanak logout, reconnect loops, network badalne par app state kho gayi.",
    },
  },
  {
    number: 6,
    name: "Presentation",
    pdu: "Data",
    addressing: "—",
    devices: ["Hosts (libraries, TLS stack)"],
    protocols: ["UTF-8", "JSON (format)", "Compression formats", "TLS*"],
    en: {
      tagline: "Data representation",
      description:
        "The Presentation layer is a conceptual place for data representation and transformation, so that two systems can interpret information the same way.",
      responsibilities: [
        "Represent text with character encodings such as UTF-8.",
        "Serialise structured data, for example as JSON.",
        "Apply compression or encryption / decryption concepts where appropriate.",
      ],
      example:
        "A JavaScript object { name: \"Gourav\" } is serialised to the JSON text {\"name\":\"Gourav\"}, then encoded as UTF-8 bytes. With HTTPS, those bytes are additionally encrypted.",
      analogy: "Translating your letter into a language both sides understand, and putting it in a sealed envelope.",
      keyPoint:
        "TLS is often associated conceptually with presentation / security functions, but it is not a clean, separate OSI Layer-6 implementation.",
      troubleshooting: "Garbled characters (wrong encoding), invalid JSON, certificate or TLS handshake errors.",
    },
    hi: {
      tagline: "Data representation",
      description:
        "Presentation layer data representation aur transformation ki conceptual jagah hai, taaki do systems information ko ek jaise samajh sakein.",
      responsibilities: [
        "UTF-8 jaise character encodings se text represent karna.",
        "Structured data ko serialise karna, jaise JSON mein.",
        "Jahan zaroori ho compression ya encryption / decryption concepts apply karna.",
      ],
      example:
        "JavaScript object { name: \"Gourav\" } JSON text {\"name\":\"Gourav\"} mein serialise hota hai, phir UTF-8 bytes mein encode hota hai. HTTPS mein yeh bytes upar se encrypt bhi hote hain.",
      analogy: "Apni chitthi ko aisi bhasha mein translate karna jo dono taraf samjhein, aur use sealed envelope mein rakhna.",
      keyPoint:
        "TLS ko conceptually aksar presentation / security functions se jodte hain, lekin woh ek clean, alag OSI Layer-6 implementation nahi hai.",
      troubleshooting: "Garbled characters (galat encoding), invalid JSON, certificate ya TLS handshake errors.",
    },
  },
  {
    number: 7,
    name: "Application",
    pdu: "Data",
    addressing: "Names / URLs (service on a port)",
    devices: ["Client & server apps", "Proxies / Layer 7 load balancers", "Web application firewalls"],
    protocols: ["HTTP / HTTPS", "DNS", "SMTP", "FTP", "SSH"],
    en: {
      tagline: "Network services for applications",
      description:
        "The Application layer provides network services and protocol semantics used by software such as browsers, mail clients and remote administration tools. This is the layer you work with most as a developer.",
      responsibilities: [
        "Define application requests, responses, commands and message semantics.",
        "Use protocol-specific fields such as HTTP methods, headers, paths and bodies.",
        "Use services such as DNS to resolve names, and protocols such as SMTP to send mail.",
      ],
      example:
        "Your React app calls fetch(\"https://api.example.com/users\"). The HTTP request (GET /users, headers, body) is the application data that every lower layer will carry.",
      analogy: "The actual letter you write — its content and meaning.",
      keyPoint:
        "A browser may create an HTTP request, but not every app message is HTTP; applications can use their own protocols.",
      troubleshooting: "HTTP 404 / 500 errors, wrong API URL, DNS name not resolving, CORS or auth problems.",
    },
    hi: {
      tagline: "Applications ke liye network services",
      description:
        "Application layer woh network services aur protocol semantics deti hai jo browsers, mail clients aur remote administration tools jaise software use karte hain. Developer ki tarah aap is layer ke saath sabse zyada kaam karte ho.",
      responsibilities: [
        "Application requests, responses, commands aur message semantics define karna.",
        "HTTP methods, headers, paths aur bodies jaise protocol-specific fields use karna.",
        "Names resolve karne ke liye DNS jaisi services, aur mail bhejne ke liye SMTP jaise protocols use karna.",
      ],
      example:
        "Aapka React app fetch(\"https://api.example.com/users\") call karta hai. HTTP request (GET /users, headers, body) hi woh application data hai jise neeche ki har layer carry karegi.",
      analogy: "Aapki likhi hui asli chitthi — uska content aur matlab.",
      keyPoint:
        "Browser HTTP request bana sakta hai, lekin har app message HTTP nahi hota; applications apne khud ke protocols bhi use kar sakti hain.",
      troubleshooting: "HTTP 404 / 500 errors, galat API URL, DNS name resolve nahi ho raha, CORS ya auth problems.",
    },
  },
];

/* ───────────────────────── TCP/IP layers ───────────────────────── */

export const TCPIP_LAYERS: TcpIpLayer[] = [
  {
    id: "application",
    name: "Application",
    osiLayers: [5, 6, 7],
    protocols: ["HTTP", "DNS", "SMTP", "SSH", "TLS*"],
    en: {
      description:
        "Application-level protocols and, in this model, the presentation and session responsibilities as well: message formats, data representation and session behaviour.",
    },
    hi: {
      description:
        "Application-level protocols aur, is model mein, presentation aur session responsibilities bhi: message formats, data representation aur session behaviour.",
    },
  },
  {
    id: "transport",
    name: "Transport",
    osiLayers: [4],
    protocols: ["TCP", "UDP", "QUIC*"],
    en: {
      description:
        "Carries data between application endpoints on hosts using port numbers. The behaviour depends on the protocol the application picks; QUIC runs over UDP.",
    },
    hi: {
      description:
        "Port numbers ke zariye hosts ke application endpoints ke beech data carry karti hai. Behaviour us protocol par depend karta hai jo application chunti hai; QUIC UDP ke upar chalta hai.",
    },
  },
  {
    id: "internet",
    name: "Internet",
    osiLayers: [3],
    protocols: ["IP", "ICMP"],
    en: {
      description:
        "Logical addressing and packet forwarding between networks. Routers use destination IPs and routing tables to forward packets.",
    },
    hi: {
      description:
        "Networks ke beech logical addressing aur packet forwarding. Routers destination IPs aur routing tables se packets forward karte hain.",
    },
  },
  {
    id: "network-access",
    name: "Network Access",
    osiLayers: [1, 2],
    protocols: ["Ethernet", "Wi-Fi", "ARP*"],
    en: {
      description:
        "Combines the OSI Data Link and Physical layers: framing data for the local link and transmitting the bits through the chosen medium.",
    },
    hi: {
      description:
        "OSI ki Data Link aur Physical layers ko milata hai: local link ke liye data ko frame karna aur chune hue medium se bits transmit karna.",
    },
  },
];

/* ───────────────────────── Encapsulation ───────────────────────── */

export const ENCAP_STEPS: EncapStep[] = [
  {
    level: 0,
    en: {
      title: "Application data",
      send: "Your app creates the message, for example an HTTP request. It is already serialised into bytes (JSON → UTF-8) and, with HTTPS, encrypted.",
      receive: "Finally the receiving application gets the original data back and can read the request.",
    },
    hi: {
      title: "Application data",
      send: "Aapka app message banata hai, jaise ek HTTP request. Woh pehle se bytes mein serialise ho chuka hai (JSON → UTF-8) aur HTTPS mein encrypt bhi.",
      receive: "Aakhir mein receiving application ko original data wapas mil jaata hai aur woh request padh sakti hai.",
    },
  },
  {
    level: 1,
    en: {
      title: "Segment — transport header added",
      send: "TCP adds a header with the source port, destination port, sequence numbers and more. Data + transport header = a segment (UDP: a datagram).",
      receive: "TCP checks the segment, reorders it if needed, uses the destination port to hand the data to the right process, and removes its header.",
    },
    hi: {
      title: "Segment — transport header add hua",
      send: "TCP ek header add karta hai jisme source port, destination port, sequence numbers aur aur cheezein hoti hain. Data + transport header = segment (UDP mein: datagram).",
      receive: "TCP segment check karta hai, zaroorat ho toh reorder karta hai, destination port se data sahi process ko deta hai, aur apna header hata deta hai.",
    },
  },
  {
    level: 2,
    en: {
      title: "Packet — IP header added",
      send: "IP adds the source IP and destination IP. The segment travelling inside an IP header is a packet. Routers use only this header to forward it.",
      receive: "IP checks that the destination IP is its own, removes the IP header and passes the segment up to the transport layer.",
    },
    hi: {
      title: "Packet — IP header add hua",
      send: "IP source IP aur destination IP add karta hai. IP header ke andar travel karne wala segment packet kehlata hai. Routers ise forward karne ke liye sirf yahi header dekhte hain.",
      receive: "IP check karta hai ki destination IP uska apna hai, IP header hata deta hai aur segment ko upar transport layer ko de deta hai.",
    },
  },
  {
    level: 3,
    en: {
      title: "Frame — link header and trailer added",
      send: "Ethernet / Wi-Fi adds a header with the destination and source MAC (for the next hop only) and an FCS trailer for error detection. The result is a frame.",
      receive: "The NIC checks the FCS and the destination MAC, removes the header and trailer, and passes the packet up.",
    },
    hi: {
      title: "Frame — link header aur trailer add hue",
      send: "Ethernet / Wi-Fi ek header add karta hai jisme destination aur source MAC hota hai (sirf next hop ke liye) aur error detection ke liye FCS trailer. Result ek frame hota hai.",
      receive: "NIC FCS aur destination MAC check karta hai, header aur trailer hata deta hai, aur packet ko upar bhej deta hai.",
    },
  },
  {
    level: 4,
    en: {
      title: "Bits — sent as signals",
      send: "The frame is converted into signals on the medium: electrical, radio or light. This is all the receiving hardware sees.",
      receive: "Signals arrive and are converted back into bits. From here the data climbs up the layers, each one removing its header.",
    },
    hi: {
      title: "Bits — signals ki tarah bheje gaye",
      send: "Frame ko medium par signals mein badla jaata hai: electrical, radio ya light. Receiving hardware ko bas yahi dikhta hai.",
      receive: "Signals aate hain aur wapas bits mein convert hote hain. Yahin se data layers mein upar chadhta hai, har layer apna header hatati hai.",
    },
  },
];

/** Example bits for "Hi" (UTF-8) shown on the Layer 1 strip */
export const SAMPLE_BITS = "01001000 01101001 00101100 00100000 …";

export const JSON_EXAMPLE = `JavaScript object
{ name: "Gourav", age: 25 }
        ↓ serialise as JSON
{"name":"Gourav","age":25}
        ↓ encode text as UTF-8
Bytes: 7B 22 6E 61 6D 65 22 3A ...`;

/* ───────────────────────── WhatsApp example ───────────────────────── */

export const WHATSAPP_STEPS: FlowStep[] = [
  {
    number: 1,
    layer: 7,
    en: {
      title: "Application — create and send the message",
      description:
        "You type “Hi, kaise ho?” and tap Send. WhatsApp uses its own application-level services and protocols to prepare and deliver the message.",
      points: [
        "The message is application data.",
        "Don't assume every WhatsApp message is an HTTP request just because HTTP/HTTPS are common application-layer examples.",
      ],
    },
    hi: {
      title: "Application — message banao aur bhejo",
      description:
        "Aap “Hi, kaise ho?” type karke Send dabate ho. WhatsApp message ko prepare aur deliver karne ke liye apni application-level services aur protocols use karta hai.",
      points: [
        "Message application data hai.",
        "Yeh mat maan lo ki har WhatsApp message HTTP request hai, sirf isliye ki HTTP/HTTPS common application-layer examples hain.",
      ],
    },
  },
  {
    number: 2,
    layer: 6,
    en: {
      title: "Presentation concepts — represent and protect data",
      description:
        "Data can be serialised and encoded in a format the app understands. WhatsApp's end-to-end encryption protects the message content between the participants.",
      points: [
        "Encoding and serialisation are data-representation tasks.",
        "End-to-end encryption is an application-level security feature; TLS may separately protect a transport channel.",
        "TLS is not strictly a standalone OSI Layer-6 implementation.",
      ],
    },
    hi: {
      title: "Presentation concepts — data represent aur protect karna",
      description:
        "Data ko serialise aur us format mein encode kiya ja sakta hai jo app samajhta hai. WhatsApp ki end-to-end encryption participants ke beech message content ko protect karti hai.",
      points: [
        "Encoding aur serialisation data-representation ke kaam hain.",
        "End-to-end encryption application-level security feature hai; TLS alag se transport channel ko protect kar sakta hai.",
        "TLS strictly ek standalone OSI Layer-6 implementation nahi hai.",
      ],
    },
  },
  {
    number: 3,
    layer: 5,
    en: {
      title: "Session concepts — maintain communication state",
      description:
        "The application may manage account / session state, delivery state and reconnect behaviour. These are not necessarily handled by a distinct OSI Session-layer module.",
      points: [
        "Session and reconnection logic is usually application- or protocol-level behaviour.",
        "A session is not simply “checking whether the TCP connection is valid”.",
      ],
    },
    hi: {
      title: "Session concepts — communication state maintain karna",
      description:
        "Application account / session state, delivery state aur reconnect behaviour manage kar sakti hai. Yeh zaroori nahi ki kisi alag OSI Session-layer module se handle ho.",
      points: [
        "Session aur reconnection logic aksar application- ya protocol-level behaviour hota hai.",
        "Session ka matlab sirf “TCP connection valid hai ya nahi check karna” nahi hai.",
      ],
    },
  },
  {
    number: 4,
    layer: 4,
    en: {
      title: "Transport — carry data between endpoints",
      description:
        "A transport protocol carries the data between application endpoints. The chosen protocol decides the delivery behaviour.",
      points: [
        "TCP uses ports and provides ordered, reliable delivery with acknowledgments and retransmissions.",
        "UDP is datagram-based; QUIC runs over UDP.",
        "Don't describe WhatsApp as universally TCP-only.",
      ],
    },
    hi: {
      title: "Transport — endpoints ke beech data carry karna",
      description:
        "Transport protocol application endpoints ke beech data carry karta hai. Chuna hua protocol delivery behaviour decide karta hai.",
      points: [
        "TCP ports use karta hai aur acknowledgments aur retransmissions ke saath ordered, reliable delivery deta hai.",
        "UDP datagram-based hai; QUIC UDP ke upar chalta hai.",
        "WhatsApp ko hamesha sirf TCP wala mat batao.",
      ],
    },
  },
  {
    number: 5,
    layer: 3,
    en: {
      title: "Network — IP addressing and routing",
      description:
        "IP packets carry the source and destination IP addresses. Routers forward each packet toward the destination network using routing information.",
      points: [
        "A simplified path: phone → Wi-Fi router or mobile network → ISP → Internet → service infrastructure.",
        "The real path can vary, and each router chooses a next hop — not the whole end-to-end route.",
      ],
    },
    hi: {
      title: "Network — IP addressing aur routing",
      description:
        "IP packets source aur destination IP addresses carry karte hain. Routers routing information se har packet ko destination network ki taraf forward karte hain.",
      points: [
        "Simplified path: phone → Wi-Fi router ya mobile network → ISP → Internet → service infrastructure.",
        "Asli path alag ho sakta hai, aur har router next hop chunta hai — poora end-to-end route nahi.",
      ],
    },
  },
  {
    number: 6,
    layer: 2,
    en: {
      title: "Data Link — local-link frame delivery",
      description: "The IP packet is carried inside a local-link frame such as a Wi-Fi or Ethernet frame.",
      points: [
        "MAC addresses are used on the local link.",
        "The phone sends the frame to its immediate link-layer next hop, such as the Wi-Fi access point.",
        "Layer-2 addressing changes at each routed hop.",
      ],
    },
    hi: {
      title: "Data Link — local-link frame delivery",
      description: "IP packet ek local-link frame ke andar carry hota hai, jaise Wi-Fi ya Ethernet frame.",
      points: [
        "Local link par MAC addresses use hote hain.",
        "Phone frame ko apne immediate link-layer next hop ko bhejta hai, jaise Wi-Fi access point.",
        "Layer-2 addressing har routed hop par badalti hai.",
      ],
    },
  },
  {
    number: 7,
    layer: 1,
    en: {
      title: "Physical — transmit signals",
      description: "Bits are carried over the medium as physical signals.",
      points: [
        "Wi-Fi and 4G/5G use radio signals.",
        "Copper Ethernet uses electrical signals.",
        "Fibre uses optical signals.",
      ],
    },
    hi: {
      title: "Physical — signals transmit karna",
      description: "Bits medium par physical signals ki tarah carry hote hain.",
      points: [
        "Wi-Fi aur 4G/5G radio signals use karte hain.",
        "Copper Ethernet electrical signals use karta hai.",
        "Fibre optical signals use karta hai.",
      ],
    },
  },
];

/** Devices on the path – how far up the stack each one looks */
export const JOURNEY_DEVICES: JourneyDevice[] = [
  { icon: "📱", upTo: 7, en: "Your phone", hi: "Aapka phone" },
  { icon: "📡", upTo: 2, en: "Wi-Fi AP / switch", hi: "Wi-Fi AP / switch" },
  { icon: "🌐", upTo: 3, en: "Routers (ISP)", hi: "Routers (ISP)" },
  { icon: "🖥️", upTo: 7, en: "Server", hi: "Server" },
];

/* ───────────────────────── Cheat sheet ───────────────────────── */

export const MNEMONICS = {
  up: "Please Do Not Throw Sausage Pizza Away",
  down: "All People Seem To Need Data Processing",
};

export const GOLDEN_RULES: { en: string; hi: string }[] = [
  {
    en: "At the sender data moves down the stack (each layer adds a header); at the receiver it moves up (each layer removes it).",
    hi: "Sender par data stack mein neeche jaata hai (har layer header add karti hai); receiver par upar aata hai (har layer hata deti hai).",
  },
  {
    en: "Each layer talks to the same layer on the other side and uses the services of the layer below.",
    hi: "Har layer doosri taraf ki same layer se baat karti hai aur neeche wali layer ki services use karti hai.",
  },
  {
    en: "MAC = the next hop (changes at every hop). IP = the end-to-end address (NAT can rewrite it). Port = which application.",
    hi: "MAC = next hop (har hop par badalta hai). IP = end-to-end address (NAT ise rewrite kar sakta hai). Port = kaun si application.",
  },
  {
    en: "A switch works at Layer 2, a router at Layer 3. Subnet mask and default gateway belong to Layer 3.",
    hi: "Switch Layer 2 par kaam karta hai, router Layer 3 par. Subnet mask aur default gateway Layer 3 ke hain.",
  },
  {
    en: "OSI is a teaching / reference model; TCP/IP is what the Internet actually runs.",
    hi: "OSI teaching / reference model hai; Internet asal mein TCP/IP par chalta hai.",
  },
];