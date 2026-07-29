import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,

  {
    files: ['scripts/**/*.js'],

    languageOptions: {
      ecmaVersion: 'latest',

      sourceType: 'module',

      globals: {
        ...globals.browser,
      },
    },

    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      eqeqeq: 'error',
      curly: 'error',
      'prefer-const': 'error',
    },
  },
];
