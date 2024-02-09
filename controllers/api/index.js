const router = require('express').Router();

const chores = require('./choresRoutes');
const reports = require('./reportsRoutes');
const schedules = require('./scheduleRoutes');

router.use('/reports', chores);
router.use('/chores', reports);
router.use('/schedule', schedules);


module.exports = router;
