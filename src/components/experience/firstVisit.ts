// Pages that play their entrance only on the first visit of a tab session. A page opts in by rendering
// <FirstVisitOnly />; a repeat visit sets <html data-revisit>, which the page's styles use to skip the entrance.
const SEEN_KEY = "ys-seen-routes";

// Runs inline in <head> before first paint, so reloading a page already seen this session never shows its
// entrance start and then stop. Only paths that rendered FirstVisitOnly are ever stored, so others are untouched.
export const revisitScript = `(function(){try{var s=JSON.parse(sessionStorage.getItem("${SEEN_KEY}")||"[]");if(s.indexOf(location.pathname)>-1)document.documentElement.dataset.revisit=""}catch(e){}})()`;

function readSeen(): string[] {
    try {
        const seen: unknown = JSON.parse(sessionStorage.getItem(SEEN_KEY) ?? "[]");
        return Array.isArray(seen) ? seen : [];
    } catch {
        return [];
    }
}

// Records the visit and reports whether it is a repeat. Storage can be unavailable (private modes, blocked
// site data), in which case every visit counts as the first and the entrance simply plays.
export function recordVisit(pathname: string): boolean {
    const seen = readSeen();
    if (seen.includes(pathname)) return true;

    try {
        sessionStorage.setItem(SEEN_KEY, JSON.stringify([...seen, pathname]));
    } catch {}
    return false;
}
