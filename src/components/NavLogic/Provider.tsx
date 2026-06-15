'use client'
import React, { createContext, useState, useEffect } from "react"

export const TransitionContext = createContext({exiting: false, setExiting: (_: boolean) => {} })
export const ThemeContext = createContext({isDarkMode: false, setIsDarkMode: (_: boolean) => {}})

export function TransitionProvider({ children }: { children: React.ReactNode }) {
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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === 'undefined') return false; // Handle SSR (Next.js) safely
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        document.body.dataset.theme = isDarkMode ? 'dark' : 'light'
    }, [isDarkMode])

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }} >
            {children}
        </ThemeContext.Provider>
    )
}
