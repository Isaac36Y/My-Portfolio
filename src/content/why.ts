import { siteConfig } from "@/site.config";

export type Alternative = {
    id: string;
    option: string;
    whatHappens: string;
    myAnswer: string;
};

export type ProjectStep = {
    id: string;
    moment: string;
    whatYouGet: string;
};

export const why = {
    titleLead: "Why",
    titleAccent: siteConfig.name,
    lede: "Smart code and a great product is where it starts. For you, getting there should be easy and enjoyable.",
    returnLabel: "Navigation",
    alternatives: {
        heading: "There’s more than one way to get this built.",
        myAnswerLabel: "With me",
        options: [
            {
                id: "agency",
                option: "You could hire an agency.",
                whatHappens:
                    "A salesperson signs you, a project manager takes it from there, and the actual work goes to people you never meet. Every one of those layers is on your bill, and the contract usually runs a year whether it’s working or not.",
                myAnswer:
                    "The person who picks up when you call is the one building it. No account manager, no handoffs, and SEO runs month to month.",
            },
            {
                id: "site-builder",
                option: "You could build it yourself.",
                whatHappens:
                    "Site builders make the first afternoon feel easy. Then it’s your evenings, a theme half the businesses in town are already using, and a monthly fee that keeps coming whether the site brings in work or not.",
                myAnswer:
                    "Your site is designed around your business and how your customers look for you. The domain, hosting, and code are in your name from day one, so if you ever leave, all of it goes with you.",
            },
            {
                id: "off-the-shelf",
                option: "You could make do with off-the-shelf software.",
                whatHappens:
                    "It was made for the average business, so your team bends their routine around it, keeps a spreadsheet on the side for everything it can’t do, and pays for every seat, every month.",
                myAnswer:
                    "A custom tool starts from the way your shop already runs and does exactly that. When the way you work changes, the tool changes with it.",
            },
            {
                id: "prompted",
                option: "You could pay someone to ask an AI for it.",
                whatHappens:
                    "It’ll look finished fast. But if nobody understood the code going in, nobody can fix it when it breaks, change it when you need something new, or tell you whether your customers’ information is safe.",
                myAnswer:
                    "I know every line I ship and why it’s there. A year from now, when you want something changed, I can change it, because I know how it was built.",
            },
        ] satisfies Alternative[],
    },
    nextSteps: {
        heading: "What happens after you reach out.",
        steps: [
            {
                id: "first-conversation",
                moment: "The first conversation",
                whatYouGet:
                    "Mostly, I ask questions. Who your customers are, how a job moves through your business, what eats up your week, and where you want to be in a few years. I’d rather know your trade too well than build for the wrong one.",
            },
            {
                id: "before-work",
                moment: "Before any work starts",
                whatYouGet:
                    "You get a written scope and one written price. There’s no hourly meter running, and no final invoice bigger than the number we agreed on.",
            },
            {
                id: "while-building",
                moment: "While I build",
                whatYouGet:
                    "You hear from me regularly, without the jargon. When a choice affects your business, I tell you what each option changes and you make the call. Everything else, I handle.",
            },
            {
                id: "date-moves",
                moment: "If the date moves",
                whatYouGet:
                    "You hear it from me first, along with why. I’d rather lose a job over an honest timeline than win it with a fake one.",
            },
        ] satisfies ProjectStep[],
    },
    sendOff: {
        yourPart: "You know your business.",
        myPart: "I know how to build for it.",
        invitation: "Tell me what’s slowing you down, or what you wish your website did. I’ll tell you straight whether I’m the right person for it.",
        linkText: "Say hello",
        email: siteConfig.email,
    },
};
