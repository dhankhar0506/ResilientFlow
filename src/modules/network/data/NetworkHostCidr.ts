// ;
// export interface NetworkDevice {
//   icon: string;
//   name: string;
//   ip: string;
// }

// export interface NetworkHostStep {
//   id: string;
//   phase: string;
//   example: string;
//   prefix: number | null;
//   showBinary: boolean;
//   devices?: NetworkDevice[];
//   en: { title: string; detail: string };
//   hi: { title: string; detail: string };
// }

// export const NETWORK_HOST_LABELS = {
//   en: {
//     lessonTitle: "Network, Host & CIDR",
//     heroTitle: "Which part of an IP is network, which part is host?",
//     heroSubtitle: "Understand networks, hosts and CIDR notation before we jump into subnetting.",
//     octet: "Octet",
//     devices: "Devices connected to the router",
//     networkPart: "Network part",
//     hostPart: "Host part",
//     networkBits: "Network bits",
//     hostBits: "Host bits",
//     maxHosts: "Max hosts",
//     bitSplit: "Network vs host bits",
//   },
//   hi: {
//     lessonTitle: "Network, Host & CIDR",
//     heroTitle: "IP ka kaun sa part network hai, kaun sa host?",
//     heroSubtitle: "Subnetting mein jaane se pehle network, host aur CIDR notation ko samjho.",
//     octet: "Octet",
//     devices: "Router se connected devices",
//     networkPart: "Network part",
//     hostPart: "Host part",
//     networkBits: "Network bits",
//     hostBits: "Host bits",
//     maxHosts: "Max hosts",
//     bitSplit: "Network vs host bits",
//   },
// } as const;

// const HOME_DEVICES: NetworkDevice[] = [
//   { icon: "📡", name: "Router", ip: "192.168.1.1" },
//   { icon: "📱", name: "Mobile", ip: "192.168.1.2" },
//   { icon: "📲", name: "Tab", ip: "192.168.1.3" },
//   { icon: "💻", name: "Laptop", ip: "192.168.1.4" },
// ];

// export const NETWORK_HOST_STEPS: NetworkHostStep[] = [
//   {
//     id: "what-is-network",
//     phase: "Network",
//     example: "192.168.1.1",
//     prefix: null,
//     showBinary: false,
//     devices: HOME_DEVICES,
//     en: {
//       title: "What is a network?",
//       detail:
//         "Imagine you have a router, and your laptop, mobile and tab are all connected to it. The connection between all of these devices is what forms a network. Since they're in a single network, your laptop can technically talk to your mobile directly — even without internet.",
//     },
//     hi: {
//       title: "Network kya hota hai?",
//       detail:
//         "Imagine karo ki aapke paas ek router hai, aur uske saath aapka laptop, mobile aur tab connected hain. In sab devices ke beech jo connection hai, wahi ek network form karta hai. Kyunki yeh sab ek single network mein hain, aapka laptop technically seedha mobile se baat kar sakta hai — internet ke bina bhi.",
//     },
//   },
//   {
//     id: "what-is-host",
//     phase: "Host",
//     example: "192.168.1.2",
//     prefix: null,
//     showBinary: false,
//     devices: HOME_DEVICES,
//     en: {
//       title: "What is a host?",
//       detail:
//         "Any machine that holds an IP inside that network is a host — your laptop, mobile, tab, all of them. A network is what gets formed between the devices, and a host is someone who holds an individual, unique IP in that network. The router hands out these IPs automatically using DHCP (Dynamic Host Configuration Protocol) — we'll cover that in a future video.",
//     },
//     hi: {
//       title: "Host kya hota hai?",
//       detail:
//         "Jis bhi machine ne us network mein ek IP hold kar rakha hai, woh host hai — aapka laptop, mobile, tab, sab. Network woh hai jo devices ke beech form hota hai, aur host woh hai jo us network mein ek individual, unique IP hold karta hai. Router yeh IPs automatically DHCP (Dynamic Host Configuration Protocol) se assign karta hai — iske baare mein future video mein detail mein dekhenge.",
//     },
//   },
//   {
//     id: "lan",
//     phase: "LAN",
//     example: "192.168.1.4",
//     prefix: null,
//     showBinary: false,
//     devices: HOME_DEVICES,
//     en: {
//       title: "This is a Local Area Network (LAN)",
//       detail:
//         "A network like this — devices connected to the same router — is called a Local Area Network, or LAN. You've probably also heard of WAN (Wide Area Network). Devices in the same LAN can send requests to each other using these IPs, without needing the internet at all.",
//     },
//     hi: {
//       title: "Yeh ek Local Area Network (LAN) hai",
//       detail:
//         "Aisa network — jisme devices ek hi router se connected hon — Local Area Network ya LAN kehlata hai. Aapne WAN (Wide Area Network) bhi suna hoga. Same LAN ke devices in IPs ka use karke ek-dusre ko requests bhej sakte hain, internet ki zaroorat hi nahi padti.",
//     },
//   },
//   {
//     id: "network-ip",
//     phase: "Network IP",
//     example: "192.168.1.0",
//     prefix: null,
//     showBinary: false,
//     en: {
//       title: "The whole network has an IP too",
//       detail:
//         "The entire network gets its own reserved IP, and it is generally the first IP of the network — that's why it ends with 0, like 192.168.1.0 (the devices got .1, .2, .3, .4). This IP represents the whole network, and it's used to decide whether a device you want to reach is inside your network or outside it.",
//     },
//     hi: {
//       title: "Poore network ka bhi ek IP hota hai",
//       detail:
//         "Poore network ko bhi apna ek reserved IP assign hota hai, aur generally yeh network ka first IP hota hai — isliye yeh 0 pe end hota hai, jaise 192.168.1.0 (devices ko .1, .2, .3, .4 mile). Yeh IP poore network ko represent karta hai, aur yeh decide karne mein kaam aata hai ki jis device tak pahunchna hai woh aapke network ke andar hai ya bahar.",
//     },
//   },
//   {
//     id: "cidr",
//     phase: "CIDR",
//     example: "192.168.1.0",
//     prefix: 24,
//     showBinary: false,
//     en: {
//       title: "CIDR notation: the /x",
//       detail:
//         "CIDR stands for Classless Inter-Domain Routing. It's an addressing scheme that uses slash notation to define IP address ranges: after the network IP you write /x. Here x is an integer between 0 and 32 — it tells you how many bits of the IP are reserved for the network. In 192.168.1.0/24, x is 24. You'll see this pattern all the time in AWS, DigitalOcean and other DevOps tools.",
//     },
//     hi: {
//       title: "CIDR notation: yeh /x kya hai",
//       detail:
//         "CIDR ka full form hai Classless Inter-Domain Routing. Yeh ek addressing scheme hai jo slash notation se IP address ranges define karti hai: network IP ke aage /x likha jaata hai. Yahan x 0 se 32 ke beech ka integer hai — yeh batata hai ki IP ke kitne bits network ke liye reserved hain. 192.168.1.0/24 mein x hai 24. AWS, DigitalOcean aur DevOps tools mein yeh pattern aapko baar-baar dikhega.",
//     },
//   },
//   {
//     id: "slash-24",
//     phase: "/24",
//     example: "192.168.1.5",
//     prefix: 24,
//     showBinary: true,
//     en: {
//       title: "What /24 means for an IP",
//       detail:
//         "Each octet is 8 bits, so 24 bits = 3 octets. That means the first three octets are reserved for the network and stay constant for every host. Only the last octet belongs to the host. If you connect a printer, the router keeps 192.168.1 as it is and gives the printer a unique last octet — say 5 — so its IP becomes 192.168.1.5.",
//     },
//     hi: {
//       title: "/24 ka matlab kya hai",
//       detail:
//         "Har octet 8 bits ka hota hai, toh 24 bits = 3 octets. Matlab pehle teen octets network ke liye reserved hain aur har host ke liye constant rehte hain. Sirf last octet host ka hota hai. Agar aap ek printer connect karte ho, toh router 192.168.1 ko waise hi rakhta hai aur printer ko ek unique last octet deta hai — maan lo 5 — toh uska IP ban jaata hai 192.168.1.5.",
//     },
//   },
//   {
//     id: "host-count",
//     phase: "Host count",
//     example: "192.168.1.5",
//     prefix: 24,
//     showBinary: true,
//     en: {
//       title: "How many hosts fit in a /24?",
//       detail:
//         "Only 8 bits are left for hosts, so the network can have 2⁸ = 256 addresses. Once all of them are taken, a new device has no free bits left to get a unique IP, so it can't join. (In practice, 2 of these are reserved — the network address ending in .0 and the broadcast address — so about 254 are usable by real devices.)",
//     },
//     hi: {
//       title: "/24 mein kitne hosts aa sakte hain?",
//       detail:
//         "Hosts ke liye sirf 8 bits bache hain, toh network mein 2⁸ = 256 addresses ho sakte hain. Jab sab use ho jaate hain, toh naye device ke paas unique IP lene ke liye bits hi nahi bachte, isliye woh join nahi kar sakta. (Practically inme se 2 reserved hote hain — .0 wala network address aur broadcast address — toh real devices ke liye lagbhag 254 usable hote hain.)",
//     },
//   },
//   {
//     id: "slash-16",
//     phase: "/16",
//     example: "192.168.0.0",
//     prefix: 16,
//     showBinary: true,
//     en: {
//       title: "A bigger network: /16",
//       detail:
//         "With /16, the first 16 bits (two octets) are for the network, and the remaining 16 bits are free for hosts. That gives 2¹⁶ = 65,536 hosts per network — a huge difference from /24. Network engineers mostly work with this part; as a developer you mainly need to understand what the notation represents.",
//     },
//     hi: {
//       title: "Bada network: /16",
//       detail:
//         "/16 mein pehle 16 bits (do octets) network ke liye hain, aur baaki ke 16 bits hosts ke liye free hain. Isse har network mein 2¹⁶ = 65,536 hosts ho sakte hain — /24 se bahut bada difference. Yeh part zyada-tar network engineers dekhte hain; ek developer ke liye bas yeh samajhna kaafi hai ki yeh notation kya represent karti hai.",
//     },
//   },
//   {
//     id: "everything",
//     phase: "0.0.0.0/0",
//     example: "0.0.0.0",
//     prefix: 0,
//     showBinary: true,
//     en: {
//       title: "0.0.0.0/0 means every IP",
//       detail:
//         "The prefix is 0, so none of the bits are reserved for the network — every octet can be anything. That's why 0.0.0.0/0 represents all the IPs on the entire internet, and any IP you pick will satisfy it. You'll often see this in AWS security groups and route tables.",
//     },
//     hi: {
//       title: "0.0.0.0/0 ka matlab: har IP",
//       detail:
//         "Yahan prefix 0 hai, yaani network ke liye koi bit reserved nahi hai — har octet kuch bhi ho sakta hai. Isliye 0.0.0.0/0 poore internet ke saare IPs ko represent karta hai, aur aap koi bhi IP utha lo woh isse satisfy karega. AWS security groups aur route tables mein yeh aksar dikhta hai.",
//     },
//   },
// ];

export interface NetworkDevice {
  icon: string;
  name: string;
  ip: string;
}

export interface NetworkHostStep {
  id: string;
  phase: string;
  example: string;
  prefix: number | null;
  showBinary: boolean;
  devices?: NetworkDevice[];
  en: { title: string; detail: string };
  hi: { title: string; detail: string };
}

export const NETWORK_HOST_LABELS = {
  en: {
    lessonTitle: "Network, Host & CIDR",
    heroTitle: "Understand Network, Host and IP Addresses",
    heroSubtitle:
      "Learn how devices connect, how IP addresses work, and what /24, /16 and /0 mean with simple examples.",
    octet: "Octet",
    devices: "Devices connected to the router",
    networkPart: "Network part",
    hostPart: "Host part",
    networkBits: "Network bits",
    hostBits: "Host bits",
    maxHosts: "Max hosts",
    bitSplit: "Network vs host bits",
  },
  hi: {
    lessonTitle: "Network, Host & CIDR",
    heroTitle: "Network, Host aur IP Address ko samjho",
    heroSubtitle:
      "Samjho devices kaise connect hote hain, IP address kaise kaam karta hai aur /24, /16 aur /0 ka kya matlab hai.",
    octet: "Octet",
    devices: "Router se connected devices",
    networkPart: "Network part",
    hostPart: "Host part",
    networkBits: "Network bits",
    hostBits: "Host bits",
    maxHosts: "Maximum hosts",
    bitSplit: "Network aur host bits",
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
    example: "192.168.1.1",
    prefix: null,
    showBinary: false,
    devices: HOME_DEVICES,
    en: {
      title: "1. What is a Network?",
      detail:
        "Imagine your home has a Wi-Fi router. Your mobile, laptop and tablet are all connected to it. These connected devices can communicate with one another. This group of connected devices is called a Network.\n\nExample: You send a photo from your mobile to your laptop over the same Wi-Fi. They can communicate even if the internet connection is not working, as long as the local network is working and the devices allow it.\n\nRemember: A network is like a group of people who can talk to each other.",
    },
    hi: {
      title: "1. Network kya hota hai?",
      detail:
        "Socho tumhare ghar mein ek Wi-Fi router hai. Tumhara mobile, laptop aur tablet usse connected hain. Ye devices ek-dusre se baat kar sakte hain. Aise connected devices ke group ko Network kehte hain.\n\nExample: Tum apne mobile se laptop par photo bhejte ho aur dono same Wi-Fi par hain. Internet band hone par bhi photo bhejna possible ho sakta hai, agar local network chal raha ho aur devices allow karte hon.\n\nYaad rakho: Network ek aise group ki tarah hai jisme devices ek-dusre se baat kar sakte hain.",
    },
  },
  {
    id: "what-is-host",
    phase: "Host",
    example: "192.168.1.2",
    prefix: null,
    showBinary: false,
    devices: HOME_DEVICES,
    en: {
      title: "2. What is a Host?",
      detail:
        "A host is a device connected to a network that can send or receive data using an IP address. A mobile, laptop, desktop or server can be a host.\n\nExample: Your mobile has IP 192.168.1.2 and your laptop has IP 192.168.1.4. Both are hosts because each has its own IP address on the network.\n\nThink of it like a school: the school is the network, and each student is a host with their own roll number. An IP address helps identify a device on the network.\n\nThe router can automatically assign IP addresses using DHCP. We will learn DHCP in another lesson.",
    },
    hi: {
      title: "2. Host kya hota hai?",
      detail:
        "Host ek aisa device hota hai jo network se connected hota hai aur IP address ke through data bhej ya receive kar sakta hai. Mobile, laptop, desktop aur server host ho sakte hain.\n\nExample: Tumhare mobile ka IP 192.168.1.2 hai aur laptop ka IP 192.168.1.4 hai. Dono hosts hain kyunki dono ke paas network par apna IP address hai.\n\nSchool ka example socho: School network hai aur har student ek host hai. Har student ka apna roll number hota hai. Waise hi IP address network par device ko identify karne mein help karta hai.\n\nRouter DHCP ki help se automatically IP address de sakta hai. DHCP ko hum alag lesson mein samjhenge.",
    },
  },
  {
    id: "lan",
    phase: "LAN",
    example: "192.168.1.4",
    prefix: null,
    showBinary: false,
    devices: HOME_DEVICES,
    en: {
      title: "3. What is a LAN?",
      detail:
        "LAN stands for Local Area Network. It is a network that connects devices in a small area, such as a home, classroom or office.\n\nExample: Your home Wi-Fi connects your mobile, laptop and smart TV. This is a typical home LAN.\n\nDevices on the same LAN can communicate locally without sending their data across the public internet, if the network and device settings allow it.\n\nRemember: LAN = Network in a limited local area. A WAN connects networks across larger areas.",
    },
    hi: {
      title: "3. LAN kya hota hai?",
      detail:
        "LAN ka full form hai Local Area Network. Ye aisa network hota hai jo chhote area mein devices ko connect karta hai, jaise ghar, classroom ya office.\n\nExample: Tumhare ghar ka Wi-Fi mobile, laptop aur smart TV ko connect karta hai. Ye ek typical home LAN hai.\n\nSame LAN ke devices local network ke through ek-dusre se communicate kar sakte hain. Iske liye data ko public internet se bhejna zaroori nahi hota, agar network aur device settings allow karti hain.\n\nYaad rakho: LAN = Chhote local area ka network. WAN bade area mein networks ko connect karta hai.",
    },
  },
  {
    id: "network-ip",
    phase: "Network IP",
    example: "192.168.1.0",
    prefix: null,
    showBinary: false,
    en: {
      title: "4. What is a Network Address?",
      detail:
        "A network address identifies the whole network, not one individual device.\n\nExample: In the network 192.168.1.0/24, the address 192.168.1.0 represents the network itself. Devices can have addresses such as 192.168.1.1, 192.168.1.2 and 192.168.1.3.\n\nThink of it like a street name: the street identifies the whole area, while each house has its own house number.\n\nImportant: The network address is not always an address ending in .0. It depends on the network's prefix and address range.",
    },
    hi: {
      title: "4. Network Address kya hota hai?",
      detail:
        "Network address poore network ko identify karta hai, kisi ek device ko nahi.\n\nExample: 192.168.1.0/24 network mein 192.168.1.0 poore network ko represent karta hai. Devices ke IP 192.168.1.1, 192.168.1.2 aur 192.168.1.3 ho sakte hain.\n\nStreet ka example socho: Street ka naam poore area ko identify karta hai, jabki har ghar ka apna house number hota hai.\n\nImportant: Network address hamesha .0 par end nahi hota. Ye network ke prefix aur address range par depend karta hai.",
    },
  },
  {
    id: "cidr",
    phase: "CIDR",
    example: "192.168.1.0",
    prefix: 24,
    showBinary: false,
    en: {
      title: "5. What is CIDR notation?",
      detail:
        "CIDR stands for Classless Inter-Domain Routing. It is a short way to write an IP network and tell how much of the IP address belongs to the network.\n\nExample: 192.168.1.0/24\n\nHere, /24 means the first 24 bits are used for the network part. The remaining 8 bits are used for host addresses.\n\nThink of it like dividing a school ID: one part tells which school the student belongs to, and another part identifies the student.\n\nYou will often see CIDR notation in cloud services, server settings and networking tools.",
    },
    hi: {
      title: "5. CIDR notation kya hoti hai?",
      detail:
        "CIDR ka full form hai Classless Inter-Domain Routing. Ye IP network ko short form mein likhne ka tareeka hai. Isse pata chalta hai ki IP address ka kitna part network ke liye hai.\n\nExample: 192.168.1.0/24\n\nYahan /24 ka matlab hai ki pehle 24 bits network part ke liye hain. Baaki 8 bits host addresses ke liye hain.\n\nSchool ID ka example socho: Ek part batata hai ki student kis school ka hai, aur doosra part student ko identify karta hai.\n\nCIDR notation tumhe cloud services, server settings aur networking tools mein baar-baar dikhegi.",
    },
  },
  {
    id: "slash-24",
    phase: "/24",
    example: "192.168.1.5",
    prefix: 24,
    showBinary: true,
    en: {
      title: "6. What does /24 mean?",
      detail:
        "An IPv4 address has 32 bits in total. These 32 bits are divided into 4 groups, and each group has 8 bits. Each group is called an octet.\n\nIn /24, 24 bits belong to the network. That means the first 3 octets are the network part, and the last 8 bits are the host part.\n\nExample:\nNetwork: 192.168.1.0/24\nLaptop: 192.168.1.4\nPrinter: 192.168.1.5\n\nNotice that the first three numbers stay the same: 192.168.1. Only the last number changes to identify each device.\n\nRemember: /24 = 24 network bits + 8 host bits.",
    },
    hi: {
      title: "6. /24 ka kya matlab hai?",
      detail:
        "IPv4 address mein total 32 bits hote hain. Ye 4 groups mein divided hote hain aur har group mein 8 bits hote hain. Har group ko octet kehte hain.\n\n/24 mein 24 bits network ke liye hote hain. Matlab pehle 3 octets network part hain aur last ke 8 bits host part hain.\n\nExample:\nNetwork: 192.168.1.0/24\nLaptop: 192.168.1.4\nPrinter: 192.168.1.5\n\nDhyan do, pehle teen numbers same hain: 192.168.1. Sirf last number change hota hai, jisse har device ko alag IP milta hai.\n\nYaad rakho: /24 = 24 network bits + 8 host bits.",
    },
  },
  {
    id: "host-count",
    phase: "Host count",
    example: "192.168.1.5",
    prefix: 24,
    showBinary: true,
    en: {
      title: "7. How many devices fit in a /24 network?",
      detail:
        "In a /24 network, 8 bits are left for host addresses. Each bit can be 0 or 1, so the total number of addresses is 2⁸ = 256.\n\nBut 2 addresses are normally reserved:\n• 192.168.1.0 is the network address.\n• 192.168.1.255 is the broadcast address.\n\nSo, 256 total addresses − 2 reserved addresses = 254 usable host addresses.\n\nExample: A /24 network can normally give unique IP addresses to up to 254 devices. If all usable addresses are already assigned, another device needs a different network or a free address.",
    },
    hi: {
      title: "7. /24 network mein kitne devices aa sakte hain?",
      detail:
        "/24 network mein host addresses ke liye 8 bits bachte hain. Har bit 0 ya 1 ho sakti hai, isliye total addresses hote hain 2⁸ = 256.\n\nLekin normally 2 addresses reserved hote hain:\n• 192.168.1.0 network address hai.\n• 192.168.1.255 broadcast address hai.\n\nToh 256 total addresses − 2 reserved addresses = 254 usable host addresses.\n\nExample: /24 network normally maximum 254 devices ko unique IP de sakta hai. Agar saare usable addresses assign ho chuke hain, toh naye device ke liye doosra network ya free IP address chahiye.",
    },
  },
  {
    id: "slash-16",
    phase: "/16",
    example: "192.168.0.0",
    prefix: 16,
    showBinary: true,
    en: {
      title: "8. What does /16 mean?",
      detail:
        "A /16 network is larger than a /24 network because fewer bits are reserved for the network and more bits are available for hosts.\n\nIn /16:\n• 16 bits are used for the network.\n• 16 bits are left for host addresses.\n• Total addresses = 2¹⁶ = 65,536.\n• Normally usable host addresses = 65,534, because 2 are reserved.\n\nExample: 192.168.0.0/16 includes addresses from 192.168.0.0 to 192.168.255.255.\n\nCompare: /24 has 256 total addresses, while /16 has 65,536 total addresses.\n\nRemember: A smaller prefix number usually means a larger IPv4 network.",
    },
    hi: {
      title: "8. /16 ka kya matlab hai?",
      detail:
        "/16 network, /24 se bada hota hai kyunki network ke liye kam bits reserved hote hain aur hosts ke liye zyada bits milte hain.\n\n/16 mein:\n• 16 bits network ke liye hote hain.\n• 16 bits host addresses ke liye bachte hain.\n• Total addresses = 2¹⁶ = 65,536.\n• Normally usable host addresses = 65,534, kyunki 2 addresses reserved hote hain.\n\nExample: 192.168.0.0/16 mein 192.168.0.0 se lekar 192.168.255.255 tak ke addresses aate hain.\n\nCompare karo: /24 mein 256 total addresses hote hain, jabki /16 mein 65,536.\n\nYaad rakho: Prefix number jitna chhota hota hai, IPv4 network utna bada hota hai.",
    },
  },
  {
    id: "everything",
    phase: "0.0.0.0/0",
    example: "0.0.0.0",
    prefix: 0,
    showBinary: true,
    en: {
      title: "9. What does 0.0.0.0/0 mean?",
      detail:
        "0.0.0.0/0 is a CIDR range that matches every IPv4 address. The /0 means that no bits are fixed for the network, so any IPv4 address falls inside this range.\n\nExample: Imagine a security rule that allows traffic from 0.0.0.0/0. It means the rule can match traffic coming from any IPv4 address, depending on the other settings.\n\nThink of it like saying: 'Everyone is included.'\n\nImportant: This does not mean every device automatically gets access. Firewall rules, ports and other settings still matter.",
    },
    hi: {
      title: "9. 0.0.0.0/0 ka kya matlab hai?",
      detail:
        "0.0.0.0/0 ek CIDR range hai jo har IPv4 address ko match karti hai. /0 ka matlab hai network ke liye koi bit fixed nahi hai, isliye koi bhi IPv4 address is range mein aa sakta hai.\n\nExample: Socho security rule mein source 0.0.0.0/0 diya hai. Iska matlab hai ki rule kisi bhi IPv4 address se aane wale traffic ko match kar sakta hai, baaki settings par depend karta hai.\n\nIsko aise samjho: 'Sabhi log included hain.'\n\nImportant: Iska matlab ye nahi ki har device ko automatically access mil jayega. Firewall rules, ports aur baaki settings bhi matter karti hain.",
    },
  },
];