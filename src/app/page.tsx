import styles  from './page.module.scss'
import Link from 'next/link'


function Hero() {
    return (
        <div className={styles.hero}>
            <h1 className={`${styles.heroName} primary-text`}>Isaac <span className={`${styles.lastName} secondary-text`}>Young.</span></h1>
            <p className="tech secondary-text">// software engineer & creative dev</p>
            <p className="body primary-text">I'm self taught, full-stack developer, eager to learn more everyday. I enjoy audiobooks, running and lifting, and building fun,
            useful things for the web</p>
        </div>
    )
}

function TempNavButton({ link, description }: { link: string, description: string }) {
    return (
        <Link href={link}>
                <button className={`${styles.headerNavBtn} body light-text`}>{description}</button>
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
        <p className='body primary-text'>I am currently reading/listening to <a href='' className={styles.currentRead}>The Midnight Library by Matt Haig</a></p>
    )
}

async function WeeklyMiles() {
    const res = await fetch('http://localhost:3000/api/strava')
    const data = await res.json()
    return (
        <p className='body primary-text'>This week I've logged <a href='https://www.strava.com/athletes/125614194' className={styles.milesLink}>{data.miles} miles</a></p>
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

export default function Home() {
  return (
    <div>
        <header className={styles.header}>
            <Hero />
            <AboutMeRecents />
            <MobileTempNav />
        </header>
        <main>

        </main>
    </div>
  );
}


