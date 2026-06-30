'use client'
import animateScrollTo from 'animated-scroll-to'
import styles from './Nav.module.scss'
import Link from 'next/link'
import { useEffect, useState } from 'react'


function NavButton({ link, description }: { link: string, description: string }) {
    return (
        <Link href={link} className={`${styles.navBtn} body`}>
            {description}
        </Link>
    )
}

export function Nav({ screen }: { screen: string }) {
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

export function DesktopNav() {
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const header = document.getElementById('header');
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setInView(true)
                }else {
                    setInView(false)
                }
            },
            {
                rootMargin: '-78px 0px 0px 0px',
                threshold: 0
            }
        )
        if (header) {
            observer.observe(header)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section className={`${styles.navBar} `}>
            <div className={`${styles.nameAndNav} ${inView ? styles.inView: ''}`}>
                <p className={`${styles.nameDropin} primary-text`}>Isaac <span>Young</span></p>
                <Nav screen="desktop" />
            </div>
        </section>
    )
}