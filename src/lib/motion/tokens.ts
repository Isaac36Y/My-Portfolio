export function readToken(element: Element, tokenName: string): string {
    return getComputedStyle(element).getPropertyValue(tokenName).trim();
}

export function readDurationMs(element: Element, tokenName: string): number {
    const tokenValue = readToken(element, tokenName);
    const amount = Number.parseFloat(tokenValue);
    return tokenValue.endsWith("ms") ? amount : amount * 1000;
}

export function prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
