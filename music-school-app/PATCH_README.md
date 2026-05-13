# Tailwind v4 / Windows Path Fix

## Problem
Tailwind CSS v4 and `@tailwindcss/postcss` convert file paths to `file://` URLs internally.
On Windows, if the username contains `#` (e.g., `#iamhashtag`), the URL parser treats `#`
as a fragment delimiter, corrupting the path with a null byte (`\x00`).

## Applied Patches (node_modules)

These patches are applied directly to node_modules and **must be re-applied after `npm install`**.

### 1. `node_modules/@tailwindcss/node/dist/index.js`
- Stripped null bytes from resolved path `o` before `readFile(o, "utf-8")`

### 2. `node_modules/@tailwindcss/postcss/dist/index.js`
- Stripped null bytes from dependency paths `u` and `w` before `statSync(w, ...)`

## CSS Import Workaround
`app/globals.css` uses local copies instead of package imports:
- `@import "./tw-base.css"` ← copy of `node_modules/tailwindcss/index.css`
- `@import "./tw-animate-local.css"` ← copy of `node_modules/tw-animate-css/dist/tw-animate.css`
- `@import "./shadcn-local.css"` ← copy of `node_modules/shadcn/dist/tailwind.css`

## After `npm install` / reinstall
Re-run the patches with the scripts in `scripts/patch-tailwind.js` (or re-apply manually).
