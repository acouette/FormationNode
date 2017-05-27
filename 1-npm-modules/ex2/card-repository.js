const cards = require('./cards');
module.exports = {

    doesCardExist: cardNumber => !!cards[cardNumber],

    isCodeOk: (cardNumber, code) => cards[cardNumber].code === code,

    isCardLocked: cardNumber => cards[cardNumber].locked,

    lockCard: cardNumber => cards[cardNumber].locked = true

};