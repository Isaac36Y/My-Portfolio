"use client";

import { createContext, useContext, useRef, useState, type PointerEvent, type ReactNode } from "react";
import styles from "./FlipCard.module.scss";

export type CardSide = "front" | "back";

type FlipCardState = {
    visibleSide: CardSide;
    flipCount: number;
    flipCard: () => void;
};

const FlipCardContext = createContext<FlipCardState | null>(null);
export const CardFaceContext = createContext<CardSide>("front");

export function useFlipCard() {
    const flipCardState = useContext(FlipCardContext);
    if (!flipCardState) throw new Error("useFlipCard must be used inside a FlipCard");
    return flipCardState;
}

type FlipCardProps = {
    className: string;
    label: string;
    front: ReactNode;
    back: ReactNode;
};

// The pointer handlers only report where the pointer sits over the card, from -1 to 1 on each axis.
// The tilt, glare, and shadow are all derived from those two numbers in FlipCard.module.scss.
export default function FlipCard({ className, label, front, back }: FlipCardProps) {
    const [visibleSide, setVisibleSide] = useState<CardSide>("front");
    const [flipCount, setFlipCount] = useState(0);
    const pendingFrame = useRef(0);

    function flipCard() {
        setVisibleSide((side) => (side === "front" ? "back" : "front"));
        setFlipCount((count) => count + 1);
    }

    function followPointer(event: PointerEvent<HTMLElement>) {
        if (event.pointerType !== "mouse") return;

        const stage = event.currentTarget;
        const { left, top, width, height } = stage.getBoundingClientRect();
        const pointerX = ((event.clientX - left) / width) * 2 - 1;
        const pointerY = ((event.clientY - top) / height) * 2 - 1;

        cancelAnimationFrame(pendingFrame.current);
        pendingFrame.current = requestAnimationFrame(() => {
            stage.style.setProperty("--pointer-x", pointerX.toFixed(3));
            stage.style.setProperty("--pointer-y", pointerY.toFixed(3));
        });
    }

    function settleCard(event: PointerEvent<HTMLElement>) {
        const stage = event.currentTarget;
        cancelAnimationFrame(pendingFrame.current);
        stage.style.removeProperty("--pointer-x");
        stage.style.removeProperty("--pointer-y");
    }

    return (
        <FlipCardContext value={{ visibleSide, flipCount, flipCard }}>
            <aside className={className} aria-label={label}>
                <div
                    className={styles.stage}
                    data-side={visibleSide}
                    onPointerMove={followPointer}
                    onPointerLeave={settleCard}
                >
                    <span className={styles.shadow} aria-hidden="true" />
                    <div className={styles.body}>
                        <div className={styles.flipper}>
                            <CardFace side="front" isVisible={visibleSide === "front"}>
                                {front}
                            </CardFace>
                            <CardFace side="back" isVisible={visibleSide === "back"}>
                                {back}
                            </CardFace>
                        </div>
                    </div>
                </div>
            </aside>
        </FlipCardContext>
    );
}

function CardFace({ side, isVisible, children }: { side: CardSide; isVisible: boolean; children: ReactNode }) {
    return (
        <CardFaceContext value={side}>
            <div className={`${styles.face} ${styles[side]}`} inert={!isVisible}>
                <div className={styles.faceContent}>{children}</div>
            </div>
        </CardFaceContext>
    );
}
