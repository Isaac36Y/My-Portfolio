'use client'
import animateScrollTo from 'animated-scroll-to'
import styles from './Nav.module.scss'
import Link from 'next/link'


function NavButton({ link, description }: { link: string, description: string }) {
    return (
        <Link href={link} className={`${styles.navBtn} body`}>
            {description}
        </Link>
    )
}

export default function Nav({ screen }: { screen: string }) {
    return (
        <nav className={screen === 'mobile' ? styles.mobileNav : styles.desktopNav} aria-label='Main Navigation'>
            <button
            type='button'
            className={`${styles.navBtn} body`}
            onClick={() => {
                const target = document.getElementById('myWork')
                if (target) animateScrollTo(target, {maxDuration:1000})
            }}>
                My Work
            </button>
            <NavButton link="/blog" description='My Blog' />
            <NavButton link="/personal" description='My Life' />
            
        </nav>
    )
}