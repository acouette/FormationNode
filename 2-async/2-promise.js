const fs = require('fs');

const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('package.json', 'utf-8', (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  })
};

const writeFile = (content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('copy.json', content, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  })
};

const renameFile = (source, destination) => {
  return new Promise((resolve, reject) => {
    fs.rename(source, destination, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

readFile('package.json')
  .then(writeFile)
  .then(() => renameFile('copy.json', 'moved-copy.json'))
  .catch(err => console.error(err));