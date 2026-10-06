export type NatNode = "private" | "router" | "internet";
export type NatScene = "diagram" | "cards" | "problem";
// lan = between laptops and router, router = inside router,
// wan = between router and internet, dns = at Google DNS
export type NatPos = "lan" | "router" | "wan" | "dns";

export interface NatPacket {
  direction: "out" | "in";
  src: string; // ip:port
  dst: string; // ip:port
  at: NatPos;
  device?: "A" | "C"; // which laptop is involved (used when at === "lan")
  changed?: "src" | "dst"; // field rewritten by the router in this step
  was?: string; // value before the router rewrote it
}

export interface NatRow {
  insidePrivate: string; // ip:port
  insidePublic: string; // ip:port
  outsidePublic: string; // ip:port
}

export interface NatLang {
  title: string;
  summary: string; // one crisp line
  detail: string; // short plain-language explanation
  points?: string[];
  analogy?: string;
  term?: { name: string; meaning: string };
  cards?: { name: string; text: string }[];
}

export interface NatStep {
  id: string;
  phase: string;
  scene: NatScene;
  activeNodes: NatNode[];
  activeDevices: ("A" | "C")[];
  packet?: NatPacket;
  natTable: NatRow[];
  highlightRows: number[];
  clashRows?: number[];
  en: NatLang;
  hi: NatLang;
}

export const NAT_LABELS = {
  en: {
    lessonTitle: "Network Address Translation (NAT)",
    heroTitle: "How NAT lets many devices share one public IP",
    heroSubtitle:
      "A step-by-step walk-through with a live diagram: why NAT exists, what the router changes, and how replies find their way back.",
    homeNetwork: "Your home network (private)",
    internetPublic: "Internet (public)",
    router: "Router (NAT)",
    publicIp: "Public IP",
    laptop: "Laptop",
    app: "app",
    dnsName: "Google DNS",
    dnsApp: "DNS app",
    requestPacket: "Request packet",
    responsePacket: "Response packet",
    packetHint: "Packet at this step",
    source: "Source",
    destination: "Destination",
    private: "Private",
    public: "Public",
    rewritten: "Rewritten by router",
    was: "was",
    natTable: "NAT table",
    natTableHint:
      "The router's notebook. It remembers who really asked, so the reply can be handed to the right device.",
    insidePrivate: "Inside private (real sender)",
    insidePublic: "Inside public (what the internet sees)",
    outsidePublic: "Outside public (destination)",
    emptyTable: "Empty. The router has not translated anything yet.",
    analogy: "Think of it like",
    keyTerm: "Key term",
    problemBig: "2³² = 4,294,967,296",
    problemCaption: "possible IPv4 addresses in total",
    problemNote:
      "Phones, laptops, TVs, printers, cameras and more. There are now more devices than addresses.",
  },
  hi: {
    lessonTitle: "Network Address Translation (NAT)",
    heroTitle: "NAT se bahut saare devices ek public IP kaise share karte hain",
    heroSubtitle:
      "Live diagram ke saath step-by-step: NAT kyun chahiye, router kya badalta hai, aur reply wapas sahi device tak kaise pahunchta hai.",
    homeNetwork: "Aapka home network (private)",
    internetPublic: "Internet (public)",
    router: "Router (NAT)",
    publicIp: "Public IP",
    laptop: "Laptop",
    app: "app",
    dnsName: "Google DNS",
    dnsApp: "DNS app",
    requestPacket: "Request packet",
    responsePacket: "Response packet",
    packetHint: "Is step par packet",
    source: "Source",
    destination: "Destination",
    private: "Private",
    public: "Public",
    rewritten: "Router ne badla",
    was: "pehle tha",
    natTable: "NAT table",
    natTableHint:
      "Router ki notebook. Ismein yaad rehta hai ki asal mein request kisne bheji thi, taaki reply sahi device ko mile.",
    insidePrivate: "Inside private (asal sender)",
    insidePublic: "Inside public (internet ko jo dikhta hai)",
    outsidePublic: "Outside public (destination)",
    emptyTable: "Khaali hai. Router ne abhi kuch translate nahi kiya.",
    analogy: "Aise samjho",
    keyTerm: "Key term",
    problemBig: "2³² = 4,294,967,296",
    problemCaption: "total possible IPv4 addresses",
    problemNote:
      "Phone, laptop, TV, printer, camera aur bahut kuch. Ab addresses se zyada devices hain.",
  },
} as const;

const ROW_C: NatRow = {
  insidePrivate: "10.0.0.4:3000",
  insidePublic: "2.3.4.5:3000",
  outsidePublic: "8.8.8.8:53",
};

const ROW_A_CLASH: NatRow = {
  insidePrivate: "10.0.0.1:3000",
  insidePublic: "2.3.4.5:3000",
  outsidePublic: "8.8.8.8:53",
};

const ROW_A: NatRow = {
  insidePrivate: "10.0.0.1:3000",
  insidePublic: "2.3.4.5:55",
  outsidePublic: "8.8.8.8:53",
};

export const NAT_STEPS: NatStep[] = [
  {
    id: "what-is-nat",
    phase: "Definition",
    scene: "diagram",
    activeNodes: [],
    activeDevices: [],
    natTable: [],
    highlightRows: [],
    en: {
      title: "What is NAT?",
      summary: "NAT lets many devices share one public IP address.",
      detail:
        "NAT stands for Network Address Translation. Your home router does it for you: when a device on your private network talks to the internet, the router swaps the device's private address for the router's public address. When the reply comes back, it swaps it back and gives it to the right device.",
      points: [
        "Private IP: used only inside your home or office.",
        "Public IP: used on the internet, and unique worldwide.",
        "NAT: the router translating between the two.",
      ],
      analogy:
        "A big apartment building has one street address (the public IP) and many flat numbers (the private IPs). The reception desk (the router) takes in all the mail and knows which flat it belongs to.",
      term: {
        name: "NAT",
        meaning:
          "Network Address Translation: rewriting addresses (and ports) in a packet as it passes through a router.",
      },
    },
    hi: {
      title: "NAT kya hai?",
      summary: "NAT ki wajah se bahut saare devices ek public IP address share kar paate hain.",
      detail:
        "NAT ka matlab Network Address Translation. Yeh kaam aapka home router karta hai: jab aapke private network ka koi device internet se baat karta hai, router us device ka private address apne public address se badal deta hai. Reply aane par woh wapas badal kar sahi device ko de deta hai.",
      points: [
        "Private IP: sirf aapke ghar ya office ke andar use hota hai.",
        "Public IP: internet par use hota hai, aur poori duniya mein unique hota hai.",
        "NAT: router jo in dono ke beech translation karta hai.",
      ],
      analogy:
        "Ek badi building ka ek hi street address hota hai (public IP) aur har flat ka alag number (private IP). Reception desk (router) saari dak leta hai aur jaanta hai kaun si dak kis flat ki hai.",
      term: {
        name: "NAT",
        meaning:
          "Network Address Translation: router se guzarte waqt packet ke addresses (aur ports) ko rewrite karna.",
      },
    },
  },
  {
    id: "why-nat",
    phase: "Why NAT",
    scene: "problem",
    activeNodes: [],
    activeDevices: [],
    natTable: [],
    highlightRows: [],
    en: {
      title: "Why do we need NAT?",
      summary: "There are not enough IPv4 addresses for every device.",
      detail:
        "An IPv4 address is 32 bits long, which gives about 4.3 billion combinations. That sounds huge, but phones, laptops, TVs and smart devices have outgrown it. If every device needed its own public address, we would have run out.",
      points: [
        "Every public IP must be unique on the whole internet.",
        "With NAT, a whole home or office shares one public IP.",
        "This slows down the shortage. IPv6 is the long-term fix.",
      ],
      analogy:
        "A company gives out one office phone number, and each employee gets an extension. Outsiders only ever see the one number.",
    },
    hi: {
      title: "NAT ki zarurat kyun hai?",
      summary: "Har device ke liye kaafi IPv4 addresses hain hi nahi.",
      detail:
        "IPv4 address 32 bits ka hota hai, jisse lagbhag 4.3 billion combinations bante hain. Yeh bahut lagta hai, lekin phone, laptop, TV aur smart devices ne isse paar kar diya. Agar har device ko apna public address chahiye hota, toh addresses khatam ho jaate.",
      points: [
        "Har public IP poore internet par unique hona chahiye.",
        "NAT ke saath poora ghar ya office ek public IP share karta hai.",
        "Isse shortage ki raftaar dheemi hoti hai. Long-term solution IPv6 hai.",
      ],
      analogy:
        "Company ek office phone number deti hai aur har employee ko ek extension. Bahar walon ko sirf ek hi number dikhta hai.",
    },
  },
  {
    id: "public-vs-private",
    phase: "Public vs private",
    scene: "cards",
    activeNodes: [],
    activeDevices: [],
    natTable: [],
    highlightRows: [],
    en: {
      title: "Public vs private IP addresses",
      summary: "Public IPs work on the internet. Private IPs only work inside your own network.",
      detail:
        "A public IP like Google DNS at 8.8.8.8 is routable: every router on the internet knows how to forward packets to it. IANA reserved three ranges for private use. Anyone can use them inside their own network, so the same address (like 192.168.1.2) exists in millions of homes at once.",
      points: [
        "Internet routers drop any packet with a private source or destination.",
        "So a device with only a private IP cannot talk to the internet directly.",
        "That is the problem NAT solves.",
      ],
      cards: [
        { name: "10.0.0.0 to 10.255.255.255", text: "10.0.0.0/8. Large networks." },
        { name: "172.16.0.0 to 172.31.255.255", text: "172.16.0.0/12. Medium networks." },
        { name: "192.168.0.0 to 192.168.255.255", text: "192.168.0.0/16. Home Wi-Fi." },
      ],
    },
    hi: {
      title: "Public aur private IP addresses",
      summary: "Public IP internet par chalte hain. Private IP sirf aapke apne network ke andar.",
      detail:
        "Public IP, jaise Google DNS ka 8.8.8.8, routable hota hai: internet ka har router jaanta hai ki uski taraf packet kaise forward karna hai. IANA ne private use ke liye teen ranges reserve ki hain. Koi bhi apne network ke andar inhe use kar sakta hai, isliye wahi address (jaise 192.168.1.2) laakhon gharon mein ek saath hota hai.",
      points: [
        "Internet ke router private source ya destination wale packet ko drop kar dete hain.",
        "Isliye sirf private IP wala device internet se seedha baat nahi kar sakta.",
        "Yahi problem NAT solve karta hai.",
      ],
      cards: [
        { name: "10.0.0.0 se 10.255.255.255", text: "10.0.0.0/8. Bade networks." },
        { name: "172.16.0.0 se 172.31.255.255", text: "172.16.0.0/12. Medium networks." },
        { name: "192.168.0.0 se 192.168.255.255", text: "192.168.0.0/16. Home Wi-Fi." },
      ],
    },
  },
  {
    id: "the-fix",
    phase: "The idea",
    scene: "diagram",
    activeNodes: ["private", "router"],
    activeDevices: [],
    natTable: [],
    highlightRows: [],
    en: {
      title: "The fix: share the router's public IP",
      summary: "The router sits between your network and the internet, and has two addresses.",
      detail:
        "Your ISP (for example Jio or Airtel) gives the router one public IP. Inside, every device gets a private IP. To reach anything outside, a device sends its packets to its default gateway, which is the router. The router then talks to the internet using its own public IP on the device's behalf.",
      points: [
        "Inside interface: a private IP, part of your home network.",
        "Outside interface: a public IP given by your ISP.",
        "Default gateway: the router, the exit door of your network.",
      ],
      analogy:
        "The router is a receptionist who makes every call using the office's one phone number, then passes the answer to whoever asked.",
    },
    hi: {
      title: "Solution: router ka public IP share karo",
      summary: "Router aapke network aur internet ke beech baithta hai, aur uske paas do addresses hote hain.",
      detail:
        "ISP (jaise Jio ya Airtel) router ko ek public IP deta hai. Andar har device ko private IP milta hai. Bahar kuch bhi reach karne ke liye device apne packets default gateway ko bhejta hai, jo router hai. Router phir device ki taraf se apne public IP se internet par baat karta hai.",
      points: [
        "Inside interface: private IP, aapke home network ka hissa.",
        "Outside interface: ISP ka diya hua public IP.",
        "Default gateway: router, aapke network ka exit door.",
      ],
      analogy:
        "Router ek receptionist hai jo har call office ke ek hi phone number se karta hai, aur jawab us tak pahunchata hai jisne maanga tha.",
    },
  },
  {
    id: "types",
    phase: "Types",
    scene: "cards",
    activeNodes: [],
    activeDevices: [],
    natTable: [],
    highlightRows: [],
    en: {
      title: "Types of NAT",
      summary: "There are three kinds of NAT. Home routers use PAT.",
      detail:
        "PAT (Port Address Translation), also called NAPT (Network Address and Port Translation), is what your home router does. This lesson follows PAT. Static and dynamic NAT are separate topics.",
      cards: [
        { name: "Static NAT", text: "One private IP always maps to one fixed public IP." },
        { name: "Dynamic NAT", text: "Private IPs borrow a public IP from a pool when they need one." },
        { name: "PAT / NAPT", text: "Many devices share one public IP, told apart by port numbers." },
      ],
    },
    hi: {
      title: "NAT ke types",
      summary: "NAT ke teen types hain. Home routers PAT use karte hain.",
      detail:
        "PAT (Port Address Translation), jise NAPT (Network Address and Port Translation) bhi kehte hain, wahi hai jo aapka home router karta hai. Yeh lesson PAT follow karta hai. Static aur dynamic NAT alag topics hain.",
      cards: [
        { name: "Static NAT", text: "Ek private IP hamesha ek fixed public IP se map hota hai." },
        { name: "Dynamic NAT", text: "Private IPs ko zarurat par pool se public IP milta hai." },
        { name: "PAT / NAPT", text: "Bahut saare devices ek public IP share karte hain, ports se alag pehchaane jaate hain." },
      ],
    },
  },
  {
    id: "setup",
    phase: "Setup",
    scene: "diagram",
    activeNodes: ["private", "router", "internet"],
    activeDevices: ["A", "C"],
    natTable: [],
    highlightRows: [],
    en: {
      title: "Meet the example",
      summary: "Two laptops, one router, one DNS server.",
      detail:
        "Laptop C has private IP 10.0.0.4 and an app on port 3000. Laptop A has 10.0.0.1 and also runs an app on port 3000. The router's public IP from the ISP is 2.3.4.5. Both laptops want to send a DNS query to Google DNS at 8.8.8.8, where the DNS resolver listens on port 53.",
      points: [
        "The IP address finds the device.",
        "The port number finds the app on that device.",
        "IP plus port, like 10.0.0.4:3000, identifies one conversation.",
      ],
      term: {
        name: "Port",
        meaning: "A number that tells a device which app should receive the data.",
      },
    },
    hi: {
      title: "Example samjho",
      summary: "Do laptops, ek router, ek DNS server.",
      detail:
        "Laptop C ka private IP 10.0.0.4 hai aur port 3000 par ek app chal raha hai. Laptop A ka IP 10.0.0.1 hai aur woh bhi port 3000 par app chala raha hai. Router ka ISP wala public IP 2.3.4.5 hai. Dono laptops Google DNS (8.8.8.8) ko DNS query bhejna chahte hain, jahan DNS resolver port 53 par sunta hai.",
      points: [
        "IP address device ko dhundta hai.",
        "Port number us device ka app dhundta hai.",
        "IP aur port saath mein, jaise 10.0.0.4:3000, ek conversation ko pehchante hain.",
      ],
      term: {
        name: "Port",
        meaning: "Ek number jo batata hai ki data device ke kaun se app ko milna chahiye.",
      },
    },
  },
  {
    id: "build-packet",
    phase: "Request",
    scene: "diagram",
    activeNodes: ["private", "router"],
    activeDevices: ["C"],
    packet: {
      direction: "out",
      src: "10.0.0.4:3000",
      dst: "8.8.8.8:53",
      at: "lan",
      device: "C",
    },
    natTable: [],
    highlightRows: [],
    en: {
      title: "C creates a packet",
      summary: "C writes who it is from and where it wants to go.",
      detail:
        "C sets the source to its own 10.0.0.4 and port 3000, and the destination to 8.8.8.8 and port 53. Using its subnet mask, C checks whether 8.8.8.8 is on its local network. It is not, so C sends the packet to its default gateway, finding the router's MAC address with ARP first.",
      points: [
        "Destination not in my network, so send to the default gateway.",
        "ARP finds the router's MAC address.",
        "The packet is going to the router, not yet to the internet.",
      ],
    },
    hi: {
      title: "C packet banata hai",
      summary: "C likhta hai ki packet kahan se aaya hai aur kahan jaana hai.",
      detail:
        "C source mein apna 10.0.0.4 aur port 3000 likhta hai, aur destination mein 8.8.8.8 aur port 53. Subnet mask se C check karta hai ki 8.8.8.8 uske local network mein hai ya nahi. Nahi hai, toh C packet default gateway ko bhejta hai, pehle ARP se router ka MAC address dhundh kar.",
      points: [
        "Destination mere network mein nahi hai, toh default gateway ko bhejo.",
        "ARP router ka MAC address dhundta hai.",
        "Packet router ke paas ja raha hai, abhi internet par nahi.",
      ],
    },
  },
  {
    id: "translate-out",
    phase: "Request",
    scene: "diagram",
    activeNodes: ["router", "internet"],
    activeDevices: ["C"],
    packet: {
      direction: "out",
      src: "2.3.4.5:3000",
      dst: "8.8.8.8:53",
      at: "router",
      changed: "src",
      was: "10.0.0.4:3000",
    },
    natTable: [ROW_C],
    highlightRows: [0],
    en: {
      title: "The router rewrites the source address",
      summary: "Private source in, public source out.",
      detail:
        "The router sees that the destination is not its own address, so the packet is meant for the internet. But the source 10.0.0.4 is private, and any internet router would drop it. So the router replaces the source with its own public IP, 2.3.4.5, and writes a note in its NAT table about who really sent it.",
      points: [
        "Inside private: the real sender, 10.0.0.4:3000.",
        "Inside public: what the router changed it to, 2.3.4.5:3000.",
        "Outside public: where the packet is going, 8.8.8.8:53.",
      ],
      analogy:
        "The receptionist writes 'Flat C asked for this' in her logbook, then posts the letter under the building's street address.",
    },
    hi: {
      title: "Router source address rewrite karta hai",
      summary: "Private source andar aaya, public source bahar gaya.",
      detail:
        "Router dekhta hai ki destination uska apna address nahi hai, matlab packet internet ke liye hai. Lekin source 10.0.0.4 private hai, aur internet ka koi bhi router use drop kar dega. Isliye router source ko apne public IP 2.3.4.5 se badal deta hai, aur NAT table mein note kar leta hai ki asal mein kisne bheja tha.",
      points: [
        "Inside private: asal sender, 10.0.0.4:3000.",
        "Inside public: router ne jo bana diya, 2.3.4.5:3000.",
        "Outside public: packet kahan ja raha hai, 8.8.8.8:53.",
      ],
      analogy:
        "Receptionist apni logbook mein likhti hai 'Flat C ne yeh manga tha', phir letter building ke street address se post karti hai.",
    },
  },
  {
    id: "dns-reply",
    phase: "Reply",
    scene: "diagram",
    activeNodes: ["router", "internet"],
    activeDevices: [],
    packet: {
      direction: "in",
      src: "8.8.8.8:53",
      dst: "2.3.4.5:3000",
      at: "dns",
    },
    natTable: [ROW_C],
    highlightRows: [],
    en: {
      title: "Google DNS receives it and replies",
      summary: "The reply is sent to the router, not to the laptop.",
      detail:
        "Both addresses on the packet are public, so it travels across the internet without being dropped. Google DNS sees its own IP and port 53, hands the query to its DNS app, and creates a reply. To reply, it swaps source and destination: the reply goes to 2.3.4.5:3000, the address the request came from.",
      points: [
        "Google DNS never sees 10.0.0.4. It only knows the router's public IP.",
        "In a reply, source and destination swap places.",
      ],
    },
    hi: {
      title: "Google DNS packet leta hai aur reply deta hai",
      summary: "Reply router ko jaata hai, laptop ko nahi.",
      detail:
        "Packet ke dono addresses public hain, isliye woh internet par bina drop hue travel karta hai. Google DNS apna IP aur port 53 dekhta hai, query apne DNS app ko deta hai, aur reply banata hai. Reply ke liye woh source aur destination swap karta hai: reply 2.3.4.5:3000 ko jaata hai, jahan se request aayi thi.",
      points: [
        "Google DNS ko 10.0.0.4 kabhi dikhta hi nahi. Use sirf router ka public IP pata hai.",
        "Reply mein source aur destination ki jagah badal jaati hai.",
      ],
    },
  },
  {
    id: "translate-in",
    phase: "Reply",
    scene: "diagram",
    activeNodes: ["router", "private"],
    activeDevices: ["C"],
    packet: {
      direction: "in",
      src: "8.8.8.8:53",
      dst: "10.0.0.4:3000",
      at: "lan",
      device: "C",
      changed: "dst",
      was: "2.3.4.5:3000",
    },
    natTable: [ROW_C],
    highlightRows: [0],
    en: {
      title: "The router translates the destination back",
      summary: "Public destination in, private destination out.",
      detail:
        "The reply reaches the router addressed to 2.3.4.5:3000. The router looks in its NAT table, finds that 2.3.4.5:3000 belongs to 10.0.0.4:3000, and rewrites the destination. Then it forwards the packet to C. So the router translates private to public on the way out, and public back to private on the way in.",
      analogy:
        "The receptionist checks her logbook, sees 'Flat C asked for this', and delivers the reply to Flat C.",
    },
    hi: {
      title: "Router destination ko wapas translate karta hai",
      summary: "Public destination andar aaya, private destination bahar gaya.",
      detail:
        "Reply router tak 2.3.4.5:3000 ke address par pahunchta hai. Router NAT table dekhta hai, pata chalta hai ki 2.3.4.5:3000 asal mein 10.0.0.4:3000 ka hai, aur destination rewrite kar deta hai. Phir packet C ko forward kar deta hai. Yaani jaate waqt private se public, aur aate waqt public se wapas private.",
      analogy:
        "Receptionist logbook dekhti hai, 'Flat C ne manga tha', aur reply Flat C ko deliver kar deti hai.",
    },
  },
  {
    id: "port-clash",
    phase: "PAT",
    scene: "diagram",
    activeNodes: ["private", "router"],
    activeDevices: ["A"],
    packet: {
      direction: "out",
      src: "10.0.0.1:3000",
      dst: "8.8.8.8:53",
      at: "lan",
      device: "A",
    },
    natTable: [ROW_C, ROW_A_CLASH],
    highlightRows: [],
    clashRows: [1],
    en: {
      title: "Now A joins, with the same port",
      summary: "Two devices, same port number: a clash.",
      detail:
        "Laptop A (10.0.0.1) also runs an app on port 3000 and queries the same destination. If the router only swapped the IP and kept port 3000, its table would have two rows with the same inside public address, 2.3.4.5:3000. When the reply comes back, the router could not tell whether it belongs to A or to C.",
      points: [
        "Same public IP, same port, same destination: the rows look identical from outside.",
        "The router needs something unique to tell the replies apart.",
      ],
    },
    hi: {
      title: "Ab A aata hai, wahi port ke saath",
      summary: "Do devices, ek hi port number: clash.",
      detail:
        "Laptop A (10.0.0.1) bhi port 3000 par app chala raha hai aur wahi destination query kar raha hai. Agar router sirf IP badalta aur port 3000 rakhta, toh table mein do rows ka inside public address same hota, 2.3.4.5:3000. Reply aane par router ko pata hi nahi chalta ki woh A ka hai ya C ka.",
      points: [
        "Same public IP, same port, same destination: bahar se dono rows ek jaisi dikhti hain.",
        "Router ko reply alag karne ke liye kuch unique chahiye.",
      ],
    },
  },
  {
    id: "port-pick",
    phase: "PAT",
    scene: "diagram",
    activeNodes: ["router", "internet"],
    activeDevices: ["A"],
    packet: {
      direction: "out",
      src: "2.3.4.5:55",
      dst: "8.8.8.8:53",
      at: "router",
      changed: "src",
      was: "10.0.0.1:3000",
    },
    natTable: [ROW_C, ROW_A],
    highlightRows: [1],
    en: {
      title: "The router picks a new, unused port",
      summary: "Each device gets its own public port, so replies never mix.",
      detail:
        "To avoid the clash, the router picks a port that is not in its table yet, here 55, and uses it as A's public port. The table still remembers that 2.3.4.5:55 really means 10.0.0.1:3000. Your router does not always keep the port your device used.",
      points: [
        "The inside private column keeps the real sender, 10.0.0.1:3000.",
        "The inside public column now has a unique port, 55.",
        "Real routers usually pick from a high port range.",
      ],
      analogy:
        "The receptionist gives every request its own ticket number, so each reply can be matched to the right flat.",
    },
    hi: {
      title: "Router naya, unused port chunta hai",
      summary: "Har device ko apna public port milta hai, isliye replies kabhi mix nahi hote.",
      detail:
        "Clash se bachne ke liye router aisa port chunta hai jo table mein abhi nahi hai, yahan 55, aur use A ka public port bana deta hai. Table yaad rakhti hai ki 2.3.4.5:55 asal mein 10.0.0.1:3000 hai. Aapka router hamesha wahi port nahi rakhta jo aapke device ne use kiya tha.",
      points: [
        "Inside private column mein asal sender 10.0.0.1:3000 rehta hai.",
        "Inside public column mein ab unique port 55 hai.",
        "Real routers aam taur par high port range se port chunte hain.",
      ],
      analogy:
        "Receptionist har request ko apna ticket number deti hai, taaki har reply sahi flat se match ho jaaye.",
    },
  },
  {
    id: "port-return",
    phase: "PAT",
    scene: "diagram",
    activeNodes: ["router", "private"],
    activeDevices: ["A"],
    packet: {
      direction: "in",
      src: "8.8.8.8:53",
      dst: "10.0.0.1:3000",
      at: "lan",
      device: "A",
      changed: "dst",
      was: "2.3.4.5:55",
    },
    natTable: [ROW_C, ROW_A],
    highlightRows: [1],
    en: {
      title: "The unique port tells the router who gets the reply",
      summary: "Port 55 means A. Port 3000 means C.",
      detail:
        "The reply arrives for 2.3.4.5:55. The router finds that entry in its table, rewrites the destination to 10.0.0.1:3000, and forwards the packet to A. Because every row now has a unique public IP and port, any number of devices can share one public IP without their replies getting mixed up.",
    },
    hi: {
      title: "Unique port router ko batata hai reply kisko jaayega",
      summary: "Port 55 matlab A. Port 3000 matlab C.",
      detail:
        "Reply 2.3.4.5:55 ke liye aata hai. Router table mein woh entry dhundta hai, destination ko 10.0.0.1:3000 mein rewrite karta hai, aur packet A ko forward kar deta hai. Kyunki ab har row ka public IP aur port unique hai, kitne bhi devices ek public IP share kar sakte hain bina replies mix hue.",
    },
  },
  {
    id: "summary",
    phase: "Summary",
    scene: "diagram",
    activeNodes: ["private", "router", "internet"],
    activeDevices: ["A", "C"],
    natTable: [ROW_C, ROW_A],
    highlightRows: [],
    en: {
      title: "Recap: many devices, one public IP",
      summary: "NAT lets private devices use the internet through the router's single public IP.",
      detail:
        "That is all NAT does. It translates addresses in both directions and remembers each conversation in a table.",
      points: [
        "Going out: the router swaps the private source for its public IP (and a unique port if needed).",
        "The NAT table remembers who really sent each request.",
        "Coming back: the router looks up the table and swaps the public destination for the private one.",
        "Result: many devices share one public IP, and the internet only ever sees the router.",
      ],
    },
    hi: {
      title: "Recap: bahut saare devices, ek public IP",
      summary: "NAT private devices ko router ke ek public IP se internet use karne deta hai.",
      detail:
        "NAT bas yahi karta hai. Woh dono taraf addresses translate karta hai aur har conversation ko table mein yaad rakhta hai.",
      points: [
        "Jaate waqt: router private source ko apne public IP se badalta hai (zarurat ho toh unique port bhi).",
        "NAT table yaad rakhti hai ki har request asal mein kisne bheji.",
        "Aate waqt: router table dekhta hai aur public destination ko private se badal deta hai.",
        "Result: bahut saare devices ek public IP share karte hain, aur internet ko sirf router dikhta hai.",
      ],
    },
  },
];
