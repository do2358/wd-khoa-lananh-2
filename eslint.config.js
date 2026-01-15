// @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';
import perfectionist from 'eslint-plugin-perfectionist';

export default [
  ...tanstackConfig,
  {
    name: 'tanstack/javascript',
    plugins: {
      perfectionist,
    },
    rules: {
      '@typescript-eslint/array-type': 'off',
      'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'no-unsafe-optional-chaining': 'warn',
      'no-empty-pattern': 'off',

      // Disable import/order to avoid conflicts
      'import/order': 'off',
      // Use perfectionist for import ordering with auto-fix
      'perfectionist/sort-imports': [
        'warn',
        {
          type: 'natural',
          order: 'asc',
          ignoreCase: true,
          internalPattern: ['^@/.*'],
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'type'],
        },
      ],

      // Sort JSX props alphabetically
      'perfectionist/sort-jsx-props': [
        'warn',
        {
          type: 'natural',
          order: 'asc',
          ignoreCase: true,
          groups: ['group-key-id', 'unknown', 'group-data', 'group-className', 'group-props', 'group-callback'],
          customGroups: [
            { groupName: 'group-key-id', elementNamePattern: '^(key|id|name|label)|(^.+Id$)' },
            { groupName: 'group-data', elementNamePattern: '^data|.+Data$' },
            { groupName: 'group-className', elementNamePattern: '^className' },
            { groupName: 'group-callback', elementNamePattern: '^set.+|^on.+' },
            { groupName: 'group-props', elementNamePattern: '.+Props$' },
          ],
        },
      ],
    },
  },
];
