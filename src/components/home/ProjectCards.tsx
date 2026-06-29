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

    function openCase(i: number) {
        if (isClosing) return;
        firstProjectCard.current = projectCard.current[i]!.getBoundingClientRect();
        console.log(firstProjectCard.current.top)
        animateScrollTo(window.scrollY + firstProjectCard.current.top, {maxDuration: 600})
        projectCard.current[i]!.style.zIndex = '100'
        setOpenIndex(i);
    }

    function closeCase(i: number) {
        setIsClosing(true);
        setClosingIndex(i)
        if (!firstProjectCard.current) return;
        firstProjectCard.current = projectCard.current[i]!.getBoundingClientRect();
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
        projectCaseStudy.current[i]!.style.transition = ''
        projectCard.current[i]!.style.transition = ''
        if (isClosing) {
            const scrollTo = projectCard.current[i]!.getBoundingClientRect()
            projectCard.current[i]!.style.transform = ''
            projectCard.current[i]!.style.zIndex = ''
            projectInnerCase.current[i]!.style.overflow = ''
            setIsClosing(false);
            setClosingIndex(null) 
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
        const translate = firstProjectCard.current.top - last.top;

        projectCard.current[index].style.transition = "none";
        projectCaseStudy.current[index].style.transition = "none";
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
    }, [openIndex, isClosing]);

    return (
        <>
            <SlideAway>
            <h2 id="myWork" className={`${styles.title} primary-text`}>Projects</h2>
            </SlideAway>
            {cardData.map((card, i) => {
                const Card = card.caseStudy;
                return (
                <SlideAway key={i}>
                    
                    <div
                        ref={(el) => {
                            projectCard.current[i] = el;
                        }}
                        
                        onTransitionEnd={() => transitionEnd(i)}
                        className={`${styles.projectCard} ${openIndex === i ? styles.openCase : ""}`}
                    >
                        <section className={styles.hook}>
                            <div className={styles.header}>
                                <div className={styles.titles}>
                                    <p className={`${styles.type} tech secondary-text`}>{card.type}</p>
                                    <h2 className="primary-text">{card.name}</h2>
                                </div>
                                <Image src={card.icon} alt="HomeBase logo" width={56} height={56} />
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
                    </div>
                </SlideAway>
        )})}
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
