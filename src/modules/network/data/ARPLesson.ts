

export type Lang = "en" | "hi";
export interface Bi {
    en: string;
    hi: string;
}

export type NodeId = "A" | "B" | "C" | "R";

export interface ArpDevice {
    icon: string;
    name: string;
    ip: string;
    mac: string;
}

export interface SceneMessage {
    from: NodeId;
    to: NodeId | "ALL";
    kind: "broadcast" | "unicast" | "data";
    label: Bi;
}

export interface SceneBadge {
    tone: "ok" | "no" | "info";
    text: Bi;
}

export interface FrameRow {
    label: Bi;
    value: string;
    hl?: boolean;
}

export interface CacheEntry {
    ip: string;
    mac: string;
    state: "dynamic" | "static";
}


export interface ArpScene {
    messages?: SceneMessage[];
    badges?: Partial<Record<NodeId, SceneBadge>>;
    focus?: NodeId[];
    /** PC-A's ARP cache at this moment */
    cache: CacheEntry[];
    frameTitle?: Bi;
    frame?: FrameRow[];
    terminal?: { command: string; lines: string[] };
}

export interface ARPStep {
    phase: string;
    example?: string;
    scene: ArpScene;
    en: { title: string; detail: string; keyPoint: string; tip?: string };
    hi: { title: string; detail: string; keyPoint: string; tip?: string };
}

export interface ArpField {
    id: string;
    name: string;
    abbr: string;
    bytes: number;
    group: "ethernet" | "arp";
    request: string;
    reply: string;
    en: string;
    hi: string;
}

/* ───────────────────────── Devices ───────────────────────── */

export const ARP_DEVICES: Record<NodeId, ArpDevice> = {
    A: { icon: "💻", name: "PC-A", ip: "192.168.1.10", mac: "AA:AA:AA:AA:AA:10" },
    B: { icon: "🖥️", name: "PC-B", ip: "192.168.1.20", mac: "BB:BB:BB:BB:BB:20" },
    C: { icon: "🖨️", name: "Printer", ip: "192.168.1.30", mac: "CC:CC:CC:CC:CC:30" },
    R: { icon: "📡", name: "Router", ip: "192.168.1.1", mac: "DD:DD:DD:DD:DD:01" },
};

export const SUBNET_MASK = "255.255.255.0";
export const MY_NETWORK = "192.168.1.0";
export const BROADCAST_MAC = "FF:FF:FF:FF:FF:FF";

/* ───────────────────────── Labels ───────────────────────── */

export const ARP_LABELS = {
    en: {
        category: "NETWORKING FUNDAMENTALS",
        lessonTitle: "Address Resolution Protocol (ARP)",
        description:
            "See how a device finds the MAC address that belongs to an IPv4 address on a local network — step by step, with packets, cache and a live simulator.",
        tabs: ["Walkthrough", "ARP packet", "Simulator", "Cheat sheet"],

        example: "EXAMPLE",
        keyPoint: "KEY POINT",
        tip: "TIP",
        recap: "Recap",
        frameTitle: "What is on the wire",
        cacheTitle: "PC-A's ARP cache",
        cacheEmpty: "(empty)",
        colIp: "IP address",
        colMac: "MAC address",
        colState: "Type",
        legendBroadcast: "Broadcast",
        legendUnicast: "Unicast",
        legendData: "Data frame",
        diagramHint: "The switch forwards frames on the local network. Highlighted devices and wires are the ones involved right now.",

        packetIntro:
            "An ARP message is tiny: 28 bytes of ARP data (for IPv4 over Ethernet) carried inside an Ethernet frame. Switch between Request and Reply to see which fields change. Click a field to read what it means.",
        request: "Request",
        reply: "Reply",
        groupEthernet: "Ethernet header · Layer 2 (14 bytes)",
        groupArp: "ARP payload · 28 bytes",
        field: "Field",
        size: "Size",
        value: "Value",
        meaning: "Meaning",
        bytesWord: "bytes",
        byteBar: "Frame layout (to scale)",

        simIntro:
            "PC-A (192.168.1.10/24, gateway 192.168.1.1) wants to send a packet. Pick a destination and the state of PC-A's ARP cache, then step through what the operating system does.",
        simDestination: "Destination IP",
        simCache: "ARP cache",
        simCacheEmpty: "Empty",
        simCacheFilled: "Already has the entry",
        simStep: "Step",
        simDone: "Finished",
        simOkResult: "Frame delivered to the next hop",
        simFailResult: "ARP failed → Destination host unreachable",
        destOptions: [
            { ip: "192.168.1.20", label: "PC-B · local" },
            { ip: "192.168.1.30", label: "Printer · local" },
            { ip: "192.168.1.99", label: "Offline · local" },
            { ip: "8.8.8.8", label: "Internet · remote" },
        ],

        commandsTitle: "Commands to inspect the ARP cache",
        colOs: "System",
        colShow: "Show cache",
        colClear: "Clear cache",
        statesTitle: "Cache entry types",
        relatedTitle: "Related ideas",
        troubleTitle: "Troubleshooting with ARP",
        mythsTitle: "Myths vs facts",
        myth: "Myth",
        fact: "Fact",
        quizTitle: "Quick check",
        showAnswer: "Show answer",
        hideAnswer: "Hide answer",
        securityTitle: "Security note: ARP spoofing",
    },
    hi: {
        category: "Networking ki basic concepts",
        lessonTitle: "Address Resolution Protocol (ARP)",
        description:
            "Dekho ki local network mein device IPv4 address se juda MAC address kaise dhoondhta hai — step by step, packets, cache aur live simulator ke saath.",
        tabs: ["Walkthrough", "ARP packet", "Simulator", "Cheat sheet"],

        example: "Example",
        keyPoint: "Key Point",
        tip: "Tip",
        recap: "Recap",
        frameTitle: "Wire par kya hai",
        cacheTitle: "PC-A ka ARP cache",
        cacheEmpty: "(khali)",
        colIp: "IP address",
        colMac: "MAC address",
        colState: "Type",
        legendBroadcast: "Broadcast",
        legendUnicast: "Unicast",
        legendData: "Data frame",
        diagramHint: "Switch local network par frames forward karta hai. Highlighted devices aur wires abhi involved hain.",

        packetIntro:
            "ARP message bahut chhota hota hai: 28 bytes ka ARP data (IPv4 over Ethernet ke liye) jo Ethernet frame ke andar jaata hai. Request aur Reply ke beech switch karke dekho kaun se fields badalte hain. Kisi bhi field par click karke uska matlab padho.",
        request: "Request",
        reply: "Reply",
        groupEthernet: "Ethernet header · Layer 2 (14 bytes)",
        groupArp: "ARP payload · 28 bytes",
        field: "Field",
        size: "Size",
        value: "Value",
        meaning: "Matlab",
        bytesWord: "bytes",
        byteBar: "Frame layout (scale ke hisaab se)",

        simIntro:
            "PC-A (192.168.1.10/24, gateway 192.168.1.1) ko ek packet bhejna hai. Destination aur PC-A ke ARP cache ki state chuno, phir dekho operating system step-by-step kya karta hai.",
        simDestination: "Destination IP",
        simCache: "ARP cache",
        simCacheEmpty: "Khali",
        simCacheFilled: "Entry pehle se hai",
        simStep: "Step",
        simDone: "Complete",
        simOkResult: "Frame next hop tak deliver ho gaya",
        simFailResult: "ARP fail → Destination host unreachable",
        destOptions: [
            { ip: "192.168.1.20", label: "PC-B · local" },
            { ip: "192.168.1.30", label: "Printer · local" },
            { ip: "192.168.1.99", label: "Offline · local" },
            { ip: "8.8.8.8", label: "Internet · remote" },
        ],

        commandsTitle: "ARP cache dekhne ke commands",
        colOs: "System",
        colShow: "Cache dekho",
        colClear: "Cache clear karo",
        statesTitle: "Cache entry ke types",
        relatedTitle: "Related concepts",
        troubleTitle: "ARP se troubleshooting",
        mythsTitle: "Myth vs fact",
        myth: "Myth",
        fact: "Fact",
        quizTitle: "Quick check",
        showAnswer: "Answer dekho",
        hideAnswer: "Answer chhupao",
        securityTitle: "Security note: ARP spoofing",
    },
} as const;



const B = ARP_DEVICES.B;
const A = ARP_DEVICES.A;
const R = ARP_DEVICES.R;

const CACHE_B: CacheEntry = { ip: B.ip, mac: B.mac, state: "dynamic" };
const CACHE_R: CacheEntry = { ip: R.ip, mac: R.mac, state: "dynamic" };

export const ARP_STEPS: ARPStep[] = [
    {
        phase: "Introduction",
        scene: { focus: ["A", "B"], cache: [] },
        en: {
            title: "What is ARP?",
            detail:
                "ARP stands for Address Resolution Protocol. Your computer usually knows the IPv4 address of the device it wants to talk to (for example 192.168.1.20), but an Ethernet or Wi-Fi frame can only be delivered using a MAC address. ARP is the small helper protocol that answers one question on the local network: “Which MAC address belongs to this IPv4 address?”\n\nARP does not assign IP addresses (that is DHCP) and does not carry your application data (IP, TCP, HTTP… do that). It only builds the IP-to-MAC mapping that Layer 2 needs to deliver a frame to the next hop.",
            keyPoint: "ARP maps a local IPv4 address to a link-layer MAC address.",
            tip: "Think of shouting in a hostel corridor: “Who is Ravi?” Only Ravi answers, and now you know which door is his.",
        },
        hi: {
            title: "ARP kya hai?",
            detail:
                "ARP ka full form Address Resolution Protocol hai. Aapke computer ko aksar us device ka IPv4 address pata hota hai jisse baat karni hai (jaise 192.168.1.20), lekin Ethernet ya Wi-Fi frame sirf MAC address se deliver hota hai. ARP woh chhota helper protocol hai jo local network par ek sawaal ka jawab deta hai: “Yeh IPv4 address kis MAC address ka hai?”\n\nARP IP addresses assign nahi karta (woh DHCP karta hai) aur application data bhi carry nahi karta (woh IP, TCP, HTTP… karte hain). Yeh sirf woh IP-to-MAC mapping banata hai jo Layer 2 ko next hop tak frame deliver karne ke liye chahiye.",
            keyPoint: "ARP local IPv4 address ko uske link-layer MAC address se map karta hai.",
            tip: "Hostel ki corridor mein chillane jaisa socho: “Ravi kaun hai?” Sirf Ravi bolega, aur ab aapko pata chal gaya ki uska kamra kaunsa hai.",
        },
    },
    {
        phase: "IP and MAC",
        example: "IP address: 192.168.1.20  •  MAC address: BB:BB:BB:BB:BB:20",
        scene: {
            focus: ["B"],
            cache: [],
            frameTitle: { en: "Two addresses for the same device (PC-B)", hi: "Ek hi device (PC-B) ke do addresses" },
            frame: [
                { label: { en: "IP address · Layer 3", hi: "IP address · Layer 3" }, value: B.ip, hl: true },
                { label: { en: "Used for", hi: "Kaam" }, value: "routing between networks" },
                { label: { en: "MAC address · Layer 2", hi: "MAC address · Layer 2" }, value: B.mac, hl: true },
                { label: { en: "Used for", hi: "Kaam" }, value: "delivery on the local link" },
            ],
        },
        en: {
            title: "IP address vs MAC address",
            detail:
                "An IP address is a logical address. It is used to route packets between networks and it can change (for example when DHCP gives you a new one). A MAC address identifies a network interface (NIC) on the local link and is placed in the Ethernet frame.\n\nThe IP destination normally stays the same from source to destination, while the destination MAC changes at every hop. ARP is the bridge that turns the next hop's IPv4 address into the MAC address the frame needs.",
            keyPoint: "IP helps identify where traffic should go; MAC is used to deliver a frame on the local link.",
        },
        hi: {
            title: "IP address vs MAC address",
            detail:
                "IP address ek logical address hai. Iska use networks ke beech packets route karne ke liye hota hai aur yeh badal sakta hai (jaise DHCP naya IP de de). MAC address local link par network interface (NIC) ko identify karta hai aur Ethernet frame mein daala jaata hai.\n\nIP destination normally source se destination tak same rehta hai, jabki destination MAC har hop par badalta hai. ARP woh bridge hai jo next hop ke IPv4 address ko us MAC address mein badalta hai jo frame ko chahiye.",
            keyPoint: "IP batata hai traffic kahan jaana hai; MAC local link par frame deliver karne ke kaam aata hai.",
        },
    },
    {
        phase: "The problem",
        example: "PC-A: 192.168.1.10  →  PC-B: 192.168.1.20",
        scene: {
            focus: ["A", "B"],
            cache: [],
            badges: { A: { tone: "info", text: { en: "I know the IP, not the MAC", hi: "IP pata hai, MAC nahi" } } },
            frameTitle: { en: "The frame PC-A wants to build", hi: "Woh frame jo PC-A banana chahta hai" },
            frame: [
                { label: { en: "Ethernet dst MAC", hi: "Ethernet dst MAC" }, value: "??? (unknown)", hl: true },
                { label: { en: "Ethernet src MAC", hi: "Ethernet src MAC" }, value: A.mac },
                { label: { en: "IP src", hi: "IP src" }, value: A.ip },
                { label: { en: "IP dst", hi: "IP dst" }, value: B.ip },
            ],
        },
        en: {
            title: "A simple local network",
            detail:
                "Imagine PC-A, PC-B, a printer and a router connected to the same switch (one LAN). PC-A wants to send data to PC-B. It knows PC-B's IPv4 address, 192.168.1.20, but the Ethernet header needs a destination MAC address and PC-A does not have it yet.\n\nWithout that MAC address the frame cannot be built, so PC-A must discover it first — that is exactly the job of ARP.",
            keyPoint: "ARP is useful when the sender knows the destination's local IPv4 address but needs its MAC address.",
        },
        hi: {
            title: "Ek simple local network",
            detail:
                "Socho PC-A, PC-B, ek printer aur ek router same switch (ek LAN) se connected hain. PC-A ko PC-B ko data bhejna hai. Use PC-B ka IPv4 address 192.168.1.20 pata hai, lekin Ethernet header ko destination MAC address chahiye aur PC-A ke paas abhi woh nahi hai.\n\nIs MAC ke bina frame ban hi nahi sakta, isliye PC-A ko pehle use discover karna hoga — yahi ARP ka kaam hai.",
            keyPoint: "Jab sender ko local destination ka IPv4 address pata ho par MAC nahi, tab ARP kaam aata hai.",
        },
    },
    {
        phase: "Local or remote",
        example: "PC-A: 192.168.1.10/24  •  PC-B: 192.168.1.20/24",
        scene: {
            focus: ["A", "B"],
            cache: [],
            badges: { A: { tone: "info", text: { en: "Apply the subnet mask (AND)", hi: "Subnet mask lagao (AND)" } } },
            frameTitle: { en: "Subnet check (bitwise AND)", hi: "Subnet check (bitwise AND)" },
            frame: [
                { label: { en: "My IP / mask", hi: "Mera IP / mask" }, value: "192.168.1.10 / 255.255.255.0" },
                { label: { en: "My network", hi: "Mera network" }, value: "192.168.1.0" },
                { label: { en: "Target IP", hi: "Target IP" }, value: "192.168.1.20" },
                { label: { en: "Target AND mask", hi: "Target AND mask" }, value: "192.168.1.0", hl: true },
                { label: { en: "Result", hi: "Result" }, value: "same network → LOCAL → ARP for 192.168.1.20", hl: true },
            ],
        },
        en: {
            title: "Check whether the destination is local",
            detail:
                "Before sending, PC-A applies its subnet mask to its own IP and to the destination IP (the AND operation from the subnet-mask lesson). If both give the same network address, the destination is local, so PC-A needs the destination's own MAC address.\n\nIf the network addresses differ (for example for 8.8.8.8), the destination is remote. Then PC-A does not care about the far-away server's MAC at all — it needs the MAC address of its default gateway, because the router is the next hop on the local link.",
            keyPoint: "ARP never resolves a remote server's MAC address across the Internet; the sender uses the local gateway.",
        },
        hi: {
            title: "Destination local hai ya remote?",
            detail:
                "Bhejne se pehle PC-A apne IP par aur destination IP par subnet mask lagata hai (subnet-mask lesson wala AND operation). Agar dono ka network address same aaye, toh destination local hai, aur PC-A ko destination ka apna MAC chahiye.\n\nAgar network addresses alag hon (jaise 8.8.8.8 ke liye), toh destination remote hai. Tab PC-A ko door wale server ke MAC se matlab hi nahi — use apne default gateway ka MAC chahiye, kyunki local link par router hi next hop hai.",
            keyPoint: "ARP Internet ke across remote server ka MAC resolve nahi karta; sender local gateway use karta hai.",
        },
    },
    {
        phase: "ARP cache",
        scene: {
            focus: ["A"],
            cache: [],
            badges: { A: { tone: "info", text: { en: "Cache miss → I must ask", hi: "Cache miss → poochna padega" } } },
            frameTitle: { en: "ARP cache lookup", hi: "ARP cache lookup" },
            frame: [
                { label: { en: "Looking for", hi: "Dhoondh raha hai" }, value: "192.168.1.20" },
                { label: { en: "Entry found?", hi: "Entry mili?" }, value: "NO → cache miss", hl: true },
                { label: { en: "Next action", hi: "Agla kaam" }, value: "send an ARP request" },
            ],
        },
        en: {
            title: "First look in the ARP cache",
            detail:
                "Asking the whole network every time would be wasteful, so the operating system first checks its ARP cache — a small table of recent IP-to-MAC mappings. If a valid entry exists (a cache hit), PC-A uses it immediately and no ARP traffic is sent.\n\nHere the cache is empty, so this is a cache miss and PC-A has to ask the network.",
            keyPoint: "A valid cached entry lets the device skip ARP completely.",
        },
        hi: {
            title: "Pehle ARP cache mein dekho",
            detail:
                "Har baar poore network se poochna wasteful hoga, isliye operating system pehle apna ARP cache check karta hai — recent IP-to-MAC mappings ki ek chhoti table. Agar valid entry mil jaye (cache hit), toh PC-A use turant use karta hai aur koi ARP traffic nahi jaata.\n\nYahan cache khali hai, yaani cache miss, aur PC-A ko network se poochna padega.",
            keyPoint: "Valid cached entry ho toh device ARP poori tarah skip kar deta hai.",
        },
    },
    {
        phase: "ARP request",
        example: "Who has 192.168.1.20? Tell 192.168.1.10.",
        scene: {
            focus: ["A"],
            cache: [],
            badges: { A: { tone: "info", text: { en: "Building the ARP request", hi: "ARP request bana raha hai" } } },
            frameTitle: { en: "ARP request · Ethernet frame + ARP payload", hi: "ARP request · Ethernet frame + ARP payload" },
            frame: [
                { label: { en: "Ethernet dst MAC", hi: "Ethernet dst MAC" }, value: BROADCAST_MAC, hl: true },
                { label: { en: "Ethernet src MAC", hi: "Ethernet src MAC" }, value: A.mac },
                { label: { en: "EtherType", hi: "EtherType" }, value: "0x0806 (ARP)" },
                { label: { en: "Operation", hi: "Operation" }, value: "1 (request)", hl: true },
                { label: { en: "Sender MAC / IP", hi: "Sender MAC / IP" }, value: `${A.mac} / ${A.ip}` },
                { label: { en: "Target MAC / IP", hi: "Target MAC / IP" }, value: `00:00:00:00:00:00 / ${B.ip}`, hl: true },
            ],
        },
        en: {
            title: "Create an ARP request",
            detail:
                "PC-A builds an ARP request. It puts its own MAC and IP in the sender fields, puts 192.168.1.20 in the target IP field and leaves the target MAC as zeros — that is exactly the unknown it wants to learn.\n\nIn plain words the message says: “Who has 192.168.1.20? Tell 192.168.1.10.” The Ethernet EtherType 0x0806 tells receivers that the payload is ARP.",
            keyPoint: "The request asks: “Who has this IP address?”",
        },
        hi: {
            title: "ARP request banana",
            detail:
                "PC-A ek ARP request banata hai. Sender fields mein apna MAC aur IP daalta hai, target IP mein 192.168.1.20 daalta hai aur target MAC ko zeros chhod deta hai — yahi woh unknown hai jo use seekhna hai.\n\nSeedhe shabdon mein message kehta hai: “192.168.1.20 kiske paas hai? 192.168.1.10 ko batao.” Ethernet EtherType 0x0806 receivers ko batata hai ki payload ARP hai.",
            keyPoint: "Request poochti hai: “Yeh IP address kiske paas hai?”",
        },
    },
    {
        phase: "Broadcast",
        example: "Ethernet destination: FF:FF:FF:FF:FF:FF",
        scene: {
            focus: ["A"],
            cache: [],
            messages: [{ from: "A", to: "ALL", kind: "broadcast", label: { en: "Who has 192.168.1.20?", hi: "192.168.1.20 kiske paas hai?" } }],
            badges: {
                B: { tone: "ok", text: { en: "That's my IP → I'll reply", hi: "Mera IP hai → reply dunga" } },
                C: { tone: "no", text: { en: "Not my IP → ignore", hi: "Mera IP nahi → ignore" } },
                R: { tone: "no", text: { en: "Not my IP → ignore", hi: "Mera IP nahi → ignore" } },
            },
            frameTitle: { en: "Broadcast delivery", hi: "Broadcast delivery" },
            frame: [
                { label: { en: "Ethernet dst MAC", hi: "Ethernet dst MAC" }, value: BROADCAST_MAC, hl: true },
                { label: { en: "Switch action", hi: "Switch ka kaam" }, value: "floods out all other ports" },
                { label: { en: "Who receives it", hi: "Kaun receive karta hai" }, value: "every device in the broadcast domain" },
                { label: { en: "Who answers", hi: "Kaun jawab deta hai" }, value: "only the owner of 192.168.1.20", hl: true },
            ],
        },
        en: {
            title: "The request is broadcast",
            detail:
                "On Ethernet the request is sent as a broadcast frame (destination MAC FF:FF:FF:FF:FF:FF). The switch floods it out of all other ports, so every device in the local broadcast domain receives it.\n\nEach device checks the target IP. PC-B sees its own address and prepares a reply; the printer and the router see someone else's address and simply ignore the request. Many systems also use the request to learn PC-A's IP-to-MAC mapping.",
            keyPoint: "The Ethernet broadcast MAC address is FF:FF:FF:FF:FF:FF.",
        },
        hi: {
            title: "Request broadcast hoti hai",
            detail:
                "Ethernet par request broadcast frame ki tarah bheji jaati hai (destination MAC FF:FF:FF:FF:FF:FF). Switch use baaki saare ports par flood kar deta hai, isliye local broadcast domain ka har device ise receive karta hai.\n\nHar device target IP check karta hai. PC-B ko apna address dikhta hai, toh woh reply taiyaar karta hai; printer aur router ko kisi aur ka address dikhta hai, toh woh request ko ignore kar dete hain. Kai systems request se PC-A ka IP-to-MAC mapping bhi seekh lete hain.",
            keyPoint: "Ethernet broadcast MAC address FF:FF:FF:FF:FF:FF hota hai.",
        },
    },
    {
        phase: "ARP reply",
        example: "192.168.1.20 is at BB:BB:BB:BB:BB:20",
        scene: {
            focus: ["A", "B"],
            cache: [],
            messages: [{ from: "B", to: "A", kind: "unicast", label: { en: "192.168.1.20 is at BB:…:20", hi: "192.168.1.20 BB:…:20 par hai" } }],
            badges: {
                A: { tone: "ok", text: { en: "Reply received!", hi: "Reply mil gaya!" } },
                B: { tone: "info", text: { en: "Sent a unicast reply", hi: "Unicast reply bheja" } },
            },
            frameTitle: { en: "ARP reply · Ethernet frame + ARP payload", hi: "ARP reply · Ethernet frame + ARP payload" },
            frame: [
                { label: { en: "Ethernet dst MAC", hi: "Ethernet dst MAC" }, value: A.mac, hl: true },
                { label: { en: "Ethernet src MAC", hi: "Ethernet src MAC" }, value: B.mac },
                { label: { en: "Operation", hi: "Operation" }, value: "2 (reply)", hl: true },
                { label: { en: "Sender MAC / IP", hi: "Sender MAC / IP" }, value: `${B.mac} / ${B.ip}`, hl: true },
                { label: { en: "Target MAC / IP", hi: "Target MAC / IP" }, value: `${A.mac} / ${A.ip}` },
            ],
        },
        en: {
            title: "Receive the ARP reply",
            detail:
                "PC-B answers with an ARP reply. This time it is unicast: the frame goes straight to PC-A's MAC address, because PC-B already learned it from the request. The sender fields now carry the answer — PC-B's IP and its MAC address.\n\nPC-A reads the reply and finally knows the mapping 192.168.1.20 → BB:BB:BB:BB:BB:20.",
            keyPoint: "The reply provides the MAC address associated with the requested local IPv4 address.",
        },
        hi: {
            title: "ARP reply receive karna",
            detail:
                "PC-B ARP reply se jawab deta hai. Is baar yeh unicast hai: frame seedha PC-A ke MAC par jaata hai, kyunki PC-B ne request se use pehle hi seekh liya hai. Sender fields ab jawab carry karte hain — PC-B ka IP aur uska MAC address.\n\nPC-A reply padhta hai aur aakhir mein use mapping pata chal jaati hai: 192.168.1.20 → BB:BB:BB:BB:BB:20.",
            keyPoint: "Reply requested local IPv4 address ka MAC address deta hai.",
        },
    },
    {
        phase: "ARP cache",
        example: "192.168.1.20  →  BB:BB:BB:BB:BB:20",
        scene: {
            focus: ["A"],
            cache: [CACHE_B],
            badges: { A: { tone: "ok", text: { en: "Mapping stored", hi: "Mapping store ho gayi" } } },
            frameTitle: { en: "Cache entry", hi: "Cache entry" },
            frame: [
                { label: { en: "Entry", hi: "Entry" }, value: `${B.ip} → ${B.mac}`, hl: true },
                { label: { en: "Lifetime", hi: "Lifetime" }, value: "temporary (seconds to minutes, depends on the OS)" },
                { label: { en: "Next packet to 192.168.1.20", hi: "192.168.1.20 ko agla packet" }, value: "cache hit → no broadcast" },
            ],
        },
        en: {
            title: "Store the result in the ARP cache",
            detail:
                "PC-A saves the mapping in its ARP cache. If it sends more data to 192.168.1.20 soon, it uses the cached MAC and no request is broadcast.\n\nCache entries are temporary. They expire after a while (from seconds to a few minutes, depending on the operating system) or get refreshed, so if a device gets a new network card the old mapping does not stay forever.",
            keyPoint: "ARP cache entries are temporary and can expire or be refreshed.",
        },
        hi: {
            title: "Result ko ARP cache mein store karna",
            detail:
                "PC-A mapping ko apne ARP cache mein save kar leta hai. Agar woh jaldi hi 192.168.1.20 ko aur data bheje, toh cached MAC use hota hai aur koi request broadcast nahi hoti.\n\nCache entries temporary hoti hain. Kuch der baad (operating system ke hisaab se seconds se kuch minutes) woh expire ho jaati hain ya refresh hoti hain, isliye agar device ka network card badle toh purani mapping hamesha nahi rehti.",
            keyPoint: "ARP cache entries temporary hoti hain aur expire ya refresh ho sakti hain.",
        },
    },
    {
        phase: "Use the mapping",
        example: "Ethernet frame: Source MAC → Destination MAC",
        scene: {
            focus: ["A", "B"],
            cache: [CACHE_B],
            messages: [{ from: "A", to: "B", kind: "data", label: { en: "Data frame", hi: "Data frame" } }],
            badges: { B: { tone: "ok", text: { en: "Frame accepted", hi: "Frame accept hua" } } },
            frameTitle: { en: "Data frame · Ethernet + IP", hi: "Data frame · Ethernet + IP" },
            frame: [
                { label: { en: "Ethernet dst MAC", hi: "Ethernet dst MAC" }, value: B.mac, hl: true },
                { label: { en: "Ethernet src MAC", hi: "Ethernet src MAC" }, value: A.mac },
                { label: { en: "EtherType", hi: "EtherType" }, value: "0x0800 (IPv4)" },
                { label: { en: "IP src → IP dst", hi: "IP src → IP dst" }, value: `${A.ip} → ${B.ip}` },
                { label: { en: "Payload", hi: "Payload" }, value: "your application data" },
            ],
        },
        en: {
            title: "Send the data frame",
            detail:
                "Now that the MAC address is known, PC-A puts it into the destination field of the Ethernet frame and sends the frame. The IP packet inside carries the IP addresses; the Ethernet header carries the local-link MAC addresses.\n\nThe switch has learned which port PC-B is on, so it delivers the frame only to that port. From here on, ARP is done — Ethernet and IP carry the actual data.",
            keyPoint: "ARP resolves the address; Ethernet carries the frame across the local link.",
        },
        hi: {
            title: "Data frame bhejna",
            detail:
                "Ab MAC address pata hai, toh PC-A use Ethernet frame ke destination field mein daalta hai aur frame bhejta hai. Andar wala IP packet IP addresses carry karta hai; Ethernet header local-link MAC addresses carry karta hai.\n\nSwitch ko pata hai PC-B kaun se port par hai, isliye woh frame sirf usi port par deliver karta hai. Ab ARP ka kaam khatam — asli data Ethernet aur IP carry karte hain.",
            keyPoint: "ARP address resolve karta hai; Ethernet local link par frame le jaata hai.",
        },
    },
    {
        phase: "Default gateway",
        example: "Destination: 8.8.8.8  •  Gateway: 192.168.1.1",
        scene: {
            focus: ["A", "R"],
            cache: [CACHE_B],
            messages: [{ from: "A", to: "ALL", kind: "broadcast", label: { en: "Who has 192.168.1.1?", hi: "192.168.1.1 kiske paas hai?" } }],
            badges: {
                R: { tone: "ok", text: { en: "That's me — the gateway", hi: "Main hoon — gateway" } },
                B: { tone: "no", text: { en: "Not my IP → ignore", hi: "Mera IP nahi → ignore" } },
                C: { tone: "no", text: { en: "Not my IP → ignore", hi: "Mera IP nahi → ignore" } },
            },
            frameTitle: { en: "Sending to 8.8.8.8 (outside the LAN)", hi: "8.8.8.8 ko bhejna (LAN ke bahar)" },
            frame: [
                { label: { en: "Destination IP", hi: "Destination IP" }, value: "8.8.8.8" },
                { label: { en: "8.8.8.8 AND mask", hi: "8.8.8.8 AND mask" }, value: "8.8.8.0 ≠ 192.168.1.0 → REMOTE" },
                { label: { en: "Next hop", hi: "Next hop" }, value: "default gateway 192.168.1.1", hl: true },
                { label: { en: "ARP asks for", hi: "ARP kiska poochta hai" }, value: "MAC of 192.168.1.1 (not of 8.8.8.8)", hl: true },
            ],
        },
        en: {
            title: "When the destination is outside the LAN",
            detail:
                "Now PC-A wants to reach 8.8.8.8. The subnet check shows that it is outside 192.168.1.0/24, so the frame must go to the default gateway. If the gateway's MAC is not in the cache, PC-A runs the very same ARP process — but for the router's IP, 192.168.1.1.\n\nThe router answers with its own MAC address, and the mapping goes into the cache next to PC-B's entry.",
            keyPoint: "For remote traffic, the Ethernet destination MAC is usually the next-hop router's interface MAC.",
        },
        hi: {
            title: "Jab destination LAN ke bahar ho",
            detail:
                "Ab PC-A ko 8.8.8.8 tak pahunchna hai. Subnet check batata hai ki woh 192.168.1.0/24 ke bahar hai, isliye frame default gateway ko jaana chahiye. Agar gateway ka MAC cache mein nahi hai, toh PC-A wahi ARP process chalata hai — lekin router ke IP, 192.168.1.1, ke liye.\n\nRouter apne MAC address se jawab deta hai, aur mapping PC-B ki entry ke saath cache mein aa jaati hai.",
            keyPoint: "Remote traffic mein Ethernet destination MAC usually next-hop router ke interface ka MAC hota hai.",
        },
    },
    {
        phase: "Gateway example",
        example: "PC-A → Router (192.168.1.1) → Internet",
        scene: {
            focus: ["A", "R"],
            cache: [CACHE_B, CACHE_R],
            messages: [{ from: "A", to: "R", kind: "data", label: { en: "IP dst 8.8.8.8", hi: "IP dst 8.8.8.8" } }],
            badges: { R: { tone: "info", text: { en: "Forwards the packet onward", hi: "Packet aage forward karta hai" } } },
            frameTitle: { en: "Data frame to the gateway", hi: "Gateway ko data frame" },
            frame: [
                { label: { en: "Ethernet dst MAC", hi: "Ethernet dst MAC" }, value: `${R.mac} (router)`, hl: true },
                { label: { en: "Ethernet src MAC", hi: "Ethernet src MAC" }, value: A.mac },
                { label: { en: "IP src → IP dst", hi: "IP src → IP dst" }, value: `${A.ip} → 8.8.8.8`, hl: true },
                { label: { en: "Why they differ", hi: "Alag kyun hain" }, value: "MAC = next hop, IP = final destination" },
            ],
        },
        en: {
            title: "Example: reaching the Internet",
            detail:
                "PC-A sends a frame whose destination MAC is the router's, but whose IP destination is still 8.8.8.8. That difference is the key idea: the MAC address only says who should pick the frame up on this link, the IP address says where the packet is finally going.\n\nThe router removes the incoming Ethernet frame, reads the IP packet, chooses the next hop and wraps the packet in a new frame for the next link. Each link repeats this MAC-for-the-next-hop idea (with ARP where Ethernet is used).",
            keyPoint: "The IP destination remains the remote host; the local Ethernet destination is the gateway.",
        },
        hi: {
            title: "Example: Internet tak pahunchna",
            detail:
                "PC-A aisa frame bhejta hai jiska destination MAC router ka hai, lekin IP destination abhi bhi 8.8.8.8 hai. Yahi fark asli idea hai: MAC address sirf batata hai ki is link par frame kaun uthaye, IP address batata hai ki packet aakhir kahan ja raha hai.\n\nRouter aane wale Ethernet frame ko hata deta hai, IP packet padhta hai, next hop chunta hai aur packet ko agle link ke liye naye frame mein wrap karta hai. Har link par yahi next-hop-MAC wala idea repeat hota hai (jahan Ethernet hai wahan ARP ke saath).",
            keyPoint: "IP destination remote host hi rehta hai; local Ethernet destination gateway hota hai.",
        },
    },
    {
        phase: "View ARP table",
        example: "Windows: arp -a",
        scene: {
            focus: ["A"],
            cache: [CACHE_B, CACHE_R],
            terminal: {
                command: "arp -a",
                lines: [
                    "Interface: 192.168.1.10 --- 0x4",
                    "  Internet Address      Physical Address      Type",
                    "  192.168.1.1           dd-dd-dd-dd-dd-01     dynamic",
                    "  192.168.1.20          bb-bb-bb-bb-bb-20     dynamic",
                    "  192.168.1.255         ff-ff-ff-ff-ff-ff     static",
                    "  224.0.0.22            01-00-5e-00-00-16     static",
                ],
            },
        },
        en: {
            title: "View the ARP table",
            detail:
                "On many systems you can inspect the ARP cache with a command such as arp -a. The output commonly shows IPv4 addresses, the associated physical (MAC) addresses and the entry type — dynamic entries were learned with ARP, static ones are fixed.\n\nYou will usually also see a broadcast address and some multicast entries; these are normal. The exact command and the way the output looks depend on the operating system (see the Cheat sheet tab).",
            keyPoint: "The exact command and output depend on the operating system.",
        },
        hi: {
            title: "ARP table dekhna",
            detail:
                "Kai systems mein arp -a jaise command se ARP cache dekh sakte ho. Output mein commonly IPv4 addresses, unse jude physical (MAC) addresses aur entry type dikhta hai — dynamic entries ARP se seekhi gayi hoti hain, static fixed hoti hain.\n\nAapko aksar ek broadcast address aur kuch multicast entries bhi dikhengi; yeh normal hai. Exact command aur output ka look operating system par depend karta hai (Cheat sheet tab dekho).",
            keyPoint: "Command aur output operating system ke hisaab se alag ho sakte hain.",
        },
    },
    {
        phase: "Recap",
        scene: {
            focus: ["A", "B", "R"],
            cache: [CACHE_B, CACHE_R],
            frameTitle: { en: "The whole ARP decision in four lines", hi: "Poora ARP decision chaar lines mein" },
            frame: [
                { label: { en: "1 · Local or remote?", hi: "1 · Local ya remote?" }, value: "AND the destination with the subnet mask" },
                { label: { en: "2 · Which next hop?", hi: "2 · Kaun sa next hop?" }, value: "local → the destination · remote → the gateway", hl: true },
                { label: { en: "3 · In the cache?", hi: "3 · Cache mein hai?" }, value: "hit → use the MAC and send" },
                { label: { en: "4 · Cache miss?", hi: "4 · Cache miss?" }, value: "broadcast request → unicast reply → cache it", hl: true },
            ],
        },
        en: {
            title: "What you learned",
            detail:
                "ARP resolves a local IPv4 next-hop address to a MAC address. If no valid cache entry exists, a request is broadcast on the local network, the matching device replies by unicast and the mapping is cached.\n\nFor a remote destination the sender resolves the default gateway's MAC address, not the remote host's. ARP stays inside one broadcast domain — routers do not forward ARP broadcasts.",
            keyPoint: "ARP is for local IPv4-to-MAC resolution; it does not carry traffic or find remote MAC addresses across routers.",
        },
        hi: {
            title: "Aapne kya seekha",
            detail:
                "ARP local IPv4 next-hop address ko MAC address mein resolve karta hai. Valid cache entry na ho toh request local network par broadcast hoti hai, matching device unicast reply deta hai aur mapping cache ho jaati hai.\n\nRemote destination ke liye sender default gateway ka MAC resolve karta hai, remote host ka nahi. ARP ek hi broadcast domain ke andar rehta hai — routers ARP broadcasts forward nahi karte.",
            keyPoint: "ARP local IPv4-to-MAC resolution ke liye hai; yeh traffic carry nahi karta aur routers ke across remote MAC nahi dhoondhta.",
        },
    },
];

/* ───────────────────────── ARP packet fields ───────────────────────── */

export const ARP_FIELDS: ArpField[] = [
    {
        id: "eth-dst",
        name: "Destination MAC",
        abbr: "Eth dst",
        bytes: 6,
        group: "ethernet",
        request: BROADCAST_MAC,
        reply: A.mac,
        en: "Who the frame is for on this link. A request is broadcast to everyone; a reply goes straight to the asker.",
        hi: "Is link par frame kiske liye hai. Request sabko broadcast hoti hai; reply seedha poochne wale ko jaati hai.",
    },
    {
        id: "eth-src",
        name: "Source MAC",
        abbr: "Eth src",
        bytes: 6,
        group: "ethernet",
        request: A.mac,
        reply: B.mac,
        en: "The MAC address of the device that sent this frame.",
        hi: "Us device ka MAC address jisne yeh frame bheja.",
    },
    {
        id: "ethertype",
        name: "EtherType",
        abbr: "Type",
        bytes: 2,
        group: "ethernet",
        request: "0x0806",
        reply: "0x0806",
        en: "Tells the receiver what is inside the frame. 0x0806 means ARP (an IPv4 packet would be 0x0800).",
        hi: "Receiver ko batata hai ki frame ke andar kya hai. 0x0806 ka matlab ARP (IPv4 packet 0x0800 hota hai).",
    },
    {
        id: "htype",
        name: "Hardware type",
        abbr: "HTYPE",
        bytes: 2,
        group: "arp",
        request: "1",
        reply: "1",
        en: "The type of link-layer network. 1 means Ethernet.",
        hi: "Link-layer network ka type. 1 ka matlab Ethernet.",
    },
    {
        id: "ptype",
        name: "Protocol type",
        abbr: "PTYPE",
        bytes: 2,
        group: "arp",
        request: "0x0800",
        reply: "0x0800",
        en: "The network protocol being resolved. 0x0800 means IPv4.",
        hi: "Kaun sa network protocol resolve ho raha hai. 0x0800 ka matlab IPv4.",
    },
    {
        id: "hlen",
        name: "Hardware length",
        abbr: "HLEN",
        bytes: 1,
        group: "arp",
        request: "6",
        reply: "6",
        en: "Length of a hardware (MAC) address in bytes: 6.",
        hi: "Hardware (MAC) address ki length bytes mein: 6.",
    },
    {
        id: "plen",
        name: "Protocol length",
        abbr: "PLEN",
        bytes: 1,
        group: "arp",
        request: "4",
        reply: "4",
        en: "Length of a protocol (IPv4) address in bytes: 4.",
        hi: "Protocol (IPv4) address ki length bytes mein: 4.",
    },
    {
        id: "oper",
        name: "Operation",
        abbr: "OPER",
        bytes: 2,
        group: "arp",
        request: "1 (request)",
        reply: "2 (reply)",
        en: "1 = “who has this IP?”, 2 = “this IP is at this MAC”.",
        hi: "1 = “yeh IP kiske paas hai?”, 2 = “yeh IP is MAC par hai”.",
    },
    {
        id: "sha",
        name: "Sender hardware address",
        abbr: "SHA",
        bytes: 6,
        group: "arp",
        request: A.mac,
        reply: B.mac,
        en: "MAC address of the sender of this ARP message. In a reply this is the answer everyone was waiting for.",
        hi: "Is ARP message ke sender ka MAC address. Reply mein yahi woh jawab hai jiska intezaar tha.",
    },
    {
        id: "spa",
        name: "Sender protocol address",
        abbr: "SPA",
        bytes: 4,
        group: "arp",
        request: A.ip,
        reply: B.ip,
        en: "IPv4 address of the sender of this ARP message.",
        hi: "Is ARP message ke sender ka IPv4 address.",
    },
    {
        id: "tha",
        name: "Target hardware address",
        abbr: "THA",
        bytes: 6,
        group: "arp",
        request: "00:00:00:00:00:00",
        reply: A.mac,
        en: "MAC address of the intended receiver. In a request it is all zeros because it is the unknown being asked for.",
        hi: "Intended receiver ka MAC address. Request mein yeh sab zeros hota hai kyunki wahi unknown hai jo poocha ja raha hai.",
    },
    {
        id: "tpa",
        name: "Target protocol address",
        abbr: "TPA",
        bytes: 4,
        group: "arp",
        request: B.ip,
        reply: A.ip,
        en: "IPv4 address of the intended receiver — in a request, the IP whose MAC we want to find.",
        hi: "Intended receiver ka IPv4 address — request mein woh IP jiska MAC dhoondhna hai.",
    },
];

/* ───────────────────────── Simulator text ───────────────────────── */

export const SIM_TEXT = {
    en: {
        s1Title: "Is the destination local?",
        s1Local: "{dst} AND {mask} = {net}. That equals my network {myNet}, so the destination is on the same LAN.",
        s1Remote: "{dst} AND {mask} = {net}. That is not my network {myNet}, so the destination is remote.",
        s2Title: "Choose the next hop",
        s2Local: "Local delivery: the next hop is the destination itself, {hop}.",
        s2Remote: "Remote delivery: the next hop is the default gateway, {hop}. The IP destination stays {dst}.",
        s3Title: "Look in the ARP cache",
        s3Hit: "HIT — {hop} is already mapped to {mac}. No ARP traffic is needed.",
        s3Miss: "MISS — there is no entry for {hop}, so ARP has to ask the network.",
        hitTitle: "Build and send the frame",
        hitDetail: "Ethernet destination MAC = {mac}. The frame is sent immediately.",
        reqTitle: "Broadcast an ARP request",
        reqDetail: "“Who has {hop}? Tell {src}.” goes to FF:FF:FF:FF:FF:FF, so every device on the LAN sees it.",
        repTitle: "The owner replies",
        repDetail: "{name} owns {hop}, so it answers by unicast: “{hop} is at {mac}”. Everyone else ignores the request.",
        learnTitle: "Cache the mapping and send",
        learnDetail: "PC-A stores {hop} → {mac} in its cache and sends the frame to that MAC address.",
        failTitle: "Nobody answers",
        failDetail: "No device owns {hop}. After a few retries ARP gives up and the OS reports “Destination host unreachable”. The frame is never built.",
        badgeAnd: "AND with the mask",
        badgeNext: "Next hop: {hop}",
        badgeMiss: "Cache miss",
        badgeHit: "Cache hit",
        badgeMine: "That's my IP → reply",
        badgeNotMine: "Not my IP → ignore",
        badgeGot: "Reply received!",
        badgeAccept: "Frame accepted",
        badgeSilent: "No reply",
        lblDst: "Destination IP",
        lblMask: "Subnet mask",
        lblAnd: "Destination AND mask",
        lblMyNet: "My network",
        lblVerdict: "Verdict",
        lblLocal: "LOCAL",
        lblRemote: "REMOTE",
        lblNextHop: "Next hop IP",
        lblReason: "Reason",
        lblReasonLocal: "same network → ask for the destination",
        lblReasonRemote: "different network → ask for the gateway",
        lblLookup: "Cache lookup",
        lblHit: "HIT",
        lblMiss: "MISS",
        lblEthDst: "Ethernet dst MAC",
        lblIpDst: "IP dst",
        lblOper: "Operation",
        lblSender: "Sender MAC / IP",
        lblTarget: "Target MAC / IP",
        lblRetries: "Retries",
        lblResult: "Result",
        lblFewTries: "a few attempts, no reply",
        lblUnreachable: "Destination host unreachable",
        lblFrameTo: "Frame sent to",
        msgWho: "Who has {hop}?",
        msgIsAt: "{hop} is at {mac}",
        msgData: "Data frame",
        msgIpDst: "IP dst {dst}",
        frameSubnet: "Subnet check",
        frameHop: "Next-hop decision",
        frameCache: "ARP cache lookup",
        frameSend: "Frame",
        frameReq: "ARP request",
        frameRep: "ARP reply",
        frameFail: "ARP result",
    },
    hi: {
        s1Title: "Destination local hai?",
        s1Local: "{dst} AND {mask} = {net}. Yeh mere network {myNet} ke barabar hai, isliye destination same LAN par hai.",
        s1Remote: "{dst} AND {mask} = {net}. Yeh mere network {myNet} ke barabar nahi hai, isliye destination remote hai.",
        s2Title: "Next hop chuno",
        s2Local: "Local delivery: next hop destination khud hai, {hop}.",
        s2Remote: "Remote delivery: next hop default gateway hai, {hop}. IP destination {dst} hi rehta hai.",
        s3Title: "ARP cache mein dekho",
        s3Hit: "HIT — {hop} pehle se {mac} se mapped hai. ARP traffic ki zaroorat nahi.",
        s3Miss: "MISS — {hop} ki koi entry nahi, isliye ARP ko network se poochna padega.",
        hitTitle: "Frame banao aur bhejo",
        hitDetail: "Ethernet destination MAC = {mac}. Frame turant bhej diya jaata hai.",
        reqTitle: "ARP request broadcast karo",
        reqDetail: "“{hop} kiske paas hai? {src} ko batao.” FF:FF:FF:FF:FF:FF par jaata hai, isliye LAN ka har device ise dekhta hai.",
        repTitle: "Owner reply deta hai",
        repDetail: "{name} ke paas {hop} hai, isliye woh unicast se jawab deta hai: “{hop} {mac} par hai”. Baaki sab request ko ignore karte hain.",
        learnTitle: "Mapping cache karo aur bhejo",
        learnDetail: "PC-A {hop} → {mac} ko cache mein store karta hai aur frame us MAC address par bhejta hai.",
        failTitle: "Koi jawab nahi deta",
        failDetail: "Kisi device ke paas {hop} nahi hai. Kuch retries ke baad ARP haar maan leta hai aur OS “Destination host unreachable” batata hai. Frame kabhi banta hi nahi.",
        badgeAnd: "Mask ke saath AND",
        badgeNext: "Next hop: {hop}",
        badgeMiss: "Cache miss",
        badgeHit: "Cache hit",
        badgeMine: "Mera IP hai → reply",
        badgeNotMine: "Mera IP nahi → ignore",
        badgeGot: "Reply mil gaya!",
        badgeAccept: "Frame accept hua",
        badgeSilent: "Koi reply nahi",
        lblDst: "Destination IP",
        lblMask: "Subnet mask",
        lblAnd: "Destination AND mask",
        lblMyNet: "Mera network",
        lblVerdict: "Verdict",
        lblLocal: "LOCAL",
        lblRemote: "REMOTE",
        lblNextHop: "Next hop IP",
        lblReason: "Reason",
        lblReasonLocal: "same network → destination ka MAC poocho",
        lblReasonRemote: "alag network → gateway ka MAC poocho",
        lblLookup: "Cache lookup",
        lblHit: "HIT",
        lblMiss: "MISS",
        lblEthDst: "Ethernet dst MAC",
        lblIpDst: "IP dst",
        lblOper: "Operation",
        lblSender: "Sender MAC / IP",
        lblTarget: "Target MAC / IP",
        lblRetries: "Retries",
        lblResult: "Result",
        lblFewTries: "kuch attempts, koi reply nahi",
        lblUnreachable: "Destination host unreachable",
        lblFrameTo: "Frame is par gaya",
        msgWho: "{hop} kiske paas hai?",
        msgIsAt: "{hop} {mac} par hai",
        msgData: "Data frame",
        msgIpDst: "IP dst {dst}",
        frameSubnet: "Subnet check",
        frameHop: "Next-hop decision",
        frameCache: "ARP cache lookup",
        frameSend: "Frame",
        frameReq: "ARP request",
        frameRep: "ARP reply",
        frameFail: "ARP result",
    },
} as const;

/* ───────────────────────── Cheat sheet ───────────────────────── */

export const ARP_COMMANDS = [
    { os: "Windows", show: "arp -a", clear: "arp -d *  (as Administrator)" },
    { os: "Linux", show: "ip neigh   (or arp -n)", clear: "sudo ip neigh flush all" },
    { os: "macOS", show: "arp -a   (or arp -an)", clear: "sudo arp -a -d" },
];

export const CACHE_STATES: { name: string; en: string; hi: string }[] = [
    {
        name: "dynamic",
        en: "Learned automatically through ARP. It expires after a timeout and is refreshed when the device is used again.",
        hi: "ARP se automatically seekhi gayi. Timeout ke baad expire ho jaati hai aur device dobara use hone par refresh hoti hai.",
    },
    {
        name: "static",
        en: "Added by hand (or created by the system, such as broadcast / multicast entries). It does not expire until it is removed.",
        hi: "Haath se add ki gayi (ya system ne banayi, jaise broadcast / multicast entries). Hataye jaane tak expire nahi hoti.",
    },
    {
        name: "incomplete / failed",
        en: "On Linux (ip neigh): INCOMPLETE or FAILED means a request was sent but nobody answered — a classic sign that the target is offline or the IP is wrong.",
        hi: "Linux (ip neigh) par: INCOMPLETE ya FAILED ka matlab request bheji gayi par kisi ne jawab nahi diya — target offline hai ya IP galat hai, iska classic sign.",
    },
];

export const RELATED_IDEAS: { term: string; en: string; hi: string }[] = [
    {
        term: "Gratuitous ARP",
        en: "A device announces its own IP-to-MAC mapping without being asked. It is used to detect duplicate IPs and to refresh caches after a failover or NIC change.",
        hi: "Device bina poochhe apna IP-to-MAC mapping announce karta hai. Duplicate IP detect karne aur failover ya NIC change ke baad caches refresh karne mein kaam aata hai.",
    },
    {
        term: "Proxy ARP",
        en: "A router answers ARP requests on behalf of another network, so hosts can reach it without knowing a gateway. Uncommon today.",
        hi: "Router doosre network ki taraf se ARP requests ka jawab deta hai, taaki hosts bina gateway jaane us tak pahunch sakein. Aajkal kam use hota hai.",
    },
    {
        term: "NDP (IPv6)",
        en: "IPv6 does not use ARP. Neighbor Discovery Protocol, carried in ICMPv6, does the same job.",
        hi: "IPv6 ARP use nahi karta. Neighbor Discovery Protocol, jo ICMPv6 mein chalta hai, wahi kaam karta hai.",
    },
];

export const SECURITY_NOTE: Bi = {
    en: "ARP has no authentication. Anyone on the LAN can send a forged reply that says “the gateway's IP is at MY MAC”, and other devices will happily cache it — this is ARP spoofing (or poisoning). The attacker can then sit in the middle of the traffic. Typical defences: Dynamic ARP Inspection and port security on managed switches, static entries for critical hosts, and end-to-end encryption such as HTTPS or SSH so intercepted traffic is useless.",
    hi: "ARP mein authentication nahi hota. LAN par koi bhi jhoota reply bhej sakta hai ki “gateway ka IP MERE MAC par hai”, aur baaki devices use bina sawaal cache kar lete hain — yahi ARP spoofing (ya poisoning) hai. Phir attacker traffic ke beech mein baith sakta hai. Aam defences: managed switches par Dynamic ARP Inspection aur port security, critical hosts ke liye static entries, aur end-to-end encryption jaise HTTPS ya SSH taaki intercept kiya traffic bekaar ho.",
};

export const TROUBLESHOOTING: { symptom: Bi; check: Bi }[] = [
    {
        symptom: { en: "Ping to a local IP says “Destination host unreachable”", hi: "Local IP ko ping karne par “Destination host unreachable”" },
        check: {
            en: "ARP got no reply. Check for a typo in the IP, a device that is off, or a wrong VLAN / subnet. It is not a firewall problem — ARP happens below IP.",
            hi: "ARP ko reply nahi mila. IP mein typo, band device, ya galat VLAN / subnet check karo. Yeh firewall ki problem nahi — ARP IP ke neeche hota hai.",
        },
    },
    {
        symptom: { en: "Connection works, then drops randomly", hi: "Connection chalta hai, phir achanak tootta hai" },
        check: {
            en: "Possible duplicate IP: two MACs fight for one address. Run the ARP table command a few times and watch whether the MAC for that IP keeps changing.",
            hi: "Duplicate IP ho sakta hai: do MACs ek address ke liye ladte hain. ARP table command kai baar chalao aur dekho us IP ka MAC baar-baar badalta hai ya nahi.",
        },
    },
    {
        symptom: { en: "LAN works but the Internet does not", hi: "LAN chalta hai par Internet nahi" },
        check: {
            en: "Look for the gateway's entry in the ARP table. If it is missing or incomplete, the gateway IP or the subnet mask on the device is probably wrong.",
            hi: "ARP table mein gateway ki entry dekho. Agar nahi hai ya incomplete hai, toh device par gateway IP ya subnet mask galat ho sakta hai.",
        },
    },
    {
        symptom: { en: "A replaced router / NIC is unreachable for a while", hi: "Badla hua router / NIC kuch der tak unreachable" },
        check: {
            en: "Stale cache: the old MAC is still remembered. Wait for the entry to expire or clear the cache with the command in the table above.",
            hi: "Stale cache: purana MAC abhi bhi yaad hai. Entry expire hone ka wait karo ya upar table wale command se cache clear karo.",
        },
    },
];

export const MYTHS: { myth: Bi; fact: Bi }[] = [
    {
        myth: { en: "ARP finds the MAC address of the website's server.", hi: "ARP website ke server ka MAC address dhoondhta hai." },
        fact: { en: "It only finds the next hop's MAC on the local link — usually your router.", hi: "Yeh sirf local link par next hop ka MAC dhoondhta hai — aksar aapka router." },
    },
    {
        myth: { en: "ARP hands out IP addresses.", hi: "ARP IP addresses deta hai." },
        fact: { en: "That is DHCP. ARP only maps an IP that already exists to a MAC address.", hi: "Woh DHCP hai. ARP sirf pehle se maujood IP ko MAC address se map karta hai." },
    },
    {
        myth: { en: "The MAC address in a frame stays the same all the way to the server.", hi: "Frame ka MAC address server tak same rehta hai." },
        fact: { en: "It is rewritten at every hop. Only the IP destination stays constant end to end (NAT aside).", hi: "Har hop par woh dobara likha jaata hai. Sirf IP destination end-to-end constant rehta hai (NAT ko chhod ke)." },
    },
    {
        myth: { en: "ARP is secure because it is a low-level protocol.", hi: "ARP secure hai kyunki yeh low-level protocol hai." },
        fact: { en: "It trusts every reply. That is why ARP spoofing is possible.", hi: "Yeh har reply par bharosa karta hai. Isi liye ARP spoofing possible hai." },
    },
];

export const QUIZ: { q: Bi; a: Bi }[] = [
    {
        q: { en: "PC-A wants to reach 8.8.8.8. Whose MAC address does it ask for with ARP?", hi: "PC-A ko 8.8.8.8 tak pahunchna hai. ARP se woh kiska MAC poochta hai?" },
        a: { en: "The default gateway's (the router's). ARP never resolves a far-away host's MAC address.", hi: "Default gateway (router) ka. ARP door ke host ka MAC kabhi resolve nahi karta." },
    },
    {
        q: { en: "Why is the ARP request a broadcast but the reply a unicast?", hi: "ARP request broadcast kyun hai lekin reply unicast?" },
        a: { en: "The asker does not know the owner's MAC, so it must ask everybody. The owner learned the asker's MAC from the request, so it can answer directly.", hi: "Poochne wale ko owner ka MAC pata nahi, isliye sabse poochna padta hai. Owner ne request se poochne wale ka MAC seekh liya, isliye seedha jawab de sakta hai." },
    },
    {
        q: { en: "Does ARP work across routers?", hi: "Kya ARP routers ke across kaam karta hai?" },
        a: { en: "No. ARP stays inside one broadcast domain (one LAN / subnet). Routers do not forward ARP broadcasts.", hi: "Nahi. ARP ek hi broadcast domain (ek LAN / subnet) ke andar rehta hai. Routers ARP broadcasts forward nahi karte." },
    },
    {
        q: { en: "What happens when a valid entry is already in the ARP cache?", hi: "Valid entry pehle se ARP cache mein ho toh kya hota hai?" },
        a: { en: "The device skips ARP, builds the Ethernet frame at once and sends it. Entries expire, so ARP repeats now and then.", hi: "Device ARP skip karta hai, Ethernet frame turant banata hai aur bhej deta hai. Entries expire hoti hain, isliye ARP kabhi-kabhi dobara chalta hai." },
    },
    {
        q: { en: "Which protocol replaces ARP in IPv6?", hi: "IPv6 mein ARP ki jagah kaun sa protocol aata hai?" },
        a: { en: "Neighbor Discovery Protocol (NDP), which runs over ICMPv6.", hi: "Neighbor Discovery Protocol (NDP), jo ICMPv6 par chalta hai." },
    },
];