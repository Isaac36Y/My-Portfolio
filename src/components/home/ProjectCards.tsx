import styles from './ProjectCards.module.scss'

function HomebaseCard() {
    return (
        <div className={ styles.projectCard }>
            <div className={ styles.header }> 
                <p className={`${ styles.type } tech secondary-text`}>// SaaS &bull; Full-Stack</p>
                <h2 className='primary-text'>HomeBase</h2>
            </div>
            <p className={`${ styles.description } body primary-text`}>A real estate platform where agents log property data on-site, offline, and without losing a single input. Back at the desk, every detail is reviewable and buyer relationships are managed in one place.</p>
            <ul className={`${ styles.tags } tech primary-text`} role='list'>
                <li>Node</li>
                <li>Supabase</li>
                <li>PWA</li>
                <li>Claude API</li>
            </ul>
            <hr />
            <div className={`${ styles.buttons } `}>
                <a type="button" className={`${ styles.button } ${ styles.caseStudy } tech secondary-text`}>Case Study</a>
                <a type="button" className={`${ styles.button } ${ styles.demo } tech`}>Demo</a>
            </div>
        </div>
    )
}

export default function ProjectCards() {
    return (
        <section className={ styles.cardsSection }>
            <HomebaseCard />
        </section>
    )
    
}