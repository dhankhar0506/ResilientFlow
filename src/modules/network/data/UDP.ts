import type { StepText } from "../../../shared/lessonParts";

export type UdpScene = "lanes" | "cards" | "table";

export interface LanePacket {
  n: number;
  /** 0 = at sender, 1 = at receiver */
  x: number;
  lost?: boolean;
  retry?: boolean;
}

export interface LaneState {
  inFlight: LanePacket[];
  /** what the receiving app has been handed, in order (null = gap) */
  delivered: (number | null)[];
  /** received but held back by TCP until the gap is filled */
  buffered?: number[];
  note: { en: string; hi: string };
  handshake?: boolean;
}

export interface UdpStep {
  id: string;
  phase: string;
  scene: UdpScene;
  tcp?: LaneState;
  udp?: LaneState;
  terminal?: string[];
  en: StepText & { cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { cards?: { name: string; text: string; icon?: string }[] };
}

export const UDP_LABELS = {
  en: {
    lessonTitle: "TCP vs UDP",
    heroTitle: "TCP vs UDP: reliable or fast?",
    heroSubtitle:
      "Send the same 5 packets with both protocols and watch what happens when one gets lost or they arrive out of order.",
    sender: "Sender",
    app: "Receiving app gets",
    buffered: "held by TCP",
    lost: "lost",
    colFeature: "Feature",
    compare: "Side by side",
  },
  hi: {
    lessonTitle: "TCP vs UDP",
    heroTitle: "TCP vs UDP: reliable ya fast?",
    heroSubtitle:
      "Dono protocols se same 5 packets bhejo aur dekho jab ek kho jaaye ya ulte order mein aayein toh kya hota hai.",
    sender: "Sender",
    app: "Receiving app ko milta hai",
    buffered: "TCP ne roka",
    lost: "lost",
    colFeature: "Feature",
    compare: "Aamne saamne",
  },
} as const;

export const COMPARE_ROWS: { en: string[]; hi: string[] }[] = [
  { en: ["Connection", "Handshake first (SYN, SYN-ACK, ACK)", "None – just send"], hi: ["Connection", "Pehle handshake (SYN, SYN-ACK, ACK)", "Kuch nahi – seedha bhejo"] },
  { en: ["Reliability", "Lost data is resent", "Lost data is gone"], hi: ["Reliability", "Lost data dobara bheja jaata hai", "Lost data gaya"] },
  { en: ["Order", "Always in order", "Any order"], hi: ["Order", "Hamesha order mein", "Koi bhi order"] },
  { en: ["Header size", "20 – 60 bytes", "8 bytes"], hi: ["Header size", "20 – 60 bytes", "8 bytes"] },
  { en: ["Speed control", "Flow + congestion control", "None (app decides)"], hi: ["Speed control", "Flow + congestion control", "Kuch nahi (app decide kare)"] },
  { en: ["Data unit", "Byte stream", "Separate datagrams"], hi: ["Data unit", "Byte stream", "Alag-alag datagrams"] },
  { en: ["Used by", "HTTP/1.1, HTTP/2, SSH, email, databases", "DNS, video calls, games, DHCP, QUIC (HTTP/3)"], hi: ["Kaun use karta hai", "HTTP/1.1, HTTP/2, SSH, email, databases", "DNS, video calls, games, DHCP, QUIC (HTTP/3)"] },
];

const n = (en: string, hi: string) => ({ en, hi });

export const UDP_STEPS: UdpStep[] = [
  {
    id: "intro",
    phase: "1 · Two choices",
    scene: "cards",
    en: {
      title: "The transport layer has two main protocols",
      summary: "TCP is the careful courier with tracking. UDP is dropping postcards in the mailbox.",
      detail:
        "Both TCP and UDP run on top of IP and both use port numbers to reach the right app. The difference is how much they promise. A developer (or a protocol designer) picks the one that fits the job.",
      cards: [
        { icon: "🤝", name: "TCP – Transmission Control Protocol", text: "Connection, sequence numbers, ACKs, retransmission, ordering, speed control. Reliable but needs a handshake and adds delay when things go wrong." },
        { icon: "⚡", name: "UDP – User Datagram Protocol", text: "Just source port, destination port, length and checksum. No connection, no ACKs, no resending. Minimal delay, no guarantees." },
      ],
      analogy: "TCP = registered post with tracking and signature. UDP = shouting across the room: fast, but if they missed a word you won't repeat it.",
    },
    hi: {
      title: "Transport layer ke do main protocols",
      summary: "TCP tracking wala careful courier hai. UDP letterbox mein postcard daalna hai.",
      detail:
        "TCP aur UDP dono IP ke upar chalte hain aur dono sahi app tak pahunchne ke liye port numbers use karte hain. Fark yeh hai ki kitna vaada karte hain. Developer (ya protocol designer) kaam ke hisaab se chunta hai.",
      cards: [
        { icon: "🤝", name: "TCP – Transmission Control Protocol", text: "Connection, sequence numbers, ACKs, retransmission, ordering, speed control. Reliable par handshake chahiye aur gadbad hone par delay." },
        { icon: "⚡", name: "UDP – User Datagram Protocol", text: "Sirf source port, destination port, length aur checksum. Na connection, na ACK, na dobara bhejna. Kam se kam delay, koi guarantee nahi." },
      ],
      analogy: "TCP = tracking aur signature wali registered post. UDP = kamre ke us paar chillana: tez, par koi shabd miss hua toh dobara nahi bologe.",
    },
  },
  {
    id: "start",
    phase: "2 · Start sending",
    scene: "lanes",
    tcp: {
      inFlight: [],
      delivered: [null, null, null, null, null],
      handshake: true,
      note: n("First a handshake: SYN → SYN-ACK → ACK. No data yet.", "Pehle handshake: SYN → SYN-ACK → ACK. Abhi data nahi."),
    },
    udp: {
      inFlight: [
        { n: 1, x: 0.75 },
        { n: 2, x: 0.55 },
        { n: 3, x: 0.35 },
        { n: 4, x: 0.15 },
      ],
      delivered: [null, null, null, null, null],
      note: n("No handshake. Packets leave immediately.", "Handshake nahi. Packets turant nikal gaye."),
    },
    en: {
      title: "UDP starts instantly – TCP shakes hands first",
      summary: "UDP's first packet is already on the way while TCP is still setting up the connection.",
      detail:
        "UDP has no connection: the app calls sendto() and the datagram leaves right away. TCP first needs one round trip for the handshake. On a 100 ms link that is 100 ms before the first useful byte – noticeable for a quick DNS lookup or a game input that is just one small packet.",
      term: { name: "Datagram", meaning: "A self-contained UDP message. Each one is sent and delivered (or lost) on its own." },
    },
    hi: {
      title: "UDP turant shuru – TCP pehle haath milata hai",
      summary: "Jab tak TCP connection bana raha hai, UDP ka pehla packet raaste mein hai.",
      detail:
        "UDP mein connection nahi hota: app sendto() call karta hai aur datagram turant nikal jaata hai. TCP ko pehle handshake ke liye ek round trip chahiye. 100 ms ke link par pehle useful byte se pehle 100 ms – chhote DNS lookup ya game ke ek input packet ke liye yeh mehsoos hota hai.",
      term: { name: "Datagram", meaning: "Ek apne-aap mein poora UDP message. Har ek alag se bheja aur deliver (ya lost) hota hai." },
    },
  },
  {
    id: "loss",
    phase: "3 · Packet 3 lost",
    scene: "lanes",
    tcp: {
      inFlight: [{ n: 3, x: 0.5, lost: true }],
      delivered: [1, 2, null, null, null],
      buffered: [4, 5],
      note: n("3 is missing → app gets only 1, 2. 4 and 5 wait in TCP's buffer.", "3 missing → app ko sirf 1, 2. 4 aur 5 TCP ke buffer mein ruke."),
    },
    udp: {
      inFlight: [{ n: 3, x: 0.5, lost: true }],
      delivered: [1, 2, null, 4, 5],
      note: n("3 is gone forever. The app gets 1, 2, 4, 5 and must cope.", "3 hamesha ke liye gaya. App ko 1, 2, 4, 5 mile, khud sambhalna hoga."),
    },
    en: {
      title: "Packet 3 is lost on the way",
      summary: "UDP hands the app 1, 2, 4, 5 immediately. TCP holds 4 and 5 back until 3 is resent.",
      detail:
        "This is the key difference. UDP doesn't notice the loss at all – it delivers whatever arrives, right away. TCP notices the gap through sequence numbers and refuses to give the app bytes out of order: 4 and 5 sit in its receive buffer. Everything after the gap waits. This is called head-of-line blocking.",
      term: { name: "Head-of-line blocking", meaning: "One missing packet holds up all the data behind it, even if that data already arrived." },
    },
    hi: {
      title: "Packet 3 raaste mein kho gaya",
      summary: "UDP app ko turant 1, 2, 4, 5 de deta hai. TCP 4 aur 5 ko rokta hai jab tak 3 dobara na aaye.",
      detail:
        "Yahi asli fark hai. UDP ko loss ka pata hi nahi chalta – jo aaye turant de deta hai. TCP sequence numbers se gap pakadta hai aur app ko ulte order mein bytes nahi deta: 4 aur 5 receive buffer mein baithe hain. Gap ke baad sab intezaar karta hai. Ise head-of-line blocking kehte hain.",
      term: { name: "Head-of-line blocking", meaning: "Ek missing packet uske peeche ka saara data rok deta hai, chahe woh pahunch chuka ho." },
    },
  },
  {
    id: "recover",
    phase: "4 · Recover vs move on",
    scene: "lanes",
    tcp: {
      inFlight: [{ n: 3, x: 0.85, retry: true }],
      delivered: [1, 2, 3, 4, 5],
      note: n("3 is resent → app gets 1, 2, 3, 4, 5 in perfect order (a bit later).", "3 dobara aaya → app ko 1, 2, 3, 4, 5 perfect order mein (thoda late)."),
    },
    udp: {
      inFlight: [],
      delivered: [1, 2, null, 5, 4],
      note: n("No resend. And 5 overtook 4 on the way – UDP doesn't reorder.", "Dobara nahi bheja. Aur 5 ne raaste mein 4 ko overtake kiya – UDP order theek nahi karta."),
    },
    en: {
      title: "TCP repairs the stream; UDP just moves on",
      summary: "TCP retransmits 3 and delivers everything in order. UDP shows 5 before 4 and never gets 3.",
      detail:
        "TCP's data is complete and ordered, but it arrived later than it could have. With UDP the app got data sooner, with a hole and in the wrong order. Which is better depends on the app: a file download must be perfect; a video call would rather skip 20 ms of audio than freeze for 200 ms waiting for it.",
      remember: "TCP: complete and ordered, maybe late. UDP: on time, maybe incomplete.",
    },
    hi: {
      title: "TCP stream theek karta hai; UDP aage badh jaata hai",
      summary: "TCP 3 dobara bhejta hai aur sab order mein deta hai. UDP 4 se pehle 5 dikhata hai aur 3 kabhi nahi milta.",
      detail:
        "TCP ka data complete aur ordered hai, par jitna ho sakta tha usse late aaya. UDP mein app ko data jaldi mila, ek gap ke saath aur galat order mein. Kaunsa better hai yeh app par depend karta hai: file download perfect hona chahiye; video call 200 ms freeze hone se better 20 ms audio skip karna samjhegi.",
      remember: "TCP: complete aur ordered, shayad late. UDP: time par, shayad adhoora.",
    },
  },
  {
    id: "udp-uses",
    phase: "5 · When UDP wins",
    scene: "cards",
    en: {
      title: "When to choose UDP",
      summary: "When fresh data matters more than perfect data, or messages are tiny.",
      detail:
        "In these apps an old packet is useless by the time it would be resent. They use UDP and handle loss themselves – or just ignore it.",
      cards: [
        { icon: "📹", name: "Video & voice calls", text: "Zoom, Meet, WhatsApp calls (RTP over UDP). A lost frame is skipped, not waited for." },
        { icon: "🎮", name: "Online games", text: "Player positions are sent many times per second. The newest one replaces the lost one anyway." },
        { icon: "🔎", name: "DNS", text: "One small question, one small answer (UDP port 53). If no reply, just ask again." },
        { icon: "📡", name: "DHCP, live streams, IoT sensors", text: "Broadcasts and frequent small updates where a handshake is impossible or wasteful." },
      ],
    },
    hi: {
      title: "UDP kab chuno",
      summary: "Jab fresh data perfect data se zyada zaroori ho, ya messages bahut chhote hon.",
      detail:
        "In apps mein purana packet dobara aane tak bekaar ho chuka hota hai. Yeh UDP use karte hain aur loss khud sambhalte hain – ya ignore karte hain.",
      cards: [
        { icon: "📹", name: "Video & voice calls", text: "Zoom, Meet, WhatsApp calls (UDP par RTP). Lost frame skip, intezaar nahi." },
        { icon: "🎮", name: "Online games", text: "Player position second mein kai baar jaati hai. Naya wala waise bhi lost ko replace kar deta hai." },
        { icon: "🔎", name: "DNS", text: "Ek chhota sawaal, ek chhota jawab (UDP port 53). Reply na aaye toh phir pooch lo." },
        { icon: "📡", name: "DHCP, live streams, IoT sensors", text: "Broadcasts aur chhote frequent updates jahan handshake possible nahi ya bekaar hai." },
      ],
    },
  },
  {
    id: "tcp-uses",
    phase: "6 · When TCP wins",
    scene: "cards",
    en: {
      title: "When to choose TCP",
      summary: "When every byte must arrive, exactly once, in order.",
      detail: "Most of what you build as a web developer runs on TCP, because a missing byte would corrupt the result.",
      cards: [
        { icon: "🌐", name: "Web pages & APIs", text: "HTTP/1.1 and HTTP/2 over TCP – a missing byte breaks HTML, JSON or an image." },
        { icon: "📁", name: "File transfer & downloads", text: "A single wrong byte corrupts a zip or an installer." },
        { icon: "✉️", name: "Email (SMTP, IMAP)", text: "Messages must arrive complete." },
        { icon: "🗄️", name: "Databases & SSH", text: "Queries, results and keystrokes must be exact and in order." },
      ],
    },
    hi: {
      title: "TCP kab chuno",
      summary: "Jab har byte pahunchna chahiye, theek ek baar, order mein.",
      detail: "Web developer ke taur par jo zyada tar banate ho woh TCP par chalta hai, kyunki ek byte missing hua toh result kharab.",
      cards: [
        { icon: "🌐", name: "Web pages & APIs", text: "TCP par HTTP/1.1 aur HTTP/2 – ek byte missing toh HTML, JSON ya image toot jaati hai." },
        { icon: "📁", name: "File transfer & downloads", text: "Ek galat byte zip ya installer kharab kar deta hai." },
        { icon: "✉️", name: "Email (SMTP, IMAP)", text: "Message poora pahunchna chahiye." },
        { icon: "🗄️", name: "Databases & SSH", text: "Queries, results aur keystrokes exact aur order mein chahiye." },
      ],
    },
  },
  {
    id: "quic",
    phase: "7 · Best of both",
    scene: "cards",
    en: {
      title: "QUIC & HTTP/3: reliability built on top of UDP",
      summary: "Modern browsers often use QUIC: UDP underneath, with its own ACKs, retransmission and TLS 1.3 on top.",
      detail:
        "TCP is built into every operating system and is hard to change, and its head-of-line blocking hurts when one connection carries many files. Google designed QUIC (now an IETF standard) to run over UDP port 443. It adds reliability per stream, so one lost packet only delays its own file, and it combines the transport and TLS handshakes to save a round trip. HTTP/3 runs on QUIC. Open DevTools → Network → Protocol column and you may see “h3”.",
      cards: [
        { icon: "🧱", name: "Under the hood", text: "UDP datagrams on port 443." },
        { icon: "🧩", name: "Inside QUIC", text: "Streams, ACKs, retransmission, congestion control, always encrypted with TLS 1.3." },
        { icon: "🚀", name: "Win", text: "Faster connection setup and no head-of-line blocking between streams." },
      ],
      remember: "UDP isn't “unreliable” for the app – it just leaves reliability to the app (or to QUIC).",
    },
    hi: {
      title: "QUIC & HTTP/3: UDP ke upar bani reliability",
      summary: "Modern browsers aksar QUIC use karte hain: neeche UDP, upar apne ACKs, retransmission aur TLS 1.3.",
      detail:
        "TCP har operating system mein built-in hai aur badalna mushkil hai, aur jab ek connection par kai files hon toh head-of-line blocking nuksaan karti hai. Google ne QUIC (ab IETF standard) banaya jo UDP port 443 par chalta hai. Woh har stream ke liye alag reliability deta hai, toh ek lost packet sirf apni file ko late karta hai, aur transport aur TLS handshake ko jod kar ek round trip bachata hai. HTTP/3 QUIC par chalta hai. DevTools → Network → Protocol column kholo, “h3” dikh sakta hai.",
      cards: [
        { icon: "🧱", name: "Andar", text: "Port 443 par UDP datagrams." },
        { icon: "🧩", name: "QUIC ke andar", text: "Streams, ACKs, retransmission, congestion control, hamesha TLS 1.3 se encrypted." },
        { icon: "🚀", name: "Fayda", text: "Tez connection setup aur streams ke beech head-of-line blocking nahi." },
      ],
      remember: "UDP app ke liye “unreliable” nahi – woh bas reliability app (ya QUIC) par chhod deta hai.",
    },
  },
  {
    id: "table",
    phase: "8 · Compare",
    scene: "table",
    terminal: [
      "# DNS normally uses UDP port 53",
      "$ nslookup example.com",
      "# list UDP sockets",
      "$ ss -uan                 # Linux",
      "> netstat -an -p udp      # Windows",
      "# Wireshark filters",
      "udp            tcp            quic",
    ],
    en: {
      title: "TCP vs UDP – the full comparison",
      summary: "Same job (carry data between apps), opposite trade-offs.",
      detail:
        "Use this table as your cheat sheet. In interviews the classic question is “why does DNS use UDP but HTTP uses TCP?” – answer with the rows: DNS messages are tiny and can simply be re-asked, while a web page must arrive complete and in order. (DNS does switch to TCP for very large answers and zone transfers.)",
      remember: "Need every byte? TCP. Need it now? UDP.",
    },
    hi: {
      title: "TCP vs UDP – poora comparison",
      summary: "Kaam same (apps ke beech data le jaana), trade-offs bilkul ulte.",
      detail:
        "Is table ko cheat sheet samjho. Interviews mein classic sawaal hai “DNS UDP kyun use karta hai par HTTP TCP?” – rows se jawab do: DNS messages chhote hain aur dobara poochhe ja sakte hain, jabki web page poora aur order mein aana chahiye. (Bahut bade answers aur zone transfers ke liye DNS TCP use karta hai.)",
      remember: "Har byte chahiye? TCP. Abhi chahiye? UDP.",
    },
  },
];
