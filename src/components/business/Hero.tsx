import Image from "next/image";
import { siteConfig } from "@/site.config";
import styles from "./Hero.module.scss";
import { travelTypesFor } from "@/lib/motion/routeTravel";
import Link from "next/link";

const services = [
    { label: "Websites", href: "/my-work/websites", transitionType: travelTypesFor({ direction: "left" }) },
    { label: "Custom Tools", href: "/my-work/custom-tools" },
    { label: "SEO", href: "/my-work/seo" },
    { label: "Log In", href: "/login" },
];

export default function Hero() {
    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <nav className={styles.nav} aria-label="Services">
                <ul role="list" className={styles.navList}>
                    {services.map((service) => (
                        <li key={service.href}>
                            <Link href={service.href} transitionTypes={service.transitionType} className={`${styles.navLink} body`}>
                                <span className={styles.navWash} aria-hidden="true" />
                                <span className={styles.navLabel}>{service.label}</span>
                            </Link>
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
                    Younger <br></br><span className={styles.systems}>Systems</span>
                    <span className={styles.version} aria-hidden="true">
                        v.new
                    </span>
                </h1>
            </div>

            <p className={`${styles.tagline} body`}>{siteConfig.tagline}</p>
        </section>
    );
}
