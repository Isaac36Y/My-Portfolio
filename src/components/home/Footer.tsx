import styles from './Footer.module.scss'
import { IconBrandGithub, IconMail, IconBrandLinkedin } from '@tabler/icons-react';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <p className={`${styles.comment} tech secondary-text`}>or just say hi</p>
            <p className={'secondary-text'}>•</p>
            <nav className={styles.footerNav} aria-label='Footer Navigation'>
                <a className={styles.footerLink} href="https://github.com/Isaac36Y"><IconBrandGithub /></a>
                <a className={styles.footerLink} href="https://www.linkedin.com/in/isaac-young-7a12123b1/"><IconBrandLinkedin /></a>
                <a className={styles.footerLink} href="mailto:isaac@isaacyoungs.dev?subject=Let%27s%20build%20something"><IconMail /></a>
            </nav>
        </div>
    )
}