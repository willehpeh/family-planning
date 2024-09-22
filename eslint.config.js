const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'family-planning:domain',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'family-planning:application',
              onlyDependOnLibsWithTags: ['family-planning:domain'],
            },
            {
              sourceTag: 'family-planning:infrastructure',
              onlyDependOnLibsWithTags: [
                'family-planning:domain',
                'family-planning:application'
              ],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];
