# Todo List 2026

A small todo app built with React and Vite. It uses a JSON Server backend, a cache-first data layer, and optimistic UI updates.

## Features

- Task list with search, status filter, and bulk toggle
- Create and edit tasks with basic validation and date constraints
- Soft delete (mark as deleted) and hard delete on the second click
- Cache-first storage in localStorage with background sync
- Error and not-found screens

## Tech Stack

- React 19 + React Router 7
- Vite 7
- Axios
- json-server (local API)
- ESLint

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the local API (serves `db.json` on `http://localhost:3000`):

```bash
npm run api
```

3. Create an `.env` file with the API URL:

```bash
VITE_API_URL=http://localhost:3000
```

4. Start the dev server:

```bash
npm run dev
```

5. Open `http://localhost:5173`.

If the API is not running, the app falls back to cached tasks in localStorage and shows a sync error message.

## Scripts

- `npm run dev` - Start the Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint on the project
- `npm run api` - Start json-server on port 3000

## Data Model

Task fields used by the UI and API:

```json
{
  "id": "uuid",
  "createdAt": 1710000000000,
  "status": "todo | done | deleted",
  "title": "string (3-15 chars)",
  "description": "string (5-200 chars)",
  "endDate": "YYYY-MM-DD"
}
```

## Routes

- `/` - Home page with list and filters
- `/add` - Add new task
- `/edit/:id` - Edit task

## Project Structure

- `src/app` - App entry and router
- `src/pages` - Route pages (Home, Add, Edit, Error, NotFound)
- `src/components` - Shared UI components and hooks
- `src/api` - Axios API client
- `src/repositories` - Cache-first data access
- `src/shared/storage` - localStorage helpers
- `db.json` - Local API seed data

## Caching and Sync Notes

- The app keeps a local cache in `localStorage` and uses it immediately on load.
- A background sync refreshes data from the API.
- Cache TTL is 60 seconds; you can change it in `src/repositories/tasksRepository.js`.
