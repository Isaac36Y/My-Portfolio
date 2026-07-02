"use client";

import styles from "./ProjectCards.module.scss";
import Image from "next/image";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { cardData } from "@/data/HomePage";
import { SlideAway } from "../NavLogic/SlideAway";
import animateScrollTo from "animated-scroll-to";

function lockScroll() {
    const body = document.body;
    const scrollY = window.scrollY;
    body.dataset.scrollLock = String(scrollY);
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
}

function unlockScroll() {
    const body = document.body;
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

function Cards() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [closingIndex, setClosingIndex] = useState<number | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const projectCard = useRef<(HTMLDivElement | null)[]>([]);
    const projectCaseStudy = useRef<(HTMLElement | null)[]>([]);
    const projectInnerCase = useRef<(HTMLDivElement | null)[]>([]);
    const firstProjectCard = useRef<DOMRect | null>(null);
    // desktop: remember the closed in-grid box so we can animate height back to it on close
    const closedRectRef = useRef<DOMRect | null>(null);
    // desktop: card whose pinned height must be cleared once .openCase has been removed
    const justClosedRef = useRef<number | null>(null);
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

    // keep in sync with $desktop (1252px) so the JS path matches the CSS media query
    const desktop = width >= 1252

    function openCase(i: number) {
        if (isClosing) return;
        if (!projectCard.current[i] || !projectCaseStudy.current[i]) return
        const rect = projectCard.current[i]!.getBoundingClientRect();
        firstProjectCard.current = rect;
        closedRectRef.current = rect;
        projectCard.current[i]!.style.zIndex = '100'
        setScrollTo(window.scrollY)
        setOpenIndex(i);
    }

    function closeCase() {
        const i = openIndex;
        if (i === null) return
        if (!projectCard.current[i] || !projectCaseStudy.current[i]) return;
        setIsClosing(true);
        setClosingIndex(i)
        const rect = projectCard.current[i]!.getBoundingClientRect();
        firstProjectCard.current = rect;
        setOpenIndex(null);
    }

    function transitionEnd(i: number) {
        const card = projectCard.current[i]
        if (!card) return

        card.style.transition = ''

        if (isClosing) {
            if (desktop) {
                card.style.zIndex = ''
                // Keep the height pinned to the closed value for now. Clearing it here would
                // let the still-applied .openCase expand the card back to full height (case
                // study visible) for a frame before React removes the class — that's the
                // flicker. We clear it in a layout effect once .openCase is gone.
                justClosedRef.current = i
            } else {
                projectCaseStudy.current[i]!.style.transition = ''
                projectCaseStudy.current[i]!.style.gridTemplateRows = ''
                projectInnerCase.current[i]!.style.overflow = ''
                card.style.zIndex = ''
                card.style.translate = ``
                card.style.scale = ``
            }

            setIsClosing(false);
            setClosingIndex(null);
        } else if (desktop) {
            // opening finished — make the height dynamic (auto) again
            card.style.height = ''
            card.style.overflow = ''
        }
    }

    // desktop: after a close completes and .openCase has been removed from the DOM,
    // drop the pinned inline height so the closed card is dynamic again (no flash,
    // since height:auto now resolves to the same closed height)
    useLayoutEffect(() => {
        if (isClosing) return;
        const i = justClosedRef.current;
        if (i === null) return;
        justClosedRef.current = null;
        const card = projectCard.current[i];
        if (!card) return;
        card.style.height = '';
        card.style.overflow = '';
    }, [isClosing]);

    useLayoutEffect(() => {
        const index = isClosing ? closingIndex : openIndex

        if (
            !firstProjectCard.current ||
            index === null ||
            !projectCard.current[index] ||
            !projectCaseStudy.current[index]
        ) return;

        const card = projectCard.current[index]!;

        // desktop: the card stays in flow and its height is dynamic (as tall as the case study)
        if (desktop) {
            if (isClosing) {
                const naturalHeight = card.offsetHeight;
                const closedHeight = closedRectRef.current!.height;

                card.style.transition = 'none';
                card.style.overflow = 'hidden';
                card.style.height = `${naturalHeight}px`;

                requestAnimationFrame(() => {
                    card.style.transition = 'height 0.6s ease';
                    card.style.height = `${closedHeight}px`;
                    // scroll back to where we started so the case study slides away with the collapse
                    animateScrollTo(scrollTo, { maxDuration: 600 });
                });
            } else {
                // measure the expanded content height, then start clamped to the closed height
                const first = firstProjectCard.current!;
                const naturalHeight = card.offsetHeight;

                card.style.transition = 'none';
                card.style.overflow = 'hidden';
                card.style.height = `${first.height}px`;

                requestAnimationFrame(() => {
                    card.style.transition = 'height 0.6s ease';
                    card.style.height = `${naturalHeight}px`;
                    // bring the growing card up under the nav bar
                    animateScrollTo(scrollTo + first.top - 90, { maxDuration: 600 });
                });
            }

            return;
        }

        const last = card.getBoundingClientRect();

        // need to scale with in React in order to get the difference between the top of open and closed cards
        // get the first, instant size change to get the last, then animate
        card.style.transition = 'none'
        if (isClosing) {
            card.style.scale = '1.09'

        }else {
            card.style.scale = '1'

            animateScrollTo(scrollTo + last.top, { maxDuration: 600 })

            setTimeout(lockScroll, 600)
        }


        requestAnimationFrame(() => {
            card.style.transition = 'scale 0.6s ease'

            if (isClosing) {
                // the scroll animation covers up a slightly choppy grid row animation
                card.style.scale = '1'
                unlockScroll()
                animateScrollTo(scrollTo, { maxDuration: 600 })
            }else {
                card.style.scale = '1.09'
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
                        className={`${styles.projectCard} ${card.className} ${openIndex === i || (desktop && isClosing && closingIndex === i) ? styles.openCase : ""} `}
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
                                onClick={() => openIndex === null ? openCase(i) : closeCase()}
                                className={`${styles.button} ${styles.caseStudyBtn}`}
                            >
                                {openIndex === null ? 'Case Study' : 'Close'}
                            </button>
                            {/* <a href="" className={`${styles.button} ${styles.demo} tech primary-text`}>
                                Demo
                            </a> */}
                        </section>
                        <section className={styles.videoWrapper}>
                            {i === 0 &&
                            <div className={styles.browserWrapper}>
                                <div className={styles.browserBar}>
                                    <div className={styles.browserBtn}></div>
                                    <div className={styles.browserBtn}></div>
                                    <div className={styles.browserBtn}></div>
                                    <p className={`${styles.browserUrl} tech`}>{card.vidUrl}</p>
                                </div>
                                <video
                                    className={styles.cardVideo}
                                    src={card.video[0]}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            }
                            {i === 1 && 
                                <div className={styles.imgWrapper}>
                                    <img src={card.video[0]} alt="" />
                                    <img src={card.video[1]} alt="" />
                                </div>
                            }
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
