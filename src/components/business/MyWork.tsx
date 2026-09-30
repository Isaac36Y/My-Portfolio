import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoBackdrop from "@/components/experience/LogoBackdrop";
import SceneLink from "@/components/experience/SceneLink";
import { work, type WorkPreview } from "@/content/work";
import styles from "./MyWork.module.scss";
import { IconArrowRight, IconChevronRight } from '@tabler/icons-react';

const previewSizes: Record<WorkPreview["device"], string> = {
    laptop: "(min-width: 1252px) 30vw, 100vw",
    phone: "(min-width: 1252px) 12vw, 40vw",
    panel: "(min-width: 1252px) 30vw, 100vw",
};

export default function MyWork() {
    const { titleLead, titleAccent, lede, returnLabel, categories } = work;

    return (
        <section className={styles.myWork} aria-labelledby="my-work-title" data-travel-layer="foreground">
            <LogoBackdrop src="/images/mark-outline-icemint-2-2048.png" width={2048} height={1387} travelLeavesOn="right" />

            <SceneLink sceneId="introduction" direction="right" className={styles.returnLink}>
                <span className={`${styles.returnLabel} tech`}>{returnLabel}</span>
                <IconChevronRight stroke={2} className={styles.returnArrow} aria-hidden="true" />
            </SceneLink>

            <header className={styles.header}>

                <h1 id="my-work-title" tabIndex={-1} className={styles.title}>
                    {titleLead} <span className={styles.titleAccent}>{titleAccent}</span>
                </h1>
                <p className={`${styles.lede} body`}>{lede}</p>
            </header>

            <ol role="list" className={styles.categories}>
                {categories.map((category, order) => (
                    <li
                        key={category.id}
                        className={styles.category}
                        style={{ "--category-order": order } as CSSProperties}
                    >
                        <span className={`${styles.categoryNumber} tech`} aria-hidden="true">
                            {String(order + 1).padStart(2, "0")}
                        </span>
                        <h2 className={styles.categoryTitle}>
                            <Link href={category.href} className={styles.categoryLink}>
                                {category.title}
                            </Link>
                        </h2>
                        <p className={`${styles.categoryDescription} body`}>{category.description}</p>
                        <span className={styles.categoryArrow} aria-hidden="true">
                            <IconArrowRight stroke={2} />
                        </span>
                        {category.previews && (
                            <div className={styles.preview}>
                                {category.previews.map((preview) => (
                                    <Image
                                        key={preview.src}
                                        src={preview.src}
                                        alt={preview.alt}
                                        width={preview.width}
                                        height={preview.height}
                                        sizes={previewSizes[preview.device]}
                                        className={`${styles.previewImage} ${styles[preview.device]}`}
                                    />
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </section>
    );
}
