'use client'
import React, { createContext, useState } from "react"

export const TransitionContext = createContext({exiting: false, setExiting: (_: boolean) => {} })

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
    const [exiting, setExiting] = useState(false)

    return (
        <TransitionContext.Provider value={{ exiting, setExiting }} >
            {children}
        </TransitionContext.Provider>
    )
}