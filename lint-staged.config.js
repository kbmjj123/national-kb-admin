// lint-staged.config.js
export default {
  '*.ts': ['eslint --cache --fix', 'git add'],
  '*.vue': ['eslint --cache --fix', 'git add'],
}