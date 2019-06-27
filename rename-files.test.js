const { createFiles } = require('./create-files');
const { readDirectory } = require('./rename-files');

describe('rename files', () => {
  beforeEach(done => {
    createFiles('./fixtures', 100, done);
  });
  it('gets all files in fixtures directory', done => {
    readDirectory('./fixtures', (err, files) => {
      expect(files).toHaveLength(100);
      done();
    });
  });
});
