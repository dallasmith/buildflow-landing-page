module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    // Prevent inline string literals in landing page components
    'react/jsx-no-literals': [
      'warn',
      {
        noStrings: true,
        ignoreProps: true,
        allowedStrings: ['BuildFlow™', '™'], // Allow trademark symbol
      },
    ],
    // Ensure proper React usage
    'react/react-in-jsx-scope': 'off', // Not needed in Next.js
    'react/prop-types': 'off', // Using TypeScript
    'react/display-name': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      // Apply stricter rules to landing page components
      files: [
        'components/**/*.{ts,tsx}',
        'content/**/*.{ts,tsx}',
        'js/**/*.{ts,tsx}',
      ],
      rules: {
        'react/jsx-no-literals': [
          'error', // Upgrade to error for critical files
          {
            noStrings: true,
            ignoreProps: true,
            allowedStrings: ['BuildFlow™', '™'],
          },
        ],
      },
    },
  ],
};
