export type SceneId = "hero" | "introduction";
export type Ground = "navy" | "ice";
export type TravelDirection = "up" | "down" | "left" | "right";

export type Scene = {
    id: SceneId;
    label: string;
    column: number;
    row: number;
    ground: Ground;
};

// Scenes sit on a grid so travel always moves toward where the destination lives.
export const scenes: readonly Scene[] = [
    { id: "hero", label: "Home", column: 0, row: 0, ground: "navy" },
    { id: "introduction", label: "Meet Isaac", column: 0, row: 1, ground: "ice" },
];

const gridStepByDirection: Record<TravelDirection, { columnStep: number; rowStep: number }> = {
    up: { columnStep: 0, rowStep: -1 },
    down: { columnStep: 0, rowStep: 1 },
    left: { columnStep: -1, rowStep: 0 },
    right: { columnStep: 1, rowStep: 0 },
};

export function findNeighbor(scene: Scene, direction: TravelDirection): Scene | undefined {
    const { columnStep, rowStep } = gridStepByDirection[direction];
    return scenes.find(
        (candidate) => candidate.column === scene.column + columnStep && candidate.row === scene.row + rowStep,
    );
}
