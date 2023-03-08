// https://stackoverflow.com/questions/53189200/whats-the-difference-between-plugins-and-extends-in-eslint
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'airbnb/hooks',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],

  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parserOptions: {
    createDefaultProgram: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    // TS
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/naming-convention': 0,

    // React
    'react-hooks/exhaustive-deps': 0,
    'react/jsx-curly-spacing': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0, // Since we do not use prop-types

    // jsx-a11y
    'jsx-a11y/anchor-is-valid': 0,

    // Prettier
    'prettier/prettier': [
      2,
      {
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        printWidth: 80,
        bracketSpacing: true,
        useTabs: false,
        cssEnable: ['css', 'less', 'scss'],
        javascriptEnable: ['javascript', 'javascriptreact'],
        typescriptEnable: ['typescript', 'typescriptreact'],
        graphqlEnable: ['graphql'],
      },
    ],

    // Import
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
      },
    ],
    'import/no-cycle': 1,
    'import/prefer-default-export': 0,

    // Default
    'no-else-return': 'off',
    'linebreak-style': 0,
    'object-curly-spacing': [2, 'always'],
    'no-debugger': 0,
  },
};
