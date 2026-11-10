import type { CSSProperties } from "react";
import { seo } from "@/content/seo";
import RoadmapRoad from "./RoadmapRoad";
import styles from "./SearchRoadmap.module.scss";

function formatOrder(order: number) {
    return String(order + 1).padStart(2, "0");
}

// The stops alternate sides of the page, so the road winds back and forth between them.
type Side = "left" | "right";

function sideFor(order: number): Side {
    return order % 2 === 0 ? "left" : "right";
}

// ---------- Monthly dial ----------

const DIAL = 300;
const CENTER = DIAL / 2;
const RING = 104;
const TICKS = 60;
const TAIL_DEGREES = 70;

function polar(degrees: number, radius: number) {
    const radians = ((degrees - 90) * Math.PI) / 180;
    return { x: CENTER + Math.cos(radians) * radius, y: CENTER + Math.sin(radians) * radius };
}

function percent(value: number) {
    return `${(value / DIAL) * 100}%`;
}

// A comet runs clockwise around the ring, and each stage lights up as the comet passes it.
function LoopDial() {
    const { stages, cycleValue, cycleLabel } = seo.process.loop;
    const tailStart = polar(-TAIL_DEGREES, RING);
    const head = polar(0, RING);

    return (
        <div className={styles.dial} role="img" aria-label={`${stages.join(", then ")}, every ${cycleValue} days.`}>
            <svg viewBox={`0 0 ${DIAL} ${DIAL}`} className={styles.dialArt} aria-hidden="true" focusable="false">
                <defs>
                    <radialGradient id="seo-dial-core">
                        <stop offset="0%" className={styles.coreInner} />
                        <stop offset="100%" className={styles.coreOuter} />
                    </radialGradient>
                    <linearGradient
                        id="seo-dial-tail"
                        gradientUnits="userSpaceOnUse"
                        x1={tailStart.x}
                        y1={tailStart.y}
                        x2={head.x}
                        y2={head.y}
                    >
                        <stop offset="0%" className={styles.tailFaded} />
                        <stop offset="100%" className={styles.tailBright} />
                    </linearGradient>
                </defs>

                <circle cx={CENTER} cy={CENTER} r={RING - 26} fill="url(#seo-dial-core)" />
                <circle cx={CENTER} cy={CENTER} r={RING + 34} className={styles.outerRing} />

                <g className={styles.ticks}>
                    {Array.from({ length: TICKS }, (_, index) => {
                        const major = index % 5 === 0;
                        const degrees = (index / TICKS) * 360;
                        const outer = polar(degrees, RING + 24);
                        const inner = polar(degrees, RING + (major ? 13 : 18));
                        return (
                            <line
                                key={index}
                                x1={inner.x}
                                y1={inner.y}
                                x2={outer.x}
                                y2={outer.y}
                                className={major ? styles.tickMajor : styles.tick}
                            />
                        );
                    })}
                </g>

                <circle cx={CENTER} cy={CENTER} r={RING} className={styles.track} />
                <circle cx={CENTER} cy={CENTER} r={RING - 26} className={styles.innerRing} />

                <g className={styles.comet}>
                    <path
                        d={`M ${tailStart.x} ${tailStart.y} A ${RING} ${RING} 0 0 1 ${head.x} ${head.y}`}
                        className={styles.tail}
                    />
                    <circle cx={head.x} cy={head.y} r="6" className={styles.head} />
                </g>
            </svg>

            <p className={styles.cycle}>
                <span className={styles.cycleValue}>{cycleValue}</span>
                <span className={`${styles.cycleLabel} tech`}>{cycleLabel}</span>
            </p>

            {stages.map((stage, order) => {
                const point = polar((order / stages.length) * 360, RING);
                return (
                    <span
                        key={stage}
                        className={`${styles.stage} tech`}
                        style={{ left: percent(point.x), top: percent(point.y), "--stage-order": order } as CSSProperties}
                    >
                        {stage}
                    </span>
                );
            })}
        </div>
    );
}

export default function SearchRoadmap() {
    const { steps, loop } = seo.process;
    const loopSide = sideFor(steps.length);

    return (
        <RoadmapRoad>
            <ol role="list" className={styles.route}>
            {steps.map((step, order) => (
                <li key={step.id} className={styles.step} data-side={sideFor(order)}>
                    <div className={styles.stop} data-road-stop>
                        <span className={`${styles.node} tech`} aria-hidden="true" data-road-node>
                            {formatOrder(order)}
                        </span>
                        <div className={styles.copy}>
                            <p className={`${styles.name} tech`}>{step.name}</p>
                            <h3 className={styles.heading}>{step.heading}</h3>
                            <p className={`${styles.body} body`}>{step.body}</p>
                            <ul role="list" className={styles.details}>
                                {step.details.map((detail) => (
                                    <li key={detail} className={`${styles.detail} tech`}>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </li>
            ))}

            <li className={`${styles.step} ${styles.finale}`} data-side={loopSide}>
                <div className={styles.stop} data-road-stop>
                    <span className={`${styles.node} ${styles.finaleNode}`} aria-hidden="true" data-road-node />
                    <div className={styles.copy}>
                        <p className={`${styles.name} tech`}>{loop.name}</p>
                        <h3 className={styles.heading}>{loop.heading}</h3>
                        <p className={`${styles.body} body`}>{loop.body}</p>
                        <LoopDial />
                    </div>
                </div>
            </li>
            </ol>
        </RoadmapRoad>
    );
}
