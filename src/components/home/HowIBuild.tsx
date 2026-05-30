import styles from './HowIBuild.module.scss'

function Title() {
    return (
        <h2 className={`${styles.title} primary-text`}>
            How I Build
        </h2>
    )
}

function Paragraph() {
    return (
        <p className={`${styles.par} body primary-text`}>
            I build with the intention to learn and push my boundaries with original features and readable code. I leverage AI tools to test my thinking, to truly understand the concepts I practice, and to push ideas to the next level. The outcome is intentional software. I understand everything I ship
        </p>
    )
}

export default function HowIBuild() {
    return (
        <section className={ styles.section}>
            <Title />
            <Paragraph />
        </section>
    )
}