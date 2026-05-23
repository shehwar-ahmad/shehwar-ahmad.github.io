import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import betterTailwind from "eslint-plugin-better-tailwindcss";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Tailwind v4 lint rules: catches verbose arbitrary classes when a shorthand
  // exists, duplicate/conflicting classes, unknown classes, etc.
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    plugins: { "better-tailwindcss": betterTailwind },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/app/globals.css",
      },
    },
    rules: {
      ...betterTailwind.configs.recommended.rules,
      // Class sorting is handled by prettier-plugin-tailwindcss, so disable the
      // ESLint sorter to avoid duplicate work and conflicts.
      "better-tailwindcss/enforce-consistent-class-order": "off",
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
    },
  },

  // Disable rules that conflict with Prettier (must be last).
  prettierConfig,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
