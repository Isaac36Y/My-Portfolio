"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./PinnedWayfinding.module.scss";

type PinnedWayfindingProps = {
    label: string;
    // The page's own layout for its links. The pinned copy keeps it, so each link stays on the side it travels toward.
    className?: string;
    children: ReactNode;
};

// A long page scrolls its way-out links off the top. Once they are a full screen behind the reader, a copy
// slides down and stays pinned, each link on its own chip so it reads over whatever passes underneath.
// The copy is a second set of the same links, inert while it is hidden, so the page's links never move or jump.
export default function PinnedWayfinding({ label, className, children }: PinnedWayfindingProps) {
    const navRef = useRef<HTMLElement>(null);
    const [pinned, setPinned] = useState(false);

    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        // Growing the viewport by a screen upward means the links count as in view until they are 100vh above it.
        const observer = new IntersectionObserver(
            ([entry]) => setPinned(!entry.isIntersecting && entry.boundingClientRect.top < 0),
            { rootMargin: "100% 0px 0px 0px" },
        );
        observer.observe(nav);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <nav ref={navRef} className={className} aria-label={label}>
                {children}
            </nav>
            <div className={`${className ?? ""} ${styles.pinned}`} data-shown={pinned} inert={!pinned}>
                {children}
            </div>
        </>
    );
}
