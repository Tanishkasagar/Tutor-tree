module.exports = {
  root: true,  // Specifies that this is the root ESLint configuration and no parent configuration should be applied
  env: { 
    browser: true,  // Defines the environment as browser, which makes browser-specific global variables available
    es2020: true,   // Specifies ECMAScript 2020 globals should be available
  },
  extends: [
    'eslint:recommended',  // Extends the recommended set of rules provided by ESLint
    'plugin:react/recommended',  // Extends the recommended set of React-specific rules from eslint-plugin-react
    'plugin:react/jsx-runtime',  // Extends the rules for the new JSX transform introduced in React 17
    'plugin:react-hooks/recommended',  // Extends the recommended rules for React Hooks
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],  // Excludes the 'dist' folder and '.eslintrc.cjs' from linting
  parserOptions: { 
    ecmaVersion: 'latest',  // Specifies the latest ECMAScript version for parsing
    sourceType: 'module',   // Allows the use of ES modules (import/export)
  },
  settings: { 
    react: { 
      version: '18.2'  // Specifies the React version (18.2) to lint for
    } 
  },
  plugins: ['react-refresh'],  // Includes 'react-refresh' plugin for hot module reloading in development
  rules: {
    'react/jsx-no-target-blank': 'off',  // Disables the rule that warns about using `target="_blank"` without `rel="noopener"`
    'react-refresh/only-export-components': [
      'warn',  // Gives a warning if non-component exports are used when using React Refresh
      { allowConstantExport: true },  // Allows constant exports even when this rule is enabled
    ],
  },
}
