import type { CSSProperties } from "react";
import Link from "next/link";
import { IconArrowNarrowRight, IconArrowUpRight, IconCheck, IconChevronRight } from "@tabler/icons-react";
import LogoBackdrop from "@/components/experience/LogoBackdrop";
import StageReturnLink from "@/components/experience/StageReturnLink";
import { seo } from "@/content/seo";
import { travelTypesFor } from "@/lib/motion/routeTravel";
import SearchChannels from "./SearchChannels";
import SearchDashboard from "./SearchDashboard";
import SearchTimeline from "./SearchTimeline";
import styles from "./SearchVisibility.module.scss";

function formatOrder(order: number) {
    return String(order + 1).padStart(2, "0");
}

const LOOP_RADIUS = 92;
const LOOP_CENTER = 130;

// The three monthly stages sit evenly around the loop, starting at the top and running clockwise.
function loopPoint(order: number, count: number) {
    const angle = -Math.PI / 2 + (order / count) * Math.PI * 2;
    return { x: LOOP_CENTER + Math.cos(angle) * LOOP_RADIUS, y: LOOP_CENTER + Math.sin(angle) * LOOP_RADIUS };
}

export default function SearchVisibility() {
    const { found, process, checklist, dashboard, report, finePrint, sendOff } = seo;
    const checkCount = checklist.groups.reduce((total, group) => total + group.items.length, 0);

    return (
        <section className={styles.page} aria-labelledby="seo-title" data-travel-layer="foreground">
            <LogoBackdrop
                src="/images/mark-outline-icemint-2-2048.png"
                width={2048}
                height={1387}
                fadesBeforeFold
            />

            <header className={styles.opener}>
                <div className={styles.wayfinding}>
                    <Link
                        href="/my-work"
                        transitionTypes={travelTypesFor({ direction: "right", staysOffStage: true })}
                        className={styles.wayLink}
                    >
                        <span className={`${styles.wayLabel} tech`}>{seo.myWorkLabel}</span>
                        <IconChevronRight stroke={2} className={styles.wayArrow} aria-hidden="true" />
                    </Link>
                    <StageReturnLink
                        labelByScene={seo.stageReturnLabels}
                        travel={{ direction: "right" }}
                        className={styles.wayLink}
                        labelClassName={`${styles.wayLabel} tech`}
                        arrow={<IconChevronRight stroke={2} className={styles.wayArrow} aria-hidden="true" />}
                    />
                </div>
                <div className={styles.titleBlock}>
                    <p className={`${styles.eyebrow} tech`}>{seo.eyebrow}</p>
                    <h1 id="seo-title" tabIndex={-1} className={styles.title}>
                        {seo.titleLead} <span className={styles.titleAccent}>{seo.titleAccent}</span>
                    </h1>
                </div>
                <p className={`${styles.lede} body`}>{seo.lede}</p>
            </header>

            {/* Where people look now, and what each place reads. */}
            <section className={styles.found} aria-labelledby="seo-found-title">
                <div className={styles.foundIntro}>
                    <div className={`${styles.sectionIntro} ${styles.revealsOnScroll}`}>
                        <h2 id="seo-found-title" className={styles.sectionHeading}>
                            {found.heading}
                        </h2>
                        <p className={`${styles.sectionLede} body`}>{found.intro}</p>
                    </div>
                    <aside className={`${styles.stat} ${styles.revealsOnScroll}`}>
                        <p className={styles.statValue}>{found.stat.value}</p>
                        <p className={`${styles.statText} body`}>{found.stat.text}</p>
                        <a href={found.stat.url} target="_blank" rel="noreferrer" className={`${styles.statSource} tech`}>
                            {found.stat.source}
                            <span className={styles.visuallyHidden}> {seo.newTabNotice}</span>
                            <IconArrowUpRight stroke={2} className={styles.statSourceArrow} aria-hidden="true" />
                        </a>
                    </aside>
                </div>

                <SearchChannels />

                <div className={styles.disciplines}>
                    <h3 className={`${styles.disciplinesHeading} tech`}>{found.disciplinesHeading}</h3>
                    <dl className={styles.disciplineList}>
                        {found.disciplines.map((discipline) => (
                            <div key={discipline.id} className={`${styles.discipline} ${styles.revealsOnScroll}`}>
                                <dt className={styles.disciplineTerm}>
                                    {discipline.term}
                                    {discipline.expansion && (
                                        <span className={`${styles.disciplineExpansion} tech`}>{discipline.expansion}</span>
                                    )}
                                </dt>
                                <dd className={`${styles.disciplineDefinition} body`}>{discipline.definition}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Five steps down a rail, then the monthly loop the rail runs into. */}
            <section className={styles.process} aria-labelledby="seo-process-title">
                <div className={`${styles.sectionIntro} ${styles.revealsOnScroll}`}>
                    <h2 id="seo-process-title" className={styles.sectionHeading}>
                        {process.heading}
                    </h2>
                    <p className={`${styles.sectionLede} body`}>{process.intro}</p>
                </div>

                <ol role="list" className={styles.steps}>
                    {process.steps.map((step, order) => (
                        <li key={step.id} className={styles.step}>
                            <span className={styles.stepRail} aria-hidden="true" />
                            <span className={`${styles.stepNode} tech`} aria-hidden="true">
                                {formatOrder(order)}
                            </span>
                            <div className={styles.stepLead}>
                                <p className={`${styles.stepName} tech`}>{step.name}</p>
                                <h3 className={styles.stepHeading}>{step.heading}</h3>
                            </div>
                            <div className={styles.stepBodyBlock}>
                                <p className={`${styles.stepBody} body`}>{step.body}</p>
                                <ul role="list" className={styles.stepDetails}>
                                    {step.details.map((detail) => (
                                        <li key={detail} className={`${styles.stepDetail} tech`}>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}

                    <li className={`${styles.step} ${styles.loopStep}`}>
                        <span className={styles.stepRail} aria-hidden="true" />
                        <span className={`${styles.stepNode} ${styles.loopNode}`} aria-hidden="true" />
                        <div className={styles.stepLead}>
                            <p className={`${styles.stepName} tech`}>{process.loop.name}</p>
                            <h3 className={styles.stepHeading}>{process.loop.heading}</h3>
                            <p className={`${styles.stepBody} body`}>{process.loop.body}</p>
                        </div>
                        <div className={styles.loop}>
                            <svg viewBox="0 0 260 260" className={styles.loopArt} role="img" aria-label={process.loop.stages.join(", then ")}>
                                <circle cx={LOOP_CENTER} cy={LOOP_CENTER} r={LOOP_RADIUS} className={styles.loopTrack} />
                                <circle cx={LOOP_CENTER} cy={LOOP_CENTER} r={LOOP_RADIUS} className={styles.loopFlow} />
                                <g className={styles.loopOrbit}>
                                    <circle cx={LOOP_CENTER} cy={LOOP_CENTER - LOOP_RADIUS} r="5" className={styles.loopRunner} />
                                </g>
                                {process.loop.stages.map((stage, order) => {
                                    const point = loopPoint(order, process.loop.stages.length);
                                    return (
                                        <g key={stage}>
                                            <circle cx={point.x} cy={point.y} r="7" className={styles.loopStop} />
                                            <text
                                                x={point.x}
                                                y={order === 0 ? point.y - 18 : point.y + 30}
                                                textAnchor="middle"
                                                className={styles.loopLabel}
                                            >
                                                {stage}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                    </li>
                </ol>
            </section>

            {/* The sheer length of this list is the point. */}
            <section className={styles.checklist} aria-labelledby="seo-checklist-title">
                <div className={styles.checklistIntro}>
                    <div className={`${styles.sectionIntro} ${styles.revealsOnScroll}`}>
                        <h2 id="seo-checklist-title" className={styles.sectionHeading}>
                            {checklist.heading}
                        </h2>
                        <p className={`${styles.sectionLede} body`}>{checklist.intro}</p>
                    </div>
                    <p className={`${styles.checkCount} ${styles.revealsOnScroll}`}>
                        <span className={styles.checkCountValue}>{checkCount}</span>
                        <span className={`${styles.checkCountLabel} tech`}>{checklist.countLabel}</span>
                    </p>
                </div>

                <ul role="list" className={styles.checkGroups}>
                    {checklist.groups.map((group) => (
                        <li key={group.id} className={styles.checkGroup}>
                            <h3 className={styles.checkGroupName}>
                                {group.name}
                                <span className={`${styles.checkGroupCount} tech`}>{group.items.length}</span>
                            </h3>
                            <ul role="list" className={styles.checkItems}>
                                {group.items.map((item, order) => (
                                    <li
                                        key={item}
                                        className={`${styles.checkItem} body`}
                                        style={{ "--item-order": order } as CSSProperties}
                                    >
                                        <span className={styles.checkBox} aria-hidden="true">
                                            <IconCheck stroke={3} className={styles.checkMark} />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles.dashboard} aria-labelledby="seo-dashboard-title">
                <div className={`${styles.sectionIntro} ${styles.revealsOnScroll}`}>
                    <h2 id="seo-dashboard-title" className={styles.sectionHeading}>
                        {dashboard.heading}
                    </h2>
                    <p className={`${styles.sectionLede} body`}>{dashboard.intro}</p>
                </div>
                <SearchDashboard />
            </section>

            {/* A sample of the monthly report beside what comes with it. */}
            <section className={styles.report} aria-labelledby="seo-report-title">
                <div className={`${styles.sectionIntro} ${styles.revealsOnScroll}`}>
                    <h2 id="seo-report-title" className={styles.sectionHeading}>
                        {report.heading}
                    </h2>
                    <p className={`${styles.sectionLede} body`}>{report.intro}</p>
                </div>

                <div className={styles.reportBody}>
                    <article className={`${styles.reportCard} ${styles.revealsOnScroll}`} aria-label={`${report.sample.sampleTag} ${report.sample.kicker.toLowerCase()}`}>
                        <header className={styles.reportHeader}>
                            <p className={`${styles.reportKicker} tech`}>
                                {report.sample.kicker}
                                <span className={styles.reportTag}>{report.sample.sampleTag}</span>
                            </p>
                            <p className={styles.reportMonth}>{report.sample.month}</p>
                            <p className={`${styles.reportFrom} body`}>{report.sample.from}</p>
                        </header>
                        {report.sample.blocks.map((block) => (
                            <section key={block.id} className={styles.reportBlock} aria-label={block.heading}>
                                <h3 className={`${styles.reportBlockHeading} tech`}>{block.heading}</h3>
                                <ul role="list" className={styles.reportLines}>
                                    {block.lines.map((line) => (
                                        <li key={line} className={`${styles.reportLine} body`}>
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                        <p className={styles.reportSignOff}>{report.sample.signOff}</p>
                    </article>

                    <ul role="list" className={styles.promises}>
                        {report.promises.map((promise) => (
                            <li key={promise.id} className={`${styles.promise} ${styles.revealsOnScroll}`}>
                                <h3 className={styles.promiseHeading}>{promise.heading}</h3>
                                <p className={`${styles.promiseBody} body`}>{promise.body}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Two roads to the same place, picked by where the visitor is starting from. */}
            <section className={styles.timeline} aria-labelledby="seo-timeline-title">
                <div className={`${styles.sectionIntro} ${styles.revealsOnScroll}`}>
                    <h2 id="seo-timeline-title" className={styles.sectionHeading}>
                        {seo.timeline.heading}
                    </h2>
                    <p className={`${styles.sectionLede} body`}>{seo.timeline.intro}</p>
                </div>
                <SearchTimeline />
            </section>

            <section className={styles.finePrint} aria-labelledby="seo-fine-print-title">
                <div className={`${styles.sectionIntro} ${styles.revealsOnScroll}`}>
                    <h2 id="seo-fine-print-title" className={styles.sectionHeading}>
                        {finePrint.heading}
                    </h2>
                    <p className={`${styles.sectionLede} body`}>{finePrint.intro}</p>
                </div>

                <ol role="list" className={styles.terms}>
                    {finePrint.terms.map((term, order) => (
                        <li key={term.id} className={styles.term}>
                            <span className={styles.termRule} aria-hidden="true" />
                            <span className={`${styles.termNumber} tech`} aria-hidden="true">
                                {formatOrder(order)}
                            </span>
                            <h3 className={styles.termStatement}>{term.statement}</h3>
                            <p className={`${styles.termDetail} body`}>{term.detail}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <footer className={styles.sendOff}>
                <p className={styles.handshake}>
                    <span className={styles.yourPart}>{sendOff.yourPart}</span>{" "}
                    <span className={styles.myPart}>{sendOff.myPart}</span>
                </p>
                <div className={`${styles.invitation} ${styles.revealsOnScroll}`}>
                    <p className={`${styles.invitationText} body`}>{sendOff.invitation}</p>
                    <a href={`mailto:${sendOff.email}`} className={styles.helloLink}>
                        {sendOff.linkText}
                        <IconArrowNarrowRight stroke={2} className={styles.helloArrow} aria-hidden="true" />
                    </a>
                </div>
            </footer>
        </section>
    );
}
