import type { Metadata } from "next";
import ParticleBackground from "@/components/ParticleBackground/ParticleBackground";
import Header from "@/components/portfolio/Header/Header";
import MySkills from "@/components/portfolio/MySkills";
import HowIBuild from "@/components/portfolio/HowIBuild";
import styles from "./page.module.scss";
import ProjectCards from "@/components/portfolio/ProjectCards";
import NavPop from "@/components/NavLogic/NavBadge";
import TestimonialRunner from "@/components/portfolio/Testimonial";
import Footer from "@/components/portfolio/Footer";
import { SlideAway } from "@/components/NavLogic/SlideAway";
import { TransitionProvider } from "@/components/NavLogic/Provider";
import QuincyChat from "@/components/NavLogic/QuincyChat";
import { DesktopNav } from "@/components/portfolio/Nav";
import { SQLQuery } from "@/components/portfolio/Header/SqlQuery";

const description =
    "Websites, custom tools, and SEO work built by Isaac Young, the developer behind Younger Systems in Medford, Oregon.";

// Overrides the root canonical ("/") so this page isn't reported as a duplicate of the business homepage.
export const metadata: Metadata = {
    title: "Portfolio",
    description,
    alternates: { canonical: "/portfolio" },
    openGraph: {
        type: "website",
        url: "/portfolio",
        siteName: "Younger Systems",
        title: "Portfolio | Younger Systems",
        description,
        locale: "en_US",
    },
};

export default function Portfolio() {
    return (
        <TransitionProvider>
            <div className={styles.html}>
                <ParticleBackground />
                <NavPop />
                <QuincyChat />
                <DesktopNav />
                <SQLQuery />
                <Header />
                <main className={styles.main}>
                    <SlideAway className="skills">
                        <MySkills />
                    </SlideAway>
                    <SlideAway>
                        <HowIBuild />
                    </SlideAway>
                    {/* slide away in ProjectCards. wraps cards individually */}
                    <ProjectCards />
                    <TestimonialRunner />
                </main>
                <footer className={styles.footerContainer}>
                    <SlideAway>
                        <Footer />
                    </SlideAway>
                </footer>
            </div>
        </TransitionProvider>
    );
}
