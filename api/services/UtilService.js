const _ = require('lodash'),

  models = require('../models');

module.exports = {
  getDateNow () {
    let dateObj = new Date();

    return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
  },

  getHourNow () {
    let dateObj = new Date();

    return dateObj.getHours() + 1;
  },

  async processRetrieveDataResults (input) {
    let processedResult = [];

    for (let result of input) {
      /* eslint-disable no-await-in-loop */
      let date = await models.Date.findById(result.date_id),
        hour = await models.Hour.findById(result.hour_id);

      _.assign(result, {
        date: _.get(date, '[0].date'),
        hour: _.get(hour, '[0].hour')
      });

      processedResult.push(_.omit(result, ['hour_id', 'date_id']));
    }

    return processedResult;
  }
};
