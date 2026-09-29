
import type { Lang } from "../../../i18n";

/* ───────────────────────── Types ───────────────────────── */

// "hi" key is kept so existing code keeps working. The text under it is Hinglish (Hindi in English letters).

/** Which picture the left panel shows for a step (no more index-based magic numbers in the component). */
export type MacVisual =
    | "card"   // big icon + short example text
    | "flow"   // 3-node network flow diagram (uses step.flow)
    | "mac"    // the MAC address as 6 byte boxes
    | "binary" // 6 byte boxes with binary under each
    | "parts"  // OUI / interface-specific coloring + 24|24 bar
    | "flags"; // first byte in binary with the I/G and U/L bits highlighted

export type MacFlowKind = "laptop" | "nic" | "network" | "router" | "server" | "broadcast";

export interface MacFlowNode {
    kind: MacFlowKind;
    label: { en: string; hi: string };
    detail?: { en: string; hi: string };
    highlight?: boolean; // the node the step is about
}

export interface MacStepText {
    title: string;
    definition: string; // "Simple Definition" box: one sentence
    detail: string[];   // "Explanation": short paragraphs, read top to bottom
    realLife: string;   // "Real-Life Example"
    keyPoint: string;   // "Remember This"
}

export interface MacStep {
    id: string;
    phase: { en: string; hi: string }; // lesson part: Basics / Purpose / Structure / Practice
    icon: string;
    example: string; // text shown for visual: "card"
    visual: MacVisual;
    flow?: MacFlowNode[]; // only for visual: "flow"
    en: MacStepText;
    hi: MacStepText;
}

/**
 * Example address used across the whole lesson.
 * First byte AC = 1010 1100 -> last bit 0 (unicast), second-last bit 0 (universally administered),
 * so it is a normal, valid-looking hardware address. It is only an example, not a real device.
 */
export const MAC_EXAMPLE = "AC:DE:48:12:34:56";

/* ───────────────────────── Labels ───────────────────────── */

export const MAC_LABELS: Record<
    Lang,
    {
        lessonTitle: string;
        heroTitle: string;
        heroSubtitle: string;
        available: string;
        stepLabel: string;
        of: string;
        previous: string;
        next: string;
        restart: string;
        keyPoint: string;
        example: string;
        bytes: string;
        bits: string;
        organization: string;
        device: string;
        networkInterface: string;
        recap: string;
        firstByte: string;
        igBit: string;
        ulBit: string;
        unicast: string;
        universal: string;
        badge: string;
        lessonProgress: string;
        diagramFlow: string;
        diagramMac: string;
        diagramOverview: string;
        simpleDefinition: string;
        explanation: string;
        realLifeExample: string;
        rememberThis: string;
    }
> = {
    en: {
        lessonTitle: "Networking fundamentals",
        heroTitle: "MAC Address Basics",
        heroSubtitle:
            "Learn what a MAC address is, how it is built, how it is used on a local network, and how to find yours.",
        available: "Available",
        stepLabel: "Step",
        of: "of",
        previous: "Previous",
        next: "Next",
        restart: "Restart",
        keyPoint: "Key point",
        example: "Example",
        bytes: "bytes",
        bits: "bits",
        organization: "Organization (OUI)",
        device: "Interface-specific part",
        networkInterface: "Network interface",
        recap: "What you learned",
        firstByte: "First byte",
        igBit: "I/G bit",
        ulBit: "U/L bit",
        unicast: "Unicast",
        universal: "Universal",
        badge: "Networking Lesson",
        lessonProgress: "Lesson Progress",
        diagramFlow: "Network Flow",
        diagramMac: "MAC Address",
        diagramOverview: "At a Glance",
        simpleDefinition: "Simple Definition",
        explanation: "Explanation",
        realLifeExample: "Real-Life Example",
        rememberThis: "Remember This",
    },
    hi: {
        lessonTitle: "Networking ki basics",
        heroTitle: "MAC Address ki basics",
        heroSubtitle:
            "Samjho MAC address kya hota hai, kaise bana hota hai, local network par kaise use hota hai, aur apna MAC address kaise dhundhte hain.",
        available: "Available",
        stepLabel: "Step",
        of: "of",
        previous: "Pichla",
        next: "Agla",
        restart: "Phir se shuru",
        keyPoint: "Key point",
        example: "Example",
        bytes: "bytes",
        bits: "bits",
        organization: "Organization (OUI)",
        device: "Interface wala hissa",
        networkInterface: "Network interface",
        recap: "Aapne kya seekha",
        firstByte: "Pehla byte",
        igBit: "I/G bit",
        ulBit: "U/L bit",
        unicast: "Unicast",
        universal: "Universal",
        badge: "Networking Lesson",
        lessonProgress: "Lesson Progress",
        diagramFlow: "Network Flow",
        diagramMac: "MAC Address",
        diagramOverview: "Ek Nazar Mein",
        simpleDefinition: "Simple Definition",
        explanation: "Explanation",
        realLifeExample: "Real-Life Example",
        rememberThis: "Yaad Rakho",
    },
};

/* ───────────────────────── Steps ───────────────────────── */

export const MAC_STEPS: MacStep[] = [
    /* ═════════ Part 1 · Basics ═════════ */

    // 1
    {
        id: "what-is-mac",
        phase: { en: "Basics", hi: "Basics" },
        icon: "🏷️",
        example: "MAC = Media Access Control",
        visual: "card",
        en: {
            title: "What is a MAC address?",
            definition: "A MAC address is a 48-bit hardware-style address that identifies one network interface on a local network.",
            detail: [
                "MAC stands for Media Access Control. A MAC address is a 48-bit address that identifies one network interface, such as your Wi-Fi adapter or Ethernet port, on a local network.",
                "Think of it as the serial number stamped on your network card. It tells other devices on the same local network exactly which interface a message is meant for.",
                "MAC addresses work at the Data Link Layer (Layer 2). Network cards, switches and Wi-Fi access points use them to deliver frames inside one local network.",
            ],
            realLife: "Your laptop connects to home Wi-Fi. The Wi-Fi adapter has its own MAC address, and the router uses it to know exactly which device on the network it is talking to.",
            keyPoint:
                "A MAC address identifies a network interface (not the whole device) on a local network, at Layer 2.",
        },
        hi: {
            title: "MAC address kya hota hai?",
            definition: "MAC address ek 48-bit hardware-style address hai jo local network par ek network interface ko identify karta hai.",
            detail: [
                "MAC ka full form Media Access Control hai. MAC address ek 48-bit address hota hai jo local network par ek network interface (jaise aapka Wi-Fi adapter ya Ethernet port) ko identify karta hai.",
                "Ise network card par lage serial number ki tarah samjho. Yeh same local network ke doosre devices ko batata hai ki message exactly kis interface ke liye hai.",
                "MAC address Data Link Layer (Layer 2) par kaam karta hai. Network cards, switches aur Wi-Fi access points ek local network ke andar frames deliver karne ke liye ise use karte hain.",
            ],
            realLife: "Aapka laptop home Wi-Fi se connect hota hai. Wi-Fi adapter ka apna MAC address hota hai, aur router use dekhkar samajhta hai ki network par woh kis device se baat kar raha hai.",
            keyPoint:
                "MAC address local network par Layer 2 ke level pe ek network interface ko identify karta hai (poore device ko nahi).",
        },
    },

    // 2
    {
        id: "interface-and-nic",
        phase: { en: "Basics", hi: "Basics" },
        icon: "🔌",
        example: "Wi-Fi · Ethernet · Virtual (VPN, VM)",
        visual: "flow",
        flow: [
            { kind: "laptop", label: { en: "Laptop", hi: "Laptop" }, detail: { en: "Your device", hi: "Aapka device" } },
            { kind: "nic", label: { en: "Wi-Fi interface (NIC)", hi: "Wi-Fi interface (NIC)" }, detail: { en: "MAC: AC:DE:48:12:34:56", hi: "MAC: AC:DE:48:12:34:56" }, highlight: true },
            { kind: "network", label: { en: "Local network", hi: "Local network" }, detail: { en: "Router and other devices", hi: "Router aur doosre devices" } },
        ],
        en: {
            title: "Network interface and NIC",
            definition: "A network interface is the connection point a device uses to reach a network, and a NIC is the hardware that provides it.",
            detail: [
                "A network interface is a connection point that lets a device send and receive data on a network. It can be physical (an Ethernet port, a Wi-Fi adapter) or virtual (created by software for a VPN, a virtual machine or a container).",
                "A NIC (Network Interface Card) is the hardware that provides the connection. It can be built into the motherboard, plugged in as a card, or attached as a USB adapter. In most laptops the Wi-Fi NIC is built in.",
                "One device can have many interfaces at the same time, for example Wi-Fi, Ethernet and a VPN adapter. Each interface normally has its own MAC address, so a MAC address identifies the interface, not the whole computer.",
            ],
            realLife: "A laptop has a Wi-Fi adapter, an Ethernet port and a VPN adapter. That is three interfaces, so it can have three different MAC addresses.",
            keyPoint:
                "NIC = the hardware. Interface = the connection point the operating system uses. Each interface usually has its own MAC address.",
        },
        hi: {
            title: "Network interface aur NIC",
            definition: "Network interface woh connection point hai jisse device network tak pahunchta hai, aur NIC woh hardware hai jo use provide karta hai.",
            detail: [
                "Network interface ek connection point hota hai jisse device network par data bhej aur receive kar sakta hai. Yeh physical ho sakta hai (Ethernet port, Wi-Fi adapter) ya virtual (software ne banaya hua, jaise VPN, virtual machine ya container ke liye).",
                "NIC (Network Interface Card) woh hardware hai jo yeh connection deta hai. Yeh motherboard mein built-in ho sakta hai, alag card ki tarah lagaya ja sakta hai, ya USB adapter ki tarah jod sakte hain. Zyada tar laptops mein Wi-Fi NIC built-in hota hai.",
                "Ek device mein ek saath kai interfaces ho sakte hain, jaise Wi-Fi, Ethernet aur VPN adapter. Har interface ka normally apna alag MAC address hota hai, isliye MAC address interface ko identify karta hai, poore computer ko nahi.",
            ],
            realLife: "Ek laptop mein Wi-Fi adapter, Ethernet port aur VPN adapter hain. Yeh teen interfaces hue, isliye teen alag MAC addresses ho sakte hain.",
            keyPoint:
                "NIC = hardware. Interface = woh connection point jo operating system use karta hai. Har interface ka usually apna MAC address hota hai.",
        },
    },

    /* ═════════ Part 2 · Purpose ═════════ */

    // 3
    {
        id: "mac-vs-ip",
        phase: { en: "Purpose", hi: "Purpose" },
        icon: "🔍",
        example: "IP address vs MAC address",
        visual: "card",
        en: {
            title: "MAC address vs IP address",
            definition: "The IP address says where a device is in the world of networks. The MAC address says which interface it is on the local link.",
            detail: [
                "An IP address is a logical address. It can change when you move to another network or get a new address from DHCP. For example, your phone gets one IP at home and a different IP at a cafe.",
                "A MAC address belongs to the network interface, so it normally stays the same on every network. (It can be changed or randomized by software, which we cover later.)",
                "They do different jobs. The IP address helps a packet reach the right network and device across many networks (routing). The MAC address helps a frame reach the right interface on the current local link.",
                "Simple comparison: the IP address is like the address of the building you are staying in right now, and the MAC address is like the name on your ID card. The building address changes when you move; the name stays with you.",
            ],
            realLife: "Your phone gets a different IP at home and at a cafe. Its Wi-Fi MAC address stays the same on both, unless the private address setting is turned on.",
            keyPoint:
                "IP = logical address used for routing between networks. MAC = interface address used on one local link.",
        },
        hi: {
            title: "MAC address vs IP address",
            definition: "IP address batata hai ki device networks ki duniya mein kahan hai. MAC address batata hai ki local link par woh kaunsa interface hai.",
            detail: [
                "IP address ek logical address hota hai. Doosre network mein jaane par ya DHCP se naya address milne par yeh badal sakta hai. Example: aapke phone ko ghar par ek IP milta hai aur cafe mein doosra IP.",
                "MAC address network interface ka hota hai, isliye yeh normally har network par same rehta hai. (Software isse badal ya randomize kar sakta hai, jo hum aage dekhenge.)",
                "Dono ka kaam alag hai. IP address packet ko kai networks ke beech sahi network aur device tak pahunchane mein help karta hai (routing). MAC address frame ko current local link par sahi interface tak pahunchata hai.",
                "Simple comparison: IP address us building ke address jaisa hai jahan aap abhi ruke ho, aur MAC address aapke ID card par likhe naam jaisa. Building ka address move karne par badal jata hai; naam aapke saath rehta hai.",
            ],
            realLife: "Aapke phone ko ghar aur cafe mein alag IP milta hai. Uska Wi-Fi MAC address dono jagah same rehta hai, jab tak private address setting on na ho.",
            keyPoint:
                "IP = networks ke beech routing ke liye logical address. MAC = ek local link par use hone wala interface address.",
        },
    },

    // 4
    {
        id: "interface-example",
        phase: { en: "Purpose", hi: "Purpose" },
        icon: "💻",
        example: "IP 192.168.1.2 · Mask 255.255.255.0 · Gateway 192.168.1.1",
        visual: "card",
        en: {
            title: "Example: settings of one Wi-Fi interface",
            definition: "One interface carries a set of settings together: MAC address, IP address, subnet mask, default gateway and DNS.",
            detail: [
                "Your laptop is connected to a home router over Wi-Fi. Its Wi-Fi interface has these settings: MAC address AC:DE:48:12:34:56, IP address 192.168.1.2, subnet mask 255.255.255.0, default gateway 192.168.1.1, and a DNS server (often the router itself, 192.168.1.1).",
                "What each one does: the MAC address is the identity on the local link. The IP address is the logical address. The subnet mask shows which part of the IP is the network (here 192.168.1.x is local). The default gateway is the router used for anything outside the local network. DNS turns names like example.com into IP addresses.",
                "These settings belong to one interface. If you also plug in an Ethernet cable, that second interface gets its own MAC address, IP address and settings.",
            ],
            realLife: "Open the Wi-Fi details on any laptop and you will see these five values together. The router usually gives the IP, mask, gateway and DNS, while the MAC address comes from the adapter itself.",
            keyPoint:
                "Example: MAC = AC:DE:48:12:34:56, IP = 192.168.1.2, Mask = 255.255.255.0, Gateway = 192.168.1.1.",
        },
        hi: {
            title: "Example: ek Wi-Fi interface ki settings",
            definition: "Ek interface ke saath kuch settings ek set mein hoti hain: MAC address, IP address, subnet mask, default gateway aur DNS.",
            detail: [
                "Aapka laptop Wi-Fi se home router se connected hai. Uske Wi-Fi interface ki settings yeh hain: MAC address AC:DE:48:12:34:56, IP address 192.168.1.2, subnet mask 255.255.255.0, default gateway 192.168.1.1, aur ek DNS server (aksar router hi, 192.168.1.1).",
                "Har ek ka kaam: MAC address local link par identity hai. IP address logical address hai. Subnet mask batata hai ki IP ka kaunsa hissa network hai (yahan 192.168.1.x local hai). Default gateway woh router hai jo local network ke bahar ke har destination ke liye use hota hai. DNS example.com jaise naam ko IP address mein badalta hai.",
                "Yeh settings ek interface ki hain. Agar aap Ethernet cable bhi laga do, to us doosre interface ka apna MAC address, IP address aur settings honge.",
            ],
            realLife: "Kisi bhi laptop ke Wi-Fi details kholo, to yeh paanchon values ek saath dikhengi. IP, mask, gateway aur DNS usually router deta hai, jabki MAC address adapter ka apna hota hai.",
            keyPoint:
                "Example: MAC = AC:DE:48:12:34:56, IP = 192.168.1.2, Mask = 255.255.255.0, Gateway = 192.168.1.1.",
        },
    },

    // 5
    {
        id: "mac-in-frame",
        phase: { en: "Purpose", hi: "Purpose" },
        icon: "📦",
        example: "Destination MAC | Source MAC | Data",
        visual: "flow",
        flow: [
            { kind: "laptop", label: { en: "Laptop", hi: "Laptop" }, detail: { en: "Source MAC: AC:DE:48:12:34:56", hi: "Source MAC: AC:DE:48:12:34:56" } },
            { kind: "router", label: { en: "Router (Default Gateway)", hi: "Router (Default Gateway)" }, detail: { en: "Destination MAC: 00:00:5E:00:53:01", hi: "Destination MAC: 00:00:5E:00:53:01" }, highlight: true },
            { kind: "server", label: { en: "Remote server", hi: "Remote server" }, detail: { en: "Reached by IP address", hi: "IP address se pahunchte hain" } },
        ],
        en: {
            title: "How MAC addresses are used in a frame",
            definition: "Every frame carries a destination MAC and a source MAC, and they only matter for one hop.",
            detail: [
                "When a device sends data over Ethernet or Wi-Fi, the data is wrapped in a frame. The frame header carries a destination MAC address and a source MAC address (in an Ethernet frame the destination comes first).",
                "Same local network: the destination MAC is the MAC of the target device. A switch reads it and sends the frame only out of the port where that device is connected.",
                "Different network: the destination IP is far away, but the destination MAC is the MAC of your default gateway (the router). The router takes the packet out of that frame and puts it into a new frame for the next link.",
                "So MAC addresses are used for one hop at a time and get replaced at every router, while the source and destination IP addresses normally stay the same from start to end.",
            ],
            realLife: "You open a website. Your laptop puts the router's MAC as the destination in the frame. The router then builds a new frame for the next link, with a different pair of MAC addresses.",
            keyPoint:
                "MAC addresses work one hop at a time. Routers replace them at every hop; IP addresses normally stay the same.",
        },
        hi: {
            title: "Frame mein MAC address ka use",
            definition: "Har frame mein destination MAC aur source MAC hote hain, aur woh sirf ek hop ke liye matter karte hain.",
            detail: [
                "Jab device Ethernet ya Wi-Fi par data bhejta hai, data ek frame mein pack hota hai. Frame header mein destination MAC address aur source MAC address hote hain (Ethernet frame mein destination pehle aata hai).",
                "Same local network: destination MAC target device ka MAC hota hai. Switch use padhta hai aur frame sirf usi port se bhejta hai jahan woh device connected hai.",
                "Different network: destination IP door hota hai, lekin destination MAC aapke default gateway (router) ka hota hai. Router packet ko us frame se nikaalkar next link ke liye naye frame mein daal deta hai.",
                "Isliye MAC address ek time par sirf ek hop ke liye kaam karta hai aur har router par badal jata hai, jabki source aur destination IP address normally shuru se end tak same rehte hain.",
            ],
            realLife: "Aap ek website kholte ho. Laptop frame mein destination ke roop mein router ka MAC lagata hai. Phir router next link ke liye naya frame banata hai, jismein MAC addresses ki alag jodi hoti hai.",
            keyPoint:
                "MAC address ek time par ek hop ke liye kaam karta hai. Router har hop par use badal deta hai; IP address normally same rehte hain.",
        },
    },

    // 6
    {
        id: "arp",
        phase: { en: "Purpose", hi: "Purpose" },
        icon: "📣",
        example: "ARP: Who has 192.168.1.1?",
        visual: "flow",
        flow: [
            { kind: "laptop", label: { en: "Laptop", hi: "Laptop" }, detail: { en: "Asks: who has 192.168.1.1?", hi: "Puchta hai: who has 192.168.1.1?" } },
            { kind: "broadcast", label: { en: "Broadcast", hi: "Broadcast" }, detail: { en: "FF:FF:FF:FF:FF:FF", hi: "FF:FF:FF:FF:FF:FF" }, highlight: true },
            { kind: "router", label: { en: "Router", hi: "Router" }, detail: { en: "Replies: my MAC is 00:00:5E:00:53:01", hi: "Reply: mera MAC 00:00:5E:00:53:01 hai" } },
        ],
        en: {
            title: "ARP: finding a MAC from an IP",
            definition: "ARP is how a device finds the MAC address that belongs to an IPv4 address on the local network.",
            detail: [
                "A device usually knows the IP address of its target (or of the gateway), but to build the frame it also needs the MAC address.",
                "In IPv4 it finds it using ARP (Address Resolution Protocol). The device broadcasts a question to everyone on the local network: 'Who has 192.168.1.1? Tell 192.168.1.2.'",
                "The device that owns that IP replies directly with its MAC address. The asker saves the answer in its ARP cache for a while, so it does not need to ask again for every packet.",
                "IPv6 does the same job with Neighbor Discovery instead of ARP.",
            ],
            realLife: "It is like calling out in a room: 'Who is 192.168.1.1?' The router answers: 'That is me, and here is my MAC address.' Your laptop remembers the answer for a while.",
            keyPoint:
                "ARP maps an IPv4 address to a MAC address on the local network. You can see saved entries with the command: arp -a",
        },
        hi: {
            title: "ARP: IP se MAC address dhundhna",
            definition: "ARP woh tareeka hai jisse device local network par kisi IPv4 address ka MAC address pata karta hai.",
            detail: [
                "Device ko usually target ka (ya gateway ka) IP address pata hota hai, lekin frame banane ke liye use MAC address bhi chahiye.",
                "IPv4 mein yeh ARP (Address Resolution Protocol) se pata chalta hai. Device local network par sabko ek broadcast question bhejta hai: 'Who has 192.168.1.1? Tell 192.168.1.2.'",
                "Jis device ke paas woh IP hai, woh apna MAC address seedha reply mein bhej deta hai. Puchne wala device jawab kuch der ke liye ARP cache mein save kar leta hai, taaki har packet ke liye dobara na puchna pade.",
                "IPv6 mein yahi kaam ARP ki jagah Neighbor Discovery karta hai.",
            ],
            realLife: "Yeh ek kamre mein awaaz lagane jaisa hai: 'Who is 192.168.1.1?' Router jawab deta hai: 'Woh main hoon, aur yeh mera MAC address hai.' Laptop yeh jawab kuch der yaad rakhta hai.",
            keyPoint:
                "ARP local network par IPv4 address ko MAC address se map karta hai. Saved entries dekhne ke liye command: arp -a",
        },
    },

    /* ═════════ Part 3 · Structure ═════════ */

    // 7
    {
        id: "structure",
        phase: { en: "Structure", hi: "Structure" },
        icon: "🧩",
        example: MAC_EXAMPLE,
        visual: "mac",
        en: {
            title: "Structure of a MAC address",
            definition: "A MAC address is 6 bytes (48 bits), written as 12 hexadecimal digits.",
            detail: [
                "A standard MAC address is 48 bits long, which is 6 bytes (also called octets). Each byte is written as two hexadecimal digits, so the whole address has 12 hex digits.",
                "It can be written in different styles, but the address is the same: colons AC:DE:48:12:34:56 (Linux, macOS), hyphens AC-DE-48-12-34-56 (Windows), or dots acde.4812.3456 (Cisco devices).",
                "With 48 bits there are 2^48 = 281,474,976,710,656 possible addresses (about 281 trillion), which is why every interface can get a different one.",
            ],
            realLife: "The same address AC:DE:48:12:34:56 can appear as AC-DE-48-12-34-56 on Windows and as acde.4812.3456 on a Cisco switch. It is still one address.",
            keyPoint:
                "6 bytes × 8 bits = 48 bits = 12 hex digits. Colon, hyphen and dot styles are just different ways to write the same address.",
        },
        hi: {
            title: "MAC address ki structure",
            definition: "MAC address 6 bytes (48 bits) ka hota hai, jo 12 hexadecimal digits mein likha jata hai.",
            detail: [
                "Ek standard MAC address 48 bits ka hota hai, yaani 6 bytes (jinhe octets bhi kehte hain). Har byte do hexadecimal digits mein likha jata hai, isliye poore address mein 12 hex digits hote hain.",
                "Ise alag-alag style mein likha ja sakta hai, lekin address same rehta hai: colons AC:DE:48:12:34:56 (Linux, macOS), hyphens AC-DE-48-12-34-56 (Windows), ya dots acde.4812.3456 (Cisco devices).",
                "48 bits se 2^48 = 281,474,976,710,656 possible addresses bante hain (lagbhag 281 trillion), isliye har interface ko alag address mil sakta hai.",
            ],
            realLife: "Wahi address AC:DE:48:12:34:56 Windows par AC-DE-48-12-34-56 aur Cisco switch par acde.4812.3456 dikh sakta hai. Phir bhi woh ek hi address hai.",
            keyPoint:
                "6 bytes × 8 bits = 48 bits = 12 hex digits. Colon, hyphen aur dot style ek hi address likhne ke alag tareeke hain.",
        },
    },

    // 8
    {
        id: "hexadecimal",
        phase: { en: "Structure", hi: "Structure" },
        icon: "🔢",
        example: "A = 1010 · C = 1100 → AC = 10101100",
        visual: "binary",
        en: {
            title: "Hexadecimal made easy",
            definition: "Hexadecimal is a base-16 number system in which one digit stands for exactly 4 bits.",
            detail: [
                "Hexadecimal (hex) is a base-16 number system. It uses the digits 0 to 9 and the letters A to F, where A = 10, B = 11, C = 12, D = 13, E = 14 and F = 15.",
                "One hex digit stands for exactly 4 bits, so two hex digits make one byte (8 bits). That is why hex is a short way to write binary.",
                "Example with the first byte AC: A = 1010 and C = 1100, so AC = 10101100 in binary. In decimal, AC = 10 × 16 + 12 = 172.",
                "The boxes on the left show every byte of the example address in binary. Try one yourself: 56 = 0101 0110.",
            ],
            realLife: "The decimal number 172 needs three characters, but in hex it is only AC. That is why network tools show MAC addresses in hex instead of long rows of 0s and 1s.",
            keyPoint:
                "1 hex digit = 4 bits, so 2 hex digits = 1 byte. AC = 1010 1100 in binary.",
        },
        hi: {
            title: "Hexadecimal easy way mein",
            definition: "Hexadecimal ek base-16 number system hai jismein ek digit exactly 4 bits ko represent karta hai.",
            detail: [
                "Hexadecimal (hex) ek base-16 number system hai. Ismein digits 0 se 9 aur letters A se F hote hain, jahan A = 10, B = 11, C = 12, D = 13, E = 14 aur F = 15.",
                "Ek hex digit exactly 4 bits ko represent karta hai, isliye do hex digits milkar ek byte (8 bits) banate hain. Isi wajah se hex binary likhne ka chhota tareeka hai.",
                "Pehle byte AC ka example: A = 1010 aur C = 1100, to AC = 10101100 binary mein. Decimal mein AC = 10 × 16 + 12 = 172.",
                "Left side ke boxes example address ke har byte ko binary mein dikhate hain. Khud try karo: 56 = 0101 0110.",
            ],
            realLife: "Decimal number 172 ke liye teen characters chahiye, lekin hex mein woh sirf AC hai. Isi wajah se network tools MAC address ko 0 aur 1 ki lambi line ki jagah hex mein dikhate hain.",
            keyPoint:
                "1 hex digit = 4 bits, isliye 2 hex digits = 1 byte. AC = 1010 1100 binary mein.",
        },
    },

    // 9
    {
        id: "oui",
        phase: { en: "Structure", hi: "Structure" },
        icon: "🏭",
        example: "AC:DE:48 | 12:34:56",
        visual: "parts",
        en: {
            title: "OUI and the interface-specific part",
            definition: "The first 3 bytes are the OUI (organization) and the last 3 bytes identify the interface inside that organization's block.",
            detail: [
                "The 48 bits are split into two halves of 24 bits each. The first 3 bytes are the OUI (Organizationally Unique Identifier). The IEEE assigns OUIs to organizations, for example companies that make network cards and devices.",
                "The last 3 bytes are given out by that organization to each interface it builds, so every card in that block gets a different value. This is how addresses stay unique worldwide.",
                "In AC:DE:48:12:34:56, the OUI part is AC:DE:48 and the interface-specific part is 12:34:56. Public OUI lookup tools can tell which organization received a block.",
                "Be careful: an OUI shows who received the address block, not always the real brand of the device. Some companies build cards for others, and software can change the address.",
            ],
            realLife: "It works like a book's ISBN: one part points to the publisher, and the rest is the number of that particular book. Likewise the OUI points to the organization, and the last 3 bytes point to one interface.",
            keyPoint:
                "First 24 bits = OUI (organization). Last 24 bits = assigned by that organization for each interface. An OUI is a hint, not proof of the maker.",
        },
        hi: {
            title: "OUI aur interface wala hissa",
            definition: "Pehle 3 bytes OUI (organization) hote hain aur last 3 bytes us organization ke block ke andar interface ko identify karte hain.",
            detail: [
                "48 bits do halves mein bante hain, har half 24 bits ka. Pehle 3 bytes OUI (Organizationally Unique Identifier) hote hain. IEEE OUI organizations ko assign karta hai, jaise network cards aur devices banane wali companies.",
                "Last 3 bytes woh organization apne banaye har interface ko deti hai, isliye us block ke har card ki value alag hoti hai. Isi tarah addresses poori duniya mein unique rehte hain.",
                "AC:DE:48:12:34:56 mein OUI wala hissa AC:DE:48 hai aur interface wala hissa 12:34:56. Public OUI lookup tools batate hain ki kaunsa block kis organization ko mila.",
                "Dhyan rakho: OUI batata hai ki address block kisko mila, hamesha device ka real brand nahi. Kuch companies doosron ke liye cards banati hain, aur software address badal bhi sakta hai.",
            ],
            realLife: "Yeh kitab ke ISBN jaisa hai: ek hissa publisher ko point karta hai, aur baaki us khaas kitab ka number hota hai. Waise hi OUI organization ko point karta hai, aur last 3 bytes ek interface ko.",
            keyPoint:
                "Pehle 24 bits = OUI (organization). Last 24 bits = us organization ne har interface ke liye diye. OUI ek hint hai, maker ka proof nahi.",
        },
    },

    // 10
    {
        id: "special-bits",
        phase: { en: "Structure", hi: "Structure" },
        icon: "🚩",
        example: "AC = 1010 1100",
        visual: "flags",
        en: {
            title: "Special bits in the first byte",
            definition: "Two bits in the first byte tell whether an address is unicast or group, and universal or locally set.",
            detail: [
                "Two bits in the first byte have a special meaning. They are the last two bits, on the right side of the first byte written in binary.",
                "Last bit (I/G bit): 0 means unicast, meant for one interface. 1 means a group address (multicast). The broadcast address FF:FF:FF:FF:FF:FF is a special group address that means everyone on the local network.",
                "Second-last bit (U/L bit): 0 means universally administered, assigned by the manufacturer using an OUI. 1 means locally administered, set by software or an administrator.",
                "For AC = 10101100 both bits are 0, so it is a normal unicast, universally administered address. Addresses made by software, such as private Wi-Fi addresses on phones, usually have the U/L bit set to 1. Their first byte then ends in 2, 6, A or E.",
            ],
            realLife: "FF:FF:FF:FF:FF:FF is the broadcast address. It is like an announcement on a loudspeaker that every device on the local network hears. A normal unicast address is like calling one person by name.",
            keyPoint:
                "Last bit 1 = group address (multicast or broadcast). Second-last bit 1 = locally administered (set by software).",
        },
        hi: {
            title: "Pehle byte ke special bits",
            definition: "Pehle byte ke do bits batate hain ki address unicast hai ya group, aur universal hai ya locally set.",
            detail: [
                "Pehle byte ke do bits ka special matlab hota hai. Yeh last ke do bits hain, jab pehle byte ko binary mein likhte hain to right side ke.",
                "Last bit (I/G bit): 0 ka matlab unicast, yaani ek interface ke liye. 1 ka matlab group address (multicast). Broadcast address FF:FF:FF:FF:FF:FF ek special group address hai jiska matlab hai local network ke sabhi devices.",
                "Second-last bit (U/L bit): 0 ka matlab universally administered, yaani manufacturer ne OUI se assign kiya. 1 ka matlab locally administered, yaani software ya administrator ne set kiya.",
                "AC = 10101100 mein dono bits 0 hain, isliye yeh normal unicast, universally administered address hai. Software se bane addresses, jaise phone ke private Wi-Fi address, mein usually U/L bit 1 hota hai. Unke pehle byte ka last hex digit 2, 6, A ya E hota hai.",
            ],
            realLife: "FF:FF:FF:FF:FF:FF broadcast address hai. Yeh loudspeaker par announcement jaisa hai jo local network ke har device ko sunai deta hai. Normal unicast address kisi ek insaan ko naam se bulane jaisa hai.",
            keyPoint:
                "Last bit 1 = group address (multicast ya broadcast). Second-last bit 1 = locally administered (software ne set kiya).",
        },
    },

    /* ═════════ Part 4 · Practice ═════════ */

    // 11
    {
        id: "can-it-change",
        phase: { en: "Practice", hi: "Practice" },
        icon: "🔄",
        example: "Burned-in · Changed · Randomized",
        visual: "card",
        en: {
            title: "Can a MAC address change?",
            definition: "A MAC address is normally fixed in hardware, but software can change or randomize it.",
            detail: [
                "Most interfaces ship with a MAC address stored in the hardware. It is often called the burned-in address.",
                "But the operating system can use a different address. This is called MAC address change or spoofing, and it is easy to do in software. Many phones and laptops also use randomized (private) MAC addresses on Wi-Fi so that you are harder to track across networks.",
                "Because of this, a MAC address is a useful identifier on a local network, but it is not a strong security feature. MAC filtering on a router can be bypassed by copying an allowed address.",
                "Virtual machines and containers also get generated MAC addresses. Two devices with the same MAC address on one network cause connection problems.",
            ],
            realLife: "With private address turned on, your phone can show a different Wi-Fi MAC for each network, so shops and public Wi-Fi cannot easily track you from place to place.",
            keyPoint:
                "A MAC address is normally fixed in hardware, but software can change or randomize it. Do not rely on it for security.",
        },
        hi: {
            title: "Kya MAC address badal sakta hai?",
            definition: "MAC address normally hardware mein fixed hota hai, lekin software use badal ya randomize kar sakta hai.",
            detail: [
                "Zyada tar interfaces hardware mein stored MAC address ke saath aate hain. Ise aksar burned-in address kehte hain.",
                "Lekin operating system koi doosra address bhi use kar sakta hai. Ise MAC address change ya spoofing kehte hain, aur software se yeh aasan hai. Kai phones aur laptops Wi-Fi par randomized (private) MAC address bhi use karte hain, taaki alag-alag networks par aapko track karna mushkil ho.",
                "Isliye MAC address local network par ek useful identifier hai, lekin strong security feature nahi. Router par MAC filtering ko allowed address copy karke bypass kiya ja sakta hai.",
                "Virtual machines aur containers ko bhi generated MAC address milte hain. Ek network par do devices ka same MAC address hone se connection problems hoti hain.",
            ],
            realLife: "Private address on hone par aapka phone har network ke liye alag Wi-Fi MAC dikha sakta hai, isliye shops aur public Wi-Fi aapko ek jagah se doosri jagah aasani se track nahi kar paate.",
            keyPoint:
                "MAC address normally hardware mein fixed hota hai, lekin software use badal ya randomize kar sakta hai. Security ke liye ispar depend mat karo.",
        },
    },

    // 12
    {
        id: "find-your-mac",
        phase: { en: "Practice", hi: "Practice" },
        icon: "🛠️",
        example: "ipconfig /all · ip link · ifconfig",
        visual: "card",
        en: {
            title: "How to find your own MAC address",
            definition: "You can read the MAC address of an interface with a short command or from your device settings.",
            detail: [
                "Windows: open Command Prompt and run ipconfig /all. Under your Wi-Fi or Ethernet adapter, read the value next to Physical Address.",
                "Linux: run ip link show and read the value after link/ether for your interface.",
                "macOS: run ifconfig en0 and read the value after ether (en0 is usually Wi-Fi on a laptop). You can also check the network settings for the hardware address.",
                "Android and iPhone: open Settings, go to About, and look for Wi-Fi address. If private or random address is on, the address can be different for each Wi-Fi network.",
            ],
            realLife: "On Windows, open Command Prompt, type ipconfig /all and copy the Physical Address of your Wi-Fi adapter. It will look like AC-DE-48-12-34-56.",
            keyPoint:
                "Windows: ipconfig /all (Physical Address). Linux: ip link (link/ether). macOS: ifconfig en0 (ether).",
        },
        hi: {
            title: "Apna MAC address kaise dhundhein",
            definition: "Interface ka MAC address aap ek chhote command se ya device settings se dekh sakte ho.",
            detail: [
                "Windows: Command Prompt kholo aur ipconfig /all chalao. Apne Wi-Fi ya Ethernet adapter ke neeche Physical Address ke saamne likhi value padho.",
                "Linux: ip link show chalao aur apne interface ke liye link/ether ke baad wali value padho.",
                "macOS: ifconfig en0 chalao aur ether ke baad wali value padho (en0 laptop mein usually Wi-Fi hota hai). Aap network settings mein bhi hardware address dekh sakte ho.",
                "Android aur iPhone: Settings kholo, About mein jao, aur Wi-Fi address dhundho. Agar private ya random address on hai, to har Wi-Fi network ke liye address alag ho sakta hai.",
            ],
            realLife: "Windows par Command Prompt kholo, ipconfig /all type karo aur apne Wi-Fi adapter ka Physical Address copy karo. Woh AC-DE-48-12-34-56 jaisa dikhega.",
            keyPoint:
                "Windows: ipconfig /all (Physical Address). Linux: ip link (link/ether). macOS: ifconfig en0 (ether).",
        },
    },

    // 13
    {
        id: "recap",
        phase: { en: "Practice", hi: "Practice" },
        icon: "✅",
        example: "48 bits = 6 bytes = 12 hex digits",
        visual: "parts",
        en: {
            title: "What you learned",
            definition: "A MAC address identifies an interface on a local link, while an IP address helps route traffic between networks.",
            detail: [
                "A MAC address is a 48-bit Layer 2 address of a network interface, written as six hex pairs like AC:DE:48:12:34:56.",
                "A NIC is the hardware, and a network interface is the connection point the device uses. Each interface normally has its own MAC address.",
                "The first 24 bits are the OUI (organization) and the last 24 bits are assigned by that organization. Two special bits in the first byte show unicast or group, and universal or local.",
                "MAC addresses deliver frames one hop at a time on a local link, and ARP helps find a MAC from an IP. IP addresses do the end-to-end routing between networks.",
            ],
            realLife: "When you open a website, IP addresses decide the whole trip, and MAC addresses handle each single step between two neighbouring devices, such as laptop to router and router to ISP.",
            keyPoint:
                "MAC = which interface on this local link. IP = which device in the world of networks. Both are needed.",
        },
        hi: {
            title: "Aapne kya seekha",
            definition: "MAC address local link par ek interface ko identify karta hai, jabki IP address networks ke beech traffic route karne mein help karta hai.",
            detail: [
                "MAC address ek network interface ka 48-bit Layer 2 address hai, jo chhe hex pairs mein likha jata hai, jaise AC:DE:48:12:34:56.",
                "NIC hardware hai, aur network interface woh connection point hai jo device use karta hai. Har interface ka normally apna MAC address hota hai.",
                "Pehle 24 bits OUI (organization) hain aur last 24 bits us organization ne assign kiye. Pehle byte ke do special bits batate hain ki address unicast hai ya group, aur universal hai ya local.",
                "MAC address local link par frames ko ek hop tak deliver karta hai, aur ARP IP se MAC dhundhne mein help karta hai. IP address networks ke beech end-to-end routing karta hai.",
            ],
            realLife: "Jab aap website kholte ho, IP addresses poori trip decide karte hain, aur MAC addresses do padosi devices ke beech har ek step sambhalte hain, jaise laptop se router aur router se ISP.",
            keyPoint:
                "MAC = is local link par kaunsa interface. IP = networks ki duniya mein kaunsa device. Dono chahiye.",
        },
    },
];