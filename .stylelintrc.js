module.exports = {
    extends: [
        "stylelint-config-standard",
        "stylelint-config-rational-order",
        "stylelint-prettier/recommend",
    ],
    overrides: [{
        "files": ["**/*.scss"],
        "customSyntax": "postcss-scss"
    }]
}