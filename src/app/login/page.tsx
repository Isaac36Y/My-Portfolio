import type { Metadata } from "next";
import PortalLogin from "@/components/business/PortalLogin";
import FocusOnArrival from "@/components/experience/FocusOnArrival";
import RouteScene from "@/components/experience/RouteScene";
import { siteConfig } from "@/site.config";
import styles from "./page.module.scss";

export const metadata: Metadata = {
    title: "Log In",
    description: `Log in to the ${siteConfig.name} portal for your projects, tools, and updates.`,
    alternates: { canonical: "/login" },
    // A sign-in screen has nothing for search to show; links out of it still count.
    robots: { index: false, follow: true },
};

export default function LoginPage() {
    return (
        <RouteScene>
            <main className={styles.main}>
                <PortalLogin />
                <FocusOnArrival headingId="login-title" />
            </main>
        </RouteScene>
    );
}
