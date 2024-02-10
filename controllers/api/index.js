const router = require('express').Router();

const chores = require('./choresRoutes');
const reports = require('./reportsRoutes');
const schedules = require('./scheduleRoutes');

router.use('/reports', reports);
router.use('/chores', chores);
router.use('/schedule', schedules);



module.exports = router;

