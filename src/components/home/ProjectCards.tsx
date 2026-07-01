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
    const firstStudy = useRef<DOMRect | null>(null);
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
        firstStudy.current = projectCaseStudy.current[i].getBoundingClientRect()
        
        if (desktop) {

        }else {
            animateScrollTo(window.scrollY + firstProjectCard.current.top, {maxDuration: 600})
        }
        projectCard.current[i]!.style.zIndex = '100'
        setOpenIndex(i);
    }

    function closeCase(i: number) {
        setIsClosing(true);
        setClosingIndex(i)
        if (!projectCard.current[i] || !projectCaseStudy.current[i]) return;
        firstProjectCard.current = projectCard.current[i].getBoundingClientRect();
        firstStudy.current = projectCaseStudy.current[i].getBoundingClientRect()
        console.log(firstStudy.current)
        setOpenIndex(null);
    }

    function toggleCard(i: number) {
        if (openIndex === i) {
            closeCase(i);
        } else {
            openCase(i);
        }
    }

    function transitionEnd(i: number) {
        if (!projectCard.current[i]) return
        projectCaseStudy.current[i]!.style.transition = ''
        projectCard.current[i].style.transition = ''
        projectCard.current[i].style.transform = ``
        projectCard.current[i].style.width = ``
        projectCard.current[i].style.height = ``
        projectCard.current[i].style.top = ``
        projectCard.current[i].style.left = ``
        projectCard.current[i].style.position = ``
        projectCard.current[i].style.transform = ''
        projectCaseStudy.current[i]!.style.height = ``
        projectInnerCase.current[i]!.style.overflow = ''
        if (isClosing) {
            projectCard.current[i].style.zIndex = ''
            
            setIsClosing(false);
            setClosingIndex(null) 
        }
    }

    useLayoutEffect(() => {
        const index = isClosing ? closingIndex : openIndex

        const body = document.body;
        if (openIndex !== null) {
            // Fully lock the page (not just overflow:hidden) so iOS Safari can't
            // scroll the layout viewport when the keyboard opens, which would
            // otherwise drag the slid-away sections back into view.
            const scrollY = window.scrollY;
            body.dataset.scrollLock = String(scrollY);
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}px`;
            body.style.left = '0';
            body.style.right = '0';
            body.style.width = '100%';
            body.style.overflow = 'hidden';
        } else {
            const scrollY = body.dataset.scrollLock;
            body.style.position = '';
            body.style.top = '';
            body.style.left = '';
            body.style.right = '';
            body.style.width = '';
            body.style.overflow = '';
            delete body.dataset.scrollLock;
            if (scrollY) window.scrollTo(0, parseInt(scrollY, 10));
        }

        if (
            !firstProjectCard.current ||
            !firstStudy.current ||
            index === null ||
            !projectCard.current[index] ||
            !projectCaseStudy.current[index]
        ) return;

        const last = projectCard.current[index].getBoundingClientRect();
        const lastStudy = projectCaseStudy.current[index].getBoundingClientRect()
        const translate = firstProjectCard.current.top - last.top;
        
        projectCard.current[index].style.transition = "none";
        projectCaseStudy.current[index].style.transition = "none";

        if (desktop) {
            projectCard.current[index].style.position = `fixed`
            projectCard.current[index].style.width = `${firstProjectCard.current.width}px`
            projectCard.current[index].style.height = `${firstProjectCard.current.height}px`
            projectCard.current[index].style.top = `${firstProjectCard.current.top}px`
            projectCard.current[index].style.left = `${firstProjectCard.current.left}px`
            projectCaseStudy.current[index].style.height = `${firstStudy.current.height}px`;
            
            requestAnimationFrame(() => {
                if (!projectCard.current[index] || !firstProjectCard.current) return
                projectCard.current[index].style.transition = "width 0.6s ease, height 0.6s ease, top 0.6s ease, left 0.6s ease";
                projectCaseStudy.current[index]!.style.transition = "height 0.6s ease";
                projectCard.current[index].style.transform = `translateX(0)`
                projectCard.current[index].style.width = `${last.width}px`
                projectCard.current[index].style.height = `${last.height}px`
                projectCard.current[index].style.top = `${last.top}px`
                projectCard.current[index].style.left = `${last.left}px`
                projectCaseStudy.current[index]!.style.height = `${lastStudy.height}px`;
            })
        }else {
            projectCard.current[index].style.transform = isClosing
                ? `translateY(${translate}px) scale(1.09)`
                : "scale(1)";
            projectCaseStudy.current[index].style.gridTemplateRows = isClosing ? "1fr" : "0fr";
            projectInnerCase.current[index]!.style.overflow = 'visible'

            requestAnimationFrame(() => {
                projectCard.current[index]!.style.transition = "transform 0.6s ease-out";
                if (isClosing) {
                    animateScrollTo(window.scrollY + last.top - 75, {maxDuration: 500, speed: 500})
                    projectCaseStudy.current[index]!.style.transition = "grid-template-rows 0.6s ease";
                }
                projectCard.current[index]!.style.transform = isClosing ? "scale(1)" : `translateY(${translate}px) scale(1.09)`;
                projectCaseStudy.current[index]!.style.gridTemplateRows = isClosing ? "" : "1fr";
                
            });
        }

        
    }, [openIndex, isClosing]);

    return (
        <>
            <SlideAway>
            <h2 id="myWork" className={`${styles.title} primary-text`}>Projects</h2>
            </SlideAway>
            <div className={styles.cardWrapper}>
            {cardData.map((card, i) => {
                const Card = card.caseStudy;
                return (
                <SlideAway key={i}>
                    
                    <div
                        ref={(el) => {
                            projectCard.current[i] = el;
                        }}
                        onClick={() => toggleCard(i)}
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
                                onClick={() => toggleCard(i)}
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
