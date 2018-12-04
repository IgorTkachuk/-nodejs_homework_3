const  express = require('express');
const router = express.Router();

const login = require('../controllers/login');

// router.get('/', (req, res, next) => {
//     res.render('login', {});
// });

router.get('/', login.get);
router.post('/', login.post);

module.exports = router;