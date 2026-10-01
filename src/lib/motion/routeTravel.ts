// The direction is where the camera moves, toward the destination. Animations live in styles/view-transitions.scss.
export type RouteTravelDirection = "left" | "right";

export type RouteTravel = {
    direction: RouteTravelDirection;
    carriesPortrait?: boolean;
};

export function travelTypesFor({ direction, carriesPortrait = false }: RouteTravel): string[] {
    const travelType = `travel-${direction}`;
    if (!carriesPortrait) return [travelType];
    return [travelType, "carry-portrait"];
}

export const RETURN_TO_STAGE_TYPE = "travel-return";

export const routeTravelClasses = {
    "travel-left": "travel-left",
    "travel-right": "travel-right",
    default: "none",
};
