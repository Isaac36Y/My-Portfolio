'use client'

import { useRef, useEffect } from 'react';
import styles from '@/app/page.module.scss'

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return 
        const ctx = canvas.getContext("2d");
        if (!ctx) return
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        let particles: { x: number, y: number, radius: number }[] = []

        for (let i = 0; i < 50; i++ ) {
            particles.push({ 
                x: Math.random() * canvas.width, 
                y: Math.random() * canvas.height, 
                radius: 4 })
        }

        ctx.fillStyle = 'rgb(100,220,230)'
        for (let particle of particles ) {
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
            ctx.fill()
        }
    }, [])

    return <canvas className={ styles.myCanvas } ref={canvasRef} />
}
