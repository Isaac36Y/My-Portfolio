"use client";

import { useMemo, useSyncExternalStore } from "react";

const CLOCK_TICK_MS = 1000;

function subscribeToClock(tick: () => void) {
    const ticker = window.setInterval(tick, CLOCK_TICK_MS);
    return () => window.clearInterval(ticker);
}

export default function LocalTime({ timeZone }: { timeZone: string }) {
    const clockFormat = useMemo(
        () => new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit", second: "2-digit" }),
        [timeZone],
    );
    const localTime = useSyncExternalStore(
        subscribeToClock,
        () => clockFormat.format(new Date()),
        () => null,
    );

    return <>{localTime ?? "--:--:--"}</>;
}
