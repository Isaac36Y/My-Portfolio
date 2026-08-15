'use client'
import styles from './NavBadge.module.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext, TransitionContext } from './Provider'
import { sideNavAnchors } from '@/data/HomePage'
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function NavPop() {
    // named aRef and btnRef based off the more important content element inside of the div referrence
    const btnRef = useRef<HTMLDivElement | null>(null)
    const aRef = useRef<(HTMLDivElement | null)[]>([])
    const { exiting, setExiting } = useContext(TransitionContext)
    const {isDarkMode, setIsDarkMode } = useContext(ThemeContext)
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        let tranlateIncrease = 4.5
        if (exiting && window.innerWidth < 1200) {
            if (!btnRef.current) return
            btnRef.current.style.display = `block`
            setTimeout(() => {
                btnRef.current!.style.transform = `translateX(-4.5rem) scale(1)`
                btnRef.current!.style.filter = 'drop-shadow(0 3px 10px rgba(0, 0, 0, 0.3))'
            }, 20)
            
            aRef.current.forEach(el => {
                if (el) {
                    el.style.display = `block`
                    setTimeout(() => {
                        el.style.transform = `translateX(-${tranlateIncrease + 4.5}rem)`
                        el.style.filter = 'drop-shadow(0 3px 10px rgba(0, 0, 0, 0.3))'
                        tranlateIncrease += 4.5
                    }, 20)
                    
                }
            }) 
        }else {
            if (!btnRef.current) return 
            btnRef.current.style.transform = ``
            btnRef.current.style.filter = ''
            setTimeout(() => {
                btnRef.current!.style.display = ``
            }, 600)
            
            aRef.current.forEach(el => {
                if (el) {
                    el.style.transform = ``
                    el.style.filter = ''
                    setTimeout(() => {
                        el.style.display = ``
                    }, 600)
                }
            }) 
        }
    }, [exiting])

    return (
        <>
            {sideNavAnchors.map((a, i) => (
                <div className={`${styles.hexBorder} ${styles.borderOne}`} key={i} ref={ (el) => { aRef.current[i] = el}} >
                    <div className={`${styles.hexBorder} ${styles.borderTwo}`}>
                        <div className={`${styles.hexBorder} ${styles.borderThree}`}>
                            <div className={`${styles.hexBorder} ${styles.borderFour}`}>
                                <div className={`${styles.hexBorder} ${styles.borderFive}`}>
                                    <a   className={ styles.hexButton} href={a.href} target='_blank'>
                                        <a.img stroke={2}  color={'var(--color-primary'} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            ))}
            <div className={`${styles.hexBorder} ${styles.borderOne}`} ref={ btnRef } onClick={ () => (isDarkMode ? setIsDarkMode(false) : setIsDarkMode(true)) }>
                <div className={`${styles.hexBorder} ${styles.borderTwo}`}>
                    <div className={`${styles.hexBorder} ${styles.borderThree}`}>
                        <div className={`${styles.hexBorder} ${styles.borderFour}`}>
                            <div className={`${styles.hexBorder} ${styles.borderFive}`}>
                                <button  className={ styles.hexButton }>
                                    {mounted && (isDarkMode ? <IconSun stroke={2}  color={'var(--color-primary)'} /> : <IconMoon stroke={2}  color={'var(--color-primary)'} /> )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={`${ styles.btnContainer } ${styles.quincyBtn} body`}>
                <div className={ styles.btnBorder}>
                <button  className={`${ styles.btns }`} onClick={ () => (exiting ? setExiting(false) : setExiting(true)) }>
                    Q
                </button>
                </div>
            </div> */}
            <button className={`${styles.scanButton} body`} onClick={() => exiting ? setExiting(false) : setExiting(true)}>
                <span className={`${styles.ring} ${styles.ringOne}`}></span>
                <span className={`${styles.ring} ${styles.ringTwo}`}></span>
                Q
            </button>
        </>
    )
}
