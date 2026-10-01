

export type Bi = { en: string; hi: string };
const b = (en: string, hi: string = en): Bi => ({ en, hi });

export const HTTP_UI = {
  en: {
    lessonTitle: "HTTP Request & Response",
    requestJourney: "Journey",
    known: "Known so far",
    domain: "Domain",
    protocol: "Protocol",
    source: "From",
    destination: "To",
    tabAnalogy: "Real life",
    tabWords: "Key words",
    tabLayers: "Wrapping",
    tabDetails: "Details",
    diagramLabel: "Picture it",
    dataLabel: "Moving now",
    readMore: "Read more",
    layerData: "Message (HTTP)",
    layerTls: "TLS record",
    layerSegment: "TCP segment",
    layerPacket: "IP packet",
    layerFrame: "Link frame",
    physicalNote: "The frame travels as electric, radio or light signals.",
    layersHint: "Each layer adds its own wrapper as data travels.",
  },
  hi: {
    lessonTitle: "HTTP Request & Response",
    requestJourney: "Safar",
    known: "Ab tak pata hai",
    domain: "Domain",
    protocol: "Protocol",
    source: "Kaha se",
    destination: "Kaha tak",
    tabAnalogy: "Real life",
    tabWords: "Zaroori words",
    tabLayers: "Wrapping",
    tabDetails: "Details",
    diagramLabel: "Visual samjho",
    dataLabel: "Abhi move ho raha hai",
    readMore: "Aur padho",
    layerData: "Message (HTTP)",
    layerTls: "TLS record",
    layerSegment: "TCP segment",
    layerPacket: "IP packet",
    layerFrame: "Link frame",
    physicalNote: "Frame electric, radio ya light signals se travel karta hai.",
    layersHint: "Data travel karte waqt har layer apni wrapping add karti hai.",
  },
} as const;

export const NODES = [
  { icon: "💻", en: { title: "Browser", sub: "Your device" }, hi: { title: "Browser", sub: "Aapka device" } },
  { icon: "🌐", en: { title: "Network", sub: "The road" }, hi: { title: "Network", sub: "Raasta" } },
  { icon: "🗄️", en: { title: "Server", sub: "The answerer" }, hi: { title: "Server", sub: "Jawab dene wala" } },
];

export type Layer = "app" | "tls" | "transport" | "network" | "datalink" | "physical" | "none";
export const LAYER_RANK: Record<Layer, number> = {
  none: 0, app: 1, tls: 2, transport: 3, network: 4, datalink: 5, physical: 5,
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
  reveal?: ConnectionReveal;
  title: Bi;
  plain: Bi; // one-sentence version, shown big
  detail: Bi; // longer explanation, always shown in Details
  icons: string[]; // one emoji per item
  items: Bi[]; // diagram boxes: first line = title, next line = small text
  analogy: Bi;
  remember: Bi;
  terms: [string, Bi][]; // key words
  fields?: [string, string][]; // "look inside" rows
}

export const HTTP_STEPS: HttpStep[] = [
  {
    id: "fetch-call", phase: "1 · Start the request", node: 0, layer: "app",
    packet: 'fetch("https://api.example.com/profile")',
    reveal: { domain: "api.example.com", protocol: "HTTPS" },
    title: b("1. Your app calls fetch()", "1. App fetch() call karti hai"),
    plain: b("fetch() asks the browser to request a resource from a URL.", "fetch() browser se URL par resource request karne ko kehta hai."),
    detail: b(
      "Your JavaScript runs fetch(url). The browser takes over the network work. The call can also include options such as method, headers, and body—for example, a POST request with JSON data. fetch() starts the request; it does not itself open sockets or build packets.",
      "Aapka JavaScript fetch(url) run karta hai. Network ka kaam browser handle karta hai. fetch() ke options mein method, headers aur body ho sakte hain—jaise JSON data ke saath POST request. fetch() request start karta hai; sockets ya packets khud nahi banata."
    ),
    icons: ["⚛️", "🌐", "📨"],
    items: [b("JavaScript\nfetch(url)"), b("Browser\nTakes over"), b("HTTP request\nStarts")],
    analogy: b("You place an order with a delivery service; it handles the delivery route.", "Aap delivery service ko order dete ho; delivery ka route woh handle karti hai."),
    remember: b("fetch() starts the request; the browser handles networking.", "fetch() request start karta hai; networking browser handle karta hai."),
    terms: [["fetch()", b("Browser API used to make a network request.", "Network request karne wali browser API.")], ["URL", b("The address of the resource.", "Resource ka address.")]],
  },
  {
    id: "browser-prepares", phase: "2 · Prepare the request", node: 0, layer: "app",
    packet: "URL + method + headers + cookies (when applicable) + body",
    title: b("2. Browser prepares the HTTP request", "2. Browser HTTP request prepare karta hai"),
    plain: b("The browser reads the URL and request options, then applies relevant browser rules.", "Browser URL aur request options read karta hai, phir relevant browser rules apply karta hai."),
    detail: b(
      "The browser identifies the domain, path, protocol, HTTP method, headers (such as Authorization and Content-Type), and body. Cookies may be attached according to cookie rules and fetch credentials settings. The browser also applies relevant policies such as cache, mixed-content, and CORS checks; some cross-origin requests may trigger an OPTIONS preflight.",
      "Browser domain, path, protocol, HTTP method, headers (jaise Authorization aur Content-Type) aur body identify karta hai. Cookie rules aur fetch credentials settings ke according cookies attach ho sakti hain. Browser cache, mixed-content aur CORS jaise rules bhi apply karta hai; kuch cross-origin requests mein OPTIONS preflight hota hai."
    ),
    icons: ["🔗", "🧾", "🛡️"],
    items: [b("URL\nDomain + path"), b("Request options\nMethod + headers + body"), b("Browser rules\nCookies / CORS")],
    analogy: b("Writing the destination, contents, and delivery instructions on a parcel.", "Parcel par address, andar ki cheez aur delivery instructions likhna."),
    remember: b("Cookies are not always sent; browser rules and request settings decide.", "Cookies hamesha nahi jaati; browser rules aur request settings decide karte hain."),
    terms: [["Header", b("Metadata describing the request.", "Request ke baare mein metadata.")], ["CORS", b("Browser-enforced rules for cross-origin access.", "Cross-origin access ke browser rules.")]],
    fields: [["Method", "GET, POST, PUT, DELETE…"], ["Headers", "Authorization, Content-Type, Accept…"], ["Cookies", "Included when cookie and credentials rules allow"], ["Body", "Optional request data, e.g. JSON"]],
  },
  {
    id: "dns", phase: "3 · Find the server", node: 1, layer: "none",
    packet: "api.example.com → DNS/cache → server IP address",
    reveal: { destIp: "203.0.113.10" },
    title: b("3. DNS finds the server IP", "3. DNS server ka IP dhoondhta hai"),
    plain: b("The browser or OS looks up the domain's IP address, unless a usable result is already cached.", "Browser ya OS domain ka IP address dhoondhta hai, jab tak usable result cache mein na ho."),
    detail: b(
      "The browser or operating system may first check DNS caches. If no valid cached answer is available, it sends a DNS query to resolve the domain to an IP address. DNS returns an address the device can connect to. A fresh DNS query is not required for every HTTP request. The IP shown here is an example address.",
      "Browser ya OS pehle DNS cache check kar sakta hai. Valid cached answer na mile toh domain ka IP resolve karne ke liye DNS query bhejta hai. DNS aisa address return karta hai jisse device connect kar sake. Har HTTP request par nayi DNS query zaroori nahi. Yahan dikhaya IP example hai."
    ),
    icons: ["🏷️", "📒", "🔢"],
    items: [b("Domain\napi.example.com"), b("DNS cache / query"), b("IP address\n203.0.113.10 (example)")],
    analogy: b("Looking up a person's name in contacts to find their number.", "Contacts mein naam search karke number nikalna."),
    remember: b("DNS maps a domain name to an IP; cache can skip a new lookup.", "DNS domain ko IP se map karta hai; cache nayi lookup skip kar sakta hai."),
    terms: [["DNS", b("System that resolves domain names to IP addresses.", "Domain name ko IP address mein resolve karne wala system.")], ["DNS cache", b("A saved DNS result used until it expires.", "Saved DNS result jo expiry tak use hota hai.")]],
  },
  {
    id: "serialize", phase: "4 · Prepare bytes", node: 0, layer: "app",
    packet: "HTTP request → encoded bytes → OS networking stack",
    title: b("4. Request becomes bytes", "4. Request bytes mein convert hoti hai"),
    plain: b("The browser encodes the HTTP request as bytes and hands data to the networking stack.", "Browser HTTP request ko bytes mein encode karke networking stack ko data deta hai."),
    detail: b(
      "The browser's networking implementation turns the HTTP request line, headers, and body into a byte representation. The operating system's networking stack then helps move data through the network interfaces and protocols. The exact internals differ by browser, operating system, and HTTP version.",
      "Browser ka networking implementation HTTP request line, headers aur body ko bytes ki form mein encode karta hai. OS ka networking stack data ko network interface aur protocols ke through bhejne mein help karta hai. Exact internal process browser, OS aur HTTP version ke hisaab se differ kar sakta hai."
    ),
    icons: ["📄", "🔢", "🖥️"],
    items: [b("HTTP request\nText + body"), b("Encode\nBytes"), b("OS network stack")],
    analogy: b("Turning a written message into a format the delivery system can carry.", "Written message ko aise format mein badalna jise delivery system carry kar sake."),
    remember: b("Networking carries bytes, not JavaScript objects.", "Networking bytes carry karta hai, JavaScript objects nahi."),
    terms: [["Serialize / encode", b("Convert structured data into a transferable representation.", "Structured data ko transferable format mein convert karna.")], ["Network stack", b("OS components that handle network communication.", "OS ke components jo network communication handle karte hain.")]],
  },
  {
    id: "tcp-handshake", phase: "5 · Establish transport", node: 1, layer: "transport",
    packet: "TCP: SYN → SYN-ACK → ACK",
    reveal: { destPort: "443" },
    title: b("5. TCP connection is established", "5. TCP connection establish hota hai"),
    plain: b("For HTTP over TCP, the client and server establish a reliable, ordered connection.", "TCP par chalne wale HTTP ke liye client aur server reliable, ordered connection establish karte hain."),
    detail: b(
      "For HTTP/1.1 and HTTP/2 over TCP, a new connection commonly uses the three-way handshake: SYN, SYN-ACK, ACK. TCP provides reliable, ordered delivery of a byte stream. A connection may be reused for later requests, so a new TCP handshake is not required for every request. HTTP/3 uses QUIC over UDP instead of TCP.",
      "TCP par HTTP/1.1 aur HTTP/2 ke liye naya connection aam taur par three-way handshake use karta hai: SYN, SYN-ACK, ACK. TCP bytes ko reliable aur ordered tarike se deliver karta hai. Connection baad ki requests ke liye reuse ho sakta hai, isliye har request par naya TCP handshake zaroori nahi. HTTP/3 TCP ke bajay UDP par QUIC use karta hai."
    ),
    icons: ["👋", "🤝", "🔗"],
    items: [b("Client\nSYN"), b("Server\nSYN-ACK"), b("Client\nACK · connected")],
    analogy: b("Both sides confirm they are ready before talking.", "Baat shuru karne se pehle dono sides confirm karti hain ki ready hain."),
    remember: b("TCP handshake is for a connection, not necessarily every request.", "TCP handshake connection ke liye hota hai, har request ke liye zaroori nahi."),
    terms: [["SYN", b("TCP message that starts connection setup.", "TCP message jo connection setup start karta hai.")], ["MSS", b("Maximum TCP payload size for a segment.", "Ek TCP segment ke payload ka maximum size.")]],
    fields: [["Handshake", "SYN → SYN-ACK → ACK"], ["TCP role", "Reliable, ordered byte stream"], ["Reuse", "Existing connection can carry more requests"], ["HTTP/3", "Uses QUIC over UDP, not TCP"]],
  },
  {
    id: "tls-handshake", phase: "6 · Secure the connection", node: 1, layer: "tls",
    packet: "HTTPS: TLS handshake → verify certificate → establish keys",
    title: b("6. TLS secures HTTPS", "6. TLS HTTPS ko secure karta hai"),
    plain: b("For HTTPS, TLS negotiates encryption and helps verify the server's identity.", "HTTPS mein TLS encryption negotiate karta hai aur server ki identity verify karne mein help karta hai."),
    detail: b(
      "After TCP is established, HTTPS normally performs a TLS handshake. The client and server negotiate cryptographic settings and establish session keys. The browser validates the server certificate and hostname. After setup, HTTP data is protected by TLS encryption and integrity checks. Existing secure connections may be reused; TLS setup does not necessarily happen for every request.",
      "TCP establish hone ke baad HTTPS mein aam taur par TLS handshake hota hai. Client aur server cryptographic settings negotiate karke session keys establish karte hain. Browser server certificate aur hostname validate karta hai. Setup ke baad HTTP data TLS encryption aur integrity checks se protected hota hai. Existing secure connection reuse ho sakta hai; har request par TLS setup zaroori nahi."
    ),
    icons: ["🤝", "📜", "🔐"],
    items: [b("TLS handshake\nNegotiate"), b("Certificate\nVerify server"), b("Session keys\nSecure channel")],
    analogy: b("Checking the receiver's ID and agreeing on a private code before exchanging letters.", "Letter exchange se pehle receiver ki ID check karna aur secret code decide karna."),
    remember: b("TLS protects HTTP data in transit; HTTPS means HTTP over TLS.", "TLS travel ke dauran HTTP data protect karta hai; HTTPS ka matlab HTTP over TLS."),
    terms: [["TLS", b("Protocol that encrypts and protects data in transit.", "Data ko transit mein encrypt aur protect karne wala protocol.")], ["Certificate", b("A digital identity document for a server.", "Server ki digital identity document.")]],
  },
  {
    id: "tcp-segments", phase: "7 · Split the data", node: 1, layer: "transport",
    packet: "Application/TLS bytes → TCP segments",
    title: b("7. TCP splits the byte stream into segments", "7. TCP byte stream ko segments mein divide karta hai"),
    plain: b("TCP sends data in segments and adds ports and delivery-control information.", "TCP data ko segments mein bhejta hai aur ports aur delivery-control information add karta hai."),
    detail: b(
      "TCP divides the outgoing byte stream into segments sized according to the path's MSS and other conditions. The TCP header includes source and destination ports, sequence and acknowledgment numbers, and flags. These fields help deliver data to the right application, keep bytes in order, and recover from loss. With HTTPS, the TCP payload carries TLS-protected data.",
      "TCP outgoing byte stream ko path ke MSS aur doosri conditions ke hisaab se segments mein divide karta hai. TCP header mein source/destination ports, sequence aur acknowledgment numbers, aur flags hote hain. Yeh fields data ko sahi application tak pahunchane, bytes order mein rakhne aur loss recover karne mein help karte hain. HTTPS mein TCP payload TLS-protected data carry karta hai."
    ),
    icons: ["🔢", "📦", "🧩"],
    items: [b("Bytes\nStream"), b("TCP header\nPorts + sequence"), b("TCP segment")],
    analogy: b("Breaking a long message into numbered pieces so the receiver can put them in order.", "Lambe message ko numbered pieces mein todna taaki receiver sahi order mein jod sake."),
    remember: b("Ports identify applications; sequence numbers help order the byte stream.", "Ports applications identify karte hain; sequence numbers byte stream ka order maintain karte hain."),
    terms: [["Source port", b("Port used by the sending application.", "Bhejne wali application ka port.")], ["Destination port", b("Port of the receiving service, often 443 for HTTPS.", "Receiving service ka port; HTTPS ke liye aksar 443.")], ["Sequence number", b("Tracks byte positions in the stream.", "Stream mein byte positions track karta hai.")]],
    fields: [["Source port", "Temporary client-side port"], ["Destination port", "Server port (commonly 443 for HTTPS)"], ["Sequence / ACK", "Track byte order and acknowledgments"], ["Flags", "Connection and control signals"]],
  },
  {
    id: "ip-packets", phase: "8 · Address the destination", node: 1, layer: "network",
    packet: "TCP segment → IP packet [source IP + destination IP]",
    reveal: { sourceIp: "Client IP", destIp: "203.0.113.10" },
    title: b("8. IP wraps each segment in a packet", "8. IP har segment ko packet mein wrap karta hai"),
    plain: b("IP adds source and destination IP addresses so routers can forward the packet.", "IP source aur destination IP addresses add karta hai taaki routers packet forward kar sakein."),
    detail: b(
      "The IP layer encapsulates the TCP segment inside an IP packet. The IP header contains source and destination IP addresses and other routing-related fields. Routers use the destination IP address to decide where to forward the packet. The source address shown in real networks may be changed by NAT along the path.",
      "IP layer TCP segment ko IP packet ke andar encapsulate karti hai. IP header mein source aur destination IP addresses aur routing se related fields hote hain. Routers destination IP dekhkar decide karte hain packet kahan forward karna hai. Real network mein NAT ki wajah se source address path par change ho sakta hai."
    ),
    icons: ["📦", "🏷️", "🧭"],
    items: [b("TCP segment"), b("IP header\nSource + destination IP"), b("IP packet")],
    analogy: b("Putting the parcel inside a package with the full destination address.", "Parcel ko full destination address wale package mein rakhna."),
    remember: b("IP addresses guide the packet across networks; ports identify the application.", "IP addresses packet ko networks ke across guide karte hain; ports application identify karte hain."),
    terms: [["IP packet", b("Network-layer unit carrying data and IP addresses.", "Network-layer unit jisme data aur IP addresses hote hain.")], ["NAT", b("A device translates IP addresses, commonly at a router.", "Device jo IP addresses translate karta hai, aksar router par.")]],
  },
  {
    id: "link-frames", phase: "9 · Send over the local link", node: 1, layer: "datalink",
    packet: "IP packet → Ethernet / Wi-Fi frame [source MAC + destination MAC]",
    title: b("9. Ethernet or Wi-Fi adds a frame", "9. Ethernet ya Wi-Fi frame add karta hai"),
    plain: b("The local link wraps the IP packet in a frame addressed to the next device on that link.", "Local link IP packet ko frame mein wrap karta hai jo us link ke next device ko addressed hota hai."),
    detail: b(
      "On Ethernet or Wi-Fi, the data-link layer places the IP packet inside a frame. The frame carries link-layer addresses such as source and destination MAC addresses. If the server is outside the local network, the destination MAC is usually the default gateway/router's MAC—not the remote server's MAC. The exact framing differs between Ethernet and Wi-Fi.",
      "Ethernet ya Wi-Fi par data-link layer IP packet ko frame ke andar rakhti hai. Frame mein source aur destination MAC jaise link-layer addresses hote hain. Agar server local network ke bahar hai, toh destination MAC usually default gateway/router ka hota hai—remote server ka MAC nahi. Ethernet aur Wi-Fi ki framing mein differences hote hain."
    ),
    icons: ["🌐", "🏷️", "📶"],
    items: [b("IP packet"), b("Frame header\nMAC addresses"), b("Ethernet / Wi-Fi\nFrame")],
    analogy: b("Putting the addressed package into the local delivery vehicle for the next stop.", "Address wale package ko next stop tak le jaane wali local vehicle mein rakhna."),
    remember: b("MAC addresses are for the local link; IP addresses guide the wider trip.", "MAC addresses local link ke liye hain; IP addresses poore route ko guide karte hain."),
    terms: [["MAC address", b("Link-layer address used on a local network segment.", "Local network segment par use hone wala link-layer address.")], ["Default gateway", b("The router used to reach other networks.", "Doosre networks tak pahunchne ke liye use hone wala router.")]],
  },
  {
    id: "routing-hops", phase: "10 · Travel to the server", node: 1, layer: "network",
    packet: "Device → router → next hops … → server network → server",
    title: b("10. Routers forward packets hop by hop", "10. Routers packets ko hop-by-hop forward karte hain"),
    plain: b("Each router forwards the IP packet onward and builds a new local frame for the next link.", "Har router IP packet ko aage forward karta hai aur next link ke liye naya local frame banata hai."),
    detail: b(
      "When a router receives a frame, it removes the link-layer frame, checks the IP packet, and chooses the next hop using its routing table. It then wraps the packet in a new frame for the outgoing link. Therefore, MAC addresses usually change at every routed hop, while the source and destination IP addresses generally remain the same end-to-end (apart from changes such as NAT). The server's network finally delivers the packet to the server.",
      "Router frame receive karke link-layer frame remove karta hai, IP packet check karta hai aur routing table se next hop choose karta hai. Phir outgoing link ke liye packet ko naye frame mein wrap karta hai. Isliye routed hop par MAC addresses usually change hote hain, jabki source aur destination IP generally end-to-end same rehte hain (NAT jaise changes ko chhodkar). Aakhir mein server ka network packet server tak pahunchata hai."
    ),
    icons: ["🏠", "🧭", "🔁", "🗄️"],
    items: [b("Your device\nLocal frame"), b("Router\nRemove frame"), b("Next hop\nNew frame"), b("Server network\nDeliver")],
    analogy: b("A parcel keeps its destination address, but each delivery leg gets a new local label.", "Parcel ka final address same rehta hai, lekin har delivery leg par naya local label lagta hai."),
    remember: b("Routers replace link frames at each hop; the IP packet continues toward the destination.", "Routers har hop par link frame replace karte hain; IP packet destination ki taraf badhta hai."),
    terms: [["Hop", b("One router-to-router forwarding step.", "Ek router se next router tak forwarding step.")], ["Encapsulation", b("Wrapping data with a layer's header.", "Data ke saath layer ka header add karke wrap karna.")]],
  },
];

export const HTTP_Request_Response = {
  heroTitle: "Learn how computers & software actually work",
};
