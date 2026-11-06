import type { ReactNode } from "react";
import ToolDashboard from "@/components/business/ToolDashboard";
import FocusOnArrival from "@/components/experience/FocusOnArrival";
import RouteScene from "@/components/experience/RouteScene";
import styles from "./layout.module.scss";

// The dashboard is a layout so it stays mounted while the open case study changes: the strip keeps its scroll
// position and only the case panel swaps. It still enters and exits as one page when arriving or leaving.
export default function CustomToolsLayout({ children }: { children: ReactNode }) {
    return (
        <RouteScene>
            <main className={styles.main}>
                <ToolDashboard openCaseStudy={children} />
                <FocusOnArrival headingId="custom-tools-title" />
            </main>
        </RouteScene>
    );
}
