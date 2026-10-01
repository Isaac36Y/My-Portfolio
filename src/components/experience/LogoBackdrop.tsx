import Image from "next/image";
import type { RouteTravelDirection } from "@/lib/motion/routeTravel";
import styles from "./LogoBackdrop.module.scss";

type LogoBackdropProps = {
    src: string;
    width: number;
    height: number;
    travelLeavesOn: RouteTravelDirection | RouteTravelDirection[];
};

// Scenes that route travel hands the logo between must draw it through this one frame, or the two
// versions stop lining up at the seam. The browser cannot tell a travel layer whether it is leaving or
// arriving, so travelLeavesOn lists every direction the scene can be left in.
export default function LogoBackdrop({ src, width, height, travelLeavesOn }: LogoBackdropProps) {
    const leavingDirections = [travelLeavesOn].flat();

    return (
        <div
            className={styles.window}
            data-travel-layer="window"
            data-travel-leaves-on={leavingDirections.join(" ")}
            aria-hidden="true"
        >
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
