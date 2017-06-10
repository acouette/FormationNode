const fs = require('fs-extra');

fs.readdir(__dirname)
    .then(filenames => Promise.all(filenames.map(file=> fs.readFile(file, 'utf-8'))))
    .then(fileContents => fileContents.map(fileContent => fileContent.length))
    .then(fileLengths => fileLengths.reduce((prev, curr) => prev + curr))
    .then(console.log)
    .catch(console.error);
