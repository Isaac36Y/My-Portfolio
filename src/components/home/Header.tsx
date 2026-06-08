import styles from './Header.module.scss'
import Link from 'next/link'
import filterStravaActivities from '@/lib/strava'
import { IconRun, IconCode, IconBook } from '@tabler/icons-react';

function Hero() {
    return (
        <div className={styles.hero}>
            <h1 className={`${styles.heroName} primary-text`}>Isaac <span className={`${styles.lastName} secondary-text`}>Young.</span></h1>
            <p className={`${styles.description} tech secondary-text`}>// software engineer & creative dev</p>
        </div>
    )
}

function CurrentRead() {
    return (
        <div className={`${styles.status} body primary-text`}>
            <div className={`${styles.label}`}>
                <IconBook stroke={ 1.75 } size={ 24 } color='var(--color-primary)' />
                <p className='body primary-text'>listening</p>
            </div>
            <a href='' className={styles.currentRead}>The Midnight Library<br/>by Matt Haig</a>
        </div>
        
    )
}

async function WeeklyMiles() {
    const last7Activities = await filterStravaActivities()
    const meters =  last7Activities.reduce((acc: number, curr: { distance: number}) => acc + curr.distance, 0)
    const miles = (meters / 1609).toFixed(1)
 
    return (
        <div className={`${styles.status} body primary-text`}>
            <div className={`${styles.label}`}>
                <IconRun stroke={ 1.75 } size={ 24 } color='var(--color-primary)' />
                <p>running</p>
            </div>
            <a href='https://www.strava.com/athletes/125614194' className={styles.milesLink}>{miles} miles this week</a>
        </div>
    )
}

function CurrentWork() {
    return (
        <div className={`${styles.status} body primary-text`}>
            <div className={`${styles.label}`}>
                <IconCode stroke={ 1.75 } size={ 24 } color='var(--color-primary)' />
                <p>building </p>
            </div>
            <a href='' className={ styles.currentRead }>my-portfolio</a>
        </div>
    )
}

function AboutMeRecents() {
    return (
        <div className={styles.aboutMeRecents}>
            <CurrentWork />
            <WeeklyMiles />
            <CurrentRead />
        </div>
        
    )
}

export default function Header() {
    return (
        <header className={styles.header}>
            <Hero />
            <hr />
            <AboutMeRecents />
            <hr />
        </header>
    )
}