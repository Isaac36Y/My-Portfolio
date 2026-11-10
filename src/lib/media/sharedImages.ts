// Images that several routes paint on their first screen. The components that draw them and RouteWarmup,
// which fetches them ahead of a visit, read the same props so the browser resolves both to the same file.
export const logoBackdropSizes = "120vw";

export const routeBackdrop = {
    src: "/images/mark-outline-icemint-2-2048.png",
    width: 2048,
    height: 1387,
} as const;

export const standingPortrait = {
    src: "/images/isaacStanding.png",
    width: 1024,
    height: 1536,
    // The desktop size matches the introduction's so both pick the same file and the carried portrait is already cached.
    sizes: "(min-width: 1252px) 85vh, 45rem",
} as const;
