module.exports = {
    root: true,
    extends: "eslint:recommended",
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jquery: true
    },
    globals: {},
    rules: {
        "eol-last": ["error", "always"],
        "func-style": "off",
        "global-require": "off",
        "linebreak-style": ["error", "unix"],
        "linebreak-style": ["error", "windows"],
        "no-bitwise": "off",
        "no-plusplus": "off",
        "no-unneeded-ternary": "off",
        "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "prefer-const": "off",
        "prefer-spread": "off",
        indent: ["error", 4, { SwitchCase: 1 }],
        quotes: ["error", "double"],
        quotes: [2, "single", "avoid-escape"],
        radix: ["error", "always"],
        semi: ["error", "always"],
        strict: ["error", "global"]
    },
    settings: {
        "import/resolver": {
            "babel-module": {}
        }
    }
};
