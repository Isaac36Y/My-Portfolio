'use client'
import styles from './NavBadge.module.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { TransitionContext } from './Provider'
import { sideNavAnchors } from '@/data/HomePage'
import { IconSun } from '@tabler/icons-react';

export default function NavPop() {
    // named aRef and btnRef based off the more important content element inside of the div referrence
    const btnRef = useRef<HTMLDivElement | null>(null)
    const aRef = useRef<(HTMLDivElement | null)[]>([])
    const { exiting, setExiting } = useContext(TransitionContext)

    useEffect(() => {
        let tranlateIncrease = 4.5
        if (exiting) {
            if (!btnRef.current) return 
            btnRef.current.style.transform = `translateY(-4.5rem)`
            aRef.current.forEach(el => {
                if (el) {
                    el.style.transform = `translateY(-${tranlateIncrease + 4.5}rem)`
                    tranlateIncrease += 4.5
                }
            }) 
        }else {
            if (!btnRef.current) return 
            btnRef.current.style.transform = ``
            aRef.current.forEach(el => {
                if (el) {
                    el.style.transform = ``
                }
            }) 
        }
    }, [exiting])

    return (
        <>
            {sideNavAnchors.map((a, i) => (
                <div key={i} ref={ (el) => { aRef.current[i] = el}} className={ styles.btnBorder }>
                // TODO: add href 
                <a className={`${ styles.btns }`}>
                    <a.img stroke={2}  color={'var(--color-bg'} />
                </a>
                </div>
            ))}
            <div ref={ btnRef } className={ styles.btnBorder}>
            // TODO: add light and dark toggle effect
            <button  className={`${ styles.btns }`}>
                <IconSun stroke={2}  color={'var(--color-bg)'} />
            </button>
            </div>
            <button className={`${styles.logo}`} onClick={ () => (exiting ? setExiting(false) : setExiting(true)) }>
                <img src="/images/IYlogo.png" alt=""  />
            </button>
        </>
    )
}
