module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    camelcase: ['error', { allow: ['rt_code', 'rt_msg'] }],
  },
  overrides: [
    {
      files: ['**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
    {
      files: ['src/components/**'],
      rules: {
        'vue/multi-word-component-names': 'error',
      }
    },
  ],
}
