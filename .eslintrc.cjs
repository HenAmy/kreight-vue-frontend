/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/support/**/*.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  // rules: {
  //   // allow debugger during development
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'vue/no-use-v-if-with-v-for': 'off',
  // },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
