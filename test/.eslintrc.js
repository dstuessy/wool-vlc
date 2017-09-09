module.exports = {
    globals: {
        describe: false,
        before: false,
        it: false,
    },
    rules: {
        'import/no-extraneous-dependencies': ['error', {
            'devDependencies': ['**/*.test.js', '**/*.spec.js'],
        }],
    },
};
