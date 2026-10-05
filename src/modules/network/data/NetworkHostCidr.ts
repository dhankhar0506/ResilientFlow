export interface NetworkDevice {
  icon: string;
  name: string;
  ip: string;
}

export type NetworkScene =
  | "network" // router + devices diagram
  | "address" // street / houses diagram
  | "notation" // annotated 192.168.1.0/24 + bit bar
  | "bits" // 32-bit bar + stats
  | "count" // 256-cell grid
  | "compare" // bit bar + size bars
  | "playground"; // interactive prefix slider

export type NetworkFocus = "links" | "hosts" | "lan";

export interface NetworkLang {
  title: string;
  summary: string; // one crisp line
  detail: string; // plain-language explanation
  points?: string[];
  example?: string[]; // monospace lines
  analogy?: string;
  term?: { name: string; meaning: string };
  note?: string; // "good to know" caveat
}

export interface NetworkHostStep {
  id: string;
  phase: string;
  scene: NetworkScene;
  example: string; // IP shown in the visual
  prefix: number | null;
  focus?: NetworkFocus;
  devices?: NetworkDevice[];
  en: NetworkLang;
  hi: NetworkLang;
}

export const NETWORK_HOST_LABELS = {
  en: {
    lessonTitle: "Network, Host & CIDR",
    heroTitle: "Network, host and CIDR, explained step by step",
    heroSubtitle:
      "Learn how devices connect, what an IP address belongs to, and how /24, /16 and /0 split an address into network and host.",
    octet: "Octet",
    router: "Router",
    internet: "Internet",
    homeNetwork: "Your home network",
    lan: "Local Area Network (LAN)",
    notNeeded: "Not needed",
    hostTag: "Host",
    networkPart: "Network part",
    hostPart: "Host part",
    networkBits: "Network bits",
    hostBits: "Host bits",
    totalAddresses: "Total addresses",
    usableHosts: "Usable hosts",
    networkAddress: "Network address",
    broadcastAddress: "Broadcast address",
    addressRange: "Address range",
    notApplicable: "n/a",
    example: "Example",
    analogy: "Think of it like",
    keyTerm: "Key term",
    goodToKnow: "Good to know",
    street: "Network address (the street name)",
    house: "Host (a house on the street)",
    notationNetwork: "Network address",
    notationSlash: "Slash",
    notationPrefix: "Prefix length",
    notationPrefixHint: "How many of the 32 bits are network bits",
    legendNetAddr: "Network address (.0)",
    legendUsable: "Usable host addresses (.1 to .254)",
    legendBroadcast: "Broadcast address (.255)",
    legendInUse: "Devices already in use (.1 to .4)",
    compareTitle: "Every extra host bit doubles the network size",
    addresses: "addresses",
    playgroundTitle: "Try it: change the prefix",
    prefixLabel: "Prefix length",
    exampleIp: "Example IP",
    gridHint: "Each square is one address, from .0 to .255",
  },
  hi: {
    lessonTitle: "Network, Host & CIDR",
    heroTitle: "Network, Host aur CIDR, step by step",
    heroSubtitle:
      "Samjho devices kaise connect hote hain, IP address kiska hota hai, aur /24, /16 aur /0 address ko network aur host mein kaise baant dete hain.",
    octet: "Octet",
    router: "Router",
    internet: "Internet",
    homeNetwork: "Aapka home network",
    lan: "Local Area Network (LAN)",
    notNeeded: "Zarurat nahi",
    hostTag: "Host",
    networkPart: "Network part",
    hostPart: "Host part",
    networkBits: "Network bits",
    hostBits: "Host bits",
    totalAddresses: "Total addresses",
    usableHosts: "Usable hosts",
    networkAddress: "Network address",
    broadcastAddress: "Broadcast address",
    addressRange: "Address range",
    notApplicable: "n/a",
    example: "Example",
    analogy: "Aise samjho",
    keyTerm: "Key term",
    goodToKnow: "Yaad rakhna",
    street: "Network address (street ka naam)",
    house: "Host (street ka ek ghar)",
    notationNetwork: "Network address",
    notationSlash: "Slash",
    notationPrefix: "Prefix length",
    notationPrefixHint: "32 mein se kitne bits network ke hain",
    legendNetAddr: "Network address (.0)",
    legendUsable: "Usable host addresses (.1 se .254)",
    legendBroadcast: "Broadcast address (.255)",
    legendInUse: "Use mein aa chuke devices (.1 se .4)",
    compareTitle: "Har extra host bit se network ka size double ho jaata hai",
    addresses: "addresses",
    playgroundTitle: "Khud try karo: prefix badlo",
    prefixLabel: "Prefix length",
    exampleIp: "Example IP",
    gridHint: "Har square ek address hai, .0 se .255 tak",
  },
} as const;

const HOME_DEVICES: NetworkDevice[] = [
  { icon: "📡", name: "Router", ip: "192.168.1.1" },
  { icon: "📱", name: "Mobile", ip: "192.168.1.2" },
  { icon: "📲", name: "Tab", ip: "192.168.1.3" },
  { icon: "💻", name: "Laptop", ip: "192.168.1.4" },
];

export const NETWORK_HOST_STEPS: NetworkHostStep[] = [
  {
    id: "what-is-network",
    phase: "Network",
    scene: "network",
    focus: "links",
    example: "192.168.1.1",
    prefix: null,
    devices: HOME_DEVICES,
    en: {
      title: "What is a network?",
      summary: "A network is a group of connected devices that can talk to each other.",
      detail:
        "Imagine your home has a Wi-Fi router. Your mobile, laptop and tablet are all connected to it. Because they are connected, they can send data to one another. That group of connected devices is called a network.",
      points: [
        "The router is the meeting point that connects the devices.",
        "Devices on the same network can share files, print and stream to each other.",
        "Local communication can still work when the internet is down, as long as the local network works and the devices allow it.",
      ],
      example: ["Mobile → photo → Laptop (both on the same Wi-Fi)"],
      analogy:
        "A network is like a group chat: everyone inside the group can talk to everyone else in it.",
      term: {
        name: "Network",
        meaning: "A group of devices connected so they can exchange data.",
      },
    },
    hi: {
      title: "Network kya hota hai?",
      summary: "Network connected devices ka ek group hai jo ek-dusre se baat kar sakte hain.",
      detail:
        "Socho tumhare ghar mein ek Wi-Fi router hai. Tumhara mobile, laptop aur tablet usse connected hain. Connected hone ki wajah se woh ek-dusre ko data bhej sakte hain. Aise connected devices ke group ko network kehte hain.",
      points: [
        "Router woh jagah hai jo sab devices ko jodta hai.",
        "Same network ke devices files share, print aur stream kar sakte hain.",
        "Internet band ho tab bhi local communication chal sakti hai, agar local network chal raha ho aur devices allow karte hon.",
      ],
      example: ["Mobile → photo → Laptop (dono same Wi-Fi par)"],
      analogy:
        "Network ek group chat jaisa hai: group ke andar sab log baaki sabse baat kar sakte hain.",
      term: {
        name: "Network",
        meaning: "Aise devices ka group jo data exchange kar sakte hain.",
      },
    },
  },
  {
    id: "what-is-host",
    phase: "Host",
    scene: "network",
    focus: "hosts",
    example: "192.168.1.2",
    prefix: null,
    devices: HOME_DEVICES,
    en: {
      title: "What is a host?",
      summary: "A host is any device on a network that has its own IP address.",
      detail:
        "A host can send and receive data using its IP address. Mobiles, laptops, desktops, printers and servers can all be hosts. The router usually hands out these addresses automatically using DHCP (Dynamic Host Configuration Protocol). We will cover DHCP in another lesson.",
      points: [
        "Mobile has 192.168.1.2 and laptop has 192.168.1.4. Both are hosts.",
        "Each IP is unique inside the network. Two devices cannot share one.",
        "The IP address is how other devices find a particular host.",
      ],
      analogy:
        "A school is the network and each student is a host. Every student has a unique roll number, just like every host has a unique IP.",
      term: {
        name: "Host",
        meaning: "A device on a network that has its own IP address.",
      },
      note: "The router has an IP too (192.168.1.1), so it is also a host on this network.",
    },
    hi: {
      title: "Host kya hota hai?",
      summary: "Host network par aisa device hai jiske paas apna IP address hota hai.",
      detail:
        "Host apne IP address ke through data bhej aur receive kar sakta hai. Mobile, laptop, desktop, printer aur server sab host ho sakte hain. Router aam taur par DHCP (Dynamic Host Configuration Protocol) se yeh addresses automatically deta hai. DHCP ko hum alag lesson mein samjhenge.",
      points: [
        "Mobile ka IP 192.168.1.2 hai aur laptop ka 192.168.1.4. Dono host hain.",
        "Network ke andar har IP unique hota hai. Do devices ek IP share nahi kar sakte.",
        "IP address se hi doosre devices kisi khaas host ko dhundhte hain.",
      ],
      analogy:
        "School network hai aur har student ek host. Har student ka apna roll number hota hai, waise hi har host ka apna IP.",
      term: {
        name: "Host",
        meaning: "Network par aisa device jiske paas apna IP address ho.",
      },
      note: "Router ka bhi IP hai (192.168.1.1), toh woh bhi is network ka ek host hai.",
    },
  },
  {
    id: "lan",
    phase: "LAN",
    scene: "network",
    focus: "lan",
    example: "192.168.1.4",
    prefix: null,
    devices: HOME_DEVICES,
    en: {
      title: "What is a LAN?",
      summary: "A LAN is a network in a small area, like a home, classroom or office.",
      detail:
        "LAN stands for Local Area Network. Your home Wi-Fi connecting a mobile, laptop and smart TV is a typical LAN. Devices on the same LAN can talk to each other locally, without sending their data across the public internet, if the network and device settings allow it.",
      points: [
        "LAN: a small, local network (home, school, office).",
        "WAN (Wide Area Network): connects networks across large distances. The internet is the biggest example.",
        "The router sits on the edge of your LAN and connects it to the outside world.",
      ],
      term: {
        name: "LAN",
        meaning: "Local Area Network: devices connected in a limited local area.",
      },
    },
    hi: {
      title: "LAN kya hota hai?",
      summary: "LAN chhote area ka network hai, jaise ghar, classroom ya office.",
      detail:
        "LAN ka full form hai Local Area Network. Tumhare ghar ka Wi-Fi jo mobile, laptop aur smart TV ko jodta hai, ek typical LAN hai. Same LAN ke devices local network ke through ek-dusre se baat kar sakte hain, bina data ko public internet par bheje, agar network aur device settings allow karti hain.",
      points: [
        "LAN: chhota, local network (ghar, school, office).",
        "WAN (Wide Area Network): bade area mein networks ko jodta hai. Internet sabse bada example hai.",
        "Router aapke LAN ke kinare par baithta hai aur use bahar ki duniya se jodta hai.",
      ],
      term: {
        name: "LAN",
        meaning: "Local Area Network: limited local area mein connected devices.",
      },
    },
  },
  {
    id: "network-ip",
    phase: "Network address",
    scene: "address",
    example: "192.168.1.0",
    prefix: null,
    en: {
      title: "What is a network address?",
      summary: "The network address identifies the whole network, not one device.",
      detail:
        "The whole network gets its own address too. In our home network it is 192.168.1.0. The devices inside get addresses like 192.168.1.1, 192.168.1.2, 192.168.1.3 and 192.168.1.4. Devices use the network address to decide whether a destination is inside their own network or outside it.",
      points: [
        "192.168.1.0 is the network itself.",
        "192.168.1.1, .2, .3, .4 are hosts inside that network.",
        "Everything in the network starts with the same 192.168.1.",
      ],
      analogy:
        "A street name identifies the whole street. Each house on it has its own house number.",
      term: {
        name: "Network address",
        meaning: "The address that represents the entire network, usually the first address of its range.",
      },
      note: "A network address does not always end in .0. It depends on the prefix and the address range, which you will see in the subnetting lesson.",
    },
    hi: {
      title: "Network address kya hota hai?",
      summary: "Network address poore network ko identify karta hai, kisi ek device ko nahi.",
      detail:
        "Poore network ka bhi apna address hota hai. Hamare home network mein woh 192.168.1.0 hai. Andar ke devices ko 192.168.1.1, 192.168.1.2, 192.168.1.3 aur 192.168.1.4 jaise addresses milte hain. Devices network address se decide karte hain ki destination unke apne network ke andar hai ya bahar.",
      points: [
        "192.168.1.0 khud network hai.",
        "192.168.1.1, .2, .3, .4 us network ke andar ke hosts hain.",
        "Network ke andar sab kuch same 192.168.1. se shuru hota hai.",
      ],
      analogy:
        "Street ka naam poori street ko identify karta hai. Us street ke har ghar ka apna house number hota hai.",
      term: {
        name: "Network address",
        meaning: "Woh address jo poore network ko represent karta hai, aam taur par range ka pehla address.",
      },
      note: "Network address hamesha .0 par end nahi hota. Yeh prefix aur address range par depend karta hai, jo subnetting lesson mein dekhoge.",
    },
  },
  {
    id: "cidr",
    phase: "CIDR",
    scene: "notation",
    example: "192.168.1.0",
    prefix: 24,
    en: {
      title: "What is CIDR notation?",
      summary: "CIDR is a short way to write a network and how many bits are its network part.",
      detail:
        "CIDR stands for Classless Inter-Domain Routing. You write the network address, then a slash, then a number x between 0 and 32. The number x says how many of the 32 bits belong to the network. In 192.168.1.0/24, x is 24, so the first 24 bits are the network and the last 8 bits are for hosts.",
      points: [
        "The number after the slash = network bits.",
        "32 minus that number = host bits.",
        "You will see CIDR everywhere: AWS, DigitalOcean, firewalls and server settings.",
      ],
      analogy:
        "Like a school ID: one part says which school you belong to, the other part says which student you are.",
      term: {
        name: "CIDR",
        meaning: "Classless Inter-Domain Routing: writing an IP network as address/prefix, like 192.168.1.0/24.",
      },
    },
    hi: {
      title: "CIDR notation kya hoti hai?",
      summary: "CIDR network ko short mein likhne ka tareeka hai, jisme network part ke bits bhi bataye jaate hain.",
      detail:
        "CIDR ka full form hai Classless Inter-Domain Routing. Pehle network address likhte hain, phir slash, phir 0 se 32 ke beech ek number x. Yeh x batata hai ki 32 bits mein se kitne bits network ke hain. 192.168.1.0/24 mein x 24 hai, toh pehle 24 bits network ke hain aur last 8 bits hosts ke liye.",
      points: [
        "Slash ke baad ka number = network bits.",
        "32 minus woh number = host bits.",
        "CIDR tumhe har jagah dikhegi: AWS, DigitalOcean, firewalls aur server settings.",
      ],
      analogy:
        "School ID jaisa: ek part batata hai ki tum kis school ke ho, doosra part batata hai ki tum kaun se student ho.",
      term: {
        name: "CIDR",
        meaning: "Classless Inter-Domain Routing: IP network ko address/prefix ki tarah likhna, jaise 192.168.1.0/24.",
      },
    },
  },
  {
    id: "slash-24",
    phase: "/24",
    scene: "bits",
    example: "192.168.1.5",
    prefix: 24,
    en: {
      title: "What does /24 mean?",
      summary: "/24 = 24 network bits + 8 host bits.",
      detail:
        "An IPv4 address has 32 bits, split into 4 groups of 8 bits. Each group is called an octet. With /24, the first 3 octets (24 bits) are the network part and stay the same for every device here. Only the last octet (8 bits) is the host part, and that is what makes each device different.",
      example: [
        "Network: 192.168.1.0/24",
        "Laptop:  192.168.1.4",
        "Printer: 192.168.1.5",
      ],
      points: [
        "The first three numbers stay the same: 192.168.1.",
        "Only the last number changes to identify each device.",
      ],
      term: {
        name: "Octet",
        meaning: "One group of 8 bits in an IPv4 address (a number from 0 to 255).",
      },
    },
    hi: {
      title: "/24 ka kya matlab hai?",
      summary: "/24 = 24 network bits + 8 host bits.",
      detail:
        "IPv4 address mein 32 bits hote hain, jo 8-8 bits ke 4 groups mein bante hain. Har group ko octet kehte hain. /24 mein pehle 3 octets (24 bits) network part hain aur is network ke har device ke liye same rehte hain. Sirf last octet (8 bits) host part hai, aur wahi har device ko alag banata hai.",
      example: [
        "Network: 192.168.1.0/24",
        "Laptop:  192.168.1.4",
        "Printer: 192.168.1.5",
      ],
      points: [
        "Pehle teen numbers same rehte hain: 192.168.1.",
        "Sirf last number badalta hai, jisse har device alag pehchana jaata hai.",
      ],
      term: {
        name: "Octet",
        meaning: "IPv4 address ka 8 bits ka ek group (0 se 255 tak ka number).",
      },
    },
  },
  {
    id: "host-count",
    phase: "Host count",
    scene: "count",
    example: "192.168.1.5",
    prefix: 24,
    en: {
      title: "How many devices fit in a /24 network?",
      summary: "A /24 has 256 addresses, but 254 can be given to devices.",
      detail:
        "8 host bits can make 2⁸ = 256 different combinations. Two of them are reserved. The first (.0) is the network address, and the last (.255) is the broadcast address, used to send a message to every device in the network at once. That leaves 256 − 2 = 254 usable host addresses.",
      example: ["2⁸ = 256 total", "256 − 2 reserved = 254 usable hosts"],
      points: [
        "Once all 254 addresses are taken, a new device has no free address. You need a bigger network or another network.",
        "Broadcast = one message meant for everybody on the network.",
      ],
      term: {
        name: "Broadcast address",
        meaning: "The last address of a network, used to reach every host in it at once.",
      },
    },
    hi: {
      title: "/24 network mein kitne devices aa sakte hain?",
      summary: "/24 mein 256 addresses hote hain, lekin devices ko sirf 254 mil sakte hain.",
      detail:
        "8 host bits se 2⁸ = 256 alag combinations ban sakte hain. Inme se 2 reserved hote hain. Pehla (.0) network address hai, aur last (.255) broadcast address hai, jisse network ke har device ko ek saath message bheja jaata hai. Toh 256 − 2 = 254 usable host addresses bachte hain.",
      example: ["2⁸ = 256 total", "256 − 2 reserved = 254 usable hosts"],
      points: [
        "Jab saare 254 addresses use ho jaate hain, naye device ke liye address nahi bachta. Bada network ya doosra network chahiye.",
        "Broadcast = network ke sabhi devices ke liye ek message.",
      ],
      term: {
        name: "Broadcast address",
        meaning: "Network ka last address, jisse us network ke har host tak ek saath pahuncha ja sakta hai.",
      },
    },
  },
  {
    id: "slash-16",
    phase: "/16",
    scene: "compare",
    example: "192.168.0.0",
    prefix: 16,
    en: {
      title: "What does /16 mean?",
      summary: "A smaller prefix number means a bigger network.",
      detail:
        "In /16, 16 bits are for the network and 16 bits are left for hosts. That gives 2¹⁶ = 65,536 total addresses, and 65,534 usable after reserving two. 192.168.0.0/16 covers every address from 192.168.0.0 to 192.168.255.255. A /24 has only 256.",
      points: [
        "Each host bit you add doubles the size of the network.",
        "/24 → 256 addresses, /16 → 65,536 addresses, /8 → 16,777,216 addresses.",
        "As a developer you mainly need to understand what the notation means. Network engineers plan these sizes in detail.",
      ],
    },
    hi: {
      title: "/16 ka kya matlab hai?",
      summary: "Prefix number jitna chhota, network utna bada.",
      detail:
        "/16 mein 16 bits network ke liye hain aur 16 bits hosts ke liye bachte hain. Isse 2¹⁶ = 65,536 total addresses milte hain, aur 2 reserved karne ke baad 65,534 usable. 192.168.0.0/16 mein 192.168.0.0 se 192.168.255.255 tak ke saare addresses aate hain. /24 mein sirf 256 hote hain.",
      points: [
        "Har host bit badhane par network ka size double ho jaata hai.",
        "/24 → 256 addresses, /16 → 65,536 addresses, /8 → 16,777,216 addresses.",
        "Developer ke liye bas yeh samajhna kaafi hai ki notation ka matlab kya hai. Sizes ki detailed planning network engineers karte hain.",
      ],
    },
  },
  {
    id: "everything",
    phase: "0.0.0.0/0",
    scene: "bits",
    example: "0.0.0.0",
    prefix: 0,
    en: {
      title: "What does 0.0.0.0/0 mean?",
      summary: "0.0.0.0/0 matches every IPv4 address.",
      detail:
        "With /0, no bits are fixed for the network, so each of the 32 bits can be anything. That means every IPv4 address (4,294,967,296 of them) falls inside this range.",
      example: ["Security rule: allow source 0.0.0.0/0", "→ the rule can match traffic from any IPv4 address"],
      points: [
        "You will often see it in cloud security groups.",
        "In routing tables, 0.0.0.0/0 is the default route: use it when nothing more specific matches.",
      ],
      analogy: "It is like saying 'everyone is included'.",
      note: "Matching every IP does not mean everyone is automatically allowed in. Firewall rules, ports and other settings still matter.",
    },
    hi: {
      title: "0.0.0.0/0 ka kya matlab hai?",
      summary: "0.0.0.0/0 har IPv4 address ko match karta hai.",
      detail:
        "/0 mein network ke liye koi bit fixed nahi hota, toh 32 mein se har bit kuch bhi ho sakta hai. Matlab har IPv4 address (4,294,967,296 addresses) is range mein aata hai.",
      example: ["Security rule: source 0.0.0.0/0 allow karo", "→ rule kisi bhi IPv4 address se aane wale traffic ko match kar sakta hai"],
      points: [
        "Yeh cloud security groups mein aksar dikhta hai.",
        "Routing tables mein 0.0.0.0/0 default route hota hai: jab koi aur specific route match na ho tab use hota hai.",
      ],
      analogy: "Yeh aisa hai jaise kehna 'sabhi log included hain'.",
      note: "Har IP match hone ka matlab yeh nahi ki sabko automatically access mil gaya. Firewall rules, ports aur baaki settings bhi matter karti hain.",
    },
  },
  {
    id: "playground",
    phase: "Try it",
    scene: "playground",
    example: "192.168.1.5",
    prefix: 24,
    en: {
      title: "Try it yourself",
      summary: "Move the slider and watch the network and host bits change.",
      detail:
        "Pick any prefix from /0 to /32. The coloured bits show which part is network and which is host, and the numbers below update to match. Try /24, /16, /8 and /30 and compare.",
      points: [
        "Network bits + host bits always add up to 32.",
        "Total addresses = 2 to the power of host bits.",
        "Usable hosts = total − 2 (network address and broadcast address).",
        "A smaller prefix means a bigger network.",
      ],
      note: "/31 and /32 are special cases (point-to-point links and single hosts), so usable hosts is shown as n/a.",
    },
    hi: {
      title: "Khud try karo",
      summary: "Slider hilao aur dekho network aur host bits kaise badalte hain.",
      detail:
        "/0 se /32 tak koi bhi prefix chuno. Colour wale bits dikhate hain ki kaun sa part network hai aur kaun sa host, aur neeche ke numbers saath mein update hote hain. /24, /16, /8 aur /30 try karke compare karo.",
      points: [
        "Network bits + host bits hamesha 32 hote hain.",
        "Total addresses = 2 ki power host bits.",
        "Usable hosts = total − 2 (network address aur broadcast address).",
        "Chhota prefix matlab bada network.",
      ],
      note: "/31 aur /32 special cases hain (point-to-point links aur single hosts), isliye unme usable hosts n/a dikhta hai.",
    },
  },
];