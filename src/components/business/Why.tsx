import type { CSSProperties } from "react";
import { IconArrowNarrowRight, IconChevronUp } from "@tabler/icons-react";
import LogoBackdrop from "@/components/experience/LogoBackdrop";
import PinnedWayfinding from "@/components/experience/PinnedWayfinding";
import SceneLink from "@/components/experience/SceneLink";
import { why } from "@/content/why";
import styles from "./Why.module.scss";

function formatTermNumber(order: number) {
    return String(order + 1).padStart(2, "0");
}

export default function Why() {
    const { titleLead, titleAccent, lede, returnLabel, honest, working, sendOff } = why;

    return (
        <section className={styles.why} aria-labelledby="why-title" data-travel-layer="foreground">
            <LogoBackdrop
                src="/images/mark-outline-icemint-2-2048.png"
                width={2048}
                height={1387}
                fadesBeforeFold
            />

            <header className={styles.opener}>
                <PinnedWayfinding className={styles.wayfinding} label="Leave Why">
                    <SceneLink sceneId="introduction" travel={{ direction: "up" }} className={styles.returnLink}>
                        <IconChevronUp stroke={2} className={styles.returnArrow} aria-hidden="true" />
                        <span className={`${styles.returnLabel} tech`}>{returnLabel}</span>
                    </SceneLink>
                </PinnedWayfinding>
                <h1 id="why-title" tabIndex={-1} className={styles.title}>
                    {titleLead} <span className={styles.titleAccent}>{titleAccent}</span>
                </h1>
                <p className={`${styles.lede} body`}>{lede}</p>
            </header>

            <section className={styles.honest} aria-labelledby="why-honest-title">
                <div className={`${styles.sectionIntro} ${styles.revealsOnScroll}`}>
                    <h2 id="why-honest-title" className={styles.sectionHeading}>
                        {honest.heading}
                    </h2>
                    <p className={`${styles.sectionLede} body`}>{honest.intro}</p>
                </div>

                <ol role="list" className={styles.terms}>
                    {honest.terms.map((term, order) => (
                        <li key={term.id} className={styles.term}>
                            <span className={styles.termRule} aria-hidden="true" />
                            <span className={`${styles.termNumber} tech`} aria-hidden="true">
                                {formatTermNumber(order)}
                            </span>
                            <h3 className={styles.termStatement}>{term.statement}</h3>
                            <p className={`${styles.termDetail} body`}>{term.detail}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className={styles.working} aria-labelledby="why-working-title">
                <div className={`${styles.sectionIntro} ${styles.revealsOnScroll}`}>
                    <h2 id="why-working-title" className={styles.sectionHeading}>
                        {working.heading}
                    </h2>
                    <p className={`${styles.sectionLede} body`}>{working.intro}</p>
                </div>

                <ul
                    role="list"
                    className={styles.traits}
                    style={{ "--trait-count": working.traits.length } as CSSProperties}
                >
                    {working.traits.map((trait, order) => (
                        <li
                            key={trait.id}
                            className={`${styles.trait} ${styles.revealsOnScroll}`}
                            style={{ "--trait-order": order } as CSSProperties}
                        >
                            <h3 className={styles.traitHeading}>{trait.heading}</h3>
                            <p className={`${styles.traitBody} body`}>{trait.body}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <footer className={styles.sendOff}>
                <p className={styles.handshake}>
                    <span className={styles.yourPart}>{sendOff.yourPart}</span>{" "}
                    <span className={styles.myPart}>{sendOff.myPart}</span>
                </p>
                <div className={`${styles.invitation} ${styles.revealsOnScroll}`}>
                    <p className={`${styles.invitationText} body`}>{sendOff.invitation}</p>
                    <a href={`mailto:${sendOff.email}`} className={styles.helloLink}>
                        {sendOff.linkText}
                        <IconArrowNarrowRight stroke={2} className={styles.helloArrow} aria-hidden="true" />
                    </a>
                </div>
            </footer>
        </section>
    );
}
