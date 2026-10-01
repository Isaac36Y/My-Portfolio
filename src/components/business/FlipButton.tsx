"use client";

import { useContext, useEffect, useRef, type CSSProperties } from "react";
import { IconRotate360 } from "@tabler/icons-react";
import { CardFaceContext, useFlipCard } from "./FlipCard";
import styles from "./FlipCard.module.scss";

type FlipButtonProps = {
    text: string;
    toBackLabel: string;
    toFrontLabel: string;
    className?: string;
    style?: CSSProperties;
};

export default function FlipButton({ text, toBackLabel, toFrontLabel, className = "", style }: FlipButtonProps) {
    const { visibleSide, flipCount, flipCard } = useFlipCard();
    const face = useContext(CardFaceContext);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // The button that was pressed sits on the face that just went inert, so focus follows the card over.
    useEffect(() => {
        const isNewlyVisibleFace = flipCount > 0 && face === visibleSide;
        if (isNewlyVisibleFace) buttonRef.current?.focus({ preventScroll: true });
    }, [flipCount, face, visibleSide]);

    return (
        <button
            ref={buttonRef}
            type="button"
            className={`${styles.flipButton} tech ${className}`}
            style={style}
            aria-label={face === "front" ? toBackLabel : toFrontLabel}
            onClick={flipCard}
        >
            <IconRotate360 stroke={1.75} className={styles.flipIcon} aria-hidden="true" />
            {text}
        </button>
    );
}
