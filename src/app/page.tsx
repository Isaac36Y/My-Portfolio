import Hero from "@/components/business/Hero";
import Introduction from "@/components/business/Introduction";
import HomeIntro from "@/components/experience/HomeIntro";
import RouteScene from "@/components/experience/RouteScene";
import Stage from "@/components/experience/Stage";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <>
            <RouteScene>
                <main className={styles.main}>
                    <Stage sceneContent={{ hero: <Hero />, introduction: <Introduction /> }} />
                </main>
            </RouteScene>
            <HomeIntro />
        </>
    );
}
