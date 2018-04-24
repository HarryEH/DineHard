var express = require('express');
var session = require('client-sessions');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mailer = require('express-mailer');

var app = express();

/**
 * Module dependencies.
 */
var debug = require('debug')('project:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

var index = require('./routes/index');
var users = require('./routes/users');

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    console.log('Client connected...');

    socket.on("new-review", function(restaurant) {
        console.log("////////////");
        console.log(restaurant);
        console.log("////////////");
        socket.emit("review", {data: "print me out bitch"});
    });

});

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

function checkLogin(req, res, next){

}

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    if(req.session.user_id === undefined){
        res.render('error', { loggedIn: checkLogin, forename: "" });
    } else {
        res.render('error', { loggedIn: checkLogin, forename: req.session.forename });
    }

});

module.exports = {app: app, io: io};

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
