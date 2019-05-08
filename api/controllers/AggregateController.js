/* eslint-disable */
const _ = require('lodash'),
  path = require('path'),
  services = require(path.join(__dirname, '/../services')),
  models = require(path.join(__dirname, '/../models'));

module.exports = {
  async average (req, res) {
    let date = req.query.date,
      dateProcessed = {},
      result;

    try {
      dateProcessed = date && await models.Date.findOrCreate(date);
      result = await models.HourData.get(undefined, undefined, _.get(dateProcessed, '[0].id'));
    }
    catch (error) {
      return res.status(error.statusCode || 500).json(error);
    }

    let hourlyData = _.map(_.range(1, 24), function (hour_id) {
        return _.compact(_.map(result, function (individualResult) {
          if (individualResult.hour_id === hour_id) {
            return individualResult;
          }

          return undefined;
        }));
      }),

      average = _.compact(_.map(hourlyData, function (hourArray) {
        if (_.isEmpty(hourArray)) { return undefined; }
        
        let perHourAverage = {
          hour_id: hourArray[0].hour_id,
          focus: _.mean(_.map(hourArray, 'focus')),
          energy: _.mean(_.map(hourArray, 'energy')),
          enthusiasm: _.mean(_.map(hourArray, 'enthusiasm'))
        };

        dateProcessed && _.set(perHourAverage, 'date_id', dateProcessed[0].id);

        return perHourAverage
      })),

      processedResult = await services.UtilService.processRetrieveDataResults(average);

    return res.status(200).json({ averages: {
      processedResult
    } });
  },

  async max (req, res) {
    return res.status(501);
  },

  async min (req, res) {
    return res.status(501);
  },
};
