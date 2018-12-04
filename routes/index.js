const express = require('express');
const router = express.Router();

const index = require('../controllers/index');

// router.get('/', (req, res, next) => {
//     res.render('index', {})
// })

router.get('/', index.get);
router.post('/', index.post);

module.exports = router;