import Link from "next/link";
import styles from "./ComingSoon.module.scss";

type ComingSoonProps = {
    title: string;
    message?: string;
    code?: string;
};

export default function ComingSoon({ title, message, code }: ComingSoonProps) {
    return (
        <main className={styles.wrap}>
            <div className={styles.card}>
                {code && <span className={styles.code}>{code}</span>}
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.message}>
                    {message ?? "This page is a work in progress — check back soon."}
                </p>
                <Link href="/" className={styles.homeBtn}>
                    Back home
                </Link>
            </div>
        </main>
    );
}
