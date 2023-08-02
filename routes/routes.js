
const { Router} = require('express');
const { homeGet, loginUsuario, postSubcripcion, postUsuario, mostrar, dashboardLocal } = require('../controllers/routers');
const suscribirse = require('../controllers/pago');
const { check } = require('express-validator');
const recuperarClave = require('../controllers/nodemailer');
const router = Router();


//rutas get
router.get('/', homeGet);
router.get('/mostrar', mostrar); //Mostrar usuarios formato Json
router.get('/dashboard/:storeName', dashboardLocal);


//rutas post
router.post('/login',[
    check('email', 'correo no valido').isEmail(),
    check('password', 'la clave es obligatoria').not().isEmpty(),
] ,loginUsuario); //inicion de sesion
router.post('/pago', suscribirse);//pago de suscribirse
router.post('/subcripcion',[
    check('email', 'correo no valido').isEmail(),
    check('password', 'la clave es obligatoria').not().isEmpty(),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('storeName', 'el nombre de la tienda es obligatorio').not().isEmpty(),
] ,postUsuario)
router.post('save-password', recuperarClave); 


module.exports = router;
