module.exports = {
  extends: [
    'plugin:@sewing-kit/typescript',
    'plugin:@sewing-kit/react',
    'plugin:@sewing-kit/prettier',
    'plugin:@sewing-kit/jest',
  ],
  ignorePatterns: [
    'node_modules/',
    'packages/*/build/',
    'packages/*/*.d.ts',
    'packages/*/*.js',
    '!packages/*/.eslintrc.js',
    'packages/*/*.mjs',
    'packages/*/*.node',
    'packages/*/*.esnext',
    'packages/**/tests/fixtures/',
  ],
  rules: {
    'jest/valid-expect-in-promise': 'off',
    'import/extensions': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'node/no-extraneous-require': 'off',
    'import/no-cycle': 'off',
    'jest/require-tothrow-message': 'off',
    'callback-return': 'off',
    'func-style': 'off',
    'react/display-name': 'off',
    // reports false positives with React's useRef hook
    'require-atomic-updates': 'off',
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'import/no-extraneous-dependencies': 'error',
    // @shopify/typescript/prefer-pascal-case-enums
    // @shopify/react-prefer-private-members
    // @shopify/strict-component-boundaries
    // @shopify/jsx-prefer-fragment-wrappers
    // @sewing-kit overrides
    '@typescript-eslint/array-type': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/function-component-definition': 'off',
    'import/order': 'off',
    'default-param-last': 'off',
    'jest/no-deprecated-functions': 'off',
    'no-process-env': 'error',
  },
  overrides: [
    {
      files: [
        '**/test/**/*.ts',
        '**/test/**/*.tsx',
        '**/tests/**/*.ts',
        '**/tests/**/*.tsx',
        '**/sewing-kit.config.ts',
      ],
      rules: {
        // We disable `import/no-extraneous-dependencies` for test files because it
        // would force releases of `@shopify/react-testing` (and similar devDependencies)
        // to cause unnecessary package bumps in every package that consumes them.
        // Test files with extraneous dependencies won't cause runtime errors in production.
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
