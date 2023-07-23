const { Router} = require('express');
const { homeGet, loginGet, ping, add } = require('../controllers/routers');
const router = Router();



router.get('/', homeGet);
router.get('/login', loginGet);
router.get('/ping', ping);


module.exports = router;
