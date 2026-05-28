import styles from './MySkills.module.scss'

function Title() {
    return (
        <h2 className={`${ styles.title } primary-text`}>
            My Skills
        </h2>
    )
}

function SkillCard() {
    return (
        <div className={ styles.skillCard }>
            <h3 className={`${ styles.skillType } tech secondary-text`}>frontend</h3>
            <ul className={`${ styles.skillList } body accent-text`} role='list'>
                <li>JavaScript</li>
                <li>Semantic HTML</li>
                <li>CSS</li>
                <li>SCSS</li>
            </ul>
        </div>
    )
} 



export default function MySkills() {
    return (
        <section className={ styles.section }>
            <Title />
            <SkillCard />
        </section>
    )
} 