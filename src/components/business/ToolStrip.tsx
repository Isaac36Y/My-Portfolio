"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { caseStudyPath, customTools } from "@/content/tools";
import { TOOL_SWITCH_TYPE } from "@/lib/motion/routeTravel";
import styles from "./ToolStrip.module.scss";

// The dashboard's own URL opens the first tool, so no selected segment means the first tool is open.
export default function ToolStrip({ className }: { className?: string }) {
    const { tools, stripLabel, activeLabel } = customTools;
    const selectedSlug = useSelectedLayoutSegment() ?? tools[0].slug;

    return (
        <nav className={`${styles.strip} ${className ?? ""}`} aria-label={stripLabel}>
            <ol role="list" className={styles.cards}>
                {tools.map((tool) => {
                    const isOpen = tool.slug === selectedSlug;

                    return (
                        <li key={tool.slug} className={`${styles.card} ${isOpen ? styles.open : ""}`}>
                            <div className={styles.thumbnail}>
                                <Image
                                    src={tool.thumbnail.image}
                                    alt={tool.thumbnail.alt}
                                    placeholder="blur"
                                    sizes="(min-width: 1252px) 22vw, (min-width: 768px) 45vw, 90vw"
                                    className={styles.thumbnailImage}
                                    style={{ objectPosition: tool.thumbnail.focus }}
                                />
                            </div>
                            <p className={`${styles.field} tech`}>{tool.field}</p>
                            <h2 className={styles.name}>
                                <Link
                                    href={caseStudyPath(tool.slug)}
                                    transitionTypes={[TOOL_SWITCH_TYPE]}
                                    aria-current={isOpen ? "page" : undefined}
                                    className={styles.openLink}
                                >
                                    {tool.name}
                                </Link>
                            </h2>
                            <p className={`${styles.summary} body`}>{tool.summary}</p>
                            <p className={`${styles.status} tech`}>
                                {isOpen ? activeLabel : tool.status}
                            </p>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
