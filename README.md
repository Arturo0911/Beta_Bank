******* Here, we built an app simulating a Bank services, trasacctions, pay bills.
1.-  we configure our application so that it is listening on port 3000
2.-  Now on routes, we set main as the main routes for navigation throw the pages.
3.-  As in another times, puts our directory static using (app.use(express.static(path.jois(__dirname, 'public')));)


****** Routes
[X] Routing for the main page is using get.router('/') <=> we render the index.hbs file
[X] Routing for get form save users is router.get('/add') <=> we render the addusers.hbs file
[X] Routing for method post from form save users is with router.post('/add') bellow this one is
    our settings to save image type png, jpg, jpeg and gif using a algorithm to generate a random name
    with consonants and numbers with the respectiv extension name.






****** To save images

[X]We need to set we configuration on index.js inside SRC folder to save images.
[X] call path methods from node require('path'), require('fs-extra') <-- This one is to change
    folder path file that we configurate on the beggining on index.js...
    using constant path we do configurate new target => path.resolve(`src/public/img/....`), next send new target using  fs.rename(last target, new target)

[]


****** Form to save data
[X] file type txt outside src with citys and states from Ecuador to add on select option on te form


======================================= Authtentication

****** To generate a hash password with bcrypt library
[X] Call method bcrypt using her algorithm. using bcrypt.gentsalt to create the method encryptpassword    to salt passsword with a async method bcryptgentSalt and bcrypt hash, return hash... In hash method using the constant gentsalt(10) and acopling with password parameter.
[X] calling a method to use we algorithm by bcrypt
[X] Set tools like passport to authenticate users using passport-local
[X] LocalStrategy it allows use and user and password in our app node js, usernamefield, passwordfield and ReqCallback
[X] first Authentication file // when receive data from templates, travel on atuhtentication file, then is running we passport.authenticate('name that ww put on this side', {
    failureRedirect... etc
})
[X] passport file passport.use('the same name we put on authentication file')
    call passport-local.Strategy is for 
[X] Using serializer from passport to set what's the user is logging. We must to use passport.initialize() and passport.session()




******************************* DATABASE
******************************* this is to Banca virtual.
[X] Create database called Bank
[X] Create table called users, loggers(thats right, another table with this parameters), accounts per clients
[X] create table called account movements to logger any query or change status or value from account, we use decimal data (13,4)
    


// Movements from routes.
[X] Creating process to change values from account to account
[X]
[]
[]
[]
[]
[]
[]
[]
Only i put two provinces Because it's very comprehensive put 24 Povinces and her respectives cities
this one is only beta project