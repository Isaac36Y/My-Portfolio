'use client'
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";

export function SQLQuery() {
    const [displayedText, setDisplayedText] = useState('')
    const [loading, setLoading] = useState(false)
    const query = "SELECT * FROM devolopers WHERE type @> 'problem-solver'"

    useEffect(() => {
        let index = 0
        setDisplayedText('')

        const timer = setInterval(() => {
            setDisplayedText(query.slice(0, index))
            index++
            if (index > query.length) clearInterval(timer)
        }, 40)


        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        if (displayedText.length !== query.length) return

        setLoading(true)
        const timeout = setTimeout(() => setLoading(false), 1300)

        return () => clearTimeout(timeout);
    }, [displayedText])

    return (
        <div className={styles.sqlquery}>
            <p className="tech accent-text">
                {displayedText}
                <span className={`${styles.loadingDots} ${loading ? styles.loading : ''}`}>
                    <span></span>
                    <span style={{animationDelay: '0.1s'}}></span>
                    <span style={{animationDelay: '0.2s'}}></span>
                </span>
            </p>
        </div>
    )
}
