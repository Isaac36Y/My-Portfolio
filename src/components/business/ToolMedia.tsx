import Image from "next/image";
import type { ToolMedia as ToolMediaContent } from "@/content/tools";
import styles from "./ToolMedia.module.scss";

type ToolMediaProps = {
    media: ToolMediaContent;
    phoneSizes: string;
    isPriority?: boolean;
};

export default function ToolMedia({ media, phoneSizes, isPriority = false }: ToolMediaProps) {
    if (media.kind === "video") {
        return (
            <div className={styles.well}>
                <video
                    className={styles.video}
                    src={media.src}
                    width={media.width}
                    height={media.height}
                    aria-label={media.label}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                />
            </div>
        );
    }

    return (
        <div className={`${styles.well} ${styles.phones}`}>
            {media.screens.map((screen) => (
                <Image
                    key={screen.src}
                    src={screen.src}
                    alt={screen.alt}
                    width={screen.width}
                    height={screen.height}
                    sizes={phoneSizes}
                    priority={isPriority}
                    className={styles.phone}
                />
            ))}
        </div>
    );
}
