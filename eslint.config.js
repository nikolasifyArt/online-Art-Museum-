import globals from "globals";
import pluginJs from "@eslint/js";
import pluginTs from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import parser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
      "react": pluginReact,
    },
    rules: {
      // Add any custom rules here
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  pluginJs.configs.recommended,
  pluginTs.configs.recommended,
  pluginReact.configs.recommended,
];