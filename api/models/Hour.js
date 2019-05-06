const _ = require('lodash'),
  path = require('path'),
  sqlite = require('sqlite'),

  dbPromise = sqlite.open(path.join(__dirname, '../../schema/db-schema.sqlite'), { Promise });

module.exports = {
  async findById (id) {
    /* eslint-disable-next-line */
    let db = await dbPromise,
      result;

    try {
      result = await Promise.all([
        db.get(`select * from hour where id = ${id};`)
      ]);
    }
    catch (error) {
      if (error) { throw error; }
    }

    return result;
  }
};
