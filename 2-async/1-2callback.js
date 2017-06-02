const fs = require('fs');
const assert = require('assert');

fs.readFile('package.json', 'utf-8', (err, content) => {
  assert.equal(null, err);
  console.log('content', content);

  fs.writeFile('copy.json', content, err => {
    assert.equal(null, err);
    console.log('copy is done');

    fs.rename('copy.json', 'moved-copy.json', err => {
      assert.equal(null, err);
      console.log('move is done');
    })

  });

  console.log('when is that happening ?')

});
