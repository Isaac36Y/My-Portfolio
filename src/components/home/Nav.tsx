import styles from './Nav.module.scss'
import Link from 'next/link'

function NavButton({ link, description }: { link: string, description: string }) {
    return (
        <Link href={link} className={`${styles.navBtn} body`}>
            {description}
        </Link>
    )
}

export default function MobileNav() {
    return (
        <nav className={styles.Nav}>
            <NavButton link="#myWork" description='My Work' />
            <NavButton link="/blog" description='My Blog' />
            <NavButton link="/personal" description='My Life' />
        </nav>
    )
}