// The home intro runs in phases written to <html data-intro>, so CSS anywhere on the page can stage itself:
// "hold" (curtain up, logo idling) → "reveal" (logo lands, lines, copy and nav arrive in turn) → "landed"
// (logo handed to the hero mark while the last pieces finish) → "done".
//
// "done" stays for the rest of the visit rather than the attribute being removed: removing it would hand the
// hero back to its usual entrance animation, which would play the brand's rise a second time.
// No attribute at all means the intro never played.
export type IntroPhase = "hold" | "reveal" | "landed" | "done";

export const INTRO_END_EVENT = "ys:introend";

const SESSION_KEY = "ys-intro-played";
const FAILSAFE_MS = 5000;

// Runs inline in <head> before first paint, so the curtain is in place before any content shows and a
// visitor who never runs JavaScript never sees it. Only a fresh load of "/" plays it, once per tab session.
// If the page never hydrates, the failsafe drops the curtain and the hero falls back to its usual entrance.
export const introScript = `(function(){try{var d=document.documentElement;if(location.pathname!=="/"||sessionStorage.getItem("${SESSION_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)return;sessionStorage.setItem("${SESSION_KEY}","1");d.dataset.intro="hold";setTimeout(function(){if(d.dataset.intro==="hold")delete d.dataset.intro},${FAILSAFE_MS})}catch(e){}})()`;

export function introPhase(): IntroPhase | undefined {
    return document.documentElement.dataset.intro as IntroPhase | undefined;
}

function isIntroPlaying(): boolean {
    const phase = introPhase();
    return phase !== undefined && phase !== "done";
}

export function setIntroPhase(phase: Exclude<IntroPhase, "done">) {
    document.documentElement.dataset.intro = phase;
}

export function finishIntro() {
    document.documentElement.dataset.intro = "done";
    window.dispatchEvent(new Event(INTRO_END_EVENT));
}

// Resolves right away when no intro is playing, so callers can always await it.
export function afterIntro(): Promise<void> {
    if (!isIntroPlaying()) return Promise.resolve();
    return new Promise((resolve) => window.addEventListener(INTRO_END_EVENT, () => resolve(), { once: true }));
}
