
import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { Lang } from "../../i18n";


type LessonProps = {
    lang: Lang;
};

type Lesson = LazyExoticComponent<ComponentType<LessonProps>>;

export const LESSON_COMPONENTS: Record<string, Lesson> = {
    definitions: lazy(() => import("../network/components/NetworkDefinitions")),
    http: lazy(() => import("../network/components/HttpRequestResponse")),
    "ip-structure": lazy(() => import("../network/components/IpStructure")),
    "host-cidr": lazy(() => import("../network/components/NetworkHostCidr")),
    subnet: lazy(() => import("../network/components/Subnetmask")),
    "default-gateway": lazy(() => import("../network/components/DefaultGateway")),
    "mac-address" : lazy(() => import("../network/components/MacAddress")),
    "arp" : lazy(() => import("../network/components/ARPLesson")),
    "osi": lazy(() => import("../network/components/OSI_TCP_IP"))

    // Naya lesson yahan add karo 👇
    // osi: lazy(() => import("../network/components/OsiModel")),
    // packet: lazy(() => import("../network/components/PacketJourney")),
    // arp: lazy(() => import("../network/components/ArpMac")),
    // dns: lazy(() => import("../network/components/DnsLookup")),
};