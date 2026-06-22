'use client'

import { useRef, useEffect, useContext } from 'react';
import styles from './ParticleBackground.module.scss'
import { ThemeContext, TransitionContext } from '../NavLogic/Provider';

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const toGo = useRef<{ x: number, vx: number, y: number, homeY: number, radius: number }[]>([])
    const { exiting } = useContext(TransitionContext)
    const { isDarkMode } = useContext(ThemeContext)
    // always on when the nav is open
    const particlesTight = useRef<boolean>(false)
    // runs once when the particles tighten, then gets turn back to false so that it only toGo only takes one snap shot
    const tightenSnap = useRef<boolean>(false)
    // runs until particles are expanded, then sets back to false so particles move based off vy/vx
    const expandsParticles = useRef<boolean>(false)
    // does the samme as tightenSnap
    const expandSnap = useRef<boolean>(false)
    const darkModeOn = useRef<boolean>(isDarkMode)
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

    useEffect(() => {
        if (particlesTight.current) {
            expandsParticles.current = true 
            expandSnap.current = true
        } 
        particlesTight.current = exiting
        tightenSnap.current = exiting
        toGo.current = []
    }, [exiting])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return 
        const ctx = canvas.getContext("2d");
        if (!ctx) return

        canvas.width = window.innerWidth - (window.innerWidth * 0.2);
        canvas.height = window.innerHeight - (window.innerHeight * 0.1);

        const particleAmount = (canvas.width + canvas.height) / 15
        
        const particles: { x: number, vx: number, y: number, homeY: number, radius: number }[] = []
        const particleRadius = 4
        
        for (let i = 0; i < particleAmount; i++ ) {
            const randomY = particleRadius + Math.random() * (canvas.height - 2 * particleRadius);
            const particle = { 
                x: particleRadius + Math.random() * (canvas.width - 2 * particleRadius),
                vx: Math.random() * 2 - 1,
                y: randomY,
                homeY: randomY,
                radius: particleRadius }
            particles.push(particle)
            toGo.current.push(particle)
        }

        let animId: number;

        const tightenRect = {
            top: 50,
            bottom: 300
        }

        function draw() {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
            ctx!.fillStyle = darkModeOn ? 'rgba(27, 61, 86, 1)' : 'rgba(60,75,110, 0.1)'
            ctx!.strokeStyle = darkModeOn ? 'rgba(148,172,190, 0.2)' : 'rgba(60,75,110, 0.1)'

            const drawConnection = (threshold: number) => {
                ctx!.beginPath()
                particles.forEach((particle, index) => {
                    for (let i = index + 1; i < particles.length; i++) {
                        const distance = Math.sqrt(Math.pow(particles[i].x - particle.x, 2) + Math.pow(particles[i].y - particle.y, 2))
                        if (distance <= threshold) {
                            ctx!.moveTo(particle.x, particle.y);
                            ctx!.lineTo(particles[i].x, particles[i].y)
                        }
                    }
                })
                ctx!.stroke()
            }

            const drawParticle = (p: { x: number, vx: number, y: number, homeY: number, radius: number }) => {
                ctx!.beginPath()
                ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx!.fill()
            }

            const bounceParticle = (p: { x: number, vx: number, y: number, homeY: number, radius: number }) => {
                if (p.x < p.radius) {
                    p.x = p.radius;
                    p.vx = Math.abs(p.vx);
                } else if (p.x > canvas!.width - p.radius) {
                    p.x = canvas!.width - p.radius;
                    p.vx = -Math.abs(p.vx);
                }
            }

            if (particlesTight.current) {
                drawConnection(100)

                if (tightenSnap.current) {
                    for (let i = 0; i < particles.length; i++ ) {
                        const tightenHeight = tightenRect.bottom - tightenRect.top
                        const newPart = { 
                            x: particles[i].x, 
                            vx: particles[i].vx,
                            y: ((particles[i].y * tightenHeight) / canvas!.height) + tightenRect.top,
                            homeY: particles[i].homeY,
                            radius: 4 
                        }
                        toGo.current.push(newPart)
                    }
                    tightenSnap.current = false
                }
                for (let i = 0; i < toGo.current.length; i++) {
                    particles[i].x = particles[i].x + particles[i].vx * 1.4
                    particles[i].y = lerp(particles[i].y, toGo.current[i].y, 0.05)

                    bounceParticle(particles[i])
                    drawParticle(particles[i])
                }
                
                
            }else {
                drawConnection(125)
                if (expandSnap.current) {
                    for (let i = 0; i < particles.length; i++ ) {
                        const tightenHeight = tightenRect.bottom - tightenRect.top
                        const newPart = { 
                            x: particles[i].x, 
                            vx: particles[i].vx,
                            y: particles[i].homeY,
                            homeY: particles[i].homeY,
                            radius: 4 
                        }
                        toGo.current.push(newPart)
                    }
                    expandSnap.current = false
                }
                for (let i = 0; i < toGo.current.length; i++) {
                    
                    particles[i].x = particles[i].x + particles[i].vx
                    particles[i].y = lerp(particles[i].y, toGo.current[i].y, 0.05)

                    bounceParticle(particles[i])
                    drawParticle(particles[i])
                }
            }
            
            animId = requestAnimationFrame(draw);
            
        }
        animId = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(animId)
        
    }, [])

    return <canvas className={ styles.myCanvas } ref={canvasRef} />
}
