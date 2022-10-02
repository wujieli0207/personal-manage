module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // 关闭不允许使用 any
    '@typescript-eslint/no-explicit-any': 'off',
    // 关闭组件必须由多个单词命名
    'vue/multi-word-component-names': 'off',
    // 关闭禁止使用 ts 备注
    '@typescript-eslint/ban-ts-comment': 'off',
    // 关闭禁止使用非空断言
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 可以使用 _ 开头定义不使用的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        vueIndentScriptAndStyle: false,
      },
    ],
  },
}
