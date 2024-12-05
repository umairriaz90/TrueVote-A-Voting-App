import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import next from 'eslint-config-next';

export default tseslint.config(
  { ignores: ['.next', 'out'] },
  {
    extends: [
      js.configs.recommended, 
      ...tseslint.configs.recommended,
      next.configs.recommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  }
);
