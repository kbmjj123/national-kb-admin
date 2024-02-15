// lint-staged.config.js
module.exports = {
    '*.ts': ['lint:eslint --cache --fix', 'git add'],
    '*.vue': ['lint:eslint --cache --fix', 'git add'],
}