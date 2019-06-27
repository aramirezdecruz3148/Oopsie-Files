const fs = require('fs');

const readDirectory = (directory, callback) => {
  fs.readdir(directory, callback);
};

const rename = (path, newPath, callback) => {
  fs.rename(path, newPath, callback);
};

const getModifiedTime = (path, callback) => {
  fs.stat(path, (err, stats) => {
    callback(err, stats && stats.mtime.toISOString());
  });
};

const readFile = (path, callback) => {
  fs.readFile(path, { encoding: 'utf8' }, callback);
};

module.exports = {
  readDirectory,
  rename, 
  getModifiedTime, 
  readFile
};
