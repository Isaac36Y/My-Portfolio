import Link from "next/link";
import type { CSSProperties } from "react";
import { PORTAL_SWAP_TYPE, travelTypesFor } from "@/lib/motion/routeTravel";
import styles from "./HeroNav.module.scss";

const services = [
    { label: "Websites", href: "/my-work/websites", transitionTypes: travelTypesFor({ direction: "left" }) },
    { label: "Custom Tools", href: "/my-work/custom-tools", transitionTypes: travelTypesFor({ direction: "up" }) },
    { label: "SEO", href: "/my-work/seo", transitionTypes: travelTypesFor({ direction: "right" }) },
    { label: "Log In", href: "/login", transitionTypes: [PORTAL_SWAP_TYPE] },
];

type HeroNavProps = {
    currentHref?: string;
};

// The hero's service links. The login page draws the same nav in the same place, so it holds still while
// the hero's copy and the login card swap.
export default function HeroNav({ currentHref }: HeroNavProps) {
    return (
        <nav className={styles.nav} aria-label="Services">
            <ul role="list" className={styles.navList}>
                {services.map((service, index) => (
                    <li key={service.href} className={styles.navItem} style={{ "--i": index } as CSSProperties}>
                        <Link
                            href={service.href}
                            transitionTypes={service.transitionTypes}
                            aria-current={service.href === currentHref ? "page" : undefined}
                            className={`${styles.navLink} body`}
                        >
                            <span className={styles.navWash} aria-hidden="true" />
                            <span className={styles.navLabel}>{service.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
