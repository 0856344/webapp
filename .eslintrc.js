module.exports = {
  env: {
    //this is needed for the "process.something" variables that we use to check for client-side code
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // nuxt functions that have ( { vars } ) as parameters will be ignored
    "no-unused-vars": ["error", { args: "none" }],
    // the rule makes sense, but renaming all components that currently violate the rule may cause issues
    "vue/multi-word-component-names": 0,
    //we are violating this rule in a few places ("marquee", "spacer") just keep it in mind for future components
    "vue/no-reserved-component-names": 1,
    //this allows things like propName.someAttribute = "someValue" which we do quite often, maybe not do this in the future
    "vue/no-mutating-props": ["error", { shallowOnly: true }],
  },
  //lint script also takes .gitignore into account
  ignorePatterns: ["functions/", "lambda/"],
};
