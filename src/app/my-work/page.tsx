import type { Metadata } from "next";
import MyWork from "@/components/business/MyWork";
import FocusOnArrival from "@/components/experience/FocusOnArrival";
import RouteScene from "@/components/experience/RouteScene";
import { siteConfig } from "@/site.config";
import styles from "./page.module.scss";

const description = `Websites, custom tools, and SEO work built by Isaac Young at ${siteConfig.name} in Medford, Oregon.`;

export const metadata: Metadata = {
    title: "My Work",
    description,
    alternates: { canonical: "/my-work" },
    openGraph: {
        type: "website",
        url: "/my-work",
        siteName: siteConfig.name,
        title: `My Work | ${siteConfig.name}`,
        description,
        locale: "en_US",
    },
};

export default function MyWorkPage() {
    return (
        <RouteScene>
            <main className={styles.main}>
                <MyWork />
                <FocusOnArrival headingId="my-work-title" />
            </main>
        </RouteScene>
    );
}
