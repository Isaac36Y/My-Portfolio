import styles from "./Header.module.scss";
import { DevBadge } from "./Badge";
import { NavBarWrapper, SlideAway } from "../../NavLogic/SlideAway";
import { Nav } from "../Nav";


function Hero() {
    return (
        <div className={styles.hero}>
            <h1 className={`${styles.heroName} primary-text`}>
                Isaac <span className={`${styles.lastName} accent-text`}>Young.</span>
            </h1>
            {/* <p className={`${styles.description} tech secondary-text`}>// software engineer & creative dev</p> */}
        </div>
    );
}

export default function Header() {
    return (
        <header className={styles.header} id="header">
            <SlideAway>
                <Hero />
            </SlideAway>
            <SlideAway>
                <DevBadge />
            </SlideAway>
            <NavBarWrapper>
                <Nav screen="mobile" />
            </NavBarWrapper>
        </header>
    );
}
