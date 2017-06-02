const askJacquesThePassword = (callback) => {
  setTimeout(() => callback('the-secret'), 1000);
};

const askPierreACandy = (password, callback) => {
  setTimeout(() => {
    if (password === 'the-secret') {
      callback('the candy');
    } else {
      callback('nothing');
    }
  }, 1000);
};

askJacquesThePassword((password) => {
  askPierreACandy(password, (response => {
    console.log(response);
  }))
});