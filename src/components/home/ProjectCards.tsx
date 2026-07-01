"use client";

import styles from "./ProjectCards.module.scss";
import Image from "next/image";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { cardData } from "@/data/HomePage";
import { SlideAway } from "../NavLogic/SlideAway";
import animateScrollTo from "animated-scroll-to";

function Cards() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [closingIndex, setClosingIndex] = useState<number | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const projectCard = useRef<(HTMLDivElement | null)[]>([]);
    const projectCaseStudy = useRef<(HTMLElement | null)[]>([]);
    const projectInnerCase = useRef<(HTMLDivElement | null)[]>([]);
    const firstProjectCard = useRef<DOMRect | null>(null);
    /* const closeStudyBtn = useRef<HTMLButtonElement>(null) */
    const [scrollTo, setScrollTo] = useState(typeof window !== 'undefined' ? window.scrollY : 0)
    const [width, setWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    
    const desktop = width > 1200

    function openCase(i: number) {
        if (isClosing) return;
        if (!projectCard.current[i] || !projectCaseStudy.current[i]) return 
        firstProjectCard.current = projectCard.current[i].getBoundingClientRect();
        projectCard.current[i]!.style.zIndex = '100'
        setScrollTo(window.scrollY)
        setOpenIndex(i);
    }

    function closeCase() {
        const i = openIndex;
        console.log(true)
        if (i === null) return
        console.log(true)
        setIsClosing(true);
        setClosingIndex(i)
        if (!projectCard.current[i] || !projectCaseStudy.current[i]) return;
        firstProjectCard.current = projectCard.current[i].getBoundingClientRect();
        
        setOpenIndex(null);
    }

    function transitionEnd(i: number) {
        if (!projectCard.current[i]) return
        
        projectCard.current[i].style.transition = ''

        if (isClosing) {
            projectCaseStudy.current[i]!.style.transition = ''
            projectCaseStudy.current[i]!.style.gridTemplateRows = ''
            projectInnerCase.current[i]!.style.overflow = ''
            projectCard.current[i].style.zIndex = ''
            projectCard.current[i].style.translate = ``
            projectCard.current[i].style.scale = ``
            
            setIsClosing(false);
            setClosingIndex(null);
        }
    }

    useLayoutEffect(() => {
        const index = isClosing ? closingIndex : openIndex

        if (
            !firstProjectCard.current ||
            index === null ||
            !projectCard.current[index] ||
            !projectCaseStudy.current[index]
        ) return;

        const last = projectCard.current[index].getBoundingClientRect();
        const translate = firstProjectCard.current.top - last.top
        const body = document.body;
            
        // need to scale with in React in order to get the difference between the top of open and closed cards
        // get the first, instant size change to get the last, then animate
        projectCard.current[index].style.transition = 'none'
        if (isClosing) {
            projectCard.current[index]!.style.scale = '1.09'
            
        }else {
            projectCard.current[index]!.style.scale = '1'
            
            animateScrollTo(scrollTo + last.top, { maxDuration: 600 })
            
        
            setTimeout(() => {
                const scrollY = window.scrollY;
                body.dataset.scrollLock = String(scrollY);
                body.style.position = 'fixed';
                body.style.top = `-${scrollY}px`;
                body.style.left = '0';
                body.style.right = '0';
                body.style.width = '100%';
                body.style.overflow = 'hidden';
            }, 600)
        }
        
        
        requestAnimationFrame(() => {
            projectCard.current[index]!.style.transition = 'scale 0.6s ease'
            
            if (isClosing) {
                // the scroll animation covers up a slightly choppy grid row animation 
                projectCard.current[index]!.style.scale = '1'
                const scrollY = body.dataset.scrollLock;
                body.style.position = '';
                body.style.top = '';
                body.style.left = '';
                body.style.right = '';
                body.style.width = '';
                body.style.overflow = '';
                delete body.dataset.scrollLock;
                if (scrollY) window.scrollTo(0, parseInt(scrollY, 10));
                animateScrollTo(scrollTo, { maxDuration: 600 })
            }else {
                projectCard.current[index]!.style.scale = '1.09'
            }
        })
    


            
        
    }, [openIndex, isClosing]);

    return (
        <>
            <SlideAway>
            <h2 id="myWork" className={`${styles.title} primary-text`}>Projects</h2>
            </SlideAway>
            <button 
            type="button" 
            onClick={() => closeCase()} 
            className={`${styles.closeStudyBtn} ${openIndex !== null ? styles.open : ''}`}>
                Close
            </button>
            <div className={styles.cardWrapper}>
            {cardData.map((card, i) => {
                const Card = card.caseStudy;
                return (
                <SlideAway key={i}>
                    
                    <div
                        ref={(el) => {
                            projectCard.current[i] = el;
                        }}
                        onTransitionEnd={() => transitionEnd(i)}
                        className={`${styles.projectCard} ${card.className} ${openIndex === i ? styles.openCase : ""} `}
                    >
                        <section className={styles.hook}>
                            <div className={styles.header}>
                                <div className={styles.titles}>
                                    <p className={`${styles.type} tech secondary-text`}>{card.type}</p>
                                    <h2 className="primary-text">{card.name}</h2>
                                </div>
                                <Image src={card.icon} alt="HomeBase logo" width={192} height={192} />
                            </div>
                            <p className={`${styles.description} body secondary-text`}>{card.hook}</p>
                            <ul className={`${styles.tags} tech primary-text`} role="list">
                                {card.tags.map((tag, i) => (
                                    <li className={styles.items} key={i}>
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        
                        </section>
                        <hr />
                        <section
                            className={styles.caseStudy}
                            ref={(el) => {
                                projectCaseStudy.current[i] = el;
                            }}
                        >
                            <div ref={(el) => { projectInnerCase.current[i] = el }} className={styles.innerCase}>
                                <Card />
                            </div>
                        </section>
                        <section className={`${styles.buttons} `}>
                            <button
                                type="button"
                                onClick={() => openCase(i)}
                                className={`${styles.button} ${styles.caseStudyBtn}`}
                            >
                                Case Study
                            </button>
                            {/* <a href="" className={`${styles.button} ${styles.demo} tech primary-text`}>
                                Demo
                            </a> */}
                        </section>
                        <section className={styles.videoWrapper}>
                            <div className={styles.browserWrapper}>
                                <div className={styles.browserBar}>
                                    <div className={styles.browserBtn}></div>
                                    <div className={styles.browserBtn}></div>
                                    <div className={styles.browserBtn}></div>
                                    <p className={`${styles.browserUrl} tech`}>homebase.isaacyoungs.dev</p>
                                </div>
                                <video
                                    className={styles.cardVideo}
                                    src="/images/homebaseDesktopVid.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </section>
                    </div>
                </SlideAway>
            )})}

            </div>
        </>
    );
}

export default function ProjectCards() {
    return (
        <section className={styles.cardsSection}>
            <Cards />
        </section>
    );
}
