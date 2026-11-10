import Image from "next/image";
import { IconMail } from "@tabler/icons-react";
import HeroGrid from "@/components/experience/HeroGrid";
import HeroNav from "@/components/experience/HeroNav";
import { siteConfig } from "@/site.config";
import LoginForm from "./LoginForm";
import PortalHomeLink from "./PortalHomeLink";
import styles from "./PortalLogin.module.scss";

const getStartedHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Getting started with ${siteConfig.name}`)}`;

// Built on the hero's frame (ground, grid and nav in the same places) so arriving from the hero only swaps
// the copy for the card and moves the mark.
export default function PortalLogin() {
    return (
        <section className={styles.portal} aria-labelledby="login-title">
            <HeroGrid />
            <HeroNav currentHref="/login" />

            <div className={styles.stack}>
                <PortalHomeLink className={styles.homeLink}>
                    <Image
                        src="/images/mark-2048.png"
                        alt=""
                        width={2048}
                        height={1387}
                        sizes="10rem"
                        className={styles.mark}
                        data-portal-swap="mark"
                    />
                </PortalHomeLink>

                <div className={styles.card} data-portal-swap="copy">
                    <header className={styles.header}>
                        <p className={`${styles.eyebrow} tech`}>Client portal</p>
                        <h1 id="login-title" tabIndex={-1} className={styles.title}>
                            Log in to your portal
                        </h1>
                        <p className={`${styles.lede} body`}>Your projects, tools, and updates in one place.</p>
                    </header>

                    <LoginForm />

                    <div className={styles.getStarted}>
                        <h2 className={styles.getStartedTitle}>Don&apos;t have a login yet?</h2>
                        <p className={`${styles.getStartedCopy} body`}>
                            Let&apos;s see what we can get started for you.
                        </p>
                        <a href={getStartedHref} className={styles.emailLink}>
                            <IconMail stroke={2} aria-hidden="true" className={styles.emailIcon} />
                            <span>{siteConfig.email}</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
