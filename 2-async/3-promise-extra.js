const fs = require('fs-extra');

fs.readFile('package.json', 'utf-8')
  .then(content => fs.writeFile('copy.json', content))
  .then(() => fs.rename('copy.json', 'moved-copy.json'))
  .catch(console.error);