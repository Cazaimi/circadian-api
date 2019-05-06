const _ = require('lodash'),
  path = require('path'),
  sqlite = require('sqlite'),

  dbPromise = sqlite.open(path.join(__dirname, '../../schema/db-schema.sqlite'), { Promise });

module.exports = {
  async findOrCreate (date) {
    /* eslint-disable-next-line */
    let db = await dbPromise,
      result;

    try {
      result = await Promise.all([
        db.get(`select * from date where date = '${date}';`)
      ]);

      if (_.isObject(result) && !result[0]) {
        result = await db.run(`insert into date (date) values ('${date}')`);
      }
    }
    catch (error) {
      if (error) { throw error; }
    }

    return result;
  },

  async findById (id) {
    /* eslint-disable-next-line */
    let db = await dbPromise,
      result;

    try {
      result = await Promise.all([
        db.get(`select * from date where id = '${id}';`)
      ]);
    }
    catch (error) {
      if (error) { throw error; }
    }

    return result;
  }
};
