# Agent Instructions

This repository is a full-stack calculator assessment using a React frontend and Go backend. Work should be done in small, reviewable steps.

## Project Goals

- Prioritize correctness, clarity, and maintainability.
- Keep the frontend and backend testable independently.
- Document setup, API usage, design decisions, and AI prompts used.
- Prefer small commits that each represent one coherent step.

## Planned Architecture

- `backend/`: Go REST API and calculator domain logic.
- `frontend/`: React + TypeScript calculator UI.
- `README.md`: setup, usage, API examples, and design rationale.
- `PROMPTS.md`: prompts used while building the assessment.

## Backend Guidance

- Keep calculator logic separate from HTTP handlers.
- Validate input at the API boundary and in domain logic where needed.
- Return JSON responses for both success and errors.
- Cover arithmetic behavior and edge cases with Go tests.
- Use the Go standard library unless a dependency clearly improves the solution.

## Frontend Guidance

- Use React with TypeScript.
- Keep API calls isolated from UI components.
- Provide basic responsive support for mobile screens.
- Validate obvious input issues in the UI while keeping the backend as the source of truth.
- Cover key UI flows with component tests.

## Workflow

- Implement one step at a time.
- Wait for review and approval before moving to the next step.
- Do not commit unless explicitly asked.
- Keep generated dependencies, coverage reports, and build outputs out of Git.
