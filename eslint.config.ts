import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "generated/**",
      "migrations/**",
      ".env",
      ".env.*",
    ],
  },

  eslint.configs.recommended,

  tseslint.configs.recommended,

  {
    files: ["**/*.ts"],

    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "error",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],

      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-process-exit": "error",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "object-shorthand": ["error", "always"],
      "prefer-template": "error",
    },
  },

  prettier,
);
