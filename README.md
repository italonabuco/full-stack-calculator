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

Install:

- Go 1.26 or newer for the backend
- Node.js 20.19 or newer for the frontend

If you use `nvm`, switch to the project Node.js version before running frontend commands:

```sh
nvm use
```

## Backend

The backend includes:

- Calculator domain logic under `backend/internal/calculator`
- REST API handlers under `backend/internal/api`
- Server entrypoint under `backend/cmd/server`

Implemented operations:

- Addition
- Subtraction
- Multiplication
- Division
- Exponentiation
- Square root
- Percentage

Run the backend API from the backend directory:

```sh
cd backend
go run ./cmd/server
```

The API listens on port `8080` by default. Set `PORT` to use a different port:

```sh
PORT=9090 go run ./cmd/server
```

Run backend tests:

```sh
cd backend
go test ./...
```

Run backend tests with coverage:

```sh
go test ./... -cover
```

For detailed test output, use verbose mode:

```sh
go test -v ./... -cover
```

## API Examples

The API contract is documented in `openapi.yaml`. Keep that file in sync whenever endpoints, request fields, response shapes, or error messages change.

Health check:

```sh
curl http://localhost:8080/health
```

Response:

```json
{
  "status": "ok"
}
```

Calculate addition:

```sh
curl -X POST http://localhost:8080/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"add","a":10,"b":5}'
```

Response:

```json
{
  "operation": "add",
  "result": 15
}
```

Calculate square root:

```sh
curl -X POST http://localhost:8080/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"sqrt","a":25}'
```

Response:

```json
{
  "operation": "sqrt",
  "result": 5
}
```

Example error response:

```sh
curl -X POST http://localhost:8080/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"divide","a":10,"b":0}'
```

Response:

```json
{
  "error": "division by zero"
}
```

Supported operation values:

- `add`
- `subtract`
- `multiply`
- `divide`
- `power`
- `sqrt`
- `percentage`

## Frontend

The frontend is a Vite React TypeScript app under `frontend/`.

Install frontend dependencies:

```sh
cd frontend
npm install
```

Run the frontend development server:

```sh
npm run dev
```

The frontend calls `http://localhost:8080` by default. To use a different API URL, set `VITE_API_BASE_URL` when running the frontend:

```sh
VITE_API_BASE_URL=http://localhost:9090 npm run dev
```

Build the frontend:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Design Decisions

- Keep calculation logic separate from HTTP handlers so it can be tested directly.
- Use the backend as the source of truth for validation and edge cases.
- Keep the frontend API client isolated from UI components for maintainability.
- Prioritize clarity and testability over unnecessary framework complexity.

### Operation-Based API

The calculator performs one operation per API request instead of parsing full mathematical expressions. For example, the frontend sends an explicit operation such as `divide` with operands `a` and `b`.

This keeps the API contract simple, predictable, and easy to validate. It also makes edge cases like division by zero, missing operands, unsupported operations, and square roots of negative numbers straightforward to test.

Expression parsing, operator precedence, and multi-step formulas are intentionally out of scope for this assessment. The requested operation list maps cleanly to explicit API operations, which keeps the implementation focused on full-stack structure, validation, and maintainability.

## AI Prompts Used

Initial planning and implementation were assisted with AI tooling. Prompts will be recorded here as the project progresses.
