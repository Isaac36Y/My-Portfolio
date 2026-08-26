import styles from "./Header.module.scss";
import { DevBadge } from "./Badge";
import { NavBarWrapper, SlideAway } from "../../NavLogic/SlideAway";
import { Nav } from "../Nav";
import { HeaderShell } from "./HeaderShell";


function Hero() {
    return (
        <div className={styles.hero}>
            <h1 className={`${styles.heroName} primary-text`}>
                Isaac <span className={`${styles.lastName} accent-text`}>Young.</span>
            </h1>
            <p className={`${styles.description} body secondary-text`}>
                I'm a self-taught full-stack developer based in Medford, Oregon. I dig past the initial ask to make sure a client gets what they need, not just what they think they want, then build software around them. <br/>
                My focus is practical software that solves real operational problems and drives growth, productivity, and organization for your company. <br/>
                If you've got a problem that off-the-shelf tools don't solve, let's talk.
            </p>
        </div>
    );
}

export default function Header() {
    return (
        <HeaderShell>
            <SlideAway>
                <Hero />
            </SlideAway>
            <SlideAway>
                <DevBadge />
            </SlideAway>
            <NavBarWrapper>
                <Nav screen="mobile" />
            </NavBarWrapper>
        </HeaderShell>
    );
}
