import styles from './Header.module.scss'
import Link from 'next/link'

function Hero() {
    return (
        <div className={styles.hero}>
            <h1 className={`${styles.heroName} primary-text`}>Isaac <span className={`${styles.lastName} secondary-text`}>Young.</span></h1>
            <p className={`${styles.description} tech secondary-text`}>// software engineer & creative dev</p>
            <p className={`${styles.bio} body primary-text`}>I'm a self taught, full-stack developer, eager to learn more everyday. I enjoy audiobooks, running and lifting, and building fun,
            useful things for the web</p>
        </div>
    )
}

function TempNavButton({ link, description }: { link: string, description: string }) {
    return (
        <Link href={link} className={`${styles.headerNavBtn} body accent-text`}>
            {description}
        </Link>
    )
}

function MobileTempNav() {
    return (
        <nav className={styles.headerNav}>
            <TempNavButton link="#myWork" description='My Work' />
            <TempNavButton link="/blog" description='My Blog' />
            <TempNavButton link="/personal" description='My Life' />
        </nav>
    )
}

function CurrentRead() {
    return (
        <p className='body primary-text'>I am currently listening to <a href='' className={styles.currentRead}>The Midnight Library by Matt Haig</a></p>
    )
}

const getStravaActivities = async () => {
    const payload = {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        refresh_token: process.env.STRAVA_REFRESH_TOKEN,
        grant_type: 'refresh_token'
    }
    const res1 = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data1 = await res1.json()
    const accessToken = data1.access_token

    const res2 = await fetch('https://www.strava.com/api/v3/athlete/activities', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })

    const activities = await res2.json()
    return activities
}

const filterStravaActivities = async () => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);
    const activities = await getStravaActivities();
    const last7Days = activities.filter((item: { start_date: string }) => {
        const itemDate = new Date(item["start_date"]);
        return itemDate >= cutoffDate;
    });
    return last7Days

}

async function WeeklyMiles() {
    const last7Activities = await filterStravaActivities()
    const meters =  last7Activities.reduce((acc: number, curr: { distance: number}) => acc + curr.distance, 0)
    const miles = (meters / 1609).toFixed(1)
 
    return (
        <p className='body primary-text'>This week I've logged <a href='https://www.strava.com/athletes/125614194' className={styles.milesLink}>{miles} miles</a></p>
    )
}

function CurrentWork() {
    return (
        <p className='body primary-text'>The last project I worked on was <a href='' className={styles.currentRead}>my-portfolio</a></p>
    )
}

function AboutMeRecents() {
    return (
        <div className={styles.aboutMeRecents}>
            <CurrentRead />
            <WeeklyMiles />
            <CurrentWork />
        </div>
        
    )
}

export default function Header() {
    return (
        <header className={styles.header}>
            <Hero />
            <AboutMeRecents />
            <MobileTempNav />
        </header>
    )
}