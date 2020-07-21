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
