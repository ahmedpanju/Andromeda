var express  = require('express');
var app      = express();
var port = process.env.PORT || 8080
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path     = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url); 

require('./config/passport')(passport); 

app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use(session({ secret: 'test123' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./routes.js')(app, passport); 

app.listen(port, function() {
    console.log("App is running on port " + port);
});

