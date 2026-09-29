

// /* ───────────────────────── Types ───────────────────────── */
// export type Lang = "en" | "hi";
// export interface Bi { en: string; hi: string; }
// export type DeviceKind = "laptop" | "switch" | "router" | "network" | "internet" | "server";
// export interface RouteNode { id: string; label: Bi; kind: DeviceKind; detail?: Bi; }
// export interface RouteLink { from: string; to: string; label?: Bi; active?: boolean; }
// export interface RouteScene { nodes: RouteNode[]; links: RouteLink[]; packets?: Bi[]; }
// export interface RouteStep {
//     id: string;
//     phase: Bi;
//     title: Bi;
//     summary: Bi;
//     explanation: Bi[];
//     keyPoints: Bi[];
//     example?: Bi;
//     scene: RouteScene;
//     quiz?: { question: Bi; options: Bi[]; answerIndex: number; explanation: Bi };
// }

// export const ROUTING_STEPS: RouteStep[] = [
//     {
//         id: "routing-basics",
//         phase: { en: "01 · Fundamentals", hi: "01 · Basics" },
//         title: { en: "Understanding Routing in Networks", hi: "Networks mein Routing ko samajhna" },
//         summary: {
//             en: "Routing is the process of choosing a path for an IP packet to travel from its source network to its destination network.",
//             hi: "Routing woh process hai jisme IP packet ko source network se destination network tak pahunchane ke liye path choose kiya jata hai."
//         },
//         explanation: [
//             { en: "A device first checks whether the destination IP belongs to its own local network. If it does, the device can send the frame directly on the local link.", hi: "Device pehle check karta hai ki destination IP usi local network mein hai ya nahi. Agar hai, to device local link par directly frame bhej sakta hai." },
//             { en: "If the destination is on another network, the device sends the packet to its default gateway, usually the local router.", hi: "Agar destination kisi doosre network mein hai, to device packet ko apne default gateway—usually local router—ko bhejta hai." },
//             { en: "Routers inspect the destination IP address and use their routing table to choose the next hop or outgoing interface.", hi: "Router destination IP dekhkar apni routing table se next hop ya outgoing interface choose karta hai." },
//             { en: "At each routed hop, the Layer 2 frame is replaced for the next link, while the source and destination IP addresses generally remain the same unless a function such as NAT changes them.", hi: "Har routed hop par next link ke liye Layer 2 frame change hota hai, jabki source aur destination IP generally same rehte hain—jab tak NAT jaisa process unhe change na kare." }
//         ],
//         keyPoints: [
//             { en: "IP addresses identify source and destination at the network layer.", hi: "Network layer par IP addresses source aur destination ko identify karte hain." },
//             { en: "A routing table tells a router where to forward a packet next.", hi: "Routing table router ko batati hai ki packet next kahan forward karna hai." },
//             { en: "The default gateway is the next hop used for destinations outside the local subnet.", hi: "Local subnet ke bahar wale destination ke liye default gateway next hop hota hai." }
//         ],
//         example: { en: "Laptop 192.168.1.10 wants to reach 10.20.0.5. Since 10.20.0.5 is outside 192.168.1.0/24, the laptop forwards the packet to its gateway 192.168.1.1.", hi: "Laptop 192.168.1.10 ko 10.20.0.5 tak pahunchna hai. 10.20.0.5, 192.168.1.0/24 ke bahar hai, isliye laptop packet ko gateway 192.168.1.1 par bhejta hai." },
//         scene: {
//             nodes: [
//                 { id: "laptop", label: { en: "Laptop", hi: "Laptop" }, kind: "laptop", detail: { en: "192.168.1.10", hi: "192.168.1.10" } },
//                 { id: "router", label: { en: "Default Gateway", hi: "Default Gateway" }, kind: "router", detail: { en: "192.168.1.1", hi: "192.168.1.1" } },
//                 { id: "remote", label: { en: "Remote Network", hi: "Remote Network" }, kind: "network", detail: { en: "10.20.0.0/24", hi: "10.20.0.0/24" } }
//             ],
//             links: [{ from: "laptop", to: "router", label: { en: "Local frame", hi: "Local frame" }, active: true }, { from: "router", to: "remote", label: { en: "Routed packet", hi: "Routed packet" }, active: true }],
//             packets: [{ en: "Destination IP: 10.20.0.5", hi: "Destination IP: 10.20.0.5" }, { en: "Next hop: 192.168.1.1", hi: "Next hop: 192.168.1.1" }]
//         },
//         quiz: { question: { en: "What does a router primarily use to choose where to forward an IP packet?", hi: "Router IP packet ko aage forward karne ka path choose karne ke liye mainly kis cheez ka use karta hai?" }, options: [{ en: "Destination IP and routing table", hi: "Destination IP aur routing table" }, { en: "The laptop's screen size", hi: "Laptop ki screen size" }, { en: "The packet's application color", hi: "Packet ke application ka color" }], answerIndex: 0, explanation: { en: "The destination IP is matched against routing-table entries to select a route.", hi: "Destination IP ko routing-table entries se match karke route choose kiya jata hai." } }
//     },
//     {
//         id: "routers-switches",
//         phase: { en: "02 · Network Devices", hi: "02 · Network Devices" },
//         title: { en: "Explaining Network Components: Routers and Switches", hi: "Network ke components: Router aur Switch" },
//         summary: { en: "Switches connect devices within a local network; routers connect different IP networks and forward packets between them.", hi: "Switch ek local network ke devices ko connect karta hai; router different IP networks ko connect karke unke beech packets forward karta hai." },
//         explanation: [
//             { en: "A Layer 2 Ethernet switch learns source MAC addresses and builds a MAC address table. It forwards frames toward the port associated with the destination MAC.", hi: "Layer 2 Ethernet switch source MAC address learn karke MAC address table banata hai. Phir destination MAC se linked port ki taraf frame forward karta hai." },
//             { en: "A router operates at Layer 3. It examines the destination IP address and selects a route using the routing table.", hi: "Router Layer 3 par kaam karta hai. Woh destination IP dekhkar routing table se route choose karta hai." },
//             { en: "A home router often combines several functions: routing, a LAN switch, Wi-Fi access point, firewall, DHCP, and NAT. These are logically different functions even when one box provides them.", hi: "Home router aksar routing, LAN switch, Wi-Fi access point, firewall, DHCP aur NAT jaise kai kaam karta hai. Ek hi device mein hone ke bawajood ye alag-alag functions hain." }
//         ],
//         keyPoints: [
//             { en: "Switch: forwards Ethernet frames using MAC addresses within a LAN.", hi: "Switch: LAN ke andar MAC address ke basis par Ethernet frames forward karta hai." },
//             { en: "Router: forwards IP packets between networks using IP routes.", hi: "Router: IP routes ki help se different networks ke beech IP packets forward karta hai." },
//             { en: "A switch does not normally route between separate IP subnets unless it is a Layer 3 switch with routing configured.", hi: "Normal switch different IP subnets ke beech routing nahi karta; iske liye configured Layer 3 switch chahiye." }
//         ],
//         example: { en: "Laptop and printer on the same LAN communicate through the switch. Traffic to a server in another subnet is sent to the router.", hi: "Same LAN mein laptop aur printer ka traffic switch se jata hai. Doosre subnet ke server ke liye traffic router ko bheja jata hai." },
//         scene: {
//             nodes: [
//                 { id: "laptop", label: { en: "Laptop", hi: "Laptop" }, kind: "laptop", detail: { en: "LAN device", hi: "LAN device" } },
//                 { id: "switch", label: { en: "Switch", hi: "Switch" }, kind: "switch", detail: { en: "MAC forwarding", hi: "MAC forwarding" } },
//                 { id: "printer", label: { en: "Printer", hi: "Printer" }, kind: "server", detail: { en: "Same LAN", hi: "Same LAN" } },
//                 { id: "router", label: { en: "Router", hi: "Router" }, kind: "router", detail: { en: "IP forwarding", hi: "IP forwarding" } },
//                 { id: "remote", label: { en: "Other Subnet", hi: "Doosra Subnet" }, kind: "network", detail: { en: "Remote network", hi: "Remote network" } }
//             ],
//             links: [{ from: "laptop", to: "switch", active: true }, { from: "switch", to: "printer", label: { en: "Local traffic", hi: "Local traffic" }, active: true }, { from: "switch", to: "router", label: { en: "Off-subnet traffic", hi: "Doosre subnet ka traffic" }, active: true }, { from: "router", to: "remote", active: true }]
//         },
//         quiz: { question: { en: "Which device normally forwards traffic between different IP networks?", hi: "Different IP networks ke beech traffic generally kaun forward karta hai?" }, options: [{ en: "Layer 2 switch", hi: "Layer 2 switch" }, { en: "Router", hi: "Router" }, { en: "Keyboard", hi: "Keyboard" }], answerIndex: 1, explanation: { en: "A router uses Layer 3 IP routes to forward packets between networks.", hi: "Router Layer 3 IP routes ke basis par networks ke beech packets forward karta hai." } }
//     },
//     {
//         id: "laptop-a-to-d",
//         phase: { en: "03 · Scenario A → D", hi: "03 · Scenario A → D" },
//         title: { en: "Routing Scenario: Laptop A to Laptop D", hi: "Routing Scenario: Laptop A se Laptop D" },
//         summary: { en: "Follow a packet from Laptop A across two LANs to Laptop D, passing through routers along the way.", hi: "Laptop A se packet ko do LANs cross karke Laptop D tak jaate hue dekhein, jahan beech mein routers hain." },
//         explanation: [
//             { en: "Laptop A compares Laptop D's IP address with its own subnet. Because D is on a different network, A chooses its default gateway.", hi: "Laptop A, Laptop D ke IP ko apne subnet se compare karta hai. D doosre network mein hai, isliye A default gateway choose karta hai." },
//             { en: "A sends an Ethernet frame to the MAC address of its gateway. The IP packet inside is addressed to Laptop D, not to the gateway.", hi: "A Ethernet frame gateway ke MAC address par bhejta hai. Uske andar IP packet ka destination Laptop D hota hai, gateway nahi." },
//             { en: "Router R1 checks its routing table and forwards the packet toward R2. At each link, the router builds a new Layer 2 frame for the next hop.", hi: "Router R1 routing table dekhkar packet ko R2 ki taraf forward karta hai. Har link par router next hop ke liye naya Layer 2 frame banata hai." },
//             { en: "When the packet reaches D's local network, the final router delivers a frame to D's MAC address. Laptop D receives the packet.", hi: "Packet D ke local network par pahunchne par last router D ke MAC address par frame deliver karta hai. Laptop D packet receive karta hai." }
//         ],
//         keyPoints: [
//             { en: "The destination IP remains Laptop D's IP throughout ordinary routing.", hi: "Normal routing mein destination IP poore path par Laptop D ka IP rehta hai." },
//             { en: "The Ethernet source/destination MAC addresses change at every routed link.", hi: "Har routed link par Ethernet source/destination MAC addresses change hote hain." },
//             { en: "Routers make forwarding decisions hop by hop.", hi: "Routers har hop par forwarding ka decision lete hain." }
//         ],
//         example: { en: "A: 192.168.1.10/24 → R1: 192.168.1.1 → R2: 10.0.0.2 → D: 192.168.2.20/24. This is an illustrative topology; routes and interface addresses must be configured to match the real network.", hi: "A: 192.168.1.10/24 → R1: 192.168.1.1 → R2: 10.0.0.2 → D: 192.168.2.20/24. Ye ek example hai; real network mein routes aur interface addresses sahi configure hone chahiye." },
//         scene: {
//             nodes: [
//                 { id: "A", label: { en: "Laptop A", hi: "Laptop A" }, kind: "laptop", detail: { en: "192.168.1.10", hi: "192.168.1.10" } },
//                 { id: "S1", label: { en: "Switch 1", hi: "Switch 1" }, kind: "switch" },
//                 { id: "R1", label: { en: "Router R1", hi: "Router R1" }, kind: "router", detail: { en: "Gateway", hi: "Gateway" } },
//                 { id: "R2", label: { en: "Router R2", hi: "Router R2" }, kind: "router" },
//                 { id: "S2", label: { en: "Switch 2", hi: "Switch 2" }, kind: "switch" },
//                 { id: "D", label: { en: "Laptop D", hi: "Laptop D" }, kind: "laptop", detail: { en: "192.168.2.20", hi: "192.168.2.20" } }
//             ],
//             links: [{ from: "A", to: "S1", active: true }, { from: "S1", to: "R1", active: true }, { from: "R1", to: "R2", label: { en: "Routed hop", hi: "Routed hop" }, active: true }, { from: "R2", to: "S2", active: true }, { from: "S2", to: "D", active: true }],
//             packets: [{ en: "IP destination stays: Laptop D", hi: "IP destination same rehta hai: Laptop D" }, { en: "Link-layer frame is rebuilt at each router", hi: "Har router par Layer 2 frame naya banta hai" }]
//         },
//         quiz: { question: { en: "At R1, which destination does the IP packet normally contain?", hi: "R1 par IP packet mein generally kaunsa destination hota hai?" }, options: [{ en: "R1's own IP", hi: "R1 ka apna IP" }, { en: "Laptop D's IP", hi: "Laptop D ka IP" }, { en: "Switch 1's MAC", hi: "Switch 1 ka MAC" }], answerIndex: 1, explanation: { en: "The IP packet is addressed end-to-end to Laptop D; the frame on the current link is addressed to the next hop.", hi: "IP packet end-to-end Laptop D ke liye hota hai; current link ka frame next hop ke liye hota hai." } }
//     },
//     {
//         id: "laptop-c-to-x",
//         phase: { en: "04 · Scenario C → X", hi: "04 · Scenario C → X" },
//         title: { en: "Routing Scenario: Laptop C to Network X", hi: "Routing Scenario: Laptop C se Network X" },
//         summary: { en: "A host can reach a remote network when its gateway and the routers along the path have usable routes to the destination.", hi: "Jab host ke gateway aur path ke routers ke paas destination tak pahunchne ke liye sahi routes hote hain, tab host remote network tak pahunch sakta hai." },
//         explanation: [
//             { en: "Laptop C identifies that Network X is outside its local subnet and forwards the packet to its default gateway R3.", hi: "Laptop C identify karta hai ki Network X uske local subnet ke bahar hai aur packet default gateway R3 ko bhejta hai." },
//             { en: "R3 looks for the most specific matching route for Network X. If a matching route exists, R3 forwards to the listed next hop or interface.", hi: "R3 Network X ke liye sabse specific matching route search karta hai. Route milne par woh diye gaye next hop ya interface ki taraf forward karta hai." },
//             { en: "If no specific route matches, the router may use a default route (0.0.0.0/0), if configured. Without a usable route, it drops the packet and may send an ICMP destination-unreachable message.", hi: "Agar specific route nahi milta, to configured hone par router default route (0.0.0.0/0) use kar sakta hai. Usable route na hone par packet drop ho sakta hai aur ICMP destination-unreachable message bheja ja sakta hai." },
//             { en: "Return traffic also needs a valid route back to Laptop C's network; a forward route alone does not guarantee two-way communication.", hi: "Return traffic ke liye bhi Laptop C ke network tak valid route chahiye. Sirf forward route hone se two-way communication ensure nahi hota." }
//         ],
//         keyPoints: [
//             { en: "A route includes a destination prefix and forwarding information such as next hop or interface.", hi: "Route mein destination prefix aur next hop ya interface jaisi forwarding information hoti hai." },
//             { en: "Routers generally prefer the longest-prefix (most specific) matching route.", hi: "Router generally longest-prefix yani sabse specific matching route choose karta hai." },
//             { en: "Both forward and return paths matter for a successful conversation.", hi: "Successful communication ke liye forward aur return dono paths important hain." }
//         ],
//         example: { en: "Example route: 10.50.0.0/16 → next hop 172.16.0.2. A packet for 10.50.4.8 matches this route and is sent to 172.16.0.2, assuming the next hop is reachable.", hi: "Example route: 10.50.0.0/16 → next hop 172.16.0.2. 10.50.4.8 ke liye packet is route se match hokar 172.16.0.2 ko bheja jayega, agar next hop reachable hai." },
//         scene: {
//             nodes: [
//                 { id: "C", label: { en: "Laptop C", hi: "Laptop C" }, kind: "laptop", detail: { en: "Source host", hi: "Source host" } },
//                 { id: "R3", label: { en: "Gateway R3", hi: "Gateway R3" }, kind: "router" },
//                 { id: "R4", label: { en: "Next-hop Router", hi: "Next-hop Router" }, kind: "router", detail: { en: "Route to X", hi: "X ka route" } },
//                 { id: "X", label: { en: "Network X", hi: "Network X" }, kind: "network", detail: { en: "10.50.0.0/16", hi: "10.50.0.0/16" } }
//             ],
//             links: [{ from: "C", to: "R3", label: { en: "Default gateway", hi: "Default gateway" }, active: true }, { from: "R3", to: "R4", label: { en: "Route / next hop", hi: "Route / next hop" }, active: true }, { from: "R4", to: "X", label: { en: "Deliver to prefix", hi: "Prefix tak deliver" }, active: true }],
//             packets: [{ en: "Route lookup: 10.50.0.0/16", hi: "Route lookup: 10.50.0.0/16" }, { en: "Return route is also required", hi: "Return route bhi zaroori hai" }]
//         },
//         quiz: { question: { en: "What can happen if a router has no matching route and no default route?", hi: "Agar router ke paas matching route aur default route dono na hon, to kya ho sakta hai?" }, options: [{ en: "It always guesses a path", hi: "Woh hamesha path guess karta hai" }, { en: "It drops the packet; it may send ICMP unreachable", hi: "Woh packet drop kar sakta hai aur ICMP unreachable bhej sakta hai" }, { en: "It changes the destination into a MAC address", hi: "Woh destination ko MAC address mein change kar deta hai" }], answerIndex: 1, explanation: { en: "A router needs a usable route to forward the packet; otherwise it cannot select a next hop.", hi: "Packet forward karne ke liye router ko usable route chahiye; uske bina woh next hop choose nahi kar sakta." } }
//     },
//     {
//         id: "internet-nat",
//         phase: { en: "05 · Internet & NAT", hi: "05 · Internet aur NAT" },
//         title: { en: "Routing to the Internet and NAT", hi: "Internet tak Routing aur NAT" },
//         summary: { en: "A home device sends off-network traffic to its router. The router forwards it toward the ISP, and NAT may translate private source addresses to a public address.", hi: "Home device external network ka traffic router ko bhejta hai. Router use ISP ki taraf forward karta hai aur NAT private source address ko public address mein translate kar sakta hai." },
//         explanation: [
//             { en: "Private IPv4 addresses (such as 192.168.x.x, 10.x.x.x, and 172.16–172.31.x.x) are used inside private networks and are not globally routed on the public Internet.", hi: "Private IPv4 addresses (jaise 192.168.x.x, 10.x.x.x aur 172.16–172.31.x.x) private networks mein use hote hain aur public Internet par globally route nahi hote." },
//             { en: "When a home device accesses the Internet, its packet is sent to the home router. With NAT/PAT, the router commonly replaces the private source IP and may translate the source port, recording the mapping.", hi: "Jab home device Internet access karta hai, packet home router ko jata hai. NAT/PAT mein router aksar private source IP aur source port ko translate karke mapping record karta hai." },
//             { en: "The router forwards the translated packet to the ISP using its WAN connection. Replies return to the public address and port, and the router uses its translation table to deliver them to the internal device.", hi: "Router translated packet ko WAN connection se ISP ki taraf bhejta hai. Reply public address aur port par return hota hai, aur router translation table se use internal device tak pahunchata hai." },
//             { en: "NAT is address translation, not the same thing as routing. Routing chooses the path; NAT changes address/port information. Some networks use public IPv6 without NAT, while firewalls still control access.", hi: "NAT address translation hai, routing nahi. Routing path choose karti hai; NAT address/port change karta hai. Kuch networks mein NAT ke bina public IPv6 hota hai, jabki firewall access control karta hai." }
//         ],
//         keyPoints: [
//             { en: "Private IPv4 addresses are not directly reachable across the public Internet.", hi: "Private IPv4 addresses public Internet se directly reachable nahi hote." },
//             { en: "NAT/PAT maps internal address/port combinations to an external address/port.", hi: "NAT/PAT internal address/port ko external address/port se map karta hai." },
//             { en: "Routing and NAT are separate functions, even when performed by the same home router.", hi: "Routing aur NAT alag functions hain, bhale hi home router dono perform kare." }
//         ],
//         example: { en: "Laptop 192.168.1.10:51500 → home router WAN 203.0.113.7:40001 → Internet server 198.51.100.20:443. The public addresses here are documentation examples, not real service endpoints.", hi: "Laptop 192.168.1.10:51500 → home router WAN 203.0.113.7:40001 → Internet server 198.51.100.20:443. Yahan public addresses documentation examples hain, real service endpoints nahi." },
//         scene: {
//             nodes: [
//                 { id: "device", label: { en: "Laptop / Phone", hi: "Laptop / Phone" }, kind: "laptop", detail: { en: "Private IP", hi: "Private IP" } },
//                 { id: "home", label: { en: "Home Router", hi: "Home Router" }, kind: "router", detail: { en: "NAT / Gateway", hi: "NAT / Gateway" } },
//                 { id: "isp", label: { en: "ISP", hi: "ISP" }, kind: "network", detail: { en: "WAN / Public path", hi: "WAN / Public path" } },
//                 { id: "internet", label: { en: "Internet", hi: "Internet" }, kind: "internet" },
//                 { id: "server", label: { en: "Web Server", hi: "Web Server" }, kind: "server", detail: { en: "Public IP", hi: "Public IP" } }
//             ],
//             links: [{ from: "device", to: "home", label: { en: "Private source IP", hi: "Private source IP" }, active: true }, { from: "home", to: "isp", label: { en: "Translated source", hi: "Translated source" }, active: true }, { from: "isp", to: "internet", active: true }, { from: "internet", to: "server", active: true }],
//             packets: [{ en: "Outbound: NAT creates a mapping", hi: "Outbound: NAT mapping create karta hai" }, { en: "Reply: mapping sends traffic back inside", hi: "Reply: mapping traffic ko internal network mein bhejti hai" }]
//         },
//         quiz: { question: { en: "What is the main purpose of NAT in a typical home IPv4 network?", hi: "Typical home IPv4 network mein NAT ka main purpose kya hai?" }, options: [{ en: "Translate internal addresses/ports for external communication", hi: "External communication ke liye internal addresses/ports translate karna" }, { en: "Replace DNS with Ethernet", hi: "DNS ko Ethernet se replace karna" }, { en: "Increase the physical cable length", hi: "Physical cable ki length badhana" }], answerIndex: 0, explanation: { en: "NAT/PAT maps private-side traffic to an external address and often a port, allowing return traffic to be associated with the internal device.", hi: "NAT/PAT private-side traffic ko external address aur aksar port se map karta hai, taaki reply sahi internal device tak pahunch sake." } }
//     }
// ];

// export const ROUTING_LABELS = {
//     en: { previous: "Previous", next: "Next", finish: "Finish", restart: "Restart", lesson: "Network Routing", step: "Step", keyPoints: "Key points", example: "Example", diagram: "Network diagram", check: "Check answer", correct: "Correct!", incorrect: "Not quite", answer: "Show explanation", completed: "Lesson completed", progress: "Progress" },
//     hi: { previous: "पिछला", next: "अगला", finish: "समाप्त", restart: "फिर से शुरू", lesson: "Network Routing", step: "चरण", keyPoints: "मुख्य बातें", example: "उदाहरण", diagram: "Network diagram", check: "उत्तर जाँचें", correct: "सही!", incorrect: "सही नहीं", answer: "व्याख्या देखें", completed: "पाठ पूरा हुआ", progress: "प्रगति" }
// } as const;

/* ───────────────────────── Types ───────────────────────── */
// "hi" key is kept so existing code keeps working. The text under it is Hinglish (Hindi in English letters).
export type Lang = "en" | "hi";
export interface Bi { en: string; hi: string; }
export type DeviceKind = "laptop" | "switch" | "router" | "network" | "internet" | "server";
export interface RouteNode { id: string; label: Bi; kind: DeviceKind; detail?: Bi; }
export interface RouteLink { from: string; to: string; label?: Bi; active?: boolean; }
export interface RouteScene { nodes: RouteNode[]; links: RouteLink[]; packets?: Bi[]; }
export interface RouteStep {
    id: string;
    phase: Bi;
    title: Bi;
    summary: Bi;
    explanation: Bi[];
    keyPoints: Bi[];
    example?: Bi; // may contain \n line breaks (render with whiteSpace: "pre-line")
    scene: RouteScene;
    quiz?: { question: Bi; options: Bi[]; answerIndex: number; explanation: Bi };
}

export const ROUTING_STEPS: RouteStep[] = [
    /* ───────────── 01 · Basics ───────────── */
    {
        id: "routing-basics",
        phase: { en: "01 · Fundamentals", hi: "01 · Basics" },
        title: { en: "Understanding Routing in Networks", hi: "Network mein Routing ko samajhna" },
        summary: {
            en: "Routing means finding the path an IP packet should take to reach a device in another network. Think of routers as post offices: each one reads the address on the parcel and decides where to send it next.",
            hi: "Routing ka matlab hai IP packet ke liye sahi rasta chunna, taaki woh doosre network ke device tak pahunch sake. Router ko post office samjho: har router parcel ka address padhta hai aur decide karta hai ki agla stop kaunsa hoga."
        },
        explanation: [
            {
                en: "Every device has an IP address and a subnet mask. Together they tell the device which addresses are in its own local network. Example: 192.168.1.10/24 means 192.168.1.1 to 192.168.1.254 are all local.",
                hi: "Har device ke paas IP address aur subnet mask hota hai. Dono milkar batate hain ki kaun se addresses uske apne local network mein hain. Example: 192.168.1.10/24 ka matlab hai 192.168.1.1 se 192.168.1.254 tak sab local hain."
            },
            {
                en: "Before sending, the laptop compares the destination IP with its own network. If the destination is local, it finds the destination's MAC address using ARP and sends the frame directly.",
                hi: "Bhejne se pehle laptop destination IP ko apne network se compare karta hai. Agar destination local hai, to woh ARP se destination ka MAC address pata karta hai aur frame seedha bhej deta hai."
            },
            {
                en: "If the destination is in another network (like 10.20.0.5), the laptop cannot reach it directly. So it hands the packet to its default gateway, which is the local router.",
                hi: "Agar destination kisi doosre network mein hai (jaise 10.20.0.5), to laptop use seedha nahi pahunch sakta. Isliye woh packet apne default gateway, yaani local router, ko de deta hai."
            },
            {
                en: "The router reads the destination IP and looks it up in its routing table. The table says which next hop or outgoing interface leads toward that network, and the router forwards the packet there.",
                hi: "Router destination IP padhkar apni routing table mein dekhta hai. Table batati hai ki us network ke liye kaunsa next hop ya outgoing interface use karna hai, aur router packet wahin forward kar deta hai."
            },
            {
                en: "This repeats at every router, hop by hop. Each router also reduces the TTL (time to live) by 1. If TTL reaches 0, the packet is dropped, so packets can never loop forever.",
                hi: "Yeh process har router par hop by hop repeat hota hai. Har router TTL (time to live) ko 1 kam karta hai. TTL 0 ho jaye to packet drop ho jata hai, isliye packet kabhi hamesha ke liye ghoomta nahi rehta."
            },
            {
                en: "At each hop the Layer 2 frame (with MAC addresses) is rebuilt for the next link, but the source and destination IP normally stay the same. Only functions like NAT change them.",
                hi: "Har hop par next link ke liye naya Layer 2 frame (MAC addresses ke saath) banta hai, lekin source aur destination IP normally same rehte hain. Sirf NAT jaise functions unhe change karte hain."
            }
        ],
        keyPoints: [
            { en: "IP addresses identify the source and destination at the network layer (Layer 3).", hi: "IP address network layer (Layer 3) par source aur destination ko identify karta hai." },
            { en: "A routing table tells a router where to send a packet next.", hi: "Routing table router ko batati hai ki packet ko agla kahan bhejna hai." },
            { en: "The default gateway is the router a device uses for anything outside its own subnet.", hi: "Apne subnet ke bahar ke har destination ke liye device jo router use karta hai, usse default gateway kehte hain." },
            { en: "Each router lowers TTL by 1, which stops endless loops.", hi: "Har router TTL ko 1 kam karta hai, jisse endless loops rukte hain." }
        ],
        example: {
            en: "Laptop 192.168.1.10/24 wants to reach 10.20.0.5.\n1) 10.20.0.5 is outside 192.168.1.0/24, so it is not local.\n2) The laptop sends the packet to its gateway 192.168.1.1 (destination MAC = gateway, destination IP = 10.20.0.5).\n3) The gateway checks its routing table and forwards the packet toward 10.20.0.0/24.",
            hi: "Laptop 192.168.1.10/24 ko 10.20.0.5 tak pahunchna hai.\n1) 10.20.0.5, 192.168.1.0/24 ke bahar hai, isliye local nahi hai.\n2) Laptop packet apne gateway 192.168.1.1 ko bhejta hai (destination MAC = gateway, destination IP = 10.20.0.5).\n3) Gateway routing table dekhkar packet ko 10.20.0.0/24 ki taraf forward karta hai."
        },
        scene: {
            nodes: [
                { id: "laptop", label: { en: "Laptop", hi: "Laptop" }, kind: "laptop", detail: { en: "192.168.1.10", hi: "192.168.1.10" } },
                { id: "router", label: { en: "Default Gateway", hi: "Default Gateway" }, kind: "router", detail: { en: "192.168.1.1", hi: "192.168.1.1" } },
                { id: "remote", label: { en: "Remote Network", hi: "Remote Network" }, kind: "network", detail: { en: "10.20.0.0/24", hi: "10.20.0.0/24" } }
            ],
            links: [
                { from: "laptop", to: "router", label: { en: "Local frame", hi: "Local frame" }, active: true },
                { from: "router", to: "remote", label: { en: "Routed packet", hi: "Routed packet" }, active: true }
            ],
            packets: [
                { en: "Destination IP: 10.20.0.5", hi: "Destination IP: 10.20.0.5" },
                { en: "Next hop: 192.168.1.1", hi: "Next hop: 192.168.1.1" }
            ]
        },
        quiz: {
            question: { en: "What does a router mainly use to decide where to forward an IP packet?", hi: "Router IP packet ko aage forward karne ka decision lene ke liye mainly kya use karta hai?" },
            options: [
                { en: "Destination IP and routing table", hi: "Destination IP aur routing table" },
                { en: "The laptop's screen size", hi: "Laptop ki screen size" },
                { en: "The packet's application color", hi: "Packet ke application ka color" }
            ],
            answerIndex: 0,
            explanation: { en: "The destination IP is matched against routing-table entries to pick a route.", hi: "Destination IP ko routing-table entries se match karke route chuna jata hai." }
        }
    },

    /* ───────────── 02 · Routers vs Switches ───────────── */
    {
        id: "routers-switches",
        phase: { en: "02 · Network Devices", hi: "02 · Network Devices" },
        title: { en: "Explaining Network Components: Routers and Switches", hi: "Network ke components: Router aur Switch" },
        summary: {
            en: "A switch connects devices inside one local network using MAC addresses. A router connects different IP networks using IP addresses. Different jobs, different layers.",
            hi: "Switch ek local network ke andar devices ko MAC address se connect karta hai. Router alag-alag IP networks ko IP address se connect karta hai. Dono ka kaam aur layer alag hai."
        },
        explanation: [
            {
                en: "A switch connects devices inside one LAN (laptops, printers, etc.). It works at Layer 2 and only looks at MAC addresses.",
                hi: "Switch ek LAN ke andar devices (laptop, printer, etc.) ko connect karta hai. Yeh Layer 2 par kaam karta hai aur sirf MAC address dekhta hai."
            },
            {
                en: "A switch learns by watching. When a frame arrives, it writes the source MAC and the port into its MAC address table. Later, frames for that MAC go out of only that port.",
                hi: "Switch dekhkar seekhta hai. Frame aane par woh source MAC aur port ko apni MAC address table mein likh leta hai. Baad mein us MAC ke frames sirf usi port se bheje jate hain."
            },
            {
                en: "If the switch does not know the destination MAC yet, or the frame is a broadcast, it sends the frame out of all other ports. This is called flooding.",
                hi: "Agar switch ko destination MAC abhi pata nahi hai, ya frame broadcast hai, to woh frame ko baaki sabhi ports se bhej deta hai. Ise flooding kehte hain."
            },
            {
                en: "A router works at Layer 3. It reads the destination IP address and uses its routing table to choose the next hop. Each router interface belongs to a different network.",
                hi: "Router Layer 3 par kaam karta hai. Woh destination IP padhta hai aur routing table se next hop chunta hai. Router ka har interface alag network ka hissa hota hai."
            },
            {
                en: "Routers do not forward broadcasts by default, so a router separates broadcast domains. A plain switch (one VLAN) keeps everything in one broadcast domain.",
                hi: "Router by default broadcasts ko forward nahi karta, isliye router broadcast domains ko alag karta hai. Ek normal switch (ek VLAN) sab kuch ek hi broadcast domain mein rakhta hai."
            },
            {
                en: "Your home Wi-Fi box is usually a router + switch + Wi-Fi access point + firewall + DHCP server + NAT, all in one. They are different functions even if it is one box.",
                hi: "Aapka home Wi-Fi box aksar router + switch + Wi-Fi access point + firewall + DHCP server + NAT, sab ek hi device mein hota hai. Ek box hone par bhi yeh alag-alag functions hain."
            }
        ],
        keyPoints: [
            { en: "Switch: forwards Ethernet frames using MAC addresses inside a LAN.", hi: "Switch: LAN ke andar MAC address se Ethernet frames forward karta hai." },
            { en: "Router: forwards IP packets between networks using IP routes.", hi: "Router: IP routes ke basis par alag networks ke beech IP packets forward karta hai." },
            { en: "A normal switch does not route between IP subnets. A Layer 3 switch with routing configured can.", hi: "Normal switch IP subnets ke beech routing nahi karta. Routing configured Layer 3 switch yeh kar sakta hai." },
            { en: "Rule of thumb: same network = switch, different network = router.", hi: "Simple rule: same network = switch, different network = router." }
        ],
        example: {
            en: "Laptop (192.168.1.10) prints to Printer (192.168.1.50): same subnet, so the switch delivers the frame using the printer's MAC address.\nLaptop opens a server at 10.0.0.5: different subnet, so the laptop sends it to the router, and the router routes it onward.",
            hi: "Laptop (192.168.1.10) Printer (192.168.1.50) par print karta hai: same subnet hai, isliye switch printer ke MAC address se frame deliver karta hai.\nLaptop 10.0.0.5 wale server ko open karta hai: different subnet hai, isliye laptop use router ko bhejta hai aur router use aage route karta hai."
        },
        scene: {
            nodes: [
                { id: "laptop", label: { en: "Laptop", hi: "Laptop" }, kind: "laptop", detail: { en: "LAN device", hi: "LAN device" } },
                { id: "switch", label: { en: "Switch", hi: "Switch" }, kind: "switch", detail: { en: "MAC forwarding", hi: "MAC forwarding" } },
                { id: "printer", label: { en: "Printer", hi: "Printer" }, kind: "server", detail: { en: "Same LAN", hi: "Same LAN" } },
                { id: "router", label: { en: "Router", hi: "Router" }, kind: "router", detail: { en: "IP forwarding", hi: "IP forwarding" } },
                { id: "remote", label: { en: "Other Subnet", hi: "Doosra Subnet" }, kind: "network", detail: { en: "Remote network", hi: "Remote network" } }
            ],
            links: [
                { from: "laptop", to: "switch", active: true },
                { from: "switch", to: "printer", label: { en: "Local traffic", hi: "Local traffic" }, active: true },
                { from: "switch", to: "router", label: { en: "Off-subnet traffic", hi: "Doosre subnet ka traffic" }, active: true },
                { from: "router", to: "remote", active: true }
            ]
        },
        quiz: {
            question: { en: "Which device normally forwards traffic between different IP networks?", hi: "Alag-alag IP networks ke beech traffic normally kaun forward karta hai?" },
            options: [
                { en: "Layer 2 switch", hi: "Layer 2 switch" },
                { en: "Router", hi: "Router" },
                { en: "Keyboard", hi: "Keyboard" }
            ],
            answerIndex: 1,
            explanation: { en: "A router uses Layer 3 IP routes to forward packets between networks.", hi: "Router Layer 3 IP routes se networks ke beech packets forward karta hai." }
        }
    },

    /* ───────────── 03 · Scenario A → D ───────────── */
    {
        id: "laptop-a-to-d",
        phase: { en: "03 · Scenario A → D", hi: "03 · Scenario A → D" },
        title: { en: "Routing Scenario: Laptop A to Laptop D", hi: "Routing Scenario: Laptop A se Laptop D" },
        summary: {
            en: "Follow one packet from Laptop A across two LANs and two routers to Laptop D. Watch what stays the same (IP addresses) and what changes (MAC addresses and TTL).",
            hi: "Ek packet ko Laptop A se do LANs aur do routers cross karke Laptop D tak follow karo. Dekho kya same rehta hai (IP addresses) aur kya change hota hai (MAC addresses aur TTL)."
        },
        explanation: [
            {
                en: "Laptop A (192.168.1.10/24) wants to reach Laptop D (192.168.2.20). A checks: 192.168.2.20 is not inside 192.168.1.0/24, so D is remote and A must use its default gateway R1.",
                hi: "Laptop A (192.168.1.10/24) ko Laptop D (192.168.2.20) tak pahunchna hai. A check karta hai: 192.168.2.20, 192.168.1.0/24 ke andar nahi hai, matlab D remote hai aur A ko default gateway R1 use karna padega."
            },
            {
                en: "A uses ARP to learn R1's MAC address. Then A builds a frame: destination MAC = R1, but the IP packet inside has destination IP = Laptop D (not R1).",
                hi: "A ARP se R1 ka MAC address pata karta hai. Phir A frame banata hai: destination MAC = R1, lekin andar ke IP packet ka destination IP = Laptop D hota hai (R1 nahi)."
            },
            {
                en: "Switch 1 only reads the destination MAC and passes the frame to R1's port. Switches never change IP addresses or MAC addresses.",
                hi: "Switch 1 sirf destination MAC padhta hai aur frame ko R1 ke port par bhej deta hai. Switch kabhi IP address ya MAC address change nahi karta."
            },
            {
                en: "R1 removes the old frame and reads destination IP 192.168.2.20. Its routing table says 192.168.2.0/24 is reachable via R2 (10.0.0.2). R1 lowers TTL by 1 and builds a new frame with destination MAC = R2.",
                hi: "R1 purana frame hata deta hai aur destination IP 192.168.2.20 padhta hai. Uski routing table kehti hai ki 192.168.2.0/24 R2 (10.0.0.2) ke through reachable hai. R1 TTL 1 kam karta hai aur destination MAC = R2 wala naya frame banata hai."
            },
            {
                en: "R2 does the same lookup. It sees 192.168.2.0/24 is directly connected, so it uses ARP to find D's MAC and sends a new frame with destination MAC = Laptop D.",
                hi: "R2 bhi wahi lookup karta hai. Use dikhta hai ki 192.168.2.0/24 directly connected hai, isliye woh ARP se D ka MAC pata karta hai aur destination MAC = Laptop D wala naya frame bhejta hai."
            },
            {
                en: "Switch 2 delivers the frame to D. D sees its own IP as the destination and accepts the packet. The reply comes back the same way, and every router on that path also needs a route back to A.",
                hi: "Switch 2 frame ko D tak deliver karta hai. D apna IP destination dekhkar packet accept kar leta hai. Reply usi tarah wapas aata hai, aur us path ke har router ke paas A tak wapas jaane ka route bhi hona chahiye."
            }
        ],
        keyPoints: [
            { en: "Source and destination IP stay the same from A to D during normal routing.", hi: "Normal routing mein A se D tak source aur destination IP same rehte hain." },
            { en: "Source and destination MAC change on every routed link.", hi: "Har routed link par source aur destination MAC change hote hain." },
            { en: "TTL goes down by 1 at every router.", hi: "Har router par TTL 1 se kam hota hai." },
            { en: "Routers decide hop by hop. Each one only needs to know the next hop.", hi: "Router har hop par alag decision leta hai. Har router ko sirf next hop pata hona chahiye." }
        ],
        example: {
            en: "Link A → R1: src MAC = A, dst MAC = R1\nLink R1 → R2: src MAC = R1, dst MAC = R2\nLink R2 → D: src MAC = R2, dst MAC = D\nOn all three links: src IP = 192.168.1.10, dst IP = 192.168.2.20.\nIPs stay, MACs change. (Illustrative topology: R1 to R2 uses 10.0.0.0/30. Real networks need matching routes.)",
            hi: "Link A → R1: src MAC = A, dst MAC = R1\nLink R1 → R2: src MAC = R1, dst MAC = R2\nLink R2 → D: src MAC = R2, dst MAC = D\nTeeno links par: src IP = 192.168.1.10, dst IP = 192.168.2.20.\nIP same rehte hain, MAC change hote hain. (Yeh example topology hai: R1 se R2 ke beech 10.0.0.0/30 hai. Real network mein routes sahi configure hone chahiye.)"
        },
        scene: {
            nodes: [
                { id: "A", label: { en: "Laptop A", hi: "Laptop A" }, kind: "laptop", detail: { en: "192.168.1.10", hi: "192.168.1.10" } },
                { id: "S1", label: { en: "Switch 1", hi: "Switch 1" }, kind: "switch" },
                { id: "R1", label: { en: "Router R1", hi: "Router R1" }, kind: "router", detail: { en: "Gateway 192.168.1.1", hi: "Gateway 192.168.1.1" } },
                { id: "R2", label: { en: "Router R2", hi: "Router R2" }, kind: "router", detail: { en: "10.0.0.2 / 192.168.2.1", hi: "10.0.0.2 / 192.168.2.1" } },
                { id: "S2", label: { en: "Switch 2", hi: "Switch 2" }, kind: "switch" },
                { id: "D", label: { en: "Laptop D", hi: "Laptop D" }, kind: "laptop", detail: { en: "192.168.2.20", hi: "192.168.2.20" } }
            ],
            links: [
                { from: "A", to: "S1", active: true },
                { from: "S1", to: "R1", active: true },
                { from: "R1", to: "R2", label: { en: "Routed hop", hi: "Routed hop" }, active: true },
                { from: "R2", to: "S2", active: true },
                { from: "S2", to: "D", active: true }
            ],
            packets: [
                { en: "IP destination stays: Laptop D", hi: "IP destination same rehta hai: Laptop D" },
                { en: "Layer 2 frame is rebuilt at each router", hi: "Har router par Layer 2 frame naya banta hai" }
            ]
        },
        quiz: {
            question: { en: "At R1, which destination IP does the packet normally contain?", hi: "R1 par packet mein normally kaunsa destination IP hota hai?" },
            options: [
                { en: "R1's own IP", hi: "R1 ka apna IP" },
                { en: "Laptop D's IP", hi: "Laptop D ka IP" },
                { en: "Switch 1's MAC", hi: "Switch 1 ka MAC" }
            ],
            answerIndex: 1,
            explanation: { en: "The IP packet is addressed end to end to Laptop D. Only the frame on the current link is addressed to the next hop.", hi: "IP packet end to end Laptop D ke liye hota hai. Sirf current link ka frame next hop ke liye hota hai." }
        }
    },

    /* ───────────── 04 · Scenario C → X ───────────── */
    {
        id: "laptop-c-to-x",
        phase: { en: "04 · Scenario C → X", hi: "04 · Scenario C → X" },
        title: { en: "Routing Scenario: Laptop C to Network X", hi: "Routing Scenario: Laptop C se Network X" },
        summary: {
            en: "A host can reach a remote network only if every router on the path has a usable route to it. Learn how routers pick a route: longest prefix match, default route, and what happens when no route exists.",
            hi: "Host remote network tak tabhi pahunch sakta hai jab path ke har router ke paas uska usable route ho. Seekho ki router route kaise chunta hai: longest prefix match, default route, aur route na milne par kya hota hai."
        },
        explanation: [
            {
                en: "Laptop C sees that Network X is outside its local subnet, so it sends the packet to its default gateway R3.",
                hi: "Laptop C dekhta hai ki Network X uske local subnet ke bahar hai, isliye woh packet apne default gateway R3 ko bhejta hai."
            },
            {
                en: "R3 checks its routing table. Each route has a destination prefix (like 10.50.0.0/16) and a next hop or outgoing interface.",
                hi: "R3 apni routing table check karta hai. Har route mein ek destination prefix (jaise 10.50.0.0/16) aur ek next hop ya outgoing interface hota hai."
            },
            {
                en: "If more than one route matches, the router picks the longest prefix match (the most specific one). A /24 beats a /16, and a /16 beats the default route 0.0.0.0/0.",
                hi: "Agar ek se zyada routes match karein, to router longest prefix match (sabse specific route) chunta hai. /24, /16 se better hai, aur /16, default route 0.0.0.0/0 se better hai."
            },
            {
                en: "If no specific route matches but a default route exists, the router uses it. This is how a home router sends 'everything else' to the ISP.",
                hi: "Agar koi specific route match nahi karta lekin default route hai, to router wahi use karta hai. Home router isi tarah 'baaki sab kuch' ISP ko bhejta hai."
            },
            {
                en: "If there is no matching route and no default route, the router drops the packet and may send an ICMP 'destination unreachable' message back to the sender.",
                hi: "Agar na matching route hai aur na default route, to router packet drop kar deta hai aur sender ko ICMP 'destination unreachable' message bhej sakta hai."
            },
            {
                en: "Communication is two-way. Network X also needs a route back to Laptop C's network. If only the forward path works, replies get lost.",
                hi: "Communication two-way hota hai. Network X ke paas Laptop C ke network tak wapas jaane ka route bhi hona chahiye. Agar sirf forward path chalta hai, to replies kho jate hain."
            }
        ],
        keyPoints: [
            { en: "A route = destination prefix + next hop or outgoing interface.", hi: "Route = destination prefix + next hop ya outgoing interface." },
            { en: "Longest prefix match wins: the most specific route is chosen.", hi: "Longest prefix match jeetta hai: sabse specific route chuna jata hai." },
            { en: "The default route 0.0.0.0/0 is the last-choice route for 'everything else'.", hi: "Default route 0.0.0.0/0 'baaki sab kuch' ke liye aakhri option hota hai." },
            { en: "Both the forward path and the return path must exist.", hi: "Forward path aur return path dono hone chahiye." }
        ],
        example: {
            en: "Routing table on R3:\n10.50.0.0/16 → next hop 172.16.0.2\n10.50.4.0/24 → next hop 172.16.0.9\n0.0.0.0/0 → next hop 172.16.0.1\nA packet for 10.50.4.8 matches all three, but /24 is the most specific, so R3 sends it to 172.16.0.9 (assuming that next hop is reachable).",
            hi: "R3 ki routing table:\n10.50.0.0/16 → next hop 172.16.0.2\n10.50.4.0/24 → next hop 172.16.0.9\n0.0.0.0/0 → next hop 172.16.0.1\n10.50.4.8 ka packet teeno se match karta hai, lekin /24 sabse specific hai, isliye R3 use 172.16.0.9 ko bhejta hai (agar woh next hop reachable hai)."
        },
        scene: {
            nodes: [
                { id: "C", label: { en: "Laptop C", hi: "Laptop C" }, kind: "laptop", detail: { en: "Source host", hi: "Source host" } },
                { id: "R3", label: { en: "Gateway R3", hi: "Gateway R3" }, kind: "router", detail: { en: "Route lookup", hi: "Route lookup" } },
                { id: "R4", label: { en: "Next-hop Router", hi: "Next-hop Router" }, kind: "router", detail: { en: "Route to X", hi: "X ka route" } },
                { id: "X", label: { en: "Network X", hi: "Network X" }, kind: "network", detail: { en: "10.50.0.0/16", hi: "10.50.0.0/16" } }
            ],
            links: [
                { from: "C", to: "R3", label: { en: "Default gateway", hi: "Default gateway" }, active: true },
                { from: "R3", to: "R4", label: { en: "Route / next hop", hi: "Route / next hop" }, active: true },
                { from: "R4", to: "X", label: { en: "Deliver to prefix", hi: "Prefix tak deliver" }, active: true }
            ],
            packets: [
                { en: "Best match: longest prefix", hi: "Best match: longest prefix" },
                { en: "Return route is also required", hi: "Return route bhi zaroori hai" }
            ]
        },
        quiz: {
            question: { en: "What can happen if a router has no matching route and no default route?", hi: "Agar router ke paas matching route aur default route dono na hon, to kya ho sakta hai?" },
            options: [
                { en: "It always guesses a path", hi: "Woh hamesha path guess kar leta hai" },
                { en: "It drops the packet and may send ICMP unreachable", hi: "Woh packet drop kar deta hai aur ICMP unreachable bhej sakta hai" },
                { en: "It changes the destination into a MAC address", hi: "Woh destination ko MAC address mein badal deta hai" }
            ],
            answerIndex: 1,
            explanation: { en: "Without a usable route the router cannot choose a next hop, so it cannot forward the packet.", hi: "Usable route ke bina router next hop nahi chun sakta, isliye packet forward nahi kar sakta." }
        }
    },

    /* ───────────── 05 · Internet & NAT ───────────── */
    {
        id: "internet-nat",
        phase: { en: "05 · Internet & NAT", hi: "05 · Internet aur NAT" },
        title: { en: "Routing to the Internet and NAT", hi: "Internet tak Routing aur NAT" },
        summary: {
            en: "Your home devices use private IP addresses that the Internet cannot route. The home router uses NAT to swap the private address for one public address, sends the packet to the ISP, and swaps it back for the reply.",
            hi: "Aapke home devices private IP addresses use karte hain jo Internet par route nahi hote. Home router NAT se private address ko ek public address se badalta hai, packet ISP ko bhejta hai, aur reply aane par wapas badal deta hai."
        },
        explanation: [
            {
                en: "Private IPv4 ranges are 10.0.0.0/8, 172.16.0.0/12 (172.16 to 172.31.x.x) and 192.168.0.0/16. They are used inside homes and offices. The public Internet does not route them, so a web server cannot reply to a private address directly.",
                hi: "Private IPv4 ranges hain 10.0.0.0/8, 172.16.0.0/12 (172.16 se 172.31.x.x) aur 192.168.0.0/16. Inka use ghar aur office ke andar hota hai. Public Internet inhe route nahi karta, isliye web server private address par seedha reply nahi de sakta."
            },
            {
                en: "Your laptop sends the packet to its default gateway, the home router, exactly like any other off-network traffic.",
                hi: "Aapka laptop packet apne default gateway, yaani home router, ko bhejta hai, bilkul waise hi jaise kisi bhi off-network traffic ke liye hota hai."
            },
            {
                en: "The home router does NAT/PAT. It replaces the private source IP (and usually the source port) with its own public WAN IP and a port, and saves this mapping in its NAT table.",
                hi: "Home router NAT/PAT karta hai. Woh private source IP (aur aksar source port) ko apne public WAN IP aur ek port se badalta hai, aur yeh mapping apni NAT table mein save kar leta hai."
            },
            {
                en: "The router sends the translated packet to the ISP over its WAN link. From there, ISP routers use normal routing to carry it across the Internet to the web server.",
                hi: "Router translated packet ko WAN link se ISP ko bhejta hai. Wahan se ISP ke routers normal routing se use Internet ke through web server tak pahunchate hain."
            },
            {
                en: "The server replies to the router's public IP and port. The router checks its NAT table, changes the destination back to the laptop's private IP and port, and delivers the reply inside.",
                hi: "Server router ke public IP aur port par reply karta hai. Router apni NAT table check karta hai, destination ko wapas laptop ke private IP aur port mein badalta hai, aur reply andar deliver kar deta hai."
            },
            {
                en: "NAT is not routing. Routing decides the path; NAT only rewrites addresses and ports. Some ISPs also use CGNAT, and with IPv6 devices normally get public addresses without NAT (a firewall still protects them).",
                hi: "NAT routing nahi hai. Routing path decide karti hai; NAT sirf address aur port badalta hai. Kuch ISPs CGNAT bhi use karte hain, aur IPv6 mein devices ko normally NAT ke bina public address milta hai (firewall phir bhi unhe protect karta hai)."
            }
        ],
        keyPoints: [
            { en: "Private IPv4 addresses are not reachable directly from the public Internet.", hi: "Private IPv4 addresses public Internet se seedhe reachable nahi hote." },
            { en: "NAT/PAT maps internal address:port to an external address:port and remembers it in a NAT table.", hi: "NAT/PAT internal address:port ko external address:port se map karta hai aur NAT table mein yaad rakhta hai." },
            { en: "Routing picks the path; NAT rewrites addresses. They are separate functions.", hi: "Routing path chunti hai; NAT address badalta hai. Dono alag functions hain." },
            { en: "Many devices can share one public IP because each connection gets a different port.", hi: "Kai devices ek hi public IP share kar sakte hain kyunki har connection ko alag port milta hai." }
        ],
        example: {
            en: "Outbound: 192.168.1.10:51500 → NAT → 203.0.113.7:40001 → server 198.51.100.20:443\nReply: 198.51.100.20:443 → 203.0.113.7:40001 → NAT table → 192.168.1.10:51500\n(203.0.113.7 and 198.51.100.20 are documentation example addresses, not real ones.)",
            hi: "Outbound: 192.168.1.10:51500 → NAT → 203.0.113.7:40001 → server 198.51.100.20:443\nReply: 198.51.100.20:443 → 203.0.113.7:40001 → NAT table → 192.168.1.10:51500\n(203.0.113.7 aur 198.51.100.20 documentation ke example addresses hain, real nahi.)"
        },
        scene: {
            nodes: [
                { id: "device", label: { en: "Laptop / Phone", hi: "Laptop / Phone" }, kind: "laptop", detail: { en: "Private IP", hi: "Private IP" } },
                { id: "home", label: { en: "Home Router", hi: "Home Router" }, kind: "router", detail: { en: "NAT / Gateway", hi: "NAT / Gateway" } },
                { id: "isp", label: { en: "ISP", hi: "ISP" }, kind: "network", detail: { en: "WAN / Public path", hi: "WAN / Public path" } },
                { id: "internet", label: { en: "Internet", hi: "Internet" }, kind: "internet" },
                { id: "server", label: { en: "Web Server", hi: "Web Server" }, kind: "server", detail: { en: "Public IP", hi: "Public IP" } }
            ],
            links: [
                { from: "device", to: "home", label: { en: "Private source IP", hi: "Private source IP" }, active: true },
                { from: "home", to: "isp", label: { en: "Translated source", hi: "Translated source" }, active: true },
                { from: "isp", to: "internet", active: true },
                { from: "internet", to: "server", active: true }
            ],
            packets: [
                { en: "Outbound: NAT creates a mapping", hi: "Outbound: NAT mapping banata hai" },
                { en: "Reply: the mapping sends traffic back inside", hi: "Reply: mapping traffic ko wapas andar bhejti hai" }
            ]
        },
        quiz: {
            question: { en: "What is the main purpose of NAT in a typical home IPv4 network?", hi: "Typical home IPv4 network mein NAT ka main purpose kya hai?" },
            options: [
                { en: "Translate internal addresses/ports for external communication", hi: "External communication ke liye internal addresses/ports ko translate karna" },
                { en: "Replace DNS with Ethernet", hi: "DNS ko Ethernet se replace karna" },
                { en: "Increase the physical cable length", hi: "Physical cable ki length badhana" }
            ],
            answerIndex: 0,
            explanation: { en: "NAT/PAT maps private-side traffic to an external address and usually a port, so replies can find the right internal device.", hi: "NAT/PAT private-side traffic ko external address aur aksar port se map karta hai, taaki reply sahi internal device tak pahunch sake." }
        }
    }
];

export const ROUTING_LABELS = {
    en: { previous: "Previous", next: "Next", finish: "Finish", restart: "Restart", lesson: "Network Routing", step: "Step", keyPoints: "Key points", example: "Example", diagram: "Network diagram", check: "Check answer", correct: "Correct!", incorrect: "Not quite", answer: "Show explanation", completed: "Lesson completed", progress: "Progress" },
    hi: { previous: "Pichla", next: "Agla", finish: "Khatam", restart: "Phir se shuru", lesson: "Network Routing", step: "Step", keyPoints: "Key points", example: "Example", diagram: "Network diagram", check: "Answer check karein", correct: "Sahi jawab!", incorrect: "Sahi nahi", answer: "Explanation dekhein", completed: "Lesson complete ho gaya", progress: "Progress" }
} as const;