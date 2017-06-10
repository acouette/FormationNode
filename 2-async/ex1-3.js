const askJacquesThePassword = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('the-secret2'), 1000);
    });

};

const askPierreACandy = (password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (password === 'the-secret') {
                resolve('the candy');
            } else {
                reject('nothing');
            }
        }, 1000);
    });
};

async function main() {
    try {
        const password = await askJacquesThePassword();
        const candy = await askPierreACandy(password);
        console.log(candy);
    } catch (e) {
        console.error(e);
    }
}

main();
