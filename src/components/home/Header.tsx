import styles from "./Header.module.scss";
import filterStravaActivities from "@/lib/strava";
import { getHalfYearContributions } from "@/lib/contributions";
import { IconRun, IconCode, IconBook } from "@tabler/icons-react";
import { NavBarWrapper, SlideAway } from "../NavLogic/SlideAway";
import { Nav, DesktopNav } from "./Nav";
import ContributionsGraph from "./contributionsGraph/graph";

function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.sqlquery}>
                <p className="tech accent-text">SELECT * FROM devolopers WHERE type @&gt; "problem-solver"</p>
            </div>
            <h1 className={`${styles.heroName} primary-text`}>
                Isaac <span className={`${styles.lastName} accent-text`}>Young.</span>
            </h1>
            {/* <p className={`${styles.description} tech secondary-text`}>// software engineer & creative dev</p> */}
        </div>
    );
}

function CurrentRead() {
    return (
        <div className={`${styles.status} tech secondary-text`}>
            <div className={`${styles.label}`}>
                <IconBook stroke={1.75} size={24} color="var(--color-secondary)" />
                <p>listening</p>
            </div>
            <a href="" className={`${styles.currentRead} body`}>
                Artifact
                <br />
                by Jeremy Robinson
            </a>
        </div>
    );
}

async function WeeklyMiles() {
    const last7Activities = await filterStravaActivities();
    const meters = last7Activities.reduce((acc: number, curr: { distance: number }) => acc + curr.distance, 0);
    const miles = (meters / 1609).toFixed(1);

    return (
        <div className={`${styles.status} tech secondary-text`}>
            <div className={`${styles.label}`}>
                <IconRun stroke={1.75} size={24} color="var(--color-secondary)" />
                <p>running</p>
            </div>
            <a href="https://www.strava.com/athletes/125614194" className={`${styles.milesLink} body`}>
                {miles} miles this week
            </a>
        </div>
    );
}

function CurrentWork() {
    return (
        <div className={`${styles.status} tech secondary-text`}>
            <div className={`${styles.label}`}>
                <IconCode stroke={1.75} size={24} color="var(--color-secondary)" />
                <p>building </p>
            </div>
            <a href="https://github.com/Isaac36Y" className={`${styles.currentWork} body`}>
                my-portfolio
            </a>
        </div>
    );
}

async function AboutMeRecents() {
    const contributionDays = await getHalfYearContributions();
    return (
        <section className={styles.statusContainer}>
            <p className={`${styles.statusHeader} tech secondary-text`}>
                DEVELOPER PROFILE<span>DEV_ID. IY-0901</span>
            </p>
            <div className={styles.picContainer}>
                <div className={styles.profilePic}>
                    <img height={720} width={720} src="images/profilePic.jpeg" alt="" />
                </div>
            </div>
            <ContributionsGraph days={contributionDays} />
            {/* <div className={styles.aboutMeRecents}>
            <CurrentWork />
            <WeeklyMiles />
            <CurrentRead />
        </div> */}
        </section>
    );
}

export default function Header() {
    return (
        <header className={styles.header} id="header">
            <SlideAway>
                <Hero />
            </SlideAway>
            <SlideAway>
                <AboutMeRecents />
            </SlideAway>
            <NavBarWrapper>
                <Nav screen="mobile" />
            </NavBarWrapper>
        </header>
    );
}
