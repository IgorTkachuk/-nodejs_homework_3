const express = require('express');
const router = express.Router();

const admin = require('../controllers/admin');

// router.get('/', (req, res, next) => {
//     res.render('admin', {});
// });

router.get('/', admin.get);

router.post('/upload/', admin.upload);
router.post('/skills/', admin.skills);

module.exports = router;