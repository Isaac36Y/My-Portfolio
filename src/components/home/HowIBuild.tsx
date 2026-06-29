import styles from './HowIBuild.module.scss'

// make a drop down that leads into my projects. like a "heres my claim, now ill back it up"

export default function HowIBuild() {
    return (
        <section className={ styles.section}>
            <h2 className={`${styles.title} primary-text`}>How I Build</h2>
            <p className={`${styles.par} body secondary-text`}>
                I build with the intention to learn and push my boundaries with original features and readable code. 
                I leverage AI tools to test my thinking, to truly understand the concepts I practice, and to push ideas to the next level. 
                The outcome is intentional software. I understand everything I ship.
            </p>
        </section>
    )
}