"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { introPhase } from "./intro";
import styles from "./HeroGrid.module.scss";

// Steps out from the centered cell on each axis. Enough to cover a 4K screen at the largest cell size and a
// tall phone at the smallest; lines past the hero's edges are clipped.
const COLUMN_REACH = 20;
const ROW_REACH = 15;

function stepsOut(reach: number): number[] {
    return Array.from({ length: reach * 2 + 1 }, (_, index) => index - reach);
}

const columnSteps = stepsOut(COLUMN_REACH);
const rowSteps = stepsOut(ROW_REACH);

// The hero's grid, drawn as one element per line rather than a repeating background, so the home intro
// can lay each line down on its own. Rendered on the server; JavaScript only measures how many cells fit
// on screen, so the intro's top-left-to-bottom-right wave spans exactly the visible lines.
export default function HeroGrid() {
    const gridRef = useRef<HTMLDivElement>(null);
    const probeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const grid = gridRef.current;
        const probe = probeRef.current;
        if (introPhase() !== "hold" || !grid || !probe) return;

        const cellPx = probe.getBoundingClientRect().width;
        if (cellPx === 0) return;

        const { width, height } = grid.getBoundingClientRect();
        grid.style.setProperty("--column-reach", String(Math.ceil(width / 2 / cellPx)));
        grid.style.setProperty("--row-reach", String(Math.ceil(height / 2 / cellPx)));
    }, []);

    return (
        <div ref={gridRef} className={styles.grid} aria-hidden="true">
            <span ref={probeRef} className={styles.cellProbe} />
            {columnSteps.map((step) => (
                <span key={`column${step}`} className={styles.column} style={{ "--step": step } as CSSProperties} />
            ))}
            {rowSteps.map((step) => (
                <span key={`row${step}`} className={styles.row} style={{ "--step": step } as CSSProperties} />
            ))}
        </div>
    );
}
