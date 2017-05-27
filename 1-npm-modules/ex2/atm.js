const cardRepository = require('./card-repository');
const accountBalanceManager = require('./account-balance-manager');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const error = (errorMessage)=> {
    console.error(errorMessage);
    start();
};

const start = ()=> {
    rl.question('Enter your credit card number ', (cardNumber) => {

        if (!cardRepository.doesCardExist(cardNumber)) {
            error('this card does not exit');
        } else if (cardRepository.isCardLocked(cardNumber)) {
            error('this card is locked');
        } else {
            rl.question('Enter your secret number ', (secretNumber) => {
                    if (!cardRepository.isCodeOk(cardNumber, secretNumber)) {
                        cardRepository.lockCard(cardNumber);
                        error('wrong code your card is locked');
                    } else {
                        rl.question('How much money do you want ?', amount => {
                            const initialBalance = accountBalanceManager.getBalance(cardNumber);
                            if (initialBalance < amount) {
                                error("not enough money");
                            } else {
                                accountBalanceManager.withDrawAmount(cardNumber, amount);
                                const currentBalance = accountBalanceManager.getBalance(cardNumber);
                                console.log(`here is your money : ${amount}`);
                                console.log(`you had : ${initialBalance}, and now you have ${currentBalance}`);
                                start();
                            }
                        });
                    }

                }
            );
        }
    });
};


start();





