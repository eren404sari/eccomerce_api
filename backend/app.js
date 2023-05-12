var createError = require('http-errors');
var fs = require('fs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./config/database').connection();


var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var authRouter = require('./routes/auth')
var productsRouter = require('./routes/products')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}


// app.use(logger((tokens,req,res)=>{
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
// ].join(' ')
// }));

let fileName = `log`

let logStream = fs.createWriteStream(path.join(__dirname, fileName), { overrite: false })
app.use(logger('dev', { stream: logStream }))


app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// middle ware for enabling the CORS 


app.use(express.static(path.join(__dirname, 'public')));
/*=====================  THE ROUTES START============================*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productsRouter);

/*=====================  THE ROUTES ENDS==========================*/
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;