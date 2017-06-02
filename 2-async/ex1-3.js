const askJacquesThePassword = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('the-secret'), 1000);
  });

};

const askPierreACandy = (password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === 'the-secret') {
        resolve('the candy');
      } else {
        resolve('nothing');
      }
    }, 1000);
  });
};

async function main() {
  const password = await askJacquesThePassword();
  const candy = await askPierreACandy(password);
  console.log(candy);
}

main();
