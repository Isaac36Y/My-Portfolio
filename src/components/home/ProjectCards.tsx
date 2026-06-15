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

    const openCase = (index: number) => {
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
    }, [openIndex, isClosing]);

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
                            <p className={`${styles.description} body secondary-text`}>
                                {card.hook}
                            </p>
                            <ul className={`${styles.tags} tech secondary-text`} role="list">
                                {card.tags.map((tag, i) => (
                                    <li
                                        className=""
                                        key={i}
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className={styles.caseStudy}>
                            <hr />
                            <section></section>
                            <hr />
                        </section>
                        <section className={`${styles.buttons} `}>
                            <button
                                type="button"
                                onClick={() => (openIndex === i ? closeCase(i) : openCase(i))}
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
