const balances = require('./account-balances.json');


module.exports = {

    getBalance: cardNumber => balances[cardNumber].balance,
    withDrawAmount: (cardNumber, amount) => balances[cardNumber].balance -= amount
};