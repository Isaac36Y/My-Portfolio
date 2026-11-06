import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight, IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import StageReturnLink from "@/components/experience/StageReturnLink";
import { websites } from "@/content/websites";
import { travelTypesFor } from "@/lib/motion/routeTravel";
import styles from "./WebsiteGallery.module.scss";

export default function WebsiteGallery() {
    const { title, myWorkLabel, stageReturnLabels, conceptLabel, newTabNotice, projects } = websites;

    return (
        <section className={styles.gallery} aria-labelledby="websites-title" data-travel-layer="foreground">
            <header className={styles.header}>
                <div className={styles.wayfinding}>
                    <Link
                        href="/my-work"
                        transitionTypes={travelTypesFor({ direction: "down", staysOffStage: true })}
                        className={styles.wayLink}
                    >
                        <IconChevronDown stroke={2} className={styles.myWorkArrow} aria-hidden="true" />
                        <span className={`${styles.wayLabel} tech`}>{myWorkLabel}</span>
                    </Link>
                    <StageReturnLink
                        labelByScene={stageReturnLabels}
                        travel={{ direction: "right" }}
                        className={styles.wayLink}
                        labelClassName={`${styles.wayLabel} tech`}
                        arrow={<IconChevronRight stroke={2} className={styles.stageArrow} aria-hidden="true" />}
                    />
                </div>
                <h1 id="websites-title" tabIndex={-1} className={styles.title}>
                    {title}
                </h1>
            </header>

            <ol role="list" className={styles.projects}>
                {projects.map((project) => (
                    <li key={project.id} className={styles.project}>
                        <div className={styles.thumbnail}>
                            {project.thumbnail && (
                                <Image
                                    src={project.thumbnail.image}
                                    alt={project.thumbnail.alt}
                                    placeholder="blur"
                                    sizes="(min-width: 1252px) 30vw, (min-width: 768px) 50vw, 100vw"
                                    className={styles.thumbnailImage}
                                />
                            )}
                        </div>

                        <p className={`${styles.pageType} tech`}>
                            {project.pageType}
                            {project.isConcept && <span className={styles.conceptTag}>{conceptLabel}</span>}
                        </p>
                        <h2 className={styles.business}>{project.business}</h2>
                        <p className={`${styles.reflection} body`}>{project.reflection}</p>
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className={`${styles.visitLink} tech`}
                            >
                                {new URL(project.url).host}
                                <span className={styles.visuallyHidden}> {newTabNotice}</span>
                                <IconArrowUpRight stroke={2} className={styles.visitArrow} aria-hidden="true" />
                            </a>
                        )}
                    </li>
                ))}
            </ol>
        </section>
    );
}
