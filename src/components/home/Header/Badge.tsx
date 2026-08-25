import styles from "./Header.module.scss";
import filterStravaActivities from "@/lib/strava";
import { getHalfYearContributions } from "@/lib/contributions";
import ContributionsGraph from "./graph";
import { statusBadgeStats } from "@/data/HomePage";
import { LocalTime } from "./timeZone";

export async function DevBadge() {
    const contributionDays = await getHalfYearContributions();
    const last7Activities = await filterStravaActivities();
    const meters = last7Activities.reduce((acc: number, curr: { distance: number }) => acc + curr.distance, 0);
    const miles = (meters / 1609).toFixed(1);

    return (
        <section className={styles.statusContainer}>
            <p className={`${styles.statusHeader} tech secondary-text`}>
                Software Engineer & <br/> Creative Developer<span>DEV_ID. IY-0901</span>
            </p>
            <div className={styles.picContainer}>
                <div className={styles.profilePic}>
                    <img height={720} width={720} src="images/profilePic.jpeg" alt="" />
                </div>
                <div className={`${styles.live} secondary-text`}>
                    <div className={styles.stat}>
                        <p className="title">working on <a href="https://github.com/Isaac36Y">my-portfolio</a></p>
                    </div>
                    <div className={styles.stat}>
                        <p className="title"><a href="https://www.strava.com/athletes/125614194">{miles} miles</a> this week</p>
                    </div >
                    <div className={styles.stat}>
                        <p className="title">listening to <a href="https://github.com/Isaac36Y">The Butcher's Masquerade by Matt Dinniman</a></p>
                    </div>
                </div>
            </div>
            <div className={`${styles.stats} tech`}>
                <div className={styles.contributions}>
                    <ContributionsGraph days={contributionDays} />
                </div>
                <div className={styles.characteristics}>
                    {statusBadgeStats.map((stat, index) => {
                        if (index === 1) {
                            return (
                                <div className={`${styles.stat}`} key={index}>
                                    <LocalTime />
                                </div>
                            )
                        }else {
                            return (
                            <div className={`${styles.stat}`} key={index}>
                                <p className={`${styles.title} title secondary-text`}>
                                    {stat.icon ? <span className="accent-text"><stat.icon /></span> : ''}
                                    {stat.title}
                                </p>
                                <p className={`${styles.value} tech accent-text`}>{stat.value}</p>
                            </div>
                            )
                        }
                    })}
                </div>
            </div>
        </section>
    );
}