module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "vitest-globals/env": true, // Add this for Vitest globals
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:testing-library/react", // Add this
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "vitest-globals"], // Add vitest-globals
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
