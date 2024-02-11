const isManager = (req, res, next) => {

    if (!req.session.logged_in) {
        res.redirect('./login');
    } else if (!req.session.isManager) {
        res.redirect('/')
    } else {
        next();
    }
};

module.exports = isManager;