import ParticleBackground from '@/components/ParticleBackground/ParticleBackground'
import Header from '@/components/home/Header';
import MySkills from '@/components/home/MySkills';
import HowIBuild from '@/components/home/HowIBuild';
import styles from './page.module.scss'
import MobileNav from '@/components/home/Nav';
import ProjectCards from '@/components/home/ProjectCards';

export default function Home() {
  return (
    <div className={ styles.html }>
        <ParticleBackground />
        <Header />
        <MobileNav />
        <main className={styles.main}>
            <MySkills />
            <HowIBuild />
            <ProjectCards />
        </main>
    </div>
  );
}


