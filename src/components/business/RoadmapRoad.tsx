"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./SearchRoadmap.module.scss";

type Geometry = { width: number; height: number; d: string };
type Sample = { length: number; y: number };

// How far down the screen the tip of the road sits while the visitor scrolls: everything above it is lit.
const READING_LINE = 0.6;

// One path through every stop: straight down past each stop, then a bend that leaves and arrives straight
// down, so the joins are smooth. On a phone the stops share a column and the bends fall straight.
function measure(root: HTMLElement): Geometry | null {
    const box = root.getBoundingClientRect();
    const stops = Array.from(root.querySelectorAll<HTMLElement>("[data-road-stop]"));
    const points = stops.flatMap((stop) => {
        const node = stop.querySelector<HTMLElement>("[data-road-node]");
        if (!node) return [];
        const nodeBox = node.getBoundingClientRect();
        return [
            {
                x: nodeBox.left + nodeBox.width / 2 - box.left,
                y: nodeBox.top + nodeBox.height / 2 - box.top,
                bottom: stop.getBoundingClientRect().bottom - box.top,
            },
        ];
    });
    if (points.length < 2) return null;

    const round = (value: number) => Math.round(value * 10) / 10;
    let d = `M ${round(points[0].x)} ${round(points[0].y)}`;
    for (let index = 0; index < points.length - 1; index++) {
        const from = points[index];
        const to = points[index + 1];
        const drop = to.y - from.bottom;
        d += ` L ${round(from.x)} ${round(from.bottom)}`;
        d += ` C ${round(from.x)} ${round(from.bottom + drop * 0.55)}, ${round(to.x)} ${round(to.y - drop * 0.45)}, ${round(to.x)} ${round(to.y)}`;
    }
    return { width: box.width, height: box.height, d };
}

export default function RoadmapRoad({ children }: { children: ReactNode }) {
    const rootRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<SVGPathElement>(null);
    const [geometry, setGeometry] = useState<Geometry | null>(null);

    // Re-measured whenever the layout can change: first paint, resizes, and late-loading fonts.
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const remeasure = () => setGeometry(measure(root));
        remeasure();
        const observer = new ResizeObserver(remeasure);
        observer.observe(root);
        document.fonts?.ready.then(remeasure);
        return () => observer.disconnect();
    }, []);

    // The road only ever moves down: the path never rises, so the drawn length follows the reading line exactly.
    useEffect(() => {
        const root = rootRef.current;
        const fill = fillRef.current;
        if (!root || !fill || !geometry) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const total = fill.getTotalLength();
        const count = Math.min(2000, Math.max(200, Math.ceil(total / 4)));
        const samples: Sample[] = Array.from({ length: count + 1 }, (_, index) => {
            const length = (total * index) / count;
            return { length, y: fill.getPointAtLength(length).y };
        });
        const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-road-node]"));
        const nodeYs = nodes.map((node) => {
            const nodeBox = node.getBoundingClientRect();
            return nodeBox.top + nodeBox.height / 2 - root.getBoundingClientRect().top;
        });

        function drawnLengthAt(tipY: number) {
            if (tipY <= samples[0].y) return 0;
            if (tipY >= samples[samples.length - 1].y) return total;
            let low = 0;
            let high = samples.length - 1;
            while (high - low > 1) {
                const middle = (low + high) >> 1;
                if (samples[middle].y <= tipY) low = middle;
                else high = middle;
            }
            const before = samples[low];
            const after = samples[high];
            const span = after.y - before.y;
            const progress = span > 0 ? (tipY - before.y) / span : 1;
            return before.length + progress * (after.length - before.length);
        }

        let frame = 0;
        const update = () => {
            frame = 0;
            const tipY = window.innerHeight * READING_LINE - root.getBoundingClientRect().top;
            fill.style.strokeDashoffset = String(total - drawnLengthAt(tipY));
            nodes.forEach((node, index) => node.toggleAttribute("data-reached", tipY >= nodeYs[index]));
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        fill.style.strokeDasharray = String(total);
        root.dataset.road = "live";
        update();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [geometry]);

    return (
        <div ref={rootRef} className={styles.road}>
            {geometry && (
                <svg
                    width={geometry.width}
                    height={geometry.height}
                    viewBox={`0 0 ${geometry.width} ${geometry.height}`}
                    className={styles.roadArt}
                    aria-hidden="true"
                    focusable="false"
                >
                    <path d={geometry.d} className={styles.roadTrack} />
                    <path ref={fillRef} d={geometry.d} className={styles.roadFill} />
                </svg>
            )}
            {children}
        </div>
    );
}
