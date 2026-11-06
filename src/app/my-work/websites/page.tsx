import type { Metadata } from "next";
import WebsiteGallery from "@/components/business/WebsiteGallery";
import FocusOnArrival from "@/components/experience/FocusOnArrival";
import RouteScene from "@/components/experience/RouteScene";
import { siteConfig } from "@/site.config";
import styles from "./page.module.scss";

const description = `Websites Isaac Young has designed and built from scratch at ${siteConfig.name} in ${siteConfig.location}.`;

export const metadata: Metadata = {
    title: "Websites",
    description,
    alternates: { canonical: "/my-work/websites" },
    openGraph: {
        type: "website",
        url: "/my-work/websites",
        siteName: siteConfig.name,
        title: `Websites | ${siteConfig.name}`,
        description,
        locale: "en_US",
    },
};

export default function WebsitesPage() {
    return (
        <RouteScene>
            <main className={styles.main}>
                <WebsiteGallery />
                <FocusOnArrival headingId="websites-title" />
            </main>
        </RouteScene>
    );
}
