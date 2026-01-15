// @ts-check

import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  globalIgnores([
    ".next/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "out/**",
    "eslint.config.mjs",
    "next-env.d.ts",
    "postcss.config.mjs"
  ]),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      "@stylistic": stylistic,
      "import": importPlugin
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/member-delimiter-style": "error",
      "@stylistic/no-extra-semi": "error",
      "@stylistic/semi": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-restricted-imports": ["error", {
        "patterns": [
          {
            "group": ["./*", "../*"],
            "message": "Please use absolute import instead."
          }
        ]
      }],
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^props$"
      }],
      "@typescript-eslint/strict-boolean-expressions": "error",
      "arrow-parens": ["error", "as-needed"],
      "comma-dangle": ["error", "never"],
      "eol-last": ["error", "never"],
      "eqeqeq": ["error", "always", {
        "null": "never"
      }],
      "import/order": ["error", {
        "alphabetize": {
          "order": "asc"
        },
        "newlines-between": "never"
      }],
      "new-cap": ["warn"],
      "object-curly-spacing": ["error", "always"],
      "operator-linebreak": ["error", "before"],
      "quotes": ["error", "double"],
      "sort-imports": ["error", {
        "ignoreDeclarationSort": true
      }]
    }
  }
]);

export default eslintConfig;