'use client'
import React, { useRef, useEffect, useContext } from "react";
import { TransitionContext } from "./Provider";

export function SlideAway({children}: {children : React.ReactNode}) {
    const divRef = useRef<HTMLDivElement | null>(null)
    const { exiting } = useContext(TransitionContext)

    useEffect(() => {
        const screenCenter = window.innerHeight / 2
        if (!divRef.current) return 

        const divRect = divRef.current.getBoundingClientRect()
        const divCenterOnScreen = (divRect.height / 2) + divRect.y

        if (exiting) {
            if (divCenterOnScreen > screenCenter) {
                divRef.current.style.transform = `translateY(${screenCenter * 2}px)`
            }else {
                divRef.current.style.transform = `translateY(-${screenCenter * 2}px)`// height plus y
            }
        }else {
            divRef.current.style.transform = ''
        }
        
    }, [exiting])
    return (
        <div ref={ divRef } style={{ width: '100%', transition: 'transform 0.6s ease' }}>
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
            divRect.y > 0
            ? divRef.current.style.transform = `translateY(-${divRect.y - 20}px)`
            : divRef.current.style.transform = `translateY(${(divRect.y * -1) + 20}px)` 
        }else {
            divRef.current.style.transform = ''
        }
    }, [exiting])
    return (
        <div ref={ divRef } style={{ width: '100%', transition: 'transform 0.6s ease', zIndex: '100' }}>
            {children}
        </div>
    )
}