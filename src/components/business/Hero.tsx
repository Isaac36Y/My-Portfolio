import styles from "./Hero.module.scss";
import YSLogo from "./YSLogo";

// Anchors point at the service sections that will follow the hero on this page.
const services = [
    { label: "Websites", href: "#websites" },
    { label: "Tools", href: "#tools" },
    { label: "SEO", href: "#seo" },
    { label: "Digital Marketing", href: "#digital-marketing" },
];

export default function Hero() {
    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.backdrop} aria-hidden="true">
                <span className={`${styles.chevron} ${styles.chevronLeft}`} />
                <span className={`${styles.chevron} ${styles.chevronLeft} ${styles.chevronEcho}`} />
                <span className={`${styles.chevron} ${styles.chevronRight}`} />
                <span className={`${styles.chevron} ${styles.chevronRight} ${styles.chevronEcho}`} />
            </div>

            <nav className={styles.nav} aria-label="Services">
                <ul role="list" className={styles.navList}>
                    {services.map((service) => (
                        <li key={service.href}>
                            <a href={service.href} className={`${styles.navLink} body`}>
                                {service.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.brand}>
                <YSLogo className={styles.logo} />
                <h1 id="hero-title" className={styles.title}>
                    <span className={styles.titleTop}>Younger</span>
                    <span className={styles.titleBottom}>
                        Systems
                        <span className={styles.version} aria-hidden="true">
                            v.new
                        </span>
                    </span>
                </h1>
                <p className={`${styles.tagline} body`}>
                    Websites, search visibility, and custom tools built to make your business work better.
                </p>
            </div>

            <span className={styles.connector} aria-hidden="true" />
        </section>
    );
}
