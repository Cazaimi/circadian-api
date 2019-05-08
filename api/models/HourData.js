/* eslint-disable no-useless-catch */
const _ = require('lodash'),
  path = require('path'),
  sqlite = require('sqlite'),

  dbPromise = sqlite.open(path.join(__dirname, '../../schema/db-schema.sqlite'), { Promise });

module.exports = {
  async create (hour, date, focus, enthusiasm, energy, options) {
    if (_.isEmpty(options)) { _.noop(); }

    /* eslint-disable-next-line */
    let db = await dbPromise,
      result;

    try {
      let insert;

      try {
        insert = await db.run('insert into hour_data (hour_id, date_id, focus, ' +
            `enthusiasm, energy) values ('${hour}', '${date}', '${focus}', '${enthusiasm}', '${energy}')`);
      }
      catch (error) {
        if (error) { throw error; }
      }

      result = await db.get(`select * from hour_data where id=${insert.stmt.lastID}`);
    }
    catch (error) {
      if (error) { throw error; }
    }

    return result;
  },

  async get (id, hour, date, options) {
    if (_.isEmpty(options)) { _.noop(); }

    let where = [];

    if (id !== undefined) { where.push(`id=${id}`); }

    if (hour) { where.push(`hour_id=${hour}`); }

    if (date) { where.push(`date_id=${date}`); }

    /* eslint-disable-next-line */
    let db = await dbPromise,
      result,
      base = 'select * from hour_data',
      queryString;

    try {
      queryString = this.constructQuery(base, where);
    }
    catch (error) {
      throw error;
    }

    try {
      result = await db.all(queryString);

      if (!result) {
        let error = {
          error: 'Not Found',
          message: 'The Hour data that you\'re looking for does not exist.',
          statusCode: 404
        };

        throw error;
      }
    }
    catch (error) {
      if (error) { throw error; }
    }

    return result;
  },

  async delete (id, options) {
    if (_.isEmpty(options)) { _.noop(); }

    /* eslint-disable-next-line */
    let db = await dbPromise,
      toBeDeleted;

    try {
      try {
        toBeDeleted = await db.get(`select * from hour_data where id=${id}`);
      }
      catch (error) {
        if (error) { throw error; }
      }

      if (!_.get(toBeDeleted, 'id')) {
        let error = {
          error: 'Not Found',
          message: 'The Hour data that you\'re looking for does not exist.',
          statusCode: 404
        };

        throw error;
      }

      await db.run(`delete from hour_data where id=${toBeDeleted.id};`);
    }
    catch (error) {
      if (error) { throw error; }
    }

    return toBeDeleted;
  },

  constructQuery (base, where, options) {
    if (_.isEmpty(options)) { _.noop(); }

    if (_.isArray(where) && where.length !== 0) {
      base = base.concat(' where');

      where.forEach(function (clause, index) {
        if (!clause.length) { return; }

        if (!index) {
          base = base.concat(' ', clause);

          return;
        }

        base = base.concat(' AND ', clause);
      });
    }

    return base.concat(';');
  }
};
