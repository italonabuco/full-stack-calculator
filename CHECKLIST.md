# Project Checklist

This checklist tracks the assessment work in small reviewable steps. Each step should be reviewed and committed before moving to the next one.

## Status Legend

- ✅ Done and committed
- 🔄 In progress or ready for review
- ⬜ Not started

## Steps

- ✅ Step 1: Add README project plan
  - Commit: `376ba85 docs: add project plan README`
  - Added the initial project overview, planned stack, planned features, structure, and design notes.

- ✅ Step 1.5: Add project guidance files
  - Commit: `7dcfe80 docs: add project guidance files`
  - Added `AGENTS.md`, `PROMPTS.md`, and `.gitignore`.

- ✅ Step 1.75: Add progress tracking checklist
  - Commit: `774fa31 docs: add progress checklist`
  - Add `CHECKLIST.md` to track step status.
  - Reference `CHECKLIST.md` from `README.md`.
  - Reference `CHECKLIST.md` from `AGENTS.md`.

- ✅ Step 2: Add backend calculator domain logic
  - Commit: `ea18179 feat: add backend calculator domain logic`
  - Add Go module under `backend/`.
  - Add pure calculator package under `backend/internal/calculator/`.
  - Support add, subtract, multiply, divide, power, square root, and percentage.
  - Add unit tests for normal operations and edge cases.
  - Verification:
    - `go test ./...`
    - `go test ./... -cover`
    - Current coverage: `86.5% of statements`

- ✅ Step 3: Add backend REST API
  - Commit: `9428295 feat: add backend rest api`
  - Add HTTP handlers for calculator requests.
  - Add health endpoint.
  - Return JSON success and error responses.
  - Add handler tests with `httptest`.
  - Update README with backend run instructions and API examples.
  - Add `openapi.yaml` and keep it synced with API behavior.
  - Verification:
    - `env GOCACHE=/private/tmp/full-stack-calculator-go-build go test -v ./... -cover`
    - API package coverage: `97.3% of statements`
    - Calculator package coverage: `86.5% of statements`

- ✅ Step 4: Add React frontend foundation
  - Commit: `55b6f35 feat: scaffold react frontend`
  - Create Vite React TypeScript app under `frontend/`.
  - Add basic project scripts.
  - Keep dependencies and build outputs out of Git.
  - Document frontend run/build commands in the root `README.md`.
  - Verification:
    - `npm run build`
    - Build passes with Node.js `24.13.0`.

- ✅ Step 4.25: Clean up frontend scaffold and configuration
  - Commit: `9a380f4 chore: add frontend node configuration`
  - Add `.nvmrc` for the frontend Node.js version.
  - Review generated Vite assets and remove anything not needed for the calculator app.
  - Keep the root `README.md` as the evaluation source of truth.
  - Confirm package scripts and lint configuration are appropriate before app work begins.
  - Verification target:
    - `npm run build`
    - `npm run lint`
  - Verification:
    - `npm run build` passed with Node.js `24.13.0`
    - `npm run lint` passed with Node.js `24.13.0`
    - Localhost smoke check passed at `http://localhost:5173`
    - `POST /api/calculate` percentage smoke check returned `5`

- ✅ Step 4.5: Define frontend API contract types
  - Keep this step lightweight and avoid generated client tooling.
  - Add small hand-written TypeScript request and response types for the frontend API client.
  - Keep those types aligned with `openapi.yaml`.
  - Verification:
    - `npm run build` passed with Node.js `24.13.0`
    - `npm run lint` passed with Node.js `24.13.0`

- ✅ Step 5: Build calculator UI
  - Add operation selection and numeric inputs.
  - Add loading, result, and error states.
  - Add responsive styling.
  - Connect UI to backend API client.
  - Remove unused Vite starter UI assets.
  - Verification:
    - `npm run build` passed with Node.js `24.13.0`
    - `npm run lint` passed with Node.js `24.13.0`

- ✅ Step 5.5: Polish calculator UI
  - Commit: `b883344 feat: polish calculator frontend UI`
  - Improve operation selector presentation.
  - Add operation symbols and live formula preview.
  - Improve result panel with calculation expression context.
  - Keep API behavior unchanged.
  - Verification:
    - `npm run build` passed with Node.js `24.13.0`
    - `npm run lint` passed with Node.js `24.13.0`

- ✅ Step 6: Add frontend tests
  - Commit: `a032906 test: add frontend calculator coverage`
  - Test validation behavior.
  - Test operation-specific UI behavior.
  - Test successful result display.
  - Test backend error display.
  - Test frontend API client success, API error, and network error behavior.
  - Verification:
    - `npm run test` passed with Node.js `24.13.0` (`7` tests)
    - `npm run test:coverage` passed with Node.js `24.13.0`
    - Frontend coverage: `92.64%` statements, `82.53%` branches, `100%` functions, `92.53%` lines
    - `npm run build` passed with Node.js `24.13.0`
    - `npm run lint` passed with Node.js `24.13.0`

- ✅ Step 7: Final documentation pass
  - Add full setup instructions.
  - Add frontend and backend run commands.
  - Add API examples.
  - Add design decisions and assumptions.
  - Ensure `PROMPTS.md` is complete and presentable.
  - Verification:
    - `env GOCACHE=/private/tmp/full-stack-calculator-go-build go test -v ./... -cover` passed from `backend/`
    - Backend API coverage: `97.3% of statements`
    - Backend calculator coverage: `86.5% of statements`
    - `npm run test:coverage` passed with Node.js `24.13.0`
    - Frontend coverage: `92.64%` statements, `82.53%` branches, `100%` functions, `92.53%` lines
    - `npm run build` passed with Node.js `24.13.0`
    - `npm run lint` passed with Node.js `24.13.0`

- ✅ Step 7.5: Improve frontend error messages
  - Keep backend API error messages stable.
  - Translate known backend errors into clearer frontend messages.
  - Update frontend tests for friendly error display.
  - Verification:
    - `npm run test` passed with Node.js `24.13.0` (`8` tests)
    - `npm run test:coverage` passed with Node.js `24.13.0`
    - Frontend coverage: `91.66%` statements, `81.53%` branches, `100%` functions, `91.54%` lines
    - `npm run build` passed with Node.js `24.13.0`
    - `npm run lint` passed with Node.js `24.13.0`

- ✅ Step 8: Optional Docker support
  - Add Dockerfiles and/or Docker Compose if time allows.
  - Document Docker usage in README.
  - Verification:
    - `docker compose config` passed.
    - `docker compose build` passed.
    - Stopped local processes using ports `8080` and `5173` before the smoke test.
    - `docker compose up -d` passed.
    - `curl http://localhost:8080/health` returned `{"status":"ok"}`.
    - `curl http://localhost:8080/api/calculate` percentage smoke check returned `5`.
    - `curl http://localhost:5173` returned the production frontend HTML.
    - `docker compose down` cleaned up the containers and network.

- ✅ Step 9: Final verification
  - Run backend tests and coverage.
  - Run frontend tests and coverage.
  - Run frontend build.
  - Review `git status`.
  - Prepare repository link for submission.
  - Verify assessment requirements against the implemented repository.
  - Verification:
    - `env GOCACHE=/private/tmp/full-stack-calculator-go-build go test -v ./... -cover` passed from `backend/`.
    - Backend API coverage: `97.3% of statements`.
    - Backend calculator coverage: `86.5% of statements`.
    - `npm run test:coverage` passed with Node.js `24.13.0` (`8` tests).
    - Frontend coverage: `91.66%` statements, `81.53%` branches, `100%` functions, `91.54%` lines.
    - `npm run build` passed with Node.js `24.13.0`.
    - `npm run lint` passed with Node.js `24.13.0`.
    - `docker compose config` passed.
    - `docker compose build` passed.
    - `docker compose up -d` passed.
    - Docker health smoke check returned `{"status":"ok"}`.
    - Docker percentage calculation smoke check returned `5`.
    - Docker frontend smoke check returned production HTML.
    - `docker compose down` cleaned up containers and network.
