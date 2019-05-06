const _ = require('lodash'),
  dateObj = new Date(),

  models = require('../models');

module.exports = {
  getDateNow () {
    return `${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()}`;
  },

  getHourNow () {
    return dateObj.getHours() + 1;
  },

  async processRetrieveDataResults (input) {
    let processedResult = [];

    for (let result of input) {
      /* eslint-disable no-await-in-loop */
      let date = await models.Date.findById(result.date_id),
        hour = await models.Hour.findById(result.hour_id);

      _.assign(result, {
        date: date[0].date,
        hour: hour[0].hour
      });

      processedResult.push(_.omit(result, ['hour_id', 'date_id']));
    }

    return processedResult;
  }
};
