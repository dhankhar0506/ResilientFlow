import type { StepText } from "../../../shared/lessonParts";

export type TlsScene = "diagram" | "cards";

export interface TlsStep {
  id: string;
  phase: string;
  scene: TlsScene;
  packet?: { dir: "out" | "in"; t: number; label: string; encrypted: boolean };
  /** what the eavesdropper sees */
  spy?: { lines: string[]; readable: boolean };
  lock: "open" | "handshake" | "locked";
  /** both sides now hold the same secret key */
  sharedKey?: boolean;
  certChecks?: boolean;
  terminal?: string[];
  en: StepText & { cards?: { name: string; text: string; icon?: string }[] };
  hi: StepText & { cards?: { name: string; text: string; icon?: string }[] };
}

export const TLS_LABELS = {
  en: {
    lessonTitle: "HTTPS & TLS",
    heroTitle: "HTTPS & TLS: how your data stays secret",
    heroSubtitle:
      "Follow a TLS 1.3 handshake between your browser and a bank's server while an eavesdropper on the same café Wi-Fi watches every packet.",
    browser: "Your browser",
    server: "bank.example",
    spy: "Eavesdropper on café Wi-Fi",
    spySees: "What the eavesdropper sees",
    readable: "readable!",
    gibberish: "unreadable",
    open: "no encryption",
    handshake: "handshake…",
    locked: "encrypted",
    sameKey: "same session key",
    certTitle: "Browser checks the certificate",
    checks: [
      ["Issued to", "bank.example – matches the address bar ✓"],
      ["Valid dates", "10 Aug 2026 → 8 Nov 2026 – not expired ✓"],
      ["Signed by", "Example CA → chains to a root CA trusted by your OS/browser ✓"],
      ["Proof of key", "Server signed the handshake with the certificate's private key ✓"],
    ],
  },
  hi: {
    lessonTitle: "HTTPS & TLS",
    heroTitle: "HTTPS & TLS: aapka data secret kaise rehta hai",
    heroSubtitle:
      "Browser aur bank ke server ke beech TLS 1.3 handshake follow karo, jabki same café Wi-Fi par baitha ek eavesdropper har packet dekh raha hai.",
    browser: "Aapka browser",
    server: "bank.example",
    spy: "Café Wi-Fi par eavesdropper",
    spySees: "Eavesdropper ko kya dikhta hai",
    readable: "padh sakta hai!",
    gibberish: "padh nahi sakta",
    open: "encryption nahi",
    handshake: "handshake…",
    locked: "encrypted",
    sameKey: "same session key",
    certTitle: "Browser certificate check karta hai",
    checks: [
      ["Issued to", "bank.example – address bar se match ✓"],
      ["Valid dates", "10 Aug 2026 → 8 Nov 2026 – expire nahi hua ✓"],
      ["Signed by", "Example CA → OS/browser ke trusted root CA tak chain ✓"],
      ["Proof of key", "Server ne certificate ki private key se handshake sign kiya ✓"],
    ],
  },
} as const;

const GIBBERISH = ["17 03 03 00 4a  9f 2c e1 7b 0d 88 a4 51", "c3 6e 12 ff 90 3b 7a e2 5d 11 c8 04 …", "(TLS application data – encrypted)"];

export const TLS_STEPS: TlsStep[] = [
  {
    id: "problem",
    phase: "1 · Problem",
    scene: "diagram",
    packet: { dir: "out", t: 0.5, label: "POST /login (plain HTTP)", encrypted: false },
    spy: {
      lines: ["POST /login HTTP/1.1", "Host: bank.example", "", "username=riya&password=Riya@1234"],
      readable: true,
    },
    lock: "open",
    en: {
      title: "Plain HTTP: anyone on the path can read everything",
      summary: "Over http:// your password travels as readable text. Anyone on the same Wi-Fi, or any router on the way, can read or change it.",
      detail:
        "Your packets pass through the café's Wi-Fi, the café's router, your ISP and several other networks. With plain HTTP, every one of them sees the exact bytes: URLs, cookies, form fields, passwords. A malicious person could also change the page on the way (inject ads or malware). HTTPS = HTTP inside a TLS-encrypted tunnel, and it fixes all of this.",
      term: { name: "HTTPS", meaning: "HTTP sent through a TLS-encrypted connection (default port 443)." },
    },
    hi: {
      title: "Plain HTTP: raaste mein koi bhi sab padh sakta hai",
      summary: "http:// par aapka password readable text ki tarah jaata hai. Same Wi-Fi par koi bhi, ya raaste ka koi bhi router use padh ya badal sakta hai.",
      detail:
        "Aapke packets café ke Wi-Fi, café ke router, aapke ISP aur kai aur networks se guzarte hain. Plain HTTP mein har ek ko exact bytes dikhte hain: URLs, cookies, form fields, passwords. Koi badmaash raaste mein page badal bhi sakta hai (ads ya malware daal sakta hai). HTTPS = TLS-encrypted tunnel ke andar HTTP, aur yeh sab theek karta hai.",
      term: { name: "HTTPS", meaning: "TLS-encrypted connection ke through bheja gaya HTTP (default port 443)." },
    },
  },
  {
    id: "goals",
    phase: "2 · Three promises",
    scene: "cards",
    lock: "open",
    en: {
      title: "What TLS promises",
      summary: "Confidentiality, integrity and authentication.",
      detail: "TLS (Transport Layer Security, the successor of SSL) sits between TCP and HTTP and gives three guarantees:",
      cards: [
        { icon: "🙈", name: "Confidentiality", text: "Data is encrypted. The eavesdropper sees random-looking bytes." },
        { icon: "🧾", name: "Integrity", text: "Every record carries an authentication tag. If one bit is changed on the way, the receiver detects it and rejects it." },
        { icon: "🪪", name: "Authentication", text: "A certificate proves you are really talking to bank.example and not an impostor in the middle." },
      ],
      remember: "Encryption without authentication is useless – you might be encrypting straight to the attacker.",
    },
    hi: {
      title: "TLS kya vaada karta hai",
      summary: "Confidentiality, integrity aur authentication.",
      detail: "TLS (Transport Layer Security, SSL ka agla version) TCP aur HTTP ke beech baithta hai aur teen guarantee deta hai:",
      cards: [
        { icon: "🙈", name: "Confidentiality", text: "Data encrypted hai. Eavesdropper ko random jaise bytes dikhte hain." },
        { icon: "🧾", name: "Integrity", text: "Har record par authentication tag hota hai. Raaste mein ek bit bhi badla toh receiver pakad kar reject karta hai." },
        { icon: "🪪", name: "Authentication", text: "Certificate saabit karta hai ki aap sach mein bank.example se baat kar rahe ho, beech ke kisi nakli se nahi." },
      ],
      remember: "Authentication ke bina encryption bekaar – ho sakta hai aap seedha attacker ke liye encrypt kar rahe ho.",
    },
  },
  {
    id: "keys",
    phase: "3 · Two kinds of keys",
    scene: "cards",
    lock: "open",
    en: {
      title: "Two kinds of cryptography work together",
      summary: "Public-key crypto is used to agree on a key and to prove identity. Fast symmetric crypto encrypts the actual data.",
      detail:
        "TLS uses both, each for what it's good at. During the handshake, asymmetric (public-key) math lets two strangers agree on a shared secret over an open network and lets the server prove its identity. After that, all data is encrypted with a fast symmetric cipher such as AES-GCM or ChaCha20 using that shared session key.",
      cards: [
        { icon: "🔑", name: "Symmetric (one shared key)", text: "Same key locks and unlocks. Very fast. Problem: how do you share the key secretly?" },
        { icon: "🗝️", name: "Asymmetric (key pair)", text: "Public key can be shared with everyone; private key never leaves the server. Slower, but solves the sharing and identity problems." },
        { icon: "🤝", name: "TLS = both", text: "Asymmetric for the handshake (key exchange + signatures), symmetric for the data." },
      ],
    },
    hi: {
      title: "Do tarah ki cryptography saath kaam karti hai",
      summary: "Public-key crypto key par agree karne aur pehchan saabit karne ke liye. Tez symmetric crypto asli data encrypt karta hai.",
      detail:
        "TLS dono use karta hai, har ek ko uske kaam ke liye. Handshake mein asymmetric (public-key) math do anjaan logon ko khule network par ek shared secret par agree karne deta hai aur server ko apni pehchan saabit karne deta hai. Uske baad saara data us shared session key se AES-GCM ya ChaCha20 jaise tez symmetric cipher se encrypt hota hai.",
      cards: [
        { icon: "🔑", name: "Symmetric (ek shared key)", text: "Wahi key lock aur unlock karti hai. Bahut tez. Problem: key chupke se share kaise karein?" },
        { icon: "🗝️", name: "Asymmetric (key pair)", text: "Public key sabko de sakte ho; private key server se kabhi bahar nahi jaati. Slow, par sharing aur pehchan dono problem solve." },
        { icon: "🤝", name: "TLS = dono", text: "Handshake ke liye asymmetric (key exchange + signatures), data ke liye symmetric." },
      ],
    },
  },
  {
    id: "client-hello",
    phase: "4 · ClientHello",
    scene: "diagram",
    packet: { dir: "out", t: 0.5, label: "ClientHello", encrypted: false },
    spy: {
      lines: ["TLS ClientHello", "  versions: TLS 1.3, 1.2", "  ciphers: AES-128-GCM, CHACHA20…", "  key_share: x25519 <public value>", "  server_name (SNI): bank.example"],
      readable: true,
    },
    lock: "handshake",
    en: {
      title: "ClientHello: “Here's what I support, and my half of the key”",
      summary: "After the TCP handshake, the browser sends ClientHello with TLS versions, ciphers, a key share and the server name.",
      detail:
        "The browser lists what it supports and, in TLS 1.3, already includes its Diffie-Hellman key share: a public value computed from a secret random number that never leaves the browser. It also sends SNI (Server Name Indication) so a server hosting many sites knows which certificate to use. This message is not encrypted – the eavesdropper sees it – but nothing in it lets them compute the key.",
    },
    hi: {
      title: "ClientHello: “Mujhe yeh support hai, aur yeh rahi key ki meri half”",
      summary: "TCP handshake ke baad browser ClientHello bhejta hai jismein TLS versions, ciphers, key share aur server name hota hai.",
      detail:
        "Browser batata hai use kya support hai aur TLS 1.3 mein apna Diffie-Hellman key share bhi daal deta hai: ek public value jo ek secret random number se bani hai, aur woh number browser se kabhi bahar nahi jaata. Woh SNI (Server Name Indication) bhi bhejta hai taaki kai sites wala server jaane kaunsa certificate dena hai. Yeh message encrypted nahi hai – eavesdropper dekhta hai – par isse woh key nahi nikaal sakta.",
    },
  },
  {
    id: "server-hello",
    phase: "5 · ServerHello & key",
    scene: "diagram",
    packet: { dir: "in", t: 0.5, label: "ServerHello + key share", encrypted: false },
    spy: {
      lines: ["TLS ServerHello", "  version: TLS 1.3", "  cipher: TLS_AES_128_GCM_SHA256", "  key_share: x25519 <public value>", "(can't compute the shared secret from the two public values)"],
      readable: true,
    },
    lock: "handshake",
    sharedKey: true,
    en: {
      title: "ServerHello: both sides now compute the same secret",
      summary: "The server picks the cipher and sends its own key share. Each side combines its secret with the other's public value → identical session keys.",
      detail:
        "This is the magic of (elliptic-curve) Diffie-Hellman key exchange. Browser: my secret + server's public value → S. Server: its secret + my public value → the same S. The eavesdropper saw both public values but, without either secret, cannot compute S – that's a mathematically hard problem. From S both derive the session keys. Everything after ServerHello is encrypted.",
      analogy:
        "Mixing paint: each side adds a secret colour to a shared public colour and swaps the mixtures. Each then adds its own secret colour again – both end up with the same final colour, but someone who only saw the swapped mixtures can't un-mix them.",
      term: { name: "ECDHE", meaning: "Elliptic-Curve Diffie-Hellman Ephemeral – a fresh key exchange for every connection, so old traffic stays safe even if a key leaks later (forward secrecy)." },
    },
    hi: {
      title: "ServerHello: ab dono side same secret nikaalti hain",
      summary: "Server cipher chunta hai aur apna key share bhejta hai. Har side apna secret dusre ke public value se milati hai → same session keys.",
      detail:
        "Yahi (elliptic-curve) Diffie-Hellman key exchange ka jaadu hai. Browser: mera secret + server ka public value → S. Server: uska secret + mera public value → wahi S. Eavesdropper ne dono public values dekhe, par kisi bhi secret ke bina S nahi nikaal sakta – yeh mathematically mushkil problem hai. S se dono session keys banate hain. ServerHello ke baad sab encrypted hai.",
      analogy:
        "Paint milana: dono ek public rang mein apna secret rang milate hain aur mixture badalte hain. Phir dono apna secret rang dobara milate hain – dono ke paas same final rang, par jisne sirf badle hue mixtures dekhe woh unhe alag nahi kar sakta.",
      term: { name: "ECDHE", meaning: "Elliptic-Curve Diffie-Hellman Ephemeral – har connection ke liye naya key exchange, taaki baad mein key leak ho toh bhi purana traffic safe rahe (forward secrecy)." },
    },
  },
  {
    id: "certificate",
    phase: "6 · Certificate",
    scene: "diagram",
    packet: { dir: "in", t: 0.5, label: "Certificate + signature", encrypted: true },
    spy: { lines: GIBBERISH, readable: false },
    lock: "handshake",
    sharedKey: true,
    certChecks: true,
    en: {
      title: "The server proves it's really bank.example",
      summary: "The server sends its certificate (encrypted) and signs the handshake with its private key. The browser checks it.",
      detail:
        "Key exchange alone could be done with an attacker in the middle. So the server sends its certificate: a document saying “this public key belongs to bank.example”, signed by a Certificate Authority (CA). Your browser checks the name, the dates, and that the signature chains up to a root CA it already trusts. Then it verifies the server's signature over the handshake (CertificateVerify), which only the owner of the private key could have made. Any failure → the browser shows a big red warning.",
      term: { name: "Certificate Authority (CA)", meaning: "A trusted organisation that verifies domain ownership and signs certificates (e.g. Let's Encrypt)." },
    },
    hi: {
      title: "Server saabit karta hai ki woh sach mein bank.example hai",
      summary: "Server apna certificate (encrypted) bhejta hai aur private key se handshake sign karta hai. Browser check karta hai.",
      detail:
        "Sirf key exchange beech ke attacker ke saath bhi ho sakta hai. Isliye server certificate bhejta hai: ek document jo kehta hai “yeh public key bank.example ki hai”, Certificate Authority (CA) ka sign kiya hua. Browser naam, dates, aur signature chain check karta hai jo ek pehle se trusted root CA tak jaati hai. Phir handshake par server ka signature verify karta hai (CertificateVerify), jo sirf private key ka maalik bana sakta hai. Kuch bhi fail → browser bada laal warning dikhata hai.",
      term: { name: "Certificate Authority (CA)", meaning: "Ek trusted sanstha jo domain ownership verify karke certificates sign karti hai (jaise Let's Encrypt)." },
    },
  },
  {
    id: "secure",
    phase: "7 · Encrypted data",
    scene: "diagram",
    packet: { dir: "out", t: 0.5, label: "POST /login (encrypted)", encrypted: true },
    spy: { lines: GIBBERISH, readable: false },
    lock: "locked",
    sharedKey: true,
    en: {
      title: "Finished → your HTTP request travels encrypted",
      summary: "Both sides send Finished. Now the same POST /login goes inside TLS records the eavesdropper can't read or modify.",
      detail:
        "Each side sends a Finished message – a check that both saw the exact same handshake (so nobody tampered with it). The padlock appears. Your browser sends the HTTP request, encrypted with the session key; the server decrypts it, handles it and sends an encrypted response. The whole TLS 1.3 handshake took just one round trip on top of TCP's.",
      remember: "Handshake = agree on keys + verify identity. After that, every byte is encrypted and integrity-protected.",
    },
    hi: {
      title: "Finished → aapka HTTP request encrypted jaata hai",
      summary: "Dono side Finished bhejti hain. Ab wahi POST /login TLS records ke andar jaata hai jinhe eavesdropper na padh sakta hai na badal sakta hai.",
      detail:
        "Har side Finished message bhejti hai – check ki dono ne exactly same handshake dekha (kisi ne chhedchhaad nahi ki). Padlock dikh jaata hai. Browser session key se encrypted HTTP request bhejta hai; server decrypt karke process karta hai aur encrypted response bhejta hai. Poora TLS 1.3 handshake TCP ke upar sirf ek round trip mein ho gaya.",
      remember: "Handshake = keys par agree + pehchan verify. Uske baad har byte encrypted aur integrity-protected.",
    },
  },
  {
    id: "still-visible",
    phase: "8 · What still leaks",
    scene: "cards",
    lock: "locked",
    en: {
      title: "What HTTPS hides – and what it doesn't",
      summary: "The content is hidden. The fact that you talked to bank.example is not.",
      detail: "HTTPS protects what you send, not that you sent it. Good to know the limits:",
      cards: [
        { icon: "🙈", name: "Hidden", text: "Full URL path and query (/login?user=…), headers, cookies, form data, page content." },
        { icon: "👀", name: "Still visible", text: "Your IP and the server's IP, the domain name (from DNS and SNI), how much data and when." },
        { icon: "🛡️", name: "Extra privacy", text: "DNS-over-HTTPS hides the DNS lookup; Encrypted Client Hello (ECH) hides SNI where supported; a VPN hides the destination from the local network." },
      ],
    },
    hi: {
      title: "HTTPS kya chhupata hai – aur kya nahi",
      summary: "Content chhup jaata hai. Yeh baat ki aapne bank.example se baat ki, nahi chhupti.",
      detail: "HTTPS yeh bachata hai ki aapne kya bheja, yeh nahi ki bheja. Limits jaanna accha hai:",
      cards: [
        { icon: "🙈", name: "Chhupa", text: "Poora URL path aur query (/login?user=…), headers, cookies, form data, page content." },
        { icon: "👀", name: "Ab bhi dikhta", text: "Aapka IP aur server ka IP, domain name (DNS aur SNI se), kitna data aur kab." },
        { icon: "🛡️", name: "Extra privacy", text: "DNS-over-HTTPS DNS lookup chhupata hai; jahan support ho Encrypted Client Hello (ECH) SNI chhupata hai; VPN local network se destination chhupata hai." },
      ],
    },
  },
  {
    id: "errors",
    phase: "9 · Errors you'll meet",
    scene: "cards",
    lock: "open",
    en: {
      title: "Certificate errors every developer meets",
      summary: "Each red warning page maps to one failed check.",
      detail: "Never teach users to click “proceed anyway” – fix the cause:",
      cards: [
        { icon: "📅", name: "NET::ERR_CERT_DATE_INVALID", text: "Certificate expired (or your computer's clock is wrong). Renew it – automate with Let's Encrypt/certbot." },
        { icon: "🏷️", name: "ERR_CERT_COMMON_NAME_INVALID", text: "Certificate is for a different name (e.g. www vs no-www). Include every hostname." },
        { icon: "🏛️", name: "ERR_CERT_AUTHORITY_INVALID", text: "Self-signed or unknown CA – normal for localhost dev certs, wrong in production." },
        { icon: "🧩", name: "Mixed content", text: "An HTTPS page loading http:// scripts or images. Browsers block or warn. Use https:// everywhere." },
      ],
      remember: "Red warning = a failed identity check. Treat it as a real attack until proven otherwise.",
    },
    hi: {
      title: "Certificate errors jo har developer ko milte hain",
      summary: "Har laal warning page ek fail hue check se juda hai.",
      detail: "Users ko kabhi “proceed anyway” click karna mat sikhao – wajah theek karo:",
      cards: [
        { icon: "📅", name: "NET::ERR_CERT_DATE_INVALID", text: "Certificate expire ho gaya (ya computer ki ghadi galat hai). Renew karo – Let's Encrypt/certbot se automate." },
        { icon: "🏷️", name: "ERR_CERT_COMMON_NAME_INVALID", text: "Certificate kisi aur naam ka hai (jaise www vs bina www). Har hostname include karo." },
        { icon: "🏛️", name: "ERR_CERT_AUTHORITY_INVALID", text: "Self-signed ya anjaan CA – localhost dev certs ke liye normal, production mein galat." },
        { icon: "🧩", name: "Mixed content", text: "HTTPS page jo http:// scripts ya images load kare. Browser block ya warn karta hai. Har jagah https:// use karo." },
      ],
      remember: "Laal warning = identity check fail. Jab tak ulta saabit na ho, use asli attack samjho.",
    },
  },
  {
    id: "see-it",
    phase: "10 · See it",
    scene: "diagram",
    lock: "locked",
    sharedKey: true,
    certChecks: true,
    spy: { lines: GIBBERISH, readable: false },
    terminal: [
      "$ curl -v https://example.com 2>&1 | grep -E 'SSL|TLS|subject|issuer|expire'",
      "* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384",
      "*  subject: CN=example.com",
      "*  expire date: <date>",
      "*  issuer: <CA name>",
      "",
      "$ openssl s_client -connect example.com:443 -servername example.com",
      "# Browser: click the padlock → Connection is secure → Certificate",
    ],
    en: {
      title: "Inspect a real TLS connection",
      summary: "Click the padlock, or use curl -v / openssl s_client to see the TLS version, cipher and certificate chain.",
      detail:
        "In Chrome, click the icon left of the address → Connection is secure → Certificate is valid. You'll see who it was issued to, by which CA, and the expiry date. In DevTools → Security tab you'll see the protocol (TLS 1.3) and cipher. For local development, tools like mkcert create a locally-trusted certificate so you can test https://localhost.",
      remember: "HTTPS = TCP + TLS handshake (key exchange + certificate) + encrypted HTTP.",
    },
    hi: {
      title: "Asli TLS connection inspect karo",
      summary: "Padlock click karo, ya curl -v / openssl s_client se TLS version, cipher aur certificate chain dekho.",
      detail:
        "Chrome mein address ke left wale icon par click → Connection is secure → Certificate is valid. Dikhega kisko issue hua, kis CA ne, aur expiry date. DevTools → Security tab mein protocol (TLS 1.3) aur cipher dikhega. Local development ke liye mkcert jaise tools locally-trusted certificate banate hain taaki https://localhost test kar sako.",
      remember: "HTTPS = TCP + TLS handshake (key exchange + certificate) + encrypted HTTP.",
    },
  },
];
