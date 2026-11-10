import { scenes, type Ground, type Scene, type SceneId } from "./scenes";
import styles from "./SceneNav.module.scss";

type SceneNavProps = {
    activeSceneId: SceneId;
    ground: Ground;
    onTravel: (destination: Scene) => void;
};

export default function SceneNav({ activeSceneId, ground, onTravel }: SceneNavProps) {
    return (
        <nav className={styles.sceneNav} data-ground={ground} aria-label="Scenes">
            <ol role="list" className={styles.sceneList}>
                {scenes.map((scene) => (
                    <li key={scene.id}>
                        <button
                            type="button"
                            className={styles.sceneButton}
                            aria-current={scene.id === activeSceneId ? "true" : undefined}
                            onClick={() => onTravel(scene)}
                        >
                            <span className={styles.sceneLabel}>{scene.label}</span>
                            <span className={styles.sceneTick} aria-hidden="true" />
                        </button>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
