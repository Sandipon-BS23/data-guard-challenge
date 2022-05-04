module.exports = {
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'prettier',
    ],
    rules: {
        // override/add rules settings here, such as:
        'vue/no-unused-vars': 'error',
        'no-console': 'warn',
        'no-debugger': 'warn',
        'vue/script-setup-uses-vars': 'warn',
        'vue/no-multiple-template-root': 0,

        'vue/v-slot-style': [
            'error',
            {
                atComponent: 'longform',
                default: 'longform',
                named: 'longform',
            },
        ],

        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
}
