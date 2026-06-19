'use client'

import { useRef, useEffect, useState, useContext } from 'react';
import styles from './ParticleBackground.module.scss'
import { TransitionContext } from '../NavLogic/Provider';

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const toGo = useRef<{ x: number, vx: number, y: number, vy: number, radius: number }[]>([])
    const { exiting } = useContext(TransitionContext)
    const exitingRef = useRef<boolean>(false)
    const newParticleRef = useRef<boolean>(false)
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

    useEffect(() => {
        exitingRef.current = exiting
        newParticleRef.current = exiting
        toGo.current = []
    }, [exiting])

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

        const tightenRect = {
            top: 50,
            bottom: 300
        }

        function draw() {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
            const computedStyles = window.getComputedStyle(canvas!);
            const strokeColor = computedStyles.getPropertyValue('--color-particle').trim();
            ctx!.fillStyle = strokeColor
            ctx!.strokeStyle = strokeColor
            ctx!.save()

            if (exitingRef.current) {
                if (newParticleRef.current) {
                    for (let i = 0; i < particles.length; i++ ) {
                        const tightenHeight = tightenRect.bottom - tightenRect.top
                        const newPart = { 
                            x: particles[i].x, 
                            vx: particles[i].vx,
                            y: ((particles[i].y * tightenHeight) / canvas!.height) + tightenRect.top,
                            vy: particles[i].vy,
                            radius: 4 
                        }
                        toGo.current.push(newPart)
                    }
                    newParticleRef.current = false
                }

                for (let i = 0; i < toGo.current.length; i++) {
                    particles[i].x = particles[i].x + particles[i].vx


                    if (particles[i].y > toGo.current[i].y) {
                        particles[i].y = lerp(particles[i].y, toGo.current[i].y, 0.05)
                    }
                    if (particles[i].y < toGo.current[i].y) {
                        particles[i].y = lerp(particles[i].y, toGo.current[i].y, 0.05)
                    }

                    if (particles[i].x + particles[i].vx > canvas!.width - particles[i].radius || particles[i].x + particles[i].vx < particles[i].radius) {
                        particles[i].vx = -particles[i].vx
                    }
                    
                ctx!.beginPath()
                ctx!.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2)
                ctx!.fill()
                }
            }else {
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
        animId = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(animId)
        
    }, [])

    return <canvas className={ styles.myCanvas } ref={canvasRef} />
}
