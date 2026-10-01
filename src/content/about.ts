import { siteConfig } from "@/site.config";

type FixedStat = {
    id: "location" | "response" | "status" | "specialty";
    label: string;
    value: string;
};

type ClockStat = {
    id: "local-time";
    label: string;
    timeZone: string;
};

export type AboutStat = FixedStat | ClockStat;

export const about = {
    titleLead: "Get to",
    titleAccent: "Know Me",
    returnLabel: "Navigation",
    portraitAlt: "Isaac Young smiling, in a black suit and bow tie",
    statsLabel: "At a glance",
    // Placeholders until Isaac confirms them: the response time and the status.
    stats: [
        { id: "location", label: "Location", value: siteConfig.location },
        { id: "local-time", label: "Local time", timeZone: siteConfig.timeZone },
        { id: "response", label: "Response", value: "Under 24 hours" },
        { id: "status", label: "Status", value: "Booking new projects" },
        { id: "specialty", label: "Specialty", value: "Websites · Custom Tools" },
    ] satisfies AboutStat[],
};
