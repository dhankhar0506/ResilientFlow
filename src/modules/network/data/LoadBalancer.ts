import type { StepText } from "../../../shared/lessonParts";

export type LbNode = "u1" | "u2" | "u3" | "edge" | "lb" | "s1" | "s2" | "s3";
export type LbScene = "diagram" | "cards";

export interface LbPacket {
  id: string;
  from: LbNode;
  to: LbNode;
  t: number;
  label: string;
  /** colour hint */
  kind?: "req" | "hit" | "miss" | "health" | "fail";
}

export interface LbStep {
  id: string;
  phase: string;
  scene: LbScene;
  /** which middle boxes exist in this step */
  edge?: boolean;
  lb?: boolean;
  /** servers shown (s1 only in the "one server" problem) */
  servers: ("s1" | "s2" | "s3")[];
  down?: ("s1" | "s2" | "s3")[];
  hot?: ("s1" | "s2" | "s3")[];
  users: ("u1" | "u2" | "u3")[];
  packets: LbPacket[];
  /** per-server load text */
  load?: Partial<Record<"s1" | "s2" | "s3", string>>;
  cache?: "empty" | "stored";
  /** request log rows: [request, sent to, why] */
  log?: string[][];
  logHot?: number;
  terminal?: string[];
  en: StepText & { cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { cards?: { name: string; text: string; icon?: string }[] };
}

export const LB_LABELS = {
  en: {
    lessonTitle: "Proxy, Load Balancer & CDN",
    heroTitle: "Proxies, load balancers & CDNs: serving millions of users",
    heroSubtitle:
      "See how a reverse proxy spreads requests across servers, skips a dead one, and how a CDN edge near the user answers from its cache.",
    user: "User",
    edge: "CDN edge (Mumbai)",
    lb: "Load balancer",
    server: "Server",
    down: "DOWN",
    cacheEmpty: "cache: empty",
    cacheStored: "cache: logo.png ✓",
    log: "Request log",
    colReq: "Request",
    colTo: "Sent to",
    colWhy: "Why",
  },
  hi: {
    lessonTitle: "Proxy, Load Balancer & CDN",
    heroTitle: "Proxies, load balancers & CDNs: laakhon users ko serve karna",
    heroSubtitle:
      "Dekho reverse proxy requests ko servers mein kaise baantta hai, band server ko kaise skip karta hai, aur user ke paas wala CDN edge cache se kaise jawab deta hai.",
    user: "User",
    edge: "CDN edge (Mumbai)",
    lb: "Load balancer",
    server: "Server",
    down: "DOWN",
    cacheEmpty: "cache: khaali",
    cacheStored: "cache: logo.png ✓",
    log: "Request log",
    colReq: "Request",
    colTo: "Kahan bheja",
    colWhy: "Kyun",
  },
} as const;

const ALL_S: ("s1" | "s2" | "s3")[] = ["s1", "s2", "s3"];
const ALL_U: ("u1" | "u2" | "u3")[] = ["u1", "u2", "u3"];

export const LB_STEPS: LbStep[] = [
  {
    id: "problem",
    phase: "1 · Problem",
    scene: "diagram",
    servers: ["s1"],
    users: ALL_U,
    hot: ["s1"],
    load: { s1: "CPU 100% 🔥" },
    packets: [
      { id: "a", from: "u1", to: "s1", t: 0.55, label: "GET /", kind: "fail" },
      { id: "b", from: "u2", to: "s1", t: 0.55, label: "GET /", kind: "fail" },
      { id: "c", from: "u3", to: "s1", t: 0.55, label: "GET /", kind: "fail" },
    ],
    en: {
      title: "One server can't handle everyone",
      summary: "During a big sale thousands of users hit one server. It slows down, then crashes – and if it dies, the site is gone.",
      detail:
        "A single server has limited CPU, memory and network bandwidth. When traffic spikes it gets slow, then starts timing out. It's also a single point of failure: one crash, one deployment or one hardware fault and the whole site is down. Users far away (say in Europe, when the server is in Mumbai) also suffer high latency on every request. The fix is to put smart middlemen in front of the servers.",
      term: { name: "Single point of failure", meaning: "One component whose failure takes the whole system down." },
    },
    hi: {
      title: "Ek server sabko nahi sambhal sakta",
      summary: "Badi sale mein hazaaron users ek server par aate hain. Woh slow hota hai, phir crash – aur woh gaya toh site gayi.",
      detail:
        "Ek server ke paas limited CPU, memory aur network bandwidth hoti hai. Traffic badhne par woh slow hota hai, phir timeout karne lagta hai. Yeh single point of failure bhi hai: ek crash, ek deployment ya ek hardware fault aur poori site down. Door ke users (jaise Europe mein, jab server Mumbai mein hai) ko har request par zyada latency bhi milti hai. Ilaaj hai servers ke aage smart middlemen lagana.",
      term: { name: "Single point of failure", meaning: "Ek component jiske fail hone se poora system band ho jaaye." },
    },
  },
  {
    id: "proxies",
    phase: "2 · Proxies",
    scene: "cards",
    servers: [],
    users: [],
    packets: [],
    en: {
      title: "Forward proxy vs reverse proxy",
      summary: "A proxy is a middleman that makes requests on someone else's behalf. The question is: on whose behalf?",
      detail:
        "Both sit in the middle and forward traffic, but they protect different sides. Load balancers and CDNs are kinds of reverse proxy.",
      cards: [
        { icon: "🧑‍🏫", name: "Forward proxy (for clients)", text: "Sits in front of users, e.g. a college or office proxy. Websites see the proxy's IP, not yours. Used for filtering, caching, logging, or hiding users." },
        { icon: "🛡️", name: "Reverse proxy (for servers)", text: "Sits in front of servers, e.g. Nginx. Users only see the proxy; the real servers stay hidden. Used for load balancing, TLS, caching and security." },
        { icon: "🔁", name: "Same tech, different side", text: "Nginx, HAProxy or Envoy can be set up as either. What matters is who configured it and who it serves." },
      ],
      analogy: "Forward proxy = your assistant who makes calls for you. Reverse proxy = a company's receptionist who answers for all employees.",
    },
    hi: {
      title: "Forward proxy vs reverse proxy",
      summary: "Proxy ek middleman hai jo kisi aur ki taraf se requests karta hai. Sawaal hai: kiski taraf se?",
      detail:
        "Dono beech mein baith kar traffic forward karte hain, par alag side ko bachate hain. Load balancers aur CDNs reverse proxy ke prakaar hain.",
      cards: [
        { icon: "🧑‍🏫", name: "Forward proxy (clients ke liye)", text: "Users ke aage, jaise college ya office proxy. Websites ko proxy ka IP dikhta hai, aapka nahi. Filtering, caching, logging ya users chhupane ke liye." },
        { icon: "🛡️", name: "Reverse proxy (servers ke liye)", text: "Servers ke aage, jaise Nginx. Users ko sirf proxy dikhta hai; asli servers chhupe rehte hain. Load balancing, TLS, caching aur security ke liye." },
        { icon: "🔁", name: "Same tech, alag side", text: "Nginx, HAProxy ya Envoy dono tarah set ho sakte hain. Fark yeh hai ki kisne configure kiya aur kise serve karta hai." },
      ],
      analogy: "Forward proxy = aapka assistant jo aapke liye call karta hai. Reverse proxy = company ka receptionist jo saare employees ke liye jawab deta hai.",
    },
  },
  {
    id: "reverse",
    phase: "3 · Reverse proxy",
    scene: "diagram",
    lb: true,
    servers: ALL_S,
    users: ["u1"],
    packets: [{ id: "a", from: "u1", to: "lb", t: 0.55, label: "HTTPS shop.example", kind: "req" }],
    en: {
      title: "Put a reverse proxy / load balancer in front",
      summary: "DNS for shop.example now points to the load balancer. Users never talk to the servers directly.",
      detail:
        "The load balancer has the public IP; the three app servers sit on a private network. Besides spreading traffic, this single entry point is the natural place to terminate TLS (decrypt HTTPS once, so servers don't have to), add security headers, rate-limit abusive clients, compress responses and log everything. You can add or remove servers behind it without users noticing.",
      points: ["One public IP, many private servers", "TLS termination at the edge", "Servers can be added, removed or updated without downtime"],
    },
    hi: {
      title: "Aage ek reverse proxy / load balancer lagao",
      summary: "shop.example ka DNS ab load balancer ki taraf hai. Users servers se seedha baat nahi karte.",
      detail:
        "Public IP load balancer ke paas hai; teen app servers private network par hain. Traffic baantne ke alawa yahi ek entry point TLS terminate karne (HTTPS ek baar decrypt, servers ko nahi karna padta), security headers jodne, gadbad clients ko rate-limit karne, responses compress karne aur sab log karne ki sahi jagah hai. Peeche servers jodo ya hatao, users ko pata nahi chalega.",
      points: ["Ek public IP, kai private servers", "Edge par TLS termination", "Bina downtime servers jodo, hatao ya update karo"],
    },
  },
  {
    id: "rr-1",
    phase: "4 · Round robin",
    scene: "diagram",
    lb: true,
    servers: ALL_S,
    users: ALL_U,
    hot: ["s1"],
    packets: [{ id: "a", from: "lb", to: "s1", t: 0.55, label: "req #1", kind: "req" }],
    log: [["#1 · User 1", "Server 1", "round robin: 1 → 2 → 3 → 1 …"]],
    logHot: 0,
    en: {
      title: "Round robin: take turns",
      summary: "Request 1 goes to server 1. The next goes to server 2, then server 3, then back to 1.",
      detail:
        "The simplest load-balancing algorithm is round robin: each new request (or connection) goes to the next server in the list. With identical servers and similar requests, the load spreads evenly and each server handles one-third of the traffic.",
      term: { name: "Load balancer", meaning: "A reverse proxy that distributes incoming requests across several servers." },
    },
    hi: {
      title: "Round robin: baari-baari",
      summary: "Request 1 server 1 ko. Agla server 2 ko, phir server 3, phir wapas 1.",
      detail:
        "Sabse simple load-balancing algorithm round robin hai: har nayi request (ya connection) list ke agle server ko jaati hai. Same servers aur milti-julti requests ke saath load barabar baantta hai aur har server ek-tihaai traffic sambhalta hai.",
      term: { name: "Load balancer", meaning: "Reverse proxy jo aane wali requests ko kai servers mein baantta hai." },
    },
  },
  {
    id: "rr-3",
    phase: "5 · Spread",
    scene: "diagram",
    lb: true,
    servers: ALL_S,
    users: ALL_U,
    hot: ALL_S,
    load: { s1: "33%", s2: "33%", s3: "33%" },
    packets: [
      { id: "a", from: "lb", to: "s1", t: 0.55, label: "#1", kind: "req" },
      { id: "b", from: "lb", to: "s2", t: 0.55, label: "#2", kind: "req" },
      { id: "c", from: "lb", to: "s3", t: 0.55, label: "#3", kind: "req" },
    ],
    log: [
      ["#1 · User 1", "Server 1", "turn of server 1"],
      ["#2 · User 2", "Server 2", "turn of server 2"],
      ["#3 · User 3", "Server 3", "turn of server 3"],
    ],
    en: {
      title: "Three users, three servers, even load",
      summary: "Each server now does a third of the work. Need more capacity? Add server 4.",
      detail:
        "This is horizontal scaling: instead of buying one gigantic machine (vertical scaling), you add more ordinary servers behind the load balancer. For this to work, the servers should be stateless – user sessions are kept in a shared store (Redis, database, or a signed cookie), so any server can handle any request.",
      points: ["Vertical scaling = bigger machine (has a ceiling)", "Horizontal scaling = more machines (needs a load balancer)", "Keep app servers stateless"],
    },
    hi: {
      title: "Teen users, teen servers, barabar load",
      summary: "Ab har server ek-tihaai kaam karta hai. Aur capacity chahiye? Server 4 jodo.",
      detail:
        "Yeh horizontal scaling hai: ek bahut badi machine kharidne (vertical scaling) ki jagah load balancer ke peeche aur normal servers jodo. Iske liye servers stateless hone chahiye – user sessions shared store (Redis, database, ya signed cookie) mein rakhe jaate hain, taaki koi bhi server koi bhi request sambhal sake.",
      points: ["Vertical scaling = badi machine (limit hai)", "Horizontal scaling = zyada machines (load balancer chahiye)", "App servers stateless rakho"],
    },
  },
  {
    id: "health",
    phase: "6 · Health checks",
    scene: "diagram",
    lb: true,
    servers: ALL_S,
    users: ALL_U,
    down: ["s2"],
    hot: ["s1", "s3"],
    load: { s1: "50%", s3: "50%" },
    packets: [
      { id: "a", from: "lb", to: "s2", t: 0.3, label: "GET /health ✗", kind: "health" },
      { id: "b", from: "lb", to: "s3", t: 0.62, label: "#4 → skip 2", kind: "req" },
    ],
    log: [
      ["#1 · User 1", "Server 1", "turn of server 1"],
      ["#2 · User 2", "Server 2", "turn of server 2"],
      ["#3 · User 3", "Server 3", "turn of server 3"],
      ["#4 · User 1", "Server 3", "server 2 failed health check → skipped"],
    ],
    logHot: 3,
    en: {
      title: "Server 2 crashes – users don't notice",
      summary: "The load balancer checks /health every few seconds. Server 2 stops answering, so it's taken out of rotation.",
      detail:
        "Every few seconds the load balancer sends a health check to each server (e.g. GET /health expecting 200 OK). After a few failures, server 2 is marked DOWN and no new requests go to it; servers 1 and 3 share the load. When server 2 recovers and passes checks again, it's added back automatically. This is how sites stay up during crashes and during rolling deployments (update one server at a time).",
      term: { name: "Health check", meaning: "A periodic test the load balancer runs to decide whether a server should receive traffic." },
      remember: "Load balancing gives you both capacity (more servers) and availability (survive failures).",
    },
    hi: {
      title: "Server 2 crash – users ko pata bhi nahi",
      summary: "Load balancer har kuch second /health check karta hai. Server 2 jawab dena band karta hai, toh rotation se hata diya jaata hai.",
      detail:
        "Har kuch second load balancer har server ko health check bhejta hai (jaise GET /health, 200 OK expect karta hai). Kuch failures ke baad server 2 DOWN mark hota hai aur use nayi requests nahi jaati; server 1 aur 3 load baant lete hain. Server 2 theek hokar checks pass kare toh apne-aap wapas jud jaata hai. Isi tarah sites crashes aur rolling deployments (ek-ek server update) mein bhi chalti rehti hain.",
      term: { name: "Health check", meaning: "Periodic test jisse load balancer decide karta hai ki server ko traffic milna chahiye ya nahi." },
      remember: "Load balancing capacity (zyada servers) aur availability (failure jhel lena) dono deta hai.",
    },
  },
  {
    id: "algorithms",
    phase: "7 · Algorithms",
    scene: "cards",
    servers: [],
    users: [],
    packets: [],
    en: {
      title: "Other ways to choose a server",
      summary: "Round robin is just the start. Pick the algorithm that fits your traffic.",
      detail: "Real load balancers offer several strategies:",
      cards: [
        { icon: "🔄", name: "Round robin / weighted", text: "Take turns. Weights send more to bigger servers (e.g. 2:1:1)." },
        { icon: "📉", name: "Least connections", text: "Send to the server with the fewest active connections – good when requests take very different times." },
        { icon: "🧬", name: "IP hash", text: "Hash the client IP so the same user usually lands on the same server." },
        { icon: "🍪", name: "Sticky sessions", text: "A cookie pins a user to one server. Convenient for old stateful apps, but uneven load and lost sessions if that server dies." },
      ],
    },
    hi: {
      title: "Server chunne ke aur tareeke",
      summary: "Round robin bas shuruaat hai. Traffic ke hisaab se algorithm chuno.",
      detail: "Asli load balancers kai strategies dete hain:",
      cards: [
        { icon: "🔄", name: "Round robin / weighted", text: "Baari-baari. Weights bade servers ko zyada bhejte hain (jaise 2:1:1)." },
        { icon: "📉", name: "Least connections", text: "Jis server par sabse kam active connections hon use bhejo – jab requests ka time bahut alag ho." },
        { icon: "🧬", name: "IP hash", text: "Client IP ka hash, taaki same user aksar same server par jaaye." },
        { icon: "🍪", name: "Sticky sessions", text: "Cookie user ko ek server se jod deti hai. Purane stateful apps ke liye aasaan, par load uneven aur woh server gaya toh session gaya." },
      ],
    },
  },
  {
    id: "l4-l7",
    phase: "8 · L4 vs L7",
    scene: "cards",
    servers: [],
    users: [],
    packets: [],
    en: {
      title: "Layer 4 vs Layer 7 load balancing",
      summary: "L4 looks at IPs and ports. L7 reads the HTTP request itself.",
      detail: "Remember the OSI layers lesson – the number tells you how deep the load balancer looks into each request.",
      cards: [
        { icon: "4️⃣", name: "Layer 4 (transport)", text: "Decides by IP + TCP/UDP port, forwards the connection untouched. Very fast, protocol-agnostic. E.g. AWS NLB, HAProxy in TCP mode." },
        { icon: "7️⃣", name: "Layer 7 (application)", text: "Terminates TLS and reads URL, headers, cookies: /api → API servers, /images → storage, mobile users → v2. E.g. Nginx, AWS ALB, Envoy." },
      ],
      remember: "Need routing by URL or header? Layer 7. Need raw speed for any TCP/UDP protocol? Layer 4.",
    },
    hi: {
      title: "Layer 4 vs Layer 7 load balancing",
      summary: "L4 IPs aur ports dekhta hai. L7 HTTP request khud padhta hai.",
      detail: "OSI layers lesson yaad karo – number batata hai load balancer har request mein kitna gehra dekhta hai.",
      cards: [
        { icon: "4️⃣", name: "Layer 4 (transport)", text: "IP + TCP/UDP port se decide, connection bina chhede forward. Bahut tez, kisi bhi protocol ke liye. Jaise AWS NLB, TCP mode mein HAProxy." },
        { icon: "7️⃣", name: "Layer 7 (application)", text: "TLS terminate karke URL, headers, cookies padhta hai: /api → API servers, /images → storage, mobile users → v2. Jaise Nginx, AWS ALB, Envoy." },
      ],
      remember: "URL ya header se routing chahiye? Layer 7. Kisi bhi TCP/UDP protocol ke liye raw speed? Layer 4.",
    },
  },
  {
    id: "cdn-miss",
    phase: "9 · CDN: miss",
    scene: "diagram",
    edge: true,
    lb: true,
    servers: ALL_S,
    users: ["u1"],
    cache: "stored",
    hot: ["s1"],
    packets: [
      { id: "a", from: "u1", to: "edge", t: 0.5, label: "GET /logo.png", kind: "req" },
      { id: "b", from: "edge", to: "lb", t: 0.55, label: "MISS → fetch", kind: "miss" },
    ],
    log: [["User 1 · /logo.png", "Edge → origin", "cache MISS · 180 ms · now stored at the edge"]],
    logHot: 0,
    en: {
      title: "CDN: the first request is a cache miss",
      summary: "User 1 in Pune asks the nearby Mumbai edge for logo.png. The edge doesn't have it yet, fetches it from the origin and keeps a copy.",
      detail:
        "A Content Delivery Network has hundreds of edge servers around the world. DNS sends each user to a nearby edge. The first time anyone near Mumbai asks for /logo.png, the edge has no copy (cache miss), so it requests it from your origin (the load balancer and servers), returns it to the user, and stores it for as long as the Cache-Control header allows.",
      term: { name: "CDN", meaning: "Content Delivery Network – a worldwide set of caching reverse proxies that serve content from close to the user." },
    },
    hi: {
      title: "CDN: pehli request cache miss hoti hai",
      summary: "Pune ka User 1 paas ke Mumbai edge se logo.png maangta hai. Edge ke paas abhi nahi hai, origin se laata hai aur copy rakh leta hai.",
      detail:
        "Content Delivery Network ke duniya bhar mein saikdon edge servers hote hain. DNS har user ko paas ke edge par bhejta hai. Mumbai ke paas koi pehli baar /logo.png maange toh edge ke paas copy nahi hoti (cache miss), isliye woh aapke origin (load balancer aur servers) se maangta hai, user ko deta hai, aur Cache-Control header jitni der allow kare utni der store karta hai.",
      term: { name: "CDN", meaning: "Content Delivery Network – duniya bhar ke caching reverse proxies jo user ke paas se content dete hain." },
    },
  },
  {
    id: "cdn-hit",
    phase: "10 · CDN: hit",
    scene: "diagram",
    edge: true,
    lb: true,
    servers: ALL_S,
    users: ["u2", "u3"],
    cache: "stored",
    packets: [
      { id: "a", from: "edge", to: "u2", t: 0.5, label: "HIT · 8 ms", kind: "hit" },
      { id: "b", from: "edge", to: "u3", t: 0.55, label: "HIT · 9 ms", kind: "hit" },
    ],
    log: [
      ["User 1 · /logo.png", "Edge → origin", "cache MISS · 180 ms"],
      ["User 2 · /logo.png", "Edge cache", "cache HIT · 8 ms · origin not contacted"],
      ["User 3 · /logo.png", "Edge cache", "cache HIT · 9 ms · origin not contacted"],
    ],
    logHot: 1,
    en: {
      title: "Next users: cache hit – fast, and the origin rests",
      summary: "Users 2 and 3 get logo.png straight from the Mumbai edge in a few milliseconds. Your servers aren't touched.",
      detail:
        "This is why CDNs are so powerful: latency drops because the data travels a short distance, and your origin handles a tiny fraction of the traffic. CDNs are perfect for images, CSS, JS bundles, fonts and videos – and with the right headers even for API responses. Most CDNs also absorb DDoS attacks and add a WAF. When you deploy a new version, you either use new file names (app.3f9c.js) or purge the cache.",
      points: ["Cache-Control: public, max-age=31536000 → cache for a year", "Hashed file names make updates safe", "Purge/invalidate when content changes"],
      remember: "CDN = cache near users. Load balancer = spread work across servers. Usually you use both.",
    },
    hi: {
      title: "Agle users: cache hit – tez, aur origin aaram se",
      summary: "User 2 aur 3 ko logo.png seedha Mumbai edge se kuch milliseconds mein milta hai. Aapke servers ko chhuna bhi nahi padta.",
      detail:
        "Isliye CDN itne powerful hain: data kam doori tay karta hai toh latency girti hai, aur origin traffic ka bahut chhota hissa sambhalta hai. CDN images, CSS, JS bundles, fonts aur videos ke liye perfect hain – sahi headers ke saath API responses ke liye bhi. Zyada tar CDNs DDoS attacks bhi jhel lete hain aur WAF bhi dete hain. Naya version deploy karo toh ya naye file names (app.3f9c.js) use karo ya cache purge karo.",
      points: ["Cache-Control: public, max-age=31536000 → ek saal cache", "Hashed file names se updates safe", "Content badle toh purge/invalidate karo"],
      remember: "CDN = users ke paas cache. Load balancer = kaam servers mein baantna. Aam taur par dono use hote hain.",
    },
  },
  {
    id: "big-picture",
    phase: "11 · Big picture",
    scene: "diagram",
    edge: true,
    lb: true,
    servers: ALL_S,
    users: ALL_U,
    cache: "stored",
    hot: ALL_S,
    load: { s1: "healthy", s2: "healthy", s3: "healthy" },
    packets: [
      { id: "a", from: "u1", to: "edge", t: 0.5, label: "static → edge", kind: "hit" },
      { id: "b", from: "edge", to: "lb", t: 0.5, label: "dynamic → origin", kind: "req" },
    ],
    terminal: [
      "# nginx as a reverse proxy + load balancer",
      "upstream app {",
      "    least_conn;",
      "    server 10.0.0.11:3000;",
      "    server 10.0.0.12:3000;",
      "    server 10.0.0.13:3000;",
      "}",
      "server {",
      "    listen 443 ssl;",
      "    server_name shop.example;",
      "    location / { proxy_pass http://app; }",
      "}",
    ],
    en: {
      title: "Putting it together: a real request path",
      summary: "DNS → nearest CDN edge → (cache hit, or) load balancer → healthy app server → database.",
      detail:
        "A typical modern site: DNS points shop.example at a CDN like Cloudflare, CloudFront or Akamai. Static files are served from the edge. Dynamic requests (/api/cart) go through to your load balancer (Nginx, HAProxy, or a cloud LB such as AWS ALB), which picks a healthy app server, which talks to the database. Each layer adds speed, scale or safety – and each is one more place to check when debugging (look at response headers like x-cache: HIT and the server that answered).",
      remember: "User → DNS → CDN edge → load balancer → servers. Cache what you can, balance the rest.",
    },
    hi: {
      title: "Sab jodo: ek asli request ka raasta",
      summary: "DNS → paas ka CDN edge → (cache hit, ya) load balancer → healthy app server → database.",
      detail:
        "Ek typical modern site: DNS shop.example ko Cloudflare, CloudFront ya Akamai jaise CDN ki taraf point karta hai. Static files edge se aati hain. Dynamic requests (/api/cart) load balancer tak jaati hain (Nginx, HAProxy, ya AWS ALB jaisa cloud LB), jo healthy app server chunta hai, jo database se baat karta hai. Har layer speed, scale ya safety jodti hai – aur debugging mein har ek check karne ki jagah hai (x-cache: HIT jaise response headers aur jawab dene wala server dekho).",
      remember: "User → DNS → CDN edge → load balancer → servers. Jo cache ho sake cache karo, baaki balance.",
    },
  },
];
