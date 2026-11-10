"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/site.config";
import styles from "./PortalLogin.module.scss";

const passwordHelpHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Portal password help")}`;

export default function LoginForm() {
    const [notice, setNotice] = useState<string | null>(null);
    const loginUrl = siteConfig.portalLoginUrl;

    // Until the portal's sign-in is wired up, nothing is sent anywhere: credentials stay in the browser.
    function holdUntilPortalIsLive(event: FormEvent<HTMLFormElement>) {
        if (loginUrl) return;
        event.preventDefault();
        setNotice(`Portal sign-in isn't switched on yet. Email ${siteConfig.email} and I'll get you in.`);
    }

    return (
        <form className={styles.form} action={loginUrl} method="post" onSubmit={holdUntilPortalIsLive}>
            <div className={styles.field}>
                <label htmlFor="login-email" className={styles.label}>
                    Email
                </label>
                <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.field}>
                <div className={styles.labelRow}>
                    <label htmlFor="login-password" className={styles.label}>
                        Password
                    </label>
                    <a href={passwordHelpHref} className={styles.quietLink}>
                        Forgot password?
                    </a>
                </div>
                <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={styles.input}
                />
            </div>

            <button type="submit" className={styles.submit}>
                Log in
            </button>

            <p className={styles.notice} role="status">
                {notice}
            </p>
        </form>
    );
}
