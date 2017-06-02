const readline = require('readline');
const stockManager = require('./stock-manager');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  switch (input) {
    case 'coke':
      console.log(stockManager.getCoke());
      break;
    default:
      console.log('unknown beverage');
  }
});


// process.on('uncaughtException', (err) => {
//   console.error(err);
// });