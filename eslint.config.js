const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.commonjs,
                global: "writable"
            },
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "no-console": "off"
        }
    }
];
