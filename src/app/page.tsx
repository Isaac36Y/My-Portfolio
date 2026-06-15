import ParticleBackground from "@/components/ParticleBackground/ParticleBackground";
import Header from "@/components/home/Header";
import MySkills from "@/components/home/MySkills";
import HowIBuild from "@/components/home/HowIBuild";
import styles from "./page.module.scss";
import MobileNav from "@/components/home/Nav";
import ProjectCards from "@/components/home/ProjectCards";
import NavPop from "@/components/NavLogic/NavBadge";
import { SlideAway, NavBarWrapper } from "@/components/NavLogic/SlideAway";
import { TransitionProvider } from "@/components/NavLogic/Provider";

export default function Home() {
  return (
    <TransitionProvider >
        <div className={styles.html}>
            <ParticleBackground />
            <NavPop />
            <SlideAway>
                <Header />
            </SlideAway>
            <NavBarWrapper>
                <MobileNav />
            </NavBarWrapper>
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
    </TransitionProvider>
  );
}
