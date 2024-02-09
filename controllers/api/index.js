const router = require('express').Router();

const chores = require('./choresRoutes');
const reports = require('./reportsRoutes');

router.use('/reports', chores);
router.use('/chores', reports);

module.exports = router;
