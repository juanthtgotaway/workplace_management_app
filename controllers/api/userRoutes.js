const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, DepEmployees } = require('../../models');

// Route to render the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        // If the user is already logged in, redirect to the profile page
        res.redirect('/profile');
    } else {
        res.render('login');
    }
});

// Route to handle user login
router.post('/login', async (req, res) => {
    try {
        // Find the user by username
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData || !bcrypt.compareSync(req.body.password, userData.password)) {
            // If user not found or password is incorrect, render the login page with an error message
            return res.status(400).render('login', { error: 'Incorrect username or password' });
        }

        // Set session variables
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        // Redirect to the profile page
        res.redirect('/profile');
    } catch (err) {
        // Render error page with an error message
        res.status(500).render('error', { error: 'Internal Server Error' });
    }
});


// Route to handle user logout
router.post('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(() => {
        // Redirect to the homepage after logout
        res.redirect('/');
    });
});

// Route to render the profile page
router.get('/profile', (req, res) => {
    if (req.session.logged_in) {
        // If the user is logged in, render the profile page
        res.render('profile');
    } else {
        // If the user is not logged in, redirect to the login page
        res.redirect('/login');
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
