"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { RETURN_TO_STAGE_TYPE, travelTypesFor, type RouteTravel } from "@/lib/motion/routeTravel";
import { rememberScene } from "./sceneMemory";
import type { SceneId } from "./scenes";

type SceneLinkProps = {
    sceneId: SceneId;
    travel: RouteTravel;
    className?: string;
    children: ReactNode;
};

export default function SceneLink({ sceneId, travel, className, children }: SceneLinkProps) {
    return (
        <Link
            href="/"
            transitionTypes={[...travelTypesFor(travel), RETURN_TO_STAGE_TYPE]}
            onNavigate={() => rememberScene(sceneId)}
            className={className}
        >
            {children}
        </Link>
    );
}
