import ParticleBackground from '@/components/ParticleBackground/ParticleBackground'
import Header from '@/components/home/Header';
import MySkills from '@/components/home/MySkills';
import HowIBuild from '@/components/home/HowIBuild';
import styles from './page.module.scss'
import MobileNav from '@/components/home/Nav';
import ProjectCards from '@/components/home/ProjectCards';
import NavPop from '@/components/NavBadge/NavBadge';
import SlideAway from '@/components/SlideAway';

export default function Home() {
  return (
    <div className={ styles.html }>
        <ParticleBackground />
        <NavPop />
        <SlideAway>
            <Header />
        </SlideAway>
        <SlideAway>
            <MobileNav />
        </SlideAway>
        <main className={styles.main}>
            <SlideAway>
                <MySkills />
            </SlideAway>
            <SlideAway>
                <HowIBuild />
            </SlideAway>
            {/* slide away in ProjectCards. wraps cards individually */}
            <ProjectCards />
        </main>
    </div>
  );
}


