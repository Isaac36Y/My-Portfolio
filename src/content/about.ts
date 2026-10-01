import { siteConfig } from "@/site.config";

type FixedStat = {
    id: "location" | "status";
    label: string;
    value: string;
};

type ClockStat = {
    id: "local-time";
    label: string;
    timeZone: string;
};

export type AboutStat = FixedStat | ClockStat;

export type CardField = {
    label: string;
    value: string;
    isFullWidth?: boolean;
};

export const about = {
    titleLead: "Get to",
    titleAccent: "Know Me",
    returnLabel: "Navigation",
    portraitAlt: "Isaac Young smiling, in a black suit and bow tie",
    statsLabel: "At a glance",
    cardName: "Isaac Young",
    cardRole: "Websites · Custom Tools",
    flipText: "Flip",
    flipToBackLabel: "Flip to the back",
    flipToFrontLabel: "Flip to the front",
    stats: [
        { id: "location", label: "Location", value: siteConfig.location },
        { id: "local-time", label: "Local time", timeZone: siteConfig.timeZone },
        { id: "status", label: "Status", value: "Booking new projects" },
    ] satisfies AboutStat[],
    cardBack: {
        issuer: siteConfig.name,
        fieldGroups: [
            [
                { label: "Tech stack", value: "TypeScript, React, Next.js, Node, PostgreSQL", isFullWidth: true },
                { label: "Skills", value: "Custom web design, workflow automation, AI features, offline-first apps, data-intensive apps", isFullWidth: true },
                { label: "Works with", value: "All business types. All business sizes", isFullWidth: true },
                /* { label: "Training", value: "Self-taught" },
                { label: "Templates", value: "None" }, */
            ],
            [
                { label: "Hobbies", value: "Working out, running, archery, the outdoors", isFullWidth: true },
                { label: "Marathon PR", value: "3:57" },
                { label: "Co-worker", value: "Kylo, my dog" },
            ],
        ] satisfies CardField[][],
        reachLabel: "Reach me",
        email: siteConfig.email,
        replyPromise: "I reply within 24 hours.",
    },
};
