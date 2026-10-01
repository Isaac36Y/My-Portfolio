import { siteConfig } from "@/site.config";

export type HonestTerm = {
    id: string;
    statement: string;
    detail: string;
};

export type WorkingTrait = {
    id: string;
    heading: string;
    body: string;
};

export const why = {
    titleLead: "Why",
    titleAccent: siteConfig.name,
    lede: "Smart code and a great product is where it starts. For you, getting there should be easy and enjoyable.",
    returnLabel: "Navigation",
    honest: {
        heading: "The honest version.",
        intro: "Everything that usually hides in the fine print, out in the open.",
        terms: [
            {
                id: "custom",
                statement: "Built for you, from a blank page.",
                detail: "No templates, and no theme with your logo dropped in. Your website is designed around your business and the way your customers look for you.",
            },
            {
                id: "tools",
                statement: "Software that fits how you already work.",
                detail: "Off-the-shelf apps make your team work around them. A custom tool follows the process you already have, and changes when your business does.",
            },
            {
                id: "price",
                statement: "The price is in writing before I start.",
                detail: "You get a written scope and a written number up front. No hourly meter, and no surprise invoice at the end.",
            },
            {
                id: "ownership",
                statement: "You’re never locked in.",
                detail: "Your domain, hosting, and code are in your name from day one, and SEO runs month to month. If you ever leave, everything leaves with you.",
            },
        ] satisfies HonestTerm[],
    },
    working: {
        heading: "How it feels on your end.",
        intro: "From the first conversation to launch day, here’s what you can count on.",
        traits: [
            {
                id: "learn",
                heading: "I’ll learn your trade like I’m about to work in it.",
                body: "Before I design a thing, I dig into your field, your customers, and where you want the business to be in a few years. I’d rather know your business too well than build for the wrong one.",
            },
            {
                id: "plain-english",
                heading: "I’ll never talk over your head.",
                body: "You’ll know what you’re getting and why, in plain English. No burying you in technical terms to sound impressive. When a choice matters to your business, I walk you through what it changes.",
            },
            {
                id: "timeline",
                heading: "You’ll hear the real date, even when it’s not the one you wanted.",
                body: "I’d rather lose a job to an honest timeline than win it with a fake one. You get regular check-ins, and if something changes, you hear it from me first, along with why.",
            },
            {
                id: "one-person",
                heading: "You’ll always be talking to me.",
                body: "No account manager, no support queue, no handoffs. I carry the hard parts and bring you only the decisions that need you, so building something new feels exciting instead of exhausting.",
            },
        ] satisfies WorkingTrait[],
    },
    sendOff: {
        yourPart: "You bring the business.",
        myPart: "I’ll bring the solution.",
        invitation: "Tell me what you’re working on and where you want it to go. We’ll figure out the right first step together.",
        linkText: "Say hello",
        email: siteConfig.email,
    },
};
