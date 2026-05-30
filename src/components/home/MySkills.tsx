'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './MySkills.module.scss'
import skillLists from '@/data/skills'

function Title() {
    return (
        <h2 className={`${ styles.title } primary-text`}>
            Skills and Tools
        </h2>
    )
}

function SkillCards() {
    const [activeIndex, setActiveIndex] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<(HTMLDivElement | null)[]>([])

    

    useEffect(() => {
        const carousel = carouselRef.current
        if (!carousel) return 

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = cardRef.current.indexOf(entry.target as HTMLDivElement)
                        if (index !== -1) setActiveIndex(index)
                    }
                })
            },
            { root: carousel, threshold: 0.5}
        )
        cardRef.current.forEach(card => card && observer.observe(card))
        return () => observer.disconnect()
    }, [])

    const scrollToCard = (index: number) => {
        cardRef.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest',inline: 'center' })
    }

    return (
        <>
            <div className={ styles.markerContainer} role='tablist'>
                { skillLists.map((skill, i) => (
                    <button
                    className={` ${styles.sliderMarker} ${i === activeIndex ? styles.markerActive : ''} `}
                    key={skill.id}
                    onClick={() => scrollToCard(i)}
                    aria-label={`${skill.id} skills`}
                    aria-selected={i === activeIndex}
                    >
                    </button>
                ))}
            </div>
            <div className={ styles.skillCarousel} ref={carouselRef}>
                { skillLists.map((card, i) => (
                    <div className={ styles.skillCard } key={i} ref={el => { cardRef.current[i] = el }}>
                        <h3 className={`${ styles.skillType } tech secondary-text`}>{ card.label }</h3>
                        <ul className={`${ styles.skillList } body primary-text`} role='list' id={`${card.id}-skill-list`}>
                            { card.skills.map((skill, i) => (
                                <li key={i}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                )) }
            </div>
        </>
    )
} 



export default function MySkills() {
    return (
        <section className={ styles.section }>
            <Title />
            <SkillCards />
        </section>
    )
} 