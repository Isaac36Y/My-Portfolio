"use client";

import { getImageProps } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logoBackdropSizes, routeBackdrop, standingPortrait } from "@/lib/media/sharedImages";
import { afterIntro } from "./intro";

// Next only prefetches links as they scroll into view, and the home page's second scene sits off screen
// until the visitor travels to it, so its links to these pages would otherwise load on click.
const routes = ["/", "/about", "/why", "/my-work", "/my-work/websites", "/my-work/custom-tools", "/my-work/seo"];

const images = [
    getImageProps({ ...routeBackdrop, alt: "", sizes: logoBackdropSizes }).props,
    getImageProps({ ...standingPortrait, alt: "" }).props,
];

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

function isOnConstrainedNetwork(): boolean {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    return Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType ?? "");
}

// Sizes and srcset go on before src, as in the markup, so the browser picks the same candidate the page will.
function warmImage({ src, srcSet, sizes }: (typeof images)[number]) {
    const image = new Image();
    if (sizes) image.sizes = sizes;
    if (srcSet) image.srcset = srcSet;
    image.src = src;
}

function whenIdle(callback: () => void) {
    // Safari has no requestIdleCallback.
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(callback, { timeout: 3000 });
    else setTimeout(callback, 1000);
}

// Runs once per full page load, after the home intro if one is playing so it never competes with it.
export default function RouteWarmup() {
    const router = useRouter();

    useEffect(() => {
        let isCancelled = false;

        afterIntro().then(() =>
            whenIdle(() => {
                if (isCancelled) return;
                for (const route of routes) {
                    if (route !== window.location.pathname) router.prefetch(route);
                }
                if (!isOnConstrainedNetwork()) images.forEach(warmImage);
            }),
        );

        return () => {
            isCancelled = true;
        };
    }, [router]);

    return null;
}
