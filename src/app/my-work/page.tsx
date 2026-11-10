import type { Metadata } from "next";
import MyWork from "@/components/business/MyWork";
import FirstVisitOnly from "@/components/experience/FirstVisitOnly";
import FocusOnArrival from "@/components/experience/FocusOnArrival";
import RememberScene from "@/components/experience/RememberScene";
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
                <RememberScene sceneId="introduction" />
                <FirstVisitOnly />
            </main>
        </RouteScene>
    );
}
