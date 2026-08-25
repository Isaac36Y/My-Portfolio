'use client'
import { useEffect, useState } from 'react';
import styles from './Header.module.scss'

const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});

function readClock(date: Date) {
    const parts = formatter.formatToParts(date)
    const get = (type: Intl.DateTimeFormatPartTypes) =>
        Number(parts.find((p) => p.type === type)?.value ?? 0)

    return {
        label: formatter.format(date),
        hour: get('hour') % 12,
        minute: get('minute'),
    }
}

export function LocalTime() {
    // null until mounted so the server and the first client render agree
    const [clock, setClock] = useState<ReturnType<typeof readClock> | null>(null)

    useEffect(() => {
        setClock(readClock(new Date()))

        const timer = setInterval(() => {
            setClock(readClock(new Date()))
        }, 1000)

        return () => clearInterval(timer);
    }, [])

    const minuteRotation = clock ? (clock.minute * 360) / 60 : 0
    const hourRotation = clock
        ? (clock.hour * 360) / 12 + (clock.minute * 360) / 60 / 12
        : 0

    return (
        <>
            <p className={`${styles.title} title secondary-text`}>
                <span className={styles.clock} >
                    <span className={styles.hour} style={{rotate: `${hourRotation}deg`}}></span>
                    <span className={styles.minute} style={{rotate: `${minuteRotation}deg`}}></span>
                </span>
                LOCAL TIME
            </p>
            <p className={`${styles.value} ${styles.clockValue} tech accent-text`} suppressHydrationWarning>
                {clock?.label ?? '--:--:--'}
            </p>
        </>
    )
}
