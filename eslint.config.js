const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: false,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'family-planning:application',
              onlyDependOnLibsWithTags: ['family-planning:domain'],
            },
            {
              sourceTag: 'family-planning:domain',
              onlyDependOnLibsWithTags: ['family-planning:domain'],
            },
            {
              sourceTag: 'family-planning:infrastructure',
              onlyDependOnLibsWithTags: [
                'family-planning:domain',
                'family-planning:application'
              ],
            },
            {
              sourceTag: 'family-planning:api',
              onlyDependOnLibsWithTags: [
                'family-planning:application',
                'family-planning:infrastructure',
                'family-planning:domain',
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
