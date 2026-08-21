'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss'

export function LocalTime() {
    const [time, setTime] = useState(new Date())
    const minute = time.getMinutes()
    const hour = time.getHours()
    
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const minuteRotation = (minute * 360) / 60
    const hourRotation = minute === 0 
    ? (hour * 360) / 12 
    : ((hour * 360) / 12) - ((360 / minuteRotation) / 12 )

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        })
        
        return () => clearInterval(timer);
    }, [])

    return (
        <>
            <p className={`${styles.title} title secondary-text`}>
                <span className={styles.clock} >
                    <span className={styles.hour} style={{rotate: `${hourRotation}deg`}}></span>
                    <span className={styles.minute} style={{rotate: `${minuteRotation}deg`}}></span>
                </span>
                LOCAL TIME
            </p>
            <p className={`${styles.value} tech accent-text`}>{formatter.format(time)}</p>
        </>
    )
}