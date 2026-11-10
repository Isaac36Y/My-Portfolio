import Image from "next/image";
import HeroGrid from "@/components/experience/HeroGrid";
import HeroNav from "@/components/experience/HeroNav";
import { siteConfig } from "@/site.config";
import styles from "./Hero.module.scss";

export default function Hero() {
    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <HeroGrid />
            <HeroNav />

            <div className={styles.brand}>
                <Image
                    src="/images/mark-2048.png"
                    alt=""
                    width={2048}
                    height={1387}
                    sizes="10rem"
                    className={styles.mark}
                    preload
                    data-intro-mark
                    data-portal-swap="mark"
                />
                <h1 id="hero-title" tabIndex={-1} className={styles.wordmark} data-portal-swap="copy">
                    Younger <br></br><span className={styles.systems}>Systems</span>
                    <span className={styles.version} aria-hidden="true">
                        v.new
                    </span>
                </h1>
            </div>

            <p className={`${styles.tagline} body`} data-portal-swap="copy">
                {siteConfig.tagline}
            </p>
        </section>
    );
}
