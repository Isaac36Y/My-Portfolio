'use client'

import { useRef, useEffect } from 'react';
import styles from './ParticleBackground.module.scss'

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return 
        const ctx = canvas.getContext("2d");
        if (!ctx) return

        canvas.width = window.innerWidth - (window.innerWidth * 0.1);
        canvas.height = window.innerHeight - (window.innerHeight * 0.1);

        const particleAmount = (canvas.width + canvas.height) / 15
        
        const particles: { x: number, vx: number, y: number, vy: number, radius: number }[] = []
        
        for (let i = 0; i < particleAmount; i++ ) {
            particles.push({ 
                x: Math.random() * (canvas.width - 4),
                vx: Math.random() * 2 - 1,
                y: Math.random() * (canvas.height - 4),
                vy: Math.random() * 2 - 1,
                radius: 4 })
        }

        let animId: number;

        function draw() {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
            
            ctx!.fillStyle = 'rgba(60,75,110, 0.05)'
            ctx!.strokeStyle = 'rgba(60,75,110, 0.05)'
            ctx!.save()

            for (let particle of particles ) {
                particle.x = particle.x + particle.vx
                particle.y = particle.y + particle.vy

                if (particle.x + particle.vx > canvas!.width - particle.radius || particle.x + particle.vx < particle.radius) {
                    particle.vx = -particle.vx
                }
                if (particle.y + particle.vy > canvas!.height - particle.radius || particle.y + particle.vy < particle.radius) {
                    particle.vy = -particle.vy
                }

                ctx!.beginPath()
                ctx!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx!.fill()
            }

            ctx!.beginPath()
            particles.forEach((particle, index) => {
                for (let i = index + 1; i < particles.length; i++) {
                    const distance = Math.sqrt(Math.pow(particles[i].x - particle.x, 2) + Math.pow(particles[i].y - particle.y, 2))
                    if (distance <= 125) {
                        ctx!.moveTo(particle.x, particle.y);
                        ctx!.lineTo(particles[i].x, particles[i].y)
                        
                    }
                }
            })
            ctx!.stroke()
            
            animId = requestAnimationFrame(draw);
        }
        animId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animId)
        
    }, [])

    return <canvas className={ styles.myCanvas } ref={canvasRef} />
}
