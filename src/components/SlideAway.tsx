'use client'
import React, { useRef, useEffect } from "react";

export default function SlideAway({children}: {children : React.ReactNode}) {
    const divRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        console.log(divRef.current?.getBoundingClientRect())
    }, [])
    return (
        <div ref={ divRef } style={{ width: '100%', transition: 'transform 0.4s ease' }}>
            {children}
        </div>
    )
}