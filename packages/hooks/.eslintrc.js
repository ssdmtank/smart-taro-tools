module.exports = {
  extends: ['taro/react', 'prettier'],
  env: {
    // 要在配置文件里指定环境，使用 env 关键字指定你想启用的环境，并设置它们为 true
    browser: true,
    node: true,
    mocha: true,
    es6: true,
    commonjs: true,
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/no-commonjs': 'off',
    'consistent-return': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'import/no-useless-path-segments': 'off',
    'no-unused-expressions': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'no-await-in-loop': 'off',
    'no-constant-condition': ['warn', { checkLoops: false }],
  },
}
