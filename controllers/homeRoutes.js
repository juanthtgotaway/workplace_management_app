const router = require('express').Router();
const { User, Departments, Reports, Chores, Schedules } = require('../models');
const withAuth = require('../utils/auth');

router.get('/reports', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const reportsData = await Reports.findAll({
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name'],
                },
            ],
        });
        // console.log(reportsData[0].user)

        // Serialize data so the template can read it
        const reports = reportsData.map((report) => report.get({ plain: true }));

        // console.log(`HEEEEEEEEYYYYYYYYYYYYYYYYYYY EGGGGGGAAAAAAAAAAAAA ${json.stringify(reports[0])}}`);
        // Pass serialized data and session flag into template
        res.render('reports', {
            reports,
            // logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;