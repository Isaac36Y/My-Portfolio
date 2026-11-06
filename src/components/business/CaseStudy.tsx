import { ViewTransition } from "react";
import Link from "next/link";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { caseStudyPath, customTools, type Tool } from "@/content/tools";
import { TOOL_SWITCH_TYPE, toolSwitchEnterClasses, toolSwitchExitClasses } from "@/lib/motion/routeTravel";
import ToolMedia from "./ToolMedia";
import styles from "./CaseStudy.module.scss";

type CaseStudyProps = {
    tool: Tool;
    nextTool: Tool;
};

function chapterNumber(order: number): string {
    return String(order + 1).padStart(2, "0");
}

export default function CaseStudy({ tool, nextTool }: CaseStudyProps) {
    const {
        beforeLabel,
        afterLabel,
        roleLabel,
        role,
        statusLabel,
        builtWithLabel,
        liveLabel,
        plansLabel,
        nextToolLabel,
        newTabNotice,
    } = customTools;

    return (
        <ViewTransition enter={toolSwitchEnterClasses} exit={toolSwitchExitClasses} default="none">
            <article className={styles.caseStudy} aria-labelledby="case-study-title">
                <header className={styles.hero}>
                    <div className={styles.heroCopy}>
                        <p className={`${styles.field} tech`}>{tool.field}</p>
                        <h2 id="case-study-title" tabIndex={-1} className={styles.title}>
                            {tool.name}
                        </h2>
                        <p className={`${styles.summary} body`}>{tool.summary}</p>

                        <dl className={styles.shift}>
                            <div className={styles.shiftRow}>
                                <dt className={`${styles.shiftLabel} tech`}>{beforeLabel}</dt>
                                <dd className={`${styles.shiftText} body`}>{tool.before}</dd>
                            </div>
                            <div className={styles.shiftRow}>
                                <dt className={`${styles.shiftLabel} ${styles.after} tech`}>{afterLabel}</dt>
                                <dd className={`${styles.shiftText} body`}>{tool.after}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className={styles.heroMedia}>
                        <ToolMedia media={tool.media} phoneSizes="(min-width: 1252px) 18vw, 40vw" isPriority />
                    </div>

                    <dl className={styles.facts}>
                        <div className={styles.fact}>
                            <dt className={`${styles.factLabel} tech`}>{roleLabel}</dt>
                            <dd className={`${styles.factValue} body`}>{role}</dd>
                        </div>
                        <div className={styles.fact}>
                            <dt className={`${styles.factLabel} tech`}>{statusLabel}</dt>
                            <dd className={`${styles.factValue} body`}>{tool.status}</dd>
                        </div>
                        <div className={styles.fact}>
                            <dt className={`${styles.factLabel} tech`}>{builtWithLabel}</dt>
                            <dd className={`${styles.factValue} body`}>{tool.builtWith.join(" · ")}</dd>
                        </div>
                        {tool.liveUrl && (
                            <div className={styles.fact}>
                                <dt className={`${styles.factLabel} tech`}>{liveLabel}</dt>
                                <dd className={styles.factValue}>
                                    <a
                                        href={tool.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`${styles.liveLink} tech`}
                                    >
                                        {new URL(tool.liveUrl).host}
                                        <span className={styles.visuallyHidden}> {newTabNotice}</span>
                                        <IconArrowUpRight stroke={2} className={styles.liveArrow} aria-hidden="true" />
                                    </a>
                                </dd>
                            </div>
                        )}
                    </dl>
                </header>

                <div className={styles.chapters}>
                    {tool.chapters.map((chapter, order) => {
                        const [leadParagraph, ...paragraphs] = chapter.paragraphs;

                        return (
                            <section
                                key={chapter.id}
                                id={chapter.id}
                                className={styles.chapter}
                                aria-labelledby={`${chapter.id}-heading`}
                            >
                                <div className={styles.chapterAside}>
                                    <p className={`${styles.chapterNumber} tech`} aria-hidden="true">
                                        {chapterNumber(order)}
                                    </p>
                                    <h3 id={`${chapter.id}-heading`} className={styles.chapterHeading}>
                                        {chapter.heading}
                                    </h3>
                                    {chapter.video && (
                                        <video
                                            className={styles.chapterVideo}
                                            src={chapter.video.src}
                                            width={chapter.video.width}
                                            height={chapter.video.height}
                                            aria-label={chapter.video.label}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="metadata"
                                        />
                                    )}
                                </div>

                                <div className={styles.chapterText}>
                                    <p className={`${styles.lead} body`}>{leadParagraph}</p>
                                    {paragraphs.map((paragraph) => (
                                        <p key={paragraph.slice(0, 32)} className={`${styles.paragraph} body`}>
                                            {paragraph}
                                        </p>
                                    ))}
                                    {chapter.plans && (
                                        <>
                                            <h4 className={`${styles.plansHeading} tech`}>{plansLabel}</h4>
                                            <ol role="list" className={styles.plans}>
                                                {chapter.plans.map((plan, planOrder) => (
                                                    <li key={plan.slice(0, 32)} className={styles.plan}>
                                                        <span className={`${styles.planNumber} tech`} aria-hidden="true">
                                                            {chapterNumber(planOrder)}
                                                        </span>
                                                        <p className={`${styles.planText} body`}>{plan}</p>
                                                    </li>
                                                ))}
                                            </ol>
                                        </>
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>

                <footer className={styles.next}>
                    <p className={`${styles.nextLabel} tech`}>{nextToolLabel}</p>
                    <Link
                        href={caseStudyPath(nextTool.slug)}
                        transitionTypes={[TOOL_SWITCH_TYPE]}
                        className={styles.nextLink}
                    >
                        {nextTool.name}
                        <IconArrowRight stroke={2} className={styles.nextArrow} aria-hidden="true" />
                    </Link>
                </footer>
            </article>
        </ViewTransition>
    );
}
