'use client'
import React, { createContext, useState, useEffect } from "react"

export const TransitionContext = createContext({exiting: false, setExiting: (_: boolean) => {} })

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
    const [exiting, setExiting] = useState(false)

    useEffect(() => {
    if (exiting) {
        document.body.style.overflow = 'hidden';
    }else {
        document.body.style.overflow = '';
    }
  }, [exiting]);


    return (
        <TransitionContext.Provider value={{ exiting, setExiting }} >
            {children}
        </TransitionContext.Provider>
    )
}