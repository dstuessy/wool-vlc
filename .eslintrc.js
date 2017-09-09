module.exports = {
    extends: 'airbnb-base',
    rules: {
        indent: ['error', 4, { MemberExpression: 0 }],
        'no-param-reassign': ['off'],
    },
};
