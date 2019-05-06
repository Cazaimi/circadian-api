const express = require('express'),
  router = express.Router(),
  path = require('path'),

  hourData = require(path.join(__dirname, '../../api/controllers/HourDataController.js'));

/* Create hourdata */
router.post('/', hourData.create);

/* Get hourdata */
router.get('/:id', hourData.read);
router.get('/', hourData.read);

/* Delete hourdata */
router.delete('/:id', hourData.delete);

module.exports = router;
