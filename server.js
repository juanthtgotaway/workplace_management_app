const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers')
const helpers = require('./utils/helpers');
const moment = require('moment');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    next();
});

app.use(routes);



// if browser route is wrong send back to homepage
app.get('*', (req, res) => {
    res.render('homepage', {
            logged_in: req.session.logged_in,
            is_manager: req.session.is_manager
    }); // Render the homepage handlebars template
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
    // app.use(express.json());
    // app.use(express.urlencoded({ extended: true }));

});


