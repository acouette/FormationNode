const balances = require('./account-balances.json');
const _ = require('lodash');

const getBalanceByCardNumber = cardNumber=> _.find(balances, {cardNumber});

module.exports = {

    getBalance: cardNumber => getBalanceByCardNumber(cardNumber).balance,
    withDrawAmount: (cardNumber, amount) => getBalanceByCardNumber(cardNumber).balance -= amount
};