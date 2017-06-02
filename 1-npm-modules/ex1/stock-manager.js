const initialStock = require('./stock');
const assert = require('assert');

let currentStock = initialStock;

module.exports = {
  getCoke: () => {
    assert(currentStock.cokes > 0, 'no coke left');
    currentStock.cokes--;
    return 'here';
  }

};



