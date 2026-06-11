'use client'
import styles from './NavBadge.module.scss'
import { useContext, useEffect, useState } from 'react'
import { TransitionContext } from './Provider'

export default function NavPop() {
    const { exiting, setExiting } = useContext(TransitionContext)

    return (
        <>
            <button className={`${styles.logo}`} onClick={ () => (exiting ? setExiting(false) : setExiting(true)) }>
                <img src="/images/IYlogo.png" alt=""  />
            </button>
        </>
    )
}