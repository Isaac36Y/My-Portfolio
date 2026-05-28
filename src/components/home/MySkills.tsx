import styles from './MySkills.module.scss'

const skillLists = [
    {
        label: '<frontend>',
        id: 'frontend',
        skills: ['Semantic HTML','Accessibility', 'CSS', 'SCSS', 'Responsive Design', 'JavaScript', 'TypeScript', 'React', 'Next.js',
                'Animations', 'Canvas API', 'AI Integration']
    },
    {
        label: '{ backend }',
        id: 'backend',
        skills: []
    },
    {
        label: 'tools',
        id: 'tools',
        skills: []
    }
]

function Title() {
    return (
        <h2 className={`${ styles.title } primary-text`}>
            Skills and Tools
        </h2>
    )
}

function SkillCards() {
    return (
        <div className={ styles.skillCarousel}>
            { skillLists.map((card, i) => (
                <div className={ styles.skillCard } key={i}>
                    <h3 className={`${ styles.skillType } tech secondary-text`}>{ card.label }</h3>
                    <ul className={`${ styles.skillList } body primary-text`} role='list' id='frontend-skill-list'>
                        { card.skills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </ul>
                </div>
            )) }
        </div>
    )
} 



export default function MySkills() {
    return (
        <section className={ styles.section }>
            <Title />
            <SkillCards />
        </section>
    )
} 