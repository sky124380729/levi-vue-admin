module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser', // Specifies the ESLint parser
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            // tsx: true, // Allows for the parsing of JSX
            jsx: true
        }
    },
    // settings: {
    //   tsx: {
    //     version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    //   }
    // },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'vue/custom-event-name-casing': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^h$',
                varsIgnorePattern: '^h$'
            }
        ],
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^h$',
                varsIgnorePattern: '^h$'
            }
        ],
        'space-before-function-paren': 'off',
        // html自关闭
        'vue/html-self-closing': 'off',
        // html缩进，默认是2个
        'vue/html-indent': 'off',
        // html html-元素新的行显示
        'vue/singleline-html-element-content-newline': 'off',
        // 属性一行可以放几个
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 5,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        // 页面name值定义方式
        'vue/component-definition-name-casing': 'off',
        // vue props给默认值
        'vue/require-default-prop': 'off',
        // vue 模板属性配置
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 10,
                multiline: {
                    max: 10,
                    allowFirstLine: false
                }
            }
        ]
    }
}
