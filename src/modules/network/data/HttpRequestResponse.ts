// // ALL lesson data lives in this one file. Put it in ../data/HttpRequestResponse.ts (replace the old one).

// export type Bi = { en: string; hi: string };
// const b = (en: string, hi: string = en): Bi => ({ en, hi });

// export const HTTP_UI = {
//   en: {
//     lessonTitle: "HTTP Request & Response",
//     requestJourney: "Journey",
//     known: "Known so far",
//     domain: "Domain",
//     protocol: "Protocol",
//     source: "From",
//     destination: "To",
//     tabAnalogy: "Real life",
//     tabWords: "Key words",
//     tabLayers: "Wrapping",
//     tabDetails: "Details",
//     diagramLabel: "Picture it",
//     dataLabel: "Moving now",
//     readMore: "Read more",
//     layerData: "Message (HTTP)",
//     layerTls: "TLS record",
//     layerSegment: "TCP segment",
//     layerPacket: "IP packet",
//     layerFrame: "Link frame",
//     physicalNote: "The frame travels as electric, radio or light signals.",
//     layersHint: "Each layer wraps the one inside it. Handshake and data packets are wrapped the same way.",
//   },
//   hi: {
//     lessonTitle: "HTTP Request & Response",
//     requestJourney: "Safar",
//     known: "Ab tak pata hai",
//     domain: "Domain",
//     protocol: "Protocol",
//     source: "Kaha se",
//     destination: "Kaha tak",
//     tabAnalogy: "Real life",
//     tabWords: "Zaroori words",
//     tabLayers: "Wrapping",
//     tabDetails: "Details",
//     diagramLabel: "Visual samjho",
//     dataLabel: "Abhi move ho raha hai",
//     readMore: "Aur padho",
//     layerData: "Message (HTTP)",
//     layerTls: "TLS record",
//     layerSegment: "TCP segment",
//     layerPacket: "IP packet",
//     layerFrame: "Link frame",
//     physicalNote: "Frame electric, radio ya light signals se travel karta hai.",
//     layersHint: "Har layer andar wali ko wrap karti hai. Handshake aur data packets ek jaise wrap hote hain.",
//   },
// } as const;

// export const NODES = [
//   { icon: "💻", en: { title: "Browser", sub: "Your device" }, hi: { title: "Browser", sub: "Aapka device" } },
//   { icon: "🌐", en: { title: "Network", sub: "The road" }, hi: { title: "Network", sub: "Raasta" } },
//   { icon: "🗄️", en: { title: "Server", sub: "The answerer" }, hi: { title: "Server", sub: "Jawab dene wala" } },
// ];

// export type Layer = "app" | "tls" | "transport" | "network" | "datalink" | "physical" | "none";
// export const LAYER_RANK: Record<Layer, number> = {
//   none: 0, app: 1, tls: 2, transport: 3, network: 4, datalink: 5, physical: 5,
// };

// export interface ConnectionReveal {
//   domain?: string;
//   protocol?: string;
//   sourceIp?: string;
//   sourcePort?: string;
//   destIp?: string;
//   destPort?: string;
// }

// export interface HttpStep {
//   id: string;
//   phase: string;
//   node: 0 | 1 | 2;
//   layer: Layer;
//   packet: string;
//   reveal?: ConnectionReveal;
//   title: Bi;
//   plain: Bi; // one-sentence version, shown big
//   detail: Bi; // longer explanation, always shown in Details
//   icons: string[]; // one emoji per item
//   items: Bi[]; // diagram boxes: first line = title, next line = small text
//   analogy: Bi;
//   remember: Bi;
//   terms: [string, Bi][]; // key words
//   fields?: [string, string][]; // "look inside" rows
// }

// export const HTTP_STEPS: HttpStep[] = [
//   {
//     id: "scenario", phase: "1 · Meet the sides", node: 0, layer: "none",
//     packet: "Browser → https://api.example.com/profile → Server",
//     reveal: { domain: "api.example.com", protocol: "HTTPS" },
//     title: b("Meet the two sides", "Dono sides ko jaano"),
//     plain: b("A website is a conversation: your browser asks, a far-away computer answers.", "Website ek baatcheet hai: browser poochta hai, door ka computer jawab deta hai."),
//     detail: b(
//       "Your React app runs in the browser (the client). It needs a profile from a Node.js app on a cloud server. We follow one request to https://api.example.com/profile. This is an example address, not a real server.",
//       "Aapki React app browser (client) mein chalti hai. Use cloud server ki Node.js app se profile chahiye. Hum https://api.example.com/profile request follow karenge. Yeh example address hai, real server nahi."
//     ),
//     icons: ["💻", "🌍", "🗄️"],
//     items: [b("Your laptop\nReact app", "Aapka laptop\nReact app"), b("Internet\nThe route", "Internet\nRaasta"), b("Cloud server\nNode.js app")],
//     analogy: b("Like posting a letter from home to an office in another city.", "Ghar se doosre shehar ke office ko letter bhejne jaisa."),
//     remember: b("Client asks. Server answers.", "Client maangta hai. Server jawab deta hai."),
//     terms: [["Client", b("The one who asks.", "Jo maangta hai.")], ["Server", b("The one who answers.", "Jo jawab deta hai.")]],
//   },
//   {
//     id: "fetch-call", phase: "2 · Ask", node: 0, layer: "app",
//     packet: 'fetch("https://api.example.com/profile")',
//     title: b("Your app asks for data", "App data maangti hai"),
//     plain: b("One line of code says: \"go get me this data.\"", "Code ki ek line bolti hai: \"yeh data laao.\""),
//     detail: b(
//       "fetch(\"https://api.example.com/profile\") tells the browser the page wants data from that URL. The browser prepares the request and handles the networking. You never write code for each router or cable.",
//       "fetch(\"https://api.example.com/profile\") browser ko batata hai ki page ko is URL se data chahiye. Browser request banata hai aur networking sambhalta hai. Har router ya cable ka code nahi likhna padta."
//     ),
//     icons: ["⚛️", "📞", "📨"],
//     items: [b("React page"), b("fetch(url)"), b("Profile request")],
//     analogy: b("Telling a delivery service: \"Please bring me this package.\"", "Delivery service ko bolna: \"Yeh package laao.\""),
//     remember: b("fetch() only starts the journey.", "fetch() sirf safar shuru karta hai."),
//     terms: [["URL", b("A full web address.", "Poora web address.")], ["API", b("A menu of things a server will do.", "Server ke kaamon ki menu.")]],
//   },
//   {
//     id: "url-parts", phase: "3 · Read address", node: 0, layer: "app",
//     packet: "https://api.example.com:443/profile",
//     title: b("The browser reads the URL", "Browser URL padhta hai"),
//     plain: b("A URL has 4 parts: how to talk, who to talk to, which door, what to ask for.", "URL ke 4 parts: kaise baat, kis se, kaunsa darwaza, kya maangna."),
//     detail: b(
//       "https means the connection is protected with TLS. api.example.com is the domain name. HTTPS normally uses port 443. /profile is the path the app wants.",
//       "https ka matlab TLS se protected connection. api.example.com domain name hai. HTTPS normally port 443 use karta hai. /profile woh path hai jo app maangti hai."
//     ),
//     icons: ["🔒", "🏷️", "🚪", "📄"],
//     items: [b("https://\nHow"), b("api.example.com\nWho"), b(":443\nWhich door"), b("/profile\nWhat")],
//     analogy: b("Like an address: city, building, room number.", "Address jaisa: city, building, room number."),
//     remember: b("Domain = name · Port = door · Path = item.", "Domain = naam · Port = darwaza · Path = cheez."),
//     terms: [["Domain", b("A human-friendly name.", "Insaan ke liye aasaan naam.")], ["Port", b("A numbered door on a computer.", "Computer ka numbered darwaza.")]],
//     fields: [["https", "Secure web protocol"], ["api.example.com", "Domain / server name"], ["443", "Default HTTPS port"], ["/profile", "Requested path"]],
//   },
//   {
//     id: "browser-checks", phase: "4 · Browser checks", node: 0, layer: "none",
//     packet: "Cache? HTTPS rule? Cross-origin? → maybe an OPTIONS preflight",
//     title: b("The browser checks the rules first", "Browser pehle rules check karta hai"),
//     plain: b("Before going out, the browser checks its cache and its safety rules.", "Bahar jaane se pehle browser cache aur safety rules check karta hai."),
//     detail: b(
//       "The browser may already have a saved answer (cache), or know that this site must use HTTPS (HSTS). Your React app runs on localhost:3000 but the API is on api.example.com, so this is a cross-origin request. If your code adds an Authorization header, the browser first sends a small OPTIONS preflight to ask the server for permission. A missing permission is the famous \"CORS error\".",
//       "Browser ke paas saved answer (cache) ho sakta hai, ya pata ho sakta hai ki site HTTPS hi use karegi (HSTS). Aapki React app localhost:3000 par hai aur API api.example.com par, isliye yeh cross-origin request hai. Code Authorization header lagaye toh browser pehle chhota OPTIONS preflight bhejkar server se permission poochta hai. Permission na mile toh famous \"CORS error\" aata hai."
//     ),
//     icons: ["🗃️", "🛡️", "🛂"],
//     items: [b("Cache\nSaved answer?"), b("HTTPS rule\nHSTS"), b("CORS\nAllowed origin?")],
//     analogy: b("A guard checks your pass before you leave the building.", "Guard building se nikalne se pehle pass check karta hai."),
//     remember: b("CORS is enforced by the browser, not by the network.", "CORS browser enforce karta hai, network nahi."),
//     terms: [["CORS", b("Rules about which sites may read a server's data.", "Rules ki kaunsi sites server ka data padh sakti hain.")], ["Preflight", b("A permission-check sent before the real request.", "Asli request se pehle bheja permission-check.")]],
//   },
//   {
//     id: "dns", phase: "5 · Find server", node: 1, layer: "none",
//     packet: "api.example.com → 203.0.113.10 (example IP)",
//     reveal: { destIp: "203.0.113.10" },
//     title: b("Find the server's IP address", "Server ka IP dhoondo"),
//     plain: b("Computers can't use names. DNS turns a name into a number.", "Computers naam nahi samajhte. DNS naam ko number banata hai."),
//     detail: b(
//       "Computers route traffic with IP addresses; people prefer names. DNS is the internet's phone book. The browser or OS may already have the answer cached, so a fresh lookup isn't always needed. The IP shown is a documentation example.",
//       "Computers IP se traffic route karte hain; log naam yaad rakhte hain. DNS internet ki phone book hai. Browser ya OS ke cache mein answer ho sakta hai, isliye har baar naya lookup nahi hota. Yeh IP sirf example hai."
//     ),
//     icons: ["🏷️", "📒", "🔢"],
//     items: [b("Name\napi.example.com"), b("DNS lookup"), b("IP address\n203.0.113.10")],
//     analogy: b("Searching a name in your contacts to get the phone number.", "Contacts mein naam search karke number nikalna."),
//     remember: b("DNS: name → IP.", "DNS: naam → IP."),
//     terms: [["DNS", b("The internet's phone book.", "Internet ki phone book.")], ["IP address", b("A device's number on a network.", "Network par device ka number.")]],
//   },
//   {
//     id: "gather-criteria", phase: "6 · Addresses", node: 0, layer: "none",
//     packet: "Client (temporary port) → Server IP : 443",
//     reveal: { destPort: "443" },
//     title: b("Prepare 'from' and 'to'", "'Kaha se' aur 'kaha tak' ready karo"),
//     plain: b("Like a parcel, the connection needs a sender and a receiver, each with IP + port.", "Parcel ki tarah sender aur receiver chahiye, dono ke IP + port."),
//     detail: b(
//       "The destination is the server IP with port 443. Your OS supplies a source IP and usually picks a temporary source port. React's localhost:3000 is not the source port of this API request.",
//       "Destination server IP + port 443 hai. OS source IP deta hai aur usually temporary source port chunta hai. React ka localhost:3000 is API request ka source port nahi hota."
//     ),
//     icons: ["💻", "🗄️"],
//     items: [b("Your device\nIP + temporary port", "Aapka device\nIP + temporary port"), b("Server\nIP + port 443")],
//     analogy: b("A return address and a delivery address on a parcel.", "Parcel par sender aur receiver ka address."),
//     remember: b("Dev-server port ≠ network source port.", "Dev-server port ≠ network source port."),
//     terms: [["Source", b("Where data starts.", "Jaha data shuru hota hai.")], ["Destination", b("Where data must arrive.", "Jaha data pahunchna hai.")]],
//     fields: [["Client IP", "Your device's IP"], ["Client port", "Temporary port"], ["Server IP", "Found via DNS"], ["Server port", "443 for HTTPS"]],
//   },
//   {
//     id: "mac-arp", phase: "7 · Local address", node: 1, layer: "datalink",
//     packet: "ARP: \"Who has my gateway's IP?\" → gateway MAC",
//     title: b("Find the next device's MAC", "Agle device ka MAC dhoondo"),
//     plain: b("At home, delivery uses hardware names (MAC). ARP asks \"who owns this IP?\"", "Ghar mein delivery hardware naam (MAC) se hoti hai. ARP poochta hai \"yeh IP kiska?\""),
//     detail: b(
//       "This happens before your first packet leaves (the answer is often already cached). To send a frame on Wi-Fi or Ethernet you need the next device's MAC. For an outside server, that device is usually your default gateway (router). On IPv4, ARP asks which MAC owns the gateway's IP. IPv6 uses Neighbor Discovery instead.",
//       "Yeh pehla packet nikalne se pehle hota hai (answer aksar cache mein hota hai). Wi-Fi ya Ethernet par frame bhejne ke liye agle device ka MAC chahiye. Bahar ke server ke liye woh usually default gateway (router) hota hai. IPv4 mein ARP gateway IP ka MAC poochta hai. IPv6 mein Neighbor Discovery hota hai."
//     ),
//     icons: ["🏠", "🔔", "📡"],
//     items: [b("Laptop knows\nGateway IP", "Laptop ko pata\nGateway IP"), b("ARP asks\n\"Who has it?\"", "ARP poochta\n\"Kiska hai?\""), b("Router replies\nIts MAC", "Router batata\nApna MAC")],
//     analogy: b("You know the house number, ask which doorbell is theirs.", "Ghar ka number pata hai, doorbell poochte ho."),
//     remember: b("ARP finds a MAC for a local IPv4 address.", "ARP local IPv4 ka MAC dhoondhta hai."),
//     terms: [["MAC address", b("A hardware ID on a network card.", "Network card ka hardware ID.")], ["Gateway", b("Your router, the exit door.", "Aapka router, bahar ka darwaza.")]],
//     fields: [["ARP knows", "Local IPv4 address"], ["ARP finds", "That device's MAC"], ["Usual target", "Default gateway"]],
//   },
//   {
//     id: "tcp-handshake", phase: "8 · Connect", node: 1, layer: "transport",
//     packet: "SYN → SYN + ACK → ACK",
//     title: b("TCP says hello first", "TCP pehle hello bolta hai"),
//     plain: b("Before sending data, both computers say hello 3 times to check the line.", "Data se pehle dono computers 3 baar hello bolte hain."),
//     detail: b(
//       "Every message below is itself wrapped in an IP packet and a frame. A new TCP connection starts with a three-way handshake: SYN starts, SYN-ACK replies, ACK finishes. TCP then delivers data reliably and in order. If a suitable connection is already open, the browser reuses it.",
//       "Neeche ka har message bhi IP packet aur frame mein wrap hota hai. Naya TCP connection three-way handshake se shuru hota hai: SYN shuru, SYN-ACK reply, ACK complete. Phir TCP data reliable aur order mein deta hai. Connection open ho toh browser reuse karta hai."
//     ),
//     icons: ["👋", "🤝", "✅"],
//     items: [b("1 · SYN\n\"Can we connect?\"", "1 · SYN\n\"Connect karein?\""), b("2 · SYN-ACK\n\"Yes, I hear you\"", "2 · SYN-ACK\n\"Haan, sun liya\""), b("3 · ACK\n\"Great, ready\"", "3 · ACK\n\"Theek, ready\"")],
//     analogy: b("\"Can you hear me?\" → \"Yes, can you?\" → \"Yes.\"", "\"Awaaz aa rahi?\" → \"Haan, tumhari?\" → \"Haan.\""),
//     remember: b("TCP = reliable, ordered delivery.", "TCP = reliable, ordered delivery."),
//     terms: [["TCP", b("Rules for reliable delivery.", "Reliable delivery ke rules.")], ["Handshake", b("A short greeting to start.", "Shuru karne ka greeting.")]],
//   },
//   {
//     id: "tls-handshake", phase: "9 · Protect", node: 1, layer: "tls",
//     packet: "TLS handshake → certificate check + secret keys",
//     title: b("TLS makes HTTPS private", "TLS HTTPS ko private banata hai"),
//     plain: b("The server shows an ID card; if it's valid, both agree on a secret code.", "Server ID card dikhata hai; sahi ho toh dono secret code agree karte hain."),
//     detail: b(
//       "The browser and server negotiate security settings and keys. The server sends a certificate; the browser checks it is trusted, valid and matches the domain. After setup, application data is encrypted.",
//       "Browser aur server security settings aur keys agree karte hain. Server certificate bhejta hai; browser check karta hai ki trusted, valid aur domain se match hai. Setup ke baad data encrypt hota hai."
//     ),
//     icons: ["🔐", "📜", "🗝️"],
//     items: [b("Browser\n\"Let's secure this\"", "Browser\n\"Secure karein\""), b("Server\nCertificate"), b("Both sides\nSecret keys", "Dono sides\nSecret keys")],
//     analogy: b("Checking someone's ID before sharing a private note.", "Private note dene se pehle ID check karna."),
//     remember: b("TLS protects data; the certificate proves identity.", "TLS data protect karta hai; certificate identity prove karta hai."),
//     terms: [["TLS", b("Makes HTTPS private.", "HTTPS ko private banata hai.")], ["Certificate", b("A server's digital ID card.", "Server ka digital ID card.")]],
//   },
//   {
//     id: "build-request", phase: "10 · Write message", node: 0, layer: "app",
//     packet: "GET /profile · Host: api.example.com · headers",
//     title: b("Build the HTTP request", "HTTP request banao"),
//     plain: b("The browser fills a small form: action, item, and extra notes.", "Browser chhota form bharta hai: action, cheez, extra notes."),
//     detail: b(
//       "The message has a method (GET = read), a path (/profile) and headers with extra details. An app may add an Authorization token; cookies are sent only when allowed. A GET usually has no body. None of this is an IP or MAC address.",
//       "Message mein method (GET = padho), path (/profile) aur extra headers hote hain. App Authorization token laga sakti hai; cookies tabhi jaati hain jab allowed ho. GET mein aksar body nahi hoti. Yeh IP ya MAC nahi hai."
//     ),
//     icons: ["🏷️", "📄", "🧾"],
//     items: [b("Method\nGET"), b("Path\n/profile"), b("Headers\nExtra details")],
//     analogy: b("A form: request type, item name, optional notes.", "Form: request type, item naam, optional notes."),
//     remember: b("HTTP says what the client wants done.", "HTTP batata hai client kya karwana chahta hai."),
//     terms: [["Method", b("The action: GET = read.", "Action: GET = padho.")], ["Header", b("Extra info on a message.", "Message ki extra jankari.")]],
//     fields: [["Method", "GET, ask to read data"], ["Path", "/profile"], ["Headers", "Extra request info"], ["Authorization", "Bearer token, if app adds it"]],
//   },
//   {
//     id: "bytes", phase: "11 · Make bytes", node: 0, layer: "tls",
//     packet: "HTTP message → bytes → (TLS encrypts)",
//     title: b("The message becomes bytes", "Message bytes banta hai"),
//     plain: b("Computers only understand 1s and 0s, so text becomes bytes, then gets locked.", "Computers sirf 1 aur 0 samajhte hain, isliye text bytes banta hai, phir lock hota hai."),
//     detail: b(
//       "The browser serializes the request into bytes (groups of 8 bits). For HTTPS, TLS then encrypts them into TLS records, and TCP carries those records. Turning text into bytes and encrypting are two different ideas.",
//       "Browser request ko bytes (8 bits ke groups) mein badalta hai. HTTPS mein TLS unhe encrypt karke TLS records banata hai, jinhe TCP carry karta hai. Bytes banana aur encrypt karna alag concepts hain."
//     ),
//     icons: ["📝", "🔢", "🔒"],
//     items: [b("Readable\nGET /profile"), b("Bytes\n0101…"), b("Encrypted\nTLS data")],
//     analogy: b("Writing a note, then sealing it in a locked box.", "Note likhna, phir locked box mein rakhna."),
//     remember: b("Bytes = form. Encryption = protection.", "Bytes = form. Encryption = protection."),
//     terms: [["Byte", b("8 bits of data.", "Data ke 8 bits.")], ["Encryption", b("Scrambling so only the receiver can read.", "Scramble karna taaki sirf receiver padh sake.")]],
//   },
//   {
//     id: "handoff-os", phase: "12 · Hand off", node: 0, layer: "none",
//     packet: "Browser → Operating system → Network card",
//     title: b("The browser hands work to the OS", "Browser kaam OS ko deta hai"),
//     plain: b("The browser writes the letter; the OS and network card send it out.", "Browser letter likhta hai; OS aur network card bhejte hain."),
//     detail: b(
//       "The browser's networking code works with the OS network stack. The OS and network interface put data on Wi-Fi or Ethernet. The exact split varies by browser and platform.",
//       "Browser ka networking code OS ke network stack ke saath kaam karta hai. OS aur network interface data Wi-Fi ya Ethernet par bhejte hain. Exact division platform par depend karta hai."
//     ),
//     icons: ["🌐", "⚙️", "📶"],
//     items: [b("Browser\nHTTP request"), b("OS\nTCP/IP"), b("Network card\nWi-Fi / Ethernet")],
//     analogy: b("You write a letter, the post office delivers it.", "Aap letter likhte ho, post office deliver karta hai."),
//     remember: b("The browser doesn't control the Wi-Fi radio.", "Browser Wi-Fi radio control nahi karta."),
//     terms: [["OS", b("Windows, macOS, Linux, Android…")], ["Network card", b("Hardware that sends signals.", "Signals bhejne wala hardware.")]],
//   },
//   {
//     id: "chunking", phase: "13 · Split", node: 1, layer: "transport",
//     packet: "Byte stream → TCP segments",
//     title: b("Big data travels in pieces", "Bada data tukdon mein jaata hai"),
//     plain: b("Big data is cut into small pieces and rebuilt at the other end.", "Bade data ke chhote tukde bante hain aur doosri taraf jud jaate hain."),
//     detail: b(
//       "A long response, like a photo, is carried in many TCP segments. MSS is the biggest TCP payload in a segment; MTU is the biggest packet a link can carry. A small request may fit in one segment.",
//       "Bada response, jaise photo, kai TCP segments mein jaata hai. MSS segment ka max TCP payload hai; MTU link ka max packet size. Chhoti request ek segment mein aa jaati hai."
//     ),
//     icons: ["📚", "🧩", "✅"],
//     items: [b("Big data", "Bada data"), b("Piece 1 · 2 · 3", "Tukda 1 · 2 · 3"), b("Rebuilt at receiver", "Receiver par jud gaya")],
//     analogy: b("Sending a big book as several parcels.", "Badi book ko kai parcels mein bhejna."),
//     remember: b("MSS = TCP payload limit · MTU = link limit.", "MSS = TCP payload limit · MTU = link limit."),
//     terms: [["Segment", b("One piece of TCP data.", "TCP data ka ek tukda.")], ["MTU", b("Biggest packet a link carries.", "Link ka sabse bada packet.")]],
//   },
//   {
//     id: "tcp-segment", phase: "14 · Label pieces", node: 1, layer: "transport",
//     packet: "TCP header + data = TCP segment",
//     title: b("TCP adds ports and numbers", "TCP ports aur numbers lagata hai"),
//     plain: b("TCP sticks a label on each piece: which door, and which number in order.", "TCP har tukde par label lagata hai: kaunsa darwaza, kaunsa number."),
//     detail: b(
//       "The TCP header holds source and destination ports and a sequence number. Sequence numbers let the receiver put bytes in order and spot missing ones. Flags like SYN and ACK control the connection; normal data segments don't all carry SYN.",
//       "TCP header mein source/destination ports aur sequence number hota hai. Sequence number se receiver bytes ko order mein jodta hai aur missing bytes pakadta hai. SYN/ACK flags connection control karte hain; har data segment mein SYN nahi hota."
//     ),
//     icons: ["🏷️", "📄", "📦"],
//     items: [b("TCP header\nPorts + order"), b("Data\nBytes"), b("TCP segment")],
//     analogy: b("A parcel label with door number and tracking number.", "Parcel label: darwaza aur tracking number."),
//     remember: b("Ports find the app; sequence numbers keep order.", "Ports app dhoondhte hain; sequence numbers order rakhte hain."),
//     terms: [["Header", b("The label in front of data.", "Data ke aage ka label.")], ["Sequence no.", b("Tells the correct order.", "Sahi order batata hai.")]],
//     fields: [["Source port", "Temporary client port"], ["Destination port", "443"], ["Sequence number", "Byte position"], ["Flags", "Connection control (ACK…)"]],
//   },
//   {
//     id: "ip-packet", phase: "15 · Add addresses", node: 1, layer: "network",
//     packet: "IP header (source IP + destination IP) + TCP segment",
//     title: b("IP adds the destination address", "IP destination address lagata hai"),
//     plain: b("IP adds the big shipping address so routers know where to send it.", "IP bada shipping address lagata hai taaki routers ko pata ho."),
//     detail: b(
//       "The IP layer wraps the TCP segment in an IP packet with source and destination IPs. Routers read the destination IP to choose the next direction. IP moves packets between networks; ports pick the application.",
//       "IP layer TCP segment ko IP packet mein wrap karti hai, source/destination IP ke saath. Routers destination IP dekhkar agli direction chunte hain. IP networks ke beech le jaata hai; ports application chunte hain."
//     ),
//     icons: ["🧭", "📦", "✉️"],
//     items: [b("IP header\nFrom IP → To IP"), b("Inside\nTCP segment", "Andar\nTCP segment"), b("IP packet")],
//     analogy: b("The outer address says which city the parcel goes to.", "Bahar ka address batata hai parcel kis city jayega."),
//     remember: b("IP = between networks · Port = which app.", "IP = networks ke beech · Port = kaunsi app."),
//     terms: [["IP packet", b("TCP segment + IP addresses.", "TCP segment + IP addresses.")], ["Router", b("Forwards packets between networks.", "Networks ke beech packets forward karta hai.")]],
//     fields: [["Source IP", "Your current IP"], ["Destination IP", "Server IP from DNS"]],
//   },
//   {
//     id: "frame", phase: "16 · Wrap for link", node: 1, layer: "datalink",
//     packet: "Frame: [MAC header] [IP packet] [check]",
//     title: b("Wrap the packet in a frame", "Packet ko frame mein wrap karo"),
//     plain: b("The packet goes into a local delivery bag with the next stop's MAC.", "Packet local delivery bag mein jaata hai, agle stop ke MAC ke saath."),
//     detail: b(
//       "The link layer puts the IP packet inside a frame with source and destination MACs. At home the destination MAC is usually your router's, not the far server's. Wi-Fi and Ethernet frames differ, but both carry the packet.",
//       "Link layer IP packet ko frame mein rakhti hai, source/destination MAC ke saath. Ghar mein destination MAC usually router ka hota hai, door ke server ka nahi. Wi-Fi aur Ethernet frames alag hain par dono packet carry karte hain."
//     ),
//     icons: ["🧾", "✉️", "🧰"],
//     items: [b("Local header\nMAC → next-hop MAC"), b("Inside\nIP packet", "Andar\nIP packet"), b("Link frame")],
//     analogy: b("Putting a parcel in a courier bag for the next stop.", "Parcel ko next stop ke liye courier bag mein rakhna."),
//     remember: b("The IP packet rides inside a frame.", "IP packet frame ke andar chalta hai."),
//     terms: [["Frame", b("The wrapper for one local link.", "Ek local link ka wrapper.")], ["Next hop", b("The next device on the path.", "Raaste ka agla device.")]],
//   },
//   {
//     id: "signal", phase: "17 · Signal", node: 1, layer: "physical",
//     packet: "Frame bits → radio / electrical / light signal",
//     title: b("The frame becomes a signal", "Frame signal ban jaata hai"),
//     plain: b("The bits leave your device as radio waves, electricity or light.", "Bits aapke device se radio waves, bijli ya light ban kar nikalte hain."),
//     detail: b(
//       "Wi-Fi uses radio waves, Ethernet uses electrical pulses and fiber uses light. This physical layer only moves bits; it does not understand addresses. The next device turns the signal back into a frame.",
//       "Wi-Fi radio waves, Ethernet electrical pulses aur fiber light use karta hai. Physical layer sirf bits move karti hai; addresses nahi samajhti. Agla device signal ko wapas frame bana leta hai."
//     ),
//     icons: ["📶", "⚡", "💡"],
//     items: [b("Wi-Fi\nRadio waves"), b("Ethernet\nElectric pulses"), b("Fiber\nLight")],
//     analogy: b("The same words can travel by voice, phone line or a flash of light.", "Same words awaaz, phone line ya light flash se ja sakte hain."),
//     remember: b("The physical layer moves raw bits.", "Physical layer raw bits move karti hai."),
//     terms: [["Bit", b("A single 0 or 1.", "Ek 0 ya 1.")], ["Fiber", b("A glass cable that carries light.", "Glass cable jo light carry karta hai.")]],
//   },
//   {
//     id: "routing", phase: "18 · Travel", node: 1, layer: "network",
//     packet: "Your device → router → ISP routers → server network",
//     title: b("Routers pass it along", "Routers aage bhejte hain"),
//     plain: b("Routers pass the packet like a relay race, each picking the next step.", "Routers packet ko relay race ki tarah pass karte hain."),
//     detail: b(
//       "Your device sends a frame to the router. The router removes the frame, reads the destination IP and forwards the packet to the next network. Every hop makes a new frame with new MACs; your home router usually swaps your private IP for its public IP (NAT), while the destination IP stays the same.",
//       "Device frame router ko bhejta hai. Router frame hatata hai, destination IP padhta hai aur packet agle network ko bhejta hai. Har hop par naya frame aur naye MAC; aapka home router aksar private IP ko public IP se badalta hai (NAT), destination IP same rehta hai."
//     ),
//     icons: ["💻", "🏠", "🛰️", "🗄️"],
//     items: [b("Your laptop", "Aapka laptop"), b("Home router"), b("More routers", "Aur routers"), b("Server network")],
//     analogy: b("A parcel changes vehicles at sorting centers, same final address.", "Parcel sorting centers par vehicle badalta hai, address wahi."),
//     remember: b("MAC = local link · IP = whole trip.", "MAC = local link · IP = poora safar."),
//     terms: [["Hop", b("One jump between routers.", "Routers ke beech ek jump.")], ["NAT", b("Router swaps private IP for public IP.", "Router private IP ko public IP se badalta hai.")]],
//   },
//   {
//     id: "server-response", phase: "19 · Server unwraps", node: 2, layer: "none",
//     packet: "Request arrives → app processes → HTTP response",
//     title: b("The server unwraps the request", "Server request kholta hai"),
//     plain: b("The server unwraps every layer in reverse until it can read your question.", "Server layers ulte order mein kholta hai jab tak sawaal na padh le."),
//     detail: b(
//       "The network layers process the frame and packet, TCP reassembles the byte stream and TLS decrypts it. Then the Node.js app reads the HTTP request and does its work, for example looking up the profile in a database.",
//       "Network layers frame aur packet process karti hain, TCP byte stream jodta hai, TLS decrypt karta hai. Phir Node.js app HTTP request padhti hai aur kaam karti hai, jaise database se profile dhoondhna."
//     ),
//     icons: ["🧰", "✉️", "📦", "🔓", "📄"],
//     items: [b("Frame"), b("IP packet"), b("TCP data"), b("TLS decrypts", "TLS decrypt"), b("HTTP request")],
//     analogy: b("Opening the bag, parcel and wrapping to read the note.", "Bag, parcel aur wrapping kholkar note padhna."),
//     remember: b("The app sees HTTP only after lower layers finish.", "Lower layers ke baad hi app ko HTTP milta hai."),
//     terms: [["Decrypt", b("Unlock encrypted data.", "Encrypted data unlock karna.")], ["Web server", b("Software that receives HTTP requests.", "HTTP requests lene wala software.")]],
//   },
//   {
//     id: "server-app", phase: "20 · App works", node: 2, layer: "none",
//     packet: "GET /profile → check token → database → JSON",
//     title: b("The server app does the work", "Server app kaam karti hai"),
//     plain: b("The app checks who you are, finds your profile and prepares the answer.", "App check karti hai aap kaun ho, profile dhoondhti hai aur jawab banati hai."),
//     detail: b(
//       "A route such as GET /profile runs. The app usually checks the Authorization token, asks a database for the profile and turns the result into JSON. If something fails it prepares an error status instead, such as 401 (not allowed) or 404 (not found).",
//       "GET /profile jaisa route chalta hai. App usually Authorization token check karti hai, database se profile maangti hai aur result ko JSON banati hai. Kuch fail ho toh error status banati hai, jaise 401 (allowed nahi) ya 404 (mila nahi)."
//     ),
//     icons: ["🪪", "🗃️", "🧾"],
//     items: [b("Check token\nWho are you?", "Token check\nAap kaun?"), b("Database\nFind profile", "Database\nProfile dhoondo"), b("Build JSON\n+ status")],
//     analogy: b("A clerk checks your ID, looks in the files and writes the answer.", "Clerk ID dekhta hai, files mein dhoondhta hai aur jawab likhta hai."),
//     remember: b("Success is 200. Problems get codes like 401 or 404.", "Success 200 hai. Problem par 401 ya 404 jaise codes milte hain."),
//     terms: [["Route", b("The URL path the app listens on.", "URL path jis par app sunti hai.")], ["Database", b("Where the app stores data.", "Jaha app data rakhti hai.")]],
//   },
//   {
//     id: "response", phase: "21 · Reply travels", node: 2, layer: "none",
//     packet: "HTTP/1.1 200 OK · Content-Type: application/json · { ... }",
//     title: b("The answer travels back", "Jawab wapas aata hai"),
//     plain: b("The server wraps the answer the same way and sends it back along the same road.", "Server jawab ko usi tarah wrap karke usi raaste se wapas bhejta hai."),
//     detail: b(
//       "The response has a status code (200 OK), headers and often a JSON body. It is encrypted by TLS, split into TCP segments, put in IP packets and frames, and routed back. Your home router uses its NAT table to pass it to your laptop's private IP.",
//       "Response mein status code (200 OK), headers aur aksar JSON body hoti hai. TLS use encrypt karta hai, TCP segments banate hain, IP packets aur frames mein jaata hai aur route hokar wapas aata hai. Home router NAT table se use aapke laptop ke private IP tak pahunchata hai."
//     ),
//     icons: ["🧑‍🍳", "📦", "🏠"],
//     items: [b("Server makes\n200 OK + data", "Server banata\n200 OK + data"), b("Wrapped again\nTLS · TCP · IP", "Phir wrap\nTLS · TCP · IP"), b("Router (NAT)\nSends to laptop", "Router (NAT)\nLaptop tak")],
//     analogy: b("The office mails a reply to your return address.", "Office reply aapke return address par bhejta hai."),
//     remember: b("Response = status + headers + body.", "Response = status + headers + body."),
//     terms: [["Status code", b("Result number: 200 OK, 404 Not Found.")], ["JSON", b("A simple text format for data.", "Data ka simple text format.")]],
//   },
//   {
//     id: "browser-receives", phase: "22 · Browser reads", node: 0, layer: "app",
//     packet: "Frame → IP → TCP → TLS decrypt → response.json() → React redraws",
//     title: b("The browser reads the answer", "Browser jawab padhta hai"),
//     plain: b("The browser unwraps the reply, checks the rules and hands the data to your code.", "Browser reply kholta hai, rules check karta hai aur data code ko deta hai."),
//     detail: b(
//       "Your device unwraps frame, packet, TCP and TLS, in the same reverse order the server used. The browser checks the CORS headers: if the server did not allow your site, your code is blocked from reading the data even though it arrived. Otherwise response.json() gives your code an object, setState runs and React redraws the profile on screen.",
//       "Aapka device frame, packet, TCP aur TLS ko usi ulte order mein kholta hai jo server ne use kiya. Browser CORS headers check karta hai: server ne aapki site allow nahi ki toh data aane ke baad bhi code use padh nahi sakta. Warna response.json() code ko object deta hai, setState chalta hai aur React screen par profile dobara draw karta hai."
//     ),
//     icons: ["🔓", "🛂", "⚛️", "🖼️"],
//     items: [b("Unwrap\nFrame → TLS"), b("CORS check\nAllowed?"), b("response.json()\nData object"), b("React redraws\nProfile shows", "React redraw\nProfile dikhta hai")],
//     analogy: b("You open the parcel, check it is really for you, then use what is inside.", "Parcel kholte ho, check karte ho aapka hi hai, phir andar ka use karte ho."),
//     remember: b("A CORS block happens after the data has already arrived.", "CORS block data aane ke baad hota hai."),
//     terms: [["response.json()", b("Turns JSON text into a JavaScript object.", "JSON text ko JavaScript object banata hai.")], ["State", b("Data React remembers to draw the page.", "Data jo React page draw karne ke liye yaad rakhta hai.")]],
//   },
//   {
//     id: "connection-end", phase: "23 · Finish", node: 1, layer: "none",
//     packet: "Keep-alive → reuse for the next request, or FIN → close",
//     title: b("What happens to the connection?", "Connection ka kya hota hai?"),
//     plain: b("The connection usually stays open for the next request, or closes politely.", "Connection aksar agli request ke liye khula rehta hai, ya tameez se band hota hai."),
//     detail: b(
//       "Browsers keep TCP + TLS connections open (keep-alive), so the next request skips the handshakes. HTTP/2 can send many requests at once over one connection, and HTTP/3 does the same over QUIC (which runs on UDP). When a connection is no longer needed, one side sends FIN to close it.",
//       "Browsers TCP + TLS connection khula rakhte hain (keep-alive), isliye agli request handshakes skip karti hai. HTTP/2 ek connection par kai requests ek saath bhej sakta hai, aur HTTP/3 QUIC (UDP par) se yahi karta hai. Zarurat nahi rehne par ek side FIN bhejkar band karti hai."
//     ),
//     icons: ["♻️", "🚦", "👋"],
//     items: [b("Keep-alive\nReuse it", "Keep-alive\nReuse karo"), b("HTTP/2 · 3\nMany requests", "HTTP/2 · 3\nKai requests"), b("FIN\nClose politely", "FIN\nTameez se band")],
//     analogy: b("Leaving the phone line open between two questions instead of redialling.", "Do sawaalon ke beech phone line chalu rakhna, dobara dial nahi karna."),
//     remember: b("Reusing a connection saves the whole handshake cost.", "Connection reuse karne se poora handshake bachta hai."),
//     terms: [["Keep-alive", b("Keeping a connection open for reuse.", "Reuse ke liye connection khula rakhna.")], ["FIN", b("The TCP message that closes a connection.", "TCP message jo connection band karta hai.")]],
//   },
// ];

// export const HTTP_Request_Response = {
//   heroTitle: "Learn how computers & software actually work",
// };
// ALL lesson data lives in this one file. Put it in ../data/HttpRequestResponse.ts (replace the old one).

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
    layersHint: "Think of each layer as a wrapper around the message.",
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
    layersHint: "Har layer message ke around ek wrapper ki tarah hoti hai.",
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
    id: "scenario", phase: "1 · Meet the sides", node: 0, layer: "app",
    packet: "Browser → https://api.example.com/profile → Server",
    reveal: { domain: "api.example.com", protocol: "HTTPS" },
    title: b("Meet the two sides", "Dono sides ko jaano"),
    plain: b("Your browser asks for something, and the server sends an answer.", "Browser kuch maangta hai aur server jawab bhejta hai."),
    detail: b(
      "Real-life example: You write a letter at home and send it to an office. The office reads it and sends a reply. Here, your browser is the sender, the server is the office, and the internet is the delivery route. We will follow a sample request to https://api.example.com/profile; this is an example address, not a real server.",
      "Real-life example: Aap ghar se office ko letter bhejte ho. Office letter padhta hai aur reply bhejta hai. Yahan browser sender hai, server office hai aur internet delivery ka raasta hai. Hum https://api.example.com/profile ki sample request follow karenge; yeh example address hai, real server nahi."
    ),
    icons: ["💻", "🌍", "🗄️"],
    items: [b("Your laptop\nReact app", "Aapka laptop\nReact app"), b("Internet\nThe route", "Internet\nRaasta"), b("Cloud server\nNode.js app")],
    analogy: b("Like posting a letter from home to an office in another city.", "Ghar se doosre shehar ke office ko letter bhejne jaisa."),
    remember: b("Browser = sender · Server = receiver that replies.", "Browser = bhejne wala · Server = jawab dene wala."),
    terms: [["Client", b("The one who asks.", "Jo maangta hai.")], ["Server", b("The one who answers.", "Jo jawab deta hai.")]],
  },
  {
    id: "fetch-call", phase: "2 · Ask", node: 0, layer: "app",
    packet: 'fetch("https://api.example.com/profile")',
    title: b("Your app asks for data", "App data maangti hai"),
    plain: b("One line of code says: \"go get me this data.\"", "Code ki ek line bolti hai: \"yeh data laao.\""),
    detail: b(
      "fetch(\"https://api.example.com/profile\") tells the browser the page wants data from that URL. The browser prepares the request and handles the networking. You never write code for each router or cable.",
      "fetch(\"https://api.example.com/profile\") browser ko batata hai ki page ko is URL se data chahiye. Browser request banata hai aur networking sambhalta hai. Har router ya cable ka code nahi likhna padta."
    ),
    icons: ["⚛️", "📞", "📨"],
    items: [b("React page"), b("fetch(url)"), b("Profile request")],
    analogy: b("Telling a delivery service: \"Please bring me this package.\"", "Delivery service ko bolna: \"Yeh package laao.\""),
    remember: b("fetch() only starts the journey.", "fetch() sirf safar shuru karta hai."),
    terms: [["URL", b("A full web address.", "Poora web address.")], ["API", b("A menu of things a server will do.", "Server ke kaamon ki menu.")]],
  },
  {
    id: "url-parts", phase: "3 · Read address", node: 0, layer: "app",
    packet: "https://api.example.com:443/profile",
    title: b("The browser reads the URL", "Browser URL padhta hai"),
    plain: b("A URL has 4 parts: how to talk, who to talk to, which door, what to ask for.", "URL ke 4 parts: kaise baat, kis se, kaunsa darwaza, kya maangna."),
    detail: b(
      "https means the connection is protected with TLS. api.example.com is the domain name. HTTPS normally uses port 443. /profile is the path the app wants.",
      "https ka matlab TLS se protected connection. api.example.com domain name hai. HTTPS normally port 443 use karta hai. /profile woh path hai jo app maangti hai."
    ),
    icons: ["🔒", "🏷️", "🚪", "📄"],
    items: [b("https://\nHow"), b("api.example.com\nWho"), b(":443\nWhich door"), b("/profile\nWhat")],
    analogy: b("Like an address: city, building, room number.", "Address jaisa: city, building, room number."),
    remember: b("Domain = name · Port = door · Path = item.", "Domain = naam · Port = darwaza · Path = cheez."),
    terms: [["Domain", b("A human-friendly name.", "Insaan ke liye aasaan naam.")], ["Port", b("A numbered door on a computer.", "Computer ka numbered darwaza.")]],
    fields: [["https", "Secure web protocol"], ["api.example.com", "Domain / server name"], ["443", "Default HTTPS port"], ["/profile", "Requested path"]],
  },
  {
    id: "browser-checks", phase: "4 · Browser checks", node: 0, layer: "none",
    packet: "Cache? HTTPS rule? Cross-origin? → maybe an OPTIONS preflight",
    title: b("The browser checks the rules first", "Browser pehle rules check karta hai"),
    plain: b("Before going out, the browser checks its cache and its safety rules.", "Bahar jaane se pehle browser cache aur safety rules check karta hai."),
    detail: b(
      "The browser may already have a saved answer (cache), or know that this site must use HTTPS (HSTS). Your React app runs on localhost:3000 but the API is on api.example.com, so this is a cross-origin request. If your code adds an Authorization header, the browser first sends a small OPTIONS preflight to ask the server for permission. A missing permission is the famous \"CORS error\".",
      "Browser ke paas saved answer (cache) ho sakta hai, ya pata ho sakta hai ki site HTTPS hi use karegi (HSTS). Aapki React app localhost:3000 par hai aur API api.example.com par, isliye yeh cross-origin request hai. Code Authorization header lagaye toh browser pehle chhota OPTIONS preflight bhejkar server se permission poochta hai. Permission na mile toh famous \"CORS error\" aata hai."
    ),
    icons: ["🗃️", "🛡️", "🛂"],
    items: [b("Cache\nSaved answer?"), b("HTTPS rule\nHSTS"), b("CORS\nAllowed origin?")],
    analogy: b("A guard checks your pass before you leave the building.", "Guard building se nikalne se pehle pass check karta hai."),
    remember: b("CORS is enforced by the browser, not by the network.", "CORS browser enforce karta hai, network nahi."),
    terms: [["CORS", b("Rules about which sites may read a server's data.", "Rules ki kaunsi sites server ka data padh sakti hain.")], ["Preflight", b("A permission-check sent before the real request.", "Asli request se pehle bheja permission-check.")]],
  },
  {
    id: "dns", phase: "5 · Find server", node: 1, layer: "none",
    packet: "api.example.com → 203.0.113.10 (example IP)",
    reveal: { destIp: "203.0.113.10" },
    title: b("Find the server's IP address", "Server ka IP dhoondo"),
    plain: b("Computers can't use names. DNS turns a name into a number.", "Computers naam nahi samajhte. DNS naam ko number banata hai."),
    detail: b(
      "Computers route traffic with IP addresses; people prefer names. DNS is the internet's phone book. The browser or OS may already have the answer cached, so a fresh lookup isn't always needed. The IP shown is a documentation example.",
      "Computers IP se traffic route karte hain; log naam yaad rakhte hain. DNS internet ki phone book hai. Browser ya OS ke cache mein answer ho sakta hai, isliye har baar naya lookup nahi hota. Yeh IP sirf example hai."
    ),
    icons: ["🏷️", "📒", "🔢"],
    items: [b("Name\napi.example.com"), b("DNS lookup"), b("IP address\n203.0.113.10")],
    analogy: b("Searching a name in your contacts to get the phone number.", "Contacts mein naam search karke number nikalna."),
    remember: b("DNS: name → IP.", "DNS: naam → IP."),
    terms: [["DNS", b("The internet's phone book.", "Internet ki phone book.")], ["IP address", b("A device's number on a network.", "Network par device ka number.")]],
  },
  {
    id: "gather-criteria", phase: "6 · Addresses", node: 0, layer: "none",
    packet: "Client (temporary port) → Server IP : 443",
    reveal: { destPort: "443" },
    title: b("Prepare 'from' and 'to'", "'Kaha se' aur 'kaha tak' ready karo"),
    plain: b("Like a parcel, the connection needs a sender and a receiver, each with IP + port.", "Parcel ki tarah sender aur receiver chahiye, dono ke IP + port."),
    detail: b(
      "The destination is the server IP with port 443. Your OS supplies a source IP and usually picks a temporary source port. React's localhost:3000 is not the source port of this API request.",
      "Destination server IP + port 443 hai. OS source IP deta hai aur usually temporary source port chunta hai. React ka localhost:3000 is API request ka source port nahi hota."
    ),
    icons: ["💻", "🗄️"],
    items: [b("Your device\nIP + temporary port", "Aapka device\nIP + temporary port"), b("Server\nIP + port 443")],
    analogy: b("A return address and a delivery address on a parcel.", "Parcel par sender aur receiver ka address."),
    remember: b("Dev-server port ≠ network source port.", "Dev-server port ≠ network source port."),
    terms: [["Source", b("Where data starts.", "Jaha data shuru hota hai.")], ["Destination", b("Where data must arrive.", "Jaha data pahunchna hai.")]],
    fields: [["Client IP", "Your device's IP"], ["Client port", "Temporary port"], ["Server IP", "Found via DNS"], ["Server port", "443 for HTTPS"]],
  },
  {
    id: "mac-arp", phase: "7 · Local address", node: 1, layer: "datalink",
    packet: "ARP: \"Who has my gateway's IP?\" → gateway MAC",
    title: b("Find the next device's MAC", "Agle device ka MAC dhoondo"),
    plain: b("At home, delivery uses hardware names (MAC). ARP asks \"who owns this IP?\"", "Ghar mein delivery hardware naam (MAC) se hoti hai. ARP poochta hai \"yeh IP kiska?\""),
    detail: b(
      "This happens before your first packet leaves (the answer is often already cached). To send a frame on Wi-Fi or Ethernet you need the next device's MAC. For an outside server, that device is usually your default gateway (router). On IPv4, ARP asks which MAC owns the gateway's IP. IPv6 uses Neighbor Discovery instead.",
      "Yeh pehla packet nikalne se pehle hota hai (answer aksar cache mein hota hai). Wi-Fi ya Ethernet par frame bhejne ke liye agle device ka MAC chahiye. Bahar ke server ke liye woh usually default gateway (router) hota hai. IPv4 mein ARP gateway IP ka MAC poochta hai. IPv6 mein Neighbor Discovery hota hai."
    ),
    icons: ["🏠", "🔔", "📡"],
    items: [b("Laptop knows\nGateway IP", "Laptop ko pata\nGateway IP"), b("ARP asks\n\"Who has it?\"", "ARP poochta\n\"Kiska hai?\""), b("Router replies\nIts MAC", "Router batata\nApna MAC")],
    analogy: b("You know the house number, ask which doorbell is theirs.", "Ghar ka number pata hai, doorbell poochte ho."),
    remember: b("ARP finds a MAC for a local IPv4 address.", "ARP local IPv4 ka MAC dhoondhta hai."),
    terms: [["MAC address", b("A hardware ID on a network card.", "Network card ka hardware ID.")], ["Gateway", b("Your router, the exit door.", "Aapka router, bahar ka darwaza.")]],
    fields: [["ARP knows", "Local IPv4 address"], ["ARP finds", "That device's MAC"], ["Usual target", "Default gateway"]],
  },
  {
    id: "tcp-handshake", phase: "8 · Connect", node: 1, layer: "transport",
    packet: "SYN → SYN + ACK → ACK",
    title: b("TCP says hello first", "TCP pehle hello bolta hai"),
    plain: b("Before sending data, both computers say hello 3 times to check the line.", "Data se pehle dono computers 3 baar hello bolte hain."),
    detail: b(
      "Every message below is itself wrapped in an IP packet and a frame. A new TCP connection starts with a three-way handshake: SYN starts, SYN-ACK replies, ACK finishes. TCP then delivers data reliably and in order. If a suitable connection is already open, the browser reuses it.",
      "Neeche ka har message bhi IP packet aur frame mein wrap hota hai. Naya TCP connection three-way handshake se shuru hota hai: SYN shuru, SYN-ACK reply, ACK complete. Phir TCP data reliable aur order mein deta hai. Connection open ho toh browser reuse karta hai."
    ),
    icons: ["👋", "🤝", "✅"],
    items: [b("1 · SYN\n\"Can we connect?\"", "1 · SYN\n\"Connect karein?\""), b("2 · SYN-ACK\n\"Yes, I hear you\"", "2 · SYN-ACK\n\"Haan, sun liya\""), b("3 · ACK\n\"Great, ready\"", "3 · ACK\n\"Theek, ready\"")],
    analogy: b("\"Can you hear me?\" → \"Yes, can you?\" → \"Yes.\"", "\"Awaaz aa rahi?\" → \"Haan, tumhari?\" → \"Haan.\""),
    remember: b("TCP = reliable, ordered delivery.", "TCP = reliable, ordered delivery."),
    terms: [["TCP", b("Rules for reliable delivery.", "Reliable delivery ke rules.")], ["Handshake", b("A short greeting to start.", "Shuru karne ka greeting.")]],
  },
  {
    id: "tls-handshake", phase: "9 · Protect", node: 1, layer: "tls",
    packet: "TLS handshake → certificate check + secret keys",
    title: b("TLS makes HTTPS private", "TLS HTTPS ko private banata hai"),
    plain: b("The server shows an ID card; if it's valid, both agree on a secret code.", "Server ID card dikhata hai; sahi ho toh dono secret code agree karte hain."),
    detail: b(
      "The browser and server negotiate security settings and keys. The server sends a certificate; the browser checks it is trusted, valid and matches the domain. After setup, application data is encrypted.",
      "Browser aur server security settings aur keys agree karte hain. Server certificate bhejta hai; browser check karta hai ki trusted, valid aur domain se match hai. Setup ke baad data encrypt hota hai."
    ),
    icons: ["🔐", "📜", "🗝️"],
    items: [b("Browser\n\"Let's secure this\"", "Browser\n\"Secure karein\""), b("Server\nCertificate"), b("Both sides\nSecret keys", "Dono sides\nSecret keys")],
    analogy: b("Checking someone's ID before sharing a private note.", "Private note dene se pehle ID check karna."),
    remember: b("TLS protects data; the certificate proves identity.", "TLS data protect karta hai; certificate identity prove karta hai."),
    terms: [["TLS", b("Makes HTTPS private.", "HTTPS ko private banata hai.")], ["Certificate", b("A server's digital ID card.", "Server ka digital ID card.")]],
  },
  {
    id: "build-request", phase: "10 · Write message", node: 0, layer: "app",
    packet: "GET /profile · Host: api.example.com · headers",
    title: b("Build the HTTP request", "HTTP request banao"),
    plain: b("The browser fills a small form: action, item, and extra notes.", "Browser chhota form bharta hai: action, cheez, extra notes."),
    detail: b(
      "The message has a method (GET = read), a path (/profile) and headers with extra details. An app may add an Authorization token; cookies are sent only when allowed. A GET usually has no body. None of this is an IP or MAC address.",
      "Message mein method (GET = padho), path (/profile) aur extra headers hote hain. App Authorization token laga sakti hai; cookies tabhi jaati hain jab allowed ho. GET mein aksar body nahi hoti. Yeh IP ya MAC nahi hai."
    ),
    icons: ["🏷️", "📄", "🧾"],
    items: [b("Method\nGET"), b("Path\n/profile"), b("Headers\nExtra details")],
    analogy: b("A form: request type, item name, optional notes.", "Form: request type, item naam, optional notes."),
    remember: b("HTTP says what the client wants done.", "HTTP batata hai client kya karwana chahta hai."),
    terms: [["Method", b("The action: GET = read.", "Action: GET = padho.")], ["Header", b("Extra info on a message.", "Message ki extra jankari.")]],
    fields: [["Method", "GET, ask to read data"], ["Path", "/profile"], ["Headers", "Extra request info"], ["Authorization", "Bearer token, if app adds it"]],
  },
  {
    id: "bytes", phase: "11 · Make bytes", node: 0, layer: "tls",
    packet: "HTTP message → bytes → (TLS encrypts)",
    title: b("The message becomes bytes", "Message bytes banta hai"),
    plain: b("Computers only understand 1s and 0s, so text becomes bytes, then gets locked.", "Computers sirf 1 aur 0 samajhte hain, isliye text bytes banta hai, phir lock hota hai."),
    detail: b(
      "The browser serializes the request into bytes (groups of 8 bits). For HTTPS, TLS then encrypts them into TLS records, and TCP carries those records. Turning text into bytes and encrypting are two different ideas.",
      "Browser request ko bytes (8 bits ke groups) mein badalta hai. HTTPS mein TLS unhe encrypt karke TLS records banata hai, jinhe TCP carry karta hai. Bytes banana aur encrypt karna alag concepts hain."
    ),
    icons: ["📝", "🔢", "🔒"],
    items: [b("Readable\nGET /profile"), b("Bytes\n0101…"), b("Encrypted\nTLS data")],
    analogy: b("Writing a note, then sealing it in a locked box.", "Note likhna, phir locked box mein rakhna."),
    remember: b("Bytes = form. Encryption = protection.", "Bytes = form. Encryption = protection."),
    terms: [["Byte", b("8 bits of data.", "Data ke 8 bits.")], ["Encryption", b("Scrambling so only the receiver can read.", "Scramble karna taaki sirf receiver padh sake.")]],
  },
  {
    id: "handoff-os", phase: "12 · Hand off", node: 0, layer: "none",
    packet: "Browser → Operating system → Network card",
    title: b("The browser hands work to the OS", "Browser kaam OS ko deta hai"),
    plain: b("The browser writes the letter; the OS and network card send it out.", "Browser letter likhta hai; OS aur network card bhejte hain."),
    detail: b(
      "The browser's networking code works with the OS network stack. The OS and network interface put data on Wi-Fi or Ethernet. The exact split varies by browser and platform.",
      "Browser ka networking code OS ke network stack ke saath kaam karta hai. OS aur network interface data Wi-Fi ya Ethernet par bhejte hain. Exact division platform par depend karta hai."
    ),
    icons: ["🌐", "⚙️", "📶"],
    items: [b("Browser\nHTTP request"), b("OS\nTCP/IP"), b("Network card\nWi-Fi / Ethernet")],
    analogy: b("You write a letter, the post office delivers it.", "Aap letter likhte ho, post office deliver karta hai."),
    remember: b("The browser doesn't control the Wi-Fi radio.", "Browser Wi-Fi radio control nahi karta."),
    terms: [["OS", b("Windows, macOS, Linux, Android…")], ["Network card", b("Hardware that sends signals.", "Signals bhejne wala hardware.")]],
  },
  {
    id: "chunking", phase: "13 · Split", node: 1, layer: "transport",
    packet: "Byte stream → TCP segments",
    title: b("Big data travels in pieces", "Bada data tukdon mein jaata hai"),
    plain: b("Big data is cut into small pieces and rebuilt at the other end.", "Bade data ke chhote tukde bante hain aur doosri taraf jud jaate hain."),
    detail: b(
      "A long response, like a photo, is carried in many TCP segments. MSS is the biggest TCP payload in a segment; MTU is the biggest packet a link can carry. A small request may fit in one segment.",
      "Bada response, jaise photo, kai TCP segments mein jaata hai. MSS segment ka max TCP payload hai; MTU link ka max packet size. Chhoti request ek segment mein aa jaati hai."
    ),
    icons: ["📚", "🧩", "✅"],
    items: [b("Big data", "Bada data"), b("Piece 1 · 2 · 3", "Tukda 1 · 2 · 3"), b("Rebuilt at receiver", "Receiver par jud gaya")],
    analogy: b("Sending a big book as several parcels.", "Badi book ko kai parcels mein bhejna."),
    remember: b("MSS = TCP payload limit · MTU = link limit.", "MSS = TCP payload limit · MTU = link limit."),
    terms: [["Segment", b("One piece of TCP data.", "TCP data ka ek tukda.")], ["MTU", b("Biggest packet a link carries.", "Link ka sabse bada packet.")]],
  },
  {
    id: "tcp-segment", phase: "14 · Label pieces", node: 1, layer: "transport",
    packet: "TCP header + data = TCP segment",
    title: b("TCP adds ports and numbers", "TCP ports aur numbers lagata hai"),
    plain: b("TCP sticks a label on each piece: which door, and which number in order.", "TCP har tukde par label lagata hai: kaunsa darwaza, kaunsa number."),
    detail: b(
      "The TCP header holds source and destination ports and a sequence number. Sequence numbers let the receiver put bytes in order and spot missing ones. Flags like SYN and ACK control the connection; normal data segments don't all carry SYN.",
      "TCP header mein source/destination ports aur sequence number hota hai. Sequence number se receiver bytes ko order mein jodta hai aur missing bytes pakadta hai. SYN/ACK flags connection control karte hain; har data segment mein SYN nahi hota."
    ),
    icons: ["🏷️", "📄", "📦"],
    items: [b("TCP header\nPorts + order"), b("Data\nBytes"), b("TCP segment")],
    analogy: b("A parcel label with door number and tracking number.", "Parcel label: darwaza aur tracking number."),
    remember: b("Ports find the app; sequence numbers keep order.", "Ports app dhoondhte hain; sequence numbers order rakhte hain."),
    terms: [["Header", b("The label in front of data.", "Data ke aage ka label.")], ["Sequence no.", b("Tells the correct order.", "Sahi order batata hai.")]],
    fields: [["Source port", "Temporary client port"], ["Destination port", "443"], ["Sequence number", "Byte position"], ["Flags", "Connection control (ACK…)"]],
  },
  {
    id: "ip-packet", phase: "15 · Add addresses", node: 1, layer: "network",
    packet: "IP header (source IP + destination IP) + TCP segment",
    title: b("IP adds the destination address", "IP destination address lagata hai"),
    plain: b("IP adds the big shipping address so routers know where to send it.", "IP bada shipping address lagata hai taaki routers ko pata ho."),
    detail: b(
      "The IP layer wraps the TCP segment in an IP packet with source and destination IPs. Routers read the destination IP to choose the next direction. IP moves packets between networks; ports pick the application.",
      "IP layer TCP segment ko IP packet mein wrap karti hai, source/destination IP ke saath. Routers destination IP dekhkar agli direction chunte hain. IP networks ke beech le jaata hai; ports application chunte hain."
    ),
    icons: ["🧭", "📦", "✉️"],
    items: [b("IP header\nFrom IP → To IP"), b("Inside\nTCP segment", "Andar\nTCP segment"), b("IP packet")],
    analogy: b("The outer address says which city the parcel goes to.", "Bahar ka address batata hai parcel kis city jayega."),
    remember: b("IP = between networks · Port = which app.", "IP = networks ke beech · Port = kaunsi app."),
    terms: [["IP packet", b("TCP segment + IP addresses.", "TCP segment + IP addresses.")], ["Router", b("Forwards packets between networks.", "Networks ke beech packets forward karta hai.")]],
    fields: [["Source IP", "Your current IP"], ["Destination IP", "Server IP from DNS"]],
  },
  {
    id: "frame", phase: "16 · Wrap for link", node: 1, layer: "datalink",
    packet: "Frame: [MAC header] [IP packet] [check]",
    title: b("Wrap the packet in a frame", "Packet ko frame mein wrap karo"),
    plain: b("The packet goes into a local delivery bag with the next stop's MAC.", "Packet local delivery bag mein jaata hai, agle stop ke MAC ke saath."),
    detail: b(
      "The link layer puts the IP packet inside a frame with source and destination MACs. At home the destination MAC is usually your router's, not the far server's. Wi-Fi and Ethernet frames differ, but both carry the packet.",
      "Link layer IP packet ko frame mein rakhti hai, source/destination MAC ke saath. Ghar mein destination MAC usually router ka hota hai, door ke server ka nahi. Wi-Fi aur Ethernet frames alag hain par dono packet carry karte hain."
    ),
    icons: ["🧾", "✉️", "🧰"],
    items: [b("Local header\nMAC → next-hop MAC"), b("Inside\nIP packet", "Andar\nIP packet"), b("Link frame")],
    analogy: b("Putting a parcel in a courier bag for the next stop.", "Parcel ko next stop ke liye courier bag mein rakhna."),
    remember: b("The IP packet rides inside a frame.", "IP packet frame ke andar chalta hai."),
    terms: [["Frame", b("The wrapper for one local link.", "Ek local link ka wrapper.")], ["Next hop", b("The next device on the path.", "Raaste ka agla device.")]],
  },
  {
    id: "signal", phase: "17 · Signal", node: 1, layer: "physical",
    packet: "Frame bits → radio / electrical / light signal",
    title: b("The frame becomes a signal", "Frame signal ban jaata hai"),
    plain: b("The bits leave your device as radio waves, electricity or light.", "Bits aapke device se radio waves, bijli ya light ban kar nikalte hain."),
    detail: b(
      "Wi-Fi uses radio waves, Ethernet uses electrical pulses and fiber uses light. This physical layer only moves bits; it does not understand addresses. The next device turns the signal back into a frame.",
      "Wi-Fi radio waves, Ethernet electrical pulses aur fiber light use karta hai. Physical layer sirf bits move karti hai; addresses nahi samajhti. Agla device signal ko wapas frame bana leta hai."
    ),
    icons: ["📶", "⚡", "💡"],
    items: [b("Wi-Fi\nRadio waves"), b("Ethernet\nElectric pulses"), b("Fiber\nLight")],
    analogy: b("The same words can travel by voice, phone line or a flash of light.", "Same words awaaz, phone line ya light flash se ja sakte hain."),
    remember: b("The physical layer moves raw bits.", "Physical layer raw bits move karti hai."),
    terms: [["Bit", b("A single 0 or 1.", "Ek 0 ya 1.")], ["Fiber", b("A glass cable that carries light.", "Glass cable jo light carry karta hai.")]],
  },
  {
    id: "routing", phase: "18 · Travel", node: 1, layer: "network",
    packet: "Your device → router → ISP routers → server network",
    title: b("Routers pass it along", "Routers aage bhejte hain"),
    plain: b("Routers pass the packet like a relay race, each picking the next step.", "Routers packet ko relay race ki tarah pass karte hain."),
    detail: b(
      "Your device sends a frame to the router. The router removes the frame, reads the destination IP and forwards the packet to the next network. Every hop makes a new frame with new MACs; your home router usually swaps your private IP for its public IP (NAT), while the destination IP stays the same.",
      "Device frame router ko bhejta hai. Router frame hatata hai, destination IP padhta hai aur packet agle network ko bhejta hai. Har hop par naya frame aur naye MAC; aapka home router aksar private IP ko public IP se badalta hai (NAT), destination IP same rehta hai."
    ),
    icons: ["💻", "🏠", "🛰️", "🗄️"],
    items: [b("Your laptop", "Aapka laptop"), b("Home router"), b("More routers", "Aur routers"), b("Server network")],
    analogy: b("A parcel changes vehicles at sorting centers, same final address.", "Parcel sorting centers par vehicle badalta hai, address wahi."),
    remember: b("MAC = local link · IP = whole trip.", "MAC = local link · IP = poora safar."),
    terms: [["Hop", b("One jump between routers.", "Routers ke beech ek jump.")], ["NAT", b("Router swaps private IP for public IP.", "Router private IP ko public IP se badalta hai.")]],
  },
  {
    id: "server-response", phase: "19 · Server unwraps", node: 2, layer: "none",
    packet: "Request arrives → app processes → HTTP response",
    title: b("The server unwraps the request", "Server request kholta hai"),
    plain: b("The server unwraps every layer in reverse until it can read your question.", "Server layers ulte order mein kholta hai jab tak sawaal na padh le."),
    detail: b(
      "The network layers process the frame and packet, TCP reassembles the byte stream and TLS decrypts it. Then the Node.js app reads the HTTP request and does its work, for example looking up the profile in a database.",
      "Network layers frame aur packet process karti hain, TCP byte stream jodta hai, TLS decrypt karta hai. Phir Node.js app HTTP request padhti hai aur kaam karti hai, jaise database se profile dhoondhna."
    ),
    icons: ["🧰", "✉️", "📦", "🔓", "📄"],
    items: [b("Frame"), b("IP packet"), b("TCP data"), b("TLS decrypts", "TLS decrypt"), b("HTTP request")],
    analogy: b("Opening the bag, parcel and wrapping to read the note.", "Bag, parcel aur wrapping kholkar note padhna."),
    remember: b("The app sees HTTP only after lower layers finish.", "Lower layers ke baad hi app ko HTTP milta hai."),
    terms: [["Decrypt", b("Unlock encrypted data.", "Encrypted data unlock karna.")], ["Web server", b("Software that receives HTTP requests.", "HTTP requests lene wala software.")]],
  },
  {
    id: "server-app", phase: "20 · App works", node: 2, layer: "none",
    packet: "GET /profile → check token → database → JSON",
    title: b("The server app does the work", "Server app kaam karti hai"),
    plain: b("The app checks who you are, finds your profile and prepares the answer.", "App check karti hai aap kaun ho, profile dhoondhti hai aur jawab banati hai."),
    detail: b(
      "A route such as GET /profile runs. The app usually checks the Authorization token, asks a database for the profile and turns the result into JSON. If something fails it prepares an error status instead, such as 401 (not allowed) or 404 (not found).",
      "GET /profile jaisa route chalta hai. App usually Authorization token check karti hai, database se profile maangti hai aur result ko JSON banati hai. Kuch fail ho toh error status banati hai, jaise 401 (allowed nahi) ya 404 (mila nahi)."
    ),
    icons: ["🪪", "🗃️", "🧾"],
    items: [b("Check token\nWho are you?", "Token check\nAap kaun?"), b("Database\nFind profile", "Database\nProfile dhoondo"), b("Build JSON\n+ status")],
    analogy: b("A clerk checks your ID, looks in the files and writes the answer.", "Clerk ID dekhta hai, files mein dhoondhta hai aur jawab likhta hai."),
    remember: b("Success is 200. Problems get codes like 401 or 404.", "Success 200 hai. Problem par 401 ya 404 jaise codes milte hain."),
    terms: [["Route", b("The URL path the app listens on.", "URL path jis par app sunti hai.")], ["Database", b("Where the app stores data.", "Jaha app data rakhti hai.")]],
  },
  {
    id: "response", phase: "21 · Reply travels", node: 2, layer: "none",
    packet: "HTTP/1.1 200 OK · Content-Type: application/json · { ... }",
    title: b("The answer travels back", "Jawab wapas aata hai"),
    plain: b("The server wraps the answer the same way and sends it back along the same road.", "Server jawab ko usi tarah wrap karke usi raaste se wapas bhejta hai."),
    detail: b(
      "The response has a status code (200 OK), headers and often a JSON body. It is encrypted by TLS, split into TCP segments, put in IP packets and frames, and routed back. Your home router uses its NAT table to pass it to your laptop's private IP.",
      "Response mein status code (200 OK), headers aur aksar JSON body hoti hai. TLS use encrypt karta hai, TCP segments banate hain, IP packets aur frames mein jaata hai aur route hokar wapas aata hai. Home router NAT table se use aapke laptop ke private IP tak pahunchata hai."
    ),
    icons: ["🧑‍🍳", "📦", "🏠"],
    items: [b("Server makes\n200 OK + data", "Server banata\n200 OK + data"), b("Wrapped again\nTLS · TCP · IP", "Phir wrap\nTLS · TCP · IP"), b("Router (NAT)\nSends to laptop", "Router (NAT)\nLaptop tak")],
    analogy: b("The office mails a reply to your return address.", "Office reply aapke return address par bhejta hai."),
    remember: b("Response = status + headers + body.", "Response = status + headers + body."),
    terms: [["Status code", b("Result number: 200 OK, 404 Not Found.")], ["JSON", b("A simple text format for data.", "Data ka simple text format.")]],
  },
  {
    id: "browser-receives", phase: "22 · Browser reads", node: 0, layer: "app",
    packet: "Frame → IP → TCP → TLS decrypt → response.json() → React redraws",
    title: b("The browser reads the answer", "Browser jawab padhta hai"),
    plain: b("The browser unwraps the reply, checks the rules and hands the data to your code.", "Browser reply kholta hai, rules check karta hai aur data code ko deta hai."),
    detail: b(
      "Your device unwraps frame, packet, TCP and TLS, in the same reverse order the server used. The browser checks the CORS headers: if the server did not allow your site, your code is blocked from reading the data even though it arrived. Otherwise response.json() gives your code an object, setState runs and React redraws the profile on screen.",
      "Aapka device frame, packet, TCP aur TLS ko usi ulte order mein kholta hai jo server ne use kiya. Browser CORS headers check karta hai: server ne aapki site allow nahi ki toh data aane ke baad bhi code use padh nahi sakta. Warna response.json() code ko object deta hai, setState chalta hai aur React screen par profile dobara draw karta hai."
    ),
    icons: ["🔓", "🛂", "⚛️", "🖼️"],
    items: [b("Unwrap\nFrame → TLS"), b("CORS check\nAllowed?"), b("response.json()\nData object"), b("React redraws\nProfile shows", "React redraw\nProfile dikhta hai")],
    analogy: b("You open the parcel, check it is really for you, then use what is inside.", "Parcel kholte ho, check karte ho aapka hi hai, phir andar ka use karte ho."),
    remember: b("A CORS block happens after the data has already arrived.", "CORS block data aane ke baad hota hai."),
    terms: [["response.json()", b("Turns JSON text into a JavaScript object.", "JSON text ko JavaScript object banata hai.")], ["State", b("Data React remembers to draw the page.", "Data jo React page draw karne ke liye yaad rakhta hai.")]],
  },
  {
    id: "connection-end", phase: "23 · Finish", node: 1, layer: "none",
    packet: "Keep-alive → reuse for the next request, or FIN → close",
    title: b("What happens to the connection?", "Connection ka kya hota hai?"),
    plain: b("The connection usually stays open for the next request, or closes politely.", "Connection aksar agli request ke liye khula rehta hai, ya tameez se band hota hai."),
    detail: b(
      "Browsers keep TCP + TLS connections open (keep-alive), so the next request skips the handshakes. HTTP/2 can send many requests at once over one connection, and HTTP/3 does the same over QUIC (which runs on UDP). When a connection is no longer needed, one side sends FIN to close it.",
      "Browsers TCP + TLS connection khula rakhte hain (keep-alive), isliye agli request handshakes skip karti hai. HTTP/2 ek connection par kai requests ek saath bhej sakta hai, aur HTTP/3 QUIC (UDP par) se yahi karta hai. Zarurat nahi rehne par ek side FIN bhejkar band karti hai."
    ),
    icons: ["♻️", "🚦", "👋"],
    items: [b("Keep-alive\nReuse it", "Keep-alive\nReuse karo"), b("HTTP/2 · 3\nMany requests", "HTTP/2 · 3\nKai requests"), b("FIN\nClose politely", "FIN\nTameez se band")],
    analogy: b("Leaving the phone line open between two questions instead of redialling.", "Do sawaalon ke beech phone line chalu rakhna, dobara dial nahi karna."),
    remember: b("Reusing a connection saves the whole handshake cost.", "Connection reuse karne se poora handshake bachta hai."),
    terms: [["Keep-alive", b("Keeping a connection open for reuse.", "Reuse ke liye connection khula rakhna.")], ["FIN", b("The TCP message that closes a connection.", "TCP message jo connection band karta hai.")]],
  },
];

export const HTTP_Request_Response = {
  heroTitle: "Learn how computers & software actually work",
};