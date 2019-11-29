var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');  
var path = require('path');
const flash = require('connect-flash');

// Create a new Express application.
var app = express();

//Database Configuration
var configDB     = require('./Config/database');
mongoose.connect(configDB.url, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

//Passport Authentication
require('./Config/auth')(app, passport);


//Set root directory as global 
global.__basedir = __dirname;

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/View');
app.set('view engine', 'ejs');

//configure static file path
app.use(express.static(path.join(__dirname, 'public')));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(flash());
app.use(function(req, res, next){
  res.locals.message = req.flash();
  next();
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

require('./Config/routes')(app);

module.exports = app;
