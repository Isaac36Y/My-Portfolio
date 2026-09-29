import Hero from "@/components/business/Hero";
import Introduction from "@/components/business/Introduction";
import Stage from "@/components/experience/Stage";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <main className={styles.main}>
            <Stage sceneContent={{ hero: <Hero />, introduction: <Introduction /> }} />
        </main>
    );
}
