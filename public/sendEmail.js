var _ = require('lodash');
fs = require('fs');

data = fs.readdirSync('/Users/malik-ahmad/Documents/VisDevelop/other');
console.log('data:', data, _.random(1,22));

console.log(__dirname)