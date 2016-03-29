const fs = require('fs');

require('core-js-builder')({
  modules: [
    'es6.array.filter',
    'es6.array.find',
    'es6.array.find-index',
    'es6.array.for-each',
    'es6.array.includes',
    'es6.array.is-array'
  ],
  uglify: true
}).then(code => {
  fs.writeFile('shim.js', code, function(err) {
    if (err) {
      console.error(err);
    }
    console.log('Shim file saved.');
  });
});
