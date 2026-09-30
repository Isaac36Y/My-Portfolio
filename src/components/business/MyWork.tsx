import type { CSSProperties } from "react";
import SceneLink from "@/components/experience/SceneLink";
import { work } from "@/content/work";
import styles from "./MyWork.module.scss";
import { IconChevronRight } from '@tabler/icons-react';

export default function MyWork() {
    const { titleLead, titleAccent, lede, returnLabel, categories } = work;

    return (
        <section className={styles.myWork} aria-labelledby="my-work-title">
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
                        <h2 className={styles.categoryTitle}>{category.title}</h2>
                        <p className={`${styles.categoryDescription} body`}>{category.description}</p>
                        {/* TODO: image, 1280x800, real screenshot of a project in this category */}
                        <div className={styles.preview} aria-hidden="true" />
                    </li>
                ))}
            </ol>
        </section>
    );
}
