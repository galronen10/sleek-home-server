// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals';
import tseslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import { fileURLToPath } from 'url';
import path from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import { globalIgnores } from 'eslint/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config([
  globalIgnores(['dist']),
  {
        files: ['**/*.{ts,tsx}'],
  extends: [
      eslintPluginPrettierRecommended,
      eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...compat.plugins('nestjs'),
  ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier: eslintPluginPrettier,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    settings: {
      'import/extensions': ['.js', '.ts'],
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      'no-restricted-syntax': 'off',
      'no-use-before-define': 'off',
      'lines-between-class-members': 'off',
      'prettier/prettier': 'warn',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'no-underscore-dangle': 'off',
      'consistent-return': 'off',
      'no-param-reassign': 'off',
      camelcase: 'off',
    },
  }]
);
