module.exports = function once(fn) {
    let invoked = false;
    return (...args) => {
        if (!invoked) {
            invoked = true;
            return fn(...args);
        }
        return undefined;
    };
};
