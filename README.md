# A simple SPA application for task management: creating, editing, and organizing tasks by status.

## Features

- Viewing the task list
- Adding a task
- Editing a task by `id`
- Filtering by status (`Todo / Done / Deleted`)
- Page routing (`Home / Add / Edit`)

## Tech Stack

- React
- React Router
- CSS / SCSS

## Project Structure (high level)

- `src/pages` — pages (`Home / Add / Edit`)
- `src/components` — reusable components (`Topbar, Footer, UI`)
- `src/layouts` — shell/layout for route groups (e.g. `HomeShell/DefaultShell`)
- `src/assets` — icons/images

### Install

```bash
npm install
```

### Getting Started

```
npm run dev
```

```
npm run lint    // checks the code with a linter (errors/style), does not compile anything.
npm run build   // builds the project in production (creates a folder like dist/ or .next/).
npm run preview // runs the server locally and shows the already built build (to check how it will look in production).
```
