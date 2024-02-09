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

//WE KNOW ROUTES ABOVE WORK

//get schedules based off of ID
router.get('/schedule/:id', withAuth, async (req, res) => {
    try{
        const scheduleData = await Schedule.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id'],
                },
            ],
        });

        const schedule = scheduleData.get({ plain: true });

        res.render('schedule', {
            ...schedule, 
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get chores by id
router.get('/chores/:id', withAuth, async (req, res) => {
    try {
        const choreData = await Chores.findByPk(req.params.id, {
            include:[
                {
                    model: Chores,
                    attributes: ['name']

                },
            ],
        });

        const chore = choreData.get({ plain: true });
        res.render('chores', {
            ...chore,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

//get all chores?
router.get('/chores', withAuth, async(req, res) => {
    try {
        const choreData = await Chores.findAll({
            include: [
                {
                    model: Chores,
                    attributes: ['name']
                },
            ],
        });

        const chores = choreData.map((chores) => chores.get({ plain: true }));

        res.render('chores', {
            chores,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get departments by id?
router.get('/departments/:id', withAuth, async (req, res) => {
    try {
        const departmentsData = await Departments.findByPk(req.params.id, {
            include: [
                {
                    model: Departments,
                    attributes: [xyz] //which attributes to would we use? 
                },
            ],
        });

        const departments = departmentsData.get({ plain: true });

        res.render('departments', {
            departments,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

//get all departments?
router.get('/departments', withAuth, async(req, res) => {
    try{
        const departmentsData = await Departments.findAll({
            include: [
                {
                    model: Departments,
                    attributes: [xyz], //help plz
                },
            ],
        });

        const departments = departmentsData.map((departments) => departments.get({ plain: true }));

        res.render('departments', {
            departments,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

//get reports by id
router.get('/reports/:id', withAuth ,async (req, res) => {
    try {
        const reportData = await Reports.findByPk(req.params.id, {
            include: [
                {
                    model: Reports,
                    attributes: ['id'],
                },
            ],
        });

        const reports = reportData.get({ plain: true });

        res.render('reports', {
            ...reports,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get profile 
router.get('/profile', withAuth, async (req, res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},
            include: [{ model: xyz }], //what models should we use to have for logins? 
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user, 
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});


module.exports = router;