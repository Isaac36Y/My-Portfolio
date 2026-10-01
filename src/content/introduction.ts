import type { RouteTravel } from "@/lib/motion/routeTravel";
import { siteConfig } from "@/site.config";

export type IntroductionPath = {
    id: "about" | "work" | "why";
    title: string;
    description: string;
    href: string;
    travel?: RouteTravel;
};

export const introduction = {
    greeting: "I’m Isaac",
    surname: "Young",
    mission:
        "My goal is software that grows your business or streamlines the unorganized process that eats up weekly hours.",
    portraitAlt: "Isaac Young standing in a black suit and bow tie, hands in his pockets",
    paths: [
        {
            id: "about",
            title: "Get to Know Me",
            description: "Who you’d be working with.",
            href: "/about",
            travel: { direction: "right", carriesPortrait: true },
        },
        {
            id: "work",
            title: "My Work",
            description: "Sites and tools I’ve built.",
            href: "/my-work",
            travel: { direction: "left" },
        },
        {
            id: "why",
            title: `Why ${siteConfig.name}`,
            description: "Built for you, never from a template.",
            href: "/why",
        },
    ] satisfies IntroductionPath[],
};
