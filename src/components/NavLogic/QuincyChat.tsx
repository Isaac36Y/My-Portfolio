'use client'
import { useContext, useEffect, useRef, useState } from "react";
import { TransitionContext } from "./Provider";
import styles from './QuincyChat.module.scss'
import { IconArrowNarrowUp } from '@tabler/icons-react';
import { getQuincyRes } from "@/lib/quincy";

export default function QuincyChat() {
    const { exiting } = useContext(TransitionContext)
    const chatContainer = useRef<HTMLDivElement | null>(null)
    const chatBox = useRef<HTMLDivElement | null>(null)
    const textField = useRef<HTMLTextAreaElement | null>(null)
    const sendBtn = useRef<HTMLButtonElement | null>(null)
    const quincyGreet = useRef<HTMLParagraphElement | null>(null)
    const [opened, setOpened] = useState<boolean>(false)
    const [messages, setMessages] = useState<{sender: string, message: string}[]>([])

    const greeting = "Hi, I'm Quincy, Isaac's AI assistant. You can ask me anything about his work, his tech opinions, or any other question you have about him and I'll do my best to answer them"

    function scrollChatDown() {
        if (!chatBox.current) return
        chatBox.current!.scrollTo({
            top: chatBox.current!.scrollHeight,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        const vv = window.visualViewport
        const el = chatContainer.current
        if (!vv || !el) return

        function syncToViewport() {
            el!.style.height = `${vv!.height}px`
            el!.style.transform = `translateY(${vv!.offsetTop}px)`
        }

        syncToViewport()
        vv.addEventListener('resize', syncToViewport)
        vv.addEventListener('scroll', syncToViewport)
        return () => {
            vv.removeEventListener('resize', syncToViewport)
            vv.removeEventListener('scroll', syncToViewport)
        }
    }, [])

    async function sendPrompt() {
        if (!sendBtn.current || !textField.current) return
        sendBtn.current.disabled = true;
        const prompt = textField.current.value
        if (!prompt) return 
        const newMessages = [...messages, { sender: 'user', message: prompt}] 
        setMessages(newMessages)
        const scrollInterval = setInterval(() => scrollChatDown(), 150)
        textField.current.value = ''
        const response = await getQuincyRes(newMessages)
        const responseTime = response.split(" ").length * 150
        setMessages(prev => [...prev, { sender: 'quincy', message: response}])
        setTimeout(() => {
            sendBtn.current!.disabled = false
            clearInterval(scrollInterval)
        }, responseTime)
    }

    useEffect(() => {
        function typeByWord(el: HTMLParagraphElement, msg: string) {
           const words = msg.split(' ');
  
            const spanWords = words.map((word, index) => {
                return `<span style="animation-delay: ${index * 0.1}s;">${word}&nbsp;</span>`;
            });
            
            el.innerHTML = spanWords.join('');
        }

        if (exiting && !opened) {
            typeByWord(quincyGreet.current!, greeting)
            setOpened(true)
        }
    }, [exiting])

    useEffect(() => {
        if (!chatBox.current) return 
        const screen = window.innerHeight
        const chat = chatBox.current.offsetHeight

        if (chat > screen / 2) {
            chatBox.current.style.maskImage = "linear-gradient(to bottom, transparent 0%, black 25%)"
        }
    }, [messages])

    return (
        <div ref={chatContainer} className={`${styles.chatContainer} ${exiting ? styles.open : ''}`}>
            <div ref={chatBox} className={`${styles.chatBox}`}>
                <p ref={quincyGreet} className={`${styles.quincyMessage} body primary-text`}></p>
                { messages.map((msg, i) => (
                    msg.sender === 'user' ? (
                    <p key={i} className={`${styles.userMessage} body`}>{msg.message}</p>
                    ) : (
                    <p key={i} className={`${styles.quincyMessage} body primary-text`}>
                        {msg.message.split(' ').map((word, w) => (
                        <span key={w} style={{ animationDelay: `${w * 0.1}s` }}>
                            {word.match('isaac@isaacyoungs.dev') ? <a href="mailto:isaac@isaacyoungs.dev">{word}</a> : word}&nbsp;</span>
                        ))}
                    </p>
                    )

                ))}
            </div>
            <div className={styles.inputWrap}>
                <textarea className={`${styles.textField} body`} ref={textField} name="quick-chat" id="quincy-chat" placeholder="Ask Quincy..."></textarea>
                <button onClick={() => sendPrompt()} className={styles.sendBtn} ref={sendBtn}><IconArrowNarrowUp color="black" /></button>
            </div>
        </div>
    )
}
