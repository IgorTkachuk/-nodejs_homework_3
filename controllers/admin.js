const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const db = require('../models');

exports.get = (req, res, next) => {
    let skills = db.get('skills').value();
    const defPropVal = { number: 0 };

    if(!skills){
        skills = {
            "age": defPropVal,
            "concerts": defPropVal,
            "cities": defPropVal,
            "years": defPropVal
        }
    }
    const mess = req.flash('info')[0];
    
    const messProd = req.flash('infoProd')[0];

    if(req.session.isAuth == true) {
        res.render('admin', {skills, msgskill: mess, msgfile: messProd});
    } else {
        res.redirect('/login');
    }
}

exports.upload = (req, res, next) => {
    let form = new formidable.IncomingForm();
    let upload = path.join('./public', 'upload');

    if (!fs.existsSync(upload)){
        fs.mkdirSync(upload);
    }

    form.multiples = true;
    form.uploadDir = path.join(process.cwd(), upload);

    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log(err);
            return next(err);
        }

        const fileName = path.join(upload, files.photo.name);

        fs.rename(files.photo.path, fileName, err => {
            if (err) {
                console.error(err.message);
                return;
            }
        });

        if (!db.get('products').value()){
            db.set('products', []).write();
        }

        let dir = fileName.substr(fileName.indexOf('\\'));
        db.get('products')
          .push({ "src": dir, "name": fields.name, "price": fields.price })
          .write();

        req.flash('infoProd', 'Product saved!');
        res.redirect('/admin');
    });



}

exports.skills = (req, res, next) => {

    const { age, concerts, cities, years} = req.body;

    db.set('skills', {
        "age": {
            "number": age,
            "text": "Возраст начала занятий на скрипке"
        },
        "concerts": {
            "number": concerts,
            "text": "Концертов отыграл"
        },
        "cities": {
            "number": cities,
            "text": "Максимальное число городов в туре"
        },
        "years": {
            "number": years,
            "text": "Лет на сцене в качестве скрипача"
        }
    }).write();

    req.flash('info', 'All parameters saved!');
    res.redirect('/admin');
}