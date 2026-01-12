## Available Scripts

1. `dev` - Starts the development server: fast startup, HMR (hot module replacement / auto-refresh on changes), usually at an address like [http://localhost:5173].
2. `lint` - Runs ESLint across the project (from the current folder `.`): finds errors and code style/quality issues. It doesn’t build anything.
3. `build` - Creates a production build (optimization, minification) and outputs the result to the `dist/` folder.
4. `preview` - Starts a local server that serves the already built `dist/` to verify how the app works after the production build. Usually you run `npm run build` first, then `npm run preview`.

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

---

## Eslint

- check and (partially) auto-correct rules related to import/export

```bash
npm i -D eslint-plugin-import
```

- Auto-fix for imports

```bash
npm run lint -- --fix
```

---

- This package does not affect the application's performance in the browser. It is only required when running npm run lint (or when the editor displays ESLint errors).

```bash
npm i -D eslint-plugin-react
```

---
