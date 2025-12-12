# Project Roadmap (Phases 0–9)

## Phase 0 — Foundations _(Done)_
- Branching strategy and base branch (`main` → `rebuild/v3`).
- Core documentation set (PRD, Decisions, Roadmap, DoD).
- Base tooling lint/format/CI hooks.

## Phase 1 — Core V1 MVP _(Done after this PR)_
- Business plan contract defined (types + zod).
- API request/response validated; onboarding payload aligned.
- Dashboard consumes shared types; minimal error boundaries.
- Smoke tests (validators) and CI wiring.

## Phase 2 — UX Polish & Content Quality
- Refine onboarding and dashboard UX for RTL/Farsi readability.
- Improve PDF styling and brand consistency.
- Add copy quality checks and tone controls.

## Phase 3 — Sectional Generation
- Endpoints and UI to regenerate individual modules.
- Track per-section status/errors; throttling + retries.
- Autosave edits with diffing.

## Phase 4 — Auth & Profiles
- Profile/settings page (language toggle prep, notifications).
- Manage multiple projects per user; project switching.
- Session hardening (device tracking, refresh flows).

## Phase 5 — Collaboration
- Shared projects with roles.
- Commenting/annotations on plan sections.
- Activity log for changes.

## Phase 6 — Payments & Plans
- Pricing plans and checkout.
- Usage limits/quota enforcement.
- Invoice/receipts and upgrade/downgrade flows.

## Phase 7 — Analytics & Insights
- Basic analytics dashboards (traffic, conversions estimations).
- Experimentation hooks for copy variants.
- AI prompt/response telemetry with privacy guards.

## Phase 8 — Localization & Market Expansion
- English language support; i18n framework adoption.
- Localized templates per region.
- Market-specific compliance reviews.

## Phase 9 — Reliability & Scale
- Load/performance testing and caching.
- Error budgets, SLOs, and alerting.
- Disaster recovery/backups and PDF/export hardening.
