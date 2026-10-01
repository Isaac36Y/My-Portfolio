import type { ComponentType, CSSProperties } from "react";
import Image from "next/image";
import {
    IconChevronLeft,
    IconClock,
    IconHexagonAsterisk,
    IconMailFast,
    IconMapPin,
    IconProgressCheck,
    type IconProps,
} from "@tabler/icons-react";
import LogoBackdrop from "@/components/experience/LogoBackdrop";
import SceneLink from "@/components/experience/SceneLink";
import { about, type AboutStat } from "@/content/about";
import LocalTime from "./LocalTime";
import styles from "./About.module.scss";

const statIcons: Record<AboutStat["id"], ComponentType<IconProps>> = {
    location: IconMapPin,
    "local-time": IconClock,
    response: IconMailFast,
    status: IconProgressCheck,
    specialty: IconHexagonAsterisk,
};

export default function About() {
    const { titleLead, titleAccent, returnLabel, portraitAlt, statsLabel, stats } = about;

    return (
        <section className={styles.about} aria-labelledby="about-title" data-travel-layer="foreground">
            <LogoBackdrop src="/images/mark-outline-icemint-2-2048.png" width={2048} height={1387} travelLeavesOn="left" />

            <SceneLink
                sceneId="introduction"
                travel={{ direction: "left", carriesPortrait: true }}
                className={styles.returnLink}
            >
                <IconChevronLeft stroke={2} className={styles.returnArrow} aria-hidden="true" />
                <span className={`${styles.returnLabel} tech`}>{returnLabel}</span>
            </SceneLink>

            <header className={styles.header}>
                <h1 id="about-title" tabIndex={-1} className={styles.title}>
                    {titleLead} <span className={styles.titleAccent}>{titleAccent}</span>
                </h1>
            </header>

            <aside className={styles.card} aria-label={statsLabel}>
                <span className={styles.cardFill} aria-hidden="true" />
                <div className={styles.portrait} data-carried="portrait">
                    <Image
                        src="/images/isaacStanding.png"
                        alt={portraitAlt}
                        width={1024}
                        height={1536}
                        // The desktop size matches the introduction's so both pick the same file and the carried portrait is already cached.
                        sizes="(min-width: 1252px) 85vh, 45rem"
                        loading="eager"
                        className={styles.portraitImage}
                    />
                </div>
                <dl className={styles.stats}>
                    {stats.map((stat, order) => {
                        const StatIcon = statIcons[stat.id];
                        return (
                            <div
                                key={stat.id}
                                className={styles.stat}
                                style={{ "--stat-order": order } as CSSProperties}
                            >
                                <dt className={`${styles.statLabel} tech`}>
                                    <StatIcon stroke={1.75} className={styles.statIcon} aria-hidden="true" />
                                    {stat.label}
                                </dt>
                                <dd className={`${styles.statValue} body`}>
                                    {stat.id === "local-time" ? <LocalTime timeZone={stat.timeZone} /> : stat.value}
                                </dd>
                            </div>
                        );
                    })}
                </dl>
                <span className={styles.cardEdges} aria-hidden="true">
                    <span className={styles.edgeTop} />
                    <span className={styles.edgeLeft} />
                    <span className={styles.edgeRight} />
                    <span className={styles.edgeBottom} />
                </span>
            </aside>

            {/* TODO: story sections. This block only gives the page enough length to test the sticky card. */}
            <div className={styles.story} aria-hidden="true" />
        </section>
    );
}
