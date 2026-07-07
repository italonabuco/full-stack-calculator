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
  - Commit: `189a277 feat: add backend calculator domain logic`
  - Add Go module under `backend/`.
  - Add pure calculator package under `backend/internal/calculator/`.
  - Support add, subtract, multiply, divide, power, square root, and percentage.
  - Add unit tests for normal operations and edge cases.
  - Verification:
    - `go test ./...`
    - `go test ./... -cover`
    - Current coverage: `86.5% of statements`

- ✅ Step 3: Add backend REST API
  - Commit: `824ca2a feat: add backend rest api`
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

- ⬜ Step 4: Add React frontend foundation
  - Create Vite React TypeScript app under `frontend/`.
  - Add basic project scripts and test setup.
  - Keep dependencies and build outputs out of Git.

- ⬜ Step 4.5: Generate frontend API types from OpenAPI
  - Use `openapi.yaml` as the source of truth for API request and response types.
  - Generate TypeScript types after the frontend project exists.
  - Candidate command: `npx openapi-typescript openapi.yaml -o frontend/src/api/schema.ts`.
  - Keep generated types in sync whenever `openapi.yaml` changes.

- ⬜ Step 5: Build calculator UI
  - Add operation selection and numeric inputs.
  - Add loading, result, and error states.
  - Add responsive styling.
  - Connect UI to backend API client.

- ⬜ Step 6: Add frontend tests
  - Test validation behavior.
  - Test operation-specific UI behavior.
  - Test successful result display.
  - Test backend error display.

- ⬜ Step 7: Final documentation pass
  - Add full setup instructions.
  - Add frontend and backend run commands.
  - Add API examples.
  - Add design decisions and assumptions.
  - Ensure `PROMPTS.md` is complete and presentable.

- ⬜ Step 8: Optional Docker support
  - Add Dockerfiles and/or Docker Compose if time allows.
  - Document Docker usage in README.

- ⬜ Step 9: Final verification
  - Run backend tests and coverage.
  - Run frontend tests and coverage.
  - Run frontend build.
  - Review `git status`.
  - Prepare repository link for submission.
