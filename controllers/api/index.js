const router = require('express').Router();

const chores = require('./choresRoutes');
const reports = require('./reportsRoutes');
const schedules = require('./scheduleRoutes');
const departments = require('./departmentsRoutes');
const user = require('./userRoutes');

router.use('/reports', reports);
router.use('/chores', chores);
router.use('/schedule', schedules);
router.use('/departments', departments);
router.use('/user', user);



module.exports = router;

