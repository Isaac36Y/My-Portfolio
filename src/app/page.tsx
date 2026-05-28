import ParticleBackground from '@/components/ParticleBackground/ParticleBackground'
import Header from '@/components/home/Header';
import MySkills from '@/components/home/MySkills';
import styles from './page.module.scss'

export default function Home() {
  return (
    <div>
        <ParticleBackground />
        <Header />
        <main className={styles.main}>
            <MySkills />
        </main>
    </div>
  );
}


