"use client";

import styles from "./ProjectCards.module.scss";
import Image from "next/image";
import { useRef, useState, useLayoutEffect } from "react";
import { cardData } from "@/data/HomePage";
import { SlideAway } from "../NavLogic/SlideAway";


function Cards() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const cardPlaceHolder = useRef<(HTMLDivElement | null)[]>([]);
    const projectCard = useRef<(HTMLDivElement | null)[]>([]);
    const firstProjectCard = useRef<DOMRect | null>(null);

    /* const openCase = (index: number) => {
        //FIRST
        if (isClosing) return;
        firstProjectCard.current = projectCard.current[index]!.getBoundingClientRect();
        cardPlaceHolder.current[index]!.style.display = 'block'
        cardPlaceHolder.current[index]!.style.height = `${firstProjectCard.current!.height}px`;
        cardPlaceHolder.current[index]!.style.width = `${firstProjectCard.current!.width}px`;
        setOpenIndex(index);
    };

    const closeCase = (index: number) => {
        firstProjectCard.current = projectCard.current[index]!.getBoundingClientRect();
        setIsClosing(true);
    };
    
    const transitionEnd = (index: number) => {
        if (isClosing) {
            // places the element back in the DOM flow after transistion so theres no jumping or collapsing
            projectCard.current[index]!.style.zIndex = "";
            projectCard.current[index]!.style.position = "";
            projectCard.current[index]!.style.width = "";
            projectCard.current[index]!.style.top = "";
            projectCard.current[index]!.style.left = "";
            cardPlaceHolder.current[index]!.style.display = 'none'
            setIsClosing(false);
        }
            
    };

    useLayoutEffect(() => {
        if (!isClosing) {
            if (!firstProjectCard.current || openIndex === null || !projectCard.current[openIndex]) return;
            //LAST on open 
            const lastProjectCard = projectCard.current[openIndex].getBoundingClientRect();
            const deltaX = firstProjectCard.current.left - lastProjectCard.left;
            const deltaY = firstProjectCard.current.top - lastProjectCard.top;
            // INVERT 
            projectCard.current[openIndex].style.transition = "none";
            projectCard.current[openIndex].style.width = `${firstProjectCard.current.width}px`;
            projectCard.current[openIndex].style.height = `${firstProjectCard.current.height}px`;

            projectCard.current[openIndex].style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            projectCard.current[openIndex].style.transformOrigin = "top left";

            requestAnimationFrame(() => {
                // PLAY
                if (!projectCard.current[openIndex]) return;
                projectCard.current[openIndex].style.transition =
                    "transform 0.4s ease, width 0.4s ease, height 0.4s ease, left 0.4s ease, bottom 0.4s ease";
                projectCard.current[openIndex].style.height = ``;
                projectCard.current[openIndex].style.transformOrigin = "";

                projectCard.current[openIndex].style.transform = "none";
                projectCard.current[openIndex].style.width = ``;
            });
        }

        if (isClosing) {
            if (!firstProjectCard.current || openIndex === null || !projectCard.current[openIndex]) return;
            // placeHolder acts as LAST on close
            const placeholderPosition = cardPlaceHolder.current[openIndex]!.getBoundingClientRect();
            // INVERT as absolute. stay out of DOM flow
            projectCard.current[openIndex].style.transition = "none";
            projectCard.current[openIndex].style.position = "absolute";
            projectCard.current[openIndex].style.zIndex = "100";
            projectCard.current[openIndex].style.width = `${firstProjectCard.current.width}px`;
            projectCard.current[openIndex].style.height = `${firstProjectCard.current.height}px`;
            projectCard.current[openIndex].style.top = `${firstProjectCard.current.top + window.scrollY}px`;
            projectCard.current[openIndex].style.left = `${firstProjectCard.current.left}px`;

            requestAnimationFrame(() => {
                // PLAY exactly where the placeholder is - the cards original position 
                if (!projectCard.current[openIndex]) return;

                projectCard.current[openIndex].style.transition =
                    "transform 0.4s ease, width 0.4s ease, height 0.4s ease, left 0.4s ease, bottom 0.4s ease";
                projectCard.current[openIndex].style.height = ``;
                projectCard.current[openIndex].style.transformOrigin = "";

                projectCard.current[openIndex]!.style.top = `${placeholderPosition.top + window.scrollY}px`;
                projectCard.current[openIndex]!.style.left = `${placeholderPosition.left}px`;
                projectCard.current[openIndex]!.style.transition =
                    "width 0.4s ease, height 0.4s ease, left 0.4s ease, top 0.4s ease";
                projectCard.current[openIndex]!.style.width = `${placeholderPosition.width}px`;
                setOpenIndex(null);
            });
        }
    }, [openIndex, isClosing]); */

    return (
        <>
            {cardData.map((card, i) => (
                <SlideAway key={i}>
                    <div
                        ref={(el) => {
                            cardPlaceHolder.current[i] = el;
                        }}
                    ></div>
                       
                    <div
                        ref={(el) => {
                            projectCard.current[i] = el;
                        }}
                        id="myWork"
                        /* onTransitionEnd={() => transitionEnd(i)} */
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
                            <p className={`${styles.description} body secondary-text`}>
                                {card.hook}
                            </p>
                            <ul className={`${styles.tags} tech primary-text`} role="list">
                                {card.tags.map((tag, i) => (
                                    <li
                                        className={styles.items}
                                        key={i}
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className={styles.caseStudy}>
                            <hr />
                            <div className={styles.innerCase}>
                                <section className={`${styles.caseStudySection}`}>
                                    <h3 className={`${styles.caseStudySubHead} primary-text`}>The Problem</h3>
                                    <p className={`${styles.caseStudyPar} secondary-text body`}>
                                        <span>Real estate agents struggle to log, store, and use property and buyer data cleanly. HomeBase tackles this with two pillars: <span>Sellers and Buyers</span>.</span>
                                        <span>During a walkthrough, agents are working off scattered 10+ page paper forms, voice memos, and notes apps. HomeBase replaces that with an organized, collapsible form that works offline, stays easy to navigate, and captures rooms, features, and notes without losing a thing.</span>
                                        <span>On the buyer side, agents need to know exactly what a buyer wants while also building a real relationship with them. HomeBase starts with a "First Meet" form covering everything from that initial 30-60 minute conversation, then feeds into a full buyer profile tracking personal info, preferences, and showing details.</span>
                                    </p>
                                </section>
                                <section className={`${styles.caseStudySection}`}>
                                    <h3 className={`${styles.caseStudySubHead} primary-text`}>Sellers</h3>
                                    <p className={`${styles.caseStudyPar} secondary-text body`}>
                                        <span>Let's jump right into the walkthrough. It's one of the early steps an agent has to take to list a home and it has to be done right the first time. It's at a moderate pace where agents need to spend more time observing the home than documenting it. The information the agent uses to sell this home is all captured here, so missed details are either a call back to the seller or an undersold home.</span>
                                        <span>To fix this, I made a page with dropdown forms, broken up into sections, for quick scrolling and easy inputs in whatever room the agent is in. Not all homes can be described with just input fields, so each form has its own field for notes specific to that room or area, and there's a general notes popup for non-area-specific notes. A checkmark confirms a form has been saved, with a status pill indicating the sync status to the database. Bedroom, bathroom, and outbuilding forms are added dynamically depending on the specific property's needs. When a form is saved, it stores the information on the device and immediately tries to sync to the database. If the device is offline and unable to sync to the database, the information is saved to the device until the connection is restored, where it will then attempt to sync again until the data lands safely in the database.</span> 
                                        <span>Some agents prefer to stage a home so it's ready for them with general details filled out, or the walkthrough is cut short and the agent is unable to finish at that time. For this, there's a walkthrough queue on the dashboard that reminds the agents what walkthroughs are currently active and allows them to easily jump back into it.</span>
                                        <span>The simplification of the listing process doesn't end at the walkthrough. Complete homes show up as clickable cards that take the user to that seller's profile. The seller's profile is a clean, clutter-free page that holds the home and owner's information. No filing cabinets with folders and no sections of a home irrelevant to this one. The agent can edit sections in the profile or add the home back to the walkthrough queue to add sections or rooms.</span>
                                    </p>
                                </section>
                                <section className={`${styles.caseStudySection}`}>
                                    <h3 className={`${styles.caseStudySubHead} primary-text`}>Buyers</h3>
                                    <p className={`${styles.caseStudyPar} secondary-text body`}>
                                        <span>The new buyer form is less dense than the walkthrough forms, but that's only because the magic happens elsewhere on the buyer side of HomeBase. The form is designed to capture only the important information about a buyer that an agent will need and most likely get during their first conversation. Contact info, pre-approval info, urgency and experience, with a few other preference fields.</span>
                                        <span>The buyer profile is what makes HomeBase so useful as a customer relations tool. At first glance you have information worth being reminded of constantly, must-have and deal-breaker popups, and buyer contact info. The personal dropdown helps the agent keep track of why they're buying, the size and age of their family, hobbies, birthdays, and upcoming events that build the relationship between them and the buyer. The preference dropdown is what helps the agent match the buyer with the perfect home. It can be added to and customized by the agent any time as they find out more about the buyer and their needs.</span>
                                        <span>The second part of the buyer profile is showing mode. Simple but helpful, showing mode allows an agent to quickly take notes. Not in-depth detailed notes, but quick-fire, "I'm in the middle of showing a home", notes. After the showing is over, all the small notes are combined into one AI-generated summary of the showing and neatly documented in the notes dropdown of the buyer profile.</span>
                                    </p>
                                </section>
                                <section className={`${styles.caseStudySection}`}>
                                    <h3 className={`${styles.caseStudySubHead} primary-text`}>Outcome / What's next?</h3>
                                    <p className={`${styles.caseStudyPar} secondary-text body`}>
                                        This isn't just a side project to fill space on my portfolio. HomeBase is currently being used in the field by real agents, with new agents showing the same interest adn relief for a tool that could make a frustrating part of their career easier and faster. Here's what is planned that will take HomeBase to the next level: 
                                    </p>
                                    <ul className={`${styles.caseStudyFutures} secondary-text body`}>
                                        <li className={`${styles.caseStudyFuturesItem}`}>MLS (Multiple Listing Service) integration to get live listings in the area and match it them to buyers based off their preferrences.</li>
                                        <li className={`${styles.caseStudyFuturesItem}`}>A link sent to buyers after the new buyer form is filled out that takes them to a preference form. The preferences they fill out update their profile on HomeBase.</li>
                                        <li className={`${styles.caseStudyFuturesItem}`}>State form autofill, so required state paperwork can be completed in seconds instead of manually.</li>
                                        <li className={`${styles.caseStudyFuturesItem}`}>Seller profiles getting a listing summary generation, where an agent can produce a full listing summary from a home's location, features, and notes</li>
                                    </ul>
                                         
                                    
                                </section>
                                    {/* <video className={styles.video} src="/images/output.mp4" autoPlay loop muted playsInline >
                                    Your browser does not support the video tag.
                                    </video> */}
                                    
                                
                            </div>
                            <hr />
                        </section>
                        <section className={`${styles.buttons} `}>
                            <button
                                type="button"
                                /* onClick={() => (openIndex === i ? closeCase(i) : openCase(i))} */
                                className={`${styles.button} ${styles.caseStudyBtn}`}
                            >
                                Case Study
                            </button>
                            <a
                                href=""
                                className={`${styles.button} ${styles.demo} tech primary-text`}
                            >
                                Demo
                            </a>
                        </section>
                    </div>
                </SlideAway>
            ))}
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
