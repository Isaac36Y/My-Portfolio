'use client'
import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";


// client boundary for the header element itself. children are rendered on the
// server and passed through, so DevBadge stays an async server component.
export function HeaderShell({ children }: { children: React.ReactNode }) {
    const [width, setWidth] = useState(() => 
        typeof window !== 'undefined' ? window.innerWidth : 0
    );
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        
        window.addEventListener('resize', handleResize);

        if (width < 1252) setIsMobile(true)
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header
            className={styles.header}
            id="header"
            style={isMobile ? { animation: 'none', opacity: '1' } : {}}
        >
            {children}
        </header>
    );
}
