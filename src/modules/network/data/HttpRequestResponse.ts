

// // export type Bi = { en: string; hi: string };
// // const b = (en: string, hi: string = en): Bi => ({ en, hi });

// // export const HTTP_UI = {
// //   en: {
// //     lessonTitle: "HTTP Request & Response",
// //     requestJourney: "Journey",
// //     known: "Known so far",
// //     domain: "Domain",
// //     protocol: "Protocol",
// //     source: "From",
// //     destination: "To",
// //     tabAnalogy: "Real life",
// //     tabWords: "Key words",
// //     tabLayers: "Wrapping",
// //     tabDetails: "Details",
// //     diagramLabel: "Picture it",
// //     dataLabel: "Moving now",
// //     readMore: "Read more",
// //     layerData: "Message (HTTP)",
// //     layerTls: "TLS record",
// //     layerSegment: "TCP segment",
// //     layerPacket: "IP packet",
// //     layerFrame: "Link frame",
// //     physicalNote: "The frame travels as electric, radio or light signals.",
// //     layersHint: "Each layer adds its own wrapper as data travels.",
// //   },
// //   hi: {
// //     lessonTitle: "HTTP Request & Response",
// //     requestJourney: "Safar",
// //     known: "Ab tak pata hai",
// //     domain: "Domain",
// //     protocol: "Protocol",
// //     source: "Kaha se",
// //     destination: "Kaha tak",
// //     tabAnalogy: "Real life",
// //     tabWords: "Zaroori words",
// //     tabLayers: "Wrapping",
// //     tabDetails: "Details",
// //     diagramLabel: "Visual samjho",
// //     dataLabel: "Abhi move ho raha hai",
// //     readMore: "Aur padho",
// //     layerData: "Message (HTTP)",
// //     layerTls: "TLS record",
// //     layerSegment: "TCP segment",
// //     layerPacket: "IP packet",
// //     layerFrame: "Link frame",
// //     physicalNote: "Frame electric, radio ya light signals se travel karta hai.",
// //     layersHint: "Data travel karte waqt har layer apni wrapping add karti hai.",
// //   },
// // } as const;

// // export const NODES = [
// //   { icon: "💻", en: { title: "Browser", sub: "Your device" }, hi: { title: "Browser", sub: "Aapka device" } },
// //   { icon: "🌐", en: { title: "Network", sub: "The road" }, hi: { title: "Network", sub: "Raasta" } },
// //   { icon: "🗄️", en: { title: "Server", sub: "The answerer" }, hi: { title: "Server", sub: "Jawab dene wala" } },
// // ];

// // export type Layer = "app" | "tls" | "transport" | "network" | "datalink" | "physical" | "none";
// // export const LAYER_RANK: Record<Layer, number> = {
// //   none: 0, app: 1, tls: 2, transport: 3, network: 4, datalink: 5, physical: 5,
// // };

// // export interface ConnectionReveal {
// //   domain?: string;
// //   protocol?: string;
// //   sourceIp?: string;
// //   sourcePort?: string;
// //   destIp?: string;
// //   destPort?: string;
// // }

// // export interface HttpStep {
// //   id: string;
// //   phase: string;
// //   node: 0 | 1 | 2;
// //   layer: Layer;
// //   packet: string;
// //   reveal?: ConnectionReveal;
// //   title: Bi;
// //   plain: Bi; // one-sentence version, shown big
// //   detail: Bi; // longer explanation, always shown in Details
// //   icons: string[]; // one emoji per item
// //   items: Bi[]; // diagram boxes: first line = title, next line = small text
// //   analogy: Bi;
// //   remember: Bi;
// //   terms: [string, Bi][]; // key words
// //   fields?: [string, string][]; // "look inside" rows
// // }

// // export const HTTP_STEPS: HttpStep[] = [
// //   {
// //     id: "fetch-call", phase: "1 · Start the request", node: 0, layer: "app",
// //     packet: 'fetch("https://api.example.com/profile")',
// //     reveal: { domain: "api.example.com", protocol: "HTTPS" },
// //     title: b("1. Your app calls fetch()", "1. App fetch() call karti hai"),
// //     plain: b("fetch() asks the browser to request a resource from a URL.", "fetch() browser se URL par resource request karne ko kehta hai."),
// //     detail: b(
// //       "Your JavaScript runs fetch(url). The browser takes over the network work. The call can also include options such as method, headers, and body—for example, a POST request with JSON data. fetch() starts the request; it does not itself open sockets or build packets.",
// //       "Aapka JavaScript fetch(url) run karta hai. Network ka kaam browser handle karta hai. fetch() ke options mein method, headers aur body ho sakte hain—jaise JSON data ke saath POST request. fetch() request start karta hai; sockets ya packets khud nahi banata."
// //     ),
// //     icons: ["⚛️", "🌐", "📨"],
// //     items: [b("JavaScript\nfetch(url)"), b("Browser\nTakes over"), b("HTTP request\nStarts")],
// //     analogy: b("You place an order with a delivery service; it handles the delivery route.", "Aap delivery service ko order dete ho; delivery ka route woh handle karti hai."),
// //     remember: b("fetch() starts the request; the browser handles networking.", "fetch() request start karta hai; networking browser handle karta hai."),
// //     terms: [["fetch()", b("Browser API used to make a network request.", "Network request karne wali browser API.")], ["URL", b("The address of the resource.", "Resource ka address.")]],
// //   },
// //   {
// //     id: "browser-prepares", phase: "2 · Prepare the request", node: 0, layer: "app",
// //     packet: "URL + method + headers + cookies (when applicable) + body",
// //     title: b("2. Browser prepares the HTTP request", "2. Browser HTTP request prepare karta hai"),
// //     plain: b("The browser reads the URL and request options, then applies relevant browser rules.", "Browser URL aur request options read karta hai, phir relevant browser rules apply karta hai."),
// //     detail: b(
// //       "The browser identifies the domain, path, protocol, HTTP method, headers (such as Authorization and Content-Type), and body. Cookies may be attached according to cookie rules and fetch credentials settings. The browser also applies relevant policies such as cache, mixed-content, and CORS checks; some cross-origin requests may trigger an OPTIONS preflight.",
// //       "Browser domain, path, protocol, HTTP method, headers (jaise Authorization aur Content-Type) aur body identify karta hai. Cookie rules aur fetch credentials settings ke according cookies attach ho sakti hain. Browser cache, mixed-content aur CORS jaise rules bhi apply karta hai; kuch cross-origin requests mein OPTIONS preflight hota hai."
// //     ),
// //     icons: ["🔗", "🧾", "🛡️"],
// //     items: [b("URL\nDomain + path"), b("Request options\nMethod + headers + body"), b("Browser rules\nCookies / CORS")],
// //     analogy: b("Writing the destination, contents, and delivery instructions on a parcel.", "Parcel par address, andar ki cheez aur delivery instructions likhna."),
// //     remember: b("Cookies are not always sent; browser rules and request settings decide.", "Cookies hamesha nahi jaati; browser rules aur request settings decide karte hain."),
// //     terms: [["Header", b("Metadata describing the request.", "Request ke baare mein metadata.")], ["CORS", b("Browser-enforced rules for cross-origin access.", "Cross-origin access ke browser rules.")]],
// //     fields: [["Method", "GET, POST, PUT, DELETE…"], ["Headers", "Authorization, Content-Type, Accept…"], ["Cookies", "Included when cookie and credentials rules allow"], ["Body", "Optional request data, e.g. JSON"]],
// //   },
// //   {
// //     id: "dns", phase: "3 · Find the server", node: 1, layer: "none",
// //     packet: "api.example.com → DNS/cache → server IP address",
// //     reveal: { destIp: "203.0.113.10" },
// //     title: b("3. DNS finds the server IP", "3. DNS server ka IP dhoondhta hai"),
// //     plain: b("The browser or OS looks up the domain's IP address, unless a usable result is already cached.", "Browser ya OS domain ka IP address dhoondhta hai, jab tak usable result cache mein na ho."),
// //     detail: b(
// //       "The browser or operating system may first check DNS caches. If no valid cached answer is available, it sends a DNS query to resolve the domain to an IP address. DNS returns an address the device can connect to. A fresh DNS query is not required for every HTTP request. The IP shown here is an example address.",
// //       "Browser ya OS pehle DNS cache check kar sakta hai. Valid cached answer na mile toh domain ka IP resolve karne ke liye DNS query bhejta hai. DNS aisa address return karta hai jisse device connect kar sake. Har HTTP request par nayi DNS query zaroori nahi. Yahan dikhaya IP example hai."
// //     ),
// //     icons: ["🏷️", "📒", "🔢"],
// //     items: [b("Domain\napi.example.com"), b("DNS cache / query"), b("IP address\n203.0.113.10 (example)")],
// //     analogy: b("Looking up a person's name in contacts to find their number.", "Contacts mein naam search karke number nikalna."),
// //     remember: b("DNS maps a domain name to an IP; cache can skip a new lookup.", "DNS domain ko IP se map karta hai; cache nayi lookup skip kar sakta hai."),
// //     terms: [["DNS", b("System that resolves domain names to IP addresses.", "Domain name ko IP address mein resolve karne wala system.")], ["DNS cache", b("A saved DNS result used until it expires.", "Saved DNS result jo expiry tak use hota hai.")]],
// //   },
// //   {
// //     id: "serialize", phase: "4 · Prepare bytes", node: 0, layer: "app",
// //     packet: "HTTP request → encoded bytes → OS networking stack",
// //     title: b("4. Request becomes bytes", "4. Request bytes mein convert hoti hai"),
// //     plain: b("The browser encodes the HTTP request as bytes and hands data to the networking stack.", "Browser HTTP request ko bytes mein encode karke networking stack ko data deta hai."),
// //     detail: b(
// //       "The browser's networking implementation turns the HTTP request line, headers, and body into a byte representation. The operating system's networking stack then helps move data through the network interfaces and protocols. The exact internals differ by browser, operating system, and HTTP version.",
// //       "Browser ka networking implementation HTTP request line, headers aur body ko bytes ki form mein encode karta hai. OS ka networking stack data ko network interface aur protocols ke through bhejne mein help karta hai. Exact internal process browser, OS aur HTTP version ke hisaab se differ kar sakta hai."
// //     ),
// //     icons: ["📄", "🔢", "🖥️"],
// //     items: [b("HTTP request\nText + body"), b("Encode\nBytes"), b("OS network stack")],
// //     analogy: b("Turning a written message into a format the delivery system can carry.", "Written message ko aise format mein badalna jise delivery system carry kar sake."),
// //     remember: b("Networking carries bytes, not JavaScript objects.", "Networking bytes carry karta hai, JavaScript objects nahi."),
// //     terms: [["Serialize / encode", b("Convert structured data into a transferable representation.", "Structured data ko transferable format mein convert karna.")], ["Network stack", b("OS components that handle network communication.", "OS ke components jo network communication handle karte hain.")]],
// //   },
// //   {
// //     id: "tcp-handshake", phase: "5 · Establish transport", node: 1, layer: "transport",
// //     packet: "TCP: SYN → SYN-ACK → ACK",
// //     reveal: { destPort: "443" },
// //     title: b("5. TCP connection is established", "5. TCP connection establish hota hai"),
// //     plain: b("For HTTP over TCP, the client and server establish a reliable, ordered connection.", "TCP par chalne wale HTTP ke liye client aur server reliable, ordered connection establish karte hain."),
// //     detail: b(
// //       "For HTTP/1.1 and HTTP/2 over TCP, a new connection commonly uses the three-way handshake: SYN, SYN-ACK, ACK. TCP provides reliable, ordered delivery of a byte stream. A connection may be reused for later requests, so a new TCP handshake is not required for every request. HTTP/3 uses QUIC over UDP instead of TCP.",
// //       "TCP par HTTP/1.1 aur HTTP/2 ke liye naya connection aam taur par three-way handshake use karta hai: SYN, SYN-ACK, ACK. TCP bytes ko reliable aur ordered tarike se deliver karta hai. Connection baad ki requests ke liye reuse ho sakta hai, isliye har request par naya TCP handshake zaroori nahi. HTTP/3 TCP ke bajay UDP par QUIC use karta hai."
// //     ),
// //     icons: ["👋", "🤝", "🔗"],
// //     items: [b("Client\nSYN"), b("Server\nSYN-ACK"), b("Client\nACK · connected")],
// //     analogy: b("Both sides confirm they are ready before talking.", "Baat shuru karne se pehle dono sides confirm karti hain ki ready hain."),
// //     remember: b("TCP handshake is for a connection, not necessarily every request.", "TCP handshake connection ke liye hota hai, har request ke liye zaroori nahi."),
// //     terms: [["SYN", b("TCP message that starts connection setup.", "TCP message jo connection setup start karta hai.")], ["MSS", b("Maximum TCP payload size for a segment.", "Ek TCP segment ke payload ka maximum size.")]],
// //     fields: [["Handshake", "SYN → SYN-ACK → ACK"], ["TCP role", "Reliable, ordered byte stream"], ["Reuse", "Existing connection can carry more requests"], ["HTTP/3", "Uses QUIC over UDP, not TCP"]],
// //   },
// //   {
// //     id: "tls-handshake", phase: "6 · Secure the connection", node: 1, layer: "tls",
// //     packet: "HTTPS: TLS handshake → verify certificate → establish keys",
// //     title: b("6. TLS secures HTTPS", "6. TLS HTTPS ko secure karta hai"),
// //     plain: b("For HTTPS, TLS negotiates encryption and helps verify the server's identity.", "HTTPS mein TLS encryption negotiate karta hai aur server ki identity verify karne mein help karta hai."),
// //     detail: b(
// //       "After TCP is established, HTTPS normally performs a TLS handshake. The client and server negotiate cryptographic settings and establish session keys. The browser validates the server certificate and hostname. After setup, HTTP data is protected by TLS encryption and integrity checks. Existing secure connections may be reused; TLS setup does not necessarily happen for every request.",
// //       "TCP establish hone ke baad HTTPS mein aam taur par TLS handshake hota hai. Client aur server cryptographic settings negotiate karke session keys establish karte hain. Browser server certificate aur hostname validate karta hai. Setup ke baad HTTP data TLS encryption aur integrity checks se protected hota hai. Existing secure connection reuse ho sakta hai; har request par TLS setup zaroori nahi."
// //     ),
// //     icons: ["🤝", "📜", "🔐"],
// //     items: [b("TLS handshake\nNegotiate"), b("Certificate\nVerify server"), b("Session keys\nSecure channel")],
// //     analogy: b("Checking the receiver's ID and agreeing on a private code before exchanging letters.", "Letter exchange se pehle receiver ki ID check karna aur secret code decide karna."),
// //     remember: b("TLS protects HTTP data in transit; HTTPS means HTTP over TLS.", "TLS travel ke dauran HTTP data protect karta hai; HTTPS ka matlab HTTP over TLS."),
// //     terms: [["TLS", b("Protocol that encrypts and protects data in transit.", "Data ko transit mein encrypt aur protect karne wala protocol.")], ["Certificate", b("A digital identity document for a server.", "Server ki digital identity document.")]],
// //   },
// //   {
// //     id: "tcp-segments", phase: "7 · Split the data", node: 1, layer: "transport",
// //     packet: "Application/TLS bytes → TCP segments",
// //     title: b("7. TCP splits the byte stream into segments", "7. TCP byte stream ko segments mein divide karta hai"),
// //     plain: b("TCP sends data in segments and adds ports and delivery-control information.", "TCP data ko segments mein bhejta hai aur ports aur delivery-control information add karta hai."),
// //     detail: b(
// //       "TCP divides the outgoing byte stream into segments sized according to the path's MSS and other conditions. The TCP header includes source and destination ports, sequence and acknowledgment numbers, and flags. These fields help deliver data to the right application, keep bytes in order, and recover from loss. With HTTPS, the TCP payload carries TLS-protected data.",
// //       "TCP outgoing byte stream ko path ke MSS aur doosri conditions ke hisaab se segments mein divide karta hai. TCP header mein source/destination ports, sequence aur acknowledgment numbers, aur flags hote hain. Yeh fields data ko sahi application tak pahunchane, bytes order mein rakhne aur loss recover karne mein help karte hain. HTTPS mein TCP payload TLS-protected data carry karta hai."
// //     ),
// //     icons: ["🔢", "📦", "🧩"],
// //     items: [b("Bytes\nStream"), b("TCP header\nPorts + sequence"), b("TCP segment")],
// //     analogy: b("Breaking a long message into numbered pieces so the receiver can put them in order.", "Lambe message ko numbered pieces mein todna taaki receiver sahi order mein jod sake."),
// //     remember: b("Ports identify applications; sequence numbers help order the byte stream.", "Ports applications identify karte hain; sequence numbers byte stream ka order maintain karte hain."),
// //     terms: [["Source port", b("Port used by the sending application.", "Bhejne wali application ka port.")], ["Destination port", b("Port of the receiving service, often 443 for HTTPS.", "Receiving service ka port; HTTPS ke liye aksar 443.")], ["Sequence number", b("Tracks byte positions in the stream.", "Stream mein byte positions track karta hai.")]],
// //     fields: [["Source port", "Temporary client-side port"], ["Destination port", "Server port (commonly 443 for HTTPS)"], ["Sequence / ACK", "Track byte order and acknowledgments"], ["Flags", "Connection and control signals"]],
// //   },
// //   {
// //     id: "ip-packets", phase: "8 · Address the destination", node: 1, layer: "network",
// //     packet: "TCP segment → IP packet [source IP + destination IP]",
// //     reveal: { sourceIp: "Client IP", destIp: "203.0.113.10" },
// //     title: b("8. IP wraps each segment in a packet", "8. IP har segment ko packet mein wrap karta hai"),
// //     plain: b("IP adds source and destination IP addresses so routers can forward the packet.", "IP source aur destination IP addresses add karta hai taaki routers packet forward kar sakein."),
// //     detail: b(
// //       "The IP layer encapsulates the TCP segment inside an IP packet. The IP header contains source and destination IP addresses and other routing-related fields. Routers use the destination IP address to decide where to forward the packet. The source address shown in real networks may be changed by NAT along the path.",
// //       "IP layer TCP segment ko IP packet ke andar encapsulate karti hai. IP header mein source aur destination IP addresses aur routing se related fields hote hain. Routers destination IP dekhkar decide karte hain packet kahan forward karna hai. Real network mein NAT ki wajah se source address path par change ho sakta hai."
// //     ),
// //     icons: ["📦", "🏷️", "🧭"],
// //     items: [b("TCP segment"), b("IP header\nSource + destination IP"), b("IP packet")],
// //     analogy: b("Putting the parcel inside a package with the full destination address.", "Parcel ko full destination address wale package mein rakhna."),
// //     remember: b("IP addresses guide the packet across networks; ports identify the application.", "IP addresses packet ko networks ke across guide karte hain; ports application identify karte hain."),
// //     terms: [["IP packet", b("Network-layer unit carrying data and IP addresses.", "Network-layer unit jisme data aur IP addresses hote hain.")], ["NAT", b("A device translates IP addresses, commonly at a router.", "Device jo IP addresses translate karta hai, aksar router par.")]],
// //   },
// //   {
// //     id: "link-frames", phase: "9 · Send over the local link", node: 1, layer: "datalink",
// //     packet: "IP packet → Ethernet / Wi-Fi frame [source MAC + destination MAC]",
// //     title: b("9. Ethernet or Wi-Fi adds a frame", "9. Ethernet ya Wi-Fi frame add karta hai"),
// //     plain: b("The local link wraps the IP packet in a frame addressed to the next device on that link.", "Local link IP packet ko frame mein wrap karta hai jo us link ke next device ko addressed hota hai."),
// //     detail: b(
// //       "On Ethernet or Wi-Fi, the data-link layer places the IP packet inside a frame. The frame carries link-layer addresses such as source and destination MAC addresses. If the server is outside the local network, the destination MAC is usually the default gateway/router's MAC—not the remote server's MAC. The exact framing differs between Ethernet and Wi-Fi.",
// //       "Ethernet ya Wi-Fi par data-link layer IP packet ko frame ke andar rakhti hai. Frame mein source aur destination MAC jaise link-layer addresses hote hain. Agar server local network ke bahar hai, toh destination MAC usually default gateway/router ka hota hai—remote server ka MAC nahi. Ethernet aur Wi-Fi ki framing mein differences hote hain."
// //     ),
// //     icons: ["🌐", "🏷️", "📶"],
// //     items: [b("IP packet"), b("Frame header\nMAC addresses"), b("Ethernet / Wi-Fi\nFrame")],
// //     analogy: b("Putting the addressed package into the local delivery vehicle for the next stop.", "Address wale package ko next stop tak le jaane wali local vehicle mein rakhna."),
// //     remember: b("MAC addresses are for the local link; IP addresses guide the wider trip.", "MAC addresses local link ke liye hain; IP addresses poore route ko guide karte hain."),
// //     terms: [["MAC address", b("Link-layer address used on a local network segment.", "Local network segment par use hone wala link-layer address.")], ["Default gateway", b("The router used to reach other networks.", "Doosre networks tak pahunchne ke liye use hone wala router.")]],
// //   },
// //   {
// //     id: "routing-hops", phase: "10 · Travel to the server", node: 1, layer: "network",
// //     packet: "Device → router → next hops … → server network → server",
// //     title: b("10. Routers forward packets hop by hop", "10. Routers packets ko hop-by-hop forward karte hain"),
// //     plain: b("Each router forwards the IP packet onward and builds a new local frame for the next link.", "Har router IP packet ko aage forward karta hai aur next link ke liye naya local frame banata hai."),
// //     detail: b(
// //       "When a router receives a frame, it removes the link-layer frame, checks the IP packet, and chooses the next hop using its routing table. It then wraps the packet in a new frame for the outgoing link. Therefore, MAC addresses usually change at every routed hop, while the source and destination IP addresses generally remain the same end-to-end (apart from changes such as NAT). The server's network finally delivers the packet to the server.",
// //       "Router frame receive karke link-layer frame remove karta hai, IP packet check karta hai aur routing table se next hop choose karta hai. Phir outgoing link ke liye packet ko naye frame mein wrap karta hai. Isliye routed hop par MAC addresses usually change hote hain, jabki source aur destination IP generally end-to-end same rehte hain (NAT jaise changes ko chhodkar). Aakhir mein server ka network packet server tak pahunchata hai."
// //     ),
// //     icons: ["🏠", "🧭", "🔁", "🗄️"],
// //     items: [b("Your device\nLocal frame"), b("Router\nRemove frame"), b("Next hop\nNew frame"), b("Server network\nDeliver")],
// //     analogy: b("A parcel keeps its destination address, but each delivery leg gets a new local label.", "Parcel ka final address same rehta hai, lekin har delivery leg par naya local label lagta hai."),
// //     remember: b("Routers replace link frames at each hop; the IP packet continues toward the destination.", "Routers har hop par link frame replace karte hain; IP packet destination ki taraf badhta hai."),
// //     terms: [["Hop", b("One router-to-router forwarding step.", "Ek router se next router tak forwarding step.")], ["Encapsulation", b("Wrapping data with a layer's header.", "Data ke saath layer ka header add karke wrap karna.")]],
// //   },
// // ];

// // export const HTTP_Request_Response = {
// //   heroTitle: "Learn how computers & software actually work",
// // };

// export type Bi = { en: string; hi: string };
// const b = (en: string, hi: string = en): Bi => ({ en, hi });

// /* ------------------------------------------------------------------ */
// /*  UI labels                                                          */
// /* ------------------------------------------------------------------ */
// export const HTTP_UI = {
//   en: {
//     lessonTitle: "HTTP Request & Response",
//     lessonSubtitle: "Follow a request from your browser to a server, and the response all the way back",
//     requestJourney: "Journey",
//     known: "Known so far",
//     domain: "Domain",
//     protocol: "Protocol",
//     source: "From",
//     destination: "To",
//     status: "Status",
//     stepWord: "STEP",
//     keyTakeaway: "Key takeaway",
//     why: "Why is this step needed?",
//     tabAnalogy: "Real life",
//     tabWords: "Key words",
//     tabLayers: "Wrapping",
//     tabDetails: "Details",
//     diagramLabel: "Picture it",
//     dataLabel: "Moving now",
//     snapshotNote: "A snapshot of the data at this point in the journey.",
//     readMore: "Read more",
//     requestLabel: "Request: browser → server",
//     responseLabel: "Response: server → browser",
//     legendRequest: "Request",
//     legendResponse: "Response",
//     layerData: "Message (HTTP)",
//     layerTls: "TLS record",
//     layerSegment: "TCP segment",
//     layerPacket: "IP packet",
//     layerFrame: "Link frame",
//     layerCurrent: "Current",
//     layerAdded: "Added",
//     layerNext: "Next",
//     layerRemoved: "Removed",
//     layerInside: "Still inside",
//     physicalNote: "The frame travels as electric, radio or light signals.",
//     layersHintWrap: "Each layer adds its own wrapper as data travels.",
//     layersHintUnwrap: "Each layer removes its own wrapper until only the HTTP message is left.",
//   },
//   hi: {
//     lessonTitle: "HTTP Request & Response",
//     lessonSubtitle: "Browser se server tak request ka safar, aur response ka wapas aana samjho",
//     requestJourney: "Safar",
//     known: "Ab tak pata hai",
//     domain: "Domain",
//     protocol: "Protocol",
//     source: "Kaha se",
//     destination: "Kaha tak",
//     status: "Status",
//     stepWord: "STEP",
//     keyTakeaway: "Yaad rakho",
//     why: "Yeh step kyun zaroori hai?",
//     tabAnalogy: "Real life",
//     tabWords: "Zaroori words",
//     tabLayers: "Wrapping",
//     tabDetails: "Details",
//     diagramLabel: "Visual samjho",
//     dataLabel: "Abhi move ho raha hai",
//     snapshotNote: "Yeh is step par data ka current snapshot hai.",
//     readMore: "Aur padho",
//     requestLabel: "Request: browser se server",
//     responseLabel: "Response: server se browser",
//     legendRequest: "Request",
//     legendResponse: "Response",
//     layerData: "Message (HTTP)",
//     layerTls: "TLS record",
//     layerSegment: "TCP segment",
//     layerPacket: "IP packet",
//     layerFrame: "Link frame",
//     layerCurrent: "Abhi",
//     layerAdded: "Complete",
//     layerNext: "Aage",
//     layerRemoved: "Hata diya",
//     layerInside: "Abhi andar",
//     physicalNote: "Frame electric, radio ya light signals se travel karta hai.",
//     layersHintWrap: "Data travel karte waqt har layer apni wrapping add karti hai.",
//     layersHintUnwrap: "Har layer apni wrapping hatati hai, jab tak sirf HTTP message na bache.",
//   },
// } as const;

// /* ------------------------------------------------------------------ */
// /*  Journey nodes                                                      */
// /* ------------------------------------------------------------------ */
// export const NODES = [
//   { icon: "💻", en: { title: "Browser", sub: "Your device" }, hi: { title: "Browser", sub: "Aapka device" } },
//   { icon: "🌐", en: { title: "Network", sub: "The road" }, hi: { title: "Network", sub: "Raasta" } },
//   { icon: "🗄️", en: { title: "Server", sub: "The answerer" }, hi: { title: "Server", sub: "Jawab dene wala" } },
// ];

// /* ------------------------------------------------------------------ */
// /*  Types                                                              */
// /* ------------------------------------------------------------------ */
// export type Layer = "app" | "tls" | "transport" | "network" | "datalink" | "physical" | "none";
// export const LAYER_RANK: Record<Layer, number> = {
//   none: 0, app: 1, tls: 2, transport: 3, network: 4, datalink: 5, physical: 5,
// };

// /** request = going to the server, response = coming back to the browser */
// export type Direction = "request" | "response";
// /** wrap = layers are being added, unwrap = layers are being removed */
// export type LayerMode = "wrap" | "unwrap";

// export interface ConnectionReveal {
//   domain?: string;
//   protocol?: string;
//   sourceIp?: string;
//   sourcePort?: string;
//   destIp?: string;
//   destPort?: string;
//   status?: string;
// }

// export interface HttpStep {
//   id: string;
//   phase: Bi;
//   node: 0 | 1 | 2;
//   direction: Direction;
//   layer: Layer;
//   layerMode: LayerMode;
//   packet: string;
//   reveal?: ConnectionReveal;
//   title: Bi;
//   plain: Bi; // one-sentence version, shown big
//   why: Bi; // why this step exists, for beginners
//   detail: Bi; // longer explanation, always shown in Details
//   icons: string[]; // one emoji per item
//   items: Bi[]; // diagram boxes: first line = title, next line = small text
//   analogy: Bi;
//   remember: Bi;
//   terms: [string, Bi][]; // key words
//   fields?: [string, string][]; // "look inside" rows
// }

// /* ------------------------------------------------------------------ */
// /*  Steps 1–10: request travels to the server                          */
// /*  Steps 11–19: server works, response travels back                   */
// /* ------------------------------------------------------------------ */
// export const HTTP_STEPS: HttpStep[] = [
//   /* ============================ REQUEST ============================ */
//   {
//     id: "fetch-call", phase: b("1 · Start the request", "1 · Request shuru karo"), node: 0, direction: "request", layer: "app", layerMode: "wrap",
//     packet: 'fetch("https://api.example.com/profile")',
//     reveal: { domain: "api.example.com", protocol: "HTTPS" },
//     title: b("1. Your app calls fetch()", "1. App fetch() call karti hai"),
//     plain: b("fetch() asks the browser to request a resource from a URL.", "fetch() browser se URL par resource request karne ko kehta hai."),
//     why: b(
//       "Your JavaScript code does not talk to the network directly. The browser knows how, so the code hands the job over.",
//       "Aapka JavaScript code seedha network se baat nahi karta. Browser jaanta hai kaise karna hai, isliye code kaam browser ko de deta hai."
//     ),
//     detail: b(
//       "Your JavaScript runs fetch(url). The browser takes over the network work. The call can also include options such as method, headers, and body—for example, a POST request with JSON data. fetch() starts the request; it does not itself open sockets or build packets.",
//       "Aapka JavaScript fetch(url) run karta hai. Network ka kaam browser handle karta hai. fetch() ke options mein method, headers aur body ho sakte hain—jaise JSON data ke saath POST request. fetch() request start karta hai; sockets ya packets khud nahi banata."
//     ),
//     icons: ["⚛️", "🌐", "📨"],
//     items: [b("JavaScript\nfetch(url)"), b("Browser\nTakes over"), b("HTTP request\nStarts")],
//     analogy: b("You place an order with a delivery service; it handles the delivery route.", "Aap delivery service ko order dete ho; delivery ka route woh handle karti hai."),
//     remember: b("fetch() starts the request; the browser handles networking.", "fetch() request start karta hai; networking browser handle karta hai."),
//     terms: [["fetch()", b("Browser API used to make a network request.", "Network request karne wali browser API.")], ["URL", b("The address of the resource.", "Resource ka address.")]],
//   },
//   {
//     id: "browser-prepares", phase: b("2 · Prepare the request", "2 · Request taiyaar karo"), node: 0, direction: "request", layer: "app", layerMode: "wrap",
//     packet: "URL + method + headers + cookies (when applicable) + body",
//     title: b("2. Browser prepares the HTTP request", "2. Browser HTTP request prepare karta hai"),
//     plain: b("The browser reads the URL and request options, then applies relevant browser rules.", "Browser URL aur request options read karta hai, phir relevant browser rules apply karta hai."),
//     why: b(
//       "The server can only help if the request clearly says what you want and who is asking.",
//       "Server tabhi madad kar sakta hai jab request saaf bataye ki aapko kya chahiye aur kaun maang raha hai."
//     ),
//     detail: b(
//       "The browser identifies the domain, path, protocol, HTTP method, headers (such as Authorization and Content-Type), and body. Cookies may be attached according to cookie rules and fetch credentials settings. The browser also applies relevant policies such as cache, mixed-content, and CORS checks; some cross-origin requests may trigger an OPTIONS preflight.",
//       "Browser domain, path, protocol, HTTP method, headers (jaise Authorization aur Content-Type) aur body identify karta hai. Cookie rules aur fetch credentials settings ke according cookies attach ho sakti hain. Browser cache, mixed-content aur CORS jaise rules bhi apply karta hai; kuch cross-origin requests mein OPTIONS preflight hota hai."
//     ),
//     icons: ["🔗", "🧾", "🛡️"],
//     items: [b("URL\nDomain + path"), b("Request options\nMethod + headers + body"), b("Browser rules\nCookies / CORS")],
//     analogy: b("Writing the destination, contents, and delivery instructions on a parcel.", "Parcel par address, andar ki cheez aur delivery instructions likhna."),
//     remember: b("Cookies are not always sent; browser rules and request settings decide.", "Cookies hamesha nahi jaati; browser rules aur request settings decide karte hain."),
//     terms: [["Header", b("Metadata describing the request.", "Request ke baare mein metadata.")], ["CORS", b("Browser-enforced rules for cross-origin access.", "Cross-origin access ke browser rules.")]],
//     fields: [["Method", "GET, POST, PUT, DELETE…"], ["Headers", "Authorization, Content-Type, Accept…"], ["Cookies", "Included when cookie and credentials rules allow"], ["Body", "Optional request data, e.g. JSON"]],
//   },
//   {
//     id: "dns", phase: b("3 · Find the server", "3 · Server dhoondho"), node: 1, direction: "request", layer: "none", layerMode: "wrap",
//     packet: "api.example.com → DNS/cache → server IP address",
//     reveal: { destIp: "203.0.113.10" },
//     title: b("3. DNS finds the server IP", "3. DNS server ka IP dhoondhta hai"),
//     plain: b("The browser or OS looks up the domain's IP address, unless a usable result is already cached.", "Browser ya OS domain ka IP address dhoondhta hai, jab tak usable result cache mein na ho."),
//     why: b(
//       "People use names, but networks move data using numbers. DNS connects the two.",
//       "Log naam use karte hain, lekin network numbers se data bhejta hai. DNS dono ko jodta hai."
//     ),
//     detail: b(
//       "The browser or operating system may first check DNS caches. If no valid cached answer is available, it sends a DNS query to resolve the domain to an IP address. DNS returns an address the device can connect to. A fresh DNS query is not required for every HTTP request. The IP shown here is an example address.",
//       "Browser ya OS pehle DNS cache check kar sakta hai. Valid cached answer na mile toh domain ka IP resolve karne ke liye DNS query bhejta hai. DNS aisa address return karta hai jisse device connect kar sake. Har HTTP request par nayi DNS query zaroori nahi. Yahan dikhaya IP example hai."
//     ),
//     icons: ["🏷️", "📒", "🔢"],
//     items: [b("Domain\napi.example.com"), b("DNS cache / query"), b("IP address\n203.0.113.10 (example)")],
//     analogy: b("Looking up a person's name in contacts to find their number.", "Contacts mein naam search karke number nikalna."),
//     remember: b("DNS maps a domain name to an IP; cache can skip a new lookup.", "DNS domain ko IP se map karta hai; cache nayi lookup skip kar sakta hai."),
//     terms: [["DNS", b("System that resolves domain names to IP addresses.", "Domain name ko IP address mein resolve karne wala system.")], ["DNS cache", b("A saved DNS result used until it expires.", "Saved DNS result jo expiry tak use hota hai.")]],
//   },
//   {
//     id: "serialize", phase: b("4 · Prepare bytes", "4 · Bytes banao"), node: 0, direction: "request", layer: "app", layerMode: "wrap",
//     packet: "HTTP request → encoded bytes → OS networking stack",
//     title: b("4. Request becomes bytes", "4. Request bytes mein convert hoti hai"),
//     plain: b("The browser encodes the HTTP request as bytes and hands data to the networking stack.", "Browser HTTP request ko bytes mein encode karke networking stack ko data deta hai."),
//     why: b(
//       "Cables and Wi-Fi carry signals that stand for 0s and 1s, not text or JavaScript objects.",
//       "Cable aur Wi-Fi 0 aur 1 wale signals carry karte hain, text ya JavaScript objects nahi."
//     ),
//     detail: b(
//       "The browser's networking implementation turns the HTTP request line, headers, and body into a byte representation. The operating system's networking stack then helps move data through the network interfaces and protocols. The exact internals differ by browser, operating system, and HTTP version.",
//       "Browser ka networking implementation HTTP request line, headers aur body ko bytes ki form mein encode karta hai. OS ka networking stack data ko network interface aur protocols ke through bhejne mein help karta hai. Exact internal process browser, OS aur HTTP version ke hisaab se differ kar sakta hai."
//     ),
//     icons: ["📄", "🔢", "🖥️"],
//     items: [b("HTTP request\nText + body"), b("Encode\nBytes"), b("OS network stack")],
//     analogy: b("Turning a written message into a format the delivery system can carry.", "Written message ko aise format mein badalna jise delivery system carry kar sake."),
//     remember: b("Networking carries bytes, not JavaScript objects.", "Networking bytes carry karta hai, JavaScript objects nahi."),
//     terms: [["Serialize / encode", b("Convert structured data into a transferable representation.", "Structured data ko transferable format mein convert karna.")], ["Network stack", b("OS components that handle network communication.", "OS ke components jo network communication handle karte hain.")]],
//   },
//   {
//     id: "tcp-handshake", phase: b("5 · Establish transport", "5 · Transport connection"), node: 1, direction: "request", layer: "transport", layerMode: "wrap",
//     packet: "TCP: SYN → SYN-ACK → ACK",
//     reveal: { destPort: "443" },
//     title: b("5. TCP connection is established", "5. TCP connection establish hota hai"),
//     plain: b("For HTTP over TCP, the client and server establish a reliable, ordered connection.", "TCP par chalne wale HTTP ke liye client aur server reliable, ordered connection establish karte hain."),
//     why: b(
//       "Both sides must confirm they are ready, so data is not lost or sent to nobody.",
//       "Dono sides ko confirm karna padta hai ki ready hain, taaki data kho na jaye ya kisi ko na pahunche."
//     ),
//     detail: b(
//       "For HTTP/1.1 and HTTP/2 over TCP, a new connection commonly uses the three-way handshake: SYN, SYN-ACK, ACK. TCP provides reliable, ordered delivery of a byte stream. A connection may be reused for later requests, so a new TCP handshake is not required for every request. HTTP/3 uses QUIC over UDP instead of TCP.",
//       "TCP par HTTP/1.1 aur HTTP/2 ke liye naya connection aam taur par three-way handshake use karta hai: SYN, SYN-ACK, ACK. TCP bytes ko reliable aur ordered tarike se deliver karta hai. Connection baad ki requests ke liye reuse ho sakta hai, isliye har request par naya TCP handshake zaroori nahi. HTTP/3 TCP ke bajay UDP par QUIC use karta hai."
//     ),
//     icons: ["👋", "🤝", "🔗"],
//     items: [b("Client\nSYN"), b("Server\nSYN-ACK"), b("Client\nACK · connected")],
//     analogy: b("Both sides confirm they are ready before talking.", "Baat shuru karne se pehle dono sides confirm karti hain ki ready hain."),
//     remember: b("TCP handshake is for a connection, not necessarily every request.", "TCP handshake connection ke liye hota hai, har request ke liye zaroori nahi."),
//     terms: [["SYN", b("TCP message that starts connection setup.", "TCP message jo connection setup start karta hai.")], ["MSS", b("Maximum TCP payload size for a segment.", "Ek TCP segment ke payload ka maximum size.")]],
//     fields: [["Handshake", "SYN → SYN-ACK → ACK"], ["TCP role", "Reliable, ordered byte stream"], ["Reuse", "Existing connection can carry more requests"], ["HTTP/3", "Uses QUIC over UDP, not TCP"]],
//   },
//   {
//     id: "tls-handshake", phase: b("6 · Secure the connection", "6 · Connection secure karo"), node: 1, direction: "request", layer: "tls", layerMode: "wrap",
//     packet: "HTTPS: TLS handshake → verify certificate → establish keys",
//     title: b("6. TLS secures HTTPS", "6. TLS HTTPS ko secure karta hai"),
//     plain: b("For HTTPS, TLS negotiates encryption and helps verify the server's identity.", "HTTPS mein TLS encryption negotiate karta hai aur server ki identity verify karne mein help karta hai."),
//     why: b(
//       "Without TLS, anyone on the path (like public Wi-Fi) could read or change your data.",
//       "TLS ke bina raaste mein koi bhi (jaise public Wi-Fi) aapka data padh ya badal sakta hai."
//     ),
//     detail: b(
//       "After TCP is established, HTTPS normally performs a TLS handshake. The client and server negotiate cryptographic settings and establish session keys. The browser validates the server certificate and hostname. After setup, HTTP data is protected by TLS encryption and integrity checks. Existing secure connections may be reused; TLS setup does not necessarily happen for every request.",
//       "TCP establish hone ke baad HTTPS mein aam taur par TLS handshake hota hai. Client aur server cryptographic settings negotiate karke session keys establish karte hain. Browser server certificate aur hostname validate karta hai. Setup ke baad HTTP data TLS encryption aur integrity checks se protected hota hai. Existing secure connection reuse ho sakta hai; har request par TLS setup zaroori nahi."
//     ),
//     icons: ["🤝", "📜", "🔐"],
//     items: [b("TLS handshake\nNegotiate"), b("Certificate\nVerify server"), b("Session keys\nSecure channel")],
//     analogy: b("Checking the receiver's ID and agreeing on a private code before exchanging letters.", "Letter exchange se pehle receiver ki ID check karna aur secret code decide karna."),
//     remember: b("TLS protects HTTP data in transit; HTTPS means HTTP over TLS.", "TLS travel ke dauran HTTP data protect karta hai; HTTPS ka matlab HTTP over TLS."),
//     terms: [["TLS", b("Protocol that encrypts and protects data in transit.", "Data ko transit mein encrypt aur protect karne wala protocol.")], ["Certificate", b("A digital identity document for a server.", "Server ki digital identity document.")]],
//   },
//   {
//     id: "tcp-segments", phase: b("7 · Split the data", "7 · Data todo"), node: 1, direction: "request", layer: "transport", layerMode: "wrap",
//     packet: "Application/TLS bytes → TCP segments",
//     reveal: { sourcePort: "52814" },
//     title: b("7. TCP splits the byte stream into segments", "7. TCP byte stream ko segments mein divide karta hai"),
//     plain: b("TCP sends data in segments and adds ports and delivery-control information.", "TCP data ko segments mein bhejta hai aur ports aur delivery-control information add karta hai."),
//     why: b(
//       "Big data cannot travel in one piece. Small numbered pieces can be put back in order, and lost ones can be sent again.",
//       "Bada data ek saath nahi jaa sakta. Chhote numbered pieces sahi order mein jode ja sakte hain, aur kho gaye pieces dobara bheje ja sakte hain."
//     ),
//     detail: b(
//       "TCP divides the outgoing byte stream into segments sized according to the path's MSS and other conditions. The TCP header includes source and destination ports, sequence and acknowledgment numbers, and flags. These fields help deliver data to the right application, keep bytes in order, and recover from loss. With HTTPS, the TCP payload carries TLS-protected data. The source port 52814 shown here is an example of a temporary port your operating system picks for this connection.",
//       "TCP outgoing byte stream ko path ke MSS aur doosri conditions ke hisaab se segments mein divide karta hai. TCP header mein source/destination ports, sequence aur acknowledgment numbers, aur flags hote hain. Yeh fields data ko sahi application tak pahunchane, bytes order mein rakhne aur loss recover karne mein help karte hain. HTTPS mein TCP payload TLS-protected data carry karta hai. Yahan dikhaya source port 52814 ek example hai; yeh temporary port aapka OS is connection ke liye chunta hai."
//     ),
//     icons: ["🔢", "📦", "🧩"],
//     items: [b("Bytes\nStream"), b("TCP header\nPorts + sequence"), b("TCP segment")],
//     analogy: b("Breaking a long message into numbered pieces so the receiver can put them in order.", "Lambe message ko numbered pieces mein todna taaki receiver sahi order mein jod sake."),
//     remember: b("Ports identify applications; sequence numbers help order the byte stream.", "Ports applications identify karte hain; sequence numbers byte stream ka order maintain karte hain."),
//     terms: [["Source port", b("Port used by the sending application.", "Bhejne wali application ka port.")], ["Destination port", b("Port of the receiving service, often 443 for HTTPS.", "Receiving service ka port; HTTPS ke liye aksar 443.")], ["Sequence number", b("Tracks byte positions in the stream.", "Stream mein byte positions track karta hai.")]],
//     fields: [["Source port", "Temporary client-side port"], ["Destination port", "Server port (commonly 443 for HTTPS)"], ["Sequence / ACK", "Track byte order and acknowledgments"], ["Flags", "Connection and control signals"]],
//   },
//   {
//     id: "ip-packets", phase: b("8 · Address the destination", "8 · Destination address lagao"), node: 1, direction: "request", layer: "network", layerMode: "wrap",
//     packet: "TCP segment → IP packet [source IP + destination IP]",
//     reveal: { sourceIp: "192.168.1.5", destIp: "203.0.113.10" },
//     title: b("8. IP wraps each segment in a packet", "8. IP har segment ko packet mein wrap karta hai"),
//     plain: b("IP adds source and destination IP addresses so routers can forward the packet.", "IP source aur destination IP addresses add karta hai taaki routers packet forward kar sakein."),
//     why: b(
//       "Routers do not understand ports or HTTP. They only need an IP address to decide where to send data.",
//       "Routers ports ya HTTP nahi samajhte. Unhe sirf IP address chahiye taaki woh data kahan bhejna hai decide kar sakein."
//     ),
//     detail: b(
//       "The IP layer encapsulates the TCP segment inside an IP packet. The IP header contains source and destination IP addresses and other routing-related fields. Routers use the destination IP address to decide where to forward the packet. The source address shown in real networks may be changed by NAT along the path. 192.168.1.5 is an example private address of the kind used inside home networks.",
//       "IP layer TCP segment ko IP packet ke andar encapsulate karti hai. IP header mein source aur destination IP addresses aur routing se related fields hote hain. Routers destination IP dekhkar decide karte hain packet kahan forward karna hai. Real network mein NAT ki wajah se source address path par change ho sakta hai. 192.168.1.5 ek example private address hai, jaisa ghar ke network mein hota hai."
//     ),
//     icons: ["📦", "🏷️", "🧭"],
//     items: [b("TCP segment"), b("IP header\nSource + destination IP"), b("IP packet")],
//     analogy: b("Putting the parcel inside a package with the full destination address.", "Parcel ko full destination address wale package mein rakhna."),
//     remember: b("IP addresses guide the packet across networks; ports identify the application.", "IP addresses packet ko networks ke across guide karte hain; ports application identify karte hain."),
//     terms: [["IP packet", b("Network-layer unit carrying data and IP addresses.", "Network-layer unit jisme data aur IP addresses hote hain.")], ["NAT", b("A device translates IP addresses, commonly at a router.", "Device jo IP addresses translate karta hai, aksar router par.")]],
//   },
//   {
//     id: "link-frames", phase: b("9 · Send over the local link", "9 · Local link par bhejo"), node: 1, direction: "request", layer: "datalink", layerMode: "wrap",
//     packet: "IP packet → Ethernet / Wi-Fi frame [source MAC + destination MAC]",
//     title: b("9. Ethernet or Wi-Fi adds a frame", "9. Ethernet ya Wi-Fi frame add karta hai"),
//     plain: b("The local link wraps the IP packet in a frame addressed to the next device on that link.", "Local link IP packet ko frame mein wrap karta hai jo us link ke next device ko addressed hota hai."),
//     why: b(
//       "Each physical link (Wi-Fi, cable) needs its own local address to hand data to the next device.",
//       "Har physical link (Wi-Fi, cable) ko apna local address chahiye taaki data next device ko diya ja sake."
//     ),
//     detail: b(
//       "On Ethernet or Wi-Fi, the data-link layer places the IP packet inside a frame. The frame carries link-layer addresses such as source and destination MAC addresses. If the server is outside the local network, the destination MAC is usually the default gateway/router's MAC—not the remote server's MAC. The exact framing differs between Ethernet and Wi-Fi.",
//       "Ethernet ya Wi-Fi par data-link layer IP packet ko frame ke andar rakhti hai. Frame mein source aur destination MAC jaise link-layer addresses hote hain. Agar server local network ke bahar hai, toh destination MAC usually default gateway/router ka hota hai—remote server ka MAC nahi. Ethernet aur Wi-Fi ki framing mein differences hote hain."
//     ),
//     icons: ["🌐", "🏷️", "📶"],
//     items: [b("IP packet"), b("Frame header\nMAC addresses"), b("Ethernet / Wi-Fi\nFrame")],
//     analogy: b("Putting the addressed package into the local delivery vehicle for the next stop.", "Address wale package ko next stop tak le jaane wali local vehicle mein rakhna."),
//     remember: b("MAC addresses are for the local link; IP addresses guide the wider trip.", "MAC addresses local link ke liye hain; IP addresses poore route ko guide karte hain."),
//     terms: [["MAC address", b("Link-layer address used on a local network segment.", "Local network segment par use hone wala link-layer address.")], ["Default gateway", b("The router used to reach other networks.", "Doosre networks tak pahunchne ke liye use hone wala router.")]],
//   },
//   {
//     id: "routing-hops", phase: b("10 · Travel to the server", "10 · Server tak safar"), node: 1, direction: "request", layer: "network", layerMode: "wrap",
//     packet: "Device → router → next hops … → server network → server",
//     title: b("10. Routers forward packets hop by hop", "10. Routers packets ko hop-by-hop forward karte hain"),
//     plain: b("Each router forwards the IP packet onward and builds a new local frame for the next link.", "Har router IP packet ko aage forward karta hai aur next link ke liye naya local frame banata hai."),
//     why: b(
//       "No single device knows the whole internet. Each router only decides the next hop.",
//       "Koi ek device poora internet nahi jaanta. Har router sirf next hop decide karta hai."
//     ),
//     detail: b(
//       "When a router receives a frame, it removes the link-layer frame, checks the IP packet, and chooses the next hop using its routing table. It then wraps the packet in a new frame for the outgoing link. Therefore, MAC addresses usually change at every routed hop, while the source and destination IP addresses generally remain the same end-to-end (apart from changes such as NAT). The server's network finally delivers the packet to the server.",
//       "Router frame receive karke link-layer frame remove karta hai, IP packet check karta hai aur routing table se next hop choose karta hai. Phir outgoing link ke liye packet ko naye frame mein wrap karta hai. Isliye routed hop par MAC addresses usually change hote hain, jabki source aur destination IP generally end-to-end same rehte hain (NAT jaise changes ko chhodkar). Aakhir mein server ka network packet server tak pahunchata hai."
//     ),
//     icons: ["🏠", "🧭", "🔁", "🗄️"],
//     items: [b("Your device\nLocal frame"), b("Router\nRemove frame"), b("Next hop\nNew frame"), b("Server network\nDeliver")],
//     analogy: b("A parcel keeps its destination address, but each delivery leg gets a new local label.", "Parcel ka final address same rehta hai, lekin har delivery leg par naya local label lagta hai."),
//     remember: b("Routers replace link frames at each hop; the IP packet continues toward the destination.", "Routers har hop par link frame replace karte hain; IP packet destination ki taraf badhta hai."),
//     terms: [["Hop", b("One router-to-router forwarding step.", "Ek router se next router tak forwarding step.")], ["Encapsulation", b("Wrapping data with a layer's header.", "Data ke saath layer ka header add karke wrap karna.")]],
//   },

//   /* ====================== SERVER RECEIVES REQUEST ====================== */
//   {
//     id: "server-receives", phase: b("11 · Server receives", "11 · Server receive karta hai"), node: 2, direction: "request", layer: "transport", layerMode: "unwrap",
//     packet: "Frame → IP packet → TCP segments → one ordered byte stream",
//     title: b("11. Server unwraps the frame, packet and segments", "11. Server frame, packet aur segments kholta hai"),
//     plain: b(
//       "The server's network card and OS remove the frame, the IP header and the TCP header, and rebuild the original bytes.",
//       "Server ka network card aur OS frame, IP header aur TCP header hatate hain, aur original bytes dobara banate hain."
//     ),
//     why: b(
//       "The data must be rebuilt exactly as it was sent, and in the right order, before anyone can read it.",
//       "Data ko bilkul waisa hi, sahi order mein, dobara banana padta hai, tabhi koi use padh sakta hai."
//     ),
//     detail: b(
//       "When the frame reaches the server's network card (NIC), the card checks that the destination MAC is its own and removes the frame. The operating system then checks that the destination IP is its own and removes the IP header. TCP reads the destination port (443) and gives the data to the program that is listening on that port, such as a web server. Using the sequence numbers, TCP puts segments back in order, asks again for any missing piece, and sends acknowledgments (ACKs) back to the client. In real systems, the first machine reached is often a load balancer or CDN that passes the request on to the real application server.",
//       "Jab frame server ke network card (NIC) tak pahunchta hai, card check karta hai ki destination MAC uska apna hai aur frame hata deta hai. Phir OS check karta hai ki destination IP uska apna hai aur IP header hata deta hai. TCP destination port (443) padhta hai aur data us program ko deta hai jo us port par sun raha hai, jaise web server. Sequence numbers ki madad se TCP segments ko sahi order mein lagata hai, koi piece missing ho toh dobara maangta hai, aur client ko acknowledgments (ACKs) bhejta hai. Real systems mein pehli machine aksar load balancer ya CDN hoti hai jo request ko asli application server tak pahunchati hai."
//     ),
//     icons: ["📶", "🏷️", "🧩", "🖥️"],
//     items: [b("Frame\nMAC checked, removed"), b("IP packet\nIP checked, removed"), b("TCP segments\nPort 443, reorder"), b("Web server\nGets the bytes")],
//     analogy: b(
//       "A company mailroom opens the outer box, then the inner package, and puts the numbered pages back in order.",
//       "Company ka mailroom bahar ka box kholta hai, phir andar ka package, aur numbered pages ko sahi order mein lagata hai."
//     ),
//     remember: b("Unwrapping goes in reverse: frame first, then IP, then TCP.", "Unwrapping ulte order mein hoti hai: pehle frame, phir IP, phir TCP."),
//     terms: [
//       ["NIC", b("Network interface card: the hardware that connects a computer to a network.", "Network interface card: hardware jo computer ko network se jodta hai.")],
//       ["ACK", b("A reply telling the sender which bytes arrived safely.", "Reply jo sender ko batata hai ki kaun se bytes safely pahunche.")],
//       ["Load balancer", b("A machine that shares incoming requests among several servers.", "Machine jo aati requests ko kai servers mein baant deti hai.")],
//     ],
//     fields: [["Frame", "Destination MAC matches the server's card"], ["IP packet", "Destination IP is the server's address"], ["TCP", "Port 443 goes to the web server program"], ["ACK", "Tells the client which bytes arrived"]],
//   },
//   {
//     id: "server-decrypts", phase: b("12 · Server reads the request", "12 · Server request padhta hai"), node: 2, direction: "request", layer: "app", layerMode: "unwrap",
//     packet: "GET /profile HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer ••••••\nAccept: application/json",
//     title: b("12. TLS is removed and the server reads the HTTP request", "12. TLS hatata hai aur server HTTP request padhta hai"),
//     plain: b(
//       "The server decrypts the data with the session keys and reads the method, path and headers.",
//       "Server session keys se data decrypt karta hai aur method, path aur headers padhta hai."
//     ),
//     why: b(
//       "Encryption protects the trip. The server must remove it to understand what you asked for.",
//       "Encryption safar ko protect karta hai. Server ko use hatana padta hai taaki samajh sake aapne kya maanga."
//     ),
//     detail: b(
//       "The server uses the session keys from Step 6 to decrypt the TLS records and checks that nothing was changed on the way. What remains is the original HTTP request. In HTTP/1.1 it is readable text: a request line (method, path, version), headers, and an optional body. HTTP/2 and HTTP/3 carry the same information in a compact binary form, but the meaning is the same. Now the web server knows the method (GET), the path (/profile), and who is asking (from headers and cookies).",
//       "Server Step 6 ki session keys se TLS records decrypt karta hai aur check karta hai ki raaste mein kuch badla toh nahi. Jo bachta hai woh original HTTP request hai. HTTP/1.1 mein yeh readable text hota hai: request line (method, path, version), headers, aur optional body. HTTP/2 aur HTTP/3 wahi information compact binary form mein bhejte hain, lekin matlab same rehta hai. Ab web server ko pata hai method (GET), path (/profile), aur kaun maang raha hai (headers aur cookies se)."
//     ),
//     icons: ["🔓", "📄", "🖥️"],
//     items: [b("TLS record\nDecrypt + verify"), b("HTTP request\nReadable again"), b("Web server\nReads method + path")],
//     analogy: b(
//       "The receiver uses the secret code to open the sealed letter and reads the instructions inside.",
//       "Receiver secret code se sealed letter kholta hai aur andar likhe instructions padhta hai."
//     ),
//     remember: b("Only the two ends hold the keys; routers on the way saw only scrambled bytes.", "Keys sirf dono ends ke paas hoti hain; raaste ke routers ne sirf scrambled bytes dekhe."),
//     terms: [
//       ["Request line", b("The first line: method, path and HTTP version.", "Pehli line: method, path aur HTTP version.")],
//       ["Decrypt", b("Turn scrambled data back into readable data using a key.", "Key se scrambled data ko dobara readable banana.")],
//     ],
//     fields: [["Method", "GET: read data"], ["Path", "/profile: which resource"], ["Host", "api.example.com: which site"], ["Authorization / Cookie", "Who is asking"]],
//   },

//   /* ========================= SERVER RESPONDS ========================= */
//   {
//     id: "server-processes", phase: b("13 · Server does the work", "13 · Server kaam karta hai"), node: 2, direction: "response", layer: "app", layerMode: "wrap",
//     packet: "route /profile → check login → read database → prepare result",
//     title: b("13. The server application does the work", "13. Server application kaam karti hai"),
//     plain: b(
//       "Application code picks the right handler, checks who you are, reads or changes data, and prepares a result.",
//       "Application code sahi handler chunta hai, check karta hai aap kaun ho, data padhta ya badalta hai, aur result taiyaar karta hai."
//     ),
//     why: b(
//       "This is the moment the server actually answers your question. Everything before this was delivery.",
//       "Yahi woh moment hai jab server sach mein aapke sawal ka jawab banata hai. Isse pehle sab delivery tha."
//     ),
//     detail: b(
//       "The web framework matches GET /profile to a handler function (routing). The handler checks authentication (is the token or cookie valid?) and authorization (is this user allowed to see this?). It may read from a database or cache, or call other services. Then it prepares the result, which for an API is usually JSON, and chooses a status code: 200 means success, 401 means not logged in, 403 means forbidden, 404 means not found, and 500 means the server had an error. This part is ordinary program logic, not networking, and it can take anything from a few milliseconds to several seconds.",
//       "Web framework GET /profile ko ek handler function se match karta hai (routing). Handler authentication check karta hai (token ya cookie valid hai?) aur authorization (kya is user ko yeh dekhne ki permission hai?). Woh database ya cache se padh sakta hai, ya doosri services call kar sakta hai. Phir result taiyaar karta hai, jo API mein aksar JSON hota hai, aur status code chunta hai: 200 matlab success, 401 matlab login nahi hai, 403 matlab permission nahi, 404 matlab nahi mila, aur 500 matlab server mein error. Yeh hissa normal program logic hai, networking nahi, aur isme kuch milliseconds se kai seconds lag sakte hain."
//     ),
//     icons: ["🧭", "🪪", "🗃️", "🧾"],
//     items: [b("Route\n/profile handler"), b("Check login\nToken / cookie"), b("Database\nRead data"), b("Result\nJSON + status")],
//     analogy: b(
//       "A restaurant kitchen reads your order slip, checks the table, cooks the dish and plates it.",
//       "Restaurant ki kitchen aapki order slip padhti hai, table check karti hai, dish banati hai aur plate mein lagati hai."
//     ),
//     remember: b("The status code tells the browser what happened, before it reads the body.", "Status code browser ko batata hai kya hua, body padhne se pehle."),
//     terms: [
//       ["Routing", b("Choosing which code handles a given method and path.", "Method aur path ke hisaab se kaun sa code chalega yeh chunna.")],
//       ["Status code", b("A number that says how the request went.", "Number jo batata hai request ka kya hua.")],
//       ["JSON", b("A text format for structured data, like {\"name\":\"Asha\"}.", "Structured data ka text format, jaise {\"name\":\"Asha\"}.")],
//     ],
//     fields: [["200 OK", "Success"], ["401 Unauthorized", "Not logged in"], ["404 Not Found", "No such resource"], ["500 Server Error", "The server failed"]],
//   },
//   {
//     id: "server-builds-response", phase: b("14 · Build the response", "14 · Response banao"), node: 2, direction: "response", layer: "app", layerMode: "wrap",
//     reveal: { status: "200 OK" },
//     packet: 'HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 32\n\n{"name":"Asha","plan":"Student"}',
//     title: b("14. The server builds the HTTP response", "14. Server HTTP response banata hai"),
//     plain: b(
//       "The response has a status line, headers that describe the data, and a body with the data itself.",
//       "Response mein status line, data ko describe karne wale headers, aur data wali body hoti hai."
//     ),
//     why: b(
//       "The browser must know whether it worked, what kind of data came back, and how to handle it.",
//       "Browser ko jaanna zaroori hai ki kaam hua ya nahi, kaisa data aaya, aur use kaise handle karna hai."
//     ),
//     detail: b(
//       "A response has three parts: a status line (HTTP version, status code, reason), headers, and a body. Headers describe the body (Content-Type, Content-Length), control caching (Cache-Control), can ask the browser to save a cookie (Set-Cookie), and can say which other websites may read the answer (Access-Control-Allow-Origin, used by CORS). The body is the real data, here JSON. Just like the request, this text is turned into bytes before it is sent.",
//       "Response ke teen hisse hote hain: status line (HTTP version, status code, reason), headers, aur body. Headers body ko describe karte hain (Content-Type, Content-Length), caching control karte hain (Cache-Control), browser se cookie save karwa sakte hain (Set-Cookie), aur bata sakte hain ki kaun si doosri websites jawab padh sakti hain (Access-Control-Allow-Origin, CORS mein use hota hai). Body asli data hai, yahan JSON. Request ki tarah, yeh text bhi bhejne se pehle bytes mein convert hota hai."
//     ),
//     icons: ["✅", "🏷️", "📦"],
//     items: [b("Status line\n200 OK"), b("Headers\nType, size, cache"), b("Body\nThe JSON data")],
//     analogy: b(
//       "A reply letter: a top line saying how it went, a note about what is inside, then the contents.",
//       "Reply letter: upar ek line ki kaam kaisa hua, ek note ki andar kya hai, phir asli cheez."
//     ),
//     remember: b("Response = status line + headers + body.", "Response = status line + headers + body."),
//     terms: [
//       ["Content-Type", b("Tells the browser what kind of data the body is.", "Browser ko batata hai ki body kis type ka data hai.")],
//       ["Content-Length", b("The size of the body in bytes.", "Body ka size bytes mein.")],
//       ["Set-Cookie", b("Asks the browser to store a small piece of data.", "Browser se chhota data save karne ko kehta hai.")],
//     ],
//     fields: [["Status line", "HTTP/1.1 200 OK"], ["Content-Type", "What kind of data the body is"], ["Content-Length", "Body size in bytes"], ["Set-Cookie", "Optional: ask the browser to store a cookie"]],
//   },
//   {
//     id: "server-wraps", phase: b("15 · Wrap and send back", "15 · Wrap karke wapas bhejo"), node: 2, direction: "response", layer: "datalink", layerMode: "wrap",
//     packet: "HTTP response → TLS records → TCP segments (443 → 52814) → IP packets (203.0.113.10 → your public IP) → frames",
//     title: b("15. The response is wrapped and sent back", "15. Response wrap hokar wapas bheji jaati hai"),
//     plain: b(
//       "The server wraps the response in the same layers, with source and destination swapped.",
//       "Server response ko wahi layers mein wrap karta hai, source aur destination badal kar."
//     ),
//     why: b(
//       "The reply follows the same rules and the same layers as the request, only in the opposite direction.",
//       "Reply wahi rules aur wahi layers follow karta hai jo request ne kiye, bas ulti direction mein."
//     ),
//     detail: b(
//       "The server wraps the response in the same way the browser wrapped the request, using the same connection. TLS encrypts it with the session keys. TCP cuts it into segments, and this time the source port is 443 and the destination port is the temporary port your browser used (for example 52814). IP sets the source to the server's IP and the destination to your network's public IP. A frame addressed to the server's next-hop router is added. Compare with the request: source and destination are swapped.",
//       "Server response ko waise hi wrap karta hai jaise browser ne request wrap ki thi, usi connection par. TLS use session keys se encrypt karta hai. TCP use segments mein todta hai, aur is baar source port 443 hai aur destination port woh temporary port hai jo aapke browser ne use kiya (jaise 52814). IP source mein server ka IP aur destination mein aapke network ka public IP lagata hai. Server ke next-hop router ko addressed frame add hota hai. Request se compare karo: source aur destination badal gaye hain."
//     ),
//     icons: ["🔐", "🧩", "🏷️", "📶"],
//     items: [b("TLS\nEncrypt response"), b("TCP segments\nPorts swapped"), b("IP packets\nAddresses swapped"), b("Frames\nTo next router")],
//     analogy: b(
//       "The reply goes into a new sealed envelope with the sender and receiver addresses swapped.",
//       "Reply ek naye sealed envelope mein jaata hai, jisme sender aur receiver ke address badal diye jaate hain."
//     ),
//     remember: b("Replies use the same layers; source and destination swap.", "Replies wahi layers use karte hain; source aur destination badal jaate hain."),
//     terms: [
//       ["Ephemeral port", b("A temporary port your OS picks for one connection.", "Temporary port jo aapka OS ek connection ke liye chunta hai.")],
//       ["Public IP", b("The address your network shows to the internet.", "Woh address jo aapka network internet ko dikhata hai.")],
//     ],
//     fields: [["Source port", "443"], ["Destination port", "52814 (your browser's temporary port)"], ["Source IP", "203.0.113.10 (the server)"], ["Destination IP", "Your network's public IP"]],
//   },
//   {
//     id: "response-routing", phase: b("16 · Travel back", "16 · Wapas safar"), node: 1, direction: "response", layer: "network", layerMode: "wrap",
//     packet: "Server → routers → … → your router (NAT) → your device",
//     title: b("16. Routers carry the response back to you", "16. Routers response ko aapke paas wapas laate hain"),
//     plain: b(
//       "Routers forward the response hop by hop, and your home router sends it to the right device.",
//       "Routers response ko hop-by-hop forward karte hain, aur aapka home router use sahi device tak bhejta hai."
//     ),
//     why: b(
//       "Many devices share one public IP. Your router must remember who asked, so the reply reaches the right device.",
//       "Kai devices ek hi public IP share karte hain. Router ko yaad rakhna padta hai ki kisne maanga tha, taaki reply sahi device tak pahunche."
//     ),
//     detail: b(
//       "Routers forward the response exactly like Step 10: each one removes the old frame, reads the destination IP, picks the next hop and adds a new frame. The way back can be different from the way forward, because each router decides on its own. Each router also lowers the packet's TTL (time to live) by one; when it reaches zero the packet is dropped, which stops packets from looping forever. At your home, the router uses its NAT table to remember which device and port started this connection, and changes the destination from the public IP back to your private IP (for example 192.168.1.5). It then sends a final frame to your device.",
//       "Routers response ko bilkul Step 10 ki tarah forward karte hain: har ek purana frame hata kar destination IP padhta hai, next hop chunta hai aur naya frame lagata hai. Wapsi ka raasta aane wale raaste se alag ho sakta hai, kyunki har router khud decide karta hai. Har router packet ka TTL (time to live) ek kam karta hai; zero hone par packet drop ho jaata hai, jisse packets hamesha ghoomte nahi rehte. Aapke ghar mein router NAT table se yaad rakhta hai ki kaun se device aur port ne yeh connection shuru kiya tha, aur destination ko public IP se wapas aapke private IP (jaise 192.168.1.5) mein badal deta hai. Phir woh aakhri frame aapke device ko bhejta hai."
//     ),
//     icons: ["🗄️", "🔁", "🏠", "💻"],
//     items: [b("Server network\nSends it out"), b("Internet routers\nHop by hop"), b("Your router\nNAT table lookup"), b("Your device\nFinal frame")],
//     analogy: b(
//       "The reply parcel passes through depots. At your building, the receptionist knows which flat ordered it and delivers it there.",
//       "Reply parcel depots se guzarta hai. Aapki building mein receptionist jaanta hai kis flat ne order kiya tha aur wahin deliver karta hai."
//     ),
//     remember: b("The return route may differ; NAT sends the reply to the right device.", "Wapsi ka route alag ho sakta hai; NAT reply ko sahi device tak bhejta hai."),
//     terms: [
//       ["TTL", b("A counter that drops a packet if it travels too many hops.", "Counter jo bahut hops ke baad packet ko drop kar deta hai.")],
//       ["NAT table", b("A router's list of which device started which connection.", "Router ki list ki kaun se device ne kaun sa connection shuru kiya.")],
//     ],
//   },
//   {
//     id: "client-unwraps", phase: b("17 · Device receives", "17 · Device receive karta hai"), node: 0, direction: "response", layer: "transport", layerMode: "unwrap",
//     packet: "Frame → IP packet → TCP segments → ordered encrypted bytes",
//     title: b("17. Your device unwraps the frame, packet and segments", "17. Aapka device frame, packet aur segments kholta hai"),
//     plain: b(
//       "Your device removes the frame, IP header and TCP header, and puts the pieces back in order.",
//       "Aapka device frame, IP header aur TCP header hatata hai, aur pieces ko sahi order mein lagata hai."
//     ),
//     why: b(
//       "The response arrives in small pieces that may be out of order. TCP rebuilds them before the browser sees anything.",
//       "Response chhote pieces mein aata hai jo order se bahar ho sakte hain. Browser ke dekhne se pehle TCP unhe dobara jodta hai."
//     ),
//     detail: b(
//       "Your network card checks that the frame is for it and removes the frame. The OS checks that the destination IP is its own and removes the IP header. TCP checks that the destination port matches your browser's connection, puts segments in order using sequence numbers, asks the server to resend anything missing, and sends ACKs back. The result is the ordered stream of encrypted TLS bytes, which is handed to the browser.",
//       "Aapka network card check karta hai ki frame uske liye hai aur frame hata deta hai. OS check karta hai ki destination IP uska apna hai aur IP header hata deta hai. TCP check karta hai ki destination port aapke browser ke connection se match karta hai, sequence numbers se segments ko order mein lagata hai, jo missing ho use server se dobara maangta hai, aur ACKs wapas bhejta hai. Result encrypted TLS bytes ki ordered stream hoti hai, jo browser ko di jaati hai."
//     ),
//     icons: ["📶", "🏷️", "🧩", "🌐"],
//     items: [b("Frame\nMAC checked, removed"), b("IP packet\nIP checked, removed"), b("TCP segments\nReordered"), b("Browser\nGets TLS bytes")],
//     analogy: b(
//       "You open the outer box, then the inner package, and arrange the numbered pages in order.",
//       "Aap bahar ka box kholte ho, phir andar ka package, aur numbered pages ko order mein lagate ho."
//     ),
//     remember: b("Your device reverses the same layers the server added.", "Aapka device wahi layers ulta kholta hai jo server ne lagayi thi."),
//     terms: [
//       ["Reassembly", b("Putting received segments back into the original order.", "Mile hue segments ko original order mein dobara lagana.")],
//       ["Retransmission", b("Sending a lost piece again.", "Kho gaye piece ko dobara bhejna.")],
//     ],
//     fields: [["Frame", "Destination MAC is your card"], ["IP packet", "Destination IP is your device"], ["TCP", "Port 52814 maps to your browser's connection"], ["Lost data", "Missing segments are sent again"]],
//   },
//   {
//     id: "client-decrypts", phase: b("18 · Browser checks response", "18 · Browser response check karta hai"), node: 0, direction: "response", layer: "app", layerMode: "unwrap",
//     packet: "HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 32\n\n{\"name\":\"Asha\",\"plan\":\"Student\"}",
//     title: b("18. TLS is removed and the browser checks the response", "18. TLS hatta kar browser response check karta hai"),
//     plain: b(
//       "The browser decrypts the data, reads the status and headers, and applies its safety rules.",
//       "Browser data decrypt karta hai, status aur headers padhta hai, aur apne safety rules apply karta hai."
//     ),
//     why: b(
//       "A server answer is not automatically handed to your code. The browser checks it first to protect the user.",
//       "Server ka jawab apne aap aapke code ko nahi diya jaata. Browser user ki suraksha ke liye pehle use check karta hai."
//     ),
//     detail: b(
//       "The browser decrypts the TLS records and checks that nothing was changed. It then reads the status line and headers and applies browser rules: CORS (does Access-Control-Allow-Origin allow this website to read the result?), caching headers (may the response be stored?), and Set-Cookie (should a cookie be saved?). If the rules allow it, the response is given to fetch(). If CORS blocks it, your JavaScript gets an error even though the server answered correctly.",
//       "Browser TLS records decrypt karta hai aur check karta hai ki kuch badla toh nahi. Phir status line aur headers padhta hai aur browser rules apply karta hai: CORS (kya Access-Control-Allow-Origin is website ko result padhne deta hai?), caching headers (kya response store ho sakta hai?), aur Set-Cookie (kya cookie save karni hai?). Rules allow karein toh response fetch() ko diya jaata hai. CORS block kar de toh server ne sahi jawab diya hone par bhi aapke JavaScript ko error milta hai."
//     ),
//     icons: ["🔓", "🧾", "🛡️", "⚛️"],
//     items: [b("Decrypt TLS\nVerify integrity"), b("Read headers\nStatus + type"), b("Browser rules\nCORS / cache / cookies"), b("fetch()\nGets the response")],
//     analogy: b(
//       "You open the reply letter and check the note on top to see if you are allowed to show it to others.",
//       "Aap reply letter kholte ho aur upar ka note dekhte ho ki kya use doosron ko dikhane ki ijaazat hai."
//     ),
//     remember: b("A correct server reply can still be blocked by browser rules like CORS.", "Server ka sahi reply bhi CORS jaise browser rules se block ho sakta hai."),
//     terms: [
//       ["Access-Control-Allow-Origin", b("A response header that says which websites may read the answer.", "Response header jo batata hai kaun si websites jawab padh sakti hain.")],
//       ["Cache-Control", b("A header that says if and how long a response can be saved.", "Header jo batata hai response save ho sakta hai ya nahi, aur kab tak.")],
//     ],
//     fields: [["Status", "200 OK"], ["CORS", "Is this website allowed to read the data?"], ["Cache", "May the browser store this response?"], ["Cookies", "Save any Set-Cookie values"]],
//   },
//   {
//     id: "page-updates", phase: b("19 · Page updates", "19 · Page update hota hai"), node: 0, direction: "response", layer: "app", layerMode: "unwrap",
//     packet: "const res = await fetch(url);\nif (!res.ok) throw new Error(res.status);\nconst data = await res.json();\n// data = { name: \"Asha\", plan: \"Student\" }",
//     title: b("19. fetch() finishes and your page updates", "19. fetch() poora hota hai aur page update hota hai"),
//     plain: b(
//       "Your code reads the JSON, stores it in state, and the screen shows the new data.",
//       "Aapka code JSON padhta hai, use state mein rakhta hai, aur screen par naya data dikhta hai."
//     ),
//     why: b(
//       "This is the goal of the whole trip: your app gets data it can show to the user.",
//       "Poore safar ka maqsad yahi hai: aapki app ko aisa data mile jo woh user ko dikha sake."
//     ),
//     detail: b(
//       "fetch() returns a Promise. It resolves as soon as the status line and headers arrive, even for 404 or 500, so your code should check response.ok. Then response.json() reads the body and turns the JSON text into a JavaScript object. Your app puts that data into state and the page re-renders. The connection usually stays open (keep-alive, or HTTP/2 multiplexing), so the next request can skip the TCP and TLS setup, and the DNS answer may still be cached. The connection is closed later, when it is idle or when one side sends a TCP FIN. Only a real network failure makes fetch() reject.",
//       "fetch() ek Promise return karta hai. Woh status line aur headers aate hi resolve ho jaata hai, 404 ya 500 par bhi, isliye aapke code ko response.ok check karna chahiye. Phir response.json() body padhta hai aur JSON text ko JavaScript object mein badalta hai. Aapki app wo data state mein rakhti hai aur page dobara render hota hai. Connection aam taur par khula rehta hai (keep-alive, ya HTTP/2 multiplexing), isliye agli request TCP aur TLS setup skip kar sakti hai, aur DNS answer bhi cache mein ho sakta hai. Connection baad mein band hota hai, jab woh idle ho ya koi side TCP FIN bheje. Sirf asli network failure par fetch() reject hota hai."
//     ),
//     icons: ["⏳", "🧮", "🖼️", "♻️"],
//     items: [b("Promise\nResolves"), b("response.json()\nText → object"), b("UI updates\nNew data shown"), b("Connection\nKept for reuse")],
//     analogy: b(
//       "The parcel arrives, you open it and use what is inside, and the courier keeps your address on file for next time.",
//       "Parcel aata hai, aap use kholkar andar ki cheez use karte ho, aur courier agli baar ke liye aapka address yaad rakhta hai."
//     ),
//     remember: b("fetch() resolves even for 404 or 500, so always check res.ok.", "fetch() 404 ya 500 par bhi resolve hota hai, isliye hamesha res.ok check karo."),
//     terms: [
//       ["Promise", b("An object that stands for a result that will arrive later.", "Object jo aise result ko represent karta hai jo baad mein aayega.")],
//       ["res.ok", b("true when the status is between 200 and 299.", "true jab status 200 se 299 ke beech ho.")],
//       ["Keep-alive", b("Keeping a connection open to reuse it for later requests.", "Connection ko khula rakhna taaki baad ki requests use reuse kar sakein.")],
//     ],
//     fields: [["res.ok", "true for status 200 to 299"], ["res.json()", "Reads the body as JSON"], ["Keep-alive", "Connection can carry the next request"], ["Network failure", "The only case where fetch() rejects"]],
//   },
// ];

// export const HTTP_Request_Response = {
//   heroTitle: "Learn how computers & software actually work",
// };
export type Bi = { en: string; hi: string };
const b = (en: string, hi: string = en): Bi => ({ en, hi });

/* ------------------------------------------------------------------ */
/*  UI labels                                                          */
/* ------------------------------------------------------------------ */
export const HTTP_UI = {
  en: {
    lessonTitle: "HTTP Request & Response",
    previous: "Previous",
    restart: "Restart",
    next: "Next",
    lessonSubtitle: "Follow a request from your browser to a server, and the response all the way back",
    requestJourney: "Journey",
    known: "Known so far",
    domain: "Domain",
    protocol: "Protocol",
    source: "From",
    destination: "To",
    status: "Status",
    stepWord: "STEP",
    keyTakeaway: "Key takeaway",
    why: "Why is this step needed?",
    tabAnalogy: "Real life",
    tabWords: "Key words",
    tabLayers: "Wrapping",
    tabDetails: "Details",
    diagramLabel: "Picture it",
    dataLabel: "Moving now",
    snapshotNote: "A snapshot of the data at this point in the journey.",
    readMore: "Read more",
    requestLabel: "Request: browser → server",
    responseLabel: "Response: server → browser",
    legendRequest: "Request",
    legendResponse: "Response",
    layerData: "Message (HTTP)",
    layerTls: "TLS record",
    layerSegment: "TCP segment",
    layerPacket: "IP packet",
    layerFrame: "Link frame",
    layerCurrent: "Current",
    layerAdded: "Added",
    layerNext: "Next",
    layerRemoved: "Removed",
    layerInside: "Still inside",
    physicalNote: "The frame travels as electric, radio or light signals.",
    layersHintWrap: "Each layer adds its own wrapper as data travels.",
    layersHintUnwrap: "Each layer removes its own wrapper until only the HTTP message is left.",
  },
  hi: {
    lessonTitle: "HTTP Request & Response",
    previous: "Pichhe",
    restart: "Dobara",
    next: "Aage",
    lessonSubtitle: "Browser se server tak request ka safar, aur response ka wapas aana samjho",
    requestJourney: "Safar",
    known: "Ab tak pata hai",
    domain: "Domain",
    protocol: "Protocol",
    source: "Kaha se",
    destination: "Kaha tak",
    status: "Status",
    stepWord: "STEP",
    keyTakeaway: "Yaad rakho",
    why: "Yeh step kyun zaroori hai?",
    tabAnalogy: "Real life",
    tabWords: "Zaroori words",
    tabLayers: "Wrapping",
    tabDetails: "Details",
    diagramLabel: "Visual samjho",
    dataLabel: "Abhi move ho raha hai",
    snapshotNote: "Yeh is step par data ka current snapshot hai.",
    readMore: "Aur padho",
    requestLabel: "Request: browser se server",
    responseLabel: "Response: server se browser",
    legendRequest: "Request",
    legendResponse: "Response",
    layerData: "Message (HTTP)",
    layerTls: "TLS record",
    layerSegment: "TCP segment",
    layerPacket: "IP packet",
    layerFrame: "Link frame",
    layerCurrent: "Abhi",
    layerAdded: "Complete",
    layerNext: "Aage",
    layerRemoved: "Hata diya",
    layerInside: "Abhi andar",
    physicalNote: "Frame electric, radio ya light signals se travel karta hai.",
    layersHintWrap: "Data travel karte waqt har layer apni wrapping add karti hai.",
    layersHintUnwrap: "Har layer apni wrapping hatati hai, jab tak sirf HTTP message na bache.",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Journey nodes                                                      */
/* ------------------------------------------------------------------ */
export const NODES = [
  { icon: "💻", en: { title: "Browser", sub: "Your device" }, hi: { title: "Browser", sub: "Aapka device" } },
  { icon: "🌐", en: { title: "Network", sub: "The road" }, hi: { title: "Network", sub: "Raasta" } },
  { icon: "🗄️", en: { title: "Server", sub: "The answerer" }, hi: { title: "Server", sub: "Jawab dene wala" } },
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type Layer = "app" | "tls" | "transport" | "network" | "datalink" | "physical" | "none";
export const LAYER_RANK: Record<Layer, number> = {
  none: 0, app: 1, tls: 2, transport: 3, network: 4, datalink: 5, physical: 5,
};

/** request = going to the server, response = coming back to the browser */
export type Direction = "request" | "response";
/** wrap = layers are being added, unwrap = layers are being removed */
export type LayerMode = "wrap" | "unwrap";

export interface ConnectionReveal {
  domain?: string;
  protocol?: string;
  sourceIp?: string;
  sourcePort?: string;
  destIp?: string;
  destPort?: string;
  status?: string;
}

export interface HttpStep {
  id: string;
  phase: Bi;
  node: 0 | 1 | 2;
  direction: Direction;
  layer: Layer;
  layerMode: LayerMode;
  packet: string;
  reveal?: ConnectionReveal;
  title: Bi;
  plain: Bi; // one-sentence version, shown big
  why: Bi; // why this step exists, for beginners
  detail: Bi; // longer explanation, always shown in Details
  icons: string[]; // one emoji per item
  items: Bi[]; // diagram boxes: first line = title, next line = small text
  analogy: Bi;
  remember: Bi;
  terms: [string, Bi][]; // key words
  fields?: [string, string][]; // "look inside" rows
}

/* ------------------------------------------------------------------ */
/*  Steps 1–10: request travels to the server                          */
/*  Steps 11–19: server works, response travels back                   */
/* ------------------------------------------------------------------ */
export const HTTP_STEPS: HttpStep[] = [
  /* ============================ REQUEST ============================ */
  {
    id: "fetch-call", phase: b("1 · Start the request", "1 · Request shuru karo"), node: 0, direction: "request", layer: "app", layerMode: "wrap",
    packet: 'fetch("https://api.example.com/profile")',
    reveal: { domain: "api.example.com", protocol: "HTTPS" },
    title: b("1. Your app calls fetch()", "1. App fetch() call karti hai"),
    plain: b("fetch() asks the browser to request a resource from a URL.", "fetch() browser se URL par resource request karne ko kehta hai."),
    why: b(
      "Your JavaScript code does not talk to the network directly. The browser knows how, so the code hands the job over.",
      "Aapka JavaScript code seedha network se baat nahi karta. Browser jaanta hai kaise karna hai, isliye code kaam browser ko de deta hai."
    ),
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
    id: "browser-prepares", phase: b("2 · Prepare the request", "2 · Request taiyaar karo"), node: 0, direction: "request", layer: "app", layerMode: "wrap",
    packet: "URL + method + headers + cookies (when applicable) + body",
    title: b("2. Browser prepares the HTTP request", "2. Browser HTTP request prepare karta hai"),
    plain: b("The browser reads the URL and request options, then applies relevant browser rules.", "Browser URL aur request options read karta hai, phir relevant browser rules apply karta hai."),
    why: b(
      "The server can only help if the request clearly says what you want and who is asking.",
      "Server tabhi madad kar sakta hai jab request saaf bataye ki aapko kya chahiye aur kaun maang raha hai."
    ),
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
    id: "dns", phase: b("3 · Find the server", "3 · Server dhoondho"), node: 1, direction: "request", layer: "none", layerMode: "wrap",
    packet: "api.example.com → DNS/cache → server IP address",
    reveal: { destIp: "203.0.113.10" },
    title: b("3. DNS finds the server IP", "3. DNS server ka IP dhoondhta hai"),
    plain: b("The browser or OS looks up the domain's IP address, unless a usable result is already cached.", "Browser ya OS domain ka IP address dhoondhta hai, jab tak usable result cache mein na ho."),
    why: b(
      "People use names, but networks move data using numbers. DNS connects the two.",
      "Log naam use karte hain, lekin network numbers se data bhejta hai. DNS dono ko jodta hai."
    ),
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
    id: "serialize", phase: b("4 · Prepare bytes", "4 · Bytes banao"), node: 0, direction: "request", layer: "app", layerMode: "wrap",
    packet: "HTTP request → encoded bytes → OS networking stack",
    title: b("4. Request becomes bytes", "4. Request bytes mein convert hoti hai"),
    plain: b("The browser encodes the HTTP request as bytes and hands data to the networking stack.", "Browser HTTP request ko bytes mein encode karke networking stack ko data deta hai."),
    why: b(
      "Cables and Wi-Fi carry signals that stand for 0s and 1s, not text or JavaScript objects.",
      "Cable aur Wi-Fi 0 aur 1 wale signals carry karte hain, text ya JavaScript objects nahi."
    ),
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
    id: "tcp-handshake", phase: b("5 · Establish transport", "5 · Transport connection"), node: 1, direction: "request", layer: "transport", layerMode: "wrap",
    packet: "TCP: SYN → SYN-ACK → ACK",
    reveal: { destPort: "443" },
    title: b("5. TCP connection is established", "5. TCP connection establish hota hai"),
    plain: b("For HTTP over TCP, the client and server establish a reliable, ordered connection.", "TCP par chalne wale HTTP ke liye client aur server reliable, ordered connection establish karte hain."),
    why: b(
      "Both sides must confirm they are ready, so data is not lost or sent to nobody.",
      "Dono sides ko confirm karna padta hai ki ready hain, taaki data kho na jaye ya kisi ko na pahunche."
    ),
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
    id: "tls-handshake", phase: b("6 · Secure the connection", "6 · Connection secure karo"), node: 1, direction: "request", layer: "tls", layerMode: "wrap",
    packet: "HTTPS: TLS handshake → verify certificate → establish keys",
    title: b("6. TLS secures HTTPS", "6. TLS HTTPS ko secure karta hai"),
    plain: b("For HTTPS, TLS negotiates encryption and helps verify the server's identity.", "HTTPS mein TLS encryption negotiate karta hai aur server ki identity verify karne mein help karta hai."),
    why: b(
      "Without TLS, anyone on the path (like public Wi-Fi) could read or change your data.",
      "TLS ke bina raaste mein koi bhi (jaise public Wi-Fi) aapka data padh ya badal sakta hai."
    ),
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
    id: "tcp-segments", phase: b("7 · Split the data", "7 · Data todo"), node: 1, direction: "request", layer: "transport", layerMode: "wrap",
    packet: "Application/TLS bytes → TCP segments",
    reveal: { sourcePort: "52814" },
    title: b("7. TCP splits the byte stream into segments", "7. TCP byte stream ko segments mein divide karta hai"),
    plain: b("TCP sends data in segments and adds ports and delivery-control information.", "TCP data ko segments mein bhejta hai aur ports aur delivery-control information add karta hai."),
    why: b(
      "Big data cannot travel in one piece. Small numbered pieces can be put back in order, and lost ones can be sent again.",
      "Bada data ek saath nahi jaa sakta. Chhote numbered pieces sahi order mein jode ja sakte hain, aur kho gaye pieces dobara bheje ja sakte hain."
    ),
    detail: b(
      "TCP divides the outgoing byte stream into segments sized according to the path's MSS and other conditions. The TCP header includes source and destination ports, sequence and acknowledgment numbers, and flags. These fields help deliver data to the right application, keep bytes in order, and recover from loss. With HTTPS, the TCP payload carries TLS-protected data. The source port 52814 shown here is an example of a temporary port your operating system picks for this connection.",
      "TCP outgoing byte stream ko path ke MSS aur doosri conditions ke hisaab se segments mein divide karta hai. TCP header mein source/destination ports, sequence aur acknowledgment numbers, aur flags hote hain. Yeh fields data ko sahi application tak pahunchane, bytes order mein rakhne aur loss recover karne mein help karte hain. HTTPS mein TCP payload TLS-protected data carry karta hai. Yahan dikhaya source port 52814 ek example hai; yeh temporary port aapka OS is connection ke liye chunta hai."
    ),
    icons: ["🔢", "📦", "🧩"],
    items: [b("Bytes\nStream"), b("TCP header\nPorts + sequence"), b("TCP segment")],
    analogy: b("Breaking a long message into numbered pieces so the receiver can put them in order.", "Lambe message ko numbered pieces mein todna taaki receiver sahi order mein jod sake."),
    remember: b("Ports identify applications; sequence numbers help order the byte stream.", "Ports applications identify karte hain; sequence numbers byte stream ka order maintain karte hain."),
    terms: [["Source port", b("Port used by the sending application.", "Bhejne wali application ka port.")], ["Destination port", b("Port of the receiving service, often 443 for HTTPS.", "Receiving service ka port; HTTPS ke liye aksar 443.")], ["Sequence number", b("Tracks byte positions in the stream.", "Stream mein byte positions track karta hai.")]],
    fields: [["Source port", "Temporary client-side port"], ["Destination port", "Server port (commonly 443 for HTTPS)"], ["Sequence / ACK", "Track byte order and acknowledgments"], ["Flags", "Connection and control signals"]],
  },
  {
    id: "ip-packets", phase: b("8 · Address the destination", "8 · Destination address lagao"), node: 1, direction: "request", layer: "network", layerMode: "wrap",
    packet: "TCP segment → IP packet [source IP + destination IP]",
    reveal: { sourceIp: "192.168.1.5", destIp: "203.0.113.10" },
    title: b("8. IP wraps each segment in a packet", "8. IP har segment ko packet mein wrap karta hai"),
    plain: b("IP adds source and destination IP addresses so routers can forward the packet.", "IP source aur destination IP addresses add karta hai taaki routers packet forward kar sakein."),
    why: b(
      "Routers do not understand ports or HTTP. They only need an IP address to decide where to send data.",
      "Routers ports ya HTTP nahi samajhte. Unhe sirf IP address chahiye taaki woh data kahan bhejna hai decide kar sakein."
    ),
    detail: b(
      "The IP layer encapsulates the TCP segment inside an IP packet. The IP header contains source and destination IP addresses and other routing-related fields. Routers use the destination IP address to decide where to forward the packet. The source address shown in real networks may be changed by NAT along the path. 192.168.1.5 is an example private address of the kind used inside home networks.",
      "IP layer TCP segment ko IP packet ke andar encapsulate karti hai. IP header mein source aur destination IP addresses aur routing se related fields hote hain. Routers destination IP dekhkar decide karte hain packet kahan forward karna hai. Real network mein NAT ki wajah se source address path par change ho sakta hai. 192.168.1.5 ek example private address hai, jaisa ghar ke network mein hota hai."
    ),
    icons: ["📦", "🏷️", "🧭"],
    items: [b("TCP segment"), b("IP header\nSource + destination IP"), b("IP packet")],
    analogy: b("Putting the parcel inside a package with the full destination address.", "Parcel ko full destination address wale package mein rakhna."),
    remember: b("IP addresses guide the packet across networks; ports identify the application.", "IP addresses packet ko networks ke across guide karte hain; ports application identify karte hain."),
    terms: [["IP packet", b("Network-layer unit carrying data and IP addresses.", "Network-layer unit jisme data aur IP addresses hote hain.")], ["NAT", b("A device translates IP addresses, commonly at a router.", "Device jo IP addresses translate karta hai, aksar router par.")]],
  },
  {
    id: "link-frames", phase: b("9 · Send over the local link", "9 · Local link par bhejo"), node: 1, direction: "request", layer: "datalink", layerMode: "wrap",
    packet: "IP packet → Ethernet / Wi-Fi frame [source MAC + destination MAC]",
    title: b("9. Ethernet or Wi-Fi adds a frame", "9. Ethernet ya Wi-Fi frame add karta hai"),
    plain: b("The local link wraps the IP packet in a frame addressed to the next device on that link.", "Local link IP packet ko frame mein wrap karta hai jo us link ke next device ko addressed hota hai."),
    why: b(
      "Each physical link (Wi-Fi, cable) needs its own local address to hand data to the next device.",
      "Har physical link (Wi-Fi, cable) ko apna local address chahiye taaki data next device ko diya ja sake."
    ),
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
    id: "routing-hops", phase: b("10 · Travel to the server", "10 · Server tak safar"), node: 1, direction: "request", layer: "network", layerMode: "wrap",
    packet: "Device → router → next hops … → server network → server",
    title: b("10. Routers forward packets hop by hop", "10. Routers packets ko hop-by-hop forward karte hain"),
    plain: b("Each router forwards the IP packet onward and builds a new local frame for the next link.", "Har router IP packet ko aage forward karta hai aur next link ke liye naya local frame banata hai."),
    why: b(
      "No single device knows the whole internet. Each router only decides the next hop.",
      "Koi ek device poora internet nahi jaanta. Har router sirf next hop decide karta hai."
    ),
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

  /* ====================== SERVER RECEIVES REQUEST ====================== */
  {
    id: "server-receives", phase: b("11 · Server receives", "11 · Server receive karta hai"), node: 2, direction: "request", layer: "transport", layerMode: "unwrap",
    packet: "Frame → IP packet → TCP segments → one ordered byte stream",
    title: b("11. Server unwraps the frame, packet and segments", "11. Server frame, packet aur segments kholta hai"),
    plain: b(
      "The server's network card and OS remove the frame, the IP header and the TCP header, and rebuild the original bytes.",
      "Server ka network card aur OS frame, IP header aur TCP header hatate hain, aur original bytes dobara banate hain."
    ),
    why: b(
      "The data must be rebuilt exactly as it was sent, and in the right order, before anyone can read it.",
      "Data ko bilkul waisa hi, sahi order mein, dobara banana padta hai, tabhi koi use padh sakta hai."
    ),
    detail: b(
      "When the frame reaches the server's network card (NIC), the card checks that the destination MAC is its own and removes the frame. The operating system then checks that the destination IP is its own and removes the IP header. TCP reads the destination port (443) and gives the data to the program that is listening on that port, such as a web server. Using the sequence numbers, TCP puts segments back in order, asks again for any missing piece, and sends acknowledgments (ACKs) back to the client. In real systems, the first machine reached is often a load balancer or CDN that passes the request on to the real application server.",
      "Jab frame server ke network card (NIC) tak pahunchta hai, card check karta hai ki destination MAC uska apna hai aur frame hata deta hai. Phir OS check karta hai ki destination IP uska apna hai aur IP header hata deta hai. TCP destination port (443) padhta hai aur data us program ko deta hai jo us port par sun raha hai, jaise web server. Sequence numbers ki madad se TCP segments ko sahi order mein lagata hai, koi piece missing ho toh dobara maangta hai, aur client ko acknowledgments (ACKs) bhejta hai. Real systems mein pehli machine aksar load balancer ya CDN hoti hai jo request ko asli application server tak pahunchati hai."
    ),
    icons: ["📶", "🏷️", "🧩", "🖥️"],
    items: [b("Frame\nMAC checked, removed"), b("IP packet\nIP checked, removed"), b("TCP segments\nPort 443, reorder"), b("Web server\nGets the bytes")],
    analogy: b(
      "A company mailroom opens the outer box, then the inner package, and puts the numbered pages back in order.",
      "Company ka mailroom bahar ka box kholta hai, phir andar ka package, aur numbered pages ko sahi order mein lagata hai."
    ),
    remember: b("Unwrapping goes in reverse: frame first, then IP, then TCP.", "Unwrapping ulte order mein hoti hai: pehle frame, phir IP, phir TCP."),
    terms: [
      ["NIC", b("Network interface card: the hardware that connects a computer to a network.", "Network interface card: hardware jo computer ko network se jodta hai.")],
      ["ACK", b("A reply telling the sender which bytes arrived safely.", "Reply jo sender ko batata hai ki kaun se bytes safely pahunche.")],
      ["Load balancer", b("A machine that shares incoming requests among several servers.", "Machine jo aati requests ko kai servers mein baant deti hai.")],
    ],
    fields: [["Frame", "Destination MAC matches the server's card"], ["IP packet", "Destination IP is the server's address"], ["TCP", "Port 443 goes to the web server program"], ["ACK", "Tells the client which bytes arrived"]],
  },
  {
    id: "server-decrypts", phase: b("12 · Server reads the request", "12 · Server request padhta hai"), node: 2, direction: "request", layer: "app", layerMode: "unwrap",
    packet: "GET /profile HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer ••••••\nAccept: application/json",
    title: b("12. TLS is removed and the server reads the HTTP request", "12. TLS hatata hai aur server HTTP request padhta hai"),
    plain: b(
      "The server decrypts the data with the session keys and reads the method, path and headers.",
      "Server session keys se data decrypt karta hai aur method, path aur headers padhta hai."
    ),
    why: b(
      "Encryption protects the trip. The server must remove it to understand what you asked for.",
      "Encryption safar ko protect karta hai. Server ko use hatana padta hai taaki samajh sake aapne kya maanga."
    ),
    detail: b(
      "The server uses the session keys from Step 6 to decrypt the TLS records and checks that nothing was changed on the way. What remains is the original HTTP request. In HTTP/1.1 it is readable text: a request line (method, path, version), headers, and an optional body. HTTP/2 and HTTP/3 carry the same information in a compact binary form, but the meaning is the same. Now the web server knows the method (GET), the path (/profile), and who is asking (from headers and cookies).",
      "Server Step 6 ki session keys se TLS records decrypt karta hai aur check karta hai ki raaste mein kuch badla toh nahi. Jo bachta hai woh original HTTP request hai. HTTP/1.1 mein yeh readable text hota hai: request line (method, path, version), headers, aur optional body. HTTP/2 aur HTTP/3 wahi information compact binary form mein bhejte hain, lekin matlab same rehta hai. Ab web server ko pata hai method (GET), path (/profile), aur kaun maang raha hai (headers aur cookies se)."
    ),
    icons: ["🔓", "📄", "🖥️"],
    items: [b("TLS record\nDecrypt + verify"), b("HTTP request\nReadable again"), b("Web server\nReads method + path")],
    analogy: b(
      "The receiver uses the secret code to open the sealed letter and reads the instructions inside.",
      "Receiver secret code se sealed letter kholta hai aur andar likhe instructions padhta hai."
    ),
    remember: b("Only the two ends hold the keys; routers on the way saw only scrambled bytes.", "Keys sirf dono ends ke paas hoti hain; raaste ke routers ne sirf scrambled bytes dekhe."),
    terms: [
      ["Request line", b("The first line: method, path and HTTP version.", "Pehli line: method, path aur HTTP version.")],
      ["Decrypt", b("Turn scrambled data back into readable data using a key.", "Key se scrambled data ko dobara readable banana.")],
    ],
    fields: [["Method", "GET: read data"], ["Path", "/profile: which resource"], ["Host", "api.example.com: which site"], ["Authorization / Cookie", "Who is asking"]],
  },

  /* ========================= SERVER RESPONDS ========================= */
  {
    id: "server-processes", phase: b("13 · Server does the work", "13 · Server kaam karta hai"), node: 2, direction: "response", layer: "app", layerMode: "wrap",
    packet: "route /profile → check login → read database → prepare result",
    title: b("13. The server application does the work", "13. Server application kaam karti hai"),
    plain: b(
      "Application code picks the right handler, checks who you are, reads or changes data, and prepares a result.",
      "Application code sahi handler chunta hai, check karta hai aap kaun ho, data padhta ya badalta hai, aur result taiyaar karta hai."
    ),
    why: b(
      "This is the moment the server actually answers your question. Everything before this was delivery.",
      "Yahi woh moment hai jab server sach mein aapke sawal ka jawab banata hai. Isse pehle sab delivery tha."
    ),
    detail: b(
      "The web framework matches GET /profile to a handler function (routing). The handler checks authentication (is the token or cookie valid?) and authorization (is this user allowed to see this?). It may read from a database or cache, or call other services. Then it prepares the result, which for an API is usually JSON, and chooses a status code: 200 means success, 401 means not logged in, 403 means forbidden, 404 means not found, and 500 means the server had an error. This part is ordinary program logic, not networking, and it can take anything from a few milliseconds to several seconds.",
      "Web framework GET /profile ko ek handler function se match karta hai (routing). Handler authentication check karta hai (token ya cookie valid hai?) aur authorization (kya is user ko yeh dekhne ki permission hai?). Woh database ya cache se padh sakta hai, ya doosri services call kar sakta hai. Phir result taiyaar karta hai, jo API mein aksar JSON hota hai, aur status code chunta hai: 200 matlab success, 401 matlab login nahi hai, 403 matlab permission nahi, 404 matlab nahi mila, aur 500 matlab server mein error. Yeh hissa normal program logic hai, networking nahi, aur isme kuch milliseconds se kai seconds lag sakte hain."
    ),
    icons: ["🧭", "🪪", "🗃️", "🧾"],
    items: [b("Route\n/profile handler"), b("Check login\nToken / cookie"), b("Database\nRead data"), b("Result\nJSON + status")],
    analogy: b(
      "A restaurant kitchen reads your order slip, checks the table, cooks the dish and plates it.",
      "Restaurant ki kitchen aapki order slip padhti hai, table check karti hai, dish banati hai aur plate mein lagati hai."
    ),
    remember: b("The status code tells the browser what happened, before it reads the body.", "Status code browser ko batata hai kya hua, body padhne se pehle."),
    terms: [
      ["Routing", b("Choosing which code handles a given method and path.", "Method aur path ke hisaab se kaun sa code chalega yeh chunna.")],
      ["Status code", b("A number that says how the request went.", "Number jo batata hai request ka kya hua.")],
      ["JSON", b("A text format for structured data, like {\"name\":\"Asha\"}.", "Structured data ka text format, jaise {\"name\":\"Asha\"}.")],
    ],
    fields: [["200 OK", "Success"], ["401 Unauthorized", "Not logged in"], ["404 Not Found", "No such resource"], ["500 Server Error", "The server failed"]],
  },
  {
    id: "server-builds-response", phase: b("14 · Build the response", "14 · Response banao"), node: 2, direction: "response", layer: "app", layerMode: "wrap",
    reveal: { status: "200 OK" },
    packet: 'HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 32\n\n{"name":"Asha","plan":"Student"}',
    title: b("14. The server builds the HTTP response", "14. Server HTTP response banata hai"),
    plain: b(
      "The response has a status line, headers that describe the data, and a body with the data itself.",
      "Response mein status line, data ko describe karne wale headers, aur data wali body hoti hai."
    ),
    why: b(
      "The browser must know whether it worked, what kind of data came back, and how to handle it.",
      "Browser ko jaanna zaroori hai ki kaam hua ya nahi, kaisa data aaya, aur use kaise handle karna hai."
    ),
    detail: b(
      "A response has three parts: a status line (HTTP version, status code, reason), headers, and a body. Headers describe the body (Content-Type, Content-Length), control caching (Cache-Control), can ask the browser to save a cookie (Set-Cookie), and can say which other websites may read the answer (Access-Control-Allow-Origin, used by CORS). The body is the real data, here JSON. Just like the request, this text is turned into bytes before it is sent.",
      "Response ke teen hisse hote hain: status line (HTTP version, status code, reason), headers, aur body. Headers body ko describe karte hain (Content-Type, Content-Length), caching control karte hain (Cache-Control), browser se cookie save karwa sakte hain (Set-Cookie), aur bata sakte hain ki kaun si doosri websites jawab padh sakti hain (Access-Control-Allow-Origin, CORS mein use hota hai). Body asli data hai, yahan JSON. Request ki tarah, yeh text bhi bhejne se pehle bytes mein convert hota hai."
    ),
    icons: ["✅", "🏷️", "📦"],
    items: [b("Status line\n200 OK"), b("Headers\nType, size, cache"), b("Body\nThe JSON data")],
    analogy: b(
      "A reply letter: a top line saying how it went, a note about what is inside, then the contents.",
      "Reply letter: upar ek line ki kaam kaisa hua, ek note ki andar kya hai, phir asli cheez."
    ),
    remember: b("Response = status line + headers + body.", "Response = status line + headers + body."),
    terms: [
      ["Content-Type", b("Tells the browser what kind of data the body is.", "Browser ko batata hai ki body kis type ka data hai.")],
      ["Content-Length", b("The size of the body in bytes.", "Body ka size bytes mein.")],
      ["Set-Cookie", b("Asks the browser to store a small piece of data.", "Browser se chhota data save karne ko kehta hai.")],
    ],
    fields: [["Status line", "HTTP/1.1 200 OK"], ["Content-Type", "What kind of data the body is"], ["Content-Length", "Body size in bytes"], ["Set-Cookie", "Optional: ask the browser to store a cookie"]],
  },
  {
    id: "server-wraps", phase: b("15 · Wrap and send back", "15 · Wrap karke wapas bhejo"), node: 2, direction: "response", layer: "datalink", layerMode: "wrap",
    packet: "HTTP response → TLS records → TCP segments (443 → 52814) → IP packets (203.0.113.10 → your public IP) → frames",
    title: b("15. The response is wrapped and sent back", "15. Response wrap hokar wapas bheji jaati hai"),
    plain: b(
      "The server wraps the response in the same layers, with source and destination swapped.",
      "Server response ko wahi layers mein wrap karta hai, source aur destination badal kar."
    ),
    why: b(
      "The reply follows the same rules and the same layers as the request, only in the opposite direction.",
      "Reply wahi rules aur wahi layers follow karta hai jo request ne kiye, bas ulti direction mein."
    ),
    detail: b(
      "The server wraps the response in the same way the browser wrapped the request, using the same connection. TLS encrypts it with the session keys. TCP cuts it into segments, and this time the source port is 443 and the destination port is the temporary port your browser used (for example 52814). IP sets the source to the server's IP and the destination to your network's public IP. A frame addressed to the server's next-hop router is added. Compare with the request: source and destination are swapped.",
      "Server response ko waise hi wrap karta hai jaise browser ne request wrap ki thi, usi connection par. TLS use session keys se encrypt karta hai. TCP use segments mein todta hai, aur is baar source port 443 hai aur destination port woh temporary port hai jo aapke browser ne use kiya (jaise 52814). IP source mein server ka IP aur destination mein aapke network ka public IP lagata hai. Server ke next-hop router ko addressed frame add hota hai. Request se compare karo: source aur destination badal gaye hain."
    ),
    icons: ["🔐", "🧩", "🏷️", "📶"],
    items: [b("TLS\nEncrypt response"), b("TCP segments\nPorts swapped"), b("IP packets\nAddresses swapped"), b("Frames\nTo next router")],
    analogy: b(
      "The reply goes into a new sealed envelope with the sender and receiver addresses swapped.",
      "Reply ek naye sealed envelope mein jaata hai, jisme sender aur receiver ke address badal diye jaate hain."
    ),
    remember: b("Replies use the same layers; source and destination swap.", "Replies wahi layers use karte hain; source aur destination badal jaate hain."),
    terms: [
      ["Ephemeral port", b("A temporary port your OS picks for one connection.", "Temporary port jo aapka OS ek connection ke liye chunta hai.")],
      ["Public IP", b("The address your network shows to the internet.", "Woh address jo aapka network internet ko dikhata hai.")],
    ],
    fields: [["Source port", "443"], ["Destination port", "52814 (your browser's temporary port)"], ["Source IP", "203.0.113.10 (the server)"], ["Destination IP", "Your network's public IP"]],
  },
  {
    id: "response-routing", phase: b("16 · Travel back", "16 · Wapas safar"), node: 1, direction: "response", layer: "network", layerMode: "wrap",
    packet: "Server → routers → … → your router (NAT) → your device",
    title: b("16. Routers carry the response back to you", "16. Routers response ko aapke paas wapas laate hain"),
    plain: b(
      "Routers forward the response hop by hop, and your home router sends it to the right device.",
      "Routers response ko hop-by-hop forward karte hain, aur aapka home router use sahi device tak bhejta hai."
    ),
    why: b(
      "Many devices share one public IP. Your router must remember who asked, so the reply reaches the right device.",
      "Kai devices ek hi public IP share karte hain. Router ko yaad rakhna padta hai ki kisne maanga tha, taaki reply sahi device tak pahunche."
    ),
    detail: b(
      "Routers forward the response exactly like Step 10: each one removes the old frame, reads the destination IP, picks the next hop and adds a new frame. The way back can be different from the way forward, because each router decides on its own. Each router also lowers the packet's TTL (time to live) by one; when it reaches zero the packet is dropped, which stops packets from looping forever. At your home, the router uses its NAT table to remember which device and port started this connection, and changes the destination from the public IP back to your private IP (for example 192.168.1.5). It then sends a final frame to your device.",
      "Routers response ko bilkul Step 10 ki tarah forward karte hain: har ek purana frame hata kar destination IP padhta hai, next hop chunta hai aur naya frame lagata hai. Wapsi ka raasta aane wale raaste se alag ho sakta hai, kyunki har router khud decide karta hai. Har router packet ka TTL (time to live) ek kam karta hai; zero hone par packet drop ho jaata hai, jisse packets hamesha ghoomte nahi rehte. Aapke ghar mein router NAT table se yaad rakhta hai ki kaun se device aur port ne yeh connection shuru kiya tha, aur destination ko public IP se wapas aapke private IP (jaise 192.168.1.5) mein badal deta hai. Phir woh aakhri frame aapke device ko bhejta hai."
    ),
    icons: ["🗄️", "🔁", "🏠", "💻"],
    items: [b("Server network\nSends it out"), b("Internet routers\nHop by hop"), b("Your router\nNAT table lookup"), b("Your device\nFinal frame")],
    analogy: b(
      "The reply parcel passes through depots. At your building, the receptionist knows which flat ordered it and delivers it there.",
      "Reply parcel depots se guzarta hai. Aapki building mein receptionist jaanta hai kis flat ne order kiya tha aur wahin deliver karta hai."
    ),
    remember: b("The return route may differ; NAT sends the reply to the right device.", "Wapsi ka route alag ho sakta hai; NAT reply ko sahi device tak bhejta hai."),
    terms: [
      ["TTL", b("A counter that drops a packet if it travels too many hops.", "Counter jo bahut hops ke baad packet ko drop kar deta hai.")],
      ["NAT table", b("A router's list of which device started which connection.", "Router ki list ki kaun se device ne kaun sa connection shuru kiya.")],
    ],
  },
  {
    id: "client-unwraps", phase: b("17 · Device receives", "17 · Device receive karta hai"), node: 0, direction: "response", layer: "transport", layerMode: "unwrap",
    packet: "Frame → IP packet → TCP segments → ordered encrypted bytes",
    title: b("17. Your device unwraps the frame, packet and segments", "17. Aapka device frame, packet aur segments kholta hai"),
    plain: b(
      "Your device removes the frame, IP header and TCP header, and puts the pieces back in order.",
      "Aapka device frame, IP header aur TCP header hatata hai, aur pieces ko sahi order mein lagata hai."
    ),
    why: b(
      "The response arrives in small pieces that may be out of order. TCP rebuilds them before the browser sees anything.",
      "Response chhote pieces mein aata hai jo order se bahar ho sakte hain. Browser ke dekhne se pehle TCP unhe dobara jodta hai."
    ),
    detail: b(
      "Your network card checks that the frame is for it and removes the frame. The OS checks that the destination IP is its own and removes the IP header. TCP checks that the destination port matches your browser's connection, puts segments in order using sequence numbers, asks the server to resend anything missing, and sends ACKs back. The result is the ordered stream of encrypted TLS bytes, which is handed to the browser.",
      "Aapka network card check karta hai ki frame uske liye hai aur frame hata deta hai. OS check karta hai ki destination IP uska apna hai aur IP header hata deta hai. TCP check karta hai ki destination port aapke browser ke connection se match karta hai, sequence numbers se segments ko order mein lagata hai, jo missing ho use server se dobara maangta hai, aur ACKs wapas bhejta hai. Result encrypted TLS bytes ki ordered stream hoti hai, jo browser ko di jaati hai."
    ),
    icons: ["📶", "🏷️", "🧩", "🌐"],
    items: [b("Frame\nMAC checked, removed"), b("IP packet\nIP checked, removed"), b("TCP segments\nReordered"), b("Browser\nGets TLS bytes")],
    analogy: b(
      "You open the outer box, then the inner package, and arrange the numbered pages in order.",
      "Aap bahar ka box kholte ho, phir andar ka package, aur numbered pages ko order mein lagate ho."
    ),
    remember: b("Your device reverses the same layers the server added.", "Aapka device wahi layers ulta kholta hai jo server ne lagayi thi."),
    terms: [
      ["Reassembly", b("Putting received segments back into the original order.", "Mile hue segments ko original order mein dobara lagana.")],
      ["Retransmission", b("Sending a lost piece again.", "Kho gaye piece ko dobara bhejna.")],
    ],
    fields: [["Frame", "Destination MAC is your card"], ["IP packet", "Destination IP is your device"], ["TCP", "Port 52814 maps to your browser's connection"], ["Lost data", "Missing segments are sent again"]],
  },
  {
    id: "client-decrypts", phase: b("18 · Browser checks response", "18 · Browser response check karta hai"), node: 0, direction: "response", layer: "app", layerMode: "unwrap",
    packet: "HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 32\n\n{\"name\":\"Asha\",\"plan\":\"Student\"}",
    title: b("18. TLS is removed and the browser checks the response", "18. TLS hatta kar browser response check karta hai"),
    plain: b(
      "The browser decrypts the data, reads the status and headers, and applies its safety rules.",
      "Browser data decrypt karta hai, status aur headers padhta hai, aur apne safety rules apply karta hai."
    ),
    why: b(
      "A server answer is not automatically handed to your code. The browser checks it first to protect the user.",
      "Server ka jawab apne aap aapke code ko nahi diya jaata. Browser user ki suraksha ke liye pehle use check karta hai."
    ),
    detail: b(
      "The browser decrypts the TLS records and checks that nothing was changed. It then reads the status line and headers and applies browser rules: CORS (does Access-Control-Allow-Origin allow this website to read the result?), caching headers (may the response be stored?), and Set-Cookie (should a cookie be saved?). If the rules allow it, the response is given to fetch(). If CORS blocks it, your JavaScript gets an error even though the server answered correctly.",
      "Browser TLS records decrypt karta hai aur check karta hai ki kuch badla toh nahi. Phir status line aur headers padhta hai aur browser rules apply karta hai: CORS (kya Access-Control-Allow-Origin is website ko result padhne deta hai?), caching headers (kya response store ho sakta hai?), aur Set-Cookie (kya cookie save karni hai?). Rules allow karein toh response fetch() ko diya jaata hai. CORS block kar de toh server ne sahi jawab diya hone par bhi aapke JavaScript ko error milta hai."
    ),
    icons: ["🔓", "🧾", "🛡️", "⚛️"],
    items: [b("Decrypt TLS\nVerify integrity"), b("Read headers\nStatus + type"), b("Browser rules\nCORS / cache / cookies"), b("fetch()\nGets the response")],
    analogy: b(
      "You open the reply letter and check the note on top to see if you are allowed to show it to others.",
      "Aap reply letter kholte ho aur upar ka note dekhte ho ki kya use doosron ko dikhane ki ijaazat hai."
    ),
    remember: b("A correct server reply can still be blocked by browser rules like CORS.", "Server ka sahi reply bhi CORS jaise browser rules se block ho sakta hai."),
    terms: [
      ["Access-Control-Allow-Origin", b("A response header that says which websites may read the answer.", "Response header jo batata hai kaun si websites jawab padh sakti hain.")],
      ["Cache-Control", b("A header that says if and how long a response can be saved.", "Header jo batata hai response save ho sakta hai ya nahi, aur kab tak.")],
    ],
    fields: [["Status", "200 OK"], ["CORS", "Is this website allowed to read the data?"], ["Cache", "May the browser store this response?"], ["Cookies", "Save any Set-Cookie values"]],
  },
  {
    id: "page-updates", phase: b("19 · Page updates", "19 · Page update hota hai"), node: 0, direction: "response", layer: "app", layerMode: "unwrap",
    packet: "const res = await fetch(url);\nif (!res.ok) throw new Error(res.status);\nconst data = await res.json();\n// data = { name: \"Asha\", plan: \"Student\" }",
    title: b("19. fetch() finishes and your page updates", "19. fetch() poora hota hai aur page update hota hai"),
    plain: b(
      "Your code reads the JSON, stores it in state, and the screen shows the new data.",
      "Aapka code JSON padhta hai, use state mein rakhta hai, aur screen par naya data dikhta hai."
    ),
    why: b(
      "This is the goal of the whole trip: your app gets data it can show to the user.",
      "Poore safar ka maqsad yahi hai: aapki app ko aisa data mile jo woh user ko dikha sake."
    ),
    detail: b(
      "fetch() returns a Promise. It resolves as soon as the status line and headers arrive, even for 404 or 500, so your code should check response.ok. Then response.json() reads the body and turns the JSON text into a JavaScript object. Your app puts that data into state and the page re-renders. The connection usually stays open (keep-alive, or HTTP/2 multiplexing), so the next request can skip the TCP and TLS setup, and the DNS answer may still be cached. The connection is closed later, when it is idle or when one side sends a TCP FIN. Only a real network failure makes fetch() reject.",
      "fetch() ek Promise return karta hai. Woh status line aur headers aate hi resolve ho jaata hai, 404 ya 500 par bhi, isliye aapke code ko response.ok check karna chahiye. Phir response.json() body padhta hai aur JSON text ko JavaScript object mein badalta hai. Aapki app wo data state mein rakhti hai aur page dobara render hota hai. Connection aam taur par khula rehta hai (keep-alive, ya HTTP/2 multiplexing), isliye agli request TCP aur TLS setup skip kar sakti hai, aur DNS answer bhi cache mein ho sakta hai. Connection baad mein band hota hai, jab woh idle ho ya koi side TCP FIN bheje. Sirf asli network failure par fetch() reject hota hai."
    ),
    icons: ["⏳", "🧮", "🖼️", "♻️"],
    items: [b("Promise\nResolves"), b("response.json()\nText → object"), b("UI updates\nNew data shown"), b("Connection\nKept for reuse")],
    analogy: b(
      "The parcel arrives, you open it and use what is inside, and the courier keeps your address on file for next time.",
      "Parcel aata hai, aap use kholkar andar ki cheez use karte ho, aur courier agli baar ke liye aapka address yaad rakhta hai."
    ),
    remember: b("fetch() resolves even for 404 or 500, so always check res.ok.", "fetch() 404 ya 500 par bhi resolve hota hai, isliye hamesha res.ok check karo."),
    terms: [
      ["Promise", b("An object that stands for a result that will arrive later.", "Object jo aise result ko represent karta hai jo baad mein aayega.")],
      ["res.ok", b("true when the status is between 200 and 299.", "true jab status 200 se 299 ke beech ho.")],
      ["Keep-alive", b("Keeping a connection open to reuse it for later requests.", "Connection ko khula rakhna taaki baad ki requests use reuse kar sakein.")],
    ],
    fields: [["res.ok", "true for status 200 to 299"], ["res.json()", "Reads the body as JSON"], ["Keep-alive", "Connection can carry the next request"], ["Network failure", "The only case where fetch() rejects"]],
  },
];

export const HTTP_Request_Response = {
  heroTitle: "Learn how computers & software actually work",
};
