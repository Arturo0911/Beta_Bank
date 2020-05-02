const passport = require('passport');
const localEstrategy = require('passport-local').Strategy;
//const { database } = require('../credenciales');
const pool = require('../connection');
const helpers = require('./helpers');


passport.use('local_signin_bank', new localEstrategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    passReqToCallback: true

}, async(req, usuario, clave, done) => {
    const rows = await pool.query('SELECT * FROM usuarios_login WHERE usuario=?', [usuario]);
    if (rows.length > 0) {
        const user = rows[0]
        const validarPass = await helpers.MatchPassword(clave, user.clave);
        if (validarPass) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.usuario));
        } else {
            done(null, false, req.flash('messagge', 'Clave incorrecta'));
        }
    } else {
        return done(null, false, req.flash('messagge', 'Usuario incorrecto'));
    }


}));

passport.use('local.user', new localEstrategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    passReqToCallback: true
}, async(req, usuario, clave, done) => {
    const Generate_new_loger = {
        cedula_usuario: req.body.cedula_usuario,
        tipo_usuario: req.body.tipo_usuario,
        usuario: req.body.usuario,
        clave: req.clave
    };

    Generate_new_loger.clave = await helpers.encryptPassword(clave);
    const resultado_loger = await pool.query('INSERT INTO usuarios_login set?', [Generate_new_loger]);
    Generate_new_loger.id = resultado_loger.insertId;
    return done(null, Generate_new_loger);
}));


passport.serializeUser((user, done) => {
    //console.log('user: ', user.id);
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios_login WHERE id = ?', [id]);
    const persona = await pool.query('SELECT * FROM cuentas WHERE cedula =?', [rows[0].cedula_usuario]);
    done(null, persona[0]);
});