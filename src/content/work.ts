export type WorkPreview = {
    device: "laptop" | "phone" | "panel";
    src: string;
    alt: string;
    width: number;
    height: number;
};

export type WorkCategory = {
    id: "websites" | "custom-tools" | "seo-marketing";
    title: string;
    description: string;
    href: string;
    previews?: WorkPreview[];
};

export const work = {
    titleLead: "My",
    titleAccent: "Work",
    lede: "Everything here started from a blank file, not a template, and was shaped around the business it serves.",
    returnLabel: "Navigation",
    categories: [
        {
            id: "websites",
            href: "/my-work/websites",
            title: "Websites",
            description: "Fast, custom sites that make it easy for a customer to call, book, or buy.",
            previews: [
                {
                    device: "laptop",
                    src: "/images/websites-logo.png",
                    alt: "A laptop showing the Kinsington Care memory care website, with room availability for each community.",
                    width: 1448,
                    height: 1086,
                },
            ],
        },
        {
            id: "custom-tools",
            href: "/my-work/custom-tools",
            title: "Custom Tools",
            description: "Software built around how your business already runs, replacing the paper forms and spreadsheets.",
            previews: [
                {
                    device: "laptop",
                    src: "/images/desktopTool.png",
                    alt: "A laptop showing a seller's record in a listing intake tool: contact details, timeline, price expectations, and notes.",
                    width: 1536,
                    height: 1024,
                },
                {
                    device: "phone",
                    src: "/images/mobileTools.png",
                    alt: "A phone showing the same tool's room-by-room walkthrough, with location and flooring choices for each bedroom.",
                    width: 1024,
                    height: 1536,
                },
            ],
        },
        {
            id: "seo-marketing",
            href: "/my-work/seo",
            title: "SEO & Digital Marketing",
            description: "Getting you found by the people already searching for what you do.",
            previews: [
                {
                    device: "panel",
                    src: "/images/seo-dashboard.png",
                    alt: "An illustrated dashboard of what I track for a business: organic search, calls and leads, bookings, and map visibility, each trending upward.",
                    width: 1536,
                    height: 1024,
                },
            ],
        },
    ] satisfies WorkCategory[],
};
