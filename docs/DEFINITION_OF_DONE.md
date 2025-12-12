# Definition of Done (DoD)

To consider a task or phase "Done", the following criteria must be met:

1.  **CI Pipeline Green**

    - Lint check passes (`npm run lint`).
    - Type check passes (`npm run typecheck`).
    - Tests pass (`npm run test`).
    - Build passes (`npm run build`).

2.  **Code Quality**

    - No critical `eslint` warnings.
    - Code formatted via `prettier`.
    - No direct use of `any` for core business data contract (e.g., `BusinessPlanV1` fully typed).
    - API contracts validated by `zod` before persisting or rendering.

3.  **Functionality**

    - Feature meets the requirements in PRD.
    - Happy path works.
    - Basic error handling in place (Error pages, Toasts).
    - User-facing error pages exist for app-level failures and 404s.

4.  **Testing**

    - Unit tests for new utility functions/validators.
    - Manual verification of UI in a browser.

5.  **Documentation**
    - Relevant docs updated (if architecture changed).
    - Code comments for complex logic.
