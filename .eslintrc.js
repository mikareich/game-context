module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "eslint-plugin-jest"],
  rules: {
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-underscore-dangle": "off",
  },
  ignorePatterns: ["/lib"],
};
