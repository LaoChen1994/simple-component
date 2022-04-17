module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  settings: {
    react: {
      pragma: "React",
      fragment: "Fragment",
      version: "detect"
    }
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "lastest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error"
  }
};
