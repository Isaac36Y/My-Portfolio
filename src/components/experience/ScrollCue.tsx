"use client";

import { useEffect, useRef, useState } from "react";
import { afterIntro } from "./intro";
import styles from "./ScrollCue.module.scss";

// Once the visitor has left the hero, they know there's more below, so the cue never comes back this session.
const DISMISSED_KEY = "ys-scroll-cue-dismissed";
// "Shortly after": the hero gets a beat to sit still before the cue speaks up.
const SETTLE_MS = 700;

type CuePhase = "waiting" | "shown" | "gone";

function wasDismissed(): boolean {
    try {
        return sessionStorage.getItem(DISMISSED_KEY) !== null;
    } catch {
        return false;
    }
}

function rememberDismissed() {
    try {
        sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
}

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

// Waits for the hero's own entrance (the intro's choreography, or its usual rise when the intro doesn't play).
async function afterHeroSettles(hero: Element | null) {
    await afterIntro();
    const entrance = hero
        ?.getAnimations({ subtree: true })
        .filter((animation) => animation.effect?.getComputedTiming().endTime !== Infinity);
    await Promise.all((entrance ?? []).map((animation) => animation.finished.catch(() => undefined)));
}

// A hint that the hero scrolls, shown only until the visitor first travels away from it.
export default function ScrollCue() {
    const cueRef = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState<CuePhase>("waiting");

    useEffect(() => {
        const cue = cueRef.current;
        const scene = cue?.closest<HTMLElement>("[data-presence]");
        if (!cue || wasDismissed()) {
            setPhase("gone");
            return;
        }

        let isCancelled = false;
        const dismiss = () => {
            isCancelled = true;
            rememberDismissed();
            setPhase("gone");
        };

        // The Stage marks the hero "away" the moment travel to another scene begins, including when the visitor
        // comes back to the page on a scene below it.
        if (scene?.dataset.presence === "away") {
            dismiss();
            return;
        }
        const presence = new MutationObserver(() => {
            if (scene?.dataset.presence === "away") dismiss();
        });
        if (scene) presence.observe(scene, { attributes: true, attributeFilter: ["data-presence"] });

        afterHeroSettles(cue.closest("section"))
            .then(() => wait(SETTLE_MS))
            .then(() => {
                if (!isCancelled) setPhase("shown");
            });

        return () => {
            isCancelled = true;
            presence.disconnect();
        };
    }, []);

    return (
        <div ref={cueRef} className={styles.cue} data-phase={phase} aria-hidden="true">
            <svg className={styles.arrow} viewBox="0 0 40 20" fill="none">
                <path d="M3 3 L20 17 L37 3" />
            </svg>
            {phase === "shown" && (
                <svg className={`${styles.arrow} ${styles.streak}`} viewBox="0 0 40 20" fill="none">
                    <path d="M3 3 L20 17 L37 3" />
                </svg>
            )}
        </div>
    );
}
