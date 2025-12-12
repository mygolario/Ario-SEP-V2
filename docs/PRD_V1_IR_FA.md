# Product Requirement Document (PRD) — V1 Iran (Farsi)

## 1. Overview

- **Target market:** Iran, Farsi-only experience
- **Goal:** Ship a dependable MVP that generates startup business plans in Farsi with minimal friction.
- **Platform:** Web app (Next.js + Supabase) with AI generation via OpenRouter.

## 2. Scope & Features

### MVP Modules

1. **Identity:** Business name, tagline, 1–2 sentence summary.
2. **Branding:** Color palette (hex strings), optional logo SVG placeholder or brief.
3. **Landing Page Copy:** Headline, subheadline, primary CTA, feature bullets, testimonial blurbs, footer basics.
4. **Lean Canvas:** Problem, solution, unique value, unfair advantage, customer segments, channels, revenue stream, cost structure.
5. **30-Day Roadmap:** Four weekly focuses with actionable task lists.
6. **PDF Export:** Downloadable PDF that preserves Farsi text, RTL layout, and branding accents.

### User Flows

1. Signup/Login (Supabase: magic link or password).
2. Create project via onboarding (inputs: idea, audience, vibe, budget, goal).
3. Generate full plan (single request).
4. Dashboard shows generated modules.
5. Edit or regenerate per section (manual edits now; section-level regen planned later).
6. Export PDF of the current plan.

### Out of Scope (V1)

- Payments or subscriptions.
- English language support.
- Team collaboration.
- Advanced analytics or deep reporting.
- Full market deep dive or extended business plan.

## 3. Acceptance Criteria

### Identity
- Required fields: `businessName`, `tagline`, `summary` (Farsi, concise).
- Names and tagline feel localized (no transliteration-only responses).
- Summary clearly states the core offer and audience.

### Branding
- Color palette contains 4–6 distinct hex strings suitable for UI/print.
- Optional `logoSVG` string is valid SVG or omitted cleanly.
- Palette reused in dashboard/PDF when available.

### Landing Page Copy
- Includes headline, subheadline, CTA label, 3–6 features, 2–3 testimonials (name + quote), footer contact basics.
- Copy is persuasive, natural Farsi, and references the provided idea/audience/vibe.
- Content respects RTL layout (no mixed-direction glitches).

### Lean Canvas
- All nine blocks present with non-empty Farsi content.
- Problem/solution show a clear linkage; revenue/cost are plausible for the idea.
- Unique value and unfair advantage are differentiated (not duplicates).

### 30-Day Roadmap
- Four weeks, each with a focus title and 3–6 actionable tasks.
- Tasks are realistic for an early-stage founder in Iran (local constraints considered).
- Ordering shows progression from validation to launch.

### PDF Export
- Export succeeds without layout breakage on RTL.
- Farsi characters render correctly (no disconnected glyphs).
- Uses provided brand colors where applicable and includes all modules.

## 4. Non-Functional Requirements

- **Performance:** Dashboard initial load < 2s on broadband; generation < 60s end-to-end with spinner state.
- **Reliability:** Graceful failures with user-friendly errors; retries or fallback messaging when AI fails.
- **Security:** Supabase RLS on user data, secrets not exposed to client, input validation on all endpoints.
- **Logging/Observability:** Log AI request/response summaries and API errors (respecting PII), surface failures to monitoring.
