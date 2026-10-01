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

export type StoryFigure = {
    value: string;
    label: string;
};

export type StoryBuild = {
    name: string;
    kind: string;
    summary: string;
};

export type StoryChapter = {
    id: string;
    waypoint: string;
    heading: string;
    headingAccent?: string;
    isStatement?: boolean;
    paragraphs: string[];
    figures?: StoryFigure[];
    route?: string[];
    builds?: StoryBuild[];
    aside?: { label: string; text: string };
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
    story: {
        label: "How I got here",
        chapters: [
            {
                id: "delivery-route",
                waypoint: "Central Point, OR",
                heading: "Before I wrote code, I drove a delivery route.",
                paragraphs: [
                    "I’m from Central Point, Oregon. I was driving deliveries full time, hooked on the idea of travel, and looking for work that could come along with me.",
                    "That’s how I found freeCodeCamp. I took its free HTML and CSS course to see what building for the web was like, and I liked it. But after a full shift behind the wheel, I couldn’t make the habit stick.",
                ],
            },
            {
                id: "camino",
                waypoint: "Burgos to Santiago",
                heading: "At 24, I saved up and went to Europe alone.",
                paragraphs: [
                    "I knew the route wasn’t the life I wanted. So I flew out with a backpack and started walking the Camino de Santiago from Burgos.",
                    "The friends I made on that walk carried the rest of the trip. Their couches and company meant the next five months cost almost nothing, and I came home with a much clearer sense of what I wanted.",
                ],
                figures: [
                    { value: "300", label: "Miles on foot" },
                    { value: "3", label: "Weeks on the Camino" },
                    { value: "9", label: "Countries in six months" },
                ],
                route: ["Spain", "Portugal", "France", "Italy", "Austria", "Germany", "Denmark", "England", "Ireland"],
            },
            {
                id: "solar",
                waypoint: "Back in Southern Oregon",
                heading: "My next job was telling people the truth about their power bill.",
                paragraphs: [
                    "Back home, I screened customers for a solar company. I’d look over someone’s house and their power bills, and if solar wasn’t going to work for them, I told them so. The ones it did fit, I set up with a consultant.",
                    "Your business gets that same habit. I dig into what you actually need before anything gets built, and if the honest answer is a smaller project than the one you came in asking for, that’s the answer you’ll hear.",
                ],
            },
            {
                id: "all-in",
                waypoint: "All in",
                heading: "Getting laid off was the push I needed.",
                paragraphs: [
                    "For about a year I’d studied on and off, wrestling with JavaScript in whatever hours were left over. When the solar job ended, I stopped fitting code around my life and went all in.",
                    "The next eight months were fifty- and sixty-hour weeks. No classroom, no schedule, and nobody checking whether I showed up. Teaching yourself means finding your own gaps and filling them, one stubborn problem at a time.",
                ],
                aside: {
                    label: "Side note",
                    text: "I named my AI assistant Quincy, after freeCodeCamp’s founder, Quincy Larson. That free course was the door into all of this, and I don’t think I’d be here without it.",
                },
            },
            {
                id: "first-builds",
                waypoint: "First builds",
                heading: "My first real projects started with problems I’d seen up close.",
                paragraphs: [],
                builds: [
                    {
                        name: "Bullseye Ledger",
                        kind: "Archery scoring app",
                        summary:
                            "At 3D archery shoots you keep score on a paper card, with a bow in your other hand and no idea who’s winning. I built a one-handed phone scorecard with live standings. My friends and I use it at every shoot.",
                    },
                    {
                        name: "HomeBase",
                        kind: "Real estate field tool",
                        summary:
                            "Agents walking a listing were juggling ten-page paper forms, voice memos, and notes apps. I gave them one room-by-room tool that keeps saving in a basement with no signal. Agents use it in the field every day.",
                    },
                ],
            },
            {
                id: "why-i-stay",
                waypoint: "Why I’m still here",
                heading: "Code was supposed to be my ticket to travel.",
                headingAccent: "It became the work I’d pick over anything.",
                isStatement: true,
                paragraphs: [
                    "I wake up wanting to get back to whatever I left unsolved. I’m at my best stuck on something hard, talking it out loud until it gives. And because I taught myself every piece, I understand every line I hand you, so when your business changes, I know exactly where to make the change.",
                ],
            },
            {
                id: "today",
                waypoint: `${siteConfig.location}, today`,
                heading: "Now I build for the businesses around me.",
                paragraphs: [
                    `${siteConfig.name} is just me: Websites and Custom Tools for Southern Oregon businesses, built from scratch around how you already work. When you reach out, you’re talking to the person doing the work.`,
                ],
            },
        ] satisfies StoryChapter[],
        closingPrompt: "Is part of your business held together with spreadsheets and sticky notes?",
        closingLinkText: "Tell me about it",
        email: siteConfig.email,
    },
};
