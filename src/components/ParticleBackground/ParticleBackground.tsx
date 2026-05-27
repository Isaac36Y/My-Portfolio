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
    
        const particles: { x: number, y: number, radius: number }[] = []

        for (let i = 0; i < 100; i++ ) {
            particles.push({ 
                x: Math.random() * canvas.width, 
                y: Math.random() * canvas.height, 
                radius: 4 })
        }

        ctx.fillStyle = 'rgba(100,220,230, 0.4)'
        for (let particle of particles ) {
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
            ctx.fill()
        }
        ctx.strokeStyle = 'rgba(100,220,230, 0.4)'
        ctx.beginPath()
        particles.forEach((particle, index) => {
            for (let i = index + 1; i < particles.length; i++) {
                const distance = Math.sqrt(Math.pow(particles[i].x - particle.x, 2) + Math.pow(particles[i].y - particle.y, 2))
                if (distance <= 125) {
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[i].x, particles[i].y)
                    
                }
            }
        })
        ctx.stroke()
    }, [])

    return <canvas className={ styles.myCanvas } ref={canvasRef} />
}
