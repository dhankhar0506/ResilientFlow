import type { StepText } from "../../../shared/lessonParts";

export type SubnettingScene = "problem" | "bits" | "vlsm" | "playground";

/** A custom block on the 0–255 strip (used by the VLSM step). */
export interface StripBlock {
  start: number;
  size: number;
  label: string;
}

export interface SubnettingStep {
  id: string;
  phase: string;
  scene: SubnettingScene;
  /** prefix length to draw (24 = one /24 network) */
  prefix: number;
  /** index of the subnet to highlight */
  highlight?: number;
  /** last octet of an IP to drop on the strip */
  probe?: number;
  /** show the ranges table */
  showRanges?: boolean;
  /** highlight the borrowed bits with a pulse */
  pulseBorrowed?: boolean;
  blocks?: StripBlock[];
  en: StepText & { cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { cards?: { name: string; text: string; icon?: string }[] };
}

export const SUBNETTING_LABELS = {
  en: {
    lessonTitle: "Subnetting",
    heroTitle: "Subnetting: split one network into smaller networks",
    heroSubtitle:
      "Watch host bits get “borrowed” to create subnets, then find each subnet's network, first host, last host and broadcast address.",
    bitsTitle: "The 32 bits of 192.168.1.0",
    network: "Network bits",
    subnet: "Borrowed (subnet) bits",
    host: "Host bits",
    stripTitle: "The last octet: 192.168.1.0 – 192.168.1.255",
    stripHint: "Each coloured block is one subnet. All of them together are the original /24.",
    stats: "Numbers for this prefix",
    prefix: "Prefix",
    mask: "Subnet mask",
    subnets: "Subnets (2ⁿ)",
    hosts: "Usable hosts each (2ʰ − 2)",
    block: "Block size",
    ranges: "Subnet ranges",
    colSubnet: "Subnet",
    colNetwork: "Network",
    colFirst: "First host",
    colLast: "Last host",
    colBroadcast: "Broadcast",
    probe: "Your IP",
    tryPrefix: "Pick a prefix:",
    tryIp: "Pick an IP (last octet):",
    belongsTo: "belongs to subnet",
    tooMany: "Too many subnets to list – the strip shows them all.",
  },
  hi: {
    lessonTitle: "Subnetting",
    heroTitle: "Subnetting: ek network ko chhote networks mein todna",
    heroSubtitle:
      "Dekho host bits kaise “borrow” hote hain aur subnets bante hain, phir har subnet ka network, first host, last host aur broadcast nikaalo.",
    bitsTitle: "192.168.1.0 ke 32 bits",
    network: "Network bits",
    subnet: "Borrowed (subnet) bits",
    host: "Host bits",
    stripTitle: "Last octet: 192.168.1.0 – 192.168.1.255",
    stripHint: "Har coloured block ek subnet hai. Sab milkar original /24 banate hain.",
    stats: "Is prefix ke numbers",
    prefix: "Prefix",
    mask: "Subnet mask",
    subnets: "Subnets (2ⁿ)",
    hosts: "Har subnet mein usable hosts (2ʰ − 2)",
    block: "Block size",
    ranges: "Subnet ranges",
    colSubnet: "Subnet",
    colNetwork: "Network",
    colFirst: "First host",
    colLast: "Last host",
    colBroadcast: "Broadcast",
    probe: "Aapka IP",
    tryPrefix: "Prefix chuno:",
    tryIp: "IP chuno (last octet):",
    belongsTo: "is subnet mein hai",
    tooMany: "List karne ke liye bahut subnets hain – strip mein sab dikh rahe hain.",
  },
} as const;

export const SUBNETTING_STEPS: SubnettingStep[] = [
  {
    id: "why",
    phase: "1 · Why",
    scene: "problem",
    prefix: 24,
    en: {
      title: "Why split a network at all?",
      summary: "One huge flat network is noisy, hard to secure and hard to manage.",
      detail:
        "Imagine a college where all 250 devices – students, teachers, accounts, CCTV – sit in one network 192.168.1.0/24. Every broadcast (like an ARP request) reaches every device, any student laptop can try to reach the accounts PC, and one faulty device can slow everyone down. Subnetting cuts this one network into smaller, separate networks.",
      cards: [
        { icon: "📢", name: "Less broadcast noise", text: "Broadcasts stay inside their own subnet instead of hitting all 250 devices." },
        { icon: "🔐", name: "Better security", text: "A router or firewall sits between subnets, so you can control who talks to whom." },
        { icon: "🗂️", name: "Easier to manage", text: "Labs, office and CCTV each get their own address range. Problems are easier to find." },
      ],
      analogy:
        "One giant hall where everyone shouts versus a building with separate rooms. Rooms are quieter, and you can lock the doors.",
      term: { name: "Subnetting", meaning: "Dividing one IP network into several smaller networks (subnets)." },
    },
    hi: {
      title: "Network ko todna hi kyun?",
      summary: "Ek bahut bada flat network shor bhara, kam secure aur sambhalne mein mushkil hota hai.",
      detail:
        "Socho ek college hai jahan saare 250 devices – students, teachers, accounts, CCTV – ek hi network 192.168.1.0/24 mein hain. Har broadcast (jaise ARP request) har device tak jaata hai, koi bhi student laptop accounts PC tak pahunchne ki koshish kar sakta hai, aur ek kharab device sabko slow kar sakta hai. Subnetting is ek network ko chhote, alag networks mein kaat deta hai.",
      cards: [
        { icon: "📢", name: "Kam broadcast shor", text: "Broadcast apne subnet ke andar rehta hai, saare 250 devices tak nahi jaata." },
        { icon: "🔐", name: "Better security", text: "Subnets ke beech router ya firewall hota hai, toh control kar sakte ho kaun kisse baat kare." },
        { icon: "🗂️", name: "Manage karna aasaan", text: "Labs, office aur CCTV ko apni-apni range milti hai. Problem dhoondhna aasaan." },
      ],
      analogy:
        "Ek bada hall jahan sab chilla rahe hain vs ek building jismein alag-alag rooms hain. Rooms shaant hote hain aur darwaza lock kar sakte ho.",
      term: { name: "Subnetting", meaning: "Ek IP network ko kai chhote networks (subnets) mein baantna." },
    },
  },
  {
    id: "idea",
    phase: "2 · The idea",
    scene: "bits",
    prefix: 24,
    en: {
      title: "Start with a /24: 24 network bits, 8 host bits",
      summary: "A /24 has 24 fixed network bits and 8 host bits you are free to use.",
      detail:
        "192.168.1.0/24 means the first 24 bits (192.168.1) are the network and the last 8 bits are for hosts: 2⁸ = 256 addresses, .0 to .255. To make subnets we will take some of those 8 host bits and use them as extra network bits. This is called borrowing bits.",
      points: [
        "Network bits are fixed: they say which network.",
        "Host bits are free: they number the devices.",
        "Borrowing = moving the line between them to the right.",
      ],
      remember: "Subnetting never touches the network bits you were given. It only borrows from the host bits.",
    },
    hi: {
      title: "Shuru karo /24 se: 24 network bits, 8 host bits",
      summary: "/24 mein 24 fixed network bits aur 8 host bits hote hain jo tum use kar sakte ho.",
      detail:
        "192.168.1.0/24 ka matlab pehle 24 bits (192.168.1) network hain aur last 8 bits hosts ke liye: 2⁸ = 256 addresses, .0 se .255. Subnets banane ke liye hum in 8 host bits mein se kuch bits lekar unhe extra network bits ki tarah use karenge. Isko bits borrow karna kehte hain.",
      points: [
        "Network bits fixed hain: batate hain kaun sa network.",
        "Host bits free hain: devices ko number dete hain.",
        "Borrow karna = dono ke beech ki line ko right side khiskana.",
      ],
      remember: "Subnetting mile hue network bits ko nahi chhoota. Woh sirf host bits se borrow karta hai.",
    },
  },
  {
    id: "borrow-1",
    phase: "3 · Borrow 1 bit",
    scene: "bits",
    prefix: 25,
    pulseBorrowed: true,
    showRanges: true,
    en: {
      title: "Borrow 1 bit → /25 → 2 subnets",
      summary: "1 borrowed bit can be 0 or 1, so you get 2 subnets of 128 addresses each.",
      detail:
        "Move the line one bit to the right: the prefix becomes /25 and the mask becomes 255.255.255.128. The borrowed bit is the first bit of the last octet (value 128). When it is 0 you are in .0–.127; when it is 1 you are in .128–.255. Each half has 7 host bits: 2⁷ = 128 addresses, 126 usable.",
      remember: "Each borrowed bit doubles the number of subnets and halves their size.",
    },
    hi: {
      title: "1 bit borrow karo → /25 → 2 subnets",
      summary: "1 borrowed bit 0 ya 1 ho sakta hai, toh 128-128 addresses ke 2 subnets milte hain.",
      detail:
        "Line ko ek bit right khiskao: prefix /25 ho jaata hai aur mask 255.255.255.128. Borrowed bit last octet ka pehla bit hai (value 128). Woh 0 ho toh tum .0–.127 mein ho; 1 ho toh .128–.255 mein. Har half mein 7 host bits: 2⁷ = 128 addresses, 126 usable.",
      remember: "Har borrowed bit subnets ko double karta hai aur unka size aadha.",
    },
  },
  {
    id: "borrow-2",
    phase: "4 · Borrow 2 bits",
    scene: "bits",
    prefix: 26,
    pulseBorrowed: true,
    showRanges: true,
    en: {
      title: "Borrow 2 bits → /26 → 4 subnets",
      summary: "2 borrowed bits give 4 combinations (00, 01, 10, 11), so 4 subnets of 64.",
      detail:
        "Now the mask is 255.255.255.192 (128 + 64). The two borrowed bits pick the subnet: 00 → .0, 01 → .64, 10 → .128, 11 → .192. The remaining 6 host bits give 2⁶ = 64 addresses per subnet, 62 usable. Look at the strip: the /24 is now cut into 4 equal blocks.",
      points: ["00 → 192.168.1.0/26", "01 → 192.168.1.64/26", "10 → 192.168.1.128/26", "11 → 192.168.1.192/26"],
    },
    hi: {
      title: "2 bits borrow karo → /26 → 4 subnets",
      summary: "2 borrowed bits ke 4 combinations (00, 01, 10, 11), toh 64-64 ke 4 subnets.",
      detail:
        "Ab mask 255.255.255.192 hai (128 + 64). Do borrowed bits subnet chunte hain: 00 → .0, 01 → .64, 10 → .128, 11 → .192. Bache hue 6 host bits se har subnet mein 2⁶ = 64 addresses, 62 usable. Strip dekho: /24 ab 4 barabar blocks mein kat gaya hai.",
      points: ["00 → 192.168.1.0/26", "01 → 192.168.1.64/26", "10 → 192.168.1.128/26", "11 → 192.168.1.192/26"],
    },
  },
  {
    id: "block-size",
    phase: "5 · Shortcut",
    scene: "bits",
    prefix: 26,
    showRanges: true,
    en: {
      title: "The shortcut: block size = 256 − mask octet",
      summary: "For /26 the mask octet is 192, so blocks are 256 − 192 = 64 addresses apart.",
      detail:
        "You don't have to write binary every time. Take the interesting mask octet (the one that is not 255 or 0) and subtract it from 256. That number is the block size. Subnets start at 0 and then every block size: 0, 64, 128, 192. For /27 (mask .224) the block is 32: 0, 32, 64, 96 …",
      points: ["/25 → .128 → block 128", "/26 → .192 → block 64", "/27 → .224 → block 32", "/28 → .240 → block 16", "/30 → .252 → block 4"],
      remember: "Block size = 256 − mask octet. Subnets start at multiples of it.",
    },
    hi: {
      title: "Shortcut: block size = 256 − mask octet",
      summary: "/26 mein mask octet 192 hai, toh blocks 256 − 192 = 64 addresses ki doori par hain.",
      detail:
        "Har baar binary likhne ki zarurat nahi. Mask ka woh octet lo jo 255 ya 0 nahi hai, use 256 mein se ghatao. Yahi block size hai. Subnets 0 se shuru hote hain aur phir har block size par: 0, 64, 128, 192. /27 (mask .224) mein block 32 hai: 0, 32, 64, 96 …",
      points: ["/25 → .128 → block 128", "/26 → .192 → block 64", "/27 → .224 → block 32", "/28 → .240 → block 16", "/30 → .252 → block 4"],
      remember: "Block size = 256 − mask octet. Subnets iske multiples par shuru hote hain.",
    },
  },
  {
    id: "four-addresses",
    phase: "6 · Inside a subnet",
    scene: "bits",
    prefix: 26,
    highlight: 1,
    showRanges: true,
    en: {
      title: "Every subnet has 4 important addresses",
      summary: "Network (first), first host, last host and broadcast (last).",
      detail:
        "Take the second subnet, 192.168.1.64/26. Its first address .64 is the network address – it names the subnet and is not given to a device. Its last address .127 is the broadcast – a message to it reaches everyone in this subnet. Everything in between, .65 to .126, can be given to devices. That is why usable hosts = block size − 2.",
      points: ["Network: 192.168.1.64", "First host: 192.168.1.65", "Last host: 192.168.1.126", "Broadcast: 192.168.1.127"],
      remember: "Network = start of block. Broadcast = next block start − 1. Hosts = everything between.",
    },
    hi: {
      title: "Har subnet ke 4 zaroori addresses",
      summary: "Network (pehla), first host, last host aur broadcast (aakhri).",
      detail:
        "Doosra subnet lo, 192.168.1.64/26. Iska pehla address .64 network address hai – yeh subnet ka naam hai, kisi device ko nahi milta. Aakhri address .127 broadcast hai – ispar bheja message is subnet ke sabko milta hai. Beech ke .65 se .126 devices ko diye ja sakte hain. Isliye usable hosts = block size − 2.",
      points: ["Network: 192.168.1.64", "First host: 192.168.1.65", "Last host: 192.168.1.126", "Broadcast: 192.168.1.127"],
      remember: "Network = block ki shuruaat. Broadcast = agle block ki shuruaat − 1. Hosts = beech ka sab.",
    },
  },
  {
    id: "find-subnet",
    phase: "7 · Find the subnet",
    scene: "bits",
    prefix: 26,
    highlight: 2,
    probe: 130,
    showRanges: true,
    en: {
      title: "Which subnet is 192.168.1.130/26 in?",
      summary: "Find the largest multiple of the block size that is ≤ 130. That is 128.",
      detail:
        "Block size for /26 is 64. Multiples are 0, 64, 128, 192. 130 is between 128 and 192, so the IP lives in 192.168.1.128/26. Its hosts are .129 – .190 and its broadcast is .191. A device at .130 can talk directly to .150, but to reach .70 it must go through the router, because .70 is in a different subnet.",
      points: ["130 ÷ 64 = 2 (remainder 2)", "2 × 64 = 128 → network 192.168.1.128", "Broadcast = 128 + 64 − 1 = 191"],
      remember: "Same subnet → talk directly. Different subnet → go through the default gateway.",
    },
    hi: {
      title: "192.168.1.130/26 kis subnet mein hai?",
      summary: "Block size ka sabse bada multiple dhoondho jo 130 se chhota ya barabar ho. Woh 128 hai.",
      detail:
        "/26 ka block size 64 hai. Multiples: 0, 64, 128, 192. 130, 128 aur 192 ke beech hai, toh IP 192.168.1.128/26 mein hai. Iske hosts .129 – .190 aur broadcast .191 hai. .130 wala device .150 se seedha baat kar sakta hai, par .70 tak pahunchne ke liye router se jaana padega, kyunki .70 dusre subnet mein hai.",
      points: ["130 ÷ 64 = 2 (remainder 2)", "2 × 64 = 128 → network 192.168.1.128", "Broadcast = 128 + 64 − 1 = 191"],
      remember: "Same subnet → seedha baat. Different subnet → default gateway se jao.",
    },
  },
  {
    id: "formulas",
    phase: "8 · Formulas",
    scene: "bits",
    prefix: 27,
    showRanges: true,
    en: {
      title: "Two formulas you will use forever",
      summary: "Subnets = 2ⁿ (n = borrowed bits). Usable hosts = 2ʰ − 2 (h = host bits left).",
      detail:
        "For a /27 made from a /24 you borrowed n = 3 bits, so you get 2³ = 8 subnets. You have h = 32 − 27 = 5 host bits left, so each subnet has 2⁵ = 32 addresses and 30 usable hosts. Exam questions and real network planning both come down to these two lines.",
      points: ["/27 from /24 → n = 3 → 8 subnets", "h = 5 → 32 addresses → 30 hosts", "Mask = 255.255.255.224, block = 32"],
      remember: "Need H hosts? Pick the smallest h where 2ʰ − 2 ≥ H.",
    },
    hi: {
      title: "Do formulas jo hamesha kaam aayenge",
      summary: "Subnets = 2ⁿ (n = borrowed bits). Usable hosts = 2ʰ − 2 (h = bache host bits).",
      detail:
        "/24 se /27 banaya toh n = 3 bits borrow kiye, isliye 2³ = 8 subnets. h = 32 − 27 = 5 host bits bache, toh har subnet mein 2⁵ = 32 addresses aur 30 usable hosts. Exam ke sawaal aur asli network planning dono inhi do lines par aate hain.",
      points: ["/24 se /27 → n = 3 → 8 subnets", "h = 5 → 32 addresses → 30 hosts", "Mask = 255.255.255.224, block = 32"],
      remember: "H hosts chahiye? Sabse chhota h chuno jahan 2ʰ − 2 ≥ H.",
    },
  },
  {
    id: "vlsm",
    phase: "9 · Real design",
    scene: "vlsm",
    prefix: 24,
    blocks: [
      { start: 0, size: 128, label: "Labs /25" },
      { start: 128, size: 64, label: "Staff /26" },
      { start: 192, size: 32, label: "CCTV /27" },
      { start: 224, size: 4, label: "Link /30" },
    ],
    en: {
      title: "Real life: different sizes for different teams (VLSM)",
      summary: "Give each group a subnet that fits it, biggest first.",
      detail:
        "The college needs: Labs 100 devices, Staff 50, CCTV 20, and a link between two routers that needs just 2 addresses. Equal /26 blocks would not fit the labs, and a /26 for a 2-device link wastes 60 addresses. So we use Variable Length Subnet Masks (VLSM): Labs get a /25 (126 hosts), Staff a /26 (62), CCTV a /27 (30), and the router link a /30 (2). The rest stays free for later.",
      points: [
        "Labs: 192.168.1.0/25 → .1 – .126",
        "Staff: 192.168.1.128/26 → .129 – .190",
        "CCTV: 192.168.1.192/27 → .193 – .222",
        "Router link: 192.168.1.224/30 → .225 – .226",
      ],
      term: { name: "VLSM", meaning: "Variable Length Subnet Mask – using different prefix lengths inside one network so no addresses are wasted." },
      remember: "Always place the biggest subnet first, so blocks line up on their boundaries.",
    },
    hi: {
      title: "Asli zindagi: alag teams ke liye alag size (VLSM)",
      summary: "Har group ko uske hisaab ka subnet do, sabse bada pehle.",
      detail:
        "College ko chahiye: Labs 100 devices, Staff 50, CCTV 20, aur do routers ke beech ek link jismein sirf 2 addresses chahiye. Barabar /26 blocks mein labs fit nahi honge, aur 2 devices ke link ke liye /26 dene se 60 addresses waste. Isliye VLSM use karte hain: Labs ko /25 (126 hosts), Staff ko /26 (62), CCTV ko /27 (30), aur router link ko /30 (2). Baaki baad ke liye free.",
      points: [
        "Labs: 192.168.1.0/25 → .1 – .126",
        "Staff: 192.168.1.128/26 → .129 – .190",
        "CCTV: 192.168.1.192/27 → .193 – .222",
        "Router link: 192.168.1.224/30 → .225 – .226",
      ],
      term: { name: "VLSM", meaning: "Variable Length Subnet Mask – ek network ke andar alag-alag prefix lengths, taaki addresses waste na hon." },
      remember: "Hamesha sabse bada subnet pehle rakho, taaki blocks apni boundaries par line up hon.",
    },
  },
  {
    id: "playground",
    phase: "10 · Try it",
    scene: "playground",
    prefix: 26,
    probe: 130,
    showRanges: true,
    en: {
      title: "Try it yourself",
      summary: "Change the prefix and the IP. Watch the blocks, the mask and the ranges update.",
      detail:
        "Pick /24 to /30. The strip redraws the subnets, the numbers update, and the IP you pick lights up the subnet it belongs to. Try: which subnet is .200 in for /27? How many hosts does a /30 have? (Answers: 192.168.1.192/27 and 2.)",
      remember: "Borrowed bits → how many subnets. Remaining host bits → how big each subnet is.",
    },
    hi: {
      title: "Khud try karo",
      summary: "Prefix aur IP badlo. Blocks, mask aur ranges ko update hote dekho.",
      detail:
        "/24 se /30 tak chuno. Strip subnets dobara banata hai, numbers update hote hain, aur jo IP chuno uska subnet highlight hota hai. Try karo: /27 mein .200 kis subnet mein hai? /30 mein kitne hosts? (Answers: 192.168.1.192/27 aur 2.)",
      remember: "Borrowed bits → kitne subnets. Bache host bits → har subnet kitna bada.",
    },
  },
];
