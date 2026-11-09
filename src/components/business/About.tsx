import type { CSSProperties } from "react";
import Image from "next/image";
import { IconChevronLeft } from "@tabler/icons-react";
import LogoBackdrop from "@/components/experience/LogoBackdrop";
import PinnedWayfinding from "@/components/experience/PinnedWayfinding";
import SceneLink from "@/components/experience/SceneLink";
import { about } from "@/content/about";
import AboutStory from "./AboutStory";
import LocalTime from "./LocalTime";
import FlipButton from "./FlipButton";
import FlipCard from "./FlipCard";
import styles from "./About.module.scss";

const IDENTITY_LINES = 2;

export default function About() {
    const {
        titleLead,
        titleAccent,
        returnLabel,
        portraitAlt,
        statsLabel,
        cardName,
        cardRole,
        flipText,
        flipToBackLabel,
        flipToFrontLabel,
        stats,
        cardBack,
    } = about;
    const flipButtonCopy = { text: flipText, toBackLabel: flipToBackLabel, toFrontLabel: flipToFrontLabel };

    return (
        <section className={styles.about} aria-labelledby="about-title" data-travel-layer="foreground">
            <LogoBackdrop src="/images/mark-outline-icemint-2-2048.png" width={2048} height={1387} staysInView />

            <PinnedWayfinding className={styles.wayfinding} label="Leave About">
                <SceneLink
                    sceneId="introduction"
                    travel={{ direction: "left", carriesPortrait: true }}
                    className={styles.returnLink}
                >
                    <IconChevronLeft stroke={2} className={styles.returnArrow} aria-hidden="true" />
                    <span className={`${styles.returnLabel} tech`}>{returnLabel}</span>
                </SceneLink>
            </PinnedWayfinding>

            <header className={styles.header}>
                <h1 id="about-title" tabIndex={-1} className={styles.title}>
                    {titleLead} <span className={styles.titleAccent}>{titleAccent}</span>
                </h1>
            </header>

            <FlipCard
                className={styles.card}
                label={statsLabel}
                front={
                    <div className={styles.front}>
                        <span className={styles.photoBackdrop} aria-hidden="true" />
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
                        <div className={styles.details}>
                            <p className={styles.identity}>
                                <span className={styles.name} style={{ "--reveal-order": 0 } as CSSProperties}>
                                    {cardName}
                                </span>
                                <span
                                    className={`${styles.role} tech`}
                                    style={{ "--reveal-order": 1 } as CSSProperties}
                                >
                                    {cardRole}
                                </span>
                            </p>
                            <dl className={styles.stats}>
                                {stats.map((stat, order) => (
                                    <div
                                        key={stat.id}
                                        className={styles.stat}
                                        style={{ "--reveal-order": IDENTITY_LINES + order } as CSSProperties}
                                    >
                                        <dt className={`${styles.label} tech`}>{stat.label}</dt>
                                        <dd className={`${styles.statValue} body`}>
                                            {stat.id === "status" && (
                                                <span className={styles.availableSignal} aria-hidden="true" />
                                            )}
                                            {stat.id === "local-time" ? <LocalTime timeZone={stat.timeZone} /> : stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            <FlipButton
                                {...flipButtonCopy}
                                className={styles.frontFlip}
                                style={{ "--reveal-order": IDENTITY_LINES + stats.length } as CSSProperties}
                            />
                        </div>
                    </div>
                }
                back={
                    <div className={styles.back}>
                        <div className={styles.backFields}>
                            {cardBack.fieldGroups.map((fields) => (
                                <dl key={fields[0].label} className={styles.fieldGroup}>
                                    {fields.map((field) => (
                                        <div
                                            key={field.label}
                                            className={field.isFullWidth ? `${styles.field} ${styles.fullWidth}` : styles.field}
                                        >
                                            <dt className={`${styles.label} tech`}>{field.label}</dt>
                                            <dd className={`${styles.fieldValue} body`}>{field.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            ))}
                            <dl className={styles.fieldGroup}>
                                <div className={`${styles.field} ${styles.fullWidth}`}>
                                    <dt className={`${styles.label} tech`}>{cardBack.reachLabel}</dt>
                                    <dd>
                                        <a href={`mailto:${cardBack.email}`} className={styles.email}>
                                            {cardBack.email}
                                        </a>
                                    </dd>
                                    <dd className={`${styles.backNote} body`}>{cardBack.replyPromise}</dd>
                                </div>
                            </dl>
                        </div>
                        <div className={styles.backFooter}>
                            <p className={`${styles.issuer} tech`}>{cardBack.issuer}</p>
                            <FlipButton {...flipButtonCopy} />
                        </div>
                    </div>
                }
            />

            <AboutStory className={styles.story} />
        </section>
    );
}
