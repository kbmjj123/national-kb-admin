module.exports = {
  "extends": ["stylelint-config-standard", "stylelint-prettier/recommended"],
  "customSyntax": "postcss-less",
  "plugins": ["stylelint-less", "stylelint-prettier"],
  "rules": {
    "prettier/prettier": true
  }
};