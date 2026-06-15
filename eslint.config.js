import nextVitals from "eslint-config-next/core-web-vitals";

export default [
  // Global ignores must live in their own object with no other keys. If `ignores`
  // shares an object with `rules`, ESLint treats it as a *non-global* ignore that
  // only filters that object — the spread `...nextVitals` configs still lint these
  // paths. That gotcha let minified `dist/` output reach the linter (33 false errors).
  {
    ignores: [
      "dist/**",
      "backend/**",
      "temp_cache/**",
      "src/legacy_pages/**",
      ".claude/**",
    ],
  },
  ...nextVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];
