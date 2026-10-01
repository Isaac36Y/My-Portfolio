import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import LogoBackdrop from "@/components/experience/LogoBackdrop";
import { introduction } from "@/content/introduction";
import { travelTypesFor } from "@/lib/motion/routeTravel";
import styles from "./Introduction.module.scss";

export default function Introduction() {
    const { greeting, surname, mission, portraitAlt, paths } = introduction;

    return (
        <section className={styles.introduction} aria-labelledby="introduction-title" data-travel-layer="foreground">
            <LogoBackdrop src="/images/mark-outline-1-2048.png" width={2048} height={1388} travelLeavesOn={["left", "right"]} />
            <div className={styles.copy}>
                <h2 id="introduction-title" tabIndex={-1} className={styles.title}>
                    <span>{greeting}</span> <span className={styles.surname}>{surname}</span>
                </h2>
                <p className={`${styles.mission} body`}>{mission}</p>
            </div>

            <div className={styles.figure}>
                <Image
                    src="/images/isaacStanding.png"
                    alt={portraitAlt}
                    width={1024}
                    height={1536}
                    sizes="(min-width: 1252px) 85vh, 50vh"
                    loading="eager"
                    className={styles.portrait}
                    data-carried="portrait"
                />
                <ul role="list" className={styles.paths}>
                    {paths.map((path, order) => (
                        <li
                            key={path.id}
                            className={styles.path}
                            data-path={path.id}
                            style={{ "--path-order": order } as CSSProperties}
                        >
                            <span className={styles.pathLine} aria-hidden="true">
                                <span className={styles.lineRun} />
                                <span className={styles.lineDrop} />
                            </span>
                            <Link
                                href={path.href}
                                transitionTypes={path.travel && travelTypesFor(path.travel)}
                                className={styles.pathLink}
                            >
                                <span className={styles.pathWash} aria-hidden="true" />
                                <span className={styles.pathTitle}>{path.title}</span>
                                <span className={`${styles.pathDescription} body`}>{path.description}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
