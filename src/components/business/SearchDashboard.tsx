import type { CSSProperties } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { seo, type DashboardTile } from "@/content/seo";
import styles from "./SearchDashboard.module.scss";

// Shapes only, never numbers: the dashboard shows what gets tracked, and every curve climbs the way
// a healthy month-over-month trend does.
const lineSeries: Record<"bookings" | "traffic" | "impressions", number[]> = {
    bookings: [0.08, 0.12, 0.1, 0.17, 0.2, 0.19, 0.28, 0.33, 0.31, 0.42, 0.5, 0.55, 0.66, 0.78, 0.92],
    traffic: [0.15, 0.18, 0.16, 0.24, 0.27, 0.25, 0.33, 0.4, 0.38, 0.47, 0.55, 0.6, 0.7, 0.8, 0.9],
    impressions: [0.2, 0.22, 0.27, 0.25, 0.32, 0.38, 0.36, 0.45, 0.5, 0.56, 0.6, 0.68, 0.74, 0.82, 0.94],
};

const barSeries = [0.18, 0.24, 0.22, 0.3, 0.35, 0.33, 0.44, 0.5, 0.57, 0.66, 0.78, 0.95];

const LINE_WIDTH = 320;
const LINE_HEIGHT = 140;
const LINE_TOP = 14;
const LINE_BOTTOM = 132;

type Point = { x: number; y: number };

function toPoints(values: number[]): Point[] {
    const step = LINE_WIDTH / (values.length - 1);
    return values.map((value, index) => ({
        x: index * step,
        y: LINE_BOTTOM - value * (LINE_BOTTOM - LINE_TOP),
    }));
}

// Catmull-Rom through every point, written as cubic Béziers so the line passes exactly through the data.
function smoothLine(points: Point[]) {
    const round = (value: number) => Math.round(value * 10) / 10;
    let d = `M ${round(points[0].x)} ${round(points[0].y)}`;
    for (let index = 0; index < points.length - 1; index++) {
        const before = points[index - 1] ?? points[index];
        const from = points[index];
        const to = points[index + 1];
        const after = points[index + 2] ?? to;
        const c1 = { x: from.x + (to.x - before.x) / 6, y: from.y + (to.y - before.y) / 6 };
        const c2 = { x: to.x - (after.x - from.x) / 6, y: to.y - (after.y - from.y) / 6 };
        d += ` C ${round(c1.x)} ${round(c1.y)}, ${round(c2.x)} ${round(c2.y)}, ${round(to.x)} ${round(to.y)}`;
    }
    return d;
}

function GridLines({ width, height, rows = 4 }: { width: number; height: number; rows?: number }) {
    return (
        <g className={styles.grid}>
            {Array.from({ length: rows }, (_, row) => {
                const y = (height / (rows + 1)) * (row + 1);
                return <line key={row} x1="0" x2={width} y1={y} y2={y} vectorEffect="non-scaling-stroke" />;
            })}
        </g>
    );
}

// Stretched to whatever height its tile allows, so the stroke and the end dot are kept out of the stretch:
// the stroke stays a fixed width and the dot is placed in the page, not in the drawing.
function LineChart({ id, values }: { id: string; values: number[] }) {
    const points = toPoints(values);
    const line = smoothLine(points);
    const last = points[points.length - 1];
    const area = `${line} L ${LINE_WIDTH} ${LINE_HEIGHT} L 0 ${LINE_HEIGHT} Z`;
    const fillId = `seo-fill-${id}`;
    const endPosition = {
        left: `${(last.x / LINE_WIDTH) * 100}%`,
        top: `${(last.y / LINE_HEIGHT) * 100}%`,
    } as CSSProperties;

    return (
        <div className={styles.lineChart}>
            <svg
                viewBox={`0 0 ${LINE_WIDTH} ${LINE_HEIGHT}`}
                preserveAspectRatio="none"
                className={styles.lineArt}
                aria-hidden="true"
                focusable="false"
            >
                <defs>
                    <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" className={styles.fillTop} />
                        <stop offset="100%" className={styles.fillBottom} />
                    </linearGradient>
                </defs>
                <GridLines width={LINE_WIDTH} height={LINE_HEIGHT} />
                <g className={styles.trace}>
                    <path d={area} fill={`url(#${fillId})`} />
                    <path d={line} vectorEffect="non-scaling-stroke" className={styles.line} />
                </g>
            </svg>
            <span className={styles.endDot} style={endPosition} aria-hidden="true" />
        </div>
    );
}

function BarChart() {
    const width = 240;
    const height = 140;
    const slot = width / barSeries.length;
    const barWidth = slot * 0.56;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className={styles.barChart}
            aria-hidden="true"
            focusable="false"
        >
            <GridLines width={width} height={height} />
            {barSeries.map((value, order) => {
                const barHeight = value * (height - 8);
                return (
                    <rect
                        key={order}
                        x={order * slot + (slot - barWidth) / 2}
                        y={height - barHeight}
                        width={barWidth}
                        height={barHeight}
                        rx="1.5"
                        className={styles.bar}
                        style={{ "--bar-order": order, "--bar-strength": 0.35 + value * 0.65 } as CSSProperties}
                    />
                );
            })}
        </svg>
    );
}

function MapPin() {
    return (
        <svg viewBox="0 0 240 170" className={styles.pinChart} aria-hidden="true" focusable="false">
            <g className={styles.rings}>
                <ellipse cx="120" cy="128" rx="108" ry="34" className={styles.ring} style={{ "--ring-order": 2 } as CSSProperties} />
                <ellipse cx="120" cy="128" rx="74" ry="23" className={styles.ring} style={{ "--ring-order": 1 } as CSSProperties} />
                <ellipse cx="120" cy="128" rx="40" ry="12" className={styles.ring} style={{ "--ring-order": 0 } as CSSProperties} />
                <ellipse cx="120" cy="128" rx="40" ry="12" className={styles.pulse} />
            </g>
            <g className={styles.pin}>
                <path
                    d="M120 40 C 102 40 89 53 89 70 C 89 92 120 126 120 126 C 120 126 151 92 151 70 C 151 53 138 40 120 40 Z"
                    className={styles.pinBody}
                />
                <circle cx="120" cy="70" r="11" className={styles.pinHole} />
            </g>
        </svg>
    );
}

// A customer asks an AI assistant, and the answer it gives back names the business.
function ChatAnswer() {
    return (
        <svg viewBox="0 0 240 170" className={styles.chatChart} aria-hidden="true" focusable="false">
            <g className={styles.ask}>
                <rect x="104" y="10" width="126" height="32" rx="16" className={styles.askBubble} />
                <rect x="120" y="23" width="80" height="6" rx="3" className={styles.textLine} />
            </g>
            <g className={styles.reply}>
                <rect x="10" y="56" width="200" height="104" rx="16" className={styles.replyBubble} />
                <rect x="26" y="74" width="150" height="6" rx="3" className={styles.textLine} />
                <g className={styles.named}>
                    <rect x="22" y="92" width="150" height="22" rx="11" className={styles.namedChip} />
                    <circle cx="36" cy="103" r="5" className={styles.namedDot} />
                    <rect x="48" y="100" width="108" height="6" rx="3" className={styles.namedLine} />
                </g>
                <rect x="26" y="126" width="168" height="6" rx="3" className={styles.textLine} />
                <rect x="26" y="142" width="110" height="6" rx="3" className={styles.textLine} />
            </g>
        </svg>
    );
}

function TileChart({ tile }: { tile: DashboardTile }) {
    switch (tile.kind) {
        case "bars":
            return <BarChart />;
        case "pin":
            return <MapPin />;
        case "chat":
            return <ChatAnswer />;
        case "line":
            return <LineChart id={tile.id} values={lineSeries[tile.id as keyof typeof lineSeries]} />;
    }
}

function Tile({ tile }: { tile: DashboardTile }) {
    return (
        <div className={`${styles.tile} ${styles[tile.id] ?? ""}`} data-tier={tile.tier}>
            <div className={styles.tileHead}>
                <p className={`${styles.tileLabel} tech`}>{tile.label}</p>
                <IconArrowUpRight stroke={2} className={styles.tileTrend} aria-hidden="true" />
            </div>
            <div className={styles.tileChart}>
                <TileChart tile={tile} />
            </div>
        </div>
    );
}

export default function SearchDashboard() {
    const { dashboard } = seo;
    const growth = dashboard.tiles.filter((tile) => tile.tier === "growth");
    const signals = dashboard.tiles.filter((tile) => tile.tier === "signal");

    return (
        <figure className={styles.figure} aria-labelledby="seo-dashboard-caption">
            <div className={styles.stage}>
                <div className={styles.panel}>
                    <div className={styles.group}>
                        <p className={`${styles.tierLabel} tech`}>{dashboard.tierLabels.growth}</p>
                        <ul role="list" className={styles.growthGrid} aria-label={dashboard.tierLabels.growth}>
                            {growth.map((tile) => (
                                <li key={tile.id} className={styles.cell} style={{ gridArea: tile.id }}>
                                    <Tile tile={tile} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.group}>
                        <p className={`${styles.tierLabel} tech`}>{dashboard.tierLabels.signal}</p>
                        <ul role="list" className={styles.signalGrid} aria-label={dashboard.tierLabels.signal}>
                            {signals.map((tile) => (
                                <li key={tile.id} className={styles.cell} style={{ gridArea: tile.id }}>
                                    <Tile tile={tile} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <figcaption id="seo-dashboard-caption" className={`${styles.caption} body`}>
                <span className={styles.visuallyHidden}>{dashboard.label}: </span>
                {dashboard.caption}
            </figcaption>
        </figure>
    );
}
