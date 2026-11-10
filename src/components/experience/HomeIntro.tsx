"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { readDurationMs, readToken } from "@/lib/motion/tokens";
import { finishIntro, introPhase, setIntroPhase } from "./intro";
import styles from "./HomeIntro.module.scss";

// Counted from the first paint, when the curtain and idling logo appear. A slow page holds as long as it
// needs to be ready, but fonts or a mark that never arrive must not keep the curtain down past MAX_WAIT_MS.
const HOLD_MS = 1000;
const MAX_WAIT_MS = 1500;
// Longer than the whole running order after landing (see the --intro-* tokens), as a backstop only.
const FINISH_TIMEOUT_MS = 5000;
// Accelerates like a fall, then settles: the logo starts a little larger, as if nearer the viewer, and lands flat.
const FALL_EASING = "cubic-bezier(0.5, 0, 0.75, 0)";
const LANDING_SQUASH_SCALE = "0.96";

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

function finiteAnimations(): Animation[] {
    return document.getAnimations().filter((animation) => animation.effect?.getComputedTiming().endTime !== Infinity);
}

function isOnScreen(rect: DOMRect): boolean {
    return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
}

function firstPaintMs(): number {
    return performance.getEntriesByName("first-paint")[0]?.startTime ?? performance.now();
}

async function waitUntilReady(mark: HTMLImageElement | null) {
    const ready = Promise.all([document.fonts.ready, mark?.decode().catch(() => undefined)]);
    await Promise.all([
        wait(Math.max(0, firstPaintMs() + HOLD_MS - performance.now())),
        Promise.race([ready, wait(MAX_WAIT_MS)]),
    ]);
}

async function reveal(flyer: HTMLElement, flyerImage: HTMLElement, mark: HTMLImageElement | null) {
    const root = document.documentElement;
    const flightMs = readDurationMs(root, "--duration-travel");

    // Read before the phase changes, which ends the idle animation these values come from.
    const idle = getComputedStyle(flyerImage);
    const landing = flyerImage.animate(
        [
            { scale: idle.scale, opacity: idle.opacity, easing: FALL_EASING },
            { scale: LANDING_SQUASH_SCALE, offset: 0.85, easing: "ease-out" },
            { scale: "1", opacity: 1 },
        ],
        { duration: flightMs, fill: "forwards" },
    );

    const from = flyer.getBoundingClientRect();
    const to = mark?.getBoundingClientRect();
    const flightTiming = { duration: flightMs, easing: readToken(root, "--ease-travel"), fill: "forwards" as const };
    // The visitor may have moved to another scene while the curtain was up; with no mark in view, the logo just fades.
    const flight =
        to && isOnScreen(to)
            ? flyer.animate(
                  [
                      { transform: "none" },
                      {
                          transform: `translate(${to.left + to.width / 2 - (from.left + from.width / 2)}px, ${
                              to.top + to.height / 2 - (from.top + from.height / 2)
                          }px) scale(${to.width / from.width})`,
                      },
                  ],
                  flightTiming,
              )
            : flyer.animate([{ opacity: 1 }, { opacity: 0 }], flightTiming);

    setIntroPhase("reveal");
    await Promise.all([flight.finished, landing.finished]).catch(() => undefined);

    setIntroPhase("landed");
    const remaining = Promise.all(finiteAnimations().map((animation) => animation.finished.catch(() => undefined)));
    await Promise.race([remaining, wait(FINISH_TIMEOUT_MS)]);

    finishIntro();
}

// Covers only what the visitor sees. The page underneath is fully rendered from the first byte and
// painted at full opacity behind the curtain, so crawlers and Largest Contentful Paint see it as usual.
export default function HomeIntro() {
    const flyerRef = useRef<HTMLDivElement>(null);
    const flyerImageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const flyer = flyerRef.current;
        const flyerImage = flyerImageRef.current;
        if (introPhase() !== "hold" || !flyer || !flyerImage) return;

        let isCancelled = false;
        const mark = document.querySelector<HTMLImageElement>("[data-intro-mark]");
        waitUntilReady(mark).then(() => {
            if (!isCancelled && introPhase() === "hold") reveal(flyer, flyerImage, mark);
        });

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <div className={styles.intro} aria-hidden="true">
            <div className={styles.curtain} />
            <div ref={flyerRef} className={styles.flyer}>
                {/* Same source and sizes as the hero mark, so both resolve to the one file already being preloaded. */}
                <Image
                    ref={flyerImageRef}
                    src="/images/mark-2048.png"
                    alt=""
                    width={2048}
                    height={1387}
                    sizes="10rem"
                    loading="eager"
                    className={styles.flyerImage}
                />
            </div>
        </div>
    );
}
