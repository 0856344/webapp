module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/essential', 'standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'vue/no-mutating-props': 0,
    'vue/no-side-effects-in-computed-properties': 1,
    'no-unused-vars': 1,
    'spaced-comment': 0,
    'no-trailing-spaces': 0,
    indent: 1,
    'padded-blocks': 1
  }
}
