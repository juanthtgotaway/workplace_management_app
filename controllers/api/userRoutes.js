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
        console.log('TTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEESSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTT')
        console.log(userData)


        if (!userData) {
            res.status(400).json({ message: '❌ Incorrect email or password, please try again ❌' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: '❌ Incorrect email or password, please try again ❌' });
            return;
        }

        const isManager = userData.is_manager;

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.is_manager = isManager;

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

module.exports = router;