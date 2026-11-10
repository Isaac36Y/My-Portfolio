## Overview 
This is the claude md file dedicated to specific patterns, styles, decisions, and directions for this project. It is your job to update this file with my permision to improve how other agents run in this code base over time. If you feels something belongs in a CLAUDE.md, add it here, then tell me.

## View transitions and Mobile Safari

- **No `filter: blur()` (or other filters) on anything inside a page that route travel snapshots.** WebKit re-renders every filtered element into each view transition snapshot, and a few blurred patches froze transitions for over a second on phones. Feather with `mask-image` instead (see the `clear-backdrop-behind` mixin in `src/styles/mixins.scss`).
- **Test every transition change in WebKit, not just Chromium.** Chromium has handled every case that broke on iPhones. Use headless mobile WebKit (Playwright, iPhone profile) at the least, and a real iPhone before merging.
- **Don't rely on `backface-visibility: hidden` alone.** Safari ignores it in view transition snapshots and sometimes at rest. Hide the turned-away face with `visibility` as well (see `FlipCard.module.scss`).
- **On phones, keep route travel to one snapshot per page.** Lifting layers out with `data-travel-layer` is desktop-only. The only named element on phones is the carried portrait.
- **Headings that receive programmatic focus (`tabIndex={-1}`) need `&:focus { outline: none; }`.** Safari draws a focus ring after a tap where Chromium doesn't.