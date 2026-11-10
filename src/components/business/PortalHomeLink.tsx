"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { rememberScene } from "@/components/experience/sceneMemory";
import { PORTAL_SWAP_TYPE } from "@/lib/motion/routeTravel";

// Back to the hero scene specifically, so the stage resumes where the mark it glides to is.
export default function PortalHomeLink({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <Link
            href="/"
            transitionTypes={[PORTAL_SWAP_TYPE]}
            onNavigate={() => {
                rememberScene("hero");
                // The hero never scrolls, so the swap only lines up from the top of this page.
                window.scrollTo(0, 0);
            }}
            aria-label="Younger Systems home"
            className={className}
        >
            {children}
        </Link>
    );
}
