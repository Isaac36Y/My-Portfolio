import styles from './Testimonial.module.scss'
import { liveRunners } from '@/data/HomePage'
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { SlideAway } from '../NavLogic/SlideAway';

export default function TestimonialRunner() {
    const statusColor = ['var(--color-accent)', 'var(--color-accent)', 'var(--color-secondary)']

    return (
        <>
            <SlideAway>
            <div className={styles.runner}>
                <div className={styles.introBorder}>
                    <hr />
                    <p className={`${styles.introTitle} tech secondary-text`} >still running</p>
                </div>
                <p className={`${styles.claim} primary-text`}>I didn't learn to code just to build demos.<br /> I build software to <span>fix the broken workflows</span> people struggle with every day.</p>
                
                <div className={`${styles.testimonial}`}>
                    <p className={`${styles.quote} body primary-text`}>"I threw out my 10-page paper forms. I'm not going back"</p>
                    <p className={`${styles.agentLabel} tech secondary-text`}>{/* Keyna Mieves • */} a HomeBase user</p>
                </div>
            </div>
            </SlideAway>
            <SlideAway>
            <div className={`${styles.runner} ${styles.contactSection}`}>
                <ul className={styles.liveList}>
                    {liveRunners.map((item, index) => (
                        <li className={styles.liveItem} key={index}>
                            <div className={styles.liveIcon}></div>
                            <p
                            className={`${styles.liveStatus} tech`}
                            style={{ color: statusColor[index] }}
                            >{item.status}</p>
                            <p className={`${styles.liveName} body primary-text`}> {item.name}</p>
                            <p className={`${styles.liveDescription} tech secondary-text`}>{index === 2 ? '' : '- '}{item.description}</p>
                        </li>
                    ))}
                </ul>
                <div className={styles.contactMe}>
                    <p className={`${styles.contactMeHook} primary-text body`}>Don't settle for something in your process that is held together by spreadsheets and workarounds.</p>
                    <a href="mailto:isaac@isaacyoungs.dev?subject=Let%27s%20build%20something" className={`${styles.contactMeButton} body`}>Let's fix it <IconArrowNarrowRight stroke={2} />
                    </a>
                </div>
            </div>
            </SlideAway>
        </>
    )
}