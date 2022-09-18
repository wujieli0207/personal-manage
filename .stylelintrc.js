module.exports = {
  root: true,
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-html',
  rules: {
    // 百分比声明为数字 rgb(0 0 0 / 0.1)
    'alpha-value-notation': 'number',
    // 空规则保持空行间隔
    'at-rule-empty-line-before': 'never',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'content',
          'each',
          'error',
          'extend',
          'for',
          'function',
          'if',
          'include',
          'mixin',
          'return',
          'while',
        ],
      },
    ],
    // 颜色表示方式以逗号分隔：rgb(0, 0, 0)
    'color-function-notation': 'legacy',
    // 不允许非法的 hex 颜色表示方式：#fff
    'color-no-invalid-hex': true,
    'comment-empty-line-before': 'never',
    // 不允许多行声明
    'declaration-colon-newline-after': null,
    // 每个属性之间没有空行
    'declaration-empty-line-before': 'never',
    // 不允许 linear-gradient() 存在不符合标准的方向
    'function-linear-gradient-no-nonstandard-direction': true,
    // https://stylelint.io/user-guide/rules/list/no-descending-specificity
    'no-descending-specificity': null,
    // 允许空文件
    'no-empty-source': null,
    // 结尾允许存在空行
    'no-missing-end-of-source-newline': null,
    // 小数必须以 0 开头
    'number-leading-zero': 'always',
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        },
        {
          type: 'at-rule',
          name: 'media',
        },
        'rules',
      ],
      { severity: 'warning' },
    ],
    // 允许存在空行
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
  },
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  overrides: [
    {
      files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
      extends: ['stylelint-config-recommended', 'css-properties-sorting'],
    },
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less',
      extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
    },
  ],
}
