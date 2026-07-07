# Full-Stack Calculator

A full-stack calculator application built as a code assessment. The app will use a React frontend that calls a Go backend API for basic and advanced arithmetic operations.

## Planned Stack

- Frontend: React, TypeScript, Vite
- Backend: Go, REST API
- Testing: Vitest and React Testing Library for the frontend, Go unit tests for the backend
- Optional: Docker support for running the full stack

## Planned Features

- Addition, subtraction, multiplication, and division
- Advanced operations: exponentiation, square root, and percentage
- Input validation and JSON error responses
- Responsive calculator UI
- Unit tests for frontend behavior and backend calculation logic

## Planned Project Structure

```txt
.
├── backend/
│   ├── cmd/server/
│   └── internal/
│       ├── api/
│       └── calculator/
├── frontend/
│   └── src/
└── README.md
```

## Progress Tracking

See `CHECKLIST.md` for the step-by-step implementation plan and current project status.

## Setup

Setup instructions will be added as the backend and frontend are implemented.

## Running the Application

Backend and frontend run commands will be added once each service exists.

## API Examples

REST API examples will be added once the backend endpoints are implemented.

## Design Decisions

- Keep calculation logic separate from HTTP handlers so it can be tested directly.
- Use the backend as the source of truth for validation and edge cases.
- Keep the frontend API client isolated from UI components for maintainability.
- Prioritize clarity and testability over unnecessary framework complexity.

## AI Prompts Used

Initial planning and implementation were assisted with AI tooling. Prompts will be recorded here as the project progresses.
