"use client";

import { useState, type ReactNode } from "react";
import type { RouteTravel } from "@/lib/motion/routeTravel";
import { sceneToResume } from "./sceneMemory";
import type { SceneId } from "./scenes";
import SceneLink from "./SceneLink";

type StageReturnLinkProps = {
    labelByScene: Record<SceneId, string>;
    travel: RouteTravel;
    className?: string;
    labelClassName?: string;
    arrow: ReactNode;
};

// Leads back to the scene the visitor left the stage from. It is read once on arrival: following the
// link rewrites the memory, and the label must not change while the page is still on its way out.
export default function StageReturnLink({ labelByScene, travel, className, labelClassName, arrow }: StageReturnLinkProps) {
    const [departureSceneId] = useState(sceneToResume);

    return (
        <SceneLink sceneId={departureSceneId} travel={travel} className={className}>
            <span className={labelClassName}>{labelByScene[departureSceneId]}</span>
            {arrow}
        </SceneLink>
    );
}
