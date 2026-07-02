import ParticleBackground from "@/components/ParticleBackground/ParticleBackground";
import Header from "@/components/home/Header";
import MySkills from "@/components/home/MySkills";
import HowIBuild from "@/components/home/HowIBuild";
import styles from "./page.module.scss";
import ProjectCards from "@/components/home/ProjectCards";
import NavPop from "@/components/NavLogic/NavBadge";
import TestimonialRunner from "@/components/home/Testimonial";
import Footer from "@/components/home/Footer";
import { SlideAway } from "@/components/NavLogic/SlideAway";
import { TransitionProvider } from "@/components/NavLogic/Provider";
import QuincyChat from "@/components/NavLogic/QuincyChat";
import { DesktopNav } from "@/components/home/Nav";

export default function Home() {
  return (
    <TransitionProvider >
        <div className={styles.html}>
            <ParticleBackground />
            <NavPop />
            <QuincyChat />
            <DesktopNav />
            <Header />
            <main className={styles.main}>
                <SlideAway>
                    <MySkills />
                </SlideAway>
                <SlideAway>
                    <HowIBuild />
                </SlideAway>
                {/* slide away in ProjectCards. wraps cards individually */}
                <ProjectCards />
                <TestimonialRunner />
            </main>
            <footer>
                <SlideAway>
                    <Footer />
                </SlideAway>
            </footer>
        </div>
    </TransitionProvider>
  );
}
