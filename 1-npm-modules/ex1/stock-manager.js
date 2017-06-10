let stock = require('./stock').cokes;

exports.getCoke = () => {
    if (stock) {
        return stock--
    } else {
        throw new Error('no more cokes !!!')
    }
};



