'use client'

import styles from "./Header.module.scss";
import { useEffect, useState } from "react";

export function SQLQuery() {
    const [displayedText, setDisplayedText] = useState('')
    const query = "SELECT * FROM devolopers WHERE type @> 'problem-solver'"
    
    useEffect(() => {
        let index = 0
        setDisplayedText('')

        const timer = setInterval(() => {
            setDisplayedText((prev) => prev + query.charAt(index))
            index++
        }, 100)


        return () => clearInterval(timer);
    }, [])

    return (
        <div className={styles.sqlquery}>
            <p className="tech accent-text">{displayedText}<span>|</span></p>
        </div>
    )
}