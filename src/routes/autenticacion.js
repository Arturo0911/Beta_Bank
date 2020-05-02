const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ItsNotLogged, Itslogged } = require('../lib/auth');

router.get('/signin', ItsNotLogged, (req, res) => {
    res.render('auth/signin');
});
router.post('/signin', ItsNotLogged, async(req, res, next) => {
    passport.authenticate('local_signin_bank', {
        successRedirect: '/main/index',
        failureRedirect: '/auth/signin',
        failureFlash: true
    })(req, res, next)
});

router.get('/userlog', ItsNotLogged, (req, res) => {
    res.render('auth/auth');
});

router.post('/userlog', ItsNotLogged, passport.authenticate('local.user', {
    successRedirect: '/auth/signin',
    failureRedirect: '/auth/userlog',
    failureFlash: true
}));

router.get('/logout', async(req, res) => {
    req.logOut();
    res.redirect('/auth/signin');
});

module.exports = router;