# Expense Tracker Frontend

React 18 + Vite app for the Spring Boot expense tracker API.

## Prerequisites

- Node.js 18+
- Backend running at `http://localhost:8080` with base API at `/api`

## Setup

```bash
npm install
npm run dev
```

Open the app at `http://localhost:5173`.

## Environment

- API base URL is set to `http://localhost:8080/api` in `src/services/api.js`.

## Routes

- `/login` – Login
- `/signup` – Signup
- `/dashboard` – Protected dashboard with expenses list, filters, add/edit/delete

## Auth

- JWT token stored in `localStorage` under key `token`
- Axios interceptor attaches `Authorization: Bearer <token>` to requests
- 401 responses auto-redirect to `/login`

## Build

```bash
npm run build
npm run preview
```
