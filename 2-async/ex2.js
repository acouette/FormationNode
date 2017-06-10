const fs = require('fs');

const readDir = (dirname) => {

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
            } else {
                resolve(content);
            }
        });
    })
};


readDir(__dirname)
    .then(filenames => Promise.all(filenames.map(file=> readFile(file))))
    .then(fileContents => fileContents.map(fileContent => fileContent.length))
    .then(fileLengths => fileLengths.reduce((prev, curr) => prev + curr))
    .then(console.log)
    .catch(console.error);
