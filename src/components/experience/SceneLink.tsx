"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { travelTypesFor, type RouteTravelDirection } from "@/lib/motion/routeTravel";
import { rememberScene } from "./sceneMemory";
import type { SceneId } from "./scenes";

type SceneLinkProps = {
    sceneId: SceneId;
    direction: RouteTravelDirection;
    className?: string;
    children: ReactNode;
};

export default function SceneLink({ sceneId, direction, className, children }: SceneLinkProps) {
    return (
        <Link
            href="/"
            transitionTypes={travelTypesFor(direction)}
            onNavigate={() => rememberScene(sceneId)}
            className={className}
        >
            {children}
        </Link>
    );
}
