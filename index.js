    const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const loginRouter = require('./routes/login');

const app = express();

app.set('views', path.join(__dirname, 'views/pages/'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'mySite',
    key: 'sessionkey',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null,
    },
    saveUninitialized: false,
    resave: false
}));

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  });


app.listen(3000, () => {
    console.log('App listening on port 3000.');
});

console.log('Hello nodemon!');