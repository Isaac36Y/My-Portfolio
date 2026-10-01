import Image from "next/image";
import styles from "./LogoBackdrop.module.scss";

type LogoBackdropProps = {
    src: string;
    width: number;
    height: number;
};

// Scenes that route travel hands the logo between must draw it through this one frame, or the two
// versions stop lining up at the seam.
export default function LogoBackdrop({ src, width, height }: LogoBackdropProps) {
    return (
        <div className={styles.window} data-travel-layer="window" aria-hidden="true">
            <Image
                src={src}
                alt=""
                width={width}
                height={height}
                sizes="120vw"
                loading="eager"
                className={styles.logo}
            />
        </div>
    );
}
