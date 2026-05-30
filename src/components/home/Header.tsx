import styles from './Header.module.scss'
import Link from 'next/link'
import filterStravaActivities from '@/lib/strava'

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

function NavButton({ link, description }: { link: string, description: string }) {
    return (
        <Link href={link} className={`${styles.headerNavBtn} body accent-text`}>
            {description}
        </Link>
    )
}

function MobileNav() {
    return (
        <nav className={styles.headerNav}>
            <NavButton link="#myWork" description='My Work' />
            <NavButton link="/blog" description='My Blog' />
            <NavButton link="/personal" description='My Life' />
        </nav>
    )
}

function CurrentRead() {
    return (
        <p className='body primary-text'>I am currently listening to <a href='' className={styles.currentRead}>The Midnight Library by Matt Haig</a></p>
    )
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
            <MobileNav />
        </header>
    )
}