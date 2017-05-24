const fs = require('fs-extra');

const main = async () => {
  try {
    const content = await fs.readFile('passsckage.json', 'utf-8');
    await fs.writeFile('copy.json', content);
    await fs.rename('copy.json', 'moved-copy.json');
  } catch (err) {
    console.log(err);
  }
};

main();