**Project Overview**

- **Type:** Single-page static website (HTML + CSS + JS).
- **Files of interest:** `index.html`, `script.js`, `style.css` (all at repository root).

**Big Picture / Architecture**
- The project is a minimal client-side form used to register courses. There is no build system, server-side code, or package manager.
- `index.html` contains the UI; checkboxes with class `subject` have numeric `value` attributes (e.g. `1000`, `1200`) — these are the only structured data points in the markup and are intended to be consumed by `script.js`.

**Important Codebase Quirks (discoverable issues you must preserve or fix intentionally)**
- `index.html` links to `css/style.css` but the repository contains `style.css` at the project root. Either update the link or create a `css/` directory and move the stylesheet.
- `index.html` contains small HTML typos that affect rendering and editing: `class=""container`, `</data>` closing tags inside list items, and a class spelled `suject-list`. Address these when modifying markup; prefer minimal, targeted fixes and explain changes in PR description.
- There is no `<script src="script.js">` tag in `index.html` — `script.js` exists but is empty. When adding behavior, add the script tag near `</body>`.

**Patterns & Examples (implementations to follow in this repo)**
- Event wiring: attach a single click handler to `#submitBtn` and read checked checkboxes by selector `input.subject:checked`.
  - Example (JS pattern to follow): `const total = [...document.querySelectorAll('input.subject:checked')].reduce((s, el) => s + Number(el.value), 0);`
- DOM targets: prefer the existing IDs and classes — use `#regform`, `#submitBtn`, `input.subject` and do not restructure the form unless necessary.

**Developer Workflows (how to run & debug)**
- No build step — open `index.html` in a browser for quick iteration. On Windows PowerShell, run a local static server from the project folder to avoid local file limitations (CORS, module fetch):
```powershell
python -m http.server 8000
# then open http://localhost:8000/index.html in your browser
```
- Quick open in default browser (PowerShell):
```powershell
Start-Process .\index.html
```

**Testing and Verification Guidance**
- Visual/manual testing is expected: verify that selecting subjects sums numeric `value` attributes and that the submit button triggers the intended UI feedback (alert, modal, or DOM update).
- When making changes, run in a browser and check the developer console for errors. There are no automated tests in the repo.

**Commit / PR guidance for AI agents**
- Make focused, minimal diffs. When fixing the link or HTML typos, include a short note: e.g. `Fix stylesheet path and close malformed tags`.
- If adding behavior to `script.js`, include an unobtrusive `DOMContentLoaded` wrapper and avoid global variable pollution.

**Integration / External Dependencies**
- None discovered. There are no external APIs or package manifests. Any external library should be added explicitly with rationale (and include instructions to host the dependency locally or via CDN).

**When in doubt**
- Prefer not to rename files unless you update all file references (HTML link/src attributes). Point out any ambiguity in PR description and ask a human reviewer for preference.

If you'd like, I can: (1) fix the obvious HTML typos and add a working `script.js` handler that totals checked subject values, or (2) change the stylesheet link to match the current `style.css`. Which should I do first?
