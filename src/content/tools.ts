import type { StaticImageData } from "next/image";
import type { SceneId } from "@/components/experience/scenes";
import bullseyeRound from "./projects/bullseye-round.png";
import hestlyWalkthrough from "./projects/hestly-walkthrough.png";

export type ToolThumbnail = {
    image: StaticImageData;
    alt: string;
    focus: string;
};

export type ToolMedia =
    | { kind: "video"; src: string; label: string; width: number; height: number }
    | { kind: "phones"; screens: { src: string; alt: string; width: number; height: number }[] };

export type CaseChapter = {
    id: string;
    heading: string;
    paragraphs: string[];
    plans?: string[];
    video?: { src: string; label: string; width: number; height: number };
};

export type Tool = {
    slug: string;
    name: string;
    field: string;
    status: string;
    summary: string;
    before: string;
    after: string;
    builtWith: string[];
    liveUrl?: string;
    thumbnail: ToolThumbnail;
    media: ToolMedia;
    chapters: CaseChapter[];
};

export const customTools = {
    title: "Custom Tools",
    lede: "Software shaped around one job and the people who do it. Both are in real use today, by the people they were built for.",
    myWorkLabel: "My Work",
    stageReturnLabels: { hero: "Home", introduction: "Navigation" } satisfies Record<SceneId, string>,
    beforeLabel: "Before",
    afterLabel: "After",
    stripLabel: "Tools",
    activeLabel: "Open",
    roleLabel: "Role",
    role: "Designed and built solo",
    statusLabel: "Status",
    builtWithLabel: "Built with",
    liveLabel: "Live",
    plansLabel: "What's next",
    nextToolLabel: "Next tool",
    newTabNotice: "(opens in a new tab)",
    tools: [
        {
            slug: "hestly",
            name: "Hestly",
            field: "Real estate · Listings and buyers",
            status: "In use by agents in the field",
            summary:
                "Listing walkthroughs and buyer relationships kept on the agent's phone, and saved even when the signal drops.",
            before: "A ten-page paper walkthrough, voice memos, and a notes app.",
            after: "One room-by-room form that saves on the phone and syncs when signal comes back.",
            builtWith: ["Node", "Supabase", "PWA", "Claude API"],
            liveUrl: "https://homebase.isaacyoungs.dev",
            thumbnail: {
                image: hestlyWalkthrough,
                alt: "Hestly's walkthrough form open on the entry: location, flooring, and feature choices, with a Save button and a “synced” badge.",
                focus: "center top",
            },
            media: {
                kind: "video",
                src: "/images/homebaseDesktopVid.mp4",
                label: "A walk through the Hestly dashboard: active walkthroughs, finished listings, and buyer profiles.",
                width: 3392,
                height: 1772,
            },
            chapters: [
                {
                    id: "problem",
                    heading: "The problem",
                    paragraphs: [
                        "Real estate agents struggle to log, store, and use property and buyer data cleanly. Hestly tackles this with two pillars: sellers and buyers.",
                        "During a walkthrough, agents are working off scattered 10+ page paper forms, voice memos, and notes apps. Hestly replaces that with an organized, collapsible form that works offline, stays easy to navigate, and captures rooms, features, and notes without losing a thing.",
                        "On the buyer side, agents need to know exactly what a buyer wants while also building a real relationship with them. Hestly starts with a “First Meet” form covering everything from that initial 30–60 minute conversation, then feeds into a full buyer profile tracking personal info, preferences, and showing details.",
                    ],
                },
                {
                    id: "sellers",
                    heading: "The sellers",
                    paragraphs: [
                        "The walkthrough is one of the first steps an agent takes to list a home, and it has to be done right the first time. Agents need to spend more time looking at the home than writing about it. Everything the agent uses to sell this home is captured here, so a missed detail is either a call back to the seller or an undersold home.",
                        "To fix this, I made a page of dropdown forms broken into sections, for quick scrolling and easy input in whatever room the agent is standing in. Not every home fits into input fields, so each form has its own notes for that room or area, and a general notes popup catches everything else. A checkmark confirms a form has been saved, and a status pill shows whether it has synced. Bedroom, bathroom, and outbuilding forms are added as the property needs them. When a form is saved, it's stored on the device and immediately sent to the database. If the device is offline, the information waits on the device until the connection comes back, then keeps trying until it lands safely.",
                        "Some agents prefer to stage a home with the general details filled in ahead of time, or the walkthrough gets cut short. For this, a walkthrough queue on the dashboard reminds agents which walkthroughs are still active and lets them jump straight back in.",
                        "Finished homes show up on the dashboard as cards that open the seller's profile: a clean page holding the home and owner's information. No filing cabinets, no folders, and no sections that don't apply to this home. The agent can edit any section or send the home back to the walkthrough queue to add rooms.",
                    ],
                    video: {
                        src: "/images/Walkthrough-recording.mp4",
                        label: "Filling out a room-by-room walkthrough in Hestly on a phone, with each section saving and syncing.",
                        width: 782,
                        height: 1606,
                    },
                },
                {
                    id: "buyers",
                    heading: "The buyers",
                    paragraphs: [
                        "The new buyer form is lighter than the walkthrough, because the real work on the buyer side happens elsewhere. It captures only what an agent needs and will most likely learn in the first conversation: contact info, pre-approval, urgency and experience, and a few preferences.",
                        "The buyer profile is what makes Hestly a relationship tool. At a glance the agent sees what's worth being reminded of constantly: must-haves, deal-breakers, and contact info. The personal section keeps track of why they're buying, the size and ages of their family, hobbies, birthdays, and upcoming events. The preference section is what matches a buyer with the right home, and the agent can add to it any time they learn more.",
                        "The second part of the profile is showing mode. It lets an agent take quick-fire notes in the middle of a showing. Afterward, those notes are combined into one AI-written summary of the showing and filed in the buyer's notes.",
                    ],
                },
                {
                    id: "outcome",
                    heading: "Where it stands",
                    paragraphs: [
                        "Hestly is in use in the field by real agents today, and new agents keep showing the same relief at a tool that makes a frustrating part of the job faster. Here is what's planned next.",
                    ],
                    plans: [
                        "MLS (Multiple Listing Service) integration that pulls live local listings and matches them to buyers by their preferences.",
                        "A link sent to buyers after the first meeting that takes them to a preference form, which updates their profile in Hestly.",
                        "State form autofill, so required paperwork is done in seconds instead of by hand.",
                        "Listing summaries for seller profiles, written from the home's location, features, and notes.",
                    ],
                },
            ],
        },
        {
            slug: "bullseye-ledger",
            name: "Bullseye Ledger",
            field: "Archery · Scorekeeping",
            status: "Used at every shoot I go to",
            summary:
                "A one-thumb scorecard for 3D archery shoots, with live standings so the whole group knows who's ahead.",
            before: "A pencil, a paper scorecard, and adding it all up at the end.",
            after: "Tap a score, watch the standings move, and get a round summary at the last target.",
            builtWith: ["JavaScript", "localStorage", "PWA"],
            thumbnail: {
                image: bullseyeRound,
                alt: "Bullseye Ledger on target 14, with each archer's running score and a row of large score buttons.",
                focus: "center 20%",
            },
            media: {
                kind: "phones",
                screens: [
                    {
                        src: "/images/bullseye.png",
                        alt: "Bullseye Ledger on target 14: four archers, each with a running score and a row of large 10, 8, 5, 3, and 0 buttons.",
                        width: 784,
                        height: 1610,
                    },
                    {
                        src: "/images/bullseye-2.jpeg",
                        alt: "The round results screen: a podium with Greg in first, the final standings, and highlights like most 10s and the longest shot.",
                        width: 1179,
                        height: 2432,
                    },
                ],
            },
            chapters: [
                {
                    id: "problem",
                    heading: "The problem",
                    paragraphs: [
                        "3D archery shoots are one of my favorite ways to spend a weekend. They're hikes through the woods and hills where you come across life-sized foam animal targets set at different distances. Each animal has scoring rings painted over the vitals, and you shoot one arrow at each from a marked stake.",
                        "The trouble is the scoring, not the system but the method. Shooters get a pencil and paper, and writing down a score with a bow in one hand gets old fast. Then there's the math. Adding it up at the end isn't bad, but what about halfway through? With four targets left, am I in the lead? Could this target cost me? There's too much going on to keep track, and the competition inside the group fades away.",
                        "My answer was a tool for the phone in your free hand that shows live scores and tracks the round. Nothing has made shoots more fun for me than tapping one button to enter a score, and the excitement of a close match where everybody knows it's close.",
                    ],
                },
                {
                    id: "use",
                    heading: "How it plays",
                    paragraphs: [
                        "The app opens on a start screen where you add the players for the round and choose whether Distance Multiplier is on. Distance Multiplier is a game inside the game: you enter each target's distance, and a second score multiplies your points the farther away the target is. The winner of the round might not win the multiplied score.",
                        "During the round, everything is on one page, simple enough to use one-handed and half-distracted. The big score buttons are color-coded to prevent mistakes, and live totals sit next to each player's name, so everyone knows who's leading and who's right behind. That alone made our shoots more exciting. A pop-up scorecard shows earlier targets and multiplier stats, and previous and next buttons or a dropdown at the top jump between targets.",
                        "When the round ends, a summary page puts the winner on top of the podium with their stats. A toggle switches the standings to the multiplied totals. Each player's round opens up target by target, with a count of each score so you can see who was most consistent. A highlights section calls out the moments worth bragging about: most 10s, or the longest shot of the day.",
                    ],
                },
                {
                    id: "outcome",
                    heading: "Where it stands",
                    paragraphs: [
                        "Bullseye Ledger is the first project I thought of, scoped, and built entirely on my own. There was no tutorial and no prompt, just a problem I wanted solved. It changed how I think when I sit down to build, and how I handle a bug with no obvious source. My friends and I use it at every shoot now. Here's where it's headed.",
                    ],
                    plans: [
                        "Accounts with a real database, so each archer's stats follow them from round to round.",
                        "A Labs page that breaks down an archer's trends, accuracy at each distance, and weak spots, with structured practice to work on them.",
                        "Scoring settings, so archers who use a different scoring system can still use the app.",
                    ],
                },
            ],
        },
    ] satisfies Tool[],
};

const CUSTOM_TOOLS_PATH = "/my-work/custom-tools";

// The dashboard opens on the first tool, so that tool lives at the dashboard's own URL.
export function caseStudyPath(slug: string): string {
    const isOpenByDefault = slug === customTools.tools[0].slug;
    if (isOpenByDefault) return CUSTOM_TOOLS_PATH;
    return `${CUSTOM_TOOLS_PATH}/${slug}`;
}

export function findTool(slug: string): Tool | undefined {
    return customTools.tools.find((tool) => tool.slug === slug);
}
