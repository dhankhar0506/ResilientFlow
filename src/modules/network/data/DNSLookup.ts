// ALL DNS lesson data lives in this one file. Put it in ../data/DNSLookup.ts (replace the old one).

export type Bi = { en: string; hi: string };
const b = (en: string, hi: string = en): Bi => ({ en, hi });

export const DNS_LABELS = {
  en: {
    lessonTitle: "DNS Lookup",
    lookingUp: "Looking up",
    domain: "Domain",
    resolver: "Resolver",
    answer: "IP answer",
    exampleLabel: "What the message looks like",
    detailLabel: "How it really works",
    analogyLabel: "Real life",
    wordsLabel: "Key words",
    storyLabel: "Real example: {brand}",
    pickSite: "Try with:",
    msgNote: "Names in <angle brackets> are placeholders. Real servers and IPs are different and change often.",
    completed: "DNS lookup complete. Now the browser can connect.",
  },
  hi: {
    lessonTitle: "DNS Lookup",
    lookingUp: "Dhoondh rahe hain",
    domain: "Domain",
    resolver: "Resolver",
    answer: "IP answer",
    exampleLabel: "Message aisa dikhta hai",
    detailLabel: "Asal mein kaise kaam karta hai",
    analogyLabel: "Real life",
    wordsLabel: "Zaroori words",
    storyLabel: "Real example: {brand}",
    pickSite: "In websites ke saath dekho:",
    msgNote: "<angle brackets> wale naam placeholder hain. Asli servers aur IP alag hote hain aur badalte rehte hain.",
    completed: "DNS lookup complete. Ab browser connect kar sakta hai.",
  },
} as const;

// Who is doing the work in each step (index into this list = step.at)
export const DNS_ACTORS = [
  { icon: "💻", en: "Your device", hi: "Aapka device" },
  { icon: "🧭", en: "Resolver", hi: "Resolver" },
  { icon: "🌍", en: "Root / TLD", hi: "Root / TLD" },
  { icon: "📚", en: "Authoritative", hi: "Authoritative" },
];

export type DNSSite = {
  id: string; icon: string; brand: string; domain: string; apex: string; tld: string;
  tldNs: string; tldIp: string; authNs: string; authIp: string; ip: string; ip6: string; tldNote: Bi;
};

// IPs use reserved documentation ranges (203.0.113.x, 198.51.100.x, 2001:db8::). Real sites use other,
// often changing IPs. Only the example.com row contains real server names.
export const DNS_SITES: DNSSite[] = [
  {
    id: "amazon", icon: "📦", brand: "Amazon", domain: "www.amazon.in", apex: "amazon.in", tld: "in",
    tldNs: "<an .in registry name server>", tldIp: "<its IP>", authNs: "<amazon.in's name server>", authIp: "<its IP>",
    ip: "203.0.113.10", ip6: "2001:db8::10",
    tldNote: b(".in is India's country domain, run by India's registry.", ".in India ka country domain hai, jise India ki registry sambhalti hai."),
  },
  {
    id: "flipkart", icon: "🛍️", brand: "Flipkart", domain: "www.flipkart.com", apex: "flipkart.com", tld: "com",
    tldNs: "a.gtld-servers.net", tldIp: "192.5.6.30", authNs: "<flipkart.com's name server>", authIp: "<its IP>",
    ip: "198.51.100.20", ip6: "2001:db8::20",
    tldNote: b(".com is the most popular domain, run by the .com registry.", ".com sabse popular domain hai, jise .com registry sambhalti hai."),
  },
  {
    id: "example", icon: "🧪", brand: "Example", domain: "www.example.com", apex: "example.com", tld: "com",
    tldNs: "a.gtld-servers.net", tldIp: "192.5.6.30", authNs: "a.iana-servers.net", authIp: "199.43.135.53",
    ip: "203.0.113.10", ip6: "2001:db8::10",
    tldNote: b(".com is the most popular domain, run by the .com registry.", ".com sabse popular domain hai, jise .com registry sambhalti hai."),
  },
];

export interface DNSLookupStep {
  id: string;
  phase: string;
  at: 0 | 1 | 2 | 3;
  reveal?: { resolver?: string; ip?: string };
  title: Bi;
  plain: Bi; // one sentence, shown big
  detail: Bi; // how it really works, always shown
  icons: string[];
  flow: Bi[]; // first line = title, next line = small text
  msg: string[]; // an example of the real message / result (technical, not translated)
  analogy: Bi;
  remember: Bi;
  story: Bi; // real-life example with the chosen website ({brand}, {domain}, ...)
  terms: [string, Bi][];
}

export const DNS_STEPS: DNSLookupStep[] = [
  {
    id: "domain-name", phase: "1 · Need an IP", at: 0,
    title: b("You type a domain name", "Aap domain name type karte ho"),
    plain: b("Your browser knows the name, but it needs a number to connect.", "Browser ko naam pata hai, par connect karne ke liye number chahiye."),
    detail: b(
      "You type {domain}. Names are for people; the network sends data to IP addresses. Before it can open a connection, the browser must turn the name into an IP address. That translation is done by DNS (the Domain Name System). Note that DNS only finds the address. It does not download the website.",
      "Aap {domain} type karte ho. Naam insaano ke liye hai; network data IP address par bhejta hai. Connection kholne se pehle browser ko naam ko IP address mein badalna padta hai. Yahi DNS ka kaam hai. DNS sirf address dhoondhta hai, website download nahi karta."
    ),
    icons: ["⌨️", "🧭", "🔢"],
    flow: [b("You type\n{domain}", "Aap type karte ho\n{domain}"), b("Browser asks\n\"What is its IP?\"", "Browser poochta hai\n\"Iska IP kya hai?\""), b("Needed\n?.?.?.?", "Chahiye\n?.?.?.?")],
    msg: ["You type:      https://{domain}/", "Browser needs: {domain}  →  ?.?.?.?"],
    analogy: b("You know a friend's name, but to call them you need their phone number.", "Dost ka naam pata hai, par call ke liye phone number chahiye."),
    remember: b("Names are for people. IP addresses are for networks.", "Naam insaano ke liye. IP address network ke liye."),
    story: b("You type {domain} in Chrome. Your phone has no idea where {brand}'s computers are, so its first job is to find out.",
      "Aap Chrome mein {domain} type karte ho. Aapke phone ko {brand} ke computers ka address nahi pata, isliye sabse pehle wahi dhoondhna padta hai."),
    terms: [["Domain name", b("A human-friendly name like {apex}.", "{apex} jaisa aasaan naam.")], ["IP address", b("The number a network uses to find a device.", "Number jisse network device dhoondhta hai.")]],
  },
  {
    id: "browser-cache", phase: "2 · Browser cache", at: 0,
    title: b("The browser checks its own memory", "Browser apni memory check karta hai"),
    plain: b("If the browser looked this name up recently, it reuses the answer.", "Agar browser ne haal hi mein yeh naam dhoondha tha, toh wahi answer use karta hai."),
    detail: b(
      "Browsers keep a small DNS cache. Each saved answer has a TTL (time to live) that says how long it may be reused. If the entry is still valid, the lookup ends here and no network traffic is needed. If it is missing or expired, the browser moves on to the operating system.",
      "Browsers ek chhota DNS cache rakhte hain. Har saved answer ka TTL (time to live) hota hai jo batata hai kitni der reuse ho sakta hai. Entry valid ho toh lookup yahin khatam, network traffic nahi lagta. Entry na ho ya expire ho gayi ho toh browser operating system ke paas jaata hai."
    ),
    icons: ["💻", "🗃️", "🔢"],
    flow: [b("Browser"), b("Browser cache\nHit or miss?", "Browser cache\nHit ya miss?"), b("Saved IP\nor go on", "Saved IP\nya aage")],
    msg: ["Browser cache:", "  {domain} → {ip}   (saved 40 s ago, TTL 300 s)", "  HIT  → skip DNS and connect", "  MISS → continue to step 3"],
    analogy: b("Checking your phone's recent calls before searching the phone book.", "Phone book dekhne se pehle recent calls check karna."),
    remember: b("A valid cached answer means no DNS traffic at all.", "Valid cached answer ka matlab DNS traffic hi nahi."),
    story: b("You opened {brand} earlier today and the TTL hasn't ended yet? Chrome still remembers the IP, so it connects at once with no DNS question. That is why reopening a site feels faster.",
      "Aapne aaj pehle {brand} khola tha aur TTL abhi khatam nahi hua? Chrome ko IP yaad hai, toh bina DNS sawaal ke turant connect ho jaata hai. Isi wajah se site dobara kholna tez lagta hai."),
    terms: [["Cache", b("A saved copy to reuse later.", "Baad mein reuse ke liye saved copy.")], ["TTL", b("How many seconds an answer may be reused.", "Answer kitne seconds reuse ho sakta hai.")]],
  },
  {
    id: "os-stub", phase: "3 · Operating system", at: 0,
    title: b("The operating system takes over", "Operating system kaam sambhalta hai"),
    plain: b("The OS checks the hosts file, its own cache, then picks a resolver to ask.", "OS hosts file, apna cache check karta hai, phir kisi resolver ko chunta hai."),
    detail: b(
      "The browser asks the OS's small built-in DNS client, called the stub resolver. It first reads the hosts file (a local list where you can pin names to IPs), then checks the OS cache. If both miss, it sends the question to the resolver set in your network settings. That resolver is often your home router, your ISP's server, or a public one such as 8.8.8.8 or 1.1.1.1.",
      "Browser OS ke chhote built-in DNS client se poochta hai, jise stub resolver kehte hain. Woh pehle hosts file padhta hai (local list jisme naam ko IP se pin kar sakte ho), phir OS cache dekhta hai. Dono miss hon toh sawaal us resolver ko bhejta hai jo network settings mein set hai. Woh aksar home router, ISP ka server ya 8.8.8.8 / 1.1.1.1 jaisa public resolver hota hai."
    ),
    icons: ["📄", "🗃️", "🧭"],
    flow: [b("hosts file\nLocal list", "hosts file\nLocal list"), b("OS cache\nSaved answers", "OS cache\nSaved answers"), b("Pick resolver\nFrom settings", "Resolver chuno\nSettings se")],
    msg: ["1. hosts file:  no entry for {domain}", "2. OS DNS cache: empty", "3. Configured resolver: 8.8.8.8  (example)"],
    reveal: { resolver: "8.8.8.8" },
    analogy: b("First your personal notes, then your recent calls, then you ask a directory service.", "Pehle personal notes, phir recent calls, phir directory service."),
    remember: b("The stub resolver only asks; it doesn't do the full search.", "Stub resolver sirf poochta hai; poori khoj nahi karta."),
    story: b("Chrome doesn't know, so your phone's OS looks. Whether you're on home Wi-Fi or mobile data, your network gives you a DNS resolver, and the OS uses that one.",
      "Chrome ko nahi pata, toh phone ka OS dekhta hai. Home Wi-Fi ho ya mobile data, network aapko ek DNS resolver deta hai, aur OS wahi use karta hai."),
    terms: [["Stub resolver", b("The OS's small DNS client.", "OS ka chhota DNS client.")], ["hosts file", b("A local name → IP list checked first.", "Local naam → IP list jo pehle dekhi jaati hai.")]],
  },
  {
    id: "send-query", phase: "4 · Send the question", at: 1,
    title: b("The question travels to the resolver", "Sawaal resolver tak jaata hai"),
    plain: b("A tiny message asks the resolver: \"What is the A record for {domain}?\"", "Ek chhota message resolver se poochta hai: \"{domain} ka A record kya hai?\""),
    detail: b(
      "The DNS question is very small. It says: name = {domain}, type = A (IPv4; AAAA is IPv6), class = IN (internet), and the rd flag (recursion desired), which means \"please do the whole search for me\". Classic DNS sends it as a UDP packet to port 53, wrapped in an IP packet and a frame just like any other data. Some browsers use DNS over HTTPS instead, hiding the question inside HTTPS.",
      "DNS ka sawaal bahut chhota hota hai. Usme hota hai: name = {domain}, type = A (IPv4; AAAA IPv6 ke liye), class = IN (internet), aur rd flag (recursion desired) jiska matlab hai \"poori khoj mere liye karo\". Classic DNS ise UDP packet mein port 53 par bhejta hai, aur baaki data ki tarah IP packet aur frame mein wrap hota hai. Kuch browsers DNS over HTTPS use karte hain jisme sawaal HTTPS ke andar chhupa hota hai."
    ),
    icons: ["💻", "📨", "🧭"],
    flow: [b("Your device\nSource IP", "Aapka device\nSource IP"), b("UDP packet\nPort 53"), b("Resolver\n8.8.8.8")],
    msg: [";; QUESTION", "{domain}.   IN   A", ";; flags: rd   (recursion desired)", "transport: UDP → 8.8.8.8 : 53"],
    analogy: b("Handing a short written question to a librarian.", "Librarian ko chhota likha hua sawaal dena."),
    remember: b("A DNS question is tiny: name + type.", "DNS sawaal chhota hota hai: name + type."),
    story: b("Your phone sends a tiny message: \"What is the IP of {domain}?\" It leaves through your Wi-Fi router and reaches the resolver run by your internet provider (or a public one like 8.8.8.8).",
      "Phone chhota message bhejta hai: \"{domain} ka IP kya hai?\" Yeh aapke Wi-Fi router se hokar aapke internet provider ke resolver (ya 8.8.8.8 jaise public resolver) tak jaata hai."),
    terms: [["A record", b("Name → IPv4 address.", "Naam → IPv4 address.")], ["AAAA record", b("Name → IPv6 address.", "Naam → IPv6 address.")]],
  },
  {
    id: "resolver-cache", phase: "5 · Resolver's memory", at: 1,
    title: b("The recursive resolver checks its cache", "Recursive resolver apna cache check karta hai"),
    plain: b("The resolver serves thousands of people, so it often already knows the answer.", "Resolver hazaaron logon ko serve karta hai, isliye aksar answer pehle se pata hota hai."),
    detail: b(
      "The resolver's job is to find the answer for you. Because many people ask for popular names, its cache often already holds the final answer, and the lookup ends in a few milliseconds. On a full miss, it usually still remembers useful pieces, such as which servers handle .{tld}. So it can skip the root server and start lower down.",
      "Resolver ka kaam aapke liye answer dhoondhna hai. Popular names bahut log poochte hain, isliye cache mein final answer aksar mil jaata hai aur lookup kuch milliseconds mein khatam. Poora miss ho toh bhi useful pieces yaad rehte hain, jaise .{tld} ko kaunse servers sambhalte hain. Isliye woh root server skip karke neeche se shuru kar sakta hai."
    ),
    icons: ["🧭", "🗃️", "⏭️"],
    flow: [b("Resolver"), b("Cache check\nAnswer saved?", "Cache check\nAnswer saved?"), b("Hit: reply now\nMiss: search", "Hit: reply\nMiss: khoj")],
    msg: ["Resolver cache:", "  {domain} A     → MISS", "  {tld}. NS records       → HIT (saved 6 h ago)", "  → skip the root server, ask a .{tld} server"],
    analogy: b("A librarian who remembers the popular books' shelves.", "Librarian jise popular books ki shelf yaad hai."),
    remember: b("Recursive resolver = does the whole search for you.", "Recursive resolver = aapke liye poori khoj karta hai."),
    story: b("Your provider's resolver works for lakhs of people, and many of them open {brand} every day. So most of the time it already has the answer for {apex}, and you get it in a few milliseconds.",
      "Aapke provider ka resolver lakhon logon ke liye kaam karta hai, aur unme se kai roz {brand} kholte hain. Isliye zyada tar baar {apex} ka answer uske paas pehle se hota hai aur aapko milliseconds mein mil jaata hai."),
    terms: [["Recursive resolver", b("The server that searches on your behalf.", "Woh server jo aapke liye khoj karta hai.")], ["Millisecond", b("One thousandth of a second.", "Second ka hazaarvaan hissa.")]],
  },
  {
    id: "root-server", phase: "6 · Root servers", at: 2,
    title: b("The root points to .{tld}", "Root .{tld} ki taraf bhejta hai"),
    plain: b("The root server doesn't know the IP, but it knows who runs .{tld}.", "Root server ko IP nahi pata, par yeh pata hai ki .{tld} kaun sambhalta hai."),
    detail: b(
      "The resolver now searches step by step (this is called iterative). There are 13 named root server addresses (a to m), each served by many machines worldwide. The root doesn't hold {domain}. It answers with a referral: \"ask the servers for .{tld}\", plus their names and IPs (glue records) so the resolver can contact them right away.",
      "Ab resolver step by step khoj karta hai (ise iterative kehte hain). Root server ke 13 named addresses hain (a se m), har ek duniya bhar ki kai machines par chalta hai. Root ke paas {domain} nahi hota. Woh referral deta hai: \"lo .{tld} ke servers se poochho\", saath mein unke naam aur IP (glue records) taaki resolver turant contact kar sake."
    ),
    icons: ["🧭", "🌍", "➡️"],
    flow: [b("Resolver\nAsks root", "Resolver\nRoot se poochta"), b("Root server\n\"Not me…\"", "Root server\n\"Main nahi…\""), b(".{tld} servers\nAsk them", ".{tld} servers\nUnse poochho")],
    msg: ["Q: {domain} A?   → a.root-servers.net", "A: I don't know. Ask .{tld}:", "AUTHORITY   {tld}.  NS  {tldNs}", "ADDITIONAL  {tldNs}  A  {tldIp}"],
    analogy: b("A city help desk that doesn't know the shop but tells you which district to go to.", "City help desk dukaan nahi jaanta, par batata hai kaunse ilaake mein jaana hai."),
    remember: b("The root gives directions, not the final answer.", "Root raasta batata hai, final answer nahi."),
    story: b("Imagine the resolver knows nothing about {apex}. The root says: \"{apex} isn't mine, but ask the .{tld} servers.\" {tldNote}",
      "Maan lo resolver ko {apex} ke baare mein kuch nahi pata. Root kehta hai: \"{apex} mere paas nahi, .{tld} ke servers se poochho.\" {tldNote}"),
    terms: [["Root server", b("The top of the DNS tree.", "DNS tree ka sabse upar ka hissa.")], ["Referral", b("\"I don't know, ask them.\"", "\"Mujhe nahi pata, unse poochho.\"")]],
  },
  {
    id: "tld-server", phase: "7 · TLD servers", at: 2,
    title: b("The .{tld} server points to the domain's own servers", "Server .{tld} domain ke apne servers ki taraf bhejta hai"),
    plain: b("The .{tld} servers know who is in charge of {apex}.", "Server .{tld} ko pata hai {apex} kaun sambhalta hai."),
    detail: b(
      "TLD means top-level domain (.com, .org, .in). The .{tld} servers keep a list of every .{tld} domain and the name servers that manage it. They still don't hold the IP address of {domain}. They reply with another referral: the authoritative name servers for {apex}.",
      "TLD ka matlab top-level domain (.com, .org, .in). .{tld} servers ke paas har .{tld} domain ki list aur unhe manage karne wale name servers hote hain. Unke paas bhi {domain} ka IP nahi hota. Woh ek aur referral dete hain: {apex} ke authoritative name servers."
    ),
    icons: ["🧭", "🏛️", "➡️"],
    flow: [b("Resolver\nAsks .{tld}", "Resolver\n.{tld} se poochta"), b(".{tld} server\n\"Ask these…\"", ".{tld} server\n\"Inse poochho…\""), b("{apex}'s\nname servers", "{apex} ke\nname servers")],
    msg: ["Q: {domain} A?   → {tldNs}", "A: Not mine. Ask {apex}'s servers:", "AUTHORITY   {apex}.  NS  {authNs}", "ADDITIONAL  {authNs}  A  {authIp}"],
    analogy: b("The district office doesn't know the shop's phone but knows which manager does.", "District office dukaan ka number nahi jaanta par manager ka pata hai."),
    remember: b("TLD servers know which name servers manage each domain.", "TLD servers jaante hain har domain kaunse name servers sambhalte hain."),
    story: b("The .{tld} servers know who looks after {apex}'s DNS records. Big companies usually run their own name servers or use a large DNS provider, and the .{tld} server hands over their names.",
      "Server .{tld} ko pata hai {apex} ke DNS records kaun sambhalta hai. Badi companies aksar apne name servers chalati hain ya kisi bade DNS provider ko use karti hain, aur .{tld} server unke naam de deta hai."),
    terms: [["TLD", b("The last part of a domain: .com, .org, .in.", "Domain ka aakhri hissa: .com, .org, .in.")], ["Name server", b("A server that holds DNS records.", "DNS records rakhne wala server.")]],
  },
  {
    id: "authoritative", phase: "8 · The real answer", at: 3,
    title: b("The authoritative server gives the answer", "Authoritative server asli answer deta hai"),
    plain: b("Finally, the server that owns the records returns the IP address.", "Aakhir mein records ka malik server IP address deta hai."),
    detail: b(
      "The authoritative server is the source of truth for {apex}. The domain owner edits its records. It replies with the answer and the aa flag (authoritative answer). An A record gives IPv4 and AAAA gives IPv6, each with a TTL. If www is a CNAME (an alias), the reply points to another name, such as web.example.net, and the resolver must look that name up too. The IPs here are documentation examples.",
      "Authoritative server {apex} ka source of truth hai. Domain owner iske records edit karta hai. Woh answer aur aa flag (authoritative answer) ke saath reply karta hai. A record IPv4 deta hai, AAAA IPv6, dono ke saath TTL. Agar www CNAME (alias) hai toh reply kisi doosre naam, jaise web.example.net, ki taraf point karta hai aur resolver ko woh naam bhi dhoondhna padta hai. Yahan ke IP sirf example hain."
    ),
    icons: ["📚", "📄", "🔢"],
    flow: [b("Authoritative\nDNS server", "Authoritative\nDNS server"), b("DNS record\nA / AAAA", "DNS record\nA / AAAA"), b("IP address\n{ip}", "IP address\n{ip}")],
    msg: [";; flags: qr aa   (authoritative answer)", "{domain}.  300  IN  A     {ip}", "{domain}.  300  IN  AAAA  {ip6}", "(alias case:  www  CNAME  web.example.net.  → look that name up too)"],
    reveal: { ip: "{ip}" },
    analogy: b("The shop owner themselves gives you the phone number.", "Dukaan ka malik khud phone number deta hai."),
    remember: b("Authoritative = the official source for that domain's records.", "Authoritative = us domain ke records ka official source."),
    story: b("Now the resolver asks {brand}'s own DNS servers. Big shopping sites usually have many servers or a CDN, so the answer can be the IP of a server near you. Someone in India and someone in the US can get different IPs for the same name. (The IP shown here is only an example.)",
      "Ab resolver {brand} ke apne DNS servers se poochta hai. Bade shopping sites ke paas aksar bahut saare servers ya CDN hote hain, isliye answer aapke paas ke server ka IP ho sakta hai. India aur US ke user ko same naam par alag IP mil sakte hain. (Yahan dikhaya IP sirf example hai.)"),
    terms: [["Authoritative", b("The official owner of the records.", "Records ka official malik.")], ["CNAME", b("An alias that points to another name.", "Ek alias jo doosre naam ki taraf point karta hai.")]],
  },
  {
    id: "return-cache", phase: "9 · Answer comes back", at: 1,
    title: b("The answer is returned and saved", "Answer wapas aata hai aur save hota hai"),
    plain: b("The resolver gives the IP to your device and keeps a copy until the TTL ends.", "Resolver IP aapke device ko deta hai aur TTL khatam hone tak copy rakhta hai."),
    detail: b(
      "The resolver sends the answer back to your OS, which hands it to the browser. Every layer saves it for the TTL. After 300 seconds the copies expire, and the next lookup starts again. Failures are cached too: NXDOMAIN (the name doesn't exist) is remembered briefly, so the same mistake isn't looked up again and again. Short TTLs let a site move servers quickly; long TTLs reduce lookups.",
      "Resolver answer OS ko bhejta hai, OS browser ko deta hai. Har layer TTL tak use save karti hai. 300 seconds baad copies expire hoti hain aur agla lookup phir shuru hota hai. Failures bhi cache hote hain: NXDOMAIN (naam exist nahi karta) thodi der yaad rehta hai, taaki wahi galti baar baar na dhoondhi jaye. Chhota TTL site ko jaldi server badalne deta hai; bada TTL lookups kam karta hai."
    ),
    icons: ["🧭", "💾", "💻"],
    flow: [b("Resolver\nReplies", "Resolver\nReply karta"), b("Saved\nTTL 300 s", "Save hua\nTTL 300 s"), b("OS + browser\nGet the IP", "OS + browser\nKo IP mila")],
    msg: ["Resolver → device:  {domain}  A  {ip}   TTL 300", "Saved by: resolver, OS, browser  (each for up to 300 s)", "Bad name?  NXDOMAIN is cached briefly too"],
    analogy: b("You save the number in your contacts, but re-check it if it might have changed.", "Number contacts mein save karte ho, par badalne ka shak ho toh dobara check karte ho."),
    remember: b("TTL says how long a saved answer stays valid.", "TTL batata hai saved answer kitni der valid hai."),
    story: b("The resolver hands the IP to your phone and remembers it until the TTL ends. Next time {brand} loads with no DNS wait. A short TTL lets a company move traffic to other servers quickly; a long TTL means fewer lookups.",
      "Resolver IP aapke phone ko deta hai aur TTL khatam hone tak yaad rakhta hai. Agli baar {brand} bina DNS wait ke khulta hai. Chhota TTL company ko traffic jaldi doosre servers par mod dene deta hai; bada TTL matlab kam lookups."),
    terms: [["NXDOMAIN", b("\"That name does not exist.\"", "\"Yeh naam exist nahi karta.\"")], ["Expire", b("When a cached answer becomes too old.", "Jab cached answer bahut purana ho jaata hai.")]],
  },
  {
    id: "connect", phase: "10 · Connect", at: 0,
    title: b("Now the browser connects", "Ab browser connect karta hai"),
    plain: b("With an IP in hand, the browser opens a connection and asks for the page.", "IP milne par browser connection kholta hai aur page maangta hai."),
    detail: b(
      "The browser may try IPv6 and IPv4 almost at the same time and use whichever connects first (this is called Happy Eyeballs). Then it opens a TCP connection to port 443, does the TLS handshake and sends the HTTP request. DNS's job ended when the IP arrived. Everything after this is the HTTP lesson.",
      "Browser IPv6 aur IPv4 lagbhag ek saath try kar sakta hai aur jo pehle connect ho use use karta hai (ise Happy Eyeballs kehte hain). Phir port 443 par TCP connection kholta hai, TLS handshake karta hai aur HTTP request bhejta hai. IP milte hi DNS ka kaam khatam. Iske baad sab HTTP lesson hai."
    ),
    icons: ["💻", "🤝", "🗄️"],
    flow: [b("Browser\nHas the IP", "Browser\nKe paas IP hai"), b("TCP + TLS\nPort 443"), b("Web server\nSends the page", "Web server\nPage bhejta hai")],
    msg: ["Try IPv6 and IPv4 at nearly the same time", "TCP  → {ip} : 443", "TLS handshake → HTTP GET /"],
    analogy: b("You have the phone number; now you actually make the call.", "Number mil gaya; ab asal mein call karte ho."),
    remember: b("DNS finds the address. HTTP fetches the page.", "DNS address dhoondhta hai. HTTP page laata hai."),
    story: b("As soon as it has the IP, your phone opens a secure connection to {brand}'s server and asks for the home page, product lists and photos. The HTTP lesson starts here.",
      "IP milte hi phone {brand} ke server se secure connection kholta hai aur home page, product lists aur photos maangta hai. HTTP lesson yahin se shuru hota hai."),
    terms: [["Port 443", b("The default HTTPS door.", "Default HTTPS darwaza.")], ["Happy Eyeballs", b("Trying IPv6 and IPv4 together, keeping the faster.", "IPv6 aur IPv4 ek saath try karke tez wala rakhna.")]],
  },
  {
    id: "debug", phase: "11 · Try it yourself", at: 0,
    title: b("See a real DNS lookup yourself", "Khud asli DNS lookup dekho"),
    plain: b("Two commands let you watch the same journey on your own computer.", "Do commands se aap apne computer par yahi safar dekh sakte ho."),
    detail: b(
      "nslookup shows the answer your resolver gives. dig with +trace repeats the whole journey itself, from the root to the authoritative server, and prints each referral. Common errors: NXDOMAIN means the name doesn't exist (often a typo or missing record); SERVFAIL means the resolver could not get a usable answer; a timeout means the resolver or the network didn't reply.",
      "nslookup aapka resolver jo answer deta hai woh dikhata hai. dig +trace poora safar khud repeat karta hai, root se authoritative server tak, aur har referral print karta hai. Common errors: NXDOMAIN ka matlab naam exist nahi karta (aksar typo ya missing record); SERVFAIL ka matlab resolver ko usable answer nahi mila; timeout ka matlab resolver ya network ne reply nahi kiya."
    ),
    icons: ["⌨️", "🔍", "🛠️"],
    flow: [b("nslookup\nQuick answer", "nslookup\nTez answer"), b("dig +trace\nFull journey", "dig +trace\nPoora safar"), b("Read errors\nNXDOMAIN · SERVFAIL", "Errors padho\nNXDOMAIN · SERVFAIL")],
    msg: ["$ nslookup {domain}", "$ dig {domain} +trace   # root → .{tld} → authoritative", "NXDOMAIN = no such name   SERVFAIL = resolver failed"],
    analogy: b("Like tracking a parcel to see every stop instead of just the final result.", "Parcel tracking jaisa: sirf result nahi, har stop dekhna."),
    remember: b("When a site won't load, DNS is one of the first things to check.", "Site na khule toh DNS pehli cheezon mein se ek hai jo check karni chahiye."),
    story: b("If {domain} won't open and Chrome shows DNS_PROBE_FINISHED_NXDOMAIN, no IP was found for that name. It can be a typo (like flipkrat.com) or a DNS problem. Switching to another resolver such as 8.8.8.8 or 1.1.1.1 sometimes fixes it.",
      "Agar {domain} na khule aur Chrome DNS_PROBE_FINISHED_NXDOMAIN dikhaye, toh us naam ka IP nahi mila. Yeh typo (jaise flipkrat.com) ya DNS problem ho sakti hai. 8.8.8.8 ya 1.1.1.1 jaise doosre resolver par switch karna kabhi kabhi theek kar deta hai."),
    terms: [["dig", b("A tool that shows DNS answers in detail.", "DNS answers detail mein dikhane wala tool.")], ["SERVFAIL", b("The resolver couldn't get a usable answer.", "Resolver ko usable answer nahi mila.")]],
  },
];