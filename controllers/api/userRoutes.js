const router = require('express').Router();
const { User, Departments, DepEmployees } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{model: Departments, through: DepEmployees, as: 'users_department'}]
        });
        res.status(201).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);


        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: '❌ Incorrect email or password, please try again ❌' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: '❌ Incorrect email or password, please try again ❌' });
            return;
        }

        const isManagerC = userData.is_manager;

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.is_manager = isManagerC;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post('/signup/', async (req, res) => {
    try {
        const userData = await User.create({
            ...req.body
        })

        let isManagerC = userData.is_manager

        console.log(makeNewUser);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.is_manager = isManagerC;

            res.json({ user: makeNewUser, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/update/:userId', async (req, res) => {
    const userId = req.params.userId;
    const newDepartmentId = req.body.newDepartmentId;
    const newAdmin = req.body.admin

    try {
        // Check if the user already has a department assigned
        let depEmployee = await DepEmployees.findOne({ where: { user_id: userId } });

        

        if (!depEmployee) {
            // If the user does not have a department assigned, create a new entry
            depEmployee = await DepEmployees.create({
                user_id: userId,
                department_id: newDepartmentId
            });
        } else if (newDepartmentId !== "") {
            // If the user has a department assigned, update the existing entry
            await DepEmployees.update({ department_id: newDepartmentId }, {
                where: {
                    user_id: userId,
                },
            });
            // depEmployee.department_id = newDepartmentId;
            // await depEmployee.save();
        }

        if (newAdmin !== "") {
            const updatedAdmin = await User.update({ is_manager: newAdmin }, {
                where: {
                    id: userId,
                },
            });
            // user.is_manager = newAdmin;
            // await user.save();
        }

        const updatedUser = await User.findOne({ where: { id: userId } });
        const updatedDepEmployee = await DepEmployees.findOne({ where: { user_id: userId } });

        res.status(200).json({ message: 'Employee Updated successfully', updatedData: updatedDepEmployee, updatedAdmin: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;