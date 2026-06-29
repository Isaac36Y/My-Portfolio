'use client'

import { useRef, useEffect, useContext } from 'react';
import styles from './ParticleBackground.module.scss'
import { ThemeContext, TransitionContext } from '../NavLogic/Provider';
import { particleColors, lineColors } from '@/data/HomePage';

interface particleState {
    x: number, vx: number, y: number, originalY: number, tightenedY: number, radius: number 
}

type RGBA = { r: number; g: number; b: number; a: number }

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const toGo = useRef<particleState[]>([])
    const { exiting } = useContext(TransitionContext)
    const { isDarkMode } = useContext(ThemeContext)
    // draw() can't use state since it never reset - needs refs so that it can be updated in between paints
    // always on when the nav is open
    const particlesTight = useRef<boolean>(false)
    // runs until particles are expanded, then sets back to false so particles move based off vy/vx
    const expandsParticles = useRef<boolean>(false)
    // put the context in a ref so it can be used inside the draw function
    const darkModeOn = useRef<boolean>(isDarkMode)
    const particleColorRef = useRef<{r: number, g: number, b: number, a: number}>(particleColors.darkMode.expanded)
    const lineColorRef = useRef<{r: number, g: number, b: number, a: number}>(lineColors.darkMode.expanded)
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
    // lerp takes full rgba object for the particle and line transitions
    const lerpColor = (current: RGBA, target: RGBA, t: number): RGBA => ({
        r: lerp(current.r, target.r, t),
        g: lerp(current.g, target.g, t),
        b: lerp(current.b, target.b, t),
        a: lerp(current.a, target.a, t),
    })

    useEffect(() => {
        if (particlesTight.current) {
            expandsParticles.current = true 
        } 
        particlesTight.current = exiting

    }, [exiting])

    useEffect(() => {darkModeOn.current = isDarkMode}, [isDarkMode])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return 
        const ctx = canvas.getContext("2d");
        if (!ctx) return

        canvas.width = window.innerWidth - (window.innerWidth * 0.2);
        canvas.height = window.innerHeight - (window.innerHeight * 0.1);

        const particleAmount = (canvas.width + canvas.height) / 15
        
        const particles: particleState[] = []
        const particleRadius = 4;

        const tightenRect = {
            top: 100,
            bottom: 325
        }
        
        for (let i = 0; i < particleAmount; i++ ) {
            const randomY = particleRadius + Math.random() * (canvas.height - 2 * particleRadius);
            const tightenHeight = tightenRect.bottom - tightenRect.top

            const particle = { 
                x: particleRadius + Math.random() * (canvas.width - 2 * particleRadius),
                vx: Math.random() * 2 - 1,
                y: randomY,
                originalY: randomY,
                tightenedY: ((randomY * tightenHeight) / canvas!.height) + tightenRect.top,
                radius: particleRadius }
            particles.push(particle)
            toGo.current.push(particle)
        }

        let animId: number;

        function draw() {
            const mode = darkModeOn.current ? "darkMode" : "lightMode"
            const state = particlesTight.current ? "tight" : "expanded"

            particleColorRef.current = lerpColor(particleColorRef.current, particleColors[mode][state], 0.06)
            lineColorRef.current = lerpColor(lineColorRef.current, lineColors[mode][state], 0.06)

            const pColor = particleColorRef.current
            const lColor = lineColorRef.current
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
            ctx!.fillStyle = `rgba(${pColor.r},${pColor.g},${pColor.b}, ${pColor.a})`
            ctx!.strokeStyle = `rgba(${lColor.r},${lColor.g},${lColor.b}, ${lColor.a})`

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

            const drawParticle = (p: particleState) => {
                ctx!.beginPath()
                ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx!.fill()
            }

            const bounceParticle = (p: particleState) => {
                if (p.x < p.radius) {
                    p.x = p.radius;
                    p.vx = Math.abs(p.vx);
                } else if (p.x > canvas!.width - p.radius) {
                    p.x = canvas!.width - p.radius;
                    p.vx = -Math.abs(p.vx);
                }
            }

            if (particlesTight.current) {
                drawConnection(90)

                for (let i = 0; i < toGo.current.length; i++) {
                    particles[i].x = particles[i].x + particles[i].vx * 2
                    particles[i].y = lerp(particles[i].y, particles[i].tightenedY, 0.08)

                    bounceParticle(particles[i])
                    drawParticle(particles[i])
                }
                
                
            }else {
                drawConnection(125)

                for (let i = 0; i < toGo.current.length; i++) {
                    
                    particles[i].x = particles[i].x + particles[i].vx
                    particles[i].y = lerp(particles[i].y, particles[i].originalY, 0.08)

                    bounceParticle(particles[i])
                    drawParticle(particles[i])
                }
            }
            
            animId = requestAnimationFrame(draw);
            
        }
        animId = requestAnimationFrame(draw)
        return () => {
            cancelAnimationFrame(animId)
            toGo.current = []
        }
        
    }, [])

    return <canvas className={ styles.myCanvas } ref={canvasRef} />
}
