export type GatewayLanguage = "en" | "hi";

export interface GatewayStep {
  title: string;
  definition: string;
  explanation: string;
  example: string;
  takeaway: string;
}

export const DEFAULT_GATEWAY_DATA: Record<
  GatewayLanguage,
  {
    title: string;
    subtitle: string;
    steps: GatewayStep[];
    diagram: {
      laptop: string;
      router: string;
      destination: string;
      sameNetwork: string;
      outsideNetwork: string;
    };
  }
> = {
  en: {
    title: "What is a Default Gateway?",
    subtitle:
      "Understand how your device sends data to devices outside its own network.",
    diagram: {
      laptop: "Laptop",
      router: "Router\n(Default Gateway)",
      destination: "Outside Network",
      sameNetwork: "Same Network",
      outsideNetwork: "Different Network",
    },
    steps: [
      {
        title: "What is a Default Gateway?",
        definition:
          "A default gateway is the device your computer uses to send data when the destination is outside its own network.",
        explanation:
          "Think of it like the exit door of your local network. When your laptop wants to communicate with a device outside your network, it sends the data to the default gateway. In a typical home network, this is your router.",
        example:
          "Your laptop is connected to your home Wi-Fi. You want to open a website on the internet. Your laptop sends the data to your router, which acts as the default gateway.",
        takeaway:
          "Default Gateway = The way out of your local network.",
      },
      {
        title: "When Devices Are in the Same Network",
        definition:
          "Devices in the same local network can communicate directly without sending their traffic through the default gateway.",
        explanation:
          "Your laptop checks whether the destination IP address belongs to its own network. If it does, the laptop can send data directly to the destination device using its local network connection.",
        example:
          "Your laptop has IP 192.168.1.10 and your phone has IP 192.168.1.20. If both belong to the same subnet, your laptop can send data directly to your phone.",
        takeaway:
          "Same network → Send data directly to the destination.",
      },
      {
        title: "When the Destination Is Outside Your Network",
        definition:
          "If the destination is outside your local network, your device sends the data to its default gateway.",
        explanation:
          "Your laptop uses its IP address and subnet mask to determine whether the destination is local. If the destination is outside its network, the laptop sends the data to the router instead of trying to reach the destination directly.",
        example:
          "Your laptop is connected to your home Wi-Fi and wants to access a server on the internet. Since that server is outside your home network, your laptop sends the data to the router.",
        takeaway:
          "Different network → Send data to the default gateway.",
      },
      {
        title: "What Does the Router Do?",
        definition:
          "The router forwards data toward the destination network using its routing information.",
        explanation:
          "The router receives the data from your laptop and checks where it needs to go. It may forward the data to another router or another network until it reaches the destination.",
        example:
          "Your laptop sends a request to a website. Your home router forwards it toward your internet service provider, and the data travels through other networks toward the website's server.",
        takeaway:
          "The default gateway receives your data and helps it reach another network.",
      },
      {
        title: "How Does Your Laptop Know the Gateway?",
        definition:
          "Your device learns the default gateway address through its network configuration.",
        explanation:
          "When your laptop connects to a network, the gateway address is usually provided automatically through DHCP. It can also be configured manually. Your laptop uses this address when it needs to send traffic outside its local network.",
        example:
          "Your laptop may have IP 192.168.1.10 and default gateway 192.168.1.1. When it wants to reach a website outside its network, it sends the data to 192.168.1.1.",
        takeaway:
          "Your device already knows which gateway to use when it joins the network.",
      },
      {
        title: "Complete Data Flow",
        definition:
          "Your device sends local traffic directly to local devices and sends outside traffic to the default gateway.",
        explanation:
          "First, your laptop checks whether the destination is in its own network. If it is, it sends the data directly. If it is not, it sends the data to the default gateway. The router then forwards the data toward the destination.",
        example:
          "Laptop → Router → Internet → Website Server. When the server responds, the response travels back through the network toward your laptop.",
        takeaway:
          "Local destination → Direct communication. Outside destination → Default Gateway.",
      },
    ],
  },

  hi: {
    title: "Default Gateway kya hota hai?",
    subtitle:
      "Samjho ki tumhara device apne network ke bahar data kaise bhejta hai.",
    diagram: {
      laptop: "Laptop",
      router: "Router\n(Default Gateway)",
      destination: "Bahar ka Network",
      sameNetwork: "Same Network",
      outsideNetwork: "Different Network",
    },
    steps: [
      {
        title: "Default Gateway kya hota hai?",
        definition:
          "Default Gateway woh device hota hai jiske through tumhara computer apne network ke bahar data bhejta hai.",
        explanation:
          "Isko apne local network ka exit gate samjho. Jab laptop ko kisi aise device se baat karni hoti hai jo uske network mein nahi hai, toh laptop data default gateway ko bhejta hai. Ghar ke network mein aam taur par router hi default gateway hota hai.",
        example:
          "Tumhara laptop ghar ke Wi-Fi se connected hai. Tum internet par koi website open karte ho. Laptop data router ko bhejta hai, jo default gateway ka kaam karta hai.",
        takeaway:
          "Default Gateway = Apne local network se bahar jaane ka raasta.",
      },
      {
        title: "Jab Devices Same Network Mein Hote Hain",
        definition:
          "Same local network mein connected devices bina default gateway ke through jaaye directly communicate kar sakte hain.",
        explanation:
          "Laptop pehle check karta hai ki destination IP uske apne network mein hai ya nahi. Agar destination same network mein hai, toh laptop local network ke through directly us device ko data bhej sakta hai.",
        example:
          "Laptop ka IP 192.168.1.10 hai aur mobile ka IP 192.168.1.20 hai. Agar dono same subnet mein hain, toh laptop mobile ko directly data bhej sakta hai.",
        takeaway:
          "Same network → Data directly destination device ko bhejo.",
      },
      {
        title: "Jab Destination Dusre Network Mein Ho",
        definition:
          "Agar destination tumhare local network ke bahar hai, toh device data default gateway ko bhejta hai.",
        explanation:
          "Laptop apne IP address aur subnet mask ki help se check karta hai ki destination local hai ya nahi. Agar destination dusre network mein hai, toh laptop data router ko bhejta hai, na ki destination tak directly pahunchne ki koshish karta hai.",
        example:
          "Tumhara laptop ghar ke Wi-Fi se connected hai aur internet par kisi server ko access karna chahta hai. Server ghar ke network se bahar hai, isliye laptop data router ko bhejta hai.",
        takeaway:
          "Different network → Data default gateway ko bhejo.",
      },
      {
        title: "Router Kya Karta Hai?",
        definition:
          "Router apni routing information ki help se data ko destination network ki taraf forward karta hai.",
        explanation:
          "Router laptop se data receive karta hai aur check karta hai ki data ko kis taraf bhejna hai. Woh data ko kisi doosre router ya network ko forward kar sakta hai, jab tak data destination tak na pahunch jaaye.",
        example:
          "Laptop website ko request bhejta hai. Ghar ka router request ko internet service provider ki taraf forward karta hai. Phir data doosre networks se hote hue website ke server tak pahunchta hai.",
        takeaway:
          "Default gateway data receive karta hai aur use doosre network tak pahunchane mein help karta hai.",
      },
      {
        title: "Laptop Ko Gateway Kaise Pata Chalta Hai?",
        definition:
          "Tumhara device network configuration se default gateway ka IP address jaanta hai.",
        explanation:
          "Jab laptop network se connect hota hai, toh aam taur par DHCP gateway ka address automatically provide karta hai. Gateway manually bhi set kiya ja sakta hai. Jab laptop ko local network ke bahar data bhejna hota hai, toh woh isi address ka use karta hai.",
        example:
          "Laptop ka IP 192.168.1.10 aur default gateway 192.168.1.1 ho sakta hai. Jab laptop ko kisi website tak pahunchna hota hai, toh woh data 192.168.1.1 ko bhejta hai.",
        takeaway:
          "Network se connect hote hi tumhara device gateway ka address jaan leta hai.",
      },
      {
        title: "Data Ka Complete Flow",
        definition:
          "Local traffic directly local devices ko jaata hai aur outside traffic default gateway ko bheja jaata hai.",
        explanation:
          "Sabse pehle laptop check karta hai ki destination uske apne network mein hai ya nahi. Agar hai, toh directly data bhejta hai. Agar nahi hai, toh default gateway ko bhejta hai. Router data ko destination ki taraf forward karta hai.",
        example:
          "Laptop → Router → Internet → Website Server. Jab server response bhejta hai, toh response network ke through wapas laptop tak aata hai.",
        takeaway:
          "Local destination → Direct communication. Outside destination → Default Gateway.",
      },
    ],
  },
};