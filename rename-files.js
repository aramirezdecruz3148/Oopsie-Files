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

const renameEverything = (directory, callback) => {
  readDirectory(directory, (err, files) => {
    if(err) return callback(err);

    let renamedSoFar = 0;
    files.forEach(file => {
      readFile(`${directory}/${file}`, (err, fileContent) => {
        if(err) return callback(err);
        getModifiedTime(`${directory}/${file}`, (err, modifiedTime) => {
          if(err) return callback(err);
          const number = file.split('.')[0];
          rename(`${directory}/${file}`, `${directory}/${fileContent}-${number}-${modifiedTime}`, err => {
            if(err) return callback(err);
            renamedSoFar++;
            if(renamedSoFar === files.length) callback();
          });
        });
      });
    });
  });
};

module.exports = {
  readDirectory,
  rename, 
  getModifiedTime, 
  readFile,
  renameEverything
};
