import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import babelParser from "@babel/eslint-parser";

const pluginOptions = {
  prettier: prettierPlugin,
  "import/parsers": babelParser,
};

const languageOptions = {
  globals: {
    ...globals.node,
  },
  ecmaVersion: "latest",
  sourceType: "module",
  parser: babelParser,
  parserOptions: {
    requireConfigFile: false,
  },
};

// export default [
//   {
//     languageOptions: {
//       ...languageOptions,
//     },
//     plugins: {
//       ...pluginOptions,
//     },
//     rules: {
//       "@typescript-eslint/no-explicit-any": "off",
//     },
//     // files: ["src/**/*.ts"],
//     // ignores: ["node_modules/**", "dist/**"]
//   },

//   eslint.configs.recommended,
//   ...tseslint.configs.recommended,

// ];

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.base, {
  languageOptions: {
    ...languageOptions,
  },
  plugins: {
    ...pluginOptions,
  },
  // rules: {
  //   "@typescript-eslint/no-explicit-any": "off",
  // },
  // files: ["src/**/*.ts"],
  // ignores: ["node_modules/**", "dist/**"]
});
