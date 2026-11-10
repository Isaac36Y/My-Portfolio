"use client";

import { useEffect } from "react";
import { rememberScene } from "./sceneMemory";
import type { SceneId } from "./scenes";

// For a page whose way back to the stage is one fixed scene, so pages reached from it lead back there too,
// even when the visitor landed on it without passing through the stage.
export default function RememberScene({ sceneId }: { sceneId: SceneId }) {
    useEffect(() => rememberScene(sceneId), [sceneId]);

    return null;
}
