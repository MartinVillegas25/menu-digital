const { Router} = require('express');
const { homeGet, loginGet, loginUsuario } = require('../controllers/routers');
const suscribirse = require('../controllers/pago');
const router = Router();



router.get('/', homeGet);
router.get('/login', loginGet);
router.post('/login', loginUsuario);
router.post('/suscribirse', suscribirse)


module.exports = router;
