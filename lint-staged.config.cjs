// lint-staged.config.js
module.exports = {
    '*.{js, ts, tsx, vue}': [
        'eslint --fix',
        'prettier --write',
        'git add'
    ],
    '*.{css, less}': [
        'stylelint --fix',
        'prettier --write',
        'git add'
    ],
    '*.{json, md}': [
        'prettier --write',
        'git add'
    ]
}