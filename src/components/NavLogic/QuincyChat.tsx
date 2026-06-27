'use client'
import { useContext, useEffect, useRef } from "react";
import { TransitionContext } from "./Provider";
import styles from './QuincyChat.module.scss'
import { IconArrowNarrowUp } from '@tabler/icons-react';

export default function QuincyChat() {
    const { exiting } = useContext(TransitionContext)
    const chatContainer = useRef<HTMLDivElement | null>(null)
    const chatBox = useRef<HTMLDivElement | null>(null)
    const textField = useRef<HTMLTextAreaElement | null>(null)
    const sendBtn = useRef<HTMLButtonElement | null>(null)
    const quincyMessages = useRef<(HTMLParagraphElement | null)[]>([])
    const userMessages = useRef<(HTMLParagraphElement | null)[]>([])

    const greeting = "Hi, I'm Quincy, Isaac's AI assistant. You can ask me anything about his work, his tech opinions, or any other question you have about him and I'll do my best to answer them"

    function sendPrompt() {
        if (!sendBtn.current || !textField.current?.value.length) return


    }

    useEffect(() => {
        const words = greeting.split(" ")
        let currentWordIndex = 0;
        const typingSpeed = 100;

        function typeByWord() {
           const words = greeting.split(' ');
  
            const spanWords = words.map((word, index) => {
                return `<span style="animation-delay: ${index * 0.15}s;">${word}&nbsp;</span>`;
            });
            
            quincyMessages.current[0]!.innerHTML = spanWords.join('');
        }

        if (exiting) {
            typeByWord()
        }
    }, [exiting])

    return (
        <div ref={chatContainer} className={`${styles.chatContainer} ${exiting ? styles.open : ''}`}>
            <div ref={chatBox} className={`${styles.chatBox}`}>
                <p ref={(el) => {quincyMessages.current[0] = el}} className={`${styles.quincyMessage} body primary-text`}></p>
            </div>
            <div className={styles.inputWrap}>
                <textarea className={`${styles.textField} body secondary-text`} ref={textField} name="quick-chat" id="quincy-chat" placeholder="Ask Quincy"></textarea>
                <button className={styles.sendBtn} ref={sendBtn}><IconArrowNarrowUp /></button>
            </div>
        </div>
    )
}