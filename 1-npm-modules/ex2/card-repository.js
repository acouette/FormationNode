const cards = require('./cards');
const _ = require('lodash');

const getCardByNumber = number=> _.find(cards, {number: number});

module.exports = {

    doesCardExist: cardNumber => false,

    isCodeOk: (cardNumber, code) => false,

    isCardLocked: cardNumber => false,

    lockCard: cardNumber => {}

};