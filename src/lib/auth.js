module.exports = {
    Itslogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/auth/signin');
    },

    ItsNotLogged(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/main/');
    }



};