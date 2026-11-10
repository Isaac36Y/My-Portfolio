"use client";

import { useEffect, useRef } from "react";
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
    const cardsRef = useRef<HTMLOListElement>(null);

    // On a phone the cards are a sideways slider, so bring the open card into view when it changes. Only the
    // slider scrolls, never the page, and wider layouts never overflow sideways so this does nothing there.
    useEffect(() => {
        const cards = cardsRef.current;
        const openCard = cards?.querySelector<HTMLElement>("[data-open]");
        if (!cards || !openCard || cards.scrollWidth <= cards.clientWidth) return;

        const gutter = parseFloat(getComputedStyle(cards).scrollPaddingInlineStart) || 0;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const left = cards.scrollLeft + openCard.getBoundingClientRect().left - cards.getBoundingClientRect().left;
        cards.scrollTo({ left: left - gutter, behavior: reducedMotion ? "auto" : "smooth" });
    }, [selectedSlug]);

    return (
        <nav className={`${styles.strip} ${className ?? ""}`} aria-label={stripLabel}>
            <ol ref={cardsRef} role="list" className={styles.cards}>
                {tools.map((tool) => {
                    const isOpen = tool.slug === selectedSlug;

                    return (
                        <li
                            key={tool.slug}
                            data-open={isOpen || undefined}
                            className={`${styles.card} ${isOpen ? styles.open : ""}`}
                        >
                            <div className={styles.thumbnail}>
                                <Image
                                    src={tool.thumbnail.image}
                                    alt={tool.thumbnail.alt}
                                    placeholder="blur"
                                    sizes="(min-width: 1252px) 22vw, (min-width: 768px) 45vw, 68vw"
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
