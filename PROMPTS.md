# AI Prompts Used

This project was built with AI assistance. Prompts are recorded here for assessment transparency.

## Initial Assessment Prompt

```txt
I have to build this as a code assessment:

Objective
Build a full-stack calculator application with a React frontend and a backend microservice. The frontend should consume the backend API to perform basic and advanced arithmetic operations. Focus on clean design, maintainable code, and testable architecture.

Requirements
Functional
Operations:
Addition, Subtraction, Multiplication, Division
Optional: Exponentiation, Square Root, Percentage
Frontend (React):
Intuitive UI for entering input and displaying results
Input validation and error handling
Responsive design (basic mobile support)
Backend (REST API):
Expose endpoints for calculator operations
Validate input and handle edge cases (division by zero, invalid data)
Return results in JSON format
Non-Functional
Clean, readable, and idiomatic code (frontend and backend)
Unit tests covering key functionality for both layers
Documentation: setup instructions, API usage, and design rationale
Optional: Dockerfile for full-stack deployment
Constraints
Frontend: React (TypeScript preferred)
Backend: Go is perferred
Deliverables
Git repository with frontend and backend code
README with setup instructions, API examples, and design decisions
Unit tests and coverage report
Optional: Dockerfile to run frontend + backend together
Instructions
Use any AI tooling you would like
Spend ~2-4 hours on this assignment. Prioritize correctness, clarity, and maintainability over extra features.
Push your solution to GitHub, GitLab, or another Git repository.
Share the repository link with us for evaluation.
Share any prompts that you used in your work
Make sure your README includes:
Setup instructions
How to run the frontend and backend
Examples of API calls (if using REST)
Design decisions or assumptions

__
dont code anything yet, lets first plan everything
```

## Follow-Up Prompts

```txt
We'll create step by step, continuing only after I approve and commit it
```

```txt
Lets update the README.md with the information we got for the assessment.
```

```txt
Create a AGENTS.md with guide based on the requirements, PROMPTS.md with the prompts we used so far and .gitignore with default setup
```

```txt
Add an openapi.yaml specification for the backend api and instructions to keep it updated whenever api behavior changes.
```

```txt
Add a future checklist item to generate frontend TypeScript API types from the OpenAPI specification.
```

```txt
Use the official Vite scaffold command for the React TypeScript frontend instead of manually creating the project files.
```
