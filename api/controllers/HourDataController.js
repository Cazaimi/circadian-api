const path = require('path'),
  services = require(path.join(__dirname, '/../services')),
  models = require(path.join(__dirname, '/../models'));

module.exports = {
  async create (req, res) {
    // Get data from req.
    let { focus, enthusiasm, energy } = req.body,

      // Get date and time.
      dateNow = services.UtilService.getDateNow(),
      date,

      // Convert date and time into relevant numbers
      hour = services.UtilService.getHourNow(),
      data;

    try {
      date = await models.Date.findOrCreate(dateNow);
    }
    catch (error) {
      if (error) {
        return res.status(500).json(error);
      }
    }

    // Make database query to store all this info into the db.
    try {
      data = await models.HourData.create(hour, date[0].id, focus, enthusiasm, energy);
    }
    catch (error) {
      if (error) {
        return res.status(500).json(error);
      }
    }

    return res.status(200).json(data);
  },

  async read (req, res) {
    let id = req.params.id,
      hour = req.query.hour,
      date = req.query.date,
      result;

    try {
      result = await models.HourData.get(id, hour, date);
    }
    catch (error) {
      return res.status(error.statusCode || 500).json(error);
    }

    let processedResult = await services.UtilService.processRetrieveDataResults(result);

    return res.status(200).json({ hourData: processedResult });
  },

  update (req, res) {
    return res.status(501).json(new Error('Not Implemented'));
  },

  async delete (req, res) {
    // Get data from req.
    let id = req.params.id,
      result;

    try {
      result = await models.HourData.delete(id);
    }
    catch (error) {
      return res.status(error.statusCode || 500).json(error);
    }

    return res.status(200).json({ deleted: result });
  }
};
