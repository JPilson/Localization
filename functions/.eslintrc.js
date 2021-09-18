module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": 0,
    "import/no-unresolved": 0,
    "no-empty-function": 0,
    "no-unused-vars": 0,
    "require-jsdoc": 0,
    "eol-last": 0,
    "indent": 0,
    "new-cap": 0,
    "max-len": 0,
    "space-before-blocks": 0,
    "keyword-spacing": 0,
    "curly": 0,
    "padded-blocks": 0,
    "no-trailing-spaces": 0,
  },
};