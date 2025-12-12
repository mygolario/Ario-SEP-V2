# Decisions Log

## Architecture

- **Framework:** Next.js **App Router** (keep; no migration to pages router).
- **Database/Auth:** Supabase auth + DB (keep existing RLS posture).
- **AI Provider:** OpenRouter (Claude 3.5 Sonnet / GPT-4o as default) stays.

## Localization

- **Strategy:** V1 is **Farsi-only**; no English copy ships.
- **Direction:** RTL enforced globally (layout + components honor RTL).
- **Implementation:** Lightweight dictionary or hardcoded Farsi strings acceptable for speed; no heavy i18n lib yet.

## Generation Strategy

- **Phase 1 (Now):** Single-shot generation, but **contracts + validation** set in place.
- **Phase 3 (Later):** Section-based generation (e.g., regenerate Lean Canvas only).
- **Validation:** All inbound requests and AI outputs validated with `zod` before Supabase writes.

## Styling

- **CSS:** Tailwind CSS.
- **Theme:** Dark/Light mode support (Keep existing if present, else default to Light for business vibe).

## Deployment

- **Platform:** Vercel (assumed) or similar.
- **CI/CD:** GitHub Actions for checks, Vercel for deploy.
