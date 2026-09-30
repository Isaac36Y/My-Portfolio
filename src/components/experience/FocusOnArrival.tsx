"use client";

import { useEffect } from "react";

// A route change leaves focus on a link that no longer exists, so the new page's heading takes it.
export default function FocusOnArrival({ headingId }: { headingId: string }) {
    useEffect(() => {
        document.getElementById(headingId)?.focus({ preventScroll: true });
    }, [headingId]);

    return null;
}
