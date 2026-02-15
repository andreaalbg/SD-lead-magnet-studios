# CLAUDE.md

This file provides guidance for AI assistants working with the SD Lead Magnet Studios codebase.

## Project Overview

A frontend-only React SPA that presents an AI-powered call interface with an integrated calendar sidebar. The app simulates a phone call UI (with Dr. Elena Vance) and embeds an ElevenLabs Conversational AI widget for real-time voice interaction. It serves as a lead magnet / demo for AI-powered call scheduling.

## Tech Stack

- **Framework:** React 19 (JSX, not TypeScript)
- **Bundler:** Vite 7
- **Styling:** Plain CSS with co-located files and CSS custom properties (design tokens)
- **Linting:** ESLint 9 (flat config)
- **Module system:** ES modules (`"type": "module"`)
- **External integration:** ElevenLabs ConvAI widget (loaded via script tag in `index.html`)

There is no backend, database, authentication, routing library, state management library, or test framework.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build to /dist
npm run lint      # Run ESLint across the project
npm run preview   # Preview the production build locally
```

## Project Structure

```
├── index.html                 # Entry HTML — loads Google Fonts + ElevenLabs widget script
├── vite.config.js             # Vite config (react plugin, default settings)
├── eslint.config.js           # ESLint flat config (JS/JSX, react-hooks, react-refresh)
├── package.json               # Only 2 runtime deps: react, react-dom
├── public/                    # Static assets served at root
│   └── vite.svg
└── src/
    ├── main.jsx               # React entry point (renders <App /> into #root)
    ├── App.jsx                 # Root component — renders CallInterface page
    ├── index.css               # Global styles and CSS custom properties (design tokens)
    ├── App.css                 # Unused (empty)
    ├── assets/
    │   └── react.svg
    ├── components/             # Reusable UI components (each with co-located .css)
    │   ├── AgentCard.jsx/.css      # Displays agent name, call duration, decorative glow
    │   ├── Calendar.jsx/.css       # Month-view calendar with event list
    │   ├── ControlButton.jsx/.css  # Generic call control button (mute, keypad, speaker)
    │   ├── EndCallButton.jsx/.css  # End-call CTA button
    │   ├── TextureOverlay.jsx/.css # Fixed SVG noise texture background
    │   └── TopBar.jsx/.css         # Status bar ("Encrypted Call" + signal indicator)
    └── pages/                  # Page-level components
        └── CallInterface.jsx/.css  # Main page — phone frame layout + calendar sidebar
```

## Architecture & Conventions

### Component patterns

- **Functional components only** with `export default function ComponentName()`.
- **Local state via React hooks** (`useState`, `useEffect`, `useCallback`, `useRef`, `useMemo`). No global state management.
- **Props destructured in function signature**: `function AgentCard({ label, name, time })`.
- **SVG icons defined as inline React components** within the file that uses them (see `CallInterface.jsx` for MicIcon, KeypadIcon, SpeakerIcon).

### File organization

- Each component lives in `src/components/` with a co-located CSS file of the same name.
- Page-level components live in `src/pages/`.
- One component per file. File name matches the component name (PascalCase).

### Styling

- **No CSS-in-JS, Tailwind, or preprocessors.** Plain CSS files only.
- **Design tokens** are CSS custom properties defined in `src/index.css`:
  - Colors: `--bg-cream`, `--text-dark`, `--card-green`, `--card-green-shadow`, `--accent-cyan`, `--accent-yellow`, `--btn-dark`, `--border-subtle`
  - Typography: `--font-display` (DM Serif Display), `--font-body` (DM Sans)
  - Spacing: `--space-xs` (8px), `--space-s` (16px), `--space-m` (24px), `--space-l` (32px), `--space-xl` (48px)
- **BEM-style class names** scoped per component (e.g., `.agent-card`, `.call-meta`, `.agent-name`).
- **Responsive breakpoints** (mobile-first):
  - `< 720px` — fullscreen mobile layout
  - `≥ 720px` — phone frame + calendar sidebar (tablet)
  - `≥ 960px` — scaled-up desktop
  - `≥ 1200px` — full-size large desktop

### ESLint rules

- Flat config format (ESLint 9).
- Extends: `js.configs.recommended`, `reactHooks.configs.flat.recommended`, `reactRefresh.configs.vite`.
- Custom rule: `no-unused-vars` errors but ignores variables starting with an uppercase letter or underscore (`varsIgnorePattern: '^[A-Z_]'`).
- Targets `**/*.{js,jsx}` files. Ignores `dist/`.

## Key Integration: ElevenLabs ConvAI

The ElevenLabs widget is loaded via a script tag in `index.html` and rendered as a custom element in `CallInterface.jsx`:

```jsx
<elevenlabs-convai agent-id="agent_4201kh8v5788eqt9m80z4ck63wfv" />
```

The agent ID is currently hardcoded. No environment variable system is configured.

## State Management

All state is local to components using React hooks:

- `CallInterface.jsx` — manages call timer (`seconds`), `muted`, `speakerOn`, `callActive`
- `Calendar.jsx` — manages `viewMonth`, `viewYear`, `selectedDay`
- Calendar event data is hardcoded in `SCHEDULED` array within `Calendar.jsx`

## Things to Know

- **No TypeScript** — the project uses plain JSX. Do not introduce `.ts`/`.tsx` files.
- **No tests** — there is no test framework or test files.
- **No Prettier** — only ESLint is configured for code quality.
- **No routing** — `App.jsx` directly renders `CallInterface`. There is no router.
- **No environment variables** — all config values (agent ID, event data) are hardcoded.
- **Minimal dependencies** — only `react` and `react-dom` are runtime dependencies. Avoid adding dependencies unless strictly necessary.
- **Google Fonts** (DM Sans, DM Serif Display) are loaded via `<link>` tags in `index.html`.
