const Wool = require('wool');
const packageConfig = require('../package.json');

module.exports = class WoolVlc extends Wool {
    constructor() {
        super();

        this.module = {
            name: packageConfig.name,
            traits: [],
        };
    }
};
