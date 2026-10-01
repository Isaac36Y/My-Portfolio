import type { Metadata } from "next";
import Why from "@/components/business/Why";
import FocusOnArrival from "@/components/experience/FocusOnArrival";
import RouteScene from "@/components/experience/RouteScene";
import { siteConfig } from "@/site.config";
import styles from "./page.module.scss";

const description = `Honest quotes, plans in plain English, and Websites and Custom Tools built from scratch by Isaac Young at ${siteConfig.name} in ${siteConfig.location}.`;

export const metadata: Metadata = {
    title: `Why ${siteConfig.name}`,
    description,
    alternates: { canonical: "/why" },
    openGraph: {
        type: "website",
        url: "/why",
        siteName: siteConfig.name,
        title: `Why ${siteConfig.name}`,
        description,
        locale: "en_US",
    },
};

export default function WhyPage() {
    return (
        <RouteScene>
            <main className={styles.main}>
                <Why />
                <FocusOnArrival headingId="why-title" />
            </main>
        </RouteScene>
    );
}
