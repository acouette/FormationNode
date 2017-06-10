const assert = require('assert');

const askJacquesThePassword = (callback) => {
  setTimeout(() => callback(null, 'the-secret'), 1000);
};

const askPierreACandy = (password, callback) => {
  setTimeout(() => {
    if (password === 'the-secret') {
      callback(null, 'the candy');
    } else {
      callback(new Error('invalid password'));
    }
  }, 1000);
};

askJacquesThePassword((err, password) => {
  assert.equal(err, null);
  askPierreACandy(password, (err, response) => {
    assert.equal(err, null);
    console.log(response);
  })
});