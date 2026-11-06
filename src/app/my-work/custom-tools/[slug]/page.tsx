import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/business/CaseStudy";
import FocusOnArrival from "@/components/experience/FocusOnArrival";
import { caseStudyPath, customTools, findTool } from "@/content/tools";
import { siteConfig } from "@/site.config";

type CaseStudyPageProps = {
    params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return customTools.tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
    const { slug } = await params;
    const tool = findTool(slug);
    if (!tool) return {};

    const canonicalPath = caseStudyPath(tool.slug);
    return {
        title: `${tool.name} case study`,
        description: tool.summary,
        alternates: { canonical: canonicalPath },
        openGraph: {
            type: "article",
            url: canonicalPath,
            siteName: siteConfig.name,
            title: `${tool.name} case study | ${siteConfig.name}`,
            description: tool.summary,
            locale: "en_US",
        },
    };
}

// Focus moves to the case study only when switching tools; arriving from elsewhere, the layout's heading wins
// because its effect runs after this one.
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
    const { slug } = await params;
    const { tools } = customTools;
    const toolIndex = tools.findIndex((tool) => tool.slug === slug);
    if (toolIndex === -1) notFound();

    const nextTool = tools[(toolIndex + 1) % tools.length];

    return (
        <>
            <CaseStudy tool={tools[toolIndex]} nextTool={nextTool} />
            <FocusOnArrival headingId="case-study-title" />
        </>
    );
}
