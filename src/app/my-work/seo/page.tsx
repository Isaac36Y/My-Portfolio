import type { Metadata } from "next";
import SearchVisibility from "@/components/business/SearchVisibility";
import FocusOnArrival from "@/components/experience/FocusOnArrival";
import RouteScene from "@/components/experience/RouteScene";
import { seo } from "@/content/seo";
import { siteConfig } from "@/site.config";
import styles from "./page.module.scss";

const title = "SEO, AEO & Local Search";
const description = `SEO, local SEO, and AI search optimization by Isaac Young at ${siteConfig.name} in ${siteConfig.location}. Get found on Google, on the map, and in ChatGPT. Month to month, with a plain-English report every month.`;

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/my-work/seo" },
    openGraph: {
        type: "website",
        url: "/my-work/seo",
        siteName: siteConfig.name,
        title: `${title} | ${siteConfig.name}`,
        description,
        locale: "en_US",
    },
};

// Describes the service itself, so search engines and AI assistants can state plainly what is offered and where.
const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${seo.titleLead} ${seo.titleAccent}`,
    serviceType: "Search engine optimization",
    description,
    url: "https://isaacyoungs.dev/my-work/seo",
    areaServed: { "@type": "City", name: siteConfig.location },
    provider: {
        "@type": "ProfessionalService",
        name: siteConfig.name,
        url: "https://isaacyoungs.dev",
        email: siteConfig.email,
        founder: { "@type": "Person", name: "Isaac Young" },
        address: { "@type": "PostalAddress", addressLocality: "Medford", addressRegion: "OR", addressCountry: "US" },
    },
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Search visibility services",
        itemListElement: seo.found.disciplines.map((discipline) => ({
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: discipline.expansion ? `${discipline.term} (${discipline.expansion})` : discipline.term,
                description: discipline.definition,
            },
        })),
    },
};

export default function SeoPage() {
    return (
        <RouteScene>
            <main className={styles.main}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }}
                />
                <SearchVisibility />
                <FocusOnArrival headingId="seo-title" />
            </main>
        </RouteScene>
    );
}
