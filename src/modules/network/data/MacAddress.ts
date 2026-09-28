// import type { Lang } from "../../../i18n";

// export const MAC_LABELS: Record<
//     Lang,
//     {
//         lessonTitle: string;
//         heroTitle: string;
//         heroSubtitle: string;
//         available: string;
//         stepLabel: string;
//         of: string;
//         previous: string;
//         next: string;
//         restart: string;
//         keyPoint: string;
//         example: string;
//         bytes: string;
//         bits: string;
//         organization: string;
//         device: string;
//         networkInterface: string;
//         recap: string;
//     }
// > = {
//     en: {
//         lessonTitle: "NETWORKING FUNDAMENTALS",
//         heroTitle: "MAC Address Basics",
//         heroSubtitle:
//             "Understand what a MAC address is, how it is structured, and how it identifies a network interface.",
//         available: "Available",
//         stepLabel: "Step",
//         of: "of",
//         previous: "Previous",
//         next: "Next",
//         restart: "Restart",
//         keyPoint: "Key Point",
//         example: "Example",
//         bytes: "Bytes",
//         bits: "Bits",
//         organization: "Organization",
//         device: "Device Identifier",
//         networkInterface: "Network Interface",
//         recap: "What You Learned",
//     },
//     hi: {
//         lessonTitle: "NETWORKING FUNDAMENTALS",
//         heroTitle: "MAC Address Basics",
//         heroSubtitle:
//             "Understand what a MAC address is, how it is structured, and how it identifies a network interface.",
//         available: "Available",
//         stepLabel: "Step",
//         of: "of",
//         previous: "Previous",
//         next: "Next",
//         restart: "Restart",
//         keyPoint: "Key Point",
//         example: "Example",
//         bytes: "Bytes",
//         bits: "Bits",
//         organization: "Organization",
//         device: " Device Identifier",
//         networkInterface: "Network Interface",
//         recap: "What You Learned",
//     },
// };

// export const MAC_STEPS = [
//     {
//         phase: "Introduction",
//         icon: "🌐",
//         example: "MAC Address",
//         en: {
//             title: "What is a MAC Address?",
//             detail:
//                 "MAC stands for Media Access Control. A MAC address is used to identify a network interface on a local network. It is associated with a network interface such as Ethernet or Wi-Fi.",
//             keyPoint:
//                 "A MAC address identifies a network interface at the data link layer.",
//         },
//         hi: {
//             title: "MAC Address क्या होता है?",
//             detail:
//                 "MAC का पूरा नाम Media Access Control है। MAC Address का उपयोग लोकल नेटवर्क में नेटवर्क इंटरफेस की पहचान करने के लिए किया जाता है। यह Ethernet या Wi-Fi जैसे नेटवर्क इंटरफेस से जुड़ा होता है।",
//             keyPoint:
//                 "MAC Address डेटा लिंक लेयर पर नेटवर्क इंटरफेस की पहचान करता है।",
//         },
//     },
//     {
//         phase: "Network Interfaces",
//         icon: "🔌",
//         example: "NIC · Ethernet · Wi-Fi · Bluetooth",
//         en: {
//             title: "Understanding Network Interfaces",
//             detail:
//                 "A network interface is the connection through which a device communicates over a network. Examples include a Network Interface Card (NIC), an Ethernet interface, a Wi-Fi adapter, and a Bluetooth interface.",
//             keyPoint:
//                 "A device can have multiple network interfaces, and each interface can have its own MAC address.",
//         },
//         hi: {
//             title: "Network Interface को समझें",
//             detail:
//                 "नेटवर्क इंटरफेस वह माध्यम है जिसके जरिए कोई डिवाइस नेटवर्क पर कम्युनिकेशन करता है। उदाहरण हैं NIC, Ethernet इंटरफेस, Wi-Fi अडैप्टर और Bluetooth इंटरफेस।",
//             keyPoint:
//                 "एक डिवाइस में कई नेटवर्क इंटरफेस हो सकते हैं और हर इंटरफेस का अपना MAC Address हो सकता है।",
//         },
//     },
//     {
//         phase: "Purpose",
//         icon: "🔍",
//         example: "IP Address vs MAC Address",
//         en: {
//             title: "Why Do We Need a MAC Address?",
//             detail:
//                 "An IP address can change when a device joins a different network or receives a new address through DHCP. A MAC address is associated with the network interface and is used for local network communication.",
//             keyPoint:
//                 "IP addresses support logical addressing and routing. MAC addresses are used to deliver frames across a local network link.",
//         },
//         hi: {
//             title: "MAC Address की जरूरत क्यों है?",
//             detail:
//                 "जब कोई डिवाइस किसी दूसरे नेटवर्क से जुड़ता है या DHCP से नया IP Address प्राप्त करता है, तो उसका IP बदल सकता है। MAC Address नेटवर्क इंटरफेस से जुड़ा होता है और लोकल नेटवर्क कम्युनिकेशन में उपयोग होता है।",
//             keyPoint:
//                 "IP Address लॉजिकल एड्रेसिंग और रूटिंग के लिए होता है। MAC Address लोकल नेटवर्क लिंक पर फ्रेम डिलीवर करने में उपयोग होता है।",
//         },
//     },
//     {
//         phase: "Structure",
//         icon: "🧩",
//         example: "FA:34:F3:AF:09:00",
//         en: {
//             title: "Structure of a MAC Address",
//             detail:
//                 "A standard MAC address is 48 bits long, which equals 6 bytes. Each byte is represented by two hexadecimal digits. The bytes are commonly separated by colons or hyphens.",
//             keyPoint:
//                 "6 bytes × 8 bits = 48 bits. Example: FA:34:F3:AF:09:00",
//         },
//         hi: {
//             title: "MAC Address की संरचना",
//             detail:
//                 "एक सामान्य MAC Address 48 बिट का होता है, यानी 6 बाइट। हर बाइट को दो hexadecimal अंकों से दिखाया जाता है। बाइट्स को आमतौर पर कोलन या हाइफन से अलग किया जाता है।",
//             keyPoint:
//                 "6 बाइट × 8 बिट = 48 बिट। उदाहरण: FA:34:F3:AF:09:00",
//         },
//     },
//     {
//         phase: "Hexadecimal",
//         icon: "🔢",
//         example: "0 1 2 3 4 5 6 7 8 9 A B C D E F",
//         en: {
//             title: "Hexadecimal Numbers",
//             detail:
//                 "Hexadecimal is a base-16 number system. It uses digits 0–9 and letters A–F. Each hexadecimal digit represents 4 bits, so two hexadecimal digits represent one byte (8 bits).",
//             keyPoint:
//                 "FA represents one byte: F = 1111 and A = 1010, giving 11111010 in binary.",
//         },
//         hi: {
//             title: "Hexadecimal Numbers",
//             detail:
//                 "Hexadecimal एक base-16 नंबर सिस्टम है। इसमें 0–9 अंक और A–F अक्षर होते हैं। हर hexadecimal अंक 4 बिट दर्शाता है, इसलिए दो hexadecimal अंक मिलकर एक बाइट यानी 8 बिट बनाते हैं।",
//             keyPoint:
//                 "FA एक बाइट को दर्शाता है: F = 1111 और A = 1010, इसलिए बाइनरी में 11111010।",
//         },
//     },
//     {
//         phase: "OUI",
//         icon: "🏭",
//         example: "FA:34:F3 | AF:09:00",
//         en: {
//             title: "OUI: Organization Identifier",
//             detail:
//                 "A traditional 48-bit MAC address is divided into two parts. The first 3 bytes (24 bits) are commonly used as the Organizationally Unique Identifier (OUI), which identifies the organization associated with the address block.",
//             keyPoint:
//                 "The first 24 bits identify the assigned organization or address block, not necessarily the physical manufacturer of every device.",
//         },
//         hi: {
//             title: "OUI: Organization Identifier",
//             detail:
//                 "एक सामान्य 48-बिट MAC Address को दो भागों में बांटा जा सकता है। पहले 3 बाइट (24 बिट) को आमतौर पर OUI कहा जाता है, जो उस एड्रेस ब्लॉक से जुड़ी संस्था की पहचान करता है।",
//             keyPoint:
//                 "पहले 24 बिट आवंटित संस्था या एड्रेस ब्लॉक की पहचान करते हैं। यह जरूरी नहीं कि हर डिवाइस के वास्तविक निर्माता की पहचान हो।",
//         },
//     },
//     {
//         phase: "Device Identifier",
//         icon: "💻",
//         example: "FA:34:F3 | AF:09:00",
//         en: {
//             title: "The Remaining 3 Bytes",
//             detail:
//                 "In the traditional MAC address structure described in this lesson, the remaining 3 bytes (24 bits) distinguish an interface within the assigned address block. Together, the two parts form a 48-bit address.",
//             keyPoint:
//                 "First 3 bytes: organization identifier. Last 3 bytes: interface-specific portion of the address block.",
//         },
//         hi: {
//             title: "बाकी के 3 बाइट",
//             detail:
//                 "इस पाठ में बताई गई सामान्य MAC Address संरचना में बाकी के 3 बाइट (24 बिट) आवंटित एड्रेस ब्लॉक के अंदर इंटरफेस को अलग पहचान देने के लिए उपयोग होते हैं। दोनों भाग मिलकर 48-बिट एड्रेस बनाते हैं।",
//             keyPoint:
//                 "पहले 3 बाइट: संस्था का पहचान भाग। आखिरी 3 बाइट: एड्रेस ब्लॉक में इंटरफेस की पहचान वाला भाग।",
//         },
//     },
//     {
//         phase: "Recap",
//         icon: "✅",
//         example: "48 bits = 6 bytes",
//         en: {
//             title: "What You Learned",
//             detail:
//                 "A MAC address is a 48-bit address commonly written as six pairs of hexadecimal digits. It is associated with a network interface and is used for communication on a local network. Its traditional structure includes an organization identifier and an interface-specific portion.",
//             keyPoint:
//                 "MAC addresses are used on local network links. IP addresses provide logical addressing and help route traffic between networks.",
//         },
//         hi: {
//             title: "आपने क्या सीखा",
//             detail:
//                 "MAC Address एक 48-बिट एड्रेस है जिसे आमतौर पर छह hexadecimal जोड़ों में लिखा जाता है। यह नेटवर्क इंटरफेस से जुड़ा होता है और लोकल नेटवर्क पर कम्युनिकेशन में उपयोग होता है। इसकी पारंपरिक संरचना में संस्था का पहचान भाग और इंटरफेस का पहचान भाग होता है।",
//             keyPoint:
//                 "MAC Address लोकल नेटवर्क लिंक पर उपयोग होता है। IP Address लॉजिकल एड्रेसिंग और अलग-अलग नेटवर्क के बीच ट्रैफिक रूट करने में मदद करता है।",
//         },
//     },
// ] as const;
import type { Lang } from "../../../i18n";

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
    }
> = {
    en: {
        lessonTitle: "NETWORKING FUNDAMENTALS",
        heroTitle: "MAC Address Basics",
        heroSubtitle:
            "Understand what a MAC address is, how it is structured, and how it identifies a network interface.",
        available: "Available",
        stepLabel: "Step",
        of: "of",
        previous: "Previous",
        next: "Next",
        restart: "Restart",
        keyPoint: "Key Point",
        example: "Example",
        bytes: "Bytes",
        bits: "Bits",
        organization: "Organization",
        device: "Device Identifier",
        networkInterface: "Network Interface",
        recap: "What You Learned",
    },
    hi: {
        lessonTitle: "नेटवर्किंग की मूल बातें",
        heroTitle: "MAC Address की मूल बातें",
        heroSubtitle:
            "जानें MAC Address क्या है, इसकी संरचना कैसी होती है और यह नेटवर्क इंटरफेस की पहचान कैसे करता है।",
        available: "उपलब्ध",
        stepLabel: "स्टेप",
        of: "में से",
        previous: "पिछला",
        next: "अगला",
        restart: "दोबारा शुरू करें",
        keyPoint: "मुख्य बात",
        example: "उदाहरण",
        bytes: "बाइट्स",
        bits: "बिट्स",
        organization: "संस्था",
        device: "डिवाइस पहचान",
        networkInterface: "नेटवर्क इंटरफेस",
        recap: "आपने क्या सीखा",
    },
};

export const MAC_STEPS = [
    // 1. Introduction
    {
        phase: "Introduction",
        icon: "🌐",
        example: "MAC Address",
        en: {
            title: "What is a MAC Address?",
            detail:
                "MAC stands for Media Access Control. A MAC address is used to identify a network interface on a local network. It is associated with a network interface such as Ethernet or Wi-Fi. MAC addresses are used at the Data Link Layer (Layer 2) for communication over a local network link.",
            keyPoint:
                "A MAC address identifies a network interface at the Data Link Layer and is used for local network communication.",
        },
        hi: {
            title: "MAC Address क्या होता है?",
            detail:
                "MAC का पूरा नाम Media Access Control है। MAC Address का उपयोग लोकल नेटवर्क में नेटवर्क इंटरफेस की पहचान करने के लिए किया जाता है। यह Ethernet या Wi-Fi जैसे नेटवर्क इंटरफेस से जुड़ा होता है। MAC Address का उपयोग Data Link Layer यानी Layer 2 पर लोकल नेटवर्क कम्युनिकेशन के लिए किया जाता है।",
            keyPoint:
                "MAC Address Data Link Layer पर नेटवर्क इंटरफेस की पहचान करता है और लोकल नेटवर्क कम्युनिकेशन में उपयोग होता है।",
        },
    },

    // 2. Network Interface
    {
        phase: "Network Interfaces",
        icon: "🔌",
        example: "Wi-Fi · Ethernet · Bluetooth",
        en: {
            title: "What is a Network Interface?",
            detail:
                "A Network Interface is a physical or virtual connection point that allows a device to send and receive data over a network. It acts as a communication point between the device and the network. For example, a laptop can connect to a network using Wi-Fi, an Ethernet cable, or a virtual network adapter. Bluetooth can also support networking between compatible devices.",
            keyPoint:
                "A Network Interface allows a device to communicate over a network. A device can have multiple network interfaces, each with its own configuration.",
        },
        hi: {
            title: "Network Interface क्या होता है?",
            detail:
                "Network Interface एक physical या virtual connection point होता है, जो किसी डिवाइस को नेटवर्क पर डेटा भेजने और प्राप्त करने की सुविधा देता है। यह डिवाइस और नेटवर्क के बीच कम्युनिकेशन का माध्यम होता है। उदाहरण के लिए, लैपटॉप Wi-Fi, Ethernet केबल या virtual network adapter के जरिए नेटवर्क से जुड़ सकता है। Bluetooth भी compatible डिवाइस के बीच networking को सपोर्ट कर सकता है।",
            keyPoint:
                "Network Interface डिवाइस को नेटवर्क पर कम्युनिकेशन करने की सुविधा देता है। एक डिवाइस में कई नेटवर्क इंटरफेस हो सकते हैं और हर इंटरफेस की अपनी configuration हो सकती है।",
        },
    },

    // 3. Types of Network Interfaces
    {
        phase: "Interface Types",
        icon: "📡",
        example: "Wi-Fi · Ethernet · Bluetooth · Virtual",
        en: {
            title: "Types of Network Interfaces",
            detail:
                "A device can use different types of network interfaces. A Wi-Fi interface connects wirelessly to a wireless access point or router. An Ethernet interface connects through a network cable. A Bluetooth interface can support short-range networking with compatible devices. A virtual network interface is created by software and may be used by VPNs, virtual machines, or containers.",
            keyPoint:
                "Wi-Fi and Ethernet are common network interfaces. Virtual interfaces are software-created, while physical interfaces use hardware to connect to a network.",
        },
        hi: {
            title: "Network Interface के प्रकार",
            detail:
                "एक डिवाइस अलग-अलग प्रकार के नेटवर्क इंटरफेस का उपयोग कर सकता है। Wi-Fi इंटरफेस वायरलेस तरीके से access point या router से जुड़ता है। Ethernet इंटरफेस नेटवर्क केबल के जरिए कनेक्ट होता है। Bluetooth इंटरफेस compatible डिवाइस के साथ कम दूरी पर networking में मदद कर सकता है। Virtual network interface सॉफ्टवेयर द्वारा बनाया जाता है और VPN, virtual machine या container में उपयोग हो सकता है।",
            keyPoint:
                "Wi-Fi और Ethernet सामान्य नेटवर्क इंटरफेस हैं। Virtual interfaces सॉफ्टवेयर द्वारा बनाए जाते हैं, जबकि physical interfaces हार्डवेयर के जरिए नेटवर्क से जुड़ते हैं।",
        },
    },

    // 4. Interface Properties
    {
        phase: "Interface Properties",
        icon: "⚙️",
        example: "MAC · IP · Subnet Mask · Gateway · DNS",
        en: {
            title: "What Information Does a Network Interface Have?",
            detail:
                "A network interface can have several network-related properties. These may include a MAC address, an IP address, a subnet mask or prefix length, a default gateway, and DNS server settings. The MAC address is used for local link communication. The IP address provides logical addressing. The subnet mask identifies the network portion of an IPv4 address. The default gateway is used to reach destinations outside the local network, and DNS helps resolve domain names into IP addresses.",
            keyPoint:
                "A network interface may have a MAC address, IP address, subnet configuration, gateway, and DNS settings. These values depend on the network and interface configuration.",
        },
        hi: {
            title: "Network Interface में कौन-कौन सी Information होती है?",
            detail:
                "एक नेटवर्क इंटरफेस के साथ नेटवर्क से जुड़ी कई जानकारियाँ हो सकती हैं। इनमें MAC Address, IP Address, Subnet Mask या Prefix Length, Default Gateway और DNS Server की सेटिंग्स शामिल हो सकती हैं। MAC Address का उपयोग लोकल लिंक पर कम्युनिकेशन के लिए होता है। IP Address लॉजिकल एड्रेसिंग देता है। Subnet Mask IPv4 Address के नेटवर्क वाले हिस्से की पहचान करता है। Default Gateway लोकल नेटवर्क के बाहर डेटा भेजने में मदद करता है और DNS डोमेन नेम को IP Address में बदलने में मदद करता है।",
            keyPoint:
                "Network Interface के साथ MAC Address, IP Address, Subnet Configuration, Gateway और DNS की जानकारी हो सकती है। ये वैल्यू नेटवर्क और इंटरफेस की configuration पर निर्भर करती हैं।",
        },
    },

    // 5. Interface Configuration Example
    {
        phase: "Interface Example",
        icon: "💻",
        example: "192.168.1.2 · 255.255.255.0",
        en: {
            title: "Example: Wi-Fi Interface Configuration",
            detail:
                "Imagine your laptop is connected to a router through Wi-Fi. Its Wi-Fi interface has a MAC address AA:BB:CC:11:22:33 and an IP address 192.168.1.2. The subnet mask is 255.255.255.0, and the default gateway is 192.168.1.1. In this example, the gateway is the router's local IP address. These settings allow the laptop to communicate with devices on the local network and send traffic to other networks through the router. The DNS server may also be configured separately.",
            keyPoint:
                "Example: MAC = AA:BB:CC:11:22:33, IP = 192.168.1.2, Subnet Mask = 255.255.255.0, Gateway = 192.168.1.1.",
        },
        hi: {
            title: "उदाहरण: Wi-Fi Interface Configuration",
            detail:
                "मान लो तुम्हारा लैपटॉप Wi-Fi के जरिए router से कनेक्ट है। उसके Wi-Fi इंटरफेस का MAC Address AA:BB:CC:11:22:33 और IP Address 192.168.1.2 है। Subnet Mask 255.255.255.0 है और Default Gateway 192.168.1.1 है। इस उदाहरण में Gateway router का लोकल IP Address है। ये सेटिंग्स लैपटॉप को लोकल नेटवर्क के डिवाइस से कम्युनिकेशन करने और router के जरिए दूसरे नेटवर्क तक डेटा भेजने में मदद करती हैं। DNS Server अलग से configure किया जा सकता है।",
            keyPoint:
                "उदाहरण: MAC = AA:BB:CC:11:22:33, IP = 192.168.1.2, Subnet Mask = 255.255.255.0, Gateway = 192.168.1.1।",
        },
    },

    // 6. Network Interface Card
    {
        phase: "NIC",
        icon: "🖥️",
        example: "NIC = Network Interface Card",
        en: {
            title: "What is a Network Interface Card (NIC)?",
            detail:
                "NIC stands for Network Interface Card. It is a hardware component that provides network connectivity to a device. A NIC can be integrated into the motherboard or added as a separate card or adapter. Examples include a laptop's Wi-Fi adapter, a desktop's Ethernet card, and a USB-to-Ethernet adapter. The NIC provides or supports the hardware functionality needed to transmit and receive network data.",
            keyPoint:
                "A NIC is a hardware component that provides network connectivity. A network interface is the communication interface through which the device uses that connectivity.",
        },
        hi: {
            title: "Network Interface Card (NIC) क्या होता है?",
            detail:
                "NIC का पूरा नाम Network Interface Card है। यह एक हार्डवेयर कंपोनेंट होता है जो डिवाइस को नेटवर्क से कनेक्ट होने की सुविधा देता है। NIC मदरबोर्ड में पहले से लगा हो सकता है या अलग कार्ड या अडैप्टर के रूप में लगाया जा सकता है। उदाहरण के लिए, लैपटॉप का Wi-Fi अडैप्टर, डेस्कटॉप का Ethernet कार्ड और USB-to-Ethernet अडैप्टर। NIC नेटवर्क डेटा भेजने और प्राप्त करने के लिए जरूरी हार्डवेयर की सुविधा देता है।",
            keyPoint:
                "NIC नेटवर्क कनेक्टिविटी देने वाला हार्डवेयर कंपोनेंट है। Network Interface वह कम्युनिकेशन इंटरफेस है जिसके जरिए डिवाइस नेटवर्क का उपयोग करता है।",
        },
    },

    // 7. NIC and MAC Address
    {
        phase: "NIC and MAC",
        icon: "🏷️",
        example: "MAC Address · Data Link Layer · Layer 2",
        en: {
            title: "How is a NIC Related to a MAC Address?",
            detail:
                "A network interface commonly has a MAC address associated with it. The MAC address is used for communication at the Data Link Layer (Layer 2) on Ethernet and Wi-Fi networks. When a device sends data over a local network, the interface transmits link-layer frames containing source and destination MAC addresses. A device with multiple network interfaces can have different MAC addresses for each interface. MAC addresses can also be changed or randomized by software in some cases.",
            keyPoint:
                "A MAC address is used for Layer 2 communication on a local network link. Different interfaces on the same device can have different MAC addresses.",
        },
        hi: {
            title: "NIC का MAC Address से क्या संबंध है?",
            detail:
                "एक नेटवर्क इंटरफेस के साथ आमतौर पर एक MAC Address जुड़ा होता है। MAC Address का उपयोग Ethernet और Wi-Fi नेटवर्क में Data Link Layer यानी Layer 2 पर कम्युनिकेशन के लिए किया जाता है। जब कोई डिवाइस लोकल नेटवर्क पर डेटा भेजता है, तो इंटरफेस ऐसे फ्रेम भेजता है जिनमें Source और Destination MAC Address होते हैं। एक ही डिवाइस के अलग-अलग नेटवर्क इंटरफेस के MAC Address अलग हो सकते हैं। कुछ मामलों में सॉफ्टवेयर द्वारा MAC Address बदला या randomize भी किया जा सकता है।",
            keyPoint:
                "MAC Address लोकल नेटवर्क लिंक पर Layer 2 कम्युनिकेशन के लिए उपयोग होता है। एक ही डिवाइस के अलग-अलग इंटरफेस के MAC Address अलग हो सकते हैं।",
        },
    },

    // 8. Why MAC Address?
    {
        phase: "Purpose",
        icon: "🔍",
        example: "IP Address vs MAC Address",
        en: {
            title: "Why Do We Need a MAC Address?",
            detail:
                "An IP address can change when a device joins a different network or receives a new address through DHCP. A MAC address is associated with the network interface and is used for local network communication. When a device sends data to another device on the same local network, the destination MAC address helps deliver the Ethernet or Wi-Fi frame to the correct interface. For destinations outside the local network, the frame is typically addressed to the MAC address of the default gateway.",
            keyPoint:
                "IP addresses support logical addressing and routing. MAC addresses are used to deliver frames across a local network link.",
        },
        hi: {
            title: "MAC Address की जरूरत क्यों है?",
            detail:
                "जब कोई डिवाइस किसी दूसरे नेटवर्क से जुड़ता है या DHCP से नया IP Address प्राप्त करता है, तो उसका IP बदल सकता है। MAC Address नेटवर्क इंटरफेस से जुड़ा होता है और लोकल नेटवर्क कम्युनिकेशन में उपयोग होता है। जब कोई डिवाइस उसी लोकल नेटवर्क के दूसरे डिवाइस को डेटा भेजता है, तो Destination MAC Address Ethernet या Wi-Fi फ्रेम को सही इंटरफेस तक पहुँचाने में मदद करता है। लोकल नेटवर्क के बाहर डेटा भेजते समय फ्रेम आमतौर पर Default Gateway के MAC Address को Destination MAC के रूप में उपयोग करता है।",
            keyPoint:
                "IP Address लॉजिकल एड्रेसिंग और रूटिंग के लिए होता है। MAC Address लोकल नेटवर्क लिंक पर फ्रेम डिलीवर करने में उपयोग होता है।",
        },
    },

    // 9. MAC Address Structure
    {
        phase: "Structure",
        icon: "🧩",
        example: "FA:34:F3:AF:09:00",
        en: {
            title: "Structure of a MAC Address",
            detail:
                "A standard 48-bit MAC address is 48 bits long, which equals 6 bytes. Each byte is represented by two hexadecimal digits. The bytes are commonly separated by colons or hyphens. For example, FA:34:F3:AF:09:00 contains six hexadecimal pairs, and each pair represents one byte.",
            keyPoint:
                "6 bytes × 8 bits = 48 bits. Example: FA:34:F3:AF:09:00",
        },
        hi: {
            title: "MAC Address की संरचना",
            detail:
                "एक सामान्य 48-बिट MAC Address 48 बिट का होता है, यानी 6 बाइट। हर बाइट को दो hexadecimal अंकों से दिखाया जाता है। बाइट्स को आमतौर पर कोलन या हाइफन से अलग किया जाता है। उदाहरण के लिए, FA:34:F3:AF:09:00 में छह hexadecimal जोड़े हैं और हर जोड़ा एक बाइट को दर्शाता है।",
            keyPoint:
                "6 बाइट × 8 बिट = 48 बिट। उदाहरण: FA:34:F3:AF:09:00",
        },
    },

    // 10. Hexadecimal
    {
        phase: "Hexadecimal",
        icon: "🔢",
        example: "0 1 2 3 4 5 6 7 8 9 A B C D E F",
        en: {
            title: "Hexadecimal Numbers",
            detail:
                "Hexadecimal is a base-16 number system. It uses digits 0–9 and letters A–F. Each hexadecimal digit represents 4 bits, so two hexadecimal digits represent one byte (8 bits). For example, the hexadecimal pair FA represents the binary value 11111010.",
            keyPoint:
                "FA represents one byte: F = 1111 and A = 1010, giving 11111010 in binary.",
        },
        hi: {
            title: "Hexadecimal Numbers",
            detail:
                "Hexadecimal एक base-16 नंबर सिस्टम है। इसमें 0–9 अंक और A–F अक्षर होते हैं। हर hexadecimal अंक 4 बिट दर्शाता है, इसलिए दो hexadecimal अंक मिलकर एक बाइट यानी 8 बिट बनाते हैं। उदाहरण के लिए, hexadecimal जोड़ा FA का binary value 11111010 होता है।",
            keyPoint:
                "FA एक बाइट को दर्शाता है: F = 1111 और A = 1010, इसलिए बाइनरी में 11111010।",
        },
    },

    // 11. OUI
    {
        phase: "OUI",
        icon: "🏭",
        example: "FA:34:F3 | AF:09:00",
        en: {
            title: "OUI: Organization Identifier",
            detail:
                "A traditional 48-bit MAC address is divided into two parts. The first 3 bytes (24 bits) are commonly used as the Organizationally Unique Identifier (OUI), which identifies the organization associated with the address block. The organization may be a manufacturer or another entity that has received an address allocation.",
            keyPoint:
                "The first 24 bits identify the assigned organization or address block, not necessarily the physical manufacturer of every device.",
        },
        hi: {
            title: "OUI: Organization Identifier",
            detail:
                "एक सामान्य 48-बिट MAC Address को दो भागों में बांटा जा सकता है। पहले 3 बाइट (24 बिट) को आमतौर पर Organizationally Unique Identifier (OUI) कहा जाता है, जो उस एड्रेस ब्लॉक से जुड़ी संस्था की पहचान करता है। यह संस्था निर्माता या कोई दूसरी इकाई हो सकती है जिसे MAC Address ब्लॉक आवंटित किया गया हो।",
            keyPoint:
                "पहले 24 बिट आवंटित संस्था या एड्रेस ब्लॉक की पहचान करते हैं। यह जरूरी नहीं कि हर डिवाइस के वास्तविक निर्माता की पहचान हो।",
        },
    },

    // 12. Remaining 3 Bytes
    {
        phase: "Device Identifier",
        icon: "💻",
        example: "FA:34:F3 | AF:09:00",
        en: {
            title: "The Remaining 3 Bytes",
            detail:
                "In the traditional MAC address structure described in this lesson, the remaining 3 bytes (24 bits) distinguish an interface within the assigned address block. Together, the first and last three bytes form a 48-bit address. The exact allocation structure can vary depending on the type of MAC address block.",
            keyPoint:
                "First 3 bytes: organization identifier. Last 3 bytes: interface-specific portion of the address block in this traditional example.",
        },
        hi: {
            title: "बाकी के 3 बाइट",
            detail:
                "इस पाठ में बताई गई सामान्य MAC Address संरचना में बाकी के 3 बाइट (24 बिट) आवंटित एड्रेस ब्लॉक के अंदर इंटरफेस को अलग पहचान देने के लिए उपयोग होते हैं। पहले और आखिरी तीन बाइट मिलकर 48-बिट एड्रेस बनाते हैं। MAC Address ब्लॉक के प्रकार के अनुसार इसकी सटीक संरचना अलग हो सकती है।",
            keyPoint:
                "पहले 3 बाइट: संस्था का पहचान भाग। आखिरी 3 बाइट: इस पारंपरिक उदाहरण में इंटरफेस की पहचान वाला भाग।",
        },
    },

    // 13. Recap
    {
        phase: "Recap",
        icon: "✅",
        example: "48 bits = 6 bytes",
        en: {
            title: "What You Learned",
            detail:
                "A MAC address is a 48-bit address commonly written as six pairs of hexadecimal digits. It is associated with a network interface and is used for communication on a local network. A network interface allows a device to send and receive data. A NIC is the hardware component that provides network connectivity. A traditional MAC address structure includes an organization identifier and an interface-specific portion.",
            keyPoint:
                "MAC addresses are used on local network links. IP addresses provide logical addressing and help route traffic between networks. A device can have multiple network interfaces, each with its own network configuration.",
        },
        hi: {
            title: "आपने क्या सीखा",
            detail:
                "MAC Address एक 48-बिट एड्रेस है जिसे आमतौर पर छह hexadecimal जोड़ों में लिखा जाता है। यह नेटवर्क इंटरफेस से जुड़ा होता है और लोकल नेटवर्क पर कम्युनिकेशन में उपयोग होता है। Network Interface डिवाइस को डेटा भेजने और प्राप्त करने की सुविधा देता है। NIC वह हार्डवेयर कंपोनेंट है जो नेटवर्क कनेक्टिविटी प्रदान करता है। सामान्य MAC Address संरचना में संस्था का पहचान भाग और इंटरफेस का पहचान भाग होता है।",
            keyPoint:
                "MAC Address लोकल नेटवर्क लिंक पर उपयोग होता है। IP Address लॉजिकल एड्रेसिंग और अलग-अलग नेटवर्क के बीच ट्रैफिक रूट करने में मदद करता है। एक डिवाइस में कई नेटवर्क इंटरफेस हो सकते हैं और हर इंटरफेस की अपनी नेटवर्क configuration हो सकती है।",
        },
    },
] as const;