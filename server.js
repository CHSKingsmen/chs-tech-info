var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var sassMiddleware = require('node-sass-middleware');

// Load environment variables from .env file
dotenv.load();

// Controllers
var HomeController = require('./controllers/home');
var DocsController = require('./controllers/docs');
var OfferingsController = require('./controllers/offerings');
// var ContactController = require('./controllers/contact');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'public/css'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', HomeController);
app.use('/docs', DocsController);
app.use('/what-we-offer', OfferingsController);
// app.get('/contact', ContactController.contactGet);
// app.post('/contact', ContactController.contactPost);

var redirect = require('express-simple-redirect');
 
app.use(redirect({
  '/ipads': 'http://apple.co/2sqNoHM',  // iPad in Education info
  '/office365': 'https://www.microsoft.com/en-us/education/products/office/default.aspx', // Office 365 for Education
  '/apple-classroom': 'https://support.apple.com/en-us/HT206151', // Apple Classroom info
  '/managed-apple-ids': 'https://support.apple.com/en-us/HT205918', // Managed Apple IDs for managed-apple-id holders
  '/naviance': 'https://www.naviance.com/solutions/parents-students' // Naviance information for parents
}));

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
