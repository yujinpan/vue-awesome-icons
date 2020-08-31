/**
 * eslint 校验代码
 * [eslint rules](http://eslint.cn/docs/rules/)
 */
module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],

  rules: {
    'prettier/prettier': [
      'error',
      // 这里自定义 prettier 的规则
      {
        singleQuote: true,
        arrowParens: 'always',
        semi: true
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    eqeqeq: ['error', 'always']
  },

  parserOptions: {
    parser: 'babel-eslint'
  }
};
