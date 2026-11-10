import Image from "next/image";
import { logoBackdropSizes } from "@/lib/media/sharedImages";
import styles from "./LogoBackdrop.module.scss";

type LogoBackdropProps = {
    src: string;
    width: number;
    height: number;
    staysInView?: boolean;
    fadesBeforeFold?: boolean;
};

// Scenes that route travel hands the logo between must draw it through this one frame, or the two
// versions stop lining up at the seam.
export default function LogoBackdrop({
    src,
    width,
    height,
    staysInView = false,
    fadesBeforeFold = false,
}: LogoBackdropProps) {
    const windowClassName = staysInView ? `${styles.window} ${styles.staysInView}` : styles.window;
    const logoClassName = fadesBeforeFold ? `${styles.logo} ${styles.fadesBeforeFold}` : styles.logo;

    return (
        <div className={windowClassName} data-travel-layer="window" aria-hidden="true">
            <Image
                src={src}
                alt=""
                width={width}
                height={height}
                sizes={logoBackdropSizes}
                loading="eager"
                className={logoClassName}
            />
        </div>
    );
}
