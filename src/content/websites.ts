import type { StaticImageData } from "next/image";
import type { SceneId } from "@/components/experience/scenes";
import homebaseHome from "./projects/homebase-home.png";
import kinsingtonHome from "./projects/kinsington-home.png";
import vetransHome from "./projects/vetrans-home.png";

export type WebsiteThumbnail = {
    image: StaticImageData;
    alt: string;
};

export type WebsiteProject = {
    id: string;
    business: string;
    pageType: string;
    isConcept: boolean;
    url?: string;
    thumbnail?: WebsiteThumbnail;
    reflection: string;
};

export const websites = {
    title: "Websites",
    myWorkLabel: "My Work",
    stageReturnLabels: { hero: "Home", introduction: "Navigation" } satisfies Record<SceneId, string>,
    conceptLabel: "Concept",
    newTabNotice: "(opens in a new tab)",
    projects: [
        {
            id: "kinsington",
            business: "Kinsington Care",
            pageType: "Memory care website",
            isConcept: false,
            url: "https://kinsingtoncare.com",
            thumbnail: {
                image: kinsingtonHome,
                alt: "The Kinsington Care homepage, headlined “Memory Care in Grants Pass and Medford,” with open rooms listed for each of its three communities below.",
            },
            reflection:
                "Families looking into memory care are often in one of the hardest stretches of their lives, and they arrive with two questions. Is there a room, and who do I call? I put open rooms at each community and the phone number on the very first screen. Now I start every site by working out what the most worried visitor needs, then clearing everything else out of their way.",
        },
        {
            id: "hestly",
            business: "Hestly",
            pageType: "Software product website",
            isConcept: false,
            url: "https://homebase.isaacyoungs.dev",
            thumbnail: {
                image: homebaseHome,
                alt: "The Hestly homepage, headlined “Every home. Every buyer. One system to help close both.” over a photo of an agent showing a couple through a house, with the app shown on a laptop, phone and tablet below.",
            },
            reflection:
                "Hestly is real estate software I built, and this is the site that has to sell it. After months inside the code, my first drafts explained how it worked. Agents wanted to hear something simpler. A walkthrough done in a basement with no signal will still be there when they get back to the car. Writing this site taught me to describe software in the words of the person who’ll use it.",
        },
        {
            id: "vetrans",
            business: "VETRANS",
            pageType: "Trucking Brokerage Website",
            isConcept: false,
            url: "https://go-vetrans.com",
            thumbnail: {
                image: vetransHome,
                alt: "The Vetrans homepage, headline 'The discipline of service, applied to your frieght' with a semi-truck with trailer in the background with the vetrans logo on it.",
            },
            reflection:
                "A freight broker serves two customers on every load. The shipper wants an honest price, and the carrier wants to be paid what was promised. Every broker says they can be trusted, so I had VETRANS show it. Carriers see this week’s open loads with the rates posted, plus a sample rate confirmation marked up to answer what they ask about most. This site taught me that proof on the page beats a promise about it.",
        },
    ] satisfies WebsiteProject[],
};
