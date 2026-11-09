"use client";

import { useState, type ReactNode } from "react";
import type { RouteTravel } from "@/lib/motion/routeTravel";
import { sceneToResume } from "./sceneMemory";
import type { SceneId } from "./scenes";
import SceneLink from "./SceneLink";

type SceneVariant = {
    travel?: RouteTravel;
    className?: string;
    arrow?: ReactNode;
};

type StageReturnLinkProps = {
    labelByScene: Record<SceneId, string>;
    travel: RouteTravel;
    className?: string;
    labelClassName?: string;
    arrow: ReactNode;
    // For a page where the scenes lie in different directions: the way back to each can travel and point its own way.
    byScene?: Partial<Record<SceneId, SceneVariant>>;
};

// Leads back to the scene the visitor left the stage from. It is read once on arrival: following the
// link rewrites the memory, and the label must not change while the page is still on its way out.
export default function StageReturnLink({
    labelByScene,
    travel,
    className,
    labelClassName,
    arrow,
    byScene,
}: StageReturnLinkProps) {
    const [departureSceneId] = useState(sceneToResume);
    const variant = byScene?.[departureSceneId];

    return (
        <SceneLink
            sceneId={departureSceneId}
            travel={variant?.travel ?? travel}
            className={variant?.className ?? className}
        >
            <span className={labelClassName}>{labelByScene[departureSceneId]}</span>
            {variant?.arrow ?? arrow}
        </SceneLink>
    );
}
