const initialStock = require('./stock');
const expect = require('chai').expect;

let currentStock = initialStock;

module.exports = {
  getCoke: () => {
    expect(currentStock.cokes).to.be.above(0);
    currentStock.cokes--;
    return 'here';
  }

};



