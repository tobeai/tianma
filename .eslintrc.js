module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    // '@vue/prettier',
  ],
  plugins: [
    'import',
    'vue',
  ],
  globals: {
    window: false,
    document: false,
    expect: true,
    sinon: true,
    Blob: false,
    URL: false,
    isNaN: false,
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    // https://yepbug.com/2018/08/28/what-is-the-benefit-of-prefer-default-export/
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/README.md
    'import/prefer-default-export': 'off', // 输出只有一个变量时使用 export default
    // 因为 mac 系统默认不区分大小写, 所以建议使用全小写, 包含文件名 文件夹名 组件名(html 特性也不区分大小写)
    'vue/name-property-casing': ['error', 'PascalCase'], // 'PascalCase' |'kebab-case'
    'vue/max-attributes-per-line': ['error', {
      'singleline': 4,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    }],
    'vue/multiline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'vue/no-template-shadow': 'off', // temp
    // 'vue/no-unused-components': '1',
    'vue/order-in-components': 'off', // temp
    'vue/require-component-is': 'off', // 这个属性误报
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'ignore',
        objects: 'ignore',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    // 'max-len': [
    //   'error',
    //   {
    //     code: 120,
    //     ignoreUrls: true,
    //     ignorePattern: true,
    //   },
    // ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-else-return': 'off',
    'no-mixed-operators': 'off',
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: true,
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 1,
      },
    ],
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': [
      'off',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-restricted-syntax': 'off',
    'no-shadow': [
      'error',
      {
        allow: [
          'res',
          'data',
          'err',
          'cb',
          'state',
          'resolve',
          'reject',
          'done',
        ],
      },
    ],
    'no-trailing-spaces': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-vars': 'off',
    // 'no-unused-vars': [
    //   'error',
    //   {
    //     vars: 'all',
    //     // args: 'after-used',
    //     args: 'none',
    //     caughtErrors: 'none',
    //     ignoreRestSiblings: true,
    //   },
    // ],
    'no-use-before-define': 'off',
    'no-useless-escape': 'off',
    'prefer-template': 'off',
    'prefer-arrow-callback': 'off',
    'quotes': ['error', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true,
    }],
    'require-yield': [1],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'ignore',
        asyncArrow: 'ignore',
      },
    ],
    semi: ['error', 'never'],
    'func-names': 'off',
    'consistent-return': 'off',
  },

}
