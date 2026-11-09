import type { ReactNode } from "react";
import Link from "next/link";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import PinnedWayfinding from "@/components/experience/PinnedWayfinding";
import StageReturnLink from "@/components/experience/StageReturnLink";
import { customTools } from "@/content/tools";
import { travelTypesFor } from "@/lib/motion/routeTravel";
import ToolStrip from "./ToolStrip";
import styles from "./ToolDashboard.module.scss";

export default function ToolDashboard({ openCaseStudy }: { openCaseStudy: ReactNode }) {
    const { title, lede, myWorkLabel, stageReturnLabels } = customTools;

    return (
        <section className={styles.dashboard} aria-labelledby="custom-tools-title" data-travel-layer="foreground">
            <header className={styles.bar}>
                <div className={styles.heading}>
                    <h1 id="custom-tools-title" tabIndex={-1} className={styles.title}>
                        {title}
                    </h1>
                    <p className={`${styles.lede} body`}>{lede}</p>
                </div>

                <PinnedWayfinding className={styles.wayfinding} label="Leave Custom Tools">
                    <Link
                        href="/my-work"
                        transitionTypes={travelTypesFor({ direction: "up", staysOffStage: true })}
                        className={styles.wayLink}
                    >
                        <IconChevronUp stroke={2} className={styles.myWorkArrow} aria-hidden="true" />
                        <span className={`${styles.wayLabel} tech`}>{myWorkLabel}</span>
                    </Link>
                    <StageReturnLink
                        labelByScene={stageReturnLabels}
                        travel={{ direction: "down" }}
                        className={styles.wayLink}
                        labelClassName={`${styles.wayLabel} tech`}
                        arrow={<IconChevronDown stroke={2} className={styles.stageArrow} aria-hidden="true" />}
                    />
                </PinnedWayfinding>
            </header>

            <ToolStrip className={styles.strip} />

            <div className={styles.panel}>{openCaseStudy}</div>
        </section>
    );
}
