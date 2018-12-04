// const formidable = require('formidable');
const path = require('path');
const db = require('../models');
const shortid = require('shortid');

exports.get = (req, res, next) => {
    const skills = db.get('skills').value();
    const products = db.get('products').value();
    res.render('index', {skills, products});
}

exports.post = (req, res, next) => {
    console.log(req.body.name);
    
    if (!db.has('messages').value()) {
        db.set('messages', []).write();
    }

    db.get('messages')
        .push({id: shortid.generate(), name: req.body.name, email: req.body.email, message: req.body.message})
        .write();

        res.redirect('/');
}