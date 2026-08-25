'use client'
import React, { useRef, useEffect, useContext, useState } from "react";
import { TransitionContext } from "./Provider";
import styles from "../home/Nav.module.scss"


export function SlideAway({children, className}: {children : React.ReactNode, className?: string}) {
    const divRef = useRef<HTMLDivElement | null>(null)
    const { exiting } = useContext(TransitionContext)
    // If a screen shrink under desktop size then grows over desktop size, even after load, the 
    // initial load animation happens again with a 7s delay.
    // Two states to prevent that
    const [width, setWidth] = useState(() => 
        typeof window !== 'undefined' ? window.innerWidth : 0
    );
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (!divRef.current) return
        // first paint no transition, then let the css transition effects do their thing after 100ms
        divRef.current.style.transition = 'none'
        setTimeout(() => {
            divRef.current!.style.transition = ''
        }, 100)
        const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        divRef.current!.style.opacity = '1'
                        divRef.current!.style.translate = '0 0'
                        observer.unobserve(entry.target)
                    }
                })
                
            },
            { root: null, threshold: 0.3}
        )
        observer.observe(divRef.current)
        // The screen resizer the Skills not animating after load relies on
        const handleResize = () => setWidth(window.innerWidth);
        
        window.addEventListener('resize', handleResize);

        if (width < 1252) setIsMobile(true)
        
        
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const screenCenter = window.innerHeight / 2
        if (!divRef.current) return

        

        const divRect = divRef.current.getBoundingClientRect()
        const divCenterOnScreen = (divRect.height / 2) + divRect.y

        if (exiting) {
            if (divCenterOnScreen > screenCenter) {
                //slide down
                divRef.current.style.transform = `translateY(${screenCenter * 2}px)`
            }else {
                //slide up
                divRef.current.style.transform = `translateY(-${screenCenter * 2}px)`
            }
        }else {
            divRef.current.style.transform = ''
        }
        
    }, [exiting])
    // a modifier declared in Nav.module.scss wins, otherwise treat it as a plain class name
    const extraClass = className ? (styles[className] ?? className) : ''

    return (
        <div ref={ divRef } style={isMobile && className === 'skills' ? { animation: 'none', opacity: '1' } : {}} className={`${styles.slideAway} ${extraClass}`.trim()}>
            {children}
        </div>
    )
}

export function NavBarWrapper({children}: {children : React.ReactNode}) {
    const divRef = useRef<HTMLDivElement | null>(null)
    const { exiting } = useContext(TransitionContext)

    useEffect(() => {
        if (!divRef.current) return 
        const divRect = divRef.current.getBoundingClientRect()

        if (exiting) {
            // ensures the nav always go to the top with some padding
            divRect.y > 0
            ? divRef.current.style.transform = `translateY(-${divRect.y - 58}px)`
            : divRef.current.style.transform = `translateY(${(divRect.y * -1) + 58}px)` 
        }else {
            divRef.current.style.transform = ''
        }
    }, [exiting])
    return (
        <div ref={ divRef } className={styles.mobileNavWrapper} style={{ width: '100%', transition: 'transform 0.6s ease', zIndex: '100' }}>
            {children}
        </div>
    )
}
