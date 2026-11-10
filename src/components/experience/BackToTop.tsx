"use client";

import { IconArrowUp } from "@tabler/icons-react";

type BackToTopProps = {
    // Scrolling up hides the pinned row this button lives in, so focus moves to the page's heading instead of vanishing.
    focusTargetId: string;
    className?: string;
    arrowClassName?: string;
};

export default function BackToTop({ focusTargetId, className, arrowClassName }: BackToTopProps) {
    function scrollToTop() {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
        document.getElementById(focusTargetId)?.focus({ preventScroll: true });
    }

    return (
        <button type="button" onClick={scrollToTop} aria-label="Back to top" className={className}>
            <IconArrowUp stroke={2} className={arrowClassName} aria-hidden="true" />
        </button>
    );
}
