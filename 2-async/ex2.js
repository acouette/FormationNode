const fs = require('fs');

const readdir = (dirname) => {

  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) => {
      if (err) {
        reject(err);
      } else {
        resolve(filenames);
      }
    })
  })
};

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf-8', (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  })
};

readdir(__dirname)
  .then(filenames => Promise.all(filenames.map(readFile)))
  .then(fileContents => {
    const chars = fileContents.map(fileContent => fileContent.length).reduce((prev, curr) => prev + curr);
    console.log(chars);
  }).catch(console.error);
