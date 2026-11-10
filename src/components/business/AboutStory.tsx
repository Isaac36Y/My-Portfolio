import { IconArrowNarrowRight } from "@tabler/icons-react";
import { about, type StoryChapter } from "@/content/about";
import styles from "./AboutStory.module.scss";

function formatChapterNumber(order: number) {
    return String(order + 1).padStart(2, "0");
}

function ChapterHeading({ chapter }: { chapter: StoryChapter }) {
    const { heading, headingAccent, isStatement } = chapter;

    return (
        <h3 className={`${isStatement ? styles.statement : styles.heading} ${styles.revealsOnScroll}`}>
            {heading}
            {headingAccent && <span className={styles.headingAccent}> {headingAccent}</span>}
        </h3>
    );
}

export default function AboutStory({ className }: { className?: string }) {
    const { label, chapters, closingPrompt, closingLinkText, email } = about.story;

    return (
        <div className={`${styles.story} ${className ?? ""}`}>
            <h2 className={`${styles.storyLabel} tech`}>{label}</h2>

            <div className={styles.journey}>
                <span className={styles.trail} aria-hidden="true">
                    <span className={styles.trailWalked} />
                </span>

                <ol role="list" className={styles.chapters}>
                    {chapters.map((chapter, order) => (
                        <li key={chapter.id} className={styles.chapter}>
                            <span className={styles.waypointMarker} aria-hidden="true">
                                <span className={styles.waypointReached} />
                            </span>
                            <p className={`${styles.waypoint} ${styles.revealsOnScroll} tech`}>
                                <span className={styles.chapterNumber}>{formatChapterNumber(order)}</span>
                                {chapter.waypoint}
                            </p>

                            <ChapterHeading chapter={chapter} />

                            {chapter.paragraphs.map((paragraph) => (
                                <p key={paragraph} className={`${styles.paragraph} ${styles.revealsOnScroll} body`}>
                                    {paragraph}
                                </p>
                            ))}

                            {chapter.figures && (
                                <ul role="list" className={`${styles.figures} ${styles.revealsOnScroll}`}>
                                    {chapter.figures.map((figure) => (
                                        <li key={figure.label} className={styles.figure}>
                                            <span className={styles.figureValue}>{figure.value}</span>
                                            <span className={`${styles.figureLabel} tech`}>{figure.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {chapter.route && (
                                <p className={`${styles.route} ${styles.revealsOnScroll} tech`}>
                                    {chapter.route.join(" · ")}
                                </p>
                            )}

                            {chapter.builds && (
                                <ul role="list" className={styles.builds}>
                                    {chapter.builds.map((build) => (
                                        <li key={build.name} className={`${styles.build} ${styles.revealsOnScroll}`}>
                                            <h4 className={styles.buildName}>{build.name}</h4>
                                            <p className={`${styles.buildKind} tech`}>{build.kind}</p>
                                            <p className={`${styles.paragraph} body`}>{build.summary}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {chapter.aside && (
                                <aside className={`${styles.aside} ${styles.revealsOnScroll}`}>
                                    <p className={`${styles.asideLabel} tech`}>{chapter.aside.label}</p>
                                    <p className={`${styles.asideText} body`}>{chapter.aside.text}</p>
                                </aside>
                            )}
                        </li>
                    ))}
                </ol>
            </div>

            <div className={`${styles.closing} ${styles.revealsOnScroll}`}>
                <p className={styles.closingPrompt}>{closingPrompt}</p>
                <a href={`mailto:${email}`} className={styles.closingLink}>
                    {closingLinkText}
                    <IconArrowNarrowRight stroke={2} className={styles.closingArrow} aria-hidden="true" />
                </a>
            </div>
        </div>
    );
}
