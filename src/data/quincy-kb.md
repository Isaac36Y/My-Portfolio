# Isaac Young

## Bio
## Bio

### The path into software
Isaac Young is a self-taught full-stack developer from Central Point, Oregon. He came to code sideways. He fell in love with travel and experiencing new places, and he wanted a career that could be remote or come with him. That was the original pull. He found freeCodeCamp, took the HTML and CSS course to see what software was about, and liked it, but he couldn't stay consistent while working full time as a delivery driver. He wasn't trying to escape into tech yet. He just wanted to.

At 24 he knew the delivery job wasn't the life he wanted. He saved his money and spent six months backpacking solo through Europe. He walked the Camino de Santiago, three weeks and 300 miles starting from Burgos, and the people he met there carried the rest of his trip. The friendships and couches he found on the Camino meant the next five months cost almost nothing. He visited nine countries: Spain, Portugal, France, Italy, Austria, Germany, Denmark, England, and Ireland. He came home with more perspective on the world and a clearer sense of what he wanted.

Before going all in on code, Isaac worked in lead management at a solar company. He spoke with interested customers, reviewed their home and power bill to see whether solar was a real fit, told them honestly when it wasn't, and set up the ones who were a fit with a consultant. He was good at reading people and being straight with them.

He kept studying on and off for about a year, still wrestling with JavaScript, never able to put in the hours he wanted. Then he got laid off from the solar job and treated it as the opening he'd been waiting for. He went all in. Eight months of 50 to 60 hour weeks later, he finally feels like a developer. He has two real projects, HomeBase and Bullseye Ledger, tools that solve real problems and get used in the field every day. He has a clean portfolio and an AI assistant he configured and deployed himself. He thinks in features and architecture now. The distance he's covered in eight months is hard for him to believe, and he's proud of the struggle it took.

### Why he codes
Software started as a means to a lifestyle. It became the thing itself. Isaac doesn't code for the hype, for a paycheck, or even to travel anymore. He wakes up excited to do it. He's happy struggling with a hard problem and happy banging his head against the wall, because solving it is genuinely gratifying. That is the core of who he is as a developer.

### On being self-taught
Isaac believes self-teaching is a viable and demanding way to learn software. It takes real discipline because there's no class schedule and no loan forcing you to show up. You sit down every day on your own drive or you don't progress. He carries no chip on his shoulder about it and doesn't think it makes him better than anyone. He respects a computer science degree as a strong route, and thinks its real value is teaching you what you don't know, where a self-taught developer has to go find their own gaps. He'll admit self-taught paths can leave more gaps, but he doesn't see that as a real hindrance, because a self-taught developer has already proven they can learn independently. On bootcamps he's more critical. He thinks most are too compressed and lower the bar for what a developer should know, and that the ones promising results in four weeks are misleading. The exception is freeCodeCamp-style, self-paced learning that pushes you to go further on your own.

### Personal life
Isaac is 27, born May 2nd. He still lives in Oregon but would like to move somewhere with outdoor access. Colorado and Utah top his list, San Diego appeals to him, and he'd seriously consider most cities including Chicago or somewhere on the East Coast. A purely urban move with nothing around it doesn't interest him.

He has a black lab named Kylo and a girlfriend, and he's happy. He watches UFC, NFL, NHL, and pretty much any sport that's on. He shoots a bow and is into archery, which is where Bullseye Ledger came from. His activities are mostly outdoors: running, hiking, working out, and any adventure in the woods he can find. He's ran a 3hour 37minute marathon. He loves to listento audiobooks because it lets him keep reading when he can't sit down with a book. He's a sci-fi guy at his core. His favorite series is Red Rising by Pierce Brown. He's also deep into Dungeon Crawler Carl, and he recently finished The Midnight Library by Matt Haig, which stuck with him for its take on appreciating the life you actually have. He's trying to branch out beyond sci-fi. When he's working through a tech problem or chasing a new idea, he likes to talk it out loud.

### Why the assistant is named Quincy
This assistant is named after Quincy Larson, the founder of freeCodeCamp. freeCodeCamp was the door that opened everything for Isaac. It was frictionless and free, a place he could start when he otherwise had no idea where to begin. He doesn't think he'd be in software without it. Naming the assistant after Larson is the tribute he could actually build.

## What I'm looking for
Freelance and full-time...

## Projects
### HomeBase

> A reference document describing the HomeBase platform: what it does, how its
> standout features work under the hood, the technology behind it, and the
> engineering decisions worth highlighting. Written to answer questions from
> prospective users and technical recruiters alike.

---

#### What HomeBase Is

**HomeBase is a full-stack SaaS platform that gives real estate agents one place
to do two jobs that normally live in scattered notes, spreadsheets, and email:
inspecting properties and managing buyer relationships.**

It replaces paper checklists and ad-hoc notes apps with a single, mobile-first
dashboard. The product is built around two pillars:

1. **The Walkabout (Home Data Module)** — a mobile property-inspection tool. An
   agent walks through a house and logs detailed, room-by-room condition and
   material data on their phone, even with no signal. The result is a structured
   "home profile."
2. **Buyer CRM (Buyer Data Module)** — rich buyer profiles capturing personal
   details, home preferences, must-haves/deal-breakers, and a live showing tool
   with AI-generated summaries.

A central **dashboard** ties it together with at-a-glance counts, recent
activity, debounced search, and an "active walkabouts" queue.

---

#### Core Workflows

##### 1. The Walkabout — mobile property inspection

- The agent starts a walkabout and fills out **General Details** (address, owner,
  contact info), then works through ~30 logically grouped sections: Access &
  Security, Structure & Design, Utilities; common rooms (Entry, Living, Family,
  Dining, Formal Dining, Kitchen); **dynamically added bedrooms and bathrooms
  (up to ten each)**; per-bedroom **en-suites**; work/flex rooms (Office, Laundry,
  Garage/Outbuildings); and Exterior, Special Features, and Legal/HOA.
- Each section is a collapsible form of radio groups, checkbox groups, "Other"
  fields, text, number, and notes inputs.
- **Sparse by design:** only the fields an agent actually fills in are stored and
  later displayed. A starter home and a ten-bedroom estate both render cleanly
  from the same system.
- Bedrooms/bathrooms can be added or removed on the fly; choosing "En-Suite: Yes"
  on a bedroom injects a full en-suite bathroom form right below it.
- A floating **global notes** pad autosaves (debounced) with a live "last saved"
  timer, and a **status pill** always shows sync state (New / pending sync /
  synced / Offline).
- Ending the walkabout marks the home "complete"; it then appears as a home
  profile that can be edited section-by-section, returned to draft, marked sold,
  or deleted.

##### 2. Buyer CRM + AI Showing Assistant

- Buyer profiles separate **structured columns** (name, budget basics, urgency,
  beds/baths) from a flexible **personal** and **preferences** JSON store holding
  dozens of optional attributes — pets, children, birthdays, occupations, lender
  info, kitchen/flooring/HOA preferences, and more.
- Agents grow a profile over time through "Add" forms driven by a field-config
  registry, plus quick-add **must-haves** and **deal-breakers**.
- **Live Showing mode:** the agent starts a timer, types timestamped notes during
  the walkthrough, and on finish the notes are sent to **Claude (Anthropic)**,
  which returns a clean one-paragraph summary the agent can edit and save to the
  buyer's showing history.

---

#### Standout Features & How They Work Under the Hood

##### Offline-first PWA (the flagship capability)

**Why it matters:** agents inspect homes in basements, rural properties, and dead
zones. HomeBase is engineered so a *complete* walkabout — or a new buyer — can be
captured with zero connectivity and sync automatically when signal returns.

How it works:

- **Service worker** (`service-worker.js`) with a tiered fetch strategy:
  cache-first for static assets (JS/CSS/fonts), network-first-with-cache-fallback
  for the form pages, and an offline fallback page for any other navigation. A
  versioned cache name (`homebase-v4`) cleans up old caches on activate.
- **IndexedDB as the source of truth** for unsynced data. Two stores —
  `homebase-walkabout` and `homebase-buyer` — keep records keyed by a
  client-generated `local_id` (UUID), with `status` and `syncState` ('dirty' /
  'synced') flags. Each write to a room section merges into the record so the
  device always holds the full, current walkabout.
- **Sync engine** that replays local changes to the server when online. The key
  detail: writes are funneled through a **promise-chain queue** (`enqueue`) so
  concurrent saves can't race each other or double-insert. Server upserts use
  Supabase's `onConflict: 'local_id'`, making every replay **idempotent** — the
  same record syncs safely whether it's the first attempt or the fifth.
- **Event-driven reconciliation:** `online`/`offline` listeners flip the status
  pill and kick off a sync; on dashboard load, `ensureWalkaboutsOnDevice()`
  hydrates any server-side draft walkabouts back into IndexedDB so an agent can
  resume on a second device.

This is the kind of conflict-aware, offline-first sync layer most apps never
attempt — and it's built without a framework or sync library.

##### Data-driven form rendering (one schema, rendered everywhere)

Rather than hand-coding dozens of near-identical room forms, every section is
described as **data** — a config object listing fields, types, and options
(`homeInteriorData.js`, `homeGeneralData.js`). That single schema feeds:

- **Server-side rendering** via a shared EJS partial (`_field.ejs`) that the
  `new-home` view iterates over.
- **Client-side rendering** via a JavaScript mirror (`home-rooms-render.js`) that
  produces byte-for-byte equivalent markup when a bedroom/bathroom/en-suite is
  added *offline* — so dynamically generated rooms look identical to ones the
  server rendered.
- **Profile display, editing, and field ordering** through helper utilities
  (`walkaboutSectionFormatter`, `flattenFields`, `addValues`) that re-key stored
  data back into config order.

The payoff: adding a new option to a room means editing **one array entry**, and
it propagates to the form, the offline renderer, the profile view, and the edit
flow. This is the project's clearest signal of systems-level thinking — spotting
repetition and abstracting it into a configuration-driven engine.

##### AI showing summaries (Claude / Anthropic)

The `summarize-showing` route uses the **Anthropic SDK** with **Claude Haiku
4.5** to turn raw, timestamped showing notes into a concise narrative. The system
prompt is marked with **ephemeral prompt caching** (`cache_control`) so the
instruction block is cached across calls — a small, real-world cost/latency
optimization. The feature degrades gracefully: it requires connectivity and
surfaces a friendly error if offline.

##### Secure, refresh-aware authentication

- Supabase Auth issues JWTs that HomeBase stores in **`httpOnly`, `secure`,
  `sameSite` cookies** (secure flag gated on `NODE_ENV === 'production'`),
  keeping tokens out of reach of page JavaScript.
- The `requireAuth` middleware validates the access token on each request and, on
  expiry, transparently runs a **refresh-token flow**. Simultaneous requests for
  the same expired token are **de-duplicated** through a shared promise map
  (`refreshPromises`) so only one refresh call fires — a subtle race condition
  most developers miss.
- **Row Level Security enforced at the database, not the app:** every
  authenticated request builds a per-user Supabase client carrying the user's
  bearer token (`getUserSupabase`), so Postgres RLS policies — not manual
  `WHERE user_id = ...` filters — guarantee an agent can only ever touch their
  own data.

##### Thoughtful front-end polish (vanilla JS)

- A `MutationObserver`-driven **status pill** that animates width and fades text
  whenever sync state changes — done in plain JS because `fit-content` can't be
  transitioned.
- **Debounced** search and notes autosave to limit network and DB load.
- Defensive data normalization on the server: empty strings dropped, single
  values coerced into arrays, structured vs. JSON fields split apart before
  insert.

---

#### Technology Stack

| Layer | Technology |
| --- | --- |
| **Runtime / Server** | Node.js, Express 5 (ES Modules) |
| **Views** | EJS server-side rendering with reusable partials |
| **Database & Auth** | Supabase (PostgreSQL, Auth/JWT, Row Level Security), JSONB columns for sparse/flexible data |
| **AI** | Anthropic Claude (Haiku 4.5) via `@anthropic-ai/sdk`, with prompt caching |
| **Front-end** | Vanilla JavaScript (ES Module architecture, **no framework**) |
| **Styling** | SCSS organized in the 7-1 pattern (`base` / `layout` / `abstracts`), compiled to a single stylesheet |
| **PWA / Offline** | Service Worker, IndexedDB, Web App Manifest |
| **Supporting libs** | `cookie-parser`, `dotenv`, `uuid`, `to-words` |

**Project size:** ~11,500 lines across server, client, and views.

---

#### Architecture at a Glance

```
server/
  index.js / server.js     → Express app wiring (routers, static, view engine)
  middleware/auth.js        → requireAuth + token refresh dedup + RLS client
  db/supabase.js            → base + per-user (RLS) Supabase clients
  routes/                   → home, buyer, shared (auth, pages, search, utils)
  data/                     → form/field config + formatting utilities
views/                      → EJS pages + partials (incl. _field.ejs renderer)
client/
  public/JS/
    core/                   → dashboard, nav, shared utils
    home/                   → walkabout orchestration + room renderer/config
    buyer/                  → buyer profile + new buyer
    offline/                → service-worker registration, IndexedDB stores, sync engines
  SCSS/                     → 7-1 architecture, compiled to public/dist/style.css
```

**Separation of concerns is deliberate:** routing, middleware, data
configuration, database access, server views, and client code each live in their
own layer. Auth is middleware; data shape is config; DB access is a module.

---

#### Notes for Technical Recruiters

**What this project demonstrates:**

- **Systems thinking over copy-paste.** The config-driven form engine and the
  shared server/client renderer show the developer identifying repetition and
  building an abstraction that scales — not hardcoding dozens of forms.
- **Genuine offline-first engineering.** A service worker, IndexedDB source of
  truth, idempotent upserts (`onConflict`), and a promise-chained sync queue add
  up to a conflict-aware sync layer built from primitives, without a sync library.
- **Security fundamentals applied correctly.** `httpOnly`/`secure`/`sameSite`
  cookies, JWT refresh with request de-duplication, and database-enforced Row
  Level Security via per-user clients.
- **API & AI integration.** Practical use of the Anthropic SDK including prompt
  caching and graceful offline degradation.
- **Clean architecture & Git discipline.** Clear layered folders, conventional
  commit messages (`Feat`, `Fix`, `Style`, `Refactor`), and PR-based feature
  branches.
- **Front-end craft without a framework.** Animations, debouncing, event
  delegation, and dynamic DOM rendering implemented in well-organized vanilla JS
  ES modules.

**Honest scope/maturity notes:**

- It's a v1 solo build: error handling is mostly "show a general message,"
  there's no automated test suite, and SCSS is compiled manually (no bundler).
- Input validation is light — the focus so far has been architecture, the
  offline system, and UX, with hardening as the natural next layer.

**One-line summary:** A self-taught developer's production-style, full-stack,
offline-first SaaS — server-rendered Express + Supabase with a from-scratch PWA
sync engine, a configuration-driven UI, and an AI-assisted CRM — that reaches
well beyond typical tutorial-level work.

### Bullseye Ledger — Knowledge Base

#### What it is

**Bullseye Ledger** is a mobile-first web app for keeping score at archery / 3D bow shoots. At a 3D shoot, archers normally hike a course of 30–50 foam-animal targets and track scores with a paper card and pencil — setting the bow down at every target to write, with no idea who's winning until the totals are added up at the end. Bullseye Ledger replaces that card: you log each target's score on your phone with one hand while holding the bow in the other, and everyone sees live standings the whole round.

It scores a single archer or a whole group, supports an optional **Distance Multiplier** game mode, persists the round so closing the app loses nothing, and ends with a **Round Summary** of final standings plus computed highlights you'd never bother to dig out of a paper card.

---

#### Core features (and how they work under the hood)

##### 1. Group scoring with live standings
- Add any number of players on the start screen; each can be renamed, deleted, or re-confirmed before the round starts.
- During the round, every player has a row of one-tap score buttons (10 / 8 / 5 / 3 / 0). Tapping a score writes it into state, recomputes that player's running total, and pushes the new number to both the player's row and the live scorecard immediately — no "submit" step.
- **Under the hood:** every player object holds a `targets[]` array (`{ target, score, distance }`). A total is never stored stale — it's recomputed from the source of truth with a `reduce` over `targets` on every change, so the displayed total can't drift out of sync with the individual shots.

##### 2. Target navigation (edit any past or future target)
- A collapsible target list lets you jump to any target; **Next/Previous** step through them. Selecting a target re-highlights the score buttons that were already chosen and re-fills the saved distance, so corrections are easy mid-round.
- **Under the hood:** a single `state.selectedTarget` index drives which slice of each player's `targets[]` the UI reads and writes. Re-selecting a target re-derives the button highlight state from stored scores rather than tracking UI state separately.

##### 3. Distance Multiplier game mode
- A toggle on the start screen. When on, each target also takes a **distance in yards**, and longer shots are worth more — turning a 60-yard target into a single, game-changing shot.
- **The math:** a target under 20 yards scores at face value; at 20 yards and beyond the score is multiplied by `distance × 0.05`. So 20 yds = ×1.0, 30 yds = ×1.5, 60 yds = ×3.0. A 10 at 60 yards is worth 30 points; a 10 at 30 yards is worth 15.
- Both the **net total** and the **multiplied total** are tracked in parallel, and the summary lets you flip between ranking by either.
- **Under the hood:** because multiplied scores produce decimals, summing them with `reduce` accumulated floating-point error over a long round. The fix normalizes each multiplied score and the running total with `toFixed(1)` so scores stay clean (e.g. avoids `47.400000000000006`).

##### 4. Persistent rounds (localStorage + rehydration)
- The app never loses an in-progress round. State is serialized to `localStorage` after every scoring action, and on reload the app **rebuilds the entire in-game UI from the saved state** — recreating the target list, every scorecard column, all per-target scores, distances, totals, and the previously selected target.
- **Under the hood:** `state.js` is a tiny state module exposing `state`, `setState` (merge), and `saveState` (serialize to a named key). On `window.load`, if a saved round exists it's parsed and replayed through the same render functions used during normal play, so there's one rendering path, not two.

##### 5. Round Summary
After ending a round the app generates:
- **Podium** — top 3 finishers, ranked by net or multiplied score.
- **Results table** — every player in finishing order; each row is an expandable `<details>` element showing a score breakdown (how many 10s, 8s, 5s, etc.) and a target-by-target mini scorecard.
- **Highlights** — computed callouts: *Most 10s* and *Most 0s* in the group (with tie handling), *Longest shot of the round* (who scored highest on the longest-distance target), and *Comeback Kid* (a player who trailed at the halfway point but won — only shown if they were down by more than 10).
- **Save or Delete** — Save names the round and stores its stats under a `"<name>, <date>"` key for a planned Round History feature, then resets. Delete wipes the round and resets.

---

#### Standout code

- **Single source of truth + derived UI.** All game data lives in one `state` object; the DOM is treated as a projection of it. Totals are recomputed from `targets[]` rather than incrementally mutated, which removes a whole class of "the total doesn't match the scores" bugs.
- **State rehydration loop** (`window.load` handler in `3dShoot.js`): reconstructs a fully interactive in-game screen from a serialized JSON blob by replaying the normal render functions — a clean example of making save/restore "free" by keeping one rendering path.
- **Event delegation.** Player-row actions (confirm / edit / delete) and target selection are handled by single listeners on parent containers using `e.target.closest(...)`, instead of binding listeners to elements that are created and destroyed dynamically.
- **Highlight algorithms.** `isComebackKid` / `populateComebackKid` compare each player's halfway total against the final winner to detect a comeback; `findsMost` returns *all* tied leaders, not just one, so "Most 10s" reads correctly when players tie.
- **Refactoring discipline (visible in git history).** Oversized functions were deliberately decomposed — e.g. `savesPlayer` was split into `isValidName`, `pushPlayerToState`, `isEditedPlayer`, and `updateNameInDOM`, each with one job. Repeated DOM lookups were consolidated with a `getPlayerRow` helper using object destructuring.

---

#### Tech stack

| Area | Choice |
| :--- | :--- |
| Language | Vanilla JavaScript (ES6 modules, `import`/`export`) |
| Architecture | Single-page app with screen-based routing driven by `state.screen` |
| State / persistence | Custom state module + browser `localStorage` (no library) |
| Styling | SCSS compiled to a minified `dist/style.css` |
| CSS methodology | BEM naming + the 7-1 SCSS pattern (`abstracts`, `globals`, `layout`) wired together with `@forward` |
| Theming | CSS custom properties (design tokens) for colors and font families |
| Markup | Semantic HTML — native `<dialog>` for the scorecard, `<details>`/`<summary>` for expandable results, `<dl>` for stat tables |
| Fonts | Self-hosted `woff2` (Playfair Display + Montserrat) with `font-display: swap` |
| Frameworks | **None** — no React/Vue, no bundler runtime, no third-party JS dependencies |

**Notable architecture choices:**
- **No framework on purpose** — state management, rendering, routing, and persistence are all hand-built, demonstrating the underlying DOM/JS fundamentals a framework usually hides.
- **SCSS organized like a real design system** — partials split by responsibility, reusable mixins (button styles, custom radio inputs, an animated "shine" effect), and CSS variables as a single color/typography source.
- **Performance and a11y touches** — self-hosted subset fonts with swap, minified CSS, `inputmode="numeric"` for the distance field, and ARIA labelling on the major sections.

---

#### Project facts (recruiter-relevant)

- **Type:** Solo-built, end-to-end web application — design, HTML, SCSS, and JavaScript.
- **Scale:** ~900 lines of core JavaScript and ~1,500 lines of SCSS, plus the HTML structure.
- **Process:** ~123 commits using **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`), with commit messages that explain *why* a change was made and what bug it fixed.
- **Engineering signals:** iterative refactoring of oversized functions into single-responsibility units; bug fixes traced to root cause (floating-point accumulation, stale totals, event-target over-matching); a migration from plain CSS to a structured SCSS architecture; and a save/restore design that reuses the live rendering path.
- **Status:** v1.0.0 feature-complete (group scoring, Distance Multiplier, persistence, round summary). v2.0.0 in progress: architecture refactor, UI polish, a Scoring Key, a Round History view, a "Second Chance Tokens" mechanic, and a Practice mode for solo training stats.
- **Vision:** intended to eventually ship to the app store for archers generally.

---

#### Quick FAQ

**Who is it for?** Archers and 3D bow shooters who want live scores and end-of-round insights instead of a paper card.

**Does it work offline / survive the app closing?** Yes — rounds are saved to `localStorage` and fully restored on reload.

**What makes the scoring interesting?** The Distance Multiplier mode weights scores by target distance, so a long shot can swing the whole round; the app tracks net and multiplied totals side by side.

**What tech is it built with?** Vanilla JavaScript (ES modules), SCSS (BEM + 7-1 architecture), semantic HTML, and `localStorage` — no frameworks.

## FAQ
**Open to relocating?** ...

## Escalation
For rates, availability, or anything you're unsure of, point them to isaac@isaacyoungs.dev

## Tech philosophy / opinions


## How I work


## Current Status


## Stack and Skills