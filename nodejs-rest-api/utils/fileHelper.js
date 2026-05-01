const fs = require('fs');

function readData() {
  const data = fs.readFileSync('./data/movies.json');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync('./data/movies.json', JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
