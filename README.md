# Diacare Frontend

Diacare-frontend is the React single-page application for the Diacare project — a diabetes self-care and insights dashboard. It provides user intake forms, risk calculations, trend visualizations, and basic reporting connected to the Diacare backend API.

## Key features

- User registration and login
- Multi-step forms (demographics, lifestyle, medical history, symptoms, stress)
- Risk and results pages with visualizations
- Health reports and trend dashboards

## Tech stack

- React (created with Create React App)
- JavaScript (ES6+)
- CSS (plain CSS files in `src/`)

## Repository structure (important files)

- `public/` — static HTML, manifest and public assets

- `src/` — application source code
  - `App.js`, `index.js` — app entry
  - `pages/` — route pages and form components
  - `services/api.js` — API helper functions
  - `utils/auth.js` — auth helpers

## Prerequisites

- Node.js v14+ and npm installed on your machine.

## Local setup

- Install dependencies

 ```powershell
 npm install
 ```

- Create a `.env` file at the project root (see notes below) and set any required environment variables.

- Run the development server

 ```powershell
 npm start
 ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

This project may use environment variables prefixed with `REACT_APP_`. Common values:

- `REACT_APP_API_URL` — URL of the backend API (e.g. `http://localhost:8000/api`)

Do not commit `.env` files — they are ignored by the repository `.gitignore`.

## Available scripts

- `npm start` — start dev server
- `npm test` — run tests (if present)
- `npm run build` — build production bundle into `build/`

## Notes for contributors

- Follow existing code style in `src/`. Keep components small and focused.
- If you add new environment variables, document them here.
- Open a pull request and include a short description of changes and any setup steps.

## Troubleshooting

- If the app fails to start, remove `node_modules` and reinstall: `rm -r node_modules; npm install` (on PowerShell use `rm -r node_modules; npm install`).
- Check `REACT_APP_API_URL` when API calls fail.

## License

Specify project license here (e.g., MIT) or consult repository owner.

---

If you want, I can:

- Add a short development checklist (lint, tests) or
- Commit this README to the repo and open a PR.
