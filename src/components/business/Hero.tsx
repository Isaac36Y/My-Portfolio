import Image from "next/image";
import { siteConfig } from "@/site.config";
import styles from "./Hero.module.scss";

const services = [
    { label: "Websites", href: "#websites" },
    { label: "Custom Tools", href: "#custom-tools" },
    { label: "SEO", href: "#seo" },
    { label: "Digital Marketing", href: "#digital-marketing" },
];

export default function Hero() {
    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <nav className={styles.nav} aria-label="Services">
                <ul role="list" className={styles.navList}>
                    {services.map((service) => (
                        <li key={service.href}>
                            <a href={service.href} className={`${styles.navLink} body`}>
                                <span className={styles.navWash} aria-hidden="true" />
                                <span className={styles.navLabel}>{service.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.brand}>
                <Image
                    src="/images/mark-2048.png"
                    alt=""
                    width={2048}
                    height={1387}
                    sizes="10rem"
                    className={styles.mark}
                    preload
                />
                <h1 id="hero-title" tabIndex={-1} className={styles.wordmark}>
                    <Image
                        src="/images/wordmark-2048.png"
                        alt={siteConfig.name}
                        width={2048}
                        height={930}
                        sizes="(max-width: 480px) 70vw, 30rem"
                        preload
                    />
                    <span className={styles.version} aria-hidden="true">
                        v.new
                    </span>
                </h1>
            </div>

            <p className={`${styles.tagline} body`}>{siteConfig.tagline}</p>
        </section>
    );
}
