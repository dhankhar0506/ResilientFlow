export interface IpStructureStep {
  id: string;
  phase: string;
  example: string;
  highlightOctets: number[]; 
  showBinary: boolean;
  bitsSoFar: number; 
  en: { title: string; detail: string };
  hi: { title: string; detail: string };
}

export const IP_LABELS = {
  en: {
    lessonTitle: "IP Address Structure",
    heroTitle: "How an IP address is actually built",
    heroSubtitle: "Break a familiar-looking address like 192.168.1.4 down into octets, bits, and bytes.",
    octet: "Octet",
    bitsExplained: "Bits explained so far",
    totalWeight: "Total weight of an IPv4 address",
  },
  hi: {
    lessonTitle: "IP Address Structure",
    heroTitle: "IP address asal mein kaise bana hota hai",
    heroSubtitle: "192.168.1.4 jaise familiar address ko octets, bits, aur bytes mein todo.",
    octet: "Octet",
    bitsExplained: "Ab tak kitne bits samjhe",
    totalWeight: "Ek IPv4 address ka poora weight",
  },
} as const;

export const IP_STEPS: IpStructureStep[] = [
  {
    id: "what-is-ip",
    phase: "Basics",
    example: "127.0.0.1",
    highlightOctets: [],
    showBinary: false,
    bitsSoFar: 0,
    en: {
      title: "What is an IP address?",
      detail:
        "IP stands for Internet Protocol — one of the most fundamental protocols on the internet. You've probably already used one without noticing: when you run a frontend or backend on your own machine, it runs on localhost, which is 127.0.0.1. That's an IP address sitting right there on your laptop.",
    },
    hi: {
      title: "IP address kya hota hai?",
      detail:
        "IP ka matlab hai Internet Protocol — internet ke sabse fundamental protocols mein se ek. Aapne shayad already ek IP use kiya hoga bina notice kiye: jab bhi aap apni machine pe frontend ya backend chalate ho, woh localhost pe chalta hai, jo hai 127.0.0.1. Yeh ek IP address hai jo seedha aapke laptop pe baitha hai.",
    },
  },
  {
    id: "dotted-quad",
    phase: "Notation",
    example: "192.168.1.4",
    highlightOctets: [0, 1, 2, 3],
    showBinary: false,
    bitsSoFar: 0,
    en: {
      title: "How an IP address is written",
      detail:
        "An IPv4 address is written as a.b.c.d — four non-negative integers separated by dots. For example, 192.168.1.4. This way of writing it has a name: dotted quad notation. It's the format you'll see an IP address in almost everywhere.",
    },
    hi: {
      title: "IP address kaise likha jaata hai",
      detail:
        "Ek IPv4 address a.b.c.d ke format mein likha jaata hai — chaar non-negative integers, dots se separated. Jaise, 192.168.1.4. Isse likhne ke style ka ek naam hai: dotted quad notation. Yeh woh format hai jisme aapko almost har jagah IP address dikhega.",
    },
  },
  {
    id: "octets",
    phase: "Octets",
    example: "192.168.1.4",
    highlightOctets: [0, 1, 2, 3],
    showBinary: false,
    bitsSoFar: 0,
    en: {
      title: "Each part is called an octet",
      detail:
        "Every dot-separated integer in an IP address is called an octet. In 192.168.1.4, the first three octets are 192, 168, and 1, and the last octet is 4. Networking discussions constantly refer to 'the first three octets' or 'the last octet' — this is exactly what that means.",
    },
    hi: {
      title: "Har part ko octet kehte hain",
      detail:
        "IP address mein har dot-separated integer ko octet kehte hain. 192.168.1.4 mein, pehle teen octets hain 192, 168, aur 1, aur last octet hai 4. Networking discussions mein baar-baar 'pehle teen octets' ya 'last octet' sunayi dega — yehi iska matlab hai.",
    },
  },
  {
    id: "binary",
    phase: "Binary",
    example: "192.168.1.4",
    highlightOctets: [0, 1, 2, 3],
    showBinary: true,
    bitsSoFar: 32,
    en: {
      title: "Every octet is really 8 bits",
      detail:
        "Underneath the decimal number you normally see, each octet is stored as 8 bits of binary. So 192 is really 11000000, and the whole address can be written as four 8-bit binary blocks, one per octet. This binary view matters a lot once you get into subnetting.",
    },
    hi: {
      title: "Har octet asal mein 8 bits hota hai",
      detail:
        "Jo decimal number aap normally dekhte ho uske neeche, har octet 8 bits ke binary mein store hota hai. Toh 192 asal mein 11000000 hai, aur poora address chaar 8-bit binary blocks mein likha ja sakta hai, ek har octet ke liye. Yeh binary view bahut important ho jaata hai jab aap subnetting mein jaate ho.",
    },
  },
  {
    id: "why-32-bits",
    phase: "IPv4 length",
    example: "192.168.1.4",
    highlightOctets: [0, 1, 2, 3],
    showBinary: true,
    bitsSoFar: 32,
    en: {
      title: "Why an IPv4 address is 32 bits",
      detail:
        "8 bits per octet, and 4 octets in total: 8 × 4 = 32. That's the entire weight of an IPv4 address — 32 bits, or 4 bytes. IPv6 uses a completely different, much longer format — that's a separate topic of its own.",
    },
    hi: {
      title: "IPv4 address 32 bits kyun hota hai",
      detail:
        "8 bits per octet, aur total 4 octets: 8 × 4 = 32. Yehi hai ek IPv4 address ka poora weight — 32 bits, ya 4 bytes. IPv6 bilkul alag aur zyada lamba format use karta hai — woh apne aap mein ek separate topic hai.",
    },
  },
];