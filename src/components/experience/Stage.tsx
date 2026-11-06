"use client";

import { useEffect, useEffectEvent, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion, readDurationMs, readToken } from "@/lib/motion/tokens";
import { findNeighbor, scenes, type Ground, type Scene, type SceneId, type TravelDirection } from "./scenes";
import { isReturningToStage, rememberScene, sceneToResume } from "./sceneMemory";
import SceneNav from "./SceneNav";
import styles from "./Stage.module.scss";

const GESTURE_SILENCE_MS = 150;
const WHEEL_INTENT_THRESHOLD_PX = 10;
const WHEEL_LINE_HEIGHT_PX = 16;
const SWIPE_THRESHOLD_PX = 48;

const directionByKey: Record<string, TravelDirection> = {
    ArrowDown: "down",
    PageDown: "down",
    ArrowUp: "up",
    PageUp: "up",
    ArrowLeft: "left",
    ArrowRight: "right",
};

type StageProps = {
    sceneContent: Record<SceneId, ReactNode>;
};

function placeOnGrid(scene: Scene): CSSProperties {
    return { "--scene-column": scene.column, "--scene-row": scene.row } as CSSProperties;
}

function worldTransformFor(scene: Scene): string {
    return `translate(${scene.column * -100}%, ${scene.row * -100}%)`;
}

function findScene(sceneId: SceneId): Scene {
    return scenes.find((scene) => scene.id === sceneId) ?? scenes[0];
}

function directionForKey(event: KeyboardEvent): TravelDirection | undefined {
    if (event.key !== " ") return directionByKey[event.key];

    const isActivatingControl = event.target instanceof Element && event.target.closest("a, button, summary");
    if (isActivatingControl) return undefined;
    return event.shiftKey ? "up" : "down";
}

async function animateToRest(element: HTMLElement, keyframes: Keyframe[], timing: KeyframeAnimationOptions) {
    const animation = element.animate(keyframes, { ...timing, fill: "forwards" });
    await animation.finished;
    animation.commitStyles();
    animation.cancel();
}

export default function Stage({ sceneContent }: StageProps) {
    const [arrivalScene] = useState(() => findScene(sceneToResume()));
    const [activeSceneId, setActiveSceneId] = useState<SceneId>(arrivalScene.id);
    const [groundUnderNav, setGroundUnderNav] = useState<Ground>(arrivalScene.ground);
    const [announcement, setAnnouncement] = useState("");

    const stageRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const worldRef = useRef<HTMLDivElement>(null);
    const sceneElementsRef = useRef(new Map<SceneId, HTMLElement>());
    const isTravelingRef = useRef(false);
    const wheelGestureRef = useRef({ lastWheelAtMs: -Infinity, accumulatedDeltaPx: 0, hasTraveled: false });
    const swipeRef = useRef<{ startX: number; startY: number; hasTraveled: boolean } | null>(null);

    const activeScene = findScene(activeSceneId);

    function focusSceneHeading(sceneId: SceneId) {
        sceneElementsRef.current.get(sceneId)?.querySelector<HTMLElement>("h1, h2")?.focus({ preventScroll: true });
    }

    async function travelTo(destination: Scene) {
        const stage = stageRef.current;
        const viewport = viewportRef.current;
        const world = worldRef.current;
        if (isTravelingRef.current || destination.id === activeScene.id || !stage || !viewport || !world) return;

        isTravelingRef.current = true;
        const origin = activeScene;
        setActiveSceneId(destination.id);
        rememberScene(destination.id);

        if (prefersReducedMotion()) {
            const halfCrossfadeMs = readDurationMs(stage, "--duration-crossfade") / 2;
            const fadeTiming = { duration: halfCrossfadeMs, easing: readToken(stage, "--ease-out") };
            await animateToRest(viewport, [{ opacity: 1 }, { opacity: 0 }], fadeTiming);
            world.style.transform = worldTransformFor(destination);
            setGroundUnderNav(destination.ground);
            await animateToRest(viewport, [{ opacity: 0 }, { opacity: 1 }], fadeTiming);
        } else {
            const travelDurationMs = readDurationMs(stage, "--duration-travel");
            const travelTiming = { duration: travelDurationMs, easing: readToken(stage, "--ease-travel") };
            const worldKeyframes = [{ transform: worldTransformFor(origin) }, { transform: worldTransformFor(destination) }];
            const glide = animateToRest(world, worldKeyframes, travelTiming);

            // The nav sits at mid-height, so it changes ground when the scene boundary crosses the middle.
            window.setTimeout(() => setGroundUnderNav(destination.ground), travelDurationMs / 2);
            await glide;
        }

        isTravelingRef.current = false;
        const destinationNumber = scenes.indexOf(destination) + 1;
        setAnnouncement(`${destination.label}, ${destinationNumber} of ${scenes.length}`);
        focusSceneHeading(destination.id);
    }

    function travelToward(direction: TravelDirection): boolean {
        const neighbor = findNeighbor(activeScene, direction);
        if (!neighbor) return false;

        travelTo(neighbor);
        return true;
    }

    // One travel per wheel gesture: a trackpad flick keeps firing momentum events long after the
    // fingers lift, so a gesture only ends after GESTURE_SILENCE_MS with no wheel events at all.
    const travelOnWheel = useEffectEvent((event: WheelEvent) => {
        const isPinchZoom = event.ctrlKey;
        if (isPinchZoom) return;

        const gesture = wheelGestureRef.current;
        const isContinuingGesture = event.timeStamp - gesture.lastWheelAtMs < GESTURE_SILENCE_MS;
        gesture.lastWheelAtMs = event.timeStamp;
        if (!isContinuingGesture) {
            gesture.accumulatedDeltaPx = 0;
            gesture.hasTraveled = false;
        }

        const isLineDelta = event.deltaMode === WheelEvent.DOM_DELTA_LINE;
        gesture.accumulatedDeltaPx += isLineDelta ? event.deltaY * WHEEL_LINE_HEIGHT_PX : event.deltaY;
        const isIntentional = Math.abs(gesture.accumulatedDeltaPx) >= WHEEL_INTENT_THRESHOLD_PX;
        if (gesture.hasTraveled || !isIntentional) return;

        gesture.hasTraveled = true;
        travelToward(gesture.accumulatedDeltaPx > 0 ? "down" : "up");
    });

    const travelOnKey = useEffectEvent((event: KeyboardEvent) => {
        const hasModifier = event.altKey || event.ctrlKey || event.metaKey;
        const isTyping = event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable]");
        if (event.defaultPrevented || hasModifier || isTyping) return;

        const direction = directionForKey(event);
        if (direction && travelToward(direction)) event.preventDefault();
    });

    const startSwipe = useEffectEvent((event: TouchEvent) => {
        const [touch] = event.touches;
        const isSingleFinger = event.touches.length === 1;
        swipeRef.current = isSingleFinger ? { startX: touch.clientX, startY: touch.clientY, hasTraveled: false } : null;
    });

    const travelOnSwipe = useEffectEvent((event: TouchEvent) => {
        const swipe = swipeRef.current;
        if (!swipe || swipe.hasTraveled) return;

        const [touch] = event.touches;
        const swipeDistanceX = touch.clientX - swipe.startX;
        const swipeDistanceY = touch.clientY - swipe.startY;
        const isVerticalSwipe = Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX);
        if (!isVerticalSwipe || Math.abs(swipeDistanceY) < SWIPE_THRESHOLD_PX) return;

        swipe.hasTraveled = true;
        travelToward(swipeDistanceY < 0 ? "down" : "up");
    });

    const focusResumedScene = useEffectEvent(() => {
        if (isReturningToStage()) focusSceneHeading(arrivalScene.id);
    });

    useEffect(() => focusResumedScene(), []);

    useEffect(() => {
        const listeners = new AbortController();
        const { signal } = listeners;
        window.addEventListener("wheel", (event) => travelOnWheel(event), { passive: true, signal });
        window.addEventListener("keydown", (event) => travelOnKey(event), { signal });
        window.addEventListener("touchstart", (event) => startSwipe(event), { passive: true, signal });
        window.addEventListener("touchmove", (event) => travelOnSwipe(event), { passive: true, signal });
        return () => listeners.abort();
    }, []);

    return (
        <div ref={stageRef} className={styles.stage} data-stage>
            <div ref={viewportRef} className={styles.viewport}>
                <div ref={worldRef} className={styles.world} style={{ transform: worldTransformFor(arrivalScene) }}>
                    {scenes.map((scene) => {
                        const isActive = scene.id === activeSceneId;
                        return (
                            <div
                                key={scene.id}
                                ref={(element) => {
                                    if (element) sceneElementsRef.current.set(scene.id, element);
                                }}
                                className={styles.scene}
                                style={placeOnGrid(scene)}
                                data-ground={scene.ground}
                                data-presence={isActive ? "present" : "away"}
                                inert={!isActive}
                            >
                                {sceneContent[scene.id]}
                            </div>
                        );
                    })}
                </div>
            </div>

            <SceneNav activeSceneId={activeSceneId} ground={groundUnderNav} onTravel={travelTo} />

            <p className={styles.visuallyHidden} aria-live="polite">
                {announcement}
            </p>
        </div>
    );
}
