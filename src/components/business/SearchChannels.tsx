import type { CSSProperties, ComponentType } from "react";
import {
    IconBrandGoogle,
    IconBuildingStore,
    IconMapPin,
    IconMessage2,
    IconMessageChatbot,
    IconSparkles,
    type IconProps,
} from "@tabler/icons-react";
import { seo, type SearchChannel } from "@/content/seo";
import styles from "./SearchChannels.module.scss";

const channelIcons: Record<SearchChannel["id"], ComponentType<IconProps>> = {
    search: IconBrandGoogle,
    maps: IconMapPin,
    overviews: IconSparkles,
    assistants: IconMessageChatbot,
};

// The wires are drawn in a 1000-wide box that scales evenly with the page, so their strokes never stretch.
// The channel columns sit edge to edge with no gap, which puts each column's center at an exact eighth.
const WIRE_WIDTH = 1000;
const WIRE_HEIGHT = 120;

function columnCenter(order: number, count: number) {
    return (WIRE_WIDTH / count) * (order + 0.5);
}

function fanOut(order: number, count: number) {
    const x = columnCenter(order, count);
    const mid = WIRE_HEIGHT / 2;
    return `M ${WIRE_WIDTH / 2} 0 C ${WIRE_WIDTH / 2} ${mid}, ${x} ${mid}, ${x} ${WIRE_HEIGHT}`;
}

function fanIn(order: number, count: number) {
    const x = columnCenter(order, count);
    const mid = WIRE_HEIGHT / 2;
    return `M ${x} 0 C ${x} ${mid}, ${WIRE_WIDTH / 2} ${mid}, ${WIRE_WIDTH / 2} ${WIRE_HEIGHT}`;
}

function Wires({ shape, className }: { shape: typeof fanOut; className: string }) {
    const count = seo.found.channels.length;

    return (
        <svg
            viewBox={`0 0 ${WIRE_WIDTH} ${WIRE_HEIGHT}`}
            className={`${styles.wires} ${className}`}
            aria-hidden="true"
            focusable="false"
        >
            {seo.found.channels.map((channel, order) => (
                <g key={channel.id} style={{ "--wire-order": order } as CSSProperties}>
                    <path d={shape(order, count)} pathLength={1} className={styles.wire} />
                    <path d={shape(order, count)} pathLength={1} className={styles.signal} />
                </g>
            ))}
        </svg>
    );
}

export default function SearchChannels() {
    const { found } = seo;

    return (
        <figure className={styles.diagram} role="group" aria-label={found.diagramLabel}>
            <div className={styles.question}>
                <p className={`${styles.nodeLabel} tech`}>{found.questionLabel}</p>
                <p className={styles.bubble}>
                    <IconMessage2 stroke={1.75} className={styles.bubbleIcon} aria-hidden="true" />
                    {found.question}
                </p>
            </div>

            <Wires shape={fanOut} className={styles.wiresOut} />
            <span className={styles.stem} aria-hidden="true" />

            <ul role="list" className={styles.channels}>
                {found.channels.map((channel, order) => {
                    const Icon = channelIcons[channel.id];
                    return (
                        <li
                            key={channel.id}
                            className={styles.channel}
                            style={{ "--channel-order": order } as CSSProperties}
                        >
                            <div className={styles.card}>
                                <div className={styles.cardTop}>
                                    <span className={styles.iconWell} aria-hidden="true">
                                        <Icon stroke={1.75} className={styles.icon} />
                                    </span>
                                    <span className={`${styles.discipline} tech`}>{channel.discipline}</span>
                                </div>
                                <h3 className={styles.channelName}>{channel.name}</h3>
                                <p className={`${styles.summary} body`}>{channel.summary}</p>
                                <p className={`${styles.readsLabel} tech`}>{channel.readsLabel}</p>
                                <ul role="list" className={styles.reads}>
                                    {channel.reads.map((read) => (
                                        <li key={read} className={`${styles.read} body`}>
                                            {read}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <Wires shape={fanIn} className={styles.wiresIn} />
            <span className={styles.stem} aria-hidden="true" />

            <div className={styles.answer}>
                <span className={styles.answerIcon} aria-hidden="true">
                    <IconBuildingStore stroke={1.75} />
                </span>
                <p className={styles.answerName}>{found.answer}</p>
                <p className={`${styles.nodeLabel} tech`}>{found.answerLabel}</p>
            </div>
        </figure>
    );
}
