import type { MetadataRoute } from "next";
import { customTools } from "@/content/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://isaacyoungs.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://isaacyoungs.dev/my-work",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://isaacyoungs.dev/my-work/websites",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://isaacyoungs.dev/my-work/custom-tools",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...customTools.tools.slice(1).map((tool) => ({
      url: `https://isaacyoungs.dev/my-work/custom-tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: "https://isaacyoungs.dev/why",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://isaacyoungs.dev/portfolio",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}