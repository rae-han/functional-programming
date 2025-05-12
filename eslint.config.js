import js from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
      indent: ['error', 2],
      'newline-per-chained-call': [
        'error',
        { ignoreChainWithDepth: 4 },
      ],
    },
  },
];
