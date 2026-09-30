// The direction is where the camera moves, toward the destination. Animations live in styles/view-transitions.scss.
export type RouteTravelDirection = "left" | "right";

export function travelTypesFor(direction: RouteTravelDirection): string[] {
    return [`travel-${direction}`];
}

export const routeTravelClasses = {
    "travel-left": "travel-left",
    "travel-right": "travel-right",
    default: "none",
};
