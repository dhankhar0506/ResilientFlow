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
    subnetting: lazy(() => import("../network/components/Subnetting")),
    "default-gateway": lazy(() => import("../network/components/DefaultGateway")),
    dhcp: lazy(() => import("../network/components/DHCP")),
    "mac-address": lazy(() => import("../network/components/MacAddress")),
    switching: lazy(() => import("../network/components/Switching")),
    vlan: lazy(() => import("../network/components/VLAN")),
    arp: lazy(() => import("../network/components/ARPLesson")),
    osi: lazy(() => import("../network/components/OSI_TCP_IP")),
    ports: lazy(() => import("../network/components/Ports")),
    tcp: lazy(() => import("../network/components/TCP")),
    udp: lazy(() => import("../network/components/UDP")),
    icmp: lazy(() => import("../network/components/ICMP")),
    routing: lazy(() => import("../network/components/RoutingLesson")),
    nat: lazy(() => import("../network/components/NAT")),
    ipv6: lazy(() => import("../network/components/IPv6")),
    dns: lazy(() => import("../network/components/DNSLookup")),
    tls: lazy(() => import("../network/components/TLS")),
    firewall: lazy(() => import("../network/components/Firewall")),
    "lb-cdn": lazy(() => import("../network/components/LoadBalancer")),
};
