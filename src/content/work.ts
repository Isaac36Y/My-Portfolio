export type WorkCategory = {
    id: "websites" | "custom-tools" | "seo-marketing";
    title: string;
    description: string;
};

export const work = {
    titleLead: "My",
    titleAccent: "Work",
    lede: "Everything here started from a blank file, not a template, and was shaped around the business it serves.",
    returnLabel: "Navigation",
    categories: [
        {
            id: "websites",
            title: "Websites",
            description: "Fast, custom sites that make it easy for a customer to call, book, or buy.",
        },
        {
            id: "custom-tools",
            title: "Custom Tools",
            description: "Software built around how your business already runs, replacing the paper forms and spreadsheets.",
        },
        {
            id: "seo-marketing",
            title: "SEO & Digital Marketing",
            description: "Getting you found by the people already searching for what you do.",
        },
    ] satisfies WorkCategory[],
};
