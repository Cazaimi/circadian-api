const express = require('express'),
  router = express.Router(),
  path = require('path'),

  aggregate = require(path.join(__dirname, '../../api/controllers/AggregateController.js'));

/* Get Average */
router.get('/average', aggregate.average);
router.get('/average/:field', aggregate.average);

/* Get maximum */
router.get('/max', aggregate.max);

/* Get minimum */
router.get('/min', aggregate.min);

module.exports = router;
