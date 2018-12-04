const db = require('../models/');

exports.get = (req, res, next) => {
    const mess = req.flash('info')[0];

    if(req.session.isAuth == true) {
        res.redirect('/admin');
    } else {
        res.render('login', {msglogin: mess});
    }
}

exports.post = (req, res, next) => {
    const { email, pass } = db.get('auth').value().admin;

    if ( (req.body.email.toUpperCase() === email.toUpperCase()) && (req.body.password === pass)) {
        req.session.isAuth = true;
        res.redirect('/admin');
    } else {
        req.session.isAuth = false;
        req.flash('info', 'Unathorized!');
        res.redirect('/login');
    }
}