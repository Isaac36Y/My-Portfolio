import type { Metadata } from "next";
import CaseStudy from "@/components/business/CaseStudy";
import { customTools } from "@/content/tools";
import { siteConfig } from "@/site.config";

const description = `Custom software Isaac Young has designed and built from scratch at ${siteConfig.name} in ${siteConfig.location}.`;

export const metadata: Metadata = {
    title: "Custom Tools",
    description,
    alternates: { canonical: "/my-work/custom-tools" },
    openGraph: {
        type: "website",
        url: "/my-work/custom-tools",
        siteName: siteConfig.name,
        title: `Custom Tools | ${siteConfig.name}`,
        description,
        locale: "en_US",
    },
};

export default function CustomToolsPage() {
    const [firstTool, secondTool] = customTools.tools;
    return <CaseStudy tool={firstTool} nextTool={secondTool ?? firstTool} />;
}
