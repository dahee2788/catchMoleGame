module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "ignorePatterns": ["dist/", "node_modules/", ".eslintrc.js", "webpack.config.js"],
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
};
