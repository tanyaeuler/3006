/** @type {import('tailwindcss').Config} */

// Every colour here points at a CSS variable declared in src/styles/theme.css.
// Re-skinning the site means editing that file, not this one.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: 'var(--brand-olive)',
          dark: 'var(--brand-olive-dark)',
          mid: 'var(--brand-olive-mid)',
          light: 'var(--brand-olive-light)',
          wash: 'var(--brand-olive-wash)',
        },
        blush: {
          DEFAULT: 'var(--brand-blush)',
          light: 'var(--brand-blush-light)',
          wash: 'var(--brand-blush-wash)',
        },
        brown: {
          DEFAULT: 'var(--brand-brown)',
          mid: 'var(--brand-brown-mid)',
          dark: 'var(--brand-brown-dark)',
        },
        cream: 'var(--brand-cream)',
        ink: 'var(--brand-ink)',
        muted: 'var(--brand-muted)',
        line: 'var(--brand-line)',
        raised: 'var(--surface-raised)',
        'on-deep': 'var(--text-on-deep)',
        'on-deep-muted': 'var(--text-on-deep-muted)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
      },
      maxWidth: {
        container: 'var(--container-max)',
        measure: 'var(--measure)',
      },
      letterSpacing: {
        eyebrow: 'var(--tracking-eyebrow)',
        display: 'var(--tracking-display)',
      },
    },
  },
  plugins: [],
}
