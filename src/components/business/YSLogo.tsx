// Placeholder YS mark drawn from the mock — swap for the final logo file once it exists.
// The S path doubles as a mask so the S reads as sitting in front of the Y's right arm.
const sPath = "110,13 74,13 67,20 67,34 74,41 99,41 106,48 106,62 99,69 62,69";

export default function YSLogo({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 116 82" fill="none" aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id="ys-logo-s" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(130, 248, 196)" />
                    <stop offset="100%" stopColor="rgb(30, 180, 125)" />
                </linearGradient>
                <mask id="ys-logo-cutout">
                    <rect width="116" height="82" fill="white" />
                    <polyline points={sPath} stroke="black" strokeWidth="22" strokeLinejoin="miter" />
                </mask>
            </defs>
            <polygon
                points="2,6 25,6 40,29 55,6 78,6 50,47 50,76 30,76 30,47"
                fill="rgb(236, 246, 247)"
                mask="url(#ys-logo-cutout)"
            />
            <polyline points={sPath} stroke="url(#ys-logo-s)" strokeWidth="14" strokeLinejoin="miter" />
        </svg>
    );
}
