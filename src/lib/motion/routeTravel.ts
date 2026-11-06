// The direction is where the camera moves, toward the destination. Animations live in styles/view-transitions.scss.
export type RouteTravelDirection = "left" | "right" | "up" | "down";

export type RouteTravel = {
    direction: RouteTravelDirection;
    carriesPortrait?: boolean;
    staysOffStage?: boolean;
};

const OFF_STAGE_TYPE = "travel-off-stage";

export function travelTypesFor({ direction, carriesPortrait = false, staysOffStage = false }: RouteTravel): string[] {
    const travelTypes = [`travel-${direction}`];
    if (carriesPortrait) travelTypes.push("carry-portrait");
    if (staysOffStage) travelTypes.push(OFF_STAGE_TYPE);
    return travelTypes;
}

export const RETURN_TO_STAGE_TYPE = "travel-return";

export const routeTravelClasses = {
    "travel-left": "travel-left",
    "travel-right": "travel-right",
    "travel-up": "travel-up",
    "travel-down": "travel-down",
    default: "none",
};

// Swapping the open case study on the Custom Tools dashboard. Only the case panel moves; the strip and header stay put.
export const TOOL_SWITCH_TYPE = "tool-switch";

export const toolSwitchEnterClasses = { [TOOL_SWITCH_TYPE]: "case-swap-in", default: "none" };
export const toolSwitchExitClasses = { [TOOL_SWITCH_TYPE]: "case-swap-out", default: "none" };
