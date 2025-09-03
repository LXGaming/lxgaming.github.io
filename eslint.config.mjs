// @ts-check

import eslint from "@eslint/js";
import next from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";
import _import from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked
  ],
  ignores: [
    ".next/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "out/**",
    "eslint.config.mjs",
    "next-env.d.ts",
    "postcss.config.mjs"
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname
    }
  },
  plugins: {
    "@next/next": next,
    "@stylistic": stylistic,
    "import": _import
  },
  rules: {
    ...next.configs["recommended"].rules,
    ...next.configs["core-web-vitals"].rules,
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
    "linebreak-style": "off",
    "max-len": ["off"],
    "new-cap": ["warn"],
    "no-constant-condition": ["off"],
    "no-restricted-imports": "off",
    "no-undef": ["off"],
    "object-curly-spacing": ["error", "always"],
    "operator-linebreak": ["error", "before"],
    "padded-blocks": ["off"],
    "quotes": ["error", "double"],
    "require-jsdoc": ["off"],
    "sort-imports": ["error", {
      "ignoreDeclarationSort": true
    }],
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
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/strict-boolean-expressions": "error"
  }
});