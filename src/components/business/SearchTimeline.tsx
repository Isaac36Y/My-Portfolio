"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { seo, type TimelinePath } from "@/content/seo";
import styles from "./SearchTimeline.module.scss";

const CHART_WIDTH = 800;
const CHART_HEIGHT = 240;

// Momentum, not a forecast: no axis values, only the shape of the climb. Starting from scratch begins at
// the floor and steepens as the work compounds; existing SEO starts higher and climbs sooner.
const curves: Record<TimelinePath["id"], { line: string; end: { x: number; y: number } }> = {
    scratch: {
        line: "M 0 222 C 120 220, 200 212, 280 196 S 440 152, 520 120 S 700 42, 800 22",
        end: { x: 800, y: 22 },
    },
    existing: {
        line: "M 0 150 C 100 142, 200 128, 300 110 S 480 76, 560 60 S 720 28, 800 14",
        end: { x: 800, y: 14 },
    },
};

const PHASE_DIVIDERS = [200, 400, 600];

export default function SearchTimeline() {
    const { timeline } = seo;
    const [activeId, setActiveId] = useState<TimelinePath["id"]>(timeline.paths[0].id);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const rootRef = useRef<HTMLDivElement>(null);
    // Drawn finished on the server. Once the page is live, the first draw waits until the chart is on screen.
    const [arrival, setArrival] = useState<"static" | "waiting" | "seen">("static");

    useEffect(() => {
        const root = rootRef.current;
        if (!root || typeof IntersectionObserver === "undefined") return;
        setArrival("waiting");
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setArrival("seen");
                observer.disconnect();
            },
            { threshold: 0.3 },
        );
        observer.observe(root);
        return () => observer.disconnect();
    }, []);

    const active = timeline.paths.find((path) => path.id === activeId) ?? timeline.paths[0];
    const other = timeline.paths.find((path) => path.id !== activeId) ?? timeline.paths[1];

    // Arrow keys move between the two choices, as in any tab list.
    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
        const count = timeline.paths.length;
        let next: number | null = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % count;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + count) % count;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = count - 1;
        if (next === null) return;
        event.preventDefault();
        setActiveId(timeline.paths[next].id);
        tabRefs.current[next]?.focus();
    }

    return (
        <div ref={rootRef} className={styles.timeline} data-arrival={arrival}>
            <div className={styles.picker}>
                <p id="seo-timeline-picker" className={`${styles.pickerLabel} tech`}>
                    {timeline.pickerLabel}
                </p>
                <div role="tablist" aria-labelledby="seo-timeline-picker" className={styles.tabs}>
                    {timeline.paths.map((path, index) => {
                        const selected = path.id === activeId;
                        return (
                            <button
                                key={path.id}
                                ref={(element) => {
                                    tabRefs.current[index] = element;
                                }}
                                type="button"
                                role="tab"
                                id={`seo-timeline-tab-${path.id}`}
                                aria-selected={selected}
                                aria-controls="seo-timeline-panel"
                                tabIndex={selected ? 0 : -1}
                                onClick={() => setActiveId(path.id)}
                                onKeyDown={(event) => handleKeyDown(event, index)}
                                className={styles.tab}
                            >
                                {path.label}
                            </button>
                        );
                    })}
                    <span
                        className={styles.tabThumb}
                        style={{ "--thumb-index": timeline.paths.indexOf(active) } as CSSProperties}
                        aria-hidden="true"
                    />
                </div>
            </div>

            <div
                role="tabpanel"
                id="seo-timeline-panel"
                aria-labelledby={`seo-timeline-tab-${active.id}`}
                className={styles.panel}
            >
                <p key={`summary-${active.id}`} className={`${styles.summary} body`}>
                    {active.summary}
                </p>

                <figure className={styles.chart}>
                    <svg
                        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                        className={styles.chartArt}
                        role="img"
                        aria-label={`${timeline.chartLabel}: ${active.label.toLowerCase()}, rising through ${active.phases.map((phase) => phase.name).join(", ")}.`}
                    >
                        <defs>
                            <linearGradient id="seo-timeline-fill" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" className={styles.fillTop} />
                                <stop offset="100%" className={styles.fillBottom} />
                            </linearGradient>
                        </defs>

                        {PHASE_DIVIDERS.map((x) => (
                            <line key={x} x1={x} x2={x} y1="0" y2={CHART_HEIGHT} className={styles.divider} />
                        ))}
                        <line x1="0" x2={CHART_WIDTH} y1={CHART_HEIGHT - 1} y2={CHART_HEIGHT - 1} className={styles.baseline} />

                        <path d={curves[other.id].line} className={styles.ghost} />

                        <g key={active.id}>
                            <path
                                d={`${curves[active.id].line} L ${CHART_WIDTH} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`}
                                fill="url(#seo-timeline-fill)"
                                className={styles.area}
                            />
                            <path d={curves[active.id].line} pathLength={1} className={styles.curve} />
                            <circle
                                cx={curves[active.id].end.x}
                                cy={curves[active.id].end.y}
                                r="8"
                                className={styles.endDot}
                            />
                        </g>
                    </svg>
                    <figcaption className={`${styles.chartCaption} tech`}>{timeline.chartLabel}</figcaption>
                </figure>

                <ol key={active.id} role="list" className={styles.phases}>
                    {active.phases.map((phase, order) => (
                        <li
                            key={phase.id}
                            className={styles.phase}
                            style={{ "--phase-order": order } as CSSProperties}
                        >
                            <p className={`${styles.phaseWhen} tech`}>{phase.when}</p>
                            <h3 className={styles.phaseName}>{phase.name}</h3>
                            <p className={`${styles.phaseBody} body`}>{phase.body}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
