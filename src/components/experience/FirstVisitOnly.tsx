"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { recordVisit } from "./firstVisit";

// Lets the page's entrance play only on its first visit this session. A layout effect, so on a client-side
// navigation the flag is set before the browser paints the new page and a repeat visit never starts its entrance.
export default function FirstVisitOnly() {
    const pathname = usePathname();
    // Decided once per mount: StrictMode's effect re-run would otherwise see this visit as already recorded.
    const isRevisitRef = useRef<boolean | null>(null);

    useLayoutEffect(() => {
        isRevisitRef.current ??= recordVisit(pathname);
        if (!isRevisitRef.current) return;

        const root = document.documentElement;
        root.dataset.revisit = "";
        return () => {
            delete root.dataset.revisit;
        };
    }, [pathname]);

    return null;
}
