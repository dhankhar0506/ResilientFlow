export type Layer = {
  n: number;
  name: string;
  pdu: string;
  color: string;
  protocols: string[];
  devices: string;
  job: string;
  example: string;
  header: string | null; // header added during encapsulation
  encap: string;
  decap: string;
};

// Ordered 7 -> 1
export const OSI: Layer[] = [
  {
    n: 7, name: "Application", pdu: "Data", color: "#8b5cf6",
    protocols: ["HTTP", "HTTPS", "DNS", "SMTP", "FTP", "SSH"],
    devices: "End hosts, proxies, application gateways",
    job: "The layer your software talks to. It defines the language apps use to request and deliver data.",
    example: "Your browser builds an HTTP GET request for a web page.",
    header: "HTTP",
    encap: "The app creates the message and wraps it in an application protocol header (e.g. HTTP).",
    decap: "The app reads the HTTP header and finally hands the message to the user. Delivered!",
  },
  {
    n: 6, name: "Presentation", pdu: "Data", color: "#6366f1",
    protocols: ["TLS/SSL", "JPEG", "MPEG", "ASCII/UTF-8"],
    devices: "End hosts",
    job: "Translates, compresses and encrypts data so both sides understand each other.",
    example: "TLS encrypts the HTTP request so nobody on the path can read it.",
    header: "TLS",
    encap: "Data is encoded, compressed and encrypted (TLS record header added).",
    decap: "Data is decrypted and decoded back into a format the application understands.",
  },
  {
    n: 5, name: "Session", pdu: "Data", color: "#3b82f6",
    protocols: ["NetBIOS", "RPC", "PPTP", "Sockets API"],
    devices: "End hosts",
    job: "Opens, manages and closes conversations (sessions) between two applications.",
    example: "Keeping your login session alive while you browse a site.",
    header: "SES",
    encap: "A session header identifies which conversation this data belongs to.",
    decap: "The session is matched to the right conversation and checkpoints are handled.",
  },
  {
    n: 4, name: "Transport", pdu: "Segment (TCP) / Datagram (UDP)", color: "#3454d1",
    protocols: ["TCP", "UDP", "QUIC"],
    devices: "End hosts, firewalls (port filtering), load balancers (L4)",
    job: "End-to-end delivery. Adds port numbers, and TCP adds ordering, reliability and flow control.",
    example: "TCP splits the data into segments, numbers them, and retransmits lost ones. Port 443 = HTTPS.",
    header: "TCP",
    encap: "Data is split into segments. A TCP header adds source/destination ports, sequence numbers and checksum.",
    decap: "Segments are checked, re-ordered and reassembled. The port number picks the right application.",
  },
  {
    n: 3, name: "Network", pdu: "Packet", color: "#14b8a6",
    protocols: ["IPv4", "IPv6", "ICMP", "OSPF", "BGP"],
    devices: "Routers, L3 switches",
    job: "Logical addressing and routing: finds a path across many networks to the destination IP.",
    example: "Routers read the destination IP and forward the packet hop by hop.",
    header: "IP",
    encap: "An IP header adds source and destination IP addresses (and TTL). Now it's a packet.",
    decap: "The destination IP is confirmed as ours, the IP header is removed, and the segment goes up.",
  },
  {
    n: 2, name: "Data Link", pdu: "Frame", color: "#f59e0b",
    protocols: ["Ethernet", "Wi-Fi (802.11)", "ARP", "PPP"],
    devices: "Switches, bridges, NICs",
    job: "Delivers frames between two devices on the SAME local network using MAC addresses.",
    example: "Your laptop sends the frame to the Wi-Fi router's MAC address (found using ARP).",
    header: "ETH",
    encap: "An Ethernet header (source/destination MAC) and a trailer (FCS checksum) are added. Now it's a frame.",
    decap: "The MAC address is matched, the FCS is verified to detect corruption, then header/trailer are removed.",
  },
  {
    n: 1, name: "Physical", pdu: "Bits", color: "#ef4444",
    protocols: ["Ethernet cable", "Fibre", "Radio (Wi-Fi/5G)", "USB"],
    devices: "Cables, hubs, repeaters, NIC transceivers",
    job: "Moves raw bits as electrical, light or radio signals over the medium.",
    example: "1s and 0s become voltage changes on copper or pulses of light in fibre.",
    header: null,
    encap: "The frame is converted into bits and sent out as electrical / light / radio signals.",
    decap: "The signal is received and converted back into bits, then into a frame.",
  },
];

export const tcpipGroup = (n: number) =>
  n >= 5 ? "Application" : n === 4 ? "Transport" : n === 3 ? "Internet" : "Network Access";
