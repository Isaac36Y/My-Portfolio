'use client'
import React, { createContext, useState, useEffect } from "react"

export const TransitionContext = createContext({exiting: false, setExiting: (_: boolean) => {} })
export const ThemeContext = createContext({isDarkMode: false, setIsDarkMode: (_: boolean) => {}})

export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const [exiting, setExiting] = useState(false)

    useEffect(() => {
    const body = document.body;
    if (exiting) {
        // Fully lock the page (not just overflow:hidden) so iOS Safari can't
        // scroll the layout viewport when the keyboard opens, which would
        // otherwise drag the slid-away sections back into view.
        const scrollY = window.scrollY;
        body.dataset.scrollLock = String(scrollY);
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';
        body.style.overflow = 'hidden';
    } else {
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
  }, [exiting]);


    return (
        <TransitionContext.Provider value={{ exiting, setExiting }} >
            {children}
        </TransitionContext.Provider>
    )
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === 'undefined') return false;
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
