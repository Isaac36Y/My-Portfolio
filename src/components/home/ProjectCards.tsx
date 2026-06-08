'use client'
import styles from './ProjectCards.module.scss'
import Image from 'next/image'
import { useEffect } from 'react'

function openCase() {
    useEffect(() => {
        
    })
}

function HomebaseCard() {
    return (
        <div className={`${ styles.projectCard } ${ styles.openCase}`}>
            <section className={ styles.hook }>
                <div className={ styles.header }>
                    <div className={ styles.titles}>
                        <p className={`${ styles.type } tech secondary-text`}>// SaaS &bull; Full-Stack</p>
                        <h2 className='primary-text'>HomeBase</h2>
                    </div>
                    <Image src="/images/icon-192.png" alt="HomeBase logo" width={56} height={56}/>
                </div>
                <p className={`${ styles.description } body primary-text`}>A real estate platform where agents log property data on-site, offline, and without losing a single input. Back at the desk, every detail is reviewable and buyer relationships are managed in one place.</p>
                <ul className={`${ styles.tags } tech primary-text`} role='list'>
                    <li>Node</li>
                    <li>Supabase</li>
                    <li>PWA</li>
                    <li>Claude API</li>
                </ul>
            </section>
            <section className={ styles.caseStudy }>
                <hr />
                    <section>

                    </section>
                <hr />
            </section>
            <section className={`${ styles.buttons } `}>
                <button type="button" className={`${ styles.button } ${ styles.caseStudyBtn } tech secondary-text`}>Case Study</button>
                <a href='' className={`${ styles.button } ${ styles.demo } tech`}>Demo</a>
            </section>
        </div>
    )
}

export default function ProjectCards() {
    return (
        <section className={ styles.cardsSection }>
            <HomebaseCard />
        </section>
    )
    
}