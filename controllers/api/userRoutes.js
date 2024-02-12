const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

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

// Route to render the signup page
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        // If the user is already logged in, redirect to the profile page
        res.redirect('/profile');
    } else {
        res.render('signup');
    }
});

// Route to handle user signup
router.post('/signup', async (req, res) => {
    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user with the hashed password
        const userData = await User.create({
            username: req.body.username,
            password: hashedPassword,
        });

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

module.exports = router;
