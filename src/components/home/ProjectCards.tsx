'use client'

import styles from './ProjectCards.module.scss'
import Image from 'next/image'
import { useRef, useState, useLayoutEffect } from 'react'

function HomebaseCard() {
    const [isOpen, setIsOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const cardPlaceHolder = useRef<HTMLDivElement>(null)
    const projectCard = useRef<HTMLDivElement>(null)
    const firstProjectCard = useRef<DOMRect | null>(null)

    const openCase = () => {
        if (isClosing) return 
        projectCard.current!.style.position = ''
        projectCard.current!.style.top = ''
        projectCard.current!.style.left = ''
        cardPlaceHolder.current!.style.height = ``
        cardPlaceHolder.current!.style.width = ``
        firstProjectCard.current = projectCard.current!.getBoundingClientRect();
        cardPlaceHolder.current!.style.height = `${firstProjectCard.current!.height}px`
        cardPlaceHolder.current!.style.width = `${firstProjectCard.current!.width}px`
        setIsOpen(true)
    }

    const closeCase = () => {
        firstProjectCard.current = projectCard.current!.getBoundingClientRect();
        setIsClosing(true)
        setIsOpen(false)
    }

    useLayoutEffect(() => {
        if (!firstProjectCard.current || !projectCard.current) return 
        
        const lastProjectCard = projectCard.current!.getBoundingClientRect()
        const placeholderPosition = cardPlaceHolder.current!.getBoundingClientRect()
        const deltaX = firstProjectCard.current.left - lastProjectCard.left;
        const deltaY = firstProjectCard.current.top - lastProjectCard.top;
        
        projectCard.current.style.transition = 'none'
        projectCard.current.style.width = `${firstProjectCard.current.width}px`
        projectCard.current.style.height = `${firstProjectCard.current.height}px`
        
        if (isClosing) {
            projectCard.current.style.position = "absolute";
            projectCard.current!.style.top = `${firstProjectCard.current.top + window.scrollY}px`
            projectCard.current!.style.left = `${firstProjectCard.current.left}px`
        }else {
            projectCard.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
            projectCard.current.style.transformOrigin = "top left";
        }

        requestAnimationFrame(() => {
            if (!projectCard.current) return

            projectCard.current.style.transition = 'transform 0.4s ease, width 0.4s ease, height 0.4s ease, left 0.4s ease, bottom 0.4s ease'
            projectCard.current.style.height = ``
            projectCard.current.style.transformOrigin = '';
            if (isClosing) {
                projectCard.current.style.top = `${placeholderPosition.top + window.scrollY}px`
                projectCard.current.style.left = `${placeholderPosition.left}px`
                projectCard.current.style.transition = 'width 0.4s ease, height 0.4s ease, left 0.4s ease, top 0.4s ease'
                projectCard.current.style.width = `${placeholderPosition.width}px`
                setIsClosing(false)
            }else {
                projectCard.current.style.transform = 'none'
                projectCard.current.style.width = ``
            }
        })
    }, [isOpen])

    return (
        <>
            <div ref={cardPlaceHolder}></div>
            <div ref={projectCard} className={`${ styles.projectCard } ${ isOpen ? styles.openCase : ''}`}>
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
                    <button 
                    type="button"
                    onClick={isOpen ? closeCase : openCase}
                    className={`${ styles.button } ${ styles.caseStudyBtn } tech secondary-text`}>Case Study</button>
                    <a href='' className={`${ styles.button } ${ styles.demo } tech`}>Demo</a>
                </section>
            </div>
        </>
    )
}

export default function ProjectCards() {
    return (
        <section className={ styles.cardsSection }>
            <HomebaseCard />
        </section>
    )
    
}