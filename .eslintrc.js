module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'quotes': 'off',
        'semi': 'off',
        'no-irregular-whitespace': 'off',
        'comma-dangle': 'off',
        'indent': ["off", 2] ,
        'space-before-function-paren' : 0,
        "no-eval": 2,
        "no-new-func": 2,
    }
}
