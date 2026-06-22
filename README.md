# Omar Hafez Portfolio v6

Personal portfolio website built with HTML, CSS, and JavaScript.

This version keeps the v5 content and project findings intact while improving source structure, accessibility details, defensive JavaScript, metadata, and local quality tooling.

## What Changed in v6

- Split the CSS into `css/base.css` and `css/components.css` so global tokens/resets are separated from layout and component styles
- Removed unused legacy CSS for hidden `now-*` and `crown-*` sections
- Moved Google Fonts loading from CSS `@import` to HTML `<link>` tags with preconnect hints
- Added canonical and `og:url` metadata for cleaner sharing and SEO
- Added an “Other Work” navigation anchor so the smaller project section is easier to reach
- Improved skill filter accessibility with `aria-pressed`, `aria-controls`, and cleaner filter-row semantics
- Improved the theme toggle with state-specific labels such as “Switch to light mode”
- Made theme storage access safer when `localStorage` is unavailable or blocked
- Increased text-link tap targets for better mobile usability
- Added lightweight npm scripts for formatting and JavaScript syntax checks

## Features

- Responsive layout for desktop and mobile
- Light/dark theme preference stored in the browser when available
- Keyboard-visible focus states, skip link, semantic sections, and reduced-motion support
- Mobile navigation, active-section highlighting, skill filtering, and copy-email interaction
- Open Graph metadata and local assets for share previews

## Run Locally

Open `index.html` in a browser, or use a simple local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Quality Checks

Install optional development tooling:

```bash
npm install
```

Run the JavaScript syntax check:

```bash
npm run check:js
```

Format source files:

```bash
npm run format
```

## Deployment

This is a static website and is ready for GitHub Pages. Push the project files to the repository used for `hafezomar.github.io`, then enable GitHub Pages in the repository settings if needed.
