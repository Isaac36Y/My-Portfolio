'use client'
import styles from './NavBadge.module.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext, TransitionContext } from './Provider'
import { sideNavAnchors } from '@/data/HomePage'
import { IconSun } from '@tabler/icons-react';

export default function NavPop() {
    // named aRef and btnRef based off the more important content element inside of the div referrence
    const btnRef = useRef<HTMLDivElement | null>(null)
    const aRef = useRef<(HTMLDivElement | null)[]>([])
    const { exiting, setExiting } = useContext(TransitionContext)
    const {isDarkMode, setIsDarkMode } = useContext(ThemeContext)

    useEffect(() => {
        let tranlateIncrease = 4.5
        if (exiting) {
            if (!btnRef.current) return 
            btnRef.current.style.transform = `translateY(-4.5rem)`
            btnRef.current.style.filter = 'drop-shadow(0 3px 10px rgba(0, 0, 0, 0.3))'
            aRef.current.forEach(el => {
                if (el) {
                    el.style.transform = `translateY(-${tranlateIncrease + 4.5}rem)`
                    el.style.filter = 'drop-shadow(0 3px 10px rgba(0, 0, 0, 0.3))'
                    tranlateIncrease += 4.5
                }
            }) 
        }else {
            if (!btnRef.current) return 
            btnRef.current.style.transform = ``
            btnRef.current.style.filter = ''
            aRef.current.forEach(el => {
                if (el) {
                    el.style.transform = ``
                    el.style.filter = ''
                }
            }) 
        }
    }, [exiting])

    return (
        <>
            {sideNavAnchors.map((a, i) => (
                <div key={i} ref={ (el) => { aRef.current[i] = el}} className={ styles.btnContainer}>
                    <div className={ styles.btnBorder }>
                    {/* TODO: add href */}
                    <a href={a.href} target='_blank' className={`${ styles.btns }`}>
                        <a.img stroke={2}  color={'var(--color-bg'} />
                    </a>
                    </div>
                </div>
            ))}
            <div ref={ btnRef } className={ styles.btnContainer }>
                <div className={ styles.btnBorder}>
                <button  className={`${ styles.btns }`} onClick={ () => (isDarkMode ? setIsDarkMode(false) : setIsDarkMode(true)) }>
                    {/* TODO: update the icon on mode change  */}
                    <IconSun stroke={2}  color={'var(--color-bg)'} />
                </button>
                </div>
            </div>
            <button className={`${styles.logo}`} onClick={ () => (exiting ? setExiting(false) : setExiting(true)) }>
                <img src="/images/IYlogo.png" alt="" className={`${styles.badge} ${styles.badgeDark}`} />
                <img src="/images/IYlogo-light.png" alt="" className={`${styles.badge} ${styles.badgeLight}`}  />
            </button>
        </>
    )
}
