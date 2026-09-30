import { ViewTransition, type ReactNode } from "react";
import { routeTravelClasses } from "@/lib/motion/routeTravel";

// Wraps a page, not a layout: layouts persist across navigations, so they never enter or exit.
export default function RouteScene({ children }: { children: ReactNode }) {
    return (
        <ViewTransition enter={routeTravelClasses} exit={routeTravelClasses} default="none">
            {children}
        </ViewTransition>
    );
}
