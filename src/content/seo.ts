import type { SceneId } from "@/components/experience/scenes";
import { siteConfig } from "@/site.config";

export type SearchChannel = {
    id: "search" | "maps" | "overviews" | "assistants";
    name: string;
    discipline: string;
    summary: string;
    readsLabel: string;
    reads: string[];
};

export type Discipline = {
    id: string;
    term: string;
    expansion?: string;
    definition: string;
};

export type ProcessStep = {
    id: string;
    name: string;
    heading: string;
    body: string;
    details: string[];
};

export type CheckGroup = {
    id: string;
    name: string;
    items: string[];
};

export type DashboardTile = {
    id: "calls" | "bookings" | "map" | "ai" | "traffic" | "impressions";
    label: string;
    kind: "bars" | "line" | "pin" | "chat";
    tier: "growth" | "signal";
};

export type TimelinePhase = {
    id: string;
    when: string;
    name: string;
    body: string;
};

export type TimelinePath = {
    id: "scratch" | "existing";
    label: string;
    summary: string;
    phases: TimelinePhase[];
};

export type ReportBlock = {
    id: string;
    heading: string;
    lines: string[];
};

export type FinePrintTerm = {
    id: string;
    statement: string;
    detail: string;
};

export const seo = {
    eyebrow: "SEO · AEO · Local",
    titleLead: "Search",
    titleAccent: "Visibility",
    lede: "Your customers are searching on Google, on the map, and now by asking AI. I make sure your business is the answer everywhere they look.",
    myWorkLabel: "My Work",
    stageReturnLabels: { hero: "Home", introduction: "Navigation" } satisfies Record<SceneId, string>,
    newTabNotice: "(opens in a new tab)",

    found: {
        heading: "What it takes to get found now.",
        intro: "Google is still where most people start. But more of your customers are skipping the search bar and just asking AI. Every one of these places decides who to show in its own way, and your business needs to be the answer in all of them.",
        stat: {
            value: "45%",
            text: "of consumers now ask AI tools like ChatGPT for local business recommendations, up from just 6% a year earlier.",
            source: "BrightLocal, Local Consumer Review Survey 2026",
            url: "https://www.brightlocal.com/research/local-consumer-review-survey/",
        },
        diagramLabel:
            "One customer question goes four places: Google Search, Google Maps, Google's AI Overviews, and AI assistants like ChatGPT. Each one decides who to recommend in its own way, and all four lead back to your business.",
        question: "Who’s the best plumber near me?",
        questionLabel: "Your customer asks",
        answer: "Your business",
        answerLabel: "The answer, everywhere they ask",
        channels: [
            {
                id: "search",
                name: "Google Search",
                discipline: "SEO",
                summary: "The classic list of results.",
                readsLabel: "Looks at",
                reads: [
                    "Your website’s content, speed, and structure",
                    "Which page answers the search best",
                    "Links from other sites it trusts",
                ],
            },
            {
                id: "maps",
                name: "Google Maps",
                discipline: "Local SEO",
                summary: "The map, and every “near me” search.",
                readsLabel: "Looks at",
                reads: [
                    "Your Google Business Profile",
                    "Your reviews, and how you answer them",
                    "Where you are and the area you serve",
                ],
            },
            {
                id: "overviews",
                name: "AI Overviews",
                discipline: "AEO",
                summary: "Google’s AI answer, above every result.",
                readsLabel: "Looks at",
                reads: [
                    "Clear answers it can quote from your site",
                    "Structured data that describes your business",
                    "Pages Google already trusts",
                ],
            },
            {
                id: "assistants",
                name: "ChatGPT & AI assistants",
                discipline: "AEO",
                summary: "Asking, instead of searching.",
                readsLabel: "Looks at",
                reads: [
                    "What the rest of the web says about you",
                    "The same name, details, and reviews everywhere",
                    "Plain facts it can repeat with confidence",
                ],
            },
        ] satisfies SearchChannel[],
        disciplinesHeading: "The work, in plain English.",
        disciplines: [
            {
                id: "seo",
                term: "SEO",
                expansion: "Search engine optimization",
                definition: "Ranking your website on Google for the searches that bring you work.",
            },
            {
                id: "local",
                term: "Local SEO",
                definition: "Showing up on the map and in “near me” searches across the towns you serve.",
            },
            {
                id: "aeo",
                term: "AEO",
                expansion: "Answer engine optimization",
                definition: "Making your business the one AI recommends when someone asks instead of searching.",
            },
            {
                id: "ads",
                term: "Paid search",
                definition: "When it fits your business, ads that put you at the top today while everything else builds.",
            },
        ] satisfies Discipline[],
    },

    process: {
        heading: "How I get you there.",
        intro: "Five steps to build it right, then a loop that keeps it climbing for as long as we work together.",
        steps: [
            {
                id: "learn",
                name: "Learn",
                heading: "I learn your business first.",
                body: "Your trade, your customers, the towns you serve, and who you’re up against. You can’t win the right searches until you know which searches are the right ones.",
                details: ["Your most valuable services", "Who your best customers are", "Where they come from", "Who you’re competing with"],
            },
            {
                id: "audit",
                name: "Audit",
                heading: "I look at everything you have now.",
                body: "Your website, your Google Business Profile, your listings across the web, and what AI tools say about you today. Every problem gets written down and ranked by how much it’s costing you.",
                details: ["Website health", "Business Profile", "Directory listings", "What AI says about you"],
            },
            {
                id: "research",
                name: "Research",
                heading: "I find what your customers actually type.",
                body: "Not guesses. Real searches and real questions, broken down by service and by town, each one matched to the page that should win it.",
                details: ["Searches by service", "Searches by town", "Questions people ask AI", "Gaps your competitors left"],
            },
            {
                id: "foundation",
                name: "Foundation",
                heading: "I fix what’s holding you back.",
                body: "Speed, structure, broken pages, mismatched listings, missing data. The unglamorous work that everything else stands on, done before anything new gets built.",
                details: ["Site speed", "Page structure", "Structured data", "Listing cleanup"],
            },
            {
                id: "build",
                name: "Build",
                heading: "I build what gets you found.",
                body: "Pages for every service and every town you serve, answers AI tools can quote, a steady flow of new reviews, and a Business Profile that never goes quiet.",
                details: ["Service pages", "Town pages", "Review requests", "Profile updates"],
            },
        ] satisfies ProcessStep[],
        loop: {
            name: "Every month",
            heading: "Then it never stops.",
            body: "Search never sits still, so neither do I. Every month I measure what moved, walk you through it, and sharpen the plan for the month ahead.",
            stages: ["Measure", "Report", "Adjust"],
        },
    },

    checklist: {
        heading: "Everything I check.",
        intro: "Before I change a single thing, every one of these gets looked at. Most of them get looked at again every month.",
        countLabel: "checks, every client",
        groups: [
            {
                id: "technical",
                name: "Technical",
                items: [
                    "Pages load fast on a phone",
                    "Google can reach and index every page that matters",
                    "No broken links or dead-end redirects",
                    "Clean, readable page addresses",
                    "Sitemap submitted to Google and Bing",
                    "Nothing important blocked from search engines",
                    "Secure on every page",
                    "Reads well on every screen size",
                ],
            },
            {
                id: "on-page",
                name: "On-page",
                items: [
                    "A unique title and description on every page",
                    "One clear headline per page, with headings in order",
                    "A dedicated page for every service",
                    "A reason to rank in every town you serve",
                    "Images compressed, named, and described",
                    "Related pages linked to each other",
                    "Your phone number one tap away, everywhere",
                    "No two pages fighting over the same search",
                ],
            },
            {
                id: "local",
                name: "Local",
                items: [
                    "Google Business Profile complete and verified",
                    "The right primary and secondary categories",
                    "Services, hours, and service area all accurate",
                    "Fresh photos added on a schedule",
                    "Name, address, and phone identical everywhere online",
                    "Listed on Apple Maps, Bing Places, Yelp, and your trade’s directories",
                    "An easy way to ask every customer for a review",
                    "Every review answered",
                ],
            },
            {
                id: "content",
                name: "Content",
                items: [
                    "What customers actually type, matched to a page",
                    "The questions customers ask, answered on your site",
                    "Written for your customers, not for robots",
                    "Seasonal searches planned ahead of the season",
                    "Competitor pages compared and gaps found",
                    "Older pages refreshed instead of left to fade",
                    "A clear next step at the end of every page",
                ],
            },
            {
                id: "ai",
                name: "AI visibility",
                items: [
                    "What ChatGPT, Gemini, and Google’s AI say about you today",
                    "Structured data for your business, services, and reviews",
                    "Short, quotable answers to common questions",
                    "Who you are, where you work, and what you do, stated plainly",
                    "Your business mentioned consistently across the web",
                    "AI crawlers allowed to read your site",
                    "Which AI answers mention you, tracked over time",
                ],
            },
            {
                id: "tracking",
                name: "Tracking",
                items: [
                    "Google Analytics set up, in your name",
                    "Search Console and Bing Webmaster Tools verified",
                    "Calls from search and maps tracked",
                    "Form fills and bookings counted as wins",
                    "Map rankings tracked across your service area",
                    "A starting baseline, so every gain is measured",
                ],
            },
        ] satisfies CheckGroup[],
    },

    dashboard: {
        heading: "Numbers that mean business.",
        intro: "Traffic and impressions are great to watch climb. But the numbers I care about most are the ones that show your business growing: the calls, the bookings, and the customers who found you.",
        label: "What I track for every client",
        caption: "Every one of these lands in your monthly report.",
        tierLabels: { growth: "Growth", signal: "Signals" },
        tiles: [
            { id: "calls", label: "Calls & leads", kind: "bars", tier: "growth" },
            { id: "bookings", label: "Bookings", kind: "line", tier: "growth" },
            { id: "map", label: "Map visibility", kind: "pin", tier: "growth" },
            { id: "ai", label: "AI mentions", kind: "chat", tier: "growth" },
            { id: "traffic", label: "Search traffic", kind: "line", tier: "signal" },
            { id: "impressions", label: "Impressions", kind: "line", tier: "signal" },
        ] satisfies DashboardTile[],
    },

    report: {
        heading: "You’ll hear from me every month.",
        intro: "SEO usually gets sold like a commodity: a big agency, an auto-generated report, and a new account manager every quarter. I do it differently.",
        sample: {
            kicker: "Monthly report",
            sampleTag: "Sample",
            month: "October",
            from: "From Isaac",
            blocks: [
                {
                    id: "did",
                    heading: "What I did",
                    lines: [
                        "Built pages for drain cleaning and water heater repair",
                        "Answered every new review within a day",
                        "Fixed three listings still showing your old phone number",
                    ],
                },
                {
                    id: "moved",
                    heading: "What moved",
                    lines: [
                        "More calls from Google Maps than any month so far",
                        "ChatGPT now names you when asked for a plumber in Medford",
                    ],
                },
                {
                    id: "next",
                    heading: "What’s next",
                    lines: [
                        "A Central Point page, where you get calls but don’t rank yet",
                        "Water heater content, ahead of the cold snap",
                    ],
                },
            ] satisfies ReportBlock[],
            signOff: "Talk Thursday?",
        },
        promises: [
            {
                id: "plain",
                heading: "Plain English, every time.",
                body: "What I did, what moved, and what’s next. Never a forty-page PDF full of charts nobody explained.",
            },
            {
                id: "together",
                heading: "We go over it together.",
                body: "A call or a coffee, your pick. You’ll know where your money went and exactly why.",
            },
            {
                id: "direct",
                heading: "A direct line, all month long.",
                body: "You never wait for the report to reach me. Call, text, or email, and I’m the one who answers.",
            },
        ],
    },

    timeline: {
        heading: "Where you’ll be, and when.",
        intro: "Every business starts from a different place. Pick yours and see the road from here.",
        pickerLabel: "Where are you starting?",
        chartLabel: "Momentum over the first year",
        paths: [
            {
                id: "scratch",
                label: "Starting from scratch",
                summary: "No SEO yet means nothing to undo. We build it right from the first page.",
                phases: [
                    {
                        id: "foundation",
                        when: "Month 1",
                        name: "Foundation",
                        body: "Your site tuned up, your Business Profile built out, your listings cleaned up, and tracking in place from day one.",
                    },
                    {
                        id: "on-the-map",
                        when: "Months 2–3",
                        name: "On the map",
                        body: "Google picks up your new pages. You start showing up for your name and core services, and reviews start rolling in.",
                    },
                    {
                        id: "climbing",
                        when: "Months 4–6",
                        name: "Climbing",
                        body: "Rankings move up for the searches that bring calls, and the first customers start finding you on their own.",
                    },
                    {
                        id: "compounding",
                        when: "Month 6 on",
                        name: "Compounding",
                        body: "Every page, review, and mention stacks on the last. Growth starts building on itself.",
                    },
                ],
            },
            {
                id: "existing",
                label: "I have SEO now",
                summary: "You already have something to build on. We find what’s working and push it further.",
                phases: [
                    {
                        id: "audit",
                        when: "Month 1",
                        name: "Audit & quick wins",
                        body: "I find what’s working and what’s holding you back. Fixing what’s already there is often where the fastest gains hide.",
                    },
                    {
                        id: "gaps",
                        when: "Months 2–3",
                        name: "Close the gaps",
                        body: "Missing services and towns get pages, your profile gets tightened up, and your business gets ready for AI answers.",
                    },
                    {
                        id: "pull-ahead",
                        when: "Months 3–6",
                        name: "Pull ahead",
                        body: "We go after the searches your competitors own today, one service and one town at a time.",
                    },
                    {
                        id: "compounding",
                        when: "Month 6 on",
                        name: "Compounding",
                        body: "With the foundation solid, every month of work adds to the last and the lead keeps growing.",
                    },
                ],
            },
        ] satisfies TimelinePath[],
    },

    finePrint: {
        heading: "The fine print, out in the open.",
        intro: "No lock-ins, no shortcuts, and nothing hidden from you.",
        terms: [
            {
                id: "month-to-month",
                statement: "Month to month. No contract.",
                detail: "You stay because it’s working, not because a contract says you have to. If you ever want to stop, you just tell me.",
            },
            {
                id: "honest",
                statement: "Honest work that works.",
                detail: "No spammy links, no tricks, and no shortcuts that get sites penalized. Just the work Google and AI tools reward, done carefully every month.",
            },
            {
                id: "ownership",
                statement: "Everything stays in your name.",
                detail: "Your Business Profile, Analytics, Search Console, and every page I write are yours from day one. If you ever leave, all of it leaves with you.",
            },
            {
                id: "visible",
                statement: "You’ll always know what I’m doing.",
                detail: "Every piece of work shows up in your monthly report. Nothing happens to your business that you can’t see.",
            },
        ] satisfies FinePrintTerm[],
    },

    sendOff: {
        yourPart: "You run the business.",
        myPart: "I’ll make sure customers find it.",
        invitation: "Tell me what you do and where you serve. I’ll show you where you stand today, on Google and in AI, and what it takes to get you to the top.",
        linkText: "Let’s talk",
        email: siteConfig.email,
    },
};
