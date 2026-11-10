# AGENTS.md

Younger Systems website. Isaac Young's freelance studio in Medford, Oregon: websites,
custom software tools, SEO, and digital marketing for local businesses. This site is the
studio's storefront and replaces isaacyoungs.dev; the old portfolio becomes the work
section. Its job is to make a business owner think "this person is different" and then
contact him.

Read this before writing code. Ask before deviating.

## Stack

| Layer | Choice | Not |
|---|---|---|
| Framework | Next.js, App Router | Pages Router, plain React |
| Language | TypeScript, strict | JS |
| Styles | SCSS Modules + CSS custom properties | Tailwind, styled-components, CSS-in-JS |
| Motion | CSS transitions, Web Animations API, CSS scroll-driven animations | GSAP, Framer Motion, Lenis, any smooth-scroll library |
| Email | Resend | Nodemailer, SendGrid |
| Validation | Zod, shared client and server | ad-hoc checks |
| Host | Vercel. Cloudflare is DNS only, proxy off | Cloudflare Pages |

Do not suggest Tailwind or a motion library. The motion on this site is the product, and
it has to be understood and owned line by line, not configured from someone else's API.
If something truly cannot be done natively, stop and make the case before installing
anything.

No WebGL, no three.js, no canvas backgrounds. The effect is built from layout, transforms,
and restraint.

Server components by default. The scene navigation is the main client island; keep it
small and keep everything inside it that can render on the server rendering on the server.

## Structure

```
src/
  app/            routing files ONLY: page/layout/route/loading + colocated .module.scss
  components/
    ui/           primitives: Button, Field, Stack, Wordmark
    sections/     page sections: ServiceIntro, ProjectGallery, CaseStudyHeader
    experience/   the scene system on the home page: Stage, Scene, SceneNav
  lib/
    motion/       easing, durations, reduced-motion helpers
    email/        resend client and templates
    schema/       zod validators
    jsonld/       structured data builders
  content/        copy as typed TS. There is no CMS and we are not adding one.
    projects/     real screenshots, statically imported for dimensions and blur
    photos/       real photography of Isaac
  styles/         _tokens.scss, _mixins.scss, globals.scss
  site.config.ts  business name, domain, tagline, contact details
public/
  brand/          supplied logo SVGs, favicons
```

Rules:
- Nothing lives in `src/app` except routing files. No helpers, no components.
- `"use client"` only where there is real interactivity, pushed as far down the tree as
  possible.
- `@/*` maps to `src/*`. Use it. No `../../..` imports.
- Services and projects are data in `src/content`. Pages render from that data; nobody
  hand-writes a project card into a page file.

## Styles

- Design values are CSS custom properties in `_tokens.scss`, not SCSS variables. They need
  to survive into the browser.
- SCSS is for nesting, mixins, and loops. Never hardcode a color, spacing value, radius,
  font size, duration, or easing curve that isn't a token.
- Motion is tokenized like everything else: `--duration-travel`, `--ease-travel`,
  `--duration-reveal`. A new timing value means a new token, not a literal.
- Breakpoints go through the `bp()` mixin. No raw media queries.
- `globals.scss` is reset + tokens + `body` and nothing else.
- Component styles are colocated `Component.module.scss`.

## Code style

The goal is code that reads without commentary. A comment is an admission that the code
failed to explain itself, so fix the code first and write the comment only if that fails.

### Naming

- Every function, class, variable, and type gets a name that says what it is. If you need
  a comment to explain what something holds, rename it instead.
- Booleans read as assertions: `isTraveling`, `prefersReducedMotion`, `canNavigate`.
- Functions are verb phrases: `travelToScene`, `sendInquiry`. Handlers say what happens,
  not what was clicked: `openCaseStudy`, not `handleClick`.
- No abbreviations beyond conventional ones (`id`, `url`, `db`, `env`).
- Banned as names: `data`, `info`, `item`, `obj`, `temp`, `result`, `val`, `x`. There is
  always a more specific word available.
- Units belong in the name: `travelDurationMs`, `swipeThresholdPx`, `revalidateSeconds`.

### Comments

Write one only when all three are true: the information is not in the code, it cannot be
moved into a name, and a competent reader would get it wrong without it.

Legitimate:

- **Why**, when the reason is not derivable.
  `// svh, not dvh: dvh changes while mobile toolbars slide and jolts the stage mid-move.`
- **Where**, when the rest of the feature lives somewhere else.
  `// Scene order is defined in components/experience/scenes.ts`
- **Constraints and workarounds**, with a link to the issue when one exists.
- **A rule that cannot be read off the code.** The wheel-silence window that stops a
  trackpad flick from firing three transitions earns a line. The loop that renders four
  service cards does not.

Banned:

- Restating the line. `// set the scene` above `setActiveScene(...)`
- Section banners. `// ---- Helpers ----`
- JSDoc on a function whose signature already says everything.
- Commented-out code. Git has it.
- Change history. `// updated 9/28 to fix jitter`
- `// eslint-disable` with no reason on the same line.

**Reach for a name before reaching for a comment.**

```ts
// bad
// ignore wheel events that come too soon after the last one (trackpad momentum)
if (now - lastWheelAt < 150) return;

// good
const isTrackpadMomentum = now - lastWheelAt < GESTURE_SILENCE_MS;
if (isTrackpadMomentum) return;
```

### Line economy

Write the fewest lines that stay readable. When the two conflict, readable wins every time.

- Early returns over nested conditionals. Guard clauses at the top.
- Destructure at the top of a function, not inline three levels deep.
- Cut ceremony: no single-use wrapper functions, no `const x = y; return x;`, no `else`
  after a `return`.

This is not code golf. The following are shorter and worse:

- Nested or chained ternaries. One level on one line, otherwise use `if`.
- Several statements packed onto one line with `&&` or a comma.
- Clever method chains that need a second read. Three clear lines beat one dense line.
- One-letter parameters. `projects.map(project => ...)`, never `projects.map(p => ...)`.

One idea per line. If a line needs a comment to parse, split the line.

### Types

- No `any`. Use `unknown` and narrow it.
- Derive types from Zod schemas with `z.infer` rather than declaring the shape twice.
- Types live next to what they describe, or in `lib/schema` when shared.

## Things that will break the site

**The business name.** The name is under legal review and may change. The name, domain,
tagline, and contact details live in `site.config.ts` and nowhere else. Never hardcode
"Younger Systems" in a component, metadata block, or piece of copy. A rename has to be a
config change and a logo swap, not a search-and-replace.

**Redirects.** `next.config.ts` holds a 301 map from the old isaacyoungs.dev URLs. Those
URLs have existing search history. Never remove, reorder, or "clean up" that block. Adding
a route means checking whether an old URL should point at it.

**Motion that fights the user.** The home page moves between full-viewport scenes;
everything deeper is a normal scrolling page. On scrolling pages, never hijack scroll:
no smooth-scroll libraries, no scroll snapping that fights the user, no changed scroll
speed, no content that only exists after an animation plays. Animations reveal content;
they never gate it.

**Reduced motion.** Every transition has a `prefers-reduced-motion` path: scene travel
becomes a short crossfade, reveals become instant, parallax is off. Do not ship a motion
feature without it.

**Mint on light backgrounds.** Mint `#50DCA0` on white is 1.74:1. It is never used for
text, icons, or thin lines on a light ground. Use Mint Deep `#308561` there. This is the
easiest brand rule to break by accident because the mockups break it.

**Performance.** Only `transform` and `opacity` animate. No animating `top`, `left`,
`width`, `height`, `filter`, or `box-shadow`. `will-change` only while an animation is
running. A scene transition that drops frames on a mid-range phone is a bug, not a
polish item.

## Commands

```bash
npm run dev          # local dev
npm run build        # production build, must pass before any PR
npm run lint
npm run typecheck    # tsc --noEmit
```

Run `typecheck` and `build` before saying work is done. A passing dev server is not
evidence the build works. For any motion change, also say which devices and browsers it
was checked on.

## Git

- Branch off `main`: `feat/`, `fix/`, `chore/`
- Small commits, imperative subject lines, no "wip"
- `main` deploys to production. Nothing lands on it unbuilt.

## Secrets and client data

Never commit: API keys, the Resend key, or anything a client told Isaac about their
business that isn't already public. `.env.local` only, mirrored into Vercel.

Contact form submissions go to email and nowhere else. Never put the body of an inquiry
into a log, an error message, or a URL parameter.

## Design direction

The taste skill in `.claude/skills/design-taste-frontend/` drives design. Use its
judgment. The notes below are the brief, not a rulebook.

**Dials:** `DESIGN_VARIANCE: 8` · `MOTION_INTENSITY: 8` · `VISUAL_DENSITY: 3`

**The brief:** The site is an adventure, not a brochure. The home page is a set of
full-viewport scenes the visitor travels between, and the movement always goes in the
direction of the destination, so it feels like moving through one continuous place rather
than loading pages. Deeper pages (services, galleries, about, why) scroll normally with
motion that rewards scrolling. Isaac will walk through the exact interaction; build to
his description, not to assumptions.

The feeling is minimal, cinematic, deliberate, confident. Confidence comes from empty
space. When a layout feels unfinished, the answer is almost never "add something." One idea
per scene, one idea per section. If a screen needs a paragraph, three cards, and a photo
to make its point, it is making too many points.

The site is also the portfolio piece. A business owner deciding whether Isaac can build
their custom tool is judging the craft of this site while they read it. Motion that
stutters or a layout that breaks at 1280 x 650 costs a client.

**Palette:**

| Name | Hex | Use |
|---|---|---|
| Navy | `#00002A` | Ground |
| Mint | `#50DCA0` | Accent, on navy only |
| Ice | `#DFF6F7` | Type on navy |
| Mint Deep | `#308561` | Mint on light grounds |

**Type:** Space Grotesk 600–700 for display, tracked tight (−2% to −3.5%). IBM Plex Sans
400–500 for body. IBM Plex Mono for labels, figures, and technical tags. Self-host through
`next/font`. The brand kit file lists Archivo as the display face; that is wrong.

**Logo:** the supplied SVGs in `public/brand/`, never redrawn, recolored, or rebuilt in CSS.
Clear space is one Y-stem width. Minimum 24px for the mark, 64px for the lockup.

**Photography and imagery:** real photos of Isaac and real screenshots of real projects.
Never stock, never AI-generated, never a device-mockup template with fake UI. If the image
does not exist yet, ship a neutral block with `<!-- TODO: image, WxH, subject -->` and
say so.

### Accessibility floors

Not aspirational. Failing one is shipping broken work, and these outrank any aesthetic
guidance in the skill.

- Body 16px minimum, line height 1.5 or better.
- Body copy 4.5:1 contrast, large text 3:1. That includes muted text on navy.
- Tap targets 44px minimum.
- Visible 2px focus ring on every interactive element.
- Everything reachable by scroll or swipe is also reachable by keyboard and by a visible
  control.
- Off-screen scenes are `inert`. After a scene or route change, focus moves to the new
  heading and the change is announced.
- Label above input, error below input. Never placeholder-as-label.

## Copy rules

These are a fence, not a script. They tell you what you cannot say and which facts are
true. Inside the fence, write copy that speaks to a business owner who is not technical.

### Voice

- **First person singular.** "I build," never "we build." This is one person, and that is
  a selling point, not something to hide behind an agency voice.
- **Plain language.** The reader runs a plumbing company or a care home, not a startup.
  Every technical term either earns its place with a concrete payoff or gets replaced.
  "Your booking form sends straight to your phone" beats "integrated lead capture."
- **Specifics over adjectives.** Name the problem, name what was built, name what changed.

### Restricted words and phrases

- No "elevate," "seamless," "cutting-edge," "next-level," "leverage," "robust,"
  "empower," "unlock."
- No "not just X, it's Y." No "a brighter future." No "solutions" standing alone.
- Services use their fixed names: **Websites**, **Custom Tools**, **SEO**,
  **Digital Marketing**. Not "web solutions."

### Facts and claims

- **Based in Medford, Oregon, working with Southern Oregon businesses.** Never
  "worldwide," "global," or "clients across the country."
- **No invented results.** No traffic numbers, percentages, hours saved, or ranking claims
  unless Isaac supplies the number and its source. A fake metric on a portfolio is worse
  than no metric.
- **No client names, logos, or project screenshots without the client's permission.**
  Concept work (unsolicited redesigns) is labeled as a concept, every time.
- **No prices** unless Isaac supplies them.
- **Response-time promises** ("replies within 24 hours") only if Isaac confirms he will
  keep them.
- **Custom, not templated.** The positioning against cheap and templated sites is the
  core of the pitch. Custom Tools get at least equal weight to Websites; tool projects
  are the work Isaac most wants.

### Repetition

- Every claim appears once per page, in the place it lands hardest.
- No sentence or distinctive phrase is reused verbatim anywhere on the site. Same truth,
  different sentence.
- The primary CTA is the only exception.
- If two sections could swap headings without anything breaking, merge them or cut one.

Copy converts, so write it to convert. Every scene and every section should give the
reader something they did not have before they got there.