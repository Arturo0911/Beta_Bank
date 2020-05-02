const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const multer = require('multer');
const morgan = require('morgan');
const passport = require('passport');
const MysqlStore = require('express-mysql-session');
const { database } = require('./credenciales');
const cookieParser = require('cookie-parser');
const app = express();
require('./lib/passport');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
        //helpers: require()
}));
app.set('view engine', '.hbs');


app.use(multer({
    dest: path.join(__dirname, 'public/img_users')
}).single('image'));


app.use(session({
    secret: 'Bank_app_Beta',
    resave: false,
    saveUninitialized: false,
    store: new MysqlStore(database) // los mensajes flahs se guardan usanso express-session por eso llamamos express-mysql-session para guardar
        // luego lo llamamos MysqlStore(database) traemos el objeto de la base de datos para que se gurade
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.messagge = req.flash('messagge');
    app.locals.user = req.user;
    next();
})

app.get('/cookie', (req, res, next) => {
    console.log('las cookies: ', req.cookies);
    console.log('las cookies firmadas: ', req.signedCookies);


})

// para indicar que tenemos la autenticación





app.use('/personal', require('./routes/personal'));
app.use('/auth', require('./routes/autenticacion'));
app.use('/main', require('./routes/routes'));
//app.use('/report', require('./routes/report'));

app.use('/public', express.static(path.join(__dirname, 'public')));









app.listen(app.get('port'), () => {
    console.log('Server is running in https://localhost:3000');
});