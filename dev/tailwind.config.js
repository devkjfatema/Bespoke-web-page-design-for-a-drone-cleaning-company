/** Used only to (re)generate css/style.css — not needed to run the site. */
module.exports = {
  content: ['../index.html', '../js/main.js'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--ink-2) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        steel: 'rgb(var(--steel) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        signal: 'rgb(var(--signal) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        frame: '1296px',
      },
    },
  },
}
