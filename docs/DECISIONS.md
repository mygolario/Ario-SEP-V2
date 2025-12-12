# Decisions Log

## Architecture

- **Framework:** Next.js **App Router** (keep; no migration to pages router).
- **Database/Auth:** Supabase auth + DB (keep existing RLS posture).
- **AI Provider:** OpenRouter (default model: `google/gemini-3-pro-preview`; overridable via `OPENROUTER_MODEL`).

## Localization

- **Strategy:** V1 is **Farsi-only**; no English copy ships.
- **Direction:** RTL enforced globally (layout + components honor RTL).
- **Implementation:** Lightweight dictionary or hardcoded Farsi strings acceptable for speed; no heavy i18n lib yet.

## Generation Strategy

- **Phase 1 (Now):** Single-shot generation, but **contracts + validation** set in place.
- **Phase 3 (Later):** Section-based generation (e.g., regenerate Lean Canvas only).
- **Validation:** All inbound requests and AI outputs validated with `zod` before Supabase writes; generation retries once with a schema-repair prompt if validation fails.
- **Output Safety:** `logoSVG` is sanitized on the server before persistence and sanitized again on render.

## Styling

- **CSS:** Tailwind CSS.
- **Theme:** Dark/Light mode support (Keep existing if present, else default to Light for business vibe).
- **Fonts:** Vazirmatn self-hosted via `next/font/local` for Farsi legibility and reliable builds.

## Deployment

- **Platform:** Vercel (assumed) or similar.
- **CI/CD:** GitHub Actions for checks, Vercel for deploy.
