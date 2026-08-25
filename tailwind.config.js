/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#17324D',
        cream: '#F4EFE6',
        rust: '#B85C38',
        // Darkened for text/icon use on cream — WCAG AA requires 4.5:1;
        // the brand rust (#B85C38) only reaches 3.96:1 as text, so buttons
        // and rust-colored labels use this instead. Decorative fills
        // (borders, accent bars) keep the true brand `rust`.
        'rust-ink': '#A45232',
        // Brightened just enough to clear 3:1 against both navy and cream,
        // for focus rings / underline accents that sit on either background.
        'rust-ui': '#CA653E',
        sage: '#6F8F72',
        // Darkened for text use on cream (same AA rationale as rust-ink).
        // Calibrated against the *tinted* surfaces it actually sits on
        // (sage/10 chips, navy/3% section backgrounds), not pure cream.
        'sage-ink': '#546C56',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}
