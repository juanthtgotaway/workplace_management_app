const router = require('express').Router();

const chores = require('./choresRoutes');
const reports = require('./reportsRoutes');
const schedules = require('./scheduleRoutes');
const departments = require('./departmentsRoutes');
const users = require('./userRoutes');

router.use('/user', users);
router.use('/reports', reports);
router.use('/chores', chores);
router.use('/schedule', schedules);
router.use('/departments', departments);



module.exports = router;

