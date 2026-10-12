# Asset Cleaning page — plain HTML / CSS / JS

Open `index.html` in a browser (or serve the folder with any static server). No build step, no Node needed.

- `index.html` — all sections (header, hero, 01–06, footer)
- `css/style.css` — compiled stylesheet (Tailwind utilities + the original custom CSS)
- `js/main.js` — mobile menu, hero video play/pause, enquiry form validation / sending / success states
- `assets/` — images and hero video
- `dev/` — optional: Tailwind config + source CSS, only if you want to regenerate `css/style.css`
  (`cd dev && npm i && npm run build:css`)
