const fs = require('fs');

const readDirectory = (directory, callback) => {
  fs.readdir(directory, (err, files) => {
    callback(err, files);
  });
};

module.exports = {
  readDirectory,
};
