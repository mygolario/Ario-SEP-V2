# Karnex Domain Switch Checklist (karnex.ir)

This document outlines the final steps to switch the production domain to `karnex.ir`.

## 1. Vercel Configuration

- [ ] Go to **Project Settings** > **Domains**.
- [ ] Add `karnex.ir` and `www.karnex.ir`.
- [ ] Follow Vercel's instructions to configure DNS (A Record or Nameservers) in Nic.ir / current registrar.
  - **A Record**: `76.76.21.21` (if using A records)
  - **CNAME**: `cname.vercel-dns.com` (for www)

## 2. Environment Variables

Update these variables in Vercel **Settings** > **Environment Variables** (Production Environment):

- [ ] `NEXT_PUBLIC_APP_URL` -> `https://karnex.ir`
- [ ] `NEXT_PUBLIC_API_URL` -> `https://karnex.ir/api` (if used explicitly)

## 3. Authentication (Supabase / Auth Provider)

- [ ] Go to Supabase Project Settings > **Authentication** > **URL Configuration**.
- [ ] Set **Site URL** to `https://karnex.ir`.
- [ ] Add `https://karnex.ir/**` to **Redirect URLs**.
- [ ] (If using Google/GitHub OAuth): Update the "Authorized redirect URIs" in their respective developer consoles to include `https://karnex.ir/api/auth/callback`.

## 4. Cloudflare Turnstile

- [ ] Log in to Cloudflare Dashboard > Turnstile.
- [ ] Select the widget used for Karnex.
- [ ] Go to **Settings**.
- [ ] Add `karnex.ir` and `www.karnex.ir` to the **Domain Allowlist**.
  - _Tip:_ You can keep `localhost` for dev testing.

## 5. Brevo (Email Sender)

To ensure emails land in Inbox (not Spam):

- [ ] Go to Brevo > **Senders & IP**.
- [ ] Add `support@karnex.ir` (or similar) as a sender.
- [ ] **Authenticate Domain**:
  - Add the **TXT (DKIM)** record provided by Brevo to your DNS.
  - Add the **TXT (SPF)** record provided by Brevo to your DNS.
  - Add the **DMARC** record (optional but recommended).
- [ ] Verify the domain in Brevo dashboard.

## 6. PostHog (Analytics)

- [ ] Ensure `https://karnex.ir` is authorized in PostHog project settings (if strict domain checking is enabled).

## 7. Final Smoke Test

Once DNS propagates (can take 24-48h for .ir):

- [ ] Visit `https://karnex.ir`.
- [ ] Log in / Sign up (Verify Supabase redirects).
- [ ] Test "Forgot Password" (Verify email delivery from Brevo).
- [ ] Check if Analytics events are firing.
