import type { CSSProperties } from "react";
import { IconArrowNarrowRight, IconChevronUp } from "@tabler/icons-react";
import LogoBackdrop from "@/components/experience/LogoBackdrop";
import PinnedWayfinding from "@/components/experience/PinnedWayfinding";
import SceneLink from "@/components/experience/SceneLink";
import { why } from "@/content/why";
import styles from "./Why.module.scss";

export default function Why() {
    const { titleLead, titleAccent, lede, returnLabel, alternatives, nextSteps, sendOff } = why;

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

            <section className={styles.alternatives} aria-labelledby="why-alternatives-title">
                <h2 id="why-alternatives-title" className={`${styles.sectionHeading} ${styles.revealsOnScroll}`}>
                    {alternatives.heading}
                </h2>

                <ul role="list" className={styles.options}>
                    {alternatives.options.map((alternative) => (
                        <li key={alternative.id} className={styles.exchange}>
                            <div className={styles.yourSide}>
                                <h3 className={styles.option}>{alternative.option}</h3>
                                <p className={`${styles.whatHappens} body`}>{alternative.whatHappens}</p>
                            </div>
                            <div className={styles.mySide}>
                                <p className={`${styles.myAnswerLabel} tech`}>{alternatives.myAnswerLabel}</p>
                                <p className={styles.myAnswer}>{alternative.myAnswer}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles.nextSteps} aria-labelledby="why-next-steps-title">
                <h2 id="why-next-steps-title" className={`${styles.sectionHeading} ${styles.revealsOnScroll}`}>
                    {nextSteps.heading}
                </h2>

                <ol
                    role="list"
                    className={styles.steps}
                    style={{ "--step-count": nextSteps.steps.length } as CSSProperties}
                >
                    {nextSteps.steps.map((step, order) => (
                        <li
                            key={step.id}
                            className={`${styles.step} ${styles.revealsOnScroll}`}
                            style={{ "--step-order": order } as CSSProperties}
                        >
                            <h3 className={`${styles.moment} tech`}>{step.moment}</h3>
                            <p className={`${styles.whatYouGet} body`}>{step.whatYouGet}</p>
                        </li>
                    ))}
                </ol>
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
