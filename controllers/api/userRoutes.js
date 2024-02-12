const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
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

module.exports = router;