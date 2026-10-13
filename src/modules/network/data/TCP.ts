import type { StepText } from "../../../shared/lessonParts";

export type TcpScene = "sequence" | "cards";

export interface TcpMsg {
  /** "C" = client → server, "S" = server → client, "band" = a grey summary line */
  dir: "C" | "S" | "band";
  flags: string;
  info: string;
  lost?: boolean;
  /** retransmitted copy */
  retry?: boolean;
}

export interface TcpSegment {
  flags: string;
  seq: string;
  ack: string;
  len: string;
  meaning: string;
}

export interface TcpStep {
  id: string;
  phase: string;
  scene: TcpScene;
  msgs: TcpMsg[];
  clientState: string;
  serverState: string;
  segment?: TcpSegment;
  /** show a timeout clock on the client */
  timer?: boolean;
  terminal?: string[];
  en: StepText & { cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { cards?: { name: string; text: string; icon?: string }[] };
}

export const TCP_LABELS = {
  en: {
    lessonTitle: "TCP",
    heroTitle: "TCP: reliable delivery over an unreliable network",
    heroSubtitle:
      "Watch the 3-way handshake, sequence and acknowledgement numbers, a lost segment being retransmitted, and the connection closing – as a live timeline.",
    client: "Client (browser)",
    server: "Server (:443)",
    time: "time ↓",
    segment: "Segment at this step",
    flags: "Flags",
    seq: "Seq number",
    ack: "Ack number",
    len: "Data length",
    meaning: "Meaning",
    lost: "LOST",
    timeout: "timeout!",
  },
  hi: {
    lessonTitle: "TCP",
    heroTitle: "TCP: unreliable network par reliable delivery",
    heroSubtitle:
      "3-way handshake, sequence aur acknowledgement numbers, lost segment ka retransmission, aur connection band hona – live timeline ki tarah dekho.",
    client: "Client (browser)",
    server: "Server (:443)",
    time: "time ↓",
    segment: "Is step ka segment",
    flags: "Flags",
    seq: "Seq number",
    ack: "Ack number",
    len: "Data length",
    meaning: "Matlab",
    lost: "LOST",
    timeout: "timeout!",
  },
} as const;

const SYN: TcpMsg = { dir: "C", flags: "SYN", info: "seq=1000" };
const SYNACK: TcpMsg = { dir: "S", flags: "SYN, ACK", info: "seq=5000 ack=1001" };
const ACK3: TcpMsg = { dir: "C", flags: "ACK", info: "seq=1001 ack=5001" };
const HS_BAND: TcpMsg = { dir: "band", flags: "3-way handshake ✓", info: "SYN → SYN-ACK → ACK · ESTABLISHED" };
const DATA1: TcpMsg = { dir: "C", flags: "PSH, ACK", info: "seq=1001 len=500 · GET /" };
const ACK1: TcpMsg = { dir: "S", flags: "ACK", info: "ack=1501" };
const DATA2: TcpMsg = { dir: "C", flags: "ACK", info: "seq=1501 len=500" };
const DATA3_LOST: TcpMsg = { dir: "C", flags: "ACK", info: "seq=2001 len=500", lost: true };
const ACK2: TcpMsg = { dir: "S", flags: "ACK", info: "ack=2001 (still waiting for 2001)" };
const DATA3_RETRY: TcpMsg = { dir: "C", flags: "ACK", info: "seq=2001 len=500 · resend", retry: true };
const ACK3B: TcpMsg = { dir: "S", flags: "ACK", info: "ack=2501" };
const DATA_BAND: TcpMsg = { dir: "band", flags: "data transfer ✓", info: "1500 bytes sent, all acknowledged" };

export const TCP_STEPS: TcpStep[] = [
  {
    id: "why",
    phase: "1 · Why TCP",
    scene: "cards",
    msgs: [],
    clientState: "CLOSED",
    serverState: "LISTEN",
    en: {
      title: "IP only does “best effort”. TCP adds the guarantees.",
      summary: "Packets can get lost, duplicated or arrive out of order. TCP fixes all of that for your app.",
      detail:
        "IP just tries to deliver each packet; it gives no promise. Routers drop packets when they are busy, packets take different paths and arrive in a different order, and sometimes a copy arrives twice. Web pages, file downloads, emails and database queries can't accept a single missing byte. TCP (Transmission Control Protocol) runs on both computers and turns this messy delivery into a clean, ordered, reliable stream of bytes.",
      cards: [
        { icon: "🕳️", name: "Lost packets", text: "TCP notices missing data and sends it again (retransmission)." },
        { icon: "🔀", name: "Out of order", text: "Sequence numbers let the receiver put bytes back in the right order." },
        { icon: "👯", name: "Duplicates", text: "Already-received bytes are recognised by their sequence number and thrown away." },
        { icon: "🚦", name: "Too fast", text: "Flow and congestion control slow the sender down so nobody is overwhelmed." },
      ],
      term: { name: "Connection-oriented", meaning: "Both sides first agree to talk (handshake) and keep state about the conversation until it is closed." },
    },
    hi: {
      title: "IP sirf “best effort” karta hai. TCP guarantee deta hai.",
      summary: "Packets kho sakte hain, duplicate ho sakte hain ya ulte order mein aa sakte hain. TCP yeh sab app ke liye theek karta hai.",
      detail:
        "IP bas har packet pahunchane ki koshish karta hai; koi vaada nahi. Busy router packets drop karte hain, packets alag raaston se jaakar ulte order mein aate hain, kabhi copy do baar aa jaati hai. Web pages, file downloads, emails aur database queries ek byte bhi missing bardaasht nahi kar sakte. TCP (Transmission Control Protocol) dono computers par chalta hai aur is gadbad delivery ko saaf, ordered, reliable byte stream bana deta hai.",
      cards: [
        { icon: "🕳️", name: "Lost packets", text: "TCP missing data pakadta hai aur dobara bhejta hai (retransmission)." },
        { icon: "🔀", name: "Out of order", text: "Sequence numbers se receiver bytes ko sahi order mein lagata hai." },
        { icon: "👯", name: "Duplicates", text: "Pehle se mile bytes sequence number se pehchan kar phenk diye jaate hain." },
        { icon: "🚦", name: "Bahut tez", text: "Flow aur congestion control sender ko dheema karte hain taaki koi overload na ho." },
      ],
      term: { name: "Connection-oriented", meaning: "Dono side pehle baat karne par agree karti hain (handshake) aur band hone tak conversation ki state rakhti hain." },
    },
  },
  {
    id: "syn",
    phase: "2 · Handshake 1/3",
    scene: "sequence",
    msgs: [SYN],
    clientState: "SYN-SENT",
    serverState: "SYN-RECEIVED",
    segment: { flags: "SYN", seq: "1000", ack: "—", len: "0", meaning: "“I want to connect. My bytes will start counting from 1000.”" },
    en: {
      title: "SYN: “Can we talk? I'll start counting at 1000.”",
      summary: "The client sends a segment with the SYN flag and its random starting sequence number.",
      detail:
        "Before any data, both sides must agree to talk and exchange starting numbers. The client sends a SYN (synchronize) segment with an Initial Sequence Number – a random number, here 1000. Random starting numbers make it hard for attackers to inject fake segments and avoid confusion with old connections. The client is now in state SYN-SENT.",
      term: { name: "Sequence number", meaning: "A counter for bytes sent. Every byte in the stream has a number, starting from the ISN + 1." },
    },
    hi: {
      title: "SYN: “Baat karein? Main 1000 se ginti shuru karunga.”",
      summary: "Client SYN flag aur apne random starting sequence number ke saath segment bhejta hai.",
      detail:
        "Data se pehle dono side ko baat karne par agree karna aur starting numbers exchange karne padte hain. Client SYN (synchronize) segment bhejta hai jismein Initial Sequence Number hota hai – ek random number, yahan 1000. Random start se attackers ke liye nakli segments ghusana mushkil hota hai aur purane connections se confusion nahi hota. Client ab SYN-SENT state mein hai.",
      term: { name: "Sequence number", meaning: "Bheje gaye bytes ka counter. Stream ke har byte ka number hota hai, ISN + 1 se shuru." },
    },
  },
  {
    id: "synack",
    phase: "3 · Handshake 2/3",
    scene: "sequence",
    msgs: [SYN, SYNACK],
    clientState: "SYN-SENT",
    serverState: "SYN-RECEIVED",
    segment: { flags: "SYN, ACK", seq: "5000", ack: "1001", len: "0", meaning: "“OK! I got your 1000, next I expect 1001. I'll start counting at 5000.”" },
    en: {
      title: "SYN-ACK: “Yes. I'll start at 5000, and I expect your 1001 next.”",
      summary: "The server acknowledges the client's SYN and sends its own SYN in the same segment.",
      detail:
        "The server is listening on port 443, so it accepts. It replies with both flags set: ACK with ack = 1001 (“I received up to 1000; the next byte I expect is 1001”) and SYN with its own random starting number 5000. Notice the rule: the ack number is always the next sequence number the receiver expects.",
      remember: "Ack number = the next byte I expect from you.",
    },
    hi: {
      title: "SYN-ACK: “Haan. Main 5000 se shuru karunga, aur ab tumhara 1001 chahiye.”",
      summary: "Server client ke SYN ko acknowledge karta hai aur usi segment mein apna SYN bhejta hai.",
      detail:
        "Server port 443 par listen kar raha hai, toh accept karta hai. Woh dono flags ke saath reply karta hai: ACK, ack = 1001 (“1000 tak mil gaya; agla byte 1001 chahiye”) aur SYN apne random starting number 5000 ke saath. Rule dekho: ack number hamesha woh agla sequence number hai jo receiver expect karta hai.",
      remember: "Ack number = agla byte jo mujhe tumse chahiye.",
    },
  },
  {
    id: "ack",
    phase: "4 · Handshake 3/3",
    scene: "sequence",
    msgs: [SYN, SYNACK, ACK3],
    clientState: "ESTABLISHED",
    serverState: "ESTABLISHED",
    segment: { flags: "ACK", seq: "1001", ack: "5001", len: "0", meaning: "“Got your 5000. Connection open!”" },
    en: {
      title: "ACK: the connection is ESTABLISHED",
      summary: "The client acknowledges the server's SYN. Three segments, and both sides are ready.",
      detail:
        "The client sends ACK with ack = 5001. Now both sides know each other's starting numbers and know that the other side can send and receive. Both move to ESTABLISHED. This is the famous 3-way handshake. It costs one round trip before data can flow – one reason HTTP keeps connections open and reuses them (keep-alive).",
      remember: "3-way handshake: SYN → SYN-ACK → ACK.",
    },
    hi: {
      title: "ACK: connection ESTABLISHED",
      summary: "Client server ke SYN ko acknowledge karta hai. Teen segments, aur dono side tayyar.",
      detail:
        "Client ack = 5001 ke saath ACK bhejta hai. Ab dono ko ek dusre ke starting numbers pata hain aur yeh bhi ki saamne wala bhej aur le sakta hai. Dono ESTABLISHED ho jaate hain. Yahi famous 3-way handshake hai. Data se pehle ek round trip lagta hai – isliye HTTP connections khule rakh kar reuse karta hai (keep-alive).",
      remember: "3-way handshake: SYN → SYN-ACK → ACK.",
    },
  },
  {
    id: "data",
    phase: "5 · Send data",
    scene: "sequence",
    msgs: [HS_BAND, DATA1],
    clientState: "ESTABLISHED",
    serverState: "ESTABLISHED",
    segment: { flags: "PSH, ACK", seq: "1001", ack: "5001", len: "500", meaning: "“Here are bytes 1001 – 1500 (the HTTP request).”" },
    en: {
      title: "Data: bytes 1001 to 1500",
      summary: "The client sends 500 bytes of the HTTP request. The sequence number is the number of the first byte.",
      detail:
        "TCP treats data as one long stream of bytes. This segment carries 500 bytes, starting at sequence number 1001, so it contains bytes 1001 – 1500. The application (the browser) just wrote “GET / …” to the socket; TCP decides how to cut the stream into segments, usually up to about 1460 bytes each on Ethernet (the MSS).",
      term: { name: "MSS", meaning: "Maximum Segment Size – the most data one TCP segment carries, ~1460 bytes on a normal Ethernet path." },
    },
    hi: {
      title: "Data: bytes 1001 se 1500",
      summary: "Client HTTP request ke 500 bytes bhejta hai. Sequence number pehle byte ka number hai.",
      detail:
        "TCP data ko bytes ki ek lambi stream maanta hai. Is segment mein 500 bytes hain, sequence number 1001 se, yaani bytes 1001 – 1500. Application (browser) ne bas socket mein “GET / …” likha; TCP decide karta hai stream ko segments mein kaise kaate, Ethernet par aam taur par ~1460 bytes tak (MSS).",
      term: { name: "MSS", meaning: "Maximum Segment Size – ek TCP segment mein zyada se zyada data, normal Ethernet par ~1460 bytes." },
    },
  },
  {
    id: "data-ack",
    phase: "6 · Acknowledge",
    scene: "sequence",
    msgs: [HS_BAND, DATA1, ACK1],
    clientState: "ESTABLISHED",
    serverState: "ESTABLISHED",
    segment: { flags: "ACK", seq: "5001", ack: "1501", len: "0", meaning: "“Received everything up to 1500. Send 1501 next.”" },
    en: {
      title: "ACK 1501: “I have everything up to 1500”",
      summary: "The server confirms it received the bytes by acknowledging the next byte it expects: 1501.",
      detail:
        "Ack = 1001 + 500 = 1501. The client can now forget bytes 1001 – 1500 from its send buffer, because they arrived safely. In real life the sender doesn't wait for an ACK after every segment: it sends several (as many as the window allows) and ACKs come back for them. One ACK can also confirm many segments at once (cumulative acknowledgement).",
      remember: "Next ack = seq + length.",
    },
    hi: {
      title: "ACK 1501: “1500 tak sab mil gaya”",
      summary: "Server agla expected byte 1501 acknowledge karke confirm karta hai ki bytes mil gaye.",
      detail:
        "Ack = 1001 + 500 = 1501. Ab client apne send buffer se bytes 1001 – 1500 hata sakta hai, kyunki woh safe pahunch gaye. Asal mein sender har segment ke baad ACK ka intezaar nahi karta: window jitne allow kare utne segments bhejta hai aur unke ACK aate rehte hain. Ek ACK kai segments ek saath confirm kar sakta hai (cumulative acknowledgement).",
      remember: "Agla ack = seq + length.",
    },
  },
  {
    id: "loss",
    phase: "7 · A segment is lost",
    scene: "sequence",
    msgs: [HS_BAND, DATA1, ACK1, DATA2, DATA3_LOST, ACK2],
    clientState: "ESTABLISHED",
    serverState: "ESTABLISHED",
    timer: true,
    segment: { flags: "ACK", seq: "5001", ack: "2001", len: "0", meaning: "“I got up to 2000. I'm still waiting for 2001.”" },
    en: {
      title: "A segment disappears on the way",
      summary: "Bytes 2001 – 2500 are dropped by a busy router. The server keeps acknowledging 2001.",
      detail:
        "The client sends two more segments: 1501 – 2000 arrives, but 2001 – 2500 is dropped somewhere. The server acknowledges what it has: ack = 2001. That number tells the client exactly what is missing. Meanwhile the client started a retransmission timer when it sent 2001; no ACK covering it has arrived yet.",
      points: ["seq=1501 → arrives → ack 2001", "seq=2001 → lost ✗", "server can only say ack 2001 – it never got 2001"],
    },
    hi: {
      title: "Ek segment raaste mein gayab",
      summary: "Bytes 2001 – 2500 busy router ne drop kar diye. Server ack 2001 hi bhejta rehta hai.",
      detail:
        "Client do aur segments bhejta hai: 1501 – 2000 pahunch jaata hai, par 2001 – 2500 kahin drop ho jaata hai. Server jo mila uska ack deta hai: ack = 2001. Yeh number client ko batata hai ki exactly kya missing hai. Saath hi client ne 2001 bhejte waqt retransmission timer shuru kiya tha; usko cover karne wala ACK abhi tak nahi aaya.",
      points: ["seq=1501 → pahuncha → ack 2001", "seq=2001 → lost ✗", "server sirf ack 2001 bol sakta hai – use 2001 mila hi nahi"],
    },
  },
  {
    id: "retransmit",
    phase: "8 · Retransmission",
    scene: "sequence",
    msgs: [HS_BAND, DATA2, DATA3_LOST, ACK2, DATA3_RETRY, ACK3B],
    clientState: "ESTABLISHED",
    serverState: "ESTABLISHED",
    segment: { flags: "ACK", seq: "2001", ack: "5001", len: "500", meaning: "Same bytes 2001 – 2500 sent again → server now acks 2501." },
    en: {
      title: "Timeout → resend → ACK 2501",
      summary: "The client's timer runs out (or it sees repeated ACKs), so it sends bytes 2001 – 2500 again.",
      detail:
        "When the retransmission timer expires, the client resends the missing segment. This time it arrives, and the server replies ack = 2501: everything up to 2500 is here. If later segments had already arrived, the server keeps them in a buffer and acks them all at once. Faster still: if the sender gets 3 duplicate ACKs for the same number it retransmits immediately without waiting for the timer (fast retransmit). Your app never notices any of this – it just reads a complete, ordered stream.",
      term: { name: "Retransmission", meaning: "Resending data that wasn't acknowledged in time." },
      remember: "No ACK in time → send it again. That's the heart of TCP reliability.",
    },
    hi: {
      title: "Timeout → dobara bhejo → ACK 2501",
      summary: "Client ka timer khatam (ya repeated ACKs dikhe), isliye bytes 2001 – 2500 dobara bhejta hai.",
      detail:
        "Retransmission timer expire hone par client missing segment dobara bhejta hai. Is baar pahunch jaata hai, aur server ack = 2501 deta hai: 2500 tak sab aa gaya. Agar baad ke segments pehle aa chuke the, toh server unhe buffer mein rakhta hai aur sabka ek saath ack deta hai. Aur tez: agar sender ko same number ke 3 duplicate ACKs milein toh woh timer ka intezaar kiye bina turant bhejta hai (fast retransmit). Aapke app ko kuch pata nahi chalta – use bas complete, ordered stream milti hai.",
      term: { name: "Retransmission", meaning: "Jo data time par acknowledge nahi hua use dobara bhejna." },
      remember: "Time par ACK nahi → dobara bhejo. Yahi TCP reliability ka dil hai.",
    },
  },
  {
    id: "control",
    phase: "9 · Speed control",
    scene: "cards",
    msgs: [],
    clientState: "ESTABLISHED",
    serverState: "ESTABLISHED",
    en: {
      title: "Flow control and congestion control",
      summary: "TCP also decides how fast to send – so it doesn't drown the receiver or the network.",
      detail:
        "Sending one segment and waiting for its ACK would be very slow, so TCP keeps several segments “in flight”. How many? Two limits decide, and the smaller one wins.",
      cards: [
        { icon: "🪣", name: "Flow control (receiver window)", text: "Every ACK carries a window size: “I have 64 KB of free buffer.” The sender never sends more than that unacknowledged. Protects a slow receiver." },
        { icon: "🚗", name: "Congestion control (network)", text: "Slow start: begin with a few segments and double every round trip. On packet loss, cut the speed down and grow carefully. Protects the network." },
        { icon: "📈", name: "Result", text: "Downloads start slowly and speed up in the first second – that's slow start you can actually see." },
      ],
      term: { name: "Window", meaning: "How many bytes may be sent without waiting for an acknowledgement." },
    },
    hi: {
      title: "Flow control aur congestion control",
      summary: "TCP yeh bhi decide karta hai kitni speed se bhejna hai – taaki receiver ya network na doobe.",
      detail:
        "Ek segment bhej kar uske ACK ka intezaar karna bahut slow hoga, isliye TCP kai segments “raaste mein” rakhta hai. Kitne? Do limits decide karti hain, aur jo chhoti ho woh jeet-ti hai.",
      cards: [
        { icon: "🪣", name: "Flow control (receiver window)", text: "Har ACK mein window size hota hai: “mere paas 64 KB khaali buffer hai.” Sender usse zyada bina-ack data nahi bhejta. Slow receiver ko bachata hai." },
        { icon: "🚗", name: "Congestion control (network)", text: "Slow start: kuch segments se shuru karo aur har round trip mein double. Packet loss par speed kam karo aur dheere badhao. Network ko bachata hai." },
        { icon: "📈", name: "Result", text: "Downloads dheere shuru hokar pehle second mein tez hote hain – yahi slow start hai jo aap dekh sakte ho." },
      ],
      term: { name: "Window", meaning: "Kitne bytes bina acknowledgement ka intezaar kiye bheje ja sakte hain." },
    },
  },
  {
    id: "close",
    phase: "10 · Close",
    scene: "sequence",
    msgs: [
      HS_BAND,
      DATA_BAND,
      { dir: "C", flags: "FIN, ACK", info: "seq=2501" },
      { dir: "S", flags: "ACK", info: "ack=2502" },
      { dir: "S", flags: "FIN, ACK", info: "seq=5001" },
      { dir: "C", flags: "ACK", info: "ack=5002" },
    ],
    clientState: "TIME_WAIT",
    serverState: "CLOSED",
    segment: { flags: "FIN", seq: "2501", ack: "5001", len: "0", meaning: "“I have nothing more to send.”" },
    en: {
      title: "Closing: FIN, ACK, FIN, ACK",
      summary: "Each side says “I'm done sending” with FIN, and the other side acknowledges it.",
      detail:
        "TCP is two one-way streams, so each direction is closed separately. The client sends FIN; the server ACKs it (it may still send remaining data). When the server is done, it sends its own FIN and the client ACKs. The side that closed first waits a short time in TIME_WAIT to catch any late, duplicate segments before the connection is fully forgotten. An abrupt alternative is RST (reset), which kills the connection instantly.",
      points: ["FIN = graceful “I'm done”", "RST = abort immediately", "TIME_WAIT = short wait before forgetting the connection"],
    },
    hi: {
      title: "Band karna: FIN, ACK, FIN, ACK",
      summary: "Har side FIN se kehti hai “mera bhejna khatam”, aur dusri side use acknowledge karti hai.",
      detail:
        "TCP do one-way streams hai, isliye har direction alag se band hoti hai. Client FIN bhejta hai; server ACK deta hai (woh bacha hua data abhi bhi bhej sakta hai). Server ka kaam khatam hone par woh apna FIN bhejta hai aur client ACK deta hai. Jo side pehle band karti hai woh thodi der TIME_WAIT mein rukti hai taaki late duplicate segments pakad sake. Achanak band karne ka tareeka RST (reset) hai, jo connection turant khatam karta hai.",
      points: ["FIN = aaram se “mera ho gaya”", "RST = turant abort", "TIME_WAIT = connection bhoolne se pehle chhota intezaar"],
    },
  },
  {
    id: "see-it",
    phase: "11 · See it",
    scene: "sequence",
    msgs: [SYN, SYNACK, ACK3, DATA1, ACK1],
    clientState: "ESTABLISHED",
    serverState: "ESTABLISHED",
    terminal: [
      "$ curl -v https://example.com",
      "*   Trying 203.0.113.10:443...",
      "* Connected to example.com (203.0.113.10) port 443   ← handshake done",
      "",
      "# Wireshark display filters",
      "tcp.flags.syn == 1          # handshakes",
      "tcp.analysis.retransmission # resent segments",
      "tcp.stream eq 0             # one whole conversation",
    ],
    en: {
      title: "See TCP for yourself",
      summary: "curl -v shows when the connection is made; Wireshark shows every SYN, ACK and retransmission.",
      detail:
        "Install Wireshark, start a capture, and open any website. Right-click a packet → Follow → TCP Stream to see one conversation. You will recognise everything from this lesson: SYN, SYN-ACK, ACK, then data with growing sequence numbers, ACKs, and at the end FIN or RST. Wireshark shows relative sequence numbers (starting at 0) to make them easier to read.",
      remember: "TCP = handshake + numbered bytes + ACKs + retransmission + flow/congestion control + clean close.",
    },
    hi: {
      title: "TCP khud dekho",
      summary: "curl -v dikhata hai connection kab bana; Wireshark har SYN, ACK aur retransmission dikhata hai.",
      detail:
        "Wireshark install karo, capture start karo, aur koi bhi website kholo. Packet par right-click → Follow → TCP Stream se ek poori conversation dikhegi. Is lesson ki har cheez pehchanoge: SYN, SYN-ACK, ACK, phir badhte sequence numbers ke saath data, ACKs, aur end mein FIN ya RST. Wireshark padhne mein aasaani ke liye relative sequence numbers (0 se shuru) dikhata hai.",
      remember: "TCP = handshake + numbered bytes + ACKs + retransmission + flow/congestion control + clean close.",
    },
  },
];
