import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const config = [
  js.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "react/jsx-uses-vars": "error", // sprečava lažnu unused var grešku za JSX
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default config;
