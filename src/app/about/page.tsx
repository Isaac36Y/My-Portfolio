import type { Metadata } from "next";
import About from "@/components/business/About";
import FocusOnArrival from "@/components/experience/FocusOnArrival";
import RouteScene from "@/components/experience/RouteScene";
import { siteConfig } from "@/site.config";
import styles from "./page.module.scss";

const description = `Meet Isaac Young, the developer behind ${siteConfig.name} in Medford, Oregon.`;

export const metadata: Metadata = {
    title: "Get to Know Me",
    description,
    alternates: { canonical: "/about" },
    // Kept out of search until the page has content worth landing on.
    robots: { index: false, follow: true },
    openGraph: {
        type: "website",
        url: "/about",
        siteName: siteConfig.name,
        title: `Get to Know Me | ${siteConfig.name}`,
        description,
        locale: "en_US",
    },
};

export default function AboutPage() {
    return (
        <RouteScene>
            <main className={styles.main}>
                <About />
                <FocusOnArrival headingId="about-title" />
            </main>
        </RouteScene>
    );
}
