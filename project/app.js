var express = require('express');
var session = require('client-sessions');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mailer = require('express-mailer');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

const models = require('./models/models');

models.connect();

models.User.find({username: "admin"}, function(err, results) {
    if (err) {return console.error(err);}

    if(results.length == 0) {
        var admin = new models.User({
            forename: "Administrator",
            surname: "Account",
            email: "admin@admin.com",
            username: "admin",
            password: "adminPassword1",
            admin: true,
            score: 0
        });

        admin.save(function (err, admin) {
            if (err) return console.error(err);
            console.log("admin account created");
        });
    }

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    cookieName: 'session',
    secret: 'd1n3h4rd',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

mailer.extend(app, {
    from: 'no-reply@example.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: '?@gmail.com',
        pass: '?'
    }
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    const checkLogin = checkLogin(req, res, next);

    var forename;
    if (checkLogin) {
        forename = req.session.forename;
    } else {
        forename = "";
    }


    res.render('error', { loggedIn: checkLogin, forename: forename });
});

function checkLogin(req, res, next){
    if(req.session.user_id === undefined){
        return false;
    } else {
        return true;
    }
}

module.exports = app;
