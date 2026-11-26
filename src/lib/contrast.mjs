// WCAG 2.x contrast of the brand tokens (I-05). The text/background pairs the
// site uses are listed here, by --fi-* token, and the test checks each one is
// >= 4.5:1 in the light and the dark theme of src/assets/brand/tokens.css.
// A new role in src/styles/global.css that puts text on a background adds its
// pair here.

/** Text token on background token, as used by the roles in global.css. */
export const TEXT_PAIRS = [
  ['ink', 'bg'], // body text
  ['ink', 'c0'], // text on a card (surface)
  ['ink', 'b1'], // tag text (surface-strong)
  ['muted', 'bg'],
  ['muted', 'c0'],
  ['muted', 'b1'],
  ['accent', 'bg'], // links, secondary button
  ['accent', 'c0'], // links on a card
  ['bg', 'accent'], // primary button text
];

/** Reads the light (:root) and dark ([data-theme="dark"]) --fi-* colors. */
export function parseTokens(css) {
  const block = (re) => {
    const match = css.match(re);
    if (!match) throw new Error(`token block not found: ${re}`);
    return Object.fromEntries(
      [...match[1].matchAll(/--fi-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map(([, name, hex]) => [name, hex]),
    );
  };
  return {
    light: block(/^:root\s*\{([^}]*)\}/m),
    dark: block(/:root\[data-theme="dark"\]\s*\{([^}]*)\}/),
  };
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.x contrast ratio of two #rrggbb colors. */
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
