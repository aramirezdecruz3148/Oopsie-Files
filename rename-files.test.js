const fs = require('fs');
const { createFiles } = require('./create-files');
const { 
  readDirectory, 
  rename, 
  getModifiedTime,
  readFile, 
  renameEverything
} = require('./rename-files');

describe('rename files', () => {
  beforeEach(done => {
    createFiles('./fixtures', 100, done);
  });

  afterEach(done => {
    fs.readdir('./fixtures', (err, files) => {
      if(files.length === 0) done();
      let deletedSoFar = 0;
      files.forEach(file => {
        fs.unlink(`./fixtures/${file}`, err => {
          if(err) return done(err);
          deletedSoFar += 1;
          if(deletedSoFar === files.length) done();
        });
      });
    });
  });

  afterAll(done => {
    fs.rmdir('./fixtures', done);
  });

  it('gets all files in fixtures directory', done => {
    readDirectory('./fixtures', (err, files) => {
      expect(files).toHaveLength(100);
      done();
    });
  });

  it('can rename a file, passing in a path and new path', done => {
    fs.readFile('./fixtures/0.txt', { encoding: 'utf8' }, (err, oldFileContent) => {
      rename('./fixtures/0.txt', './fixtures/new-name.txt', err => {
        expect(err).toBeFalsy();
        fs.readFile('./fixtures/new-name.txt', { encoding: 'utf8' }, (err, newFileContent) => {
          expect(err).toBeFalsy();
          expect(newFileContent).toEqual(oldFileContent);
          done();
        });
      });
    });
  });

  it('gets mtime of a file', done => {
    getModifiedTime('./fixtures/0.txt', (err, modifiedTime) => {
      expect(err).toBeFalsy();
      expect(modifiedTime).toEqual(expect.any(String));
      done();
    });
  });

  it('gets the contents of a file', done => {
    fs.readFile('./fixtures/0.txt', { encoding: 'utf8' }, (err, expectedContent) => {
      readFile('./fixtures/0.txt', (err, resultContent) => {
        expect(err).toBeFalsy();
        expect(resultContent).toEqual(expectedContent);
        done();
      });
    });
  });

  it('renames all files to content-fileNumber-date', done => {
    renameEverything('./fixtures', err => {
      expect(err).toBeFalsy();

      fs.readdir('./fixtures', (err, files) => {
        expect(files).toHaveLength(100);
        files.forEach(file => {
          expect(file).toMatch(/\w+-\d+-\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z/);
        });
        done();
      });
    });
  });
});
