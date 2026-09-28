export type DefinitionCategory = "basics" | "addressing" | "subnetting" | "routing";

export interface DefinitionItem {
  id: string;
  category: DefinitionCategory;
  term: string;
  /** Full form / abbreviation (optional) */
  fullForm?: string;
  /** Plain-text diagram or worked example (optional) */
  diagram?: string;
  en: { definition: string; note?: string };
  hi: { definition: string; note?: string };
}

export const DEFINITIONS_LABELS = {
  en: {
    lessonTitle: "Networking Revision",
    heroTitle: "Networking definitions in one place",
    heroSubtitle: "Short definitions and diagrams for every core networking term — perfect for a quick revision.",
    searchPlaceholder: "Search a term (e.g. CIDR, gateway)",
    all: "All",
    terms: "terms",
    showDetails: "Show diagram",
    hideDetails: "Hide diagram",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    noResults: "No term matches your search.",
    categories: {
      basics: "Basics",
      addressing: "Addressing",
      subnetting: "Subnetting",
      routing: "Routing",
    },
  },
  hi: {
    lessonTitle: "Networking Revision",
    heroTitle: "Saari networking definitions ek jagah",
    heroSubtitle: "Har core networking term ki short definition aur diagram — quick revision ke liye perfect.",
    searchPlaceholder: "Term search karo (jaise CIDR, gateway)",
    all: "Sab",
    terms: "terms",
    showDetails: "Diagram dekho",
    hideDetails: "Diagram chhupao",
    expandAll: "Sab kholo",
    collapseAll: "Sab band karo",
    noResults: "Aapki search se koi term match nahi hua.",
    categories: {
      basics: "Basics",
      addressing: "Addressing",
      subnetting: "Subnetting",
      routing: "Routing",
    },
  },
} as const;

export const DEFINITIONS: DefinitionItem[] = [
  // ───────────── BASICS ─────────────
  {
    id: "internet",
    category: "basics",
    term: "Internet",
    diagram: String.raw`  Home LAN ──┐
  Office LAN ─┼── ISPs ── Data centers ── Servers
  Mobile net ─┘

  Internet = network of interconnected networks`,
    en: {
      definition:
        "The Internet is a worldwide network of interconnected networks that allows devices to communicate and exchange data with each other.",
    },
    hi: {
      definition:
        "Internet interconnected networks ka ek worldwide network hai, jisse devices ek-dusre se communicate karte hain aur data exchange karte hain.",
    },
  },
  {
    id: "network",
    category: "basics",
    term: "Network",
    diagram: String.raw`  Laptop ──┐
  Phone  ───┼── Router   →  one network
  Tab    ───┘`,
    en: {
      definition:
        "A network is a group of two or more devices connected together so they can communicate and share data or resources.",
      note: "Devices in the same network can talk to each other even without internet.",
    },
    hi: {
      definition:
        "Network do ya zyada devices ka group hota hai jo aapas mein connected hain, taaki woh communicate kar sakein aur data ya resources share kar sakein.",
      note: "Same network ke devices internet ke bina bhi ek-dusre se baat kar sakte hain.",
    },
  },
  {
    id: "host",
    category: "basics",
    term: "Host",
    diagram: String.raw`  Network
     |
     ├── Laptop   ← Host
     ├── Phone    ← Host
     ├── Server   ← Host
     └── Printer  ← Host`,
    en: {
      definition: "A host is any device connected to a network that can send or receive data.",
      note: "Every host holds one unique IP address in that network.",
    },
    hi: {
      definition: "Host woh koi bhi device hai jo network se connected hai aur data bhej ya receive kar sakta hai.",
      note: "Har host us network mein ek unique IP address hold karta hai.",
    },
  },
  {
    id: "lan",
    category: "basics",
    term: "LAN",
    fullForm: "Local Area Network",
    diagram: String.raw`             ROUTER
            /  |   \
           ↓   ↓    ↓
      Laptop Phone Printer
   192.168.1.10  .11  .12

             ↓
            LAN`,
    en: {
      definition: "A LAN is a network that connects devices within a limited or local area, like a home or an office.",
    },
    hi: {
      definition: "LAN ek aisa network hai jo limited ya local area ke andar devices ko connect karta hai, jaise ghar ya office.",
    },
  },
  {
    id: "wan",
    category: "basics",
    term: "WAN",
    fullForm: "Wide Area Network",
    diagram: String.raw`  LAN (Delhi) ───── WAN ───── LAN (Mumbai)`,
    en: {
      definition: "A WAN is a network that spans a large geographic area and connects multiple LANs together. The Internet is the biggest WAN.",
    },
    hi: {
      definition: "WAN ek bade geographic area mein phaila network hai jo multiple LANs ko aapas mein jodta hai. Internet sabse bada WAN hai.",
    },
  },
  {
    id: "dhcp",
    category: "basics",
    term: "DHCP",
    fullForm: "Dynamic Host Configuration Protocol",
    diagram: String.raw`  New device joins  ──►  Router (DHCP)
                          │
  Device gets  ◄──────────┘
  IP: 192.168.1.11`,
    en: {
      definition:
        "DHCP automatically provides network configuration, such as an IP address, to devices joining a network.",
    },
    hi: {
      definition:
        "DHCP network join karne wale devices ko automatically network configuration deta hai, jaise IP address.",
    },
  },

  // ───────────── ADDRESSING ─────────────
  {
    id: "ip-address",
    category: "addressing",
    term: "IP address",
    fullForm: "Internet Protocol address",
    diagram: String.raw`  192  .  168  .  1   .  10
  8 bits  8 bits  8 bits  8 bits  = 32 bits (IPv4)`,
    en: {
      definition:
        "An IPv4 address is a 32-bit number, written as four dot-separated octets, that identifies a host on a network.",
    },
    hi: {
      definition:
        "IPv4 address ek 32-bit number hota hai, jo chaar dot-separated octets mein likha jaata hai aur network par ek host ko identify karta hai.",
    },
  },
  {
    id: "octet",
    category: "addressing",
    term: "Octet",
    diagram: String.raw`  192.168.1.10
  ↑   ↑  ↑ ↑
  1st 2nd 3rd 4th octet  (each = 8 bits)`,
    en: {
      definition: "An octet is one dot-separated part of an IPv4 address. Each octet is exactly 8 bits.",
    },
    hi: {
      definition: "Octet IPv4 address ka ek dot-separated part hota hai. Har octet exactly 8 bits ka hota hai.",
    },
  },
  {
    id: "cidr",
    category: "addressing",
    term: "CIDR",
    fullForm: "Classless Inter-Domain Routing",
    diagram: String.raw`  192.168.1.0/24
              └─ /24
  First 24 bits = Network portion
  Remaining 8 bits = Host portion

  Network bits                  Host bits
  <──────────────────────────>  <──────>
  11111111.11111111.11111111 .  00000000
           24 bits                8 bits`,
    en: {
      definition:
        "CIDR is a notation used to represent an IP network and specify how many bits belong to the network portion.",
      note: "Max hosts = 2^(32 − prefix). For /24 that is 2⁸ = 256 addresses.",
    },
    hi: {
      definition:
        "CIDR ek notation hai jo IP network ko represent karti hai aur batati hai ki kitne bits network portion ke hain.",
      note: "Max hosts = 2^(32 − prefix). /24 ke liye 2⁸ = 256 addresses.",
    },
  },
  {
    id: "network-address",
    category: "addressing",
    term: "Network address",
    diagram: String.raw`  192.168.1.0   ← whole network (first IP, host bits all 0)
  192.168.1.1   ← router
  192.168.1.2   ← host
  ...
  192.168.1.255 ← broadcast (host bits all 1)`,
    en: {
      definition:
        "The network address is the first IP of a network (all host bits are 0). It represents the whole network or subnet, not a single device.",
    },
    hi: {
      definition:
        "Network address kisi network ka pehla IP hota hai (saare host bits 0). Yeh poore network ya subnet ko represent karta hai, kisi ek device ko nahi.",
    },
  },
  {
    id: "broadcast",
    category: "addressing",
    term: "Broadcast",
    fullForm: "e.g. 192.168.1.255",
    diagram: String.raw`          Router
            |
   ┌────────┼────────┐
   ↓        ↓        ↓
 Laptop   Phone   Printer
   ↑        ↑        ↑
   └──── Broadcast ──┘`,
    en: {
      definition:
        "Broadcast is a one-to-all communication method in which a device sends a packet to all devices within the same local broadcast domain (for IPv4, a subnet).",
    },
    hi: {
      definition:
        "Broadcast one-to-all communication method hai, jisme ek device same local broadcast domain (IPv4 mein subnet) ke saare devices ko packet bhejta hai.",
    },
  },

  // ───────────── SUBNETTING ─────────────
  {
    id: "subnet",
    category: "subnetting",
    term: "Subnet",
    diagram: String.raw`        BIG COMPANY NETWORK
                |
      ┌─────────┴─────────┐
      ↓                   ↓
  HR SUBNET           DEV SUBNET
 192.168.1.0/24     192.168.2.0/24
  |   |   |           |   |   |
 HR1 HR2 HR3         D1  D2  D3

  Subnetting 192.168.1.0/24 into two /25:
  ┌──────────────┬──────────────┐
  │  Dept A /25  │  Dept B /25  │
  │  126 hosts   │  126 hosts   │
  └──────────────┴──────────────┘`,
    en: {
      definition: "A subnet is a smaller logical network created by dividing a larger network.",
    },
    hi: {
      definition: "Subnet ek chhota logical network hai jo kisi bade network ko divide karke banaya jaata hai.",
    },
  },
  {
    id: "subnet-mask",
    category: "subnetting",
    term: "Subnet mask",
    diagram: String.raw`  IP Address:   192.168.1.10
  Subnet Mask:  255.255.255.0

  Mask 1s  = network part
  Mask 0s  = host part`,
    en: {
      definition:
        "A subnet mask tells your device which part of an IP address represents the network and which part represents the device (host).",
      note: "255.255.255.0 is the same as /24.",
    },
    hi: {
      definition:
        "Subnet mask aapke device ko batata hai ki IP address ka kaun sa part network ko represent karta hai aur kaun sa part device (host) ko.",
      note: "255.255.255.0 aur /24 same hain.",
    },
  },
  {
    id: "same-network",
    category: "subnetting",
    term: "Same network check (AND)",
    diagram: String.raw`  IP:    11000000 . 10101000 . 00000001 . 00001010   (192.168.1.10)
  Mask:  11111111 . 11111111 . 11111111 . 00000000   (255.255.255.0)
  ─────────────────────────────────────────────────  AND
  Result:11000000 . 10101000 . 00000001 . 00000000

  = 192.168.1.0  → Network address

  AND rule:  1&1=1   1&0=0   0&1=0   0&0=0`,
    en: {
      definition:
        "To know if another device is on the same network, your device ANDs its IP with the subnet mask. If both IPs give the same network address, they are on the same network.",
      note: "AND keeps the network bits (mask 1) and zeroes out the host bits (mask 0).",
    },
    hi: {
      definition:
        "Doosra device same network mein hai ya nahi, yeh check karne ke liye aapka device apne IP ko subnet mask ke saath AND karta hai. Agar dono IPs ka network address same aaye, toh woh same network mein hain.",
      note: "AND network bits (mask 1) ko rakhta hai aur host bits (mask 0) ko zero kar deta hai.",
    },
  },


  {
    id: "default-gateway",
    category: "routing",
    term: "Default gateway",
    diagram: String.raw`  Laptop 192.168.1.10
        │  destination NOT in my network?
        ↓
  Default Gateway (Router) 192.168.1.1
        │
        ↓
     Internet`,
    en: {
      definition:
        "The default gateway is the device or IP address to which your computer sends packets when the destination is not in your local network.",
      note: "In a home network, the router's LAN IP is usually the default gateway.",
    },
    hi: {
      definition:
        "Default gateway woh device ya IP address hota hai jiske paas aapka computer packet bhejta hai jab destination aapke local network mein nahi hota.",
      note: "Home network mein router ka LAN IP usually default gateway hota hai.",
    },
  },
];